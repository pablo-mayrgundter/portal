# `NetGLRenderer` — design notes

Status: **v0 spike passing in-process** (see `packages/portal-netgl/src/three-spike.test.ts`).
THREE.WebGLRenderer rendering a cube through a `Proxy<WebGL2RenderingContext>`
produces byte-equal pixels against a control render in a second context — the
command-stream interception concept is validated. The next milestone is the
wire layer: serialise the recorded calls onto a `PortalTransport`, replay on
the iframe side, and prove the same parity across postMessage.

The first prototype targets a three↔three pair over an iframe
`windowTransport`; that path proves the command-stream NetGL concept end to
end before the protocol generalises across engines.

## Goal

A `THREE.WebGLRenderer`-shaped object — a drop-in for `WebGLRenderer` in
the same family as `WebGPURenderer` or an `OffscreenCanvas`-backed
renderer — that ships every GL call three would have made to a remote
GL context, where they execute against a real `WebGL2RenderingContext`.
Color, depth, stencil, blending — anything accessible by GL — happens
in the remote context at native GPU fidelity.

Concrete first scene: a trivial spinning cube. Render it on the sender
via NetGLRenderer; replay on the receiver; read back the receiver's
framebuffer; assert per-pixel parity with the sender rendering the same
scene through a regular `WebGLRenderer`. That's the spike's success
criterion.

## Non-goals (for v0)

- Cross-GPU portability. Both sides assume similar WebGL2 capability
  profiles. Capability negotiation is sketched but not enforced.
- Async / occlusion / timer queries. These need round-trip readback; the
  spike stubs them.
- Compute / transform feedback. Out of scope until a use case lands.
- Composition mode (B-side merging of A's draws with B's own scene).
  v0 is "render in B, ship the framebuffer back to A". Composition is
  the *real* prize and v1 unlocks it on top of the same plumbing.
- Multi-context, multi-frame pipelining. v0 is one frame at a time,
  begin → end → readback → next.

## Architecture

```
                 sender (host iframe / worker)                            receiver (linked iframe)
   ┌─────────────────────────────────────────────────────┐      ┌──────────────────────────────────────┐
   │  THREE.Scene + Camera                                │      │  real WebGL2RenderingContext (canvas │
   │           │                                          │      │  or OffscreenCanvas; never displayed │
   │           ▼                                          │      │  if return-framebuffer mode)         │
   │  THREE.WebGLRenderer({ context: proxiedGL })         │      │                                       │
   │           │                                          │      │           ▲                           │
   │           ▼ (.drawElements, .bindBuffer, …)          │      │           │ (replay)                  │
   │  Proxy(gl)  ──► local SHADOW WebGL2 context          │      │  ReplayEngine                         │
   │             │   (off-DOM canvas; sender-side state   │      │   - handle table (netglID → real)    │
   │             │    queries answered here; creation     │      │   - dispatch by opcode               │
   │             │    calls return real WebGLBuffer/Tex   │      │           ▲                           │
   │             │    handles three holds onto)           │      │           │                           │
   │             ▼                                        │      │  decode(NetGLMessage)                 │
   │  Recorder                                            │      │           ▲                           │
   │   - intern handles (real → netglID)                  │      │           │                           │
   │   - serialize call as NetGLMessage                   │      │           │                           │
   │           │                                          │      │           │                           │
   │           ▼                                          │      │           │                           │
   │  PortalTransport.post(msg, transferables) ───────────┼─────►│  PortalTransport.onMessage            │
   │                                                      │      │                                       │
   │           ◄─── frame:complete + ImageBitmap ◄────────┼──────│  readPixels → ImageBitmap            │
   │                                                      │      │                                       │
   └─────────────────────────────────────────────────────┘      └──────────────────────────────────────┘
```

Three components:

1. **Proxied GL** — a `Proxy<WebGL2RenderingContext>` the sender passes to
   `new THREE.WebGLRenderer({ context: proxiedGL })`. Every method
   access goes through a handler that (a) forwards to the local shadow
   context for its return value and side effects, (b) interns any
   returned resource handles, (c) serializes the call into a
   `NetGLMessage`, and (d) hands the recorded byte stream to the
   transport.

2. **Shadow context** — a real `WebGL2RenderingContext` on the sender
   side, created against an off-DOM `OffscreenCanvas`. Three's
   internals do things the recorder can't fake: compile shaders and
   check the result, link programs, query uniform locations, look up
   active uniforms / attributes, query capabilities, check
   `getError()`. The shadow context answers all of these
   synchronously. Its framebuffer is never displayed; pixels are not
   read from it.

3. **Replay engine** — on the receiver side, a small dispatcher that
   pulls `NetGLMessage`s off the transport, resolves handle IDs to
   real receiver-side `WebGL*` objects, and calls the matching method
   on its real GL context.

## The Proxy

```ts
type ProxyState = {
  gl: WebGL2RenderingContext           // shadow context
  transport: PortalTransport
  handleTable: Map<WeakRef<object>, number>    // resource → netglID
  nextHandleId: number
  frameBuffer: NetGLMessage[]          // batched per frame
}

const makeProxiedGL = (
  shadow: WebGL2RenderingContext,
  transport: PortalTransport
): WebGL2RenderingContext => new Proxy(shadow, {
  get(target, prop, receiver) {
    const original = Reflect.get(target, prop, receiver)
    if (typeof original !== 'function') return original    // constants
    return (...args: unknown[]) => {
      const result = original.apply(target, args)
      record(prop as string, args, result)
      return result
    }
  }
})
```

`record(name, args, result)` is where the wire shape is decided:

- **Creation calls** (`createBuffer`, `createTexture`, `createProgram`,
  `createShader`, `createFramebuffer`, `createRenderbuffer`,
  `createVertexArray`, `createSampler`, `createTransformFeedback`,
  `createQuery`): the shadow returns a real `WebGL*` object. Intern
  it: assign a fresh `netglID`, store in `handleTable`. Ship
  `{ op: 'createBuffer', id: netglID }` to the receiver. Three holds
  onto the shadow's object; we never expose the ID to three.

- **Delete calls** (`deleteBuffer` and siblings): look up `netglID`
  from the arg, ship `{ op: 'deleteBuffer', id }`, also call the real
  shadow delete so the sender's GPU memory is reclaimed.

- **Reference calls** (`bindBuffer`, `bindTexture`, `useProgram`,
  `bindVertexArray`, `framebufferTexture2D`, etc.): each `WebGL*`
  argument is replaced by its `netglID` from the handle table. Ship
  `{ op: 'bindBuffer', target, buffer: netglID }`.

- **Data calls** (`bufferData`, `bufferSubData`, `texImage2D`,
  `texSubImage2D`, `compressedTexImage2D`, etc.): the data payload is
  either a typed array, an `ImageBitmap`, an `HTMLImageElement`, or
  similar. For ArrayBufferView, ship the underlying buffer as a
  Transferable. For `ImageBitmap`, ship as Transferable (postMessage
  supports it). For `HTMLImageElement` / `HTMLCanvasElement` /
  `HTMLVideoElement`, the sender has to readback the pixels into an
  ArrayBuffer first (or convert to ImageBitmap) — slow path, document.

- **State queries** (`getParameter`, `getError`, `getShaderParameter`,
  `getProgramParameter`, `getProgramInfoLog`, `getShaderInfoLog`,
  `getUniformLocation`, `getAttribLocation`, `getActiveUniform`,
  `getActiveAttrib`, `getExtension`, `getSupportedExtensions`): the
  shadow answers from its own context. These calls are NOT recorded
  to the wire — the receiver doesn't need them; three only does. The
  exception is `getUniformLocation`, whose return value is referenced
  later by `uniform*` calls — we intern the location and ship the
  underlying `getUniformLocation(program, name)` to the receiver so
  it can build a matching location table.

  Capability mismatch is the open question here (see below).

- **Render calls** (`drawArrays`, `drawElements`, `drawArraysInstanced`,
  `drawElementsInstanced`, `clear`, `clearColor`, `clearDepth`,
  `viewport`, `scissor`, `enable`, `disable`, `blendFunc`,
  `depthFunc`, `stencilFunc`, `stencilOp`, `colorMask`, `depthMask`,
  `stencilMask`, `cullFace`, `frontFace`, `polygonOffset`): pure
  state and draw, no return values to intern. Just ship.

- **Uniform set** (`uniform1f`, `uniform2fv`, `uniformMatrix4fv`,
  `uniformBlockBinding`, …): location argument is mapped through the
  handle table, value is shipped inline (small) or as a Transferable
  (large arrays).

- **Readback** (`readPixels`, `getBufferSubData`): the sender doesn't
  have the rendered result — the receiver does. Three's main render
  path doesn't call these. For the spike, throw or return zeros and
  document. v1 may need a synchronous round-trip (worker-thread
  receiver) or an explicit async API.

## Frame sync

NetGLRenderer extends `THREE.WebGLRenderer.render()`:

```ts
class NetGLRenderer extends THREE.WebGLRenderer {
  render(scene, camera) {
    transport.post({ op: 'frameBegin', viewport: this.getViewport() })
    super.render(scene, camera)                  // emits GL calls through proxy
    transport.post({ op: 'frameEnd', readback: true })
    // receiver replays, reads pixels, ships ImageBitmap back as 'frame:result'
  }
}
```

The recorder buffers `NetGLMessage`s across the super.render() call and
flushes the buffer on `frameEnd`. Batching matters for postMessage
overhead — one `transport.post([msg, msg, …])` is way cheaper than 5000
individual `post`s.

`readback: true` triggers `gl.readPixels` on the receiver after replay;
the receiver posts back `{ op: 'frame:result', color: ImageBitmap, …}`.
For B-side composition mode (v1), `readback: false` — the receiver
keeps the framebuffer for its own compositor to consume.

## Handle table mechanics

The sender holds `Map<WebGL_Object, netglID>`. The receiver holds
`Map<netglID, WebGL_Object>`. Both are populated lazily as creation
calls arrive — `createBuffer` mints an ID on the sender, `createBuffer`
arrives at the receiver and the receiver calls its own `gl.createBuffer()`
to mint a corresponding object.

`WeakRef` on the sender side lets the table not pin GC of shadow
resources. Three deletes are explicit (`renderer.dispose()` walks
geometries / materials / textures), so we'll get deterministic
`gl.delete*()` calls — `WeakRef` is belt-and-braces.

Numeric IDs are fine for postMessage; `Transferable` semantics don't
apply to plain numbers. For WebRTC / WebTransport later, the same IDs
serialize trivially into a binary format.

## Capability negotiation

Three queries the GL context during `WebGLRenderer` construction:
`getExtension`, `getParameter(MAX_TEXTURE_SIZE)`, etc. These shape
its behaviour for the lifetime of the renderer (texture format
choices, draw-instanced fallback, etc.). If the sender's shadow
context advertises capabilities the receiver doesn't have, three will
emit calls the receiver can't honour.

Handshake step at NetGLRenderer init:
1. Receiver enumerates its capabilities (`getSupportedExtensions`,
   key `getParameter` values).
2. Receiver posts `{ op: 'caps', caps: {…} }`.
3. Sender wraps its shadow context's responses to clamp to the
   intersection of sender ∩ receiver capabilities.

This is fiddly. The capability surface is ~40 numeric params + ~30
extensions. For the spike: skip — assume both sides are similar (same
browser, same machine via iframe). Track as a v1 open question.

## Wire shape (rough)

```ts
type NetGLMessage =
  | { op: 'createBuffer'; id: number }
  | { op: 'deleteBuffer'; id: number }
  | { op: 'bindBuffer'; target: number; buffer: number | null }
  | { op: 'bufferData'; target: number; data: ArrayBuffer; usage: number }
  // … one entry per intercepted method
  | { op: 'drawElements'; mode: number; count: number; type: number; offset: number }
  | { op: 'frameBegin'; viewport: [number, number, number, number] }
  | { op: 'frameEnd'; readback: boolean }
```

A batch is `NetGLMessage[]` posted in one `transport.post()` call with
the union of ArrayBuffer / ImageBitmap transferables.

Encoding is JSON for the spike (postMessage handles structured clone).
A future binary encoding (CBOR or custom) is a perf win, not a
correctness change.

## Where this lives

`packages/portal-netgl/`. Current state after the v0 spike:

```
packages/portal-netgl/
  src/
    proxy.ts                 // makeNetGLProxy({ shadow, receiver })
    index.ts                 // public exports
    spike.test.ts            // clear + manual triangle through the proxy
    three-spike.test.ts      // THREE.WebGLRenderer cube vs control,
                             //   pixel parity assertion
```

The v0 spike does in-process dispatch — the proxy holds direct references
to both contexts. The next milestone (`replay.ts` + `messages.ts`) inserts a
serialise-then-deserialise step between them and proves the same parity
across a `PortalTransport`. After that, `renderer.ts` exposes a
`NetGLRenderer` that wires the proxy into a stock `THREE.WebGLRenderer`
construction so callers can swap renderers without touching their scene
setup.

## Spike scope

Single test file. In-process (no iframe / worker), no transport — the
"transport" is direct function calls so we can iterate without
postMessage in the way.

1. Create a real WebGL2 context (against an off-DOM `OffscreenCanvas`)
   — this is the shadow.
2. Create a second WebGL2 context (separate `OffscreenCanvas`) — this
   is the receiver.
3. Build a minimal three scene: one `BoxGeometry`, one
   `MeshBasicMaterial`, one `Mesh`, one `PerspectiveCamera`. Solid
   colour, no textures, no lights (basic material doesn't need them).
4. Construct `NetGLRenderer({ shadow, receiver })` — the renderer
   takes both contexts directly, no transport.
5. Render one frame.
6. Read pixels from the receiver.
7. As a control, render the same scene with a regular
   `WebGLRenderer({ canvas: receiver.canvas })` directly and read
   pixels.
8. Assert byte-equality (or near-equality with a tolerance — driver
   variance can show up in fragment edges).

Success criterion: the pixels match. That proves the recorder /
replayer covers enough of the WebGL2 surface for a basic three scene.

Once that's green, the next milestone wires the recorder to a
`windowTransport`, the replayer to the iframe side, and proves the
same pixel parity across the postMessage boundary. That milestone
also adds the texture path (a textured cube) to force `texImage2D` /
`ImageBitmap` Transferable through the system.

## Open questions to defer

- **Capability mismatch** — see above.
- **Async readback** — `gl.readPixels` from the receiver is the only
  path; sender-side `readPixels` doesn't work without a round-trip.
- **Extensions** — three opportunistically uses `OES_*`, `WEBGL_*`,
  `EXT_*`. Each adds method names the recorder needs to know about.
  Catalogue once the spike is green.
- **Compute / TF / queries** — out of scope.
- **Multi-frame pipelining** — once the spike works, frames 1-at-a-time
  is the v0 mode. Triple-buffering the recorder/replayer is a perf
  pass.
- **Resource lifetime across renderer re-creation** — when three's
  `dispose()` runs, we ship deletes. Untested.

## Verification

- The spike test (`replay.spike.test.ts`) is the v0 acceptance check.
- A separate test renders against the proxied GL only (no replay) and
  asserts that the proxied GL's pixel output matches the unproxied
  shadow's — proves the Proxy is transparent.
- A third test exercises resource reuse across frames (render two
  frames of the same scene; second frame should not re-upload
  geometry — recorder should ship only the changed uniforms / draw
  call).
