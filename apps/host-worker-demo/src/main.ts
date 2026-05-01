import * as THREE from 'three'
import {
  buildSnapshotUrl,
  couplePoseAcrossPortal,
  decodeCameraPose,
  encodeCameraPose,
  type EncodedCameraPose,
  type Mat4,
  type Viewport
} from '@portal/portal-core'
import { type CompositorDebugMode } from '@portal/portal-iframe'
import { makeWorkerEndpoint } from '@portal/portal-worker'
import {
  makeLocalEndpoint,
  makePortalPlane,
  makePortalStencilMask
} from '@portal/portal-three'
import { attachBasicFlyControls } from '@portal/portal-controls'

// Diagnostic flags: same vocabulary as the iframe demo so a developer can
// switch transports without re-learning the URL surface. The `?pose=`
// permalink in particular is shared — paste an iframe-demo permalink into
// this URL bar (and vice versa) to compare composited output side by side.
const params = new URLSearchParams(location.search)
const DEBUG_MODE = (params.get('debug') ?? 'off') as CompositorDebugMode
const COMPOSE_RAW = params.get('compose') === 'raw'
const FREEZE = params.get('freeze') === '1'
const LOG = params.get('log') === '1'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')

const renderer = new THREE.WebGLRenderer({ antialias: true, stencil: true })
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.NoToneMapping
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.autoClear = false
app.appendChild(renderer.domElement)

const hostCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.02, 200)
hostCamera.position.set(0, 1.6, 5.5)

const initialPose = decodeCameraPose(params.get('pose'))
if (initialPose) {
  hostCamera.position.set(
    initialPose.position[0],
    initialPose.position[1],
    initialPose.position[2]
  )
}

// Source scene mirrors the iframe demo's worldA so the only thing that
// differs between the two demos is the destination's transport.
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
const hostAnchor = makePortalPlane(portalSize)
hostAnchor.position.set(0, 1.6, -3.5)
hostScene.add(hostAnchor)

const hostEndpoint = makeLocalEndpoint({ scene: hostScene, anchor: hostAnchor })

// Spawn the worker and use it as the destination endpoint. Vite picks up
// the new Worker URL form and emits a separate ESM worker chunk.
const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
const workerEndpoint = makeWorkerEndpoint({
  worker,
  debugMode: DEBUG_MODE,
  composeRaw: COMPOSE_RAW
})
workerEndpoint.prewarm(renderer)

const stencilMask = makePortalStencilMask()
const controls = attachBasicFlyControls(hostCamera, renderer.domElement)

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
  const localUrl = new URL(location.href)
  localUrl.searchParams.set('pose', encoded)
  history.replaceState(null, '', localUrl.toString())
  const shareUrl = buildShareUrl(encoded)
  navigator.clipboard?.writeText(shareUrl).catch(() => {})
  updateSocialPreview(pose)
  console.log('[host] permalink:', shareUrl)
})

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
let lastLogTime = 0

let frozenPose: ReturnType<typeof couplePoseAcrossPortal> | null = null
let frozenProjection: Mat4 | null = null
let frozenViewport: Viewport | null = null

const frame = (): void => {
  const dt = clock.getDelta()
  const time = clock.elapsedTime

  controls.update(dt)

  if (workerEndpoint.isReady()) {
    hostCamera.getWorldPosition(camPos)
    camFwd.set(0, 0, -1).applyQuaternion(hostCamera.quaternion)
    camUp.set(0, 1, 0).applyQuaternion(hostCamera.quaternion)

    const sourceAnchor = hostEndpoint.getAnchor()
    const targetAnchor = workerEndpoint.getAnchor()

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

    if (FREEZE && !frozenPose) {
      frozenPose = coupled
      frozenProjection = projection
      frozenViewport = { width, height }
    }

    workerEndpoint.requestFrame({
      pose: FREEZE && frozenPose ? frozenPose : coupled,
      projection: FREEZE && frozenProjection ? frozenProjection : projection,
      viewport: FREEZE && frozenViewport ? frozenViewport : { width, height },
      time
    })

    if (LOG && time - lastLogTime > 1) {
      lastLogTime = time
      console.log('[host] coupled pos:', coupled.position)
      console.log('[host] viewport:', width, 'x', height)
    }
  }

  renderer.setRenderTarget(null)
  renderer.clear(true, true, true)

  if (COMPOSE_RAW) {
    if (workerEndpoint.hasFrame()) workerEndpoint.renderAsDestination(renderer)
  } else {
    hostEndpoint.renderAsSource(renderer, hostCamera)

    const tbg = workerEndpoint.isReady() ? workerEndpoint.getBackground() : { r: 0, g: 0, b: 0 }
    stencilBg.setRGB(tbg.r, tbg.g, tbg.b)
    stencilMask.update(hostAnchor, hostCamera, stencilBg)
    renderer.render(stencilMask.scene, stencilMask.camera)

    renderer.clearDepth()

    if (workerEndpoint.hasFrame()) workerEndpoint.renderAsDestination(renderer)
  }

  requestAnimationFrame(frame)
}

frame()
