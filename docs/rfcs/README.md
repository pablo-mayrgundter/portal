# Portal RFCs

Proposals for the NetGL protocol, the `portal-layers` contracts and the
host and guest adapters, written down before they're built. An RFC is
where a design change is argued; once accepted, its substance moves into
the design it changes ([`packages/portal-netgl/DESIGN.md`](../../packages/portal-netgl/DESIGN.md),
[`docs/portal-layers.md`](../portal-layers.md)), and the RFC stays as
the record of why.

## Index

| # | Title | Status | Changes |
|---|---|---|---|
| [0001](./0001-globe-orbit-layers.md) | Globe + orbit layers: the overlay kind, shared depth, the view message, time, anchors, nesting, cross-origin guests | Draft | `layer:view`, `layer:hello`, depth and trust in `portal-layers.md`; screen policy in DESIGN.md |

## Process

1. **Number.** Take the next free four-digit number, and name the file
   `NNNN-short-slug.md`. Add a row to the index above in the same PR.
2. **Draft.** Open a PR with the RFC. Its status is `Draft` while the PR
   is open. Comment on the PR, line by line: that's the discussion.
   Spikes and implementation PRs that test the proposal link back to it,
   and append what they found to its *Findings from implementation*
   section.
3. **Decide.** The maintainer moves it to `Accepted` or `Rejected` and
   merges the PR either way, so rejected ideas stay on record with the
   reason. An RFC can be merged as `Draft` too, to give later RFCs
   something to cite; its open questions then carry on in issues (the
   *RFC* issue template), each linking the RFC and its question number.
4. **Land.** When an accepted RFC is implemented, its status becomes
   `Implemented`, and the docs it changes are updated to match, citing
   it. An RFC replaced by a later one is `Superseded by NNNN`.

| Status | Meaning |
|---|---|
| Draft | open for comment; nothing in it binds anyone yet |
| Accepted | the direction is agreed; implementation may lag |
| Implemented | built, and the design docs say so |
| Rejected | not doing it, with the reason in the RFC |
| Superseded by NNNN | replaced; read the later one |

## Shape of an RFC

A header (status, date, authors, what it changes, related RFCs and
issues), then: the use case and its assumptions, the proposal, with
message and field shapes as TypeScript-style interfaces, what it changes
in existing docs (cite the section; never contradict a design doc
silently), findings from implementation, and numbered open questions.
Keep it concrete: one real integration drives each RFC.
