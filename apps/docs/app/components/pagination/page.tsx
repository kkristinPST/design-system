import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const pg =
  'inline-flex h-[30px] min-w-[30px] items-center justify-center rounded-md border border-transparent px-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-100'

const variants: Variant[] = [
  {
    name: 'Table footer',
    platform: 'Desktop',
    description:
      'Rows-per-page on the left, pager on the right, separated from the table by a slate-200 rule. The active page is a solid ink chip; First / Last are lighter link-weight buttons.',
    preview: (
      <div className="w-[680px] overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="px-5 py-8 text-center text-[13px] text-slate-400">table body</div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-[18px] py-3">
          <span className="inline-flex items-center gap-2 text-[13px] text-slate-600">
            Rows per page
            <select
              defaultValue="50"
              className="cursor-pointer appearance-none rounded-md border border-slate-300 bg-white py-1.5 pl-3 pr-7 text-[13px] text-ink outline-none [background-image:linear-gradient(45deg,transparent_50%,#666F7D_50%),linear-gradient(135deg,#666F7D_50%,transparent_50%)] [background-position:calc(100%-14px)_calc(50%+1px),calc(100%-9px)_calc(50%+1px)] [background-repeat:no-repeat] [background-size:5px_5px,5px_5px]"
            >
              <option>25</option><option>50</option><option>100</option>
            </select>
          </span>

          <div className="flex min-w-0 flex-wrap items-center gap-1">
            <button className={`${pg} shrink-0 font-medium text-slate-500`}>First</button>
            <button className={`${pg} shrink-0`} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            {['1', '2', '3'].map((n) => (
              <button
                key={n}
                className={`${pg} shrink-0 ${n === '2' ? 'border-ink bg-ink text-white hover:bg-ink' : ''}`}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-[13px] text-slate-400">…</span>
            <button className={`${pg} shrink-0`}>12</button>
            <button className={`${pg} shrink-0`} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
            <button className={`${pg} shrink-0 font-medium text-slate-500`}>Last</button>
          </div>
        </div>
      </div>
    ),
    code: `<div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200
  px-[18px] py-3">
  <RowsPerPage />
  <div className="flex min-w-0 flex-wrap items-center gap-1">
    <button className="h-[30px] min-w-[30px] rounded-md px-2 text-[13px] font-semibold
      text-slate-600 hover:bg-slate-100">1</button>
    <button className="… border-ink bg-ink text-white">2</button>   {/* active */}
  </div>
</div>`,
  },
  {
    name: 'Jump to page',
    platform: 'Desktop',
    description:
      'For long registers. A 48px mono input beside the pager — typing a page number is faster than clicking through twelve pages of alarms.',
    preview: (
      <div className="flex w-[680px] flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-[18px] py-3">
        <span className="text-[13px] text-slate-600">1 – 50 of 584</span>
        <span className="inline-flex items-center gap-2 text-[13px] text-slate-600">
          Go to page
          <input
            defaultValue="2"
            className="w-12 rounded-md border border-slate-300 bg-white px-1 py-1.5 text-center font-mono text-[13px] text-ink outline-none tabular-nums"
          />
          <span className="text-slate-400">of 12</span>
        </span>
      </div>
    ),
    code: `<span className="inline-flex items-center gap-2 text-[13px] text-slate-600">
  Go to page
  <input className="w-12 rounded-md border border-slate-300 bg-white px-1 py-1.5
    text-center font-mono text-[13px] tabular-nums text-ink outline-none" />
  <span className="text-slate-400">of 12</span>
</span>`,
  },
  {
    name: 'Wrapping',
    platform: 'Desktop',
    description:
      'The pager is a nowrap flex row whose First / Last buttons keep their full label width. The strip breaks to a second line rather than shrinking a button below its own text.',
    preview: (
      <div className="w-[380px] rounded-xl border border-slate-200 bg-white px-4 py-3">
        <div className="flex min-w-0 flex-wrap items-center gap-1">
          <button className={`${pg} shrink-0 font-medium text-slate-500`}>First</button>
          {['1', '2', '3', '4', '5'].map((n) => (
            <button key={n} className={`${pg} shrink-0 ${n === '1' ? 'border-ink bg-ink text-white' : ''}`}>
              {n}
            </button>
          ))}
          <button className={`${pg} shrink-0 font-medium text-slate-500`}>Last</button>
        </div>
      </div>
    ),
    code: `.pager     { flex-wrap: wrap; min-width: 0 }
.pager > * { flex: 0 0 auto }   /* buttons never shrink below their own labels */

/* do NOT "fix" overflow by capping the visible page-number count */`,
  },
  {
    name: 'Mobile — load more',
    platform: 'Mobile',
    description:
      'The phone build does not paginate. It shows a range summary and a full-width load-more button, so the operator never loses their scroll position mid-list.',
    preview: (
      <PhoneFrame className="border-none bg-transparent shadow-none">
        <div className="flex flex-col gap-2">
          {['DO-0403 · Dissolved oxygen low', 'PU-11A · Vibration high'].map((t) => (
            <div key={t} className="rounded-[14px] border border-slate-200 bg-white px-[13px] py-3 text-[12px] text-slate-600">
              {t}
            </div>
          ))}
          <p className="mt-1 text-center text-[11px] font-bold uppercase tracking-[0.4px] text-slate-500">
            Showing 20 of 584
          </p>
          <button className="inline-flex h-[50px] w-full items-center justify-center gap-[7px] rounded-[14px] border border-slate-200 bg-white text-sm font-bold text-ink">
            Load 20 more
          </button>
        </div>
      </PhoneFrame>
    ),
    code: `<p className="text-center text-[11px] font-bold uppercase tracking-[0.4px] text-slate-500">
  Showing 20 of 584
</p>
<button className="h-[50px] w-full rounded-[14px] border border-slate-200 bg-white
  text-sm font-bold text-ink">
  Load 20 more
</button>`,
  },
]

export default function PaginationPage() {
  return (
    <ComponentDoc
      title="Pagination"
      intro={
        <>
          Moves through a long register. Desktop uses a numbered pager in the table footer with a
          rows-per-page control; mobile drops paging entirely for progressive loading, because a
          pager on a phone throws away the scroll position.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.pagination}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Always state the range and the total — &ldquo;1 – 50 of 584&rdquo;. A page number
            without a total tells the operator nothing about how much is left.
          </>,
          <>
            The pager wraps to a second line rather than shrinking its buttons or hiding page
            numbers. Buttons keep their intrinsic width.
          </>,
          <>
            The rows-per-page control is a native select, so it needs{' '}
            <code className="font-mono text-[12px]">color-scheme</code> set by the theme or the OS
            paints a light popup under light text.
          </>,
          <>
            On mobile, load-more appends. It never replaces the list or resets the scroll.
          </>,
        ],
      }}
    />
  )
}
