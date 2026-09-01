import { radii as radiiTokens, elevation } from '@njord/tokens'

// Both scales come from the token package. Names are shown without a prefix —
// add --njord- for Ignition, --radius- / --shadow- for the web build.
const SHADOW_USE: Record<string, string> = {
  sm:   'Secondary buttons, active segment, mobile cards',
  base: 'Cards and KPI tiles',
  md:   'Popovers, standalone panels',
  lg:   'Dialogs, sheets, toasts, dropdowns',
}

const RADIUS_USE: Record<string, string> = {
  sm:   'Badges, state tags, small chips',
  md:   'Buttons, inputs, selects, nav items',
  lg:   'Cards, dialogs, panels',
  xl:   'Mobile cards and tiles',
  pill: 'Filter chips, count badges, status pills',
}

const shadows = Object.entries(elevation).map(([step, css]) => ({
  token: `shadow-${step}`,
  ignition: step === 'base' ? 'njord-shadow' : `njord-shadow-${step}`,
  css,
  use: SHADOW_USE[step] ?? '',
}))

const radii = Object.entries(radiiTokens).map(([step, value]) => ({
  token: `radius-${step}`,
  ignition: `njord-r-${step}`,
  px: Number.parseInt(value, 10),
  use: RADIUS_USE[step] ?? '',
}))

const mobileRadii = [
  ['Card / tile', '16px'],
  ['Alarm row', '14px'],
  ['Button', '14px'],
  ['Input / icon button', '12px'],
  ['Segmented track', '12px'],
  ['Active segment', '9px'],
  ['Bottom sheet', '22px top'],
  ['Centred confirm', '20px'],
]

export default function ElevationAndRadiiPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Foundations</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Elevation &amp; radii</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        Four shadow steps and five radii. Elevation is restrained by design: this is a control room
        interface, and a stack of floating panels makes it harder to tell what is live from what is
        a menu.
      </p>

      {/* ── Elevation ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Elevation</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {shadows.map(({ token, ignition, css, use }) => (
          <div key={token} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="h-16 rounded-lg border border-slate-200 bg-white" style={{ boxShadow: css }} />
            <p className="mt-4 font-mono text-xs font-semibold text-primary-text">{token}</p>
            <p className="font-mono text-[10px] text-slate-400">{ignition}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{use}</p>
            <p className="mt-1.5 font-mono text-[10px] leading-snug text-slate-400">{css}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-[color-mix(in_srgb,var(--color-warning)_28%,transparent)] bg-warning-bg px-4 py-3 text-[12px] leading-relaxed text-warning-text">
        The legacy skin sets <code className="font-mono">--shadow-sm</code> and{' '}
        <code className="font-mono">--shadow</code> to <code className="font-mono">none</code> and
        leans on heavier borders instead. Never hard-code a shadow value — read it from the token,
        or cards will float in a skin that is meant to be flat.
      </div>

      {/* ── Radii ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Radii</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {radii.map(({ token, ignition, px, use }) => (
          <div key={token} className="flex flex-wrap items-center gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0">
            <span
              className="h-11 w-16 shrink-0 border border-slate-300 bg-slate-100"
              style={{ borderRadius: px === 999 ? 999 : px }}
            />
            <span className="w-[104px] shrink-0"><span className="block font-mono text-xs font-semibold text-primary-text">{token}</span><span className="block font-mono text-[10px] text-slate-400">{ignition}</span></span>
            <span className="w-12 shrink-0 font-mono text-xs text-slate-400 tabular-nums">
              {px === 999 ? '999' : `${px}px`}
            </span>
            <span className="text-[13px] text-slate-600">{use}</span>
          </div>
        ))}
      </div>

      {/* ── Mobile ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Mobile radii</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        The phone build runs softer than desktop across the board — a 16px card against desktop&rsquo;s
        12px — because the surfaces are larger relative to the viewport.
      </p>
      <div className="mt-5 grid gap-x-8 gap-y-0 sm:grid-cols-2">
        {mobileRadii.map(([l, v]) => (
          <div key={l} className="flex items-baseline justify-between border-b border-slate-100 py-2.5">
            <span className="text-[13px] text-slate-600">{l}</span>
            <span className="font-mono text-xs text-ink tabular-nums">{v}</span>
          </div>
        ))}
      </div>

      {/* ── Layering ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Layer order</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {[
          ['Base content', '—', 'Cards, tables, mimics'],
          ['Drawer scrim', '150', 'rgba(15,24,43,0.32) — lighter, list stays readable'],
          ['Drawer', '151', 'Right panel, min(440px, 94vw)'],
          ['Dialog scrim', '2000', 'rgba(15,24,43,0.46) — heavier, demands a decision'],
          ['Command palette', '200', 'rgba(15,24,43,0.45)'],
          ['Mobile sheet', '90', 'rgba(15,24,43,0.40)'],
          ['Toast', '80', 'Above content, below any scrim'],
        ].map(([l, z, note]) => (
          <div key={l} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-slate-100 px-5 py-3 last:border-b-0">
            <span className="w-[124px] shrink-0 text-[13px] font-semibold text-ink">{l}</span>
            <span className="w-12 shrink-0 font-mono text-xs text-slate-400 tabular-nums">{z}</span>
            <span className="text-[13px] text-slate-600">{note}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              A drawer&rsquo;s scrim is lighter than a dialog&rsquo;s. The drawer is context — the list
              behind it must stay legible; the dialog is an interruption.
            </>,
            <>
              Shadow indicates layer, never emphasis. A card is not more important because it floats
              higher.
            </>,
            <>
              Radii scale <em>with the surface</em>: a 6px badge inside a 12px card inside a 12px
              dialog. Nesting a larger radius inside a smaller one always looks wrong.
            </>,
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
