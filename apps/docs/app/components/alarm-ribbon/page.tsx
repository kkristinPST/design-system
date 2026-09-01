import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Annunciator ribbon',
    platform: 'Desktop',
    description:
      'The persistent ISA-18.2 annunciator under the top bar. Two rows: severity + alarm name + actions on line one, tag / area / age on line two; so the alarm identity survives any viewport width.',
    preview: (
      <div className="w-[760px] overflow-hidden rounded-lg border border-slate-200">
        <div className="grid min-h-[56px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5 border-b border-slate-200 border-l-4 border-l-critical bg-critical-bg py-2 pl-6 pr-5">
          <span className="shrink-0 rounded-sm bg-critical-solid px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.6px] text-white">
            Critical
          </span>
          <button className="flex min-w-0 flex-col items-start gap-[3px] py-0.5 text-left">
            <span className="block max-w-full truncate text-[14px] font-bold text-ink">
              Dissolved oxygen low-low
            </span>
            <span className="flex max-w-full flex-wrap items-baseline gap-[9px] text-[11px]">
              <span className="font-mono text-[11px] tracking-[0.3px] text-slate-600">DO-0403</span>
              <span className="truncate font-medium text-slate-600 before:mr-[9px] before:text-slate-300 before:content-['·']">
                RAS 2 · Tank 04
              </span>
              <span className="text-slate-600 before:mr-[9px] before:text-slate-300 before:content-['·']">
                04:12:38
              </span>
            </span>
          </button>
          <div className="flex shrink-0 items-center gap-2.5">
            <button className="inline-flex min-h-[34px] items-center gap-1.5 rounded-md bg-ink px-3.5 text-xs font-bold text-white hover:brightness-110">
              Acknowledge
            </button>
            <button className="inline-flex min-h-[34px] items-center gap-1.5 whitespace-nowrap px-1.5 text-xs font-semibold text-primary-text hover:underline">
              6 more
            </button>
          </div>
        </div>
      </div>
    ),
    code: `<div className="grid min-h-[56px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5
  border-b border-slate-200 border-l-4 border-l-critical bg-critical-bg py-2 pl-6 pr-5">
  <span className="rounded-sm bg-critical-solid px-2 py-[3px] text-[10px] font-bold
    uppercase tracking-[0.6px] text-white">Critical</span>
  <button className="flex min-w-0 flex-col items-start gap-[3px] text-left">
    <span className="truncate text-[14px] font-bold text-ink">{alarm}</span>
    <span className="flex flex-wrap items-baseline gap-[9px] text-[11px]">…</span>
  </button>
  <div className="flex items-center gap-2.5"><AckButton /><MoreLink /></div>
</div>`,
  },
  {
    name: 'Severity levels',
    platform: 'Desktop',
    description:
      'The left border and background follow the severity ramp. Low and diagnostic fall back to the neutral slate-50 surface; they annunciate, but they do not colour the chrome.',
    preview: (
      <div className="w-[560px] overflow-hidden rounded-lg border border-slate-200">
        {[
          ['Critical', 'border-l-critical bg-critical-bg', 'bg-critical-solid text-white'],
          ['High', 'border-l-warning bg-warning-bg', 'bg-warning-bg text-warning-text'],
          ['Medium', 'border-l-medium bg-medium-bg', 'bg-medium-bg text-medium-text'],
          ['Low', 'border-l-slate-400 bg-slate-50', 'bg-slate-100 text-slate-600'],
        ].map(([l, wrap, badge]) => (
          <div
            key={l}
            className={`flex min-h-[48px] items-center gap-3.5 border-b border-slate-200 border-l-4 py-2 pl-5 pr-4 last:border-b-0 ${wrap}`}
          >
            <span className={`shrink-0 rounded-sm px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.6px] ${badge}`}>
              {l}
            </span>
            <span className="truncate text-[14px] font-bold text-ink">
              {l === 'Critical' ? 'Dissolved oxygen low-low' : 'Example alarm text'}
            </span>
          </div>
        ))}
      </div>
    ),
    code: `border-l-critical bg-critical-bg   {/* Critical   */}
border-l-warning  bg-warning-bg    {/* High       */}
border-l-medium   bg-medium-bg     {/* Medium     */}
border-l-slate-400 bg-slate-50     {/* Low / Diagnostic */}`,
  },
  {
    name: 'All clear',
    platform: 'Desktop',
    description:
      'The ribbon never disappears; an empty annunciator is indistinguishable from a broken one. It collapses to a 30px quiet line on the plain surface with no left rail.',
    preview: (
      <div className="w-[560px] overflow-hidden rounded-lg border border-slate-200">
        <div className="flex min-h-[30px] items-center gap-2 border-l-4 border-l-transparent bg-white py-0 pl-6 pr-5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#007A52" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-xs font-medium text-slate-500">
            No active alarms in this scope
          </span>
        </div>
      </div>
    ),
    code: `<div className="flex min-h-[30px] items-center gap-2 border-l-4 border-l-transparent
  bg-white pl-6 pr-5">
  <CheckIcon className="text-success-text" />
  <span className="text-xs font-medium text-slate-500">No active alarms in this scope</span>
</div>`,
  },
  {
    name: 'Mobile · ribbon',
    platform: 'Mobile',
    description:
      'Pinned under the status bar. Severity chip, two-line text block, and a mono overflow count. Tapping anywhere opens the alarm list.',
    preview: (
      <PhoneFrame className="p-0">
        <button className="flex w-full items-center gap-2.5 border-b border-slate-200 border-l-4 border-l-critical bg-critical-bg py-[9px] pl-3 pr-3.5 text-left">
          <span className="shrink-0 rounded-[5px] bg-critical-solid px-1.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.5px] text-white">
            Crit
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-px">
            <b className="truncate text-[12px] font-bold leading-tight text-ink">
              Dissolved oxygen low-low
            </b>
            <span className="text-[11px] text-slate-600">
              <span className="font-mono text-[11px]">DO-0403</span> · 04:12
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-[rgba(15,24,43,0.10)] px-[7px] py-0.5 font-mono text-[11px] font-extrabold text-ink">
            +6
          </span>
        </button>

        <div className="p-4 text-center text-xs text-slate-400">screen content</div>

        <button className="flex w-full items-center justify-center gap-[7px] border-t border-slate-200 border-l-4 border-l-success bg-success-bg py-[9px] text-[12px] font-semibold text-success-text">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          All clear
        </button>
      </PhoneFrame>
    ),
    code: `<button className="flex w-full items-center gap-2.5 border-b border-slate-200
  border-l-4 border-l-critical bg-critical-bg py-[9px] pl-3 pr-3.5 text-left">
  <span className="rounded-[5px] bg-critical-solid px-1.5 py-[3px] text-[9px]
    font-extrabold uppercase text-white">Crit</span>
  <span className="flex min-w-0 flex-1 flex-col gap-px">
    <b className="truncate text-[12px] font-bold">{alarm}</b>
    <span className="text-[11px] text-slate-600">{tag} · {age}</span>
  </span>
  <span className="rounded-full bg-[rgba(15,24,43,0.10)] px-[7px] py-0.5
    font-mono text-[11px] font-extrabold">+6</span>
</button>`,
  },
]

export default function AlarmRibbonPage() {
  return (
    <ComponentDoc
      title="Alarm ribbon"
      intro={
        <>
          The persistent annunciator required by ISA-18.2. It shows the single highest-priority
          unacknowledged alarm plus a count of the rest, on every screen, and it is always present; even when there is nothing to annunciate.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['alarm-ribbon']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The ribbon is never removed. An all-clear state collapses it to a quiet line; hiding it
            entirely makes &ldquo;no alarms&rdquo; look identical to &ldquo;the feed is
            broken&rdquo;.
          </>,
          <>
            Below 980px the actions drop to their own row rather than squeezing the alarm name. The
            identity of the alarm outranks the convenience of the buttons.
          </>,
          <>
            The meta line uses a fixed 11px at slate-600. It sits on a critical or warning tint,
            where slate-500 only reaches 4.12:1; and an em-relative size shrank it to 8.6px.
          </>,
          <>
            Acknowledge is the ink button; everything else is a link. There is exactly one
            committing action in the ribbon.
          </>,
        ],
      }}
    />
  )
}
