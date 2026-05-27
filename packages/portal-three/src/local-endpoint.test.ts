import { describe, expect, it, vi } from 'vitest'
import * as THREE from 'three'
import type { PortalAnchor } from '@portal/portal-core'
import {
  applyObliqueClipFromAnchor,
  makeLocalEndpoint,
  makePortalPlane,
  portalScreenRect
} from './index'

const makeSceneWithPortal = (background = '#101826') => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(background)
  const portal = makePortalPlane(new THREE.Vector2(2.6, 3.2))
  portal.position.set(0, 1.6, -3.5)
  scene.add(portal)
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: '#ffffff' })
  )
  scene.add(mesh)
  return { scene, portal, mesh }
}

describe('makeLocalEndpoint', () => {
  it('exposes anchor pose with halfWidth/halfHeight from userData.portalSize', () => {
    const { scene, portal } = makeSceneWithPortal()
    const ep = makeLocalEndpoint({ scene, anchor: portal })
    const anchor = ep.getAnchor()
    expect(anchor.position).toEqual([0, 1.6, -3.5])
    expect(anchor.normal[2]).toBeCloseTo(1, 6)
    expect(anchor.halfWidth).toBeCloseTo(1.3, 6)
    expect(anchor.halfHeight).toBeCloseTo(1.6, 6)
  })

  it('returns the scene background as ColorRGB', () => {
    const { scene, portal } = makeSceneWithPortal('#1b2a3f')
    const ep = makeLocalEndpoint({ scene, anchor: portal })
    const bg = ep.getBackground()
    const expected = new THREE.Color('#1b2a3f')
    expect(bg.r).toBeCloseTo(expected.r, 6)
    expect(bg.g).toBeCloseTo(expected.g, 6)
    expect(bg.b).toBeCloseTo(expected.b, 6)
  })

  it('forwards tick to the user-provided callback', () => {
    const { scene, portal } = makeSceneWithPortal()
    const tick = vi.fn()
    const ep = makeLocalEndpoint({ scene, anchor: portal, tick })
    ep.tick?.(1.5)
    expect(tick).toHaveBeenCalledWith(1.5)
  })

  it('renderAsDestination nulls scene.background, applies stencil, and restores on exit', () => {
    const { scene, portal, mesh } = makeSceneWithPortal('#1b2a3f')
    const originalBackground = scene.background
    const ep = makeLocalEndpoint({ scene, anchor: portal })

    let bgDuringRender: THREE.Color | THREE.Texture | null | undefined
    let stencilWriteDuringRender = false
    let stencilFuncDuringRender: number | undefined
    const fakeRenderer = {
      render(s: THREE.Scene) {
        bgDuringRender = s.background as THREE.Color | THREE.Texture | null
        const mat = mesh.material as THREE.MeshBasicMaterial
        stencilWriteDuringRender = mat.stencilWrite
        stencilFuncDuringRender = mat.stencilFunc
      }
    }

    ep.renderAsDestination(fakeRenderer as unknown as THREE.WebGLRenderer, new THREE.PerspectiveCamera())

    expect(bgDuringRender).toBeNull()
    expect(stencilWriteDuringRender).toBe(true)
    expect(stencilFuncDuringRender).toBe(THREE.EqualStencilFunc)

    expect(scene.background).toBe(originalBackground)
    expect((mesh.material as THREE.MeshBasicMaterial).stencilWrite).toBe(false)
  })

  it('renderAsSource just renders the scene without touching materials', () => {
    const { scene, portal, mesh } = makeSceneWithPortal()
    const ep = makeLocalEndpoint({ scene, anchor: portal })
    let stencilWriteDuringRender = true
    const fakeRenderer = {
      render() {
        stencilWriteDuringRender = (mesh.material as THREE.MeshBasicMaterial).stencilWrite
      }
    }
    ep.renderAsSource(fakeRenderer as unknown as THREE.WebGLRenderer, new THREE.PerspectiveCamera())
    expect(stencilWriteDuringRender).toBe(false)
  })
})

// Build a perspective camera at the given world position looking at -z and
// fully prepared (matrixWorldInverse populated from the just-set position).
const makeForwardCamera = (pos: [number, number, number]): THREE.PerspectiveCamera => {
  const cam = new THREE.PerspectiveCamera(70, 16 / 9, 0.02, 200)
  cam.position.set(pos[0], pos[1], pos[2])
  cam.lookAt(pos[0], pos[1], pos[2] - 1)
  cam.updateMatrixWorld(true)
  return cam
}

// Project world -> NDC through camera. Returns [x, y, z] in NDC space.
const projectToNDC = (cam: THREE.PerspectiveCamera, world: THREE.Vector3): [number, number, number] => {
  const v = world.clone().applyMatrix4(cam.matrixWorldInverse).applyMatrix4(cam.projectionMatrix)
  // Note: applyMatrix4 on a Vector3 already does the perspective divide via the
  // hidden w component. The result is NDC.
  return [v.x, v.y, v.z]
}

describe('applyObliqueClipFromAnchor', () => {
  // Portal directly in front of the camera: camera at z=9 looking -z, anchor
  // plane at z=0 with its normal pointing toward the camera (-z would put the
  // camera on the +z = -normal side, which is the "destination" side in the
  // iframe pose-mirror convention).
  const anchor: PortalAnchor = {
    position: [0, 1.6, 0],
    normal: [0, 0, -1],
    up: [0, 1, 0]
  }

  it('leaves NDC.x / NDC.y unchanged for arbitrary world points', () => {
    const cam = makeForwardCamera([0, 1.6, 9])
    const probe = new THREE.Vector3(2.0, 1.0, -3.0)
    const before = projectToNDC(cam, probe)
    applyObliqueClipFromAnchor(cam, anchor)
    const after = projectToNDC(cam, probe)
    expect(after[0]).toBeCloseTo(before[0], 6)
    expect(after[1]).toBeCloseTo(before[1], 6)
  })

  it('maps a point on the anchor plane to NDC.z near -1 (the new near plane)', () => {
    const cam = makeForwardCamera([0, 1.6, 9])
    applyObliqueClipFromAnchor(cam, anchor)
    // Point lying ON the iframe portal plane (z=0) at the door's center.
    const onPlane = new THREE.Vector3(0, 1.6, 0)
    const ndc = projectToNDC(cam, onPlane)
    // clipBias=0.0001 in the implementation pulls the near plane a hair toward
    // the camera, so NDC.z should be just above -1 (e.g., -0.99..ish).
    expect(ndc[2]).toBeGreaterThan(-1.0)
    expect(ndc[2]).toBeLessThan(-0.99)
  })

  it('puts a point on the camera-side of the anchor outside the [-1, 1] z clip range', () => {
    const cam = makeForwardCamera([0, 1.6, 9])
    applyObliqueClipFromAnchor(cam, anchor)
    // Point on the camera-side of the iframe portal (z = +0.5, between camera
    // at z=9 and portal at z=0). Should be CLIPPED, i.e., NDC.z < -1.
    const cameraSide = new THREE.Vector3(0, 1.6, 0.5)
    const ndc = projectToNDC(cam, cameraSide)
    expect(ndc[2]).toBeLessThan(-1.0)
  })

  it('keeps a point on the far-side of the anchor inside the clip range', () => {
    const cam = makeForwardCamera([0, 1.6, 9])
    applyObliqueClipFromAnchor(cam, anchor)
    // Point on the far-side of the iframe portal (z = -2.6, past the portal).
    const farSide = new THREE.Vector3(0, 1.6, -2.6)
    const ndc = projectToNDC(cam, farSide)
    expect(ndc[2]).toBeGreaterThan(-1.0)
    expect(ndc[2]).toBeLessThan(1.0)
  })

  it('handles a tilted (pitched) camera the same way (clip plane still aligned with anchor)', () => {
    // Camera at (0, 1.6, 9) pitched up 20°.
    const cam = new THREE.PerspectiveCamera(70, 16 / 9, 0.02, 200)
    cam.position.set(0, 1.6, 9)
    cam.up.set(0, Math.cos(0.35), Math.sin(0.35))
    cam.lookAt(0, 1.6 + Math.sin(0.35), 9 - Math.cos(0.35))
    cam.updateMatrixWorld(true)
    applyObliqueClipFromAnchor(cam, anchor)
    // Camera-side point should still be clipped despite the pitch.
    const cameraSide = new THREE.Vector3(0, 1.6, 0.5)
    const ndc = projectToNDC(cam, cameraSide)
    expect(ndc[2]).toBeLessThan(-1.0)
    // Far-side point should still be visible.
    const farSide = new THREE.Vector3(0, 1.6, -2.6)
    const ndcFar = projectToNDC(cam, farSide)
    expect(ndcFar[2]).toBeGreaterThan(-1.0)
  })
})

describe('portalScreenRect', () => {
  // Square camera at z=5 looking -z, 90° FOV. With 90° FOV, world distance
  // 1 at z=4 (= 1 unit in front of the camera) maps to NDC 1.0. So a
  // ±1×±1 quad at z=4 projects to NDC ±1 — fills the viewport exactly.
  const makeSquareCam = (): THREE.PerspectiveCamera => {
    const cam = new THREE.PerspectiveCamera(90, 1, 0.1, 100)
    cam.position.set(0, 0, 5)
    cam.lookAt(0, 0, 0)
    cam.updateMatrixWorld(true)
    return cam
  }

  // Looser tolerance to absorb 1-pixel slop from floor/ceil at integer
  // boundaries (e.g. an ideal y of 25.0 produced by projection arithmetic
  // can land at 24.9999... and floor to 24).
  const PIXEL_TOL = 2

  it('returns the full viewport rect when the door fills the camera view', () => {
    const cam = makeSquareCam()
    const portal = makePortalPlane(new THREE.Vector2(2, 2))
    portal.position.set(0, 0, 4)
    portal.updateMatrixWorld(true)
    const rect = portalScreenRect(portal, cam, { width: 100, height: 100 })
    expect(rect).not.toBeNull()
    expect(rect!.x).toBeLessThanOrEqual(PIXEL_TOL)
    expect(rect!.y).toBeLessThanOrEqual(PIXEL_TOL)
    expect(rect!.w).toBeGreaterThanOrEqual(100 - PIXEL_TOL)
    expect(rect!.h).toBeGreaterThanOrEqual(100 - PIXEL_TOL)
  })

  it('returns a centred rect when the door is smaller than the view', () => {
    const cam = makeSquareCam()
    // Door at half-size (1×1) → fills the centre quarter of the viewport
    // (50×50 px centred in the 100×100 canvas).
    const portal = makePortalPlane(new THREE.Vector2(1, 1))
    portal.position.set(0, 0, 4)
    portal.updateMatrixWorld(true)
    const rect = portalScreenRect(portal, cam, { width: 100, height: 100 })
    expect(rect).not.toBeNull()
    expect(Math.abs(rect!.x - 25)).toBeLessThanOrEqual(PIXEL_TOL)
    expect(Math.abs(rect!.y - 25)).toBeLessThanOrEqual(PIXEL_TOL)
    expect(Math.abs(rect!.w - 50)).toBeLessThanOrEqual(PIXEL_TOL)
    expect(Math.abs(rect!.h - 50)).toBeLessThanOrEqual(PIXEL_TOL)
  })

  it('shifts the rect when the door moves off-centre', () => {
    const cam = makeSquareCam()
    // Door at the right edge of the camera view.
    const portal = makePortalPlane(new THREE.Vector2(1, 1))
    portal.position.set(0.5, 0, 4)
    portal.updateMatrixWorld(true)
    const rect = portalScreenRect(portal, cam, { width: 100, height: 100 })
    expect(rect).not.toBeNull()
    expect(Math.abs(rect!.x - 50)).toBeLessThanOrEqual(PIXEL_TOL)
    expect(Math.abs(rect!.y - 25)).toBeLessThanOrEqual(PIXEL_TOL)
    expect(Math.abs(rect!.w - 50)).toBeLessThanOrEqual(PIXEL_TOL)
    expect(Math.abs(rect!.h - 50)).toBeLessThanOrEqual(PIXEL_TOL)
  })

  it('clips the rect to the viewport when the door extends off-screen', () => {
    const cam = makeSquareCam()
    // Door extends past the right edge.
    const portal = makePortalPlane(new THREE.Vector2(2, 1))
    portal.position.set(0.5, 0, 4)
    portal.updateMatrixWorld(true)
    const rect = portalScreenRect(portal, cam, { width: 100, height: 100 })
    expect(rect).not.toBeNull()
    // Right edge clipped at canvas width.
    expect(rect!.x + rect!.w).toBeLessThanOrEqual(100)
  })

  it('returns null when all door corners are behind the camera', () => {
    const cam = makeSquareCam()
    // Door behind the camera (z > camera.z).
    const portal = makePortalPlane(new THREE.Vector2(1, 1))
    portal.position.set(0, 0, 10)
    portal.updateMatrixWorld(true)
    const rect = portalScreenRect(portal, cam, { width: 100, height: 100 })
    expect(rect).toBeNull()
  })

  it('reads half-extents from userData.portalSize by default', () => {
    const cam = makeSquareCam()
    const portal = makePortalPlane(new THREE.Vector2(1, 1))
    portal.position.set(0, 0, 4)
    portal.updateMatrixWorld(true)
    // Implicit (from userData) and explicit half-extents should agree.
    const implicit = portalScreenRect(portal, cam, { width: 100, height: 100 })
    const explicit = portalScreenRect(portal, cam, { width: 100, height: 100 }, {
      halfWidth: 0.5,
      halfHeight: 0.5
    })
    expect(implicit).toEqual(explicit)
  })

  it('explicit half-extents override userData.portalSize', () => {
    const cam = makeSquareCam()
    // Mesh has 1×1 portalSize in userData, but we pass 2×2 explicit.
    const portal = makePortalPlane(new THREE.Vector2(1, 1))
    portal.position.set(0, 0, 4)
    portal.updateMatrixWorld(true)
    const rect = portalScreenRect(portal, cam, { width: 100, height: 100 }, {
      halfWidth: 1,
      halfHeight: 1
    })
    expect(rect).not.toBeNull()
    // 2×2 door at z=4 in 90° fov fills the viewport.
    expect(rect!.w).toBeGreaterThanOrEqual(100 - PIXEL_TOL)
    expect(rect!.h).toBeGreaterThanOrEqual(100 - PIXEL_TOL)
  })
})
