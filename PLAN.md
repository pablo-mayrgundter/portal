# Plan / state save (paused 2026-05-01)

Living scratchpad capturing where we are, what's in flight, and where we
think this is heading. Updated when picking up the work to keep future
context loadable from one place.

## Status today (live + working)

- **portal-snapshot-proxy** on Fly (`https://portal-snapshot-proxy.fly.dev`)
  - serves `/render/pair?pose=…&w=…&h=…` and `/render/droste?depth=…`
  - cold-start ~22 s when machine is fully scaled to zero (Fly wake +
    jsdom init + first gl context); warm 0.3–3 s
  - **No `Cache-Control` set yet** — every crawler view re-renders
- **portal-share** on Fly (`https://portal-share.fly.dev`)
  - reverse-proxies `https://pablo-mayrgundter.github.io/portal/`
  - rewrites `og:image` / `twitter:image` content URLs to include
    request's `?pose=` (cheerio)
  - streams non-HTML through unchanged so static assets work
  - 100 ms cold, 30 ms warm, 113 MB resident
- **Demo on GH Pages** (`https://pablo-mayrgundter.github.io/portal/`)
  - host-three demo with `?pose=` permalink + press-`P` copy gesture
  - press-`P` writes a `portal-share.fly.dev` URL to the clipboard
    (via `VITE_SHARE_BASE` in `apps/host-three/.env`)
- **Verified**: Twitter shows the static (default-pose) preview;
  Facebook shows pose-specific preview after the share-proxy is in
  the path

## Recently merged

**#14: Snapshot-proxy cold-start mitigations** (merged 2026-05-01)

Two changes:
- `fly.snapshot-proxy.toml`: `min_machines_running` 0 → 1
  (~$5/mo for one always-warm shared-cpu-1x; eliminates the worst leg
  of cold start)
- `apps/snapshot-proxy/src/main.ts`: `Cache-Control: public,
  max-age=86400, immutable` on `/render` responses (lets edge caches
  absorb repeat fetches)

**Remaining post-merge step**: `fly deploy --config
fly.snapshot-proxy.toml` to push to Fly. Then bust FB's cached "no
preview" by pasting share URL into
<https://developers.facebook.com/tools/debug/> and clicking *Scrape
Again*.

## Strategic direction (decided, not yet built)

### Hosting ergonomics — the overall feeling

Two Fly apps + cross-config + cold-start tax + multiple repos in
imagination = lots of moving parts for a side project. Not yet decided
what specifically to consolidate. Candidate fixes if it gets worse:
- Collapse share-proxy + snapshot-proxy into one Fly app (one Dockerfile,
  one image, two route prefixes). Loses independent deploy cadence.
- Single config file or naming convention so the cross-references stay
  visible.

### Extraction targets

- **share-proxy → its own repo** (truly generic, only `UPSTREAM_BASE`
  env var needed to reuse). Almost certainly the right move; small,
  low-risk, unblocks bldrs reuse.
- **snapshot-proxy stays in portal** (scenes are portal-specific). The
  reusable framework piece (`portal-headless-three`) is already a
  package; can be published to npm later if needed.

### bldrs production path

Context discovered while planning:
- bldrs is the CAD-sharing app that pays for this work
- IFC/STEP loader is fast for the format but large models still take
  10 s – minutes to render → server-side rendering on demand is
  **not viable** for arbitrary models
- The client already has the rendered canvas; reuse those pixels

Architecture proposed (not yet built):

```
share URL → share-proxy → rewrites og:image → image-storage → uploaded PNG
                                                ↑
                                  client uploaded at "share" press
```

- Client captures `canvas.toBlob()` at share time → `POST /upload` →
  gets back an ID → embeds ID in share URL (`?img=ID`)
- Image-storage service indexes by ID, serves with aggressive
  `Cache-Control`
- share-proxy rewrites `og:image` to the storage URL based on `?img=`
  in the share URL (small additive change to its rewrite logic)
- Tradeoff: preview is *frozen at share time* — fine for "share my
  current view of this model"

Storage candidates (in order of likely fit):
1. **Cloudflare R2** with presigned uploads from client (no bandwidth
   through your service; free egress through CF; 10 GB free)
2. **Fly volume** colocated with share-proxy (simplest if image storage
   merges into share-proxy itself)
3. S3 + CloudFront (industry default, more expensive, more setup)

Security surface to spec when building:
- rate-limit per IP (`express-rate-limit`)
- max upload size (~2 MB)
- PNG magic-byte check
- optional auth token (HMAC against bldrs session) for prod

### Web Share API as a mobile UX layer

Optional addition on top, not a replacement:
- "Copy link" button → existing pattern, works everywhere via
  og:image rewriting
- "Share via system" button → `navigator.share({ files: [pngFile] })`
  on supporting platforms; bypasses the scraper roundtrip entirely
  on mobile X/FB apps

Snippet for testing was given in the conversation; works on mobile
Chrome/Safari and macOS Safari, broken on most desktop browsers.

### The deep observation

The web genuinely lacks an X11-style cross-app share protocol. og:image +
HTML scraping is a 2010-era hack that survives because it's the lowest
common denominator across X / FB / Slack / Discord / Bluesky / iMessage.
Web Intents (the closest serious attempt) was killed ~2013 because the
platforms with captive audiences had no incentive to be peer recipients
in a registry. Web Share API is the watered-down survivor.

Practical takeaway: the og:image + proxy pattern, ugly as it is, isn't
escapable. Owning the canonical share URL (e.g. `bldrs.ai/share/abc123`
instead of `bldrs.fly.dev/…`) is where you control the preview behavior
across all platforms uniformly.

## Open design questions before further work

1. **What specifically about hosting ergonomics is annoying?**
   Collapse two services? Simpler config story? Always-on cost?
2. **Does bldrs already have user-auth + storage infra to piggyback
   on?** Determines whether image storage is independent (R2 +
   presigned) or rides existing systems.
3. **URL hydration on click-through for bldrs** — does the share URL
   load the actual model + camera state in the bldrs viewer, or is the
   preview the entire experience?
4. **Image lifetime** — forever (simpler, more storage) or expiring
   (cleanup needed)?
5. **For the share-proxy extraction**: standalone repo + Fly deploy
   that bldrs DNS points at? Or published Docker image that bldrs runs
   as a sidecar?

## Concrete next steps (probable order)

1. **Deploy PR #14's changes.** `fly deploy --config
   fly.snapshot-proxy.toml`. Verify warm-machine behavior +
   Cache-Control header. *Scrape Again* on FB debugger to confirm
   pose-specific preview now sticks.
2. **Extract share-proxy to its own repo.** Standalone. Same
   Dockerfile, same Fly setup. Repo name TBD. Becomes the universal
   OG-rewriter that portal + celestiary + bldrs all use.
3. **For bldrs**: design image-storage service. Pick storage backend
   based on Q2 above. Build upload endpoint + image-by-id endpoint.
   Wire share-proxy's rewrite to also handle `?img=` in addition to
   `?pose=`.
4. **bldrs client integration**: `Share` button → canvas capture →
   upload → share URL with `?img=ID&state=…` → clipboard.
5. **Optional UX**: Web Share API mobile button on bldrs (and
   maybe back-port to portal demos).

## Open repo state at pause

- `main`: includes PR #11, #12, #13, #14 (snapshot-proxy + scenes +
  share-proxy + demos + cold-start mitigations all live)
- No active branches — paused on a clean main
