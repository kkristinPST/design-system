// Re-derive the icon inventory and its geometry from a checkout of the source
// application. Run this after the app adds or drops an icon.
//
//   node packages/tokens/scripts/sync-icons.mjs <path-to-app> [path-to-lucide.min.js]
//
// It reports the delta against what is currently committed and writes nothing
// unless --write is passed, so it is safe to run as a check (and in CI).
//
// Why a script and not a one-off audit: the icons page is the one page whose
// content is a census of the application rather than a decision about it. A
// census goes stale silently — an icon added to a new screen does not break
// anything here, it just quietly stops being documented. This turns "is the
// list still complete?" into a command.
//
// What it does NOT do: choose the grouping. `iconGroups` in src/icons.ts carries
// a human-authored group and note per icon, and that judgement is the value of
// the page. New names are reported for you to place; removed names are reported
// for you to delete.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SRC = join(HERE, '..', 'src', 'icons.ts')
const GEOM = join(HERE, '..', '..', '..', 'apps', 'docs', 'components', 'lucide-geometry.ts')

const args = process.argv.slice(2)
const write = args.includes('--write')
const [appRoot, lucidePath] = args.filter((a) => !a.startsWith('--'))

if (!appRoot) {
  console.error('usage: node sync-icons.mjs <path-to-app> [path-to-lucide.min.js] [--write]')
  process.exit(2)
}

// ── 1. what the app uses ─────────────────────────────────────────────────────
// Only the surfaces that ship: lib, screens and mobile. Not the design-system
// folder inside the project (it documents rather than renders) and not the
// case-study or handoff copies, which are snapshots and would resurrect names
// the app has already dropped.
const SURFACES = ['lib', 'screens', 'mobile']
const CODE = new Set(['.jsx', '.js'])

function walk(dir, out = []) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const e of entries) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (CODE.has(extname(p))) out.push(p)
  }
  return out
}

const files = SURFACES.flatMap((s) => walk(join(appRoot, s)))
if (!files.length) {
  console.error(`no ${SURFACES.join('/')} sources found under ${appRoot}`)
  process.exit(2)
}

const counts = new Map()
for (const f of files) {
  const text = readFileSync(f, 'utf8')
  for (const m of text.matchAll(/name="([a-z0-9-]+)"/g)) {
    counts.set(m[1], (counts.get(m[1]) ?? 0) + 1)
  }
}

// ── 2. what we currently document ────────────────────────────────────────────
const srcText = readFileSync(SRC, 'utf8')
const documented = new Map(
  [...srcText.matchAll(/\{ name: '([a-z0-9-]+)', count: (\d+) \}/g)].map((m) => [
    m[1],
    Number(m[2]),
  ]),
)

const used = new Set(counts.keys())
const added = [...used].filter((n) => !documented.has(n)).sort()
const removed = [...documented.keys()].filter((n) => !used.has(n)).sort()
const moved = [...used]
  .filter((n) => documented.has(n) && documented.get(n) !== counts.get(n))
  .sort()

console.log(`app icons: ${used.size}   documented: ${documented.size}`)
console.log(`  added:   ${added.length ? added.join(', ') : 'none'}`)
console.log(`  removed: ${removed.length ? removed.join(', ') : 'none'}`)
console.log(`  count changed: ${moved.length}`)

if (added.length) {
  console.log('\nPlace each new name in a group in src/icons.ts, then re-run with --write.')
}

// ── 3. refresh the counts (never the grouping) ───────────────────────────────
if (write) {
  let next = srcText
  for (const n of moved) {
    next = next.replace(
      new RegExp(`\\{ name: '${n}', count: \\d+ \\}`),
      `{ name: '${n}', count: ${counts.get(n)} }`,
    )
  }
  writeFileSync(SRC, next)
  console.log(`\nsrc/icons.ts: refreshed ${moved.length} count(s)`)

  if (lucidePath) {
    const geom = extractGeometry(readFileSync(lucidePath, 'utf8'), used)
    writeFileSync(GEOM, renderGeometry(geom))
    console.log(`lucide-geometry.ts: ${Object.keys(geom).length} glyph(s)`)
  } else {
    console.log('lucide-geometry.ts: unchanged (no lucide build passed)')
  }
}

const drift = added.length + removed.length
if (!write && drift) process.exit(1)

// ── lucide extraction ────────────────────────────────────────────────────────
// The UMD build stores each icon as `VAR=["svg",<sharedAttrs>,[ ...children ]]`
// and a frozen PascalName -> VAR map at the end. Names are kebab-cased with a
// separator before digits too, so BarChart2 is bar-chart-2.
function extractGeometry(text, wanted) {
  const matchBracket = (s, start) => {
    let depth = 0
    for (let j = start; j < s.length; j++) {
      const c = s[j]
      if (c === '[') depth++
      else if (c === ']') {
        if (--depth === 0) return j
      } else if (c === '"' || c === "'") {
        const q = c
        j++
        while (j < s.length && s[j] !== q) {
          if (s[j] === '\\') j++
          j++
        }
      }
    }
    return -1
  }

  const defs = new Map()
  for (const m of text.matchAll(/([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*\[\s*"svg"\s*,/g)) {
    const open = text.indexOf('[', m.index)
    const close = matchBracket(text, open)
    if (close === -1) continue
    const whole = text.slice(open, close + 1)
    const kidOpen = whole.indexOf('[', whole.indexOf(',', whole.indexOf(',') + 1))
    defs.set(m[1], whole.slice(kidOpen, matchBracket(whole, kidOpen) + 1))
  }

  const i = text.indexOf('Object.freeze({__proto__:null,')
  const map = text.slice(i, text.indexOf('})', i))
  const kebab = (p) =>
    p.replace(/(?<=[a-z])(?=[A-Z])/g, '-').replace(/(?<=[A-Za-z])(?=[0-9])/g, '-').toLowerCase()

  const out = {}
  for (const m of map.matchAll(/([A-Z][A-Za-z0-9]*):([A-Za-z_$][A-Za-z0-9_$]*)/g)) {
    const name = kebab(m[1])
    if (!wanted.has(name) || out[name]) continue
    const raw = defs.get(m[2])
    if (!raw) continue
    out[name] = JSON.parse(raw.replace(/([{,])\s*([A-Za-z_][A-Za-z0-9_-]*)\s*:/g, '$1"$2":'))
  }

  const missing = [...wanted].filter((n) => !out[n])
  if (missing.length) {
    console.error(`\nNOT FOUND in the lucide build: ${missing.join(', ')}`)
    console.error('These render as nothing in the app too — the lookup returns null silently.')
    process.exitCode = 1
  }
  return out
}

function renderGeometry(geom) {
  const body = Object.keys(geom)
    .sort()
    .map((name) => {
      const nodes = geom[name]
        .map(
          ([tag, attrs]) =>
            `[${JSON.stringify(tag)}, { ${Object.entries(attrs)
              .map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(String(v))}`)
              .join(', ')} }]`,
        )
        .join(', ')
      return `  ${JSON.stringify(name)}: [${nodes}],`
    })
    .join('\n')

  return `// GENERATED by packages/tokens/scripts/sync-icons.mjs — do not edit by hand.
//
// Outline geometry for the icons in \`iconGroups\` (@njord/tokens), extracted from
// the exact lucide build the source application vendors. Kept as data rather than
// pulled from a CDN so the reference cannot drift from the app and the docs site
// stays static.
//
// Each entry is a list of [element, attributes] pairs to render inside an
// <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
// stroke-linecap="round" stroke-linejoin="round">.

export type IconNode = readonly [string, Readonly<Record<string, string>>]

export const iconGeometry: Readonly<Record<string, readonly IconNode[]>> = {
${body}
}
`
}
