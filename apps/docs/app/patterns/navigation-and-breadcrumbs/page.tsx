export default function NavigationAndBreadcrumbsPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Patterns</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Navigation &amp; breadcrumbs</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        Two axes of movement. The sidebar chooses <em>what kind</em> of screen you are on; the
        breadcrumb scope chooses <em>which part of the plant</em> it applies to. Changing scope
        keeps you on the same screen.
      </p>

      {/* Two axes */}
      <h2 className="mt-10 text-base font-bold text-ink">Two axes</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[
          { t: 'Sidebar · screen kind', d: 'Overview, Alarms, Process, Trends, Reports. Persistent, always visible, carries alarm counts.', e: 'Alarms' },
          { t: 'Breadcrumb · scope', d: 'Site › building › department. A dropdown, not a trail of links. Switching scope reloads the same screen with new data.', e: 'Bergen · RAS 2' },
        ].map(({ t, d, e }) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-ink">{t}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{d}</p>
            <p className="mt-3 inline-flex rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-600">{e}</p>
          </div>
        ))}
      </div>

      {/* Top bar squeeze */}
      <h2 className="mt-10 text-base font-bold text-ink">Squeeze order</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        The bar sheds its least important pieces first, so nothing ever clips. The page title is the
        identity of the screen and shrinks last.
      </p>
      <div className="mt-5 space-y-3">
        {[
          { w: 'Wide', px: 'w-full', crumb: true, title: true, clock: true, search: 'full' },
          { w: '≤ 1240px', px: 'w-[78%]', crumb: true, title: true, clock: true, search: 'icon' },
          { w: '≤ 1080px', px: 'w-[58%]', crumb: false, title: true, clock: false, search: 'icon' },
        ].map(({ w, px, crumb, title, clock, search }) => (
          <div key={w} className="flex items-center gap-4">
            <span className="w-[80px] shrink-0 font-mono text-[11px] text-slate-400">{w}</span>
            <div className={`${px} overflow-hidden rounded-md border border-slate-200 bg-white`}>
              <div className="flex h-11 items-center gap-2.5 px-3">
                <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-success" />
                <span className="shrink-0 rounded-sm px-1.5 py-0.5 text-[11px] font-semibold text-slate-600">RAS 2</span>
                {crumb && <span className="shrink-0 text-[11px] text-slate-400">› Active</span>}
                {title && <span className="min-w-0 shrink truncate text-sm font-bold text-ink">Alarms</span>}
                <span className="ml-auto flex shrink-0 items-center gap-2">
                  <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-500">
                    {search === 'full' ? 'Search ⌘K' : '⌕'}
                  </span>
                  <span className="h-4 w-4 rounded-full bg-slate-200" />
                  {clock && <span className="font-mono text-[10px] text-slate-400">14:32</span>}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <h2 className="mt-10 text-base font-bold text-ink">Mobile</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        The sidebar becomes a five-item tab bar; the breadcrumb becomes a back arrow plus the
        subtitle under the screen title. Scope moves into a sheet reached from the header.
      </p>
      <div className="mt-5 w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-start justify-between gap-2.5 px-4 pt-3 pb-3">
          <div className="flex min-w-0 items-center gap-1">
            <button aria-label="Back" className="-ml-1.5 inline-flex p-0.5 text-ink">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <div className="min-w-0">
              <div className="text-2xl font-extrabold leading-[1.1] tracking-[-0.5px] text-ink">Alarms</div>
              <div className="mt-[3px] truncate text-[12px] text-slate-500">Bergen · RAS 2 · 7 active</div>
            </div>
          </div>
        </div>
        <div className="flex items-stretch border-t border-slate-200 px-1.5 pt-1.5 pb-4">
          {['Home', 'Alarms', 'Tanks', 'Trends', 'More'].map((l, i) => (
            <span key={l} className={`flex flex-1 flex-col items-center gap-[3px] py-1.5 text-[10px] font-semibold ${i === 1 ? 'text-primary-text' : 'text-slate-400'}`}>
              <span className="h-[19px] w-[19px] rounded-md bg-current opacity-25" />
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Changing scope never changes the screen. An operator switching from RAS 1 to RAS 2 on
              the alarm list expects the alarm list, not the dashboard.
            </>,
            <>
              Screens carry no in-page <code className="font-mono text-[12px]">h1</code> on desktop;
              the top bar owns the title, so switching tabs never moves the content below it.
            </>,
            <>
              The crumb trail is dropped below 1080px because it repeats what the title already
              says. Scope is kept, because it cannot be inferred.
            </>,
            <>
              The scope label ellipsises; its caret never does. The affordance must survive the
              squeeze.
            </>,
            <>
              Five tab-bar destinations maximum. The sixth goes behind &ldquo;More&rdquo;.
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
