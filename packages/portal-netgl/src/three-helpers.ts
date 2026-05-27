// THREE-side helpers needed by `makeNetGLPortalTarget` and
// `makeNetGLPortalGuest`. Inlined from `@portal/portal-three` so portal-netgl
// can ship as a single npm package with no internal cross-workspace runtime
// deps. Shapes mirror their portal-three counterparts — if/when portal-three
// gets published, these become re-exports.

import * as THREE from 'three'
import type { PortalAnchor, Vec3 } from './portal-types'

/** Stencil-buffer value the host's portal mask paints inside the door rect. */
export const PORTAL_STENCIL_REF = 1

/**
 * Configure every material in the scene to test stencil-equal to
 * `stencilRef` (default 1 — what the host's portal mask paints). Combined
 * with the host having already cleared color/depth and painted the mask,
 * this means the embedded scene's draws only show inside the door region
 * and don't overwrite the host's worldA pixels outside it.
 *
 * Idempotent — calling repeatedly on the same scene is a no-op.
 */
export const applyPortalStencilTest = (
  scene: THREE.Object3D,
  stencilRef = PORTAL_STENCIL_REF
): void => {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh || !mesh.material) return
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    for (const mat of mats) {
      mat.stencilWrite = true
      mat.stencilFunc = THREE.EqualStencilFunc
      mat.stencilRef = stencilRef
      mat.stencilFail = THREE.KeepStencilOp
      mat.stencilZFail = THREE.KeepStencilOp
      mat.stencilZPass = THREE.KeepStencilOp
      mat.stencilWriteMask = 0
    }
  })
}

// Oblique near-plane clipping for portal cameras. Reused scratch state to
// avoid per-call allocation.
const _obliquePlane = new THREE.Plane()
const _obliqueNormal = new THREE.Vector3()
const _obliqueClip = new THREE.Vector4()
const _obliqueQ = new THREE.Vector4()

const dot3 = (a: Vec3, b: Vec3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

const normalizeInto = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2])
  if (l === 0) return [0, 0, 0]
  return [v[0] / l, v[1] / l, v[2] / l]
}

/**
 * Mutates `camera.projectionMatrix` so the near plane is the portal anchor's
 * plane — clipping any geometry on the CAMERA side of the door at rasterise
 * time. Without this, geometry between the camera and the door would render
 * + occlude the (correct) geometry beyond. Pairs with the host's stencil
 * mask: stencil handles the screen-space halfspace; oblique clip handles the
 * world-space plane.
 *
 * Reference: Eric Lengyel, "Oblique View Frustum Depth Projection and
 * Clipping" (Journal of Game Development, 2005).
 */
export const applyObliqueClipFromAnchor = (
  camera: THREE.PerspectiveCamera,
  anchor: PortalAnchor
): void => {
  const camPos: Vec3 = [camera.position.x, camera.position.y, camera.position.z]
  let normal = normalizeInto(anchor.normal)
  let constant = -dot3(normal, anchor.position)
  // Flip the plane so the camera is on the positive side.
  if (dot3(normal, camPos) + constant > 0) {
    normal = [-normal[0], -normal[1], -normal[2]]
    constant = -constant
  }

  _obliqueNormal.set(normal[0], normal[1], normal[2])
  _obliquePlane.set(_obliqueNormal, constant)
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
  const clipBias = 0.0001
  m[2] = _obliqueClip.x * s
  m[6] = _obliqueClip.y * s
  m[10] = _obliqueClip.z * s + 1 - clipBias
  m[14] = _obliqueClip.w * s
}
