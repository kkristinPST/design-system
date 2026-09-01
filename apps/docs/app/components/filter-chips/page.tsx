import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const X = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

const variants: Variant[] = [
  {
    name: 'Applied filter chips',
    platform: 'Desktop',
    description:
      'A pill on slate-100 with a slate-200 border and asymmetric padding; 11px on the label side, 6px beside the dismiss control. A severity chip carries its 7px colour dot.',
    preview: (
      <div className="inline-flex flex-wrap items-center gap-1.5">
        {[
          { l: 'Critical', dot: 'bg-sev-crit' },
          { l: 'High', dot: 'bg-sev-high' },
          { l: 'RAS 2', dot: '' },
        ].map(({ l, dot }) => (
          <span
            key={l}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 py-1 pl-[11px] pr-1.5 text-xs font-semibold text-ink"
          >
            {dot && <span className={`h-[7px] w-[7px] rounded-full ${dot}`} />}
            {l}
            <button aria-label={`Remove ${l}`} className="inline-flex text-slate-400 hover:text-slate-600">
              <X />
            </button>
          </span>
        ))}
        <button className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 bg-white py-1 pl-[11px] pr-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:text-ink">
          + Add filter
        </button>
      </div>
    ),
    code: `<span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200
  bg-slate-100 py-1 pl-[11px] pr-1.5 text-xs font-semibold text-ink">
  <span className="h-[7px] w-[7px] rounded-full bg-sev-crit" />
  Critical
  <button className="text-slate-400 hover:text-slate-600"><XIcon /></button>
</span>

{/* add-filter affordance */}
<button className="rounded-full border border-dashed border-slate-300 bg-white
  py-1 pl-[11px] pr-2.5 text-xs font-semibold text-slate-500">+ Add filter</button>`,
  },
  {
    name: 'Toggle chips with counts',
    platform: 'Desktop',
    description:
      'Clickable chips that switch a facet on and off. Active inverts to ink; the count goes to 60% white so it stays subordinate to the label.',
    preview: (
      <div className="inline-flex flex-wrap items-center gap-1.5">
        {[
          { l: 'Unacknowledged', n: 4, on: true },
          { l: 'Stale', n: 2, on: false },
          { l: 'Shelved', n: 3, on: false },
          { l: 'Diagnostic', n: 11, on: false },
        ].map(({ l, n, on }) => (
          <button
            key={l}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              on ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-slate-100 text-ink hover:bg-slate-200'
            }`}
          >
            {l}
            <span className={`font-mono text-[11px] font-bold ${on ? 'text-white/60' : 'text-slate-600'}`}>
              {n}
            </span>
          </button>
        ))}
      </div>
    ),
    code: `<button className={\`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1
  text-xs font-semibold \${on
    ? "border-ink bg-ink text-white"
    : "border-slate-200 bg-slate-100 text-ink hover:bg-slate-200"}\`}>
  Unacknowledged
  <span className={\`font-mono text-[11px] font-bold
    \${on ? "text-white/60" : "text-slate-600"}\`}>4</span>
</button>`,
  },
  {
    name: 'In a filter bar',
    platform: 'Desktop',
    description:
      'Chips keep their intrinsic size and the strip wraps to a second line. A shrunk chip clips its own nowrap label, so the strip breaks instead of the chip.',
    preview: (
      <div className="w-[560px] overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-3 border-b border-slate-200 px-5 py-4">
          <label className="flex min-w-[150px] flex-1 basis-[200px] items-center gap-[9px] rounded-md border border-slate-300 bg-white px-3 py-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input defaultValue="" placeholder="Search" className="w-full border-none bg-transparent text-[13px] outline-none placeholder:text-slate-400" />
          </label>
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            {['Critical', 'High'].map((l) => (
              <span
                key={l}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 py-1 pl-[11px] pr-1.5 text-xs font-semibold text-ink"
              >
                {l}
                <button aria-label={`Remove ${l}`} className="inline-flex text-slate-400 hover:text-slate-600">
                  <X />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="px-5 py-8 text-center text-[13px] text-slate-400">filtered results</div>
      </div>
    ),
    code: `.chips      { flex-wrap: wrap; min-width: 0 }
.chips > *  { flex: 0 0 auto }        /* chips never shrink — the STRIP wraps */

.filterbar .field { flex: 1 1 200px; min-width: 150px }  /* search is elastic */`,
  },
  {
    name: 'Mobile · scrolling chip row',
    platform: 'Mobile',
    description:
      'A horizontally scrolling row with a hidden scrollbar. Chips are 38px minimum height with a 44px hit area; active inverts to ink.',
    preview: (
      <PhoneFrame className="py-4">
        <div className="flex gap-[7px] overflow-x-auto px-4 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:h-0">
          {[
            { l: 'All', n: 21, on: true },
            { l: 'Critical', n: 2, on: false },
            { l: 'High', n: 5, on: false },
            { l: 'Medium', n: 11, on: false },
            { l: 'Low', n: 3, on: false },
          ].map(({ l, n, on }) => (
            <button
              key={l}
              className={`relative inline-flex min-h-[38px] shrink-0 items-center gap-[5px] rounded-full border px-3 text-xs font-semibold ${
                on ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              {l}
              <span className={`font-mono text-[11px] font-extrabold ${on ? 'text-white/70' : 'text-slate-500'}`}>
                {n}
              </span>
            </button>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<div className="flex gap-[7px] overflow-x-auto px-4 py-1
  [scrollbar-width:none] [&::-webkit-scrollbar]:h-0">
  <button className={\`relative inline-flex min-h-[38px] shrink-0 items-center gap-[5px]
    rounded-full border px-3 text-xs font-semibold \${on
      ? "border-ink bg-ink text-white"
      : "border-slate-200 bg-white text-slate-600"}\`}>
    Critical <span className="font-mono text-[11px] font-extrabold">2</span>
  </button>
</div>`,
  },
]

export default function FilterChipsPage() {
  return (
    <ComponentDoc
      title="Filter chips"
      intro={
        <>
          Shows what is currently filtering a list, and lets each facet be toggled or dismissed. A
          chip always states its own value; &ldquo;3 filters applied&rdquo; is not a chip, it is a
          hidden state.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['filter-chips']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Chips never shrink. Their label is nowrap, so a squeezed chip clips its own text: the{' '}
            <em>strip</em> wraps or scrolls instead.
          </>,
          <>
            Every applied filter is visible as a chip. A filter the operator cannot see is a filter
            they will forget, and an alarm list with an invisible filter is a safety problem.
          </>,
          <>
            The severity dot inside a chip is 7px and unringed; it sits on a flat slate-100 fill
            where it already has an edge.
          </>,
          <>
            On mobile the row scrolls horizontally rather than wrapping, so the list below keeps its
            vertical space.
          </>,
        ],
      }}
    />
  )
}
