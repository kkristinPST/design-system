export default function ScadaLoopPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Patterns</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">SCADA loop</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        A process mimic paired with a detail dock. The diagram answers &ldquo;what is the plant
        doing&rdquo;; the dock answers &ldquo;what about this one thing&rdquo;. Selecting a node on
        the mimic fills the dock without leaving the screen.
      </p>

      <h2 className="mt-10 text-base font-bold text-ink">Mimic + dock</h2>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_280px] gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        {/* mimic */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[13px] font-bold text-ink">RAS 2 · recirculation loop</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2 py-0.5 font-mono text-[11px] font-bold text-success-text">
              <span className="h-[6px] w-[6px] rounded-full bg-success" />
              Live
            </span>
          </div>
          <svg viewBox="0 0 460 200" className="block h-auto w-full" role="img" aria-label="Tank TK-04 at 6.2 milligrams per litre, below band, feeding recirculation pump PU-11A which is running">
            {/* tank */}
            <path d="M40 42 h104 v92 a12 12 0 0 1 -12 12 h-80 a12 12 0 0 1 -12 -12 Z" fill="var(--color-sc-vessel)" stroke="var(--color-sc-edge)" strokeWidth="1.5" />
            <path d="M40 86 h104 v48 a12 12 0 0 1 -12 12 h-80 a12 12 0 0 1 -12 -12 Z" fill="var(--color-sc-water)" opacity="0.5" />
            <text x="92" y="34" textAnchor="middle" className="font-mono text-[11px] font-bold" fill="var(--color-ink)">TK-04</text>

            {/* oxygen (gas, dashed) */}
            <line x1="92" y1="42" x2="92" y2="16" stroke="var(--color-fl-o2)" strokeWidth="4" strokeDasharray="7 5" strokeLinecap="round" />

            {/* pipes */}
            <line x1="144" y1="106" x2="212" y2="106" stroke="var(--color-fl-proc)" strokeWidth="5" strokeLinecap="round" />
            <line x1="252" y1="106" x2="336" y2="106" stroke="var(--color-fl-proc)" strokeWidth="5" strokeLinecap="round" />

            {/* pump; selected */}
            <g>
              <circle cx="232" cy="106" r="19" fill="var(--color-sc-run)" stroke="var(--color-primary)" strokeWidth="2.4" />
              <path d="M232 87 L251 106 L232 125 Z" fill="var(--color-sc-run)" stroke="var(--color-primary)" strokeWidth="2.4" strokeLinejoin="round" />
            </g>
            <text x="232" y="146" textAnchor="middle" className="font-mono text-[10px]" fill="var(--color-ink)" stroke="var(--color-sc-halo)" strokeWidth="3" paintOrder="stroke">PU-11A</text>

            {/* readout; abnormal */}
            <rect x="336" y="86" width="86" height="40" rx="3" fill="var(--color-sc-node)" stroke="var(--color-sc-abnormal)" strokeWidth="1.8" />
            <text x="379" y="102" textAnchor="middle" className="font-mono text-[9px]" fill="var(--color-slate-500)">DO-0403</text>
            <text x="379" y="118" textAnchor="middle" className="font-mono text-[13px] font-bold" fill="var(--color-critical-text)">6.2 mg/L</text>
          </svg>

          {/* fluid legend */}
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-slate-100 pt-3">
            {[
              ['Process water', 'var(--color-fl-proc)', false],
              ['Oxygen', 'var(--color-fl-o2)', true],
            ].map(([l, c, dashed]) => (
              <span key={l as string} className="inline-flex items-center gap-2 text-[11px] text-slate-500">
                <svg width="24" height="8" viewBox="0 0 24 8" aria-hidden>
                  <line x1="1" y1="4" x2="23" y2="4" stroke={c as string} strokeWidth="3.5" strokeLinecap="round" strokeDasharray={dashed ? '6 4' : undefined} />
                </svg>
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* dock */}
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-3">
            <p className="text-[13px] font-bold text-ink">PU-11A</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Recirculation pump</p>
          </div>
          <div className="px-4 py-3">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-success-text">
              <span className="h-[7px] w-[7px] rounded-full bg-success" />
              Running
            </span>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {[['Flow', '284 m³/h'], ['Speed', '1 440 rpm'], ['Current', '18.2 A'], ['Runtime', '4 128 h']].map(([l, v]) => (
                <div key={l} className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-slate-400">{l}</span>
                  <span className="font-mono text-xs text-ink tabular-nums">{v}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm">
              Open equipment
            </button>
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-base font-bold text-ink">Mobile</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Phones do not get a mimic. The same loop becomes a hero status line plus a list of readings: a pinch-zoomable schematic on a 393px screen is unusable in a plant.
      </p>
      <div className="mt-5 w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3">
          <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-success" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-ink">RAS 2 recirculation</span>
            <span className="block text-xs font-semibold text-success-text">Running</span>
          </span>
          <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">4/4</span>
        </div>
        {[
          ['Dissolved oxygen', '6.2', 'mg/L', true],
          ['Flow', '284', 'm³/h', false],
          ['Pump speed', '1 440', 'rpm', false],
        ].map(([l, v, u, crit], i, a) => (
          <button
            key={l as string}
            className={`flex min-h-[48px] w-full items-center gap-2.5 px-3.5 py-3 text-left ${i < a.length - 1 ? 'border-b border-slate-100' : ''}`}
          >
            <span className="flex-1 text-[12px] font-semibold text-slate-600">{l}</span>
            <span className={`font-mono text-sm font-bold tabular-nums ${crit ? 'text-critical-text' : 'text-ink'}`}>{v}</span>
            <span className="font-mono text-[11px] font-semibold text-slate-500">{u}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              The mimic is quiet by default. Normal equipment is neutral gray; saturated colour on
              a diagram means abnormal, and nothing else.
            </>,
            <>
              Values live in white node boxes, not floating over the schematic. Any label that must
              float gets the halo outline.
            </>,
            <>
              Selecting a node fills the dock; it never navigates away. Losing the diagram to see a
              detail defeats the point of a mimic.
            </>,
            <>
              Mimics scale with their pane and never declare a minimum width. The two-pane layout
              stacks at 1180px with a clamped rail.
            </>,
            <>
              There is no mobile mimic. On a phone the loop is a status line and a list of readings.
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
