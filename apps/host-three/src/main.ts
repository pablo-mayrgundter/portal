import * as THREE from 'three'
import {
  buildSnapshotUrl,
  decodeCameraPose,
  encodeCameraPose,
  type EncodedCameraPose
} from '@portal/portal-core'
import {
  makeLocalEndpoint,
  makePortalLink,
  makePortalPlane
} from '@portal/portal-three'
import { createWorldA } from './world-a'
import { createWorldB } from './world-b'
import { attachBasicFlyControls, attachNavDrawer } from '@portal/portal-controls'

attachNavDrawer('three')

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app')

const renderer = new THREE.WebGLRenderer({ antialias: true, stencil: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.autoClear = false
app.appendChild(renderer.domElement)

const hostCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.02, 200)
hostCamera.position.set(0, 1.6, 5.5)

const params = new URLSearchParams(location.search)
const initialPose = decodeCameraPose(params.get('pose'))
if (initialPose) {
  hostCamera.position.set(
    initialPose.position[0],
    initialPose.position[1],
    initialPose.position[2]
  )
}

const { scene: worldA } = createWorldA()
const { scene: worldB, tick: tickWorldB } = createWorldB()

const portalSize = new THREE.Vector2(2.6, 3.2)

const portalA = makePortalPlane(portalSize)
portalA.position.set(0, 1.6, -3.5)
worldA.add(portalA)

const portalB = makePortalPlane(portalSize)
portalB.position.set(0, 1.6, 0)
portalB.rotation.y = Math.PI
worldB.add(portalB)

const link = makePortalLink({
  a: makeLocalEndpoint({ scene: worldA, anchor: portalA }),
  b: makeLocalEndpoint({ scene: worldB, anchor: portalB, tick: tickWorldB })
})

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

// Update the og:image / twitter:image meta tags so a JS-aware share (e.g.
// the page is opened by a renderer that runs JS, like Slack's preview when
// it follows redirects) reflects the current pose. Pure crawlers reading
// raw HTML still see the static fallback declared in index.html.
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

const camForward = new THREE.Vector3()
const currentPose = (): EncodedCameraPose => {
  camForward.set(0, 0, -1).applyQuaternion(hostCamera.quaternion)
  return {
    position: [hostCamera.position.x, hostCamera.position.y, hostCamera.position.z],
    forward: [camForward.x, camForward.y, camForward.z]
  }
}
// VITE_SHARE_BASE: when set, press-P copies a permalink rooted at the
// share-proxy (which rewrites og:image based on ?pose= for crawler-correct
// social previews). When unset (e.g. local dev), copy the current page URL
// so a refresh in the same tab keeps working.
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

window.addEventListener('keydown', (ev) => {
  if (ev.code !== 'KeyP' || ev.metaKey || ev.ctrlKey || ev.altKey) return
  const pose = currentPose()
  const encoded = encodeCameraPose(pose)
  // URL bar always tracks the local page so a refresh in this tab works;
  // clipboard gets the share URL when SHARE_BASE is configured.
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
const newForward = new THREE.Vector3()

const frame = () => {
  const dt = clock.getDelta()
  const time = clock.elapsedTime

  controls.update(dt)

  const result = link.frame({ renderer, hostCamera, time })

  if (result.teleported) {
    newForward.set(0, 0, -1).applyQuaternion(hostCamera.quaternion)
    controls.setOrientationFromForward(newForward)
  }

  requestAnimationFrame(frame)
}

frame()
