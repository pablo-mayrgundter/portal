// Door mode: the Cesium globe seen through a rectangular portal standing in
// a three.js room. The compositing rules (stencil clip, no background clear)
// come from the replay's screen policy instead of the guest shim.
//
// The door is a WINDOW, not a picture: the host camera is carried through
// the door (couplePoseAcrossPortal) onto a virtual window hanging in space
// above the Americas, scaled so the 2.6 m door is a ~10,000 km window, and
// Cesium renders the full screen from that camera with the host's field of
// view. The stencil mask then shows only what falls inside the door. Walk to
// the left of the door and look back through it, and the globe slides out
// past the door's left edge, as it would through a real window.

import * as THREE from 'three'
import { attachBasicFlyControls } from '@portal/portal-controls'
import { couplePoseAcrossPortal, type PortalAnchor } from '@portal/portal-core'
import {
  PORTAL_STENCIL_REF,
  makeLocalEndpoint,
  makePortalPlane,
  makePortalStencilMask
} from '@portal/portal-three'
import type { CesiumTick } from './protocol'
import { fillRemap, makeHostShared } from './shared'

// Metres in Cesium's world per metre in the host room.
const DOOR_SCALE = 4e6
// The window's centre: 16,000 km from Earth's centre, above 60°W 20°N,
// facing Earth (see guestWindow).
const WINDOW_LON_DEG = -60
const WINDOW_LAT_DEG = 20
const WINDOW_RADIUS_M = 1.6e7

export const runDoorMode = (opts: {
  iframe: HTMLIFrameElement
  mount: HTMLElement
  onStatus: (text: string) => void
}): void => {
  const shared = makeHostShared({
    ...opts,
    replay: (getShared) => ({
      remapScreenViewport: fillRemap(getShared),
      screen: { stencil: { ref: PORTAL_STENCIL_REF }, clear: 'depth-only' }
    })
  })
  const { renderer, receiver } = shared

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.02, 200)
  camera.position.set(0, 1.6, 5.5)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#101826')
  scene.add(new THREE.HemisphereLight(0xb9ccff, 0x223344, 1))
  const sun = new THREE.DirectionalLight(0xffffff, 0.65)
  sun.position.set(3, 6, 2)
  scene.add(sun)
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

  const door = makePortalPlane(new THREE.Vector2(2.6, 3.2))
  door.position.set(0, 1.6, -3.5)
  scene.add(door)
  const doorEndpoint = makeLocalEndpoint({ scene, anchor: door })
  const stencilMask = makePortalStencilMask()
  const doorBackground = new THREE.Color('#000000')
  const window_ = guestWindow()

  const controls = attachBasicFlyControls(camera, renderer.domElement)
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  const camPos = new THREE.Vector3()
  const camFwd = new THREE.Vector3()
  const camUp = new THREE.Vector3()
  // The host camera carried through the door into Cesium's ECEF frame.
  const coupledView = (): CesiumTick['view'] => {
    camera.updateMatrixWorld()
    camera.getWorldPosition(camPos)
    camera.getWorldDirection(camFwd)
    camUp.set(0, 1, 0).applyQuaternion(camera.quaternion)
    const pose = couplePoseAcrossPortal(
      {
        position: [camPos.x, camPos.y, camPos.z],
        forward: [camFwd.x, camFwd.y, camFwd.z],
        up: [camUp.x, camUp.y, camUp.z]
      },
      { source: doorEndpoint.getAnchor(), target: window_, scale: DOOR_SCALE }
    )
    return {
      position: pose.position,
      direction: pose.forward!,
      up: pose.up!,
      fovy: THREE.MathUtils.degToRad(camera.fov)
    }
  }

  const clock = new THREE.Clock()
  // Pose-ahead, as in earth mode: the tick for the next frame goes out at
  // the end of this one, after the controls update, so the guest's frame
  // matches the pose the host draws it with.
  shared.tick(0, coupledView())
  const frame = (): void => {
    renderer.resetState()
    renderer.setRenderTarget(null)
    renderer.clear(true, true, true)
    renderer.render(scene, camera)

    if (receiver.ready) {
      stencilMask.update(door, camera, doorBackground)
      renderer.render(stencilMask.scene, stencilMask.camera)
      renderer.clearDepth()
      receiver.drain()
      renderer.resetState()
    }

    controls.update(clock.getDelta())
    shared.tick(clock.elapsedTime, coupledView())
    requestAnimationFrame(frame)
  }
  frame()
}

/**
 * The door's far side: a window in Cesium's ECEF frame (metres), centred
 * above WINDOW_LON/LAT at WINDOW_RADIUS from Earth's centre. Its normal
 * points at Earth: couplePoseAcrossPortal puts the viewer on the side the
 * normal points away from, looking along it.
 */
const guestWindow = (): PortalAnchor => {
  const lon = THREE.MathUtils.degToRad(WINDOW_LON_DEG)
  const lat = THREE.MathUtils.degToRad(WINDOW_LAT_DEG)
  const out = new THREE.Vector3(Math.cos(lat) * Math.cos(lon), Math.cos(lat) * Math.sin(lon), Math.sin(lat))
  // North, made orthogonal to the outward direction.
  const north = new THREE.Vector3(0, 0, 1).addScaledVector(out, -out.z).normalize()
  return {
    position: [out.x * WINDOW_RADIUS_M, out.y * WINDOW_RADIUS_M, out.z * WINDOW_RADIUS_M],
    normal: [-out.x, -out.y, -out.z],
    up: [north.x, north.y, north.z]
  }
}
