// cesiumFrameEnd: what a Cesium frame's frame-end carries for a
// reprojecting host (RFC 0003 §4), read from a structural stand-in for
// Cesium's scene.

import { describe, it, expect } from 'vitest'
import { cesiumFrameEnd, type CesiumSceneLike } from './cesium'

const projectionOf = (near: number, far: number): number[] => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, (far + near) / (near - far), -1, 0, 0, (2 * far * near) / (near - far), 0]

const scene = (frusta: Array<{ near: number; far: number }>, view?: CesiumSceneLike['_view']): CesiumSceneLike => {
  const frustum = { near: 1, far: 1e9 }
  return {
    postRender: { addEventListener: () => () => {} },
    camera: {
      viewMatrix: Float64Array.from({ length: 16 }, (_, i) => (i % 5 === 0 ? 1 : 0)),
      frustum: {
        ...frustum,
        clone() {
          const c = { near: frustum.near, far: frustum.far, get projectionMatrix() { return projectionOf(c.near, c.far) } }
          return c
        }
      }
    },
    frustumCommandsList: frusta,
    _view: view
  }
}

describe('cesiumFrameEnd', () => {
  const globe = {}
  const sceneFb = {}

  it('names the globe-depth and scene framebuffers, and the projection of the one frustum', () => {
    const end = cesiumFrameEnd(scene([{ near: 2, far: 5e6 }], {
      globeDepth: { framebuffer: { _framebuffer: globe } },
      sceneFramebuffer: { framebuffer: { _framebuffer: sceneFb } }
    }))
    expect(end.screenTargets).toEqual([globe, sceneFb])
    expect(end.projectionMatrix).toEqual(projectionOf(2, 5e6))
    expect(end.viewMatrix).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  })

  it('leaves out the matrices for several frusta, and framebuffers Cesium hasn\'t made', () => {
    const end = cesiumFrameEnd(scene([{ near: 1, far: 100 }, { near: 100, far: 1e6 }], { globeDepth: {}, sceneFramebuffer: { framebuffer: undefined } }))
    expect(end).toEqual({ screenTargets: [] })
  })

  it('carries nothing for a scene without the members it reads', () => {
    expect(cesiumFrameEnd({ postRender: { addEventListener: () => () => {} } })).toEqual({})
  })
})
