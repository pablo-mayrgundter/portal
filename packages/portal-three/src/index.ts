import * as THREE from 'three'
import { couplePoseAcrossPortal, type CoupledPoseConfig, type PortalAnchor } from '@spatial/portal-core'

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
  const coupled = couplePoseAcrossPortal({ position: [viewerPos.x, viewerPos.y, viewerPos.z] }, { source, target } satisfies CoupledPoseConfig)

  targetCamera.position.set(...coupled.position)
  targetCamera.lookAt(...target.position)
}

export const makePortalPlane = (size = new THREE.Vector2(2, 3)): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(size.x, size.y)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'portal-plane'
  return mesh
}

export const setPortalTexture = (mesh: THREE.Mesh, texture: THREE.Texture): void => {
  const material = mesh.material
  if (material instanceof THREE.MeshBasicMaterial) {
    material.map = texture
    material.needsUpdate = true
  }
}
