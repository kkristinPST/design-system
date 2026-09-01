import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const Chevron = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round" className="shrink-0">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const variants: Variant[] = [
  {
    name: 'Mobile — list row',
    platform: 'Mobile',
    description:
      'The workhorse of the phone build. A 38px icon tile, a two-line text block, and a trailing region for a value, badge or chevron. Rows divide on slate-100 inside a 16px-radius card.',
    preview: (
      <PhoneFrame>
        {[
          { t: 'RAS 2', s: '7 active alarms · 4 unacked', v: '', b: 'crit' },
          { t: 'Water treatment', s: 'All systems normal', v: '', b: 'ok' },
          { t: 'Pump sump', s: '1 high alarm', v: '', b: 'high' },
        ].map(({ t, s, b }, i, a) => (
          <button
            key={t}
            className={`flex w-full items-center gap-3 px-[15px] py-3.5 text-left active:bg-slate-50 ${
              i < a.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <span className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-slate-100 text-slate-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h14v16H5Z" /><path d="M5 10h14" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold leading-tight text-ink">{t}</span>
              <span className="mt-0.5 block truncate text-[12px] text-slate-500">{s}</span>
            </span>
            <span className="flex shrink-0 items-center gap-2 text-slate-400">
              <span
                className={`inline-flex items-center rounded px-[5px] py-0.5 text-[9px] font-extrabold uppercase tracking-[0.5px] ${
                  b === 'crit'
                    ? 'bg-critical-bg text-critical-text'
                    : b === 'high'
                      ? 'bg-warning-bg text-warning-text'
                      : 'bg-success-bg text-success-text'
                }`}
              >
                {b === 'crit' ? 'Crit' : b === 'high' ? 'High' : 'OK'}
              </span>
              <Chevron />
            </span>
          </button>
        ))}
      </PhoneFrame>
    ),
    code: `<button className="flex w-full items-center gap-3 border-b border-slate-100
  px-[15px] py-3.5 text-left last:border-b-0 active:bg-slate-50">
  <span className="h-[38px] w-[38px] shrink-0 rounded-[11px] bg-slate-100 text-slate-600
    inline-flex items-center justify-center"><Icon /></span>
  <span className="min-w-0 flex-1">
    <span className="block text-sm font-semibold text-ink">{title}</span>
    <span className="block truncate text-[12px] text-slate-500">{subtitle}</span>
  </span>
  <span className="flex shrink-0 items-center gap-2 text-slate-400">
    <StateChip /> <ChevronRightIcon />
  </span>
</button>`,
  },
  {
    name: 'Mobile — reading rows',
    platform: 'Mobile',
    description:
      'Label on the left, mono value on the right, no icon. Minimum 48px so the row is tappable when it drills into a trend.',
    preview: (
      <PhoneFrame>
        {[
          ['Dissolved oxygen', '6.2', 'mg/L'],
          ['Temperature', '12.4', '°C'],
          ['pH', '7.1', ''],
          ['Flow', '284', 'm³/h'],
        ].map(([l, v, u], i, a) => (
          <button
            key={l}
            className={`flex min-h-[48px] w-full items-center gap-[9px] px-3.5 py-3 text-left active:bg-slate-50 ${
              i < a.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <span className="flex-1 text-[12px] font-semibold text-slate-600">{l}</span>
            <span className="font-mono text-sm font-bold text-ink tabular-nums">{v}</span>
            {u && <span className="font-mono text-[11px] font-semibold text-slate-500">{u}</span>}
            <Chevron />
          </button>
        ))}
      </PhoneFrame>
    ),
    code: `<button className="flex min-h-[48px] w-full items-center gap-[9px] border-b border-slate-100
  px-3.5 py-3 text-left active:bg-slate-50">
  <span className="flex-1 text-[12px] font-semibold text-slate-600">{label}</span>
  <span className="font-mono text-sm font-bold text-ink tabular-nums">{value}</span>
  <span className="font-mono text-[11px] font-semibold text-slate-500">{unit}</span>
  <ChevronRightIcon />
</button>`,
  },
  {
    name: 'Mobile — fact grid',
    platform: 'Mobile',
    description:
      'A two-column read-only grid for detail screens. Cells divide with slate-100 hairlines; the right column drops its right border so no rule floats against the card edge.',
    preview: (
      <PhoneFrame className="p-0">
        <div className="grid grid-cols-2">
          {[
            ['Species', 'Atlantic salmon'],
            ['Stocked', '12 Feb'],
            ['Biomass', '18 420 kg'],
            ['Density', '42 kg/m³'],
          ].map(([l, v], i) => (
            <div
              key={l}
              className={`px-3.5 py-3 ${i % 2 === 0 ? 'border-r border-slate-100' : ''} ${
                i < 2 ? 'border-b border-slate-100' : ''
              }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.4px] text-slate-400">{l}</p>
              <p className="mt-1 font-mono text-base font-semibold text-ink tabular-nums">{v}</p>
            </div>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white">
  <div className="border-r border-b border-slate-100 px-3.5 py-3 [&:nth-child(2n)]:border-r-0">
    <p className="text-[10px] font-bold uppercase tracking-[0.4px] text-slate-400">{label}</p>
    <p className="mt-1 font-mono text-base font-semibold tabular-nums text-ink">{value}</p>
  </div>
</div>`,
  },
  {
    name: 'Desktop — drill-in row',
    platform: 'Desktop',
    description:
      'The desktop counterpart, used for notes and search results. A bordered card row whose border turns cyan on hover, with a two-line clamp on the body text.',
    preview: (
      <div className="flex w-[520px] flex-col gap-2">
        {[
          { h: 'Lye dosing pump replaced', t: 'Swapped the dosing head on PU-31; old head is in the workshop for inspection. Flow verified at 4.2 L/h afterwards.', tag: 'PU-31', by: 'K. Berg', isNew: true },
          { h: 'Handover — night shift', t: 'DO in TK-04 has been drifting low all evening. Trend attached; keep an eye on it after the 02:00 feed.', tag: 'TK-04', by: 'M. Solheim', isNew: false },
        ].map(({ h, t, tag, by, isNew }) => (
          <button
            key={h}
            className="flex w-full items-center gap-3 rounded-md border border-slate-200 bg-white px-3.5 py-3 text-left transition-colors hover:border-primary hover:bg-slate-50"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-[5px]">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-bold text-ink">{h}</span>
                {isNew && (
                  <span className="rounded-sm bg-primary px-1.5 py-px text-[9px] font-bold tracking-[0.5px] text-white">
                    NEW
                  </span>
                )}
              </span>
              <span className="line-clamp-2 text-[12px] leading-snug text-slate-600">{t}</span>
              <span className="flex items-baseline gap-2.5">
                <span className="font-mono text-[11px] text-slate-400">{tag}</span>
                <span className="ml-auto text-[11px] text-slate-400">{by}</span>
              </span>
            </span>
          </button>
        ))}
      </div>
    ),
    code: `<button className="flex w-full items-center gap-3 rounded-md border border-slate-200
  bg-white px-3.5 py-3 text-left hover:border-primary hover:bg-slate-50">
  <span className="flex min-w-0 flex-1 flex-col gap-[5px]">
    <span className="text-[13px] font-bold text-ink">{header}</span>
    <span className="line-clamp-2 text-[12px] leading-snug text-slate-600">{text}</span>
    <span className="flex items-baseline gap-2.5">
      <span className="font-mono text-[11px] text-slate-400">{tag}</span>
      <span className="ml-auto text-[11px] text-slate-400">{author}</span>
    </span>
  </span>
</button>`,
  },
]

export default function ListRowPage() {
  return (
    <ComponentDoc
      title="List row"
      intro={
        <>
          The mobile build&rsquo;s equivalent of a table row, and the desktop pattern for anything
          that drills in. A row is a single target with a clear leading identity, a truncating
          subtitle, and a trailing region that never competes with the title.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['list-row']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The subtitle truncates; the title does not. If both can shrink, the row loses its
            identity at exactly the width where you most need it.
          </>,
          <>
            The last row drops its divider. A hairline sitting against the card edge reads as a
            rendering fault.
          </>,
          <>
            Rows are 48px minimum, and the tappable region is the whole row — never just the
            chevron.
          </>,
          <>
            Values in the trailing region are mono and tabular so a column of readings aligns down
            the list.
          </>,
        ],
      }}
    />
  )
}
