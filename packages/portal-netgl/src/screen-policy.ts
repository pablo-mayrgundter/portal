// Host-side compositing policy for draws that target the host's default
// framebuffer (the "screen").
//
// A guest renders as if it owned a whole canvas. When its calls replay into
// the host's canvas, some of its GL state has to be overridden for the
// composite to be a portal rather than an overwrite:
//
//   - stencil: every screen draw must pass the host's portal stencil test
//     (EQUAL ref) and must not write stencil, so the guest's pixels only
//     land inside the door the host masked. The three.js guest did this by
//     setting stencil props on every material in the scene, which is
//     three-specific and misses anything drawn outside the scene graph
//     (post-process quads). Doing it here works for any framework.
//   - blend: optionally force premultiplied "over" on screen draws, for
//     guests whose final screen pass writes transparent background
//     (Cesium with a transparent backgroundColor) — lets the guest's
//     atmosphere glow blend over the host scene instead of replacing it.
//
// Mechanics: while a policy is active, the guest's setters for the
// overridden state (stencilFunc/Op/Mask, enable(STENCIL_TEST), blendFunc,
// ...) are NOT executed — they update a tracked copy of the guest's
// intended state instead. Right before each draw or clear, the policy
// reconciles GL to what that draw needs: the override for screen draws,
// the guest's intended state for render-target draws. Render-target passes
// therefore keep full use of stencil and blending.

const GL_STENCIL_TEST = 0x0B90
const GL_BLEND = 0x0BE2
const GL_FRONT = 0x0404
const GL_BACK = 0x0405
const GL_FRONT_AND_BACK = 0x0408
const GL_ALWAYS = 0x0207
const GL_EQUAL = 0x0202
const GL_KEEP = 0x1E00
const GL_ONE = 1
const GL_ZERO = 0
const GL_ONE_MINUS_SRC_ALPHA = 0x0303
const GL_FUNC_ADD = 0x8006

export type NetGLScreenPolicy = {
  /**
   * Clip screen draws to the host's portal stencil: stencil test EQUAL
   * `ref` (masked by `valueMask`, default 0xFF), no stencil writes.
   */
  stencil?: { ref: number; valueMask?: number }
  /**
   * `'premultiplied-over'`: blend every screen draw with
   * `ONE, ONE_MINUS_SRC_ALPHA`. Use for guests whose final screen pass
   * writes premultiplied colour over a transparent background.
   * Default `'pass'`: the guest's own blend state applies.
   */
  blend?: 'pass' | 'premultiplied-over'
  /**
   * `'depth-only'`: on the screen, drop colour and stencil clears (the
   * host already painted the door background and owns the stencil mask)
   * and confine depth clears to the guest's remapped viewport. Default
   * `'pass'`: clears execute as sent.
   */
  clear?: 'pass' | 'depth-only'
}

type Face = { func: number; ref: number; valueMask: number; fail: number; zfail: number; zpass: number; writeMask: number }

const defaultFace = (): Face => ({
  func: GL_ALWAYS,
  ref: 0,
  valueMask: 0xFFFFFFFF,
  fail: GL_KEEP,
  zfail: GL_KEEP,
  zpass: GL_KEEP,
  writeMask: 0xFFFFFFFF
})

type Mode = 'unknown' | 'intended' | 'override'

export type ScreenPolicyState = {
  /**
   * Offer a replayed call to the policy. Returns true if the call is a
   * setter for overridden state — the caller must then NOT execute it.
   */
  intercept(name: string, args: readonly unknown[]): boolean
  /** Reconcile overridden state before a draw / clear. */
  beforeDraw(toScreen: boolean): void
  /** The host touched GL state; forget what we think is applied. */
  invalidate(): void
}

export const makeScreenPolicyState = (
  gl: WebGL2RenderingContext,
  policy: NetGLScreenPolicy
): ScreenPolicyState => {
  const stencilOn = policy.stencil !== undefined
  const blendOn = policy.blend === 'premultiplied-over'

  // Guest-intended stencil state.
  let stencilEnabled = false
  const front = defaultFace()
  const back = defaultFace()
  let stencilVersion = 0
  let stencilMode: Mode = 'unknown'
  let stencilAppliedVersion = -1

  // Guest-intended blend state.
  let blendEnabled = false
  let blendFunc = [GL_ONE, GL_ZERO, GL_ONE, GL_ZERO]
  let blendEq = [GL_FUNC_ADD, GL_FUNC_ADD]
  let blendVersion = 0
  let blendMode: Mode = 'unknown'
  let blendAppliedVersion = -1

  const faces = (face: number): Face[] =>
    face === GL_FRONT ? [front] : face === GL_BACK ? [back] : face === GL_FRONT_AND_BACK ? [front, back] : []

  const interceptStencil = (name: string, a: readonly unknown[]): boolean => {
    const n = a as readonly number[]
    switch (name) {
      case 'enable':
      case 'disable':
        if (n[0] !== GL_STENCIL_TEST) return false
        stencilEnabled = name === 'enable'
        break
      case 'stencilFunc':
        for (const f of [front, back]) { f.func = n[0]; f.ref = n[1]; f.valueMask = n[2] }
        break
      case 'stencilFuncSeparate':
        for (const f of faces(n[0])) { f.func = n[1]; f.ref = n[2]; f.valueMask = n[3] }
        break
      case 'stencilOp':
        for (const f of [front, back]) { f.fail = n[0]; f.zfail = n[1]; f.zpass = n[2] }
        break
      case 'stencilOpSeparate':
        for (const f of faces(n[0])) { f.fail = n[1]; f.zfail = n[2]; f.zpass = n[3] }
        break
      case 'stencilMask':
        front.writeMask = n[0]
        back.writeMask = n[0]
        break
      case 'stencilMaskSeparate':
        for (const f of faces(n[0])) f.writeMask = n[1]
        break
      default:
        return false
    }
    stencilVersion += 1
    return true
  }

  const interceptBlend = (name: string, a: readonly unknown[]): boolean => {
    const n = a as readonly number[]
    switch (name) {
      case 'enable':
      case 'disable':
        if (n[0] !== GL_BLEND) return false
        blendEnabled = name === 'enable'
        break
      case 'blendFunc':
        blendFunc = [n[0], n[1], n[0], n[1]]
        break
      case 'blendFuncSeparate':
        blendFunc = [n[0], n[1], n[2], n[3]]
        break
      case 'blendEquation':
        blendEq = [n[0], n[0]]
        break
      case 'blendEquationSeparate':
        blendEq = [n[0], n[1]]
        break
      default:
        return false
    }
    blendVersion += 1
    return true
  }

  const applyStencilIntended = (): void => {
    if (stencilEnabled) gl.enable(GL_STENCIL_TEST)
    else gl.disable(GL_STENCIL_TEST)
    gl.stencilFuncSeparate(GL_FRONT, front.func, front.ref, front.valueMask)
    gl.stencilFuncSeparate(GL_BACK, back.func, back.ref, back.valueMask)
    gl.stencilOpSeparate(GL_FRONT, front.fail, front.zfail, front.zpass)
    gl.stencilOpSeparate(GL_BACK, back.fail, back.zfail, back.zpass)
    gl.stencilMaskSeparate(GL_FRONT, front.writeMask)
    gl.stencilMaskSeparate(GL_BACK, back.writeMask)
  }

  const applyStencilOverride = (): void => {
    const s = policy.stencil!
    gl.enable(GL_STENCIL_TEST)
    gl.stencilFunc(GL_EQUAL, s.ref, s.valueMask ?? 0xFF)
    gl.stencilOp(GL_KEEP, GL_KEEP, GL_KEEP)
    gl.stencilMask(0)
  }

  const applyBlendIntended = (): void => {
    if (blendEnabled) gl.enable(GL_BLEND)
    else gl.disable(GL_BLEND)
    gl.blendFuncSeparate(blendFunc[0], blendFunc[1], blendFunc[2], blendFunc[3])
    gl.blendEquationSeparate(blendEq[0], blendEq[1])
  }

  const applyBlendOverride = (): void => {
    gl.enable(GL_BLEND)
    gl.blendFuncSeparate(GL_ONE, GL_ONE_MINUS_SRC_ALPHA, GL_ONE, GL_ONE_MINUS_SRC_ALPHA)
    gl.blendEquation(GL_FUNC_ADD)
  }

  return {
    intercept(name, args) {
      if (stencilOn && interceptStencil(name, args)) return true
      if (blendOn && interceptBlend(name, args)) return true
      return false
    },
    beforeDraw(toScreen) {
      const want: Mode = toScreen ? 'override' : 'intended'
      if (stencilOn) {
        if (stencilMode !== want || (want === 'intended' && stencilAppliedVersion !== stencilVersion)) {
          if (want === 'override') applyStencilOverride()
          else applyStencilIntended()
          stencilMode = want
          stencilAppliedVersion = stencilVersion
        }
      }
      if (blendOn) {
        if (blendMode !== want || (want === 'intended' && blendAppliedVersion !== blendVersion)) {
          if (want === 'override') applyBlendOverride()
          else applyBlendIntended()
          blendMode = want
          blendAppliedVersion = blendVersion
        }
      }
    },
    invalidate() {
      stencilMode = 'unknown'
      blendMode = 'unknown'
    }
  }
}
