import * as THREE from 'three'
import {
  couplePoseAcrossPortal,
  intersectSegmentWithDoor,
  obliqueClipPlaneForCamera,
  type ColorRGB,
  type CoupledPoseConfig,
  type PortalAnchor,
  type PortalEndpoint,
  type PortalPose,
  type Vec3
} from '@portal/portal-core'

export const asAnchor = (object: THREE.Object3D, normal = new THREE.Vector3(0, 0, 1)): PortalAnchor => {
  const worldPos = new THREE.Vector3()
  const worldQuat = new THREE.Quaternion()
  object.getWorldPosition(worldPos)
  object.getWorldQuaternion(worldQuat)

  const worldNormal = normal.clone().applyQuaternion(worldQuat).normalize()
  const worldUp = new THREE.Vector3(0, 1, 0).applyQuaternion(worldQuat).normalize()

  return {
    position: [worldPos.x, worldPos.y, worldPos.z],
    normal: [worldNormal.x, worldNormal.y, worldNormal.z],
    up: [worldUp.x, worldUp.y, worldUp.z]
  }
}

const computeCoupledPose = (
  viewerCamera: THREE.Camera,
  sourcePortal: THREE.Object3D,
  targetPortal: THREE.Object3D,
  portalNormal: THREE.Vector3
): { position: Vec3; forward: Vec3; up: Vec3 } => {
  const viewerPos = new THREE.Vector3()
  const viewerQuat = new THREE.Quaternion()
  viewerCamera.getWorldPosition(viewerPos)
  viewerCamera.getWorldQuaternion(viewerQuat)

  const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(viewerQuat)
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(viewerQuat)

  const source = asAnchor(sourcePortal, portalNormal)
  const target = asAnchor(targetPortal, portalNormal)

  const pose: PortalPose = {
    position: [viewerPos.x, viewerPos.y, viewerPos.z],
    forward: [fwd.x, fwd.y, fwd.z],
    up: [up.x, up.y, up.z]
  }

  const coupled = couplePoseAcrossPortal(pose, { source, target } satisfies CoupledPoseConfig)

  return {
    position: coupled.position,
    forward: coupled.forward ?? [0, 0, -1],
    up: coupled.up ?? [0, 1, 0]
  }
}

/**
 * Modify a perspective camera's projection matrix to use the supplied portal
 * anchor as its near clip plane (Eric Lengyel's oblique near-plane technique).
 * Geometry on the camera-side of the anchor is culled at the rasterizer (clip
 * test). Used by both the local portal pipeline and the iframe portal target.
 *
 * The anchor's `position` and `normal` MUST already be in world coordinates.
 * For a `THREE.Object3D` portal mesh, derive a world-space `PortalAnchor` via
 * `asAnchor(mesh, normal)` first.
 *
 * Mutates `camera.projectionMatrix` in place. Call AFTER you've set the
 * camera's pose AND its base projection matrix; the result will only be
 * meaningful until the next `updateProjectionMatrix()`/`fromArray()` call.
 *
 * Pre-allocates its scratch state so it's safe to call every frame.
 */
const _obliquePlane = new THREE.Plane()
const _obliqueNormal = new THREE.Vector3()
const _obliqueClip = new THREE.Vector4()
const _obliqueQ = new THREE.Vector4()
const _obliqueCamPos: Vec3 = [0, 0, 0]
export const applyObliqueClipFromAnchor = (
  camera: THREE.PerspectiveCamera,
  anchor: PortalAnchor
): void => {
  _obliqueCamPos[0] = camera.position.x
  _obliqueCamPos[1] = camera.position.y
  _obliqueCamPos[2] = camera.position.z
  const oblique = obliqueClipPlaneForCamera(_obliqueCamPos, anchor.position, anchor.normal)
  _obliqueNormal.set(oblique.normal[0], oblique.normal[1], oblique.normal[2])
  _obliquePlane.set(_obliqueNormal, oblique.constant)
  _obliquePlane.applyMatrix4(camera.matrixWorldInverse)
  _obliqueClip.set(
    _obliquePlane.normal.x,
    _obliquePlane.normal.y,
    _obliquePlane.normal.z,
    _obliquePlane.constant
  )
  const m = camera.projectionMatrix.elements
  _obliqueQ.set(
    (Math.sign(_obliqueClip.x) + m[8]) / m[0],
    (Math.sign(_obliqueClip.y) + m[9]) / m[5],
    -1,
    (1 + m[10]) / m[14]
  )
  const denom = _obliqueClip.dot(_obliqueQ)
  if (Math.abs(denom) < 1e-6) return
  const s = 2 / denom
  const cx = _obliqueClip.x * s
  const cy = _obliqueClip.y * s
  const cz = _obliqueClip.z * s
  const cw = _obliqueClip.w * s
  const clipBias = 0.0001
  m[2] = cx
  m[6] = cy
  m[10] = cz + 1 - clipBias
  m[14] = cw
}

const applyObliqueNearPlane = (
  camera: THREE.PerspectiveCamera,
  portalPlane: THREE.Object3D,
  portalNormal: THREE.Vector3
): void => {
  applyObliqueClipFromAnchor(camera, asAnchor(portalPlane, portalNormal))
}

export const updateCoupledCamera = (
  viewerCamera: THREE.PerspectiveCamera,
  sourcePortal: THREE.Object3D,
  targetPortal: THREE.Object3D,
  targetCamera: THREE.PerspectiveCamera,
  portalNormal = new THREE.Vector3(0, 0, 1),
  applyOblique = false
): void => {
  targetCamera.fov = viewerCamera.fov
  targetCamera.aspect = viewerCamera.aspect
  targetCamera.near = viewerCamera.near
  targetCamera.far = viewerCamera.far

  const coupled = computeCoupledPose(viewerCamera, sourcePortal, targetPortal, portalNormal)
  targetCamera.position.set(...coupled.position)
  targetCamera.up.set(...coupled.up)
  const lookTarget = new THREE.Vector3(
    coupled.position[0] + coupled.forward[0],
    coupled.position[1] + coupled.forward[1],
    coupled.position[2] + coupled.forward[2]
  )
  targetCamera.lookAt(lookTarget)
  targetCamera.updateMatrixWorld()
  targetCamera.updateProjectionMatrix()

  if (applyOblique) applyObliqueNearPlane(targetCamera, targetPortal, portalNormal)
}

export type TraversalPose = {
  position: Vec3
  forward: Vec3
  up: Vec3
}

export const computeTraversalPose = (
  viewerCamera: THREE.Camera,
  sourcePortal: THREE.Object3D,
  targetPortal: THREE.Object3D,
  portalNormal = new THREE.Vector3(0, 0, 1)
): TraversalPose => computeCoupledPose(viewerCamera, sourcePortal, targetPortal, portalNormal)

export type PortalCrossing = {
  crossed: boolean
  signedDistance: number
  t: number
}

export const detectPortalCrossing = (
  prev: THREE.Vector3,
  curr: THREE.Vector3,
  portal: THREE.Object3D,
  portalNormal = new THREE.Vector3(0, 0, 1)
): PortalCrossing => {
  const anchor = asAnchor(portal, portalNormal)
  const size = portal.userData.portalSize as THREE.Vector2 | undefined
  const halfW = size ? size.x / 2 : 1
  const halfH = size ? size.y / 2 : 1.5
  const result = intersectSegmentWithDoor(
    [prev.x, prev.y, prev.z],
    [curr.x, curr.y, curr.z],
    anchor,
    halfW,
    halfH
  )
  return { crossed: result.crossed, signedDistance: result.signedDistanceCurr, t: result.t }
}

export const makePortalPlane = (size = new THREE.Vector2(2, 3)): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(size.x, size.y)
  const material = new THREE.MeshBasicMaterial({ visible: false })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'portal-plane'
  mesh.userData.portalSize = size.clone()
  return mesh
}

const portalStencilMaskVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const portalStencilMaskFragmentShader = `
uniform vec3 portalPos;
uniform vec3 portalNormal;
uniform vec3 portalRight;
uniform vec3 portalUp;
uniform float portalHalfW;
uniform float portalHalfH;
uniform vec3 hostCameraPos;
uniform mat4 hostInverseViewProjection;
uniform mat4 hostViewMatrix;
uniform mat4 hostProjectionMatrix;
uniform vec3 destinationBackground;

varying vec2 vUv;

vec3 linearToSRGB(vec3 v) {
  return mix(
    pow(v, vec3(0.41666)) * 1.055 - vec3(0.055),
    v * 12.92,
    vec3(lessThanEqual(v, vec3(0.0031308)))
  );
}

void main() {
  if (dot(hostCameraPos - portalPos, portalNormal) < 0.0) discard;

  vec4 farClipPos = hostInverseViewProjection * vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
  vec3 rayDir = normalize(farClipPos.xyz / farClipPos.w - hostCameraPos);

  float denom = dot(rayDir, portalNormal);
  if (denom > -1e-6) discard;
  float t = dot(portalPos - hostCameraPos, portalNormal) / denom;
  if (t < 0.0) discard;

  vec3 hitPos = hostCameraPos + t * rayDir;
  vec3 hitRel = hitPos - portalPos;
  float lx = dot(hitRel, portalRight);
  float ly = dot(hitRel, portalUp);
  if (abs(lx) > portalHalfW || abs(ly) > portalHalfH) discard;

  vec4 hitClip = hostProjectionMatrix * hostViewMatrix * vec4(hitPos, 1.0);
  gl_FragDepth = (hitClip.z / hitClip.w) * 0.5 + 0.5;

  gl_FragColor = vec4(linearToSRGB(destinationBackground), 1.0);
}
`

export type PortalStencilMask = {
  scene: THREE.Scene
  camera: THREE.OrthographicCamera
  update: (
    anchor: THREE.Object3D,
    hostCamera: THREE.PerspectiveCamera,
    destinationBackground: THREE.Color
  ) => void
}

export const PORTAL_STENCIL_REF = 1

export const makePortalStencilMask = (stencilRef = PORTAL_STENCIL_REF): PortalStencilMask => {
  const uniforms = {
    portalPos: { value: new THREE.Vector3() },
    portalNormal: { value: new THREE.Vector3() },
    portalRight: { value: new THREE.Vector3() },
    portalUp: { value: new THREE.Vector3() },
    portalHalfW: { value: 1.0 },
    portalHalfH: { value: 1.5 },
    hostCameraPos: { value: new THREE.Vector3() },
    hostInverseViewProjection: { value: new THREE.Matrix4() },
    hostViewMatrix: { value: new THREE.Matrix4() },
    hostProjectionMatrix: { value: new THREE.Matrix4() },
    destinationBackground: { value: new THREE.Vector3(0, 0, 0) }
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: portalStencilMaskVertexShader,
    fragmentShader: portalStencilMaskFragmentShader,
    depthTest: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    stencilWrite: true,
    stencilFunc: THREE.AlwaysStencilFunc,
    stencilRef,
    stencilFail: THREE.KeepStencilOp,
    stencilZFail: THREE.KeepStencilOp,
    stencilZPass: THREE.ReplaceStencilOp,
    stencilWriteMask: 0xff
  })

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  mesh.frustumCulled = false

  const scene = new THREE.Scene()
  scene.add(mesh)

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const _viewProj = new THREE.Matrix4()
  const _localNormal = new THREE.Vector3(0, 0, 1)
  const _localRight = new THREE.Vector3(1, 0, 0)
  const _localUp = new THREE.Vector3(0, 1, 0)
  const _quat = new THREE.Quaternion()

  const update = (
    anchor: THREE.Object3D,
    hostCam: THREE.PerspectiveCamera,
    destinationBackground: THREE.Color
  ): void => {
    const size = anchor.userData.portalSize as THREE.Vector2 | undefined
    uniforms.portalHalfW.value = size ? size.x / 2 : 1
    uniforms.portalHalfH.value = size ? size.y / 2 : 1.5

    anchor.getWorldPosition(uniforms.portalPos.value)
    anchor.getWorldQuaternion(_quat)
    uniforms.portalNormal.value.copy(_localNormal).applyQuaternion(_quat)
    uniforms.portalRight.value.copy(_localRight).applyQuaternion(_quat)
    uniforms.portalUp.value.copy(_localUp).applyQuaternion(_quat)

    hostCam.getWorldPosition(uniforms.hostCameraPos.value)
    _viewProj.multiplyMatrices(hostCam.projectionMatrix, hostCam.matrixWorldInverse)
    uniforms.hostInverseViewProjection.value.copy(_viewProj).invert()
    uniforms.hostViewMatrix.value.copy(hostCam.matrixWorldInverse)
    uniforms.hostProjectionMatrix.value.copy(hostCam.projectionMatrix)

    uniforms.destinationBackground.value.set(
      destinationBackground.r,
      destinationBackground.g,
      destinationBackground.b
    )
  }

  return { scene, camera, update }
}

const forEachMaterial = (scene: THREE.Object3D, fn: (mat: THREE.Material) => void): void => {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh || !mesh.material) return
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    for (const mat of mats) fn(mat)
  })
}

export const applyPortalStencilTest = (
  scene: THREE.Object3D,
  stencilRef = PORTAL_STENCIL_REF
): void => {
  forEachMaterial(scene, (mat) => {
    mat.stencilWrite = true
    mat.stencilFunc = THREE.EqualStencilFunc
    mat.stencilRef = stencilRef
    mat.stencilFail = THREE.KeepStencilOp
    mat.stencilZFail = THREE.KeepStencilOp
    mat.stencilZPass = THREE.KeepStencilOp
    mat.stencilWriteMask = 0
  })
}

export const clearPortalStencilTest = (scene: THREE.Object3D): void => {
  forEachMaterial(scene, (mat) => {
    mat.stencilWrite = false
  })
}

/**
 * Axis-aligned pixel-space rectangle covering a portal-anchor mesh as seen
 * from `camera`. Computed by projecting the four corners of the anchor
 * mesh's local-space [-halfW..+halfW] × [-halfH..+halfH] plane through the
 * camera and taking the bounding box of the resulting NDC coordinates,
 * remapped to pixel coords using `viewport`.
 *
 * Useful for door-fit compositing: an embedded NetGL target renders to its
 * fullscreen viewport; the host computes this rect each frame and feeds it
 * to `makeNetGLReplay`'s `remapScreenViewport` so the embedded app's
 * default-framebuffer draws land inside the door rect instead of overdrawing
 * the host canvas.
 *
 * The rect is clipped to the viewport — door corners behind the camera or
 * outside the visible frustum get clamped. Returns `null` when ALL corners
 * project behind the camera (rect is meaningless / not visible).
 */
export type PixelRect = {
  x: number
  y: number
  w: number
  h: number
}

const portalProjScratch = new THREE.Vector3()

export const portalScreenRect = (
  anchor: THREE.Object3D,
  camera: THREE.Camera,
  viewport: { width: number; height: number },
  halfExtents?: { halfWidth: number; halfHeight: number }
): PixelRect | null => {
  // Pull halfW/halfH from explicit arg, or fall back to `makePortalPlane`'s
  // userData.portalSize (a Vector2 of full w/h). Else default to a unit quad
  // centred on the anchor's origin.
  let halfW: number
  let halfH: number
  if (halfExtents) {
    halfW = halfExtents.halfWidth
    halfH = halfExtents.halfHeight
  } else {
    const size = (anchor as THREE.Object3D & {
      userData?: { portalSize?: THREE.Vector2 }
    }).userData?.portalSize
    halfW = size ? size.x / 2 : 0.5
    halfH = size ? size.y / 2 : 0.5
  }

  anchor.updateMatrixWorld(true)
  if (!camera.matrixWorldInverse) return null

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let visibleCorners = 0

  for (let i = 0; i < 4; i += 1) {
    const lx = (i & 1) === 0 ? -halfW : halfW
    const ly = (i & 2) === 0 ? -halfH : halfH
    portalProjScratch.set(lx, ly, 0)
    portalProjScratch.applyMatrix4(anchor.matrixWorld)
    portalProjScratch.project(camera)
    // .project returns NDC where z > 1 means behind the camera in
    // three's projection convention. Skip those corners; if none are in
    // front, the door isn't visible at all.
    if (portalProjScratch.z > 1) continue
    visibleCorners += 1
    const px = (portalProjScratch.x + 1) * 0.5 * viewport.width
    const py = (portalProjScratch.y + 1) * 0.5 * viewport.height
    if (px < minX) minX = px
    if (px > maxX) maxX = px
    if (py < minY) minY = py
    if (py > maxY) maxY = py
  }

  if (visibleCorners === 0) return null

  // Clip to the viewport. gl.viewport tolerates out-of-range coords (clips
  // when drawing), but keeping the rect inside the canvas means the
  // embedded app's content stays within the user's view rather than being
  // partially scissored off-canvas.
  const x = Math.max(0, Math.floor(minX))
  const y = Math.max(0, Math.floor(minY))
  const x2 = Math.min(viewport.width, Math.ceil(maxX))
  const y2 = Math.min(viewport.height, Math.ceil(maxY))
  const w = Math.max(0, x2 - x)
  const h = Math.max(0, y2 - y)
  if (w === 0 || h === 0) return null
  return { x, y, w, h }
}

/**
 * A `PortalEndpoint` backed by a local THREE.Scene + anchor mesh.
 *
 * This is where the per-frame hidden contract lives:
 * - applies stencil-test settings to every material in the scene before a
 *   destination render and resets them after
 * - swaps `scene.background` to `null` for the destination render so the
 *   scene's bg color doesn't overwrite source pixels outside the stencil
 *
 * Plain three.js scenes stay plain; the host never has to know about any of
 * this.
 */
export type LocalPortalEndpoint = PortalEndpoint & {
  scene: THREE.Scene
  anchor: THREE.Object3D
  renderAsSource(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera): void
  renderAsDestination(renderer: THREE.WebGLRenderer, portalCamera: THREE.PerspectiveCamera): void
}

const _anchorTmpQuat = new THREE.Quaternion()
const _anchorTmpPos = new THREE.Vector3()
const _anchorTmpNormal = new THREE.Vector3()
const _anchorTmpUp = new THREE.Vector3()

const colorOf = (scene: THREE.Scene, override?: THREE.Color): THREE.Color => {
  if (override) return override
  if (scene.background instanceof THREE.Color) return scene.background
  return new THREE.Color(0, 0, 0)
}

export const makeLocalEndpoint = (opts: {
  scene: THREE.Scene
  anchor: THREE.Object3D
  background?: THREE.Color
  tick?: (t: number) => void
  portalNormal?: THREE.Vector3
  stencilRef?: number
}): LocalPortalEndpoint => {
  const { scene, anchor } = opts
  const portalNormal = opts.portalNormal ?? new THREE.Vector3(0, 0, 1)
  const stencilRef = opts.stencilRef ?? PORTAL_STENCIL_REF

  const getAnchor = (): PortalAnchor => {
    anchor.getWorldPosition(_anchorTmpPos)
    anchor.getWorldQuaternion(_anchorTmpQuat)
    _anchorTmpNormal.copy(portalNormal).applyQuaternion(_anchorTmpQuat).normalize()
    _anchorTmpUp.set(0, 1, 0).applyQuaternion(_anchorTmpQuat).normalize()
    const size = anchor.userData.portalSize as THREE.Vector2 | undefined
    return {
      position: [_anchorTmpPos.x, _anchorTmpPos.y, _anchorTmpPos.z],
      normal: [_anchorTmpNormal.x, _anchorTmpNormal.y, _anchorTmpNormal.z],
      up: [_anchorTmpUp.x, _anchorTmpUp.y, _anchorTmpUp.z],
      halfWidth: size ? size.x / 2 : undefined,
      halfHeight: size ? size.y / 2 : undefined
    }
  }

  const getBackground = (): ColorRGB => {
    const c = colorOf(scene, opts.background)
    return { r: c.r, g: c.g, b: c.b }
  }

  return {
    scene,
    anchor,
    getAnchor,
    getBackground,
    tick: opts.tick,
    renderAsSource(renderer, camera) {
      renderer.render(scene, camera)
    },
    renderAsDestination(renderer, portalCamera) {
      const savedBg = scene.background
      scene.background = null
      applyPortalStencilTest(scene, stencilRef)
      renderer.render(scene, portalCamera)
      clearPortalStencilTest(scene)
      scene.background = savedBg
    }
  }
}

/**
 * Pipeline that owns the per-frame portal dance: clear, source render, halfspace
 * stencil mask, depth re-clear, destination render, traversal handoff. Swaps
 * which endpoint is "here" / "there" when the host crosses the door extent.
 *
 * The host shrinks to: instantiate two endpoints, instantiate a link, call
 * `link.frame(...)` per tick, and react to `teleported` by re-syncing its own
 * controls to the new host camera orientation.
 */
export type PortalLinkFrameOpts = {
  renderer: THREE.WebGLRenderer
  hostCamera: THREE.PerspectiveCamera
  time: number
}

export type PortalLinkFrameResult = {
  teleported: boolean
  here: 'a' | 'b'
}

export type PortalLink = {
  frame(opts: PortalLinkFrameOpts): PortalLinkFrameResult
}

export const makePortalLink = (opts: {
  a: LocalPortalEndpoint
  b: LocalPortalEndpoint
  portalNormal?: THREE.Vector3
  applyOblique?: boolean
}): PortalLink => {
  let here = opts.a
  let there = opts.b
  let hereId: 'a' | 'b' = 'a'

  const portalNormal = opts.portalNormal ?? new THREE.Vector3(0, 0, 1)
  const applyOblique = opts.applyOblique ?? true

  const portalCamera = new THREE.PerspectiveCamera()
  const stencilMask = makePortalStencilMask()
  const prevPos = new THREE.Vector3()
  const thereBg = new THREE.Color()
  const lookTarget = new THREE.Vector3()
  let initialized = false

  const frame = ({ renderer, hostCamera, time }: PortalLinkFrameOpts): PortalLinkFrameResult => {
    if (!initialized) {
      prevPos.copy(hostCamera.position)
      initialized = true
    }

    opts.a.tick?.(time)
    opts.b.tick?.(time)

    let teleported = false
    const crossing = detectPortalCrossing(prevPos, hostCamera.position, here.anchor, portalNormal)
    if (crossing.crossed) {
      const traversed = computeTraversalPose(hostCamera, here.anchor, there.anchor, portalNormal)
      hostCamera.position.set(...traversed.position)
      hostCamera.up.set(...traversed.up)
      lookTarget.set(
        traversed.position[0] + traversed.forward[0],
        traversed.position[1] + traversed.forward[1],
        traversed.position[2] + traversed.forward[2]
      )
      hostCamera.lookAt(lookTarget)
      const swap = here
      here = there
      there = swap
      hereId = hereId === 'a' ? 'b' : 'a'
      teleported = true
    }

    updateCoupledCamera(hostCamera, here.anchor, there.anchor, portalCamera, portalNormal, applyOblique)

    renderer.setRenderTarget(null)
    renderer.clear(true, true, true)

    here.renderAsSource(renderer, hostCamera)

    const tbg = there.getBackground()
    thereBg.setRGB(tbg.r, tbg.g, tbg.b)
    stencilMask.update(here.anchor, hostCamera, thereBg)
    renderer.render(stencilMask.scene, stencilMask.camera)

    renderer.clearDepth()

    there.renderAsDestination(renderer, portalCamera)

    prevPos.copy(hostCamera.position)
    return { teleported, here: hereId }
  }

  return { frame }
}
