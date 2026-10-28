# Changelog

The releases of [`@pablo-mayrgundter/portal-netgl`](./packages/portal-netgl/README.md),
newest first, and the state of the repo before NetGL existed. The same
history as a table, with a snapshot of the demos at each version and the
six axes the releases moved, is the Evolution page:
[pablo-mayrgundter.github.io/portal/rfcs/evolution.html](https://pablo-mayrgundter.github.io/portal/rfcs/evolution.html)
([`docs/rfcs/responses/evolution.md`](./docs/rfcs/responses/evolution.md)).

Dates are the day the release's last PR merged into `main`, unless noted.
Every version's demos are kept at
`https://pablo-mayrgundter.github.io/portal/v/<version>/`; the ones before
0.6.8 are reconstructions built from that version's last commit. The
package is pre-1.0: pin an exact version.

## 0.6.9: Deferred deletes (2026-10-28)

- **Any frame can be re-run.** The receiver holds every delete back until
  it drains a new frame, so a re-run of the last frame finds every object
  it used; the delete's implicit unbinds (the bound framebuffer back to the
  screen, a texture off its units, an attachment detached from the bound
  framebuffer, ...) happen at its position, as calls. Until now a frame that
  deleted anything was never re-run, and Cesium deletes buffers and
  textures nearly every frame while tiles load, so a host waiting on a late
  guest drew nothing. A frame that reads back or uses a sync object is
  still never re-run. `receiver.pendingDeletes` counts the held deletes
  ([RFC 0003](https://github.com/pablo-mayrgundter/portal/issues/49) §3;
  [#54](https://github.com/pablo-mayrgundter/portal/pull/54)). DESIGN.md,
  [Findings from Cesium integration](./packages/portal-netgl/DESIGN.md#findings-from-cesium-integration).
- **Behaviour change:** `canRerun` is now true after a frame that deleted
  objects (a three.js guest's first frame), so the deck.gl adapter no
  longer asks again for an unchanged view after the first frame.
- **Built for:** celestiary's Cesium guest pages, whose late frames during
  tile loads were blank (118 of 503 drains headless with every frame late).

## After 0.6.8's bump

On `main` after 0.6.8, with no version bump: docs and the site, no
protocol change. `history.json` counts the docs site in 0.6.8's snapshot,
since the version didn't move.

- **The RFC responses**, published at
  [/portal/rfcs/](https://pablo-mayrgundter.github.io/portal/rfcs/): a
  synthesis of RFCs 0001–0003, a 1-pager and an infographic for each, the
  tracks of work and the versions each claims; a version pulldown in the
  site's header and the demos' drawer; a snapshot of the whole site per
  release under `/portal/v/<version>/`
  ([#50](https://github.com/pablo-mayrgundter/portal/pull/50)).
- **Every earlier version reconstructed as a snapshot**, from the last
  commit on `main` at that version, with a banner that says so; the
  [Evolution page](./docs/rfcs/responses/evolution.md) and its timeline;
  the *Snapshot a version* workflow, which rebuilds a version from its
  entry in
  [`history.json`](./docs/rfcs/responses/history.json)
  ([#51](https://github.com/pablo-mayrgundter/portal/pull/51)).
- **The site's root is the overview** (the Portal / NetGL infographic, with
  where to read on); the responses' synthesis is `rfcs/index.html`. The Local portal demo moved
  from the root to `three/`, beside the other demos. A page per earlier
  version (`versions/<version>.html`, from this file) is what the
  version pulldown shows for a version that predates the responses.
- **The RFCs they answer** ([index](./docs/rfcs/README.md)):
  [0001](./docs/rfcs/0001-globe-orbit-layers.md), globe + orbit layers
  (merged in 0.5.0, discussion in
  [#39](https://github.com/pablo-mayrgundter/portal/issues/39));
  0002, nested in-place guests
  ([#38](https://github.com/pablo-mayrgundter/portal/issues/38));
  0003, late frames from a guest on another page
  ([#49](https://github.com/pablo-mayrgundter/portal/issues/49)). What
  the next versions would carry (0.6.9, 0.6.10, 0.7, 0.8) is proposed in
  the responses' [Versions](./docs/rfcs/responses/README.md#versions).

## 0.6.8: Parts (2026-10-27)

- **Protocol:** several draws for one view, each to its own target. A
  guest tags each draw's frame-end with a `part`
  (`endFrame({ viewId, part })`); the receiver's `beforeFrame(end)` runs
  before each frame's calls, so the host's `screenFramebuffer` callback can
  send each part to its own target
  ([#48](https://github.com/pablo-mayrgundter/portal/pull/48)). DESIGN.md,
  [Parts](./packages/portal-netgl/DESIGN.md#parts-several-draws-for-one-view).
- **Built against:** celestiary's Cesium layer, whose Earth's night
  lights are a second render of the same view, from a guest page.

## 0.6.7: Pixel sizes (2026-10-27)

- A lagging frame's point sizes and line widths follow the host's pixel
  ratio: a wrapped vertex shader that writes `gl_PointSize` scales it by
  `netgl_pixelScale`
  ([#47](https://github.com/pablo-mayrgundter/portal/pull/47)).

## 0.6.6: Cesium shim passthrough (2026-10-26)

- `makeNetGLCesiumGuest` passes `shadowDraws` through, for a Cesium app
  that never picks. 0.6.5 had gone to the viewport map
  ([#46](https://github.com/pablo-mayrgundter/portal/pull/46)).

## 0.6.5: Viewport map (2026-10-26)

- A frame drawn for one buffer size is mapped when the host's buffer
  changed size (a resize, or a pixel-ratio change while the camera moves),
  instead of replaying its own viewport into the new buffer
  ([#45](https://github.com/pablo-mayrgundter/portal/pull/45)).

## 0.6.4: Opt-in shaders (2026-10-24)

- A vertex shader that declares `uniform mat4 netgl_reproject;` isn't
  wrapped: it applies the correction itself, before any pixel offset, so
  wide lines keep their width
  ([#44](https://github.com/pablo-mayrgundter/portal/pull/44)).

## 0.6.3: Host reprojection (2026-10-24)

- **Protocol:** a late overlay frame is corrected to the host's current
  view. The replay rewrites the guest's vertex shaders once and multiplies
  `gl_Position` by `VP_now · VP_frame⁻¹`; `viewId` on the frame-end says
  which view a frame was drawn for. Off by default
  ([#43](https://github.com/pablo-mayrgundter/portal/pull/43)). DESIGN.md,
  [Host reprojection](./packages/portal-netgl/DESIGN.md#host-reprojection).
- **Demos:** the deck.gl demo turns it on; `?reproject=0` turns it off,
  for comparison.

## 0.6.2: No-draw shadow (2026-10-24)

- `makeNetGLGuestContext({ shadowDraws: false })`: the shadow context
  skips its draws, for a guest that never reads back its own pixels (an
  overlay). The stream is unchanged
  ([#42](https://github.com/pablo-mayrgundter/portal/pull/42)).

## 0.6.1: Redraw folding (2026-10-24)

- The deck.gl adapter: a redraw request restarts the fold window, so a
  guest frame that lands after a host draw still gets its own
  ([#41](https://github.com/pablo-mayrgundter/portal/pull/41)).

## 0.6.0: Wire 2 (2026-10-24)

- **Protocol:** one `netgl:batch` per guest frame, over a `MessageChannel`
  port where the host can hand one out, negotiated in the ready handshake
  so 0.5 guests and hosts still work. Uploads are sliced to the bytes a
  call reads, and the recorder's own copies are transferred. A cross-site
  frame went from 187 messages and 505 KB to 1 and 48 KB, the host's
  decode from 210 ms to 0.1 ms
  ([#40](https://github.com/pablo-mayrgundter/portal/pull/40)). DESIGN.md,
  [Wire protocol](./packages/portal-netgl/DESIGN.md#wire-protocol).
- **deck.gl adapter:** drops a redraw when deck drew in the meantime, and
  gains `requestGuestFrame()`.
- **Built against:** celestiary's orbits in a deck.gl globe, on another
  origin.

## 0.5.0: Overlay, the view, cross-origin (2026-10-23)

- **Protocol:** the *overlay* composition kind: no stencil, the host's
  exact clip space, tested against the host's depth. `layer:view` and the
  first control messages (`hello-ack`, `invalidate`, anchors on the deck
  adapter); control posts held until the guest is live. `postMessage`
  transports pinned by origin on both ends
  ([#36](https://github.com/pablo-mayrgundter/portal/pull/36)).
- **Hosts and guests:** the deck.gl / luma.gl host adapter
  (`attachNetGLDeckLayer`), which restores its state around the replay
  where three invalidates; a three.js overlay guest; a three-free
  `@pablo-mayrgundter/portal-netgl/core` entry, with three an optional peer
  dependency.
- **Demos:** NetGL + deck.gl, a cross-origin three.js guest over deck's
  globe.
- **RFCs:** [RFC 0001](./docs/rfcs/0001-globe-orbit-layers.md), globe +
  orbit layers, starts the series
  ([#35](https://github.com/pablo-mayrgundter/portal/pull/35)).
- **Built against:** netmap (#7) and celestiary/web (#296).

## 0.4.0: Inside the host's pass (2026-10-23)

- **Protocol:** `clear: 'none'` keeps a guest's clears off the host's
  depth, and sub-frames let a host draw one guest several times in a
  frame, with its own draws in between; the checkpoint is deferred to the
  guest's next call
  ([#34](https://github.com/pablo-mayrgundter/portal/pull/34)). DESIGN.md,
  [Sub-frames](./packages/portal-netgl/DESIGN.md#sub-frames).
- **Built against:** Cesium drawing Slop New York (three.js) per depth
  frustum, on its terrain, through `scene.externalRenderers`.

## 0.3.0: Tracked state (2026-10-22)

- **Protocol:** the checkpoint is built from scalar state the recorder
  tracked, not queried: 79 synchronous GL queries per guest frame become
  0. `scalarState: 'queried'` keeps the old path for a guest that sets
  state on the shadow directly
  ([#33](https://github.com/pablo-mayrgundter/portal/pull/33)).
- **Built against:** celestiary's Cesium layers (celestiary/web #189,
  #194).

## 0.2.0: Checkpoint, screen policy, Cesium (2026-09-29; bumped 2026-09-26)

- **Protocol:** a framework-agnostic guest core, so a shim is context
  injection plus a frame boundary. The state checkpoint: the guest
  re-emits its GL state at each frame boundary, so a framework's cache
  survives a shared context. The screen policy: the host overrides
  stencil, clears and blending for draws to its screen, and
  `screenFramebuffer` redirects them into a target of its own. A deleting
  frame is never re-run; `netgl:ready` is re-sent until acked
  ([#26](https://github.com/pablo-mayrgundter/portal/pull/26)).
- **Links:** the same-page immediate link, `makeNetGLImmediateLink`:
  synchronous, zero lag
  ([#28](https://github.com/pablo-mayrgundter/portal/pull/28); published
  after [#29](https://github.com/pablo-mayrgundter/portal/pull/29) ran the
  publish workflow's tests under xvfb).
- **Demos:** NetGL + Cesium, an unmodified Cesium globe through its
  `getWebGLStub` hook, through a door and in place of a three.js Earth,
  with the moon occluding it and occluded by it. Door portals are windows,
  not pictures ([#27](https://github.com/pablo-mayrgundter/portal/pull/27)).
- **Docs:** the `f → f′` shim model, the `portal-layers` 0.1 design, the
  lessons from celestiary's Cesium layers, which run in production; the
  public front page and AGENTS.md
  ([#30](https://github.com/pablo-mayrgundter/portal/pull/30),
  [#31](https://github.com/pablo-mayrgundter/portal/pull/31)).

## 0.1.0: The command stream (bumped 2026-05-25; published 2026-05-28)

- **Protocol:** three spikes in a week (a Proxy over `WebGLRenderer`'s
  context with pixel parity; recorder and replay through the portal
  transport; a `NetGLRenderer` façade), then the demo. A guest's WebGL2
  calls are recorded by a Proxy, answered synchronously by a shadow
  context, interned by handle, posted one message each, and replayed in
  the host's context between a stencil paint and a frame-end marker
  ([#16](https://github.com/pablo-mayrgundter/portal/pull/16),
  [#17](https://github.com/pablo-mayrgundter/portal/pull/17),
  [#18](https://github.com/pablo-mayrgundter/portal/pull/18),
  [#22](https://github.com/pablo-mayrgundter/portal/pull/22)).
- **Built against:** celestiary, through a door, unmodified but for a
  renderer hook: the door-fit viewport remap, batches concatenated rather
  than overwritten, autoClear on for render targets and off for the
  screen, a full-viewport invisible iframe; `makeNetGLPortalTarget`
  ([#23](https://github.com/pablo-mayrgundter/portal/pull/23)). DESIGN.md,
  [Findings from celestiary integration](./packages/portal-netgl/DESIGN.md#findings-from-celestiary-integration).
- **Demos:** NetGL portal and NetGL + celestiary; the Pages site with a
  nav drawer and PR previews
  ([#19](https://github.com/pablo-mayrgundter/portal/pull/19),
  [#21](https://github.com/pablo-mayrgundter/portal/pull/21)); mobile
  pitch and yaw controls, the version's last commit on 2026-07-09
  ([#25](https://github.com/pablo-mayrgundter/portal/pull/25)).
- **Published** to npm as `@pablo-mayrgundter/portal-netgl` on 2026-05-28
  ([#24](https://github.com/pablo-mayrgundter/portal/pull/24)).

## Before NetGL: frame-RPC portals (2026-04-26 to 2026-04-30)

Not a portal-netgl release; kept as `v/0.0.0-frame-rpc/`. Design and
history: [`docs/frame-rpc-portals.md`](./docs/frame-rpc-portals.md).

- **Doors between three.js worlds:** the boundary is the door's
  projection on the portal plane, drawn with a halfspace stencil and an
  oblique near-plane clip; traversal through the door
  ([#1](https://github.com/pablo-mayrgundter/portal/pull/1),
  [#3](https://github.com/pablo-mayrgundter/portal/pull/3),
  [#5](https://github.com/pablo-mayrgundter/portal/pull/5)).
- **Endpoints:** a `PortalEndpoint` across four transports (local,
  iframe, Worker, headless Node), each shipping colour and packed-RGBA
  depth bitmaps per frame; iframe traversal both ways
  ([#6](https://github.com/pablo-mayrgundter/portal/pull/6),
  [#7](https://github.com/pablo-mayrgundter/portal/pull/7),
  [#10](https://github.com/pablo-mayrgundter/portal/pull/10)).
- **Recursive portals and a server-side renderer**, behind a snapshot
  proxy and a share proxy for social previews
  ([#11](https://github.com/pablo-mayrgundter/portal/pull/11),
  [#12](https://github.com/pablo-mayrgundter/portal/pull/12),
  [#13](https://github.com/pablo-mayrgundter/portal/pull/13),
  [#14](https://github.com/pablo-mayrgundter/portal/pull/14)).
- **Demos:** local, iframe and Worker portals.
