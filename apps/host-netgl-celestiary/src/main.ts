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
// The host camera's pose crosses the door scaled up to astronomy scale (the
// door is a 1e11 m window in celestiary's world, see the shim's anchor), so
// the door behaves as a window: walk past it and celestiary's sky slides
// behind the door frame the way the scene through a real window would.

import * as THREE from 'three'
import { couplePoseAcrossPortal, type Mat4, type PortalPose } from '@portal/portal-core'
import {
  PORTAL_STENCIL_REF,
  makeLocalEndpoint,
  makePortalPlane,
  makePortalStencilMask
} from '@portal/portal-three'
import { attachBasicFlyControls, attachNavDrawer } from '@portal/portal-controls'
import { makeNetGLHostReceiver, windowTransport } from '@pablo-mayrgundter/portal-netgl'

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
//
// The door is a window: celestiary renders the host camera's own view
// (carried through the door, see the setPose below) at full screen, and the
// stencil mask shows only what falls inside the door. So the guest's screen
// maps 1:1 onto the host canvas, scaled only for any drawing-buffer size
// difference between the iframe and this page. (It used to be cover-fit
// into the door's screen rect, with celestiary flying its own camera: a
// picture in a frame, whose content slid the wrong way as you walked past
// the door.)
let guestScreen: { w: number; h: number } | null = null
const transport = windowTransport({ output: iframe.contentWindow!, inputFilter: iframe.contentWindow })
const receiver = makeNetGLHostReceiver({
  gl: renderer.getContext() as WebGL2RenderingContext,
  transport,
  replay: {
    remapScreenViewport: (x, y, w, h) => {
      // Full-canvas viewports tell us the guest's drawing-buffer size.
      if (x === 0 && y === 0) guestScreen = { w, h }
      if (!guestScreen) return null
      const size = renderer.getDrawingBufferSize(new THREE.Vector2())
      const sx = size.x / guestScreen.w
      const sy = size.y / guestScreen.h
      return [Math.round(x * sx), Math.round(y * sy), Math.round(w * sx), Math.round(h * sy)]
    },
    screen: { stencil: { ref: PORTAL_STENCIL_REF }, clear: 'depth-only' }
  },
  onControl: (msg) => {
    // Errors and lifecycle notices from the iframe's shim are relayed via
    // postMessage so they show up in the host's console too.
    const dbg = msg as { type?: string; msg?: string; extra?: unknown }
    if (dbg?.type !== 'netgl:debug') return
    if (dbg.extra !== undefined) console.warn(`[host←shim] ${dbg.msg}`, dbg.extra)
    else console.warn(`[host←shim] ${dbg.msg}`)
  }
})
const iframeBg = new THREE.Color('#000000')

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

  const ready = receiver.ready
  if (ready) {
    iframeBg.setRGB(ready.background.r, ready.background.g, ready.background.b)
    stencilBg.copy(iframeBg)
    stencilMask.update(hostAnchorMesh, hostCamera, stencilBg)
    renderer.render(stencilMask.scene, stencilMask.camera)
    renderer.clearDepth()
    receiver.drain()
    renderer.resetState()

    // Carry the host camera through the door. `scale` makes the door the
    // size of celestiary's announced window (its anchor's halfWidth), so a
    // step here is proportionally far there and the parallax is right.
    const source = hostLocalEndpoint.getAnchor()
    const scale = ready.anchor.halfWidth && source.halfWidth
      ? ready.anchor.halfWidth / source.halfWidth
      : 1
    hostCamera.getWorldPosition(camPos)
    camFwd.set(0, 0, -1).applyQuaternion(hostCamera.quaternion)
    camUp.set(0, 1, 0).applyQuaternion(hostCamera.quaternion)
    const coupled = couplePoseAcrossPortal(
      {
        position: [camPos.x, camPos.y, camPos.z],
        forward: [camFwd.x, camFwd.y, camFwd.z],
        up: [camUp.x, camUp.y, camUp.z]
      },
      {
        source,
        // portal-netgl's anchor uses readonly tuples; portal-core's doesn't.
        target: {
          position: [...ready.anchor.position],
          normal: [...ready.anchor.normal],
          up: [...ready.anchor.up]
        },
        scale
      }
    )

    const size = renderer.getDrawingBufferSize(new THREE.Vector2())
    transport.post({
      type: 'netgl:setPose',
      pose: coupled as PortalPose,
      projection: Array.from(hostCamera.projectionMatrix.elements) as Mat4,
      viewport: { width: Math.max(1, size.x), height: Math.max(1, size.y) },
      time
    })
  }

  requestAnimationFrame(frame)
}

frame()
