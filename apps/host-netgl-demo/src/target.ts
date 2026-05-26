// Iframe target for the NetGL portal demo.
//
// Owns worldB and a NetGLRenderer pointed at `parent`. On each
// `netgl:setPose` from the host, computes the portal camera pose and
// renders worldB — every GL call the renderer issues posts back to the
// host, where the replay engine executes it against the host canvas's
// WebGL2 context.
//
// applyPortalStencilTest is applied to worldB's materials so the iframe's
// draws stencil-test against ref=1, the value the host's stencil mask
// wrote in the door region. Combined with autoClear=false (don't clear
// the host's canvas) and writing into the host's default framebuffer
// (because the iframe's renderer's render target is null), worldB
// composes naturally with worldA in one GL context.

import * as THREE from 'three'
import type { PortalAnchor, PortalPose, Viewport, Mat4 } from '@portal/portal-core'
import { windowTransport } from '@portal/portal-iframe'
import { applyObliqueClipFromAnchor, applyPortalStencilTest } from '@portal/portal-three'
import { createNetGLRenderer, type NetGLTransport } from '@portal/portal-netgl'

// ---------------------------------------------------------------------------
// worldB — same red-room + sphere-swarm scene as host-iframe-demo's
// target. Animated via a per-frame tick.
// ---------------------------------------------------------------------------

const anchor: PortalAnchor = {
  position: [0, 1.6, 0],
  normal: [0, 0, -1],
  up: [0, 1, 0],
  halfWidth: 1.3,
  halfHeight: 1.6
}

const scene = new THREE.Scene()
const background = new THREE.Color('#220d17')
scene.background = background
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

// ?simple=1 swaps the swarm to MeshBasicMaterial (flat colour, no lights).
// Diagnostic: if balls appear under ?simple=1 but not without, the GL stream
// of PBR shaders / light uniforms / default envmap textures isn't surviving
// NetGL interception. If they don't appear under ?simple either, the failure
// is upstream of material shading (transport, viewport, stencil, etc.).
const SIMPLE = new URLSearchParams(location.search).get('simple') === '1'

const sphereGeo = new THREE.IcosahedronGeometry(0.45, 1)
const sphereMat = SIMPLE
  ? new THREE.MeshBasicMaterial({ color: '#ff89ad' })
  : new THREE.MeshStandardMaterial({
      color: '#ff89ad',
      metalness: 0.2,
      roughness: 0.25
    })
const swarm: THREE.Mesh[] = []
for (let i = 0; i < 24; i += 1) {
  const m = new THREE.Mesh(sphereGeo, sphereMat)
  m.position.set(Math.cos(i * 0.35) * 2.6, 0.8 + (i % 4) * 0.4, Math.sin(i * 0.35) * 2.6)
  scene.add(m)
  swarm.push(m)
}
const tick = (t: number): void => {
  swarm.forEach((m, idx) => {
    m.position.y = 1.1 + Math.sin(t * 1.2 + idx * 0.3) * 0.5
    m.rotation.y = t * 0.6 + idx * 0.2
  })
}

// ?test=1 replaces the whole scene with one big bright cube at the origin.
// Diagnostic: if THIS shows up but the swarm doesn't, the swarm scene has
// something specific going wrong (frustum culling, lights, normalmatrix,
// etc.). If even the test cube doesn't appear, the failure is fundamental
// — draws are reaching the host's GL context but producing no visible
// pixels (stencil ref mismatch, depth test, target framebuffer wrong, …).
const TEST = new URLSearchParams(location.search).get('test') === '1'
if (TEST) {
  // Replace scene contents with one obvious test object.
  while (scene.children.length > 0) scene.remove(scene.children[0])
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({ color: '#ffff00' })
  )
  cube.position.set(0, 1.6, -2)
  scene.add(cube)
}

// ?nostencil=1 skips applyPortalStencilTest AND keeps the scene background.
// Diagnostic: if balls then appear *covering the whole host canvas* (not
// just inside the door), the wire works for opaque draws and the failure
// is in stencil-test setup. If still nothing visible, draws are dropped
// for some other reason.
const NOSTENCIL = new URLSearchParams(location.search).get('nostencil') === '1'
if (!NOSTENCIL) {
  // worldB's materials need stencilFunc=EQUAL,ref=1 so they only write
  // pixels where the host's stencil mask painted ref=1 (the door region).
  // Without scene.background being suppressed, the bg would also paint
  // into the door region on the host's canvas — set to null so only the
  // stenciled geometry contributes.
  applyPortalStencilTest(scene)
  scene.background = null
}

// ---------------------------------------------------------------------------
// NetGLRenderer: shadow GL context lives in an OffscreenCanvas (just for
// three's synchronous state queries and handle minting); every GL call
// posts to the host as a NetGLCall on the same windowTransport channel
// that carries netgl:setPose the other direction.
// ---------------------------------------------------------------------------

const shadowCanvas = new OffscreenCanvas(1, 1)
const shadow = shadowCanvas.getContext('webgl2', {
  antialias: false,
  stencil: true,
  depth: true,
  preserveDrawingBuffer: false
}) as WebGL2RenderingContext
if (!shadow) {
  throw new Error('NetGL target: failed to create WebGL2 shadow context')
}

const transport = windowTransport({
  output: parent,
  inputFilter: parent
})

const netglRenderer = createNetGLRenderer({
  shadow,
  transport: transport as unknown as NetGLTransport,
  antialias: false,
  stencil: true,
  depth: true,
  preserveDrawingBuffer: false
})
netglRenderer.outputColorSpace = THREE.SRGBColorSpace
netglRenderer.toneMapping = THREE.NoToneMapping
// Critical: don't clear the host's canvas. The host has already drawn
// worldA + painted the stencil mask + clearDepth'd inside the door
// region. Clearing here would wipe all of it.
netglRenderer.autoClear = false

const sourceCamera = new THREE.PerspectiveCamera(70, 1, 0.02, 200)

// Tell the host we're alive and where the door sits in worldB.
transport.post({
  type: 'netgl:ready',
  anchor,
  background: { r: background.r, g: background.g, b: background.b }
} as unknown as Parameters<typeof transport.post>[0])

// ---------------------------------------------------------------------------
// Frame handling: each setPose message → set camera + render. The render
// emits a flurry of NetGL calls onto the transport, which the host's
// replay engine consumes.
// ---------------------------------------------------------------------------

type SetPoseMessage = {
  type: 'netgl:setPose'
  pose: PortalPose
  projection: Mat4
  viewport: Viewport
  time: number
}

const lookTarget = new THREE.Vector3()

const params = new URLSearchParams(location.search)
const LOG = params.get('log') === '1'
let lastLogTime = 0
let setPoseCount = 0

const handleSetPose = (msg: SetPoseMessage): void => {
  setPoseCount += 1
  tick(msg.time)

  // Position + orientation from the coupled pose.
  sourceCamera.position.set(msg.pose.position[0], msg.pose.position[1], msg.pose.position[2])
  if (msg.pose.up) sourceCamera.up.set(msg.pose.up[0], msg.pose.up[1], msg.pose.up[2])
  if (msg.pose.forward) {
    lookTarget.set(
      msg.pose.position[0] + msg.pose.forward[0],
      msg.pose.position[1] + msg.pose.forward[1],
      msg.pose.position[2] + msg.pose.forward[2]
    )
    sourceCamera.lookAt(lookTarget)
  }
  // Belt-and-braces: three.WebGLRenderer.render() also updates these, but
  // makeIframeTarget calls them explicitly and we mirror that to keep
  // behaviour identical between the iframe-demo and netgl-demo.
  sourceCamera.updateMatrixWorld(true)
  sourceCamera.matrixWorldInverse.copy(sourceCamera.matrixWorld).invert()

  // Use the host's projection matrix verbatim — FOV, aspect, near/far
  // all match what the host is composing against. Bypass aspect/fov
  // computation; three will use projectionMatrix as-is for rendering.
  sourceCamera.projectionMatrix.fromArray(msg.projection as readonly number[])
  sourceCamera.projectionMatrixInverse.copy(sourceCamera.projectionMatrix).invert()

  // Oblique near-plane clip aligned with the iframe portal: cull any
  // worldB geometry on the CAMERA side of the portal plane at rasterise
  // time. Without this, balls between camera and door render and occlude
  // the (correct) balls on the far side — visible as the near-side ring
  // showing through the door even though geometrically they shouldn't.
  // The host's stencil-mask handles the screen-space halfspace test;
  // this handles the world-space plane clip.
  applyObliqueClipFromAnchor(sourceCamera, anchor)
  sourceCamera.projectionMatrixInverse.copy(sourceCamera.projectionMatrix).invert()

  netglRenderer.setSize(msg.viewport.width, msg.viewport.height, false)

  // Force three to re-issue every GL state call this frame instead of
  // skipping anything it considers "already set". The host's own
  // THREE.WebGLRenderer mutates the shared GL context (worldA render +
  // stencil mask) between our frames; our renderer's per-instance
  // WebGLState cache thinks the context is in the state we left it in,
  // and would otherwise omit a redundant gl.useProgram / gl.enable / etc.
  // — leading to mismatches like "uniform3f: location is not from the
  // associated program" when our uniform calls assume a useProgram we
  // never re-emitted.
  netglRenderer.resetState()
  netglRenderer.render(scene, sourceCamera)

  // Signal end-of-frame so the host can replay our calls as one atomic
  // batch (no host-side renders interleaving with our useProgram /
  // uniform pairs).
  transport.post({ type: 'netgl:frame-end' } as unknown as Parameters<typeof transport.post>[0])

  if (LOG && msg.time - lastLogTime > 1) {
    lastLogTime = msg.time
    const fmt = (a: number[]): string => `[${a.map((n) => n.toFixed(2)).join(', ')}]`
    console.log(
      '[iframe] setPose#' + setPoseCount,
      'pos:', fmt(msg.pose.position),
      'fwd:', fmt(msg.pose.forward ?? [0, 0, -1]),
      'viewport:', msg.viewport.width + 'x' + msg.viewport.height,
      'children:', scene.children.length
    )
  }
}

transport.onMessage((m) => {
  const data = m as unknown as { type?: string }
  if (data?.type === 'netgl:setPose') {
    handleSetPose(m as unknown as SetPoseMessage)
  }
})
