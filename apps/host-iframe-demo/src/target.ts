import * as THREE from 'three'
import {
  makeIframeEndpoint,
  makeIframeTarget,
  type CompositorDebugMode
} from '@portal/portal-iframe'
import {
  makePortalPlane,
  makePortalStencilMask
} from '@portal/portal-three'
import {
  couplePoseAcrossPortal,
  intersectSegmentWithDoor,
  type Mat4,
  type PortalAnchor,
  type PortalMessage,
  type PortalTraverseAckMessage,
  type PortalTraverseMessage
} from '@portal/portal-core'
import { attachBasicFlyControls } from './controls'

const params = new URLSearchParams(location.search)
const LOG = params.get('log') === '1'
const SCENE = params.get('scene') ?? 'swarm'
// Same debug flag as the host, applied to the iframe's portal-back compositor
// (worldA-through-the-iframe-portal view). Lets us diagnose the B-to-A side
// the same way ?debug=clip works for A-to-B on the host.
const DEBUG_MODE = (params.get('debug') ?? 'off') as CompositorDebugMode

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

type SceneBundle = {
  scene: THREE.Scene
  tick?: (t: number) => void
}

// "World B"-style red room with floating spheres. The destination portal sits
// at the origin facing -z (so the host's portal anchor mirrors into it).
const buildSwarm = (): SceneBundle => {
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
    color: '#ff89ad', metalness: 0.2, roughness: 0.25
  })
  const swarm: THREE.Mesh[] = []
  for (let i = 0; i < 24; i += 1) {
    const m = new THREE.Mesh(sphereGeo, sphereMat)
    m.position.set(Math.cos(i * 0.35) * 2.6, 0.8 + (i % 4) * 0.4, Math.sin(i * 0.35) * 2.6)
    scene.add(m)
    swarm.push(m)
  }

  // Diagnostic markers (kept commented for re-enable during portal alignment
  // debugging — see git log for the iframe Y-flip / oblique-clip work). Cyan
  // sits at iframe-portal center; magenta 1m left/right. From the host the
  // cyan cube should always appear at door center regardless of viewing angle.
  // const markerMat = (hex: number) => new THREE.MeshBasicMaterial({ color: hex })
  // const cyanMarker = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.05), markerMat(0x00ffff))
  // cyanMarker.position.set(0, 1.6, -0.05)
  // scene.add(cyanMarker)
  // const magLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.05), markerMat(0xff00ff))
  // magLeft.position.set(-1, 1.6, -0.05)
  // scene.add(magLeft)
  // const magRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.05), markerMat(0xff00ff))
  // magRight.position.set(1, 1.6, -0.05)
  // scene.add(magRight)
  const tick = (t: number) => {
    swarm.forEach((m, idx) => {
      m.position.y = 1.1 + Math.sin(t * 1.2 + idx * 0.3) * 0.5
      m.rotation.y = t * 0.6 + idx * 0.2
    })
  }
  return { scene, tick }
}

// Static reference grid: a unit-cube lattice at integer positions on the
// far side of the portal. Each axis gets a distinctly colored marker cube at
// distance 1 from the origin (red=+x, green=+y, blue=-z), so we can read
// orientation/position alignment at a glance. With this scene loaded, any
// parallax error is immediately visually obvious — the cube grid aligns to a
// known coordinate frame instead of an animated swarm.
const buildGrid = (): SceneBundle => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#0a0a14')
  scene.add(new THREE.AmbientLight(0xffffff, 0.6))
  const key = new THREE.DirectionalLight(0xffffff, 0.8)
  key.position.set(2, 4, 2)
  scene.add(key)

  // White floor grid for spatial reference.
  const grid = new THREE.GridHelper(20, 20, 0x888888, 0x444444)
  grid.position.y = 0
  scene.add(grid)

  // Lattice of small white cubes in a 5×5×3 grid on the far side of the portal
  // (z in [-1, -3]) so they're never on the camera-side and never depth-clipped.
  const cubeGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4)
  const cubeMat = new THREE.MeshStandardMaterial({ color: '#dddde6', roughness: 0.6 })
  for (let x = -2; x <= 2; x += 1) {
    for (let y = 0; y <= 2; y += 1) {
      for (let z = -3; z <= -1; z += 1) {
        const m = new THREE.Mesh(cubeGeo, cubeMat)
        m.position.set(x, 0.5 + y, z)
        scene.add(m)
      }
    }
  }

  // Axis markers (1 unit out from origin, colored): red=+x, green=+y, blue=-z.
  // Note we use -z (not +z) since the iframe portal faces -z and viewers look
  // INTO the iframe world from the +z side.
  const mark = (color: number, pos: THREE.Vector3): void => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.25, 0.25),
      new THREE.MeshBasicMaterial({ color })
    )
    m.position.copy(pos)
    scene.add(m)
  }
  mark(0xff3333, new THREE.Vector3(1, 1.6, 0))
  mark(0x33ff33, new THREE.Vector3(0, 2.6, 0))
  mark(0x3366ff, new THREE.Vector3(0, 1.6, -1))

  return { scene }
}

const bundle = SCENE === 'grid' ? buildGrid() : buildSwarm()
if (LOG) console.log('[iframe] scene:', SCENE)

// Track the host's clock so source mode can continue from it instead of
// restarting at zero (which would jump the animation phase every traversal).
// Each destination-mode setPose updates the base; source-mode reads it and
// extrapolates with performance.now().
let hostTimeBase = 0
let perfBaseAtSync = performance.now() / 1000
const updateHostTimeSync = (hostTime: number): void => {
  hostTimeBase = hostTime
  perfBaseAtSync = performance.now() / 1000
}
const syncedTime = (): number =>
  hostTimeBase + (performance.now() / 1000 - perfBaseAtSync)

const destinationTarget = makeIframeTarget({
  scene: bundle.scene,
  anchor,
  log: LOG,
  tick: bundle.tick,
  onTime: updateHostTimeSync
})
destinationTarget.start()

// Eagerly create the peer endpoint to the parent (host). Built at module init
// — even in destination mode it's just listening — so we don't miss the host's
// portal:ready announcement that arrives once the host destination service
// starts up after our document loads.
const hostPeerEndpoint = makeIframeEndpoint({
  peerWindow: parent,
  peerSource: parent,
  iframeOrigin: '*',
  debugMode: DEBUG_MODE
})

// Invisible portal mesh placed at the iframe portal anchor's pose. Used by
// the stencil mask machinery (which expects an Object3D so it can read world-
// space pose). The mesh's rotation accounts for anchor.normal = (0, 0, -1).
const PORTAL_HALF_SIZE = new THREE.Vector2(2.6, 3.2)
const iframePortalMesh = makePortalPlane(PORTAL_HALF_SIZE)
iframePortalMesh.position.set(anchor.position[0], anchor.position[1], anchor.position[2])
iframePortalMesh.rotation.y = Math.PI
bundle.scene.add(iframePortalMesh)

// ---------------------------------------------------------------------------
// Source-mode rendering (activated on portal:traverse). Builds a visible
// canvas + controls + frame loop in the iframe document so the user can drive
// a camera in worldB after stepping through the host's portal. No portal back
// to worldA yet — that's the next iteration. Refresh to reset.
// ---------------------------------------------------------------------------

const displayCanvas = document.querySelector<HTMLCanvasElement>('#display')
if (!displayCanvas) throw new Error('Missing #display canvas in target.html')

let sourceMode = false
let sourceRaf = 0
const sourceCamera = new THREE.PerspectiveCamera(70, 1, 0.02, 200)
const sourceClock = new THREE.Clock()
const sourceLookTarget = new THREE.Vector3()
const sourceCamPos = new THREE.Vector3()
const sourceCamFwd = new THREE.Vector3()
const sourceCamUp = new THREE.Vector3()
const sourceStencilBg = new THREE.Color()

// Build source-mode renderer + stencil mask EAGERLY at module load, not lazily
// in activateSourceMode. The lazy version cost a GL context creation + first-
// render shader compilation on the very first traversal, which appeared as a
// one-frame stutter ("frame flicker"). Pre-building here means the first
// traversal hits warm shaders and a ready GL context.
const sourceRenderer = new THREE.WebGLRenderer({
  canvas: displayCanvas,
  antialias: true,
  stencil: true
})
sourceRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
sourceRenderer.autoClear = false
const sourceStencilMask = makePortalStencilMask()

// Warm up the GL programs so the first traversal doesn't pay shader-link
// cost mid-flight. compile() walks the scene graph and triggers program
// creation for each material+geometry combo without actually drawing.
const warmCanvasSize = (): void => {
  const w = window.innerWidth || 1
  const h = window.innerHeight || 1
  sourceRenderer.setSize(w, h)
}
warmCanvasSize()
sourceRenderer.compile(bundle.scene, sourceCamera)
sourceRenderer.compile(sourceStencilMask.scene, sourceStencilMask.camera)
// Compile the portal-back compositor too. Without this, the first frame
// after activateSourceMode that has a host-frame available pays the
// compositor's program-link cost — appears as a one-frame stutter on the
// first reverse composite, layered on top of the traversal handoff.
hostPeerEndpoint.prewarm(sourceRenderer)

// Build controls eagerly too, alongside the renderer/stencil. This avoids:
//  - re-attaching event listeners on every forward traversal (would leak)
//  - the "snap to head-on" bug where the controls' default yaw=0/pitch=0
//    overwrote sourceCamera.quaternion (which had been set from the oblique
//    initialPose) on the first controls.update(). Symptom: user crossed at
//    an oblique angle, played in worldB at that angle... but the next
//    controls.update silently rotated them to head-on, so when they crossed
//    back, the host saw a head-on forward and the user perceived a sudden
//    "90 degree" redirect with no input change.
const sourceControls = attachBasicFlyControls(sourceCamera, displayCanvas)

const onSourceResize = (): void => {
  const w = window.innerWidth
  const h = window.innerHeight
  sourceRenderer.setSize(w, h)
  sourceCamera.aspect = w / h
  sourceCamera.updateProjectionMatrix()
}

const prevSourceWorldPos = new THREE.Vector3()
let prevSourceInitialized = false
let reverseTraversed = false

// Inferred host anchor in worldA coords. We only know our own anchor here;
// the host anchor is encoded by the portal pair convention (face-to-face,
// host portal at -3.5z in worldA, normal +z). This matches the local demo
// setup. If the protocol later carries the source anchor explicitly we can
// drop this hardcode.
const inferredHostAnchor: PortalAnchor = {
  position: [0, 1.6, -3.5],
  normal: [0, 0, 1],
  up: [0, 1, 0],
  halfWidth: 1.3,
  halfHeight: 1.6
}

const sourceFrame = (): void => {
  if (!sourceMode) return
  // Tick + setPose use the host-synced time (continuing from where the host's
  // clock was at the last sync) so the swarm animation phase is continuous
  // across forward/reverse traversals. sourceClock.getDelta() still drives
  // controls (it only cares about per-frame deltas, not absolute time).
  const time = syncedTime()
  bundle.tick?.(time)
  sourceControls.update(sourceClock.getDelta())

  // Pull anchor from peer if we have it (host announced via portal:ready),
  // else fall back to our hardcoded inference. Used both for reverse-traversal
  // mirroring and for the forward setPose ask.
  const hostAnchorData = hostPeerEndpoint.isReady()
    ? hostPeerEndpoint.getAnchor()
    : inferredHostAnchor

  // Reverse traversal: if the user walks back through the iframe portal door
  // (in worldB coords), mirror the pose back into worldA and tell the host to
  // resume as the active page.
  if (!reverseTraversed && prevSourceInitialized) {
    const halfW = anchor.halfWidth ?? 1
    const halfH = anchor.halfHeight ?? 1.5
    const crossing = intersectSegmentWithDoor(
      [prevSourceWorldPos.x, prevSourceWorldPos.y, prevSourceWorldPos.z],
      [sourceCamera.position.x, sourceCamera.position.y, sourceCamera.position.z],
      anchor,
      halfW,
      halfH
    )
    if (crossing.crossed) {
      const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(sourceCamera.quaternion)
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(sourceCamera.quaternion)
      const mirrored = couplePoseAcrossPortal(
        {
          position: [sourceCamera.position.x, sourceCamera.position.y, sourceCamera.position.z],
          forward: [fwd.x, fwd.y, fwd.z],
          up: [up.x, up.y, up.z]
        },
        { source: anchor, target: hostAnchorData }
      )
      const msg: PortalTraverseMessage = {
        type: 'portal:traverse',
        pose: mirrored,
        // Snapshot held keys so the host's controls can pick up uninterrupted
        // motion after the focus shift back.
        pressedKeys: sourceControls.getKeys()
      }
      parent.postMessage(msg, '*')
      sourceMode = false
      cancelAnimationFrame(sourceRaf)
      // Drop any pressed-key state — keyup will fire on the host (which has
      // focus now), so iframe never sees it and would otherwise come back
      // from a future forward traversal with stale movement.
      sourceControls?.clearKeys()
      // Deliberately DO NOT remove the .source-mode class here. If we do,
      // #display flips to display:none and the iframe's .info welcome text
      // pops in for the brief gap between this handler and the host's CSS
      // swap (handed-off + fullscreen removal) — visible as a jarring
      // "info-page flash" mid-traversal. Leaving #display visible means
      // the user sees the iframe's last rendered frame (worldB + portal-
      // back) until the host's CSS swap sends the iframe back offscreen,
      // which is much smoother. activateSourceMode's classList.add is
      // idempotent so the next forward traversal is fine.
      // Restart destination service so the host (now active again) can ask
      // for portal-content frames.
      destinationTarget.start()
      // Allow another forward traversal later (host may re-enter the iframe).
      reverseTraversed = false
      prevSourceInitialized = false
      if (LOG) console.log('[iframe] reverse traversal: handed back to host at', mirrored)
      return
    }
  }
  prevSourceWorldPos.copy(sourceCamera.position)
  prevSourceInitialized = true

  // --- Portal-back: ask host for worldA frames so we can composite them
  // through our stencil mask at the iframe portal door.
  if (hostPeerEndpoint.isReady()) {
    sourceCamera.getWorldPosition(sourceCamPos)
    sourceCamFwd.set(0, 0, -1).applyQuaternion(sourceCamera.quaternion)
    sourceCamUp.set(0, 1, 0).applyQuaternion(sourceCamera.quaternion)
    const coupled = couplePoseAcrossPortal(
      {
        position: [sourceCamPos.x, sourceCamPos.y, sourceCamPos.z],
        forward: [sourceCamFwd.x, sourceCamFwd.y, sourceCamFwd.z],
        up: [sourceCamUp.x, sourceCamUp.y, sourceCamUp.z]
      },
      { source: anchor, target: hostAnchorData }
    )
    const projection: Mat4 = Array.from(sourceCamera.projectionMatrix.elements)
    // Drive the request-viewport from the renderer's actual backing buffer,
    // not window.innerWidth/innerHeight. Right after activateSourceMode the
    // iframe's window may still report its pre-swap (1×1) dimensions until
    // the layout-driven 'resize' event fires; the renderer was already sized
    // to the host-supplied viewport, so its canvas attributes are the source
    // of truth.
    const w = Math.max(1, sourceRenderer.domElement.width)
    const h = Math.max(1, sourceRenderer.domElement.height)
    hostPeerEndpoint.requestFrame({
      pose: coupled,
      projection,
      viewport: { width: w, height: h },
      time
    })
  }

  // --- Render: source scene (worldB) → stencil mask at iframe portal →
  // composite host frames (worldA) through stencil.
  sourceRenderer.setRenderTarget(null)
  sourceRenderer.clear(true, true, true)
  sourceRenderer.render(bundle.scene, sourceCamera)

  // Gate the stencil mask on hasFrame() so the door doesn't appear as a flat
  // bg-color rectangle for the first 1–2 frames before the first portal:frame
  // arrives from the host. Until then, worldB content shows where the door
  // will eventually be — perceived as the door "opening" once content is
  // available, vs. a flat-color flash that pops to real content.
  if (hostPeerEndpoint.isReady() && hostPeerEndpoint.hasFrame()) {
    const tbg = hostPeerEndpoint.getBackground()
    sourceStencilBg.setRGB(tbg.r, tbg.g, tbg.b)
    sourceStencilMask.update(iframePortalMesh, sourceCamera, sourceStencilBg)
    sourceRenderer.render(sourceStencilMask.scene, sourceStencilMask.camera)
    sourceRenderer.clearDepth()
    hostPeerEndpoint.renderAsDestination(sourceRenderer)
  }

  sourceRaf = requestAnimationFrame(sourceFrame)
}

const activateSourceMode = (initialPose: {
  position: [number, number, number]
  forward?: [number, number, number]
  up?: [number, number, number]
  pressedKeys?: string[]
  viewport?: { width: number; height: number }
}): void => {
  if (sourceMode) return
  // Tear down destination mode — no more bitmap sends.
  destinationTarget.stop()

  // sourceRenderer + sourceStencilMask + sourceControls are pre-built at
  // module load. Just configure pose, sync the controls' euler state, clear
  // any stale keys, and update CSS here.

  // Apply initial camera pose (already in iframe-world coords — host mirrored
  // it across the portal pair before posting).
  sourceCamera.position.set(initialPose.position[0], initialPose.position[1], initialPose.position[2])
  if (initialPose.up) sourceCamera.up.set(initialPose.up[0], initialPose.up[1], initialPose.up[2])
  if (initialPose.forward) {
    sourceLookTarget.set(
      initialPose.position[0] + initialPose.forward[0],
      initialPose.position[1] + initialPose.forward[1],
      initialPose.position[2] + initialPose.forward[2]
    )
    sourceCamera.lookAt(sourceLookTarget)
    // Critical: sync controls.pitch/yaw to the initial forward so the next
    // controls.update() doesn't overwrite the just-set quaternion with the
    // controls' default-zero euler angles (which would snap the view to
    // head-on, masquerading as a "90 degree redirect" later).
    sourceControls.setOrientationFromForward?.(
      new THREE.Vector3(initialPose.forward[0], initialPose.forward[1], initialPose.forward[2])
    )
  }
  // Drop any keys that might be lingering from a previous source-mode session
  // (or from the destination-mode period if any sneaky keydown leaked through),
  // then adopt the keys the host was holding at the moment of crossing so the
  // user's WASD motion continues uninterrupted across the focus shift.
  sourceControls.clearKeys()
  if (Array.isArray(initialPose.pressedKeys)) {
    sourceControls.setKeys(initialPose.pressedKeys)
  }
  // Size the renderer to the host-supplied viewport, NOT window.innerWidth.
  // While we're still an offscreen 1×1 iframe, window.innerWidth = 1, so
  // calling onSourceResize() here would set the renderer to 1×1; the CSS
  // swap then stretches a one-pixel backing buffer over the entire screen
  // for the brief window before the iframe's own resize event fires.
  // initialPose.viewport carries the host's window dimensions so the
  // pre-render below renders at the eventual fullscreen size.
  const initW = initialPose.viewport?.width ?? window.innerWidth
  const initH = initialPose.viewport?.height ?? window.innerHeight
  sourceRenderer.setSize(initW, initH)
  sourceCamera.aspect = initW / initH
  sourceCamera.updateProjectionMatrix()

  // Render the first source-mode frame SYNCHRONOUSLY before showing #display.
  // Without this, body.source-mode reveals an empty canvas (dark page bg
  // visible through it) for ~1 frame until the first sourceFrame RAF fires —
  // that's the "dark flash" at the moment of crossing.
  // Portal-back compositing is skipped here because hostPeerEndpoint usually
  // hasn't received its first frame yet from the host destination service;
  // the next RAF picks that up. So this initial render is just worldB
  // without the door-back hole, which is fine for one frame.
  bundle.tick?.(syncedTime())
  sourceCamera.updateMatrixWorld(true)
  sourceRenderer.setRenderTarget(null)
  sourceRenderer.clear(true, true, true)
  sourceRenderer.render(bundle.scene, sourceCamera)

  // NOW show #display — it has content, no flash.
  document.body.classList.add('source-mode')
  window.addEventListener('resize', onSourceResize)

  sourceMode = true
  sourceClock.start()
  sourceRaf = requestAnimationFrame(sourceFrame)

  // Tell the host we're ready: it's been holding off on its CSS swap (host
  // hidden / iframe fullscreen) until we have content to show. This handshake
  // is what eliminates the dark flash at the moment of crossing.
  const ack: PortalTraverseAckMessage = { type: 'portal:traverse-ack' }
  parent.postMessage(ack, '*')
  if (LOG) console.log('[iframe] activated source mode at pose', initialPose)
}

window.addEventListener('message', (ev) => {
  const msg = ev.data as PortalMessage
  if (!msg || typeof msg !== 'object') return
  if (msg.type === 'portal:traverse') {
    activateSourceMode({
      ...(msg.pose as Parameters<typeof activateSourceMode>[0]),
      pressedKeys: msg.pressedKeys,
      viewport: msg.viewport
    })
  }
})
