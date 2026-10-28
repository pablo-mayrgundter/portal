// Cesium guest shim — "Cesium′".
//
// Cesium has no public way to hand it a pre-made WebGL context, but its
// `ContextOptions` carries a `getWebGLStub(canvas, webglOptions)` hook
// (meant for Cesium's own unit tests) that it calls INSTEAD of
// `canvas.getContext(...)`. We return a NetGL recorder whose shadow context
// lives on Cesium's own canvas — so `gl.drawingBufferWidth`, `gl.canvas`,
// resize, and pixel readback (picking, `pickPosition`-driven camera
// collision) all behave as they would unshimmed.
//
// Frame boundaries come from `scene.postRender`. That's the whole shim:
// no state-cache reset (the checkpoint handles it), no stencil or clear
// handling (the host's replay `screen` policy handles it). Each frame-end
// carries what a reprojecting host needs (`cesiumFrameEnd`, RFC 0003 §4):
// the framebuffers Cesium drew its scene into, which stand for the screen,
// and the view and projection it drew with, for a one-frustum frame.
//
// Adoption, in the embedded Cesium app:
//
//   const guest = makeNetGLCesiumGuest()
//   const viewer = new Cesium.Viewer('cesiumContainer', {
//     contextOptions: guest.contextOptions,
//     ...
//   })
//   guest.attach(viewer.scene)
//
// Cesium is not imported: the shim is typed structurally against the few
// members it touches, so it works with whatever Cesium version the app
// bundles.

import { makeNetGLGuestContext, type NetGLEndFrameOptions, type NetGLGuestContext } from '../guest-context'
import type { ColorRGB, PortalAnchor } from '../portal-types'
import type { NetGLTransport } from '../renderer'
import { windowTransport } from '../window-transport'

/** A Cesium `Framebuffer`: the WebGL framebuffer it wraps. */
type CesiumFramebufferLike = { _framebuffer?: object } | undefined

/**
 * The slice of `Cesium.Scene` the shim uses. All but `postRender` are
 * optional: without them the frame-end carries no reprojection metadata.
 */
export type CesiumSceneLike = {
  postRender: { addEventListener(listener: () => void): () => void }
  camera?: {
    viewMatrix: ArrayLike<number>
    frustum: { clone(): { near: number; far: number; projectionMatrix: ArrayLike<number> } }
  }
  frustumCommandsList?: ArrayLike<{ near: number; far: number }>
  /** Cesium's private view: where its scene framebuffers live. */
  _view?: {
    sceneFramebuffer?: { framebuffer?: CesiumFramebufferLike }
    globeDepth?: { framebuffer?: CesiumFramebufferLike }
  }
}

/**
 * What a Cesium frame's frame-end carries for a reprojecting host, read
 * after the scene rendered (in `postRender`):
 *   - `screenTargets`: the framebuffers Cesium drew the scene into before
 *     copying them to the screen, the globe-depth and scene framebuffers
 *     (`scene._view`; a public accessor in Cesium would replace the private
 *     read, RFC 0003 Q4). Not the pick, OIT or FXAA buffers.
 *   - `viewMatrix`, `projectionMatrix`: the camera's view and the
 *     projection Cesium drew with, its frustum with the near and far of its
 *     one frustum. Left out for a frame with several frusta, whose depth
 *     mapping differs per frustum (RFC 0003 §4.3).
 * Merge it into the options of `core.endFrame()` in an app that ends its
 * own frames; `attach()` does it for its own.
 */
export const cesiumFrameEnd = (
  scene: CesiumSceneLike
): Pick<NetGLEndFrameOptions, 'screenTargets' | 'viewMatrix' | 'projectionMatrix'> => {
  const out: Pick<NetGLEndFrameOptions, 'screenTargets' | 'viewMatrix' | 'projectionMatrix'> = {}
  const view = scene._view
  if (view) {
    out.screenTargets = [view.globeDepth?.framebuffer?._framebuffer, view.sceneFramebuffer?.framebuffer?._framebuffer].filter(
      (fb): fb is object => !!fb
    )
  }
  const frusta = scene.frustumCommandsList
  if (scene.camera && frusta && frusta.length === 1) {
    const frustum = scene.camera.frustum.clone()
    frustum.near = frusta[0].near
    frustum.far = frusta[0].far
    out.viewMatrix = Array.from(scene.camera.viewMatrix)
    out.projectionMatrix = Array.from(frustum.projectionMatrix)
  }
  return out
}

/** The slice of Cesium's `ContextOptions` the shim produces. */
export type CesiumContextOptions = {
  webgl: WebGLContextAttributes
  getWebGLStub: (canvas: HTMLCanvasElement, webglOptions: WebGLContextAttributes) => WebGL2RenderingContext
  allowTextureFilterAnisotropic?: boolean
  requestWebgl1?: boolean
}

export type NetGLCesiumGuestConfig = {
  /** Defaults to postMessage to/from `parent`. */
  transport?: NetGLTransport
  /**
   * WebGL attributes for the shadow context. Merged over Cesium's own
   * defaults (`alpha: false, stencil: true`). `antialias` defaults to
   * false: the receiver is the host's canvas, whose attributes are the
   * host's business; the shadow only needs to answer queries.
   */
  webgl?: WebGLContextAttributes
  /**
   * Door anchor + background announced on `netgl:ready`. Defaults to a
   * 2×2 door at the origin facing -Z, black background. Hosts that don't
   * couple poses through a door (e.g. Earth-in-scene composition) ignore
   * the anchor.
   */
  anchor?: PortalAnchor
  background?: ColorRGB
  /** Inbound control messages from the host (e.g. `netgl:setPose`). */
  onMessage?: (msg: unknown) => void
  /**
   * Where the checkpoint's scalar state comes from. Default `'tracked'`
   * (no synchronous calls on the shadow per frame); `'queried'` if the app
   * sets GL state on `core.shadow` directly. See `makeNetGLGuestContext`.
   */
  scalarState?: 'tracked' | 'queried'
  /**
   * Default true. `false` keeps Cesium's draws and clears off the shadow
   * (they still ship), so the globe is drawn once, by the host's replay.
   * Only for an app that never reads Cesium's pixels back: picking,
   * `pickPosition` and the default inputs' depth-picked camera collision
   * read the shadow, and would get nothing. CPU picks on loaded tiles
   * (`globe.getHeight`, `tileset.getHeight`) don't read it. See
   * `makeNetGLGuestContext`.
   */
  shadowDraws?: boolean
}

export type NetGLCesiumGuest = {
  /** Pass as `contextOptions` to `Cesium.Viewer` / `CesiumWidget` / `Scene`. */
  contextOptions: CesiumContextOptions
  /**
   * Hook frame boundaries and announce readiness. Call once, after the
   * Viewer/Widget/Scene is constructed with `contextOptions`.
   */
  attach(scene: CesiumSceneLike): void
  /** The guest core, available once Cesium has created its context. */
  readonly core: NetGLGuestContext | null
  /** Unhook frame boundaries and inbound messages. Idempotent. */
  stop(): void
}

const DEFAULT_ANCHOR: PortalAnchor = {
  position: [0, 0, 0],
  normal: [0, 0, -1],
  up: [0, 1, 0],
  halfWidth: 1,
  halfHeight: 1
}

export const makeNetGLCesiumGuest = (config: NetGLCesiumGuestConfig = {}): NetGLCesiumGuest => {
  const transport = config.transport ?? windowTransport({ output: parent, inputFilter: parent })
  let core: NetGLGuestContext | null = null
  const unsubscribers: Array<() => void> = []

  if (config.onMessage) unsubscribers.push(transport.onMessage(config.onMessage))

  const webgl: WebGLContextAttributes = {
    alpha: false,
    stencil: true,
    depth: true,
    antialias: false,
    ...config.webgl
  }

  const contextOptions: CesiumContextOptions = {
    webgl,
    getWebGLStub: (canvas, webglOptions) => {
      if (core) throw new Error('makeNetGLCesiumGuest: contextOptions reused for a second Cesium context')
      core = makeNetGLGuestContext({
        canvas,
        contextAttributes: webglOptions,
        transport,
        scalarState: config.scalarState,
        shadowDraws: config.shadowDraws
      })
      return core.gl
    }
  }

  return {
    contextOptions,
    get core() {
      return core
    },
    attach(scene) {
      if (!core) {
        throw new Error('makeNetGLCesiumGuest: attach() before Cesium created its context — pass guest.contextOptions to the Viewer/Scene first')
      }
      const c = core
      unsubscribers.push(scene.postRender.addEventListener(() => c.endFrame(cesiumFrameEnd(scene))))
      c.announce(config.anchor ?? DEFAULT_ANCHOR, config.background)
    },
    stop() {
      while (unsubscribers.length) unsubscribers.pop()!()
    }
  }
}
