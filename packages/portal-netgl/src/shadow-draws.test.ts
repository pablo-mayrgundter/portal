// `shadowDraws: false`: the guest's draws and clears ship as ever but don't
// run on its shadow, so a guest that never reads its own pixels (an overlay)
// has its pixel work done once, by the host's replay. Unit tests on a
// stand-in shadow (what runs there, what ships), then a three.js guest on
// headless-gl: the host's pixels are byte-equal either way, the shadow's
// stay clear, and its queries still answer.

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import * as THREE from 'three'
import { JSDOM } from 'jsdom'
import url from 'node:url'
import { makeNetGLRecorderSession } from './recorder'
import { makeNetGLGuestContext } from './guest-context'
import { makeNetGLImmediateLink } from './immediate-link'
import { makeNetGLCesiumGuest } from './frameworks/cesium'
import type { NetGLCall } from './messages'

const DRAWS = ['drawArrays', 'drawElements', 'drawArraysInstanced', 'drawElementsInstanced', 'drawRangeElements',
  'clear', 'clearBufferfv', 'clearBufferiv', 'clearBufferuiv', 'clearBufferfi', 'blitFramebuffer']

// A shadow that logs what's executed on it, and answers queries.
const loggingShadow = (): { shadow: WebGL2RenderingContext; ran: string[] } => {
  const ran: string[] = []
  const shadow = new Proxy({} as Record<string, unknown>, {
    get: (_t, p: string) => (...args: unknown[]) => {
      ran.push(p)
      if (p === 'getParameter') return args[0] === 0x0cf5 ? 4 : 7
      if (p === 'getProgramParameter') return true
      if (p === 'getUniformLocation' || p.startsWith('create')) return {}
      return undefined
    }
  }) as unknown as WebGL2RenderingContext
  return { shadow, ran }
}

// Every kind of call a frame makes, with a handle minted and used.
const frame = (g: WebGL2RenderingContext): unknown[] => {
  const answers: unknown[] = []
  const buf = g.createBuffer()
  g.bindBuffer(g.ARRAY_BUFFER ?? 0x8892, buf)
  g.bufferData(0x8892, new Float32Array([1, 2, 3]), 0x88e4)
  const prog = g.createProgram()!
  answers.push(g.getProgramParameter(prog, 0x8b82))
  const loc = g.getUniformLocation(prog, 'u')
  g.useProgram(prog)
  g.uniform1f(loc, 0.5)
  g.enable(0x0be2)
  g.viewport(0, 0, 10, 10)
  answers.push(g.getParameter(0x0ba2))
  g.clear(0x4000)
  g.clearBufferfv(0x1800, 0, new Float32Array([0, 0, 0, 0]))
  g.clearBufferiv(0x1802, 0, new Int32Array([0]))
  g.clearBufferuiv(0x1800, 1, new Uint32Array([0, 0, 0, 0]))
  g.clearBufferfi(0x84f9, 0, 1, 0)
  g.drawArrays(0x0004, 0, 3)
  g.drawElements(0x0004, 3, 0x1403, 0)
  g.drawArraysInstanced(0x0000, 0, 1, 9)
  g.drawElementsInstanced(0x0004, 3, 0x1403, 0, 9)
  g.drawRangeElements(0x0004, 0, 2, 3, 0x1403, 0)
  g.blitFramebuffer(0, 0, 1, 1, 0, 0, 1, 1, 0x4000, 0x2600)
  g.deleteBuffer(buf)
  return answers
}

const recordFrame = (shadowDraws?: boolean): { calls: NetGLCall[]; ran: string[]; answers: unknown[] } => {
  const { shadow, ran } = loggingShadow()
  const calls: NetGLCall[] = []
  const session = makeNetGLRecorderSession(shadow, (call) => calls.push(call), {
    scalarState: 'queried',
    ...(shadowDraws === undefined ? {} : { shadowDraws })
  })
  const answers = frame(session.gl)
  return { calls, ran, answers }
}

describe('shadowDraws: false (recorder)', () => {
  it('ships every call but runs no draw or clear on the shadow', () => {
    const { calls, ran } = recordFrame(false)
    expect(ran.filter((n) => DRAWS.includes(n))).toEqual([])
    expect(calls.map((c) => c.name).filter((n) => DRAWS.includes(n)).sort()).toEqual([...DRAWS].sort())
    // The rest still runs there: handles, state, uploads, deletes.
    for (const n of ['createBuffer', 'bindBuffer', 'bufferData', 'createProgram', 'useProgram', 'uniform1f', 'enable',
      'viewport', 'deleteBuffer']) {
      expect(ran).toContain(n)
    }
  })

  it('answers the same queries, from the shadow', () => {
    const off = recordFrame(false)
    const on = recordFrame(true)
    expect(off.answers).toEqual([true, 7])
    expect(off.answers).toEqual(on.answers)
    expect(off.ran).toContain('getProgramParameter')
    expect(off.ran).toContain('getParameter')
  })

  it('records the same stream as with draws on, and as the default', () => {
    const off = recordFrame(false)
    expect(off.calls).toEqual(recordFrame(true).calls)
    expect(off.calls).toEqual(recordFrame().calls)
    expect(recordFrame().ran).toEqual(recordFrame(true).ran)
    expect(recordFrame(true).ran.filter((n) => DRAWS.includes(n)).sort()).toEqual([...DRAWS].sort())
  })
})

// A three.js guest over headless-gl, replayed into a host context.

const W = 32
const H = 32

const initDom = (): void => {
  const dom = new JSDOM('<!DOCTYPE html>', { pretendToBeVisual: true })
  const g = globalThis as unknown as { window?: unknown; document?: unknown; self?: unknown; URL?: unknown }
  if (!g.window) g.window = dom.window
  if (!g.document) g.document = dom.window.document
  if (!g.self) g.self = dom.window
  if (!g.URL) g.URL = url.URL
}

const makeCtx = (): WebGL2RenderingContext => {
  const ctx = gl(W, H, { antialias: false, stencil: true, depth: true, createWebGL2Context: true } as unknown as
    WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
  return ctx
}

const pixels = (ctx: WebGL2RenderingContext): Uint8Array => {
  const px = new Uint8Array(W * H * 4)
  ctx.readPixels(0, 0, W, H, ctx.RGBA, ctx.UNSIGNED_BYTE, px)
  return px
}

const run = (shadowDraws: boolean): { host: Uint8Array; shadow: Uint8Array; linked: boolean; viewport: number[] } => {
  initDom()
  const host = makeCtx()
  const shadow = makeCtx()
  const link = makeNetGLImmediateLink({ gl: host })
  const guest = makeNetGLGuestContext({
    canvas: { getContext: () => shadow } as unknown as HTMLCanvasElement,
    transport: link.transport,
    shadowDraws
  })
  const renderer = new THREE.WebGLRenderer({ context: guest.gl, antialias: false, stencil: true, depth: true })
  renderer.setSize(W, H, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#203040')
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: '#ffaa00' }))
  mesh.rotation.set(0.5, 0.7, 0)
  scene.add(mesh)
  const points = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([0.8, 0.8, 0, -0.8, -0.8, 0], 3)),
    new THREE.PointsMaterial({ color: '#00ff80', size: 4, sizeAttenuation: false, transparent: true })
  )
  scene.add(points)
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  camera.position.set(0, 0, 3)
  for (let i = 0; i < 2; i += 1) {
    link.frame(() => {
      renderer.render(scene, camera)
      guest.endFrame()
    })
  }
  // three asked the shadow whether its programs linked; ask it again.
  const programs = (renderer.info.programs ?? []) as unknown as Array<{ program: WebGLProgram }>
  const linked = programs.length > 0 && programs.every((p) => shadow.getProgramParameter(p.program, shadow.LINK_STATUS) === true)
  return { host: pixels(host), shadow: pixels(shadow), linked, viewport: Array.from(shadow.getParameter(shadow.VIEWPORT) as Int32Array) }
}

describe('shadowDraws: false (Cesium guest shim)', () => {
  const cesiumRan = (shadowDraws?: boolean): string[] => {
    const { shadow, ran } = loggingShadow()
    const guest = makeNetGLCesiumGuest({
      transport: { post: () => {}, onMessage: () => () => {} },
      ...(shadowDraws === undefined ? {} : { shadowDraws })
    })
    const canvas = { getContext: () => shadow } as unknown as HTMLCanvasElement
    frame(guest.contextOptions.getWebGLStub(canvas, guest.contextOptions.webgl))
    return ran
  }

  it('passes the option to the guest context', () => {
    expect(cesiumRan(false).filter((n) => DRAWS.includes(n))).toEqual([])
    expect(cesiumRan(true).filter((n) => DRAWS.includes(n)).sort()).toEqual([...DRAWS].sort())
    expect(cesiumRan().filter((n) => DRAWS.includes(n)).sort()).toEqual([...DRAWS].sort())
  })
})

describe('shadowDraws: false (three.js guest, headless-gl)', () => {
  beforeAll(() => initDom())

  it('replays byte-equal pixels, leaves the shadow undrawn, and its queries still answer', () => {
    const on = run(true)
    const off = run(false)
    // The host's frame doesn't change.
    expect(off.host.some((v) => v !== 0)).toBe(true)
    expect(Buffer.from(off.host).equals(Buffer.from(on.host))).toBe(true)
    // With draws on the shadow holds the frame too; off, it's never drawn.
    expect(Buffer.from(on.shadow).equals(Buffer.from(on.host))).toBe(true)
    expect(off.shadow.every((v) => v === 0)).toBe(true)
    // State and programs are the shadow's as ever.
    expect(off.linked).toBe(true)
    expect(off.viewport).toEqual([0, 0, W, H])
    expect(off.viewport).toEqual(on.viewport)
  })
})
