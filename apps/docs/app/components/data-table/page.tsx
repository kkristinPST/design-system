import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const th =
  'whitespace-nowrap border-b border-slate-200 bg-slate-50 px-3.5 py-[11px] text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500'
const td = 'border-b border-slate-100 px-3.5 py-3 text-[13px] text-slate-600'

const rows = [
  ['PT-1201', 'Pump sump', '2.41', 'bar', 'Normal'],
  ['DO-0403', 'RAS 2 · TK-04', '6.20', 'mg/L', 'Low'],
  ['FT-0220', 'Water treatment', '284.0', 'm³/h', 'Normal'],
]

const variants: Variant[] = [
  {
    name: 'Data table',
    platform: 'Desktop',
    description:
      'Uppercase 10px headers on a slate-50 band, 13px body rows on slate-100 hairlines. Numeric columns are right-aligned and mono; hovering a row lifts it to slate-50.',
    preview: (
      <div className="w-[620px] overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={`${th} rounded-tl-xl`}>
                <span className="inline-flex cursor-pointer items-center gap-1.5">
                  Tag
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 15 6 6 6-6" /></svg>
                </span>
              </th>
              <th className={th}>Location</th>
              <th className={`${th} text-right`}>Value</th>
              <th className={th}>Unit</th>
              <th className={`${th} rounded-tr-xl`}>State</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([tag, loc, v, u, s]) => (
              <tr key={tag} className="transition-colors hover:bg-slate-50">
                <td className={`${td} font-mono text-xs text-ink`}>{tag}</td>
                <td className={td}>{loc}</td>
                <td className={`${td} text-right font-mono text-xs text-ink tabular-nums`}>{v}</td>
                <td className={`${td} font-mono text-xs text-slate-500`}>{u}</td>
                <td className={td}>
                  <span
                    className={`inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.5px] ${
                      s === 'Low' ? 'bg-warning-bg text-warning-text' : 'bg-success-bg text-success-text'
                    }`}
                  >
                    {s}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    code: `<table className="w-full border-collapse">
  <thead>
    <tr><th className="border-b border-slate-200 bg-slate-50 px-3.5 py-[11px] text-left
      text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500">Tag</th></tr>
  </thead>
  <tbody>
    <tr className="hover:bg-slate-50">
      <td className="border-b border-slate-100 px-3.5 py-3 text-[13px] text-slate-600">…</td>
      <td className="… text-right font-mono text-xs tabular-nums text-ink">2.41</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    name: 'Compact density',
    platform: 'Desktop',
    description:
      'The user-level density setting tightens padding from 11/14 to 6/12 and drops the body to 12.5px. It is a spacing setting — it never shrinks a hit target.',
    preview: (
      <div className="w-[620px] overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Tag', 'Location', 'Value', 'State'].map((h, i) => (
                <th
                  key={h}
                  className={`whitespace-nowrap border-b border-slate-200 bg-slate-50 px-3 py-1.5 text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500 ${
                    i === 0 ? 'rounded-tl-xl' : ''
                  } ${i === 3 ? 'rounded-tr-xl' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([tag, loc, v, u, s]) => (
              <tr key={tag} className="hover:bg-slate-50">
                <td className="border-b border-slate-100 px-3 py-1.5 font-mono text-[11px] text-ink">{tag}</td>
                <td className="border-b border-slate-100 px-3 py-1.5 text-[12px] text-slate-600">{loc}</td>
                <td className="border-b border-slate-100 px-3 py-1.5 text-right font-mono text-[11px] text-ink tabular-nums">
                  {v} <span className="text-slate-500">{u}</span>
                </td>
                <td className="border-b border-slate-100 px-3 py-1.5 text-[12px] text-slate-600">{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    code: `body.nj-compact .tbl th { padding: 6px 12px }
body.nj-compact .tbl td { padding: 6px 12px; font-size: 12.5px }

/* density also tightens cards, KPIs and grid gaps — but never a font or a hit target */`,
  },
  {
    name: 'Empty and overflow',
    platform: 'Desktop',
    description:
      'An empty table keeps its header and states the reason in the body. A wide table scrolls inside its own wrapper so the page never scrolls sideways and no column is hidden.',
    preview: (
      <div className="flex w-[620px] flex-col gap-4">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Tag', 'Location', 'Value'].map((h, i) => (
                  <th key={h} className={`${th} ${i === 0 ? 'rounded-tl-xl' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
          </table>
          <p className="px-5 py-[34px] text-center text-[13px] text-slate-400">
            No instruments match these filters.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-ink">
              Filters stay put
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse">
              <thead>
                <tr>
                  {['Tag', 'Location', 'Value', 'Unit', 'State', 'Last change', 'Owner'].map((h) => (
                    <th key={h} className={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {['DO-0403', 'RAS 2 · TK-04', '6.20', 'mg/L', 'Low', '04 Mar 09:12', 'K. Berg'].map((c, i) => (
                    <td key={i} className={td}>{c}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    code: `{/* the SCROLL OWNER is a wrapper around the table — never the card,
    or the filter bar and bulk actions scroll sideways with it */}
<div className="overflow-x-auto">
  <table className="w-full min-w-[780px] border-collapse">…</table>
</div>

{/* empty state keeps the header */}
<p className="px-5 py-[34px] text-center text-[13px] text-slate-400">
  No instruments match these filters.
</p>`,
  },
  {
    name: 'Mobile — table becomes cards',
    platform: 'Mobile',
    description:
      'The phone build never renders a horizontal table. Each row becomes a card: identity on the first line, the reading large and mono, and the remaining columns as a label/value pair list.',
    preview: (
      <PhoneFrame className="border-none bg-transparent shadow-none">
        <div className="flex flex-col gap-2.5">
          {rows.slice(0, 2).map(([tag, loc, v, u, s]) => (
            <div key={tag} className="rounded-2xl border border-slate-200 bg-white px-4 py-[13px]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs tracking-[0.3px] text-slate-500">{tag}</span>
                <span
                  className={`inline-flex items-center rounded px-[5px] py-0.5 text-[9px] font-extrabold uppercase tracking-[0.5px] ${
                    s === 'Low' ? 'bg-warning-bg text-warning-text' : 'bg-success-bg text-success-text'
                  }`}
                >
                  {s}
                </span>
              </div>
              <p className="mt-2 font-mono text-[26px] font-semibold leading-none tracking-[-0.5px] text-ink tabular-nums">
                {v}
                <span className="ml-1 text-xs font-medium text-slate-400">{u}</span>
              </p>
              <p className="mt-2 text-[12px] text-slate-500">{loc}</p>
            </div>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `{/* one card per row — never a horizontally scrolling table on a phone */}
<div className="rounded-2xl border border-slate-200 bg-white px-4 py-[13px]">
  <div className="flex items-center justify-between gap-2">
    <span className="font-mono text-xs text-slate-500">{tag}</span><StateChip />
  </div>
  <p className="mt-2 font-mono text-[26px] font-semibold tabular-nums">{value}
    <span className="ml-1 text-xs text-slate-400">{unit}</span></p>
  <p className="mt-2 text-[12px] text-slate-500">{location}</p>
</div>`,
  },
]

export default function DataTablePage() {
  return (
    <ComponentDoc
      title="Data table"
      intro={
        <>
          Dense tabular data on desktop. Numbers are mono and right-aligned so magnitudes line up;
          identifiers are mono and left-aligned; prose is sans. On mobile the table is not scaled
          down — it is rebuilt as cards.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['data-table']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The scroll owner is a wrapper around the table, not the card. Letting the card scroll
            takes the filter chips and bulk actions sideways with it.
          </>,
          <>
            Never use <code className="font-mono text-[12px]">display:block</code> on the table to
            solve overflow — it makes the inner table box shrink-to-fit, so a fixed-width table
            stops short of the card edge.
          </>,
          <>
            An empty table keeps its header and explains why it is empty. A bare blank area is
            indistinguishable from a failed load.
          </>,
          <>
            Compact density is a <em>spacing</em> decision. It tightens padding and grid gaps across
            cards, KPIs and feeds — and never shrinks a font or a target.
          </>,
        ],
      }}
    />
  )
}
