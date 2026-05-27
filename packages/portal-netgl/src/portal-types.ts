// Minimal portal type vocabulary, inlined so `@pablo-mayrgundter/portal-netgl`
// can ship as a single npm package with no internal cross-workspace runtime
// deps. Shapes mirror `@portal/portal-core`'s exports — when portal-core gets
// published independently, these can become re-exports.

export type Vec3 = readonly [number, number, number]

export type Mat4 = readonly number[]

/**
 * Where a portal door sits in the scene that contains it. Position is the
 * door's centre; normal points OUT of the door (toward the camera-side that
 * embeds the portal); up + halfWidth/halfHeight define the door rectangle.
 */
export type PortalAnchor = {
  position: Vec3
  normal: Vec3
  up: Vec3
  halfWidth?: number
  halfHeight?: number
}

export type PortalPose = {
  position: Vec3
  forward?: Vec3
  up?: Vec3
}

export type ColorRGB = { r: number; g: number; b: number }

export type Viewport = { width: number; height: number }
