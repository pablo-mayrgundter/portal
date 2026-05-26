// Guest-side factory: wraps the boilerplate that turns a THREE.Scene into a
// NetGL portal target. The caller supplies the scene and an anchor; the
// factory owns everything else — shadow GL context, transport, NetGLRenderer,
// stencil-test application, ready handshake, setPose handling, oblique
// near-plane clip, frame-end emission.
//
// Shape matches `makeIframeTarget` in `@portal/portal-iframe` so adopters
// who already have an iframe-portal target can swap one for the other with
// the same call site:
//
//   const target = makeNetGLPortalTarget({ scene, anchor })
//   target.start()
//
// What the caller is responsible for:
//   - Building a THREE.Scene with the geometry/materials/lights they want.
//   - Declaring a PortalAnchor describing where the door sits in that scene.
//   - (Optional) a per-frame `tick(time)` hook for animation.
//
// What the factory does NOT do:
//   - Drive its own RAF loop. Renders happen in response to inbound
//     `netgl:setPose` messages from the host; one inbound message = one
//     render + one frame-end. If the caller wants a free-running animation,
//     `tick` is the hook.

import * as THREE from 'three'
import type {
  ColorRGB,
  Mat4,
  PortalAnchor,
  PortalPose,
  Viewport
} from '@portal/portal-core'
import { windowTransport } from '@portal/portal-iframe'
import { applyObliqueClipFromAnchor, applyPortalStencilTest } from '@portal/portal-three'
import type { NetGLFrameEnd } from './messages'
import type { NetGLTransport } from './renderer'
import { createNetGLRenderer } from './renderer'

/** Inbound message: host asks the target to render from a given pose. */
type SetPoseMessage = {
  type: 'netgl:setPose'
  pose: PortalPose
  projection: Mat4
  viewport: Viewport
  time: number
}

/** Outbound handshake: target announces its anchor + background to the host. */
type ReadyMessage = {
  type: 'netgl:ready'
  anchor: PortalAnchor
  background: ColorRGB
}

export type NetGLPortalTargetConfig = {
  /** Scene to render. Portal-stencil-test + background suppression applied automatically. */
  scene: THREE.Scene
  /** Where the door sits in this scene. Shipped to the host on `netgl:ready`. */
  anchor: PortalAnchor
  /**
   * Background color the host fills the stencil mask with (so pre-first-frame
   * pixels match this scene's atmosphere). Defaults to `scene.background`
   * when it's a THREE.Color; otherwise opaque black.
   */
  background?: ColorRGB
  /** Per-frame animation hook. Called right before the render, with `msg.time`. */
  tick?: (time: number) => void
  /**
   * Where to post NetGL messages. Defaults to `parent` (the iframe-in-host
   * case). Set explicitly when the target is hosted in a worker or a
   * different window topology.
   */
  outputTarget?: Window
  /**
   * Filter inbound messages to those whose `event.source` matches this.
   * Defaults to `parent`. Set to `null` to accept any source (dev only).
   */
  inputFilter?: MessageEventSource | null
  /**
   * Override the transport. When supplied, replaces the default
   * `windowTransport` built from `outputTarget`/`inputFilter`. Lets a
   * worker-hosted target (or any non-window transport) plug in.
   */
  transport?: NetGLTransport
  /**
   * Override the camera. Defaults to a fresh `PerspectiveCamera(70, 1, 0.02, 200)`.
   * The factory writes `position`, `quaternion`/`up`, and `projectionMatrix`
   * from each inbound setPose, then applies an oblique near-plane clip
   * aligned with the portal anchor. Pass your own camera if you need to
   * reuse a scene-graph camera the rest of your app already drives.
   */
  camera?: THREE.PerspectiveCamera
  /**
   * Three renderer parameters. Defaults are `{ antialias: false, stencil: true,
   * depth: true, preserveDrawingBuffer: false }` — matched to the host-side
   * compositor's expectations. `outputColorSpace`/`toneMapping`/`autoClear`
   * are forced by the factory regardless.
   */
  rendererParams?: THREE.WebGLRendererParameters
}

export type NetGLPortalTarget = {
  /** Start listening for setPose; emit the ready handshake. Idempotent. */
  start(): void
  /** Stop listening; further setPose messages are ignored. Idempotent. */
  stop(): void
  /** The underlying THREE.WebGLRenderer (a NetGLRenderer). For introspection only. */
  getRenderer(): THREE.WebGLRenderer
  /** The camera the factory drives in response to setPose. */
  getCamera(): THREE.PerspectiveCamera
}

const colorFromBackground = (scene: THREE.Scene): ColorRGB => {
  if (scene.background instanceof THREE.Color) {
    return { r: scene.background.r, g: scene.background.g, b: scene.background.b }
  }
  return { r: 0, g: 0, b: 0 }
}

export const makeNetGLPortalTarget = (
  config: NetGLPortalTargetConfig
): NetGLPortalTarget => {
  const {
    scene,
    anchor,
    background = colorFromBackground(scene),
    tick,
    outputTarget = parent,
    inputFilter = parent as unknown as MessageEventSource | null,
    transport: transportOverride,
    camera = new THREE.PerspectiveCamera(70, 1, 0.02, 200),
    rendererParams = {
      antialias: false,
      stencil: true,
      depth: true,
      preserveDrawingBuffer: false
    }
  } = config

  // worldB materials stencil-test against ref=1, the value the host's stencil
  // mask wrote inside the door region. Combined with autoClear=false and
  // writing into the host's default framebuffer (render target = null), the
  // guest's draws compose into the host's canvas through the stencil hole.
  // Suppress the scene background so it doesn't paint over the door area on
  // the host's canvas — only the stenciled geometry should contribute.
  applyPortalStencilTest(scene)
  scene.background = null

  // Shadow context: a 1×1 OffscreenCanvas. Three queries this for sync return
  // values + handle minting; the calls also ship over the transport to the
  // host where they execute against the real canvas.
  const shadowCanvas = new OffscreenCanvas(1, 1)
  const shadow = shadowCanvas.getContext('webgl2', rendererParams) as WebGL2RenderingContext | null
  if (!shadow) throw new Error('makeNetGLPortalTarget: failed to create WebGL2 shadow context')

  const transport: NetGLTransport =
    transportOverride ?? (windowTransport({ output: outputTarget, inputFilter }) as unknown as NetGLTransport)

  const renderer = createNetGLRenderer({
    shadow,
    transport,
    ...rendererParams
  })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping
  // Critical: don't clear the host's canvas. The host has already drawn its
  // own scene + painted the stencil mask + clearDepth'd inside the door
  // region. Clearing here would wipe all of it.
  renderer.autoClear = false

  let unsubscribe: (() => void) | null = null
  let started = false

  const lookTarget = new THREE.Vector3()

  const handleSetPose = (msg: SetPoseMessage): void => {
    if (tick) tick(msg.time)

    camera.position.set(msg.pose.position[0], msg.pose.position[1], msg.pose.position[2])
    if (msg.pose.up) camera.up.set(msg.pose.up[0], msg.pose.up[1], msg.pose.up[2])
    if (msg.pose.forward) {
      lookTarget.set(
        msg.pose.position[0] + msg.pose.forward[0],
        msg.pose.position[1] + msg.pose.forward[1],
        msg.pose.position[2] + msg.pose.forward[2]
      )
      camera.lookAt(lookTarget)
    }
    // Belt-and-braces: three.WebGLRenderer.render() also updates these, but
    // we mirror what makeIframeTarget does explicitly to keep behaviour
    // identical between iframe-demo and netgl-demo.
    camera.updateMatrixWorld(true)
    camera.matrixWorldInverse.copy(camera.matrixWorld).invert()

    // Use the host's projection matrix verbatim — FOV, aspect, near/far all
    // match what the host is composing against.
    camera.projectionMatrix.fromArray(msg.projection as readonly number[])
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()

    // Oblique near-plane clip aligned with the portal: cull any geometry on
    // the CAMERA side of the portal plane at rasterise time. Without this,
    // geometry between the camera and the door renders and occludes the
    // (correct) geometry on the far side — visible as near-side content
    // showing through the door even though geometrically it shouldn't. The
    // host's stencil-mask handles the screen-space halfspace test; this
    // handles the world-space plane clip.
    applyObliqueClipFromAnchor(camera, anchor)
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()

    renderer.setSize(msg.viewport.width, msg.viewport.height, false)

    // Force three to re-issue every GL state call instead of skipping
    // anything it considers "already set". The host's own renderer mutates
    // the shared GL context between our frames; our renderer's per-instance
    // WebGLState cache thinks the context is in the state we left it in,
    // and would otherwise omit a redundant gl.useProgram / gl.enable / etc.
    // — leading to mismatches like "uniform3f: location is not from the
    // associated program" when our uniform calls assume a useProgram we
    // never re-emitted.
    renderer.resetState()
    renderer.render(scene, camera)

    // Frame-end so the host can replay our calls as one atomic batch (no
    // host-side renders interleaving with our useProgram / uniform pairs).
    const frameEnd: NetGLFrameEnd = { type: 'netgl:frame-end' }
    transport.post(frameEnd)
  }

  const onMessage = (m: unknown): void => {
    const data = m as { type?: string }
    if (data?.type === 'netgl:setPose') {
      handleSetPose(m as SetPoseMessage)
    }
  }

  return {
    start() {
      if (started) return
      started = true
      unsubscribe = transport.onMessage(onMessage)
      const ready: ReadyMessage = { type: 'netgl:ready', anchor, background }
      transport.post(ready)
    },
    stop() {
      if (!started) return
      started = false
      unsubscribe?.()
      unsubscribe = null
    },
    getRenderer() {
      return renderer
    },
    getCamera() {
      return camera
    }
  }
}
