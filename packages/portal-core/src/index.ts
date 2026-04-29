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
 * Column-major 4x4 matrix in 16 contiguous numbers (matches THREE.Matrix4.elements
 * and WebGL uniform layout). Used to ship projection/view matrices over the wire.
 */
export type Mat4 = readonly number[]

export type Viewport = { width: number; height: number }

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

/**
 * Wire protocol for an iframe (or any postMessage-style) portal endpoint.
 *
 * Lifecycle:
 *   - Iframe boots, sets up its scene + portal anchor, and posts `portal:ready`
 *     announcing its anchor pose, background color, and viewport.
 *   - Each frame, host posts `portal:setPose` with the mirrored host pose, the
 *     projection matrix the host wants the iframe to use, and a viewport size.
 *   - Iframe renders from that pose into its own offscreen surface and posts
 *     `portal:frame` back with color + packed-RGBA depth bitmaps and the
 *     view/projection matrices it actually used (so the host can reconstruct
 *     world position from depth in its compositor).
 *
 * Frames are pipelined: host sends pose for frame N, uses iframe's frame N-1
 * (or whichever is the latest available) for compositing.
 */
export type PortalReadyMessage = {
  type: 'portal:ready'
  anchor: PortalAnchor
  background: ColorRGB
  viewport: Viewport
}

export type PortalSetPoseMessage = {
  type: 'portal:setPose'
  pose: PortalPose
  projection: Mat4
  viewport: Viewport
  time: number
}

export type PortalFrameMessage = {
  type: 'portal:frame'
  color: ImageBitmap
  depth: ImageBitmap
  width: number
  height: number
  projection: Mat4
  view: Mat4
}

/**
 * Traversal handoff. When the user crosses a portal door, the active page
 * sends this to its peer. The peer adopts the supplied pose as its starting
 * camera state, becomes the visible / source side, and the sender becomes
 * inactive (or transitions to destination role).
 *
 * The pose is in the receiver's world coordinates — the sender mirrors it
 * across the portal pair before posting.
 */
export type PortalTraverseMessage = {
  type: 'portal:traverse'
  pose: PortalPose
  /**
   * Keys the user is currently holding on the sender side (e.g. ['KeyW']).
   * The receiver should pre-populate its own controls' pressed-key set so
   * movement continues uninterrupted across the focus shift. Without this,
   * keydown events that fired before the focus moved are lost — the user
   * has to release and re-press to resume motion.
   */
  pressedKeys?: string[]
  /**
   * Viewport (CSS pixels) the receiver should size its renderer to BEFORE
   * its first synchronous frame. Bridges the gap between the receiver's
   * current DOM-imposed dimensions (e.g. an offscreen 1×1 host iframe) and
   * the size it will be once the visibility swap commits. Without this, the
   * pre-render runs at the receiver's pre-swap size; once the CSS swap
   * enlarges the receiver, that small backing buffer stretches across the
   * viewport for the brief window before the receiver's own resize handler
   * fires — visible as a one-pixel smear / single-color flash mid-traversal.
   */
  viewport?: Viewport
}

/**
 * Acknowledgment from the receiver of `portal:traverse`. Sent only AFTER the
 * receiver has rendered its first source-mode frame, so the sender knows it's
 * safe to swap visibility (hide self / show peer) without exposing an
 * unrendered canvas mid-swap. Without this handshake the sender's CSS swap
 * commits a frame before the receiver has paint-ready content, producing a
 * brief dark/empty flash at the moment of crossing.
 */
export type PortalTraverseAckMessage = {
  type: 'portal:traverse-ack'
}

export type PortalMessage =
  | PortalReadyMessage
  | PortalSetPoseMessage
  | PortalFrameMessage
  | PortalTraverseMessage
  | PortalTraverseAckMessage

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
