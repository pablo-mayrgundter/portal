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

  attachMobileWasdPad(keys)

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

// On-screen WASD pad for touch devices. Each button maps to the same KeyboardEvent
// `code` that `attachBasicFlyControls` listens for, so the movement code path is
// identical to a physical keyboard.
const attachMobileWasdPad = (keys: Set<string>) => {
  const isTouch = typeof window !== 'undefined'
    && (('ontouchstart' in window) || (navigator.maxTouchPoints ?? 0) > 0)
  if (!isTouch) return

  const pad = document.createElement('div')
  pad.className = 'wasd-pad'
  pad.setAttribute('aria-label', 'Movement controls')
  pad.innerHTML = `
    <button type="button" data-key="KeyW" class="wasd-btn wasd-up" aria-label="Forward">W</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">A</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-down" aria-label="Back">S</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">D</button>
  `

  const style = document.createElement('style')
  style.textContent = `
    .wasd-pad {
      position: fixed;
      left: 16px;
      bottom: 16px;
      width: 168px;
      height: 168px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 6px;
      z-index: 10;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    .wasd-btn {
      font: 600 18px Inter, system-ui, sans-serif;
      color: #d8e7ff;
      background: rgba(4, 9, 18, 0.55);
      border: 1px solid rgba(216, 231, 255, 0.25);
      border-radius: 12px;
      padding: 0;
      cursor: pointer;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }
    .wasd-btn.is-active {
      background: rgba(93, 169, 255, 0.45);
      border-color: rgba(216, 231, 255, 0.6);
    }
    .wasd-up    { grid-column: 2; grid-row: 1; }
    .wasd-left  { grid-column: 1; grid-row: 2; }
    .wasd-down  { grid-column: 2; grid-row: 2; }
    .wasd-right { grid-column: 3; grid-row: 2; }
  `

  document.head.appendChild(style)
  document.body.appendChild(pad)

  for (const btn of pad.querySelectorAll<HTMLButtonElement>('.wasd-btn')) {
    const code = btn.dataset.key!
    const press = (e: PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()
      keys.add(code)
      btn.classList.add('is-active')
      try { btn.setPointerCapture(e.pointerId) } catch {}
    }
    const release = (e: PointerEvent) => {
      e.stopPropagation()
      keys.delete(code)
      btn.classList.remove('is-active')
    }
    btn.addEventListener('pointerdown', press)
    btn.addEventListener('pointerup', release)
    btn.addEventListener('pointercancel', release)
    btn.addEventListener('pointerleave', release)
    btn.addEventListener('contextmenu', (e) => e.preventDefault())
  }
}
