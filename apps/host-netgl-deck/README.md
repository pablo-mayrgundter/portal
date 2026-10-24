# host-netgl-deck

A deck.gl `GlobeView` host with a NetGL guest in a **cross-origin iframe**:
a three.js scene of dots at known positions and an orbit, drawn into
deck's WebGL2 context after deck's layers, in deck's clip space, and
depth-tested against deck's globe. It's the shape netmap (deck.gl) hosting
celestiary's orbits (three.js, another origin) takes.

```sh
npm run dev -w @portal/host-netgl-deck   # host on :5190, guest on :5191
```

Open `http://localhost:5190/`. Two ports are two origins (same site). For a
cross-*site* guest, which Chromium runs in a separate process as it would
celestiary.org inside github.io, open
`http://localhost:5190/?guest=http://127.0.0.1:5191/guest.html`.

On GitHub Pages there is one origin, so the build loads `guest.html` into
a sandboxed iframe (`sandbox="allow-scripts"`): the guest's origin is then
opaque (`'null'`), which is cross-origin to the host all the same.

| Param | |
|---|---|
| `?guest=<url>` | the guest page (default: port 5191 in dev, `./guest.html` sandboxed in a build) |
| `?sandbox=1` / `0` | force the opaque-origin sandbox on or off |
| `?t=<ISO date>` | pin the host's clock (default: now, running; the white dot moves along the orbit) |
| `#lon=&lat=&zoom=&pitch=&bearing=` | the camera |

What to look for: each coloured dot centred in its white ring (deck's own
`ScatterplotLayer` at the same longitude, latitude and altitude), the
orbit's far half hidden behind the globe, and nothing drawn for Tokyo and
Sydney on the far side.

How it's wired:

- **Host** (`src/host.ts`): `attachNetGLDeckLayer(deck, { device,
  transport: iframeTransport(iframe, { origin }) })`. The adapter drains the
  guest's frame in `onAfterRender` between luma's `pushState` and
  `popState`, posts a `layer:view` (ECEF metres, deck's projection) after
  each frame whose view changed, and redraws deck when a guest frame
  arrives.
- **Guest** (`src/guest.ts`): `makeNetGLThreeOverlayGuest({ transport:
  parentTransport({ hostOrigins }) })`. It renders one frame per view, with
  no requestAnimationFrame of its own, and talks only to the host origins
  in its list.
