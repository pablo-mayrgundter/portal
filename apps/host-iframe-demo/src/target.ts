import * as THREE from 'three'
import { makeIframeTarget } from '@portal/portal-iframe'
import type { PortalAnchor } from '@portal/portal-core'

// "World B"-style red room with floating spheres. The destination portal sits
// at the origin facing -z (so the host's portal anchor mirrors into it).
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
const sphereMat = new THREE.MeshStandardMaterial({ color: '#ff89ad', metalness: 0.2, roughness: 0.25 })
const swarm: THREE.Mesh[] = []
for (let i = 0; i < 24; i += 1) {
  const m = new THREE.Mesh(sphereGeo, sphereMat)
  m.position.set(Math.cos(i * 0.35) * 2.6, 0.8 + (i % 4) * 0.4, Math.sin(i * 0.35) * 2.6)
  scene.add(m)
  swarm.push(m)
}

// Portal anchor: at the origin, normal pointing toward -z. The host will mirror
// its viewer pose across this anchor so that what the host sees through the
// portal aligns with what's behind this anchor in the iframe's world.
const anchor: PortalAnchor = {
  position: [0, 1.6, 0],
  normal: [0, 0, -1],
  up: [0, 1, 0],
  halfWidth: 1.3,
  halfHeight: 1.6
}

const target = makeIframeTarget({
  scene,
  anchor,
  tick(t) {
    swarm.forEach((m, idx) => {
      m.position.y = 1.1 + Math.sin(t * 1.2 + idx * 0.3) * 0.5
      m.rotation.y = t * 0.6 + idx * 0.2
    })
  }
})

target.start()
