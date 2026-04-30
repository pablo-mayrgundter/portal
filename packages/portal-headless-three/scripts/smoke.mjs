// Smoke test for the node-side headless renderer. Builds a tiny scene (one
// orange cube + lights), renders one frame, writes /tmp/portal-headless-
// smoke.png. Bypasses TS so node 20 can run it without a build step:
//   node packages/portal-headless-three/scripts/smoke.mjs

import { writeFileSync } from 'node:fs'
import url from 'node:url'
import * as THREE from 'three'
import gl from 'gl'
import { JSDOM } from 'jsdom'
import { PNG } from 'pngjs'

// Inline the same DOM bootstrap the package's initDom does. We don't import
// the package itself here so the smoke can run before any TS compile step.
const dom = new JSDOM('<!DOCTYPE html>', { pretendToBeVisual: true })
globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.self = dom.window
globalThis.URL = url.URL

const W = 320
const H = 240
const out = '/tmp/portal-headless-smoke.png'

const glCtx = gl(W, H, {
  antialias: false,
  stencil: true,
  depth: true,
  preserveDrawingBuffer: false,
  createWebGL2Context: true
})
if (!glCtx) {
  console.error('headless-gl: could not create WebGL2 context')
  process.exit(1)
}

const renderer = new THREE.WebGLRenderer({
  context: glCtx,
  antialias: false,
  stencil: true,
  depth: true
})
renderer.setSize(W, H, false)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.NoToneMapping

const scene = new THREE.Scene()
scene.background = new THREE.Color('#101826')
scene.add(new THREE.AmbientLight(0xffffff, 0.4))
const dir = new THREE.DirectionalLight(0xffffff, 1.2)
dir.position.set(2, 3, 2)
scene.add(dir)

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: '#ff7733', roughness: 0.4 })
)
scene.add(cube)

const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
camera.position.set(2, 1.5, 3)
camera.lookAt(0, 0, 0)

renderer.setRenderTarget(null)
renderer.render(scene, camera)

const pixels = new Uint8Array(W * H * 4)
glCtx.readPixels(0, 0, W, H, glCtx.RGBA, glCtx.UNSIGNED_BYTE, pixels)
const png = new PNG({ width: W, height: H })
for (let y = 0; y < H; y += 1) {
  for (let x = 0; x < W; x += 1) {
    const dst = (y * W + x) * 4
    const src = ((H - y - 1) * W + x) * 4
    png.data[dst] = pixels[src]
    png.data[dst + 1] = pixels[src + 1]
    png.data[dst + 2] = pixels[src + 2]
    png.data[dst + 3] = pixels[src + 3]
  }
}
writeFileSync(out, PNG.sync.write(png))
console.log(`wrote ${out}`)
