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

import type { NetGLCall, NetGLFrameEnd } from './messages'
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
  transport: NetGLTransport
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
export type NetGLReadyAckMessage = { type: 'netgl:ready-ack' }

const READY_RESEND_MS = 500

export const makeNetGLGuestContext = (config: NetGLGuestContextConfig = {}): NetGLGuestContext => {
  const {
    canvas = defaultShadowCanvas(),
    contextAttributes = { antialias: false, stencil: true, depth: true },
    checkpoints = true
  } = config
  const transport: NetGLTransport =
    config.transport ?? windowTransport({ output: parent, inputFilter: parent })

  const shadow = (canvas as HTMLCanvasElement).getContext('webgl2', contextAttributes) as WebGL2RenderingContext | null
  if (!shadow) throw new Error('makeNetGLGuestContext: failed to create WebGL2 shadow context')

  // No checkpoints: nothing to track for ('queried' makes no calls until a
  // checkpoint is taken, and none is).
  const session = makeNetGLRecorderSession(shadow, (call: NetGLCall) => transport.post(call), {
    scalarState: checkpoints ? config.scalarState : 'queried'
  })

  // Initial checkpoint: pins the receiver to GL defaults before the
  // framework's first calls, so batch 1 doesn't inherit host state either.
  if (checkpoints) session.checkpoint()

  return {
    gl: session.gl,
    shadow,
    transport,
    endFrame(options = {}) {
      const frameEnd: NetGLFrameEnd = { type: 'netgl:frame-end' }
      transport.post(frameEnd)
      if (checkpoints && options.checkpoint !== false) session.checkpoint()
    },
    subFrame() {
      const frameEnd: NetGLFrameEnd = { type: 'netgl:frame-end' }
      transport.post(frameEnd)
      if (checkpoints) session.deferCheckpoint()
    },
    announce(anchor, background = { r: 0, g: 0, b: 0 }) {
      const ready: NetGLReadyMessage = { type: 'netgl:ready', anchor, background }
      transport.post(ready)
      const timer = setInterval(() => transport.post(ready), READY_RESEND_MS)
      const unsubscribe = transport.onMessage((msg) => {
        if ((msg as { type?: unknown }).type !== 'netgl:ready-ack') return
        clearInterval(timer)
        unsubscribe()
      })
    }
  }
}

const defaultShadowCanvas = (): HTMLCanvasElement => {
  const c = document.createElement('canvas')
  c.width = 1
  c.height = 1
  return c
}
