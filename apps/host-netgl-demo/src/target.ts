// Iframe target for the NetGL portal demo.
//
// All the heavy lifting (shadow GL context, transport, NetGLRenderer,
// stencil-test application, oblique near-plane clip, setPose handler, ready
// handshake, frame-end marker) lives in `makeNetGLPortalTarget` in
// `@pablo-mayrgundter/portal-netgl`. This file just builds worldB and animates it.

import * as THREE from 'three'
import type { PortalAnchor } from '@portal/portal-core'
import { makeNetGLPortalTarget } from '@pablo-mayrgundter/portal-netgl'

// ---------------------------------------------------------------------------
// worldB — red-room + sphere-swarm scene, animated via a per-frame tick.
// ---------------------------------------------------------------------------

const anchor: PortalAnchor = {
  position: [0, 1.6, 0],
  normal: [0, 0, -1],
  up: [0, 1, 0],
  halfWidth: 1.3,
  halfHeight: 1.6
}

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
  m.position.set(Math.cos(i * 0.35) * 2.6, 0.8 + (i % 4) * 0.4, Math.sin(i * 0.35) * 2.6)
  scene.add(m)
  swarm.push(m)
}

const tick = (t: number): void => {
  swarm.forEach((m, idx) => {
    m.position.y = 1.1 + Math.sin(t * 1.2 + idx * 0.3) * 0.5
    m.rotation.y = t * 0.6 + idx * 0.2
  })
}

makeNetGLPortalTarget({ scene, anchor, tick }).start()
