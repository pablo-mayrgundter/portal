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

  const setOrientationFromForward = (forward: THREE.Vector3) => {
    const f = forward.clone().normalize()
    pitch = Math.asin(THREE.MathUtils.clamp(f.y, -1, 1))
    yaw = Math.atan2(-f.x, -f.z)
  }

  return { update, setOrientationFromForward }
}
