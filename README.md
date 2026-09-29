# Portal

**Link independent 3D web renderers at the GL layer.**

This repo does two things:

- **Portals:** doors from one 3D web world into another.
- **In-place layers:** one engine's content drawn where another engine's
  object was, such as Cesium's Earth in place of a three.js Earth.

Both run on **NetGL**, a transport for WebGL command streams. A guest
renderer's GL calls are recorded, sent over a transport, and replayed into
the host's own WebGL context. There, a stencil decides which pixels they
may touch.

> **Status: early prototype.** NetGL runs in production:
> [celestiary](https://celestiary.github.io/) uses it to composite Cesium's
> Earth, Moon and Mars in place of its own. But the APIs and the wire
> format will change before 1.0, and the security model only covers
> trusted guests so far.
>
> **We're looking for testers, RFCs and early adopters.** See
> [Get involved](#get-involved).

## Why

3D on the web is split across engines that don't compose: three.js,
CesiumJS, Babylon.js, Unity WebGL, custom WebGPU renderers, splat and
neural renderers. Each one owns its scene graph, camera, frame loop and
GL state. Putting two of them in one view usually means rewriting one
into the other, or settling for a flat video texture.

Portal keeps engines sovereign and makes the seam explicit. Scene graphs
are the wrong layer to standardise, because they're incompatible by
design. One layer down, every one of these engines emits GL draws. NetGL
links GL contexts: the guest's draws execute in the host's context, with
full fidelity. There's no bitmap round-trip and no depth-packing, and
occlusion works both ways.

```
 guest (Cesium, three.js, ...)                 host (three.js app)
 ─────────────────────────────                 ───────────────────
 renderer ─► recorder Proxy ─┬─ shadow GL ctx   scene render
             (WebGL2 calls)  │  (sync answers)  stencil: where the guest may draw
                             └── transport ───► replay into the host's GL context
                                 (same page,    screen policy: stencil clip,
                                  postMessage,  clear filtering, blending
                                  worker, ...)  post-passes, UI
```

## See it

Live demos (GitHub Pages; WebGL2 required):

| Demo | What it shows |
|---|---|
| [Local portal](https://pablo-mayrgundter.github.io/portal/) | two three.js worlds joined by a traversable door. Walk through it (WASD, drag to look). |
| [iframe portal](https://pablo-mayrgundter.github.io/portal/iframe/) | the destination world in an iframe, shipped as colour and depth bitmaps (frame-RPC) |
| [Worker portal](https://pablo-mayrgundter.github.io/portal/worker/) | the same, rendered in a Web Worker with no DOM |
| [NetGL portal](https://pablo-mayrgundter.github.io/portal/netgl/) | a three.js guest's GL command stream replayed into the host's canvas |
| [NetGL + celestiary](https://pablo-mayrgundter.github.io/portal/netgl-celestiary/) | a real, GL-heavy app (the [celestiary](https://github.com/celestiary/web) solar system) through a door |
| [NetGL + Cesium, door](https://pablo-mayrgundter.github.io/portal/netgl-cesium/) | an unmodified Cesium globe through a door, with real parallax |
| [NetGL + Cesium, in place](https://pablo-mayrgundter.github.io/portal/netgl-cesium/?mode=earth) | Cesium's globe in place of a three.js Earth: the moon occludes it and is occluded by it |

In production, [celestiary](https://celestiary.github.io/) shows Cesium's
Earth, Moon and Mars in place of its own bodies. It uses portal-netgl's
same-page link and crossfades between the two renderings. Its
[`CESIUM.md`](https://github.com/celestiary/web/blob/main/CESIUM.md) is
the integration's design record.

## What works, and what doesn't yet

Works:

- **Command-stream NetGL** for WebGL2 guests, with:
  - handle interning;
  - a synchronous shadow context for return values and readback;
  - a guest state checkpoint, so framework state caches survive a shared
    context;
  - a host-side screen policy: stencil clip, depth-only clears,
    premultiplied-over blending, viewport and scissor remapping, and
    redirecting the guest into a host render target.
- **Transports:**
  - same page, synchronous, zero lag (`makeNetGLImmediateLink`);
  - `postMessage` to same-origin iframes, with flow control and
    ready/ack handshakes.
- **Guests:** three.js, and Cesium unmodified through its
  `getWebGLStub` hook.
- **Composition:**
  - *door* mode, where the host's camera is carried through the door;
  - *in place* mode, where a camera-coupled guest fills a shape
    stencil, depth-tested against the host scene.
- **Frame-RPC portals** (colour and depth bitmaps) for local, iframe,
  Worker and server-side (Node, headless-gl) endpoints, including
  recursive portals.

Not yet:

- **Untrusted guests.** Guest GL executes in the host's context, and
  there's no sandbox, so today's guests must be trusted and same-origin.
- **Cross-origin iframes, WebRTC and remote transports:** designed, not
  built.
- **Resource lifecycle:** handle tables only grow, so very long sessions
  leak.
- **Extension-object methods** (`WEBGL_multi_draw` and friends) bypass
  the recorder.
- **Double drawing:** the shadow context repeats every guest draw.
  That's 2× GPU for the guest.
- **WebGPU:** not supported.

The open problems are itemised in
[`packages/portal-netgl/DESIGN.md`](./packages/portal-netgl/DESIGN.md#open-problems-the-next-pr).

## Packages

| Package | What | Status |
|---|---|---|
| [`@pablo-mayrgundter/portal-netgl`](./packages/portal-netgl) | NetGL recorder, replay, guest context, screen policy, immediate link, host receiver, Cesium shim | [on npm](https://www.npmjs.com/package/@pablo-mayrgundter/portal-netgl), 0.2.x, pre-1.0: pin an exact version |
| `portal-layers` | host/guest shim for in-place layers: compositor, lifecycle, transport bindings, contracts | design, [0.1 draft](./docs/portal-layers.md) |
| [`portal-core`](./packages/portal-core) | engine-agnostic portal geometry, pose coupling, wire types | workspace only |
| [`portal-three`](./packages/portal-three) | three.js bindings: stencil mask, coupled camera, local endpoint | workspace only |
| [`portal-iframe`](./packages/portal-iframe), [`portal-worker`](./packages/portal-worker) | frame-RPC transports and compositor | workspace only |
| [`portal-headless-three`](./packages/portal-headless-three) | server-side renderer (jsdom + headless-gl) | workspace only |
| [`portal-controls`](./packages/portal-controls) | demo fly controls | workspace only |

## Quick start: a Cesium globe in a three.js scene

```sh
npm install @pablo-mayrgundter/portal-netgl
```

```js
import { makeNetGLImmediateLink, makeNetGLCesiumGuest } from '@pablo-mayrgundter/portal-netgl'

const link = makeNetGLImmediateLink({
  gl: renderer.getContext(),
  replay: {
    screenFramebuffer: () => myRenderTargetFramebuffer, // or omit to draw to the canvas
    screen: { stencil: { ref: 1 }, clear: 'depth-only', blend: 'premultiplied-over' },
  },
})
const guest = makeNetGLCesiumGuest({ transport: link.transport })
const widget = new Cesium.CesiumWidget(el, {
  contextOptions: guest.contextOptions,
  useDefaultRenderLoop: false,
  orderIndependentTranslucency: false, // its composite breaks coverage alpha
})
guest.attach(widget.scene)

// Each frame: draw your scene, then a stencil shell where the globe belongs, then:
link.frame(() => widget.render()) // Cesium's calls replay into your context now
renderer.resetState()
```

The package [README](./packages/portal-netgl/README.md) covers the iframe
host and guest, the three.js guest, and the protocol. For in-place layers
there's more to get right: depth, colour, camera coupling and handover.
Read the lessons in
[DESIGN.md](./packages/portal-netgl/DESIGN.md#lessons-from-celestiarys-cesium-layers)
and the gotchas checklist in
[`docs/portal-layers.md`](./docs/portal-layers.md#gotchas-that-stay-in-the-app).

## Run the demos locally

Requires Node 22 and npm.

```sh
git clone --recurse-submodules https://github.com/pablo-mayrgundter/portal.git
cd portal
npm install
npm run dev                    # local portal (host-three)
npm run dev:iframe             # iframe portal
npm run dev:worker             # Web Worker portal
npm run dev:netgl              # NetGL portal (three.js guest)
npm run setup:celestiary && npm run dev:netgl-celestiary   # NetGL + celestiary
npm run dev:netgl-cesium       # NetGL + Cesium (?mode=door | ?mode=earth)
npm test                       # vitest
npm run check                  # type-check all workspaces
npm run build                  # production build of all workspaces
```

## Get involved

This is the stage where outside eyes help most. Three ways in, each with
an issue template:

**Test it.**
- Run the demos on your browser, OS and GPU, and tell us what you see,
  especially mobile GPUs, Safari and Firefox. A screenshot and your
  `chrome://gpu`-style details make a report actionable.
- Try NetGL with a renderer we haven't: Babylon.js, PlayCanvas,
  MapLibre, deck.gl, Unity WebGL.
- Report GL calls that fail to replay. Watch for `unknown handle`,
  unsupported encodings, and state that drifts after the host touches
  the context.

**Write an RFC.** These design questions are open, and we want input
before they settle:
- Transport bindings and the isolation model: sync in-page vs worker vs
  iframe vs remote, and when each is appropriate
  ([`docs/portal-layers.md`](./docs/portal-layers.md#transports)).
- A sandbox for untrusted guest GL: which calls to allow, resource
  budgets, shader validation.
- Host/guest contracts for alpha, depth and colour space, and whether
  the screen policy should enforce them.
- The `portal-layers` 0.1 API as a whole.
- A WebGPU sibling of the command stream.
- Frame-RPC vs command-stream, and where the line sits for engines that
  won't expose their GL.

Small questions can go straight into an issue. Larger proposals are
welcome as a markdown doc in a PR.

**Adopt it.** If you have a 3D web app that should embed another engine
in place (a globe, a map, a CAD or BIM viewer, a splat scene) or open a
portal into one, open an adoption issue. Real integrations drive the
roadmap: celestiary's Cesium layers produced most of what's in
DESIGN.md.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the development workflow.

## Roadmap

- **`portal-layers` 0.1:** a host/guest shim library that packages the
  in-place compositor, lifecycle and contracts
  ([design](./docs/portal-layers.md)).
- **NetGL:**
  - guest-private depth;
  - a no-draw shadow while no readback is pending;
  - resource lifecycle (trimming handle tables);
  - extension objects;
  - multiple guests per host receiver.
- **Isolation:** origin-restricted cross-origin iframes, then a sandbox
  for untrusted GL.
- **Transports:** Worker + OffscreenCanvas guests, then WebRTC and
  WebTransport.
- **Engines:** more guest adapters, and a WebGPU command stream.

## Docs

- [`packages/portal-netgl/README.md`](./packages/portal-netgl/README.md): the NetGL API and protocol.
- [`packages/portal-netgl/DESIGN.md`](./packages/portal-netgl/DESIGN.md): architecture, the screen policy, composition modes, findings from the Cesium and celestiary integrations, open problems.
- [`docs/portal-layers.md`](./docs/portal-layers.md): the `portal-layers` 0.1 design, and the gotchas that stay in the app.
- [`docs/netgl-renderer.md`](./docs/netgl-renderer.md): the original NetGL design notes and spikes.
- [`docs/frame-rpc-portals.md`](./docs/frame-rpc-portals.md): the frame-RPC portal design and its history (endpoints, traversal, recursion, server-side rendering).
- [`docs/deploying-proxies.md`](./docs/deploying-proxies.md): the snapshot and share proxies behind the demos' social previews.

## Design rules

1. Engines stay sovereign.
2. Scene graphs are private by default.
3. Pose, time, selection and intent are public.
4. A portal is a coordinate transform plus a live view.
5. Traversal is state handoff, not necessarily a page reload.
6. The host owns the portal geometry. Endpoints are render-from-this-pose services.
7. AI agents should write adapters, not rewrite whole worlds.

## License

[MIT](./LICENSE).
