export type Vec3 = [number, number, number]

export type PortalPose = {
  position: Vec3
  forward?: Vec3
  up?: Vec3
}

export type PortalAnchor = {
  position: Vec3
  normal: Vec3
  up: Vec3
  halfWidth?: number
  halfHeight?: number
}

export type ColorRGB = { r: number; g: number; b: number }

/**
 * Common contract every portal-side endpoint conforms to, regardless of whether
 * it's a local THREE.Scene, an iframe, an offscreen renderer, or a WebRTC peer.
 *
 * Transports add their own rendering API on top (the local endpoint exposes
 * scene + renderAsSource/renderAsDestination, the iframe endpoint will expose
 * a postMessage frame request, etc.). PortalLink is the consumer that knows
 * how to drive both.
 */
export interface PortalEndpoint {
  getAnchor(): PortalAnchor
  getBackground(): ColorRGB
  tick?(t: number): void
  enter?(state: unknown): void
}

export type CoupledPoseConfig = {
  source: PortalAnchor
  target: PortalAnchor
}

type Basis = {
  right: Vec3
  up: Vec3
  normal: Vec3
}

const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const scale = (v: Vec3, s: number): Vec3 => [v[0] * s, v[1] * s, v[2] * s]
const dot = (a: Vec3, b: Vec3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]
]

const normalize = (v: Vec3): Vec3 => {
  const len = Math.hypot(v[0], v[1], v[2])
  return len > 0 ? [v[0] / len, v[1] / len, v[2] / len] : [0, 0, 1]
}

const toBasis = (anchor: PortalAnchor): Basis => {
  const normal = normalize(anchor.normal)
  const upHint = normalize(anchor.up)
  const right = normalize(cross(upHint, normal))
  const up = normalize(cross(normal, right))
  return { right, up, normal }
}

const project = (v: Vec3, basis: Basis): Vec3 => [dot(v, basis.right), dot(v, basis.up), dot(v, basis.normal)]

const unproject = (v: Vec3, basis: Basis): Vec3 =>
  add(add(scale(basis.right, v[0]), scale(basis.up, v[1])), scale(basis.normal, v[2]))

const mirrorAcrossPortal = (v: Vec3): Vec3 => [-v[0], v[1], -v[2]]

const transferDirection = (dir: Vec3, sourceBasis: Basis, targetBasis: Basis): Vec3 =>
  normalize(unproject(mirrorAcrossPortal(project(dir, sourceBasis)), targetBasis))

export const couplePoseAcrossPortal = (pose: PortalPose, config: CoupledPoseConfig): PortalPose => {
  const sourceBasis = toBasis(config.source)
  const targetBasis = toBasis(config.target)

  const relative = sub(pose.position, config.source.position)
  const positionInSource = project(relative, sourceBasis)
  const positionMapped = mirrorAcrossPortal(positionInSource)

  const result: PortalPose = {
    position: add(config.target.position, unproject(positionMapped, targetBasis))
  }

  if (pose.forward) result.forward = transferDirection(pose.forward, sourceBasis, targetBasis)
  if (pose.up) result.up = transferDirection(pose.up, sourceBasis, targetBasis)

  return result
}

export type SegmentPlaneIntersection = {
  crossed: boolean
  signedDistanceCurr: number
  t: number
  point: Vec3
}

export const intersectSegmentWithPlane = (
  prev: Vec3,
  curr: Vec3,
  planePos: Vec3,
  planeNormal: Vec3
): SegmentPlaneIntersection => {
  const n = normalize(planeNormal)
  const dPrev = dot(sub(prev, planePos), n)
  const dCurr = dot(sub(curr, planePos), n)
  if (dPrev === dCurr || Math.sign(dPrev) === Math.sign(dCurr)) {
    return { crossed: false, signedDistanceCurr: dCurr, t: 0, point: curr }
  }
  const t = dPrev / (dPrev - dCurr)
  const point: Vec3 = [
    prev[0] + (curr[0] - prev[0]) * t,
    prev[1] + (curr[1] - prev[1]) * t,
    prev[2] + (curr[2] - prev[2]) * t
  ]
  return { crossed: true, signedDistanceCurr: dCurr, t, point }
}

export const projectOntoPlaneRect = (
  point: Vec3,
  planePos: Vec3,
  planeRight: Vec3,
  planeUp: Vec3
): { x: number; y: number } => {
  const local = sub(point, planePos)
  return { x: dot(local, planeRight), y: dot(local, planeUp) }
}

export type DoorCrossing = {
  crossed: boolean
  inDoor: boolean
  signedDistanceCurr: number
  t: number
  hitLocal: { x: number; y: number }
}

export const intersectSegmentWithDoor = (
  prev: Vec3,
  curr: Vec3,
  anchor: PortalAnchor,
  halfWidth: number,
  halfHeight: number
): DoorCrossing => {
  const basis = toBasis(anchor)
  const planeHit = intersectSegmentWithPlane(prev, curr, anchor.position, basis.normal)
  if (!planeHit.crossed) {
    return {
      crossed: false,
      inDoor: false,
      signedDistanceCurr: planeHit.signedDistanceCurr,
      t: planeHit.t,
      hitLocal: { x: 0, y: 0 }
    }
  }
  const hitLocal = projectOntoPlaneRect(planeHit.point, anchor.position, basis.right, basis.up)
  const inDoor = Math.abs(hitLocal.x) <= halfWidth && Math.abs(hitLocal.y) <= halfHeight
  return {
    crossed: inDoor,
    inDoor,
    signedDistanceCurr: planeHit.signedDistanceCurr,
    t: planeHit.t,
    hitLocal
  }
}

export type ObliqueClipPlane = { normal: Vec3; constant: number }

export const obliqueClipPlaneForCamera = (
  cameraPos: Vec3,
  portalPos: Vec3,
  portalNormal: Vec3
): ObliqueClipPlane => {
  let normal = normalize(portalNormal)
  let constant = -dot(normal, portalPos)
  const camDistance = dot(normal, cameraPos) + constant
  if (camDistance > 0) {
    normal = [-normal[0], -normal[1], -normal[2]]
    constant = -constant
  }
  return { normal, constant }
}
