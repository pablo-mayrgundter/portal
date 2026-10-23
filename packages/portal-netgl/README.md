# @pablo-mayrgundter/portal-netgl

Command-stream WebGL portals: route a three.js renderer's GL calls over a
`postMessage` transport so an iframe's draws compose into the host canvas
without a bitmap round-trip.

Adoption modes:

- **A Cesium app** (see [Cesium guest](#makenetglcesiumguest--cesium-guest)):
  pass `guest.contextOptions` to your Viewer and call `guest.attach(scene)`.
- **Any other WebGL2 framework**: `makeNetGLGuestContext` gives you a
  recorder context to hand the framework and an `endFrame()` to call after
  each frame. That's the whole shim.
- **Embedded app authors own their own renderer** (e.g. integrating
  celestiary, bldrs, an existing three.js app into a portal): use
  `makeNetGLPortalGuest`. The factory builds a recorder-wrapped
  `THREE.WebGLRenderer` that you use instead of `new WebGLRenderer(...)`;
  your render loop runs unchanged.
- **Portal-aware target with a scene + anchor**: use
  `makeNetGLPortalTarget`. The factory drives rendering in response to
  inbound `setPose` messages from the host.
- **A deck.gl host** (see [deck.gl host](#attachnetgldecklayer--deckgl--lumagl-host)):
  `attachNetGLDeckLayer(deck, …)` draws a guest over deck's frame, in
  deck's clip space, from the same page or a cross-origin iframe.

## Install

```sh
npm install three @pablo-mayrgundter/portal-netgl
```

`three` is a peer dependency — your version of three.js is used.
Supported range: `three@>=0.171.0 <1.0.0`.

## `makeNetGLPortalGuest` — embedded-app integration

```js
import * as THREE from 'three'
import { makeNetGLPortalGuest } from '@pablo-mayrgundter/portal-netgl'

// Detect portal mode (in an iframe + ?portal=1 in the URL).
const portalMode =
  window.parent !== window.self &&
  new URLSearchParams(location.search).get('portal') === '1'

if (portalMode) {
  const { renderer } = makeNetGLPortalGuest({
    WebGLRenderer: THREE.WebGLRenderer,
    anchor: {
      position: [0, 0, 0],
      normal: [0, 0, -1],
      up: [0, 1, 0],
      halfWidth: 1,
      halfHeight: 1
    },
    background: { r: 0, g: 0, b: 0 },
    rendererParams: { antialias: true, stencil: true, depth: true }
    // optional onSetPose(msg) hook if you want to honour the host's pose
  })
  // Use `renderer` exactly as you would a normal THREE.WebGLRenderer.
  // setSize, render, setAnimationLoop — all work the same. GL calls
  // cross the wire to the host canvas instead of painting locally.
}
```

The host page iframes the embedded app with `?portal=1` and runs a NetGL
replay engine (`makeNetGLReplay` from this package) against its own
WebGL2 canvas, with `remapScreenViewport` configured to place the
embedded app's screen-target draws inside the portal door's pixel rect.

## `makeNetGLPortalTarget` — portal-aware scene

Use when the embedded app exists primarily to be embedded. Build a
`THREE.Scene`, hand it to the factory with a portal anchor; the factory
owns the renderer, the message protocol, and the per-frame render
trigger:

```js
import { makeNetGLPortalTarget } from '@pablo-mayrgundter/portal-netgl'

const target = makeNetGLPortalTarget({
  scene: myScene,
  anchor: {
    position: [0, 1.6, 0],
    normal: [0, 0, -1],
    up: [0, 1, 0],
    halfWidth: 1.3,
    halfHeight: 1.6
  },
  tick: (time) => animate(myScene, time)
})
target.start()
```

## `makeNetGLCesiumGuest` — Cesium guest

```js
import { makeNetGLCesiumGuest } from '@pablo-mayrgundter/portal-netgl'

const guest = makeNetGLCesiumGuest({
  onMessage: (msg) => { /* host → guest control, e.g. camera ticks */ }
})
const viewer = new Cesium.Viewer('cesiumContainer', {
  contextOptions: guest.contextOptions,
  // ...your usual options
})
guest.attach(viewer.scene)
```

Cesium calls `contextOptions.getWebGLStub` instead of `canvas.getContext`;
the shim returns a NetGL recorder whose shadow lives on Cesium's own
canvas, and posts a frame-end after every `scene.postRender`. Cesium is
not a dependency — the shim is typed structurally. Worked example:
`apps/host-netgl-cesium/`.

## `makeNetGLHostReceiver` — host side

```js
import { makeNetGLHostReceiver, iframeTransport } from '@pablo-mayrgundter/portal-netgl'

const receiver = makeNetGLHostReceiver({
  gl: renderer.getContext(),
  transport: iframeTransport(iframe, { origin: 'https://guest.example' }),
  replay: {
    remapScreenViewport: (x, y, w, h) => doorRect,   // where guest screen draws land
    screen: { stencil: { ref: 1 }, clear: 'depth-only' }
  }
})

// In your frame, after drawing your scene and the portal stencil mask:
renderer.clearDepth()
receiver.drain()
renderer.resetState()   // your framework's state cache is stale now
```

The `screen` policy keeps the guest's screen draws inside the stencil mask
and stops it clearing your canvas, without the guest knowing it's
embedded. Options: `stencil`, `clear: 'depth-only'`, `blend:
'premultiplied-over'`; plus `screenFramebuffer` to land the guest in one of
your render targets instead of the canvas. See DESIGN.md.

`receiver.onFrame(cb)` calls back when a guest frame completes (for hosts
that render on demand), `receiver.post(msg)` sends the guest a control
message, and `receiver.canRerun` says whether `drain()` would re-run the
last frame when nothing new has arrived.

## Cross-origin iframes

Pin both ends to each other's origin. The allow-lists are your own
constants: never read them from a URL parameter.

```js
// Host: post with the guest's exact origin, accept only its window and origin.
const transport = iframeTransport(iframe, { origin: 'https://celestiary.org' })

// Guest: post to the embedding page's origin (resolved from
// location.ancestorOrigins or document.referrer), accept only those origins.
const transport = parentTransport({ hostOrigins: ['https://pablo-mayrgundter.github.io', 'http://localhost:5190'] })
```

`windowTransport({ output, inputFilter, allowedOrigins, outputOrigin,
onReject })` is the general form; without `allowedOrigins` it keeps its old
same-origin defaults (`'*'`, any origin). A sandboxed iframe without
`allow-same-origin` has the opaque origin `'null'`: pass `origin: 'null'`,
and the host then posts with `'*'` and accepts that frame's window only.

Origin pinning is not a sandbox: the guest's GL still executes in your
context, so a cross-origin guest must still be one you trust. DESIGN.md
["Cross-origin iframes"](./DESIGN.md#cross-origin-iframes) lists what
remains open.

## `attachNetGLDeckLayer` — deck.gl / luma.gl host

Composites a guest after deck's layers, in deck's WebGL2 context, with
deck's depth still valid. It brackets the guest with luma's
`device.pushState()` / `popState()`, so deck's next frame is unchanged by
whatever state the guest left, and builds the guest's view from deck's
viewport: for a `GlobeView`, ECEF metres and deck's own projection.

```js
import { Deck, _GlobeView as GlobeView } from '@deck.gl/core'
import { attachNetGLDeckLayer, iframeTransport } from '@pablo-mayrgundter/portal-netgl'

const deck = new Deck({
  views: new GlobeView({ farZMultiplier: 4 }), // room for the guest's orbits
  // ...
  onDeviceInitialized: (device) => {
    const layer = attachNetGLDeckLayer(deck, {
      device,
      transport: iframeTransport(iframe, { origin: 'https://celestiary.org' }),
      time: () => Date.now() // the host owns the clock
    })
  }
})
```

With `transport`, the guest is in another window: after each deck frame
whose view changed, the adapter posts a `layer:view` (at most one
unanswered), and redraws deck when the guest's frame arrives. With
`render: (view) => …` instead, the guest is in the same page: give it
`layer.transport`, and it renders synchronously in each deck frame.

The view (`NetGLLayerView`): `viewMatrix` (ECEF metres → eye metres,
rigid, column-major), `projectionMatrix` (deck's, scale folded back in,
so clip space and depth are deck's), `viewport` (drawing-buffer pixels),
`pixelRatio`, `timeMs` (Unix ms, UTC) and `earth` (deck's sphere,
6,370,972 m). `globeLayerView(viewport, opts)` builds one on its own; it
returns null for a viewport that isn't a globe, including GlobeView's Web
Mercator mode above zoom 12, and the guest is skipped. `withLumaState(device,
fn)` is the bracket on its own. deck.gl and luma.gl aren't dependencies;
the adapter is typed structurally. Worked example: `apps/host-netgl-deck/`.

## `makeNetGLThreeOverlayGuest` — three.js overlay guest

A three.js scene drawn from the host's `layer:view`: no clears, a
transparent frame, the host's camera and projection (with the
`matrixWorldNeedsUpdate` a host-set camera matrix needs), and one frame per
view.

```js
import * as THREE from 'three'
import { makeNetGLThreeOverlayGuest, parentTransport } from '@pablo-mayrgundter/portal-netgl'

const guest = makeNetGLThreeOverlayGuest({
  WebGLRenderer: THREE.WebGLRenderer,
  scene, // ECEF metres; materials with depthWrite: false
  camera: new THREE.PerspectiveCamera(),
  transport: parentTransport({ hostOrigins: ['https://netmap.example'] }),
  onView: (view) => updateSatellites(view.timeMs)
})
guest.start() // announce, then render on each layer:view
```

## `makeNetGLImmediateLink` — same page, no iframe

When the guest framework runs in the host's own page (a Cesium globe inside
a three.js app), skip postMessage entirely. Hand the guest the link's
transport, and run each guest frame synchronously at the point in your
frame where its pixels belong:

```js
import { makeNetGLImmediateLink, makeNetGLCesiumGuest } from '@pablo-mayrgundter/portal-netgl'

const link = makeNetGLImmediateLink({ gl: renderer.getContext(), replay: { screen: {...} } })
const guest = makeNetGLCesiumGuest({ transport: link.transport })
const widget = new Cesium.CesiumWidget(el, { contextOptions: guest.contextOptions, useDefaultRenderLoop: false })
guest.attach(widget.scene)

// In your render loop:
link.frame(() => widget.render())   // Cesium's GL calls replay into your context as they happen
renderer.resetState()
```

Calls made inside `frame()` execute immediately; calls the guest makes
between frames (its state checkpoint, async resource uploads) are cloned,
queued and flushed at the start of the next `frame()`. No frame of latency,
no structured-clone of every call.

## Protocol

NetGL is two streams over a single transport:

- **Calls** (sender → receiver): `NetGLCall { name, args, returnId? }`
  for every GL call, plus `NetGLFrameEnd { type: 'netgl:frame-end' }`
  markers after each frame. Guests built on `makeNetGLGuestContext`
  follow each frame-end with a state checkpoint — ordinary calls that
  restore the guest's GL state — so framework state caches survive the
  host sharing the context. The checkpoint is built from state tracked
  off the call stream (`makeBindingTracker`, `makeScalarStateTracker`), so
  it makes no synchronous GL queries on the shadow. If you set GL state on
  the shadow context directly (not through the recorder), pass
  `scalarState: 'queried'` to `makeNetGLGuestContext` /
  `makeNetGLCesiumGuest`, which reads it back from the shadow at every
  frame end instead.
- **Control** (host ↔ guest): `netgl:ready` handshake announcing the
  guest's anchor + background; `netgl:setPose` from the host with the
  coupled camera state (door portals), or `layer:view` with the host's
  exact view (overlays, `attachNetGLDeckLayer`).

See [`DESIGN.md`](./DESIGN.md) for the architecture, the adoption
findings that surfaced building celestiary integration, and the open
problems on the roadmap.

## Status

Pre-1.0. The wire protocol shape is documented and exercised against a
real GL-heavy app (celestiary) but isn't ABI-stable across patch
releases. Lock to an exact version in production.

## Publishing (maintainers)

Releases are CI-driven via [npm Trusted Publishing][tp] (OIDC). No
long-lived `NPM_TOKEN` secret. Cutting a release:

1. Bump `version` in `packages/portal-netgl/package.json`.
2. Land on `main`.
3. The `npm-publish` workflow detects the version diff vs `@latest`
   and publishes, attaching a provenance attestation pointing at the
   commit + workflow run.

**Bootstrap (one-time, for the very first version)**: npm requires a
package to exist before you can configure trusted publishing for it,
so the v0.1.0 publish must come from a maintainer's laptop. Run the
following from the **repo root** — the `-w` flag targets the workspace
package by name regardless of cwd, so there's no risk of accidentally
publishing the root `portal-monorepo` (which is private + name-clashes
with an existing `portal` on npm anyway):

```sh
npm install                         # populate workspace symlinks
npm run build -w @pablo-mayrgundter/portal-netgl
npm run publish:portal-netgl        # interactive 2FA
```

Then configure the trusted publisher on npmjs.com:
[`https://www.npmjs.com/package/@pablo-mayrgundter/portal-netgl/access`](https://www.npmjs.com/package/@pablo-mayrgundter/portal-netgl/access)
→ Trusted Publishers → Add → GitHub Actions, with:

- Organization or user: `pablo-mayrgundter`
- Repository: `portal`
- Workflow filename: `npm-publish.yml`
- Environment name: *(leave blank, or set to `release` if you want an
  approval gate)*

From v0.1.1 onward, every release goes through CI.

[tp]: https://docs.npmjs.com/trusted-publishers

## License

MIT
