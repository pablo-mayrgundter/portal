import * as THREE from 'three'
import {
  couplePoseAcrossPortal,
  type Mat4,
  type PortalPose,
  type Viewport
} from '@portal/portal-core'
import {
  makeIframeEndpoint,
  type CompositorDebugMode
} from '@portal/portal-iframe'
import {
  makeLocalEndpoint,
  makePortalPlane,
  makePortalStencilMask
} from '@portal/portal-three'
import { attachBasicFlyControls } from '@portal/portal-controls'

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
// compose=raw     blit iframe color full-screen with NO stencil + NO depth-clip.
//                 You see the iframe's whole framebuffer. Useful to compare
//                 against what local would render at the equivalent pose.
//
// freeze=1        capture coupled pose + projection ONCE (right after iframe
//                 ready), keep sending the same pose every frame. Walk around
//                 the host scene: through-portal view should stay anchored to a
//                 fixed iframe-world location (window-like, parallax-correct).
//                 If it slides decal-style with the host motion, compositing is
//                 wrong; if it stays anchored but looks different from what we
//                 expect, the bug is upstream of compositing.
//
// log=1           periodically (1 Hz) log host's outgoing pose + projection,
//                 and the iframe target periodically logs what it received and
//                 the matrices it sent back. Lets us verify round-trip.
// ---------------------------------------------------------------------------
const params = new URLSearchParams(location.search)
const DEBUG_MODE = (params.get('debug') ?? 'off') as CompositorDebugMode
const COMPOSE_RAW = params.get('compose') === 'raw'
const FREEZE = params.get('freeze') === '1'
const LOG = params.get('log') === '1'
// Default 0: with the iframe rendering synchronously in its message handler
// (no RAF wait), round-trip is ~instant and prediction tends to over-shoot.
// Override with ?predict=1 if the iframe's hosting tab/browser introduces lag
// (e.g., RAF throttling on a backgrounded tab, slow GPU readback).
const PREDICT = (() => {
  const raw = params.get('predict')
  if (raw === null) return 0
  const n = Number(raw)
  return Number.isFinite(n) ? n : 0
})()

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
const iframeEndpoint = makeIframeEndpoint({
  iframe,
  debugMode: DEBUG_MODE,
  composeRaw: COMPOSE_RAW
})

if (DEBUG_MODE !== 'off') console.log('[host] compositor debug mode:', DEBUG_MODE)
if (COMPOSE_RAW) console.log('[host] compose=raw: bypassing stencil + depth-clip')
if (FREEZE) console.log('[host] freeze=1: pose will be captured once and held')
if (PREDICT !== 1) console.log('[host] predict =', PREDICT, '(frames ahead)')

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
let frozenPose: PortalPose | null = null
let frozenProjection: Mat4 | null = null
let frozenViewport: Viewport | null = null

// Per-frame scratch for the pose handoff. We mutate these in place rather than
// allocating fresh arrays/objects each frame.
const currPos: [number, number, number] = [0, 0, 0]
const currFwd: [number, number, number] = [0, 0, -1]
const currUp: [number, number, number] = [0, 1, 0]
const prevPos: [number, number, number] = [0, 0, 0]
const prevFwd: [number, number, number] = [0, 0, -1]
const prevUp: [number, number, number] = [0, 1, 0]
const sentPos: [number, number, number] = [0, 0, 0]
const sentFwd: [number, number, number] = [0, 0, -1]
const sentUp: [number, number, number] = [0, 1, 0]
const sentPose: PortalPose = { position: sentPos, forward: sentFwd, up: sentUp }
const currentPose: PortalPose = { position: currPos, forward: currFwd, up: currUp }
let havePrev = false

const extrapInto = (
  out: [number, number, number],
  prev: readonly number[],
  curr: readonly number[],
  steps: number
): void => {
  out[0] = curr[0] + (curr[0] - prev[0]) * steps
  out[1] = curr[1] + (curr[1] - prev[1]) * steps
  out[2] = curr[2] + (curr[2] - prev[2]) * steps
}

const normalizeInPlace = (v: [number, number, number]): void => {
  const len = Math.hypot(v[0], v[1], v[2])
  if (len < 1e-9) {
    v[0] = 0
    v[1] = 0
    v[2] = -1
    return
  }
  const inv = 1 / len
  v[0] *= inv
  v[1] *= inv
  v[2] *= inv
}

const frame = () => {
  const dt = clock.getDelta()
  const time = clock.elapsedTime

  controls.update(dt)

  // --- iframe pose handoff: ask the iframe to render from the mirrored pose.
  if (iframeEndpoint.isReady()) {
    hostCamera.getWorldPosition(camPos)
    camFwd.set(0, 0, -1).applyQuaternion(hostCamera.quaternion)
    camUp.set(0, 1, 0).applyQuaternion(hostCamera.quaternion)

    currPos[0] = camPos.x; currPos[1] = camPos.y; currPos[2] = camPos.z
    currFwd[0] = camFwd.x; currFwd[1] = camFwd.y; currFwd[2] = camFwd.z
    currUp[0] = camUp.x;   currUp[1] = camUp.y;   currUp[2] = camUp.z

    // Predict the host pose `PREDICT` frames ahead. The iframe takes ~1 frame
    // to respond, so without prediction the composite uses content rendered
    // for a stale pose — visible during fast rotation as content "lagging" the
    // door (e.g., balls appear to drift up when the user pitches up).
    let hostPoseToSend: PortalPose
    if (PREDICT > 0 && havePrev) {
      extrapInto(sentPos, prevPos, currPos, PREDICT)
      extrapInto(sentFwd, prevFwd, currFwd, PREDICT)
      extrapInto(sentUp, prevUp, currUp, PREDICT)
      normalizeInPlace(sentFwd)
      normalizeInPlace(sentUp)
      hostPoseToSend = sentPose
    } else {
      hostPoseToSend = currentPose
    }
    prevPos[0] = currPos[0]; prevPos[1] = currPos[1]; prevPos[2] = currPos[2]
    prevFwd[0] = currFwd[0]; prevFwd[1] = currFwd[1]; prevFwd[2] = currFwd[2]
    prevUp[0] = currUp[0];   prevUp[1] = currUp[1];   prevUp[2] = currUp[2]
    havePrev = true

    const sourceAnchor = hostEndpoint.getAnchor()
    const targetAnchor = iframeEndpoint.getAnchor()

    const coupled = couplePoseAcrossPortal(
      hostPoseToSend,
      { source: sourceAnchor, target: targetAnchor }
    )

    const projection: Mat4 = Array.from(hostCamera.projectionMatrix.elements)
    const pixelRatio = renderer.getPixelRatio()
    const width = Math.max(1, Math.floor(window.innerWidth * pixelRatio))
    const height = Math.max(1, Math.floor(window.innerHeight * pixelRatio))

    if (FREEZE && !frozenPose) {
      frozenPose = coupled
      frozenProjection = projection
      frozenViewport = { width, height }
      const fmt = (a: number[]) => `[${a.map((n) => n.toFixed(3)).join(', ')}]`
      console.log('[host] freeze captured pose pos:', fmt(coupled.position))
      console.log('[host] freeze captured pose fwd:', fmt(coupled.forward ?? [0, 0, -1]))
      console.log('[host] freeze captured viewport:', width, 'x', height)
    }

    iframeEndpoint.requestFrame({
      pose: FREEZE && frozenPose ? frozenPose : coupled,
      projection: FREEZE && frozenProjection ? frozenProjection : projection,
      viewport: FREEZE && frozenViewport ? frozenViewport : { width, height },
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
  // In compose=raw mode: skip the host scene + stencil mask; just blit the
  // iframe's full framebuffer over the entire viewport so the user can see
  // exactly what the iframe rendered.
  renderer.setRenderTarget(null)
  renderer.clear(true, true, true)

  if (COMPOSE_RAW) {
    if (iframeEndpoint.hasFrame()) {
      iframeEndpoint.renderAsDestination(renderer)
    }
  } else {
    hostEndpoint.renderAsSource(renderer, hostCamera)

    const tbg = iframeEndpoint.isReady() ? iframeEndpoint.getBackground() : { r: 0, g: 0, b: 0 }
    stencilBg.setRGB(tbg.r, tbg.g, tbg.b)
    stencilMask.update(hostAnchor, hostCamera, stencilBg)
    renderer.render(stencilMask.scene, stencilMask.camera)

    renderer.clearDepth()

    if (iframeEndpoint.hasFrame()) {
      iframeEndpoint.renderAsDestination(renderer)
    }
  }

  requestAnimationFrame(frame)
}

frame()
