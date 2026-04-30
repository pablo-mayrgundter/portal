import * as THREE from 'three'

export type FlyControls = {
  update: (dt: number) => void
  setOrientationFromForward: (forward: THREE.Vector3) => void
  /**
   * Drop pressed-key state. Used on portal traversal: focus shifts between
   * the host and iframe windows, so keyup events get delivered to whichever
   * window has focus AT release time. The other window misses them and ends
   * up with stale entries in its keys Set, causing phantom WASD movement.
   */
  clearKeys: () => void
  /**
   * Snapshot the currently-pressed keys as a flat array. Used by the sender
   * side of a portal traversal so the receiver can resume held-key motion
   * without waiting for the OS auto-repeat to re-fire keydown.
   */
  getKeys: () => string[]
  /** Restore pressed-key state from a previous snapshot (clears first). */
  setKeys: (codes: readonly string[]) => void
}

export type FlyControlsOptions = {
  /** World-units per second when a movement key is held. Default: 4. */
  moveSpeed?: number
  /** Radians of yaw/pitch per pixel of pointer drag. Default: 0.0025. */
  lookSensitivity?: number
}

// Keyboard WASD + drag-to-look, with an on-screen WASD pad auto-mounted on
// touch devices. Drag-look uses Pointer Events so it works with both mouse and
// touch from the same code path.
export const attachBasicFlyControls = (
  camera: THREE.PerspectiveCamera,
  dom: HTMLElement,
  opts: FlyControlsOptions = {}
): FlyControls => {
  const moveSpeed = opts.moveSpeed ?? 4
  const lookSensitivity = opts.lookSensitivity ?? 0.0025

  let yaw = 0
  let pitch = 0
  const keys = new Set<string>()

  attachLookControls(dom, (dx, dy) => {
    yaw -= dx * lookSensitivity
    pitch -= dy * lookSensitivity
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
      velocity.normalize().multiplyScalar(moveSpeed * dt)
      camera.position.add(velocity)
    }
  }

  // Reset internal pitch/yaw to match a given forward vector. Used after a
  // portal traversal hands the camera a new orientation; without this the
  // next mouse drag snaps back to the (stale) yaw+pitch.
  //
  // Extraction goes through Matrix4.lookAt + YXZ Euler from quaternion, NOT
  // asin(f.y) + atan2(-f.x, -f.z) on the forward alone. With combined yaw +
  // pitch, the forward's components are products of trig of both angles
  // (e.g., f.y = sin(pitch) * cos(yaw)), so extracting asin(f.y) silently
  // loses a factor of cos(yaw) of the pitch. Symptom: oblique traversal
  // "snaps" by a few degrees on the next controls.update() because
  // setFromEuler(extractedPitch, extractedYaw) reconstructs a forward
  // slightly different from the input. Building an intermediate matrix from
  // the forward + a known up and pulling the Euler out is robust at any
  // orientation.
  const _orientMatrix = new THREE.Matrix4()
  const _orientQuat = new THREE.Quaternion()
  const _orientEuler = new THREE.Euler(0, 0, 0, 'YXZ')
  const _orientEye = new THREE.Vector3(0, 0, 0)
  const _orientTarget = new THREE.Vector3()
  const _orientUp = new THREE.Vector3(0, 1, 0)
  const setOrientationFromForward = (forward: THREE.Vector3) => {
    _orientTarget.copy(forward).normalize()
    _orientMatrix.lookAt(_orientEye, _orientTarget, _orientUp)
    _orientQuat.setFromRotationMatrix(_orientMatrix)
    _orientEuler.setFromQuaternion(_orientQuat, 'YXZ')
    pitch = _orientEuler.x
    yaw = _orientEuler.y
  }

  const clearKeys = () => {
    keys.clear()
  }

  const getKeys = () => Array.from(keys)

  const setKeys = (codes: readonly string[]) => {
    keys.clear()
    for (const code of codes) keys.add(code)
  }

  return { update, setOrientationFromForward, clearKeys, getKeys, setKeys }
}

// Single-pointer drag-to-look on `dom`. Tracks the pointerId that started the
// drag so a second finger (e.g., on the WASD pad, which lives outside `dom`)
// doesn't disturb look. We compute deltas from clientX/Y rather than reading
// movementX/Y because synthesized touch pointer events don't reliably populate
// those fields.
const attachLookControls = (
  dom: HTMLElement,
  onMove: (dx: number, dy: number) => void
) => {
  let activePointer: number | null = null
  let lastX = 0
  let lastY = 0

  dom.addEventListener('pointerdown', (e) => {
    if (activePointer !== null) return
    activePointer = e.pointerId
    lastX = e.clientX
    lastY = e.clientY
    if (e.pointerType !== 'mouse') {
      try { dom.setPointerCapture(e.pointerId) } catch {}
    }
  })

  const end = (e: PointerEvent) => {
    if (e.pointerId !== activePointer) return
    activePointer = null
  }
  window.addEventListener('pointerup', end)
  window.addEventListener('pointercancel', end)
  window.addEventListener('pointermove', (e) => {
    if (e.pointerId !== activePointer) return
    const dx = e.clientX - lastX
    const dy = e.clientY - lastY
    lastX = e.clientX
    lastY = e.clientY
    onMove(dx, dy)
  })
}

// On-screen WASD pad for touch devices. Each button maps to the same KeyboardEvent
// `code` the keyboard listener uses, so the movement integration is identical.
const attachMobileWasdPad = (keys: Set<string>) => {
  const isTouch = typeof window !== 'undefined'
    && (('ontouchstart' in window) || (navigator.maxTouchPoints ?? 0) > 0)
  if (!isTouch) return

  const pad = document.createElement('div')
  pad.className = 'wasd-pad'
  pad.setAttribute('aria-label', 'Movement controls')
  pad.innerHTML = `
    <button type="button" data-key="KeyW" class="wasd-btn wasd-up" aria-label="Forward">↑</button>
    <button type="button" data-key="KeyA" class="wasd-btn wasd-left" aria-label="Left">←</button>
    <button type="button" data-key="KeyS" class="wasd-btn wasd-down" aria-label="Back">↓</button>
    <button type="button" data-key="KeyD" class="wasd-btn wasd-right" aria-label="Right">→</button>
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
      font: 600 22px Inter, system-ui, sans-serif;
      line-height: 1;
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
