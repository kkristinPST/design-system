const rows = [
  { sev: 'Critical', badge: 'bg-critical-solid text-white', rail: 'shadow-[inset_3px_0_0_var(--color-critical)]', tint: 'bg-[color-mix(in_srgb,var(--color-critical)_7%,#fff)]', dot: 'bg-sev-crit', a: 'Dissolved oxygen low-low', tag: 'DO-0403', area: 'RAS 2', age: '04:12:38', state: 'UNACK' },
  { sev: 'High', badge: 'bg-warning-bg text-warning-text', rail: 'shadow-[inset_3px_0_0_var(--color-warning)]', tint: 'bg-[color-mix(in_srgb,var(--color-warning)_6%,#fff)]', dot: 'bg-sev-high', a: 'Pump vibration high', tag: 'PU-11A', area: 'Pump sump', age: '38:04:11', state: 'ACK' },
  { sev: 'Medium', badge: 'bg-medium-bg text-medium-text', rail: 'shadow-[inset_3px_0_0_var(--color-medium)]', tint: '', dot: 'bg-sev-med', a: 'Flow deviation from setpoint', tag: 'FT-0220', area: 'Water treatment', age: '00:21:04', state: 'RTN' },
]

export default function AlarmFeedPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Patterns</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Alarm feed</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        The live list of what is wrong right now. It composes the annunciator ribbon, filter chips,
        the bulk bar and alarm rows into the screen an operator spends most of their shift on.
      </p>

      <h2 className="mt-10 text-base font-bold text-ink">Desktop</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* ribbon */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5 border-b border-slate-200 border-l-4 border-l-critical bg-critical-bg py-2 pl-5 pr-4">
          <span className="rounded-sm bg-critical-solid px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.6px] text-white">Critical</span>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-bold text-ink">Dissolved oxygen low-low</span>
            <span className="mt-0.5 block text-[11px] text-slate-600">
              <span className="font-mono">DO-0403</span> · RAS 2 · 04:12:38
            </span>
          </span>
          <span className="flex items-center gap-2.5">
            <span className="rounded-md bg-ink px-3.5 py-1.5 text-xs font-bold text-white">Acknowledge</span>
            <span className="text-xs font-semibold text-primary-text">6 more</span>
          </span>
        </div>

        {/* bulk bar */}
        <div className="flex flex-wrap items-center gap-3 bg-ink px-4 py-2.5 text-white">
          <span className="font-mono text-[13px] font-bold">2 selected</span>
          <span className="ml-auto flex items-center gap-2">
            <span className="rounded-sm bg-white px-3 py-1.5 text-xs font-bold text-ink">Acknowledge</span>
            <span className="rounded-sm px-3 py-1.5 text-xs font-bold text-white/75">Clear</span>
          </span>
        </div>

        {/* filter chips */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 px-4 py-3">
          {[['Unacknowledged', 4, true], ['Stale', 2, false], ['Critical', 2, false]].map(([l, n, on]) => (
            <span
              key={l as string}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${on ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-slate-100 text-ink'}`}
            >
              {l}
              <span className={`font-mono text-[11px] font-bold ${on ? 'text-white/60' : 'text-slate-600'}`}>{n}</span>
            </span>
          ))}
        </div>

        {/* rows */}
        <table className="w-full border-collapse">
          <tbody>
            {rows.map((r) => (
              <tr key={r.tag} className={r.tint}>
                <td className={`border-b border-slate-100 py-3 pl-4 pr-0 ${r.rail}`}>
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded border-[1.5px] border-slate-300 bg-white" />
                </td>
                <td className="border-b border-slate-100 px-3 py-3">
                  <span className={`inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.5px] ${r.badge}`}>{r.sev}</span>
                </td>
                <td className="border-b border-slate-100 px-3 py-3">
                  <span className="block text-[13px] font-medium text-ink">{r.a}</span>
                  <span className="mt-0.5 block text-[11px] text-slate-500">
                    <span className="font-mono">{r.tag}</span> · {r.area}
                  </span>
                </td>
                <td className="border-b border-slate-100 px-3 py-3 font-mono text-[10px] font-bold tracking-[0.6px] text-slate-500">
                  {r.state}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-right font-mono text-xs text-slate-500 tabular-nums">
                  {r.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-base font-bold text-ink">Mobile</h2>
      <div className="mt-5 w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-[7px] overflow-x-auto border-b border-slate-100 px-4 py-2.5">
          {[['All', 21, true], ['Crit', 2, false], ['High', 5, false]].map(([l, n, on]) => (
            <span
              key={l as string}
              className={`inline-flex min-h-[32px] shrink-0 items-center gap-1 rounded-full border px-2.5 text-[11px] font-semibold ${on ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-white text-slate-600'}`}
            >
              {l}
              <span className="font-mono text-[10px] font-extrabold">{n}</span>
            </span>
          ))}
        </div>
        <div className="space-y-2 bg-slate-50 p-3">
          {rows.slice(0, 2).map((r) => (
            <div key={r.tag} className="relative overflow-hidden rounded-[14px] border border-slate-200 bg-white px-3 py-2.5">
              <span className={`absolute inset-y-0 left-0 w-1 rounded-l ${r.dot}`} />
              <div className="mb-1 flex items-center gap-1.5">
                <span className={`shrink-0 rounded-[5px] px-1.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.5px] ${r.badge}`}>
                  {r.sev}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-slate-600">{r.area}</span>
                <span className="shrink-0 font-mono text-[11px] text-slate-400 tabular-nums">{r.age.slice(0, 5)}</span>
              </div>
              <p className="text-[14px] font-semibold leading-tight text-ink">{r.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Default sort is priority, then age; never newest-first. A three-hour-old critical
              outranks a one-minute-old low.
            </>,
            <>
              New alarms appear immediately at full opacity. They never fade or slide in.
            </>,
            <>
              Every applied filter is visible as a chip. An alarm list with a hidden filter is a
              safety problem.
            </>,
            <>
              Acknowledging never removes a row from the list. It changes its state tag; the alarm
              is still active, and hiding it would be a lie.
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
