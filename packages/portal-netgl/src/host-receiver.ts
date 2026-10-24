// Host-side receiver: frame buffering + drain, lifted out of the demo apps'
// main.ts so every host (three.js today, other frameworks later) gets the
// same semantics.
//
// Protocol recap: the guest streams NetGLCalls and a `netgl:frame-end`
// marker after each frame. The host must not interleave its own GL calls
// with a guest frame (the guest's useProgram → uniform sequence would
// break), so it buffers calls between markers and replays complete frames
// in one atomic `drain()` at a point of its choosing in its own frame —
// typically after painting the portal stencil mask and clearing depth.
//
// Buffering rules (each one learned the hard way, see DESIGN.md):
//   - Frames that complete before the host drains are CONCATENATED, never
//     dropped: an earlier frame may create handles a later one references.
//   - If no new frame has completed, the last frame is replayed again so
//     the door isn't empty for a host frame. That re-run skips calls that
//     mint handles (they exist; re-minting would orphan the first GPU
//     object) and calls that upload data (it's already resident; a slow
//     guest streaming map tiles would otherwise have every one re-uploaded
//     on every host frame). Trade-off: a frame that rewrites a resource
//     between two of its own draws re-runs with the final contents.
//   - A frame that DELETES any GL object is never re-run. Its transient
//     objects are gone by the end of the frame, so a re-run's bind of one
//     fails — and every call after it that was meant for that object
//     (framebufferTexture2D, texParameteri, vertexAttribPointer, draws)
//     lands on whatever object is still bound instead, permanently
//     corrupting it. Cesium creates, uses and deletes a scratch framebuffer
//     in its first frame; re-running that frame reattached its textures to
//     Cesium's main scene framebuffer, which then stayed incomplete (a
//     black door) for the rest of the session. Skipping the re-run costs
//     one host frame without guest content, and only when the guest is
//     slower than the host.
//   - A replay error is reported once per distinct message and the drain
//     continues with the next call, so one unsupported call can't kill
//     the host's render loop.
//
// Wire 2 (DESIGN.md, "Wire protocol"): a guest that says `wire: 2` in its
// `netgl:ready` gets `wire: 2` in the ack and then sends a frame's items as
// one `netgl:batch`; each item is handled as if it had come alone, so the
// rules above don't change. Legacy per-call messages are still accepted.
// If the guest asked for a port and the transport posts to an exact
// origin, the ack transfers one end of a MessageChannel; the guest's
// stream (and, if it asked for `'all'`, the host's control) then flows
// over it. A port is only ever handed to the transport's pinned origin, and
// its messages need no origin check after that.
//
// After `drain()` the GL context holds guest state; the host must reset its
// own framework's state cache (three: `renderer.resetState()`).

import {
  NETGL_WIRE_VERSION,
  isNetGLBatch,
  isNetGLCall,
  isNetGLFrameEnd,
  type NetGLCall,
  type NetGLPortOpenMessage
} from './messages'
import type { NetGLReadyAckMessage, NetGLReadyMessage } from './guest-context'
import type { NetGLTransport } from './renderer'
import { makeNetGLReplay, type NetGLReplay, type NetGLReplayConfig } from './replay'

// Skipped when re-running a stale frame: the data is already resident.
const UPLOADS = new Set<string>([
  'bufferData',
  'bufferSubData',
  'texImage2D',
  'texSubImage2D',
  'texImage3D',
  'texSubImage3D',
  'compressedTexImage2D',
  'compressedTexSubImage2D',
  'compressedTexImage3D',
  'compressedTexSubImage3D',
  'texStorage2D',
  'texStorage3D',
  'renderbufferStorage',
  'renderbufferStorageMultisample',
  'generateMipmap',
  'shaderSource',
  'compileShader',
  'attachShader',
  'linkProgram'
])

// How long control posts wait for an `'all'` port to open before going on
// the window after all.
const PORT_OPEN_TIMEOUT_MS = 1000

export type NetGLHostReceiverConfig = {
  /** The host's GL context — where guest frames replay. */
  gl: WebGL2RenderingContext
  /** Transport from the guest. */
  transport: NetGLTransport
  /** Replay config: viewport remap, screen policy. */
  replay?: NetGLReplayConfig
  /** Called on the guest's `netgl:ready` handshake. */
  onReady?: (msg: NetGLReadyMessage) => void
  /** Any other inbound message (debug relays, app-level control). */
  onControl?: (msg: unknown) => void
  /** Replay errors, once per distinct message. Defaults to console.error. */
  onError?: (err: unknown) => void
  /**
   * Highest wire version to accept from a guest. Default 2; 1 acks as a
   * 0.5 host does, so the guest sends one message per call.
   */
  wire?: 1 | 2
  /**
   * Offer a wire-2 guest a MessageChannel port. Default true, but only
   * when the transport posts to an exact origin (`outputOrigin`, as
   * `iframeTransport` has for a non-opaque origin): never with `'*'`.
   */
  messageChannel?: boolean
}

/** The wire the receiver and its guest agreed on. */
export type NetGLHostWire = {
  /** 2 once a guest has announced `wire: 2`; else 1. */
  readonly version: number
  /** `'offered'`: the port went out with the ack; `'open'`: the guest is sending on it. */
  readonly port: 'none' | 'offered' | 'open'
  /** Whether control messages to the guest go over the port. */
  readonly controlOnPort: boolean
  /** Messages received (window and port), and stream items in them. */
  readonly messages: number
  readonly items: number
  readonly batches: number
}

export type NetGLHostReceiver = {
  /** The guest's handshake, once received. */
  readonly ready: NetGLReadyMessage | null
  /** Whether at least one complete guest frame has arrived. */
  readonly hasFrame: boolean
  /**
   * Whether `drain()` with nothing pending would re-run the last frame.
   * False before the first frame and after one that deleted a GL object
   * (a three.js guest's first frame deletes its shaders): a host that
   * renders on demand should then ask the guest for another frame.
   */
  readonly canRerun: boolean
  /**
   * Replay the pending guest frame(s), or re-run the last one if none is
   * pending and the last one is safe to re-run (see the buffering rules
   * above). Returns true if anything was replayed.
   */
  drain(): boolean
  /** The underlying replay (for its `invalidate()` or direct use). */
  replay: NetGLReplay
  /**
   * Post a control message to the guest (e.g. `layer:view`): over the
   * port when the guest asked for its control there, else the transport.
   */
  post(msg: unknown, transfer?: Transferable[]): void
  /** The negotiated wire. */
  readonly wire: NetGLHostWire
  /**
   * Call `listener` whenever a complete guest frame arrives (on its
   * frame-end). For hosts that render on demand (deck.gl), which must ask
   * for a redraw to drain it. Returns an unsubscribe.
   */
  onFrame(listener: () => void): () => void
  /** Stop listening to the transport. Idempotent. */
  stop(): void
}

export const makeNetGLHostReceiver = (config: NetGLHostReceiverConfig): NetGLHostReceiver => {
  const replay = makeNetGLReplay(config.gl, config.replay)
  const onError = config.onError ?? ((err: unknown) => console.error('[netgl-host] replay error:', err))
  const seenErrors = new Set<string>()

  let ready: NetGLReadyMessage | null = null
  let inFlight: NetGLCall[] = []
  let pending: NetGLCall[] | null = null
  let last: NetGLCall[] | null = null
  // Whether `last` may be re-run: false if it deleted any GL object.
  let lastRerunnable = false
  const frameListeners = new Set<() => void>()

  const maxWire = config.wire ?? NETGL_WIRE_VERSION
  const outputOrigin = (config.transport as { outputOrigin?: unknown }).outputOrigin
  const portAllowed =
    config.messageChannel !== false &&
    typeof MessageChannel !== 'undefined' &&
    typeof outputOrigin === 'string' &&
    outputOrigin !== '*' &&
    outputOrigin !== 'null'
  let version = 1
  let messages = 0
  let items = 0
  let batches = 0

  // The port, and the window count it waits for (see NetGLPortOpenMessage).
  let port: MessagePort | null = null
  let portState: 'none' | 'offered' | 'open' = 'none'
  let portSession: string | null = null
  let offer: { seq: number; windowItems: number; control: boolean } | null = null
  let windowItems = 0
  let needWindowItems = 0
  let held: unknown[] = []
  let controlOnPort = false
  // Control posts held between offering an `'all'` port and its opening,
  // so none overtakes another; flushed to the port when it opens, or to
  // the window if it doesn't within PORT_OPEN_TIMEOUT_MS.
  let heldPosts: Array<[unknown, Transferable[] | undefined]> | null = null
  let heldTimer: ReturnType<typeof setTimeout> | null = null

  const item = (msg: unknown): boolean => {
    if (isNetGLCall(msg)) {
      inFlight.push(msg)
      return true
    }
    if (isNetGLFrameEnd(msg)) {
      if (pending) pending.push(...inFlight)
      else pending = inFlight
      inFlight = []
      for (const l of frameListeners) l()
      return true
    }
    return false
  }

  const releaseHeldPosts = (toPort: boolean): void => {
    if (heldTimer) clearTimeout(heldTimer)
    heldTimer = null
    const posts = heldPosts ?? []
    heldPosts = null
    controlOnPort = toPort && port !== null
    for (const [msg, transfer] of posts) post(msg, transfer)
  }

  const closePort = (): void => {
    if (port) {
      port.onmessage = null
      port.close()
    }
    port = null
    portState = 'none'
    held = []
    if (heldPosts) releaseHeldPosts(false)
    controlOnPort = false
  }

  const onReady = (msg: NetGLReadyMessage): void => {
    const wire = Math.min(maxWire, typeof msg.wire === 'number' ? msg.wire : 1)
    const ack: NetGLReadyAckMessage = wire >= 2 ? { type: 'netgl:ready-ack', wire } : { type: 'netgl:ready-ack' }
    if (wire >= 2) {
      version = 2
      if (typeof msg.seq === 'number') ack.seq = msg.seq
    }
    // A port per guest page load: a repeated announcement (sent before our
    // ack reached it) gets the ack again without one; a new session (the
    // guest reloaded) gets a new port.
    const session = typeof msg.session === 'string' ? msg.session : null
    const wantsPort = wire >= 2 && (msg.port === 'stream' || msg.port === 'all') && portAllowed
    if (wantsPort && (portState === 'none' || (session !== null && session !== portSession))) {
      closePort()
      const channel = new MessageChannel()
      port = channel.port1
      portState = 'offered'
      portSession = session
      offer = { seq: typeof msg.seq === 'number' ? msg.seq : 0, windowItems, control: msg.port === 'all' }
      port.onmessage = (ev: MessageEvent) => onPortMessage(ev.data)
      ack.port = channel.port2
      config.transport.post(ack, [channel.port2])
      if (offer.control) {
        heldPosts = []
        heldTimer = setTimeout(() => releaseHeldPosts(false), PORT_OPEN_TIMEOUT_MS)
      }
    } else {
      config.transport.post(ack)
    }
    // Only surface the first announcement.
    if (!ready) {
      ready = msg
      config.onReady?.(ready)
    }
  }

  const dispatch = (msg: unknown): void => {
    if (item(msg)) return
    if (isNetGLBatch(msg)) {
      batches += 1
      for (const m of msg.batch) item(m)
      return
    }
    const typed = msg as { type?: unknown }
    if (typed.type === 'netgl:ready') {
      // Always ack (the guest re-announces until it hears one).
      onReady(msg as NetGLReadyMessage)
      return
    }
    config.onControl?.(msg)
  }

  const countItems = (msg: unknown): number =>
    isNetGLCall(msg) || isNetGLFrameEnd(msg) ? 1 : isNetGLBatch(msg) ? msg.batch.length : 0

  const drainHeld = (): void => {
    if (held.length === 0 || windowItems < needWindowItems) return
    const msgs = held
    held = []
    for (const m of msgs) {
      messages += 1
      items += countItems(m)
      dispatch(m)
    }
  }

  const onPortMessage = (data: unknown): void => {
    if (!data || typeof data !== 'object') return
    if ((data as { type?: unknown }).type === 'netgl:port' && portState === 'offered' && offer) {
      const open = data as NetGLPortOpenMessage
      portState = 'open'
      // The items the guest posted on the window before switching that
      // haven't arrived yet: port messages wait for them.
      needWindowItems = offer.windowItems + Math.max(0, (open.after ?? 0) - offer.seq)
      if (heldPosts) releaseHeldPosts(offer.control)
      return
    }
    if (held.length > 0 || windowItems < needWindowItems) {
      held.push(data)
      return
    }
    messages += 1
    items += countItems(data)
    dispatch(data)
  }

  let unsubscribe: (() => void) | null = config.transport.onMessage((msg) => {
    messages += 1
    const n = countItems(msg)
    items += n
    windowItems += n
    dispatch(msg)
    if (n > 0) drainHeld()
  })

  const post = (msg: unknown, transfer?: Transferable[]): void => {
    if (heldPosts) {
      heldPosts.push([msg, transfer])
      return
    }
    if (controlOnPort && port) port.postMessage(msg, transfer ?? [])
    else config.transport.post(msg, transfer)
  }

  const run = (batch: NetGLCall[], stale: boolean): void => {
    replay.invalidate()
    for (let i = 0; i < batch.length; i += 1) {
      const call = batch[i]
      if (stale && (call.returnId !== undefined || UPLOADS.has(call.name))) continue
      try {
        replay(call)
      } catch (err) {
        const key = err instanceof Error ? err.message : String(err)
        if (!seenErrors.has(key)) {
          seenErrors.add(key)
          onError(err)
        }
      }
    }
  }

  return {
    get ready() {
      return ready
    },
    get hasFrame() {
      return last !== null || pending !== null
    },
    get canRerun() {
      return last !== null && lastRerunnable
    },
    replay,
    post,
    wire: {
      get version() {
        return version
      },
      get port() {
        return portState
      },
      get controlOnPort() {
        return controlOnPort
      },
      get messages() {
        return messages
      },
      get items() {
        return items
      },
      get batches() {
        return batches
      }
    },
    onFrame(listener) {
      frameListeners.add(listener)
      return () => {
        frameListeners.delete(listener)
      }
    },
    drain() {
      if (pending) {
        const batch = pending
        pending = null
        last = batch
        lastRerunnable = !batch.some((c) => c.name.startsWith('delete'))
        run(batch, false)
        return true
      }
      if (last && lastRerunnable) {
        run(last, true)
        return true
      }
      return false
    },
    stop() {
      unsubscribe?.()
      unsubscribe = null
      closePort()
      frameListeners.clear()
    }
  }
}
