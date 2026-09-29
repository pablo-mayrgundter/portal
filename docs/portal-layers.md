# `portal-layers` 0.1 — design

A shim library, used by both the host and the guest, for compositing one
renderer's content *in place* inside another's scene: Cesium's Earth where
celestiary's Earth was, or a three.js scene behind a door. It sits on top
of `portal-netgl`. NetGL moves GL calls from guest to host; `portal-layers`
does everything else the celestiary integration had to do by hand. That
integration (celestiary/web #77–#85, see "Lessons from celestiary's
Cesium layers" in `packages/portal-netgl/DESIGN.md`) is the reference.
Its `CesiumLayers.js` is ~900 lines, and most of them belong here.

The second half of this doc, **Gotchas that stay in the app**, is the
guide for what a library can't decide for you.

## Scope

0.1 does:

- **Host:** a per-frame compositor.
  - Stencil shells and far-to-near ordering.
  - Depth save/restore and proxy depth.
  - A lifecycle for each layer: loading, warming unseen, fading in,
    active, fading out, failed.
  - Visibility policy, credits and the fade timeline.
- **Guest:** framework adapters that make a renderer behave as an
  embedded guest.
  - Cesium first, three.js second.
  - Presets that switch off a guest's owns-the-scene defaults.
  - Applying the host's view (camera, light, time) each frame.
  - Reporting readiness and credits.
- **Both:** one control protocol and a transport abstraction.
  - Sync in-page, async postMessage (iframe, worker), and a remote
    binding sketched for later.
  - The same host and guest code runs over any of them.
- **Contracts both sides declare and check:** depth, alpha, colour, and
  units and frames.

0.1 doesn't do:

- **Input forwarding and picking through a layer.** Clicks to
  `scene.pick` are designed for, but not in 0.1.
- **Sandboxing a cross-origin guest's GL.** 0.1 refuses cross-origin
  guests unless the host opts in; see Security.
- **Non-rectangular doors, XR.**

## Who does what

```
 app (host)                     portal-layers                   app (guest)
 ─────────                      ─────────────                   ──────────
 scene, bodies, exposure,       LayerHost                       dataset choice,
 post-passes, labels,           ├─ compositor (stencil,         tokens, imagery,
 source-data parity,            │  depth, order, fade)          guest shaders that
 UI chrome                      ├─ lifecycle + visibility       honour the colour
      │                         ├─ credits                      contract
      │  shapes, views,         └─ scheduler ◄─┐                      ▲
      │  hooks                                 │ transport            │ adapter
      └────────────────────────►  protocol  ───┴──────────────► LayerGuest
                                                                ├─ Cesium adapter
                                                                └─ three adapter
                                  portal-netgl
                                  recorder / replay / screen policy / checkpoint
```

`portal-netgl` stays framework- and scene-agnostic: calls, handles,
checkpoints, screen policy. `portal-layers` knows about cameras, bodies,
fades and credits, but not about any particular app.

## Concepts

- **Layer.** One guest renderer composited into the host for one *shape*.
  Celestiary has one per body: the Earth, the Moon and Mars each have
  their own Cesium widget and NetGL link.
- **Shape.** Where the layer's pixels may land, as geometry the host can
  depth-test.
  - `ellipsoid {radii, shellScale}` for bodies.
  - `quad {anchor, halfWidth, halfHeight}` for doors.
  - `mesh` for anything else.
  - The shape draws the stencil shell and, for a solid body, the proxy
    depth.
- **View.** Everything the guest needs to draw the host's frame:
  - camera pose and projection in the layer's frame;
  - light direction and intensity;
  - simulation time;
  - viewport and pixel ratio;
  - exposure.

  It's computed by the host each frame, in doubles, and sent as data.
- **Frame of reference.** A map from the host's world into the guest's
  native frame (ECEF for Cesium; identity for a three.js guest), plus
  scale. The host supplies the layer's world matrix; the library applies
  the mapping.

## Transports

Same-page sync is the tightest binding: zero lag and no cloning. It's not
always available or wanted, because isolation, crash containment,
threads, origins and remote guests all argue against it. So the host and
guest code are written against a **binding**, chosen when the layer is
created:

| Binding | Realm | Lag | Isolation | Use when |
|---|---|---|---|---|
| `inPage(guestFactory)` | host's realm, same thread | 0 frames | none: guest code runs with the host's privileges | trusted guest library, tightest compositing (celestiary's Cesium) |
| `worker(url)` | Worker + OffscreenCanvas shadow | ~1 frame | separate thread, same origin; crashes contained | heavy guest that would stall the host's thread |
| `frame(url, {origin})` | iframe, same or cross origin | ~1 frame | origin isolation for the guest's JS and data | third-party guest, separate deploys, guest owns its credentials |
| `remote(channel)` | another process or machine (WebRTC, WebSocket) | network RTT | full | streaming a guest; 0.1 defines the interface only |

The binding supplies two things:

1. **A message channel:** `send(msg, transfer?)`, `onMessage(cb)`,
   `close()`. Postmessage-like and ordered. `inPage` implements it with
   direct calls.
2. **A scheduler**, which decides when a guest frame runs and which host
   frame it lands in.
   - **SyncScheduler** (`inPage`). The host calls
     `layer.render(view)` inside its own frame. The guest renders
     immediately, and each GL call replays into the host context as it's
     recorded (`makeNetGLImmediateLink`). The guest's pixels are for
     exactly this view.
   - **AsyncScheduler** (`worker`, `frame`, `remote`). The host posts
     `view` messages, and the guest renders and returns frames tagged
     with the view they were drawn for. The rules, all from the netgl
     findings:
     - At most one request in flight.
     - The next view is sent at the end of the current frame
       (pose-ahead).
     - The ready handshake is repeated until acked.
     - Frame batches are concatenated, never overwritten.
     - A stale frame is re-run without its uploads.
     - A frame that deletes an object is never re-run.

**Pose-tagged composition (async only).** A late guest frame, stencilled
for the host's *current* view, slides against its stencil. The
compositor draws the shell and the proxy depth for the frame's *tagged*
view instead, so the guest's pixels and their mask always agree. What
lags is the layer as a whole relative to the rest of the host scene, by
the transport's latency. To mask it:

- **Predict.** The host sends a view extrapolated by the measured
  round-trip time. This is the default for camera motion.
- **Accept.** For a slow guest, a whole-layer lag is far less visible
  than a mask slide.

**Choosing.** `createLayer({binding})` takes one explicitly. There's no
auto-detection: the choice is a security decision, so the app makes it.
`inPage` needs the guest library bundled into the host. The others need
a guest entry point (URL) that calls `serveLayer(adapter)`.

## Protocol (control plane)

It rides alongside NetGL's call stream on the same channel, is
versioned, and is the same for every binding. `inPage` passes objects
directly; the rest use structured clone.

| Direction | Message | Carries |
|---|---|---|
| guest → host | `layer:hello` | protocol version, adapter kind, capabilities (readback, tiles-ready signal, credits), declared contracts |
| host → guest | `layer:hello-ack` | accepted contracts, or a refusal with the reason |
| host → guest | `layer:view` | view id, camera, projection, light, time, viewport, exposure |
| guest → host | `netgl:*` | the GL call stream for that view, ending in `netgl:frame-end {viewId}` |
| guest → host | `layer:status` | `loading`, `ready`, `data-ready` (tiles for the last view are in), `error {message}` |
| guest → host | `layer:credits` | attribution entries (HTML strings or `{text, href, logo}`), whenever they change |
| host → guest | `layer:visibility` | `hidden`, `warming` or `shown`, so a guest can throttle or stop fetching |
| host → guest | `layer:dispose` | tear down |

`netgl:ready` and `netgl:ready-ack` are folded into `hello` and
`hello-ack`.

## Host API (sketch)

```ts
const host = createLayerHost({
  gl, // host WebGL2 context
  framework: threeHost(renderer), // resetState + RT rebind + render hooks
  target: () => sceneRT, // where layers land (screenFramebuffer)
  depth: 'save-restore', // or 'guest-private' (roadmap, see below)
  color: { space: 'display', toneMap: 'pbr-neutral', exposure: () => ui.exposure },
  fadeMs: 1000,
  credits: { container: overlayEl, show: 'nearest' },
})

const moon = host.createLayer({
  name: 'moon',
  binding: inPage(() => cesiumGuest({ ellipsoid: 'MOON', tileset: 2684829, ionToken })),
  shape: ellipsoid({ radii: [1737400, 1737400, 1737400], shellScale: 1.01 }),
  frame: { world: () => moonNode.matrixWorld, toGuest: bodyToEcef, scale: 1 },
  light: () => sunWorldPosition,
  visibility: meshRange({ maxDistance: () => moonNode.meshRange, minPixelRadius: 1 }),
  hooks: {
    hideHost: () => hideSurface(moonNode), // host's own rendering of this shape
    showHost: () => showSurface(moonNode),
    drawHostFade: (alpha) => drawSurface(moonNode, alpha), // crossfade overlay
  },
})

moon.preload() // e.g. when the user targets it

// Per frame, after the host scene is in `target`:
host.beforeRender(camera) // visibility, lifecycle, hide/show host shapes
renderer.render(scene, camera)
host.composite(camera) // per layer, far to near: shell → guest frame → depth restore; then fades, proxy depth
// ... host post-passes read proxy depth; host.fadeOf(layer) and
//     host.shareOf(layer) tell them how much of each to draw
```

Events: `layer.on('status' | 'credits' | 'error', …)`. A layer that
fails falls back to the host's own rendering and reports the error. It
never leaves a hole.

## Guest API (sketch)

```ts
// inPage: the factory returns an adapter; the other bindings run it in
// the guest's realm:
serveLayer(cesiumGuest({ ellipsoid: 'MARS', tileset: 3644333, ionToken }))

// An adapter is:
interface LayerGuestAdapter {
  create(ctx: { contextOptions; canvas; transport }): Promise<void>
  applyView(view: LayerView): void // camera, light, time, exposure
  render(): void // one frame, the scheduler's call
  dataReady(): boolean // e.g. tilesets' tilesLoaded after a rendered frame
  credits(): Credit[]
  contracts: { alpha: 'coverage'; color: ColorSpaceSupport; depth: 'none' | 'log' | 'linear' }
  dispose(): void
}
```

**`cesiumGuest` presets.** These are what celestiary learned. The
adapter sets them, and an app can override any of them.

- **Canvas and context:**
  - `getWebGLStub` injection;
  - a CSS-sized canvas;
  - `useDefaultRenderLoop: false`;
  - `msaaSamples: 1`;
  - a transparent background.
- **Guest-owns-the-scene defaults off:**
  - `orderIndependentTranslucency: false` (its composite breaks
    coverage alpha);
  - `skyBox`, `sun` and `moon` off;
  - camera inputs off;
  - `scene3DOnly`.
- **Camera:** set position, direction, up and right *directly*. Never
  `setView`, whose Euler round-trip is ~5° off near pitch −90°. The far
  plane is sized to the body: its default of 5e8 m clips the Earth
  beyond ~80 radii. Cesium's fov is converted from the host's vertical
  fov, since Cesium's spans the wider side.
- **Ellipsoid:** the camera is placed on the host's ray, at the host's
  height over Cesium's ellipsoid. `Ellipsoid.default` is set before each
  render, because it's a library global shared by every widget.
- **Light and time:** a `DirectionalLight` from the view, and ground and
  sky lighting from the scene light. Cesium's clock follows the view's
  time.
- **Tilesets:**
  - `foveatedScreenSpaceError` and `cullRequestsWhileMoving` off,
    because the host moves the camera every frame;
  - `maximumScreenSpaceError` configurable (8 in celestiary);
  - `dataReady` means `tilesLoaded` after at least one rendered frame.
- **Globe:** it starts on the offline ellipsoid imagery and upgrades to
  ion terrain and imagery as each loads. Never
  `Terrain.fromWorldTerrain()`, which leaves the globe empty until ion
  answers, and forever if it can't.
- **Colour:** a `CustomShader` helper lights unlit tilesets by the view's
  light, in the host's declared colour space, pre-compensating Cesium's
  sRGB encode (see Contracts). It's opt-in per tileset, because what the
  imagery *is* is the app's business.

**`threeGuest`** does for a three.js guest what `makeNetGLPortalGuest`
does today:

- capture and restore the render target around `resetState`;
- `autoClear` off for screen renders and on for render-target renders;
- a detached `HTMLCanvasElement` for the shadow, never an
  `OffscreenCanvas` in page realms, because three writes
  `canvas.style`.

It moves onto `makeNetGLGuestContext`, as DESIGN.md's open problem
proposes.

## Contracts

Both sides declare these in `hello`. The host refuses mismatches it can't
bridge, rather than composite wrong pixels.

- **Alpha: coverage, premultiplied.** The screen policy blends
  premultiplied-over, so every guest pixel's alpha must mean coverage.
  Adapters guarantee it: Cesium's OIT is off. A dev-mode check samples a
  guest-only frame and warns when the alpha histogram is suspicious: all
  ones over sky, or none over a body.
- **Depth.** Two strategies:
  - `save-restore` (0.1): the compositor blits the host depth to a twin
    depth-stencil target before the layers and restores it after each
    guest frame. After all layers it draws each solid shape's proxy
    depth, depth-tested, so later host passes (atmosphere, labels) see
    the body.
  - `guest-private` (roadmap): a screen-policy mode that gives guest
    screen draws their own depth attachment, so the host's depth is
    never touched and the blit disappears.

  Either way, guest depth never has to agree with the host's. Visibility
  is the stencil shell's job.
- **Colour.** The host declares its composite space: `display` (stored
  values, tone-mapped straight to screen, as in celestiary today) or
  `linear` (a half-float target, tone-mapped once later). It also
  declares its tone mapping and its exposure, per frame in the view. The
  adapter makes the guest's final pixels land in that space.
  - Cesium decodes imagery to linear and sRGB-encodes its output. The
    colour helper converts to the host's space, lights there, tone-maps
    if the host does, and pre-compensates the encode.
  - Unmatched, the seam shows as lifted shadows and a dimmer day side,
    and only at part-phase. Hence the quarter-phase benchmark in the
    test kit.
- **Units and frames.** Metres on both sides, or a declared scale. The
  frame map is a proper rotation (checked: determinant +1 and a known
  point), and the view is computed in doubles on the host.

## Lifecycle

```
idle ──preload()──► loading ──guest ready──► warming ──dataReady──► fading-in ──fadeMs──► active
  ▲                    │                        │  (renders unseen:           │
  │                    └──error──► failed       │   no stencil, no pixels)    │
  └─────────── fading-out ◄──── out of range / off screen / host layer chosen ◄┘
```

- **Preload.** The app calls it on intent, e.g. targeting a body or its
  moon. Loading the guest library and creating its widget happen here,
  not when the layer comes into range.
- **Warming.** The layer is in range but its data isn't in. The guest
  renders every frame with no stencil, so nothing lands, because guests
  like Cesium request data from their render loop, for the view they
  render. The host keeps drawing its own shape meanwhile. It costs the
  shadow draw plus the replay, so warming is bounded to layers in range.
- **Fading.** The compositor draws the guest, then the host's own shape
  over it through `drawHostFade(alpha)`. `host.shareOf(layer)` lets
  post-passes cross-fade their own contributions, such as an atmosphere
  handing over to the guest's sky.
- **Visibility.** The default policy is in range (a distance the app
  supplies, e.g. its mesh LOD) and on screen: at least one pixel of
  radius and intersecting the frustum. Off-screen layers go to `hidden`,
  which tells the guest to throttle.

## Security and isolation

- **`inPage`:** the guest is code the host chose to bundle. Full trust.
- **`worker` and same-origin `frame`:** JS is isolated by thread or by
  browsing context, but the guest's GL calls still execute in the host's
  context. Trust the guest not to be hostile, even though it may crash.
- **Cross-origin `frame` and `remote`:** refused in 0.1 unless the host
  passes `trust: 'untrusted-gl'`. Even then 0.1 only does the cheap
  checks:
  - an allowlist of GL entry points;
  - no host-framebuffer reads or copies (`readPixels`,
    `copyTex*Image2D`, `blitFramebuffer` from the host's framebuffers);
  - per-frame budgets for call count, upload bytes and live objects;
  - shader length limits.

  Real sandboxing (shader validation, GPU-time watchdogs) is future
  work; DESIGN.md's permission model covers it.
- **Data flow.** No host pixels or host state flow to the guest in any
  binding, only the view. The guest's readback is answered by its own
  shadow context.
- **Credentials:** access tokens (e.g. Cesium ion) belong to the realm
  that fetches the data. A `frame` guest keeps its token on its own
  origin, which is one reason to prefer it over `inPage` for third-party
  data.

## What moves out of celestiary

Roughly 700 of `CesiumLayers.js`'s 915 lines map onto 0.1:

- the compositor (stencil, depth blit and restore, ground spheres, far
  to near);
- the lifecycle (preload, warming, fade);
- visibility, credits, the camera and light coupling, the Cesium
  presets and the colour helper;
- `frames.js`'s generic parts: ellipsoid camera placement and the fov
  conversion.

What stays is celestiary's bodies config, `bodyToEcef`, its fade and
atmosphere hooks, and its choice of datasets.

## Roadmap after 0.1

- `guest-private` depth (a portal-netgl screen-policy mode).
- A no-draw shadow while no readback is pending, for about half the GPU
  cost, and most of it while warming.
- Picking and input forwarding (`layer.pick(x, y)` → guest
  `scene.pick`, answered from the shadow).
- A `linear` colour space end to end, once hosts render into HDR
  targets (celestiary/web#86).
- The `remote` binding: the channel over WebRTC and WebSocket, frame
  compression, adaptive pose prediction.
- Sandboxing for untrusted GL.

---

# Gotchas that stay in the app

These bit celestiary and can't be fixed by a library, because they depend
on the app's data, units, look or UI. Treat this as a checklist when
adding a layer.

**Data parity**

- **Same source imagery on both sides.** A swap between the host's and
  the guest's rendering only goes unnoticed if both draw the same data.
  Celestiary rebuilt its Mars and Moon textures from the mosaics Cesium
  serves: Viking MDIM2.1 and LRO WAC, from NASA Trek's WMTS.
- **Check the longitude origin.** Equirectangular mosaics put −180° at
  the left edge. A 180° shift put Hellas where Tharsis should be.
- **Measure brightness; don't assume it.** Copies of "the same" mosaic
  differ: ion's LRO WAC is 0.82× Trek's. Compare median pixel ratios over
  a lit disc, and gain-match on one side.
- **Mosaic stretch isn't albedo.** Scale a texture so bodies keep their
  relative albedos (the Moon at 0.12 vs Mars at 0.15), and apply the
  same gain on the guest.

**Lighting and exposure**

- **The app owns exposure.** In celestiary it follows the targeted body.
  The layer just receives it in the view. Anything drawn as a marker
  rather than a lit surface (far-planet dots, labels) must opt out of
  tone mapping, or it goes black at a sunlit body's exposure.
- **Declare the colour space you actually use.** If your shaders light
  stored sRGB values directly, that's `display`, whatever the renderer's
  output colour space says.
- **Put a light direction in the view.** Guest ephemerides (Cesium's
  Sun) disagree with the host's simulation. Drive the guest's light
  from the host's.
- **Terrain without normals.** Coarse guest terrain lit by
  screen-space-derivative normals shows its triangles. Light the smooth
  shape, and let the imagery carry the relief.

**Depth and overlays**

- **Proxy depth ties with anything placed on it.** Labels at a body's
  surface z-fought the proxy sphere; lift them (celestiary uses 1.1
  radii).
- **Host depth precision.** A 24-bit depth buffer spanning a solar
  system resolves ~200 km per step at Jupiter from 1.5 Gm. Post-passes
  comparing depths need a tolerance of z²/near·2⁻²⁴, and a proxy that
  only differs from the background by a few steps is fragile.
- **Post-passes and hand-offs are yours.** You decide which side draws
  a body's atmosphere, whether it shows through the other's sky, and
  how your post-pass treats bodies beyond it. Celestiary's day-sky
  "eye adaptation" hid the Moon.

**Handover and LOD**

- **Tie "in range" to your LOD.** Celestiary switches at the distance
  where it would draw a point instead of a mesh (500 radii, ~1.6 px).
  Where a sub-pixel mesh lit at its albedo would vanish, draw a
  non-tone-mapped point.
- **Preload on intent.** Wire `preload()` to whatever signals the user
  is heading there: targeting a body, or a moon of it.

**Data services and UI**

- **Access tokens:** restrict them by Referer or URL on the provider, and
  keep them out of logs and commits. In tests, a Referer-restricted
  token works if the provider's requests are fetched from Node with the
  Referer set (Playwright `route.fetch`) and fulfilled with CORS headers.
- **Attribution is required.** Credits come from the library, but where
  they show, and that your hide-UI key hides them too, is the app's
  business.
- **Fallbacks:** decide what a layer shows when its data can't load. The
  library falls back to the host's rendering. Guest-side fallbacks, like
  Earth's offline imagery, are dataset choices.

**Testing**

- **Headless Chromium on SwiftShader reproduces compositing bugs.**
  Render the same view with the layer forced fully on and fully off
  (`fadeOf` pinned to 1 and 0), and compare.
- **Compare at part-phase.** Colour-pipeline mismatches hide near full
  phase. Use median ratios over the lit disc and profiles across the
  terminator.
- **SwiftShader flips `gl_PointCoord`** in point shaders that `discard`
  or sample a depth texture. Use depth state instead.
