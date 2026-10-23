// The per-frame view a host sends an overlay guest: everything the guest
// needs to draw the host's frame in the host's own clip space. This is the
// `layer:view` message of docs/portal-layers.md, in the shape the deck.gl
// adapter (frameworks/luma.ts) and the three.js overlay guest
// (frameworks/three-overlay.ts) agree on.
//
// Conventions:
//   - Matrices are column-major 4×4 arrays of doubles (JS numbers), as
//     WebGL's uniformMatrix4fv and three's Matrix4.fromArray take them.
//   - `viewMatrix` is rigid (rotation + translation, no scale): the
//     layer's frame in metres → eye metres, right-handed, the eye looking
//     down −Z with +Y up.
//   - `projectionMatrix` is the host's own projection with any scale the
//     host folds into its view put back in, so clip = P · V · p for p in
//     the layer's frame. Same clip space as the host means same depth: a
//     guest drawn after the host with depth testing on (and no depth clear)
//     is occluded by the host's geometry.

/** A column-major 4×4 matrix of doubles. */
export type NetGLMat4 = number[]

export type NetGLLayerView = {
  /** The layer's frame. `'ecef'`: Earth-centred, Earth-fixed, metres. */
  frame: 'ecef'
  /** Layer frame (metres) → eye (metres). Rigid. Column-major. */
  viewMatrix: NetGLMat4
  /** Eye (metres) → clip, GL conventions (z in [−w, w]). Column-major. */
  projectionMatrix: NetGLMat4
  /** `[x, y, width, height]` in drawing-buffer pixels, origin bottom-left. */
  viewport: [number, number, number, number]
  /** Drawing-buffer pixels per CSS pixel. */
  pixelRatio: number
  /** The frame's time: Unix milliseconds, UTC. The host owns the clock. */
  timeMs: number
  /**
   * How the host places longitude, latitude and altitude in the frame. A
   * guest that draws geographic positions (ground stations, labels) must
   * use the same model or they land off the host's. deck.gl's globe is a
   * sphere of 6,370,972 m; it is not WGS84.
   */
  earth?: { model: 'sphere'; radius: number }
}

/** Host → guest: draw this view next. */
export type NetGLLayerViewMessage = {
  type: 'layer:view'
  /** Increments per message, so a guest can tell repeats from new views. */
  viewId: number
  view: NetGLLayerView
}

export const isNetGLLayerViewMessage = (msg: unknown): msg is NetGLLayerViewMessage =>
  typeof msg === 'object' &&
  msg !== null &&
  (msg as { type?: unknown }).type === 'layer:view' &&
  typeof (msg as { view?: unknown }).view === 'object'

/** a · b, column-major 4×4, in doubles. */
export const mat4Multiply = (a: ArrayLike<number>, b: ArrayLike<number>): NetGLMat4 => {
  const o = new Array<number>(16)
  for (let c = 0; c < 4; c += 1) {
    for (let r = 0; r < 4; r += 1) {
      let v = 0
      for (let k = 0; k < 4; k += 1) v += a[k * 4 + r] * b[c * 4 + k]
      o[c * 4 + r] = v
    }
  }
  return o
}

/** m · [x, y, z, w], column-major. */
export const mat4TransformVec4 = (m: ArrayLike<number>, v: readonly number[]): [number, number, number, number] => {
  const [x, y, z, w] = v
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12] * w,
    m[1] * x + m[5] * y + m[9] * z + m[13] * w,
    m[2] * x + m[6] * y + m[10] * z + m[14] * w,
    m[3] * x + m[7] * y + m[11] * z + m[15] * w
  ]
}

/** Inverse of a rigid transform (rotation + translation), in doubles. */
export const mat4InvertRigid = (m: ArrayLike<number>): NetGLMat4 => {
  // R^T and −R^T·t.
  const tx = m[12]
  const ty = m[13]
  const tz = m[14]
  return [
    m[0], m[4], m[8], 0,
    m[1], m[5], m[9], 0,
    m[2], m[6], m[10], 0,
    -(m[0] * tx + m[1] * ty + m[2] * tz),
    -(m[4] * tx + m[5] * ty + m[6] * tz),
    -(m[8] * tx + m[9] * ty + m[10] * tz),
    1
  ]
}

/**
 * Longitude and latitude (degrees) and altitude (metres) → ECEF metres on
 * a sphere of `radius` (the view's `earth`), +X at (0°, 0°), +Z north.
 */
export const sphereToEcef = (lng: number, lat: number, alt: number, radius: number): [number, number, number] => {
  const lam = (lng * Math.PI) / 180
  const phi = (lat * Math.PI) / 180
  const r = radius + alt
  return [r * Math.cos(phi) * Math.cos(lam), r * Math.cos(phi) * Math.sin(lam), r * Math.sin(phi)]
}

/** Where an ECEF point lands, in drawing-buffer pixels (bottom-left origin) and NDC depth. */
export const projectToPixels = (view: NetGLLayerView, p: readonly number[]): [number, number, number] => {
  const clip = mat4TransformVec4(view.projectionMatrix, mat4TransformVec4(view.viewMatrix, [p[0], p[1], p[2], 1]))
  const [vx, vy, vw, vh] = view.viewport
  const nx = clip[0] / clip[3]
  const ny = clip[1] / clip[3]
  return [vx + ((nx + 1) / 2) * vw, vy + ((ny + 1) / 2) * vh, clip[2] / clip[3]]
}
