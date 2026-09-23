import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Top bar',
    platform: 'Desktop',
    description:
      '64px tall on the surface colour with a hairline underneath. Left: live-status dot, scope breadcrumb and page title. Right: search trigger, notifications, site status pill and clock.',
    preview: (
      <div className="w-[820px] overflow-hidden rounded-lg border border-slate-200">
        <div className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-7">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 whitespace-nowrap">
            <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-success" />
            <button className="inline-flex min-w-0 items-center gap-1 rounded-sm border border-transparent px-[7px] py-[3px] text-[13px] font-semibold text-slate-600 hover:bg-slate-100 hover:text-ink">
              <span className="truncate">Bergen · RAS 2</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <span className="inline-flex shrink-0 text-slate-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
            </span>
            <h1 className="m-0 min-w-[7ch] shrink truncate text-[19px] font-bold tracking-[-0.25px] text-ink">
              Alarms
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-[18px]">
            <button className="inline-flex h-[34px] items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-[13px] text-slate-500 hover:border-slate-300 hover:bg-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <span className="font-medium">Search</span>
              <span className="rounded-[5px] border border-slate-200 bg-white px-[5px] font-mono text-[11px] font-semibold text-slate-400">
                ⌘K
              </span>
            </button>

            <button aria-label="Notifications" className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-slate-600 hover:bg-slate-100 hover:text-ink">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" />
              </svg>
              <span className="absolute top-1 right-1.5 inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-critical-solid px-[3px] font-mono text-[9px] font-bold leading-[16px] text-white shadow-[0_0_0_2px_#fff]">
                7
              </span>
            </button>

            <button className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-[9px] py-1 font-mono text-xs font-bold text-success-text hover:brightness-[0.96]">
              <span className="h-[7px] w-[7px] rounded-full bg-success" />
              Live
            </button>

            <span className="whitespace-nowrap text-xs font-medium tracking-[0.2px] text-slate-500">
              14:32:08
            </span>
          </div>
        </div>
      </div>
    ),
    code: `<div className="flex h-16 items-center justify-between gap-4 border-b border-slate-200
  bg-white px-7">
  <div className="flex min-w-0 flex-1 items-center gap-2.5 whitespace-nowrap">
    <span className="h-[9px] w-[9px] rounded-full bg-success" />
    <ScopePicker />           {/* flex 0 2 auto — gives way first  */}
    <Separator />
    <h1 className="min-w-[7ch] shrink truncate text-[19px] font-bold
      tracking-[-0.25px] text-ink">Alarms</h1>   {/* shrinks last */}
  </div>
  <div className="flex shrink-0 items-center gap-[18px]">
    <SearchTrigger /> <Bell /> <StatusPill /> <Clock />
  </div>
</div>`,
  },
  {
    name: 'Scope dropdown',
    platform: 'Desktop',
    description:
      'The breadcrumb is interactive. Opening it lists buildings and departments; the active one takes primary-bg. The label ellipsises, the caret never does.',
    preview: (
      <div className="relative w-[420px]">
        <button className="inline-flex items-center gap-1 rounded-sm border border-slate-200 bg-slate-100 px-[7px] py-[3px] text-[13px] font-semibold text-ink">
          Bergen · RAS 2
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </button>
        <div className="mt-2 min-w-[290px] rounded-xl border border-slate-200 bg-white p-2 shadow-[0_12px_32px_rgba(15,24,43,0.12)]">
          <p className="px-2.5 pt-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-[1px] text-slate-400">
            Bergen
          </p>
          {[
            { l: 'RAS 1', m: '2 alarms', on: false },
            { l: 'RAS 2', m: '7 alarms', on: true },
            { l: 'Water treatment', m: 'No alarms', on: false },
          ].map(({ l, m, on }) => (
            <button
              key={l}
              className={`flex w-full items-center justify-between gap-2.5 rounded-md px-2.5 py-[9px] text-left text-[13px] font-semibold ${
                on ? 'bg-primary-bg text-primary-text' : 'text-ink hover:bg-slate-50'
              }`}
            >
              {l}
              <span className={`text-[11px] font-normal ${on ? 'text-primary-text' : 'text-slate-400'}`}>
                {m}
              </span>
            </button>
          ))}
        </div>
      </div>
    ),
    code: `<div className="min-w-[290px] rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
  <p className="px-2.5 pt-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-[1px]
    text-slate-400">Bergen</p>
  <button className={on ? "bg-primary-bg text-primary-text" : "text-ink hover:bg-slate-50"}>
    RAS 2 <span className="text-[11px] font-normal">7 alarms</span>
  </button>
</div>`,
  },
  {
    name: 'Narrow · shedding chrome',
    platform: 'Desktop',
    description:
      'The bar sheds its least important pieces before anything can clip: search label and shortcut at 1240px, then the crumb trail and clock at 1080px. Title and scope survive to the end.',
    preview: (
      <div className="w-[560px] overflow-hidden rounded-lg border border-slate-200">
        <div className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-success" />
            <button className="inline-flex min-w-0 items-center gap-1 rounded-sm px-[7px] py-[3px] text-[13px] font-semibold text-slate-600">
              <span className="truncate">RAS 2</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            <h1 className="m-0 min-w-[7ch] shrink truncate text-[19px] font-bold tracking-[-0.25px] text-ink">
              Alarms
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button aria-label="Search" className="inline-flex h-[34px] items-center rounded-md border border-slate-200 bg-slate-50 px-2 text-slate-500">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>
            <button aria-label="Notifications" className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-slate-600">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
              <span className="absolute top-1 right-1.5 inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-critical-solid px-[3px] font-mono text-[9px] font-bold leading-[16px] text-white shadow-[0_0_0_2px_#fff]">7</span>
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-[9px] py-1 font-mono text-xs font-bold text-success-text">
              <span className="h-[7px] w-[7px] rounded-full bg-success" />
              Live
            </button>
          </div>
        </div>
      </div>
    ),
    code: `@media (max-width: 1240px) { .tb-search-lbl, .tb-search-kbd { display: none } }
@media (max-width: 1080px) { .tb-crumb, .tb-clock          { display: none } }
@media (max-width:  820px) { .topbar { height: auto; flex-wrap: wrap } }`,
  },
  {
    name: 'Mobile · screen header',
    platform: 'Mobile',
    description:
      'The phone replaces the bar with a large screen header: 24px / 800 title, an optional subtitle, and 40px icon buttons that carry a 44px hit area.',
    preview: (
      <PhoneFrame className="p-0">
        <div className="flex h-[54px] items-center justify-between px-8 pt-1 text-ink">
          <span className="text-[15px] font-semibold tabular-nums">14:32</span>
          <span className="flex items-center gap-1.5 text-xs">▮▮▮ ⏻</span>
        </div>
        <div className="flex items-start justify-between gap-2.5 px-4 pt-1.5 pb-3">
          <div className="flex min-w-0 items-center gap-1">
            <div className="min-w-0">
              <div className="text-2xl font-extrabold leading-[1.1] tracking-[-0.5px] text-ink">
                Alarms
              </div>
              <div className="mt-[3px] truncate text-[12px] text-slate-500">
                RAS 2 · 7 active
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {['search', 'filter'].map((k) => (
              <button
                key={k}
                aria-label={k}
                className="relative inline-flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {k === 'search' ? <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></> : <path d="M3 5h18l-7 8v6l-4 2v-8Z" />}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </PhoneFrame>
    ),
    code: `<div className="flex items-start justify-between gap-2.5 px-4 pt-1.5 pb-3">
  <div className="min-w-0">
    <div className="text-2xl font-extrabold leading-[1.1] tracking-[-0.5px] text-ink">Alarms</div>
    <div className="mt-[3px] truncate text-[12px] text-slate-500">RAS 2 · 7 active</div>
  </div>
  <div className="flex shrink-0 items-center gap-1.5">
    <IconButton /> <IconButton />
  </div>
</div>`,
  },
]

export default function TopBarPage() {
  return (
    <ComponentDoc
      title="Top bar"
      intro={
        <>
          The persistent chrome above every screen: where you are, what is live, and how to reach
          search. Screens carry no in-page <code className="font-mono text-[13px]">h1</code>; this
          bar owns the page title, which is why the tab strip below never shifts between pages.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['top-bar']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            <strong className="font-semibold text-ink">One meaning per surface.</strong> The top
            bar owns <em>standing</em> alarms: a labelled pair of counts by priority. It does
            <em> not</em> also report unacknowledged, which belongs to the ribbon and the sidebar
            badge. Four numbers for two facts is how an operator stops trusting any of them.
          </>,
          <>
            <strong className="font-semibold text-ink">The bell carries a dot, never a count.</strong>{' '}
            A number on the bell duplicates the sidebar badge and invites the reader to reconcile
            two figures that are counting different things. Every count on the bar states its
            meaning in its own tooltip.
          </>,
          <>
            <strong className="font-semibold text-ink">Under squeeze the page title goes first,
            not the scope.</strong> The title is already shown by the active sidebar item; the
            scope is shown nowhere else. Below 1180px the title hides <em>with its separator</em>.
            There is no width floor on the scope: a floor resolves against the bar while the
            32px-min pickers absorb the shrink anyway, and per-label floors strand the caret away
            from short names. The ordering is the fix, and{' '}
            <code className="font-mono text-[12px]">min-width: 32px</code> on each picker is what
            protects the affordance.
          </>,
          <>
            Squeeze order is fixed: the <strong>scope</strong> gives way first, then the trailing
            crumb, and the <strong>page title shrinks last</strong>: it is the identity of the
            screen.
          </>,
          <>
            The bar must not clip its own dropdowns. Overflow is handled with flex-shrink weights,
            never <code className="font-mono text-[12px]">overflow: hidden</code>; that clipped the
            scope menus to a 24px sliver.
          </>,
          <>
            Icon buttons are drawn at 19px but occupy 40×40 minimum, so every target in the bar
            clears WCAG 2.5.5.
          </>,
          <>
            The live-status dot pairs with a labelled pill on the right. The dot alone never
            communicates connection state.
          </>,
        ],
      }}
    />
  )
}
