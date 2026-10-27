// Generates the infographics beside this file (portal-netgl.svg, rfc-000N.svg) as plain SVG.
// Edit the strings and layout here, then: node docs/rfcs/responses/img/generate.mjs && git diff --stat.
// --out <dir> writes elsewhere (scripts/build-rfc-site.mjs uses it for the Pages build).
// No dependencies. Check a render in a browser before committing: the text is laid out by
// an average glyph width, so a long string can overflow its box.
import { writeFileSync } from 'node:fs'

import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync, mkdirSync } from 'node:fs'
const here = dirname(fileURLToPath(import.meta.url))
const outArg = process.argv.indexOf('--out')
const OUT = join(outArg > 0 ? resolve(process.argv[outArg + 1]) : here, '/')
mkdirSync(OUT, { recursive: true })
// The version tag on the overview: portal-netgl's, so a snapshot of the site says which release it describes.
const VERSION = JSON.parse(readFileSync(join(here, '../../../../packages/portal-netgl/package.json'), 'utf8')).version
const C = {
  bg: '#fcfcfb', panel: '#ffffff', line: '#e3e2dd', ink: '#0b0b0b', ink2: '#52514e', ink3: '#8a8984',
  host: '#2a78d6', hostBg: '#e3eefb', guest: '#eb6834', guestBg: '#fdeae2',
  built: '#1baf7a', builtBg: '#e0f5ec', next: '#eda100', nextBg: '#fef3d9',
  open: '#6250d6', openBg: '#ebe8fa', risk: '#e34948', riskBg: '#fbe3e3', gray: '#9c9b96', grayBg: '#f1f0ec',
}
const FONT = "font-family=\"'Helvetica Neue', Helvetica, Arial, sans-serif\""
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const W = (size, bold = false) => size * (bold ? 0.56 : 0.52)   // avg glyph width

function wrap(text, maxPx, size, bold = false) {
  const cw = W(size, bold); const max = Math.floor(maxPx / cw)
  const words = text.split(' '); const lines = []; let cur = ''
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w
    if (t.length > max && cur) { lines.push(cur); cur = w } else cur = t
  }
  if (cur) lines.push(cur); return lines
}

class Svg {
  constructor(w, h) { this.w = w; this.h = h; this.parts = [] }
  add(s) { this.parts.push(s); return this }
  rect(x, y, w, h, { fill = C.panel, stroke = C.line, r = 10, sw = 1, dash } = {}) {
    this.add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`)
  }
  text(x, y, s, { size = 14, fill = C.ink, bold = false, anchor = 'start', italic = false } = {}) {
    this.add(`<text x="${x}" y="${y}" font-size="${size}" fill="${fill}"${bold ? ' font-weight="700"' : ''}${italic ? ' font-style="italic"' : ''}${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}>${esc(s)}</text>`)
  }
  // wrapped paragraph; returns y after the last line
  para(x, y, s, maxPx, { size = 14, fill = C.ink, bold = false, lh = 1.35, anchor = 'start' } = {}) {
    const lines = wrap(s, maxPx, size, bold)
    for (const l of lines) { this.text(x, y, l, { size, fill, bold, anchor }); y += size * lh }
    return y
  }
  line(x1, y1, x2, y2, { stroke = C.ink3, sw = 1.5, arrow = false, dash } = {}) {
    this.add(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${arrow ? ` marker-end="url(#arr-${stroke.slice(1)})"` : ''}${dash ? ` stroke-dasharray="${dash}"` : ''}/>`)
    if (arrow) this.markers.add(stroke)
  }
  path(d, { stroke = C.ink3, sw = 1.5, fill = 'none', arrow = false, dash } = {}) {
    this.add(`<path d="${d}" stroke="${stroke}" stroke-width="${sw}" fill="${fill}"${arrow ? ` marker-end="url(#arr-${stroke.slice(1)})"` : ''}${dash ? ` stroke-dasharray="${dash}"` : ''}/>`)
    if (arrow) this.markers.add(stroke)
  }
  circle(cx, cy, r, fill, stroke = 'none') { this.add(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}"/>`) }
  markers = new Set()
  // a panel with a heading
  panel(x, y, w, h, title, { accent = C.ink2 } = {}) {
    this.rect(x, y, w, h)
    this.add(`<rect x="${x}" y="${y}" width="${w}" height="4" rx="2" fill="${accent}"/>`)
    this.text(x + 18, y + 32, title, { size: 16, bold: true })
    return { x: x + 18, y: y + 56, w: w - 36 }
  }
  // a labelled box (node in a diagram)
  box(x, y, w, h, title, lines = [], { fill = C.grayBg, stroke = C.gray, titleFill = C.ink, size = 12.5 } = {}) {
    this.rect(x, y, w, h, { fill, stroke, r: 8 })
    let ty = y + 20
    this.text(x + 12, ty, title, { size: 13.5, bold: true, fill: titleFill }); ty += 18
    for (const l of lines) { ty = this.para(x + 12, ty, l, w - 24, { size, fill: C.ink2, lh: 1.3 }) }
  }
  // status chip: a dot + label, wrapped
  chip(x, y, w, label, status, note) {
    const col = { built: C.built, next: C.next, open: C.open, partial: C.next, later: C.gray }[status]
    this.circle(x + 7, y - 4, 5.5, col)
    let yy = this.para(x + 20, y, label, w - 20, { size: 13, bold: true })
    if (note) yy = this.para(x + 20, yy, note, w - 20, { size: 12, fill: C.ink2 })
    return yy + 6
  }
  stat(x, y, w, h, big, label, { accent = C.host } = {}) {
    this.rect(x, y, w, h, { fill: C.panel, stroke: C.line, r: 8 })
    this.add(`<rect x="${x}" y="${y + 10}" width="4" height="${h - 20}" rx="2" fill="${accent}"/>`)
    this.text(x + 16, y + 34, big, { size: 22, bold: true })
    this.para(x + 16, y + 54, label, w - 28, { size: 11.5, fill: C.ink2, lh: 1.3 })
  }
  legend(x, y, items) {
    let cx = x
    for (const [status, label] of items) {
      const col = { built: C.built, next: C.next, open: C.open, later: C.gray }[status]
      this.circle(cx + 6, y - 4, 5.5, col); this.text(cx + 17, y, label, { size: 12, fill: C.ink2 }); cx += 17 + label.length * 6.6 + 18
    }
  }
  toString() {
    const defs = [...this.markers].map((c) => `<marker id="arr-${c.slice(1)}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>`).join('')
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${this.w}" height="${this.h}" viewBox="0 0 ${this.w} ${this.h}" ${FONT}>\n<defs>${defs}</defs>\n<rect width="${this.w}" height="${this.h}" fill="${C.bg}"/>\n${this.parts.join('\n')}\n</svg>\n`
  }
}

function header(s, title, sub, tag) {
  s.text(40, 52, title, { size: 28, bold: true })
  s.text(40, 78, sub, { size: 15, fill: C.ink2 })
  if (tag) { const tw = tag.length * 7.5 + 24; s.rect(s.w - 40 - tw, 30, tw, 28, { fill: C.hostBg, stroke: C.host, r: 14 }); s.text(s.w - 40 - tw / 2, 49, tag, { size: 13, bold: true, fill: C.host, anchor: 'middle' }) }
}
function footer(s, text) { s.text(40, s.h - 18, text, { size: 11, fill: C.ink3 }) }

// ───────────────────────────── 1. overview ─────────────────────────────
{
  const s = new Svg(1200, 890)
  header(s, 'Portal / NetGL: link independent 3D web renderers at the GL layer',
    'Engines stay sovereign. The seam is the WebGL2 command stream, replayed into one host context.', 'portal-netgl ' + VERSION)

  // problem
  let p = s.panel(40, 100, 340, 300, 'The problem')
  s.para(p.x, p.y, '3D on the web is split across engines that don\'t compose. Each owns its scene graph, camera, frame loop and GL state.', p.w, { size: 13, fill: C.ink2 })
  const eng = ['three.js', 'CesiumJS', 'deck.gl', 'Babylon.js', 'WebGPU / splats']
  eng.forEach((e, i) => { const x = p.x + (i % 3) * 104, y = p.y + 50 + Math.floor(i / 3) * 36; s.rect(x, y, 96, 28, { fill: C.grayBg, stroke: C.gray, r: 14 }); s.text(x + 48, y + 18, e, { size: 12, anchor: 'middle', bold: true }) })
  let yy = s.para(p.x, p.y + 140, 'Scene graphs are the wrong layer to standardise. One layer down, every engine emits WebGL2 draws.', p.w, { size: 13, fill: C.ink })
  s.para(p.x, yy + 8, 'NetGL links GL contexts: full fidelity, no bitmap round-trip, occlusion both ways.', p.w, { size: 13, bold: true })

  // pipeline
  p = s.panel(410, 100, 750, 300, 'How NetGL works', { accent: C.host })
  const by = p.y + 10, bh = 98
  s.box(p.x, by, 118, bh, 'Guest renderer', ['three.js, Cesium, deck.gl, unmodified'], { fill: C.guestBg, stroke: C.guest, titleFill: C.guest })
  s.box(p.x + 142, by, 140, bh, 'Recorder (Proxy)', ['intercepts WebGL2 calls, interns handles, slices uploads'], { fill: C.guestBg, stroke: C.guest, titleFill: C.guest })
  s.box(p.x + 306, by, 124, bh, 'Transport', ['same page (sync), postMessage + port, worker'], { fill: C.grayBg, stroke: C.gray })
  s.box(p.x + 454, by, 118, bh, 'Replay', ['into the host\'s WebGL2 context, checkpointed'], { fill: C.hostBg, stroke: C.host, titleFill: C.host })
  s.box(p.x + 596, by, 118, bh, 'Screen policy', ['stencil, clears, blend, viewport, target'], { fill: C.hostBg, stroke: C.host, titleFill: C.host })
  ;[118, 282, 430, 572].forEach((xx, i) => s.line(p.x + xx + 2, by + bh / 2, p.x + [142, 306, 454, 596][i] - 2, by + bh / 2, { stroke: C.ink3, sw: 2, arrow: true }))
  // shadow ctx below recorder
  s.rect(p.x + 142, by + bh + 22, 140, 46, { fill: C.panel, stroke: C.guest, r: 8, dash: '4 3' })
  s.text(p.x + 212, by + bh + 41, 'shadow GL context', { size: 12, bold: true, anchor: 'middle', fill: C.guest })
  s.text(p.x + 212, by + bh + 57, 'sync answers; no draws needed', { size: 11, anchor: 'middle', fill: C.ink2 })
  s.line(p.x + 212, by + bh + 2, p.x + 212, by + bh + 20, { stroke: C.guest, sw: 1.5, arrow: true })
  // host canvas below policy
  s.rect(p.x + 454, by + bh + 22, 260, 46, { fill: C.hostBg, stroke: C.host, r: 8 })
  s.text(p.x + 584, by + bh + 41, 'the host\'s canvas, one GPU', { size: 12, bold: true, anchor: 'middle', fill: C.host })
  s.text(p.x + 584, by + bh + 57, 'host depth and stencil bound the guest', { size: 11, anchor: 'middle', fill: C.ink2 })
  s.line(p.x + 655, by + bh + 2, p.x + 655, by + bh + 20, { stroke: C.host, sw: 1.5, arrow: true })
  s.para(p.x, by + bh + 92, 'A guest frame is ~100–500 calls. The state checkpoint restores the guest\'s GL state at each frame boundary; the host\'s framework restores or invalidates its own cache after the replay.', p.w, { size: 12, fill: C.ink2 })

  // modes
  p = s.panel(40, 430, 560, 230, 'Three ways to compose')
  const modes = [
    ['Door', 'a stencilled quad; the host camera carried through it; real parallax', (x, y) => { s.rect(x, y, 70, 50, { fill: C.hostBg, stroke: C.host, r: 4 }); s.rect(x + 22, y + 10, 26, 40, { fill: C.guestBg, stroke: C.guest, r: 2 }) }],
    ['In place', 'a shape (ellipsoid, mesh) stencils where the guest\'s pixels belong; depth-tested against the host', (x, y) => { s.rect(x, y, 70, 50, { fill: C.hostBg, stroke: C.host, r: 4 }); s.circle(x + 35, y + 25, 17, C.guestBg, C.guest); s.circle(x + 58, y + 14, 6, C.hostBg, C.host) }],
    ['Overlay', 'no shape: the host\'s exact clip space, tested against the host\'s depth; corrected if late', (x, y) => { s.rect(x, y, 70, 50, { fill: C.hostBg, stroke: C.host, r: 4 }); s.circle(x + 35, y + 30, 16, C.hostBg, C.host); for (const [dx, dy] of [[8, 12], [20, 8], [50, 14], [60, 30], [14, 40]]) s.circle(x + dx, y + dy, 3, C.guest) }],
  ]
  modes.forEach(([t, d, draw], i) => { const x = p.x + i * 178; draw(x, p.y); s.text(x, p.y + 76, t, { size: 14, bold: true }); s.para(x, p.y + 96, d, 160, { size: 12, fill: C.ink2 }) })

  // status
  p = s.panel(630, 430, 530, 230, 'Where it stands', { accent: C.built })
  let y = s.chip(p.x, p.y, 240, 'Works', 'built', 'WebGL2 guests: three.js, Cesium unmodified. Hosts: three.js, deck.gl / luma.gl. Same-page, iframe and cross-origin transports; one batch per frame; host reprojection; parts.')
  y = s.chip(p.x, y + 4, 240, 'In production', 'built', 'celestiary draws Cesium\'s Earth, Moon and Mars in place of its own.')
  let y2 = s.chip(p.x + 260, p.y, 240, 'Not yet', 'open', 'Untrusted guests (no sandbox). WebRTC. Non-affine host views. Resource lifecycle. Extension objects. WebGPU.')
  s.chip(p.x + 260, y2 + 4, 240, 'Status', 'next', 'Early prototype, pre-1.0. Pin exact versions. Looking for testers, RFCs and adopters.')

  // rfcs band
  p = s.panel(40, 690, 1120, 170, 'Three RFCs, from three real integrations, and the maintainers\' responses', { accent: C.open })
  const rf = [
    ['RFC 0001 · Globe + orbit layers', 'netmap (deck.gl globe) hosts celestiary\'s orbits from another origin. Overlay kind, shared depth, the view, time, anchors, trust.', 'built 0.5–0.6.8 · 29 questions'],
    ['RFC 0002 · Nested in-place guests', 'celestiary → Cesium → Slop New York on one page. Flat chains, in-frame contract, light, ground, the enu frame, lean, staging.', 'shipped composed · library pieces for 0.7'],
    ['RFC 0003 · Late frames', 'celestiary\'s Cesium from a guest page. Deferred deletes, reprojecting a guest\'s own targets, its projection on the frame-end.', 'proposed for 0.6.9–0.6.10'],
  ]
  rf.forEach(([t, d, st], i) => { const x = p.x + i * 372; s.text(x, p.y + 4, t, { size: 14, bold: true, fill: C.open }); const yy = s.para(x, p.y + 24, d, 340, { size: 12, fill: C.ink2 }); s.text(x, yy + 6, st, { size: 11.5, bold: true, fill: C.ink3 }) })
  footer(s, 'docs/rfcs/responses · the README, DESIGN.md and portal-layers.md have the detail · github.com/pablo-mayrgundter/portal')
  writeFileSync(OUT + 'portal-netgl.svg', s.toString())
}

// ───────────────────────────── 2. RFC 0001 ─────────────────────────────
{
  const s = new Svg(1200, 900)
  header(s, 'RFC 0001 · Globe + orbit layers', 'netmap\'s deck.gl globe hosts celestiary\'s orbits from another origin: an overlay, depth-tested against the globe, linked across engines.', 'Draft · #39')
  let p = s.panel(40, 100, 580, 270, 'The scenario', { accent: C.host })
  s.box(p.x, p.y, 240, 150, 'netmap page (host)', ['deck.gl GlobeView: the globe, AS nodes, arcs', 'owns the clock and the camera', 'attachNetGLDeckLayer replays after deck\'s draws, then popState()', 'publishes asn:14593'], { fill: C.hostBg, stroke: C.host, titleFill: C.host })
  s.box(p.x + 304, p.y, 240, 150, 'celestiary iframe (guest)', ['cross-origin, hidden, full-viewport', 'three.js on a NetGL recorder', 'satellites (SGP4), Starlink, Iridium, DSN links', 'publishes norad:, dsn:, naif: anchors'], { fill: C.guestBg, stroke: C.guest, titleFill: C.guest })
  const ax = p.x + 242, bx = p.x + 302
  s.line(ax, p.y + 30, bx, p.y + 30, { stroke: C.host, sw: 2, arrow: true }); s.text((ax + bx) / 2, p.y + 22, 'layer:view', { size: 10.5, anchor: 'middle', fill: C.host })
  s.line(bx, p.y + 75, ax, p.y + 75, { stroke: C.guest, sw: 2, arrow: true }); s.text((ax + bx) / 2, p.y + 67, 'netgl batch', { size: 10.5, anchor: 'middle', fill: C.guest })
  s.line(bx, p.y + 120, ax, p.y + 120, { stroke: C.guest, sw: 2, arrow: true }); s.text((ax + bx) / 2, p.y + 112, 'anchors', { size: 10.5, anchor: 'middle', fill: C.guest })
  s.para(p.x, p.y + 176, 'The host sends pose, viewport and time; the guest sends one message a frame of WebGL2 calls, drawn in deck\'s clip space with no clears. The host draws the link AS14593 ↔ STARLINK-1007 itself, from both engines\' anchors.', p.w, { size: 12.5, fill: C.ink2 })

  p = s.panel(650, 100, 510, 270, 'What it adds, and what\'s built', { accent: C.built })
  const chips = [
    ['Overlay kind', 'built', '0.5.0'], ['Shared depth, no clears', 'built', '0.4.0, 0.5.0'],
    ['Precise view (ECEF, doubles)', 'built', 'Earth model; v2 in 0.7'], ['Extent and the far plane', 'built', 'farZMultiplier; layer:extent next'],
    ['Time: timeMs in the view, layer:time', 'partial', 'split across #36 and #296'], ['Anchors, URI registry, links', 'partial', 'in apps; near-N (#304)'],
    ['Nesting flattened', 'next', 'amended by RFC 0002'], ['Cross-origin: origin pinned', 'built', 'nonce + port next'],
    ['Trust tiers', 'next', 'trusted-origin checks, 0.8'], ['Host adapter: restore / invalidate', 'built', 'luma, three, Cesium'],
  ]
  chips.forEach(([l, st, n], i) => { const x = p.x + (i % 2) * 240, y = p.y + Math.floor(i / 2) * 40; s.circle(x + 7, y - 4, 5.5, { built: C.built, partial: C.next, next: C.next }[st]); s.text(x + 20, y, l, { size: 12.5, bold: true }); s.text(x + 20, y + 15, n, { size: 11, fill: C.ink2 }) })
  s.legend(p.x, p.y + 206, [['built', 'built and merged'], ['next', 'partial or next'], ['open', 'open question']])

  p = s.panel(40, 400, 580, 250, 'What building it taught: the wire was the cost', { accent: C.guest })
  const st = [['187 → 1', 'messages per guest frame (wire 2: one batch over a MessagePort)'], ['505 → 48 KB', 'per frame, uploads sliced to the bytes a call reads'], ['210 → 0.1 ms', 'host main-thread decode per frame'], ['608 → 117 ms', 'input to guest pixels shown (M2, 0.5.0 → 0.6.1)']]
  st.forEach(([b, l], i) => s.stat(p.x + (i % 2) * 276, p.y + Math.floor(i / 2) * 84, 266, 76, b, l, { accent: i < 2 ? C.guest : C.host }))
  s.para(p.x, p.y + 184, 'Then: a late frame is corrected, not waited for (host reprojection, 0.6.3). What\'s left is the host page\'s own frame rate.', p.w, { size: 12.5, fill: C.ink })

  p = s.panel(650, 400, 510, 250, 'Our take', { accent: C.next })
  let y = s.chip(p.x, p.y, p.w, 'Accept', 'built', 'the kind, shared depth, the view, time, anchors, the adapter semantics: build the rest as specified.')
  y = s.chip(p.x, y, p.w, 'Amend', 'next', 'depth encoding\'s parameters per view; depth writes a per-host default; near-N required of big anchor publishers; flat through the middle on one page (RFC 0002).')
  y = s.chip(p.x, y, p.w, 'Defer', 'open', 'Web Mercator hosts get anchors only; untrusted guests go to isolated bitmaps, not validated GL; no propagation in the host.')

  p = s.panel(40, 680, 1120, 190, 'How to proceed', { accent: C.open })
  const steps = [['0.6.9–0.6.10', 'RFC 0003\'s deferred deletes and named targets serve this guest too'], ['0.7.0 · T3', 'LayerView v2 as one type; #36 and #296 on one envelope'], ['0.8.0 · T5', 'hello / hello-ack with nonce + port; trusted-origin checks; time and anchors with near-N; lifecycle; portal-layers 0.1 cut'], ['apps', 'registry ids (dsn:GDSCC); DSN on view.earth; publish nothing before a subscription']]
  steps.forEach(([v, d], i) => { const x = p.x + i * 278, pw = v.length * 7.4 + 26; s.rect(x, p.y - 6, pw, 24, { fill: C.openBg, stroke: C.open, r: 12 }); s.text(x + pw / 2, p.y + 10, v, { size: 12, bold: true, fill: C.open, anchor: 'middle' }); s.para(x, p.y + 40, d, 250, { size: 12, fill: C.ink2 }) })
  s.text(p.x, p.y + 108, 'Open for comment:', { size: 12.5, bold: true })
  s.para(p.x + 128, p.y + 108, 'Q1 / Q16 / Q21 trust, and what makes untrusted GL safe · Q7 2D hosts · Q22 motion models · Q19 / Q20 depth step and the limb · Q5 Earth orientation', 960, { size: 12.5, fill: C.ink2 })
  footer(s, 'docs/rfcs/responses/0001-globe-orbit-layers.md · RFC text: docs/rfcs/0001-globe-orbit-layers.md · discussion: portal #39')
  writeFileSync(OUT + 'rfc-0001.svg', s.toString())
}

// ───────────────────────────── 3. RFC 0002 ─────────────────────────────
{
  const s = new Svg(1200, 945)
  header(s, 'RFC 0002 · Nested in-place guests', 'celestiary → Cesium → Slop New York: three engines, two links deep, on one page, the city standing on Cesium\'s terrain.', 'Draft · #38')
  let p = s.panel(40, 100, 580, 290, 'The chain: composed today, flat in 0.7', { accent: C.host })
  const cx = p.x, cw = 190
  s.box(cx, p.y, cw, 62, 'celestiary (root)', ['three.js, HDR scene buffer; owns camera and clock'], { fill: C.hostBg, stroke: C.host, titleFill: C.host, size: 11.5 })
  s.box(cx, p.y + 86, cw, 62, 'Cesium (middle)', ['guest of celestiary, host of the city; log depth'], { fill: C.grayBg, stroke: C.gray, size: 11.5 })
  s.box(cx, p.y + 172, cw, 62, 'Slop New York (leaf)', ['three.js dev on WebGL2; in Cesium\'s frame, per frustum'], { fill: C.guestBg, stroke: C.guest, titleFill: C.guest, size: 11.5 })
  s.line(cx + 95, p.y + 172, cx + 95, p.y + 150, { stroke: C.guest, sw: 2, arrow: true }); s.line(cx + 95, p.y + 86, cx + 95, p.y + 64, { stroke: C.gray, sw: 2, arrow: true })
  // composed vs flat columns
  const col = (x, title, lines, accent, bg) => { s.rect(x, p.y, 160, 234, { fill: bg, stroke: accent, r: 8 }); s.text(x + 12, p.y + 22, title, { size: 13.5, bold: true, fill: accent }); let yy = p.y + 44; for (const l of lines) yy = s.para(x + 12, yy, l, 136, { size: 11.5, fill: C.ink2 }) + 4 }
  col(cx + 206, 'Composed (today)', ['every city call runs 3×: its shadow, Cesium\'s shadow, celestiary\'s context', '2 encode-decode passes, 2 trackers', '64 programs compile 3×', 'nothing has to cooperate'], C.risk, C.riskBg)
  col(cx + 376, 'Flat (0.7)', ['the leaf replays straight into the root', 'the middle exposes its link, resync() and resolve(handle)', '2 executions, 1 encode-decode, compiles 2×', 'composed stays as the fallback'], C.built, C.builtBg)
  s.path(`M${cx + 366} ${p.y + 117} L${cx + 376} ${p.y + 117}`, { stroke: C.ink3, sw: 2, arrow: true })

  p = s.panel(650, 100, 510, 290, 'What it adds', { accent: C.built })
  const chips = [
    ['Flat chains', 'next', 'nested link, resync(), resolve()'], ['In-frame contract', 'next', 'overlay at a phase; writes log depth'],
    ['portal.light/1', 'next', 'host light, stored-lit, 3 passes'], ['portal.ground/1', 'next', 'guest asks, host samples, budgeted'],
    ['The enu frame', 'next', 'geodetic origin, bearing, doubles'], ['shadow: lean', 'partial', 'extends shadowDraws: false (0.6.2)'],
    ['Staged set-up', 'next', 'chunks; stops at the first frame'], ['stencil no-write, blend occlude', 'next', 'screen policy'],
    ['Offered, switched on', 'next', 'building statuses; layers:nyc token'], ['Manifest, credits, same-page tier', 'next', 'home: cesium-portal (proposed)'],
  ]
  chips.forEach(([l, st, n], i) => { const x = p.x + (i % 2) * 240, y = p.y + Math.floor(i / 2) * 40; s.circle(x + 7, y - 4, 5.5, st === 'partial' ? C.built : C.next); s.text(x + 20, y, l, { size: 12.5, bold: true }); s.text(x + 20, y + 15, n, { size: 11, fill: C.ink2 }) })
  s.legend(p.x, p.y + 206, [['built', 'partly built'], ['next', 'proposed, for 0.7 / 0.8']])

  p = s.panel(40, 420, 580, 275, 'What it cost, and what the lean city fixed', { accent: C.guest })
  const st = [['2.6–4.2 s → 0.27 s', 'the city\'s first frame (set-up staged over 23 chunks)'], ['941 → 739 MB', 'renderer process RSS, headless'], ['10.5 s → 89 ms', 'a frame at street level'], ['×3 → ×3', 'program compiles: still paid; the nested link makes it ×2']]
  st.forEach(([b, l], i) => s.stat(p.x + (i % 2) * 276, p.y + Math.floor(i / 2) * 84, 266, 76, b, l, { accent: i === 3 ? C.risk : C.guest }))
  s.para(p.x, p.y + 174, 'Hazards found: a drape that never ended on real terrain (the host must bound it); the eye under the ellipsoid (float32 sun test); a stage that kept chunking (a flicker every 37 frames).', p.w, { size: 12, fill: C.ink })

  p = s.panel(650, 420, 510, 275, 'Our take', { accent: C.next })
  let y = s.chip(p.x, p.y, p.w, 'Accept every section', 'built', 'flat chains, the in-frame contract, light, ground, enu, lean, staging, lifecycle, the manifest.')
  y = s.chip(p.x, y, p.w, 'Amend', 'next', 'no fourth kind: an overlay at a phase; the occlude pass is the policy\'s blend by default; the city rebuilds on a true tangent plane rather than hosts warping it; a scalar sea level.')
  y = s.chip(p.x, y, p.w, 'Recommend', 'open', 'cesium-portal as the home of the Earth layers (it holds the Cesium guest pages already), with the city\'s missing credits in its manifest.')

  p = s.panel(40, 725, 1120, 190, 'How to proceed', { accent: C.open })
  const steps = [['0.7.0 · T2 + T3', 'nested link, resync, resolve, lean, staging, no-write, occlude, dispose through the link; LayerView v2'], ['0.7.x · T4', 'enu helper, light and ground types, a Cesium-as-host adapter generic over enu guests'], ['slop-newyork', 'stored-lit, setLight, setPass, subFrame(); geodata on a tangent plane'], ['celestiary · cesium-portal', 'delete netglLean and the colour stopgaps; the Earth-layers package, manifests, credits (0.8)']]
  steps.forEach(([v, d], i) => { const x = p.x + i * 278, pw = v.length * 7.4 + 26; s.rect(x, p.y - 6, pw, 24, { fill: C.openBg, stroke: C.open, r: 12 }); s.text(x + pw / 2, p.y + 10, v, { size: 12, bold: true, fill: C.open, anchor: 'middle' }); s.para(x, p.y + 40, d, 250, { size: 12, fill: C.ink2 }) })
  s.text(p.x, p.y + 108, 'Open for comment:', { size: 12.5, bold: true })
  s.para(p.x + 128, p.y + 108, 'Q5 light units (stored-lit, or linear-hdr with an exposure) · Q8 who drapes · Q14 packaging · Q16 / Q17 the controls, doors inside a layer', 960, { size: 12.5, fill: C.ink2 })
  footer(s, 'docs/rfcs/responses/0002-nested-in-place-guests.md · RFC text and discussion: portal #38 · integration: celestiary/web #287, slop-newyork #1')
  writeFileSync(OUT + 'rfc-0002.svg', s.toString())
}

// ───────────────────────────── 4. RFC 0003 ─────────────────────────────
{
  const s = new Svg(1200, 980)
  header(s, 'RFC 0003 · Late frames from a guest on another page', 'celestiary\'s Cesium from a guest page on cesium-portal, in lockstep: when the guest falls behind, re-runs are refused and the surface holds still.', 'Draft · #49')
  let p = s.panel(40, 100, 580, 340, 'What goes wrong', { accent: C.risk })
  // timeline
  const tx = p.x, ty = p.y + 24
  s.text(tx, ty - 10, 'host frames', { size: 11, fill: C.ink2 }); s.line(tx, ty, tx + 540, ty, { stroke: C.ink3, sw: 1 })
  for (let i = 0; i < 7; i++) { const x = tx + i * 90; s.line(x, ty - 6, x, ty + 6, { stroke: C.host, sw: 2 }) }
  s.text(tx, ty + 42, 'guest frames', { size: 11, fill: C.ink2 }); s.line(tx, ty + 52, tx + 540, ty + 52, { stroke: C.ink3, sw: 1 })
  for (const x of [0, 90, 250, 430]) { s.line(tx + x + 30, ty + 46, tx + x + 30, ty + 58, { stroke: C.guest, sw: 2 }) }
  s.path(`M${tx + 180} ${ty + 6} L${tx + 280} ${ty + 46}`, { stroke: C.guest, sw: 1.2, dash: '3 3' }); s.text(tx + 250, ty + 32, 'late: tiles streaming', { size: 10.5, fill: C.guest })
  s.rect(tx + 190, ty + 64, 70, 16, { fill: C.riskBg, stroke: C.risk, r: 4 }); s.text(tx + 225, ty + 76, 're-run', { size: 10, anchor: 'middle', fill: C.risk })
  s.rect(tx + 280, ty + 64, 70, 16, { fill: C.riskBg, stroke: C.risk, r: 4 }); s.text(tx + 315, ty + 76, 'refused', { size: 10, anchor: 'middle', fill: C.risk })
  s.box(p.x, p.y + 112, 262, 130, '1 · Re-runs refused → blank', ['a frame that deleted a GL object is never re-run; Cesium\'s tile frames delete all the time', 'the atmosphere shows sky where the ground was: white flashes'], { fill: C.riskBg, stroke: C.risk, titleFill: C.risk, size: 12 })
  s.box(p.x + 282, p.y + 112, 262, 130, '2 · Re-runs hold still', ['the old view\'s frame, unchanged, while the atmosphere and labels move on', 'netmap fixed this for overlays; Cesium draws into its own targets and copies them with full-screen quads'], { fill: C.riskBg, stroke: C.risk, titleFill: C.risk, size: 12 })

  p = s.panel(650, 100, 510, 340, 'What it proposes', { accent: C.built })
  s.box(p.x, p.y, p.w, 80, '§3 Deferred deletes: a re-run is never refused', ['the delete runs as its implicit unbinds now, and as a delete at the next drain with a new frame; a re-run skips deletes, as it skips mints and uploads'], { fill: C.builtBg, stroke: C.built, titleFill: C.built, size: 12 })
  s.box(p.x, p.y + 92, p.w, 96, '§4 Reproject a guest with its own targets', ['C = VP_now · VP_frame⁻¹ goes to draws into the targets the guest names as screen-equivalent (reproject.targets: \'named\'); the copy quads opt out by declaring the uniform; log-depth shaders opt in through a fork patch, before czm_vertexLogDepth'], { fill: C.builtBg, stroke: C.built, titleFill: C.built, size: 12 })
  s.box(p.x, p.y + 200, p.w, 64, '§5 The frame-end carries the frame\'s metadata', ['viewId (0.6.3) · part (0.6.8) · screenTargets · viewProjection, the one the guest used'], { fill: C.builtBg, stroke: C.built, titleFill: C.built, size: 12 })

  p = s.panel(40, 470, 580, 260, 'Measured (celestiary/web #309, #310, #317)', { accent: C.guest })
  const st = [['27.8 vs 33.0 fps', 'cross-site guest vs same-page Cesium, Earth at the Grand Canyon (M2)'], ['14.3 ms', 'round trip: 1.1 to the guest, 9.9 its frame, 3.3 back'], ['118 of 503 → 0', 'blank drains, headless with every frame late (the copy fallback, #317)'], ['3,919 / 115,680 px', 'differ by 1: the night lights as a second part, vs same-page']]
  st.forEach(([b, l], i) => s.stat(p.x + (i % 2) * 276, p.y + Math.floor(i / 2) * 84, 266, 76, b, l, { accent: i === 2 ? C.risk : C.guest }))

  p = s.panel(650, 470, 510, 260, 'Our take', { accent: C.next })
  let y = s.chip(p.x, p.y, p.w, 'Accept all of it', 'built', 'deferred deletes in 0.6.9; named targets and viewProjection in 0.6.10; the fork patch; then celestiary.')
  y = s.chip(p.x, y, p.w, 'Choices', 'next', 'defer every delete; emulate the detach; keep rerunRefused for readback and sync objects; targets named, not sized; the host\'s own surface under uncovered edges; correction always on, wait 30 ms then try 0.')
  y = s.chip(p.x, y, p.w, 'Standalone', 'open', 'any full-screen guest on another page, not nesting; it amends 0001 Q18 and DESIGN.md\'s reprojection and buffering rules.')

  p = s.panel(40, 760, 1120, 190, 'How to proceed', { accent: C.open })
  const steps = [['0.6.9', 'deferred deletes, with the black-door regression and four more tests'], ['0.6.10', 'reproject.targets: named; screenTargets and viewProjection on the frame-end; the Cesium shim sends both for one frustum'], ['celestiary/cesium', 'exempt the viewport quads; opt log-depth shaders in'], ['celestiary', 'correction on, a shorter wait, a pan test, the host\'s surface under uncovered edges; \'lights\' → \'emission\'']]
  steps.forEach(([v, d], i) => { const x = p.x + i * 278, pw = v.length * 7.4 + 26; s.rect(x, p.y - 6, pw, 24, { fill: C.openBg, stroke: C.open, r: 12 }); s.text(x + pw / 2, p.y + 10, v, { size: 12, bold: true, fill: C.open, anchor: 'middle' }); s.para(x, p.y + 40, d, 250, { size: 12, fill: C.ink2 }) })
  s.text(p.x, p.y + 108, 'Open for comment:', { size: 12.5, bold: true })
  s.para(p.x + 128, p.y + 108, 'Q1 every delete, or only same-frame ones · Q3 what still refuses a re-run · Q5 several frusta under log depth · Q7 lockstep or latest', 960, { size: 12.5, fill: C.ink2 })
  footer(s, 'docs/rfcs/responses/0003-late-frames.md · RFC text and discussion: portal #49 · integration: celestiary/web #309, #310, #317; cesium-portal')
  writeFileSync(OUT + 'rfc-0003.svg', s.toString())
}
console.log('wrote 4 svgs')
