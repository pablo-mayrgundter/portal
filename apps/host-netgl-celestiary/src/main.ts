// Host page for the NetGL+celestiary portal demo.
//
// Same shape as apps/host-netgl-demo/main.ts: a worldA scene with a portal
// door, a stencil-mask machinery, and a NetGL replay receiver wired to the
// host canvas's WebGL2 context. The difference is the iframe target — it
// points at celestiary's built bundle with `?portal=1`, which triggers
// celestiary's portal-shim.js. The shim installs a `__portalCreateRenderer`
// hook that celestiary's ThreeUI.js picks up so its WebGLRenderer's GL
// calls are recorded + shipped over the wire to this page.
//
// Pose handoff is sent but coordinate spaces don't match between this
// scene's meter-scale room and celestiary's astronomy-scale (sun radius ≈
// 7e8 m) universe — the goal of v0 is GL-coverage testing (do celestiary's
// textures, shaders, RT switching, etc., all replay successfully?) rather
// than visually-coherent portal traversal.

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
import { attachBasicFlyControls, attachNavDrawer } from '@portal/portal-controls'
import {
  isNetGLCall,
  isNetGLFrameEnd,
  makeNetGLReplay,
  type NetGLCall
} from '@portal/portal-netgl'

attachNavDrawer('netgl-celestiary')

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')
const iframe = document.querySelector<HTMLIFrameElement>('#target-iframe')
if (!iframe) throw new Error('Missing #target-iframe')

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

// worldA — same room + blue-cube cluster as host-netgl-demo so the layout
// reads the same. The portal door reveals celestiary's universe.
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

// NetGL receiver: replay celestiary's GL calls against the host canvas's
// WebGL2 context.
const gl = renderer.getContext()
const netglReplay = makeNetGLReplay(gl as WebGL2RenderingContext)

let iframeReady = false
let iframeAnchor: PortalAnchor | null = null
const iframeBg = new THREE.Color('#000000')

const transport = windowTransport({
  output: iframe.contentWindow!,
  inputFilter: iframe.contentWindow
})

// Buffer GL calls per frame (same pattern as host-netgl-demo). Drain the
// latest complete batch atomically inside our render loop, after stencil
// mask + clearDepth. The lastFrame cache keeps the door from flashing on
// frames where celestiary is mid-RAF when we drain.
let inFlightFrame: NetGLCall[] = []
let pendingFrame: NetGLCall[] | null = null
let lastFrame: NetGLCall[] | null = null

type NetGLReady = {
  type: 'netgl:ready'
  anchor: PortalAnchor
  background: { r: number; g: number; b: number }
}

let firstCallLogged = false
let totalCalls = 0
let totalFrames = 0
transport.onMessage((msg) => {
  // Diagnostic relay from the iframe's shim — log to host console so the
  // user sees both sides in one place.
  const dbg = msg as { type?: string; msg?: string; extra?: unknown }
  if (dbg?.type === 'netgl:debug') {
    if (dbg.extra !== undefined) console.log(`[host←shim] ${dbg.msg}`, dbg.extra)
    else console.log(`[host←shim] ${dbg.msg}`)
    return
  }
  if (isNetGLFrameEnd(msg)) {
    totalFrames += 1
    if (totalFrames === 1) console.log(`[host] first frame-end received (${inFlightFrame.length} calls)`)
    if (totalFrames % 120 === 0) console.log(`[host] ${totalFrames} frames, ${totalCalls} calls so far`)
    pendingFrame = inFlightFrame
    inFlightFrame = []
    return
  }
  if (isNetGLCall(msg)) {
    if (!firstCallLogged) {
      firstCallLogged = true
      console.log(`[host] first NetGLCall received: ${msg.name}`)
    }
    totalCalls += 1
    inFlightFrame.push(msg)
    return
  }
  const ready = msg as unknown as NetGLReady | null
  if (ready && ready.type === 'netgl:ready') {
    console.log('[host] netgl:ready received from iframe', ready.anchor)
    iframeAnchor = ready.anchor
    iframeBg.setRGB(ready.background.r, ready.background.g, ready.background.b)
    iframeReady = true
  }
})

const controls = attachBasicFlyControls(hostCamera, renderer.domElement)

const onResize = (): void => {
  const w = window.innerWidth
  const h = window.innerHeight
  renderer.setSize(w, h)
  hostCamera.aspect = w / h
  hostCamera.updateProjectionMatrix()
}
window.addEventListener('resize', onResize)

const clock = new THREE.Clock()
const stencilBg = new THREE.Color()
const camPos = new THREE.Vector3()
const camFwd = new THREE.Vector3()
const camUp = new THREE.Vector3()
const frame = (): void => {
  const dt = clock.getDelta()
  const time = clock.elapsedTime

  controls.update(dt)

  // The iframe's NetGLCalls between frames have written to the shared GL
  // context behind three's back, so three's cached state is stale. Reset.
  renderer.resetState()

  renderer.setRenderTarget(null)
  renderer.clear(true, true, true)
  hostLocalEndpoint.renderAsSource(renderer, hostCamera)

  if (iframeReady && iframeAnchor) {
    stencilBg.copy(iframeBg)
    stencilMask.update(hostAnchorMesh, hostCamera, stencilBg)
    renderer.render(stencilMask.scene, stencilMask.camera)
    renderer.clearDepth()

    let batch: NetGLCall[] | null = pendingFrame
    if (batch) {
      pendingFrame = null
      lastFrame = batch
    } else {
      batch = lastFrame
    }
    if (batch) {
      for (let i = 0; i < batch.length; i += 1) netglReplay(batch[i])
      renderer.resetState()
    }

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
  }

  requestAnimationFrame(frame)
}

frame()
