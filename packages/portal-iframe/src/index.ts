import * as THREE from 'three'
import { PORTAL_STENCIL_REF, applyObliqueClipFromAnchor } from '@portal/portal-three'
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
// The pack side is inlined in the iframe target's depthBlitMaterial; the
// unpack side is consumed by the host's compositor.
// ---------------------------------------------------------------------------

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
  /**
   * Apply FXAA in the color blit. Defaults to true. Set to false to compare
   * against a plain single-tap linearToSRGB blit — useful for diagnosing
   * whether FXAA is responsible for an apparent brightness/lighting shift on
   * smooth-gradient regions (it shouldn't be, but the URL-toggleable flag
   * makes A/B comparison cheap).
   */
  fxaa?: boolean
  /**
   * Where to post 'portal:frame' responses + 'portal:ready' on init.
   * Defaults to `parent` (the iframe-in-host case). When the host plays the
   * destination role (after iframe-portal traversal), set this to the iframe's
   * `contentWindow` so responses go to the iframe rather than the parent.
   */
  outputTarget?: Window
  /**
   * If set, only process incoming 'portal:setPose' messages whose `event.source`
   * matches this. For the iframe-as-destination case, the default of `null`
   * works (the iframe document only sees messages from its parent). For the
   * host-as-destination case, set this to the iframe's `contentWindow` so we
   * ignore stray messages from other windows.
   */
  inputFilter?: MessageEventSource | null
  /**
   * Called with the peer's `msg.time` on every received setPose. Lets the
   * caller keep external clocks (e.g., the iframe's source-mode tick) in
   * sync with the peer's clock — important when the same scene is rendered
   * by both pages depending on which is currently active, since otherwise
   * animation phase jumps at every traversal.
   */
  onTime?: (time: number) => void
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
  const renderer = new THREE.WebGLRenderer({ canvas: offscreen, antialias: false })
  // Three's constructor initializes _outputColorSpace to SRGB but DOES NOT
  // propagate to gl.drawingBufferColorSpace / gl.unpackColorSpace — that only
  // happens via the property setter. Without this, the canvas's color-space
  // attributes are whatever the GL context defaulted to (usually 'srgb' in
  // modern browsers, but the spec leaves it unspecified). Setting the
  // property explicitly forces both GL attributes to 'srgb' so the offscreen
  // canvas's transferToImageBitmap output is unambiguously sRGB-tagged and
  // matches the host's main canvas exactly.
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping

  // Single scene render per frame: RT with sampleable depth texture so we can
  // derive both bitmaps from one pass. WebGL2 DepthTextures aren't compatible
  // with multisampled FBOs without extension gymnastics, so the RT is non-
  // MSAA. (Cost vs the previous two-RT-with-MSAA setup: lose MSAA on color,
  // halve scene render cost. FXAA in the color blit is cheap and can recover
  // most of the perceived AA quality if needed.)
  const sceneRT = new THREE.WebGLRenderTarget(1, 1, {
    samples: 0,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    generateMipmaps: false
  })
  sceneRT.depthTexture = new THREE.DepthTexture(1, 1)
  sceneRT.depthTexture.type = THREE.UnsignedIntType

  // Color blit: sample the RT's color attachment and write to canvas with
  // linearToSRGB encoding. The default path also runs FXAA in the same pass
  // to recover most of the AA quality lost when the scene RT had to be
  // non-MSAA. linearToSRGB is applied per sample (not once at the end) so
  // FXAA's luma weighting matches the sRGB domain it's tuned for.
  //
  // The non-FXAA path is a single-tap blit, kept compilable so callers can
  // toggle FXAA at construction time without re-creating the renderer.
  const useFxaa = config.fxaa ?? true
  const colorBlitFragmentShader = useFxaa
    ? `
      uniform sampler2D tex;
      uniform vec2 invResolution;
      varying vec2 vUv;

      vec3 linearToSRGB(vec3 v) {
        return mix(
          pow(v, vec3(0.41666)) * 1.055 - vec3(0.055),
          v * 12.92,
          vec3(lessThanEqual(v, vec3(0.0031308)))
        );
      }

      vec3 sampleSRGB(vec2 uv) {
        return linearToSRGB(texture2D(tex, uv).rgb);
      }

      // Lottes-2011 "console" FXAA. Tuned for cheapness over precision —
      // five corner samples for edge detection, four extra samples along the
      // detected edge direction, no sub-pixel quality search.
      void main() {
        const float REDUCE_MIN = 1.0 / 128.0;
        const float REDUCE_MUL = 1.0 / 8.0;
        const float SPAN_MAX = 8.0;
        const vec3 LUMA = vec3(0.299, 0.587, 0.114);

        vec3 rgbNW = sampleSRGB(vUv + vec2(-1.0, -1.0) * invResolution);
        vec3 rgbNE = sampleSRGB(vUv + vec2( 1.0, -1.0) * invResolution);
        vec3 rgbSW = sampleSRGB(vUv + vec2(-1.0,  1.0) * invResolution);
        vec3 rgbSE = sampleSRGB(vUv + vec2( 1.0,  1.0) * invResolution);
        vec3 rgbM  = sampleSRGB(vUv);

        float lumaNW = dot(rgbNW, LUMA);
        float lumaNE = dot(rgbNE, LUMA);
        float lumaSW = dot(rgbSW, LUMA);
        float lumaSE = dot(rgbSE, LUMA);
        float lumaM  = dot(rgbM,  LUMA);

        float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
        float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

        // Edge direction = perpendicular to local luma gradient, in pixel
        // space. Sign convention is irrelevant since we sample +/- along it.
        vec2 dir;
        dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
        dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

        float dirReduce = max(
          (lumaNW + lumaNE + lumaSW + lumaSE) * 0.25 * REDUCE_MUL,
          REDUCE_MIN
        );
        float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
        dir = clamp(dir * rcpDirMin, -SPAN_MAX, SPAN_MAX) * invResolution;

        // Two-tap inner pair (rgbA) and four-tap outer blend (rgbB). If the
        // longer-distance blend wanders outside the local luma range — i.e.
        // we picked up a dissimilar feature past the edge — fall back to the
        // safer inner pair.
        vec3 rgbA = 0.5 * (
          sampleSRGB(vUv + dir * (1.0 / 3.0 - 0.5)) +
          sampleSRGB(vUv + dir * (2.0 / 3.0 - 0.5))
        );
        vec3 rgbB = rgbA * 0.5 + 0.25 * (
          sampleSRGB(vUv + dir * -0.5) +
          sampleSRGB(vUv + dir *  0.5)
        );

        float lumaB = dot(rgbB, LUMA);
        vec3 outRgb = (lumaB < lumaMin || lumaB > lumaMax) ? rgbA : rgbB;

        gl_FragColor = vec4(outRgb, 1.0);
      }
    `
    : `
      uniform sampler2D tex;
      uniform vec2 invResolution;
      varying vec2 vUv;

      vec3 linearToSRGB(vec3 v) {
        return mix(
          pow(v, vec3(0.41666)) * 1.055 - vec3(0.055),
          v * 12.92,
          vec3(lessThanEqual(v, vec3(0.0031308)))
        );
      }

      void main() {
        // invResolution kept in the uniform set so the shared resize block
        // can update it unconditionally; unused on this path.
        vec2 _unused = invResolution;
        vec4 c = texture2D(tex, vUv);
        gl_FragColor = vec4(linearToSRGB(c.rgb), c.a);
      }
    `

  const colorBlitMaterial = new THREE.ShaderMaterial({
    uniforms: {
      tex: { value: null as THREE.Texture | null },
      invResolution: { value: new THREE.Vector2(1, 1) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: colorBlitFragmentShader,
    depthTest: false,
    depthWrite: false
  })

  // Depth blit: sample the RT's depth attachment (which holds gl_FragCoord.z
  // values), pack to RGBA via the existing depth-pack function. NEAREST is
  // implicit because the RT-to-canvas map is 1:1 (same dimensions) and the
  // depth texture has been configured with NearestFilter; a fullscreen quad
  // sampling at integer pixel centers gets exact byte-pack correctness.
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
  // Match NearestFilter at the texture level so any non-1:1 sampling stays
  // byte-exact (e.g., if the RT and canvas dimensions ever drift).
  sceneRT.depthTexture.minFilter = THREE.NearestFilter
  sceneRT.depthTexture.magFilter = THREE.NearestFilter

  const blitGeo = new THREE.PlaneGeometry(2, 2)
  const blitColorMesh = new THREE.Mesh(blitGeo, colorBlitMaterial)
  const blitDepthMesh = new THREE.Mesh(blitGeo, depthBlitMaterial)
  blitColorMesh.frustumCulled = false
  blitDepthMesh.frustumCulled = false
  const blitScene = new THREE.Scene()
  const blitCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  let running = false
  let lastLog = 0
  const lookTarget = new THREE.Vector3()
  const hostOrigin = config.hostOrigin ?? '*'
  const outputTarget: Window = config.outputTarget ?? parent
  const inputFilter = config.inputFilter ?? null
  const fmt = (a: ArrayLike<number>) =>
    `[${Array.from(a, (n) => n.toFixed(3)).join(', ')}]`

  const sendReady = (): void => {
    const msg: PortalReadyMessage = {
      type: 'portal:ready',
      anchor: config.anchor,
      background: config.background ?? defaultBackground(config.scene),
      viewport: { width: offscreen.width, height: offscreen.height }
    }
    outputTarget.postMessage(msg, hostOrigin)
  }

  const onMessage = (ev: MessageEvent): void => {
    if (!running) return
    if (inputFilter !== null && ev.source !== inputFilter) return
    const msg = ev.data as PortalMessage
    if (!msg || typeof msg !== 'object') return
    if (msg.type === 'portal:setPose') {
      // Render synchronously in the message handler rather than waiting for the
      // next RAF. The iframe is a render service (offscreen), not a display
      // surface — there's nothing to vsync to. Bypassing RAF saves up to a
      // full frame of round-trip latency AND avoids browser throttling that
      // applies to RAF in non-visible iframes. msg.time still drives any
      // animation tick, so deterministic motion stays in sync with the host.
      renderFrame(msg)
    }
  }

  const renderFrame = (msg: PortalSetPoseMessage): void => {
    config.tick?.(msg.time)
    config.onTime?.(msg.time)

    const { pose, projection, viewport } = msg

    if (offscreen.width !== viewport.width || offscreen.height !== viewport.height) {
      offscreen.width = viewport.width
      offscreen.height = viewport.height
      renderer.setSize(viewport.width, viewport.height, false)
      sceneRT.setSize(viewport.width, viewport.height)
      colorBlitMaterial.uniforms.invResolution.value.set(
        1 / viewport.width,
        1 / viewport.height
      )
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

    // Apply oblique near-plane clip aligned with the iframe portal so geometry
    // on the camera-side of the portal is culled at render time. Without this,
    // a camera-side primitive that occludes a far-side primitive becomes the
    // front-most hit; the host composite discards the (correct) camera-side
    // pixel but the far-side pixel was never rendered, so it shows bg fill.
    applyObliqueClipFromAnchor(camera, config.anchor)
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()

    // Single scene render → sceneRT (color attachment + depth texture).
    renderer.setRenderTarget(sceneRT)
    renderer.render(config.scene, camera)
    renderer.setRenderTarget(null)

    // Color blit: sample sceneRT.texture → canvas → ImageBitmap.
    blitScene.clear()
    blitScene.add(blitColorMesh)
    colorBlitMaterial.uniforms.tex.value = sceneRT.texture
    renderer.render(blitScene, blitCamera)
    const colorBitmap = offscreen.transferToImageBitmap()

    // Depth blit: sample sceneRT.depthTexture, pack to RGBA → canvas → ImageBitmap.
    blitScene.clear()
    blitScene.add(blitDepthMesh)
    depthBlitMaterial.uniforms.depthTex.value = sceneRT.depthTexture
    renderer.render(blitScene, blitCamera)
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
    outputTarget.postMessage(frame, hostOrigin, [colorBitmap, depthBitmap])

    if (config.log && msg.time - lastLog > 1) {
      lastLog = msg.time
      console.log('[iframe] received pose pos:', fmt(pose.position))
      console.log('[iframe] received pose fwd:', fmt(pose.forward ?? [0, 0, -1]))
      console.log('[iframe] received pose up: ', fmt(pose.up ?? [0, 1, 0]))
      console.log('[iframe] viewport:', viewport.width, 'x', viewport.height)
      console.log('[iframe] applied camera.position:', fmt(camera.position.toArray()))
      console.log('[iframe] applied camera.up:', fmt(camera.up.toArray()))
      console.log('[iframe] applied camera.quaternion:', fmt(camera.quaternion.toArray()))
      // Derived camera basis (world directions). For host pitched θ these should
      // be: right=(1,0,0), up=(0,cosθ,sinθ), back=(0,-sinθ,cosθ) — i.e., the
      // "back" component of y/z should be NON-zero when host is pitched.
      const r = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
      const u = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion)
      const b = new THREE.Vector3(0, 0, 1).applyQuaternion(camera.quaternion)
      console.log('[iframe] camera basis right:', fmt(r.toArray()))
      console.log('[iframe] camera basis up:   ', fmt(u.toArray()))
      console.log('[iframe] camera basis back: ', fmt(b.toArray()))
      console.log('[iframe] sent view (matrixWorldInverse):', fmt(frame.view))
    }
  }

  return {
    start() {
      if (running) return
      running = true
      window.addEventListener('message', onMessage)
      sendReady()
    },
    stop() {
      running = false
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
varying vec2 vUvNdc;
void main() {
  // vUv: y-flipped, used only for SAMPLING the iframe color + depth bitmaps.
  // ImageBitmap-sourced textures ignore UNPACK_FLIP_Y_WEBGL (browsers silently
  // drop it; three.js documents flipY as a no-op for ImageBitmap), so the
  // bitmap is upside-down relative to GL convention. Without this flip the
  // sampler returns iframe NDC.y = -host_NDC.y, which manifests as iframe
  // content appearing to "track gaze" in the opposite direction during pitch.
  vUv = vec2(uv.x, 1.0 - uv.y);
  // vUvNdc: un-flipped, used for NDC RECONSTRUCTION (depth-clip worldPos).
  // The iframe rendered with standard NDC orientation, so the depth value
  // sampled at vUv corresponds to the original render's NDC.y = uv.y * 2 - 1
  // — NOT the flipped vUv.y. Using the flipped vUv here would produce a
  // worldPos with wrong y/z (after view-inverse and the oblique projection's
  // y-z coupling), often landing on the camera-side of the portal plane and
  // getting falsely discarded by the depth-clip — visible as the bottoms of
  // balls being clipped near the portal in A-to-B.
  vUvNdc = uv;
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
varying vec2 vUvNdc;

void main() {
  float depth01 = unpackRGBAToDepth(texture2D(iframeDepth, vUv));

  // debugMode == 2: visualize unpacked depth as grayscale.
  // Lets us see whether depth values look smooth/sensible per-pixel.
  if (debugMode == 2) {
    gl_FragColor = vec4(vec3(depth01), 1.0);
    return;
  }

  vec4 ndc = vec4(vUvNdc * 2.0 - 1.0, depth01 * 2.0 - 1.0, 1.0);
  vec4 worldPos4 = iframeViewProjectionInverse * ndc;
  vec3 worldPos = worldPos4.xyz / worldPos4.w;

  // debugMode == 3: visualize reconstructed iframe-world position as color.
  // Each axis mod 1.0 → R/G/B; if reconstruction works the color should
  // change smoothly with geometry distance/orientation.
  if (debugMode == 3) {
    gl_FragColor = vec4(fract(worldPos * 0.25 + 0.5), 1.0);
    return;
  }

  float distFromPlane = dot(worldPos - destinationPortalPos, destinationKeptNormal);

  // debugMode == 4: visualize depth-clip decision per-pixel. GREEN where
  // distFromPlane >= 0 (would be kept = past portal); RED where < 0 (would be
  // discarded = camera-side of portal). If a sphere visibly on the camera-side
  // of the iframe portal plane shows up GREEN, the reconstructed worldPos is
  // wrong (or the kept-normal sign is flipped). Brightness ≈ |distFromPlane|.
  if (debugMode == 4) {
    float mag = clamp(abs(distFromPlane) * 0.3, 0.0, 1.0);
    if (distFromPlane >= 0.0) {
      gl_FragColor = vec4(0.0, mag, 0.0, 1.0);
    } else {
      gl_FragColor = vec4(mag, 0.0, 0.0, 1.0);
    }
    return;
  }

  // debugMode == 1: skip depth-clip; just blit color. Lets us see if iframe
  // content placement is correct independent of the clip logic.
  if (debugMode != 1) {
    if (distFromPlane < 0.0) discard;
  }

  // iframeColor is uploaded with NoColorSpace — the sample returns the raw
  // sRGB-encoded bytes (as floats in [0,1]) the iframe target's color blit
  // already wrote to the bitmap. Pass them through unchanged: the canvas
  // displays bytes as sRGB, so we want sRGB on the way out.
  vec4 colorSample = texture2D(iframeColor, vUv);
  gl_FragColor = vec4(colorSample.rgb, 1.0);
}
`

export type CompositorDebugMode = 'off' | 'noclip' | 'depth' | 'worldpos' | 'clip'

const debugModeToInt = (m: CompositorDebugMode): number =>
  m === 'noclip' ? 1 : m === 'depth' ? 2 : m === 'worldpos' ? 3 : m === 'clip' ? 4 : 0

export type IframeEndpointConfig = {
  /**
   * For the host-side case (most common), pass the iframe element. The
   * endpoint sends setPose to `iframe.contentWindow` and filters incoming
   * frames by `event.source === iframe.contentWindow`.
   *
   * For the iframe-side case (after iframe-portal traversal, when the iframe
   * page wants to query its parent), omit this and supply `peerWindow` +
   * `peerSource` instead.
   */
  iframe?: HTMLIFrameElement
  /**
   * Direct override of the postMessage target window. Defaults to
   * `iframe.contentWindow` when `iframe` is provided.
   */
  peerWindow?: Window
  /**
   * Direct override of the message-source filter for incoming frames.
   * Defaults to `iframe.contentWindow` when `iframe` is provided. Pass `null`
   * to accept frames from any source (lax — useful for testing).
   */
  peerSource?: MessageEventSource | null
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
  /**
   * If true, the compositor's material is created with stencilWrite=false
   * (so the door stencil is ignored) and the shader skips the depth-clip
   * discard. Caller is expected to also skip rendering the source scene +
   * stencil mask, so the iframe's full framebuffer fills the host viewport.
   * For visual debugging only.
   */
  composeRaw?: boolean
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
  /**
   * Compile the compositor's GLSL programs against the supplied renderer so
   * the first `renderAsDestination` call doesn't pay program-link cost as a
   * visible stutter. Call once at startup, before any frames have arrived.
   */
  prewarm(renderer: THREE.WebGLRenderer): void
}

export const makeIframeEndpoint = (config: IframeEndpointConfig): IframePortalEndpoint => {
  let anchor: PortalAnchor | null = null
  let background: ColorRGB = { r: 0, g: 0, b: 0 }
  let pendingColor: ImageBitmap | null = null
  let pendingDepth: ImageBitmap | null = null
  let lastViewProjection: THREE.Matrix4 | null = null
  let hasUploadedFrame = false

  // NoColorSpace, not SRGB. The bitmap is already sRGB-encoded (the iframe
  // target's color blit applied linearToSRGB before transferToImageBitmap),
  // and we want to write those bytes straight to the canvas without a GPU
  // sRGB-decode + software re-encode round-trip in the compositor. The
  // round-trip *should* be a no-op, but in practice we saw worldA-via-portal
  // visibly dimmer than worldA-direct in the B→A view, consistent with a
  // double-decode somewhere in the SRGB-texture upload path. Treating the
  // bytes as raw, paired with no encode in the compositor shader, makes the
  // round-trip byte-exact and matches the direct-render reference exactly.
  const colorTexture = new THREE.Texture()
  colorTexture.colorSpace = THREE.NoColorSpace
  colorTexture.minFilter = THREE.LinearFilter
  colorTexture.magFilter = THREE.LinearFilter
  colorTexture.generateMipmaps = false

  const depthTexture = new THREE.Texture()
  depthTexture.colorSpace = THREE.NoColorSpace
  depthTexture.minFilter = THREE.NearestFilter
  depthTexture.magFilter = THREE.NearestFilter
  depthTexture.generateMipmaps = false

  const stencilRef = config.stencilRef ?? PORTAL_STENCIL_REF
  const composeRaw = config.composeRaw ?? false
  // compose=raw forces noclip behaviour in the shader; otherwise honor debugMode.
  const debugModeInt = composeRaw ? 1 : debugModeToInt(config.debugMode ?? 'off')

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
    stencilWrite: !composeRaw,
    stencilFunc: composeRaw ? THREE.AlwaysStencilFunc : THREE.EqualStencilFunc,
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

  const peerWindow: Window | null =
    config.peerWindow ?? config.iframe?.contentWindow ?? null
  const peerSource: MessageEventSource | null | undefined =
    config.peerSource !== undefined
      ? config.peerSource
      : (config.iframe?.contentWindow ?? null)

  const onMessage = (ev: MessageEvent): void => {
    if (peerSource !== null && ev.source !== peerSource) return
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
      const win = peerWindow
      if (!win) return
      const msg: PortalSetPoseMessage = { type: 'portal:setPose', ...opts }
      win.postMessage(msg, config.iframeOrigin ?? '*')
    },
    renderAsDestination(renderer) {
      // TODO: screen-space reprojection to eliminate residual round-trip lag.
      // The compositor knows iframe's view*projection (lastViewProjection,
      // sent in 'portal:frame') AND can be given the host's CURRENT view*
      // projection at composite time. For each fragment: reconstruct iframe-
      // world position from depth (already done for the depth-clip), then
      // reproject through host_currentVP to get the screen position the
      // iframe pixel SHOULD have at the host's "now" pose. Sample iframe
      // color at that NDC instead of vUv. This cancels translation lag
      // independent of round-trip time and hides per-frame timing jitter
      // (especially useful for strafe, where lateral motion produces ~2x
      // more visible NDC delta per meter than forward motion). Rotation
      // reprojection requires a bit more care — sample-position depends on
      // both the position delta AND the orientation delta; works cleanly
      // for small per-frame rotations and degrades gracefully for large.
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
    },
    prewarm(renderer) {
      renderer.compile(compositorScene, compositorCamera)
    }
  }
}

export { PORTAL_STENCIL_REF }
