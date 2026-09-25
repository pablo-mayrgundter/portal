// Earth mode: a three.js space scene (stars, a moon, sunlight) whose Earth
// is a Cesium globe composited in place. This is the shape celestiary
// needs: celestiary keeps its solar system, Cesium supplies the Earth.
//
// How the composite works, per host frame:
//   1. Draw the host scene. The Earth itself is not drawn (a placeholder
//      sphere is, until Cesium's first frame arrives).
//   2. Stencil pass: an invisible WGS84-shaped ellipsoid, 2.5% oversize to
//      cover Cesium's sky-atmosphere shell, writes stencil=1 wherever it
//      passes the depth test. So the moon in front of the Earth keeps its
//      pixels (stencil stays 0); the moon behind it doesn't.
//   3. Drain Cesium's frame through the replay's screen policy: stencil
//      EQUAL 1, premultiplied-over blending (Cesium renders onto a
//      transparent background, so the atmosphere glow blends over the host
//      scene), depth-only clears.
//
// Camera: the host camera, re-expressed in the Earth's body frame, scaled
// from host units to metres, and axis-swapped into Cesium's ECEF (Z =
// north pole) — then sent to the guest, which renders exactly one frame
// per tick. The tick for frame N+1 is sent at the END of host frame N,
// after the controls update, so the guest's frame is normally rendered
// from the same pose the host draws frame N+1 with ("pose-ahead"). The
// on-screen lag counter shows when that slips.

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PORTAL_STENCIL_REF } from '@portal/portal-three'
import { makeHostShared } from './shared'

// Host units: 1 unit = 1000 km.
const METRES_PER_UNIT = 1e6
const WGS84_A = 6378137 / METRES_PER_UNIT
const WGS84_B = 6356752.314245 / METRES_PER_UNIT
// Cesium's SkyAtmosphere outer shell is the ellipsoid scaled by 1.025.
const ATMOSPHERE_SCALE = 1.025
// Sidereal-ish spin, sped up so rotation is visible.
const EARTH_SPIN_RAD_PER_S = 0.05

export const runEarthMode = (opts: {
  iframe: HTMLIFrameElement
  mount: HTMLElement
  onStatus: (text: string) => void
  onLag: (frames: number) => void
  /** Scene time to start at, seconds (moon phase, Earth spin). */
  startTime?: number
  /** Freeze scene time (camera still moves). For stills and debugging. */
  paused?: boolean
}): void => {
  const shared = makeHostShared({
    ...opts,
    replay: (getShared) => ({
      // Guest and host canvases are the same CSS size but may differ in
      // pixel density; stretch the guest's screen viewport to ours.
      remapScreenViewport: (x, y, w, h) => {
        const s = getShared()
        const g = s.guestSize
        if (!g) return null
        const c = s.canvasSize()
        const sx = c.width / g.width
        const sy = c.height / g.height
        return [Math.round(x * sx), Math.round(y * sy), Math.round(w * sx), Math.round(h * sy)]
      },
      screen: {
        stencil: { ref: PORTAL_STENCIL_REF },
        blend: 'premultiplied-over',
        clear: 'depth-only'
      }
    })
  })
  const { renderer, receiver } = shared

  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 20000)
  camera.position.set(6, 2.5, 26)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#000000')
  const sunDir = new THREE.Vector3(1, 0.25, 0.6).normalize()
  const sun = new THREE.DirectionalLight(0xffffff, 2.2)
  sun.position.copy(sunDir).multiplyScalar(100)
  scene.add(sun)
  scene.add(new THREE.AmbientLight(0x223344, 0.25))
  scene.add(makeStars())

  // Earth body frame. Local +Y is the north pole; see toEcef below.
  const earth = new THREE.Group()
  earth.rotation.z = THREE.MathUtils.degToRad(23.4) // axial tilt
  scene.add(earth)
  const earthSpin = new THREE.Group()
  earth.add(earthSpin)

  const ellipsoid = new THREE.SphereGeometry(1, 128, 96)
  // Shown until Cesium's first frame lands, so the scene isn't Earthless.
  const placeholder = new THREE.Mesh(
    ellipsoid,
    new THREE.MeshStandardMaterial({ color: '#1d4f91', roughness: 0.8 })
  )
  placeholder.scale.set(WGS84_A, WGS84_B, WGS84_A)
  earthSpin.add(placeholder)

  // Stencil-only ellipsoid (atmosphere-sized). Rendered in its own pass
  // after the host scene so it depth-tests against it.
  const stencilScene = new THREE.Scene()
  const stencilMesh = new THREE.Mesh(
    ellipsoid,
    new THREE.MeshBasicMaterial({
      // Double-sided: once the camera descends inside the atmosphere shell,
      // only back faces are in view, and they must still stencil the whole
      // screen. Outside the shell, front ∪ back faces = the silhouette.
      side: THREE.DoubleSide,
      colorWrite: false,
      depthWrite: false,
      depthTest: true,
      stencilWrite: true,
      stencilRef: PORTAL_STENCIL_REF,
      stencilFunc: THREE.AlwaysStencilFunc,
      stencilZPass: THREE.ReplaceStencilOp,
      stencilFail: THREE.KeepStencilOp,
      stencilZFail: THREE.KeepStencilOp
    })
  )
  stencilScene.add(stencilMesh)

  // A moon on a (much too) tight, inclined orbit, so it passes in front of
  // and behind the Earth: depth composition in both directions.
  const moonOrbit = new THREE.Group()
  moonOrbit.rotation.x = THREE.MathUtils.degToRad(-8)
  scene.add(moonOrbit)
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1.737, 64, 48),
    new THREE.MeshStandardMaterial({ color: '#b8b4ac', roughness: 0.95 })
  )
  moonOrbit.add(moon)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = WGS84_A * 1.02
  controls.maxDistance = 400
  controls.zoomSpeed = 0.6
  controls.rotateSpeed = 0.5
  // Slow the controls down as the camera nears the surface.
  const adaptSpeed = (): void => {
    const alt = camera.position.length() - WGS84_A
    controls.rotateSpeed = THREE.MathUtils.clamp(alt / 20, 0.02, 0.5)
  }

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  const clock = new THREE.Clock()
  let time = opts.startTime ?? 0

  const posePlanets = (): void => {
    earthSpin.rotation.y = time * EARTH_SPIN_RAD_PER_S
    const moonAngle = time * 0.12
    moon.position.set(Math.cos(moonAngle) * 16, 0, Math.sin(moonAngle) * 16)
    scene.updateMatrixWorld()
    stencilMesh.matrixAutoUpdate = false
    stencilMesh.matrix.copy(earthSpin.matrixWorld).multiply(
      new THREE.Matrix4().makeScale(WGS84_A * ATMOSPHERE_SCALE, WGS84_B * ATMOSPHERE_SCALE, WGS84_A * ATMOSPHERE_SCALE)
    )
    stencilMesh.matrixWorldNeedsUpdate = true
  }

  let staleFrames = 0
  const sendTick = (): number | null => {
    camera.updateMatrixWorld()
    return shared.tick(time, cesiumView(camera, earthSpin))
  }

  posePlanets()
  sendTick()

  const frame = (): void => {
    const cesiumLive = receiver.hasFrame
    placeholder.visible = !cesiumLive

    renderer.resetState()
    renderer.setRenderTarget(null)
    renderer.clear(true, true, true)
    renderer.render(scene, camera)

    if (cesiumLive) {
      renderer.render(stencilScene, camera)
      renderer.clearDepth()
      receiver.drain()
      renderer.resetState()
    }

    // Pose-ahead: advance to the next frame's pose now, and tick the guest
    // with it, so its frame is ready by the time we draw that pose.
    const dt = Math.min(clock.getDelta(), 0.1)
    if (!opts.paused) time += dt
    adaptSpeed()
    controls.update(dt)
    posePlanets()
    // Skipped while the guest is still on the previous tick; the lag
    // readout counts host frames drawn with a stale guest frame.
    if (sendTick() === null) staleFrames += 1
    else staleFrames = 0
    opts.onLag(staleFrames)

    requestAnimationFrame(frame)
  }
  frame()
}

// Host world → Earth body frame → metres → Cesium ECEF.
//
// Body frame is three's Y-up; ECEF is Z-up (north pole), X through the
// prime meridian. Mapping: ecef = (x, -z, y). A proper rotation (det +1),
// so handedness is preserved.
const _inv = new THREE.Matrix4()
const _pos = new THREE.Vector3()
const _dir = new THREE.Vector3()
const _up = new THREE.Vector3()
const _rot = new THREE.Matrix3()

const toEcef = (v: THREE.Vector3, scale: number): [number, number, number] => [
  v.x * scale,
  -v.z * scale,
  v.y * scale
]

const cesiumView = (camera: THREE.PerspectiveCamera, body: THREE.Object3D) => {
  _inv.copy(body.matrixWorld).invert()
  _rot.setFromMatrix4(_inv)
  _pos.setFromMatrixPosition(camera.matrixWorld).applyMatrix4(_inv)
  camera.getWorldDirection(_dir).applyMatrix3(_rot).normalize()
  _up.set(0, 1, 0).applyQuaternion(camera.quaternion).applyMatrix3(_rot).normalize()
  return {
    position: toEcef(_pos, METRES_PER_UNIT),
    direction: toEcef(_dir, 1),
    up: toEcef(_up, 1),
    fovy: THREE.MathUtils.degToRad(camera.fov)
  }
}

const makeStars = (): THREE.Points => {
  const n = 4000
  const pos = new Float32Array(n * 3)
  const v = new THREE.Vector3()
  // Deterministic LCG so the sky is the same every load.
  let seed = 7
  const rand = (): number => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  for (let i = 0; i < n; i += 1) {
    v.set(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize().multiplyScalar(5000)
    pos.set([v.x, v.y, v.z], i * 3)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false })
  )
}
