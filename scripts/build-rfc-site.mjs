// Builds the RFC responses (docs/rfcs/responses/*.md and img/*.svg) as a
// static site: one HTML page per response, the summary as index.html, a
// shared header with the demos and a version pulldown, the infographics
// regenerated with the current portal-netgl version. The deploy puts it at
// <base>/rfcs/ (see .github/actions/build/action.yml), and the version
// pulldown reads <site root>/v/versions.json, which the Pages workflow
// writes (see .github/workflows/pages.yml).
//
//   node scripts/build-rfc-site.mjs --base /portal/ --out dist/rfcs
//
// --base is informational (the pages use relative URLs), --out is where
// the site goes. Links to files outside docs/rfcs/responses/ become links
// to the file on GitHub.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs'
import { resolve, dirname, join, posix } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { marked } from 'marked'

const here = dirname(fileURLToPath(import.meta.url))
const repo = resolve(here, '..')
const src = join(repo, 'docs/rfcs/responses')
const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => a.startsWith('--') ? [a.slice(2), all[i + 1]] : []).filter(Boolean))
const out = resolve(repo, args.out ?? 'dist/rfcs')
const version = JSON.parse(readFileSync(join(repo, 'packages/portal-netgl/package.json'), 'utf8')).version
const GITHUB = 'https://github.com/pablo-mayrgundter/portal'

const PAGES = [
  { md: 'README.md', html: 'index.html', nav: 'Summary', title: 'Responses to the RFCs' },
  { md: '0001-globe-orbit-layers.md', html: '0001-globe-orbit-layers.html', nav: 'RFC 0001', title: 'RFC 0001: globe + orbit layers' },
  { md: '0002-nested-in-place-guests.md', html: '0002-nested-in-place-guests.html', nav: 'RFC 0002', title: 'RFC 0002: nested in-place guests' },
  { md: '0003-late-frames.md', html: '0003-late-frames.html', nav: 'RFC 0003', title: 'RFC 0003: late frames' },
]
// The demos, as the build action lays them out: the root and /<key>/ siblings.
const DEMOS = [
  { href: '', label: 'Local portal' }, { href: 'iframe/', label: 'iframe' }, { href: 'worker/', label: 'Worker' },
  { href: 'netgl/', label: 'NetGL' }, { href: 'netgl-celestiary/', label: 'celestiary' },
  { href: 'netgl-cesium/', label: 'Cesium door' }, { href: 'netgl-cesium/?mode=earth', label: 'Cesium in place' },
  { href: 'netgl-deck/', label: 'deck.gl' },
]

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const slug = (text) => text.toLowerCase().replace(/[^\w\- ]/g, '').trim().replace(/ /g, '-')

/** Rewrites a markdown href for the published site. */
function rewriteHref(href) {
  if (/^(https?:|mailto:|#)/.test(href)) return href
  const [path, anchor] = href.split('#')
  const a = anchor ? '#' + anchor : ''
  const p = path.replace(/^\.\//, '')
  if (p.startsWith('img/')) return p
  const page = PAGES.find((pg) => pg.md === p)
  if (page) return page.html + a
  // Outside the responses directory: the file on GitHub, at its repo path.
  const repoPath = posix.normalize(posix.join('docs/rfcs/responses', p))
  return `${GITHUB}/blob/main/${repoPath}${a}`
}

const renderer = {
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens)
    const plain = tokens.map((t) => t.text ?? '').join('')
    return `<h${depth} id="${slug(plain)}">${text}</h${depth}>\n`
  },
  image({ href, text }) {
    return `<a class="figure" href="${esc(href)}" title="Open the SVG"><img src="${esc(href)}" alt="${esc(text)}"></a>`
  },
}
marked.use({ renderer, walkTokens(token) { if (token.type === 'link' || token.type === 'image') token.href = rewriteHref(token.href) } })

const CSS = `
:root { --bg: #fcfcfb; --panel: #fff; --line: #e3e2dd; --ink: #0b0b0b; --ink2: #52514e; --ink3: #8a8984; --host: #2a78d6; --hostbg: #e3eefb; --open: #6250d6; --openbg: #ebe8fa; }
* { box-sizing: border-box; }
html { background: var(--bg); color: var(--ink); font: 16px/1.5 'Helvetica Neue', Helvetica, Arial, sans-serif; }
body { margin: 0; }
a { color: var(--host); }
header.top { position: sticky; top: 0; z-index: 10; background: rgba(252,252,251,.94); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line); }
header.top .row { max-width: 1120px; margin: 0 auto; padding: 10px 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; }
header.top .brand { font-weight: 700; font-size: 18px; color: var(--ink); text-decoration: none; letter-spacing: -.01em; }
header.top .brand small { color: var(--ink3); font-weight: 400; font-size: 12px; margin-left: 6px; }
nav.pages a { color: var(--ink2); text-decoration: none; font-size: 14px; padding: 4px 8px; border-radius: 6px; }
nav.pages a:hover { background: var(--hostbg); color: var(--host); }
nav.pages a[aria-current] { background: var(--openbg); color: var(--open); font-weight: 600; }
nav.demos { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
nav.demos .k { font-size: 12px; font-weight: 700; color: var(--host); text-transform: uppercase; letter-spacing: .06em; margin-right: 2px; }
nav.demos a { font-size: 13px; color: var(--host); background: var(--hostbg); border: 1px solid #bcd3f3; border-radius: 14px; padding: 3px 10px; text-decoration: none; }
nav.demos a:hover { background: #d2e2f8; }
.right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
.right a { font-size: 13px; color: var(--ink2); }
.version { position: relative; display: inline-block; }
.version select { appearance: none; -webkit-appearance: none; font: 600 13px 'Helvetica Neue', Helvetica, Arial, sans-serif; color: var(--host); background: var(--hostbg); border: 1px solid var(--host); border-radius: 14px; padding: 4px 26px 4px 12px; cursor: pointer; }
.version::after { content: '▾'; position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: var(--host); pointer-events: none; font-size: 12px; }
.version.snapshot select { color: var(--open); background: var(--openbg); border-color: var(--open); }
.version.snapshot::after { color: var(--open); }
.notice { max-width: 1120px; margin: 12px auto 0; padding: 8px 16px; font-size: 13px; color: var(--open); }
main.doc { max-width: 1120px; margin: 0 auto; padding: 24px 16px 64px; }
main.doc h1 { font-size: 30px; letter-spacing: -.01em; line-height: 1.2; margin: 8px 0 16px; }
main.doc h2 { font-size: 22px; margin: 36px 0 10px; border-bottom: 1px solid var(--line); padding-bottom: 6px; }
main.doc h3 { font-size: 17px; margin: 24px 0 8px; }
main.doc p, main.doc li { max-width: 78ch; }
main.doc li { margin: 4px 0; }
main.doc table { border-collapse: collapse; width: 100%; font-size: 14px; margin: 12px 0 20px; display: block; overflow-x: auto; }
main.doc th, main.doc td { border: 1px solid var(--line); padding: 7px 10px; vertical-align: top; text-align: left; }
main.doc th { background: #f4f3ef; }
main.doc tr:nth-child(even) td { background: #fbfaf7; }
main.doc code { font: 13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; background: #f1f0ec; padding: 1px 4px; border-radius: 4px; }
main.doc pre { background: #f1f0ec; padding: 12px; border-radius: 8px; overflow-x: auto; }
main.doc pre code { background: none; padding: 0; }
main.doc blockquote { border-left: 3px solid var(--open); margin: 12px 0; padding: 4px 14px; color: var(--ink2); }
main.doc .figure { display: block; margin: 18px 0 26px; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: #fcfcfb; }
main.doc .figure img { display: block; width: 100%; height: auto; }
footer { max-width: 1120px; margin: 0 auto; padding: 20px 16px 40px; font-size: 12px; color: var(--ink3); border-top: 1px solid var(--line); }
@media (max-width: 720px) { html { font-size: 15px; } .right { margin-left: 0; } }
`

// Finds the site root from the page's path (…/rfcs/<page>), and the snapshot
// version if the site is a /v/<version>/ snapshot. Fills the pulldown from
// <site root>/v/versions.json and navigates to the same page in the chosen
// version. Without versions.json (a PR preview, a local build) the pulldown
// shows this build's version alone.
const SCRIPT = `
(function () {
  var sel = document.getElementById('version-select'); if (!sel) return;
  var path = location.pathname, i = path.lastIndexOf('/rfcs/');
  var root = i >= 0 ? path.slice(0, i + 1) : path.replace(/[^/]*$/, '');
  var m = root.match(/^(.*\\/)v\\/([^/]+)\\/$/), siteRoot = m ? m[1] : root, here = m ? m[2] : 'latest';
  var page = path.slice(path.lastIndexOf('/') + 1) || 'index.html';
  function fill(list, latest) {
    sel.innerHTML = '';
    var opts = [['latest', 'latest · ' + latest + ' (main)']].concat(list.map(function (v) { return [v, 'v' + v + ' snapshot']; }));
    opts.forEach(function (o) { var e = document.createElement('option'); e.value = o[0]; e.textContent = o[1]; if (o[0] === here) e.selected = true; sel.appendChild(e); });
    if (here !== 'latest' && !list.includes(here)) { var e = document.createElement('option'); e.value = here; e.textContent = 'v' + here + ' snapshot'; e.selected = true; sel.appendChild(e); }
  }
  fetch(siteRoot + 'v/versions.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
    if (j && j.versions) fill(j.versions, j.latest || sel.dataset.version);
  }).catch(function () {});
  sel.addEventListener('change', function () {
    var v = sel.value, target = v === 'latest' ? siteRoot : siteRoot + 'v/' + v + '/';
    location.href = target + 'rfcs/' + page + location.hash;
  });
})();
`

function template(page, body) {
  const pages = PAGES.map((p) => `<a href="${p.html}"${p === page ? ' aria-current="page"' : ''}>${p.nav}</a>`).join('')
  const demos = DEMOS.map((d) => `<a href="../${d.href}">${d.label}</a>`).join('')
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)} · Portal</title>
<meta name="description" content="The maintainers' response to the Portal RFCs: what each asks, what's built, and the tracks of work and versions that answer them.">
<style>${CSS}</style>
</head>
<body>
<header class="top"><div class="row">
  <a class="brand" href="index.html">Portal <small>RFC responses</small></a>
  <nav class="pages" aria-label="Pages">${pages}</nav>
  <nav class="demos" aria-label="Demos"><span class="k">Demos</span>${demos}</nav>
  <div class="right">
    <span class="version" id="version-wrap"><select id="version-select" data-version="${esc(version)}" aria-label="Version"><option value="latest" selected>portal-netgl ${esc(version)}</option></select></span>
    <a href="${GITHUB}">GitHub</a>
  </div>
</div></header>
<main class="doc">
${body}
</main>
<footer>Built from <a href="${GITHUB}/tree/main/docs/rfcs/responses">docs/rfcs/responses</a> at portal-netgl ${esc(version)}. Each release keeps a snapshot of these pages and the demos under <code>v/&lt;version&gt;/</code>; the pulldown in the header switches between them.</footer>
<script>${SCRIPT}
(function () { var p = location.pathname; if (/\\/v\\/[^/]+\\/rfcs\\//.test(p)) document.getElementById('version-wrap').classList.add('snapshot'); })();
</script>
</body>
</html>
`
}

mkdirSync(join(out, 'img'), { recursive: true })
for (const page of PAGES) {
  const md = readFileSync(join(src, page.md), 'utf8')
  writeFileSync(join(out, page.html), template(page, marked.parse(md)))
}
// The infographics, stamped with this build's version.
execFileSync(process.execPath, [join(src, 'img/generate.mjs'), '--out', join(out, 'img')], { stdio: 'inherit' })
for (const f of readdirSync(join(src, 'img'))) if (f.endsWith('.svg')) { /* generated above */ }
console.log(`rfc site: ${PAGES.length} pages at ${out} (portal-netgl ${version})`)
