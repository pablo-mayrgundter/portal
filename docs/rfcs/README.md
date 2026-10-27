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
| [0001](./0001-globe-orbit-layers.md) | Globe + orbit layers: the overlay kind, shared depth, the view message, time, anchors, nesting, cross-origin guests | Draft; discussion and findings in [#39](https://github.com/pablo-mayrgundter/portal/issues/39) | `layer:view`, `layer:hello`, depth and trust in `portal-layers.md`; screen policy in DESIGN.md. Implementations: portal #36, #40–#48 (portal-netgl 0.5.0–0.6.8), celestiary/web #296, netmap #7 |
| 0002 ([#38](https://github.com/pablo-mayrgundter/portal/issues/38)) | Nested in-place guests: flat same-page chains, the in-frame contract, `portal.light/1`, `portal.ground/1`, the `enu` frame, lean shadows, a staged set-up, a layer manifest | Draft, filed as an issue | RFC 0001 §4, §5, §6, §9, §10; contracts, lifecycle and security in `portal-layers.md`; nested guests and the screen policy in DESIGN.md. Implementations: celestiary/web #287, slop-newyork #1 |
| 0003 ([#49](https://github.com/pablo-mayrgundter/portal/issues/49)) | Late frames from a guest on another page: deferred deletes, reprojecting a guest's own targets, its projection on the frame-end | Draft, filed as an issue | the receiver's re-run rule, host reprojection and parts in DESIGN.md; RFC 0001 Q18; RFC 0002 §6.3. Implementations: celestiary/web #309, #310, #317 |

The maintainers' reading of the three together, with a 1-pager and an
infographic for each and the tracks of work that answer them, is in
[`responses/`](./responses/README.md).

## Process

> **For now, RFCs are filed as issues** with the *RFC* template, the full
> text in the issue's description and first comments, and the discussion
> in the comments below, citing a section (§n) or an open question (Qn).
> 0001 was merged here as a doc before that change and keeps its file;
> its discussion is in #39. The steps below describe the PR form, which
> remains open to anyone who prefers it.


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
