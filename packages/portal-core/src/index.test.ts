import { describe, expect, it } from 'vitest'
import {
  couplePoseAcrossPortal,
  intersectSegmentWithDoor,
  intersectSegmentWithPlane,
  obliqueClipPlaneForCamera,
  projectOntoPlaneRect,
  type PortalAnchor,
  type Vec3
} from './index'

const close = (a: Vec3, b: Vec3, eps = 1e-9): void => {
  expect(a[0]).toBeCloseTo(b[0], 6)
  expect(a[1]).toBeCloseTo(b[1], 6)
  expect(a[2]).toBeCloseTo(b[2], 6)
  void eps
}

const portalA: PortalAnchor = {
  position: [0, 1.6, -3.5],
  normal: [0, 0, 1],
  up: [0, 1, 0]
}

const portalB: PortalAnchor = {
  position: [0, 1.6, 0],
  normal: [0, 0, -1],
  up: [0, 1, 0]
}

describe('couplePoseAcrossPortal', () => {
  it('maps a point in front of source to behind target (mirror semantics)', () => {
    const coupled = couplePoseAcrossPortal(
      { position: [0, 1.6, -3.4] },
      { source: portalA, target: portalB }
    )
    close(coupled.position, [0, 1.6, 0.1])
  })

  it('round-trips a position through a back-to-back portal pair', () => {
    const start: Vec3 = [0.5, 1.6, -3.2]
    const there = couplePoseAcrossPortal(
      { position: start },
      { source: portalA, target: portalB }
    )
    const back = couplePoseAcrossPortal(
      { position: there.position },
      { source: portalB, target: portalA }
    )
    close(back.position, start)
  })

  it('mirrors a forward direction through a 180-degree portal pair', () => {
    const coupled = couplePoseAcrossPortal(
      { position: [0, 1.6, -3.4], forward: [0, 0, -1], up: [0, 1, 0] },
      { source: portalA, target: portalB }
    )
    close(coupled.forward!, [0, 0, -1])
    close(coupled.up!, [0, 1, 0])
  })
})

describe('intersectSegmentWithPlane', () => {
  it('reports no crossing for a segment fully on one side', () => {
    const r = intersectSegmentWithPlane([0, 0, 1], [0, 0, 2], [0, 0, 0], [0, 0, 1])
    expect(r.crossed).toBe(false)
  })

  it('reports a crossing with correct interpolation t', () => {
    const r = intersectSegmentWithPlane([0, 0, 1], [0, 0, -3], [0, 0, 0], [0, 0, 1])
    expect(r.crossed).toBe(true)
    expect(r.t).toBeCloseTo(0.25, 6)
    close(r.point, [0, 0, 0])
  })

  it('treats the plane equation correctly when the plane is offset and tilted', () => {
    const r = intersectSegmentWithPlane([0, 0, -3], [0, 0, -4], [0, 1.6, -3.5], [0, 0, 1])
    expect(r.crossed).toBe(true)
    expect(r.t).toBeCloseTo(0.5, 6)
    close(r.point, [0, 0, -3.5])
  })
})

describe('intersectSegmentWithDoor', () => {
  it('treats a perpendicular crossing through the door center as crossed', () => {
    const r = intersectSegmentWithDoor([0, 1.6, -3.4], [0, 1.6, -3.6], portalA, 1.3, 1.6)
    expect(r.crossed).toBe(true)
    expect(r.inDoor).toBe(true)
  })

  it('treats a plane crossing outside the door rect as not crossed', () => {
    const r = intersectSegmentWithDoor([5, 1.6, -3.4], [5, 1.6, -3.6], portalA, 1.3, 1.6)
    expect(r.crossed).toBe(false)
    expect(r.inDoor).toBe(false)
  })

  it('treats a parallel-to-plane segment as not crossed', () => {
    const r = intersectSegmentWithDoor([0, 1.6, -3.4], [1, 1.6, -3.4], portalA, 1.3, 1.6)
    expect(r.crossed).toBe(false)
  })
})

describe('projectOntoPlaneRect', () => {
  it('returns local x/y of a point relative to the plane basis', () => {
    const out = projectOntoPlaneRect([0.4, 1.6 + 0.2, -3.5], [0, 1.6, -3.5], [1, 0, 0], [0, 1, 0])
    expect(out.x).toBeCloseTo(0.4, 6)
    expect(out.y).toBeCloseTo(0.2, 6)
  })
})

describe('obliqueClipPlaneForCamera', () => {
  it('keeps the original normal when the camera is on the negative side', () => {
    const cam: Vec3 = [0, 0, -1]
    const out = obliqueClipPlaneForCamera(cam, [0, 0, 0], [0, 0, 1])
    close(out.normal, [0, 0, 1])
    expect(out.constant).toBeCloseTo(0, 6)
  })

  it('flips the normal so the camera ends up on the negative side', () => {
    const cam: Vec3 = [0, 0, 1]
    const out = obliqueClipPlaneForCamera(cam, [0, 0, 0], [0, 0, 1])
    close(out.normal, [0, 0, -1])
    expect(out.constant).toBeCloseTo(0, 6)
  })

  it('handles a non-zero portal position', () => {
    const out = obliqueClipPlaneForCamera([0, 1.6, 5], [0, 1.6, -3.5], [0, 0, 1])
    // camera on +z side of portal at z=-3.5, so normal should flip to -z
    close(out.normal, [0, 0, -1])
    expect(out.constant).toBeCloseTo(-3.5, 6)
  })
})
