# RFC 0001: globe + orbit layers

| | |
|---|---|
| **Status** | Draft |
| **Date** | 2026-10-23 |
| **Authors** | the portal maintainers; drafted in an agent session from the netmap × celestiary spike |
| **Changes** | [`docs/portal-layers.md`](../portal-layers.md): layer kinds, `layer:hello`, `layer:view`, depth contract, security, lifecycle. [`packages/portal-netgl/DESIGN.md`](../../packages/portal-netgl/DESIGN.md): composition modes, screen policy. |
| **Adds** | the overlay kind; shared depth and extent negotiation; a projection descriptor; the `portal.time/1` and `portal.anchors/1` extensions; anchor URIs; flattened nesting; cross-origin handshake and trust tiers; host adapter restore/invalidate semantics |
| **Related** | the generative-NYC nested portal RFC (in progress, separate session); the luma.gl host adapter PR (in progress) |

## 1. Summary

A globe host (netmap's deck.gl `GlobeView`; later Cesium) draws the
Earth. An orbits guest (celestiary) draws satellites, Starlink, Iridium
and its crosslinks, and the Deep Space Network's links, in the host's
view, depth-tested against the host's globe, from a separate origin.
Links join things across engines: a Starlink satellite in celestiary to
the AS14593 node in netmap.

None of today's composition modes fits. A door needs a door; in place
needs a shape to stencil, and orbits have none. So this RFC adds:

1. an **overlay** layer kind, with no shape or stencil, depth shared with
   the host (§4);
2. a **shared depth** mode, and the far-plane negotiation it needs (§5);
3. a precise **`layer:view`**: frames, units, precision, the Earth model,
   and a projection descriptor for views that aren't a 4×4 (§6);
4. **time** as a negotiated extension, owned by the outermost host (§7);
5. **anchors**: named positions a layer publishes, with a URI scheme that
   composes with layer paths (§8);
6. **nesting** flattened into one host GL context, with a tree of frame
   maps the host computes (§9);
7. **cross-origin iframes** as the first transport, with a handshake,
   trust tiers and capabilities (§10);
8. **host adapter** semantics: restore or invalidate the host's state
   after a replay (§11).

§12 lists what changes in the existing docs. §13 holds the open
questions.

## 2. The use case and its assumptions

```
netmap page (host, https://netmap.example)            celestiary (guest, https://sats.celestiary.example)
──────────────────────────────────────────           ─────────────────────────────────────────────────
deck.gl Deck, _GlobeView                              iframe, cross-origin
  globe, AS nodes, arcs (own data)                    three.js WebGLRenderer on a NetGL recorder
  onAfterRender / NetGL deck layer ──layer:view──►    satellites (SGP4), Starlink, Iridium + links,
  replay into deck's WebGL2 context ◄──netgl:*───     DSN dishes and links (DSN Now feed)
  links layer: norad:… ↔ asn:14593  ◄──layer:anchors─ anchors: norad:, cospar:, dsn:, naif:
  owns the clock     ──────────time in layer:view──►  propagates to the host's time
```

What the spike (netmap `spike/celestiary-layer`, celestiary
`spike/satellites-layer`) established, same page, immediate link:

- **Context and hook.** deck 9.4 hands out its context as `device.gl` in
  `onDeviceInitialized`. Its `onAfterRender` runs synchronously inside
  `deck.redraw`, after the layers draw to the default framebuffer, with
  deck's depth still valid. deck's context has `stencil: false`,
  `antialias: true`, `preserveDrawingBuffer: true`; it sets
  `depthFunc: LEQUAL` and `polygonOffsetFill` at start.
- **Camera.** deck's common space is `k·(e_y, −e_x, e_z)` of ECEF, with
  `k = 256 / 6,370,972 m`, and `clip = P·V·common`. So
  `W = V·(ECEF→common) = s·[R|t]`, one uniform scale `s` times a rigid
  map. The guest gets `view = W/s` (rigid, ECEF metres → eye metres) and
  `projection = P·diag(s,s,s,1)`. Composed in doubles, the guest's
  positions matched deck's `viewport.project` to about 1e-12.
- **Depth.** With deck's exact clip transform, the guest drawing after
  deck with `LEQUAL` and depth writes off, deck's globe occludes the
  satellites behind it. It needed deck's far plane pushed out
  (`farZMultiplier: 4`). netmap's arcs don't write depth, so the
  satellites always draw over them.
- **State.** luma spies on the context's setters, so its cache follows
  the replay. But luma's pipelines set only the parameters they name; the
  guest left `CULL_FACE` on, and deck lost land-polygon triangles.
  `device.pushState()` before the guest and `device.popState()` after made
  deck's next frame bit-identical to a baseline without the guest.
- **three guest.** A host-set camera matrix with `matrixAutoUpdate =
  false` is ignored unless `matrixWorldNeedsUpdate = true` too.
- **Realm collisions.** three's `ColorManagement`, celestiary's
  `sceneReferredUniform` and Cesium's `Ellipsoid.default` are library
  globals. Two engines in one realm collide; iframes don't.

Assumptions this RFC makes. Each is a seam another RFC can replace.

- **A1. WebGL2, one host context.** Every guest's GL replays into the
  root host's context (`DESIGN.md`, [Layers](../../packages/portal-netgl/DESIGN.md#layers)).
  WebGPU is out of scope.
- **A2. Earth-centred content.** The layer frame is ECEF of date (§6.1).
  Other frames (ENU at a site, heliocentric, a building's local frame) use
  the same machinery (§9), but this RFC only pins ECEF.
- **A3. Trusted-origin guests first.** The guests are the maintainer's
  own deployments on separate origins. Untrusted GL is specified as a
  tier (§10.5) but not solved.
- **A4. One clock.** One simulation time per page, owned by the root
  (§7).
- **A5. Points and lines.** The guest's content is small (thousands of
  points, lines) and mostly unlit. Lighting and colour follow
  `portal-layers.md` [Contracts](../portal-layers.md#contracts)
  unchanged; this RFC doesn't touch colour.

## 3. Terms

| Term | Meaning |
|---|---|
| root, host | the page that owns the GL context, the canvas and the clock |
| layer | one guest composited into a host (`portal-layers.md` [Concepts](../portal-layers.md#concepts)) |
| layer path | the layer's name in the host's layer tree, assigned by its parent: `/celestiary`, `/globe/nyc` (§8.3) |
| layer frame | the coordinate frame a layer's view and anchors are expressed in (§6.1) |
| frame map | the rigid-plus-scale map from a layer frame to its parent's (§9) |
| anchor | a named position a layer publishes (§8) |
| adapter | the per-framework code on either side (`portal-layers.md` [Who does what](../portal-layers.md#who-does-what)) |

## 4. Layer kinds

Today there are two (`DESIGN.md`, [Composition modes](../../packages/portal-netgl/DESIGN.md#composition-modes)).
This RFC adds a third.

| Kind | Shape | Stencil | Depth modes | Camera | Example |
|---|---|---|---|---|---|
| `door` | `quad` | the door's mask | `save-restore`, `guest-private` | carried through the door (`couplePoseAcrossPortal`) | the NetGL portal demo |
| `in-place` | `ellipsoid`, `mesh` | a shell, depth-tested | `save-restore` (+ proxy depth), `guest-private` | the host's view, in the layer frame | Cesium's Earth in celestiary |
| `overlay` (new) | none | none | `shared`, `none` | the host's view, in the layer frame | celestiary's satellites over deck's globe |

An **overlay** layer:

- has no shape, so it needs no stencil buffer. It works on deck's
  default context (`stencil: false`), where `in-place` doesn't.
- draws with the host's exact projection, into the host's target, after
  the host's own draws (§5.4).
- in `shared` depth, tests against the host's depth: the globe hides the
  satellites behind it. In `none`, it draws over everything, like a HUD
  in world space.
- has no host rendering to crossfade with, so it fades by an opacity the
  host sends (`view.opacity`, §6), which the guest multiplies into its
  premultiplied output.
- can paint anywhere on the screen. That's a trust question, §10.5.

The kind is declared in `layer:hello` (`kinds`, the ones the guest can
do) and fixed in `layer:hello-ack` (`kind`).

```ts
type LayerKind = 'door' | 'in-place' | 'overlay'
```

## 5. The depth contract

`portal-layers.md` [Contracts](../portal-layers.md#contracts) has two
depth strategies and says "guest depth never has to agree with the
host's". This RFC keeps both, adds two, and makes agreement a property of
one mode only.

| Mode | Host depth after the guest | Guest tests against host | Agreement needed | Kinds |
|---|---|---|---|---|
| `save-restore` (0.1) | restored from a twin, plus proxy depth | no (stencil decides) | none | door, in-place |
| `guest-private` (roadmap) | untouched | no | none | door, in-place |
| `shared` (new) | valid, plus the guest's writes if granted | yes | exact projection, clip and depth conventions | overlay (in-place later) |
| `none` (new) | untouched | no | none | overlay |

### 5.1 Shared

The guest renders with the host's projection, unmodified, into the host's
depth buffer. What both sides must agree on, fixed by the host in
`hello-ack`:

```ts
interface SharedDepth {
  mode: 'shared'
  func: 'less' | 'lequal'          // the host's; the guest tests with it (deck: lequal)
  write: boolean                   // granted: may the guest write depth? (spike: false)
  clip: {
    z: 'neg-one-to-one' | 'zero-to-one'  // EXT_clip_control; WebGL's default is neg-one-to-one
    reversed: boolean              // reverse-Z
  }
  bits: 16 | 24 | 32
  logarithmic: false               // shared needs the projection's own depth; see below
}
```

Rules:

- **No depth clears on the screen.** The screen policy drops the guest's
  colour, depth and stencil clears for screen draws (`clear: 'none'`,
  §12). Its render-target passes keep their own clears.
- **No projection changes.** No near or far of the guest's own, no TAA
  jitter, no multi-frustum, no logarithmic depth written from the
  fragment shader. A Cesium *guest* in shared mode would need one frustum
  and `logarithmicDepthBuffer: false`; until then Cesium guests stay
  `in-place` with `save-restore`.
- **Depth writes are a grant.** With `write: true` the guest's depth is
  there for later layers, links and host post-passes. With `write: false`
  (the spike) the guest only tests. Points and lines don't need to occlude
  each other across engines, so `false` is the default.
- **Hosts that can't share.** A host whose depth isn't the depth of one
  projection matrix (Cesium's log depth over several frusta) offers no
  `shared`. A `shared-texture` mode (the host's depth as a texture plus
  its encoding, tested in the guest's shader) would cover it, and is left
  to open question 2.

### 5.2 Save-restore and guest-private

Unchanged: `portal-layers.md` [Contracts](../portal-layers.md#contracts)
and DESIGN.md [Open problems](../../packages/portal-netgl/DESIGN.md#open-problems-the-next-pr)
("Guest depth vs host depth").

### 5.3 Extent and the far plane

A guest's content can lie far outside what the host would put in its
clip range: deck sizes its far plane to the globe's far side, and GEO is
6.6 Earth radii out. So the guest declares where its content is, and the
host sizes its clip range to include it.

```ts
interface LayerExtent {
  frame: FrameId                          // usually the layer frame
  sphere: { center: Vec3; radius: number } // metres; bounds everything the layer draws
  beyond?: 'clip' | 'clamp-to-far'        // what the guest does with content past the granted far
}
```

- It's sent in `layer:hello` and again as `layer:extent` when it changes
  (an overlay switched on or off, a DSN link to Voyager appearing).
  Celestiary's satellites: centre 0, radius 4.3e7 m (GEO with a margin).
- The host sizes its far plane to cover every shared layer's sphere that
  intersects the frustum, `far ≥ |eye − centre| + radius`, up to a limit
  of its own. Each `layer:view` carries the resulting `clipRange` in
  metres (§6), so the guest knows what it got.
- Pushing the far plane out costs little: perspective depth precision is
  set by the near plane (Δz ≈ z²/(near·2^bits), `portal-layers.md`
  [Depth and overlays](../portal-layers.md#gotchas-that-stay-in-the-app)).
  The near plane is never moved for a guest.
- **Beyond the far plane.** A DSN link to Voyager 1 ends about 2.5e13 m
  away; no depth buffer spans that. With `beyond: 'clamp-to-far'` the
  guest clamps such vertices to just inside the far plane
  (`clip.z = clip.w·(1 − ε)`), so the line is drawn toward the right
  direction, behind everything, as sky. `clip` lets the GPU clip it.

### 5.4 Interleaving limits

- **One insertion point per layer per frame.** The guest draws once,
  after the host's draws (deck's `onAfterRender`), or at one place in the
  host's draw order if the adapter has that (§11: deck can run the guest
  from a custom layer's `draw`, in deck's layer order).
- **Host content that writes no depth can't occlude the guest.** netmap's
  arcs write none, so satellites draw over them. The fix is the host's:
  write depth for the arcs, or draw them after the guest.
- **No order-independent blending across engines.** A guest's
  translucent draws blend over all the host content drawn before them,
  whatever its depth; host translucent content drawn later blends over
  the guest. That's correct only when the translucent parts don't
  overlap in depth.
- **Host draws after the guest** (labels, UI) need a host pass after the
  insertion point. deck's `onAfterRender` is the last thing in its
  frame; the layer-order hook (§11) is the fix.
- **Phases (later).** An adapter may offer several insertion points per
  frame (`'opaque' | 'translucent' | 'overlay'`), calling the guest once
  per phase with `view.phase`. Not in this RFC's minimum; open question
  13.

## 6. The view message

`portal-layers.md` [Protocol](../portal-layers.md#protocol-control-plane)
lists `layer:view` as "view id, camera, projection, light, time,
viewport, exposure". This makes it precise.

```ts
type Vec3 = [number, number, number]
type Mat4 = Float64Array | number[]          // 16, column-major, doubles on the wire

interface LayerView {
  type: 'layer:view'
  viewId: number                             // increasing; frames and anchors are tagged with it
  phase?: 'opaque' | 'translucent' | 'overlay' // only if negotiated (§5.4)

  // Pose
  view: Mat4      // rigid: layer-frame metres → eye metres. Right-handed; the eye looks down −Z, +Y up.
  eye: Vec3       // the eye in layer-frame metres, = inverse(view)·(0,0,0), in doubles: for RTE (§6.2)

  // Projection
  projection: Projection                    // §6.4
  clipRange: { near: number; far: number }  // metres along −Z of the eye: what the projection clips to

  // Raster
  viewport: [number, number, number, number] // [x, y, w, h] in drawing-buffer pixels, GL origin (bottom-left)
  pixelRatio: number                         // drawing-buffer pixels per CSS pixel

  // Appearance (portal-layers 0.1, unchanged)
  light?: { direction: Vec3; intensity?: number } // layer frame, unit vector toward the light
  exposure?: number
  opacity?: number                           // 0..1, overlay fades (§4); default 1

  // Extensions (§7, §8), present only if negotiated
  time?: LayerTime
}
```

### 6.1 Frames and units

- **Metres**, always. A host whose world isn't in metres (deck's common
  units) folds its scale into the projection, as the spike did:
  `view = W/s`, `projection.matrix = P·diag(s, s, s, 1)`. The guest never
  sees the host's units. This changes nothing for celestiary, which is in
  metres already (`DESIGN.md`, [Celestiary × Cesium](../../packages/portal-netgl/DESIGN.md#celestiary--cesium-the-plan)).
- **The view is rigid.** Its upper 3×3 is a rotation (determinant +1,
  checked as `portal-layers.md` requires of frame maps). All scale and
  shear live in the projection.
- **Frame ids.** This RFC defines one; §9 and the NYC RFC add others.

```ts
type FrameId = 'ecef' | string   // others registered by later RFCs, e.g. 'enu', 'icrf'

interface FrameDescriptor {      // fixed in hello-ack
  id: 'ecef'
  // ECEF of date: origin the Earth's centre, +Z the rotation axis of date,
  // +X the Greenwich meridian, metres. It turns with the Earth; the host's
  // clock (§7) says by how much. Polar motion (≤ ~15 m at the surface) is ignored.
  earth: EarthModel
}
```

Inertial positions (celestiary's satellites are in TEME) are the guest's
to turn into ECEF, by Earth's rotation at the view's time. That rotation
needs UT1, which the host supplies (§7.1). Using UTC for UT1 puts things
off by up to 0.9 s of Earth's turn: 420 m at the surface, 2.8 km at GEO.

### 6.2 Precision

- **Compose in doubles.** The host computes `view`, `eye` and
  `projection` in float64 and sends them as float64 (structured clone and
  `Float64Array` keep them). The spike's alignment, 1e-12, depends on it.
- **float32 on the GPU loses metres.** ECEF coordinates as float32 are
  good to 0.5 m at the surface and LEO and 4 m at GEO (the ULP of
  2²²–2²³ and 2²⁵–2²⁶ m). That's invisible from orbit and visible near
  the ground: jitter in pixels ≈ ULP / distance × focal length in pixels,
  so 0.5 m at 100 m with a 1000 px focal length is 5 px.
- **So send the eye, and let the guest go relative to it.** Two ways,
  the guest's choice:
  - *RTC* (relative to centre): the guest gives each object or tile an
    origin near its content and composes `view · model` in doubles on the
    CPU before uploading float32 (what three already does per object;
    Cesium's `RTC_CENTER`).
  - *RTE* (relative to eye): positions split into high and low float32
    parts, with `eye` split the same way, subtracted in the shader
    (Cesium's `EncodedCartesian3`, deck's fp64 and `coordinateOrigin`).
    The rotation-only part of `view` (its 3×3) goes with it.
- A guest whose content is far from the eye (satellites seen from deck's
  usual zoom) can skip both. A guest that draws near the ground (DSN
  dishes close up, the NYC session's buildings) can't.

### 6.3 The Earth model

deck's globe is a sphere of 6,370,972 m; Cesium uses WGS84
(6,378,137 m at the equator, 6,356,752 m at the poles); celestiary's
bodies are spheres. And deck places a latitude and longitude on its sphere
as if the geodetic latitude were spherical. A geodetic latitude and the
geocentric direction of the same point differ by up to 0.19°, about
21 km on the ground.

```ts
type EarthModel =
  | { kind: 'wgs84' }                                   // a = 6378137, f = 1/298.257223563
  | { kind: 'sphere'; radius: number;
      latitude: 'geodetic-as-spherical' | 'geocentric' } // deck, MapLibre globes: geodetic-as-spherical
  | { kind: 'ellipsoid'; radii: Vec3 }
```

The host declares its model in `hello-ack`, and its **surface mapping**
follows from it: where the host draws a point given as geodetic
(lat, lon, h) on WGS84. For `geodetic-as-spherical`, that's
`(radius + h)·(cos lat cos lon, cos lat sin lon, sin lat)`.

- **Surface-tied positions MUST go through the host's mapping.** DSN
  dishes, ground stations, a link's ground end: the guest converts its
  ECEF (WGS84) to geodetic, then places it by the host's mapping.
  Otherwise Goldstone sits up to 21 km from where netmap draws Goldstone.
  This is the same rule as `DESIGN.md`'s "Sphere vs ellipsoid" lesson
  (keep the height over each shape), applied per point instead of to the
  camera.
- **Orbital positions SHOULD too, when the host isn't WGS84.** A
  satellite directly over JFK should be drawn over the host's JFK, so the
  guest warps it the same way: ECEF → geodetic (lat, lon, h) → the host's
  mapping. The error of not warping is up to ~21 km sideways and the
  difference in radii (−7 km to +14 km for deck's sphere), well under a
  pixel at globe zoom. A guest that skips it says so in `hello`
  (`warp: false`). Open question 6.
- Anchors (§8) are published at the warped positions, where the layer
  draws them, with the physical position in `geo` when they differ.

### 6.4 Projections that aren't a 4×4

netmap's 2D map is MapLibre with a deck overlay in Web Mercator. Its view
from Mercator world coordinates to clip *is* a 4×4, but the map from ECEF
to Mercator isn't affine, so no 4×4 takes the guest's ECEF to clip. The
projection is a descriptor, and the guest declares the kinds it can do.

```ts
type Projection =
  | { kind: 'matrix'; matrix: Mat4 }  // eye metres → clip, applied after `view`. Perspective or ortho.
  | WebMercatorProjection
  // later: 'equirectangular', 'shader' (a host-supplied GLSL projection prelude)

interface WebMercatorProjection {
  kind: 'webMercator'
  // The guest computes, per vertex: layer frame (ECEF) → geodetic (lat, lon, h) on WGS84
  // → Mercator world (x, y, z) → clip by `worldToClip`. `view` and `eye` don't apply.
  worldSize: number            // Mercator world units for 360° of longitude (deck: 512·2^zoom; or 1)
  worldToClip: Mat4            // the host's view-projection in Mercator world units
  height: { unitsPerMetre: 'at-vertex-latitude' | 'at-view-centre'; centreLat?: number }
  maxLatitude: number          // 85.0511…; beyond it the guest drops or clamps
  wrap: { centreLon: number; copies: boolean } // antimeridian: draw in the copy nearest centreLon, or in every copy
}
```

- **Guests do the non-affine part in their vertex shader** (or on the CPU
  for small sets). That's a real cost for a three guest: its materials
  need a projection chunk. So `webMercator` support is optional.
- **A host whose projection a guest can't do** either refuses the layer,
  or downgrades it to *anchors only*: the guest renders nothing and the
  host draws the anchors it subscribes to (§8) as its own markers. For
  satellites over a 2D map that's most of the value anyway.
- **Shared depth with a Mercator host** works only if the host's depth is
  `worldToClip`'s. deck's non-interleaved overlay has its own canvas and
  depth, separate from MapLibre's: the guest joins deck's context, and
  can't test against MapLibre's terrain.
- MapLibre 5's custom layers solve the same problem by handing the layer
  a projection prelude to include in its shaders; that's the `shader`
  kind, left for later.

### 6.5 Viewport and pixel ratio

`viewport` is in drawing-buffer pixels, the GL viewport the guest's
screen draws get. `pixelRatio` turns CSS-pixel sizes (point sizes, line
widths) into drawing-buffer pixels. The guest sizes its shadow canvas to
the viewport's `w × h` (`setSize(w, h, false)`, never touching
`canvas.style`; DESIGN.md [Findings from celestiary integration](../../packages/portal-netgl/DESIGN.md#findings-from-celestiary-integration)).

## 7. Time: the `portal.time/1` extension

The outermost host owns the clock. Every layer, at every nesting level,
draws the root's time. Guests never advance time on their own.

### 7.1 The time a view carries

```ts
interface LayerTime {
  // The instant the frame shows
  unixMs: number                // POSIX ms, UTC (no leap seconds), float64: 0.24 µs resolution in 2026
  jd?: [number, number]         // two-part Julian date in `scale` (SOFA style: any split, the sum is the date)
  scale?: 'UTC' | 'TAI' | 'TT' | 'TDB' | 'UT1' // of jd; default 'UTC'

  // So every layer converts scales the same way
  taiMinusUtc: number           // s; 37 since 2017
  ut1MinusUtc?: number          // s, |·| < 0.9; absent means 0

  // How it's moving
  rate: number                  // simulation s per wall s; negative runs backward
  paused: boolean               // rate is kept, but time doesn't advance
  scrubbing: boolean            // the user is dragging time: skip fetches and expensive refreshes
  live: boolean                 // the host says time tracks the wall clock now (rate 1, near now)
  epoch: number                 // bumps on a discontinuity (a jump, a scrub, a sign change of rate):
                                // drop interpolation state, extrapolations and caches keyed to time
  elapsedMs: number             // wall ms since the layer started, monotonic, runs while paused:
                                // for animation that isn't simulation (pulses, fades)
}
```

Why these:

- **`unixMs` is enough for this use case.** A float64 of Unix ms
  resolves 0.24 µs now; a Starlink satellite moves 2 mm in that. A single
  double Julian date resolves only 40 µs (0.3 m at 7.6 km/s). `jd` in two
  parts is for guests that work in TT or TDB (ephemerides) and want the
  host's exact value rather than converting.
- **Scale offsets come from the host**, so two guests converting UTC to
  TT (69.184 s apart today) or to UT1 agree. A guest with its own
  leap-second table or Earth-orientation data uses the host's values when
  they're present.
- **`epoch`** lets a guest that extrapolates (§8.4) or caches propagated
  slices (celestiary's networks refresh satellites in slices) know when
  the past no longer predicts the present.
- **`elapsedMs`** keeps animation off the simulation clock: a paused
  simulation still pulses its selected satellite.

### 7.2 How it travels

- **Negotiated, then per frame.** The guest asks for `portal.time/1` in
  `layer:hello` (`ext`); the host grants it in `hello-ack`, with the scale
  it will fill `jd` in. Then every `layer:view` carries `time`.
- **Per frame, inside the view, not a separate message.** It's a dozen
  numbers. Tying it to `viewId` means a frame's time and pose can't come
  apart: a satellite moves 127 m in a 60 Hz frame, so a one-frame
  mismatch between time and pose shows as jitter against the globe.
- **Hosts that render on demand** must redraw while time runs: deck
  renders only when something changes, so its adapter keeps redrawing
  while `!paused && rate !== 0` (deck's `_animate`, or a requestAnimationFrame
  calling `deck.redraw()`).

### 7.3 Guests with clocks of their own

Some guest data is only valid at some times. DSN Now says what the dishes
are doing now; celestiary draws its links only within an hour of the
feed's time, and dishes alone at other dates.

- The guest still draws the host's time, and does what it would at that
  time: no links far from now.
- It reports when its data is valid, so the host can say so in its UI:

```ts
// in layer:status
interface TimeCoverage {
  timeCoverage:
    | { kind: 'always' }
    | { kind: 'range'; fromMs: number; toMs: number }       // e.g. a TLE snapshot's useful span
    | { kind: 'live'; windowMs: number; feedMs: number }   // DSN: valid within 1 h of the feed's time
}
```

- It may ask the host to change time (a "jump to now" control inside the
  guest), and the host decides:

```ts
interface LayerTimeRequest {  // guest → host
  type: 'layer:time-request'
  unixMs?: number
  rate?: number
  paused?: boolean
  reason: string              // shown or logged by the host
}
```

- Its wall clock (`Date.now()`) is for its own fetching and polling, never
  for what it draws.

## 8. Anchors: the `portal.anchors/1` extension

A link between engines (a Starlink satellite in celestiary to AS14593's
node in netmap) needs both ends' positions in one frame. Scene graphs
stay private (README, design rule 2), so layers publish named positions
instead: anchors. The host keeps an index of them, and a links layer, the
host or another layer subscribes to the ones it needs.

### 8.1 Messages

```ts
type AnchorId = string        // an anchor URI, §8.2: 'norad:25544'
type AnchorRef = string       // an AnchorId, or one qualified by a layer path, §8.3

interface Anchor {
  id: AnchorId
  aliases?: AnchorId[]        // other names of the same thing: 'cospar:1998-067A'
  p: Vec3                     // layer-frame metres, at the view's time, where the layer draws it
  v?: Vec3                    // m/s in the layer frame (ECEF: relative to the turning Earth)
  placement: 'physical' | 'schematic'
                              // schematic: a layout position, not a place (netmap's cyber and hybrid
                              // layouts, its altitude-as-hierarchy on the globe)
  geo?: [number, number, number] // WGS84 lat°, lon°, h m of the thing itself, when that isn't p
  radius?: number             // m, drawn size: for picking, and to end lines at the edge
  drawn: boolean              // the layer draws it now (shown, not culled)
  label?: string
  meta?: Record<string, string | number | boolean> // small and public (§8.6)
}

interface LayerAnchors {      // publisher → host
  type: 'layer:anchors'
  viewId: number              // the view, so the time, the positions are for
  full: boolean               // true: replaces the set; false: a delta
  upsert: Anchor[]
  remove?: AnchorId[]
}

// For big sets (Starlink's ~10,000): the ids once, then positions as typed arrays
interface LayerAnchorTable { type: 'layer:anchor-table'; tableId: number; ids: AnchorId[]; placement: 'physical' | 'schematic' }
interface LayerAnchorPositions {
  type: 'layer:anchor-positions'
  tableId: number
  viewId: number
  p: Float64Array             // 3 per id, in table order; NaN for "not drawn"
  v?: Float64Array
}

interface LayerAnchorSubscribe { // host → publisher (on its own behalf or a subscriber's)
  type: 'layer:anchors-subscribe'
  subId: number
  match: string[]             // ids, or a namespace with '*': 'norad:44713', 'dsn:*'
  fields?: Array<'v' | 'geo' | 'meta'>
  rate: 'per-view' | 'on-change' | { hz: number }
}
interface LayerAnchorUnsubscribe { type: 'layer:anchors-unsubscribe'; subId: number }
```

- A publisher advertises its namespaces and rough counts in `hello`
  (`ext['portal.anchors/1'].publish`) and publishes only what's
  subscribed. Nothing flows by default.
- The host is a publisher too: its own anchors (netmap's `asn:14593`) go
  in the same index at layer path `/`.

### 8.2 Anchor URIs

An anchor id names the thing, not the layer that draws it. It's either a
registered URI (`geo:`, `https:`, `urn:`) or a compact `prefix:local`
form (a CURIE, W3C) whose prefix this RFC series registers. Prefixes
are lowercase; each local part has one canonical spelling, so ids
compare as strings.

| Prefix | Identifies | Local part, canonical | Example | Source |
|---|---|---|---|---|
| `norad` | an Earth-orbiting object | the satellite catalogue number, decimal, no leading zeros (Alpha-5 spellings converted to the integer) | `norad:25544` (the ISS) | 18 SDS catalogue, via CelesTrak |
| `cospar` | the same, by launch | the international designator, `YYYY-NNNP[PP]`, upper case | `cospar:1998-067A` | COSPAR |
| `naif` | a solar-system body or spacecraft | the NAIF SPICE integer id | `naif:-31` (Voyager 1), `naif:399` (Earth) | JPL NAIF |
| `dsn` | a DSN antenna or complex | `DSS-nn`, or the complex's code | `dsn:DSS-43`, `dsn:CDSCC` | NASA DSN |
| `dsn-sc` | a spacecraft as DSN Now names it | DSN Now's code, upper case | `dsn-sc:VGR1` (alias of `naif:-31`) | DSN Now `config.xml` |
| `asn` | an autonomous system | the AS number, decimal (asplain, RFC 5396) | `asn:14593` (SpaceX's Starlink) | IANA and the RIRs |
| `iata` | an airport | the three-letter code, upper case | `iata:JFK` | IATA |
| `icao` | an airport | the four-letter code, upper case | `icao:KJFK` | ICAO |
| `geo` | a place | RFC 5870, as is (an IANA-registered scheme) | `geo:40.6413,-73.7781,4` | — |
| `local` | a layer's own thing, with no public name | anything; meaningful only qualified by a layer path (§8.3) | `portal:/celestiary#local:selected` | the layer |

Notes:

- **Why `naif:` and `dsn-sc:`, not `spacecraft:`.** A prefix should name
  an authority whose ids are stable, not a category. NAIF ids are what
  ephemerides use; DSN Now's codes are what its feed carries. A layer
  that knows both publishes one as an alias of the other.
- **Not IANA-registered.** `norad:`, `asn:` and the rest are prefixes in
  this series' registry, not URI schemes. Registering them is possible
  later (open question 9). A layer with ids of its own that aren't here
  uses an `https:` URL it controls or `local:`, and doesn't invent a
  prefix.
- **Prior art.**
  - RFC 5870 `geo:`: a real scheme for places, with a CRS parameter.
  - IVOA identifiers (`ivo://authority/path`): an authority-first naming
    of resources and services (not of sky objects), the model for a
    registry of authorities.
  - CURIEs: prefix-and-local, expanded by a declared prefix map.
  - glTF's JSON pointers (`/nodes/3/translation`, `KHR_animation_pointer`)
    and USD prim paths (`/World/Earth/Sats`): addressing inside one
    scene, the model for layer paths.
  - URL fragments: addressing inside one resource.

### 8.3 Composing with layer paths

A bare id means "any layer that publishes it". A qualified reference
picks one layer:

```
anchor-ref = anchor-id
           / "portal:" layer-path "#" anchor-id      ; that layer's anchor
layer-path = "/" / 1*( "/" segment )                 ; "/" is the root host itself
segment    = 1*( unreserved / pct-encoded )          ; RFC 3986; names assigned by the parent
```

Examples:

- `norad:44713`: Starlink-1007, from whichever layer has it.
- `portal:/celestiary#norad:44713`: from celestiary's layer.
- `portal:/#asn:14593`: netmap's own node (the root's).
- `portal:/globe/nyc#https://nyc.example/id/bldg/1`: a nested layer's
  anchor with a URL id (the NYC RFC's to define).

Rules:

- The fragment is the anchor id as is. RFC 3986 allows `:`, `/`, `,`,
  `;`, `=` and `@` in a fragment, so `norad:`, `geo:` and most URLs need no
  escaping. A `#`, `%`, space or non-ASCII character in an id is
  percent-encoded there.
- Path segments are names the parent gives its children (`createLayer`'s
  `name`, as today), not the guest's origin. A guest learns its own path
  in `hello-ack` (`layerPath`) and nothing else about the tree unless
  granted.
- `portal:` has no authority part: a layer path means something only
  inside one page's tree. Whether a cross-page form
  (`portal://<host-origin>/…`, for permalinks and sharing) is needed is
  open question 8.

### 8.4 Resolution and links

- **The index.** The host keeps `id → [{layerPath, anchor}]`, aliases
  included. A bare reference resolving to several layers is ambiguous;
  the host picks by the subscriber's `prefer` list of paths, else the
  deepest layer, and reports the ambiguity once.
- **Into one frame.** The host maps an anchor from its layer frame to
  any other by the frame maps (§9), in doubles.
- **Links.** The host draws them by default: a built-in links layer
  resolves each end every frame, maps both into the host's frame, and
  draws the line relative to the eye, in shared depth. A guest can be the
  links layer instead, if it's granted subscriptions to other layers'
  anchors (§8.6).

```ts
interface LinkSpec {
  from: AnchorRef        // 'portal:/celestiary#norad:44713'
  to: AnchorRef          // 'portal:/#asn:14593'
  style?: { color?: string; widthPx?: number; dash?: number[] }
}
```

- **Time alignment.** Positions are tagged with the `viewId`, so their
  time. With an immediate link the guest's anchors for view N arrive
  before the host draws links for view N. Across an async transport they
  arrive a frame late; the host extrapolates `p + v·Δt` to the current
  view's time, and drops the extrapolation when `time.epoch` changes.
- **Schematic ends.** A link to netmap's node in its cyber layout joins
  where the node is drawn, which is what the user sees, not where the AS
  is. `geo` carries the real place for a host that wants it.

### 8.5 Collisions

- **The same id from two layers** (celestiary and a Cesium layer both
  drawing the ISS) is legitimate. Qualified references choose.
- **One layer publishing an id twice** in a set: the last wins, and the
  host warns.
- **Two ids claiming the same alias:** the host ignores the alias and
  warns.
- **Identity is a claim.** Nothing authenticates that a layer's
  `asn:14593` is AS14593. The host grants each layer the namespaces it
  may publish (`ext['portal.anchors/1'].publish` in `hello-ack`); netmap
  keeps `asn:` to itself, and grants celestiary `norad`, `cospar`, `naif`,
  `dsn` and `dsn-sc`.

### 8.6 Privacy: what flows where

| What | From → to | Default |
|---|---|---|
| The view: pose, viewport, pixel ratio | host → guest | always; it's what a guest needs to draw. It tells the guest where the user is looking, and the viewport size and pixel ratio are fingerprinting bits. |
| Time | host → guest | only with `portal.time/1` |
| A guest's anchors | guest → host | only what's subscribed and in the namespaces it advertised |
| The host's or another guest's anchors | → a guest | only with an `anchors:subscribe` grant, and only for namespaces whose publisher allows sharing (`share: 'host' \| 'layers'`, `'host'` by default) |
| The user's own location (a `geo:` from geolocation) | anywhere | never without the host asking the user |
| `meta` | publisher → subscribers | small, public facts (a name, an operator); never personal data |

## 9. Nesting

The decision: flatten. However deep the tree of portals is, every guest
replays into the one root GL context, and the root computes a tree of
frame maps. Each level is a frame with its own origin near its content,
an extent, and a map to its parent ("it's all octrees all the way down").

This differs from frame-RPC's recursive portals
([frame-rpc-portals.md](../frame-rpc-portals.md)), where each level
composites its child's bitmap before its parent reads it. NetGL can't
nest that way without a context per level; flattening keeps one context,
one depth buffer and one place to make trust decisions.

### 9.1 The tree

```ts
interface FrameMap {
  parent: string                 // layer path of the parent; '/' for the root
  toParent: Mat4                 // doubles: this layer's frame → its parent's; rigid × uniform scale
  scale?: number                 // that uniform scale, stated (1 for metres to metres)
  time?: { offsetMs: number; rate: number } // default identity; open question 12
}

interface LayerChildren {        // guest → host: an intermediate layer declares its own children
  type: 'layer:children'
  children: Array<{
    name: string                 // its path segment under this layer
    url: string                  // the child guest's entry point
    origin: string               // the origin it must handshake from
    kind: LayerKind
    frame: FrameDescriptor | FrameId
    toParent: Mat4               // in this layer's frame; resent in layer:frame-maps when it moves
    extent: LayerExtent
  }>
}
interface LayerFrameMaps { type: 'layer:frame-maps'; viewId: number; maps: Record<string, Mat4> } // moving children
```

- **The root creates every iframe.** An intermediate guest (the NYC
  portal, say) asks for children with `layer:children`; the root applies
  its own allow-list and capability policy to each, creates the iframe as
  a sibling of the others, and connects it to its own replay. GL never
  passes through an intermediate guest. A child's grants can't exceed its
  parent's.
- **The parent supplies the frame map**, at creation and, if the child
  moves, per view (`layer:frame-maps`, tagged with `viewId`).
- **The root composes them in doubles each frame** (a few 4×4 products
  per level).

### 9.2 Precision at each level

- Each layer's view is the root's view mapped into that layer's frame,
  and its `eye` is in that frame (§6.2). float32 only ever sees numbers
  relative to an origin near the content.
- **Compose relative to the eye's level, not the root's absolute
  coordinates.** Doubles hold 4 mm at 2.5e13 m (Voyager) but 130 km at
  1e21 m (across a galaxy). So the eye's position in a layer's frame is computed
  by walking the tree from the frame the eye is in, not by going through
  the root's world. That keeps each level's numbers small whatever the
  tree spans.

### 9.3 Depth, stencil and order through levels

- **Shared depth is transitive** only because the root issues every
  layer's projection: all levels draw with the same clip transform. A
  layer can't sub-delegate a projection of its own.
- **Stencil refs are allocated by the root** across the tree, since
  every stencilled layer at every level shares one 8-bit stencil buffer.
  Overlays use none.
- **Order:** stencilled layers (`door`, `in-place`) far to near, as
  today (DESIGN.md, "One widget, one link per body, drawn far to near");
  then `shared` overlays in tree order; then `none` overlays; then links
  and host UI.
- **`save-restore` costs a depth blit per layer**, at every level. Deep
  trees want `guest-private` or `shared`.

### 9.4 Time and anchors through levels

- Time is the root's at every level, mapped by an edge's `time` if one is
  ever allowed (open question 12).
- Anchors are published in each layer's own frame and indexed by layer
  path; the root maps them into any subscriber's frame. A qualified
  reference names the full path (`portal:/globe/nyc#…`).

### 9.5 Budgets and culling

- **Budgets per subtree:** call count, upload bytes and live objects per
  frame, and GPU time where timer queries exist. A child's budget is
  carved out of its parent's.
- **Culling by extent:** each layer's extent, mapped into the root,
  gives a bounding sphere. Outside the frustum, or under a minimum pixel
  radius, the whole subtree goes to `hidden` (`layer:visibility`,
  `portal-layers.md` [Lifecycle](../portal-layers.md#lifecycle)) and
  isn't rendered or sent views.

### 9.6 Seams for the NYC RFC

What this RFC leaves to the nested-portal RFC: frame ids beyond `ecef`
(an `enu` frame at a geodetic origin is the obvious first), traversal
(the eye moving into a child's frame and which level then owns the
camera; the root keeps the clock either way), doors inside overlays,
its own anchor namespaces, and whether `layer:children` is the right
shape.

## 10. Transports and trust: cross-origin iframes first

The decision: guests are iframes from their own origins. DESIGN.md's
lesson "Same page beats an iframe for in-place composition" still holds:
an iframe costs about a frame of lag. Cross-origin is chosen for
isolation, separate deploys and credentials that stay on their own origin
(`portal-layers.md` [Security](../portal-layers.md#security-and-isolation)),
and because engines' library globals collide in one realm (§2). `inPage`
stays the binding for trusted, bundled guests.

### 10.1 The iframe

```html
<iframe src="https://sats.celestiary.example/layer.html"
        sandbox="allow-scripts allow-same-origin"
        allow=""
        referrerpolicy="strict-origin"
        style="position:fixed; inset:0; width:100%; height:100%; opacity:0; pointer-events:none">
</iframe>
```

- **Full-viewport and invisible**, per DESIGN.md's finding that a 1×1
  iframe throttles or kills a real app's loop.
- **`allow-same-origin` keeps the guest's own origin.** It's
  cross-origin to the host, so this grants nothing over the host;
  without it the guest is an opaque origin and loses its storage and
  origin-restricted APIs and tokens.
- **`allow=""`** grants no permissions-policy features (camera,
  geolocation, …).
- **The guest restricts who embeds it**, with CSP `frame-ancestors`
  listing the hosts it serves.

### 10.2 The handshake

```
host                                                guest (in the iframe)
────                                                ─────────────────────
                        ◄── parent.postMessage({type: 'layer:announce', protocol}, '*')
                            repeated every 500 ms until connected; carries nothing else
check event.source === iframe.contentWindow
check event.origin ∈ the host's allow-list
const {port1, port2} = new MessageChannel()
iframe.contentWindow.postMessage(
  {type: 'layer:connect', protocol, nonce}, event.origin, [port2]) ──►
                                                    check event.origin ∈ the guest's host allow-list
                                                    (location.ancestorOrigins isn't in every browser,
                                                    so the guest checks the connect's origin)
                        ◄── port: layer:hello {nonce, …}
port: layer:hello-ack ──►
everything else on the MessagePort; the window listeners are removed
```

- `'*'` is safe for the announce only because it carries nothing.
  Everything after goes to a checked origin or over the port.
- The repeat-until-acked rule is DESIGN.md's (`announce()` every 500 ms).
- A second `layer:connect`, or one with the wrong nonce, is ignored. A
  reconnect (the iframe reloaded, §10.7) starts over with a new nonce.

### 10.3 Messages and transferables

- **One message per guest frame**: its calls, its checkpoint and
  `netgl:frame-end {viewId}`, batched. Cross-process, the per-message
  cost dominates.
- **Transfer only what the recorder owns**: buffers it made itself (its
  `ImageData` conversions, copies of sub-ranges). A guest framework's own
  `ArrayBuffer`s are cloned, because frameworks keep and reuse them
  (three's attribute arrays, Cesium's typed arrays) and a transfer would
  detach them in the guest.
- **`ImageBitmap`s are cloned**, unless the adapter knows the guest
  closes them after upload.
- **`SharedArrayBuffer`** (for big anchor tables, ring buffers) needs
  cross-origin isolation on both pages (COOP and COEP, and the iframe
  allowed `cross-origin-isolated`). Optional, and not assumed.

### 10.4 Scheduling and lag

- A cross-origin iframe is out of process under site isolation, so it's
  always `portal-layers.md`'s **AsyncScheduler**: at most one view in
  flight, the next sent at the end of the current frame, frames tagged
  with their `viewId`, stale frames re-run without uploads.
- An overlay has no stencil to slide against, but its content lags the
  host's by the round trip: turning the globe 30°/s at 60 fps moves the
  satellites half a degree against it per frame of lag. The host sends
  views predicted by the measured round trip, as `portal-layers.md`
  proposes for camera motion.
- The guest renders when a `layer:view` arrives, not from its own
  `requestAnimationFrame`, which browsers throttle in invisible and
  cross-origin frames.

### 10.5 What NetGL can't protect, and the trust tiers

Guest GL executes in the host's context. Isolating the guest's JS doesn't
isolate its GL. A hostile or broken guest can:

- **exhaust the GPU**: huge buffers and textures, or shaders that run
  long enough to trip the GPU watchdog. Either loses the host's context,
  and the host's whole canvas with it.
- **reach the host's pixels**: it can't name the host's objects (handles
  are interned per guest), but it can name the default framebuffer
  (`null`) and so whatever `screenFramebuffer` maps it to.
  `copyTexSubImage2D`, `blitFramebuffer` and `readPixels` from it put the
  host's pixels in the guest's textures. Nothing flows back over NetGL,
  since readback is answered by the guest's shadow, which has none of the
  host's pixels. But the guest can draw them elsewhere, and flow-control
  acks are a timing channel for shaders whose cost depends on them.
- **spoof the host's UI**: an overlay has no stencil, so it can paint
  anywhere. `door` and `in-place` are confined by the screen policy's
  stencil override.
- **call anything on the context**: the replay calls `gl[name](…)` with
  the name from the message.

So trust is declared per layer, and decides what the replay checks.
This proposes a tier between 0.1's full trust and its `untrusted-gl`,
because the guests here are cross-origin but trusted.

| Tier | Who | GL | Checks |
|---|---|---|---|
| `bundled` | `inPage` | full | none |
| `trusted-origin` (new) | a cross-origin iframe from an origin on the host's allow-list | full | method allow-list; no reads or copies from the host's framebuffers; budgets as crash guards. Always on, cheap. |
| `untrusted-gl` | any other origin the host accepts | validated | the above, plus shader size limits, enforced budgets, a GPU-time watchdog (`EXT_disjoint_timer_query_webgl2`) that suspends the layer, and overlays refused or scissored to their extent's screen bounds |
| `isolated` | anyone | none in the host's context | frame-RPC bitmaps ([frame-rpc-portals.md](../frame-rpc-portals.md)): full isolation, no shared depth, packed-depth precision |

What would make `untrusted-gl` safe is real shader validation and GPU
preemption, which WebGL doesn't give; DESIGN.md's [Permission
model](../../packages/portal-netgl/DESIGN.md#open-problems-the-next-pr)
open problem stands. Until then, `isolated` is the honest answer for
code the host doesn't trust.

### 10.6 Capabilities

`layer:hello` asks; `layer:hello-ack` grants a subset. A guest that can't
work with what it got reports `layer:status {state: 'failed', reason}`.

```ts
type Capability =
  | { cap: 'kind'; kind: LayerKind }
  | { cap: 'depth'; mode: DepthMode; write?: boolean }
  | { cap: 'projection'; kind: Projection['kind'] }
  | { cap: 'time'; jdScale?: LayerTime['scale'] }
  | { cap: 'anchors:publish'; namespaces: string[]; share?: 'host' | 'layers' }
  | { cap: 'anchors:subscribe'; match: string[] }
  | { cap: 'gl:extensions'; names: string[] }
  | { cap: 'children'; max: number }
  | { cap: 'budget'; callsPerFrame: number; uploadBytesPerFrame: number; liveObjects: number }
  | { cap: 'input:pointer' }    // later: picking through a layer (portal-layers 0.1 doesn't)

type DepthMode = 'shared' | 'save-restore' | 'guest-private' | 'none'

interface LayerHello {          // extends portal-layers 0.1's
  type: 'layer:hello'
  protocol: 'portal-layers/0.2'
  nonce: string                 // from layer:connect
  adapter: string               // 'three', 'cesium', …
  kinds: LayerKind[]
  depth: DepthMode[]
  projections: Array<Projection['kind']>
  frames: FrameId[]
  warp?: boolean                // §6.3: does it place positions by the host's surface mapping
  extent?: LayerExtent
  ext: { 'portal.time/1'?: {}; 'portal.anchors/1'?: { publish: string[]; counts?: Record<string, number> } }
  requests: Capability[]
  contracts: { alpha: 'coverage'; color: unknown; depth: 'none' | 'log' | 'linear' } // 0.1's
}

interface LayerHelloAck {
  type: 'layer:hello-ack'
  layerPath: string
  kind: LayerKind
  depth: SharedDepth | { mode: Exclude<DepthMode, 'shared'> }
  projection: Projection['kind']
  frame: FrameDescriptor
  trust: 'bundled' | 'trusted-origin' | 'untrusted-gl'
  ext: { 'portal.time/1'?: { jdScale?: string }; 'portal.anchors/1'?: { publish: string[]; share: 'host' | 'layers' } }
  granted: Capability[]
  refused?: { reason: string }  // then the layer goes to 'refused'
}
```

The netmap × celestiary exchange:

```js
// guest → host
{ type: 'layer:hello', protocol: 'portal-layers/0.2', nonce, adapter: 'three',
  kinds: ['overlay'], depth: ['shared', 'none'], projections: ['matrix'], frames: ['ecef'], warp: true,
  extent: { frame: 'ecef', sphere: { center: [0, 0, 0], radius: 4.3e7 }, beyond: 'clamp-to-far' },
  ext: { 'portal.time/1': {}, 'portal.anchors/1': { publish: ['norad', 'cospar', 'naif', 'dsn', 'dsn-sc'] } },
  requests: [{ cap: 'kind', kind: 'overlay' }, { cap: 'depth', mode: 'shared', write: false }],
  contracts: { alpha: 'coverage', color: 'display', depth: 'linear' } }

// host → guest
{ type: 'layer:hello-ack', layerPath: '/celestiary', kind: 'overlay', projection: 'matrix',
  depth: { mode: 'shared', func: 'lequal', write: false, clip: { z: 'neg-one-to-one', reversed: false }, bits: 24, logarithmic: false },
  frame: { id: 'ecef', earth: { kind: 'sphere', radius: 6370972, latitude: 'geodetic-as-spherical' } },
  trust: 'trusted-origin',
  ext: { 'portal.time/1': {}, 'portal.anchors/1': { publish: ['norad', 'cospar', 'naif', 'dsn', 'dsn-sc'], share: 'host' } },
  granted: [/* … */] }

// host → guest, then per frame
{ type: 'layer:anchors-subscribe', subId: 1, match: ['norad:44713'], rate: 'per-view' }
{ type: 'layer:view', viewId: 812, view, eye, projection: { kind: 'matrix', matrix },
  clipRange: { near, far }, viewport: [0, 0, 2400, 1600], pixelRatio: 2,
  time: { unixMs: 1792756800000, taiMinusUtc: 37, ut1MinusUtc: 0.0, rate: 1, paused: false,
          scrubbing: false, live: true, epoch: 3, elapsedMs: 84211 } }

// guest → host, per frame
{ type: 'layer:anchors', viewId: 812, full: false,
  upsert: [{ id: 'norad:44713', p: [/* ECEF m, warped */], v: [/* m/s */], placement: 'physical', drawn: true }] }
// …its netgl batch, ending in netgl:frame-end {viewId: 812}

// host: links layer
host.links.add({ from: 'portal:/celestiary#norad:44713', to: 'portal:/#asn:14593' })
```

### 10.7 Lifecycle

`portal-layers.md` [Lifecycle](../portal-layers.md#lifecycle) (idle,
loading, warming, fading in, active, fading out, failed) stands. A
cross-origin guest adds states before and around it:

```
connecting ──hello/ack──► loading ──► warming ──► fading-in ──► active ──► fading-out
    │
    └── origin, contract or capability refused ──► refused

from any running state:
  no frame-end for N ms            ──► unresponsive ──frames again──► (previous state)
                                                    └─too long──────► fading-out ──► failed
  the host's context lost          ──► context-lost ──re-handshake──► loading
  iframe reloaded or port closed   ──► crashed      ──reconnect─────► connecting (or failed, after a limit)
```

```ts
interface LayerStatus {          // guest → host, extends 0.1's
  type: 'layer:status'
  state: 'loading' | 'ready' | 'data-ready' | 'error'
  message?: string
  timeCoverage?: TimeCoverage['timeCoverage'] // §7.3
}
// host-side layer states: 'connecting' | 'refused' | 'loading' | 'warming' | 'fading-in' | 'active'
//                       | 'fading-out' | 'unresponsive' | 'context-lost' | 'crashed' | 'failed'
```

- **Warming without a stencil.** 0.1 warms an in-place layer by
  rendering it with no stencil reference, so nothing lands. An overlay has
  no stencil, so the screen policy needs a way to discard screen draws'
  colour and depth writes (`discard: true`, §12).
- **Unresponsive.** The host keeps drawing the last frame for a while
  (stale re-runs, as today), then fades the layer out. It never blocks
  its own frame on a guest.
- **Context lost.** The host's context is lost for everyone; every
  guest's handles are gone. The host re-handshakes each one, and the guest
  re-creates and re-uploads (its shadow, unaffected, still has its state:
  the adapter replays its creations).
- **Crashed.** The iframe reloaded (its `load` fires again) or the port
  closed. The host replaces the layer's handle table and reconnects, or
  fails the layer after a limit.

### 10.8 Findings from implementation (to fill in)

> **This subsection is for the implementations to append to**: the
> luma.gl host adapter PR (cross-origin support, in progress), and any
> later spike. One bullet per finding: what happened, what fixed it, and
> which section above it confirms, changes or contradicts. Don't edit the
> sections above to match silently; note it here, and change them in a
> reviewed commit that cites the finding.

- *luma.gl host adapter, cross-origin iframe (PR: to link):*
  - handshake (§10.2): …
  - batching and transferables (§10.3): …
  - lag and prediction (§10.4): …
  - restore semantics, `pushState`/`popState` across an async replay (§11): …
  - iframe throttling and visibility (§10.1, §10.4): …
- *Other implementations:* …

## 11. Host adapter semantics

After a guest's calls replay into the host's context, the host's own
framework must be able to draw again. Frameworks need opposite things,
so the adapter declares which.

```ts
interface HostAdapter {
  name: string                                // 'three', 'luma', …
  afterReplay: 'restore' | 'invalidate'
  begin(): void                               // before the first layer's replay this frame
  end(): void                                 // after the last
  insertion: 'after-frame' | 'in-layer-order' // §5.4
  target(): WebGLFramebuffer | null           // where screen draws land (screenFramebuffer)
  requestRedraw(): void                       // on-demand renderers (deck): time is running, anchors moved
  context: {
    stencil: boolean                          // deck's default: false, so no door or in-place layers
    depthBits: number
    antialias: boolean
    clip: SharedDepth['clip']
    logarithmicDepth: boolean                 // true: no 'shared'
  }
}
```

| Framework | `afterReplay` | `begin` / `end` | Why |
|---|---|---|---|
| luma.gl / deck.gl | `restore` | `device.pushState()` / `device.popState()` | luma spies on the context's setters, so its cache follows the guest's calls and never goes stale. But its pipelines set only the parameters they name and assume defaults for the rest, so the guest's leftovers leak (`CULL_FACE` cost deck triangles). The stack puts every tracked value back; the spike's next deck frame was bit-identical to a baseline. Program, VAO and buffer bindings are outside the stack, and luma binds those per draw. |
| three.js | `invalidate` | — / `renderer.resetState()`, then rebind its render target | three's cache doesn't see the guest's calls, so it's dropped. `resetState` also forgets the bound render target (DESIGN.md, celestiary findings), which the adapter rebinds. |
| Cesium (as a host) | unknown | — | Cesium's `Context` caches render state with no public reset. Open question 14. |

Notes:

- **This is the host side of the checkpoint.** The guest's state is put
  back at the start of each batch by the checkpoint (DESIGN.md, [State
  checkpoint](../../packages/portal-netgl/DESIGN.md#state-checkpoint));
  the host's is put back after it by the adapter. Both sides stay
  correct without trusting each other's state.
- **Once per frame, not per layer**, unless the host draws between
  layers.
- **The insertion point.** deck's `onAfterRender` is after everything.
  A deck layer whose `draw` runs the guest would put the guest in deck's
  layer order (after the globe, before the arcs or labels), with deck's
  parameters applied; the adapter then restores around that draw. This is
  `insertion: 'in-layer-order'`.

## 12. What this changes in the existing docs

Nothing below is edited yet; each lands with the implementation, citing
this RFC.

| Where | Today | Proposed |
|---|---|---|
| `portal-layers.md` Concepts: Layer, Shape | every layer has a shape | `kind`; an overlay has no shape (§4) |
| `portal-layers.md` Contracts: Depth | `save-restore`, `guest-private`; "guest depth never has to agree with the host's" | adds `shared` and `none`; agreement is required in `shared` only (§5) |
| `portal-layers.md` Protocol: `layer:view` | "view id, camera, projection, light, time, viewport, exposure" | §6's `LayerView`, with `portal.time/1` (§7) |
| `portal-layers.md` Protocol: `layer:hello`, `hello-ack` | version, adapter kind, capabilities, contracts | §10.6: kinds, depth, projections, frames, extent, extensions, capability requests; the ack assigns `layerPath` and `trust` |
| `portal-layers.md` Protocol: new messages | — | `layer:extent`, `layer:time-request`, `layer:anchors`, `layer:anchor-table`, `layer:anchor-positions`, `layer:anchors-subscribe`, `-unsubscribe`, `layer:children`, `layer:frame-maps`; the iframe's `layer:announce` and `layer:connect` |
| `portal-layers.md` Protocol: `layer:status` | loading, ready, data-ready, error | adds `timeCoverage`; host-side states in §10.7 |
| `portal-layers.md` Security | cross-origin refused unless `trust: 'untrusted-gl'` | the four tiers of §10.5, with `trusted-origin` for allow-listed cross-origin guests |
| `portal-layers.md` Lifecycle | idle … failed | adds connecting, refused, unresponsive, context-lost, crashed (§10.7) |
| DESIGN.md Composition modes | door, in place | adds overlay (§4) |
| DESIGN.md Screen policy | `stencil`, `clear: 'depth-only'`, `blend` | adds `clear: 'none'` (shared depth), `discard: true` (warming without a stencil), and an optional screen scissor for untrusted overlays |
| DESIGN.md f → f′ table: luma.gl / deck.gl | untried | context from `onDeviceInitialized`'s `device.gl`, frame hook `onAfterRender`, host state by `pushState`/`popState` (§2, §11) |
| DESIGN.md Lessons: same page beats an iframe | stands | unchanged; §10 says why cross-origin anyway |
| README "Not yet": cross-origin iframes | designed, not built | as the luma adapter lands |

## 13. Open questions

For the maintainer and the NYC session to answer. Answers go in the PR
discussion, or in an RFC issue citing the number.

1. **Overlays and trust.** An overlay can paint anywhere. Is the overlay
   kind for `trusted-origin` and `bundled` guests only, or does an
   `untrusted-gl` overlay get a screen scissor (or a stencil, where the
   host has one) from its extent's screen bounds?
2. **Cesium as a host.** Its depth is logarithmic, over several frusta.
   Do we specify a `shared-texture` depth mode now (the host's depth as a
   texture plus its encoding, tested in the guest's shader), or leave
   Cesium hosts to `in-place` and `save-restore`?
3. **Depth writes in shared mode.** Default `write: false` (the spike),
   or `true`, so links, later layers and host post-passes test against the
   guest?
4. **Time on the wire.** Is `unixMs` plus an optional two-part `jd` the
   right minimum, or should every view carry a two-part TT date? And is
   the host the only source of leap seconds and UT1 − UTC, binding on
   guests?
5. **Earth orientation.** Should the host also send the
   inertial-to-Earth-fixed rotation (or the Earth rotation angle), so every
   layer turns the Earth identically, or are ECEF of date and UT1 enough,
   each guest computing its own?
6. **Warping to the host's Earth.** Must orbital guests place positions
   by the host's surface mapping when it isn't WGS84 (§6.3), or is
   `warp` the guest's choice, with surface-tied positions the only
   requirement?
7. **Web Mercator in v1.** Do guests implement `webMercator` now, or does
   a 2D host get anchors only (the host draws the markers) until a
   `shader` projection kind exists?
8. **`portal:` vs `portal://`.** Is a page-local `portal:/path#id`
   enough, or do permalinks and sharing need `portal://<host-origin>/…`?
   Should a guest ever learn its siblings' paths?
9. **The anchor registry.** Is a prefix registry in this repo (CURIE
   style, not IANA schemes) acceptable? Is `naif:` the canonical
   spacecraft id, with `dsn-sc:` an alias, rather than a generic
   `spacecraft:`?
10. **Relaying anchors.** May the host pass one guest's anchors to
    another by default (`share: 'layers'`), or only with both sides'
    grants, as proposed?
11. **Who creates nested iframes.** The root, on an intermediate guest's
    `layer:children` request (proposed), or the intermediate guest,
    relaying messages? Does the NYC RFC agree?
12. **Time across levels.** One clock everywhere, or may an edge offset
    or scale time (a door into another date)?
13. **Insertion points.** Is one insertion point per layer per frame
    enough for v1, with phases later? Should the luma adapter use deck's
    layer order (a deck layer that runs the guest) from the start?
14. **Hosts that neither restore nor invalidate.** What does a Cesium
    host adapter do after a replay, with no public reset of its
    `Context`'s cache?
15. **Big anchor sets.** JSON `Anchor`s for subscribed sets, and the
    binary table for whole constellations: is that split right, and is
    the table needed in v1 (Starlink's ~10,000)?
16. **The untrusted path.** For an origin the host doesn't trust, do we
    build the `untrusted-gl` validation layer, or route such guests to
    `isolated` frame-RPC bitmaps and give up shared depth for them?

## 14. References

- `docs/portal-layers.md`: the 0.1 layer design this extends.
- `packages/portal-netgl/DESIGN.md`: composition modes, screen policy,
  state checkpoint, the lessons from celestiary's Cesium layers.
- `docs/frame-rpc-portals.md`: the bitmap portals and their recursion.
- RFC 3986 (URI syntax, fragments), RFC 5870 (`geo:` URIs), RFC 5396
  (AS number notation), W3C CURIE syntax 1.0, IVOA Identifiers 2.0.
- glTF 2.0 and `KHR_animation_pointer` (JSON pointers into a scene); USD
  prim paths.
- SOFA / ERFA (two-part Julian dates, time scales); IERS Bulletin A
  (UT1 − UTC).
- Cesium: `EncodedCartesian3`, 3D Tiles `RTC_CENTER`; deck.gl:
  `coordinateOrigin` and fp64; MapLibre GL JS 5 custom layers' projection
  data.
- The spike: netmap `spike/celestiary-layer` (`web/src/celestiaryLayer.js`)
  and celestiary `spike/satellites-layer` (`js/layer/satellitesLayer.js`),
  local branches, not pushed.
