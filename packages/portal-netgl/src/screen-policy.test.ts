// Screen policy: host-side compositing overrides for guest draws that land
// on the host's default framebuffer.
//
// Two layers of test:
//   - mock-GL sequence tests: which GL calls the replay actually emits
//     (stencil override vs intended, clear filtering, scissor remap).
//   - a headless-gl composite: a three.js guest that knows nothing about
//     portals (autoClear on, opaque scene background, no stencil props on
//     its materials) replays into a host context whose left half is
//     stencil-masked. The guest must land only in the left half, and its
//     background clear must not wipe the host.

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import * as THREE from 'three'
import { JSDOM } from 'jsdom'
import url from 'node:url'
import type { NetGLCall } from './messages'
import { makeNetGLRecorderSession } from './recorder'
import { makeNetGLReplay } from './replay'

type CallLog = { name: string; args: unknown[] }

const makeMockGl = (): { gl: WebGL2RenderingContext; calls: CallLog[] } => {
  const calls: CallLog[] = []
  const gl = new Proxy({}, {
    get(_: unknown, prop: string) {
      return (...args: unknown[]) => {
        calls.push({ name: prop, args })
        if (prop.startsWith('create')) return { __mock: prop }
        return undefined
      }
    }
  }) as unknown as WebGL2RenderingContext
  return { gl, calls }
}

const GL_STENCIL_TEST = 0x0B90
const GL_EQUAL = 0x0202
const GL_ALWAYS = 0x0207
const GL_FRAMEBUFFER = 0x8D40
const COLOR = 0x4000
const DEPTH = 0x0100
const STENCIL = 0x0400

const call = (name: string, ...args: unknown[]): NetGLCall => ({ name, args } as NetGLCall)

describe('screen policy — call sequences', () => {
  it('overrides stencil for screen draws and restores intended stencil for RT draws', () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl, { screen: { stencil: { ref: 1 } } })

    // Guest sets its own stencil state: swallowed, tracked.
    replay(call('enable', GL_STENCIL_TEST))
    replay(call('stencilFunc', GL_ALWAYS, 5, 0xff))
    expect(calls.filter((c) => c.name.startsWith('stencil') || c.name === 'enable')).toHaveLength(0)

    // Screen draw → portal override.
    replay(call('drawArrays', 4, 0, 3))
    const funcs = calls.filter((c) => c.name === 'stencilFunc')
    expect(funcs[0].args).toEqual([GL_EQUAL, 1, 0xff])
    expect(calls.find((c) => c.name === 'stencilMask')?.args).toEqual([0])

    // RT draw → guest's intended state.
    calls.length = 0
    replay({ name: 'createFramebuffer', args: [], returnId: 7 })
    replay(call('bindFramebuffer', GL_FRAMEBUFFER, { __netgl_handle: 7 }))
    replay(call('drawArrays', 4, 0, 3))
    const sep = calls.filter((c) => c.name === 'stencilFuncSeparate')
    expect(sep.map((c) => c.args.slice(1))).toEqual([[GL_ALWAYS, 5, 0xff], [GL_ALWAYS, 5, 0xff]])

    // Second RT draw with unchanged state → no re-apply.
    calls.length = 0
    replay(call('drawArrays', 4, 0, 3))
    expect(calls.map((c) => c.name)).toEqual(['drawArrays'])
  })

  it('re-applies the override after invalidate()', () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl, { screen: { stencil: { ref: 1 } } })
    replay(call('drawArrays', 4, 0, 3))
    calls.length = 0
    replay(call('drawArrays', 4, 0, 3))
    expect(calls.some((c) => c.name === 'stencilFunc')).toBe(false)
    replay.invalidate()
    replay(call('drawArrays', 4, 0, 3))
    expect(calls.some((c) => c.name === 'stencilFunc')).toBe(true)
  })

  it("'depth-only' drops colour/stencil screen clears and confines depth clears", () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl, {
      remapScreenViewport: () => [10, 20, 30, 40],
      screen: { clear: 'depth-only' }
    })
    replay(call('viewport', 0, 0, 100, 100))
    calls.length = 0
    replay(call('clear', COLOR | STENCIL))
    expect(calls).toHaveLength(0)
    replay(call('clear', COLOR | DEPTH | STENCIL))
    expect(calls.map((c) => c.name)).toEqual(['enable', 'scissor', 'clear', 'disable'])
    expect(calls[1].args).toEqual([10, 20, 30, 40])
    expect(calls[2].args).toEqual([DEPTH])
  })

  it("'depth-only' still executes screen draw calls", () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl, { screen: { clear: 'depth-only' } })
    replay(call('drawElements', 4, 36, 0x1403, 0))
    replay(call('drawArraysInstanced', 4, 0, 3, 2))
    expect(calls.map((c) => c.name)).toEqual(['drawElements', 'drawArraysInstanced'])
  })

  it('leaves RT clears alone', () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl, { screen: { clear: 'depth-only' } })
    replay({ name: 'createFramebuffer', args: [], returnId: 1 })
    replay(call('bindFramebuffer', GL_FRAMEBUFFER, { __netgl_handle: 1 }))
    calls.length = 0
    replay(call('clear', COLOR | DEPTH | STENCIL))
    expect(calls).toEqual([{ name: 'clear', args: [COLOR | DEPTH | STENCIL] }])
  })

  it('redirects the default framebuffer to the host FBO when configured', () => {
    const { gl, calls } = makeMockGl()
    const hostFbo = { __host: 'rt' } as unknown as WebGLFramebuffer
    const replay = makeNetGLReplay(gl, {
      screenFramebuffer: () => hostFbo,
      screen: { clear: 'depth-only' }
    })
    replay(call('bindFramebuffer', GL_FRAMEBUFFER, null))
    replay(call('drawBuffers', [0x0405]))
    replay(call('clear', COLOR | DEPTH))
    expect(calls.find((c) => c.name === 'bindFramebuffer')?.args).toEqual([GL_FRAMEBUFFER, hostFbo])
    expect(calls.find((c) => c.name === 'drawBuffers')?.args).toEqual([[0x8CE0]])
    // Still a "screen" target for the policy: colour clear dropped.
    expect(calls.find((c) => c.name === 'clear')?.args).toEqual([DEPTH])
  })

  it('maps screen scissor boxes through the viewport remap', () => {
    const { gl, calls } = makeMockGl()
    const replay = makeNetGLReplay(gl, { remapScreenViewport: () => [100, 100, 50, 50] })
    replay(call('viewport', 0, 0, 200, 200))
    replay(call('scissor', 100, 0, 100, 200))
    const sc = calls.filter((c) => c.name === 'scissor')
    // Right half of the guest's canvas → right half of the remapped rect.
    expect(sc[sc.length - 1].args).toEqual([125, 100, 25, 50])
  })
})

// --- headless-gl composite ----------------------------------------------

const W = 64
const H = 64

const initDom = (): void => {
  const dom = new JSDOM('<!DOCTYPE html>', { pretendToBeVisual: true })
  const g = globalThis as unknown as { window?: unknown; document?: unknown; self?: unknown; URL?: unknown }
  if (!g.window) g.window = dom.window
  if (!g.document) g.document = dom.window.document
  if (!g.self) g.self = dom.window
  if (!g.URL) g.URL = url.URL
}

const makeCtx = (): WebGL2RenderingContext => {
  const ctx = gl(W, H, {
    antialias: false,
    stencil: true,
    depth: true,
    createWebGL2Context: true
  } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
  return ctx
}

describe('screen policy — composite through a host stencil mask', () => {
  beforeAll(() => initDom())

  it('a portal-unaware guest lands only inside the mask and never wipes the host', () => {
    const shadow = makeCtx()
    const host = makeCtx()

    // Host frame: paint grey everywhere, stencil=1 in the left half only.
    host.clearColor(0.5, 0.5, 0.5, 1)
    host.clearStencil(0)
    host.clear(host.COLOR_BUFFER_BIT | host.DEPTH_BUFFER_BIT | host.STENCIL_BUFFER_BIT)
    host.enable(host.SCISSOR_TEST)
    host.scissor(0, 0, W / 2, H)
    host.clearStencil(1)
    host.clear(host.STENCIL_BUFFER_BIT)
    host.disable(host.SCISSOR_TEST)

    // Guest: stock three.js, opaque magenta background, big green cube
    // that spans both halves.
    let out: NetGLCall[] = []
    const session = makeNetGLRecorderSession(shadow, (c) => out.push(structuredClone(c)))
    session.checkpoint()
    const r = new THREE.WebGLRenderer({ context: session.gl, antialias: false, stencil: true, depth: true })
    r.setSize(W, H, false)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#ff00ff')
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.0), new THREE.MeshBasicMaterial({ color: '#00ff00' })))
    const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 10)
    cam.position.z = 1.2
    r.render(scene, cam)

    const replay = makeNetGLReplay(host, { screen: { stencil: { ref: 1 }, clear: 'depth-only' } })
    replay.invalidate()
    for (const c of out) replay(c)
    out = []

    const px = new Uint8Array(W * H * 4)
    host.readPixels(0, 0, W, H, host.RGBA, host.UNSIGNED_BYTE, px)
    const at = (x: number, y: number): number[] => Array.from(px.slice((y * W + x) * 4, (y * W + x) * 4 + 3))

    let magenta = 0
    let greenLeft = 0
    let greenRight = 0
    for (let y = 0; y < H; y += 1) {
      for (let x = 0; x < W; x += 1) {
        const [r0, g0, b0] = at(x, y)
        if (r0 > 200 && g0 < 50 && b0 > 200) magenta += 1
        if (g0 > 200 && r0 < 50) {
          if (x < W / 2) greenLeft += 1
          else greenRight += 1
        }
      }
    }
    expect(magenta).toBe(0) // guest's background clear was dropped
    expect(greenLeft).toBeGreaterThan(200) // guest drew inside the mask
    expect(greenRight).toBe(0) // …and nowhere outside it
    expect(at(W - 2, H / 2)).toEqual([128, 128, 128]) // host pixels untouched
  })
})
