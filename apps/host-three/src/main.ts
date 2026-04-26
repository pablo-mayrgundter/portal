import * as THREE from 'three'
import { makePortalPlane, setPortalTexture, updateCoupledCamera } from '@spatial/portal-three'
import { createWorldA } from './world-a'
import { createWorldB } from './world-b'
import { attachBasicFlyControls } from './controls'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
app.appendChild(renderer.domElement)

const hostCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 120)
hostCamera.position.set(0, 1.6, 5.5)

const portalCamera = new THREE.PerspectiveCamera(70, 1, 0.1, 120)

const { scene: worldA } = createWorldA()
const { scene: worldB, tick: tickWorldB } = createWorldB()

const sourcePortal = makePortalPlane(new THREE.Vector2(2.6, 3.2))
sourcePortal.position.set(0, 1.6, -3.5)
worldA.add(sourcePortal)

const targetAnchor = new THREE.Object3D()
targetAnchor.position.set(0, 1.6, 0)
targetAnchor.rotation.y = Math.PI
worldB.add(targetAnchor)

const portalTarget = new THREE.WebGLRenderTarget(1024, 1024, {
  depthBuffer: true,
  stencilBuffer: false
})
setPortalTexture(sourcePortal, portalTarget.texture)

const controls = attachBasicFlyControls(hostCamera, renderer.domElement)

const onResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  hostCamera.aspect = window.innerWidth / window.innerHeight
  hostCamera.updateProjectionMatrix()
}
window.addEventListener('resize', onResize)

const clock = new THREE.Clock()

const frame = () => {
  const dt = clock.getDelta()
  const t = clock.elapsedTime

  controls.update(dt)
  tickWorldB(t)

  updateCoupledCamera(hostCamera, sourcePortal, targetAnchor, portalCamera)

  const portalAspect = 2.6 / 3.2
  portalCamera.aspect = portalAspect
  portalCamera.updateProjectionMatrix()

  renderer.setRenderTarget(portalTarget)
  renderer.render(worldB, portalCamera)
  renderer.setRenderTarget(null)

  renderer.render(worldA, hostCamera)
  requestAnimationFrame(frame)
}

frame()
