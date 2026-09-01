export default function DashboardOverviewPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Patterns</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Dashboard overview</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        The start screen for a site. It answers three questions in order: is anything wrong, what
        are the vitals, and what happened on the last shift. Alarms come first — always.
      </p>

      {/* ── Desktop composition ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Desktop</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-5">
        {/* annunciator */}
        <div className="mb-4 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5 rounded-md border-l-4 border-l-critical bg-critical-bg px-4 py-2">
          <span className="rounded-sm bg-critical-solid px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.6px] text-white">
            Critical
          </span>
          <span className="min-w-0 truncate text-[14px] font-bold text-ink">
            Dissolved oxygen low-low · RAS 2 · 04:12
          </span>
          <span className="text-xs font-semibold text-primary-text">6 more</span>
        </div>

        {/* kpi row */}
        <div className="mb-4 grid grid-cols-4 gap-3">
          {[
            ['Active alarms', '7', '', 'text-critical-text'],
            ['Unacked', '4', '', 'text-critical-text'],
            ['Recirculation', '1 284', 'm³/h', 'text-ink'],
            ['Feed today', '318', 'kg', 'text-ink'],
          ].map(([l, v, u, tone]) => (
            <div key={l} className="rounded-xl border border-slate-200 bg-white px-3.5 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">{l}</p>
              <p className="mt-2 flex items-baseline gap-1">
                <span className={`font-mono text-xl tabular-nums ${tone}`}>{v}</span>
                {u && <span className="text-[11px] text-slate-600">{u}</span>}
              </p>
            </div>
          ))}
        </div>

        {/* two-pane */}
        <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-3">
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <span className="text-[13px] font-bold text-ink">Active alarms</span>
              <span className="text-xs font-semibold text-primary-text">View all</span>
            </div>
            {[
              ['Dissolved oxygen low-low', 'bg-sev-crit'],
              ['Pump vibration high', 'bg-sev-high'],
              ['Flow deviation', 'bg-sev-med'],
            ].map(([t, c]) => (
              <div key={t} className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-2.5 last:border-b-0">
                <span className={`h-[9px] w-[9px] shrink-0 rounded-full ${c}`} />
                <span className="flex-1 truncate text-xs text-slate-600">{t}</span>
                <span className="font-mono text-[11px] text-slate-400">04:12</span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">Facility</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">RAS 1 · RAS 2 · Water treatment · Pump sump</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">Shift notes</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                DO in TK-04 drifting low all evening. Trend attached.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Mobile</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        The same priority order, stacked. The two-pane workspace collapses into a single column and
        the KPI row becomes a 2×2 tile grid.
      </p>
      <div className="mt-5 w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <button className="flex w-full items-center gap-2.5 border-b border-slate-200 border-l-4 border-l-critical bg-critical-bg py-2 pl-3 pr-3.5 text-left">
          <span className="shrink-0 rounded-[5px] bg-critical-solid px-1.5 py-[3px] text-[9px] font-extrabold uppercase text-white">
            Crit
          </span>
          <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-ink">
            Dissolved oxygen low-low
          </span>
          <span className="shrink-0 rounded-full bg-[rgba(15,24,43,0.1)] px-[7px] py-0.5 font-mono text-[11px] font-extrabold text-ink">
            +6
          </span>
        </button>

        <div className="bg-slate-50 p-4">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[1px] text-slate-400">Vitals</p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              ['Dissolved O₂', '6.2', 'mg/L', true],
              ['Temperature', '12.4', '°C', false],
              ['pH', '7.1', '', false],
              ['Flow', '284', 'm³/h', false],
            ].map(([l, v, u, crit]) => (
              <div
                key={l as string}
                className={`relative overflow-hidden rounded-2xl border bg-white px-3 py-2.5 ${crit ? 'border-critical-mid' : 'border-slate-200'}`}
              >
                {crit ? <span className="absolute inset-y-0 left-0 w-1 bg-critical" /> : null}
                <p className="text-[9px] font-extrabold uppercase tracking-[0.6px] text-slate-400">{l}</p>
                <p className="mt-1.5 font-mono text-2xl font-semibold leading-none tracking-[-1px] text-ink tabular-nums">
                  {v}
                  {u ? <span className="ml-0.5 text-[11px] font-medium text-slate-400">{u}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Rules ── */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Alarms are the first thing on the screen on both builds. Vitals, production and notes
              come after — an operator opening the dashboard is checking for trouble.
            </>,
            <>
              Every KPI on this screen drills into the filtered list behind it. A number an operator
              cannot open is a dead end.
            </>,
            <>
              The two-pane workspace uses a clamped rail and stacks at 1180px. Below that the grid
              becomes a single column in a fixed source order.
            </>,
            <>
              Nothing on the dashboard animates its value in. Numbers appear as soon as they exist.
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
