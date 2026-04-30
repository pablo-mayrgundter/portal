import * as THREE from 'three'
import gl from 'gl'
import {
  PORTAL_STENCIL_REF,
  applyObliqueClipFromAnchor,
  asAnchor,
  makePortalStencilMask,
  type PortalStencilMask
} from '@portal/portal-three'
import {
  couplePoseAcrossPortal,
  type ColorRGB,
  type Mat4,
  type PortalAnchor,
  type PortalMessage,
  type PortalPose,
  type PortalReadyMessage,
  type PortalSetPoseMessage,
  type Viewport
} from '@portal/portal-core'
import {
  type ChildPortal,
  type ChildPortalEndpoint,
  type PortalTransport
} from '@portal/portal-iframe'
import { initDom } from './index'

// ---------------------------------------------------------------------------
// Headless target — node-side equivalent of makeIframeTarget.
//
// Same render-loop semantics (one synchronous render per setPose, oblique
// near-plane clip aligned with this scene's portal anchor, optional
// recursive composite of child portals into sceneRT). The only differences
// from the iframe target are:
//   - gl context comes from `gl` (stack-gl) instead of OffscreenCanvas
//   - color + packed-RGBA depth output are Uint8Arrays read with
//     gl.readPixels, not ImageBitmaps from transferToImageBitmap
//   - the corresponding `portal:frame` payload uses Uint8Array buffers; a
//     parallel HeadlessFrameMessage type lives here to keep the wire types
//     honest in TypeScript
//
// Connect via a loopback transport (createLoopbackPair from portal-iframe)
// so a parent target running in node can ask this one for a frame inline.
// Two-process variants (HTTP, IPC) layer on later by swapping the transport.
// ---------------------------------------------------------------------------

/**
 * Same shape as PortalFrameMessage but with Uint8Array bitmaps. Browsers
 * receive ImageBitmaps over postMessage Transferables; node has neither
 * primitive, so we ship raw byte buffers instead. Both ends of a node ↔ node
 * loopback know to expect this variant; cross-runtime mixing would require
 * a bridge that re-encodes one to the other.
 */
export type HeadlessFrameMessage = {
  type: 'portal:frame'
  color: Uint8Array
  depth: Uint8Array
  width: number
  height: number
  projection: Mat4
  view: Mat4
}

export type HeadlessTargetConfig = {
  scene: THREE.Scene
  /** Pose data declaring where the destination portal sits in this scene. */
  anchor: PortalAnchor
  /** Background color the host should fill the stencil mask with. Defaults to scene.background. */
  background?: ColorRGB
  /** Optional render hook called once per frame just before rendering. */
  tick?: (time: number) => void
  /** Initial gl drawing buffer + sceneRT size. setPose viewports resize on demand. */
  width: number
  height: number
  /**
   * Child portals embedded in this scene. When non-empty, the per-frame
   * render runs the host-style composite for each child (same as the iframe
   * target) into sceneRT before readback. Lets a portal-compliant scene
   * itself contain portals, recursing through loopback transports.
   */
  portals?: ChildPortal[]
  /**
   * Two-way message channel to the peer (driver / parent target). Required —
   * unlike the iframe target's parent-window default, node targets have no
   * implicit peer. Use createLoopbackPair from portal-iframe for in-process
   * recursion.
   */
  transport: PortalTransport
  /** If true, log received pose + applied matrices once per second. */
  log?: boolean
}

export type HeadlessTarget = {
  start(): void
  stop(): void
  /** Underlying gl context. Useful for sharing extensions or readPixels at a higher level. */
  glContext: WebGL2RenderingContext
  /** The three renderer driving this target. */
  renderer: THREE.WebGLRenderer
}

const defaultBackground = (scene: THREE.Scene): ColorRGB => {
  if (scene.background instanceof THREE.Color) {
    return { r: scene.background.r, g: scene.background.g, b: scene.background.b }
  }
  return { r: 0, g: 0, b: 0 }
}

const matToArray = (m: THREE.Matrix4): Mat4 => Array.from(m.elements)

/**
 * Construct a headless target. Initialises a gl context + three renderer at
 * the configured size, subscribes to setPose over the supplied transport,
 * announces portal:ready on `start()`.
 *
 * The render path mirrors makeIframeTarget verbatim except for the output
 * stage; see the comment above HeadlessFrameMessage for the rationale.
 */
export const makeHeadlessTarget = (config: HeadlessTargetConfig): HeadlessTarget => {
  initDom()
  const glCtx = gl(config.width, config.height, {
    antialias: false,
    stencil: true,
    depth: true,
    preserveDrawingBuffer: false,
    createWebGL2Context: true
  } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!glCtx) {
    throw new Error('headless-gl: could not create WebGL2 context')
  }

  const renderer = new THREE.WebGLRenderer({
    context: glCtx,
    antialias: false,
    stencil: true,
    depth: true
  })
  renderer.setSize(config.width, config.height, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping
  renderer.autoClear = true

  const camera = new THREE.PerspectiveCamera()

  // sceneRT: same shape as iframe target's, including depth-stencil packed
  // depth texture so the recursive child-portal composite has a stencil
  // buffer to write into.
  const sceneRT = new THREE.WebGLRenderTarget(config.width, config.height, {
    samples: 0,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    generateMipmaps: false,
    stencilBuffer: true
  })
  sceneRT.depthTexture = new THREE.DepthTexture(
    config.width,
    config.height,
    THREE.UnsignedInt248Type
  )
  sceneRT.depthTexture.format = THREE.DepthStencilFormat
  sceneRT.depthTexture.minFilter = THREE.NearestFilter
  sceneRT.depthTexture.magFilter = THREE.NearestFilter
  // Tag sceneRT.texture as sRGB so the renderer auto-encodes linear→sRGB on
  // write. Without this, sceneRT bytes are raw linear values and readPixels
  // returns near-black for what should be mid-gray (linear 0.5 → sRGB ~0.73,
  // but linear bytes in [0,1] → byte ~128, while sRGB byte ~187). Browser
  // iframe target handles this with a separate color-blit pass that runs
  // linearToSRGB; for headless, the simpler path is colorSpace tagging.
  sceneRT.texture.colorSpace = THREE.SRGBColorSpace

  // Depth-pack RT: receives a fullscreen blit that samples sceneRT's depth
  // texture and packs it to RGBA. We then readPixels off this RT to get the
  // depth bitmap. (sceneRT itself has a non-color depth attachment, can't
  // readPixels from it directly as RGBA without the pack pass.)
  const depthRT = new THREE.WebGLRenderTarget(config.width, config.height, {
    samples: 0,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    generateMipmaps: false,
    type: THREE.UnsignedByteType,
    format: THREE.RGBAFormat
  })

  const depthBlitMaterial = new THREE.ShaderMaterial({
    uniforms: { depthTex: { value: null as THREE.Texture | null } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      const float PackUpscale = 256.0 / 255.0;
      const vec3 PackFactors = vec3(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0);
      const vec3 ShiftRight8 = vec3(1.0 / 256.0);
      vec4 packDepthToRGBA(float v) {
        vec4 r = vec4(fract(v * PackFactors), v);
        r.yzw -= r.xyz * ShiftRight8;
        return r * PackUpscale;
      }
      uniform sampler2D depthTex;
      varying vec2 vUv;
      void main() {
        float depth = texture2D(depthTex, vUv).r;
        gl_FragColor = packDepthToRGBA(depth);
      }
    `,
    depthTest: false,
    depthWrite: false
  })
  const blitGeo = new THREE.PlaneGeometry(2, 2)
  const blitDepthMesh = new THREE.Mesh(blitGeo, depthBlitMaterial)
  blitDepthMesh.frustumCulled = false
  const blitScene = new THREE.Scene()
  blitScene.add(blitDepthMesh)
  const blitCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  // Recursive child portals — same machinery as the iframe target.
  const childPortals: ChildPortal[] = config.portals ?? []
  let childStencilMask: PortalStencilMask | null = null
  const childStencilBg = new THREE.Color()
  const childCoupledForward: [number, number, number] = [0, 0, -1]
  const childCoupledUp: [number, number, number] = [0, 1, 0]
  const childCoupledPos: [number, number, number] = [0, 0, 0]

  let running = false
  let unlisten: (() => void) | null = null
  let lastLog = 0
  let curWidth = config.width
  let curHeight = config.height
  const lookTarget = new THREE.Vector3()

  const sendReady = (): void => {
    const msg: PortalReadyMessage = {
      type: 'portal:ready',
      anchor: config.anchor,
      background: config.background ?? defaultBackground(config.scene),
      viewport: { width: curWidth, height: curHeight }
    }
    config.transport.post(msg)
  }

  const onMessage = (msg: PortalMessage): void => {
    if (!running) return
    if (msg.type === 'portal:setPose') renderFrame(msg)
  }

  const renderFrame = (msg: PortalSetPoseMessage): void => {
    config.tick?.(msg.time)

    const { pose, projection, viewport } = msg

    if (curWidth !== viewport.width || curHeight !== viewport.height) {
      curWidth = viewport.width
      curHeight = viewport.height
      // stack-gl's resize: opt-in via the STACKGL_resize_drawingbuffer ext.
      type Resizable = { resize: (w: number, h: number) => void }
      const ext = (glCtx as unknown as { getExtension: (n: string) => unknown }).getExtension(
        'STACKGL_resize_drawingbuffer'
      ) as Resizable | null
      ext?.resize(curWidth, curHeight)
      renderer.setSize(curWidth, curHeight, false)
      sceneRT.setSize(curWidth, curHeight)
      depthRT.setSize(curWidth, curHeight)
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

    applyObliqueClipFromAnchor(camera, config.anchor)
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()

    if (childPortals.length === 0) {
      renderer.setRenderTarget(sceneRT)
      renderer.render(config.scene, camera)
      renderer.setRenderTarget(null)
    } else {
      if (childPortals.length > 1) {
        console.warn(
          '[portal-headless-three] target.portals: only the first child is composited; multi-child support is a follow-up'
        )
      }
      const child = childPortals[0]
      if (!childStencilMask) childStencilMask = makePortalStencilMask()

      if (child.endpoint.isReady()) {
        const sourceAnchorData = asAnchor(child.anchor)
        const targetAnchorData = child.endpoint.getAnchor()
        const coupled = couplePoseAcrossPortal(msg.pose, {
          source: sourceAnchorData,
          target: targetAnchorData
        })
        childCoupledPos[0] = coupled.position[0]
        childCoupledPos[1] = coupled.position[1]
        childCoupledPos[2] = coupled.position[2]
        if (coupled.forward) {
          childCoupledForward[0] = coupled.forward[0]
          childCoupledForward[1] = coupled.forward[1]
          childCoupledForward[2] = coupled.forward[2]
        }
        if (coupled.up) {
          childCoupledUp[0] = coupled.up[0]
          childCoupledUp[1] = coupled.up[1]
          childCoupledUp[2] = coupled.up[2]
        }
        child.endpoint.requestFrame({
          pose: {
            position: childCoupledPos,
            forward: childCoupledForward,
            up: childCoupledUp
          },
          projection: msg.projection,
          viewport: msg.viewport,
          time: msg.time
        })
      }

      renderer.setRenderTarget(sceneRT)
      const prevAutoClear = renderer.autoClear
      renderer.autoClear = false
      renderer.clear(true, true, true)
      renderer.render(config.scene, camera)

      const tbg = child.endpoint.isReady()
        ? child.endpoint.getBackground()
        : { r: 0, g: 0, b: 0 }
      childStencilBg.setRGB(tbg.r, tbg.g, tbg.b)
      childStencilMask.update(child.anchor, camera, childStencilBg)
      renderer.render(childStencilMask.scene, childStencilMask.camera)

      renderer.clearDepth()

      if (child.endpoint.hasFrame()) {
        child.endpoint.renderAsDestination(renderer)
      }

      renderer.autoClear = prevAutoClear
      renderer.setRenderTarget(null)
    }

    // Read color out of sceneRT directly — no canvas blit needed since
    // there's no transferToImageBitmap path in node.
    const colorBuf = new Uint8Array(curWidth * curHeight * 4)
    renderer.readRenderTargetPixels(sceneRT, 0, 0, curWidth, curHeight, colorBuf)

    // Pack sceneRT.depthTexture into depthRT, then read that back.
    depthBlitMaterial.uniforms.depthTex.value = sceneRT.depthTexture
    renderer.setRenderTarget(depthRT)
    renderer.render(blitScene, blitCamera)
    renderer.setRenderTarget(null)
    const depthBuf = new Uint8Array(curWidth * curHeight * 4)
    renderer.readRenderTargetPixels(depthRT, 0, 0, curWidth, curHeight, depthBuf)

    const frame: HeadlessFrameMessage = {
      type: 'portal:frame',
      color: colorBuf,
      depth: depthBuf,
      width: curWidth,
      height: curHeight,
      projection: matToArray(camera.projectionMatrix),
      view: matToArray(camera.matrixWorldInverse)
    }
    config.transport.post(frame as unknown as PortalMessage)

    if (config.log && msg.time - lastLog > 1) {
      lastLog = msg.time
      console.log('[headless] received pose pos:', pose.position)
      console.log('[headless] viewport:', viewport.width, 'x', viewport.height)
    }
  }

  return {
    glContext: glCtx,
    renderer,
    start() {
      if (running) return
      running = true
      unlisten = config.transport.onMessage(onMessage)
      sendReady()
    },
    stop() {
      running = false
      unlisten?.()
      unlisten = null
    }
  }
}

// ---------------------------------------------------------------------------
// Headless endpoint — host-side compositor for headless targets.
//
// Mirrors makeIframeEndpoint but uploads received Uint8Array buffers as
// THREE.DataTextures (instead of THREE.Texture from ImageBitmap) and writes
// into a renderer the caller supplies. Composite shader is byte-identical
// to the iframe endpoint's; only the texture-upload path differs.
// ---------------------------------------------------------------------------

const compositorVertexShader = `
varying vec2 vUv;
varying vec2 vUvNdc;
void main() {
  vUv = vec2(uv.x, 1.0 - uv.y);
  vUvNdc = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const compositorFragmentShader = `
const float UnpackDownscale = 255.0 / 256.0;
const vec3 UnpackFactorsXYZ = vec3(
  1.0 / (256.0 * 256.0 * 256.0),
  1.0 / (256.0 * 256.0),
  1.0 / 256.0
);
const vec4 UnpackFactors = vec4(UnpackFactorsXYZ * UnpackDownscale, UnpackDownscale);
float unpackRGBAToDepth(vec4 v) { return dot(v, UnpackFactors); }

uniform sampler2D iframeColor;
uniform sampler2D iframeDepth;
uniform mat4 iframeViewProjectionInverse;
uniform vec3 destinationPortalPos;
uniform vec3 destinationKeptNormal;

varying vec2 vUv;
varying vec2 vUvNdc;

void main() {
  // Headless DataTextures are not Y-flipped (no ImageBitmap orientation
  // weirdness), so DON'T flip vUv on the way in. Use it un-flipped for
  // both sampling and NDC reconstruction.
  float depth01 = unpackRGBAToDepth(texture2D(iframeDepth, vUvNdc));

  // Background pixels (cleared depth = 1.0) reconstruct to the rasterizer's
  // far plane, which depending on view orientation can land on either side
  // of destinationKeptNormal — and at deep recursion the bg side flips
  // unpredictably. Don't run the depth-clip on them; the stencil mask
  // already gated them to door-area only, which is enough.
  //
  // Threshold is 0.99 (not 0.9999) because the depth-pack→RGBA8→unpack
  // round-trip loses a couple of bits at the high end: depth=1.0 packed
  // and re-unpacked comes back as ~0.9961, not 1.0 exactly. Anything past
  // ~0.99 is effectively "at or near the far plane" — well past any real
  // geometry in our typical scenes (cube depths are <0.5 with cam at z=3).
  if (depth01 >= 0.99) {
    gl_FragColor = vec4(texture2D(iframeColor, vUvNdc).rgb, 1.0);
    return;
  }

  vec4 ndc = vec4(vUvNdc * 2.0 - 1.0, depth01 * 2.0 - 1.0, 1.0);
  vec4 worldPos4 = iframeViewProjectionInverse * ndc;
  vec3 worldPos = worldPos4.xyz / worldPos4.w;
  float distFromPlane = dot(worldPos - destinationPortalPos, destinationKeptNormal);
  if (distFromPlane < 0.0) discard;
  gl_FragColor = vec4(texture2D(iframeColor, vUvNdc).rgb, 1.0);
}
`

export type HeadlessEndpointConfig = {
  transport: PortalTransport
  stencilRef?: number
}

export type HeadlessPortalEndpoint = ChildPortalEndpoint & {
  /** Compile compositor programs against the supplied renderer (warm path). */
  prewarm(renderer: THREE.WebGLRenderer): void
}

/**
 * Host-side compositor counterpart to makeHeadlessTarget. Subscribes to the
 * transport, stashes incoming portal:frame buffers, uploads them as
 * DataTextures and renders the compositor quad in `renderAsDestination`.
 */
export const makeHeadlessEndpoint = (
  config: HeadlessEndpointConfig
): HeadlessPortalEndpoint => {
  let anchor: PortalAnchor | null = null
  let background: ColorRGB = { r: 0, g: 0, b: 0 }
  let pendingColor: Uint8Array | null = null
  let pendingDepth: Uint8Array | null = null
  let pendingWidth = 0
  let pendingHeight = 0
  let lastViewProjection: THREE.Matrix4 | null = null
  let hasUploadedFrame = false

  let colorTexture: THREE.DataTexture | null = null
  let depthTexture: THREE.DataTexture | null = null

  const stencilRef = config.stencilRef ?? PORTAL_STENCIL_REF

  const uniforms = {
    iframeColor: { value: null as THREE.Texture | null },
    iframeDepth: { value: null as THREE.Texture | null },
    iframeViewProjectionInverse: { value: new THREE.Matrix4() },
    destinationPortalPos: { value: new THREE.Vector3() },
    destinationKeptNormal: { value: new THREE.Vector3() }
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

  config.transport.onMessage((msg) => {
    if (msg.type === 'portal:ready') {
      anchor = msg.anchor
      background = msg.background
    } else if (msg.type === 'portal:frame') {
      const hm = msg as unknown as HeadlessFrameMessage
      pendingColor = hm.color
      pendingDepth = hm.depth
      pendingWidth = hm.width
      pendingHeight = hm.height
      const proj = new THREE.Matrix4().fromArray(hm.projection as number[])
      const view = new THREE.Matrix4().fromArray(hm.view as number[])
      lastViewProjection = new THREE.Matrix4().multiplyMatrices(proj, view)
    }
  })

  return {
    isReady: () => anchor !== null,
    hasFrame: () => hasUploadedFrame || pendingColor !== null,
    getAnchor() {
      if (!anchor) throw new Error('headless endpoint not ready')
      return anchor
    },
    getBackground: () => background,
    requestFrame(opts) {
      const msg: PortalSetPoseMessage = { type: 'portal:setPose', ...opts }
      config.transport.post(msg)
    },
    renderAsDestination(renderer: THREE.WebGLRenderer) {
      if (pendingColor && pendingDepth) {
        // Build / re-build the DataTextures when a new frame lands. We
        // recreate (rather than mutate .image) on size change; otherwise we
        // mutate .needsUpdate to schedule re-upload.
        if (
          !colorTexture ||
          colorTexture.image.width !== pendingWidth ||
          colorTexture.image.height !== pendingHeight
        ) {
          colorTexture?.dispose()
          colorTexture = new THREE.DataTexture(
            pendingColor,
            pendingWidth,
            pendingHeight,
            THREE.RGBAFormat,
            THREE.UnsignedByteType
          )
          colorTexture.minFilter = THREE.LinearFilter
          colorTexture.magFilter = THREE.LinearFilter
          // Bytes arrive sRGB-encoded (the child target's sceneRT was tagged
          // SRGBColorSpace, so the renderer encoded on write). Tag the
          // texture sRGB too so three rewrites our texture2D() samples to
          // decode → linear on read; the parent's sceneRT then re-encodes
          // on write. Net: chain stays sRGB-correct without double-encode.
          colorTexture.colorSpace = THREE.SRGBColorSpace
          colorTexture.flipY = false
          colorTexture.generateMipmaps = false
        } else {
          colorTexture.image.data = pendingColor
        }
        colorTexture.needsUpdate = true

        if (
          !depthTexture ||
          depthTexture.image.width !== pendingWidth ||
          depthTexture.image.height !== pendingHeight
        ) {
          depthTexture?.dispose()
          depthTexture = new THREE.DataTexture(
            pendingDepth,
            pendingWidth,
            pendingHeight,
            THREE.RGBAFormat,
            THREE.UnsignedByteType
          )
          depthTexture.minFilter = THREE.NearestFilter
          depthTexture.magFilter = THREE.NearestFilter
          depthTexture.colorSpace = THREE.NoColorSpace
          depthTexture.flipY = false
          depthTexture.generateMipmaps = false
        } else {
          depthTexture.image.data = pendingDepth
        }
        depthTexture.needsUpdate = true

        uniforms.iframeColor.value = colorTexture
        uniforms.iframeDepth.value = depthTexture

        pendingColor = null
        pendingDepth = null
        hasUploadedFrame = true
      }
      if (!hasUploadedFrame || !anchor || !lastViewProjection) return

      uniforms.iframeViewProjectionInverse.value.copy(lastViewProjection).invert()
      uniforms.destinationPortalPos.value.set(
        anchor.position[0],
        anchor.position[1],
        anchor.position[2]
      )
      uniforms.destinationKeptNormal.value.set(
        anchor.normal[0],
        anchor.normal[1],
        anchor.normal[2]
      )

      renderer.render(compositorScene, compositorCamera)
    },
    prewarm(renderer) {
      renderer.compile(compositorScene, compositorCamera)
    }
  }
}

// stencilRef is intentionally not exported — use PORTAL_STENCIL_REF from
// portal-three at the call site if you need a literal.
