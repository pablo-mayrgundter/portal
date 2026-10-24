// Framework-agnostic guest core.
//
// Everything a NetGL guest needs that isn't specific to one framework:
//   - a shadow WebGL2 context (answers the framework's synchronous queries,
//     mints handles, and — because it executes every call — holds the
//     guest's rendered pixels for readback such as picking)
//   - a recorder Proxy over it, posting NetGLCalls onto a transport
//   - frame boundaries: a `netgl:frame-end` marker followed by a state
//     checkpoint, so the next batch replays from the guest's own GL state
//     no matter what the host did to the shared context in between
//     (`endFrame()`), or by a checkpoint deferred to the guest's next call,
//     for a guest drawn several times inside one host frame (`subFrame()`)
//   - the `netgl:ready` handshake and inbound control messages
//
// A framework shim ("f′" for framework f) is then just:
//   1. get the framework to use `gl` as its context, and
//   2. call `endFrame()` after each frame the framework renders.
// See `frameworks/cesium.ts` for a ~40-line example. Compositing policy
// (stencil clipping, clears, viewport placement) lives on the host side in
// the replay's `screen` config, not in the shim.

import {
  NETGL_WIRE_VERSION,
  isNetGLCall,
  isNetGLFrameEnd,
  type NetGLBatch,
  type NetGLCall,
  type NetGLFrameEnd,
  type NetGLPortOpenMessage,
  type NetGLStreamItem
} from './messages'
import type { ColorRGB, PortalAnchor } from './portal-types'
import { makeNetGLRecorderSession } from './recorder'
import type { NetGLTransport } from './renderer'
import { windowTransport } from './window-transport'

/**
 * Outbound handshake: guest announces its anchor + background. Re-sent every
 * READY_RESEND_MS until the host answers with `netgl:ready-ack` — the guest
 * iframe's script can run before the host page has attached its listener,
 * and a single missed announcement would leave the host drawing no door at
 * all while guest frames stream in unused.
 */
export type NetGLReadyMessage = {
  type: 'netgl:ready'
  anchor: PortalAnchor
  background: ColorRGB
  /**
   * The highest wire version the guest speaks (absent: 1). 2: it sends
   * `netgl:batch` once the host's ack says 2 as well.
   */
  wire?: number
  /**
   * Wire 2: the guest takes a MessageChannel port for its stream.
   * `'stream'`: it sends over the port and keeps hearing the host on the
   * window. `'all'`: the host's messages may come over the port as well
   * (the app listens through `guest.transport`).
   */
  port?: 'stream' | 'all'
  /** Stream items the guest had posted on the window when it sent this. */
  seq?: number
  /** Random per guest page load: tells a reload from a repeated announcement. */
  session?: string
}

export type NetGLGuestContextConfig = {
  /**
   * Canvas to create the shadow context on. Pass the framework's own
   * canvas when the framework reads its drawing-buffer size from the
   * context (Cesium does: `gl.drawingBufferWidth`), so the shadow tracks
   * the framework's resizes. Defaults to a detached 1×1
   * `HTMLCanvasElement` — detached rather than `OffscreenCanvas` because
   * frameworks write `canvas.style` on resize.
   */
  canvas?: HTMLCanvasElement | OffscreenCanvas
  /** Forwarded to `getContext('webgl2', ...)`. */
  contextAttributes?: WebGLContextAttributes
  /** Defaults to postMessage to/from `parent`. */
  transport?: NetGLTransport
  /**
   * Emit a state checkpoint after every frame-end (and once at startup).
   * Default true. Turn off only for a guest that already resets its
   * framework's state cache every frame (the three.js guest does).
   */
  checkpoints?: boolean
  /**
   * Where the checkpoint's scalar state comes from (see
   * `NetGLRecorderSessionOptions`). Default `'tracked'`: no synchronous
   * calls on the shadow per frame. Pass `'queried'` if you set GL state on
   * `shadow` directly.
   */
  scalarState?: 'tracked' | 'queried'
  /**
   * Wire 2's MessageChannel (see `NetGLReadyMessage.port`). Default
   * `'stream'`: take the host's port, if it offers one, for everything this
   * context sends (the call stream, and what the app posts through
   * `transport`), and keep hearing the host on the transport given.
   * `'all'`: also let the host send its messages over the port; only for an
   * app that listens through this context's `transport` rather than the
   * one it passed in. `false`: no port (batches still go on the transport).
   */
  messageChannel?: 'stream' | 'all' | false
  /** Highest wire version to offer. Default 2; 1 posts one message per call. */
  wire?: 1 | 2
}

/** What the guest and its host agreed on, from the ready handshake. */
export type NetGLGuestWire = {
  /** 1 until a host's ack says 2. */
  readonly version: number
  /** Whether the stream goes over the host's MessageChannel. */
  readonly port: boolean
  /** Batches sent (wire 2). */
  readonly batches: number
}

export type NetGLGuestContext = {
  /** Recorder Proxy — the context the framework should render with. */
  gl: WebGL2RenderingContext
  /**
   * The underlying shadow context. Don't render with it directly. Reading
   * from it is fine; a state call on it (enable, blendFunc, viewport, ...)
   * isn't seen by the tracked checkpoint (`scalarState`).
   */
  shadow: WebGL2RenderingContext
  /**
   * The transport to the host, as the app should use it for its own
   * messages: posts go the stream's way (over the host's port once there
   * is one, in order after the calls already sent), and listeners hear the
   * transport given and the port.
   */
  transport: NetGLTransport
  /** The negotiated wire. */
  readonly wire: NetGLGuestWire
  /**
   * Mark the end of a frame: posts frame-end, then a checkpoint (when the
   * context was made with `checkpoints`). `{ checkpoint: false }` posts
   * the frame-end alone: the next frame then replays from whatever state
   * the host left, so use it only where the host doesn't touch the shared
   * context between the guest's frames, or the guest resets its own state
   * cache.
   */
  endFrame(options?: NetGLEndFrameOptions): void
  /**
   * Mark the end of a sub-frame: one of several draws of the guest inside
   * a single host frame, such as one per depth frustum of a Cesium frame.
   * Posts frame-end, as `endFrame()` does, and defers the checkpoint to
   * just before the guest's next GL call. Same calls, same state on the
   * receiver; with `makeNetGLImmediateLink` the next call comes inside the
   * host's next `link.frame()`, so the checkpoint replays there directly
   * rather than being cloned into the link's queue. Works across host
   * frames too: a guest drawn only in sub-frames can call it every time.
   */
  subFrame(): void
  /** Post the `netgl:ready` handshake. */
  announce(anchor: PortalAnchor, background?: ColorRGB): void
}

export type NetGLEndFrameOptions = {
  /**
   * Post the state checkpoint after the frame-end. Default true (when the
   * context has `checkpoints`).
   */
  checkpoint?: boolean
}

/** Host → guest: the `netgl:ready` handshake arrived. */
export type NetGLReadyAckMessage = {
  type: 'netgl:ready-ack'
  /** The wire the host will read: min(its own, the guest's). Absent: 1. */
  wire?: number
  /** Echo of the ready's `seq`. */
  seq?: number
  /** Wire 2: a MessageChannel port for the stream, transferred with this message. */
  port?: MessagePort
}

const READY_RESEND_MS = 500

export const makeNetGLGuestContext = (config: NetGLGuestContextConfig = {}): NetGLGuestContext => {
  const {
    canvas = defaultShadowCanvas(),
    contextAttributes = { antialias: false, stencil: true, depth: true },
    checkpoints = true
  } = config
  const base: NetGLTransport =
    config.transport ?? windowTransport({ output: parent, inputFilter: parent })
  const offerWire = config.wire ?? NETGL_WIRE_VERSION
  const portMode = config.messageChannel ?? 'stream'
  const session = Math.random().toString(36).slice(2) + Date.now().toString(36)

  const shadow = (canvas as HTMLCanvasElement).getContext('webgl2', contextAttributes) as WebGL2RenderingContext | null
  if (!shadow) throw new Error('makeNetGLGuestContext: failed to create WebGL2 shadow context')

  // The wire. Until the host's ack says 2, every item goes out alone, as
  // wire 1 has it; after, items queue and go as one batch per frame-end.
  let version = 1
  let port: MessagePort | null = null
  let batches = 0
  // Stream items posted on `base`: counted so that the host, after the
  // switch to the port, can wait for the ones still in flight on the window.
  let windowItems = 0
  let queue: NetGLStreamItem[] = []
  let queueTransfer: Transferable[] = []

  const flush = (): void => {
    if (queue.length === 0) return
    const msg: NetGLBatch = { type: 'netgl:batch', batch: queue }
    const transfer = queueTransfer
    queue = []
    queueTransfer = []
    batches += 1
    if (port) {
      port.postMessage(msg, transfer)
    } else {
      windowItems += msg.batch.length
      base.post(msg, transfer)
    }
  }

  const postItem = (item: NetGLStreamItem, transfer?: Transferable[], urgent?: boolean): void => {
    if (version < 2) {
      windowItems += 1
      base.post(item, transfer)
      return
    }
    // An app object that must be serialised before the call returns (an
    // ImageBitmap the app may close): it goes now, in a batch of its own,
    // so if it can't be cloned (a tainted bitmap) only that call is lost.
    if (urgent) flush()
    queue.push(item)
    if (transfer) queueTransfer.push(...transfer)
    if (urgent) flush()
  }

  // No checkpoints: nothing to track for ('queried' makes no calls until a
  // checkpoint is taken, and none is).
  const recorder = makeNetGLRecorderSession(shadow, (call: NetGLCall, transfer, urgent) => postItem(call, transfer, urgent), {
    scalarState: checkpoints ? config.scalarState : 'queried'
  })

  // Inbound: the app's listeners hear the transport given and, once open,
  // the port (`'all'`).
  const listeners = new Set<(msg: unknown) => void>()
  const transport: NetGLTransport = {
    post(msg, transfer) {
      if (isNetGLCall(msg) || isNetGLFrameEnd(msg)) {
        postItem(msg, transfer)
        if (isNetGLFrameEnd(msg)) flush()
        return
      }
      if (port) port.postMessage(msg, transfer ?? [])
      else base.post(msg, transfer)
    },
    onMessage(listener) {
      listeners.add(listener)
      const off = base.onMessage(listener)
      return () => {
        listeners.delete(listener)
        off()
      }
    }
  }

  const openPort = (p: MessagePort, seq: number): void => {
    port = p
    if (portMode === 'all') {
      p.onmessage = (ev: MessageEvent) => {
        const data = ev.data as unknown
        if (!data || typeof data !== 'object') return
        for (const l of [...listeners]) l(data)
      }
    }
    const open: NetGLPortOpenMessage = { type: 'netgl:port', seq, after: windowItems }
    p.postMessage(open)
  }

  // The host's ack settles the wire, once per page load.
  let negotiated = false
  const onAck = (msg: unknown): boolean => {
    if ((msg as { type?: unknown }).type !== 'netgl:ready-ack') return false
    if (negotiated) return true
    negotiated = true
    const ack = msg as NetGLReadyAckMessage
    const agreed = Math.min(offerWire, typeof ack.wire === 'number' ? ack.wire : 1)
    if (agreed >= 2) {
      version = 2
      // From here a call may wait in the queue until the frame ends, so its
      // arrays are copied when it's recorded.
      recorder.snapshot = true
      const p = ack.port
      if (portMode !== false && p && typeof (p as MessagePort).postMessage === 'function') {
        openPort(p, typeof ack.seq === 'number' ? ack.seq : 0)
      } else {
        p?.close?.()
      }
    } else {
      ack.port?.close?.()
    }
    return true
  }

  // Initial checkpoint: pins the receiver to GL defaults before the
  // framework's first calls, so batch 1 doesn't inherit host state either.
  if (checkpoints) recorder.checkpoint()

  return {
    gl: recorder.gl,
    shadow,
    transport,
    wire: {
      get version() {
        return version
      },
      get port() {
        return port !== null
      },
      get batches() {
        return batches
      }
    },
    endFrame(options = {}) {
      const frameEnd: NetGLFrameEnd = { type: 'netgl:frame-end' }
      postItem(frameEnd)
      flush()
      // The checkpoint starts the next frame: in wire 2 it waits in the
      // queue and leads the next batch.
      if (checkpoints && options.checkpoint !== false) recorder.checkpoint()
    },
    subFrame() {
      const frameEnd: NetGLFrameEnd = { type: 'netgl:frame-end' }
      postItem(frameEnd)
      flush()
      if (checkpoints) recorder.deferCheckpoint()
    },
    announce(anchor, background = { r: 0, g: 0, b: 0 }) {
      const ready = (): NetGLReadyMessage => {
        const msg: NetGLReadyMessage = { type: 'netgl:ready', anchor, background }
        if (offerWire >= 2) {
          msg.wire = offerWire
          msg.seq = windowItems
          msg.session = session
          if (portMode !== false && typeof MessageChannel !== 'undefined') msg.port = portMode
        }
        return msg
      }
      // Listen first: a same-page link acks synchronously, inside the post.
      let timer: ReturnType<typeof setInterval> | null = null
      let acked = false
      const unsubscribe = base.onMessage((msg) => {
        if (!onAck(msg)) return
        acked = true
        if (timer) clearInterval(timer)
        unsubscribeLater()
      })
      let unsubscribed = false
      function unsubscribeLater(): void {
        if (unsubscribed) return
        unsubscribed = true
        // Not inside the listener's own dispatch.
        queueMicrotask(unsubscribe)
      }
      base.post(ready())
      if (!acked) timer = setInterval(() => base.post(ready()), READY_RESEND_MS)
    }
  }
}

const defaultShadowCanvas = (): HTMLCanvasElement => {
  const c = document.createElement('canvas')
  c.width = 1
  c.height = 1
  return c
}
