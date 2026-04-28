import * as THREE from 'three'

export const attachBasicFlyControls = (camera: THREE.PerspectiveCamera, dom: HTMLElement) => {
  let yaw = 0
  let pitch = 0
  let dragging = false
  const keys = new Set<string>()

  dom.addEventListener('mousedown', () => {
    dragging = true
  })
  window.addEventListener('mouseup', () => {
    dragging = false
  })
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return
    yaw -= e.movementX * 0.0025
    pitch -= e.movementY * 0.0025
    pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, pitch))
  })

  window.addEventListener('keydown', (e) => keys.add(e.code))
  window.addEventListener('keyup', (e) => keys.delete(e.code))

  const velocity = new THREE.Vector3()
  const forward = new THREE.Vector3()
  const right = new THREE.Vector3()

  const update = (dt: number) => {
    camera.quaternion.setFromEuler(new THREE.Euler(pitch, yaw, 0, 'YXZ'))

    forward.set(0, 0, -1).applyQuaternion(camera.quaternion)
    right.set(1, 0, 0).applyQuaternion(camera.quaternion)

    velocity.set(0, 0, 0)
    if (keys.has('KeyW')) velocity.add(forward)
    if (keys.has('KeyS')) velocity.sub(forward)
    if (keys.has('KeyD')) velocity.add(right)
    if (keys.has('KeyA')) velocity.sub(right)

    velocity.y = 0
    if (velocity.lengthSq() > 0) {
      velocity.normalize().multiplyScalar(4 * dt)
      camera.position.add(velocity)
    }
  }

  // Reset internal pitch/yaw to match a given forward vector. Used after a
  // portal traversal hands the camera a new orientation; without this the
  // next mouse drag snaps back to the (stale) yaw+pitch.
  //
  // Extraction has to go through quaternion → YXZ Euler instead of
  // asin(f.y)+atan2(-f.x,-f.z) on the forward alone. With combined yaw+pitch
  // the forward's components are products of trig of both angles (e.g.,
  // f.y = sin(pitch)*cos(yaw)), so extracting asin(f.y) silently loses a
  // factor of cos(yaw) of the pitch. Symptom: oblique traversal "snaps"
  // by a few degrees on the next controls.update() because
  // setFromEuler(extractedPitch, extractedYaw) reconstructs a forward
  // slightly different from the input. Building an intermediate matrix
  // from the forward + a known up and pulling the Euler out via three.js
  // is robust at any orientation.
  const _orientMatrix = new THREE.Matrix4()
  const _orientQuat = new THREE.Quaternion()
  const _orientEuler = new THREE.Euler(0, 0, 0, 'YXZ')
  const _orientEye = new THREE.Vector3(0, 0, 0)
  const _orientTarget = new THREE.Vector3()
  const _orientUp = new THREE.Vector3(0, 1, 0)
  const setOrientationFromForward = (forward: THREE.Vector3): void => {
    _orientTarget.copy(forward).normalize()
    // Matrix4.lookAt(eye, target, up) builds the camera-local-to-world basis
    // for a camera at `eye` looking at `target`. Pulling YXZ Euler back out
    // gives pitch+yaw values that, when fed to setFromEuler, reproduce the
    // SAME quaternion — round-trip exact.
    _orientMatrix.lookAt(_orientEye, _orientTarget, _orientUp)
    _orientQuat.setFromRotationMatrix(_orientMatrix)
    _orientEuler.setFromQuaternion(_orientQuat, 'YXZ')
    pitch = _orientEuler.x
    yaw = _orientEuler.y
  }

  // Clear pressed-keys state. Used on portal traversal: focus shifts between
  // the host and iframe windows, so keyup events get delivered to whichever
  // window has focus AT release time. The other window misses them and ends
  // up with stale entries in its keys Set, causing phantom WASD movement.
  const clearKeys = (): void => {
    keys.clear()
    dragging = false
  }

  return { update, setOrientationFromForward, clearKeys }
}
