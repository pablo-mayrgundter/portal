# `host-iframe-demo`

Demo of an iframe-served portal: the destination world is rendered by a
separate iframe page, shipped back as color + packed-RGBA depth bitmaps over
`postMessage`, and composited by the host with the same per-pixel halfspace
correctness the local-portal demo provides.

The iframe is a *render-from-this-pose* service. It knows nothing about portal
geometry. The host owns everything — pose mirroring, the stencil mask, the
oblique-equivalent depth clip — and the iframe just renders what it's asked to.

## Run

From the repo root:

```bash
npm run dev:iframe
```

Vite serves both `index.html` (the host) and `target.html` (the iframe target)
from the same dev server. WASD + drag mouse to move; the portal in the host
scene shows the iframe's scene composited through it.

## The two halves at boot

**Iframe target** (`src/target.ts` → `target.html`):

1. Builds its own `THREE.Scene` (red room with floating spheres).
2. Declares a `PortalAnchor` saying where the destination portal lives in
   *this scene's* coordinate frame.
3. Calls `makeIframeTarget({scene, anchor, tick}).start()` from
   `@portal/portal-iframe`. That:
   - Creates an `OffscreenCanvas` + `WebGLRenderer`. The iframe DOM is invisible
     (CSS-positioned offscreen so it stays active without rendering anywhere).
   - Posts `portal:ready` to `parent` with `{anchor, background, viewport}`.
   - Listens for `portal:setPose` and runs a `requestAnimationFrame` loop that
     drains the latest pending pose and renders it.

**Host** (`src/main.ts` → `index.html`):

1. Builds its own `THREE.Scene` (blue cubes), adds a portal anchor mesh.
2. Looks up the `<iframe id="target-iframe">` element.
3. Calls `makeIframeEndpoint({iframe})`. That:
   - Listens on `window` for `message` events whose `source ===
     iframe.contentWindow`.
   - Catches `portal:ready` (stores anchor + background) and `portal:frame`
     (replaces pending color/depth bitmaps + matrices).
   - Returns an object satisfying `PortalEndpoint` plus `requestFrame()` and
     `renderAsDestination()`.
4. Starts its own `requestAnimationFrame` loop.

## Per-frame data flow

```
HOST (main.ts)                                    IFRAME (target.ts via makeIframeTarget)
─────────────────────────────────────────────     ──────────────────────────────────────
controls.update(dt) → hostCamera moves
                                                  (loop running independently)

if iframeEndpoint.isReady():
  hostPose  = (camera position + forward + up)
  predicted = hostPose + (hostPose - prevHostPose) * 1
              (extrapolate one frame ahead so iframe
               renders for the time its response will
               arrive — kills lag-induced parallax error
               during fast rotation; default 1 frame,
               toggleable with ?predict=N)
  coupled   = couplePoseAcrossPortal(
                predicted,
                {source: hostAnchor,
                 target: iframeAnchor})

  iframe.requestFrame({
    pose:       coupled,
    projection: hostCamera.projectionMatrix,    ──▶  receive 'portal:setPose'
    viewport:   {w, h},                              apply pose to its camera
    time                                             apply projection matrix
  })                                                 apply oblique near-plane clip
                                                       aligned with iframe portal anchor
                                                       (so camera-side geometry is
                                                       culled at render time, not
                                                       just by the host's depth-clip
                                                       — see "why both clips" below)
                                                     render scene to OffscreenCanvas
                                                     transferToImageBitmap → COLOR
                                                     scene.overrideMaterial = depthMaterial
                                                     render scene again
                                                     transferToImageBitmap → DEPTH
                                                     scene.overrideMaterial = null

                                                ◀──  parent.postMessage({
                                                       type: 'portal:frame',
                                                       color, depth,           ← Transferable
                                                       projection, view
                                                     }, '*', [color, depth])

  ── while iframe was busy, host kept going ──

renderer.clear(color + depth + stencil)
hostEndpoint.renderAsSource(renderer, hostCamera)
  └─ renders blue-cube room to canvas

stencilMask.update(hostAnchor, hostCamera,
                   iframe.getBackground())
renderer.render(stencilMask.scene,
               stencilMask.camera)
  └─ shader: per-pixel ray-vs-door test
     - discard outside door rectangle
     - write stencil = 1
     - write color = iframe bg
     - gl_FragDepth = portal-plane depth
       (so source-world geometry IN FRONT of
        the plane occludes via depth test)

renderer.clearDepth()
                                                  meanwhile: 'portal:frame' arrives
                                                  → message handler stashes
                                                    pendingColor / pendingDepth /
                                                    lastViewProjection

iframe.renderAsDestination(renderer)
  ├─ if pending bitmaps:
  │     colorTexture.image = pendingColor
  │     colorTexture.needsUpdate = true
  │     depthTexture.image = pendingDepth
  │     depthTexture.needsUpdate = true
  │     (GPU upload happens lazily on next render)
  ├─ update compositor uniforms:
  │     iframeViewProjectionInverse,
  │     destinationPortalPos,
  │     destinationKeptNormal
  └─ render fullscreen quad with shader:
       - stencilFunc = Equal, ref = 1
         (so this only writes pixels where the
          stencil mask wrote 1)
       - vUv = (uv.x, 1 - uv.y)
         (Y-flip; see "why the Y-flip" below)
       - sample iframeColor at vUv (sRGB → linear)
       - sample iframeDepth at vUv, unpack RGBA → [0,1]
       - reconstruct iframe-world position:
           ndc = vec4(vUv*2-1, depth*2-1, 1)
           p   = (iframeIVP × ndc) / w
       - signed dist from destination plane:
           d = dot(p - destPos, keptNormal)
       - DISCARD if d < 0 (not past plane)
       - else output color (linearToSRGB)
```

## What this means: a pixel ends up showing iframe content iff…

1. **The host camera ray passes through the door rectangle** (stencil mask
   wrote 1, so the compositor's `stencilFunc=Equal,ref=1` passes).
2. **No source-world geometry is in front of the portal plane along that ray**
   (the mask shader's `gl_FragDepth = portal-plane depth` was depth-tested
   against the source render; if a source object is closer, the stencil bit was
   never written).
3. **The iframe's reconstructed world position for that pixel is past the
   destination plane** (compositor's depth-clip in iframe coords) — and the
   iframe's own oblique near-plane clip already culled most camera-side
   geometry at rasterization time, so what arrives over the wire is already
   restricted to past-portal geometry.

Same correctness invariant as the local case. Both use an oblique near-plane
clip aligned with the destination portal — local applies it to the directly-
rendering portal camera, iframe applies it to its target-side camera. The host
adds a per-pixel depth-clip in the compositor as a safety net for the iframe
path (handles primitives that straddle the portal plane and absorbs any
oblique-clip bias).

## Why each design choice

**Why not just sample the iframe's canvas directly?** `OffscreenCanvas` can't be
read across realms. `transferToImageBitmap` flips the canvas's backing buffer
to an `ImageBitmap`, which IS transferable across `postMessage` with no copy.

**Why depth-pack into RGBA?** WebGL2 supports depth textures, but reading them
back as something the host can sample requires either an extra `gl.readPixels`
(slow) or readback through framebuffer-bound depth attachments (clunky).
Encoding depth into RGBA in a fragment shader and `transferToImageBitmap`-ing
it uses the exact same fast path as color.

**Why both clips — iframe-side oblique AND host-side depth-clip?** The iframe's
color+depth pass captures only the front-most hit per pixel. If a camera-side
sphere occludes a far-side sphere, the iframe records *the camera-side sphere's*
color and depth; the host's depth-clip then correctly discards that pixel, but
the far sphere was never rendered, so the door pixel falls through to bg fill.
The iframe-side oblique clip culls camera-side geometry at the rasterizer (NDC
clip), so the front-most hit *is* the far-side geometry. The host's depth-clip
stays in as a per-pixel safety net for primitives that straddle the plane and
for any iframe-side bias slop.

**Why the Y-flip in the compositor?** `transferToImageBitmap` produces an
`ImageBitmap`, and browsers silently ignore `UNPACK_FLIP_Y_WEBGL` when uploading
those (`createImageBitmap` accepts `imageOrientation: 'flipY'`, but
`transferToImageBitmap` takes no options). Three.js's `texture.flipY = true` is
documented as a no-op for `ImageBitmap` for the same reason. So the iframe's
texture is upside-down relative to OpenGL convention; the compositor inverts
`vUv.y` to compensate. Symptom when broken: iframe content appears to track
gaze the wrong way during pitch — sphere ring rises when you look up.

**Why predict the host pose?** The iframe takes ~1 RAF to respond, so the
composite would otherwise apply iframe content rendered for the *previous*
frame's pose against the *current* frame's stencil. Visible during fast
rotation as iframe content sliding within the door. Sending a one-frame
extrapolation cancels the lag at steady angular velocities.

**Why two render targets and a blit pass?** The depth pass packs
`gl_FragCoord.z` into RGBA bytes. MSAA averages those *bytes* across coverage
samples at silhouettes, which is not a homomorphism on the depth packing —
decoded depth at every antialiased edge would sit near the far plane and
defeat the host's depth-clip. So the iframe renders color into a `samples=4`
`WebGLRenderTarget` (auto-resolved on sample) and depth into a separate non-
MSAA RT with `NearestFilter`, then blits each to the canvas via a fullscreen
quad before `transferToImageBitmap`. Color gets MSAA, depth bytes survive
exactly. Cost: two extra fullscreen-quad blits per frame.

**Why is the iframe DOM hidden offscreen instead of `display: none`?**
`display: none` would prevent the iframe from running at all (some browsers
throttle hidden iframes aggressively). Offscreen positioning keeps it active.

## Latency model

One round-trip per frame (host → iframe → host). Host doesn't await — it
composites whatever pending bitmap arrived since last frame. Without prediction
this is ~1 frame of rotation/translation lag visible during fast motion; with
prediction enabled (default 1 frame), steady-velocity motion has effectively
zero parallax error from lag (acceleration still produces residual error).

## Diagnostic flags

All accepted as URL query params on the host page. All gated; no perf cost when
omitted.

| Flag | Effect |
| --- | --- |
| `?debug=noclip` | Skip the host's per-pixel depth-clip discard. Useful to confirm whether the depth-clip is the cause of an artifact. |
| `?debug=depth` | Visualize unpacked depth as grayscale. Bands or noise indicate a broken pack/unpack round-trip. |
| `?debug=worldpos` | Visualize the reconstructed iframe-world position as `fract(p * 0.25 + 0.5)` RGB. Smooth gradients across geometry mean reconstruction is working. |
| `?debug=clip` | Per-pixel depth-clip decision: green = would keep, red = would discard, brightness ∝ \|distFromPlane\|. |
| `?compose=raw` | Bypass stencil + depth-clip entirely, blit the iframe's full framebuffer over the host viewport. Use to compare directly against `dev:three`. |
| `?freeze=1` | Capture the coupled pose once on first ready, then keep sending the same pose. Lets you walk around while the iframe content is held fixed. |
| `?predict=N` | Number of frames to extrapolate the host pose ahead. Default `1`. `?predict=0` disables. Higher values may help if the iframe runs slower than host. |
| `?scene=grid` | Replace the iframe's swarm scene with a static cube lattice (no animation, predictable geometry) for cleaner alignment debugging. |
| `?log=1` | 1 Hz console logging on both halves: pose round-trip, viewport, applied camera basis, view matrix. |

## Files of interest

- `src/main.ts` — host frame loop.
- `src/target.ts` — iframe scene + anchor declaration.
- `index.html` / `target.html` — two HTML entries (vite multi-page).
- `../../packages/portal-iframe/src/index.ts` — both `makeIframeTarget`
  (iframe side) and `makeIframeEndpoint` + compositor shader (host side).
- `../../packages/portal-core/src/index.ts` — wire-protocol types
  (`PortalReadyMessage`, `PortalSetPoseMessage`, `PortalFrameMessage`,
  `Mat4`, `Viewport`); the pure pose math (`couplePoseAcrossPortal`).
