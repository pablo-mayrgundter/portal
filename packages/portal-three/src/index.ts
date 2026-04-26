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

export const updateCoupledCamera = (
  viewerCamera: THREE.Camera,
  sourcePortal: THREE.Object3D,
  targetPortal: THREE.Object3D,
  targetCamera: THREE.PerspectiveCamera,
  portalNormal = new THREE.Vector3(0, 0, 1)
): void => {
  const viewerPos = new THREE.Vector3()
  viewerCamera.getWorldPosition(viewerPos)

  const source = asAnchor(sourcePortal, portalNormal)
  const target = asAnchor(targetPortal, portalNormal)
  const coupled = couplePoseAcrossPortal(
    { position: [viewerPos.x, viewerPos.y, viewerPos.z] },
    { source, target } satisfies CoupledPoseConfig
  )

  targetCamera.position.set(...coupled.position)
  targetCamera.lookAt(...target.position)
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
): TraversalPose => {
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

  const coupled = couplePoseAcrossPortal(pose, { source, target })
  return {
    position: coupled.position,
    forward: coupled.forward ?? [0, 0, -1],
    up: coupled.up ?? [0, 1, 0]
  }
}

export type PortalCrossing = {
  crossed: boolean
  signedDistance: number
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
    return { crossed: false, signedDistance: dCurr }
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
  return { crossed: inside, signedDistance: dCurr }
}

export const makePortalPlane = (size = new THREE.Vector2(2, 3)): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(size.x, size.y)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.FrontSide })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'portal-plane'
  mesh.userData.portalSize = size.clone()
  return mesh
}

export const setPortalTexture = (mesh: THREE.Mesh, texture: THREE.Texture): void => {
  const material = mesh.material
  if (material instanceof THREE.MeshBasicMaterial) {
    material.map = texture
    material.needsUpdate = true
  }
}
