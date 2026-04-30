import * as THREE from 'three'
import {
  asAnchor,
  makePortalPlane,
  makePortalStencilMask,
  PORTAL_STENCIL_REF
} from '@portal/portal-three'
import { couplePoseAcrossPortal } from '@portal/portal-core'
import { createLoopbackPair } from '@portal/portal-iframe'
import {
  colorBufferToPNG,
  createHeadlessRenderer,
  makeHeadlessEndpoint,
  makeHeadlessTarget,
  type HeadlessFrameMessage
} from '@portal/portal-headless-three'

// ---------------------------------------------------------------------------
// Snapshot-proxy "pair" scene.
//
// Server-side reconstruction of what the three demos (host-three,
// host-iframe-demo, host-worker-demo) render in the browser: worldA as the
// ambient scene, with a portal at z=-3.5 showing worldB through it.
//
// The headless target's per-frame loop oblique-clips against its own anchor,
// which is exactly what we want for worldB (destination through the portal).
// WorldA is the source scene the camera lives in, so it's rendered directly
// to the default framebuffer without oblique clipping — the cascade pattern
// can't express that, so the host-side render is open-coded here.
// ---------------------------------------------------------------------------

const PORTAL_SIZE = new THREE.Vector2(2.6, 3.2)
const PORTAL_NORMAL = new THREE.Vector3(0, 0, 1)

const buildWorldAScene = (): { scene: THREE.Scene; portalMesh: THREE.Mesh } => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#101826')
  scene.add(new THREE.HemisphereLight(0xb9ccff, 0x223344, 1))
  const dir = new THREE.DirectionalLight(0xffffff, 0.65)
  dir.position.set(3, 6, 2)
  scene.add(dir)

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 18),
    new THREE.MeshStandardMaterial({ color: '#1b2a3f', roughness: 0.95, metalness: 0.03 })
  )
  floor.rotation.x = -Math.PI / 2
  scene.add(floor)

  const cubeGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9)
  const cubeMat = new THREE.MeshStandardMaterial({ color: '#5da9ff', roughness: 0.35 })
  for (let i = 0; i < 14; i += 1) {
    const c = new THREE.Mesh(cubeGeo, cubeMat)
    c.position.set(Math.sin(i * 0.5) * 4, 0.45, -3 - i * 0.65)
    scene.add(c)
  }

  const portalMesh = makePortalPlane(PORTAL_SIZE)
  portalMesh.position.set(0, 1.6, -3.5)
  scene.add(portalMesh)

  return { scene, portalMesh }
}

const buildWorldBScene = (): { scene: THREE.Scene; portalMesh: THREE.Mesh } => {
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
  for (let i = 0; i < 24; i += 1) {
    const m = new THREE.Mesh(sphereGeo, sphereMat)
    // Frozen at t=0 to match the snapshot of an animated browser demo at its
    // first frame; tickWorldB applies a sine bounce that we'd need to drive
    // with a request-time `?t=` if we want to replay later.
    m.position.set(Math.cos(i * 0.35) * 2.6, 1.1 + Math.sin(i * 0.3) * 0.5, Math.sin(i * 0.35) * 2.6)
    m.rotation.y = i * 0.2
    scene.add(m)
  }

  const portalMesh = makePortalPlane(PORTAL_SIZE)
  portalMesh.position.set(0, 1.6, 0)
  portalMesh.rotation.y = Math.PI
  scene.add(portalMesh)

  return { scene, portalMesh }
}

export type PairRenderOpts = {
  position: [number, number, number]
  forward: [number, number, number]
  width: number
  height: number
  fovDeg?: number
}

export type PairScene = {
  render(opts: PairRenderOpts): Buffer
  cleanup(): void
}

/**
 * Build a fresh pair scene with its own gl contexts. Caller is expected to
 * `cleanup()` after rendering — gl contexts and worker targets are not pooled
 * across requests at this stage (matches Droste's per-request lifecycle).
 */
export const buildPairScene = (initWidth: number, initHeight: number): PairScene => {
  // Host-side renderer (worldA) — renders to its default framebuffer, which
  // is what readPixels returns.
  const host = createHeadlessRenderer(initWidth, initHeight)
  host.renderer.autoClear = false

  const { scene: worldA, portalMesh: portalA } = buildWorldAScene()
  const { scene: worldB, portalMesh: portalB } = buildWorldBScene()

  // Loopback transport between the host-side worldB endpoint and the
  // worldB headless target. Same pattern as the Droste cascade, just two
  // levels deep with one being the host and the other a destination.
  const loop = createLoopbackPair()
  const worldBEndpoint = makeHeadlessEndpoint({
    transport: loop.hostTransport,
    stencilRef: PORTAL_STENCIL_REF
  })
  const worldBTarget = makeHeadlessTarget({
    scene: worldB,
    anchor: asAnchor(portalB, PORTAL_NORMAL),
    transport: loop.targetTransport,
    width: initWidth,
    height: initHeight
  })
  worldBTarget.start()
  worldBEndpoint.prewarm(host.renderer)

  const stencilMask = makePortalStencilMask()
  const stencilBg = new THREE.Color()
  const camera = new THREE.PerspectiveCamera(70, initWidth / initHeight, 0.02, 200)

  const render = (opts: PairRenderOpts): Buffer => {
    const { position, forward, width, height, fovDeg = 70 } = opts

    if (host.width !== width || host.height !== height) {
      host.resize(width, height)
    }

    camera.position.set(position[0], position[1], position[2])
    camera.up.set(0, 1, 0)
    camera.lookAt(
      position[0] + forward[0],
      position[1] + forward[1],
      position[2] + forward[2]
    )
    camera.fov = fovDeg
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    camera.updateMatrixWorld(true)

    // Couple the host pose into worldB coords and request a frame from the
    // worldB target. Loopback delivers synchronously, so by the time
    // requestFrame returns the endpoint has the buffers ready.
    const sourceAnchor = asAnchor(portalA, PORTAL_NORMAL)
    const targetAnchor = asAnchor(portalB, PORTAL_NORMAL)
    const coupled = couplePoseAcrossPortal(
      {
        position,
        forward,
        up: [0, 1, 0]
      },
      { source: sourceAnchor, target: targetAnchor }
    )

    worldBEndpoint.requestFrame({
      pose: {
        position: coupled.position,
        forward: coupled.forward ?? [0, 0, -1],
        up: coupled.up ?? [0, 1, 0]
      },
      projection: Array.from(camera.projectionMatrix.elements),
      viewport: { width, height },
      time: 0
    })

    // Default framebuffer: render worldA fully, then stencil-mask the door
    // area, then composite the worldB frame.
    host.renderer.setRenderTarget(null)
    host.renderer.clear(true, true, true)
    host.renderer.render(worldA, camera)

    if (worldBEndpoint.isReady()) {
      const tbg = worldBEndpoint.getBackground()
      stencilBg.setRGB(tbg.r, tbg.g, tbg.b)
      stencilMask.update(portalA, camera, stencilBg)
      host.renderer.render(stencilMask.scene, stencilMask.camera)
      host.renderer.clearDepth()
      if (worldBEndpoint.hasFrame()) {
        worldBEndpoint.renderAsDestination(host.renderer)
      }
    }

    // Read default framebuffer directly. captureColorPNG would also work,
    // but we already have the buffer pattern from the Droste path so reuse
    // colorBufferToPNG.
    const buf = new Uint8Array(width * height * 4)
    host.glContext.readPixels(
      0,
      0,
      width,
      height,
      host.glContext.RGBA,
      host.glContext.UNSIGNED_BYTE,
      buf
    )
    return colorBufferToPNG(buf, width, height)
  }

  const cleanup = (): void => {
    worldBTarget.stop()
    host.renderer.dispose()
  }

  return { render, cleanup }
}

// Default starting pose for the demo: matches host-three's initial
// `hostCamera.position.set(0, 1.6, 5.5)` looking down -z. Used when no
// ?pose= query is provided.
export const PAIR_DEFAULT_POSE: { position: [number, number, number]; forward: [number, number, number] } = {
  position: [0, 1.6, 5.5],
  forward: [0, 0, -1]
}

// HeadlessFrameMessage is re-exported so the registry can import it cleanly
// without a transitive @portal/portal-headless-three import.
export type { HeadlessFrameMessage }
