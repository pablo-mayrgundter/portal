# Contributing

Thanks for looking. Portal is an early prototype, so reports, design
feedback and integrations are worth as much as code right now.

## Ways to help

- **Test reports.** Run the demos, or NetGL with your own renderer, and
  file a *Test report* issue. It helps whether things worked or didn't:
  we need coverage across browsers, OSes and GPUs.
- **RFCs.** Open an *RFC* issue for design questions and proposals. For
  anything larger than a few paragraphs, open a PR with a markdown doc,
  next to the design it changes (e.g. `packages/portal-netgl/DESIGN.md`
  or `docs/`), and link it from the issue. The open questions are listed
  in the [README](./README.md#get-involved).
- **Adoption.** Open an *Adoption* issue describing your app and what
  you want to embed. Integrations are how the design gets tested, and
  we'll help.
- **Code.** Bug fixes, guest adapters for new engines, and the open
  problems in [DESIGN.md](./packages/portal-netgl/DESIGN.md#open-problems-the-next-pr).
  For anything beyond a small fix, open an issue first so we can agree
  on the shape.

## Development

Node 22 and npm. Celestiary is a git submodule, used by one demo.

```sh
git clone --recurse-submodules https://github.com/pablo-mayrgundter/portal.git
cd portal
npm install
npm test          # vitest across the workspaces
npm run check     # type-check
npm run build     # production builds
```

The GL tests render through headless-gl, which needs a display. On a
Linux machine without one (CI, containers), run `xvfb-run -a npm test`.
The `npm run dev:*` scripts in the README start each demo.

## Pull requests

- Keep PRs focused, and describe what changed and how you verified it.
- `npm test` and `npm run check` must pass. CI also builds every demo
  and deploys a preview of the PR to
  `https://pablo-mayrgundter.github.io/portal/pr-preview/pr-<n>/`.
- **Rendering changes need visual evidence:** screenshots or a preview
  link, ideally before and after at the same permalink. Unit tests
  don't catch compositing bugs.
- **Record what you learn.** Update the docs that the change affects.
  Findings from real integrations go in
  `packages/portal-netgl/DESIGN.md`.

## AI-assisted contributions

Welcome. [AGENTS.md](./AGENTS.md) has the conventions for coding
agents. The same bar applies: tests, visual evidence for rendering
changes, and a human who has looked at the result.

## Releases

`@pablo-mayrgundter/portal-netgl` is published from CI when its version
changes on `main`; see the package
[README](./packages/portal-netgl/README.md#publishing-maintainers). The
other packages are workspace-only for now.

## License

By contributing, you agree that your contributions are licensed under
the [MIT License](./LICENSE).
