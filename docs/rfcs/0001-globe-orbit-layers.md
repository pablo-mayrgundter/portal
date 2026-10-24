# RFC 0001: globe + orbit layers

| | |
|---|---|
| **Status** | Draft |
| **Date** | 2026-10-23 |
| **Authors** | the portal maintainers; drafted in an agent session from the netmap × celestiary spike |
| **Changes** | [`docs/portal-layers.md`](../portal-layers.md): layer kinds, `layer:hello`, `layer:view`, depth contract, security, lifecycle. [`packages/portal-netgl/DESIGN.md`](../../packages/portal-netgl/DESIGN.md): composition modes, screen policy. |
| **Adds** | the overlay kind; shared depth and extent negotiation; a projection descriptor; the `portal.time/1` and `portal.anchors/1` extensions; anchor URIs; flattened nesting; cross-origin handshake and trust tiers; host adapter restore/invalidate semantics |
| **Related** | portal [#34](https://github.com/pablo-mayrgundter/portal/pull/34) (merged, portal-netgl 0.4.0): `screen.clear: 'none'` and sub-frames, for New York drawn inside Cesium's frame. portal [#36](https://github.com/pablo-mayrgundter/portal/pull/36): the luma.gl / deck.gl host adapter, `layer:view` and origin-pinned transports (being renumbered to portal-netgl 0.5.0, since 0.4.0 is #34's). celestiary/web [#296](https://github.com/celestiary/web/pull/296): layer mode, the first cross-origin orbits guest (`design/LayerMode.md`). The generative-NYC nested portal RFC (in progress, separate session). |

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

Three implementations now exist: portal #36 (the deck.gl host),
celestiary #296 (the orbits guest), and portal #34 (merged: a three.js
New York drawn inside Cesium's frame, the first nested in-place guest,
which bears on §5, §9 and §11). §10.8 records what they found, and
§6.7 maps the message names and fields they built onto this RFC's: where
they agree the RFC adopts theirs, and where they differ it says which way
to go.

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

portal #36 turned the spike's host side into portal-netgl 0.5.0
(`attachNetGLDeckLayer`, `globeLayerView`, origin-pinned transports), and
celestiary #296 its guest side into layer mode, a cross-origin page.
Their findings are in §10.8.

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
  encoding:                        // how the guest must write depth (#34)
    | { kind: 'projection' }       // the projection's own (deck; Cesium with log depth off)
    | { kind: 'log'; near: number; oneOverLog2FarDepthFromNearPlusOne: number }
                                   // Cesium's log depth: gl_FragDepth = log2(w − near + 1) · that factor
}
```

Rules:

- **No depth clears on the screen.** The screen policy drops the guest's
  colour, depth and stencil clears for screen draws: `clear: 'none'`,
  built in #34 (portal-netgl 0.4.0). `'depth-only'` would wipe the host
  depth the guest tests against. Its render-target passes keep their own
  clears.
- **No projection changes.** No near or far of the guest's own, no TAA
  jitter, no multi-frustum of the guest's own. A host with several frusta
  calls the guest once per frustum, each a sub-frame with that frustum's
  projection (§9.7). A Cesium *guest* in shared mode would need one
  frustum and `logarithmicDepthBuffer: false`; until then Cesium guests
  stay `in-place` with `save-restore`.
- **The guest writes depth the host's way.** With a `log` encoding it
  writes `gl_FragDepth` by the host's formula from the parameters given,
  as #34's New York does inside Cesium's frame with log depth on.
- **Depth writes are a grant.** With `write: true` the guest's depth is
  there for later layers, links and host post-passes. With `write: false`
  (the spike) the guest only tests. Points and lines don't need to occlude
  each other across engines, so `false` is the default.
- **Ground-level geometry ties with the host.** The host's depth step is
  what it is: deck's spans the whole globe view, and at zoom 0.3 a step is
  about 5 km (z²/near·2⁻²⁴; #36). A guest dot 2 km over Brazil tied with
  deck's land and lost; #36's demo lifts ground markers 20 km. A guest
  drawing on or near the host's surface lifts it by more than the host's
  step at that distance, or uses polygon offset, or the layer isn't a
  shared overlay at all but stencilled. Open question 19.
- **Hosts that can't share** offer no `shared`. #34 shows Cesium can:
  its log depth over several frusta is shared by drawing the guest once
  per frustum and writing Cesium's log depth (open question 2). A
  `shared-texture` mode (the host's depth as a texture plus its encoding,
  tested in the guest's shader) remains for hosts with no such hook.

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
  farthest?: number                       // m from the centre: the farthest content, past the sphere (#296's beamsM)
}
```

- It's sent in `layer:hello` and again as `layer:extent` when it changes
  (an overlay switched on or off, a DSN link to Voyager appearing).
  Celestiary's satellites: centre 0, radius 4.3e7 m (GEO with a margin).
  #296 declares `extent: {radiusM: 5e7, beamsM: 3e13}`: the orbits, and
  the DSN beams out to the Voyagers (§6.7).
- **deck (#36):** the host sizes its far plane with `farZMultiplier`; at
  least 4 covers GEO from any zoom (far = (altitude + 2R/cos pitch)·4,
  7.6 Earth radii). deck has no per-layer far plane, so the adapter sets
  the multiplier from the largest shared extent.
- The host sizes its far plane to cover every shared layer's sphere that
  intersects the frustum, `far ≥ |eye − centre| + radius`, up to a limit
  of its own. A `layer:view` may carry the resulting `clipRange` in
  metres (§6); the guest can also read it off `projectionMatrix`.
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
- **Occlusion that isn't depth doesn't reach the guest.** deck hides its
  own geometry past the globe's horizon in its shaders, not by depth. A
  host ring for a point 2,000 km up, past the limb, was clipped while the
  guest's dot, depth-tested, stayed visible (#36). Host and guest agree
  on the globe's disc, not above the limb. Either the host says how it
  culls (an occluder sphere in the view) or the mismatch is accepted;
  open question 20.
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
type Mat4 = number[]                         // 16, column-major, doubles (JS numbers survive structured clone)

// The envelope, as portal-netgl 0.5.0 has it (#36, layer-view.ts: NetGLLayerViewMessage)
interface LayerViewMessage {
  type: 'layer:view'
  viewId: number                             // increasing; frames and anchors are tagged with it
  view: LayerView
}

interface LayerView {
  // Implemented in 0.5.0 (NetGLLayerView, filled by globeLayerView)
  frame: FrameId                             // 'ecef'
  viewMatrix: Mat4       // rigid: layer-frame metres → eye metres. Right-handed; the eye looks down −Z, +Y up.
  projectionMatrix: Mat4 // eye metres → clip, GL conventions (z in [−w, w]): the host's, its scale folded in
  viewport: [number, number, number, number] // [x, y, w, h] in drawing-buffer pixels, GL origin (bottom-left)
  pixelRatio: number                         // drawing-buffer pixels per CSS pixel
  timeMs: number                             // the frame's time, Unix ms UTC; the host owns the clock (§7)
  earth?: EarthModel                         // how the host places lat, lon, alt (§6.3)

  // Proposed here
  phase?: 'opaque' | 'translucent' | 'overlay' // only if negotiated (§5.4)
  subFrame?: { index: number; count: number } // one of several draws this host frame, e.g. per frustum (§9.7)
  eye?: Vec3              // the eye in layer-frame metres, in doubles, for RTE (§6.2); = −Rᵀt of viewMatrix
  clipRange?: { near: number; far: number }  // metres along −Z of the eye: what the projection clips to (§5.3)
  projection?: Projection // a non-matrix kind (§6.4); then viewMatrix and projectionMatrix are absent
  light?: { direction: Vec3; intensity?: number } // portal-layers 0.1: layer frame, unit vector toward the light
  exposure?: number                          // portal-layers 0.1
  opacity?: number                           // 0..1, overlay fades (§4); default 1
  time?: LayerTimeFrame                      // portal.time/1's per-frame part, if negotiated (§7)
}
```

### 6.1 Frames and units

- **Metres**, always. A host whose world isn't in metres (deck's common
  units) folds its scale into the projection, as the spike and 0.5.0's
  `globeLayerView` do: `viewMatrix = W/s`,
  `projectionMatrix = P·diag(s, s, s, 1)`. The guest never
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

- **Compose in doubles.** The host computes `viewMatrix`, `eye` and
  `projectionMatrix` in float64 and sends them as float64 (structured clone and
  `Float64Array` keep them). The spike's alignment, 1e-12, depends on it.
- **float32 on the GPU loses metres.** ECEF coordinates as float32 are
  good to 0.5 m at the surface and LEO and 4 m at GEO (the ULP of
  2²²–2²³ and 2²⁵–2²⁶ m). That's invisible from orbit and visible near
  the ground: jitter in pixels ≈ ULP / distance × focal length in pixels,
  so 0.5 m at 100 m with a 1000 px focal length is 5 px.
- **So the guest goes relative to the eye** (`view.eye`, or −Rᵀt of
  `viewMatrix` in doubles). Two ways,
  the guest's choice:
  - *RTC* (relative to centre): the guest gives each object or tile an
    origin near its content and composes `view · model` in doubles on the
    CPU before uploading float32 (what three already does per object;
    Cesium's `RTC_CENTER`).
  - *RTE* (relative to eye): positions split into high and low float32
    parts, with `eye` split the same way, subtracted in the shader
    (Cesium's `EncodedCartesian3`, deck's fp64 and `coordinateOrigin`).
    The rotation-only part of `viewMatrix` (its 3×3) goes with it.
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
type EarthModel =                                       // `model`, as 0.5.0 names it
  | { model: 'sphere'; radius: number;                   // 0.5.0 sends this, without `latitude`
      latitude?: 'geodetic-as-spherical' | 'geocentric' } // absent: geodetic-as-spherical (deck, MapLibre globes)
  | { model: 'wgs84' }                                   // a = 6378137, f = 1/298.257223563
  | { model: 'ellipsoid'; radii: Vec3 }
```

0.5.0 puts the model in every view (`view.earth`), measured from deck's
viewport, rather than once in `hello-ack`. Per view is fine, and lets a
host change globes; the RFC adopts it. 0.5.0's `sphereToEcef` is the
`geodetic-as-spherical` mapping.

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
- **Found in #296:** celestiary places the DSN complexes on a
  6,378,137 m sphere, 7 km above deck's 6,370,972 m surface, because its
  view (flat, §6.7) doesn't carry `earth`. It should place them by
  `view.earth`.

### 6.4 Projections that aren't a 4×4

netmap's 2D map is MapLibre with a deck overlay in Web Mercator. Its view
from Mercator world coordinates to clip *is* a 4×4, but the map from ECEF
to Mercator isn't affine, so no 4×4 takes the guest's ECEF to clip. The
projection is a descriptor, and the guest declares the kinds it can do.

```ts
type Projection =
  | { kind: 'matrix' }                // the default: projectionMatrix after viewMatrix. Perspective or ortho.
  | WebMercatorProjection
  // later: 'equirectangular', 'shader' (a host-supplied GLSL projection prelude)

interface WebMercatorProjection {
  kind: 'webMercator'
  // The guest computes, per vertex: layer frame (ECEF) → geodetic (lat, lon, h) on WGS84
  // → Mercator world (x, y, z) → clip by `worldToClip`. viewMatrix, projectionMatrix and eye are absent.
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
- A third option, from #36's open problems: the host sends a local
  tangent-plane frame per tile (or per region), in which the Mercator
  view is close to affine, and the guest draws each region with its own
  4×4.
- **Today (#36):** 0.5.0's view is a single 4×4. deck's `GlobeView`
  switches to a `WebMercatorViewport` above zoom 12; `globeLayerView`
  then returns null and the adapter skips the guest, so the satellites
  vanish when you zoom in to a city.

### 6.5 Viewport and pixel ratio

`viewport` is in drawing-buffer pixels, the GL viewport the guest's
screen draws get. `pixelRatio` turns CSS-pixel sizes (point sizes, line
widths) into drawing-buffer pixels. The guest sizes its shadow canvas to
the viewport's `w × h` (`setSize(w, h, false)`, never touching
`canvas.style`; DESIGN.md [Findings from celestiary integration](../../packages/portal-netgl/DESIGN.md#findings-from-celestiary-integration)).

### 6.7 What the implementations built, and the diffs

The control plane as #36 (portal-netgl 0.5.0, host side) and #296
(celestiary layer mode, guest side) implemented it, against this RFC.
"Adopt" means the RFC now uses the implementation's name or shape.

| Message | #36 (0.5.0) | #296 | RFC | Resolution |
|---|---|---|---|---|
| handshake | `netgl:ready` / `netgl:ready-ack`, repeated until acked; origin-pinned transports | `layer:hello`, repeated every 500 ms until `layer:hello-ack` | `layer:hello` / `hello-ack` (folding `netgl:ready` in, as `portal-layers.md` says), plus a nonce (§10.2) | adopt #296's repeat-until-acked hello; #36 adds it beside `netgl:ready` |
| `layer:hello` | — | `{version: 1, kind: 'celestiary-orbits', capabilities: {anchors, time, labels}, contracts: {depth: 'shared', alpha: 'coverage', color: 'display-srgb'}, extent: {radiusM, beamsM}}` | §10.6 | adopt `version` (an integer) and `capabilities`. #296's `kind` is what the RFC calls `adapter` (`kind` is the layer kind, §4). `contracts.depth` is the guest's own depth encoding in 0.1, so the mode moves to `capabilities.depth`. `color: 'display-srgb'` is 0.1's `display`. `extent.radiusM` is `sphere.radius`; `beamsM` (content past it) is `beyond: 'clamp-to-far'` plus `farthest` (§5.3) |
| `layer:hello-ack` | — | `{accepted}` | §10.6 | adopt `accepted: boolean`, with `reason` when false |
| `layer:view` | `{type, viewId, view: {frame, viewMatrix, projectionMatrix, viewport, pixelRatio, timeMs, earth}}` | flat: `{type, viewId, viewMatrix, projectionMatrix, viewport, pixelRatio, timeMs?}` | §6 | adopt #36's envelope and field names (it's the published type). **#296 must read `msg.view`**: today the two don't interoperate, and #296 never sees `earth` |
| `layer:time` | — (time per view) | `{utcMs, rate?}` | §7.1 | adopt as the on-change clock state, renamed `timeMs`, with the RFC's other fields |
| `netgl:frame-end` | no view id | no view id; `layer:anchors {viewId}` after it is the frame's receipt | `netgl:frame-end {viewId}` (as `portal-layers.md` already says) | add `viewId` to frame-end in portal-netgl; anchors stop doubling as the receipt. Open question 18 |
| `layer:anchors` | — | `{viewId, timeMs, anchors: [{id, ecef, name?, kind}]}`, the subscribed set | §8.1 | adopt `timeMs`, `anchors` (the whole set), `name`, `kind`; keep `p` for `ecef` |
| `layer:anchors-subscribe` | — | `{patterns}`, replacing the subscription | §8.1 | adopt `patterns`; `subId`, `fields` and `rate` optional |
| `layer:status` | — | `{status: 'loading' \| 'ready' \| 'error', partial?, message?}` | §10.7 | adopt `status` and `partial` (what failed to load, the rest drawn) |
| `layer:visibility`, `layer:dispose` | — | `{state: 'hidden' \| …}`; dispose | `portal-layers.md` | as is |

`globeLayerView`'s output is `LayerView`'s implemented half: `frame`,
`viewMatrix`, `projectionMatrix`, `viewport`, `pixelRatio`, `timeMs`,
`earth: {model: 'sphere', radius}`. It derives deck's ECEF → common map
from `viewport.projectPosition` (unit axes and an altitude step), checks
it's k times a proper rotation that predicts other points, and returns
null otherwise (Web Mercator, above zoom 12). Its tests check the
guest's projection against `viewport.project` to 1e-6 px and deck's NDC
depth to 1e-9.

## 7. Time: the `portal.time/1` extension

The outermost host owns the clock. Every layer, at every nesting level,
draws the root's time. Guests never advance time on their own.

### 7.1 The time a view carries, and the clock's state

Time travels in two parts. What changes every frame rides in the view;
what changes rarely is a `layer:time` message, sent when it changes. This
is what the implementations converged on: 0.5.0 puts `timeMs` in every
view, and #296 also takes `layer:time {utcMs, rate}` for a host that
doesn't.

```ts
// Per view (in LayerView)
//   timeMs: number             the instant the frame shows: POSIX ms, UTC (no leap seconds), float64
//   time?: LayerTimeFrame      the rest, with portal.time/1
interface LayerTimeFrame {
  jd?: [number, number]         // two-part Julian date in the clock's `scale` (SOFA style: any split, the sum is the date)
  epoch: number                 // the clock's epoch this frame belongs to (below)
  elapsedMs: number             // wall ms since the layer started, monotonic, runs while paused:
                                // for animation that isn't simulation (pulses, fades)
}

// On change (host → guest), and once after hello-ack
interface LayerTimeMessage {
  type: 'layer:time'
  timeMs: number                // the clock's time when sent (#296 calls it utcMs), for a guest between views
  rate: number                  // simulation s per wall s; negative runs backward
  paused: boolean               // rate is kept, but time doesn't advance
  scrubbing: boolean            // the user is dragging time: skip fetches and expensive refreshes
  live: boolean                 // the host says time tracks the wall clock now (rate 1, near now)
  epoch: number                 // bumps on a discontinuity (a jump, a scrub, a sign change of rate):
                                // drop interpolation state, extrapolations and caches keyed to time
  scale?: 'UTC' | 'TAI' | 'TT' | 'TDB' | 'UT1' // of jd; default 'UTC'
  taiMinusUtc: number           // s; 37 since 2017
  ut1MinusUtc?: number          // s, |·| < 0.9; absent means 0
}
```

Rules:

- **A view's `timeMs` wins.** A guest draws the view's time. Only a view
  without one (a host that doesn't send it) is drawn at the clock
  extrapolated from the last `layer:time`, as #296 does, and failing both
  at the wall clock.
- **`layer:time` is state, not a tick.** A host sends it on a change of
  rate, pause, scrub, epoch or offsets, not per frame.

Why these:

- **`timeMs` is enough for this use case.** A float64 of Unix ms
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

- **Negotiated.** The guest asks for `portal.time/1` in `layer:hello`
  (`ext`; #296 sends `capabilities.time: true`); the host grants it in
  `hello-ack`, with the scale it will fill `jd` in. Without the
  extension a guest still gets `timeMs` in each view (0.5.0 always sends
  it).
- **The instant rides in the view, not a separate message.** Tying it to
  `viewId` means a frame's time and pose can't come apart: a satellite
  moves 127 m in a 60 Hz frame, so a one-frame mismatch between time and
  pose shows as jitter against the globe.
- **Hosts that render on demand** must redraw while time runs. deck
  renders only when something changes. #36's adapter posts a view only
  when the camera, viewport or time changed, at most one unanswered, and
  asks deck for a redraw (at most one per animation frame) when the
  guest's frame arrives. So a still camera with a paused clock settles to
  no frames, and a running clock animates at the slower of host and
  guest. A same-page guest has no such loop: a live clock needs deck's
  `_animate` or periodic redraws.

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
  timeMs?: number
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
  p: Vec3                     // layer-frame metres, at the view's time, where the layer draws it
                              // (#296: `ecef`; the RFC keeps `p` because frames other than ECEF come with nesting)
  kind?: string               // what it is, for the host's styling: 'satellite', 'dsn-dish', 'dsn-site' (#296)
  name?: string               // a display name (#296)
  aliases?: AnchorId[]        // other names of the same thing: 'cospar:1998-067A'
  v?: Vec3                    // m/s in the layer frame (ECEF: relative to the turning Earth)
  placement?: 'physical' | 'schematic' // default physical. schematic: a layout position, not a place
                              // (netmap's cyber and hybrid layouts, its altitude-as-hierarchy on the globe)
  geo?: [number, number, number] // WGS84 lat°, lon°, h m of the thing itself, when that isn't p
  radius?: number             // m, drawn size: for picking, and to end lines at the edge
  drawn?: boolean             // the layer draws it now (shown, not culled); default true
  meta?: Record<string, string | number | boolean> // small and public (§8.6)
}

interface LayerAnchors {      // publisher → host
  type: 'layer:anchors'
  viewId: number | null       // the view the positions are for
  timeMs: number              // their time (#296), so a host can extrapolate without the view
  anchors?: Anchor[]          // the whole subscribed set (#296's form; implies full)
  upsert?: Anchor[]           // or a delta: changed and new
  remove?: AnchorId[]         //           and gone
}

// For big sets (Starlink's ~10,000): the ids once, then positions as typed arrays
interface LayerAnchorTable { type: 'layer:anchor-table'; tableId: number; ids: AnchorId[]; placement?: 'physical' | 'schematic' }
interface LayerAnchorPositions {
  type: 'layer:anchor-positions'
  tableId: number
  viewId: number
  timeMs: number
  p: Float64Array             // 3 per id, in table order; NaN for "not drawn"
  v?: Float64Array
}

interface LayerAnchorSubscribe { // host → publisher (on its own behalf or a subscriber's)
  type: 'layer:anchors-subscribe'
  patterns: string[]          // ids, 'scheme:*', or '*' (#296's matcher)
  subId?: number              // absent: replaces the one default subscription (#296); present: one of several
  fields?: Array<'v' | 'geo' | 'meta'>
  rate?: 'per-view' | 'on-change' | { hz: number } // default per-view
}
interface LayerAnchorUnsubscribe { type: 'layer:anchors-unsubscribe'; subId: number }
```

#296 publishes its anchors after each frame, the subscribed set whole,
about 270 KB a second for all of Starlink at 60 Hz. Its own question,
whether to publish orbital elements once and let the host propagate, is
open question 22.

- A publisher advertises its namespaces and rough counts in `hello`
  (`ext['portal.anchors/1'].publish`) and publishes only what's
  subscribed. Nothing flows by default. **Diff:** #296 publishes the
  DSN's few dozen anchors (`dsn:*`, `dsn-site:*`, `spacecraft:*`) before
  any subscription. Cheap, but it's the host's bandwidth and the
  publisher's disclosure; the RFC asks #296 to start empty.
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

- **Diffs with #296** (`js/layer/anchors.js`, made in one module so it
  can follow this RFC):

  | #296 | RFC | Change |
  |---|---|---|
  | `norad:25544` | `norad:25544` | none |
  | `dsn:DSS-43` | `dsn:DSS-43` | none |
  | `dsn-site:gdscc` | `dsn:GDSCC` | one prefix for the DSN's dishes and complexes, upper case as DSN Now's config has them |
  | `spacecraft:vgr1` | `dsn-sc:VGR1`, aliased to `naif:-31` | an authority-named prefix, upper case; add the NAIF alias where known |

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

- **Flat vs composed (#34).** #34 runs the other shape, same page: New
  York's link replays into Cesium's *recorder* (`scene.context._gl`), so
  its handles and state go through Cesium's, and Cesium's checkpoint stays
  right without knowing a guest ran. It works, and it costs a GL execution
  and an encode-decode per level for every call. Flattening avoids that
  multiplication; composing needs no root cooperation. Open question 11.
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

### 9.7 Sub-frames: one layer drawn several times a frame

From #34. Cesium calls an external renderer once per depth frustum it
overlaps (2–3 with log depth off), after that frustum's opaque pass, and
clears depth between frusta. Each call is a sub-frame of the guest:
`link.frame(() => { render(); guestCtx.subFrame() })`.

- **Each sub-frame needs the full checkpoint.** The host changed nearly
  all state in between (`Context.resetState()`), and the replay can't see
  what without querying the host. With tracked state it is about 80 state
  calls and no round trips. `subFrame()` defers the checkpoint to the
  guest's next call, so the immediate link replays it directly instead of
  cloning it. `endFrame({checkpoint: false})` is for a host that doesn't
  touch the context between frames.
- **Each sub-frame has its own view**: that frustum's projection, and its
  depth encoding (`view.subFrame`, `SharedDepth.encoding`). Per-frame work
  (animation, time) runs once per host frame; #34 keys it on Cesium's
  `frameNumber`.
- **Sub-frames need a synchronous binding.** The host calls the guest
  mid-pass, several times; an async transport can't answer in time. A
  cross-origin guest inside a multi-frustum host would need its frame
  drawn once and replayed per frustum, which only works if its draws
  don't depend on the projection. Not proposed.
- **Insertion is per phase.** Cesium's hook sits after the opaque pass,
  before translucent: §5.4's phases exist in a real host (open question
  13).

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
<iframe src="https://sats.celestiary.example/layer.html?nets=S,I,D#portal-nonce=4f9c…"
        sandbox="allow-scripts allow-same-origin"
        allow=""
        referrerpolicy="strict-origin"
        style="position:fixed; inset:0; width:100%; height:100%; opacity:0; pointer-events:none">
</iframe>
```

- **Full-viewport and invisible**, per DESIGN.md's finding that a 1×1
  iframe throttles or kills a real app's loop.
- **`allow-same-origin` keeps the guest's own origin.** It's
  cross-origin to the host, so this grants nothing over the host.
  Without it the guest is an opaque origin (`'null'`): it loses its
  storage and origin-restricted APIs and tokens, the host can only post
  to it with `'*'`, and its module scripts load in CORS mode (#36). #36's
  GitHub Pages preview runs its guest that way, since there guest and
  host share an origin and the sandbox is what makes them cross-origin.
  This RFC recommends a real origin; opaque-origin guests are open
  question 17.
- **`allow=""`** grants no permissions-policy features (camera,
  geolocation, …).
- **`referrerpolicy` must send at least the origin** (`strict-origin`,
  or the default): a Firefox guest finds its host by the referrer (§10.2).
- **The nonce rides in the URL's fragment**, which is never sent to a
  server, and which a page navigated into the frame doesn't have (§10.2).

What the guest's deployment must provide (#36):

| Need | Why |
|---|---|
| CSP `frame-ancestors <the hosts>`, and no `X-Frame-Options: DENY` | the guest decides who may frame it |
| CORP / COEP headers, if the host sends COEP `require-corp` | or the host can't embed it |
| `Access-Control-Allow-Origin` on its scripts, for an opaque-origin guest | its module scripts load in CORS mode (GitHub Pages sends it) |
| CORS-enabled images | a tainted `ImageBitmap` can't be cloned (`DataCloneError`), and a tainted image fails the 2D-canvas conversion |

**Storage is partitioned by the host's site.** The guest's IndexedDB and
Cache API start cold in each host that embeds it: celestiary's data is
fetched again per embedding site, not shared with celestiary.org's own
pages.

### 10.2 The handshake

**What's built.** #36 pins both transports by origin:
`iframeTransport(iframe, {origin})` and `parentTransport({hostOrigins})`
post with the peer's exact origin and drop inbound messages whose
`event.source` or `event.origin` doesn't match. The source check alone
failed: an iframe's `contentWindow` (and a guest's `parent`) is the same
WindowProxy after the frame navigates, so a hostile page loaded into it
passed. #296's guest does the same with its own `originTransport`, and
repeats `layer:hello` every 500 ms until acked. Origin is then the whole
trust boundary: any page on an allowed origin can drive the guest, and any
page on the guest's origin loaded into that frame can feed the host GL
(#36).

**The host's origin, from the guest's side.** The guest needs it before
its first message, so it never posts with `'*'`:

1. `location.ancestorOrigins[0]`, where it exists (Chromium, Safari);
2. else `document.referrer`'s origin (Firefox has no `ancestorOrigins`);
3. else a `?host=` parameter (#296).

Each candidate is taken only if it's on the guest's **allow-list, a
constant in its build** (#296's `ALLOWED_ORIGINS`, extended at build time,
never at run time). The URL may pick an origin from the list, never add
one: any page could frame the guest with `?host=itself` (#36).

**Proposed on top: a nonce, then a port.**

```
host                                                guest (in the iframe)
────                                                ─────────────────────
iframe.src = guestUrl + '#portal-nonce=' + nonce
                        ◄── parent.postMessage({type: 'layer:hello', version, nonce, …}, hostOrigin)
                            repeated every 500 ms until acked
check event.source === iframe.contentWindow
check event.origin ∈ the host's allow-list (constant)
check nonce === the one in this iframe's URL
const {port1, port2} = new MessageChannel()
iframe.contentWindow.postMessage(
  {type: 'layer:hello-ack', accepted: true, …}, event.origin, [port2]) ──►
                                                    check event.origin ∈ the guest's allow-list
everything else on the MessagePort; the window listeners are removed
```

- **The nonce authenticates the frame's first document**, not just its
  origin: a page navigated into the frame can't echo it. It's what makes
  an opaque-origin guest (origin `'null'`, shared by every sandboxed
  frame) safe to accept.
- **The port dies with the document.** If the frame navigates after the
  ack, the new page has no port, so nothing more reaches it, whatever the
  first message's target origin was. The host also watches the iframe's
  `load` event (it fires on every navigation, cross-origin too) and drops
  the layer to `crashed` (§10.7).
- **A capability beyond origin** would be a token the host's server
  issues for the guest (or the reverse), checked by the other side's
  server. Not proposed yet; open question 21.
- A reconnect (the iframe reloaded, §10.7) starts over with a new nonce.

### 10.3 Messages and transferables

- **One message per guest frame**: its calls, its checkpoint and
  `netgl:frame-end {viewId}`, batched. Cross-process, the per-message
  cost dominates.
- **Ship a typed-array view's bytes, never its whole buffer.** Before #36
  the recorder cloned a partial view's whole underlying `ArrayBuffer`: a
  uniform upload from a view into a WASM heap or a framework's scratch
  pool handed all of that memory to the host's origin. It now copies only
  the view's range.
- **Transfer only what the recorder owns**: buffers it made itself (its
  `ImageData` conversions, those copies). A guest framework's own
  `ArrayBuffer`s are cloned, because frameworks keep and reuse them
  (three's attribute arrays, Cesium's typed arrays) and a transfer would
  detach them in the guest.
- **`ImageBitmap`s are cloned**, unless the adapter knows the guest
  closes them after upload. Tainted ones can't cross at all (§10.1).
- **`SharedArrayBuffer`** (for big anchor tables, ring buffers) needs
  cross-origin isolation on both pages (COOP and COEP, and the iframe
  allowed `cross-origin-isolated`). Optional, and not assumed.

### 10.4 Scheduling and lag

- A cross-site iframe runs in another renderer process under Chromium's
  site isolation (#36 checked `localhost` inside `127.0.0.1`), not on the
  host's main thread as DESIGN.md's Cesium findings assume. Each frame
  then costs serialisation on both sides plus IPC. A cross-origin but
  same-site frame may share the host's process. The latency isn't
  measured on a real GPU yet.
- So it's always `portal-layers.md`'s **AsyncScheduler**: at most one view
  in flight, the next sent at the end of the current frame, frames tagged
  with their `viewId`, stale frames re-run without uploads.
- **Frames aren't tagged yet.** `netgl:frame-end` carries no view id in
  0.5.0, so the host can't tell which view a frame was drawn for, can't
  compose it pose-tagged, and can't measure lag. #296 works around it:
  its `layer:anchors {viewId}`, sent after each frame-end, is the frame's
  receipt, and its test host sends the next view on it. The RFC puts
  `viewId` on frame-end (open question 18).
- **A frame that can't be re-run needs a new view.** A three.js guest's
  first frame deletes its shaders after linking, so the host won't re-run
  it (DESIGN.md's Cesium findings); with the camera still, no new view
  went out and the guest vanished after one frame. 0.5.0's
  `receiver.canRerun` tells the adapter to ask again for the same view.
- An overlay has no stencil to slide against, but its content lags the
  host's by the round trip: turning the globe 30°/s at 60 fps moves the
  satellites half a degree against it per frame of lag. The host sends
  views predicted by the measured round trip, as `portal-layers.md`
  proposes for camera motion.
- The guest renders when a `layer:view` arrives, not from its own
  `requestAnimationFrame`, which Chromium may throttle in a cross-origin
  frame it considers hidden (#36's guest and #296's both do this).

### 10.5 What NetGL can't protect, and the trust tiers

Guest GL executes in the host's context. Isolating the guest's JS doesn't
isolate its GL. A hostile or broken guest can:

- **exhaust the GPU**: huge buffers and textures, or shaders that run
  long enough to trip the GPU watchdog. Either loses the host's context,
  and the host's whole canvas with it (deck doesn't recover from that).
- **reach the host's pixels**: it can't name the host's objects (handles
  are interned per guest), but it can name the default framebuffer
  (`null`) and so whatever `screenFramebuffer` maps it to.
  `copyTexSubImage2D`, `blitFramebuffer` and `readPixels` from it put the
  host's pixels in the guest's textures. Nothing flows back over NetGL,
  since readback is answered by the guest's shadow, which has none of the
  host's pixels. But the guest can draw them elsewhere, and flow-control
  acks are a timing channel for shaders whose cost depends on them.
- **cover, clear or spoof the host's pixels**: without a screen policy
  (#36's overlay runs with none) the guest can draw or clear anywhere on
  the host's canvas. An overlay has no stencil, so even with a policy it
  can paint anywhere. `door` and `in-place` are confined by the screen
  policy's stencil override.
- **call anything on the context**: the replay calls `gl[name](…)` with
  the name from the message. #36 refuses `Object.prototype`'s names
  (`constructor`, `__defineGetter__`, …), which were reachable that way,
  and typed-array names that aren't own data on the constructor table.
  Every real method of the context is still callable.

None of 0.1's cheap checks (an entry-point allow-list, no host-framebuffer
reads, per-frame budgets, shader length limits) is built yet (#36).

So trust is declared per layer, and decides what the replay checks.
This proposes a tier between 0.1's full trust and its `untrusted-gl`,
because the guests here are cross-origin but trusted.

| Tier | Who | GL | Checks |
|---|---|---|---|
| `bundled` | `inPage` | full | none |
| `trusted-origin` (new) | a cross-origin iframe from an origin on the host's allow-list | full | method allow-list; no reads or copies from the host's framebuffers; budgets as crash guards. Always on, cheap; not built yet. #36 and #296 run at this tier with only the origin pinning. |
| `untrusted-gl` | any other origin the host accepts | validated | the above, plus shader size limits, enforced budgets, a GPU-time watchdog (`EXT_disjoint_timer_query_webgl2`) that suspends the layer, and overlays refused or scissored to their extent's screen bounds |
| `isolated` | anyone | none in the host's context | frame-RPC bitmaps ([frame-rpc-portals.md](../frame-rpc-portals.md)): full isolation, no shared depth, packed-depth precision |

What would make `untrusted-gl` safe is real shader validation and GPU
preemption, which WebGL doesn't give; DESIGN.md's [Permission
model](../../packages/portal-netgl/DESIGN.md#open-problems-the-next-pr)
open problem stands. Until then, `isolated` is the honest answer for
code the host doesn't trust.

### 10.6 Capabilities

`layer:hello` asks; `layer:hello-ack` grants a subset. A guest that can't
work with what it got reports `layer:status {status: 'error', message}`.

```ts
type Capability =
  | { cap: 'kind'; kind: LayerKind }
  | { cap: 'depth'; mode: DepthMode; write?: boolean }
  | { cap: 'projection'; kind: Projection['kind'] }
  | { cap: 'time'; jdScale?: LayerTimeMessage['scale'] }
  | { cap: 'anchors:publish'; namespaces: string[]; share?: 'host' | 'layers' }
  | { cap: 'anchors:subscribe'; patterns: string[] }
  | { cap: 'gl:extensions'; names: string[] }
  | { cap: 'children'; max: number }
  | { cap: 'budget'; callsPerFrame: number; uploadBytesPerFrame: number; liveObjects: number }
  | { cap: 'input:pointer' }    // later: picking through a layer (portal-layers 0.1 doesn't)

type DepthMode = 'shared' | 'save-restore' | 'guest-private' | 'none'

interface LayerHello {          // extends portal-layers 0.1's, and #296's
  type: 'layer:hello'
  version: number               // the layer protocol, an integer (#296: 1; this RFC's shapes would be 2)
  nonce?: string                // from the iframe URL's fragment (§10.2)
  adapter: string               // what draws: 'three', 'cesium', 'celestiary-orbits' (#296 calls this `kind`)
  capabilities: {               // what the guest can do (#296: {anchors, time, labels})
    kinds: LayerKind[]
    depth: DepthMode[]          // #296 puts 'shared' in contracts.depth; it belongs here
    projections: Array<Projection['kind']>
    frames: FrameId[]
    warp?: boolean              // §6.3: does it place positions by the host's surface mapping
    anchors?: boolean
    time?: boolean
    labels?: boolean            // #296: does it draw names (it doesn't; the host names anchors)
  }
  extent?: LayerExtent          // #296: {radiusM, beamsM} = {sphere: {center: 0, radius}, farthest}
  ext?: { 'portal.time/1'?: {}; 'portal.anchors/1'?: { publish: string[]; counts?: Record<string, number> } }
  requests?: Capability[]       // grants it asks for
  contracts: { alpha: 'coverage'; color: 'display' | 'linear'; depth?: 'none' | 'log' | 'linear' } // 0.1's;
                                // #296's color 'display-srgb' is 0.1's 'display'
}

interface LayerHelloAck {
  type: 'layer:hello-ack'
  accepted: boolean             // #296; false: the layer goes to 'refused'
  reason?: string
  layerPath?: string
  kind?: LayerKind
  depth?: SharedDepth | { mode: Exclude<DepthMode, 'shared'> }
  projection?: Projection['kind']
  frame?: FrameDescriptor
  trust?: 'bundled' | 'trusted-origin' | 'untrusted-gl'
  ext?: { 'portal.time/1'?: { jdScale?: string }; 'portal.anchors/1'?: { publish: string[]; share: 'host' | 'layers' } }
  granted?: Capability[]
}
```

Everything but `accepted` is optional in the ack, so #296's `{accepted:
true}` is a valid one: it means "the defaults" (an overlay, shared depth
as the view's projection implies, ECEF, no anchors shared on).

The netmap × celestiary exchange, in these shapes:

```js
// guest → host (repeated every 500 ms until acked)
{ type: 'layer:hello', version: 2, nonce, adapter: 'celestiary-orbits',
  capabilities: { kinds: ['overlay'], depth: ['shared', 'none'], projections: ['matrix'], frames: ['ecef'],
                  warp: true, anchors: true, time: true, labels: false },
  extent: { frame: 'ecef', sphere: { center: [0, 0, 0], radius: 5e7 }, farthest: 3e13, beyond: 'clamp-to-far' },
  ext: { 'portal.time/1': {}, 'portal.anchors/1': { publish: ['norad', 'cospar', 'naif', 'dsn', 'dsn-sc'] } },
  requests: [{ cap: 'depth', mode: 'shared', write: false }],
  contracts: { alpha: 'coverage', color: 'display' } }

// host → guest (with the MessagePort)
{ type: 'layer:hello-ack', accepted: true, layerPath: '/celestiary', kind: 'overlay', projection: 'matrix',
  depth: { mode: 'shared', func: 'lequal', write: false, clip: { z: 'neg-one-to-one', reversed: false }, bits: 24, encoding: { kind: 'projection' } },
  frame: { id: 'ecef', earth: { model: 'sphere', radius: 6370972 } },
  trust: 'trusted-origin',
  ext: { 'portal.time/1': {}, 'portal.anchors/1': { publish: ['norad', 'cospar', 'naif', 'dsn', 'dsn-sc'], share: 'host' } } }
{ type: 'layer:time', timeMs: 1792756800000, rate: 1, paused: false, scrubbing: false, live: true,
  epoch: 3, taiMinusUtc: 37, ut1MinusUtc: 0.0 }
{ type: 'layer:anchors-subscribe', patterns: ['norad:44713'] }

// host → guest, per frame (0.5.0's globeLayerView, plus the RFC's optional fields)
{ type: 'layer:view', viewId: 812,
  view: { frame: 'ecef', viewMatrix, projectionMatrix, viewport: [0, 0, 2400, 1600], pixelRatio: 2,
          timeMs: 1792756800016, earth: { model: 'sphere', radius: 6370972 },
          time: { epoch: 3, elapsedMs: 84211 } } }

// guest → host, per frame: its netgl batch, ending in netgl:frame-end {viewId: 812}; then
{ type: 'layer:anchors', viewId: 812, timeMs: 1792756800016,
  anchors: [{ id: 'norad:44713', kind: 'satellite', name: 'STARLINK-1007', p: [/* ECEF m, warped */], v: [/* m/s */] }] }

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
interface LayerStatus {          // guest → host, extends 0.1's; the field is `status`, as #296 has it
  type: 'layer:status'
  status: 'loading' | 'ready' | 'data-ready' | 'error'
  partial?: string[]             // #296: parts that failed to load, the rest drawn ('ready' with partial)
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
- **Crashed.** The iframe navigated or reloaded (its `load` fires again)
  or the port closed. The host stops sending to it at once (an
  opaque-origin guest is posted to with `'*'`, so the next view would go
  to whatever page is there now), replaces the layer's handle table and
  reconnects with a new nonce, or fails the layer after a limit.

### 10.8 Findings from implementation

> **Implementations append here**: one bullet per finding, saying what
> happened, what fixed it, and which section it confirms, changes or
> contradicts. Don't edit the sections above to match silently; note it
> here, and change them in a reviewed commit that cites the finding. The
> sections above were reconciled with #36 and #296 in the commit that
> added this list.

**portal #36: the luma.gl / deck.gl host adapter and cross-origin
transports** (portal-netgl 0.5.0; `frameworks/luma.ts`,
`window-transport.ts`, `apps/host-netgl-deck`; DESIGN.md's new sections
"Findings from deck.gl / luma.gl integration" and "Cross-origin
iframes"). Tested three ways: two ports (cross-origin, same site),
`localhost` inside `127.0.0.1` (cross-site, another process), and a
sandboxed iframe without `allow-same-origin` (opaque origin). The NetGL
stream crossed unchanged: calls, typed arrays and the ready handshake are
all structured-clonable.

- *Fixed:*
  - **`'*'` outbound.** Transports posted with `targetOrigin: '*'`, so a
    navigated frame or parent kept receiving views or GL calls. They post
    to the peer's exact origin now. Confirms §10.2.
  - **Source-only inbound check.** A navigated frame is the same
    WindowProxy and passed it. There's now an `event.origin` allow-list
    too; `windowTransport` refuses `'*'` in it, malformed origins, and
    `'null'` without a source filter. Confirms §10.2.
  - **Whole buffers on the wire.** A typed-array view shipped its whole
    underlying `ArrayBuffer` (a guest's WASM heap would have reached the
    host). Only the view's bytes go now. Added to §10.3.
  - **Dispatch by any name.** The replay could call `Object.prototype`
    methods by name; refused now. Changes §10.5's "call anything" (real
    context methods remain callable).
- *Remaining* (now in §10 and §13):
  - Guest GL runs unsandboxed in the host's context: resource exhaustion,
    hung shaders, a lost context (deck doesn't recover), drawing over the
    host, reading the host's framebuffer on the GPU, and frame timing as
    a side channel out of the host's page. §10.5.
  - An opaque-origin (sandboxed) guest can only be posted to with `'*'`.
    §10.1, §10.2, open question 17.
  - Origin is the whole trust boundary: no nonce or capability. §10.2
    proposes the nonce and port; open question 21.
  - Cross-site process isolation's latency is unmeasured. §10.4.
  - Frame-ends carry no view id, so an async host can't compose a frame
    for the view it was drawn for. §10.4, open question 18.
  - Deploy needs: CSP `frame-ancestors` on the guest's site, CORP/COEP if
    the host uses COEP, CORS for an opaque-origin guest's scripts;
    tainted images can't cross; the guest's storage is partitioned per
    host site. §10.1.
  - Chromium may throttle rAF in a cross-origin frame it considers
    hidden, so guests render on view messages. Confirms §10.4.
  - Firefox has no `ancestorOrigins`; the guest falls back to the
    referrer. Changes §10.2 (the guest finds the host's origin before
    its first message, rather than announcing to `'*'`).
  - The view is a single 4×4. §6.4.
  - The host's allow-list must be a constant in the guest's code, never
    read from the URL. §10.2.
- *Netmap / deck specifics:*
  - `farZMultiplier` ≥ 4 covers GEO. Confirms §5.3.
  - `GlobeView` switches to Web Mercator above zoom 12, and the guest is
    skipped there (`globeLayerView` returns null). §6.4.
  - deck's depth step is about 5 km at low zoom, so ground-level guest
    geometry ties with deck's land and needs a lift (the demo's 20 km) or
    a bias. §5.1, open question 19.
  - Guest points above the limb stay visible while deck clips its own
    past the horizon in its shaders. §5.4, open question 20.
  - deck's Earth is a 6,370,972 m sphere, exposed as `view.earth`
    (`{model: 'sphere', radius}`), measured, not hard-coded. Adopted in
    §6.3.
  - `pushState` / `popState` around the replay leaves deck's next frame
    bit-identical, in `luma.test.ts` on headless-gl and in Chromium.
    Confirms §11.
  - A first frame that deletes objects can't be re-run, so with a still
    camera the guest vanished; `receiver.canRerun` makes the adapter ask
    again. §10.4.

**portal #34 (merged): sub-frames and `clear: 'none'`** (portal-netgl
0.4.0; DESIGN.md "Sub-frames" and "Nested guests: Cesium drawing New
York"). A three.js New York drawn by Cesium through the fork's
`scene.externalRenderers`, two levels deep so far; the three-level chain
under celestiary hasn't run end to end.

- `clear: 'none'` drops every screen clear, so the guest keeps the host
  depth it tests against. Confirms §5.1.
- One draw per depth frustum, each a sub-frame with the full checkpoint
  (about 80 state calls, no queries), deferred so it isn't cloned. Adds
  §9.7.
- The guest writes Cesium's log depth from parameters the callback
  passes. Adds `SharedDepth.encoding`; changes open question 2.
- Cesium as a host invalidates (`Context.resetState()` after each
  callback). Settles §11's Cesium row and open question 14 for the fork.
- Handles compose through recorders when a guest replays into another
  guest's recorder, at a cost per level. Bears on §9.1 and open question
  11.
- Open there: a stencil mode that forbids writes without a mask (Cesium
  keeps classification bits in stencil). §12.
- Its versioning: #34 took portal-netgl 0.4.0, so #36 is being
  renumbered 0.5.0; this RFC's "0.5.0" means #36.

**celestiary/web #296: layer mode** (`design/LayerMode.md`,
`js/layer/`; `layer.html?host=<origin>&nets=S,I,D&sats=1`). The first
cross-origin orbits guest: satellites and the Starlink, Iridium and DSN
networks, with no Scene, UI or ephemeris, in its own bundle budget.

- **The contract as built** is in §6.7: `layer:hello` repeated until
  acked, a flat `layer:view`, `layer:time {utcMs, rate}`,
  `layer:anchors-subscribe {patterns}`, `layer:anchors {viewId, timeMs,
  anchors}`, `layer:status {status}`, `layer:visibility`,
  `layer:dispose`. The RFC adopts most of the names; the diffs are listed
  there.
- **It doesn't interoperate with #36 yet.** #36 sends `{type, viewId,
  view: {…}}`; #296 reads the fields flat and so never sees `earth`. One
  of them changes; the RFC picks #36's envelope. §6.7.
- **Anchors as the frame receipt.** Its `layer:anchors {viewId}`, after
  each frame-end, is what its test host sends the next view on, because
  frame-ends carry no view id. §10.4, open question 18.
- **Origins.** A constant `ALLOWED_ORIGINS`, extended only at build time
  (`LAYER_ORIGINS`); the host's origin comes from `?host=` or the
  referrer, and only if it's on the list; `'null'` is refused. Posts only
  to that origin. Confirms §10.2. It ships its own `originTransport`
  because it pins portal-netgl 0.3.0, which filtered by source only;
  0.5.0's `parentTransport` replaces it.
- **The Earth.** It places the DSN complexes on a 6,378,137 m sphere,
  7 km off deck's surface. §6.3.
- **Anchor ids** `dsn-site:gdscc` and `spacecraft:vgr1` differ from the
  registry. §8.2.
- **Anchor volume.** All of Starlink at 60 Hz is about 270 KB a second.
  §8.1, open question 22.
- **Default subscription.** It publishes the DSN's anchors before any
  subscription. §8.1.
- **Display-referred colour, realm isolation.** celestiary's
  `sceneReferredUniform` is a module global; the separate iframe realm
  keeps it from colliding with a host's. Confirms §2's realm collisions.
- **Its own open questions** (labels by guest or host, picking by
  nearest anchor or `layer:pick`, relaying the DSN feed so several embeds
  make one request, WGS84 heights for the dishes) are app-side, except
  picking, which is `portal-layers.md`'s roadmap.

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
    depthEncoding: SharedDepth['encoding']     // Cesium with log depth: 'log', per frustum
  }
}
```

| Framework | `afterReplay` | `begin` / `end` | Why |
|---|---|---|---|
| luma.gl / deck.gl | `restore` | `device.pushState()` / `device.popState()` | luma spies on the context's setters, so its cache follows the guest's calls and never goes stale. But its pipelines set only the parameters they name and assume defaults for the rest, so the guest's leftovers leak (`CULL_FACE` cost deck triangles). The stack puts every tracked value back; deck's next frame was bit-identical to a baseline, in the spike and in #36 (`luma.test.ts` on headless-gl, and Chromium). Program, VAO and buffer bindings are outside the stack, and luma binds those per draw. |
| three.js | `invalidate` | — / `renderer.resetState()`, then rebind its render target | three's cache doesn't see the guest's calls, so it's dropped. `resetState` also forgets the bound render target (DESIGN.md, celestiary findings), which the adapter rebinds. |
| Cesium (as a host) | `invalidate` | — / `Context.resetState()`, which the external-renderer hook calls after each callback | #34: celestiary's Cesium fork adds `scene.externalRenderers`, called once per depth frustum after its opaque pass, with Cesium's pass framebuffer bound and its depth holding the globe. `resetState()` resets nearly all state, so the guest needs its full checkpoint each sub-frame (§9.7). Upstream Cesium has no such hook. |

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

#36 already made some of these in DESIGN.md (marked *done in #36*). The
rest land with their implementation, citing this RFC.

| Where | Today | Proposed |
|---|---|---|
| `portal-layers.md` Concepts: Layer, Shape | every layer has a shape | `kind`; an overlay has no shape (§4) |
| `portal-layers.md` Contracts: Depth | `save-restore`, `guest-private`; "guest depth never has to agree with the host's" | adds `shared` and `none`; agreement is required in `shared` only (§5) |
| `portal-layers.md` Protocol: `layer:view` | "view id, camera, projection, light, time, viewport, exposure" | §6's `LayerViewMessage` (0.5.0's envelope and fields, plus the optional ones), with `portal.time/1` (§7) |
| `portal-layers.md` Protocol: `layer:hello`, `hello-ack` | version, adapter kind, capabilities, contracts | §10.6: `version`, `adapter`, `capabilities` (kinds, depth, projections, frames), extent, extensions, capability requests, a nonce; the ack's `accepted`, `layerPath`, `trust` |
| `portal-layers.md` Protocol: `netgl:frame-end {viewId}` | in the table; not built (0.5.0 sends no view id) | build it (§10.4) |
| `portal-layers.md` Protocol: new messages | — | `layer:time`, `layer:extent`, `layer:time-request`, `layer:anchors`, `layer:anchor-table`, `layer:anchor-positions`, `layer:anchors-subscribe`, `-unsubscribe`, `layer:children`, `layer:frame-maps` |
| `portal-layers.md` Protocol: `layer:status` | loading, ready, data-ready, error | the field is `status`; adds `partial` and `timeCoverage`; host-side states in §10.7 |
| `portal-layers.md` Transports: `frame` binding | iframe, same or cross origin | the iframe attributes, deploy needs and handshake of §10.1–10.2 |
| `portal-layers.md` Security | cross-origin refused unless `trust: 'untrusted-gl'` | the four tiers of §10.5, with `trusted-origin` for allow-listed cross-origin guests |
| `portal-layers.md` Lifecycle | idle … failed | adds connecting, refused, unresponsive, context-lost, crashed (§10.7) |
| DESIGN.md Composition modes | door, in place | adds overlay (§4). *Done in #36.* |
| DESIGN.md f → f′ and host needs | three's `resetState` | restore vs invalidate; luma.gl / deck.gl host shipped (§11). *Done in #36.* |
| DESIGN.md Screen policy | `stencil`, `clear: 'depth-only' \| 'none'`, `blend` | `clear: 'none'` *done in #34*. Adds `discard: true` (warming without a stencil), a stencil mode that forbids writes without a mask (#34's open problem: Cesium keeps classification bits there), and an optional screen scissor for untrusted overlays |
| DESIGN.md Open problems | — | non-affine host views, view-tagged frames. *Done in #36*; §6.4 and §10.4 propose the answers |
| DESIGN.md Lessons: same page beats an iframe | stands | unchanged; §10 says why cross-origin anyway |
| README "Not yet": cross-origin iframes | designed, not built | origin-pinned transports shipped in #36; the trust tiers and handshake of §10 still to build |

## 13. Open questions

For the maintainer and the NYC session to answer. Answers go in the PR
discussion, or in an RFC issue citing the number.

1. **Overlays and trust.** An overlay can paint anywhere. Is the overlay
   kind for `trusted-origin` and `bundled` guests only, or does an
   `untrusted-gl` overlay get a screen scissor (or a stencil, where the
   host has one) from its extent's screen bounds?
2. **Cesium as a host.** *Mostly answered by #34:* shared depth works
   with Cesium's log depth over several frusta, by drawing the guest once
   per frustum and writing Cesium's log depth (`SharedDepth.encoding`).
   Left: does `shared-texture` still need specifying, for hosts with no
   per-frustum hook (upstream Cesium)?
3. **Depth writes in shared mode.** Default `write: false` (the spike),
   or `true`, so links, later layers and host post-passes test against the
   guest? (#34's city writes depth, as Cesium's external-renderer contract
   requires, so the default may need to be per host.)
4. **Time on the wire.** Is `timeMs` plus an optional two-part `jd` the
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
    relaying messages? #34 runs the composed shape on one page (New York
    replays into Cesium's recorder) and shows its cost: a GL execution and
    an encode-decode per level per call. Is composed acceptable for
    same-page levels and flat required for cross-origin ones? Does the NYC
    RFC agree?
12. **Time across levels.** One clock everywhere, or may an edge offset
    or scale time (a door into another date)?
13. **Insertion points.** #34 shows a real host with several: Cesium
    calls its external renderers per frustum, after opaque and before
    translucent. So sub-frames and phases are in v1 for synchronous
    bindings. Left: should the luma adapter use deck's layer order (a deck
    layer that runs the guest) from the start, and do async bindings get
    only one insertion point?
14. **Hosts that neither restore nor invalidate.** *Answered for
    Cesium by #34:* invalidate, through `Context.resetState()`, which
    celestiary's fork's `scene.externalRenderers` calls after each
    callback. Left: upstreaming that hook, or what a host adapter does on
    upstream Cesium.
15. **Big anchor sets.** JSON `Anchor`s for subscribed sets, and the
    binary table for whole constellations: is that split right, and is
    the table needed in v1 (Starlink's ~10,000)?
16. **The untrusted path.** For an origin the host doesn't trust, do we
    build the `untrusted-gl` validation layer, or route such guests to
    `isolated` frame-RPC bitmaps and give up shared depth for them?

17. **Opaque-origin guests.** A sandboxed guest without
    `allow-same-origin` has origin `'null'` and can only be posted to with
    `'*'`. Do we support them (the nonce in the iframe URL and the
    MessagePort of §10.2 as the only authenticators, and the host stopping
    on the iframe's `load`), or require every guest to have a real origin?
18. **The frame receipt.** Put `viewId` on `netgl:frame-end` (as
    `portal-layers.md` already says, and proposed here), so `layer:anchors`
    stops doubling as the receipt (#296)? Or make a separate
    `layer:frame {viewId}` the receipt, leaving NetGL's marker alone?
19. **Ground-level geometry and the host's depth step.** deck's step is
    ~5 km at low zoom. Should the view carry the host's depth resolution
    at the eye (or a recommended lift or bias), or is lifting ground
    geometry the guest's business?
20. **Occlusion that isn't depth.** deck hides its own geometry past the
    horizon in its shaders, and the guest's depth-tested points above the
    limb stay visible. Should the view carry the host's occluder (a sphere)
    so the guest can match, or is the mismatch accepted?
21. **Trust beyond origin.** Is origin pinning plus a nonce per iframe
    enough for `trusted-origin` guests, or do we want a capability (a
    token issued by one side's server, checked by the other's) before any
    third-party guest?
22. **Motion models instead of positions.** For whole constellations,
    should a publisher be able to publish orbital elements once (OMM) and
    let the host propagate, as #296 asks, rather than positions per frame
    (~270 KB/s for Starlink at 60 Hz)? That puts SGP4 in the host: is that
    a reach between codebases the separation of concerns forbids?

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
- The implementations: portal [#34](https://github.com/pablo-mayrgundter/portal/pull/34)
  (DESIGN.md "Sub-frames" and "Nested guests: Cesium drawing New York"),
  portal [#36](https://github.com/pablo-mayrgundter/portal/pull/36)
  (`packages/portal-netgl/src/frameworks/luma.ts`, `layer-view.ts`,
  `window-transport.ts`, `apps/host-netgl-deck`) and celestiary/web
  [#296](https://github.com/celestiary/web/pull/296) (`design/LayerMode.md`,
  `js/layer/`).
