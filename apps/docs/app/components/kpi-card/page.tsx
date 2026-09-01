import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'KPI row',
    platform: 'Desktop',
    description:
      'Eyebrow label, mono metric, then a delta. The row is an auto-fit grid with a 208px minimum, so it drops from four columns to two rather than squeezing the numbers.',
    preview: (
      <div className="grid w-[560px] grid-cols-2 gap-4">
        {[
          { l: 'Active alarms', v: '7', u: '', d: '+2 vs 24h', tone: 'text-critical-text' },
          { l: 'Recirculation', v: '1 284', u: 'm³/h', d: '−1.2%', tone: 'text-slate-500' },
          { l: 'Feed today', v: '318', u: 'kg', d: '+4.1%', tone: 'text-success-text' },
          { l: 'Mean O₂', v: '8.1', u: 'mg/L', d: 'stable', tone: 'text-slate-500' },
        ].map(({ l, v, u, d, tone }) => (
          <div
            key={l}
            className="rounded-xl border border-slate-200 bg-white px-[18px] py-4 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">{l}</p>
            <p className="mt-3 mb-[5px] flex items-baseline gap-[5px]">
              <span className="font-mono text-2xl tracking-[-0.5px] text-ink tabular-nums">{v}</span>
              {u && <span className="text-xs text-slate-600">{u}</span>}
            </p>
            <p className={`font-mono text-xs tabular-nums ${tone}`}>{d}</p>
          </div>
        ))}
      </div>
    ),
    code: `<div className="rounded-xl border border-slate-200 bg-white px-[18px] py-4 shadow">
  <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">Active alarms</p>
  <p className="mt-3 mb-[5px] flex items-baseline gap-[5px]">
    <span className="font-mono text-2xl tabular-nums text-ink">7</span>
    <span className="text-xs text-slate-600">m³/h</span>
  </p>
  <p className="font-mono text-xs text-critical-text tabular-nums">+2 vs 24h</p>
</div>

{/* the row */}
<div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(208px,100%),1fr))]">`,
  },
  {
    name: 'Vitals variant',
    platform: 'Desktop',
    description:
      'A 2px brand-cyan top rail marks the row as live process vitals rather than counted totals. Everything else is identical.',
    preview: (
      <div className="grid w-[560px] grid-cols-2 gap-4">
        {[
          { l: 'Dissolved O₂', v: '6.2', u: 'mg/L' },
          { l: 'Temperature', v: '12.4', u: '°C' },
        ].map(({ l, v, u }) => (
          <div
            key={l}
            className="rounded-xl border border-slate-200 border-t-2 border-t-primary bg-white px-[18px] py-4 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">{l}</p>
            <p className="mt-3 flex items-baseline gap-[5px]">
              <span className="font-mono text-2xl tracking-[-0.5px] text-ink tabular-nums">{v}</span>
              <span className="text-xs text-slate-600">{u}</span>
            </p>
          </div>
        ))}
      </div>
    ),
    code: `<div className="rounded-xl border border-slate-200 border-t-2 border-t-primary
  bg-white px-[18px] py-4 shadow">
  …
</div>`,
  },
  {
    name: 'Clickable KPI',
    platform: 'Desktop',
    description:
      'A KPI that drills into a filtered view. Its eyebrow turns primary-text to advertise the link, and hover deepens the border and shadow — the card itself is the target.',
    preview: (
      <button className="w-[268px] rounded-xl border border-slate-200 bg-white px-[18px] py-4 text-left shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow] duration-150 hover:border-slate-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.8px] text-primary-text">
          Unacknowledged
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </p>
        <p className="mt-3 mb-[5px] flex items-baseline gap-[5px]">
          <span className="font-mono text-2xl tracking-[-0.5px] text-ink tabular-nums">4</span>
        </p>
        <p className="font-mono text-xs text-critical-text tabular-nums">2 stale &gt; 24h</p>
      </button>
    ),
    code: `<button className="w-full rounded-xl border border-slate-200 bg-white px-[18px] py-4
  text-left shadow transition-[border-color,box-shadow]
  hover:border-slate-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
  <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-primary-text">
    Unacknowledged <ChevronRightIcon />
  </p>
  …
</button>`,
  },
  {
    name: 'Mobile — vitals grid',
    platform: 'Mobile',
    description:
      'Two columns of 16px-radius tiles. The metric is 30px mono; an out-of-band tile takes the status mid-tone as its border, a 4px left rail, and a status-coloured sub-line.',
    preview: (
      <PhoneFrame className="border-none bg-transparent shadow-none">
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { l: 'Dissolved O₂', v: '6.2', u: 'mg/L', s: 'Below band', st: 'critical' },
            { l: 'Temperature', v: '12.4', u: '°C', s: 'In band', st: 'ok' },
            { l: 'pH', v: '7.1', u: '', s: 'In band', st: 'ok' },
            { l: 'Flow', v: '284', u: 'm³/h', s: 'Trending down', st: 'high' },
          ].map(({ l, v, u, s, st }) => (
            <div
              key={l}
              className={`relative overflow-hidden rounded-2xl border bg-white px-3.5 py-[13px] ${
                st === 'critical'
                  ? 'border-critical-mid'
                  : st === 'high'
                    ? 'border-warning-mid'
                    : 'border-slate-200'
              }`}
            >
              {st !== 'ok' && (
                <span
                  className={`absolute inset-y-0 left-0 w-1 ${
                    st === 'critical' ? 'bg-critical' : 'bg-warning'
                  }`}
                />
              )}
              <p className="text-[10px] font-extrabold uppercase tracking-[0.6px] text-slate-400">
                {l}
              </p>
              <p className="mt-[9px] font-mono text-[30px] font-semibold leading-none tracking-[-1px] text-ink tabular-nums">
                {v}
                {u && <span className="ml-0.5 text-sm font-medium text-slate-400">{u}</span>}
              </p>
              <p
                className={`mt-[7px] text-[11px] leading-tight ${
                  st === 'critical'
                    ? 'font-semibold text-critical-text'
                    : st === 'high'
                      ? 'font-semibold text-warning-text'
                      : 'text-slate-500'
                }`}
              >
                {s}
              </p>
            </div>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<div className="relative overflow-hidden rounded-2xl border border-critical-mid
  bg-white px-3.5 py-[13px]">
  <span className="absolute inset-y-0 left-0 w-1 bg-critical" />
  <p className="text-[10px] font-extrabold uppercase tracking-[0.6px] text-slate-400">Dissolved O₂</p>
  <p className="mt-[9px] font-mono text-[30px] font-semibold tracking-[-1px] tabular-nums">
    6.2<span className="ml-0.5 text-sm font-medium text-slate-400">mg/L</span>
  </p>
  <p className="mt-[7px] text-[11px] font-semibold text-critical-text">Below band</p>
</div>`,
  },
  {
    name: 'Mobile — health strip',
    platform: 'Mobile',
    description:
      'A single 16px-radius row split into equal counted cells with slate-100 dividers. Used at the top of the alarm list to show the severity split at a glance.',
    preview: (
      <PhoneFrame>
        <div className="flex items-center">
          {[
            { n: '2', l: 'Critical', c: 'text-critical-text' },
            { n: '5', l: 'High', c: 'text-warning-text' },
            { n: '11', l: 'Medium', c: 'text-medium-text' },
            { n: '3', l: 'Low', c: 'text-slate-600' },
          ].map(({ n, l, c }, i, a) => (
            <button
              key={l}
              className={`flex-1 px-2 py-[13px] text-center ${
                i < a.length - 1 ? 'border-r border-slate-100' : ''
              }`}
            >
              <span className={`block font-mono text-2xl font-bold leading-none tabular-nums ${c}`}>
                {n}
              </span>
              <span className="mt-[5px] block text-[10px] font-bold uppercase tracking-[0.4px] text-slate-400">
                {l}
              </span>
            </button>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<div className="flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
  <button className="flex-1 border-r border-slate-100 px-2 py-[13px] text-center last:border-r-0">
    <span className="block font-mono text-2xl font-bold tabular-nums text-critical-text">2</span>
    <span className="mt-[5px] block text-[10px] font-bold uppercase tracking-[0.4px]
      text-slate-400">Critical</span>
  </button>
</div>`,
  },
]

export default function KpiCardPage() {
  return (
    <ComponentDoc
      title="KPI card"
      intro={
        <>
          A single number with its label and context. The number is always mono and tabular so a
          live value updating in place never shifts its neighbours. Desktop stacks eyebrow →
          metric → delta; mobile enlarges the metric to 30px and moves status into a coloured
          sub-line and left rail.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['kpi-card']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The metric is <code className="font-mono text-[12px]">tabular-nums</code>, without
            exception. Proportional digits make a polling value jitter.
          </>,
          <>
            The unit is a separate, smaller, quieter span — it is not part of the number and should
            never compete with it.
          </>,
          <>
            A four-card row splits 2×2 below 1180px rather than leaving one orphan on a three-wide
            row.
          </>,
          <>
            Status on mobile is carried by three things at once: border tone, left rail and the
            sub-line&rsquo;s text colour. Never by the metric&rsquo;s own colour — a red number
            reads as a red <em>value</em>.
          </>,
        ],
      }}
    />
  )
}
