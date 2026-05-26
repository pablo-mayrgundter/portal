import * as THREE from 'three'
import {
  buildSnapshotUrl,
  couplePoseAcrossPortal,
  decodeCameraPose,
  encodeCameraPose,
  type EncodedCameraPose,
  type Mat4,
  type PortalPose,
  type PortalTraverseMessage,
  type Viewport
} from '@portal/portal-core'
import {
  makeIframeEndpoint,
  makeIframeTarget,
  type CompositorDebugMode
} from '@portal/portal-iframe'
import {
  detectPortalCrossing,
  makeLocalEndpoint,
  makePortalPlane,
  makePortalStencilMask
} from '@portal/portal-three'
import { attachBasicFlyControls, attachNavDrawer } from '@portal/portal-controls'

attachNavDrawer('iframe')

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
// Diagnostic: turn off FXAA in BOTH directions of color-blit (iframe target
// rendering worldB, and host destination service rendering worldA). Lets us
// A/B test whether FXAA explains an apparent brightness shift through the
// portal vs. the direct view.
const FXAA = params.get('fxaa') !== 'off'

// Forward host's URL params to the iframe so the iframe target can pick up the
// same flags (LOG, etc.) without us hard-coding its URL in index.html.
const iframeForUrl = document.querySelector<HTMLIFrameElement>('#target-iframe')
if (iframeForUrl && location.search) {
  iframeForUrl.src = `target.html${location.search}`
}

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')
const iframe = document.querySelector<HTMLIFrameElement>('#target-iframe')
if (!iframe) throw new Error('Missing #target-iframe')

const renderer = new THREE.WebGLRenderer({ antialias: true, stencil: true })
// Force the GL context's color-space attributes to known values (three's
// constructor doesn't propagate _outputColorSpace until the setter is
// invoked). Keeps the canvas exactly in sync with what the iframe sends back
// over the wire — both halves of the demo render through 'srgb' canvases.
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.NoToneMapping
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.autoClear = false
app.appendChild(renderer.domElement)

const hostCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.02, 200)
hostCamera.position.set(0, 1.6, 5.5)

// ?pose=... permalink: drop into a reproducible viewing position. Useful for
// filing parallax/alignment bugs (paste a permalink, see exactly the same
// pose) and for A/B comparing transports across the iframe + headless demos
// at an identical pose. Press 'P' below to update the URL with the current
// pose and copy it to the clipboard.
const initialPose = decodeCameraPose(params.get('pose'))
if (initialPose) {
  hostCamera.position.set(
    initialPose.position[0],
    initialPose.position[1],
    initialPose.position[2]
  )
}

// Source scene: a simple "world A"-style room with blue cubes.
const hostScene = new THREE.Scene()
hostScene.background = new THREE.Color('#101826')
hostScene.add(new THREE.HemisphereLight(0xb9ccff, 0x223344, 1))
const dirLight = new THREE.DirectionalLight(0xffffff, 0.65)
dirLight.position.set(3, 6, 2)
hostScene.add(dirLight)
const hostFloor = new THREE.Mesh(
  new THREE.PlaneGeometry(18, 18),
  new THREE.MeshStandardMaterial({ color: '#1b2a3f', roughness: 0.95, metalness: 0.03 })
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
// Pre-compile the compositor's GLSL programs so the first portal:frame
// arriving from the iframe doesn't pay program-link cost as a startup
// stutter when it lands on the canvas.
iframeEndpoint.prewarm(renderer)

// Always-on destination service for the host scene. Inactive until the iframe
// becomes the active page (after portal traversal); from then on it responds
// to setPose from the iframe with worldA color+depth bitmaps so the iframe
// can composite the portal-back view through its own stencil mask.
//
// Sends portal:ready to the iframe immediately; iframe stashes the host's
// anchor + background so it doesn't need to hardcode them.
const hostDestinationServiceTarget = iframe.contentWindow
if (hostDestinationServiceTarget) {
  const hostDestinationService = makeIframeTarget({
    scene: hostScene,
    anchor: hostEndpoint.getAnchor(),
    outputTarget: hostDestinationServiceTarget,
    inputFilter: hostDestinationServiceTarget,
    log: LOG,
    fxaa: FXAA
  })
  // Wait for the iframe document to load before announcing — postMessage to a
  // not-yet-loaded contentWindow can race with the iframe's listener setup.
  if (iframe.contentDocument?.readyState === 'complete') {
    hostDestinationService.start()
  } else {
    iframe.addEventListener('load', () => hostDestinationService.start(), { once: true })
  }
}

if (DEBUG_MODE !== 'off') console.log('[host] compositor debug mode:', DEBUG_MODE)
if (COMPOSE_RAW) console.log('[host] compose=raw: bypassing stencil + depth-clip')
if (FREEZE) console.log('[host] freeze=1: pose will be captured once and held')
if (PREDICT !== 1) console.log('[host] predict =', PREDICT, '(frames ahead)')

const stencilMask = makePortalStencilMask()

const controls = attachBasicFlyControls(hostCamera, renderer.domElement)

// Apply ?pose= forward direction AFTER controls exist so the controls' yaw/
// pitch state matches the camera quaternion — otherwise the next mouse drag
// would snap the camera back to the controls' default orientation.
if (initialPose) {
  controls.setOrientationFromForward(
    new THREE.Vector3(
      initialPose.forward[0],
      initialPose.forward[1],
      initialPose.forward[2]
    )
  )
}

// Update og:image / twitter:image meta tags so JS-aware previewers reflect
// the current pose. Crawlers without JS see the static fallback in
// index.html. Pointed at the pair scene since the demos are visually
// equivalent — the transport difference doesn't show in a still image.
const SNAPSHOT_BASE =
  document.querySelector<HTMLMetaElement>('meta[name="portal:snapshot-proxy"]')?.content ??
  'http://localhost:3030'
const SNAPSHOT_SCENE =
  document.querySelector<HTMLMetaElement>('meta[name="portal:snapshot-scene"]')?.content ??
  'pair'
const updateSocialPreview = (pose: EncodedCameraPose | null): void => {
  const url = buildSnapshotUrl({
    baseUrl: SNAPSHOT_BASE,
    scene: SNAPSHOT_SCENE,
    pose,
    width: 1200,
    height: 630
  })
  document.querySelectorAll<HTMLMetaElement>(
    'meta[property="og:image"], meta[name="twitter:image"]'
  ).forEach((el) => { el.content = url })
}
updateSocialPreview(initialPose)

// Press P (or Shift+P) to copy a permalink encoding the current host camera
// pose. Updates the URL via replaceState so a refresh lands on the same view,
// and writes the full URL to the clipboard. Includes the iframe target's
// pose by NOT serializing it — the iframe is fully determined by the host
// pose via couplePoseAcrossPortal, so a single host-pose permalink is enough.
// VITE_SHARE_BASE: when set, press-P copies a permalink rooted at the
// share-proxy (which rewrites og:image based on ?pose= for crawler-correct
// social previews). When unset (e.g. local dev), copy the current page URL.
const SHARE_BASE = import.meta.env.VITE_SHARE_BASE as string | undefined
const buildShareUrl = (encoded: string): string => {
  if (SHARE_BASE) {
    const u = new URL(SHARE_BASE)
    u.searchParams.set('pose', encoded)
    return u.toString()
  }
  const u = new URL(location.href)
  u.searchParams.set('pose', encoded)
  return u.toString()
}

const camForward = new THREE.Vector3()
window.addEventListener('keydown', (ev) => {
  if (ev.code !== 'KeyP' || ev.metaKey || ev.ctrlKey || ev.altKey) return
  camForward.set(0, 0, -1).applyQuaternion(hostCamera.quaternion)
  const pose: EncodedCameraPose = {
    position: [hostCamera.position.x, hostCamera.position.y, hostCamera.position.z],
    forward: [camForward.x, camForward.y, camForward.z]
  }
  const encoded = encodeCameraPose(pose)
  // URL bar always tracks local page (so refresh works); clipboard gets
  // the share URL when SHARE_BASE is configured.
  const localUrl = new URL(location.href)
  localUrl.searchParams.set('pose', encoded)
  history.replaceState(null, '', localUrl.toString())
  const shareUrl = buildShareUrl(encoded)
  navigator.clipboard?.writeText(shareUrl).catch(() => {})
  updateSocialPreview(pose)
  console.log('[host] permalink:', shareUrl)
})

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

// Track host position frame-to-frame so we can detect crossings of the host
// portal plane within the door extent. Set after the first frame.
const prevHostWorldPos = new THREE.Vector3()
let prevHostInitialized = false
let handedOff = false

const sendTraverse = (mirroredPose: PortalPose): void => {
  if (!iframe.contentWindow) return
  const msg: PortalTraverseMessage = {
    type: 'portal:traverse',
    pose: mirroredPose,
    // Snapshot the keys the user is currently holding so the iframe's
    // controls can pre-populate its keys-set after the focus shift —
    // otherwise a held W (etc.) at crossing would stop motion until the
    // OS auto-repeat eventually re-delivers the keydown.
    pressedKeys: controls.getKeys(),
    // Tell the iframe what size it WILL be once the host applies the
    // fullscreen CSS swap. The iframe's own window.innerWidth is currently
    // 1 (it's positioned offscreen at 1×1) but its renderer needs the
    // eventual viewport dims for the synchronous pre-render — otherwise the
    // CSS swap stretches a 1-pixel backing buffer over the whole screen.
    viewport: { width: window.innerWidth, height: window.innerHeight }
  }
  iframe.contentWindow.postMessage(msg, '*')
}

// Apply the visibility swap (host hidden, iframe fullscreen). Idempotent.
let traverseAckTimer: number | null = null
let traverseAckApplied = false
const applyHandoffCss = (): void => {
  if (traverseAckApplied) return
  traverseAckApplied = true
  if (traverseAckTimer !== null) {
    window.clearTimeout(traverseAckTimer)
    traverseAckTimer = null
  }
  document.body.classList.add('handed-off')
  iframe.classList.add('fullscreen')
  iframe.contentWindow?.focus()
  controls.clearKeys()
  if (LOG) console.log('[host] traversal: applied CSS swap')
}

// Handle reverse-traversal messages (iframe → host). When the user walks
// back through the iframe portal in worldB, the iframe mirrors its pose
// into worldA coords and posts here. Restore visibility, apply the pose,
// and let the existing source-mode frame loop pick up where it left off.
const reverseLookTarget = new THREE.Vector3()
window.addEventListener('message', (ev) => {
  if (ev.source !== iframe.contentWindow) return
  const data = ev.data
  if (!data || typeof data !== 'object') return
  if (data.type === 'portal:traverse-ack') {
    applyHandoffCss()
    return
  }
  if (data.type !== 'portal:traverse') return
  const pose = data.pose as PortalPose
  hostCamera.position.set(pose.position[0], pose.position[1], pose.position[2])
  if (pose.up) hostCamera.up.set(pose.up[0], pose.up[1], pose.up[2])
  if (pose.forward) {
    reverseLookTarget.set(
      pose.position[0] + pose.forward[0],
      pose.position[1] + pose.forward[1],
      pose.position[2] + pose.forward[2]
    )
    hostCamera.lookAt(reverseLookTarget)
  }
  // Sync the controls' yaw/pitch with the new orientation so the next mouse
  // drag doesn't snap the view back.
  if (pose.forward) {
    const f = new THREE.Vector3(pose.forward[0], pose.forward[1], pose.forward[2])
    controls.setOrientationFromForward?.(f)
  }
  // Render a full host frame (worldA + iframe-portal composite) synchronously
  // BEFORE unhiding the host canvas, so the user sees a complete view on the
  // first post-reverse frame instead of:
  //   - one frame of host's stale (pre-traversal) content, or
  //   - one frame of worldA WITHOUT the iframe portal, until RAF resumes.
  // The iframe composite uses iframeEndpoint's most recently uploaded frame
  // (stale by the duration of the iframe-source session) — visibly imperfect
  // for one frame, but much smoother than the door pops-in alternative.
  hostCamera.updateMatrixWorld(true)
  renderer.setRenderTarget(null)
  renderer.clear(true, true, true)
  hostEndpoint.renderAsSource(renderer, hostCamera)
  if (iframeEndpoint.isReady() && iframeEndpoint.hasFrame()) {
    const tbg = iframeEndpoint.getBackground()
    stencilBg.setRGB(tbg.r, tbg.g, tbg.b)
    stencilMask.update(hostAnchor, hostCamera, stencilBg)
    renderer.render(stencilMask.scene, stencilMask.camera)
    renderer.clearDepth()
    iframeEndpoint.renderAsDestination(renderer)
  }

  document.body.classList.remove('handed-off')
  iframe.classList.remove('fullscreen')
  // Pull focus back to the host window so keyboard goes to host controls.
  window.focus()
  // Drop stale keys tracked while host was inactive (we never got the keyup
  // events because focus was on the iframe), then adopt the keys the iframe
  // was holding at the moment of reverse-crossing so motion is continuous.
  controls.clearKeys()
  if (Array.isArray(data.pressedKeys)) controls.setKeys(data.pressedKeys)
  // Reset traversal state so the user can step through the host portal again.
  handedOff = false
  prevHostInitialized = false
  traverseAckApplied = false
  if (LOG) console.log('[host] reverse traversal: resumed source role at', pose)
})

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

  // --- traversal detection: if the host stepped through the door rectangle
  // since last frame, hand off to the iframe and stop driving the host scene.
  if (!handedOff && iframeEndpoint.isReady()) {
    if (!prevHostInitialized) {
      prevHostWorldPos.copy(hostCamera.position)
      prevHostInitialized = true
    } else {
      const targetAnchor = iframeEndpoint.getAnchor()
      const sourceAnchor = hostEndpoint.getAnchor()
      const crossing = detectPortalCrossing(
        prevHostWorldPos,
        hostCamera.position,
        hostAnchor
      )
      if (crossing.crossed) {
        // Mirror the current host pose across the portal pair into iframe
        // coords and ship it as the iframe's starting camera state.
        hostCamera.getWorldPosition(camPos)
        camFwd.set(0, 0, -1).applyQuaternion(hostCamera.quaternion)
        camUp.set(0, 1, 0).applyQuaternion(hostCamera.quaternion)
        const mirrored = couplePoseAcrossPortal(
          {
            position: [camPos.x, camPos.y, camPos.z],
            forward: [camFwd.x, camFwd.y, camFwd.z],
            up: [camUp.x, camUp.y, camUp.z]
          },
          { source: sourceAnchor, target: targetAnchor }
        )
        sendTraverse(mirrored)
        // Stop driving the iframe (no more setPose) but DON'T apply visibility
        // CSS yet — wait for portal:traverse-ack so the iframe can render its
        // first source frame before we swap. Otherwise we expose an empty
        // iframe canvas for a frame, visible as a dark flash. Fallback timer
        // forces the swap if ack never arrives (slow iframe, etc.).
        handedOff = true
        if (LOG) console.log('[host] traversal: awaiting iframe ack', mirrored)
        if (traverseAckTimer !== null) window.clearTimeout(traverseAckTimer)
        traverseAckTimer = window.setTimeout(applyHandoffCss, 250)
      }
    }
    prevHostWorldPos.copy(hostCamera.position)
  }

  if (handedOff) {
    requestAnimationFrame(frame)
    return
  }

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
