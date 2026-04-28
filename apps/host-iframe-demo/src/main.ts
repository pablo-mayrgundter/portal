import * as THREE from 'three'
import { couplePoseAcrossPortal, type Mat4 } from '@portal/portal-core'
import {
  makeIframeEndpoint,
  type CompositorDebugMode
} from '@portal/portal-iframe'
import {
  makeLocalEndpoint,
  makePortalPlane,
  makePortalStencilMask
} from '@portal/portal-three'
import { attachBasicFlyControls } from './controls'

// ---------------------------------------------------------------------------
// Debug toggles via URL params, e.g. http://localhost:5173/?debug=noclip&log=1
//
// debug=off       (default) normal compositing
// debug=noclip    show iframe color WITHOUT depth-clip — if parallax issue
//                 persists with this, the bug is in placement/projection,
//                 not the depth-clip itself.
// debug=depth     show unpacked depth as grayscale — bands/noise/blank
//                 mean the depth pack/unpack round-trip is broken.
// debug=worldpos  reconstructed iframe-world position as RGB — smooth color
//                 gradients across visible geometry mean reconstruction is
//                 working.
//
// log=1           periodically (1 Hz) log host's outgoing pose + projection,
//                 and the iframe target periodically logs what it received and
//                 the matrices it sent back. Lets us verify round-trip.
// ---------------------------------------------------------------------------
const params = new URLSearchParams(location.search)
const DEBUG_MODE = (params.get('debug') ?? 'off') as CompositorDebugMode
const LOG = params.get('log') === '1'

// Forward host's URL params to the iframe so the iframe target can pick up the
// same flags (LOG, etc.) without us hard-coding its URL in index.html.
const iframeForUrl = document.querySelector<HTMLIFrameElement>('#target-iframe')
if (iframeForUrl && location.search) {
  iframeForUrl.src = `/target.html${location.search}`
}

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')
const iframe = document.querySelector<HTMLIFrameElement>('#target-iframe')
if (!iframe) throw new Error('Missing #target-iframe')

const renderer = new THREE.WebGLRenderer({ antialias: true, stencil: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.autoClear = false
app.appendChild(renderer.domElement)

const hostCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.02, 200)
hostCamera.position.set(0, 1.6, 5.5)

// Source scene: a simple "world A"-style room with blue cubes.
const hostScene = new THREE.Scene()
hostScene.background = new THREE.Color('#101826')
hostScene.add(new THREE.HemisphereLight(0xb9ccff, 0x223344, 1))
const dirLight = new THREE.DirectionalLight(0xffffff, 0.65)
dirLight.position.set(3, 6, 2)
hostScene.add(dirLight)
const hostFloor = new THREE.Mesh(
  new THREE.PlaneGeometry(18, 18),
  new THREE.MeshStandardMaterial({ color: '#1b2a3f', roughness: 0.95 })
)
hostFloor.rotation.x = -Math.PI / 2
hostScene.add(hostFloor)
const cubeGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9)
const cubeMat = new THREE.MeshStandardMaterial({ color: '#5da9ff', roughness: 0.35 })
for (let i = 0; i < 14; i += 1) {
  const c = new THREE.Mesh(cubeGeo, cubeMat)
  c.position.set(Math.sin(i * 0.5) * 4, 0.45, -3 - i * 0.65)
  hostScene.add(c)
}

// Portal anchor (where the door sits in the host scene).
const portalSize = new THREE.Vector2(2.6, 3.2)
const hostAnchor = makePortalPlane(portalSize)
hostAnchor.position.set(0, 1.6, -3.5)
hostScene.add(hostAnchor)

// Local-side wrapper for the host scene (we use it for the source render and for
// the stencil-mask's anchor pose).
const hostEndpoint = makeLocalEndpoint({ scene: hostScene, anchor: hostAnchor })

// The iframe-portal endpoint: declares its anchor over postMessage, sends
// frames back when we ask.
const iframeEndpoint = makeIframeEndpoint({ iframe, debugMode: DEBUG_MODE })

if (DEBUG_MODE !== 'off') console.log('[host] compositor debug mode:', DEBUG_MODE)

const stencilMask = makePortalStencilMask()

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
const stencilBg = new THREE.Color()

// Scratch space for the per-frame iframe pose handoff.
const camPos = new THREE.Vector3()
const camFwd = new THREE.Vector3()
const camUp = new THREE.Vector3()

let lastLogTime = 0

const frame = () => {
  const dt = clock.getDelta()
  const time = clock.elapsedTime

  controls.update(dt)

  // --- iframe pose handoff: ask the iframe to render from the mirrored pose.
  if (iframeEndpoint.isReady()) {
    hostCamera.getWorldPosition(camPos)
    camFwd.set(0, 0, -1).applyQuaternion(hostCamera.quaternion)
    camUp.set(0, 1, 0).applyQuaternion(hostCamera.quaternion)

    const sourceAnchor = hostEndpoint.getAnchor()
    const targetAnchor = iframeEndpoint.getAnchor()

    const coupled = couplePoseAcrossPortal(
      {
        position: [camPos.x, camPos.y, camPos.z],
        forward: [camFwd.x, camFwd.y, camFwd.z],
        up: [camUp.x, camUp.y, camUp.z]
      },
      { source: sourceAnchor, target: targetAnchor }
    )

    const projection: Mat4 = Array.from(hostCamera.projectionMatrix.elements)
    const pixelRatio = renderer.getPixelRatio()
    const width = Math.max(1, Math.floor(window.innerWidth * pixelRatio))
    const height = Math.max(1, Math.floor(window.innerHeight * pixelRatio))

    iframeEndpoint.requestFrame({
      pose: coupled,
      projection,
      viewport: { width, height },
      time
    })

    if (LOG && time - lastLogTime > 1) {
      lastLogTime = time
      const fmt = (a: number[]) => `[${a.map((n) => n.toFixed(3)).join(', ')}]`
      console.log('[host] sourceAnchor:', sourceAnchor)
      console.log('[host] targetAnchor:', targetAnchor)
      console.log('[host] hostPos:', fmt([camPos.x, camPos.y, camPos.z]))
      console.log('[host] hostFwd:', fmt([camFwd.x, camFwd.y, camFwd.z]))
      console.log('[host] hostUp: ', fmt([camUp.x, camUp.y, camUp.z]))
      console.log('[host] coupled pos:', fmt(coupled.position))
      console.log('[host] coupled fwd:', fmt(coupled.forward ?? [0, 0, -1]))
      console.log('[host] coupled up: ', fmt(coupled.up ?? [0, 1, 0]))
      console.log('[host] viewport:', width, 'x', height)
    }
  }

  // --- Render: source scene, then stencil mask, then iframe composite.
  renderer.setRenderTarget(null)
  renderer.clear(true, true, true)

  hostEndpoint.renderAsSource(renderer, hostCamera)

  const tbg = iframeEndpoint.isReady() ? iframeEndpoint.getBackground() : { r: 0, g: 0, b: 0 }
  stencilBg.setRGB(tbg.r, tbg.g, tbg.b)
  stencilMask.update(hostAnchor, hostCamera, stencilBg)
  renderer.render(stencilMask.scene, stencilMask.camera)

  renderer.clearDepth()

  if (iframeEndpoint.hasFrame()) {
    iframeEndpoint.renderAsDestination(renderer)
  }

  requestAnimationFrame(frame)
}

frame()
