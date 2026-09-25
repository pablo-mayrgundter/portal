// Same-page NetGL: a guest framework and a host framework sharing one GL
// context in one page, with no iframe and no postMessage.
//
// The postMessage transports buffer a guest frame and replay it later, which
// costs a frame of latency — invisible through a door, but visible when the
// guest is composited in place (a Cesium Earth inside celestiary slides
// against its stencil while the camera moves). When both run in the same
// page, the host can instead call the guest's render synchronously at the
// point in its own frame where the guest's pixels belong, and have each GL
// call replay into the host context the moment it is recorded:
//
//   link.frame(() => cesiumWidget.render())   // inside celestiary's render
//
// Inside `frame()` the link is OPEN: calls execute immediately (no copy,
// no buffering; the recorder's arguments are still valid). Outside it —
// the checkpoint the guest emits right after its frame-end, and any GL
// work the guest framework does between frames (async resource loads) —
// the link is CLOSED: calls are cloned and queued, and flushed in order at
// the start of the next `frame()`. Cloning matters: frameworks reuse
// scratch typed arrays for uniforms, so a queued live reference would
// replay whatever was written last.
//
// The host must not touch the GL context from inside `frame()`, and must
// reset its own framework's state cache after it (three:
// `renderer.resetState()`), exactly as after a host-receiver `drain()`.

import { isNetGLCall, isNetGLFrameEnd, type NetGLCall } from './messages'
import type { NetGLReadyAckMessage, NetGLReadyMessage } from './guest-context'
import type { NetGLTransport } from './renderer'
import { makeNetGLReplay, type NetGLReplay, type NetGLReplayConfig } from './replay'

export type NetGLImmediateLinkConfig = {
  /** The host's GL context. */
  gl: WebGL2RenderingContext
  /** Replay config: viewport remap, screen policy, screenFramebuffer. */
  replay?: NetGLReplayConfig
  /** Called on the guest's `netgl:ready` handshake. */
  onReady?: (msg: NetGLReadyMessage) => void
  /** Any other message the guest posts. */
  onControl?: (msg: unknown) => void
  /** Replay errors, once per distinct message. Defaults to console.error. */
  onError?: (err: unknown) => void
}

export type NetGLImmediateLink = {
  /** Hand this to the guest (`makeNetGLGuestContext`, `makeNetGLCesiumGuest`). */
  transport: NetGLTransport
  /**
   * Run one guest frame at this point in the host's frame: flush calls
   * queued since the last frame, then replay each call as `render` makes
   * it. Closes on the guest's frame-end, or when `render` returns.
   */
  frame(render: () => void): void
  /** Post a message to the guest (the guest's `transport.onMessage`). */
  postToGuest(msg: unknown): void
  /** The guest's handshake, once received. */
  readonly ready: NetGLReadyMessage | null
  /** Calls waiting for the next frame. */
  readonly queued: number
  replay: NetGLReplay
}

export const makeNetGLImmediateLink = (config: NetGLImmediateLinkConfig): NetGLImmediateLink => {
  const replay = makeNetGLReplay(config.gl, config.replay)
  const onError = config.onError ?? ((err: unknown) => console.error('[netgl-link] replay error:', err))
  const seenErrors = new Set<string>()
  const guestListeners = new Set<(msg: unknown) => void>()
  let queue: NetGLCall[] = []
  let open = false
  let ready: NetGLReadyMessage | null = null

  const run = (call: NetGLCall): void => {
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

  const postToGuest = (msg: unknown): void => {
    for (const l of guestListeners) l(msg)
  }

  // The guest's side of the link.
  const transport: NetGLTransport = {
    post(msg) {
      if (isNetGLCall(msg)) {
        if (open) run(msg)
        else queue.push(structuredClone(msg))
        return
      }
      if (isNetGLFrameEnd(msg)) {
        open = false
        return
      }
      if ((msg as { type?: unknown }).type === 'netgl:ready') {
        const ack: NetGLReadyAckMessage = { type: 'netgl:ready-ack' }
        postToGuest(ack)
        if (!ready) {
          ready = msg as NetGLReadyMessage
          config.onReady?.(ready)
        }
        return
      }
      config.onControl?.(msg)
    },
    onMessage(listener) {
      guestListeners.add(listener)
      return () => guestListeners.delete(listener)
    }
  }

  return {
    transport,
    replay,
    postToGuest,
    get ready() {
      return ready
    },
    get queued() {
      return queue.length
    },
    frame(render) {
      replay.invalidate()
      const pending = queue
      queue = []
      for (const call of pending) run(call)
      open = true
      try {
        render()
      } finally {
        open = false
      }
    }
  }
}
