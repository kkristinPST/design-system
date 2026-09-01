import TemplateSpec from '../../../components/TemplateSpec'

const rows = [
  { sev: 'Critical', badge: 'bg-critical-solid text-white', rail: 'shadow-[inset_3px_0_0_var(--color-critical)]', tint: 'bg-[color-mix(in_srgb,var(--color-critical)_7%,#fff)]', a: 'Dissolved oxygen low-low', tag: 'DO-0403', st: 'UNACK', stc: 'bg-critical-bg text-critical-text', age: '04:12:38' },
  { sev: 'High', badge: 'bg-warning-bg text-warning-text', rail: 'shadow-[inset_3px_0_0_var(--color-warning)]', tint: 'bg-[color-mix(in_srgb,var(--color-warning)_6%,#fff)]', a: 'Pump vibration high', tag: 'PU-11A', st: 'ACK', stc: 'bg-slate-100 text-slate-600', age: '38:04:11' },
  { sev: 'Medium', badge: 'bg-medium-bg text-medium-text', rail: 'shadow-[inset_3px_0_0_var(--color-medium)]', tint: '', a: 'Flow deviation from setpoint', tag: 'FT-0220', st: 'RTN', stc: 'bg-warning-bg text-warning-text', age: '00:21:04' },
  { sev: 'Medium', badge: 'bg-medium-bg text-medium-text', rail: 'shadow-[inset_3px_0_0_var(--color-medium)]', tint: '', a: 'Feed line blocked', tag: 'HF-0412', st: 'UNACK', stc: 'bg-critical-bg text-critical-text', age: '00:08:22' },
]

export default function AlarmsTemplatePage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Templates</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Alarms</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        The screen an operator lives on. Page header with tab strip, filter bar, alarm table, and a
        detail drawer that opens over the list without leaving it.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4">
        {/* page header */}
        <div className="mb-3.5">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5">
            <p className="min-h-[24px] min-w-[240px] flex-1 basis-[280px] text-[13px] leading-5 text-slate-600">
              21 alarms in RAS 2 · 4 unacknowledged, 2 stale beyond 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-end gap-2.5">
              <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">Export</button>
              <button className="rounded-md border border-ink bg-ink px-3 py-1.5 text-xs font-semibold text-white">Acknowledge all</button>
            </div>
          </div>
          <div className="mt-3 inline-flex flex-wrap gap-0.5 rounded-md border border-slate-200 bg-slate-100 p-[3px]">
            {['Active', 'Shelved', 'Out of service', 'History'].map((l, i) => (
              <button key={l} className={`rounded-md px-3 py-1 text-xs font-semibold whitespace-nowrap ${i === 0 ? 'bg-white text-ink shadow-sm' : 'text-slate-600'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {/* filter bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 border-b border-slate-200 px-4 py-3">
            <label className="flex min-w-[140px] flex-1 basis-[180px] items-center gap-2 rounded-md border border-slate-300 bg-white px-2.5 py-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input defaultValue="" placeholder="Search" className="w-full border-none bg-transparent text-xs outline-none placeholder:text-slate-400" />
            </label>
            <div className="flex flex-wrap items-center gap-1.5">
              {[['Unacked', 4, true], ['Stale', 2, false]].map(([l, n, on]) => (
                <span key={l as string} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${on ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-slate-100 text-ink'}`}>
                  {l}
                  <span className={`font-mono text-[10px] font-bold ${on ? 'text-white/60' : 'text-slate-600'}`}>{n}</span>
                </span>
              ))}
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr>
                  {['', 'Priority', 'Alarm', 'State', 'Active for', ''].map((h, i) => (
                    <th key={i} className="whitespace-nowrap border-b border-slate-200 bg-slate-50 px-3 py-2 text-left text-[9px] font-bold uppercase tracking-[0.8px] text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.tag} className={r.tint}>
                    <td className={`border-b border-slate-100 py-2.5 pl-3 pr-0 ${r.rail}`}>
                      <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded border-[1.5px] border-slate-300 bg-white" />
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2.5">
                      <span className={`inline-flex items-center rounded-sm px-1.5 py-[2px] text-[9px] font-bold uppercase tracking-[0.5px] ${r.badge}`}>{r.sev}</span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2.5">
                      <span className="block text-xs font-medium text-ink">{r.a}</span>
                      <span className="block font-mono text-[10px] text-slate-400">{r.tag}</span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2.5">
                      <span className={`inline-flex items-center rounded-sm px-1.5 py-[2px] font-mono text-[9px] font-bold tracking-[0.6px] ${r.stc}`}>{r.st}</span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2.5 font-mono text-[11px] text-slate-500 tabular-nums">{r.age}</td>
                    <td className="border-b border-slate-100 px-3 py-2.5">
                      <span className="flex justify-end gap-1">
                        {['Ack', 'Shelve'].map((b) => (
                          <span key={b} className="rounded-sm border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.3px] text-slate-500">{b}</span>
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-2.5">
            <span className="text-xs text-slate-600">1 – 4 of 21</span>
            <span className="flex items-center gap-1">
              {['1', '2', '3'].map((n) => (
                <span key={n} className={`inline-flex h-6 min-w-[24px] items-center justify-center rounded px-1.5 text-[11px] font-semibold ${n === '1' ? 'bg-ink text-white' : 'text-slate-600'}`}>{n}</span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Anatomy</p>
        <ul className="mt-3 space-y-2">
          {[
            <><strong>Tab strip</strong> — Active / Shelved / Out of service / History. Filters the same dataset; never navigates.</>,
            <><strong>Filter bar</strong> — elastic search plus toggle chips with counts. Every applied filter stays visible.</>,
            <><strong>Table</strong> — priority-then-age sort, severity rail plus faint tint, state tag with letter glyph, row actions on the right.</>,
            <><strong>Detail drawer</strong> — opens over the list at min(440px, 94vw) with facts, rationale and timeline.</>,
            <><strong>Bulk bar</strong> — appears above the table once rows are selected.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <TemplateSpec
        uses={['page-header', 'filter-tabs', 'filter-chips', 'data-table', 'alarm-row', 'state-tag', 'badge', 'bulk-bar', 'drawer', 'pagination', 'empty-state', 'toast']}
        viewPath="views/Njord/Templates/Alarms/view.json"
        tree={`Alarms (inside the Dashboard shell — sidebar, top bar and ribbon are inherited)
└── Flex column
    ├── PageHeader     summary line + Export / Acknowledge all
    ├── FilterTabs     Active · Shelved · Out of service · History
    ├── FilterBar      search + toggle chips with counts
    ├── BulkBar        conditional · mounts above the table when rows are selected
    ├── AlarmTable     ia.display.alarm-status-table, styled with njord/table/*
    ├── Pagination
    └── DetailDrawer   overlay · min(440px, 94vw), does NOT navigate

Prefer Ignition's built-in alarm-status-table over a flex-repeater rebuild —
it already handles shelving, acknowledgement and paging.`}
        reflow={[
          ['1180', 'Filter-group dividers hide; chips wrap'],
          ['980', 'Ribbon actions move to their own row'],
          ['900', 'The detail drawer docks to full screen instead of overlaying'],
          ['700', 'Confirmation dialogs go full width; footer buttons stretch'],
        ]}
        watchFor={[
          <>
            <strong>Sort is priority, then age — never newest-first.</strong> This is the single
            most common way this screen gets built wrong, and it is a safety property rather than a
            preference.
          </>,
          <>
            The drawer opens <em>over</em> the list. An operator who opens an alarm must not lose
            their scroll position, their filters or their selection.
          </>,
          <>
            Every applied filter stays visible as a chip. A hidden filter lets an operator believe
            they are seeing all alarms when they are not.
          </>,
          <>
            State is carried by badge, rail and letter glyph together. The row tint reinforces it and
            is never the only signal.
          </>,
          <>
            The empty state differs by tab — &ldquo;no active alarms&rdquo; is good news and should
            read as calm, not as an error.
          </>,
        ]}
      />
    </div>
  )
}
