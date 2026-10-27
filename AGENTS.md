# Project conventions for AI assistants

Working norms for AI agents (Claude Code, Codex, etc.) contributing to
this repository. `CLAUDE.md` is a symlink to this file. Read it before
starting work, and keep it current when you learn something the next
session would otherwise rediscover.

## Where to look

Read the doc for the area you're touching before reading code: the design
docs record why things are the way they are, including approaches that
were tried and dropped.

| Working on | Read first |
|---|---|
| What the project is, status, demos | [README.md](./README.md) |
| Dev setup, tests, PR expectations | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| NetGL API (recorder, replay, links, receiver, Cesium shim) | [packages/portal-netgl/README.md](./packages/portal-netgl/README.md) |
| NetGL architecture | [DESIGN.md](./packages/portal-netgl/DESIGN.md): [state checkpoint](./packages/portal-netgl/DESIGN.md#state-checkpoint), [screen policy](./packages/portal-netgl/DESIGN.md#screen-policy), [composition modes](./packages/portal-netgl/DESIGN.md#composition-modes), [door-fit viewport remap](./packages/portal-netgl/DESIGN.md#door-fit-viewport-remap) |
| Integrating a guest engine or host app | DESIGN.md: [Cesium findings](./packages/portal-netgl/DESIGN.md#findings-from-cesium-integration), [celestiary findings](./packages/portal-netgl/DESIGN.md#findings-from-celestiary-integration), [lessons from celestiary's Cesium layers](./packages/portal-netgl/DESIGN.md#lessons-from-celestiarys-cesium-layers) |
| What's unsolved, what to build next | DESIGN.md [open problems](./packages/portal-netgl/DESIGN.md#open-problems-the-next-pr); README [roadmap](./README.md#roadmap) |
| The host/guest shim library (design) | [docs/portal-layers.md](./docs/portal-layers.md), and its [gotchas that stay in the app](./docs/portal-layers.md#gotchas-that-stay-in-the-app) |
| Where code lives | DESIGN.md [layout](./packages/portal-netgl/DESIGN.md#layout--where-things-live) |
| Proposed changes to the protocol and contracts (RFCs, their status and open questions) | [docs/rfcs/](./docs/rfcs/README.md) |
| What the RFCs ask, read together: the maintainers' responses, the tracks of work and the versions each claims | [docs/rfcs/responses/](./docs/rfcs/responses/README.md) |
| Original NetGL design and spikes | [docs/netgl-renderer.md](./docs/netgl-renderer.md) |
| Frame-RPC portals (`host-three`, iframe, Worker, headless; `portal-core`/`-three`/`-iframe`/`-worker`) | [docs/frame-rpc-portals.md](./docs/frame-rpc-portals.md) |
| Demo apps | [host-netgl-cesium](./apps/host-netgl-cesium/README.md), [host-netgl-celestiary](./apps/host-netgl-celestiary/README.md), [host-iframe-demo](./apps/host-iframe-demo/README.md) |
| Snapshot and share proxies (Fly.io) | [docs/deploying-proxies.md](./docs/deploying-proxies.md) |
| Publishing portal-netgl to npm | [package README, Publishing](./packages/portal-netgl/README.md#publishing-maintainers) |
| celestiary's Cesium layers (the production host; separate repo) | [celestiary/web CESIUM.md](https://github.com/celestiary/web/blob/main/CESIUM.md) |
| Old maintainer notes (history only) | [docs/archive/](./docs/archive/) |

## Working efficiently

- **Orient from the docs, then search narrowly.** The routing table
  above and DESIGN.md's layout section usually name the file. Grep
  `packages/` and `apps/` rather than the whole tree: `node_modules`
  and the `external/celestiary` submodule are large.
- **Run the smallest check that answers the question**, then the full
  one before pushing:
  - `npx vitest run packages/portal-netgl` for one package;
  - `npm test`, `npm run check` and `npm run build` before a push.
- **GL tests need a display.** headless-gl can't create a context
  without one, so in containers run `xvfb-run -a npm test`. Without it,
  ~14 GL tests fail with "could not create WebGL2 context", and that's
  the environment, not your change. With other sessions on the machine,
  `xvfb-run -a` occasionally loses a race for a display ("Could not open
  the default X display", one GL test failing): rerun. On a GitHub runner
  the first context in a test file takes about 6 s, hence `testTimeout`
  in `vitest.config.ts`; a GL test that times out there at 5 s is that.
- **Browser checks: headless Chromium on SwiftShader.** Launch Playwright
  with `--use-angle=swiftshader --enable-unsafe-swiftshader`; in cloud
  sessions Chromium is preinstalled (`PLAYWRIGHT_BROWSERS_PATH`), so
  don't run `playwright install`. SwiftShader is slow, so:
  - Use small viewports and few screenshots: a screenshot can take
    seconds.
  - Read state with `page.evaluate` (uniforms, camera, layer status)
    rather than inferring it from pixels.
  - Call the function under test directly instead of replaying long
    input sequences such as dozens of wheel events.
  - Put long runs in the background, and don't chain `sleep`s.
- **Compare renders numerically.** To check that a guest matches its
  host (the same view with the layer forced on and off), compare median
  pixel ratios over a region and brightness profiles. Do it at partial
  phase, not full: that's where colour-pipeline mismatches show.
- **luma.gl / deck.gl on headless-gl.** `webgl2Adapter.attach(gl)` needs
  the context to have a `canvas` (define a jsdom canvas on it), and
  headless-gl answers null for `ACTIVE_UNIFORM_BLOCKS`, which luma's
  shader reflection reads: shim `getProgramParameter` to answer 0
  (`frameworks/luma.test.ts`). deck's `_GlobeViewport` needs no GL at all,
  so camera math tests use it directly.
- **Timing GPU work on SwiftShader:** end the timed span with a 1-pixel
  `readPixels`, not `gl.finish()`, which Chromium returns from without
  waiting (0.3 ms for a full frame). Time one context with the other
  idle: both share the GPU process, so a sync in one waits on the
  other's queue too. To take a draw out of a measurement, give the
  context an own property (`gl.drawArrays = () => {}`): three and the
  recorder look the method up on the object. In a hidden (`display:
  none`) iframe, `frame.waitForFunction` needs `polling: <ms>`: its
  default polls on animation frames, which don't come.
- **Two origins locally:** serve one build on two ports (cross-origin,
  same site), or as `localhost` and `127.0.0.1` (cross-site: Chromium puts
  the guest in another process). A sandboxed iframe without
  `allow-same-origin` is cross-origin on one server, but its module
  scripts load in CORS mode, so the server must send
  `Access-Control-Allow-Origin` (`python3 -m http.server` doesn't; GitHub
  Pages does).
- **The demos' nav drawer opens by default**, over the right half of the
  page. Hide `#portal-nav-drawer` before a screenshot.
- **Known SwiftShader quirk:** `gl_PointCoord` flips in point shaders
  that `discard` or sample a depth texture. Use depth state instead.
- **The docs site and the version snapshots.** `scripts/build-rfc-site.mjs`
  turns `docs/rfcs/responses/*.md` into `dist/rfcs/` (the build action runs
  it; `--out` anywhere to try it). The Pages workflow writes
  `v/versions.json` and, when portal-netgl's version changes, builds the
  site a second time under `v/<version>/` and keeps it. Bumping the version
  is therefore also what takes a snapshot of the demos and docs. A past
  version is rebuilt from its commit by the *Snapshot a version* workflow
  (`.github/workflows/snapshot.yml`, run from the Actions tab with the
  version); its commit, date and demos come from
  `docs/rfcs/responses/history.json`, which also feeds the pulldowns'
  labels and the Evolution page's timeline. A new release gets a row there,
  and a `## <version>: ...` section in CHANGELOG.md: the site renders that
  section as `versions/<version>.html` at the site root, the page the docs' pulldown
  shows for a version that predates the responses (they start at 0.6.8).
  The workflow takes one version or a JSON array of them (built one after
  another in one run). From a cloud session, dispatch it through the REST
  endpoint: `gh api -X POST repos/<owner>/portal/actions/workflows/snapshot.yml/dispatches -f ref=main -f 'inputs[version]=0.2.0'`;
  `gh workflow run` fails, since it looks the default branch up over
  GraphQL, which the session's proxy refuses. `gh run list` and `gh run
  view` work for watching it.
- **Static servers and rebuilds.** A build that deletes and recreates
  its output directory leaves a server started inside it serving
  nothing. Restart the server after rebuilding.
- **Ask early about anything only the user can supply:** tokens, network
  allow-lists, dataset access, account settings. Say exactly what's
  needed, and keep working on what doesn't depend on it.

## Secrets

- Never print, log, commit or paste a token, including in PR text or
  test output. Pass them by environment variable.
- **Error bodies can echo credentials.** Cesium ion's not-found response
  repeats the request URL, access token included. Strip response bodies
  before printing them.
- **Testing a Referer-restricted token** (e.g. ion restricted to a
  site's origin) in Playwright: fetch those requests from Node with the
  Referer header set (`page.route` → `route.fetch({headers})`), then
  fulfill them with CORS headers.

## Verification and reporting

- **Rendering changes need visual evidence:** screenshots, or the PR
  preview at
  `https://pablo-mayrgundter.github.io/portal/pr-preview/pr-<n>/`. Unit
  tests don't catch compositing bugs.
- **Report what you couldn't verify**, and say why: a service
  unreachable from the sandbox, an expired credential, no real device.
  Name what the user should check on the preview.

## Pull requests

- **Subscribe to PR activity on open.** Immediately after creating a
  pull request, subscribe to its activity stream, so CI failures and
  review comments arrive in the session. Investigate each event as it
  arrives:
  - fix small, clear issues directly;
  - ask before changes that are architecturally significant or
    ambiguous;
  - skip events that don't need action.

  Tooling specifics:
  - Claude Code: subscribe with the PR number (the
    `subscribe_pr_activity` tool), without being asked. Where it's
    available, also schedule a check-in about an hour out, since events
    don't cover everything. Cancel it once the PR merges.
  - Other tooling: use the equivalent webhook or event-stream
    subscription. If none exists, poll the PR's check runs and review
    comments once before ending the turn.

- Don't end the turn after opening a PR until the subscription is in
  place. The subscription is what closes the loop between "PR opened"
  and "PR mergeable". Without it the agent is blind to the verdict.
- **Merge only when the user says so.** A green PR waits for their
  go-ahead.
- **Keep the PR description current:** when later pushes change what the
  PR does or fixes, update the description to match.

## Recording what you learn

- **Findings from a real integration** go in
  `packages/portal-netgl/DESIGN.md`, under the relevant findings or
  lessons section.
- **App-side pitfalls** that a library can't fix go in
  `docs/portal-layers.md`'s gotchas.
- **Workflow tips** for future sessions go here, in *Working
  efficiently*.
- **Keep the README honest:** its status and "not yet" list should
  match reality.
