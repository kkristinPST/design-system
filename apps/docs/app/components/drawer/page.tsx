import ComponentDoc, { type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Alarm detail drawer',
    platform: 'Desktop',
    description:
      'Slides in from the right at min(440px, 94vw) over a lighter scrim than a dialog uses — the list behind stays readable, because the drawer is context, not an interruption.',
    preview: (
      <div className="relative w-[700px] overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
        <div className="p-5">
          {['DO-0403 · Dissolved oxygen low-low', 'PU-11A · Vibration high', 'FT-0220 · Flow deviation'].map((t) => (
            <div key={t} className="mb-2 rounded-md border border-slate-200 bg-white px-3.5 py-3 text-[13px] text-slate-600">
              {t}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[rgba(15,24,43,0.32)]" />

        <div className="absolute inset-y-0 right-0 flex w-[420px] flex-col border-l border-slate-200 bg-white shadow-[-12px_0_40px_rgba(0,0,0,0.18)]">
          <div className="flex items-start gap-3 border-b border-slate-200 px-5 pt-5 pb-4">
            <div className="min-w-0 flex-1">
              <div className="mb-2.5 flex flex-wrap gap-1.5">
                <span className="rounded-sm bg-critical-solid px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.5px] text-white">
                  Critical
                </span>
                <span className="inline-flex items-center gap-[5px] rounded-sm border border-[color-mix(in_srgb,var(--color-critical)_22%,transparent)] bg-critical-bg py-0.5 pl-[5px] pr-[7px] font-mono text-[10px] font-bold tracking-[0.6px] text-critical-text">
                  <span className="inline-flex h-[13px] w-[13px] items-center justify-center rounded-[3px] text-[9px] font-extrabold shadow-[inset_0_0_0_1px_currentColor]">
                    U
                  </span>
                  UNACK
                </span>
              </div>
              <p className="text-[17px] font-bold leading-snug text-ink">Dissolved oxygen low-low</p>
              <p className="mt-1.5 text-[13px] text-slate-500">RAS 2 · Tank 04 · DO-0403</p>
            </div>
            <button aria-label="Close" className="rounded-md p-0.5 text-slate-500 hover:bg-slate-100 hover:text-ink">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-[18px]">
            <div className="grid grid-cols-2 gap-x-[18px] gap-y-3">
              {[
                ['Value', '6.2 mg/L'],
                ['Limit', '7.0 mg/L'],
                ['Active for', '04:12:38'],
                ['Priority', 'Critical'],
              ].map(([l, v]) => (
                <div key={l} className="flex min-w-0 flex-col gap-[3px]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-slate-400">{l}</span>
                  <span className="font-mono text-[13px] text-ink tabular-nums">{v}</span>
                </div>
              ))}
            </div>

            <p className="mt-[22px] mb-3 text-[10px] font-bold uppercase tracking-[0.6px] text-slate-400">
              Timeline
            </p>
            <ul className="m-0 list-none p-0 pl-1">
              {[
                { t: '09:14:02', s: 'Alarm raised — DO fell below 7.0', tone: 'bg-critical' },
                { t: '09:16:40', s: 'Oxygen cone output increased to 92%', tone: 'bg-primary' },
                { t: '09:22:11', s: 'Operator note added by K. Berg', tone: 'bg-slate-300' },
              ].map(({ t, s, tone }, i, a) => (
                <li
                  key={t}
                  className={`relative grid grid-cols-[62px_1fr] gap-2.5 pb-4 pl-4 ${
                    i === a.length - 1 ? 'border-l-2 border-l-transparent pb-0' : 'border-l-2 border-slate-200'
                  }`}
                >
                  <span className={`absolute -left-[6px] top-[3px] h-2.5 w-2.5 rounded-full border-2 border-white ${tone}`} />
                  <span className="font-mono text-xs text-slate-400 tabular-nums">{t}</span>
                  <span className="text-[13px] break-words text-ink">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2.5 border-t border-slate-200 px-5 py-4">
            <button className="inline-flex flex-1 items-center justify-center gap-[7px] rounded-md border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm hover:bg-slate-50">
              Shelve
            </button>
            <button className="inline-flex flex-1 items-center justify-center gap-[7px] rounded-md border border-ink bg-ink px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-slate-800">
              Acknowledge
            </button>
          </div>
        </div>
      </div>
    ),
    code: `<div className="fixed inset-0 z-[150] bg-[rgba(15,24,43,0.32)]" />
<aside className="fixed inset-y-0 right-0 z-[151] flex w-[min(440px,94vw)] flex-col
  border-l border-slate-200 bg-white shadow-[-12px_0_40px_rgba(0,0,0,0.18)]
  translate-x-full transition-transform duration-[220ms] data-[open]:translate-x-0">
  <header className="border-b border-slate-200 px-5 pt-5 pb-4">…</header>
  <div className="flex-1 overflow-y-auto px-5 py-[18px]">…</div>
  <footer className="flex gap-2.5 border-t border-slate-200 px-5 py-4">
    <button className="flex-1 justify-center">Shelve</button>
    <button className="flex-1 justify-center">Acknowledge</button>
  </footer>
</aside>`,
  },
  {
    name: 'Rationale block',
    platform: 'Desktop',
    description:
      'The rationalization record inside the drawer: a slate-50 well with a 3px warning rail, split into cause, consequence and operator action. A review-due date sits in the section header.',
    preview: (
      <div className="w-[420px]">
        <p className="mb-3 flex items-center gap-[7px] text-[10px] font-bold uppercase tracking-[0.6px] text-slate-400">
          Rationalization
          <span className="ml-auto rounded-sm bg-warning-bg px-2 py-0.5 font-mono text-[11px] font-bold tracking-normal text-warning-text normal-case">
            Review due 12 Jun
          </span>
        </p>
        <div className="flex flex-col gap-3 rounded-[10px] border border-slate-200 border-l-[3px] border-l-warning bg-slate-50 px-4 py-3.5">
          {[
            ['Cause', 'Oxygen cone output insufficient for current biomass and feed rate.'],
            ['Consequence', 'Fish stress and reduced feed intake within 30 minutes.'],
            ['Operator action', 'Verify cone is running, raise DO setpoint by 0.5 mg/L, confirm recovery within 15 minutes.'],
          ].map(([l, v]) => (
            <div key={l} className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-slate-400">{l}</span>
              <p className="m-0 text-[13px] leading-relaxed text-ink">{v}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    code: `<div className="flex flex-col gap-3 rounded-[10px] border border-slate-200
  border-l-[3px] border-l-warning bg-slate-50 px-4 py-3.5">
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-slate-400">Cause</span>
    <p className="text-[13px] leading-relaxed text-ink">{cause}</p>
  </div>
</div>`,
  },
]

export default function DrawerPage() {
  return (
    <ComponentDoc
      title="Drawer"
      intro={
        <>
          A right-hand panel for the detail of a selected row. Unlike a dialog it does not demand a
          decision — the list stays visible behind it, and selecting another row swaps the contents
          without closing.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.drawer}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The scrim is lighter than a dialog&rsquo;s (32% against 46%). A drawer is context; the
            list behind it must stay legible.
          </>,
          <>
            It slides on <code className="font-mono text-[12px]">transform</code>, not width or
            right offset, so the animation stays on the compositor.
          </>,
          <>
            The timeline is a two-column grid with a fixed 62px time gutter, so timestamps align
            regardless of how long the event text is. The last item&rsquo;s connecting line goes
            transparent so the thread does not dangle.
          </>,
          <>
            Footer actions stretch to share the width equally — in a 440px panel a right-aligned
            pair leaves an awkward gap.
          </>,
        ],
      }}
    />
  )
}
