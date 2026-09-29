# Deploying the snapshot and share proxies

The two Node services behind the demos' social previews. They moved here
from the top-level README.

## Snapshot proxy

The proxy ships with a Dockerfile (`apps/snapshot-proxy/Dockerfile`) and a Fly.io config (`fly.snapshot-proxy.toml` at the repo root). The container is the deployable unit; demos consume it as a static URL via the `og:image` meta tags.

Local container test:

```bash
docker build -f apps/snapshot-proxy/Dockerfile -t portal-snapshot-proxy .
docker run --rm -p 3030:8080 portal-snapshot-proxy
curl http://localhost:3030/render/pair?w=1200\&h=630 -o /tmp/og.png
```

Fly.io deploy (one-time setup, then deploys):

```bash
fly launch --config fly.snapshot-proxy.toml --no-deploy   # picks app name + region; rewrites the `app =` line
fly deploy --config fly.snapshot-proxy.toml
```

After deploy, point each demo's `<meta name="portal:snapshot-proxy">` (in the index.html files) at the Fly URL — both the static `og:image` content and the meta config tag the JS reads.

The image is heavier than a typical Node image (~600 MB) because `gl@9.x` is a node-gyp native module that depends on Mesa + ANGLE shared libs at runtime. The Dockerfile installs:

- build toolchain (`build-essential`, `python3`, `pkg-config`) for the install-time native build
- `libxi-dev`, `libglu1-mesa-dev`, `libglew-dev` (the canonical headless-gl deps)
- `libwayland-client0`, `libxcb*`, `libxshmfence1` (ANGLE dlopens these on first gl context creation; missing them shows up as a segfault, not at install time)
- `xvfb` + a small entrypoint that backgrounds Xvfb on `:99` (ANGLE's GLES backend opens an X display by default; in a container with no real display you get *"Could not open the default X display"*)

Container cold-start adds ~650 ms over bare-metal cold-start; warm requests are byte-for-byte identical to bare-metal. Idle Fly machines auto-stop and add ~1–2 s to the next request that wakes them. Set `auto_stop_machines = "off"` in `fly.snapshot-proxy.toml` if a cold-start bump pushes a crawler past its timeout budget.

The proxy is **not** an open URL relay — input params are `scene` (registry-gated), `pose` (six floats), `w/h/depth` (clamped ints). No way to coerce it into reaching internal services, so SSRF risk is zero. Resource-abuse defenses (rate limit, edge cache, signed URLs) aren't wired in yet — add them if the proxy starts taking real public traffic.

## Share proxy

`apps/share-proxy` is a tiny Express service (~150 lines) that sits between social-media crawlers and the static demo hosting. Its only job is to inject the request URL's `?pose=` into the `og:image` / `twitter:image` meta tags before serving the HTML — that's how a permalink shared on Twitter / Facebook / Slack ends up with a preview that matches the actual view, not the page's default-pose snapshot.

Why it exists: GitHub Pages is pure static, so meta tags are baked at build time. The demos' JS shim updates them at runtime, but crawlers don't run JS. The share proxy is the SSR step the demo doesn't otherwise have.

```bash
docker build -f apps/share-proxy/Dockerfile -t portal-share .
docker run --rm -p 3041:8080 -e UPSTREAM_BASE=https://pablo-mayrgundter.github.io/portal portal-share
curl 'http://localhost:3041/?pose=1,2,3,0,0,-1' | grep og:image   # rewritten
```

```bash
fly launch --config fly.portal-share.toml --org bldrs --no-deploy
fly deploy --config fly.portal-share.toml
```

It's a full reverse proxy: requests to `/portal/assets/...` and other static paths are streamed through to the upstream unchanged. Only HTML responses with a `?pose=` query are buffered + cheerio-rewritten. ~100 ms cold, ~30 ms warm, 113 MB resident.

`UPSTREAM_BASE` env var lets one image serve any GH-Pages-style demo. Point it at celestiary's deploy via `fly secrets set UPSTREAM_BASE=https://bldrs.ai/celestiary` to reuse the same proxy.

Demos opt in by setting `VITE_SHARE_BASE` in their `.env` (e.g. `VITE_SHARE_BASE=https://portal-share.fly.dev/`). When set, press-`P` writes a share-proxy URL to the clipboard instead of the page's own URL. Local dev keeps copying `localhost:5173` URLs because the env var stays unset.
