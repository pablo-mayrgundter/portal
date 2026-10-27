// Host reprojection: compose an asynchronous guest's frame for the host's
// *current* view, not the one it was rendered for.
//
// An iframe guest's frame is rendered for the view the host sent it
// (`layer:view`), and lands a host frame or more later. When the camera
// moves in between, the host draws its own scene at the new view while
// the guest's frame is still the old one: the guest lags behind the host
// by a frame (netmap's orbits over deck's globe, `lagDraws` 1, 100–150 ms
// at 9–12 fps while zooming on an M2). Waiting for the guest (lockstep)
// would cost frame rate; this corrects the guest's frame instead.
//
// A guest that draws in the host's clip space computes, per vertex,
// clip_f = VP_f · p for p in the view's frame (ECEF metres), where
// VP_f = P_f · V_f is the view the frame was drawn for. The host knows
// VP_now, so
//
//     C = VP_now · VP_f⁻¹,    C · clip_f = VP_now · p
//
// exactly, for any p: a perspective view-projection is an invertible
// homogeneous 4×4, and C is linear in clip space, so it is applied to
// `gl_Position` before the divide, and clipping and depth (z is linear in
// clip coordinates too) come out as the current view's. The replay applies
// C by rewriting the guest's vertex shaders (`reprojectVertexShader`) and
// setting the uniform before each of the guest's draws to the screen.
//
// What it doesn't correct: anything the guest computed from the old view
// other than the position. Screen-space extrusion (wide lines, sprites
// built in clip space, labels) is offset in the old clip space, so C
// scales it slightly during the lag; view-dependent choices (a far-side
// cull decided by the old eye) stay the old view's; depth written in the
// fragment shader (logarithmic depth) isn't touched. A frame drawn at
// another viewport than the host's now (a resize, a pixel-ratio change)
// isn't C's to fix: the replay maps its screen viewport and scissor rects
// (`setViewportRemap`, 0.6.5), though point sizes stay the frame's pixels.
// DESIGN.md, "Host reprojection".

import { mat4InvertRigid, mat4Multiply, type NetGLLayerView, type NetGLMat4 } from './layer-view'

/** The uniform the rewritten vertex shaders read: the correction C. */
export const NETGL_REPROJECT_UNIFORM = 'netgl_reproject'
/** What the guest's own `main` is renamed to. */
export const NETGL_REPROJECT_MAIN = 'netgl_main'

// A definition of main, with or without `void` in its parameter list.
const MAIN_DEF = /\bvoid\s+main\s*\(\s*(?:void\s*)?\)\s*\{/
// Every reference to main: the definition, and a prototype if any.
const MAIN_REF = /\bmain(\s*\()/g
const COMMENTS = /\/\*[\s\S]*?\*\/|\/\/[^\n]*/g

// Appended after the guest's source, so `#version`, `#extension` and
// `precision` stay first. highp explicitly: a shader that defaults float
// to mediump would otherwise get C at half precision on a mobile GPU.
//
// The guard leaves alone a vertex outside the old clip volume on all three
// axes, in front of the camera: the "don't draw this one" idiom
// (`gl_Position = vec4(2.0, 2.0, 2.0, 1.0)`, celestiary's hidden satellites
// and far-side dishes), which a large correction could otherwise bring
// into view. A real vertex there is clipped in the old frame anyway.
const WRAPPER = `
// portal-netgl host reprojection (replay \`reproject\`): C = VP_now * VP_frame^-1.
uniform highp mat4 ${NETGL_REPROJECT_UNIFORM};
void main() {
  ${NETGL_REPROJECT_MAIN}();
  highp vec4 netgl_p = gl_Position;
  if (!(netgl_p.w > 0.0 && all(greaterThan(abs(netgl_p.xyz), vec3(netgl_p.w))))) {
    gl_Position = ${NETGL_REPROJECT_UNIFORM} * netgl_p;
  }
}
`

// A guest's own declaration of the correction (the opt-in convention):
// `uniform [precision] mat4 netgl_reproject;`, outside comments.
const DECLARES = new RegExp(`\\buniform\\s+(?:(?:highp|mediump|lowp)\\s+)?mat4\\s+${NETGL_REPROJECT_UNIFORM}\\s*;`)

/**
 * Whether a vertex shader applies the correction itself: it declares
 * `uniform mat4 netgl_reproject;` (the opt-in convention for guests whose
 * shaders extrude in screen space, such as wide lines). The replay then
 * doesn't wrap its `main`, and sets the uniform before its draws as for a
 * wrapped one. The shader must multiply each clip position it derives from
 * the view by `netgl_reproject` before any screen-space offset, and the
 * guest should set it to the identity itself (three: a `Matrix4()` in the
 * material's `uniforms`) so it draws on a host that doesn't reproject; a
 * reprojecting host drops the guest's own sets of it.
 */
export const declaresReprojection = (src: string): boolean => DECLARES.test(src.replace(COMMENTS, ' '))

/**
 * Rewrite a vertex shader so the host can correct its `gl_Position`: the
 * guest's `main` becomes `netgl_main`, and a new `main` calls it and
 * multiplies `gl_Position` by `uniform mat4 netgl_reproject`. GLSL ES 1.00
 * and 3.00 alike; preprocessor lines and declarations are left where they
 * are. Returns null when the source has no `void main()` definition, is
 * already rewritten, or declares the uniform itself (`declaresReprojection`):
 * use it unchanged then.
 */
export const reprojectVertexShader = (src: string): string | null => {
  if (src.includes(NETGL_REPROJECT_UNIFORM)) return null
  if (!MAIN_DEF.test(src.replace(COMMENTS, ' '))) return null
  return src.replace(MAIN_REF, `${NETGL_REPROJECT_MAIN}$1`) + WRAPPER
}

/** The inverse of a column-major 4×4, in doubles, or null if singular. */
export const mat4Invert = (m: ArrayLike<number>): NetGLMat4 | null => {
  // Cofactors (the classic expansion, as gl-matrix's invert).
  const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3]
  const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7]
  const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11]
  const a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15]
  const b00 = a00 * a11 - a01 * a10
  const b01 = a00 * a12 - a02 * a10
  const b02 = a00 * a13 - a03 * a10
  const b03 = a01 * a12 - a02 * a11
  const b04 = a01 * a13 - a03 * a11
  const b05 = a02 * a13 - a03 * a12
  const b06 = a20 * a31 - a21 * a30
  const b07 = a20 * a32 - a22 * a30
  const b08 = a20 * a33 - a23 * a30
  const b09 = a21 * a32 - a22 * a31
  const b10 = a21 * a33 - a23 * a31
  const b11 = a22 * a33 - a23 * a32
  const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06
  if (!det || !Number.isFinite(det)) return null
  const d = 1 / det
  return [
    (a11 * b11 - a12 * b10 + a13 * b09) * d,
    (a02 * b10 - a01 * b11 - a03 * b09) * d,
    (a31 * b05 - a32 * b04 + a33 * b03) * d,
    (a22 * b04 - a21 * b05 - a23 * b03) * d,
    (a12 * b08 - a10 * b11 - a13 * b07) * d,
    (a00 * b11 - a02 * b08 + a03 * b07) * d,
    (a32 * b02 - a30 * b05 - a33 * b01) * d,
    (a20 * b05 - a22 * b02 + a23 * b01) * d,
    (a10 * b10 - a11 * b08 + a13 * b06) * d,
    (a01 * b08 - a00 * b10 - a03 * b06) * d,
    (a30 * b04 - a31 * b02 + a33 * b00) * d,
    (a21 * b02 - a20 * b04 - a23 * b00) * d,
    (a11 * b07 - a10 * b09 - a12 * b06) * d,
    (a00 * b09 - a01 * b07 + a02 * b06) * d,
    (a31 * b01 - a30 * b03 - a32 * b00) * d,
    (a20 * b03 - a21 * b01 + a22 * b00) * d
  ]
}

const IDENTITY: NetGLMat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]

const sameMatrix = (a: ArrayLike<number>, b: ArrayLike<number>): boolean => {
  for (let i = 0; i < 16; i += 1) if (a[i] !== b[i]) return false
  return true
}

/**
 * The correction from the clip space of the view a frame was drawn for to
 * the current view's: C = P_now · V_now · V_from⁻¹ · P_from⁻¹, in doubles.
 * Both views must be in the same frame (the same `frame`, from the same
 * host encoding), so any origin the host folds into both cancels. The
 * rigid part is inverted as a rigid transform (exact), the projection in
 * general. Identity when the two views' matrices are equal; null when the
 * old projection can't be inverted.
 */
export const reprojection = (from: Pick<NetGLLayerView, 'viewMatrix' | 'projectionMatrix'>, to: Pick<NetGLLayerView, 'viewMatrix' | 'projectionMatrix'>): NetGLMat4 | null => {
  if (sameMatrix(from.viewMatrix, to.viewMatrix) && sameMatrix(from.projectionMatrix, to.projectionMatrix)) return [...IDENTITY]
  const pInv = mat4Invert(from.projectionMatrix)
  if (!pInv) return null
  // V_now · V_from⁻¹: the camera's move, rigid, in metres.
  const move = mat4Multiply(to.viewMatrix, mat4InvertRigid(from.viewMatrix))
  return mat4Multiply(mat4Multiply(to.projectionMatrix, move), pInv)
}

/** Whether a correction is the identity (no camera change). */
export const isIdentity = (m: ArrayLike<number>): boolean => sameMatrix(m, IDENTITY)
