import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const Ic = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const links = [
  { l: 'SCADA user guide', s: 'Mimic navigation, symbols, controls', d: 'M6 3h9l5 5v13H6Z' },
  { l: 'Fish feeding guide', s: 'Feed tables, dosing, HyFlow', d: 'M4 12h16M12 4v16' },
  { l: 'Alarm philosophy', s: 'Priorities, rationalization, shelving', d: 'M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6' },
]

const variants: Variant[] = [
  {
    name: 'Quick link rows',
    platform: 'Desktop',
    description:
      'A 38px slate-100 icon tile, a 14px/600 label and a 12px slate-500 subtitle. Hover lifts the row to slate-50 and deepens the border — the whole row is the target.',
    preview: (
      <div className="flex w-[480px] flex-col gap-2">
        {links.map(({ l, s, d }) => (
          <button
            key={l}
            className="flex w-full items-center gap-[13px] rounded-md border border-slate-200 bg-white px-3.5 py-3 text-left transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <span className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
              <Ic d={d} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-sm font-semibold text-ink">{l}</span>
              <span className="text-xs text-slate-500">{s}</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        ))}
      </div>
    ),
    code: `<button className="flex w-full items-center gap-[13px] rounded-md border border-slate-200
  bg-white px-3.5 py-3 text-left hover:border-slate-300 hover:bg-slate-50">
  <span className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center
    rounded-md bg-slate-100 text-slate-600"><Icon /></span>
  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
    <span className="text-sm font-semibold text-ink">{label}</span>
    <span className="text-xs text-slate-500">{subtitle}</span>
  </span>
  <ChevronRightIcon />
</button>`,
  },
  {
    name: 'Dashboard tile grid',
    platform: 'Desktop',
    description:
      'The same links as cards on the start page. An auto-fit grid with a 238px minimum, so it re-columns instead of shrinking the tiles.',
    preview: (
      <div className="grid w-[560px] grid-cols-3 gap-3.5">
        {[
          { l: 'Alarms', n: '7', d: 'M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6', tone: 'text-critical-text' },
          { l: 'Tanks', n: '12', d: 'M5 4h14v16H5Z', tone: 'text-ink' },
          { l: 'Reports', n: '3', d: 'M6 3h9l5 5v13H6Z', tone: 'text-ink' },
        ].map(({ l, n, d, tone }) => (
          <button
            key={l}
            className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-[border-color,box-shadow] hover:border-slate-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-md bg-slate-100 text-slate-600">
              <Ic d={d} />
            </span>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.8px] text-primary-text">
              {l}
            </p>
            <p className={`mt-1 font-mono text-2xl tabular-nums ${tone}`}>{n}</p>
          </button>
        ))}
      </div>
    ),
    code: `<div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(238px,100%),1fr))]">
  <button className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow
    hover:border-slate-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
    <IconTile /> <Eyebrow /> <Metric />
  </button>
</div>`,
  },
  {
    name: 'Mobile — list rows',
    platform: 'Mobile',
    description:
      'The same links collapse into a divided card. The icon tile drops to 38px with an 11px radius and the chevron marks each row as a drill-in.',
    preview: (
      <PhoneFrame>
        {links.map(({ l, s, d }, i, a) => (
          <button
            key={l}
            className={`flex w-full items-center gap-3 px-[15px] py-3.5 text-left ${
              i < a.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <span className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-slate-100 text-slate-600">
              <Ic d={d} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold leading-tight text-ink">{l}</span>
              <span className="mt-0.5 block truncate text-[12px] text-slate-500">{s}</span>
            </span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round" className="shrink-0"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        ))}
      </PhoneFrame>
    ),
    code: `<button className="flex w-full items-center gap-3 border-b border-slate-100
  px-[15px] py-3.5 text-left last:border-b-0">
  <span className="h-[38px] w-[38px] rounded-[11px] bg-slate-100 text-slate-600
    inline-flex items-center justify-center"><Icon /></span>
  <span className="min-w-0 flex-1">
    <span className="block text-sm font-semibold text-ink">{label}</span>
    <span className="block truncate text-[12px] text-slate-500">{subtitle}</span>
  </span>
  <ChevronRightIcon />
</button>`,
  },
]

export default function QuickLinksPage() {
  return (
    <ComponentDoc
      title="Quick links"
      intro={
        <>
          Signposts to a destination, used on the start page and in the help dialog. Each carries an
          icon tile, a label and a subtitle explaining what is on the other side — a link without
          that second line is a guess.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['quick-links']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The subtitle is not optional. It is what separates a quick link from a bare nav item.
          </>,
          <>
            The entire row or tile is the target, never just the label. The chevron is a hint, not a
            button.
          </>,
          <>
            Tile grids use <code className="font-mono text-[12px]">auto-fit</code> with a real
            minimum so they add and drop columns rather than squeezing at every width.
          </>,
        ],
      }}
    />
  )
}
