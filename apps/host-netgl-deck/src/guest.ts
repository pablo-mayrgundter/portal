// The overlay guest: a three.js scene of dots at known positions and one
// orbit, drawn from the host's `layer:view` in ECEF metres. It runs in an
// iframe on another origin and talks only to the host origins listed here.

import * as THREE from 'three'
import {
  makeNetGLThreeOverlayGuest,
  parentTransport,
  sphereToEcef,
  type NetGLLayerView
} from '@pablo-mayrgundter/portal-netgl'
import { MARKERS, ORBIT } from './points'

// The pages allowed to embed this guest. A guest must never take this list
// from its own URL: any page could frame it with ?host=<itself>.
const HOST_ORIGINS = [
  'http://localhost:5190',
  'http://127.0.0.1:5190',
  'http://localhost:5400',
  'http://127.0.0.1:5400',
  'https://pablo-mayrgundter.github.io'
]
// Same-origin embedding too (a build opened with ?sandbox=0).
if (location.origin !== 'null' && !HOST_ORIGINS.includes(location.origin)) HOST_ORIGINS.push(location.origin)

const msg = document.getElementById('msg')!

const start = (): void => {
  const transport = parentTransport({
    hostOrigins: HOST_ORIGINS,
    onReject: (r) => console.warn('[netgl-deck guest] dropped a message', r)
  })

  const scene = new THREE.Scene()
  const dotPositions = new Float32Array(MARKERS.length * 3)
  const dotColors = new Float32Array(MARKERS.length * 3)
  MARKERS.forEach((m, i) => {
    const c = new THREE.Color().setRGB(m.color[0] / 255, m.color[1] / 255, m.color[2] / 255, THREE.SRGBColorSpace)
    dotColors.set([c.r, c.g, c.b], i * 3)
  })
  const dotGeometry = new THREE.BufferGeometry()
  dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3))
  dotGeometry.setAttribute('color', new THREE.BufferAttribute(dotColors, 3))
  // Depth-tested against deck's globe, but writing no depth of its own.
  const dotMaterial = new THREE.PointsMaterial({ size: 8, sizeAttenuation: false, vertexColors: true, depthWrite: false })
  const dots = new THREE.Points(dotGeometry, dotMaterial)
  dots.frustumCulled = false
  scene.add(dots)

  const ORBIT_SEGMENTS = 256
  const orbitPositions = new Float32Array(ORBIT_SEGMENTS * 3)
  const orbitGeometry = new THREE.BufferGeometry()
  orbitGeometry.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3))
  const orbit = new THREE.LineLoop(orbitGeometry, new THREE.LineBasicMaterial({ color: 0x40e0ff, depthWrite: false }))
  orbit.frustumCulled = false
  scene.add(orbit)

  const satGeometry = new THREE.BufferGeometry()
  satGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3))
  const sat = new THREE.Points(satGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 6, sizeAttenuation: false, depthWrite: false }))
  sat.frustumCulled = false
  scene.add(sat)

  // A point on the orbit at phase u (radians from the ascending node), ECEF.
  const orbitPoint = (u: number, radius: number): [number, number, number] => {
    const inc = (ORBIT.inclinationDeg * Math.PI) / 180
    const node = (ORBIT.ascendingNodeLngDeg * Math.PI) / 180
    const r = radius + ORBIT.altitude
    const x = Math.cos(u)
    const y = Math.sin(u) * Math.cos(inc)
    const z = Math.sin(u) * Math.sin(inc)
    return [r * (x * Math.cos(node) - y * Math.sin(node)), r * (x * Math.sin(node) + y * Math.cos(node)), r * z]
  }

  let radius = 0
  const onView = (view: NetGLLayerView): void => {
    const R = view.earth?.radius ?? 6378137
    if (R !== radius) {
      radius = R
      MARKERS.forEach((m, i) => dotPositions.set(sphereToEcef(m.lng, m.lat, m.alt, R), i * 3))
      dotGeometry.attributes.position.needsUpdate = true
      for (let i = 0; i < ORBIT_SEGMENTS; i += 1) orbitPositions.set(orbitPoint((i / ORBIT_SEGMENTS) * 2 * Math.PI, R), i * 3)
      orbitGeometry.attributes.position.needsUpdate = true
    }
    // The host's clock moves the satellite along the orbit.
    const u = ((view.timeMs / 60000 / ORBIT.periodMin) % 1) * 2 * Math.PI
    ;(satGeometry.attributes.position as THREE.BufferAttribute).set(orbitPoint(u, R))
    satGeometry.attributes.position.needsUpdate = true
    // The renderer runs at pixel ratio 1 on the host's drawing buffer.
    dotMaterial.size = 8 * view.pixelRatio
    ;(sat.material as THREE.PointsMaterial).size = 6 * view.pixelRatio
  }

  const guest = makeNetGLThreeOverlayGuest({
    WebGLRenderer: THREE.WebGLRenderer,
    scene,
    camera: new THREE.PerspectiveCamera(),
    transport,
    onView
  })
  guest.start()
  msg.textContent = 'NetGL guest running; drawing into the host.'
}

try {
  start()
} catch (err) {
  msg.textContent = `Not started: ${err instanceof Error ? err.message : String(err)}`
}
