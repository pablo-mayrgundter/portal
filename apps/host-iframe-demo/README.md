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
  hostPose = (camera position + forward + up)
  coupled  = couplePoseAcrossPortal(
              hostPose,
              {source: hostAnchor,
               target: iframeAnchor})

  iframe.requestFrame({
    pose:       coupled,
    projection: hostCamera.projectionMatrix,    ──▶  receive 'portal:setPose'
    viewport:   {w, h},                              apply pose to its camera
    time                                             apply projection matrix
  })                                                 render scene to OffscreenCanvas
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
   destination plane** (compositor's depth-clip in iframe coords).

That's exactly the same correctness invariant as the local case — stencil
bounds *which screen pixels*, oblique clip bounds *which destination geometry*.
The local case does the second test in a projection-matrix mod (oblique near
plane); the iframe case does it per-pixel in the compositor using the depth
shipped from iframe.

## Why each design choice

**Why not just sample the iframe's canvas directly?** `OffscreenCanvas` can't be
read across realms. `transferToImageBitmap` flips the canvas's backing buffer
to an `ImageBitmap`, which IS transferable across `postMessage` with no copy.

**Why depth-pack into RGBA?** WebGL2 supports depth textures, but reading them
back as something the host can sample requires either an extra `gl.readPixels`
(slow) or readback through framebuffer-bound depth attachments (clunky).
Encoding depth into RGBA in a fragment shader and `transferToImageBitmap`-ing
it uses the exact same fast path as color.

**Why does the host clip, not the iframe?** Keeps the iframe protocol minimal
— pose in, frame out. The iframe doesn't need to know what plane it's being
clipped against. Cost: iframe shades some pixels the host immediately discards.
Acceptable for the demo; could add an ROI hint later if it becomes painful.

**Why is the iframe DOM hidden offscreen instead of `display: none`?**
`display: none` would prevent the iframe from running at all (some browsers
throttle hidden iframes aggressively). Offscreen positioning keeps it active.

## Latency model

One round-trip per frame (host → iframe → host). Host doesn't await — it
composites whatever pending bitmap arrived since last frame. Effective latency
≈ one animation frame from input to portal view update.

## Files of interest

- `src/main.ts` — host frame loop.
- `src/target.ts` — iframe scene + anchor declaration.
- `index.html` / `target.html` — two HTML entries (vite multi-page).
- `../../packages/portal-iframe/src/index.ts` — both `makeIframeTarget`
  (iframe side) and `makeIframeEndpoint` + compositor shader (host side).
- `../../packages/portal-core/src/index.ts` — wire-protocol types
  (`PortalReadyMessage`, `PortalSetPoseMessage`, `PortalFrameMessage`,
  `Mat4`, `Viewport`); the pure pose math (`couplePoseAcrossPortal`).
