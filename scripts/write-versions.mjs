// Writes v/versions.json for the Pages site: the version this deploy builds
// (latest) and every snapshot that exists or is being made, newest first.
//
//   node scripts/write-versions.mjs <latest> [<snapshot>...] > dist-versions/versions.json

const [latest, ...rest] = process.argv.slice(2)
if (!latest) { console.error('usage: write-versions.mjs <latest> [snapshots...]'); process.exit(1) }
const parse = (v) => v.split(/[.-]/).map((p) => (/^\d+$/.test(p) ? Number(p) : p))
const cmp = (a, b) => { const x = parse(a), y = parse(b); for (let i = 0; i < Math.max(x.length, y.length); i++) { const d = (y[i] ?? -1) > (x[i] ?? -1) ? 1 : (y[i] ?? -1) < (x[i] ?? -1) ? -1 : 0; if (d) return d } return 0 }
const versions = [...new Set([latest, ...rest.filter((v) => /^\d+\.\d+\.\d+/.test(v))])].sort(cmp)
process.stdout.write(JSON.stringify({ latest, versions, updated: new Date().toISOString() }, null, 2) + '\n')
