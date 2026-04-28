import { describe, expect, it, vi } from 'vitest'
import * as THREE from 'three'
import { makeLocalEndpoint, makePortalPlane } from './index'

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
