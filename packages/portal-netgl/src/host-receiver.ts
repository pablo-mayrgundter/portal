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
// After `drain()` the GL context holds guest state; the host must reset its
// own framework's state cache (three: `renderer.resetState()`).

import { isNetGLCall, isNetGLFrameEnd, type NetGLCall } from './messages'
import type { NetGLReadyMessage } from './guest-context'
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
}

export type NetGLHostReceiver = {
  /** The guest's handshake, once received. */
  readonly ready: NetGLReadyMessage | null
  /** Whether at least one complete guest frame has arrived. */
  readonly hasFrame: boolean
  /**
   * Replay the pending guest frame(s), or re-run the last one if none is
   * pending and the last one is safe to re-run (see the buffering rules
   * above). Returns true if anything was replayed.
   */
  drain(): boolean
  /** The underlying replay (for its `invalidate()` or direct use). */
  replay: NetGLReplay
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

  let unsubscribe: (() => void) | null = config.transport.onMessage((msg) => {
    if (isNetGLCall(msg)) {
      inFlight.push(msg)
      return
    }
    if (isNetGLFrameEnd(msg)) {
      if (pending) pending.push(...inFlight)
      else pending = inFlight
      inFlight = []
      return
    }
    const typed = msg as { type?: unknown }
    if (typed.type === 'netgl:ready') {
      ready = msg as NetGLReadyMessage
      config.onReady?.(ready)
      return
    }
    config.onControl?.(msg)
  })

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
    replay,
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
    }
  }
}
