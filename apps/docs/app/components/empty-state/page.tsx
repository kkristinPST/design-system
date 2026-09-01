import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Empty table',
    platform: 'Desktop',
    description:
      'The header stays; the body carries a single 13px slate-400 line at 34px vertical padding. It names the reason (filters, not data), so the operator knows which lever to pull.',
    preview: (
      <div className="w-[560px] overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Tag', 'Location', 'Value', 'State'].map((h, i, a) => (
                <th
                  key={h}
                  className={`whitespace-nowrap border-b border-slate-200 bg-slate-50 px-3.5 py-[11px] text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500 ${
                    i === 0 ? 'rounded-tl-xl' : ''
                  } ${i === a.length - 1 ? 'rounded-tr-xl' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <p className="px-5 py-[34px] text-center text-[13px] text-slate-400">
          No alarms match these filters.
        </p>
      </div>
    ),
    code: `<p className="px-5 py-[34px] text-center text-[13px] text-slate-400">
  No alarms match these filters.
</p>

{/* the table header stays — a bare blank area reads as a failed load */}`,
  },
  {
    name: 'Empty with a way out',
    platform: 'Desktop',
    description:
      'When the emptiness is caused by something the operator set, offer the reversal directly. A dead end with no action is a design failure, not an empty state.',
    preview: (
      <div className="w-[560px] overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-3 border-b border-slate-200 px-5 py-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {['Critical', 'Stale'].map((l) => (
              <span
                key={l}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 py-1 pl-[11px] pr-1.5 text-xs font-semibold text-ink"
              >
                {l}
                <button aria-label={`Remove ${l}`} className="inline-flex text-slate-400 hover:text-slate-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2.5 px-5 py-10 text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 5h18l-7 8v6l-4 2v-8Z" />
            </svg>
          </span>
          <p className="text-sm font-semibold text-slate-600">No alarms match these filters</p>
          <p className="max-w-[320px] text-[13px] leading-relaxed text-slate-500">
            Two filters are narrowing this list. There are 21 alarms in RAS 2 in total.
          </p>
          <button className="mt-1 inline-flex items-center gap-[7px] rounded-md border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm hover:bg-slate-50">
            Clear all filters
          </button>
        </div>
      </div>
    ),
    code: `<div className="flex flex-col items-center gap-2.5 px-5 py-10 text-center">
  <IconWell />
  <p className="text-sm font-semibold text-slate-600">No alarms match these filters</p>
  <p className="max-w-[320px] text-[13px] leading-relaxed text-slate-500">
    Two filters are narrowing this list. There are 21 alarms in RAS 2 in total.
  </p>
  <button className="mt-1 …">Clear all filters</button>
</div>`,
  },
  {
    name: 'All clear',
    platform: 'Mobile',
    description:
      'A genuinely good empty state; nothing is wrong. It uses the success well rather than a neutral one, so it reads as reassurance rather than absence.',
    preview: (
      <PhoneFrame className="border-none bg-transparent shadow-none">
        <div className="px-[30px] py-[50px] text-center text-slate-400">
          <span className="mb-3.5 inline-flex h-[60px] w-[60px] items-center justify-center rounded-[18px] bg-success-bg text-success-text">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <p className="text-[15px] font-bold text-slate-600">No active alarms</p>
          <p className="mt-[5px] text-[12px]">Everything in RAS 2 is within band.</p>
        </div>
      </PhoneFrame>
    ),
    code: `<div className="px-[30px] py-[50px] text-center text-slate-400">
  <span className="mb-3.5 inline-flex h-[60px] w-[60px] items-center justify-center
    rounded-[18px] bg-success-bg text-success-text"><CheckIcon /></span>
  <p className="text-[15px] font-bold text-slate-600">No active alarms</p>
  <p className="mt-[5px] text-[12px]">Everything in RAS 2 is within band.</p>
</div>`,
  },
  {
    name: 'Mobile · nothing yet',
    platform: 'Mobile',
    description:
      'A neutral slate well for lists that are empty because nothing has been created yet, paired with the action that would fill them.',
    preview: (
      <PhoneFrame className="border-none bg-transparent shadow-none">
        <div className="px-[30px] py-[50px] text-center text-slate-400">
          <span className="mb-3.5 inline-flex h-[60px] w-[60px] items-center justify-center rounded-[18px] bg-slate-100 text-slate-500">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h9l5 5v13H6Z" /><path d="M9 13h6M9 17h4" />
            </svg>
          </span>
          <p className="text-[15px] font-bold text-slate-600">No notes on this tank</p>
          <p className="mt-[5px] text-[12px]">Notes are shared with the next shift.</p>
          <button className="mt-4 inline-flex h-[50px] w-full items-center justify-center rounded-[14px] bg-primary text-sm font-bold text-white">
            Add a note
          </button>
        </div>
      </PhoneFrame>
    ),
    code: `<span className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-[18px]
  bg-slate-100 text-slate-500"><NoteIcon /></span>
<p className="text-[15px] font-bold text-slate-600">No notes on this tank</p>
<p className="mt-[5px] text-[12px]">Notes are shared with the next shift.</p>
<button className="mt-4 h-[50px] w-full rounded-[14px] bg-primary text-sm font-bold text-white">
  Add a note
</button>`,
  },
]

export default function EmptyStatePage() {
  return (
    <ComponentDoc
      title="Empty state"
      intro={
        <>
          What a list shows when it has nothing to show. Every empty state answers two questions:
          why is it empty, and what can I do about it. In an alarm console the difference between
          &ldquo;nothing is wrong&rdquo; and &ldquo;nothing loaded&rdquo; is a safety issue.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['empty-state']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Never render a blank area. An empty table keeps its header; an empty screen keeps its
            chrome. A blank region is indistinguishable from a failed load.
          </>,
          <>
            State the <em>cause</em>. &ldquo;No alarms match these filters&rdquo; and &ldquo;No
            active alarms&rdquo; mean opposite things and must never share wording.
          </>,
          <>
            All-clear uses the success well; nothing-yet uses the neutral slate well. Tone tells the
            operator whether this is good news before they read a word.
          </>,
          <>
            If the operator caused the emptiness, offer the reversal in the empty state itself.
          </>,
        ],
      }}
    />
  )
}
