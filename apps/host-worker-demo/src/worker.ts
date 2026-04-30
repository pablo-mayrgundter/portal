import * as THREE from 'three'
import { makeWorkerTarget } from '@portal/portal-worker'
import type { PortalAnchor } from '@portal/portal-core'

// Worker render service — no DOM, no parent window. The OffscreenCanvas
// inside makeWorkerTarget never displays anywhere; it exists purely to give
// the WebGL context something to render into before transferToImageBitmap
// ships the pixels back to the main thread.

// "World B"-style red room with floating spheres. Same shape as the iframe
// demo's swarm scene so an A/B comparison via ?pose= is apples-to-apples.
const scene = new THREE.Scene()
scene.background = new THREE.Color('#220d17')
scene.add(new THREE.AmbientLight(0xfff3f7, 0.5))
const key = new THREE.PointLight(0xff7799, 18)
key.position.set(0, 3, 3)
scene.add(key)

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(12, 64),
  new THREE.MeshStandardMaterial({ color: '#2f0f22', roughness: 0.95 })
)
floor.rotation.x = -Math.PI / 2
scene.add(floor)

const sphereGeo = new THREE.IcosahedronGeometry(0.45, 1)
const sphereMat = new THREE.MeshStandardMaterial({
  color: '#ff89ad',
  metalness: 0.2,
  roughness: 0.25
})
const swarm: THREE.Mesh[] = []
for (let i = 0; i < 24; i += 1) {
  const m = new THREE.Mesh(sphereGeo, sphereMat)
  m.position.set(
    Math.cos(i * 0.35) * 2.6,
    0.8 + (i % 4) * 0.4,
    Math.sin(i * 0.35) * 2.6
  )
  scene.add(m)
  swarm.push(m)
}

const tick = (t: number): void => {
  swarm.forEach((m, idx) => {
    m.position.y = 1.1 + Math.sin(t * 1.2 + idx * 0.3) * 0.5
    m.rotation.y = t * 0.6 + idx * 0.2
  })
}

// Portal anchor matches the iframe target's anchor for parity (so a ?pose=
// captured in the iframe demo composites into the same view here).
const anchor: PortalAnchor = {
  position: [0, 1.6, 0],
  normal: [0, 0, -1],
  up: [0, 1, 0],
  halfWidth: 1.3,
  halfHeight: 1.6
}

const target = makeWorkerTarget({ scene, anchor, tick })
target.start()
