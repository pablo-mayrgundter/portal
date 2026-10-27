// Marks a reconstructed snapshot of the site: appends a small fixed banner
// to every index.html under <dist> saying which version and commit it was
// rebuilt from, with a pulldown to the other versions (from <site>/v/
// versions.json, as the docs' header and the demos' drawer) and a link to
// the docs at latest. Old demos predate the drawer's pulldown, so without
// this a visitor to /v/0.2.0/ has no way back.
//
//   node scripts/inject-version-banner.mjs <dist> <version> <sha> <date>

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const [dist, version, sha, date] = process.argv.slice(2)
if (!dist || !version) { console.error('usage: inject-version-banner.mjs <dist> <version> <sha> <date>'); process.exit(1) }
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

const banner = `
<!-- portal version banner: this is a snapshot rebuilt from ${esc(sha)} (${esc(date)}) -->
<style>
#portal-version-banner { position: fixed; left: 12px; bottom: 12px; z-index: 1002; display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 9px; background: rgba(8, 11, 19, 0.88); border: 1px solid rgba(154, 140, 255, 0.45); color: #d8e7ff; font: 12px/1.3 Inter, system-ui, sans-serif; box-shadow: 0 2px 12px rgba(0,0,0,.35); }
#portal-version-banner b { color: #c9bfff; font-weight: 600; }
#portal-version-banner select { max-width: 40vw; text-overflow: ellipsis; font: 600 12px Inter, system-ui, sans-serif; color: #d8e7ff; background: rgba(154, 140, 255, 0.14); border: 1px solid rgba(154, 140, 255, 0.5); border-radius: 7px; padding: 3px 6px; cursor: pointer; }
#portal-version-banner a { color: #b7a9ff; text-decoration: underline; text-underline-offset: 2px; }
#portal-version-banner .pvb-note { color: #8fa7c4; }
@media (max-width: 600px) { #portal-version-banner .pvb-note { display: none; } }
</style>
<div id="portal-version-banner" role="region" aria-label="Site version">
  <b>portal-netgl ${esc(version)}</b>
  <span class="pvb-note">snapshot rebuilt from ${esc(sha)}, ${esc(date)}</span>
  <select id="portal-version-banner-select" aria-label="Other versions"><option value="" selected>versions…</option></select>
  <a id="portal-version-banner-docs" href="#" target="_blank" rel="noopener">docs ↗</a>
</div>
<script>
(function () {
  var path = location.pathname, m = path.match(/^(.*\\/)v\\/([^/]+)\\/(.*)$/);
  if (!m) return;
  var siteRoot = m[1], here = m[2], rest = m[3];
  var sel = document.getElementById('portal-version-banner-select'), demosOf = {};
  document.getElementById('portal-version-banner-docs').href = siteRoot + 'rfcs/';
  fetch(siteRoot + 'v/versions.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
    if (!j || !j.versions) return;
    var meta = j.meta || {};
    var add = function (value, text, selected) { var o = document.createElement('option'); o.value = value; o.textContent = text; o.selected = !!selected; sel.appendChild(o); };
    sel.innerHTML = '';
    add('latest', 'latest · ' + (j.latest || 'main'));
    j.versions.forEach(function (v) { var mm = meta[v] || {}; if (mm.demos) demosOf[v] = mm.demos; add(v, 'v' + v + (mm.date ? ' · ' + mm.date : ''), v === here); });
    if (!meta[here] && j.versions.indexOf(here) < 0) add(here, 'v' + here, true);
  }).catch(function () {});
  sel.addEventListener('change', function () {
    var v = sel.value; if (!v) return;
    var target = v === 'latest' ? siteRoot : siteRoot + 'v/' + v + '/';
    // The same demo in the chosen version when it has it, else that version's root.
    var demo = rest.replace(/[^/]*$/, ''), key = demo.replace(/\\/$/, '') || 'three';
    location.href = target + (demosOf[v] && demosOf[v].indexOf(key) < 0 ? '' : demo);
  });
})();
</script>
`

const walk = (dir, out = []) => { for (const f of readdirSync(dir)) { const p = join(dir, f); if (statSync(p).isDirectory()) walk(p, out); else if (f === 'index.html') out.push(p) } return out }
let n = 0
for (const file of walk(dist)) {
  const html = readFileSync(file, 'utf8')
  if (html.includes('portal-version-banner')) continue
  writeFileSync(file, html.includes('</body>') ? html.replace('</body>', banner + '</body>') : html + banner)
  n++
}
console.log(`version banner (${version}, ${sha}) added to ${n} page(s) under ${dist}`)
