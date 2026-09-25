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

/** Outbound handshake: guest announces its anchor + background. */
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
}

export type NetGLGuestContext = {
  /** Recorder Proxy — the context the framework should render with. */
  gl: WebGL2RenderingContext
  /** The underlying shadow context. Don't render with it directly. */
  shadow: WebGL2RenderingContext
  transport: NetGLTransport
  /** Mark the end of a frame: posts frame-end, then a checkpoint. */
  endFrame(): void
  /** Post the `netgl:ready` handshake. */
  announce(anchor: PortalAnchor, background?: ColorRGB): void
}

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

  const session = makeNetGLRecorderSession(shadow, (call: NetGLCall) => transport.post(call))

  // Initial checkpoint: pins the receiver to GL defaults before the
  // framework's first calls, so batch 1 doesn't inherit host state either.
  if (checkpoints) session.checkpoint()

  return {
    gl: session.gl,
    shadow,
    transport,
    endFrame() {
      const frameEnd: NetGLFrameEnd = { type: 'netgl:frame-end' }
      transport.post(frameEnd)
      if (checkpoints) session.checkpoint()
    },
    announce(anchor, background = { r: 0, g: 0, b: 0 }) {
      const ready: NetGLReadyMessage = { type: 'netgl:ready', anchor, background }
      transport.post(ready)
    }
  }
}

const defaultShadowCanvas = (): HTMLCanvasElement => {
  const c = document.createElement('canvas')
  c.width = 1
  c.height = 1
  return c
}
