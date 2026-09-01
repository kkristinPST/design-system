import Link from 'next/link'

import { palette, status, severity, fluids, scada, skins, skinList, allTokens } from '@njord/tokens'
import { asset } from '../../../components/asset'

/** The token name, rendered the way a developer types it. */
function Name({ children }: { children: string }) {
  return (
    <span className="font-mono text-[10px] leading-tight text-primary-text">{children}</span>
  )
}

function Hex({ children }: { children: string }) {
  return <span className="font-mono text-[10px] uppercase text-slate-400">{children}</span>
}

function Swatch({
  hex,
  token,
  label,
  note,
}: {
  hex: string
  /** Token name without the prefix — e.g. `slate-800`. */
  token: string
  label?: string
  note?: string
}) {
  return (
    <div className="shrink-0">
      <div
        className="h-14 w-full rounded-md border border-slate-200"
        style={{ backgroundColor: hex }}
      />
      <p className="mt-1.5 text-[11px] font-semibold text-ink">{label ?? token}</p>
      <Name>{token}</Name>
      <p className="mt-0.5">
        <Hex>{hex}</Hex>
      </p>
      {note && <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{note}</p>}
    </div>
  )
}

const slateSteps: [string, string, string][] = [
  ['ink', palette.slate.ink, 'Sidebar, primary buttons, bulk bar'],
  ['slate-800', palette.slate[800], 'Active nav, raised chrome'],
  ['slate-700', palette.slate[700], 'Avatar'],
  ['slate-600', palette.slate[600], 'Body text'],
  ['slate-500', palette.slate[500], 'Secondary text'],
  ['slate-400', palette.slate[400], 'Muted text — AA on tints'],
  ['slate-350', palette.slate[350], 'Dots & hairlines only'],
  ['slate-300', palette.slate[300], 'Strong borders'],
  ['slate-200', palette.slate[200], 'Default borders'],
  ['slate-100', palette.slate[100], 'Hover fills'],
  ['slate-50', palette.slate[50], 'Page background'],
  ['white', palette.white, 'Card and panel surface'],
  ['black', palette.black, 'Reserved — almost never used'],
]

const brand: [string, string, string][] = [
  ['primary', palette.primary, 'Links, focus, selection'],
  ['success', palette.success, 'Indicator only — never text'],
  ['warning', palette.warning, 'High priority'],
  ['critical', palette.critical, 'Critical priority'],
  ['medium', palette.medium, 'Medium priority — its own hue'],
]

/** Every status, every member — derived, so a new member cannot go unshown. */
const tintRows = Object.entries(status).map(([name, members]) => ({
  name,
  members: Object.entries(members) as [string, string][],
}))

const scadaRows: [string, string, string][] = [
  ['sc-run', scada.run, 'Running / open — energised'],
  ['sc-stop', scada.stop, 'Stopped / closed — de-energised'],
  ['sc-abnormal', scada.abnormal, 'In alarm — the only saturated one'],
  ['sc-pipe', scada.pipe, 'Connector pipes'],
  ['sc-line', scada.line, 'Thin rules and leaders'],
  ['sc-edge', scada.edge, 'Symbol outlines'],
  ['sc-node', scada.node, 'Value node fill'],
  ['sc-halo', scada.halo, 'Halo behind a node on dark'],
  ['sc-vessel', scada.vessel, 'Tank and vessel walls'],
  ['sc-water', scada.water, 'Liquid level fill'],
  ['sc-fill-lite', scada.fillLite, 'Light equipment fill'],
  ['sc-cabinet', scada.cabinet, 'Cabinet body'],
  ['sc-cabinet-edge', scada.cabinetEdge, 'Cabinet outline'],
]

/** Alias names carry no `color-` prefix — they live on :root, not in @theme. */
const ALIAS = new Set([
  'background',
  'foreground',
  'surface',
  'surface-2',
  'fg',
  'fg-muted',
  'fg-subtle',
])

const aliasRows: [string, string, string][] = [
  ['background', skins.modern.tokens.background, 'The page itself'],
  ['surface', skins.modern.tokens.surface, 'A raised card or panel'],
  ['surface-2', skins.modern.tokens['surface-2'], 'A recessed strip — table header, well'],
  ['fg', skins.modern.tokens.fg, 'Primary text'],
  ['fg-muted', skins.modern.tokens['fg-muted'], 'Secondary text'],
  ['fg-subtle', skins.modern.tokens['fg-subtle'], 'Tertiary and meta text'],
]

/**
 * The modern value of any token, keyed by web name without the leading `--`.
 * Most live in the base theme; the seven aliases are declared by the modern
 * skin itself, so it is layered on top.
 */
const modernValue = new Map(allTokens().map((t) => [t.web.slice(2), t.value]))
for (const [key, value] of Object.entries(skins.modern.tokens)) modernValue.set(key, value)

/** What each non-default skin re-points, derived from the skin definitions. */
const reskins = skinList.slice(1).map((skin) => ({
  name: skin.name,
  selector: skin.selector,
  rows: Object.entries(skin.tokens)
    .filter(([key]) => ALIAS.has(key) || key.startsWith('color-'))
    .map(([key, value]) => ({
      token: key.replace(/^color-/, ''),
      from: modernValue.get(key) ?? null,
      to: value,
    })),
}))

function Chip({ hex }: { hex: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-3.5 w-3.5 shrink-0 rounded-sm border border-slate-200 align-middle"
      style={{ background: hex }}
    />
  )
}

export default function ColorPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Foundations</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Color</h1>
      <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-slate-500">
        A slate spine, one brand cyan, and a strictly-governed status ramp. Under ISA-101 colour is
        a scarce resource: it is spent on abnormal conditions, and almost nothing else. Every value
        on this page is on the page — 89 colour tokens, nothing held back.
      </p>

      {/* ── Naming ── */}
      <div className="mt-6 rounded-xl border border-slate-300 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-ink">How to reference one</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
          Each swatch below is labelled with its token name. Add the prefix for your build:
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Ignition Perspective
            </p>
            <p className="mt-1 font-mono text-[12px] text-ink">var(--njord-slate-800)</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Web build
            </p>
            <p className="mt-1 font-mono text-[12px] text-ink">var(--color-slate-800)</p>
          </div>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-slate-600">
          The six surface and text aliases are the exception — they carry no{' '}
          <span className="font-mono text-[11px]">color-</span> segment on the web (
          <span className="font-mono text-[11px]">var(--surface)</span>), because they are the layer
          a skin re-points. Never paste a hex from this page into a component; the hex is here so
          you can verify what you are looking at, not so you can type it.
        </p>
      </div>

      {/* ── Slate ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Slate ramp</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Blue-tinted, not pure gray. Two steps are special:{' '}
        <span className="font-mono text-xs">slate-400</span> was darkened from #90A1B9 so muted text
        clears AA on white <em>and</em> on the status tints it often sits on, and the old value
        survives as <span className="font-mono text-xs">slate-350</span> for decoration only.
      </p>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {slateSteps.map(([token, hex, note]) => (
          <Swatch key={token} token={token} hex={hex} note={note} />
        ))}
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
        The same eleven steps are also published as{' '}
        <span className="font-mono text-[11px]">neutral-0</span> …{' '}
        <span className="font-mono text-[11px]">neutral-1000</span> — a 1:1 alias of this ramp kept
        so older chrome keeps working. Prefer the slate names in new work; the two are identical
        values and there is no reason to mix them.
      </p>

      {/* ── Brand ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Brand &amp; semantic base</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        These are <strong>marks</strong> — fills for dots, rails and bars. None of them is a text
        colour. For text, use the matching <span className="font-mono text-xs">*-text</span> tint
        below.
      </p>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {brand.map(([token, hex, note]) => (
          <Swatch key={token} token={token} hex={hex} note={note} />
        ))}
      </div>

      {/* ── Tints ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Status tints</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Every status is a set: a <span className="font-mono text-xs">bg</span> fill, a{' '}
        <span className="font-mono text-xs">mid</span> border tone, and a{' '}
        <span className="font-mono text-xs">text</span> foreground that clears AA on that fill. Some
        also carry a <span className="font-mono text-xs">solid</span> for surfaces that must hold
        white text, or an <span className="font-mono text-xs">ink</span> for text sitting on the
        mark itself.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {tintRows.map(({ name, members }) => (
          <div key={name} className="border-b border-slate-200 px-4 py-3.5 last:border-b-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-[68px] shrink-0 text-[13px] font-semibold capitalize text-ink">
                {name}
              </span>
              <span
                className="inline-flex items-center rounded-sm px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.5px]"
                style={{ background: members.find(([m]) => m === 'bg')?.[1], color: members.find(([m]) => m === 'text')?.[1] }}
              >
                tint + text
              </span>
              {members.some(([m]) => m === 'mid') && (
                <span
                  className="inline-flex items-center rounded-sm border-2 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                  style={{ borderColor: members.find(([m]) => m === 'mid')?.[1] }}
                >
                  mid border
                </span>
              )}
              {members.some(([m]) => m === 'solid') && (
                <span
                  className="inline-flex items-center rounded-sm px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.5px] text-white"
                  style={{ background: members.find(([m]) => m === 'solid')?.[1] }}
                >
                  solid
                </span>
              )}
              {members.some(([m]) => m === 'ink') && (
                <span
                  className="inline-flex items-center rounded-sm px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.5px]"
                  style={{
                    background: palette.primary,
                    color: members.find(([m]) => m === 'ink')?.[1],
                  }}
                >
                  ink on mark
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {members.map(([member, hex]) => (
                <span key={member} className="inline-flex items-center gap-1.5">
                  <Chip hex={hex} />
                  <Name>{`${name}-${member}`}</Name>
                  <Hex>{hex}</Hex>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Severity ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Severity ramp</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Three columns, three jobs. <strong>Mark</strong> fills dots, rails and chart bars.{' '}
        <strong>Ink</strong> is the label colour when a number sits directly on that fill.{' '}
        <strong>Text</strong> is severity as a foreground on an ordinary surface.
      </p>
      <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <div className="min-w-[560px]">
          <div className="grid grid-cols-4 gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500">
            <span>Level</span>
            <span>Mark</span>
            <span>Number on fill</span>
            <span>As text</span>
          </div>
          {Object.entries(severity).map(([level, { mark, ink, text }]) => {
            const key = { critical: 'crit', high: 'high', medium: 'med', low: 'low', diagnostic: 'diag', ok: 'ok' }[
              level as keyof typeof severity
            ]
            return (
              <div
                key={level}
                className="grid grid-cols-4 items-start gap-3 border-b border-slate-200 px-4 py-3 last:border-b-0"
              >
                <span className="text-[13px] font-semibold capitalize text-ink">{level}</span>
                <span className="flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <span
                      className="h-[9px] w-[9px] rounded-full shadow-[0_0_0_1px_rgba(15,24,43,0.16)]"
                      style={{ background: mark }}
                    />
                    <Hex>{mark}</Hex>
                  </span>
                  <Name>{`sev-${key}`}</Name>
                </span>
                <span className="flex flex-col gap-1">
                  <span
                    className="inline-flex w-fit items-center rounded-sm px-2.5 py-1 font-mono text-xs font-bold tabular-nums"
                    style={{ background: mark, color: ink }}
                  >
                    42
                  </span>
                  <Name>{`sev-${key}-ink`}</Name>
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[13px] font-semibold" style={{ color: text }}>
                    Sample
                  </span>
                  <Name>{`sev-${key}-text`}</Name>
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <p className="mt-3 rounded-lg border border-[color-mix(in_srgb,var(--color-critical)_28%,transparent)] bg-critical-bg px-3.5 py-2.5 text-[12px] leading-relaxed text-critical-text">
        Never use a bare severity mark as text. <span className="font-mono">sev-crit</span> measures
        3.73:1 on white and <span className="font-mono">sev-high</span> only 2.06:1.
      </p>

      {/* ── Aliases ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Surface &amp; text aliases</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Six names that point at the ramp rather than declaring their own colour. They are the
        re-skin seam: chrome that reads <span className="font-mono text-xs">surface</span> and{' '}
        <span className="font-mono text-xs">fg</span> instead of{' '}
        <span className="font-mono text-xs">white</span> and{' '}
        <span className="font-mono text-xs">ink</span> follows every skin for free.
      </p>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {aliasRows.map(([token, hex, note]) => (
          <Swatch key={token} token={token} hex={hex} note={note} />
        ))}
      </div>
      <p className="mt-3 max-w-[68ch] text-[12px] leading-relaxed text-slate-500">
        These are a web-build convenience. The Ignition theme has no alias layer — there, a skin
        re-points the ramp steps themselves, which reaches the same result through the style
        classes. Either way you never reference a skin&rsquo;s value directly.
      </p>

      {/* ── Fluids ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Process fluids</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Pipe colours for SCADA mimics. Deliberately desaturated so alarm status still reads louder
        than any pipe; gases are dashed as well as coloured.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {Object.entries(fluids).map(([key, { color, label, dashed }]) => {
          const token = `fl-${{ process: 'proc', oxygen: 'o2', chemical: 'chem' }[key] ?? key}`
          return (
            <div key={key} className="flex items-center gap-3">
              <svg width="44" height="10" viewBox="0 0 44 10" aria-hidden className="shrink-0">
                <line
                  x1="1"
                  y1="5"
                  x2="43"
                  y2="5"
                  stroke={color}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={dashed ? '7 5' : undefined}
                />
              </svg>
              <span className="flex-1">
                <span className="block text-[13px] leading-tight text-slate-600">{label}</span>
                <Name>{token}</Name>
              </span>
              <Hex>{color}</Hex>
            </div>
          )
        })}
      </div>

      {/* ── SCADA ── */}
      <h2 className="mt-10 text-base font-bold text-ink">SCADA equipment</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        High-performance HMI: normal is neutral, and{' '}
        <span className="font-mono text-xs">sc-abnormal</span> is the only saturated symbol colour
        on a mimic. All thirteen, including the ones that only appear inside a symbol.
      </p>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {scadaRows.map(([token, hex, note]) => (
          <Swatch key={token} token={token} hex={hex} note={note} />
        ))}
      </div>

      {/* ── Skins ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Across the three skins</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Everything above is the <strong>modern</strong> skin, the default. The other two do not
        introduce new colours — they re-point names that already exist. These are the only colour
        tokens whose value changes, so anything not listed here is identical in all three.
      </p>
      {reskins.map(({ name, selector, rows }) => (
        <div key={name} className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-baseline gap-x-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
            <span className="text-[13px] font-semibold text-ink">{name}</span>
            <span className="font-mono text-[10px] text-slate-500">{selector}</span>
            <span className="ml-auto text-[11px] text-slate-500">{rows.length} tokens re-pointed</span>
          </div>
          {rows.map(({ token, from, to }) => (
            <div
              key={token}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-slate-100 px-4 py-2 last:border-b-0"
            >
              <span className="w-44 shrink-0">
                <Name>{token}</Name>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Chip hex={from ?? '#FFFFFF'} />
                <Hex>{from ?? '—'}</Hex>
              </span>
              <span aria-hidden className="text-slate-300">
                →
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Chip hex={to} />
                <Hex>{to}</Hex>
              </span>
            </div>
          ))}
        </div>
      ))}
      <p className="mt-3 max-w-[68ch] text-[12px] leading-relaxed text-slate-500">
        The dark skin ships inside the Ignition theme as{' '}
        <span className="font-mono text-[11px]">.njord-theme-dark</span>. Legacy is a web-build skin
        documented for reference — it recreates the classic HMI and also flattens radii and removes
        shadows. Full side-by-side previews are on{' '}
        <Link href="/styles/themes" className="font-semibold text-primary-text hover:underline">
          Themes
        </Link>
        .
      </p>

      <div className="mt-9 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        Every token on this page, plus type, radii and elevation, is in the theme file on{' '}
        <Link href="/styles/ignition" className="font-semibold text-primary-text hover:underline">
          Ignition Perspective
        </Link>
        , or as a flat map in{' '}
        <a
          href={asset('/downloads/tokens.json')}
          download
          className="font-semibold text-primary-text hover:underline"
        >
          tokens.json
        </a>
        .
      </div>
    </div>
  )
}
