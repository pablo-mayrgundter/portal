// The checkpoint's contract: a guest framework that caches GL state and
// does NOT reset that cache between frames still renders correctly when
// the host mutates the shared receiver context between the guest's frames.
//
// Setup: a three.js guest (three caches program, VAO, texture-unit
// bindings, blend, clear colour, ...) renders through a recorder session.
// Between frame 1 and frame 2, a host renderer draws its own textured
// scene into the receiver context, and we pile on extra state damage.
// Frame 2 replays with a checkpoint in front and must be byte-equal to a
// control that rendered frame 2 on a pristine context. Without the
// checkpoint, the same sequence must NOT be equal — proof the test bites.

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import * as THREE from 'three'
import { JSDOM } from 'jsdom'
import url from 'node:url'
import type { NetGLCall } from './messages'
import { makeNetGLRecorderSession } from './recorder'
import { makeNetGLReplay } from './replay'

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
    preserveDrawingBuffer: false,
    createWebGL2Context: true
  } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
  return ctx
}

const readPixels = (ctx: WebGL2RenderingContext): Uint8Array => {
  const px = new Uint8Array(W * H * 4)
  ctx.readPixels(0, 0, W, H, ctx.RGBA, ctx.UNSIGNED_BYTE, px)
  return px
}

const checker = (a: [number, number, number], b: [number, number, number]): THREE.DataTexture => {
  const data = new Uint8Array([...a, 255, ...b, 255, ...b, 255, ...a, 255])
  const t = new THREE.DataTexture(data, 2, 2, THREE.RGBAFormat)
  t.needsUpdate = true
  return t
}

// Guest scene: a checker-textured cube. The pose is a parameter so frame 2
// differs from frame 1 (three must issue new uniforms but can skip cached
// program / VAO / texture binds).
const buildGuest = (): { scene: THREE.Scene; camera: THREE.PerspectiveCamera; cube: THREE.Mesh } => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#102030')
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ map: checker([255, 200, 0], [0, 90, 255]) })
  )
  scene.add(cube)
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  camera.position.set(1.8, 1.2, 2.4)
  camera.lookAt(0, 0, 0)
  return { scene, camera, cube }
}

const pose = (cube: THREE.Mesh, frame: number): void => {
  cube.rotation.set(0.4 + frame * 0.3, 0.6 + frame * 0.2, 0)
}

const newRenderer = (params: THREE.WebGLRendererParameters): THREE.WebGLRenderer => {
  const r = new THREE.WebGLRenderer({ antialias: false, stencil: true, depth: true, ...params })
  r.setSize(W, H, false)
  r.outputColorSpace = THREE.SRGBColorSpace
  r.toneMapping = THREE.NoToneMapping
  return r
}

// Host: its own textured scene + a pile of raw state damage.
const hostTrashes = (receiver: WebGL2RenderingContext): void => {
  const host = newRenderer({ context: receiver })
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#ff00ff')
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshBasicMaterial({ map: checker([10, 255, 10], [255, 10, 10]), transparent: true, opacity: 0.5 })
  )
  scene.add(mesh)
  const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 10)
  cam.position.z = 2
  host.render(scene, cam)

  const g = receiver
  g.enable(g.BLEND)
  g.blendFunc(g.ONE, g.ONE)
  g.enable(g.CULL_FACE)
  g.cullFace(g.FRONT)
  g.depthFunc(g.GREATER)
  g.colorMask(true, false, true, true)
  g.clearColor(1, 0, 0, 1)
  g.viewport(0, 0, 7, 9)
  g.enable(g.SCISSOR_TEST)
  g.scissor(3, 3, 10, 10)
  g.pixelStorei(g.UNPACK_ALIGNMENT, 1)
  g.activeTexture(g.TEXTURE3)
  g.useProgram(null)
  g.bindVertexArray(null)
}

const runGuest = (withCheckpoint: boolean): Uint8Array => {
  const shadow = makeCtx()
  const receiver = makeCtx()
  let out: NetGLCall[] = []
  // structuredClone at post time, like postMessage does: three reuses
  // scratch typed arrays for uniforms, so a buffered live reference would
  // replay the last value written, not the value at call time.
  const session = makeNetGLRecorderSession(shadow, (c) => out.push(structuredClone(c)))
  const replay = makeNetGLReplay(receiver)
  const flush = (): void => {
    for (const c of out) replay(c)
    out = []
  }

  if (withCheckpoint) session.checkpoint()
  const guest = newRenderer({ context: session.gl })
  const { scene, camera, cube } = buildGuest()

  pose(cube, 1)
  guest.render(scene, camera)
  flush()

  hostTrashes(receiver)

  // Frame boundary: checkpoint lands at the head of the next batch.
  if (withCheckpoint) session.checkpoint()
  pose(cube, 2)
  guest.render(scene, camera)
  flush()
  return readPixels(receiver)
}

const renderControl = (): Uint8Array => {
  const ctx = makeCtx()
  const r = newRenderer({ context: ctx })
  const { scene, camera, cube } = buildGuest()
  pose(cube, 2)
  r.render(scene, camera)
  return readPixels(ctx)
}

describe('NetGL state checkpoint', () => {
  beforeAll(() => {
    initDom()
  })

  it('a cache-holding guest renders byte-equal after the host trashes shared state', () => {
    const control = renderControl()
    const actual = runGuest(true)
    let diff = 0
    for (let i = 0; i < control.length; i += 1) if (control[i] !== actual[i]) diff += 1
    expect(diff).toBe(0)
  })

  it('without the checkpoint the same sequence renders wrong (the test bites)', () => {
    const control = renderControl()
    const actual = runGuest(false)
    let diff = 0
    for (let i = 0; i < control.length; i += 1) if (control[i] !== actual[i]) diff += 1
    expect(diff).toBeGreaterThan(0)
  })
})
