import * as THREE from 'three'
import {
  couplePoseAcrossPortal,
  type CoupledPoseConfig,
  type PortalAnchor,
  type PortalPose,
  type Vec3
} from '@spatial/portal-core'

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

const portalVertexShader = `
varying vec4 vClipPos;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vClipPos = projectionMatrix * mvPosition;
  gl_Position = vClipPos;
}
`

const portalFragmentShader = `
uniform sampler2D portalTexture;
varying vec4 vClipPos;

vec3 linearToSRGB(vec3 value) {
  return mix(
    pow(value, vec3(0.41666)) * 1.055 - vec3(0.055),
    value * 12.92,
    vec3(lessThanEqual(value, vec3(0.0031308)))
  );
}

void main() {
  vec2 ndc = vClipPos.xy / vClipPos.w;
  vec2 uv = ndc * 0.5 + 0.5;
  vec4 color = texture2D(portalTexture, uv);
  gl_FragColor = vec4(linearToSRGB(color.rgb), color.a);
}
`

export const makePortalPlane = (size = new THREE.Vector2(2, 3)): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(size.x, size.y)
  const material = new THREE.ShaderMaterial({
    uniforms: {
      portalTexture: { value: null }
    },
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader,
    side: THREE.FrontSide
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'portal-plane'
  mesh.userData.portalSize = size.clone()
  return mesh
}

export const setPortalTexture = (mesh: THREE.Mesh, texture: THREE.Texture): void => {
  const material = mesh.material
  if (material instanceof THREE.ShaderMaterial) {
    material.uniforms.portalTexture.value = texture
    material.uniformsNeedUpdate = true
  }
}
