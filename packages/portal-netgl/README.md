# @pablo-mayrgundter/portal-netgl

Command-stream WebGL portals: route a three.js renderer's GL calls over a
`postMessage` transport so an iframe's draws compose into the host canvas
without a bitmap round-trip.

Adoption modes:

- **A Cesium app** (see [Cesium guest](#makenetglcesiumguest--cesium-guest)):
  pass `guest.contextOptions` to your Viewer and call `guest.attach(scene)`.
- **Any other WebGL2 framework**: `makeNetGLGuestContext` gives you a
  recorder context to hand the framework and an `endFrame()` to call after
  each frame (or `subFrame()`, when the host draws it several times a
  frame). That's the whole shim.
- **Embedded app authors own their own renderer** (e.g. integrating
  celestiary, bldrs, an existing three.js app into a portal): use
  `makeNetGLPortalGuest`. The factory builds a recorder-wrapped
  `THREE.WebGLRenderer` that you use instead of `new WebGLRenderer(...)`;
  your render loop runs unchanged.
- **Portal-aware target with a scene + anchor**: use
  `makeNetGLPortalTarget`. The factory drives rendering in response to
  inbound `setPose` messages from the host.

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
import { makeNetGLHostReceiver, windowTransport } from '@pablo-mayrgundter/portal-netgl'

const receiver = makeNetGLHostReceiver({
  gl: renderer.getContext(),
  transport: windowTransport({ output: iframe.contentWindow, inputFilter: iframe.contentWindow }),
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
embedded. It applies to the guest's draws and clears of its default
framebuffer (the "screen"); the guest's own framebuffers are left alone.
Options:

- `stencil: { ref, valueMask? }`: screen draws test stencil EQUAL `ref`
  and write no stencil.
- `clear`: what happens to the guest's screen clears.
  - `'pass'` (default): they run as sent.
  - `'depth-only'`: colour and stencil clears are dropped; depth clears
    are confined to the guest's (remapped) viewport. For a guest drawn
    through a door, after you clear depth for it.
  - `'none'`: every screen clear is dropped, colour, depth and stencil.
    For a guest drawn into a frame you are still rendering, whose depth
    it must test against (a three.js city inside Cesium's frame, behind
    and in front of the globe).
- `blend: 'premultiplied-over'`: screen draws blend `ONE,
  ONE_MINUS_SRC_ALPHA`, for a guest that renders over a transparent
  background.

Plus `screenFramebuffer` to land the guest in one of your render targets
instead of the canvas. See DESIGN.md.

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

### Sub-frames: one guest, several draws per host frame

A host may need the guest drawn more than once in one of its frames, with
its own draws in between. Cesium calls an external renderer
(`scene.externalRenderers`, in the celestiary fork of Cesium) once per depth
frustum, with its framebuffer bound and the globe in its depth buffer, and
resets its own state after each call. Run `link.frame()` in each call, and
end each draw with the guest context's `subFrame()` instead of
`endFrame()`:

```js
import { makeNetGLImmediateLink, makeNetGLGuestContext } from '@pablo-mayrgundter/portal-netgl'

let target = null   // the framebuffer Cesium has bound for this pass
const link = makeNetGLImmediateLink({
  gl: scene.context._gl,   // Cesium's context: the guest replays into Cesium's frame
  replay: {
    screenFramebuffer: () => target,   // the guest's "screen" is Cesium's pass target
    screen: { clear: 'none' }          // keep Cesium's colour, depth and stencil
  }
})
const guestCtx = makeNetGLGuestContext({ canvas: shadowCanvas, transport: link.transport })
const city = makeMyThreeApp({ context: guestCtx.gl })   // any WebGL2 framework

scene.externalRenderers.add(new Cesium.ExternalRenderer({
  boundingVolume: cityBounds,
  render (p) {   // once per frustum, far to near
    target = p.framebuffer
    city.setCamera(p.viewMatrix, p.projectionMatrix)
    link.frame(() => {
      city.render()
      guestCtx.subFrame()
    })
  }
}))
```

`subFrame()` posts the same frame-end and the same state checkpoint as
`endFrame()`, so each draw starts from the guest's own GL state whatever
the host did in between. The difference is when the checkpoint goes out:
just before the guest's next GL call, which comes inside the next
`link.frame()`, so it replays there directly instead of being cloned into
the link's queue while it is closed. It works across host frames too, so
a guest drawn only this way can call `subFrame()` every time.

`endFrame({ checkpoint: false })` posts the frame-end alone. It's for a
host that doesn't touch the context between the guest's frames, or a guest
that resets its own state cache; anything else then replays from the
host's leftover state. What each costs, and why the checkpoint can't be
trimmed for a host like Cesium: DESIGN.md, [sub-frames](./DESIGN.md#sub-frames).

## Protocol

NetGL is two streams over a single transport:

- **Calls** (sender → receiver): `NetGLCall { name, args, returnId? }`
  for every GL call, plus `NetGLFrameEnd { type: 'netgl:frame-end' }`
  markers after each frame. Guests built on `makeNetGLGuestContext`
  follow each frame-end with a state checkpoint — ordinary calls that
  restore the guest's GL state — so framework state caches survive the
  host sharing the context (after `subFrame()`, the checkpoint comes just
  before the guest's next call instead). The checkpoint is built from state tracked
  off the call stream (`makeBindingTracker`, `makeScalarStateTracker`), so
  it makes no synchronous GL queries on the shadow. If you set GL state on
  the shadow context directly (not through the recorder), pass
  `scalarState: 'queried'` to `makeNetGLGuestContext` /
  `makeNetGLCesiumGuest`, which reads it back from the shadow at every
  frame end instead.
- **Control** (host ↔ guest): `netgl:ready` handshake announcing the
  guest's anchor + background; `netgl:setPose` from the host with the
  coupled camera state.

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
