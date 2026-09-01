export default function SearchAndFilterPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Patterns</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Search &amp; filter</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        Narrowing a list down to what matters. The filter bar groups a label with its control, keeps
        applied filters visible as chips, and wraps rather than clipping — because the bar grows
        every time a new facet is added.
      </p>

      {/* Filter bar */}
      <h2 className="mt-10 text-base font-bold text-ink">Filter bar</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-3 border-b border-slate-200 px-5 py-4">
          <label className="flex min-w-[150px] flex-1 basis-[200px] items-center gap-[9px] rounded-md border border-slate-300 bg-white px-3 py-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input defaultValue="" placeholder="Search alarms, tags or areas" className="w-full border-none bg-transparent text-[13px] outline-none placeholder:text-slate-400" />
          </label>

          <span className="h-[22px] w-px shrink-0 self-stretch bg-slate-200" />

          <div className="flex min-w-0 flex-wrap items-center gap-[9px]">
            <span className="whitespace-nowrap text-[13px] font-semibold text-ink">Priority</span>
            <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white py-1.5 pl-3 pr-2 text-[13px] text-ink">
              All
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-[9px]">
            <span className="whitespace-nowrap text-[13px] font-semibold text-ink">Time</span>
            <span className="inline-flex shrink-0 flex-nowrap items-center gap-2">
              <span className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-[7px] font-mono text-[13px] text-ink">06:00</span>
              <span className="text-slate-400">&rarr;</span>
              <span className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-[7px] font-mono text-[13px] text-ink">18:00</span>
            </span>
          </div>
        </div>

        {/* applied chips */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 px-5 py-3">
          <span className="mr-1 text-xs font-semibold text-slate-500">Applied</span>
          {[['Critical', 'bg-sev-crit'], ['High', 'bg-sev-high'], ['RAS 2', '']].map(([l, dot]) => (
            <span key={l} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 py-1 pl-[11px] pr-1.5 text-xs font-semibold text-ink">
              {dot && <span className={`h-[7px] w-[7px] rounded-full ${dot}`} />}
              {l}
              <button aria-label={`Remove ${l}`} className="inline-flex text-slate-400 hover:text-slate-600">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </span>
          ))}
          <button className="ml-1 text-xs font-semibold text-primary-text hover:underline">Clear all</button>
        </div>

        <div className="flex items-center justify-between px-5 py-3 text-[13px] text-slate-600">
          <span>Showing 12 of 584</span>
          <span className="font-mono text-xs text-slate-400">sorted by priority, then age</span>
        </div>
      </div>

      {/* Mobile */}
      <h2 className="mt-10 text-base font-bold text-ink">Mobile</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Search moves into a bottom sheet with the field at the top; filters become a horizontally
        scrolling chip row that never steals vertical space from the list.
      </p>
      <div className="mt-5 flex flex-wrap gap-5">
        <div className="w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex gap-[7px] overflow-x-auto px-4 py-3">
            {[['All', 21, true], ['Critical', 2, false], ['High', 5, false], ['Stale', 2, false]].map(([l, n, on]) => (
              <button
                key={l as string}
                className={`relative inline-flex min-h-[38px] shrink-0 items-center gap-[5px] rounded-full border px-3 text-xs font-semibold ${on ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-white text-slate-600'}`}
              >
                {l}
                <span className={`font-mono text-[11px] font-extrabold ${on ? 'text-white/70' : 'text-slate-500'}`}>{n}</span>
              </button>
            ))}
          </div>
          <p className="border-t border-slate-100 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.4px] text-slate-500">
            12 of 584
          </p>
        </div>

        <div className="relative w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="h-16" />
          <div className="absolute inset-0 flex flex-col justify-end bg-[rgba(15,24,43,0.4)]">
            <div className="rounded-t-[22px] bg-white px-4 pt-2 pb-5">
              <span className="mx-auto mt-1.5 mb-3 block h-[5px] w-10 rounded-[3px] bg-slate-300" />
              <div className="flex items-center gap-[9px] rounded-[13px] bg-slate-100 px-3.5 py-3">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                <input defaultValue="TK-04" className="flex-1 border-none bg-transparent text-[15px] text-ink outline-none" />
              </div>
              {['Tank TK-04', 'DO-0403'].map((t, i, a) => (
                <div key={t} className={`flex min-h-[44px] items-center px-1 py-2.5 text-sm font-semibold text-ink ${i < a.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              A label binds to its control with a 9px gap; the 18px bar gap separates whole groups.
              That is what makes a long bar readable.
            </>,
            <>
              A from &rarr; to pair is <em>one</em> control and never splits across rows — a split
              range reads as two unrelated times.
            </>,
            <>
              The search field is elastic (flex 1 1 200px, min 150px) so it shrinks to keep the
              range group on the same row, but it never wraps internally.
            </>,
            <>
              Chips keep their intrinsic width; the strip wraps. A shrunk chip clips its own nowrap
              label.
            </>,
            <>
              Group dividers disappear once the bar wraps — an orphaned rule at the start of a line
              reads as a rendering fault.
            </>,
            <>
              Always show the result count against the total, and always offer &ldquo;Clear
              all&rdquo;.
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
