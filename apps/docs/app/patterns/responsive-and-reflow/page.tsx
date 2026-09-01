const rules = [
  { n: '1', t: 'The shell is fluid', d: 'No fixed app width. Gutters and gaps scale with the viewport via clamp(), so the layout grows continuously rather than jumping at breakpoints.' },
  { n: '2', t: 'Card fields add and drop columns', d: 'auto-fit + minmax() with a real minimum. A grid re-columns instead of shrinking its contents; this is what makes 1920px feel used, not stretched.' },
  { n: '3', t: 'Workspaces keep an asymmetric 2-pane grid', d: 'Mimic + dock, chart + pens: a flexible main pane and a clamped side rail, stacking at one shared breakpoint (1180px) rather than each screen picking its own.' },
  { n: '4', t: 'Divider borders become 1px gaps', d: 'Inside wrapping grids the hairlines are gaps with a ring on each cell, so a wrapped row never shows an orphaned rule and an empty track still reads as card surface.' },
  { n: '5', t: 'Overflow is contained by the card that owns it', d: 'A wide table scrolls inside its own wrapper. The page never scrolls sideways, and no column is ever hidden.' },
]

const breakpoints = [
  ['1400 / 1100', 'Consumption card grids step 4 → 3 → 2 columns'],
  ['1240', 'Top bar drops the search label and ⌘K keycap'],
  ['1180', 'Two-pane workspaces stack · 4-up KPI rows split 2×2 · filter-group dividers hide'],
  ['1120', 'Data entry stacks; the location tree flows at full height'],
  ['1080', 'Top bar drops the crumb trail and the clock'],
  ['980', 'Alarm ribbon actions move to their own row'],
  ['900', 'Floating windows dock to full screen'],
  ['820', 'Top bar wraps to two rows'],
  ['700', 'Dialogs go full width; footer buttons stretch'],
]

export default function ResponsiveAndReflowPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Patterns</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Responsive &amp; reflow</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        One fluid system, not per-screen breakpoints. The desktop build stretches from a tablet to a
        control-room wall without a separate layout for each; below tablet width, the mobile build
        takes over entirely.
      </p>

      {/* Five rules */}
      <h2 className="mt-10 text-base font-bold text-ink">The five rules</h2>
      <div className="mt-5 space-y-3">
        {rules.map(({ n, t, d }) => (
          <div key={n} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-bg font-mono text-xs font-bold text-primary-text">
              {n}
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{t}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reflow demo */}
      <h2 className="mt-10 text-base font-bold text-ink">Columns, not squeeze</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        The same KPI row at three pane widths. Cards keep their density and the grid changes how
        many fit.
      </p>
      <div className="mt-5 space-y-4">
        {[
          { w: 'w-full', label: '4 columns' },
          { w: 'w-[68%]', label: '2 columns (4-up splits 2×2)' },
          { w: 'w-[36%]', label: '1 column' },
        ].map(({ w, label }) => (
          <div key={label}>
            <p className="mb-1.5 font-mono text-[11px] text-slate-400">{label}</p>
            <div className={`${w} rounded-lg border border-slate-200 bg-slate-50 p-2.5`}>
              <div className="grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(min(140px,100%),1fr))]">
                {['Active', 'Unacked', 'Flow', 'Feed'].map((l) => (
                  <div key={l} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.8px] text-slate-400">{l}</p>
                    <p className="mt-1.5 font-mono text-base text-ink tabular-nums">284</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Breakpoints */}
      <h2 className="mt-10 text-base font-bold text-ink">Where things actually change</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Breakpoints exist, but only for things a clamp cannot express: shedding chrome, stacking a
        workspace, reordering a grid.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {breakpoints.map(([px, what]) => (
          <div key={px} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-slate-100 px-5 py-3 last:border-b-0">
            <span className="w-[86px] shrink-0 font-mono text-xs font-semibold text-ink tabular-nums">{px}</span>
            <span className="flex-1 text-[13px] leading-relaxed text-slate-600">{what}</span>
          </div>
        ))}
      </div>

      {/* Desktop → mobile */}
      <h2 className="mt-10 text-base font-bold text-ink">Desktop &rarr; mobile</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Below tablet width the phone build takes over. These are rebuilds, not reflows.
      </p>
      <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr>
              {['Desktop', 'Mobile'].map((h) => (
                <th key={h} className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Sidebar rail', 'Bottom tab bar (5 destinations)'],
              ['Top bar with scope + title', 'Large screen header with back arrow'],
              ['Data table', 'One card per row'],
              ['Dialog', 'Bottom sheet (centred pop for confirms)'],
              ['Right drawer', 'Pushed detail screen'],
              ['Command palette (⌘K)', 'Search bottom sheet'],
              ['SCADA mimic', 'Status line + list of readings'],
              ['Row action buttons', 'Swipe-to-acknowledge + detail actions'],
              ['Numbered pagination', 'Load more'],
            ].map(([a, b]) => (
              <tr key={a}>
                <td className="border-b border-slate-100 px-4 py-2.5 text-[13px] text-slate-600">{a}</td>
                <td className="border-b border-slate-100 px-4 py-2.5 text-[13px] text-ink">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Traps</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              The scroll owner must not also hold the card&rsquo;s controls. Making the card scroll
              takes the filter chips and bulk bar sideways with the table.
            </>,
            <>
              Never solve table overflow with{' '}
              <code className="font-mono text-[12px]">display: block</code>; it makes the inner
              table box shrink-to-fit, so a fixed-width table stops short of the card edge.
            </>,
            <>
              Bars with a title and actions must wrap, and the label side needs a real{' '}
              <code className="font-mono text-[12px]">flex-basis</code>. Otherwise the text side
              collapses to a sliver and breaks one word per line.
            </>,
            <>
              A tab strip can overflow a narrow <em>pane</em> on a wide <em>viewport</em>: an
              expanded sidebar on a tablet is enough. Fluid wrapping, not a media query.
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
