const densityChanges = [
  ['Table header / cell', '11px 14px', '6px 12px'],
  ['Table cell font', '14px (body)', '12px (small)'],
  ['Card header', '16px 20px', '11px 16px'],
  ['Card body', '18px 20px', '13px 16px'],
  ['Filter bar', '16px 20px', '11px 16px'],
  ['KPI card', '16px 18px', '12px 14px'],
  ['KPI row gap', '16px', '12px'],
  ['Page header margin', '18px', '12px'],
]

export default function DensityPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Styles</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Density &amp; text size</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        Two user-level preferences that survive across desktop and mobile. Density changes{' '}
        <em>spacing</em>; text size changes <em>scale</em>. Neither one shrinks a hit target, and
        neither is allowed to cause an overlap.
      </p>

      {/* ── Density ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Compact density</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        A spacing setting, not a type setting. It tightens padding and grid gaps everywhere data is
        listed — tables, cards, KPIs and the dashboard feeds — so more rows fit without anything
        getting smaller to touch.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[
          { label: 'Default', pad: 'px-3.5 py-3', head: 'px-3.5 py-[11px]', size: 'text-[13px]' },
          { label: 'Compact', pad: 'px-3 py-1.5', head: 'px-3 py-1.5', size: 'text-[12px]' },
        ].map(({ label, pad, head, size }) => (
          <div key={label} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <p className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.8px] text-slate-500">
              {label}
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['Tag', 'Value'].map((h) => (
                    <th key={h} className={`border-b border-slate-200 bg-slate-50 text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500 ${head}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[['PT-1201', '2.41 bar'], ['DO-0403', '6.20 mg/L'], ['FT-0220', '284 m³/h']].map(([a, b]) => (
                  <tr key={a}>
                    <td className={`border-b border-slate-100 font-mono text-[11px] text-ink ${pad}`}>{a}</td>
                    <td className={`border-b border-slate-100 font-mono text-slate-600 tabular-nums ${pad} ${size}`}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[460px] border-collapse">
          <thead>
            <tr>
              {['Surface', 'Default', 'Compact'].map((h) => (
                <th key={h} className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {densityChanges.map(([l, a, b]) => (
              <tr key={l}>
                <td className="border-b border-slate-100 px-4 py-2.5 text-[13px] text-slate-600">{l}</td>
                <td className="border-b border-slate-100 px-4 py-2.5 font-mono text-xs text-slate-500">{a}</td>
                <td className="border-b border-slate-100 px-4 py-2.5 font-mono text-xs text-ink">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 rounded-lg border border-[color-mix(in_srgb,var(--color-warning)_28%,transparent)] bg-warning-bg px-4 py-3 text-[12px] leading-relaxed text-warning-text">
        Compact mode zeroes card padding only for cards whose child is <em>structural</em> — a
        header, filter bar, bulk bar, table or divided row list. A bare card keeps its padding.
        Applying it to both double-pads the child and detaches its hairline from the card edge.
      </div>

      {/* ── Text size ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Text size</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Implemented as <code className="font-mono text-xs">zoom</code> on the working area, not a
        font-size sweep. The layout reflows at the new size, so a longer label cannot overlap its
        neighbour — which is exactly what a font-size sweep would cause.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {[
          ['Default', '1.00', 'ts-default'],
          ['Large', '1.09', 'ts-lg'],
          ['Extra large', '1.18', 'ts-xl'],
        ].map(([l, v, cls]) => (
          <div key={l} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-slate-100 px-5 py-3.5 last:border-b-0">
            <span className="w-[100px] shrink-0 text-[13px] font-semibold text-ink">{l}</span>
            <span className="w-12 shrink-0 font-mono text-xs text-slate-500 tabular-nums">{v}×</span>
            <span className="font-mono text-[11px] text-slate-400">{cls}</span>
          </div>
        ))}
      </div>
      <pre className="mt-4 overflow-x-auto rounded-md bg-ink px-4 py-3 font-mono text-[11px] leading-relaxed text-slate-300">
{`/* the multipliers are tokens — never retype the number */
body.nj-text-lg { --nj-ts: var(--ts-lg) }
body.nj-text-xl { --nj-ts: var(--ts-xl) }

/* scale the working area — it reflows, so nothing can overlap */
body.nj-text-lg .content, body.nj-text-lg .dlg, body.nj-text-lg .ad-drawer { zoom: var(--nj-ts) }

/* viewport-sized overlays divide the scale back out so they still fit the screen */
body.nj-text-lg .dlg       { max-height: calc((100vh - 72px) / var(--nj-ts)) }
body.nj-text-lg .ad-drawer { height: calc(100vh / var(--nj-ts));
                             width:  calc(min(440px, 94vw) / var(--nj-ts)) }`}
      </pre>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-300 bg-white">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <span
            aria-hidden
            className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#F7901E] font-mono text-[11px] font-bold text-white"
          >
            IA
          </span>
          <p className="text-sm font-bold text-ink">In Ignition Perspective</p>
        </div>
        <div className="px-5 py-4 text-[13px] leading-relaxed text-slate-600">
          <p>
            The three multipliers ship in the theme as{' '}
            <code className="font-mono text-xs">--njord-ts-default</code>,{' '}
            <code className="font-mono text-xs">--njord-ts-lg</code> and{' '}
            <code className="font-mono text-xs">--njord-ts-xl</code>, so the HMI scales by the same
            numbers as the web build rather than inventing its own.
          </p>
          <p className="mt-2.5">
            <strong className="font-semibold text-ink">How you apply them is your call</strong> — it
            depends on your Perspective version and how the session is laid out. Store the
            preference on a session custom property, then either bind{' '}
            <code className="font-mono text-xs">zoom</code> on the root container of the working
            area, or bind the session&rsquo;s own scale property if your version exposes one. The
            design constraint is the same either way:
          </p>
          <ul className="mt-2.5 space-y-2">
            {[
              <>
                Scale the <strong>working area</strong>, not the whole session. The top bar, sidebar
                and alarm ribbon must stay put — an operator enlarging the text should not lose the
                annunciator off the bottom of the screen.
              </>,
              <>
                Viewport-sized overlays must divide the multiplier back out of their height and
                width, or a dialog at 1.18× grows past the screen edge and its footer buttons become
                unreachable.
              </>,
              <>
                Never implement this as a font-size sweep. The layout has to reflow at the new
                scale; a sweep resizes the text inside fixed boxes and labels start overlapping.
              </>,
              <>
                Hit targets do not shrink at any setting, and the 44px minimum still holds at 1.00×.
              </>,
            ].map((item, i) => (
              <li key={i} className="flex gap-2.5">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Outdoor ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Outdoor / high contrast</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        A mobile-only mode for walkways and bright daylight. Borders double to 2px in a dark slate,
        numerals go to 800 weight, muted text darkens, and badges gain an outline.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[
          { label: 'Default', border: 'border border-slate-200', sub: 'text-slate-500', weight: 'font-semibold' },
          { label: 'Outdoor', border: 'border-2 border-[#2B3644]', sub: 'text-[#2B3644]', weight: 'font-extrabold' },
        ].map(({ label, border, sub, weight }) => (
          <div key={label}>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">{label}</p>
            <div className={`rounded-2xl bg-white px-3.5 py-[13px] ${border}`}>
              <p className={`text-[10px] uppercase tracking-[0.6px] ${sub} ${weight}`}>Dissolved O₂</p>
              <p className={`mt-[9px] font-mono text-[30px] leading-none tracking-[-1px] text-ink tabular-nums ${weight}`}>
                6.2<span className="ml-0.5 text-sm font-medium text-slate-400">mg/L</span>
              </p>
              <p className={`mt-[7px] text-[11px] ${sub}`}>Below band</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Density never changes a font size or a hit target. It is padding and gaps only.
            </>,
            <>
              Text size never changes a font size <em>declaration</em>. It scales the working area
              so the layout reflows with it.
            </>,
            <>
              Both preferences share their storage key across desktop and mobile
              (<code className="font-mono text-[12px]">nj_textsize_v1</code>), so an operator sets
              them once.
            </>,
            <>
              Every mode stays AA-clean. Outdoor mode raises contrast; it never trades it away for
              density.
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
