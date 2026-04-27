import * as THREE from 'three'
import {
  computeTraversalPose,
  detectPortalCrossing,
  makePortalPlane,
  setPortalTexture,
  updateCoupledCamera
} from '@portal/portal-three'
import { createWorldA } from './world-a'
import { createWorldB } from './world-b'
import { attachBasicFlyControls } from './controls'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
app.appendChild(renderer.domElement)

const hostCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.02, 200)
hostCamera.position.set(0, 1.6, 5.5)

const portalCamera = new THREE.PerspectiveCamera(70, 1, 0.02, 200)

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

const initialW = Math.max(1, Math.floor(window.innerWidth * renderer.getPixelRatio()))
const initialH = Math.max(1, Math.floor(window.innerHeight * renderer.getPixelRatio()))

const targetForA = new THREE.WebGLRenderTarget(initialW, initialH, { depthBuffer: true, stencilBuffer: false })
const targetForB = new THREE.WebGLRenderTarget(initialW, initialH, { depthBuffer: true, stencilBuffer: false })
setPortalTexture(portalA, targetForA.texture)
setPortalTexture(portalB, targetForB.texture)

type WorldNode = {
  scene: THREE.Scene
  portal: THREE.Mesh
  target: THREE.WebGLRenderTarget
  tick?: (t: number) => void
}

const nodeA: WorldNode = { scene: worldA, portal: portalA, target: targetForA }
const nodeB: WorldNode = { scene: worldB, portal: portalB, target: targetForB, tick: tickWorldB }

let here: WorldNode = nodeA
let there: WorldNode = nodeB

const controls = attachBasicFlyControls(hostCamera, renderer.domElement)

const onResize = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  renderer.setSize(w, h)
  hostCamera.aspect = w / h
  hostCamera.updateProjectionMatrix()
  const pr = renderer.getPixelRatio()
  const tw = Math.max(1, Math.floor(w * pr))
  const th = Math.max(1, Math.floor(h * pr))
  targetForA.setSize(tw, th)
  targetForB.setSize(tw, th)
}
window.addEventListener('resize', onResize)

const clock = new THREE.Clock()
const prevPos = new THREE.Vector3().copy(hostCamera.position)

const frame = () => {
  const dt = clock.getDelta()
  const t = clock.elapsedTime

  prevPos.copy(hostCamera.position)
  controls.update(dt)
  nodeA.tick?.(t)
  nodeB.tick?.(t)

  const crossing = detectPortalCrossing(prevPos, hostCamera.position, here.portal)
  if (crossing.crossed) {
    const traversed = computeTraversalPose(hostCamera, here.portal, there.portal)
    hostCamera.position.set(...traversed.position)
    controls.setOrientationFromForward(new THREE.Vector3(...traversed.forward))
    const swap = here
    here = there
    there = swap
  }

  updateCoupledCamera(hostCamera, here.portal, there.portal, portalCamera)

  renderer.setRenderTarget(here.target)
  renderer.render(there.scene, portalCamera)
  renderer.setRenderTarget(null)

  renderer.render(here.scene, hostCamera)

  requestAnimationFrame(frame)
}

frame()
