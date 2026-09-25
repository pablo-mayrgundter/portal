// makeNetGLImmediateLink: same-page guest → host replay.

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import * as THREE from 'three'
import { JSDOM } from 'jsdom'
import url from 'node:url'
import { makeNetGLGuestContext } from './guest-context'
import { makeNetGLImmediateLink } from './immediate-link'

const makeMockGl = (): { gl: WebGL2RenderingContext; calls: Array<{ name: string; args: unknown[] }> } => {
  const calls: Array<{ name: string; args: unknown[] }> = []
  const mock = new Proxy({}, {
    get(_: unknown, prop: string) {
      return (...args: unknown[]) => {
        calls.push({ name: prop, args: args.map((a) => (ArrayBuffer.isView(a) ? Array.from(a as Float32Array) : a)) })
        if (prop.startsWith('create')) return { __mock: prop }
        return undefined
      }
    }
  }) as unknown as WebGL2RenderingContext
  return { gl: mock, calls }
}

describe('makeNetGLImmediateLink — call routing', () => {
  it('replays calls made inside frame() immediately, in order', () => {
    const { gl: mock, calls } = makeMockGl()
    const link = makeNetGLImmediateLink({ gl: mock })
    link.frame(() => {
      link.transport.post({ name: 'clearColor', args: [0, 0, 0, 1] })
      expect(calls.map((c) => c.name)).toEqual(['clearColor'])
      link.transport.post({ name: 'clear', args: [0x4000] })
    })
    expect(calls.map((c) => c.name)).toEqual(['clearColor', 'clear'])
  })

  it('queues calls made outside frame() — cloned — and flushes them first next frame', () => {
    const { gl: mock, calls } = makeMockGl()
    const link = makeNetGLImmediateLink({ gl: mock })
    const scratch = new Float32Array([1, 2, 3, 4])
    link.transport.post({
      name: 'uniform4fv',
      args: [null, { __netgl_typedarray: 'Float32Array', buffer: scratch.buffer, offset: 0, length: 4 }]
    })
    scratch[0] = 99 // the framework reuses its scratch array
    expect(calls).toHaveLength(0)
    expect(link.queued).toBe(1)
    link.frame(() => link.transport.post({ name: 'drawArrays', args: [4, 0, 3] }))
    expect(calls.map((c) => c.name)).toEqual(['uniform4fv', 'drawArrays'])
    expect(calls[0].args[1]).toEqual([1, 2, 3, 4])
  })

  it('closes on the guest frame-end: later calls queue for the next frame', () => {
    const { gl: mock, calls } = makeMockGl()
    const link = makeNetGLImmediateLink({ gl: mock })
    link.frame(() => {
      link.transport.post({ name: 'drawArrays', args: [4, 0, 3] })
      link.transport.post({ type: 'netgl:frame-end' })
      link.transport.post({ name: 'bindVertexArray', args: [null] }) // the checkpoint
    })
    expect(calls.map((c) => c.name)).toEqual(['drawArrays'])
    expect(link.queued).toBe(1)
  })

  it('acks the ready handshake to the guest', () => {
    const { gl: mock } = makeMockGl()
    const link = makeNetGLImmediateLink({ gl: mock })
    const toGuest: unknown[] = []
    link.transport.onMessage((m) => toGuest.push(m))
    const ready = { type: 'netgl:ready', anchor: { position: [0, 0, 0], normal: [0, 0, 1], up: [0, 1, 0] }, background: { r: 0, g: 0, b: 0 } }
    link.transport.post(ready)
    expect(link.ready).toEqual(ready)
    expect(toGuest).toEqual([{ type: 'netgl:ready-ack' }])
  })
})

// --- headless-gl integration -------------------------------------------

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

const buildScene = (frame: number): { scene: THREE.Scene; camera: THREE.PerspectiveCamera } => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#102030')
  const data = new Uint8Array([255, 200, 0, 255, 0, 90, 255, 255, 0, 90, 255, 255, 255, 200, 0, 255])
  const tex = new THREE.DataTexture(data, 2, 2, THREE.RGBAFormat)
  tex.needsUpdate = true
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: tex }))
  cube.rotation.set(0.4 + frame * 0.3, 0.6 + frame * 0.2, 0)
  scene.add(cube)
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  camera.position.set(1.8, 1.2, 2.4)
  camera.lookAt(0, 0, 0)
  return { scene, camera }
}

const newRenderer = (context: WebGL2RenderingContext): THREE.WebGLRenderer => {
  const r = new THREE.WebGLRenderer({ context, antialias: false, stencil: true, depth: true })
  r.setSize(W, H, false)
  r.outputColorSpace = THREE.SRGBColorSpace
  return r
}

describe('makeNetGLImmediateLink — same-page three.js guest', () => {
  beforeAll(() => initDom())

  it('renders byte-equal to a pristine control, with host renders in between', () => {
    const host = makeCtx()
    const link = makeNetGLImmediateLink({ gl: host })
    const shadowCanvas = { getContext: () => makeCtx() } as unknown as HTMLCanvasElement
    const guest = makeNetGLGuestContext({ canvas: shadowCanvas, transport: link.transport })
    const guestRenderer = newRenderer(guest.gl)

    // Host framework drawing into the shared context between guest frames.
    const hostRenderer = newRenderer(host)
    const hostScene = new THREE.Scene()
    hostScene.background = new THREE.Color('#ff00ff')
    hostScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ color: '#00ff00', transparent: true, opacity: 0.5 })))
    const hostCam = new THREE.PerspectiveCamera(60, 1, 0.1, 10)
    hostCam.position.z = 2

    for (const frame of [1, 2]) {
      hostRenderer.render(hostScene, hostCam)
      const { scene, camera } = buildScene(frame)
      link.frame(() => {
        guestRenderer.render(scene, camera)
        guest.endFrame()
      })
      // A real host would renderer.resetState() here; headless-gl contexts
      // have no .canvas for it to read, and the host's own cache isn't
      // what this test checks.
    }

    const control = makeCtx()
    const { scene, camera } = buildScene(2)
    newRenderer(control).render(scene, camera)

    const read = (ctx: WebGL2RenderingContext): Uint8Array => {
      const px = new Uint8Array(W * H * 4)
      ctx.readPixels(0, 0, W, H, ctx.RGBA, ctx.UNSIGNED_BYTE, px)
      return px
    }
    const a = read(host)
    const b = read(control)
    let diff = 0
    for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) diff += 1
    expect(diff).toBe(0)
  })
})
