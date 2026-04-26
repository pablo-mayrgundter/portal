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
