# @pablo-mayrgundter/portal-netgl

Command-stream WebGL portals: route a three.js renderer's GL calls over a
`postMessage` transport so an iframe's draws compose into the host canvas
without a bitmap round-trip.

Two adoption modes:

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

## Protocol

NetGL is two streams over a single transport:

- **Calls** (sender → receiver): `NetGLCall { name, args, returnId? }`
  for every GL call, plus `NetGLFrameEnd { type: 'netgl:frame-end' }`
  markers after each frame.
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

## License

MIT
