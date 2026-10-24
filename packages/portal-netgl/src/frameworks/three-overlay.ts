// three.js overlay guest: a three.js scene drawn over a host's frame, in the
// host's clip space, from the host's `layer:view` (camera, projection,
// viewport, time). For geometry that belongs in the host's world, such as
// satellites over a deck.gl globe: no clears, a transparent frame, and the
// host's depth to test against.
//
// What it handles:
//   - The camera. With `matrixAutoUpdate = false`, three ignores a set
//     `camera.matrix` unless `matrixWorldNeedsUpdate` is set too; the
//     helper sets both, from the view's rigid inverse in doubles.
//   - The projection: the host's own (with its huge far plane), so depth
//     agrees, and `projectionMatrixInverse` with it.
//   - Size: the shadow canvas is sized to the host's drawing buffer and the
//     viewport set in drawing-buffer pixels (pixel ratio 1), so the guest's
//     gl.viewport is the host's.
//   - No clears: `autoClear` off and no scene background, so deck's colour
//     and depth survive. Draw with depthTest on and depthWrite off to be
//     occluded by the host without occluding it.
//   - State: built on `makeNetGLGuestContext`, whose checkpoint keeps
//     three's state cache valid whatever the host does between frames, so
//     no `resetState()`.
//
// three isn't imported: pass your own `WebGLRenderer` constructor, scene
// and camera, so there is one copy of three.

import type * as THREE from 'three'
import { makeNetGLGuestContext, type NetGLGuestContext } from '../guest-context'
import { isNetGLLayerViewMessage, mat4InvertRigid, postLayerInvalidate, type NetGLLayerView } from '../layer-view'
import type { NetGLTransport } from '../renderer'

export type NetGLThreeOverlayGuestConfig = {
  /** Your three's `WebGLRenderer` constructor. */
  WebGLRenderer: typeof THREE.WebGLRenderer
  scene: THREE.Scene
  /** The camera to drive, e.g. `new THREE.PerspectiveCamera()`; its matrices are the view's. */
  camera: THREE.Camera
  /** The transport to the host: `parentTransport({ hostOrigins })` across origins, or a link's. */
  transport: NetGLTransport
  /** Canvas for the shadow context. Default: a detached canvas (see `makeNetGLGuestContext`). */
  canvas?: HTMLCanvasElement
  /** Extra `WebGLRenderer` parameters (`context` and `canvas` are the helper's). */
  rendererParams?: Omit<THREE.WebGLRendererParameters, 'context' | 'canvas'>
  /** Called with each view before the frame renders: update the scene for `view.timeMs`. */
  onView?: (view: NetGLLayerView) => void
}

export type NetGLThreeOverlayGuest = {
  renderer: THREE.WebGLRenderer
  core: NetGLGuestContext
  /** The last view applied. */
  readonly view: NetGLLayerView | null
  /** Apply a view to the camera and renderer, without rendering. */
  applyView(view: NetGLLayerView): void
  /** Render one frame and end it; `viewId` (the `layer:view`'s) rides its frame-end. */
  render(viewId?: number): void
  /**
   * Announce readiness to the host and render one frame per inbound
   * `layer:view` (no requestAnimationFrame: a cross-origin iframe's rAF can
   * be throttled when it isn't visible, and the host owns the clock).
   */
  start(): void
  stop(): void
  /**
   * Tell the host the scene changed although the view didn't (data
   * arrived): it sends the view again, and the guest renders it.
   */
  invalidate(reason?: string): void
}

export const makeNetGLThreeOverlayGuest = (config: NetGLThreeOverlayGuestConfig): NetGLThreeOverlayGuest => {
  const { scene, camera, transport } = config
  // `'all'`: the overlay hears the host through `core.transport`, so the
  // host's views can come over the MessageChannel too.
  const core = makeNetGLGuestContext({ transport, canvas: config.canvas, messageChannel: 'all' })
  const renderer = new config.WebGLRenderer({
    antialias: false,
    alpha: true,
    ...config.rendererParams,
    context: core.gl,
    canvas: core.shadow.canvas as HTMLCanvasElement
  })
  renderer.autoClear = false
  renderer.setPixelRatio(1)
  scene.background = null
  camera.matrixAutoUpdate = false

  let view: NetGLLayerView | null = null
  let size: [number, number] = [0, 0]
  let unsubscribe: (() => void) | null = null

  const applyView = (v: NetGLLayerView): void => {
    view = v
    camera.matrix.fromArray(mat4InvertRigid(v.viewMatrix))
    // matrixAutoUpdate is off, so three recomposes matrixWorld (and the
    // camera's matrixWorldInverse) only when told.
    camera.matrixWorldNeedsUpdate = true
    camera.projectionMatrix.fromArray(v.projectionMatrix)
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()
    const [x, y, w, h] = v.viewport
    const bw = x + w
    const bh = y + h
    if (bw !== size[0] || bh !== size[1]) {
      renderer.setSize(bw, bh, false)
      size = [bw, bh]
    }
    renderer.setViewport(x, y, w, h)
  }

  const render = (viewId?: number): void => {
    renderer.render(scene, camera)
    core.endFrame(typeof viewId === 'number' ? { viewId } : {})
  }

  return {
    renderer,
    core,
    get view() {
      return view
    },
    applyView,
    render,
    start() {
      if (unsubscribe) return
      unsubscribe = core.transport.onMessage((msg) => {
        if (!isNetGLLayerViewMessage(msg)) return
        config.onView?.(msg.view)
        applyView(msg.view)
        render(msg.viewId)
      })
      core.announce({ position: [0, 0, 0], normal: [0, 0, 1], up: [0, 1, 0] })
    },
    stop() {
      unsubscribe?.()
      unsubscribe = null
    },
    invalidate(reason) {
      postLayerInvalidate(core.transport, reason)
    }
  }
}
