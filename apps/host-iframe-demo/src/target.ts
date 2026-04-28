import * as THREE from 'three'
import { makeIframeTarget } from '@portal/portal-iframe'
import type { PortalAnchor, PortalMessage } from '@portal/portal-core'
import { attachBasicFlyControls } from './controls'

const params = new URLSearchParams(location.search)
const LOG = params.get('log') === '1'
const SCENE = params.get('scene') ?? 'swarm'

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

const destinationTarget = makeIframeTarget({
  scene: bundle.scene,
  anchor,
  log: LOG,
  tick: bundle.tick
})
destinationTarget.start()

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
let sourceRenderer: THREE.WebGLRenderer | null = null
let sourceControls: ReturnType<typeof attachBasicFlyControls> | null = null
const sourceClock = new THREE.Clock()
const sourceLookTarget = new THREE.Vector3()

const onSourceResize = (): void => {
  if (!sourceRenderer) return
  const w = window.innerWidth
  const h = window.innerHeight
  sourceRenderer.setSize(w, h)
  sourceCamera.aspect = w / h
  sourceCamera.updateProjectionMatrix()
}

const sourceFrame = (): void => {
  if (!sourceMode || !sourceRenderer || !sourceControls) return
  bundle.tick?.(sourceClock.elapsedTime)
  sourceControls.update(sourceClock.getDelta())
  sourceRenderer.render(bundle.scene, sourceCamera)
  sourceRaf = requestAnimationFrame(sourceFrame)
}

const activateSourceMode = (initialPose: {
  position: [number, number, number]
  forward?: [number, number, number]
  up?: [number, number, number]
}): void => {
  if (sourceMode) return
  // Tear down destination mode — no more bitmap sends.
  destinationTarget.stop()

  // Build the visible-canvas renderer lazily so we don't pay for it in the
  // common case where traversal never happens.
  sourceRenderer = new THREE.WebGLRenderer({ canvas: displayCanvas, antialias: true })
  sourceRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
  }

  sourceControls = attachBasicFlyControls(sourceCamera, displayCanvas)
  document.body.classList.add('source-mode')
  onSourceResize()
  window.addEventListener('resize', onSourceResize)

  sourceMode = true
  sourceClock.start()
  sourceRaf = requestAnimationFrame(sourceFrame)
  if (LOG) console.log('[iframe] activated source mode at pose', initialPose)
}

window.addEventListener('message', (ev) => {
  const msg = ev.data as PortalMessage
  if (!msg || typeof msg !== 'object') return
  if (msg.type === 'portal:traverse') {
    activateSourceMode(msg.pose as Parameters<typeof activateSourceMode>[0])
  }
})
