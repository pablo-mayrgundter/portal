import * as THREE from 'three'
import { PORTAL_STENCIL_REF } from '@portal/portal-three'
import type {
  ColorRGB,
  Mat4,
  PortalAnchor,
  PortalEndpoint,
  PortalFrameMessage,
  PortalMessage,
  PortalPose,
  PortalReadyMessage,
  PortalSetPoseMessage,
  Viewport
} from '@portal/portal-core'

// ---------------------------------------------------------------------------
// Depth packing: encode/decode a [0, 1] depth value across an RGBA texel so we
// can ship NDC depth as an ImageBitmap. Mirrors the classic three.js packing.
// ---------------------------------------------------------------------------

const depthPackVertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const depthPackFragmentShader = `
const float PackUpscale = 256.0 / 255.0;
const vec3 PackFactors = vec3(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0);
const vec3 ShiftRight8 = vec3(1.0/256.0);

vec4 packDepthToRGBA(float v) {
  vec4 r = vec4(fract(v * PackFactors), v);
  r.yzw -= r.xyz * ShiftRight8;
  return r * PackUpscale;
}

void main() {
  gl_FragColor = packDepthToRGBA(gl_FragCoord.z);
}
`

const unpackDepthGLSL = `
const float UnpackDownscale = 255.0 / 256.0;
const vec3 UnpackFactorsXYZ = vec3(
  1.0 / (256.0 * 256.0 * 256.0),
  1.0 / (256.0 * 256.0),
  1.0 / 256.0
);
const vec4 UnpackFactors = vec4(UnpackFactorsXYZ * UnpackDownscale, UnpackDownscale);

float unpackRGBAToDepth(vec4 v) {
  return dot(v, UnpackFactors);
}
`

// ---------------------------------------------------------------------------
// Iframe target side: receive setPose, render color + packed depth, post back.
// ---------------------------------------------------------------------------

export type IframeTargetConfig = {
  scene: THREE.Scene
  /** Pose data declaring where the destination portal sits in this scene. */
  anchor: PortalAnchor
  /** Background color the host should fill the stencil mask with. Defaults to scene.background. */
  background?: ColorRGB
  /** postMessage origin. '*' for development, an explicit origin in prod. */
  hostOrigin?: string
  /** Optional render hook called once per frame just before rendering (for animation). */
  tick?: (time: number) => void
  /** If true, log received pose + applied matrices once per second to console. */
  log?: boolean
}

export type IframeTarget = {
  start(): void
  stop(): void
}

const defaultBackground = (scene: THREE.Scene): ColorRGB => {
  if (scene.background instanceof THREE.Color) {
    return { r: scene.background.r, g: scene.background.g, b: scene.background.b }
  }
  return { r: 0, g: 0, b: 0 }
}

const matToArray = (m: THREE.Matrix4): Mat4 => Array.from(m.elements)

export const makeIframeTarget = (config: IframeTargetConfig): IframeTarget => {
  const camera = new THREE.PerspectiveCamera()
  const offscreen = new OffscreenCanvas(1, 1)
  const renderer = new THREE.WebGLRenderer({ canvas: offscreen, antialias: true })

  const depthMaterial = new THREE.ShaderMaterial({
    vertexShader: depthPackVertexShader,
    fragmentShader: depthPackFragmentShader
  })

  let pendingPose: PortalSetPoseMessage | null = null
  let raf = 0
  let running = false
  let lastLog = 0
  const lookTarget = new THREE.Vector3()
  const hostOrigin = config.hostOrigin ?? '*'
  const fmt = (a: ArrayLike<number>) =>
    `[${Array.from(a, (n) => n.toFixed(3)).join(', ')}]`

  const sendReady = (): void => {
    const msg: PortalReadyMessage = {
      type: 'portal:ready',
      anchor: config.anchor,
      background: config.background ?? defaultBackground(config.scene),
      viewport: { width: offscreen.width, height: offscreen.height }
    }
    parent.postMessage(msg, hostOrigin)
  }

  const onMessage = (ev: MessageEvent): void => {
    const msg = ev.data as PortalMessage
    if (!msg || typeof msg !== 'object') return
    if (msg.type === 'portal:setPose') pendingPose = msg
  }

  const renderFrame = (msg: PortalSetPoseMessage): void => {
    config.tick?.(msg.time)

    const { pose, projection, viewport } = msg

    if (offscreen.width !== viewport.width || offscreen.height !== viewport.height) {
      offscreen.width = viewport.width
      offscreen.height = viewport.height
      renderer.setSize(viewport.width, viewport.height, false)
    }

    camera.position.set(pose.position[0], pose.position[1], pose.position[2])
    if (pose.up) camera.up.set(pose.up[0], pose.up[1], pose.up[2])
    if (pose.forward) {
      lookTarget.set(
        pose.position[0] + pose.forward[0],
        pose.position[1] + pose.forward[1],
        pose.position[2] + pose.forward[2]
      )
      camera.lookAt(lookTarget)
    }
    camera.updateMatrixWorld(true)
    camera.matrixWorldInverse.copy(camera.matrixWorld).invert()

    camera.projectionMatrix.fromArray(projection)
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()

    // Color pass
    config.scene.overrideMaterial = null
    renderer.render(config.scene, camera)
    const colorBitmap = offscreen.transferToImageBitmap()

    // Depth-as-RGBA pass
    config.scene.overrideMaterial = depthMaterial
    renderer.render(config.scene, camera)
    config.scene.overrideMaterial = null
    const depthBitmap = offscreen.transferToImageBitmap()

    const frame: PortalFrameMessage = {
      type: 'portal:frame',
      color: colorBitmap,
      depth: depthBitmap,
      width: viewport.width,
      height: viewport.height,
      projection: matToArray(camera.projectionMatrix),
      view: matToArray(camera.matrixWorldInverse)
    }
    parent.postMessage(frame, hostOrigin, [colorBitmap, depthBitmap])

    if (config.log && msg.time - lastLog > 1) {
      lastLog = msg.time
      console.log('[iframe] received pose pos:', fmt(pose.position))
      console.log('[iframe] received pose fwd:', fmt(pose.forward ?? [0, 0, -1]))
      console.log('[iframe] received pose up: ', fmt(pose.up ?? [0, 1, 0]))
      console.log('[iframe] viewport:', viewport.width, 'x', viewport.height)
      console.log('[iframe] applied camera.position:', fmt(camera.position.toArray()))
      console.log('[iframe] sent view (matrixWorldInverse):', fmt(frame.view))
    }
  }

  const loop = (): void => {
    if (!running) return
    if (pendingPose) {
      const next = pendingPose
      pendingPose = null
      renderFrame(next)
    }
    raf = requestAnimationFrame(loop)
  }

  return {
    start() {
      if (running) return
      running = true
      window.addEventListener('message', onMessage)
      sendReady()
      raf = requestAnimationFrame(loop)
    },
    stop() {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('message', onMessage)
    }
  }
}

// ---------------------------------------------------------------------------
// Host side: receive frames from iframe, composite via depth-aware fullscreen
// quad with stencil test.
// ---------------------------------------------------------------------------

const compositorVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const compositorFragmentShader = `
${unpackDepthGLSL}

uniform sampler2D iframeColor;
uniform sampler2D iframeDepth;
uniform mat4 iframeViewProjectionInverse;
uniform vec3 destinationPortalPos;
uniform vec3 destinationKeptNormal;
uniform int debugMode;

varying vec2 vUv;

vec3 linearToSRGB(vec3 v) {
  return mix(
    pow(v, vec3(0.41666)) * 1.055 - vec3(0.055),
    v * 12.92,
    vec3(lessThanEqual(v, vec3(0.0031308)))
  );
}

void main() {
  float depth01 = unpackRGBAToDepth(texture2D(iframeDepth, vUv));

  // debugMode == 2: visualize unpacked depth as grayscale.
  // Lets us see whether depth values look smooth/sensible per-pixel.
  if (debugMode == 2) {
    gl_FragColor = vec4(vec3(depth01), 1.0);
    return;
  }

  vec4 ndc = vec4(vUv * 2.0 - 1.0, depth01 * 2.0 - 1.0, 1.0);
  vec4 worldPos4 = iframeViewProjectionInverse * ndc;
  vec3 worldPos = worldPos4.xyz / worldPos4.w;

  // debugMode == 3: visualize reconstructed iframe-world position as color.
  // Each axis mod 1.0 → R/G/B; if reconstruction works the color should
  // change smoothly with geometry distance/orientation.
  if (debugMode == 3) {
    gl_FragColor = vec4(fract(worldPos * 0.25 + 0.5), 1.0);
    return;
  }

  // debugMode == 1: skip depth-clip; just blit color. Lets us see if iframe
  // content placement is correct independent of the clip logic.
  if (debugMode != 1) {
    float distFromPlane = dot(worldPos - destinationPortalPos, destinationKeptNormal);
    if (distFromPlane < 0.0) discard;
  }

  vec4 colorSample = texture2D(iframeColor, vUv);
  gl_FragColor = vec4(linearToSRGB(colorSample.rgb), 1.0);
}
`

export type CompositorDebugMode = 'off' | 'noclip' | 'depth' | 'worldpos'

const debugModeToInt = (m: CompositorDebugMode): number =>
  m === 'noclip' ? 1 : m === 'depth' ? 2 : m === 'worldpos' ? 3 : 0

export type IframeEndpointConfig = {
  iframe: HTMLIFrameElement
  /** postMessage origin restriction. '*' for dev, explicit origin in prod. */
  iframeOrigin?: string
  /** Stencil ref the iframe's compositor should test against. Must match the host's stencil-mask ref. */
  stencilRef?: number
  /**
   * Compositor debug visualization mode (default 'off' = normal compositing).
   * - 'noclip': skip depth-clip; show all iframe content. If the parallax
   *   issue persists with 'noclip', it's a content/placement problem; if it
   *   only appears in 'off' mode, the depth-clip is the culprit.
   * - 'depth':  show unpacked depth as grayscale. Bands or noise here mean
   *   the depth pack/unpack round-trip is broken.
   * - 'worldpos': show reconstructed iframe-world position as RGB. Smooth
   *   color gradients across geometry mean reconstruction is working.
   */
  debugMode?: CompositorDebugMode
}

export type IframePortalEndpoint = PortalEndpoint & {
  isReady(): boolean
  hasFrame(): boolean
  /** Send a pose to the iframe. The iframe will render and post a frame back. */
  requestFrame(opts: {
    pose: PortalPose
    projection: Mat4
    viewport: Viewport
    time: number
  }): void
  /** Composite the latest received frame onto the canvas (stencil-tested + depth-clipped). */
  renderAsDestination(renderer: THREE.WebGLRenderer): void
}

export const makeIframeEndpoint = (config: IframeEndpointConfig): IframePortalEndpoint => {
  let anchor: PortalAnchor | null = null
  let background: ColorRGB = { r: 0, g: 0, b: 0 }
  let pendingColor: ImageBitmap | null = null
  let pendingDepth: ImageBitmap | null = null
  let lastViewProjection: THREE.Matrix4 | null = null
  let hasUploadedFrame = false

  const colorTexture = new THREE.Texture()
  colorTexture.colorSpace = THREE.SRGBColorSpace
  colorTexture.minFilter = THREE.LinearFilter
  colorTexture.magFilter = THREE.LinearFilter
  colorTexture.generateMipmaps = false

  const depthTexture = new THREE.Texture()
  depthTexture.colorSpace = THREE.NoColorSpace
  depthTexture.minFilter = THREE.NearestFilter
  depthTexture.magFilter = THREE.NearestFilter
  depthTexture.generateMipmaps = false

  const stencilRef = config.stencilRef ?? PORTAL_STENCIL_REF
  const debugModeInt = debugModeToInt(config.debugMode ?? 'off')

  const uniforms = {
    iframeColor: { value: colorTexture },
    iframeDepth: { value: depthTexture },
    iframeViewProjectionInverse: { value: new THREE.Matrix4() },
    destinationPortalPos: { value: new THREE.Vector3() },
    destinationKeptNormal: { value: new THREE.Vector3() },
    debugMode: { value: debugModeInt }
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: compositorVertexShader,
    fragmentShader: compositorFragmentShader,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
    stencilWrite: true,
    stencilFunc: THREE.EqualStencilFunc,
    stencilRef,
    stencilFail: THREE.KeepStencilOp,
    stencilZFail: THREE.KeepStencilOp,
    stencilZPass: THREE.KeepStencilOp,
    stencilWriteMask: 0
  })

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  mesh.frustumCulled = false
  const compositorScene = new THREE.Scene()
  compositorScene.add(mesh)
  const compositorCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const onMessage = (ev: MessageEvent): void => {
    if (ev.source !== config.iframe.contentWindow) return
    const msg = ev.data as PortalMessage
    if (!msg || typeof msg !== 'object') return

    if (msg.type === 'portal:ready') {
      anchor = msg.anchor
      background = msg.background
    } else if (msg.type === 'portal:frame') {
      pendingColor?.close()
      pendingDepth?.close()
      pendingColor = msg.color
      pendingDepth = msg.depth
      const proj = new THREE.Matrix4().fromArray(msg.projection as number[])
      const view = new THREE.Matrix4().fromArray(msg.view as number[])
      lastViewProjection = new THREE.Matrix4().multiplyMatrices(proj, view)
    }
  }

  window.addEventListener('message', onMessage)

  return {
    isReady: () => anchor !== null,
    hasFrame: () => hasUploadedFrame || pendingColor !== null,
    getAnchor() {
      if (!anchor) throw new Error('iframe portal endpoint not ready (no portal:ready received yet)')
      return anchor
    },
    getBackground: () => background,
    requestFrame(opts) {
      const win = config.iframe.contentWindow
      if (!win) return
      const msg: PortalSetPoseMessage = { type: 'portal:setPose', ...opts }
      win.postMessage(msg, config.iframeOrigin ?? '*')
    },
    renderAsDestination(renderer) {
      if (pendingColor && pendingDepth) {
        colorTexture.image = pendingColor
        colorTexture.needsUpdate = true
        depthTexture.image = pendingDepth
        depthTexture.needsUpdate = true
        pendingColor = null
        pendingDepth = null
        hasUploadedFrame = true
      }
      if (!hasUploadedFrame || !anchor || !lastViewProjection) return

      uniforms.iframeViewProjectionInverse.value.copy(lastViewProjection).invert()

      // PortalAnchor convention (matches asAnchor in portal-three): anchor.normal
      // points toward the "front face" of the portal — the side a local viewer in
      // the destination world would stand on to step through.
      //
      // The pose-mirror in couplePoseAcrossPortal puts the iframe camera on the
      // OPPOSITE side from where the host viewer stands relative to the host
      // anchor. With the host viewer on the +normal side of the host anchor (the
      // typical case), the iframe camera lands on the -normal side of the iframe
      // anchor. The "past-portal" / kept side from that camera's POV is therefore
      // the +normal side, i.e., destinationKeptNormal = anchor.normal.
      uniforms.destinationPortalPos.value.set(
        anchor.position[0], anchor.position[1], anchor.position[2]
      )
      uniforms.destinationKeptNormal.value.set(
        anchor.normal[0], anchor.normal[1], anchor.normal[2]
      )

      renderer.render(compositorScene, compositorCamera)
    }
  }
}

export { PORTAL_STENCIL_REF }
