// Host page for the NetGL portal demo.
//
// Same worldA scene + portal door + stencil-mask machinery as
// apps/host-iframe-demo, so the two demos are visually equivalent. The
// difference is what happens between the stencil-mask render and the user
// seeing pixels behind the door:
//
//   - host-iframe-demo: host posts setPose, iframe renders worldB into an
//     OffscreenCanvas, ships ImageBitmap (color) + ImageBitmap (packed-RGBA
//     depth) back, host composites via a fullscreen-quad shader with stencil
//     + per-pixel depth-clip. The depth round-trip is the precision-limited
//     step.
//
//   - host-netgl-demo (this file): host posts setPose, iframe's
//     NetGLRenderer ships its draw calls themselves back over the wire, host
//     replays them against the canvas's own WebGL2 context. worldB's
//     geometry depth-tests against worldA's depth buffer natively. No
//     compositor shader, no depth pack, no precision loss.
//
// Scope cut from host-iframe-demo for v0: no traversal (forward or
// reverse), no permalinks/OG, no debug toggles. Add them back once the
// transport-side composition is proven in the browser.

import * as THREE from 'three'
import {
  couplePoseAcrossPortal,
  type Mat4,
  type PortalAnchor,
  type PortalPose
} from '@portal/portal-core'
import { windowTransport } from '@portal/portal-iframe'
import {
  makeLocalEndpoint,
  makePortalPlane,
  makePortalStencilMask
} from '@portal/portal-three'
import { attachBasicFlyControls } from '@portal/portal-controls'
import { makeNetGLReplay, type NetGLCall } from '@portal/portal-netgl'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')
const iframe = document.querySelector<HTMLIFrameElement>('#target-iframe')
if (!iframe) throw new Error('Missing #target-iframe')

// Forward host's URL params to the iframe so flags like ?log=1 reach
// target.ts at module-load. Mirrors the host-iframe-demo's pattern.
const params = new URLSearchParams(location.search)
const LOG = params.get('log') === '1'
if (location.search) iframe.src = `target.html${location.search}`

const renderer = new THREE.WebGLRenderer({
  antialias: false,
  stencil: true,
  depth: true,
  preserveDrawingBuffer: false
})
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.NoToneMapping
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.autoClear = false
app.appendChild(renderer.domElement)

const hostCamera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.02,
  200
)
hostCamera.position.set(0, 1.6, 5.5)

// ---------------------------------------------------------------------------
// worldA — same room + blue-cube cluster as host-iframe-demo so the two
// demos are visually side-by-side comparable.
// ---------------------------------------------------------------------------

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

const portalSize = new THREE.Vector2(2.6, 3.2)
const hostAnchorMesh = makePortalPlane(portalSize)
hostAnchorMesh.position.set(0, 1.6, -3.5)
hostScene.add(hostAnchorMesh)
const hostLocalEndpoint = makeLocalEndpoint({ scene: hostScene, anchor: hostAnchorMesh })

const stencilMask = makePortalStencilMask()

// ---------------------------------------------------------------------------
// NetGL receiver: every NetGLCall the iframe posts gets replayed against
// the host canvas's WebGL2 context. The iframe never touches the canvas
// itself — it writes pixels into it through the wire.
// ---------------------------------------------------------------------------

const gl = renderer.getContext()
const netglReplay = makeNetGLReplay(gl as WebGL2RenderingContext)

// Iframe's anchor + background arrive on a netgl:ready handshake; until
// then we don't post setPose (otherwise the iframe receives requests
// before its scene is built).
let iframeReady = false
let iframeAnchor: PortalAnchor | null = null
const iframeBg = new THREE.Color('#220d17')

const transport = windowTransport({
  output: iframe.contentWindow!,
  inputFilter: iframe.contentWindow
})

// Buffer incoming NetGLCalls instead of replaying them immediately. The
// host's own renderer (worldA + stencil mask) mutates the shared GL context
// between message-event tasks; if we let the iframe's calls land mid-host-
// frame, the iframe's useProgram/uniform/draw triple can be split by a host
// `useProgram`, causing "uniform3f: location is not from the associated
// program". Instead, accumulate the iframe's calls until it sends
// `netgl:frame-end`, then atomically drain the latest complete frame at one
// fixed point in the host's render loop (after stencil mask + clearDepth).
let inFlightFrame: NetGLCall[] = []
let pendingFrame: NetGLCall[] | null = null

transport.onMessage((msg) => {
  if (!msg || typeof msg !== 'object') return
  const data = msg as unknown as
    | { type: 'netgl:ready'; anchor: PortalAnchor; background: { r: number; g: number; b: number } }
    | { type: 'netgl:frame-end' }
    | NetGLCall
  if ('type' in data) {
    if (data.type === 'netgl:ready') {
      const ready = data as { type: 'netgl:ready'; anchor: PortalAnchor; background: { r: number; g: number; b: number } }
      iframeAnchor = ready.anchor
      iframeBg.setRGB(ready.background.r, ready.background.g, ready.background.b)
      iframeReady = true
      return
    }
    if (data.type === 'netgl:frame-end') {
      pendingFrame = inFlightFrame
      inFlightFrame = []
      return
    }
  }
  if ('name' in data && typeof data.name === 'string') {
    inFlightFrame.push(data)
  }
})

// ---------------------------------------------------------------------------
// Controls + resize.
// ---------------------------------------------------------------------------

const controls = attachBasicFlyControls(hostCamera, renderer.domElement)

const onResize = (): void => {
  const w = window.innerWidth
  const h = window.innerHeight
  renderer.setSize(w, h)
  hostCamera.aspect = w / h
  hostCamera.updateProjectionMatrix()
}
window.addEventListener('resize', onResize)

// ---------------------------------------------------------------------------
// Frame loop. Pipelined: each frame the host renders worldA + stencil mask
// + clearDepth, then posts setPose. The iframe's reply (a flurry of
// NetGLCalls then nothing for the frame) lands as messages arrive — they
// replay into the canvas asynchronously. The browser presents on vsync.
// This is the same pipelining the iframe demo uses; one frame of iframe
// lag is the trade we accept for not blocking on the round-trip.
// ---------------------------------------------------------------------------

const clock = new THREE.Clock()
const stencilBg = new THREE.Color()
const camPos = new THREE.Vector3()
const camFwd = new THREE.Vector3()
const camUp = new THREE.Vector3()
let lastLogTime = 0
let setPosesSent = 0
let lastDrainSize = 0

const frame = (): void => {
  const dt = clock.getDelta()
  const time = clock.elapsedTime

  controls.update(dt)

  // Three's WebGLState caches GL state to avoid redundant set calls. The
  // iframe's NetGLCalls between frames have written to the shared GL
  // context behind three's back, so the cache is stale. Reset it so the
  // host's render re-issues all the state it needs.
  renderer.resetState()

  renderer.setRenderTarget(null)
  renderer.clear(true, true, true)
  hostLocalEndpoint.renderAsSource(renderer, hostCamera)

  // Paint the stencil mask: writes stencil=1 inside the portal door's
  // screen-space halfspace, fills with the iframe's background colour so
  // pixels before the first iframe frame don't show worldA bleeding
  // through. Resets depth in the door region so the iframe's draws can
  // populate fresh depth.
  if (iframeReady && iframeAnchor) {
    stencilBg.copy(iframeBg)
    stencilMask.update(hostAnchorMesh, hostCamera, stencilBg)
    renderer.render(stencilMask.scene, stencilMask.camera)
    renderer.clearDepth()

    // Drain the latest complete iframe frame as an atomic block. We're now
    // past worldA + stencil + clearDepth and before posting the next setPose;
    // nothing else mutates the GL context here, so the iframe's useProgram /
    // uniform / draw sequences land in order against the program they were
    // recorded for. Stale partial frames are dropped — only the most recent
    // frame-end'd batch composites.
    if (pendingFrame) {
      const batch = pendingFrame
      pendingFrame = null
      lastDrainSize = batch.length
      if (LOG) {
        // Diagnostic: check GL error after every replay call. Identifies
        // the first call that pushes the context into an error state
        // (silent failures like INVALID_ENUM on a missing extension,
        // INVALID_VALUE on a bad buffer ref, etc. would otherwise just
        // discard draws without writing pixels). Cheap on a few frames,
        // skip outside ?log=1 because gl.getError() forces a sync barrier.
        const errStr = (code: number): string => {
          if (code === gl.NO_ERROR) return 'NO_ERROR'
          if (code === gl.INVALID_ENUM) return 'INVALID_ENUM'
          if (code === gl.INVALID_VALUE) return 'INVALID_VALUE'
          if (code === gl.INVALID_OPERATION) return 'INVALID_OPERATION'
          if (code === gl.INVALID_FRAMEBUFFER_OPERATION) return 'INVALID_FRAMEBUFFER_OPERATION'
          if (code === gl.OUT_OF_MEMORY) return 'OUT_OF_MEMORY'
          if (code === gl.CONTEXT_LOST_WEBGL) return 'CONTEXT_LOST_WEBGL'
          return 'UNKNOWN(' + code + ')'
        }
        let firstErr: { call: NetGLCall; code: number } | null = null
        const counts: Record<string, number> = {}
        for (let i = 0; i < batch.length; i += 1) {
          const call = batch[i]
          counts[call.name] = (counts[call.name] ?? 0) + 1
          netglReplay(call)
          if (!firstErr) {
            const code = gl.getError()
            if (code !== gl.NO_ERROR) firstErr = { call, code }
          }
        }
        if (firstErr) {
          console.warn(
            '[host] replay GL error:', errStr(firstErr.code),
            'on call:', firstErr.call.name,
            'args:', firstErr.call.args
          )
        }
        if (time - lastLogTime > 0.99) {
          // Histogram-style summary so we can see whether drawElements is
          // actually in the stream and how often each setup call runs.
          // Throttled to 1Hz so it doesn't drown out other logs.
          console.log('[host] drain calls:', counts)
        }
      } else {
        for (let i = 0; i < batch.length; i += 1) netglReplay(batch[i])
      }
      // Sync three's view of GL state — the iframe just clobbered it.
      renderer.resetState()
    }

    // --- iframe pose handoff over NetGL ---
    hostCamera.getWorldPosition(camPos)
    camFwd.set(0, 0, -1).applyQuaternion(hostCamera.quaternion)
    camUp.set(0, 1, 0).applyQuaternion(hostCamera.quaternion)
    const coupled = couplePoseAcrossPortal(
      {
        position: [camPos.x, camPos.y, camPos.z],
        forward: [camFwd.x, camFwd.y, camFwd.z],
        up: [camUp.x, camUp.y, camUp.z]
      },
      { source: hostLocalEndpoint.getAnchor(), target: iframeAnchor }
    )

    const projection: Mat4 = Array.from(hostCamera.projectionMatrix.elements)
    const pixelRatio = renderer.getPixelRatio()
    const width = Math.max(1, Math.floor(window.innerWidth * pixelRatio))
    const height = Math.max(1, Math.floor(window.innerHeight * pixelRatio))

    transport.post({
      type: 'netgl:setPose',
      pose: coupled as PortalPose,
      projection,
      viewport: { width, height },
      time
    } as unknown as Parameters<typeof transport.post>[0])
    setPosesSent += 1

    if (LOG && time - lastLogTime > 1) {
      lastLogTime = time
      const fmt = (a: number[]): string => `[${a.map((n) => n.toFixed(2)).join(', ')}]`
      console.log(
        '[host] setPose#' + setPosesSent,
        'host pos:', fmt([camPos.x, camPos.y, camPos.z]),
        'coupled pos:', fmt(coupled.position),
        'coupled fwd:', fmt(coupled.forward ?? [0, 0, -1]),
        'viewport:', width + 'x' + height,
        'lastDrain:', lastDrainSize + ' calls',
        'iframeAnchor:', iframeAnchor
      )
    }
  }

  requestAnimationFrame(frame)
}

frame()
