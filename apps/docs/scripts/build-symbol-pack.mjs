/**
 * Builds the downloadable process-symbol pack: 41 static SVGs per theme, plus
 * the stylesheet and the SCADA token block, zipped into public/downloads.
 *
 * Why generate rather than commit the files: the same 41 symbols are already
 * drawn on this site by components/scada.tsx, coloured by tokens emitted from
 * packages/tokens. A committed copy is a second source that drifts, which is
 * exactly how the SCADA docs went wrong three times. So the path data is read
 * OUT of scada.tsx and the colours OUT of dist/tokens.css. Change either and
 * the pack changes with it; rename a symbol and this script fails the build.
 *
 * What is hand-held here is only the viewBox of each export, because a path
 * bounding box cannot be computed without a geometry library and these are
 * standalone atoms rather than the composed clusters the site draws.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { deflateRawSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const docs = join(here, '..')
const repo = join(docs, '..', '..')

const scadaTsx = readFileSync(join(docs, 'components', 'scada.tsx'), 'utf8')
const scadaCss = readFileSync(join(docs, 'app', 'scada.css'), 'utf8')
const tokensCss = readFileSync(join(repo, 'packages', 'tokens', 'dist', 'tokens.css'), 'utf8')

/* -- 1. tokens: one resolved map per theme -------------------------------- */

/**
 * Top-level blocks only, so the nested reduced-motion :root cannot win.
 *
 * Comments go first: tokens.css puts a banner comment above every block, and
 * without this the selector reads as the comment and no block ever matches.
 */
function topBlocks(source) {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, '')
  const out = []
  let depth = 0
  let selStart = 0
  let bodyStart = 0
  for (let i = 0; i < css.length; i++) {
    const c = css[i]
    if (c === '{') {
      if (depth === 0) bodyStart = i
      depth++
    } else if (c === '}') {
      depth--
      if (depth === 0) {
        out.push({ sel: css.slice(selStart, bodyStart).trim(), body: css.slice(bodyStart + 1, i) })
        selStart = i + 1
      }
    }
  }
  return out
}

function declsOf(body) {
  const map = new Map()
  for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) map.set(m[1], m[2].trim())
  return map
}

const blocks = topBlocks(tokensCss)
const BASE_SELECTORS = new Set([':root', '@theme', '@theme inline'])

function themeMap(themeSel) {
  const map = new Map()
  for (const b of blocks) {
    if (!BASE_SELECTORS.has(b.sel) && b.sel !== themeSel) continue
    for (const [k, v] of declsOf(b.body)) map.set(k, v)
  }
  return map
}

const THEMES = {
  light: themeMap(null),
  dark: themeMap('[data-theme="dark"]'),
  legacy: themeMap('[data-theme="legacy"]'),
}

/** Resolve var(--x) chains down to a literal. An unknown name is a build error. */
function resolve(value, map, seen = new Set()) {
  return value.replace(/var\((--[\w-]+)(?:\s*,\s*([^)]*))?\)/g, (_, name, fallback) => {
    if (seen.has(name)) throw new Error(`token cycle at ${name}`)
    const raw = map.get(name)
    if (raw === undefined) {
      if (fallback !== undefined) return fallback.trim()
      throw new Error(`unknown token ${name}`)
    }
    return resolve(raw, map, new Set([...seen, name])).trim()
  })
}

/* -- 2. geometry: lifted out of the components, never retyped ------------- */

function fnSource(name) {
  const at = scadaTsx.indexOf(`export function ${name}(`)
  if (at < 0) throw new Error(`scada.tsx no longer exports ${name}`)
  const end = scadaTsx.indexOf('\nexport ', at + 1)
  return scadaTsx.slice(at, end < 0 ? scadaTsx.length : end)
}

/** Every d="" inside one component, in source order. The count is the contract. */
function paths(name, expected) {
  const found = [...fnSource(name).matchAll(/\bd="([^"]+)"/g)].map((m) => m[1].replace(/\s+/g, ' ').trim())
  if (found.length !== expected) {
    throw new Error(`${name}: expected ${expected} path(s), found ${found.length} - pack definitions are stale`)
  }
  return found
}

const P = {
  pump: paths('SymPump', 2),
  fan: paths('SymFan', 2),
  motor: paths('SymMotor', 3),
  valve: paths('SymValve', 2),
  cone: paths('SymCone', 3),
  badge: paths('AbnormalRing', 2), // [critical triangle, medium/low diamond]
  supp: paths('SuppMark', 2), // [out-of-service wrench, blocked slash]
  lock: paths('ModeChip', 1),
  trendValue: paths('RD', 2),
  trendRun: paths('SymTrend', 1),
}

/* -- 3. the 41 exports ---------------------------------------------------- */

const SANS = 'var(--font-sans)'
const MONO = 'var(--font-mono)'

const el = (tag, attrs, children = '') => {
  const a = Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join('')
  return children ? `<${tag}${a}>${children}</${tag}>` : `<${tag}${a}/>`
}

const path = (d, attrs = {}) => el('path', { d, ...attrs })

/** The disc symbols share a box: the raw path extents, unscaled and untranslated. */
const DISC = '0 0 34 33'

const body = (running) => (running ? 'var(--color-sc-run)' : 'var(--color-sc-stop)')

function pumpOrFan(kind, running) {
  const [halo, disc] = P[kind]
  return {
    box: DISC,
    b: path(halo, { fill: 'var(--color-sc-fill-lite)' }) + path(disc, { fill: body(running) }),
  }
}

function motor(running) {
  const [ring, disc, bar] = P.motor
  return {
    box: '0 0 41 38',
    b:
      path(ring, { fill: 'var(--color-sc-edge)' }) +
      path(disc, { fill: body(running) }) +
      path(bar, { fill: 'var(--color-sc-edge)' }),
  }
}

function valve(open) {
  const common = {
    'fill-rule': 'evenodd',
    'clip-rule': 'evenodd',
    fill: body(open),
    stroke: 'var(--color-sc-edge)',
    'stroke-width': '0.926',
  }
  return { box: '0 0 21 32', b: P.valve.map((d) => path(d, common)).join('') }
}

function cone() {
  const [shell, lower, upper] = P.cone
  const ring = { fill: 'var(--color-sc-line)', stroke: 'var(--color-sc-edge)', 'stroke-width': '0.69' }
  return {
    box: '0 0 29 46',
    b:
      path(shell, {
        'fill-rule': 'evenodd',
        'clip-rule': 'evenodd',
        fill: 'var(--color-sc-vessel)',
        stroke: 'var(--color-sc-edge)',
        'stroke-width': '0.926',
      }) +
      path(lower, ring) +
      path(upper, ring),
  }
}

/** Colour AND shape carry priority; opacity alone carries acknowledgement. */
function badge(level, unack) {
  const crit = level === 'critical'
  const lo = level === 'medium-low'
  const fill = crit ? 'var(--color-sc-abnormal)' : lo ? 'var(--color-sc-alarm-lo)' : 'var(--color-warning)'
  const dot = { fill, stroke: '#FFFFFF', 'stroke-width': '1.4', 'stroke-linejoin': 'round' }
  const shape = crit ? path(P.badge[0], dot) : lo ? path(P.badge[1], dot) : el('circle', { r: 8, ...dot })
  const glyph = el(
    'text',
    {
      y: crit ? 5.6 : 3.8,
      'text-anchor': 'middle',
      'font-family': SANS,
      'font-size': 10,
      'font-weight': 700,
      fill: crit ? '#FFFFFF' : '#3D2C00',
    },
    '!',
  )
  return { box: '-11 -11 22 22', b: el('g', { opacity: unack ? undefined : 0.45 }, shape + glyph) }
}

function modeChip(mode) {
  const man = mode === 'M'
  const ink = man ? 'var(--color-sc-manual)' : 'var(--color-slate-600)'
  return {
    box: '0 0 17 17',
    b:
      el('rect', {
        x: 0,
        y: 0,
        width: 17,
        height: 17,
        rx: 3,
        fill: 'var(--color-sc-node)',
        stroke: man ? 'var(--color-sc-manual)' : 'var(--color-slate-300)',
        'stroke-width': '1.2',
      }) +
      el(
        'text',
        { x: 8.5, y: 12.5, 'text-anchor': 'middle', 'font-family': SANS, 'font-size': 12, 'font-weight': 800, fill: ink },
        mode,
      ),
  }
}

/** A locked-out machine has no meaningful Auto/Manual, so the chip becomes a lock. */
function eqOosChip() {
  const ink = 'var(--color-slate-600)'
  return {
    box: '0 0 17 17',
    b:
      el('rect', { x: 0, y: 0, width: 17, height: 17, rx: 3, fill: 'var(--color-sc-node)', stroke: ink, 'stroke-width': '1.2' }) +
      el(
        'g',
        {
          transform: 'translate(3,3) scale(0.46)',
          fill: 'none',
          stroke: ink,
          'stroke-width': '2.6',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        el('rect', { x: 3, y: 11, width: 18, height: 11, rx: 2 }) + path(P.lock[0]),
      ),
  }
}

const GASES = new Set(['o2', 'gas'])

function pipe(fluid) {
  return {
    box: '0 0 48 8',
    b: path('M2 4 H46', {
      fill: 'none',
      stroke: `var(--color-fl-${fluid})`,
      'stroke-width': '2.2',
      'stroke-linecap': 'round',
      'stroke-dasharray': GASES.has(fluid) ? '7 6' : undefined,
    }),
  }
}

/** A readout carries its own alarm on the box edge and the value, never a badge. */
function readout(kind) {
  const edge = {
    normal: { stroke: 'var(--color-slate-300)', 'stroke-width': '1.3' },
    high: { stroke: 'var(--color-warning)', 'stroke-width': '2.4' },
    critical: { stroke: 'var(--color-sc-abnormal)', 'stroke-width': '2.4' },
    suppressed: { stroke: 'var(--color-slate-600)', 'stroke-width': '1.3', 'stroke-dasharray': '3 2' },
  }[kind]
  const ink = {
    normal: 'var(--fg)',
    high: 'var(--color-warning-text)',
    critical: 'var(--color-critical-text)',
    suppressed: 'var(--fg)',
  }[kind]
  return {
    box: '0 0 66 25',
    b:
      el('rect', { x: 0.5, y: 0.5, width: 65, height: 24, rx: 4, fill: 'var(--color-sc-node)', ...edge }) +
      el(
        'text',
        { x: 33, y: 17, 'text-anchor': 'middle', 'font-family': MONO, 'font-size': 14, 'font-weight': 700, fill: ink },
        '42' + el('tspan', { 'font-size': 10, 'font-weight': 400, fill: 'var(--color-slate-400)' }, ' Hz'),
      ),
  }
}

/** Neutral, dashed and SQUARE: not healthy, and not an alarm either. */
function suppMark(kind) {
  const ink = 'var(--color-slate-600)'
  const icon = kind === 'oos' ? path(P.supp[0]) : el('circle', { cx: 12, cy: 12, r: 10 }) + path(P.supp[1])
  return {
    box: '-10 -10 20 20',
    b:
      el('rect', {
        x: -8,
        y: -8,
        width: 16,
        height: 16,
        rx: 3,
        fill: 'var(--color-sc-node)',
        stroke: ink,
        'stroke-width': '1.2',
        'stroke-dasharray': '2.5 1.8',
      }) +
      el(
        'g',
        {
          transform: 'translate(-5.5,-5.5) scale(0.46)',
          fill: 'none',
          stroke: ink,
          'stroke-width': '2.6',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        },
        icon,
      ),
  }
}

/** Cyan is interaction only. "on" means this tag is open on Trends. */
function trend(kind, on) {
  const run = kind === 'run'
  const bg = on
    ? { fill: 'var(--color-primary)', stroke: 'var(--color-primary)' }
    : { fill: run ? 'var(--surface)' : 'var(--color-sc-node)', stroke: 'var(--color-slate-300)' }
  const lineInk = on ? '#FFFFFF' : run ? 'var(--color-slate-600)' : 'var(--color-primary)'
  const glyph = run
    ? el('g', { transform: 'translate(-6.5,-5) scale(0.72)' }, path(P.trendRun[0]))
    : el('g', { transform: 'translate(-6.3,-5.6) scale(0.7)' }, P.trendValue.map((d) => path(d)).join(''))
  return {
    box: '-10 -10 20 20',
    b: el(
      'g',
      { opacity: run && !on ? 0.62 : undefined },
      el('rect', { x: -9, y: -9, width: 18, height: 18, rx: 4.5, 'stroke-width': '1.2', ...bg }) +
        el(
          'g',
          { fill: 'none', stroke: lineInk, 'stroke-width': run ? 2 : 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' },
          glyph,
        ),
    ),
  }
}

/** Multiplicity dots: green running, amber in service but stopped, grey locked out. */
function unitDot(kind) {
  const fill = {
    running: 'var(--color-success-solid)',
    'in-service-stopped': 'var(--color-warning-mid)',
    'out-of-service': 'var(--color-sc-stop)',
  }[kind]
  return {
    box: '0 0 13 13',
    b: el('circle', { cx: 6.5, cy: 6.5, r: 5.5, fill, stroke: 'var(--color-sc-edge)', 'stroke-width': 1 }),
  }
}

const EXPORTS = {
  'pump-running': pumpOrFan('pump', true),
  'pump-stopped': pumpOrFan('pump', false),
  'fan-running': pumpOrFan('fan', true),
  'fan-stopped': pumpOrFan('fan', false),
  'motor-running': motor(true),
  'motor-stopped': motor(false),
  'valve-open': valve(true),
  'valve-closed': valve(false),
  cone: cone(),
  'badge-critical-unack': badge('critical', true),
  'badge-critical-ack': badge('critical', false),
  'badge-high-unack': badge('high', true),
  'badge-high-ack': badge('high', false),
  'badge-medium-low-unack': badge('medium-low', true),
  'badge-medium-low-ack': badge('medium-low', false),
  'mode-auto': modeChip('A'),
  'mode-manual': modeChip('M'),
  'mode-equipment-oos': eqOosChip(),
  'readout-normal': readout('normal'),
  'readout-alarm-high': readout('high'),
  'readout-alarm-critical': readout('critical'),
  'readout-suppressed': readout('suppressed'),
  'supp-blocked': suppMark('blocked'),
  'supp-out-of-service': suppMark('oos'),
  'trend-value-idle': trend('value', false),
  'trend-value-on': trend('value', true),
  'trend-run-idle': trend('run', false),
  'trend-run-on': trend('run', true),
  'unit-running': unitDot('running'),
  'unit-in-service-stopped': unitDot('in-service-stopped'),
  'unit-out-of-service': unitDot('out-of-service'),
}
for (const f of ['proc', 'raw', 'drain', 'sludge', 'glycol', 'brine', 'chem', 'feed', 'o2', 'gas']) {
  EXPORTS[`pipe-${f}`] = pipe(f)
}

const NAMES = Object.keys(EXPORTS).sort()
if (NAMES.length !== 41) throw new Error(`expected 41 exports, built ${NAMES.length}`)

/* -- 4. render, with every var() resolved to a literal -------------------- */

function render(name, theme) {
  const { box, b } = EXPORTS[name]
  const [, , w, h] = box.split(/\s+/).map(Number)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${box}">${b}</svg>`
  return resolve(svg, THEMES[theme]) + '\n'
}

/* -- 5. zip, written by hand so the docs build needs no new dependency ---- */

let CRC_TABLE = null
function crc32(buf) {
  if (!CRC_TABLE) {
    CRC_TABLE = new Int32Array(256)
    for (let n = 0; n < 256; n++) {
      let c = n
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      CRC_TABLE[n] = c
    }
  }
  let c = -1
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ -1) >>> 0
}

/** Store or deflate, whichever is smaller: some of these files are 200 bytes. */
function zip(entries) {
  const locals = []
  const central = []
  let offset = 0
  for (const [name, text] of entries) {
    const raw = Buffer.from(text, 'utf8')
    const deflated = deflateRawSync(raw, { level: 9 })
    const useDeflate = deflated.length < raw.length
    const data = useDeflate ? deflated : raw
    const method = useDeflate ? 8 : 0
    const nameBuf = Buffer.from(name, 'utf8')
    const crc = crc32(raw)

    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4) // version needed to extract
    local.writeUInt16LE(0x800, 6) // flag bit 11: names are UTF-8
    local.writeUInt16LE(method, 8)
    local.writeUInt16LE(0, 10) // time, and below a fixed date (1980-01-01),
    local.writeUInt16LE(0x21, 12) // so a rebuild of the same input is byte-identical
    local.writeUInt32LE(crc, 14)
    local.writeUInt32LE(data.length, 18)
    local.writeUInt32LE(raw.length, 22)
    local.writeUInt16LE(nameBuf.length, 26)
    local.writeUInt16LE(0, 28)
    locals.push(local, nameBuf, data)

    const dir = Buffer.alloc(46)
    dir.writeUInt32LE(0x02014b50, 0)
    dir.writeUInt16LE(20, 4) // version made by
    dir.writeUInt16LE(20, 6)
    dir.writeUInt16LE(0x800, 8)
    dir.writeUInt16LE(method, 10)
    dir.writeUInt16LE(0, 12)
    dir.writeUInt16LE(0x21, 14)
    dir.writeUInt32LE(crc, 16)
    dir.writeUInt32LE(data.length, 20)
    dir.writeUInt32LE(raw.length, 24)
    dir.writeUInt16LE(nameBuf.length, 28)
    dir.writeUInt32LE(offset, 42)
    central.push(dir, nameBuf)

    offset += local.length + nameBuf.length + data.length
  }
  const centralBuf = Buffer.concat(central)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(entries.length, 8)
  end.writeUInt16LE(entries.length, 10)
  end.writeUInt32LE(centralBuf.length, 12)
  end.writeUInt32LE(offset, 16)
  return Buffer.concat([...locals, centralBuf, end])
}

/* -- 6. assemble ---------------------------------------------------------- */

const scadaTokenBlock = (() => {
  const wanted = (k) => k.startsWith('--color-sc-') || k.startsWith('--color-fl-')
  const section = (label, themeSel) => {
    const lines = []
    for (const b of blocks) {
      const take = themeSel === null ? BASE_SELECTORS.has(b.sel) : b.sel === themeSel
      if (!take) continue
      for (const [k, v] of declsOf(b.body)) if (wanted(k)) lines.push(`  ${k}: ${v};`)
    }
    return lines.length ? `${label} {\n${lines.join('\n')}\n}\n` : ''
  }
  return (
    '/* NJORD SCADA tokens: the --color-sc-* and --color-fl-* families only.\n' +
    '   Generated from packages/tokens; the full set is tokens.css on the site. */\n\n' +
    section(':root', null) +
    '\n' +
    section('[data-theme="dark"]', '[data-theme="dark"]') +
    '\n' +
    section('[data-theme="legacy"]', '[data-theme="legacy"]')
  )
})()

const README = `NJORD process symbols
=====================

41 symbols, exported once per theme with every colour resolved to a literal,
for Figma or anywhere CSS variables do not reach.

  svg/light/         the modern operations skin (default)
  svg/dark/          the dark skin
  svg/legacy/        the legacy skin
  scada.css          the .rasm-* rules, to render from live tokens instead
  tokens-scada.css   the --color-sc-* and --color-fl-* values, all three themes

If you can use CSS variables, prefer scada.css plus the site's tokens.css over
these flat files: one symbol then follows the theme instead of needing three.

The rules these symbols encode
------------------------------
Normal is neutral. Saturated colour on a mimic means abnormal.

The body fill says run or stop and NOTHING else. An alarm never recolours and
never outlines the symbol. The badge alone carries it.

Priority is colour AND shape, so the pair survives colour-blindness:
  critical      red triangle
  high          amber circle
  medium, low   yellow diamond

Acknowledgement is opacity only, never hue: 1.0 unacknowledged, 0.45 otherwise.
A hue change would read as a different alarm rather than the same one later.

Suppression, meaning the ALARM is deactivated, is a neutral dashed SQUARE with
a ban icon for blocked or a wrench for out of service. It must never look
healthy, because "we stopped listening" is not "nothing is wrong", and never
look like an alarm either.

Equipment out of service, meaning the MACHINE is locked out by the PLC, is a
separate axis: the symbol ghosts to 40% and a lock replaces the A/M mode chip.
A locked-out pump can still carry an alarm badge.

Cyan is interaction only: hover, focus, open on Trends. Never state.

Gases are dashed AND coloured. The legacy skin is monochrome by definition.

Cluster geometry
----------------
From the symbol centre (cx, cy), taken from the RAS lift pump:
  readout     x cx-33, y cy-48, 66x25
  mode chip   x cx-40, y cy-20
  badge       [cx-32, cy+9]
  run trend   cx+30
  tag         baseline cy+40, description lines +13 / +25
Fans sit their chip lower: chip cy-8, badge cy+26.

Generated from the design system, so do not hand-edit. The symbols on the site
and the files in here are built from the same source.
`

const entries = [
  ['njord-process-symbols/README.txt', README],
  ['njord-process-symbols/scada.css', scadaCss],
  ['njord-process-symbols/tokens-scada.css', scadaTokenBlock],
]
for (const theme of ['light', 'dark', 'legacy']) {
  for (const name of NAMES) {
    entries.push([`njord-process-symbols/svg/${theme}/${name}.svg`, render(name, theme)])
  }
}

const outDir = join(docs, 'public', 'downloads')
mkdirSync(outDir, { recursive: true })
const buf = zip(entries)
writeFileSync(join(outDir, 'njord-process-symbols.zip'), buf)

console.log(
  `docs: built njord-process-symbols.zip - ${NAMES.length} symbols x 3 themes ` +
    `+ 3 docs, ${entries.length} files, ${(buf.length / 1024).toFixed(1)} kB`,
)
