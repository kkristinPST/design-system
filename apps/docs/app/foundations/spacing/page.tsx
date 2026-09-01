import Link from 'next/link'

import { spacing, layoutSpacing, clearance, shell, target } from '@njord/tokens'

// Both scales come from the token package, so a name shown here is a name that
// actually ships in the theme file.
const steps = Object.entries(spacing).map(([token, s]) => ({
  token,
  px: Number.parseInt(s.value, 10),
  use: s.use,
}))

const fluid = Object.entries(layoutSpacing).map(([token, s]) => ({
  token: `--${token}`,
  value: s.value,
  use: s.use,
}))

export default function SpacingPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Foundations</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Spacing</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        A 2px base unit for component-level spacing, and a fluid clamp scale for layout. The shell
        has no fixed width — gutters and gaps grow with the viewport so a 1920px monitor feels used
        rather than stretched.
      </p>

      {/* ── Scale ── */}
      <div className="mt-6 rounded-xl border border-slate-300 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-ink">Clearance is not spacing</p>
        <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-600">
          A few values are measured off a{' '}
          <strong className="font-semibold text-ink">neighbouring element</strong>, not off the
          scale. Each keeps content out of the lane something else occupies — the tab bar, a
          floating close button, the top of the viewport. Their value is dictated by that
          neighbour&rsquo;s size, so rounding them onto the ladder would break the very thing they
          exist to avoid.
        </p>
        <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {Object.entries(clearance).map(([token, c], i) => (
            <div
              key={token}
              className={`flex flex-wrap items-baseline gap-x-3 px-4 py-2.5 ${
                i > 0 ? 'border-t border-slate-100' : ''
              }`}
            >
              <span className="w-28 shrink-0 font-mono text-[11px] text-primary-text">{token}</span>
              <span className="w-36 shrink-0 font-mono text-xs text-slate-500">{c.value}</span>
              <span className="text-[13px] text-slate-600">{c.use}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-slate-600">
          They belong with the <code className="font-mono text-[11px]">env(safe-area-inset)</code>{' '}
          exemption, not with spacing steps — and they are named for what they clear, never for
          their number, so the name still reads true when the tab bar changes height. See{' '}
          <Link
            href="/patterns/empty-state"
            className="font-semibold text-primary-text hover:underline"
          >
            Empty &amp; loading states
          </Link>
          .
        </p>
      </div>

      <h2 className="mt-10 text-base font-bold text-ink">Fixed scale</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Each step is named for its pixel value — <span className="font-mono text-xs">sp-14</span>{' '}
        is 14px. Reference it as <span className="font-mono text-xs">var(--njord-sp-14)</span> in
        Perspective or <span className="font-mono text-xs">var(--sp-14)</span> on the web. The base
        is 2px rather than 4px because control interiors genuinely need 2, 6, 10 and 14: a
        segmented-control track, a badge, a button&rsquo;s optical padding. Forcing those onto a 4px
        grid makes chips and badges visibly fat.
      </p>
      <div className="mt-5 space-y-2">
        {steps.map(({ token, px, use }) => (
          <div key={token} className="flex items-center gap-4">
            <span className="w-16 shrink-0 text-right font-mono text-xs text-slate-400 tabular-nums">
              {px}px
            </span>
            <span className="h-5 shrink-0 rounded bg-ink" style={{ width: px }} />
            <span className="w-16 shrink-0 font-mono text-xs text-slate-400">{token}</span>
            <span className="text-[13px] text-slate-600">{use}</span>
          </div>
        ))}
      </div>

      {/* ── Fluid ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Fluid layout scale</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        These drive the shell. They are clamps, not breakpoints — the layout scales continuously
        instead of jumping at fixed widths.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {fluid.map(({ token, value, use }) => (
          <div key={token} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-slate-100 px-5 py-3.5 last:border-b-0">
            <span className="w-[76px] shrink-0 font-mono text-xs font-semibold text-ink">{token}</span>
            <span className="font-mono text-xs text-slate-500">{value}</span>
            <span className="ml-auto text-[13px] text-slate-600">{use}</span>
          </div>
        ))}
      </div>

      {/* ── Reflow ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Card fields reflow by column</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Grids use <code className="font-mono text-xs">auto-fit</code> with a real minimum, so they
        add and drop columns rather than shrinking their contents. This is what keeps density
        constant across screen sizes.
      </p>
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
        <pre className="overflow-x-auto rounded-md bg-ink px-4 py-3 font-mono text-[11px] leading-relaxed text-slate-300">
{`.kpi-row   { grid-template-columns: repeat(auto-fit, minmax(min(208px, 100%), 1fr)) }
.tank-row  { grid-template-columns: repeat(auto-fit, minmax(min(288px, 100%), 1fr)) }
.set-grid  { grid-template-columns: repeat(auto-fit, minmax(min(380px, 100%), 1fr)) }

/* a 4-up KPI row splits 2×2 rather than orphaning one card on a 3-wide row */
@media (max-width: 1180px) {
  .kpi-row:has(> :nth-child(4)):not(:has(> :nth-child(5))) {
    grid-template-columns: repeat(2, minmax(0, 1fr))
  }
}`}
        </pre>
      </div>

      {/* ── Mobile ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Mobile spacing</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        The phone build uses fixed values rather than clamps — the viewport range is narrow enough
        that fluid scaling buys nothing.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {[
          ['Screen gutter', '16px', 'Left and right padding on every screen'],
          ['Card stack gap', '12px', 'Between stacked cards'],
          ['Tile grid gap', '10px', 'Between vitals tiles'],
          ['Card padding', '16px', 'Vertical and horizontal inside a card'],
          ['Row height', '48px min', 'List rows, option rows'],
          ['Touch target', '44px min', 'Every interactive control (WCAG 2.5.5)'],
          ['Safe area', 'env(safe-area-inset-bottom)', 'Added to every bottom-anchored element'],
        ].map(([l, v, use]) => (
          <div key={l} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-slate-100 px-5 py-3.5 last:border-b-0">
            <span className="w-[124px] shrink-0 text-[13px] font-semibold text-ink">{l}</span>
            <span className="font-mono text-xs text-slate-500">{v}</span>
            <span className="ml-auto text-[13px] text-slate-600">{use}</span>
          </div>
        ))}
      </div>

      {/* ── Shell dimensions ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Shell dimensions</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Fixed sizes, not spacing steps. These are what the clearance values above are measured
        against — a gutter that clears the collapsed rail is 72px because the rail is 72px. Never
        round one of these onto the ladder.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {Object.entries(shell).map(([token, d], i) => (
          <div
            key={token}
            className={`flex flex-wrap items-baseline gap-x-3 px-4 py-2.5 ${
              i > 0 ? 'border-t border-slate-100' : ''
            }`}
          >
            <span className="w-52 shrink-0 font-mono text-[11px] text-primary-text">{token}</span>
            <span className="w-20 shrink-0 font-mono text-xs text-slate-500">{d.value}</span>
            <span className="text-[13px] text-slate-600">{d.use}</span>
          </div>
        ))}
      </div>

      {/* ── Target floor ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Minimum interactive target</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {Object.entries(target).map(([token, d], i) => (
          <div
            key={token}
            className={`flex flex-wrap items-baseline gap-x-3 px-4 py-2.5 ${
              i > 0 ? 'border-t border-slate-100' : ''
            }`}
          >
            <span className="w-52 shrink-0 font-mono text-[11px] text-primary-text">{token}</span>
            <span className="w-20 shrink-0 font-mono text-xs text-slate-500">{d.value}</span>
            <span className="text-[13px] text-slate-600">{d.use}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        <strong className="text-ink">WCAG 2.5.5 is about the target, not the ink.</strong> A
        compact control keeps its visual size and gains an invisible hit area around it — do not
        inflate a control&rsquo;s height to satisfy this, or every dense toolbar in the product
        grows. Implement it as a transparent pseudo-element that extends past the control&rsquo;s
        painted bounds.
      </div>

      {/* ── Rules ── */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              A card either owns its padding or hands it to a full-bleed child. Doing both
              double-pads the child and detaches its hairline from the card edge.
            </>,
            <>
              Divider &ldquo;lines&rdquo; inside wrapping grids are 1px <em>gaps</em> with a ring on
              each cell, so a wrapped row never shows an orphaned rule and an empty track still
              reads as card surface.
            </>,
            <>
              Horizontal overflow is contained inside the card that owns it. The page itself never
              scrolls sideways, and no column is ever hidden.
            </>,
            <>
              Compact density tightens padding and gaps across cards, KPIs and tables — and never
              shrinks a font or a hit target.
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
