# RFC 0002: nested in-place guests

| | |
|---|---|
| **Status** | Draft |
| **Date** | 2026-10-24 |
| **Authors** | the portal maintainers; drafted in an agent session from the celestiary × Cesium × Slop New York integration |
| **Changes** | [RFC 0001](./0001-globe-orbit-layers.md): answers its open questions 11 (flat vs composed) and 13 (insertion points) for same-page chains, fills its [§9.6 seams](./0001-globe-orbit-layers.md#96-seams-for-the-nyc-rfc), and amends §4, §5.1, §5.3, §6, §9.1 and §10.5 (§13 here). [`docs/portal-layers.md`](../portal-layers.md): contracts (colour, depth, units and frames), lifecycle, security. [`packages/portal-netgl/DESIGN.md`](../../packages/portal-netgl/DESIGN.md): nested guests, sub-frames, screen policy, open problems. |
| **Adds** | flattened same-page links (`makeNetGLNestedLink`); the in-frame insertion (`phase: 'opaque'` for an overlay drawn inside the host's pass); per-view depth parameters; the `enu` frame; the `portal.light/1` and `portal.ground/1` extensions; `shadow: 'lean'` and a staged set-up on the link; building statuses; a layer manifest; a `same-page` trust tier |
| **Targets** | portal-netgl after 0.5.0 (0.4.0 is [#34](https://github.com/pablo-mayrgundter/portal/pull/34); 0.5.0 is [#36](https://github.com/pablo-mayrgundter/portal/pull/36)) |
| **Related** | The integration: celestiary/web [#287](https://github.com/celestiary/web/pull/287) (merged; [CESIUM.md, New York](https://github.com/celestiary/web/blob/main/CESIUM.md#new-york)), slop-newyork [#1](https://github.com/pablo-mayrgundter/slop-newyork/pull/1) (merged; the guest, `js/guest.js`, `js/guest-cesium.mjs`, `js/ground.js`), celestiary/cesium branch [`celestiary/external-render-pass`](https://github.com/celestiary/cesium/tree/celestiary/external-render-pass) (`ExternalRenderer`, `Context.resetState`). portal #34 (sub-frames, `clear: 'none'`). The netmap × celestiary closing RFC takes 0003 or later. |

## 1. Summary

celestiary draws the solar system with three.js. On the Earth it hands the
globe to Cesium, a NetGL guest on the same page (DESIGN.md, [Lessons from
celestiary's Cesium layers](../../packages/portal-netgl/DESIGN.md#lessons-from-celestiarys-cesium-layers)).
Over Manhattan, Cesium draws Slop New York, a three.js city on three's
WebGPURenderer, a NetGL guest of Cesium, inside Cesium's own frame,
standing on its terrain and depth-composited with it. That's three engines,
two three.js builds and two links deep, all on one page. It shipped in
celestiary/web #287 and slop-newyork #1.

It works, but the chain is composed (each level's calls go through the
next level's recorder), and so the city's GL runs three times. Most of
what made it work is wiring in celestiary that belongs in portal or in
the guest. This RFC proposes the protocol and library pieces, drawn from
that integration:

1. **Flattening same-page chains** (§4): the city replays straight into
   celestiary's context, and Cesium only has to expose its link, its
   guest context and a handle lookup. This answers 0001's open question
   11 for same-page levels.
2. **The in-host-frame guest contract** (§5): drawn per depth frustum,
   inside the host's pass, against its depth. It covers no clears, linear
   output, log depth from per-view parameters, near and far supplied,
   sub-frames and bounds. Mapped onto 0001's shared depth and §9.7.
3. **Light and colour** (§6): a `portal.light/1` extension. The guest's
   output is in the host's light units, the light is the host's, and
   emission is drawn in a pass of its own (with an occlude-only pass).
4. **The ground** (§7): a `portal.ground/1` extension. The host samples
   its terrain where the guest asks, and the guest drapes within a budget.
   The section ends with the hazards found.
5. **The frame on the Earth** (§8): an `enu` frame at a geodetic origin
   with a grid bearing, composed in doubles. It also records a finding:
   the city's frame isn't quite a tangent plane.
6. **What moves into portal-netgl** (§9): `shadow: 'lean'`, a link that
   stages its set-up (and stops staging after it), the nested link, and a
   stencil policy that forbids writes.
7. **Lifecycle, loading and trust** (§10): a layer offered by range and
   switched on by the user, its building statuses, freeing, the permalink
   token, a separate three.js through an import map, and a code-origin
   allow-list for a guest that runs as trusted code on the host's page.
8. **Traversal** (§11): the eye moving into the city's frame, who owns the
   camera's floor, and doors inside a layer.
9. **Where layers live** (§12): a packaging and registry question, with a
   manifest.

§13 lists what changes in the existing docs and in 0001. §14 holds the
findings, §15 the open questions.

## 2. The use case and its assumptions

```
celestiary page (one realm, one GL context that draws)
─────────────────────────────────────────────────────────────────────────────
celestiary   three.js 0.171, WebGLRenderer, linear HDR scene buffer       root host
   │  Earth's link: makeNetGLImmediateLink, replay into celestiary's gl
   ▼
Cesium       Earth's CesiumWidget on a NetGL recorder (scene.context._gl) middle: guest of
   │         log depth, one frustum; scene.externalRenderers (the fork)   celestiary, host
   │  the city's link: makeNetGLImmediateLink, replay into Cesium's       of the city
   │  RECORDER, inside Cesium's pass, per frustum
   ▼
New York     slop-newyork's guest: three.js dev (WebGPURenderer, WebGL2   leaf: in-frame
             backend, TSL), loaded at run time from slop-newyork's site,   guest of Cesium
             its own three through an import map
```

What's built, and how it runs:

- **The hook.** Cesium calls an `ExternalRenderer`'s `render(p)` once per
  depth frustum its bounding volume overlaps, after that frustum's opaque
  geometry and before its translucent geometry. The pass's framebuffer is
  bound, its viewport is set, and its depth holds the globe. `p` has the
  view and projection in doubles, near and far, the frustum's index and
  count, the log-depth constants, the light, `frameNumber` and time.
  `Context.resetState()` runs after each call. With log depth on (Cesium's
  default) a frame is usually one frustum.
- **The guest in the frame.** slop-newyork's `cesiumExternalRenderer`
  composes Cesium's view with the city's model matrix in doubles, sets the
  guest's camera, near and far, and its log-depth uniforms. It points the
  link's `screenFramebuffer` at `p.framebuffer` and runs one guest frame
  on the link, ending with `endFrame()`. The guest is made with
  `composite: true` (no clears, no output target, no tone map) and
  `logDepth: true`.
- **The colour.** Cesium's frame is decoded by celestiary as one body, in
  celestiary's units. celestiary rewrites the city's materials and lights
  from outside (`inCelestiaryFrame`, `inCelestiaryUnits`) until the guest
  has an option for it (§6).
- **The ground.** The guest publishes sample points
  (`guest.groundSamples`). celestiary samples Cesium's terrain there
  (`sampleTerrain` at level 12 on a 100 m grid) and hands the heights to
  `guest.setGround`, and the guest drapes itself over them (§7).
- **The lean city.** celestiary keeps the city's objects out of two of the
  three contexts (`leanShadow`) and spreads its set-up over frames
  (`stageLink`): `netglLean.js` (§9).
- **The switch.** *New York (3D city)* in celestiary's layers control,
  offered only over Manhattan with Earth's Cesium layer in use, off by
  default, `layers:nyc` in the permalink (§10).

Assumptions. Each is a seam a later RFC can replace.

- **B1. Same page, synchronous.** Every level is on one page, on immediate
  links. Sub-frames need that (0001 §9.7), and so do the ground's sampling
  and a camera floor that reads the guest (§11). A cross-origin level is
  0001's business and can't be drawn in-frame (§5.6).
- **B2. One context draws.** As 0001's A1: the root's context is the only
  one whose pixels matter. Shadows exist to answer queries (§9.1).
- **B3. A trusted guest.** The city's JavaScript runs in celestiary's
  realm, loaded from an allow-listed origin (§10.6). This is 0001's
  `bundled` tier with the code fetched at run time, not bundled.
- **B4. An Earth-fixed host frame.** The middle host's world is ECEF
  (Cesium's fixed frame), and the leaf's frame is a local frame on the
  WGS84 ellipsoid (§8).
- **B5. A display-referred middle.** Cesium's frame reaches celestiary as
  8-bit stored values times light, not as HDR (CESIUM.md, [the colour and
  alpha contract](https://github.com/celestiary/web/blob/main/CESIUM.md#the-colour-and-alpha-contract)).
  §6 is written so a linear-HDR middle is a second value of the same
  field.

## 3. Terms

0001's terms (§3) stand. Added here:

| Term | Meaning |
|---|---|
| middle host | a layer that is a guest of its parent and a host of its children (Cesium here) |
| leaf | a layer with no children (New York) |
| composed chain | each level's link replays into the next level's recorder, so a leaf's call executes at every level |
| flat chain | a leaf's link replays straight into the root's context; the middle never sees its calls (§4) |
| in-frame guest | an overlay drawn at an insertion point inside the host's pass, between its own draws (§5) |
| insertion point | where in its frame the host calls the guest (0001 §5.4); here, after each frustum's opaque pass |
| stored-lit | a frame's colour units: a surface's stored (sRGB-encoded) albedo times the light, linear in the light (§6.2) |
| lift | the guest's per-vertex raise of its flat geometry onto the host's ground (§7) |
| drape | splitting the guest's flat ground layers so the lift doesn't cut through hills (§7) |
| set-up | everything a guest does before its first frame: build, upload, compile (§9.2) |

## 4. The chain, what it costs, and flattening it

### 4.1 Composed, as built

The city's link replays into `scene.context._gl`, which is Cesium's NetGL
recorder. That recorder is replaying into celestiary's context at that
moment, because Earth's `link.frame()` is open around `widget.render()`.
So each city call:

1. executes on the city's shadow context;
2. is encoded, decoded and replayed into Cesium's recorder, which
3. executes it on Cesium's shadow, observes it in Cesium's trackers, and
4. encodes, decodes and replays it into celestiary's context.

That's three GL executions, two encode-decode passes and two trackers per
call, for every draw and every checkpoint call (DESIGN.md, [Nested
guests](../../packages/portal-netgl/DESIGN.md#nested-guests-cesium-drawing-new-york)).
What composing buys is that nothing has to cooperate. Cesium's handles
intern the city's objects as they do its own, and its trackers see the
city's state. Cesium's own `resetState()` after the callback goes through
the same recorder, so Cesium's checkpoint stays right without Cesium
knowing a guest ran.

### 4.2 What it costs

From CESIUM.md, [What it costs, and the lean
city](https://github.com/celestiary/web/blob/main/CESIUM.md#what-it-costs-and-the-lean-city).
Measured headless (SwiftShader, 480×300, no ion, so the Earth was on the
Blue Marble and the ellipsoid; the hero view 3 km over the Upper Bay
looking up the island):

| | Without the city | The city as it came (composed) | Lean (now) |
|---|---|---|---|
| JS heap + ArrayBuffers, settled | 49 + 89 MB | 295 + 320 MB | 160 + 280 MB |
| Renderer process RSS | 394 MB | 941 MB | 739 MB |
| GPU process RSS | 510 MB | 1,162 MB | 829 MB |
| City's GPU buffers + textures: its shadow / Cesium's shadow / celestiary's | | 112+23 / 112+23 / 112+23 MB | 0.3+23 / 0.4+23 / 112+23 MB |
| City's draws a frame: its shadow / Cesium's / celestiary's | | 182 / 182 / 182 | 0 / 0 / 183 |
| Set-up calls copied into the link's queue | | 20,273 calls, 133 MB | 0 (19 MB of small calls copied in the stage) |
| The city's first frame | | 2.6–4.2 s | 0.27 s, after 23 chunks of 0–1.3 s over as many frames |
| A frame, aerial (JS) | 36 ms | 71 ms (city 14 ms) | 63 ms (city 15 ms) |
| A frame at street level, 25 m up on 5th Ave (JS) | | 10.5 s (city 9.4 s) | 89 ms (city 25 ms) |

Still paid, lean or not:

- **The city's 64 programs compile three times** (its shadow, Cesium's
  shadow, celestiary's), because the recorder needs uniform locations from
  the shadow at each level. The compile is the longest step of the load
  (17 s on SwiftShader).
- **One encode-decode pass and one tracker too many** per call.
- **The checkpoint is cloned.** About 107 calls a frame at the aerial
  view go into the stage's queue, because `cesiumExternalRenderer` ends
  with `endFrame()`, not `subFrame()` (§5.5).
- **Lean is a patch on the middle.** Cesium's shadow is made lean only
  while the city's calls run through it (`leanShadow(cesiumShadow, () =>
  inCity > 0)`): own properties on a context that Cesium's guest made,
  switched by a counter that celestiary keeps.

On a real GPU (an Apple M2, ANGLE Metal, Brave) the city's own cost
dominated, more than the chain's. From the user's guest.html and the app's
`?webgl` measurements:

- three's WebGL2 backend is about 2× slower than its WebGPU backend at the
  same view (the guest always runs WebGL2, because NetGL records WebGL2);
- a device pixel ratio of 2 (4× the pixels) costs about 2.6×;
- the sun's shadows and ClusteredLighting together cost about 4.5×: with
  both off, street level went from ≈10 to ≈45 fps (celestiary/web
  2a97cd0f).

The layer now runs with `lights: false` and shadows off.

### 4.3 Flat vs composed: 0001's open question 11

0001 §9.1 decided to flatten: every guest replays into the root's context,
and the root creates every iframe. #34 then ran the composed shape. The
question was whether composed is acceptable for same-page levels.

**Proposed answer.**

- *Same-page levels flatten when the middle is a NetGL guest on an
  immediate link*, which is the case here. It needs three small things
  from the middle (§4.4) and no change to the root.
- *Composed stays as the fallback* for a middle that can't expose them
  (one that isn't NetGL-aware, or whose recorder is in another realm). It
  is correct, only expensive.
- *Cross-origin levels* follow 0001 §9.1 (the root creates the iframes),
  but they can't be in-frame (§5.6).

Flattening isn't the "root creates every child" of 0001 §9.1. On one page
the middle's adapter makes the leaf's link, with the root's link handed to
it. The root learns of the child only as a layer path (`/earth/nyc`) for
anchors, status and budgets. `layer:children` stays for cross-origin
children (§13).

**Why the middle's checkpoint stays correct when flattened.** Seen from
the middle, a flattened leaf is a host that drew between the middle's
calls, which is exactly the sub-frame case (DESIGN.md,
[Sub-frames](../../packages/portal-netgl/DESIGN.md#sub-frames)):

- The middle's shadow and trackers never see the leaf, so they still hold
  the middle's own intended state.
- The root's context holds the leaf's state.
- So before the middle's next call, its tracked checkpoint must replay on
  the root. `subFrame()` already does this: it posts the checkpoint just
  before the guest's next call, captured from tracked state, with no
  queries.
- Here the next call is the first call of Cesium's own `resetState()`,
  inside Earth's still-open `link.frame()`, so the checkpoint replays
  directly and isn't cloned.
- `resetState()` alone isn't enough, because it doesn't reset the
  textures on each unit or the indexed uniform-buffer bindings
  (DESIGN.md, Sub-frames). The checkpoint covers those.

Three things change on the outer replay:

- **It must drop its beliefs** (`replay.invalidate()`). With a screen
  policy, it tracks what it has applied.
- **The leaf's screen is a middle handle.** `p.framebuffer` is Cesium's
  globe-depth framebuffer, an object of Cesium's shadow. The leaf's replay
  needs the root's object for it, so it asks the outer link to resolve it:
  middle handle → the middle recorder's id → the outer replay's object.
- **When the leaf's screen is the middle's screen** (`p.framebuffer ===
  null`: Cesium drawing straight to its canvas), the outer link's
  `screenFramebuffer`, viewport remap and screen policy apply to the leaf
  too, composed with the leaf's own policy (`clear: 'none'` ∧ the outer's
  stencil and blend).

### 4.4 What the middle host must expose

| What | Why | Cesium's middle today |
|---|---|---|
| Its immediate link to its parent (`outer`) | the leaf replays through the outer replay's context and policy | `body.link` in celestiary's `CesiumLayers` |
| Its guest context (`middle`), with `resync()` | the deferred checkpoint after each leaf frame (§4.3) | `body.guest.core` (makeNetGLCesiumGuest); `resync` is new: `subFrame()` without the frame-end |
| `outer.resolve(handle)`: a middle object → the root's object | the leaf's screen framebuffer, and any middle object it is handed later (a depth texture, open question 2) | not exposed: the recorder's `handleToId` and the replay's `idToHandle` are internal |
| A reset of its own framework's state cache after the leaf | its cache doesn't see the leaf's calls in either shape | `Context.resetState()`, after every external renderer (the fork) |
| No readback of the leaf from its shadow | its shadow never has the leaf's pixels | Cesium's picking doesn't call external renderers |

### 4.5 The nested link

```ts
// portal-netgl, after 0.5.0
interface NetGLNestedLinkConfig {
  outer: NetGLImmediateLink        // the middle's link to its parent; must be open during frame()
  middle: NetGLGuestContext        // the middle's guest context; resync()ed after each leaf frame
  replay?: {
    /** The leaf's default framebuffer: a MIDDLE object (Cesium's p.framebuffer), or null for the middle's screen. */
    screenFramebuffer?: () => WebGLFramebuffer | null
    screen?: NetGLScreenPolicy     // composed with the outer's when the leaf's screen is the middle's
  }
  setup?: NetGLSetupStaging        // §9.2
  onError?: (err: unknown) => void
}

// Same shape as NetGLImmediateLink: transport, frame(render), queued, replay; plus
interface NetGLNestedLink extends NetGLImmediateLink {
  readonly outer: NetGLImmediateLink
  dispose(): void                  // deletes the leaf's objects on the root, frees its handle table
}

declare function makeNetGLNestedLink(config: NetGLNestedLinkConfig): NetGLNestedLink

// On NetGLImmediateLink (new):
//   resolve(guestObject): the host's object for one of the guest's handles, or null
// On NetGLGuestContext (new):
//   resync(): post the tracked checkpoint before the guest's next call, with no frame-end
```

Rules:

- `frame()` throws unless `outer` is open (inside the outer's `frame()`).
  A nested leaf can't be drawn outside its parent's frame.
- After `render` returns, the link calls `middle.resync()` and
  `outer.replay.invalidate()`.
- The leaf gets its own handle table on the root, as any link does. Two
  leaves under one middle don't share objects. That's DESIGN.md's
  "multiple targets, one host" open problem, solved per link.
- Calls the leaf makes while the link is closed (its set-up) queue as
  today, or stage (§9.2), and replay at its next `frame()` or `step()`,
  which must also run inside the outer's frame.
- Deleting through the leaf's link deletes on the root only. The middle's
  shadow never had the objects.

**Expected effect** (an estimate, not measured):

- Each leaf call executes twice (the leaf's shadow, lean, and the root's
  context), with one encode-decode pass.
- The programs compile twice instead of three times.
- Cesium's shadow never sees the city, so `leanShadow(cesiumShadow, …)`
  and its counter go.
- Per leaf frame it adds one middle checkpoint, about 80 calls plus 6 per
  texture unit Cesium uses (DESIGN.md, Sub-frames). That's about what the
  composed chain already pays for the leaf's own checkpoint, and it
  replays without a clone.

**Doesn't fix:** the leaf's own GPU cost (§4.2's M2 numbers), its JS heap
(three keeps every attribute's array), or the drape's main-thread time
(§7).

## 5. The in-host-frame guest contract

### 5.1 Where it sits among 0001's kinds

New York has no shape and no stencil. It tests against the host's depth
and draws with the host's projection, so it is 0001's **`overlay`** kind
(§4) in **`shared`** depth (§5.1). It differs from 0001's overlay in four
ways:

- **It's drawn inside the host's pass, not after it.** The insertion is
  after each frustum's opaque geometry, so the host's translucent geometry
  draws over it. That's 0001 §5.4's phases, built: `phase: 'opaque'`.
- **It writes depth** (`write: true`). Cesium's contract asks for it,
  later translucent passes test against it, and Cesium's distance stage
  turns that depth into the alpha celestiary reads for its haze.
- **It's bounded.** It has an oriented box, not a sphere (§5.5).
- **It's drawn once per frustum** (0001 §9.7).

So this RFC adds no kind. It asks 0001 to let an overlay be inserted
mid-frame (open question 1).

### 5.2 The guest's obligations in the host's frame

From the external renderer's contract (the fork's `ExternalRenderer.js`)
and #34:

| The host needs | Why | How the city does it | Library home |
|---|---|---|---|
| No clears of the screen | the host's depth holds the globe the guest tests against | `composite: true`: `autoClear = false` | screen policy `clear: 'none'` (0.4.0) |
| No output pass of its own | three's WebGPURenderer, with an sRGB output or a tone map, draws into its own target and copies it over the whole screen with no depth, which wipes the host's frame | `composite`: linear output, no tone map; each material encodes (or not) in its `outputNode` | guest-side only: no policy can stop a guest drawing its own full-screen quad |
| Stencil untouched | Cesium keeps classification bits there | three writes none unless a material asks | screen policy `stencil: 'no-write'` (§9.4) |
| Depth written the host's way | shared depth | `logDepth: true`, per frustum (§5.3) | `SharedDepth.encoding` + `view.depth` |
| The host's view, near and far | the frustum's projection | `setView({matrixWorld, projectionMatrix, near, far})` | `layer:view` |
| Bounds | culling, the frusta's near and far fit, which frusta to call it in | `guest.bounds()` → `cityBoundingVolume` | `LayerExtent.box` (§5.5) |
| No reversed depth | the guest's `EXT_clip_control` call is an extension-object method, which bypasses the recorder | `reversedDepthBuffer: false` | DESIGN.md's extension-objects open problem |

### 5.3 Depth: the encoding in the ack, its parameters in the view

0001 §5.1 puts the log encoding's parameters (`near`,
`oneOverLog2FarDepthFromNearPlusOne`) in `hello-ack`. They change every
frame and every frustum, so this RFC splits them: the kind goes in the
ack, the numbers in each view.

```ts
// hello-ack, as 0001's SharedDepth, with the encoding's kind only
interface SharedDepth {
  mode: 'shared'
  func: 'less' | 'lequal'
  write: boolean                    // in-frame guests: true
  clip: { z: 'neg-one-to-one' | 'zero-to-one'; reversed: boolean }
  bits: 16 | 24 | 32
  encoding: 'projection' | 'log'    // changed from 0001: no parameters here
}

// per view (LayerView, §5.4)
type ViewDepth =
  | { kind: 'projection' }
  | { kind: 'log'; near: number; farDepthFromNearPlusOne: number;
      oneOverLog2FarDepthFromNearPlusOne: number }
      // gl_FragDepth = log2(w − near + 1) · oneOverLog2…; Cesium discards outside (1, farDepthFromNearPlusOne]
```

- **Near and far are supplied, never decoded** (`view.clipRange`,
  required when `depth.kind` is `'log'` or `subFrame.count > 1`).
  Reading them back from `p[10]` and `p[14]` is ill-conditioned once
  far / near is large, and Cesium's single log-depth frustum is about 1e7
  (slop-newyork README, *Inside a host's frame*).
- **Depth goes in through the material's `setupDepth`, not its
  `depthNode`.** three's shadow pass takes a material's `depthNode` for
  the shadow map, and a log depth there corrupts the cascades. That's a
  guest-side gotcha, for `portal-layers.md`'s list.
- **The guest clamps where Cesium discards.** The city writes
  `log2(max(w − near + 1, 1))`, and Cesium discards fragments outside
  `(1, farDepthFromNearPlusOne]`. The projection clips the same fragments,
  so this hasn't mattered. A guest SHOULD discard as the host does.
- **Ties.** Cesium's render state tests `LESS` by default, and three's
  materials `LEQUAL`, so a tie between the city's deck and the globe goes
  to the city. Nothing relies on it: the city stands on the terrain's
  height plus its 2.2 m freeboard (§7.4).

### 5.4 The view an in-frame guest gets

`ExternalRenderer.RenderParameters` mapped onto 0001's `LayerView` (§6),
with the fields this RFC adds:

```ts
interface LayerView {                       // 0001 §6, plus:
  frame: FrameId                            // 'ecef', or a layer's own frame id ('nyc', §8); 0.5.0's type allows 'ecef' only
  viewMatrix: Mat4                          // Cesium's viewMatrix × the layer's toParent, in doubles: rigid
  projectionMatrix: Mat4                    // p.projectionMatrix, this frustum's
  viewport: [number, number, number, number]// p.viewport
  pixelRatio: number                        // p.pixelRatio
  timeMs: number                            // p.time (a JulianDate) as Unix ms
  clipRange?: { near: number; far: number } // p.near, p.far: REQUIRED here (§5.3)
  subFrame?: { index: number; count: number; hostFrame: number }
                                            // index = p.frustumIndex (0 the nearest; drawn far to near),
                                            // count = p.frustumCount; hostFrame = p.frameNumber (new)
  depth?: ViewDepth                         // §5.3 (new)
  phase?: 'opaque'                          // §5.1
  light?: LayerLight                        // §6 (extends 0001's)
}
```

- **`subFrame.hostFrame` is new.** Per-frame work (stepping the
  simulation, setting the sun) runs once per host frame. #34 and
  `cesiumExternalRenderer` key it on Cesium's `frameNumber`. A
  host-neutral field lets a guest do the same without knowing the host.
- **The city's animation runs on wall time, not the host's clock.** Its
  traffic and signals step by the wall clock between host frames, while
  its sun follows the host's light. That's 0001 §7.1's `elapsedMs`
  (animation that isn't simulation, running while paused), and it should
  say so in `hello` (`time: 'elapsed'`), so a host knows a paused clock
  won't freeze the cars. Its sun follows the host's simulated time through
  the light.

### 5.5 Sub-frames: adopting `subFrame()`

0.4.0's `subFrame()` posts the frame-end now and defers the checkpoint to
the guest's next call, inside the next `link.frame()`, where it replays
without a clone. The chain doesn't use it yet: celestiary pins
portal-netgl 0.3.0, and `cesiumExternalRenderer` ends with `endFrame()`.
Adopting it takes:

1. **slop-newyork**: `cesiumExternalRenderer` ends each frustum's frame
   with `guestCtx.subFrame()`, falling back to `endFrame()` for an older
   portal-netgl (`typeof guestCtx.subFrame === 'function'`).
2. **celestiary**: portal-netgl ≥ 0.4.0 for both links (Earth's and the
   city's), and the city's replay given `screen: {clear: 'none'}` too, so
   the policy, not only the guest's `composite`, keeps clears off
   Cesium's frame.
3. **`stageLink`**: its cuts call `endFrame()` to get a checkpoint at each
   chunk's end. With `subFrame()` that checkpoint lands as the next
   chunk's first call, inside `step()`'s `link.frame`, and isn't copied.
   In steady state the stage then queues nothing between frames (its
   `framed` path is empty).
4. **Calls between frames.** Any GL call the guest makes outside
   `link.frame()` triggers the deferred checkpoint while the link is
   closed, which clones it. That's correct, only copied.
   `cesiumExternalRenderer` calls `guest.update()` before `link.frame`;
   update makes no GL calls today, but a texture loaded asynchronously
   would.
5. **Cesium's own guest** (`makeNetGLCesiumGuest`) still ends each Cesium
   frame with `endFrame()`, which clones one checkpoint a frame for
   Earth's link. DESIGN.md (Sub-frames, *Not done*) calls deferring that a
   small option on the shim. With the nested link (§4.5) it matters more,
   since `resync()` is the same mechanism.

Expected saving: about 107 calls a frame not cloned. The calls replayed
are the same; nothing was wrong without it (CESIUM.md, *What's left*,
Cost).

### 5.6 Bounds and culling

```ts
interface LayerExtent {                       // 0001 §5.3, plus:
  box?: { frame: FrameId; min: Vec3; max: Vec3 } // the layer's own frame, metres: an oriented box once mapped
}
```

- The city publishes an axis-aligned box in its frame, with the lift
  applied and 10 m of padding (`guest.bounds()`). Mapped through the
  frame (§8) it's an oriented box on the globe (`cityBoundingVolume`):
  14 km by 5 km by a few hundred metres. A sphere around it would be
  about 7 km in radius, and Cesium would fit its near plane to that.
- The box moves when the ground does (`setGround`): `layer:extent` again.
  `cesiumExternalRenderer` reads it on every `boundingVolume` access.
- Cesium uses the box three ways: to cull, to fit the frusta's near and
  far, and to call the guest only in the frusta it overlaps.
- **Sub-frames need a synchronous binding** (0001 §9.7). A cross-origin
  in-frame guest isn't proposed.

### 5.7 Insertion points: 0001's open question 13

- **Real hosts have phases.** The in-frame guest is `phase: 'opaque'`.
  The city draws its own transparent materials in that call, after its
  opaque ones. They blend over the globe correctly and
  under Cesium's translucent geometry, which draws later.
- **Nothing here needs a `translucent` insertion.** It would be a second
  callback per frustum, with the opaque depth written.
- **Sub-frames and phases are synchronous-only**, as 0001 proposes.

## 6. Light and colour: the `portal.light/1` extension

0001 assumed (A5) that its content was mostly unlit and left colour to
`portal-layers.md`'s contracts. A lit city in a host's frame breaks that.

### 6.1 What went wrong, and the stopgap

The city's pixels land in Cesium's frame, and celestiary decodes that frame
as one body. In the stored-lit units (§6.2), a white Lambertian wall
facing the Sun reads 1 (CESIUM.md, the colour and alpha contract). The
guest instead wrote its own presets:

- **Its own light.** The Sun was at 5.8–6.6 in three's units (a white wall
  at 2.1, clipped in Cesium's 8 bits), plus a sky light at 1–1.6.
- **Its own encode.** Its shading was sRGB-encoded at the end, so its
  light went through sRGB's curve: a wall at 15% of the Sun showed at 42%
  of its sunlit value.
- **Its own emission.** Lit windows, lamps and signals were under a code
  of the frame by day, and a sunlit white at night's gain (up to 4e6).
- **Its own moon** under the horizon.

Measured headless, the city's median luma was 0.539 against the Blue
Marble ground's 0.277, twice the ground.

celestiary's stopgap reaches into the guest's materials and lights before
they compile (`newYorkGuest.js`):

- `inCelestiaryFrame`: each material's diffuse colour is sRGB-encoded back
  to its stored value before it's lit, and the output is linear. Unlit
  materials scale with the daylight. Emission is multiplied by 0. An
  `occlude` uniform selects black.
- `inCelestiaryUnits`, after every `setSun`: the Sun white at π (three's
  Lambert is albedo / π, so a white wall reads 1) and 0 once it's down.
  The hemisphere light is at 15% of the Sun and the environment at 0.15,
  both fading with the Sun. The guest's light switch
  (`uInteriorGlow`) is at 0.

After it, the city's median is 0.209 against the ground's 0.277. At night
it's black with the ground, but for 5 specks in 144,000 pixels that the
hooks don't reach (shading outside them, likely the presets' sky
colours, not yet found).

### 6.2 Units

```ts
type LightUnits =
  | 'stored-lit'   // rgb = stored (sRGB-encoded) albedo × E / E_sun, linear in light, no encode, no tone map:
                   //   a white Lambertian surface facing the sun at intensity 1 is 1.0. Celestiary's Cesium frame.
  | 'linear-hdr'   // rgb = linear albedo × light in the host's exposure units, tone-mapped later by the host
  | 'display'      // portal-layers 0.1's: the guest's own final display values (a guest that owns its look)
```

`stored-lit` lights the stored value. That's a choice celestiary made
for its bodies, not physics (DESIGN.md, *Light and colour must match*). It
is declared so that a guest can match it, not so others adopt it.
`linear-hdr` is the same contract for a host that renders in HDR (Cesium
with `highDynamicRange`, which `cesiumExternalRenderer` already maps to
`setLinearOutput(true)`).

### 6.3 Messages

```ts
// hello: the guest asks
ext: { 'portal.light/1': { units: LightUnits[]; passes: LightPass[]; emission: boolean } }

// hello-ack: the host fixes
ext: { 'portal.light/1': {
  units: LightUnits
  range?: [number, number]        // what the target holds before it clips (8 bits: [0, 1])
  passes: LightPass[]             // the passes this host will ask for (§6.4)
  emissionUnits?: number          // emission pass: host units for a guest emissive radiance of 1
}}

type LightPass = 'lit' | 'emission' | 'occlude'

// per view (LayerView.light; 0001's {direction, intensity} extended)
interface LayerLight {
  pass: LightPass                 // default 'lit'
  sun: { direction: Vec3; intensity: number; color?: Vec3 }
                                  // layer frame, toward the light; intensity 1 = the host's sunlit white;
                                  // 0 below the horizon: the HOST decides, the guest adds no moon of its own
  sky?: { intensity: number; color?: Vec3; model: 'hemisphere' }   // as a fraction of the sun
  environment?: { intensity: number }                              // the guest's baked reflections
  exposure?: number               // linear-hdr only
}
```

Rules:

- **The guest lights with the host's light only.** It has no presets, no
  sun or moon of its own, and sets no daylight of its own. The host's
  atmosphere colours the sun, so `color` defaults to white.
- **Emission is out of the `lit` pass**: emissive nodes, emissive colours,
  lamps (point and spot lights) and unlit materials' own glow. Unlit
  materials are lit as if by the sun, scaled by `sky.intensity` (the
  stopgap's `daylight`).
- **The `emission` pass** draws emission alone: the surfaces black, depth
  as ever, emission scaled by `emissionUnits`. For celestiary that's the
  night lights' frame. The Black Marble's full-white texel is
  `NIGHT_LIGHT_RADIANCE` (3e-5) of a sunlit white, and the city's lights
  belong at that scale. Not built: the stopgap draws the city black there.
- **The `occlude` pass** draws the guest black, with its alpha and depth
  as ever. It's needed because the night lights' frame is a second Cesium
  frame of the globe, and with the city hidden there the Black Marble's
  ~500 m texels drew through the buildings (1,373 of 1,374 of the city's
  pixels at a 12 km view). Drawn black, none did. It costs a second draw
  of the city in every frame the lights draw.
- **The pass rides in the view**, so it's tied to `viewId`. A host frame
  can ask for several passes of one layer, each a sub-frame.

### 6.4 Occlude without the guest's help

A screen policy can do the occlude pass from outside. With blending forced
to `blendFuncSeparate(ZERO, ZERO, ONE, ZERO)` for screen draws, the rgb
written is 0 whatever the shader computes, and the alpha and depth are the
guest's. So `screen.blend: 'occlude'` would draw any guest black, with no
uniform. Caveats:

- **NaN.** A NaN from the shader times a zero factor may stay NaN. The
  stopgap uses `select` rather than a multiply for this reason.
- **Discarded fragments.** Translucent and discarded fragments behave as
  they would in the lit pass.

Open question 7.

### 6.5 What the guest needs (slop-newyork)

From CESIUM.md's *What slop-newyork needs*, as options of the guest:

1. `units: 'stored-lit'`: in `prepareMaterials`, after three's
   `setupDiffuseColor`, `diffuseColor.rgb =
   sRGBTransferOETF(diffuseColor.rgb)` (vertex and instance colours
   included), with linear output and no tone map.
2. `setLight(LayerLight)`, in place of `setSun`'s presets.
3. `setPass('lit' | 'emission' | 'occlude')`.

Then celestiary's `inCelestiaryFrame` and `inCelestiaryUnits` go.

## 7. The ground: the `portal.ground/1` extension

### 7.1 Today

1. **The guest asks.** `guest.groundSamples(spacing)` returns lon/lat
   pairs on a grid over the island, in the guest's frame turned to
   geodetic (`worldToLonLat`).
2. **The host samples its terrain there.** celestiary uses
   `Cesium.sampleTerrain` at level 12 on a 100 m grid: 8,000 points, about
   a dozen World Terrain tiles, a few hundred KB of ion data. It's billed
   by data, so it starts no imagery session. It doesn't use
   `sampleTerrainMostDetailed`, which would fetch the finest tiles.
   slop-newyork's own `groundFromCesium` does use it, or level 14 for a
   provider without availability.
3. **The host hands the heights back.** `guest.setGround(heights,
   {seaLevel, drape})`: metres above the ellipsoid, NaN where it had none.
   The guest then sets `frame.height0`, the ground at its origin, where
   the host places the frame.
4. **The guest drapes.**
   - Every vertex is lifted by the ground's height over `height0`, less
     the globe's curve (d² / 2R, about 4 m at the drawn island's ends).
     The lift goes into every material's `positionNode`, after
     instancing.
   - The flat ground layers (deck, seawall, lawns, sidewalks, paint) are
     split where the ground bends, within a budget.
   - Shading keyed to height above the street (storeys, kerbs,
     waterlines) reads `deckPosition()`, which takes the lift back off.
   - The simulation, colliders and culling stay flat.
5. **The host samples again when its terrain changes.** On the plain
   ellipsoid every height is 0 and nothing is fetched, so the city stands
   on the ellipsoid, curving with it. When World Terrain replaces it,
   `update()` notices the provider change and samples again.

### 7.2 Messages

```ts
// guest → host
interface LayerGroundRequest {
  type: 'layer:ground-request'
  requestId: number
  points: { lonLat: Float64Array; cols: number; rows: number; spacingM: number } // degrees, WGS84 geodetic, row-major
  detail?: { metresPerSample?: number }   // what the guest can use; the host picks a level (Cesium: 12 for 100 m)
}

// host → guest
interface LayerGround {
  type: 'layer:ground'
  requestId: number
  heights: Float64Array          // m above the host's ellipsoid; NaN where it has none (the guest fills from neighbours)
  ellipsoid: 'wgs84'
  seaLevel: number               // the host's mean sea level there, same datum (Manhattan: −32.7 m; a scalar for now)
  source: { provider: string; level?: number; approximate: boolean } // 'ellipsoid' (all 0), 'cesium-world-terrain'@12
  epoch: number                  // bumps when the host's terrain changes; the guest re-requests
  budget?: GroundBudget
}

interface GroundBudget {         // the host's say in what the drape may cost
  tolerance: number              // m: how close a split layer stays to the ground (city default 0.004; lean 0.1)
  minEdge: number                // m: no edge split shorter (default 2; lean 8)
  maxCells?: number              // no edge longer than this many ground cells (default 4)
  maxTriangles: number           // shared by area; each layer keeps at least its own (lean 1.5e6; the flat layers are 0.93e6)
  maxMs?: number                 // main-thread time per drape; past it, stop and report capped (not built)
}

// host → guest: the terrain changed (World Terrain replaced the ellipsoid; refined tiles)
interface LayerGroundInvalidate { type: 'layer:ground-invalidate'; epoch: number; reason: 'provider' | 'refined' }

// guest → host, in layer:status
interface GroundStatus { ground?: { epoch: number; triangles: number; capped: boolean; ms: number } }
```

- **Push of a grid the guest names.** The guest knows where its ground
  layers are and how fine it needs them. The host knows its terrain and
  what it costs to fetch (ion's billing, tile levels). So the guest names
  points and the host picks the level.
- **Heights above the ellipsoid, with sea level beside them.** The city
  holds its 2.2 m freeboard over `seaLevel` at the shore and the piers.
  Its water and river beds don't sink below it, and anything at or under
  the harbour's surface keeps its height. Over Manhattan the geoid is
  about −32.7 m, which is a scalar to within a metre. A geoid grid is open
  question 9.
- **The frame's origin height comes from the guest.** `height0` is the
  ground at the origin, so the guest's frame map changes when the ground
  arrives. That reverses 0001 §9.1, where the parent supplies the frame
  map: here the child's frame (§8) depends on host data that the child
  processed. The guest resends its frame (`layer:frame`), and the host
  composes it.
- **Same page only, for now.** `sampleTerrain` is asynchronous. Over an
  async transport the request and the answer are ordinary messages, so the
  extension isn't tied to B1. Only the camera floor (§11) is.

### 7.3 The drape's two forms

slop-newyork has two (`js/ground.js`, THE GROUND, THE DRAPE):

- **Tolerance.** The guest's form: split until within `tolerance`, under
  the budget above.
- **Exact.** The app's own `?ground=terrain`: the ground linear over its
  grid's triangles, and the layers cut along the grid's lines and
  diagonals (`conformTriangles`). It's watertight, so the paint stays
  12 mm over the deck on any slope. On a 40 m grid it's about 3.0 M
  triangles, and its cost is edge length times line density (sidewalk
  strips mostly).
  - celestiary's lean tolerance drape (10 cm, 8 m, 1.5 M) left the deck
    more than 12 mm over the ground on 43% of the island, up to 29 m where
    its budget ran out.

A host that sees the city from afar takes the tolerance form. A host whose
camera goes to street level (§11) wants the exact one. The budget says
which: `GroundBudget.form: 'tolerance' | 'exact'` (open question 8).

### 7.4 Hazards found

- **A drape that never ended on real terrain.** At 4 mm, real terrain
  bends a little everywhere. The deck alone split to 2.9 M triangles
  (140 s), and slivers along straight shores (corners in a line) asked to
  be split for ever. On the preview with ion that pinned the main thread
  with its memory climbing. It's the likely cause of the first preview's
  tab crash. Headless never saw it: with no ion every height was 0.
  - Fixed in the guest: slivers don't ask for splits.
  - Fixed in the host: `LEAN_DRAPE`. On Terrarium heights resampled to
    the 100 m grid that's 4.5 s and 1.67 M triangles, against 12 s and
    3.1 M at 2 cm.
  - The lesson for the contract: **the host bounds the drape**
    (`GroundBudget`), and tests use real heights, not only a demo hill.
- **Undersides over concave ground.** The tolerance drape lifts every face
  of a ground layer, its underside too. An unsplit triangle is a chord of
  the hill: under the ground on the crown, but over it past σ, where the
  hill is concave. Central Park's extrusions had 4 km undersides standing
  4–11 m over Sheep Meadow, a roof at a driver's eye, and their shadow
  stand-ins shaded the meadow. Fixed by splitting the undersides too.
- **Geometry that already models relief.** The boroughs and New Jersey
  model their own (the Palisades, Jersey City Heights), and the George
  Washington Bridge ramps up to the real bluff's height. A lift would
  double them. The ground is Manhattan's only (`manhattanMask`), and the
  bridge is `userData.groundFixed`. A guest declares what it lifts
  (`ground.mask`), and a host that draws the rest of the ground doesn't
  assume the whole extent follows its terrain.
- **Cameras below the ellipsoid.** Manhattan's ground is about 30 m under
  WGS84 (the geoid at −32.7 m), so a camera at street level is under the
  ellipsoid. celestiary's atmosphere pass decided whether the Sun was
  behind the planet by a ray-sphere test (`rsi`) whose difference of
  squares, at ~6.4e6 m in float32, came out on either side of the sample
  within a metre of the sphere. It lit the night's air in blue bands on
  the buildings, and the meter's gain went to 0.01 where the dark frame
  wants ~150. The fix is in the host, not the guest (`sunBelowHorizon`
  from (r − R)(r + R)). The general hazard: **a ground layer brings the
  eye where the host's own tests had never been**: under its reference
  surface, at metres from it. That goes in `portal-layers.md`'s gotchas.

## 8. The frame on the Earth: `enu`

0001 §9.6 asked for "an `enu` frame at a geodetic origin" first.

### 8.1 The descriptor

```ts
interface EnuFrameDescriptor {
  id: string                       // the layer's frame id, e.g. 'nyc': a FrameId (0001 §6.1)
  kind: 'enu'
  origin: { lonDeg: number; latDeg: number; heightM: number } // geodetic on `ellipsoid`; heightM = the guest's height0
  ellipsoid: 'wgs84'
  toEnu: Mat4                      // layer frame → east-north-up metres at origin, rigid, column-major
  gridBearingDeg?: number          // informative: the layer's grid north, clockwise from true north
  placement?: 'tangent-plane' | { kind: 'equirectangular'; lat0Deg: number } // how the layer's own data was placed (§8.3)
}
```

For the city:

- **Origin.** `(−73.98185°, 40.75318°)`, the centrelines of 5th Ave and
  42nd St. Its height is `height0`, 0 until the ground arrives.
- **Axes.** x is grid east, y is up, z is grid south.
- **`toEnu`** (`frame.worldToEnu`) turns y-up into z-up and turns the
  grid. Manhattan's grid north is 29.02° east of true north (29.017° in
  `tools/geo-base.mjs`, refined from the avenues).
- **`toParent`** (0001's `FrameMap`) is the host's ENU at the origin
  (Cesium: `Transforms.eastNorthUpToFixedFrame`) times `toEnu`. That's
  `cityModelMatrix`.

### 8.2 Composing it

- **In doubles, each frame, per frustum.** `cesiumExternalRenderer`
  computes `p.viewMatrix × cityModelMatrix`, inverts it in doubles, and
  hands the guest a camera in its own frame. three then composes each
  object's `modelViewMatrix` in doubles on the CPU and uploads float32.
  That's 0001 §6.2's RTC, per object, for free.
- **float32 on the GPU then sees numbers under ~14 km**, the island's
  length, so the ULP is ≤ 1 mm. ECEF coordinates never reach the GPU.
  Composing through celestiary's own world would put metres of float32
  error at the surface (0001 §6.2). The camera chain stays in doubles
  from celestiary's camera to Cesium's to the city's.
- **The view is rigid.** Cesium's view is rigid and `toEnu` is a proper
  rotation (both frames are right-handed), so 0001 §6.1's rule holds.
  Scale lives in the projection.

### 8.3 Finding: the city's frame is equirectangular, not a tangent plane

Computed for this RFC (not seen in a render). slop-newyork builds its
geography by a linear map from lon/lat to metres at `LAT0`, the
equirectangular scale there, then turns it with the grid. The host places
that frame as a true tangent plane at the origin. The two agree at the
origin and drift apart with distance:

| Where | From the origin | Horizontal offset between the drawn point and its source lon/lat |
|---|---|---|
| Hudson Yards (west) | 2 km | 0.4 m |
| Lower East Side | 4 km | 0.7 m |
| The Battery | 6 km | 2.4 m |
| East Harlem | 6 km | 2.6 m |
| Inwood | 14 km | 11 m |

The vertical part is the globe's curve, which the lift already takes off.
So:

- the city's OSM shoreline sits up to a few metres off Cesium's imagery of
  it in Lower Manhattan, and about 11 m off at the north tip;
- the ground is sampled at the source lon/lat but drawn at the
  tangent-plane point, so the heights land metres off too.

Neither has been noticed from the views tried (the hero view 3 km up,
Central Park).

- **Proposed.** A frame declares its `placement`. A host may warp an
  `equirectangular` layer (0001 §6.3's surface-mapping rule, per vertex),
  or the guest rebuilds its data on a true tangent plane (geo-base's
  `enu()` as an ENU projection rather than a linear one). The second is
  the guest's own fix and changes nothing in the protocol (open question
  11).

### 8.4 Anchors in the city

0001 §9.6 left the city's anchor namespaces to this RFC.

- **For buildings:** `nyc-bin:<n>`, the NYC Department of Buildings'
  Building Identification Number.
- **For OSM features:** `osm:<type>/<id>`.
- **For places:** `geo:` (RFC 5870), as 0001 has.

They're published in the city's frame (`p`), with `geo` set. Whether
slop-newyork's built geodata keeps BINs and OSM ids hasn't been checked.
Not proposed for v1: nothing links to a building yet.

## 9. What moves into portal-netgl

All of these target a release after 0.5.0. None is in #36's surface
(`layer:view`, `layer:invalidate`, `layer.live`, the `/core` entry,
origin-pinned transports).

### 9.1 `shadow: 'lean'`

celestiary's `leanShadow` puts own properties on a shadow context, which
the recorder (a Proxy over it) reaches first. In lean mode the shadow
keeps its objects, programs and state, so it still answers the recorder's
queries and mints its handles. It skips:

- every draw, clear, blit and framebuffer invalidation;
- every content write (`bufferSubData`, `texSubImage*`, the copies);
- buffers' storage, except a uniform buffer's, at its size, unfilled, for
  `bindBufferRange`'s checks.

Textures keep their storage at its size, unfilled, so framebuffers stay
complete.

```ts
interface NetGLGuestContextConfig {        // 0.5.0's, plus:
  shadow?: 'full' | 'lean' | { lean: () => boolean }  // default 'full'
}
```

- **Lean refuses readback.** `readPixels`, `getBufferSubData` and
  `clientWaitSync`-gated reads would answer garbage, so in lean mode they
  throw (or warn once and return zeros, open question 12). A guest that
  reads back (Cesium's picking, camera collision) can't be lean.
- **A guest declares it doesn't read back** (`hello.capabilities.readback:
  false`; three doesn't, for the city), so a host can ask for lean.
- **The predicate form is for composed chains only**: a middle's shadow
  lean while a leaf's calls pass through it (§4.1). With the nested link
  (§4.5) no middle sees the leaf, and only the leaf's own `'lean'` is
  needed.
- The shadow's canvas can be 1×1 when lean. The framework sizes itself by
  the canvas it's given (`canvas` ≠ the shadow's canvas), as celestiary
  does.
- It's DESIGN.md's *No-draw shadow* open problem, for guests that never
  read back. The conditional form ("skip draws when no readback is
  pending") stays open for Cesium as a guest.

### 9.2 A staged set-up

celestiary's `stageLink` wraps the city's link. It queues uploads by
reference (the attribute's or texture's own array, kept until the replay),
copies the rest, and cuts the queue into chunks (8 MB of uploads, 4
programs or 4,000 calls) by asking the guest for a frame end. The external
renderer then replays one chunk per call, the city undrawn, until the
set-up is in. The first frame went from 2.6–4.2 s to 0.27 s, and the 133 MB
copy went away.

**The bug it shipped with, and the rule it teaches.** The stage counted
calls queued while the link was closed and never stopped. After the
city's first frame, the closed calls are each frame end's checkpoint
(107), so every 4,000 / 107 = 37 frames the count reached its limit. The
stage asked for a frame end, and the next frame replayed a chunk and drew
no city: a one-frame flicker every 1.5–2 s on the user's M2. **Chunking
must stop at the first frame**: from then on, calls between frames replay
whole at the next frame, as the link does.

```ts
interface NetGLSetupStaging {
  byReference?: 'uploads' | false  // queue bufferData / texImage* / compressedTexImage* data by reference
                                   // (≥ 16 KB); only for a guest whose upload arrays aren't rewritten before
                                   // the replay (hello.capabilities.stableUploads: three's attributes and textures)
  chunk?: { bytes?: number; programs?: number; calls?: number; ms?: number } // a chunk's most (default 8 MB, 4, 4000)
}

interface NetGLImmediateLinkConfig {      // 0.5.0's, plus:
  setup?: NetGLSetupStaging
}

interface NetGLImmediateLink {            // 0.5.0's, plus:
  readonly setupChunks: number            // chunks waiting; 0 once the set-up is in, and from the first frame() on
  step(): boolean                         // replay one chunk now; false when none is left
  // frame(render): replays any chunks left, then render. Chunking ends at the first frame().
}
```

- **The link cuts at its own checkpoints.** It asks the recorder session
  for a deferred checkpoint (the `resync()` of §4.4) rather than asking
  the guest for a frame end. So a chunk replays in any host frame,
  whatever the host did in between, and the guest needn't know it's
  staged.
- **A chunk needs no insertion point.** Set-up calls (uploads, compiles)
  don't depend on the pass, so the host can `step()` wherever its link is
  open. Today the stage advances only in frames that call the city's
  renderer, which happens only while the city is in view: a city built out
  of view finishes once it's looked at (CESIUM.md; celestiary's AGENTS.md
  warns probes about it). With the nested link the host steps inside
  Earth's `link.frame()`, before `widget.render()`, every frame.
- **`ms` is a time budget per step** (not built). Programs dominate a
  chunk's time (up to 1.3 s on SwiftShader for 4), so a byte or call count
  is a poor proxy for a frame's budget. With
  `KHR_parallel_shader_compile`, a step could link and move on, and the
  next step check `COMPLETION_STATUS_KHR` (open question 13).
- `newYorkStatus` reads "loading" until `setupChunks` is 0 (§10.2).

### 9.3 The nested link

§4.5.

### 9.4 A stencil policy that forbids writes

DESIGN.md's open problem from #34: inside Cesium's frame there's no mask,
but the guest must not write stencil. Proposed: `screen.stencil:
'no-write'`. Screen draws get `stencilMask(0)`, and the guest's stencil
test state passes through. Nothing enforces it today: three writes none
unless a material asks.

## 10. Lifecycle, loading and trust

### 10.1 Offered by range, switched on by the user

The city costs about 140 MB and seconds to build, and it's only worth
anything over Manhattan. So it's **offered** and **switched on**: neither
loaded on intent (0.1's `preload()`) nor by range alone.

```ts
interface LayerOffer {                       // from the layer's manifest (§12) and the host's policy
  where: { frame: FrameId; withinM: number; belowM: number }   // nyc: 6e4 of the origin, under 3e4 up
  freeBeyondM?: number                       // nyc: 3e5
  requires?: string[]                        // e.g. ['cesium:externalRenderers', 'body:earth:cesium-active']
  cost: { memoryMB?: number; downloadMB?: number; note?: string } // the control's caption: "about 140 MB"
  default: 'off' | 'on'
}
```

- **Shown only where it can be drawn.** celestiary's switch appears only
  while Earth's Cesium layer is in use and the camera is in range
  (`newYorkRange` 'show'). It's hidden, not disabled, elsewhere: it's a
  place's layer.
- **Loaded** the first time the camera is in range with the switch on.
  **Drawn** in range, **kept** but not drawn out to `freeBeyondM`, and
  **freed** past it, when the switch goes off, or when the middle stops
  being wanted (the user chose celestiary's own Earth, or the homepage).
- 0.1's lifecycle (`portal-layers.md` [Lifecycle](../portal-layers.md#lifecycle))
  stands. `offered` and `switched` sit before `loading`.

### 10.2 Building statuses

```ts
interface LayerStatus {                      // 0001 §10.7's, plus:
  status: 'loading' | 'building' | 'staged' | 'ready' | 'data-ready' | 'error'
  progress?: { step?: string; chunksLeft?: number }  // 'building': the build step; 'staged': setupChunks
  build?: Record<string, number>             // ms per step (guest.stats.build: cityGrid, cityBlocks, …, compile)
  ground?: GroundStatus['ground']            // §7.2
}
```

| Status | The city | celestiary's caption |
|---|---|---|
| `loading` | the guest's modules and data fetching | "Building the city…" |
| `building` | `createNYCGuest`, the ground, `compile()` | " |
| `staged` | the set-up replaying, `setupChunks` > 0 | " (`newYorkStatus` reads 'loading') |
| `ready` | drawn | "Slop New York, on Cesium's Earth" |
| `error` | failed; not retried until the switch goes off and on | "The city couldn't load" |

### 10.3 Freeing

What celestiary's `dispose()` does, in order:

1. Remove the external renderer.
2. Dispose every geometry, material and texture through the guest's
   renderer, inside a guest frame, so the deletes go through every link
   (the city's shadow, Cesium's, celestiary's).
3. Undo the lean overrides.
4. Reset Cesium's state cache (`scene.context.resetState()`), because the
   city's calls went through Cesium's recorder outside Cesium's frame.
5. Lose the city's shadow context (`WEBGL_lose_context`).

Checked headless: freed, the next frame equals the frame with the city
hidden, in Cesium's frame and the scene buffer. With the nested link,
deletes go to the root only, and step 4 becomes the middle's `resync()`.

Rules:

- A layer's dispose deletes **through its link** (never on the root
  directly, which would leave the shadow's objects).
- The shadow context is lost explicitly, because browsers cap live
  contexts.
- A layer freed while it loads disposes on arrival.

### 10.4 The permalink token

celestiary's `layers:nyc` (design/URLs.md, *Layers Token*) says "on", not
"here". A link with it anywhere keeps the switch on, and the city loads
once the camera gets there. It's read on every link with a view, and it
only turns the layer on.

Generalised: a layer's manifest id is its token (`layers:<id>`), and a
host ignores unknown ids, so a link from a newer build still opens. Layer
ids are global per host (`nyc`), while layer paths (`/earth/nyc`) are
where they're drawn. 0001's open question 8 (`portal:` vs `portal://`)
gains a case: a permalink naming a nested layer's anchor
(`portal:/earth/nyc#nyc-bin:…`) needs the layer switched on first.

### 10.5 Code: a separate three.js through an import map

- **Two dynamic imports.** celestiary's wiring (`newYorkGuest.js`, 4 KB)
  is one. The other is the guest itself, from slop-newyork's site
  (`js/guest-entry.mjs`, `js/guest-cesium.mjs`, then the city's 20
  classic scripts).
- **Not bundled.** The city is a separate app with its own release cycle,
  on three.js's dev build (WebGPURenderer, TSL), while celestiary bundles
  three 0.171.
- **Two threes.** The guest imports `three`, `three/webgpu`, `three/tsl`
  and `three/addons/` by bare name, so celestiary's `index.html` has an
  import map for them, to jsDelivr pinned at a three.js commit (not
  `@dev`). celestiary's own bundle imports nothing by bare name, so the
  map is inert until the city loads. The browser warns "Multiple
  instances of Three.js being imported", by design: the city's
  `ColorManagement` and the rest are its own, so 0001 §2's realm
  collision doesn't arise.
- **Shared globals.** The city's scripts share `window.NYC` on the host's
  page. That's a global name the host must not use. A guest declares its
  globals in its manifest (§12).
- **Versions.** The import map is the host's. A guest that needs a newer
  three needs the host's map changed. Open question 14 asks whether the
  guest should ship its own (a guest-scoped map, or `three` passed in:
  `createNYCGuest({three})` already takes one).

### 10.6 Trust: a same-page guest is trusted code

0001 §10 makes guests cross-origin iframes and trusts them by origin,
with GL as the remaining risk. A same-page guest is different: its
JavaScript runs in the host's realm, with the host's privileges, cookies
and tokens (celestiary's ion token is in that realm). That's 0.1's
`bundled` tier, but loaded at run time.

| Tier (0001 §10.5) | The guest's JS | The guest's GL | How it's admitted |
|---|---|---|---|
| `bundled` | the host's realm | full | in the host's build |
| `same-page` (new) | the host's realm | full | fetched at run time from a code origin on the host's build-time allow-list |
| `trusted-origin` | its own realm (iframe) | full | origin pinned, nonce (0001 §10.2) |

- **The allow-list is a constant in the host's build**, as 0001 §10.2's.
  celestiary accepts slop-newyork's site (production and its PR
  previews), localhost and 127.0.0.1 for `?nycGuest=`. The URL may pick
  from the list, never add to it.
- **Integrity.** A dynamic `import()` can't carry SRI, but an import map
  can (its `integrity` field). A manifest could pin the guest's entry by
  hash, so that a compromised guest site can't run new code in the host's
  realm without a host release. The cost is a host release per guest
  release (open question 15).
- **Why not an iframe.** Sub-frames need a synchronous binding (§5.5,
  0001 §9.7), and the ground and the camera floor (§11) want synchronous
  queries. An iframe in-frame guest would draw a frame late and couldn't
  answer per frustum.
- **The isolation still worth having** is the second three, which keeps
  library globals apart.

## 11. Traversal

0001 §9.6 left traversal: the eye moving into a child's frame, and which
level then owns the camera.

### 11.1 The eye in the city's frame

- **The root keeps the camera and the clock.** celestiary's camera drives
  Cesium's, which drives the city's. That holds at street level: the
  city's own player, controllers and camera rig are app-only and aren't
  built in the guest.
- **Precision is already relative to the eye's level.** The chain goes
  from celestiary's camera to Cesium's camera in ECEF doubles, then into
  the city's frame by the frame map in doubles (§8.2), as 0001 §9.2 asks.
  Nothing re-roots, because every level's numbers are small near its
  content.
- **"Entering" a layer** would mean the root handing the controls to the
  layer (to walk or drive, with the city's colliders), not changing who
  composes the view. A later `layer:control` (the guest's controllers
  driving the root's camera through a request, as `layer:time-request`
  does for time) is the shape. Not proposed (open question 16).

### 11.2 The camera's floor

celestiary keeps its camera above the ground it knows (`groundHeight`,
`_keepAboveGround`), and over the city that ground is Cesium's terrain.
So the camera flies into the buildings and stops 1 m over the street.
Picking has the same gap: Cesium's `scene.pick` doesn't call external
renderers.

```ts
// portal.ground/1, guest → host, synchronous on the same page (an adapter method, not a message)
interface LayerSurface {
  /** The highest drawn surface over (x, z) in the layer's frame: the draped deck, roofs, bridges. m in the frame, or null outside. */
  surfaceAt(x: number, z: number): number | null
  /** Optional: a height field of roofs for a host that wants to sample it without calling back (async bindings). */
  heightField?(spacingM: number): { grid: { x0: number; z0: number; dx: number; dz: number; cols: number; rows: number }; heights: Float32Array }
}
```

- **The host's floor is the larger** of its terrain and the layer's
  surface, while the layer is drawn.
- **The city has the parts.** `guest.groundOffsetAt` gives the draped
  deck's lift, and its colliders give the buildings' footprints and
  heights. A roof height field is a build-time by-product.
- **Picking through a layer** is `portal-layers.md`'s roadmap
  (`layer.pick`). Same page, it's a synchronous raycast on the guest's
  scene. Raycasting can't see geometry placed in the vertex shader (the
  lift, instanced crowds), so the guest answers from its flat scene plus
  the lift.

### 11.3 Doors inside a layer

A door inside the city (a building's entrance into an interior) would be a
stencilled child of an in-frame guest. Inside Cesium's pass the stencil is
Cesium's (classification bits), and the leaf mustn't write it (§9.4). So a
door there needs one of:

- the middle reserving a stencil bit for its children, so the root
  allocates refs across levels (0001 §9.3), which needs Cesium's
  cooperation;
- the door drawn in `guest-private` depth and stencil (0001 §5.2), into a
  target of its own, composited after the middle's pass;
- the door drawn after the middle's frame, by the root, at the door's
  shape, with the middle's depth (celestiary's proxy depth).

None is needed now. Open question 17.

## 12. Where layers live

### 12.1 Today, and the direction

The New York layer is wired in celestiary:

- `newYork.js` holds the switch, the range, the guest's allowed origins
  and its URL.
- `newYorkGuest.js` holds the link, the lean city, the ground sampling,
  the colour stopgap and the dispose.
- `CesiumLayers` holds the load, the free and the night lights' occlude.
- slop-newyork provides `guest-cesium.mjs` (the external renderer, the
  model matrix, the bounds, the sun, the ground from Cesium).

So the Cesium adapter for this guest is split across two repos, and the
host carries the guest's colour fixes.

The user's direction (CESIUM.md, *Its long-term home*): the layer belongs
longer term with Earth's other extended assets (3D cities and the like),
outside celestiary.

- **Where:** in celestiary's custom Cesium (celestiary/cesium, next to
  the external renderers it rides on), or in a new repo that gathers them.
- **Then:** imported first as an intermediate dependency (a package
  celestiary pins, in place of the guest URL and the wiring), and finally
  loaded by celestiary as a dynamic layer: discovered with its range and
  cost from that package or a manifest, offered in the layers control by
  where the camera is, and fetched only when switched on.
- **Ready for it:** the control, the `layers:` token and `newYorkRange`
  are written to carry more such layers.

### 12.2 Who owns what

| Piece | Today | Proposed home |
|---|---|---|
| The city: build, materials, ground, lift, drape, `stored-lit`, `setLight`, `setPass` | slop-newyork (the options §6.5 lists are missing) | slop-newyork |
| The Cesium adapter for an in-frame guest: external renderer, `cityModelMatrix`, bounds, terrain → `layer:ground`, Cesium light → `LayerLight` | split: slop-newyork `guest-cesium.mjs` and celestiary `newYorkGuest.js` | the Earth-layers package (celestiary/cesium or a new repo), generic over any `enu` guest |
| Links, nested link, lean, staging, policies | celestiary `netglLean.js` | portal-netgl (§9) |
| The manifest, the offer, the registry | celestiary `newYork.js` | the Earth-layers package publishes manifests; celestiary reads them |
| The switch, the token, the root's lifecycle, the night lights' passes | celestiary | celestiary |

### 12.3 The manifest

```ts
interface LayerManifest {
  id: string                         // 'nyc': the permalink token and the registry key
  name: string                       // 'New York (3D city)'
  version: string
  entry:
    | { url: string; integrity?: string }      // a module that exports createLayer(hostAdapter, options)
    | { package: string; export: string }      // bundled by the host: '@celestiary/earth-layers/nyc'
  host: { engine: 'cesium'; requires: string[] } // ['externalRenderers']
  parent: { body: 'earth' }          // the middle layer it draws in
  frame: EnuFrameDescriptor          // §8, origin height filled at run time
  offer: LayerOffer                  // §10.1
  ext: string[]                      // ['portal.ground/1', 'portal.light/1']
  importMap?: Record<string, string> // the guest's three, pinned (§10.5)
  globals?: string[]                 // ['NYC']
  credits: Credit[]                  // portal-layers 0.1's layer:credits
  trust: { tier: 'same-page' | 'trusted-origin'; origins: string[] }
}
```

- **Credits are missing today.** The city's geography is NYC Open Data
  and © OpenStreetMap contributors (ODbL), which requires attribution
  (slop-newyork README, *License and data*). celestiary shows no credit
  for the city. The manifest's `credits`, shown while the
  layer is drawn (0.1's `layer:credits`), closes that.
- **The registry** is a list of manifests the host reads (a JSON file in
  the Earth-layers package, or a URL). A host offers each by its `offer`
  and `requires`, and loads none until switched on (open question 14).

## 13. What this changes in the existing docs

Nothing here lands until it's implemented. Each change cites this RFC.

| Where | Today | Proposed |
|---|---|---|
| RFC 0001 §4 Layer kinds | an overlay draws "after the host's own draws" | an overlay may be inserted at a phase inside the host's pass (`phase: 'opaque'`, §5.1) |
| RFC 0001 §5.1 `SharedDepth.encoding` | `{kind: 'log', near, oneOverLog2…}` fixed in hello-ack | the kind in the ack, the parameters per view (`view.depth`, §5.3); `clipRange` required with log depth or several frusta |
| RFC 0001 §5.1 rules, open question 3 | `write: false` default | in-frame guests write depth (`write: true`); the default is per host, not global |
| RFC 0001 §5.3 `LayerExtent` | a sphere | adds `box` (§5.6) |
| RFC 0001 §6 `LayerView` | `frame: 'ecef'`; `light {direction, intensity}`; `subFrame {index, count}` | `frame` any registered id, including a layer's `enu` frame (§8); `light` is `LayerLight` (§6.3); `subFrame.hostFrame`; `depth` (§5.3) |
| RFC 0001 §6.1 Frame ids | ECEF only | adds the `enu` descriptor (§8.1) |
| RFC 0001 §7 Time | guests never advance time | a guest may animate on `elapsedMs` (its traffic), declared in hello (§5.4) |
| RFC 0001 §9.1 the tree | flatten; the root creates every iframe | same-page chains flatten through the middle's link (§4.3–4.5); composed is the fallback; the root creates cross-origin children; `layer:children` is for those |
| RFC 0001 §9.1 frame maps | the parent supplies them | a child's frame can depend on host data it processed (`height0`, §7.2): it resends its frame and the host composes |
| RFC 0001 §10.5 tiers | bundled, trusted-origin, untrusted-gl, isolated | adds `same-page` (§10.6) |
| RFC 0001 §10.7 `LayerStatus` | loading, ready, data-ready, error | adds `building`, `staged`, `progress`, `build`, `ground` (§10.2) |
| RFC 0001 §13 questions 11, 13 | open | answered for same-page chains (§4.3, §5.7) |
| `portal-layers.md` Contracts: Colour | `display` or `linear`, per frame exposure | `portal.light/1`'s units, host light and passes (§6) |
| `portal-layers.md` Contracts: Units and frames | a frame map, checked | adds the `enu` frame and its `placement` (§8) |
| `portal-layers.md` Lifecycle | idle → loading → … | `offered` and `switched` before loading; `building` and `staged` (§10.1–10.2) |
| `portal-layers.md` Security | inPage is full trust | `same-page` code loaded at run time: a build-time code-origin allow-list, optionally an integrity pin (§10.6) |
| `portal-layers.md` Gotchas | — | depth through `setupDepth`, not `depthNode` (§5.3); test the drape on real heights (§7.4); a ground layer takes the eye under the host's reference surface (§7.4); a lean shadow can't read back (§9.1) |
| DESIGN.md Nested guests | composed, its cost per level; "the three-level chain hasn't run end to end" (out of date: celestiary/web #287 runs it) | the flat shape (§4.5), and what the middle exposes (§4.4) |
| DESIGN.md Sub-frames | `subFrame()`; Cesium's shim clones one checkpoint a frame | `resync()` (§4.4) is the same mechanism without a frame-end |
| DESIGN.md Screen policy | `stencil {ref}`, `clear`, `blend` | `stencil: 'no-write'` (§9.4), `blend: 'occlude'` (§6.4) |
| DESIGN.md Open problems | no-draw shadow; multiple targets, one host; resource lifecycle | `shadow: 'lean'` for guests that don't read back (§9.1); one handle table per nested link (§4.5); dispose through the link (§10.3) |

## 14. Findings from implementation

> **Implementations append here**, as in 0001 §10.8: one bullet per
> finding, saying what happened, what fixed it, and which section it
> confirms, changes or contradicts.

**celestiary/web #287, slop-newyork #1, celestiary/cesium
`celestiary/external-render-pass`** (CESIUM.md, [New
York](https://github.com/celestiary/web/blob/main/CESIUM.md#new-york) and
[Found on a real GPU](https://github.com/celestiary/web/blob/main/CESIUM.md#found-on-a-real-gpu)):

- **The chain works composed, three levels deep.** Headless, the city was
  drawn at Manhattan in Cesium's frame and through celestiary's
  atmosphere pass. That's 226 meshes a frame, no replay error on either
  link, and no shader error. Its distance reached alpha (a median code of
  36 against the ground's 41). With the switch off, frames are bit for bit
  main's. §4.1.
- **The first preview crashed a Chrome tab on an Apple GPU.** The likely
  cause was the drape on real terrain, which never ended: 4 mm tolerance
  plus slivers, 13 min and 1.4 GB headless on Terrarium heights before it
  was killed. On top of that:
  - the city's ~135 MB of geometry and textures lived three times on the
    GPU, and each frame drew three times;
  - its first frame replayed 20,000 queued calls and 133 MB into two
    contexts at once.

  Fixed by the lean city: a bounded drape, lean shadows and a staged
  set-up. §4.2, §7.4, §9.
- **The triple GPU copy.** 112 + 23 MB in each of three contexts, and 182
  draws in each. Lean puts both in celestiary's only (0.3–0.4 MB in each
  shadow), with 0 draws in either shadow. Programs still compile three
  times. §4.2, §9.1; the nested link is the rest (§4.5).
- **The real-GPU flicker.** The city vanished for one frame every
  1.5–2 s on the user's M2, with the clock paused too. The stage kept
  cutting after the set-up: every 4,000 / 107 = 37 frames it queued a
  frame end, and the frame that stepped it drew nothing. Headless, 2 of
  101 frames, 37 apart. After the fix (no cuts after the first frame), 143
  of 143. §9.2.
- **"READ-usage buffer was written, then fenced, but written again before
  being read back"**, 3–4 a second on the M2. This was celestiary's
  meter, not the links: its asynchronous readback dropped one of two
  readings that finished at one poll, and allocated every buffer up front
  (which Chrome counts as a write). It showed before the city loaded too.
  Fixed in celestiary (7–9 a session before, none after). A host-side
  hazard of PBO readback, unrelated to NetGL. Recorded so the next
  integration doesn't blame the links.
- **The night bands.** Blue blocky bands on the buildings at night, from
  the ground in Central Park. The camera was 29.8 m under the ellipsoid.
  The cause was the atmosphere pass's float32 `rsi` sun test within a
  metre of the sphere, which lit the night's air with daylight. Headless,
  2,665 pixels; after the fix (`sunBelowHorizon`), 0, with the gain back
  at 148. §7.4.
- **The night lights through the city.** With the city hidden in the night
  lights' frame, the Black Marble drew through the buildings (1,373 of
  1,374 pixels). Drawn black, none did. §6.3's `occlude` pass.
- **White specks at night.** 3–8 of the city's pixels stay lit in
  Cesium's frame at night with every light and emission at 0: shading
  outside the stopgap's hooks, not yet found. §6.1, and an argument for
  the guest owning `stored-lit` (§6.5).
- **The M2's fps breakdown** (the user's guest.html and `?webgl`):
  - the WebGL2 backend about 2× WebGPU;
  - a device pixel ratio of 2 about 2.6×;
  - shadows plus ClusteredLighting about 4.5× (≈10 → 45 fps at street
    level with both off).

  The layer now runs `lights: false`, shadows off. §4.2.
- **Not run:** the city on World Terrain through ion (the session's token
  was refused), and the lean city or the colour on a real GPU beyond the
  user's reports. A `?perf=sync` snapshot over the city is still wanted.

## 15. Open questions

Answers go in the PR discussion, or in an RFC issue citing the number.

1. **In-frame overlays.** Is New York an `overlay` with `phase: 'opaque'`
   (proposed), or does an in-frame guest that writes depth and is drawn
   per frustum deserve a kind of its own?
2. **Middle objects a leaf may use.** The nested link resolves the
   middle's framebuffer. Should a leaf be able to read other middle
   objects (its depth texture, for soft edges or fog against the globe),
   and how does the middle grant that?
3. **Flat by default.** Should portal-layers flatten every same-page chain
   whose middle is a NetGL guest, or only on request? Who makes the nested
   link: the middle's adapter (proposed) or the root, handed the middle's
   link?
4. **Depth write per host.** 0001's question 3 asks for one default. Is
   `write` decided per host (Cesium: required), per phase, or per layer?
5. **Light units.** Are `stored-lit`, `linear-hdr` and `display` the
   right three, or should `linear-hdr` name physical units (cd/m²) so that
   two HDR hosts agree?
6. **Emission in one pass or two.** A separate `emission` pass draws the
   city twice at night. Should the guest instead write emission to a
   second attachment in one pass? Cesium's frame has no MRT here, and the
   guest drops its MRT outputs.
7. **Occlude from outside.** A screen policy `blend: 'occlude'` can draw
   any guest black (§6.4). Is that preferred to a guest-side pass, given
   NaN and translucency?
8. **Who drapes.** The guest's vertex lift with a host budget (proposed),
   or the host handing a height texture the guest samples? Tolerance or
   exact, chosen by the host's budget (`form`)?
9. **The ground's datum.** Heights above the ellipsoid plus a scalar sea
   level (proposed), or a geoid grid for layers wider than a city?
10. **The camera floor.** A synchronous `surfaceAt` on the same page
    (proposed), a published height field for async bindings, or both?
11. **The frame's placement.** Must an `enu` layer's data be placed on a
    true tangent plane (slop-newyork rebuilds its geodata), or may it
    declare `equirectangular` and have the host warp it? The city is
    2.4 m off at the Battery and 11 m off at Inwood (§8.3).
12. **Lean readback.** Should a lean shadow throw on readback, or warn
    once and answer zeros? How does a guest declare it never reads back?
13. **Staging by time.** Should a chunk's budget be milliseconds, with
    `KHR_parallel_shader_compile`, rather than bytes, programs and calls?
    And should the host step the set-up every frame regardless of the
    layer's visibility (proposed), or only while warming?
14. **Packaging.** Is the Earth-layers package a branch of celestiary's
    Cesium fork or a new repo? Is the registry a JSON list of manifests?
    Does each guest ship its own import map (its three), or does the host
    keep one?
15. **Integrity.** For a `same-page` guest, is a build-time origin
    allow-list enough, or should the manifest pin the entry by hash
    (import-map `integrity`), at the cost of a host release per guest
    release?
16. **Handing over the controls.** When the eye is at street level, may a
    layer drive the root's camera (walk, drive, its colliders) through a
    request message, as `layer:time-request` does for time?
17. **Doors inside an in-frame layer.** A middle-reserved stencil bit, a
    `guest-private` target composited later, or a door drawn by the root
    after the middle's frame?
18. **Anchors in the city.** Are `nyc-bin:` and `osm:` the right prefixes
    for 0001's registry, and should the city publish any before something
    links to a building?

## 16. References

- [RFC 0001](./0001-globe-orbit-layers.md): layer kinds, shared depth, the
  view, time, anchors, nesting, trust.
- [`docs/portal-layers.md`](../portal-layers.md): the 0.1 layer design.
- [`packages/portal-netgl/DESIGN.md`](../../packages/portal-netgl/DESIGN.md):
  [state checkpoint](../../packages/portal-netgl/DESIGN.md#state-checkpoint),
  [sub-frames](../../packages/portal-netgl/DESIGN.md#sub-frames),
  [screen policy](../../packages/portal-netgl/DESIGN.md#screen-policy),
  [nested guests](../../packages/portal-netgl/DESIGN.md#nested-guests-cesium-drawing-new-york),
  [open problems](../../packages/portal-netgl/DESIGN.md#open-problems-the-next-pr).
- celestiary/web: [CESIUM.md, New York](https://github.com/celestiary/web/blob/main/CESIUM.md#new-york);
  `js/scene/cesium/newYork.js`, `newYorkGuest.js`, `netglLean.js`,
  `newYorkDebug.js`, `CesiumLayers.js` (`_updateNewYork`,
  `_loadNewYork`, `_freeNewYork`, `_drawNightLights`);
  `patches/@cesium+engine+26.3.0.patch`; `design/URLs.md` (*Layers
  Token*).
- slop-newyork: README (*As a guest in another engine*); `js/guest.js`
  (THE HOST'S FRAME, THE GUEST); `js/guest-cesium.mjs`
  (`cesiumExternalRenderer`, `groundFromCesium`, `cityModelMatrix`,
  `cityBoundingVolume`); `js/ground.js` (THE FRAME ON THE EARTH, THE
  GROUND, THE DRAPE); `tools/geo-base.mjs` (1. FRAME).
- celestiary/cesium, branch `celestiary/external-render-pass`:
  `Scene/ExternalRenderer.js`, `Scene/ExternalRendererCollection.js`,
  `Renderer/Context.js` (`resetState`).
- HTML import maps (`integrity`); `KHR_parallel_shader_compile`; RFC 5870
  (`geo:`); NYC Department of Buildings, Building Identification Number;
  OpenStreetMap's copyright and ODbL.
