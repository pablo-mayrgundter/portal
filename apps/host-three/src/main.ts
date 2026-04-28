import * as THREE from 'three'
import {
  makeLocalEndpoint,
  makePortalLink,
  makePortalPlane
} from '@portal/portal-three'
import { createWorldA } from './world-a'
import { createWorldB } from './world-b'
import { attachBasicFlyControls } from './controls'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')

const renderer = new THREE.WebGLRenderer({ antialias: true, stencil: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.autoClear = false
app.appendChild(renderer.domElement)

const hostCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.02, 200)
hostCamera.position.set(0, 1.6, 5.5)

const { scene: worldA } = createWorldA()
const { scene: worldB, tick: tickWorldB } = createWorldB()

const portalSize = new THREE.Vector2(2.6, 3.2)

const portalA = makePortalPlane(portalSize)
portalA.position.set(0, 1.6, -3.5)
worldA.add(portalA)

const portalB = makePortalPlane(portalSize)
portalB.position.set(0, 1.6, 0)
portalB.rotation.y = Math.PI
worldB.add(portalB)

const link = makePortalLink({
  a: makeLocalEndpoint({ scene: worldA, anchor: portalA }),
  b: makeLocalEndpoint({ scene: worldB, anchor: portalB, tick: tickWorldB })
})

const controls = attachBasicFlyControls(hostCamera, renderer.domElement)

const onResize = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  renderer.setSize(w, h)
  hostCamera.aspect = w / h
  hostCamera.updateProjectionMatrix()
}
window.addEventListener('resize', onResize)

const clock = new THREE.Clock()
const newForward = new THREE.Vector3()

const frame = () => {
  const dt = clock.getDelta()
  const time = clock.elapsedTime

  controls.update(dt)

  const result = link.frame({ renderer, hostCamera, time })

  if (result.teleported) {
    newForward.set(0, 0, -1).applyQuaternion(hostCamera.quaternion)
    controls.setOrientationFromForward(newForward)
  }

  requestAnimationFrame(frame)
}

frame()
