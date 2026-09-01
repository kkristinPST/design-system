export default function AlarmRegisterPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Patterns</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Alarm register</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        The rationalization record: every configured alarm, its priority, and the reasoning behind
        it. Where the alarm feed is about <em>now</em>, the register is about whether the alarm
        system itself is well designed.
      </p>

      {/* KPI strip */}
      <h2 className="mt-10 text-base font-bold text-ink">Coverage strip</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        A divided-grid card where each cell filters the table below it. The dividers are 1px gaps
        with a ring on each cell, so a wrapped row never leaves an orphaned rule.
      </p>
      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(162px,100%),1fr))] gap-px overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_var(--color-slate-200)]">
        {[
          { n: '584', l: 'Configured', dot: 'bg-slate-300' },
          { n: '512', l: 'Rationalized', dot: 'bg-sev-ok' },
          { n: '48', l: 'Review due', dot: 'bg-sev-high' },
          { n: '24', l: 'Not rationalized', dot: 'bg-sev-crit' },
        ].map(({ n, l, dot }, i) => (
          <button
            key={l}
            className={`flex min-h-[56px] flex-col items-start gap-[3px] bg-white px-3.5 py-3 text-left shadow-[0_0_0_1px_var(--color-slate-200)] ${
              i === 3 ? 'ring-1 ring-inset ring-ink' : ''
            }`}
          >
            <span className="font-mono text-[17px] font-bold text-ink tabular-nums">{n}</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase leading-tight tracking-[0.3px] text-slate-600">
              <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${dot}`} />
              {l}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <h2 className="mt-10 text-base font-bold text-ink">Register table</h2>
      <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[680px] border-collapse">
          <thead>
            <tr>
              {['', 'Tag', 'Alarm', 'Priority', 'Cause', 'Reviewed'].map((h, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap border-b border-slate-200 bg-slate-50 px-3.5 py-[11px] text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { tag: 'DO-0403', a: 'Dissolved oxygen low-low', p: 'Critical', pc: 'bg-critical-solid text-white', c: 'Cone output insufficient for biomass', r: '12 Mar', due: false },
              { tag: 'PU-11A', a: 'Pump vibration high', p: 'High', pc: 'bg-warning-bg text-warning-text', c: 'Bearing wear or cavitation', r: 'Due 12 Jun', due: true },
              { tag: 'FT-0220', a: 'Flow deviation', p: 'Medium', pc: 'bg-medium-bg text-medium-text', c: '—', r: 'Not rationalized', due: true },
            ].map((r) => (
              <tr key={r.tag}>
                <td className="border-b border-slate-100 py-3 pl-3.5 pr-0">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded border-[1.5px] border-slate-300 bg-white" />
                </td>
                <td className="border-b border-slate-100 px-3.5 py-3 font-mono text-xs text-ink">{r.tag}</td>
                <td className="border-b border-slate-100 px-3.5 py-3 text-[13px] font-medium text-ink">{r.a}</td>
                <td className="border-b border-slate-100 px-3.5 py-3">
                  <span className={`inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.5px] ${r.pc}`}>
                    {r.p}
                  </span>
                </td>
                <td className="max-w-[220px] border-b border-slate-100 px-3.5 py-3 text-[13px] text-slate-600">{r.c}</td>
                <td className="whitespace-nowrap border-b border-slate-100 px-3.5 py-3">
                  <span className={`text-xs font-semibold ${r.due ? 'text-warning-text' : 'text-slate-500'}`}>{r.r}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rationale */}
      <h2 className="mt-10 text-base font-bold text-ink">The rationalization record</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Three fields, always the same three. They are what turns a threshold into an alarm someone
        can act on.
      </p>
      <div className="mt-5 flex flex-col gap-3 rounded-[10px] border border-slate-200 border-l-[3px] border-l-warning bg-slate-50 px-4 py-3.5">
        {[
          ['Cause', 'Oxygen cone output insufficient for current biomass and feed rate.'],
          ['Consequence', 'Fish stress and reduced feed intake within 30 minutes.'],
          ['Operator action', 'Verify the cone is running, raise the DO setpoint by 0.5 mg/L, confirm recovery within 15 minutes.'],
        ].map(([l, v]) => (
          <div key={l} className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-slate-400">{l}</span>
            <p className="m-0 text-[13px] leading-relaxed text-ink">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              An alarm without cause, consequence and operator action is not rationalized. The
              register shows that gap rather than hiding it behind a blank cell.
            </>,
            <>
              Changing a priority or a limit is a governed action: it needs a reason, and the change
              is recorded against the alarm with author and timestamp.
            </>,
            <>
              Review dates are shown as status, not as data. Overdue reads in warning-text so the
              backlog is visible from the strip.
            </>,
            <>
              The register is editable on mobile — field engineers rationalize at the equipment, and
              a read-only phone view would push the work back to a desk.
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
