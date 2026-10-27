// Writes v/versions.json for the Pages site: the version this deploy builds
// (latest), every snapshot that exists or is being made, newest first, and
// what docs/rfcs/responses/history.json knows about each (its date, label,
// which demos it has, whether it has the docs site), for the pulldowns.
//
//   node scripts/write-versions.mjs <latest> [<snapshot>...] > dist-versions/versions.json

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const [latest, ...rest] = process.argv.slice(2)
if (!latest) { console.error('usage: write-versions.mjs <latest> [snapshots...]'); process.exit(1) }
const here = dirname(fileURLToPath(import.meta.url))
let history = []
try { history = JSON.parse(readFileSync(join(here, '../docs/rfcs/responses/history.json'), 'utf8')).versions } catch { /* no history beside this script: labels only */ }

const parse = (v) => v.split(/[.-]/).map((p) => (/^\d+$/.test(p) ? Number(p) : p))
const cmp = (a, b) => { const x = parse(a), y = parse(b); for (let i = 0; i < Math.max(x.length, y.length); i++) { const d = (y[i] ?? -1) > (x[i] ?? -1) ? 1 : (y[i] ?? -1) < (x[i] ?? -1) ? -1 : 0; if (d) return d } return 0 }
const versions = [...new Set([latest, ...rest.filter((v) => /^\d+\.\d+\.\d+/.test(v))])].sort(cmp)
const meta = {}
for (const v of versions) {
  const h = history.find((e) => e.version === v)
  if (h) meta[v] = { date: h.date, label: h.label, demos: h.demos, docs: h.docs === true || v === latest, reconstructed: v !== latest && h.docs !== true }
}
process.stdout.write(JSON.stringify({ latest, versions, meta, updated: new Date().toISOString() }, null, 2) + '\n')
