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

// --- The rest of the layer control plane that 0.5 speaks ---------------
// Shapes from RFC 0001 (docs/rfcs/0001-globe-orbit-layers.md, §6.7, §8.1,
// §10.6); only the fields named here are read, the rest pass through.

/**
 * Guest → host: something the guest draws changed although the view
 * didn't (data arrived, a subscription changed). The host sends the current
 * view again, with a new `viewId`, and redraws.
 */
export type NetGLLayerInvalidateMessage = { type: 'layer:invalidate'; reason?: string }

/** Guest → host, repeated until acked: who the guest is and what it can do. */
export type NetGLLayerHelloMessage = {
  type: 'layer:hello'
  /** The layer protocol's version, an integer. */
  version: number
  /** What draws ('three', 'cesium', 'celestiary-orbits'). Older guests call it `kind`. */
  adapter?: string
  capabilities?: Record<string, unknown>
  [field: string]: unknown
}

/** The host's answer to `layer:hello`. Everything but `accepted` is optional (RFC §10.6). */
export type NetGLLayerHelloAnswer = {
  accepted: boolean
  /** Why, when `accepted` is false. */
  reason?: string
  [field: string]: unknown
}

/** Host → guest: the answer to `layer:hello`. */
export type NetGLLayerHelloAckMessage = NetGLLayerHelloAnswer & { type: 'layer:hello-ack' }

/** A named position a layer publishes (RFC §8.1). */
export type NetGLAnchor = {
  /** An anchor URI: 'norad:25544', 'dsn:DSS-43'. */
  id: string
  /** Layer-frame metres at the anchors' time. */
  p?: [number, number, number]
  /** The same, as celestiary's layer mode (#296) names it. */
  ecef?: [number, number, number]
  kind?: string
  name?: string
  [field: string]: unknown
}

/** Guest → host: anchor positions for a view. */
export type NetGLLayerAnchorsMessage = {
  type: 'layer:anchors'
  viewId: number | null
  timeMs: number
  /** The whole subscribed set. */
  anchors?: NetGLAnchor[]
  /** Or a delta: changed and new, and gone. */
  upsert?: NetGLAnchor[]
  remove?: string[]
}

/** Host → guest: which anchors to publish; replaces the default subscription unless `subId` is set. */
export type NetGLLayerAnchorsSubscribeMessage = {
  type: 'layer:anchors-subscribe'
  /** Ids, 'scheme:*', or '*'. */
  patterns: string[]
  subId?: number
  fields?: Array<'v' | 'geo' | 'meta'>
  rate?: 'per-view' | 'on-change' | { hz: number }
}

/** Guest side: tell the host to send the current view again (see `NetGLLayerInvalidateMessage`). */
export const postLayerInvalidate = (transport: { post(msg: unknown): void }, reason?: string): void => {
  const msg: NetGLLayerInvalidateMessage = reason === undefined ? { type: 'layer:invalidate' } : { type: 'layer:invalidate', reason }
  transport.post(msg)
}

const hasType = (msg: unknown, type: string): boolean =>
  typeof msg === 'object' && msg !== null && (msg as { type?: unknown }).type === type

export const isNetGLLayerInvalidateMessage = (msg: unknown): msg is NetGLLayerInvalidateMessage => hasType(msg, 'layer:invalidate')
export const isNetGLLayerHelloMessage = (msg: unknown): msg is NetGLLayerHelloMessage => hasType(msg, 'layer:hello')
export const isNetGLLayerAnchorsMessage = (msg: unknown): msg is NetGLLayerAnchorsMessage => hasType(msg, 'layer:anchors')

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
