import * as THREE from 'three'
import {
  couplePoseAcrossPortal,
  type CoupledPoseConfig,
  type PortalAnchor,
  type PortalPose,
  type Vec3
} from '@portal/portal-core'

const asAnchor = (object: THREE.Object3D, normal = new THREE.Vector3(0, 0, 1)): PortalAnchor => {
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

const applyObliqueNearPlane = (
  camera: THREE.PerspectiveCamera,
  portalPlane: THREE.Object3D,
  portalNormal: THREE.Vector3
): void => {
  const portalPos = new THREE.Vector3()
  const portalQuat = new THREE.Quaternion()
  portalPlane.getWorldPosition(portalPos)
  portalPlane.getWorldQuaternion(portalQuat)
  const worldNormal = portalNormal.clone().applyQuaternion(portalQuat).normalize()

  const camPos = new THREE.Vector3()
  camera.getWorldPosition(camPos)

  const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(worldNormal, portalPos)

  if (plane.distanceToPoint(camPos) > 0) {
    plane.normal.negate()
    plane.constant = -plane.constant
  }

  plane.applyMatrix4(camera.matrixWorldInverse)

  const clipPlane = new THREE.Vector4(plane.normal.x, plane.normal.y, plane.normal.z, plane.constant)

  const proj = camera.projectionMatrix
  const m = proj.elements

  const q = new THREE.Vector4(
    (Math.sign(clipPlane.x) + m[8]) / m[0],
    (Math.sign(clipPlane.y) + m[9]) / m[5],
    -1,
    (1 + m[10]) / m[14]
  )

  const c = clipPlane.clone().multiplyScalar(2 / clipPlane.dot(q))

  const clipBias = 0.0001
  m[2] = c.x
  m[6] = c.y
  m[10] = c.z + 1 - clipBias
  m[14] = c.w
}

export const updateCoupledCamera = (
  viewerCamera: THREE.PerspectiveCamera,
  sourcePortal: THREE.Object3D,
  targetPortal: THREE.Object3D,
  targetCamera: THREE.PerspectiveCamera,
  portalNormal = new THREE.Vector3(0, 0, 1)
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

  applyObliqueNearPlane(targetCamera, targetPortal, portalNormal)
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
  const portalPos = new THREE.Vector3()
  const portalQuat = new THREE.Quaternion()
  portal.getWorldPosition(portalPos)
  portal.getWorldQuaternion(portalQuat)

  const n = portalNormal.clone().applyQuaternion(portalQuat).normalize()
  const dPrev = prev.clone().sub(portalPos).dot(n)
  const dCurr = curr.clone().sub(portalPos).dot(n)

  if (dPrev === dCurr || Math.sign(dPrev) === Math.sign(dCurr)) {
    return { crossed: false, signedDistance: dCurr, t: 0 }
  }

  const t = dPrev / (dPrev - dCurr)
  const crossPoint = prev.clone().lerp(curr, t)

  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(portalQuat)
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(portalQuat)
  const local = crossPoint.sub(portalPos)
  const lx = local.dot(right)
  const ly = local.dot(up)

  const size = portal.userData.portalSize as THREE.Vector2 | undefined
  const halfW = size ? size.x / 2 : 1
  const halfH = size ? size.y / 2 : 1.5

  const inside = Math.abs(lx) <= halfW && Math.abs(ly) <= halfH
  return { crossed: inside, signedDistance: dCurr, t }
}

export const makePortalPlane = (size = new THREE.Vector2(2, 3)): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(size.x, size.y)
  const material = new THREE.MeshBasicMaterial({ visible: false })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'portal-plane'
  mesh.userData.portalSize = size.clone()
  return mesh
}

const portalOverlayVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const portalOverlayFragmentShader = `
uniform sampler2D portalTexture;
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

  vec4 color = texture2D(portalTexture, vUv);
  gl_FragColor = vec4(linearToSRGB(color.rgb), 1.0);
}
`

export type PortalOverlay = {
  scene: THREE.Scene
  camera: THREE.OrthographicCamera
  update: (
    anchor: THREE.Object3D,
    hostCamera: THREE.PerspectiveCamera,
    texture: THREE.Texture
  ) => void
}

export const makePortalOverlay = (): PortalOverlay => {
  const uniforms = {
    portalTexture: { value: null as THREE.Texture | null },
    portalPos: { value: new THREE.Vector3() },
    portalNormal: { value: new THREE.Vector3() },
    portalRight: { value: new THREE.Vector3() },
    portalUp: { value: new THREE.Vector3() },
    portalHalfW: { value: 1.0 },
    portalHalfH: { value: 1.5 },
    hostCameraPos: { value: new THREE.Vector3() },
    hostInverseViewProjection: { value: new THREE.Matrix4() },
    hostViewMatrix: { value: new THREE.Matrix4() },
    hostProjectionMatrix: { value: new THREE.Matrix4() }
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: portalOverlayVertexShader,
    fragmentShader: portalOverlayFragmentShader,
    depthTest: true,
    depthWrite: true,
    side: THREE.DoubleSide
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
    texture: THREE.Texture
  ): void => {
    const size = anchor.userData.portalSize as THREE.Vector2 | undefined
    uniforms.portalHalfW.value = size ? size.x / 2 : 1
    uniforms.portalHalfH.value = size ? size.y / 2 : 1.5

    anchor.getWorldPosition(uniforms.portalPos.value)
    anchor.getWorldQuaternion(_quat)
    uniforms.portalNormal.value.copy(_localNormal).applyQuaternion(_quat)
    uniforms.portalRight.value.copy(_localRight).applyQuaternion(_quat)
    uniforms.portalUp.value.copy(_localUp).applyQuaternion(_quat)

    uniforms.portalTexture.value = texture

    hostCam.getWorldPosition(uniforms.hostCameraPos.value)
    _viewProj.multiplyMatrices(hostCam.projectionMatrix, hostCam.matrixWorldInverse)
    uniforms.hostInverseViewProjection.value.copy(_viewProj).invert()
    uniforms.hostViewMatrix.value.copy(hostCam.matrixWorldInverse)
    uniforms.hostProjectionMatrix.value.copy(hostCam.projectionMatrix)
  }

  return { scene, camera, update }
}
