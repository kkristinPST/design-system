import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const data = [8.4, 8.35, 8.5, 8.2, 7.95, 7.6, 7.45, 7.15, 6.95, 6.6, 6.4, 6.2]
const W = 520
const H = 150
const MIN = 6
const MAX = 9

const x = (i: number) => (i / (data.length - 1)) * W
const y = (v: number) => H - ((v - MIN) / (MAX - MIN)) * H
const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')

const variants: Variant[] = [
  {
    name: 'Trend chart',
    platform: 'Desktop',
    description:
      'Mono 10px axis labels in slate-400, a slate-100 gridline per tick, and dashed threshold lines in warning and critical. The current value is stated above the plot, not only on it.',
    preview: (
      <div className="w-[600px] rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
            Dissolved oxygen · DO-0403
          </span>
          <span className="text-base font-bold text-ink">
            <span className="font-mono tabular-nums">6.2</span>{' '}
            <span className="text-xs font-normal text-slate-400">mg/L</span>
          </span>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" role="img" aria-label="Dissolved oxygen falling from 8.4 to 6.2 mg/L over 12 hours, crossing the high and critical thresholds">
          {[9, 8, 7, 6].map((v) => (
            <g key={v}>
              <line x1="0" x2={W} y1={y(v)} y2={y(v)} stroke="var(--color-slate-100)" strokeWidth="1" />
              <text x="-8" y={y(v) + 3} textAnchor="end" className="fill-slate-400 font-mono text-[10px]">
                {v}
              </text>
            </g>
          ))}

          <line x1="0" x2={W} y1={y(7.5)} y2={y(7.5)} stroke="var(--color-warning)" strokeWidth="1.4" strokeDasharray="5 4" />
          <line x1="0" x2={W} y1={y(7)} y2={y(7)} stroke="var(--color-critical)" strokeWidth="1.4" strokeDasharray="5 4" />

          <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="color-mix(in srgb, var(--color-primary) 10%, transparent)" />
          <path d={line} fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={x(data.length - 1)} cy={y(6.2)} r="3.5" fill="var(--color-primary)" stroke="#fff" strokeWidth="1.5" />

          {[0, 4, 8, 11].map((i) => (
            <text key={i} x={x(i)} y={H + 15} textAnchor="middle" className="fill-slate-400 font-mono text-[10px]">
              {`${String(9 + i).padStart(2, '0')}:00`}
            </text>
          ))}
        </svg>

        <div className="mt-5 flex gap-[18px]">
          {[
            ['High limit 7.5', 'border-warning'],
            ['Critical 7.0', 'border-critical'],
          ].map(([l, c]) => (
            <span key={l} className="inline-flex items-center gap-[7px] text-xs text-slate-500">
              <span className={`h-0 w-4 border-t-2 border-dashed ${c}`} />
              {l}
            </span>
          ))}
        </div>
      </div>
    ),
    code: `<svg viewBox="0 0 520 150" role="img" aria-label="…describe the trend in words…">
  {/* gridlines + mono axis labels */}
  <line stroke="var(--color-slate-100)" />
  <text className="fill-slate-400 font-mono text-[10px]">8</text>

  {/* thresholds — dashed, in the status ramp */}
  <line stroke="var(--color-warning)"  strokeDasharray="5 4" />
  <line stroke="var(--color-critical)" strokeDasharray="5 4" />

  {/* series */}
  <path d={line} fill="none" stroke="var(--color-primary)" strokeWidth="2" />
  <circle r="3.5" fill="var(--color-primary)" stroke="#fff" strokeWidth="1.5" />
</svg>`,
  },
  {
    name: 'Multi-pen legend',
    platform: 'Desktop',
    description:
      'Comparison charts give each pen a swatch, a name and its own value. The pens use distinguishable hues from the palette, never the severity ramp; a pen is not a status.',
    preview: (
      <div className="w-[600px] rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {[
            ['Dissolved O₂', 'var(--color-primary)', '6.2 mg/L'],
            ['Temperature', 'var(--color-fl-glycol)', '12.4 °C'],
            ['Flow', 'var(--color-fl-brine)', '284 m³/h'],
          ].map(([l, c, v]) => (
            <span key={l} className="inline-flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: c }} />
              <span className="font-semibold text-slate-600">{l}</span>
              <span className="font-mono text-ink tabular-nums">{v}</span>
            </span>
          ))}
        </div>
        <div className="mt-3 flex gap-1">
          {['var(--color-primary)', 'var(--color-fl-glycol)', 'var(--color-fl-brine)'].map((c) => (
            <span key={c} className="h-[5px] w-4 rounded-[3px]" style={{ background: c }} />
          ))}
        </div>
      </div>
    ),
    code: `<span className="inline-flex items-center gap-2 text-xs">
  <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: penColor }} />
  <span className="font-semibold text-slate-600">{name}</span>
  <span className="font-mono tabular-nums text-ink">{value}</span>
</span>`,
  },
  {
    name: 'Mobile · trend card',
    platform: 'Mobile',
    description:
      'A 16px-radius card with the value above the plot and mono time labels below. Below the chart sits a landscape hint: rotating the phone opens a full-width chart.',
    preview: (
      <PhoneFrame className="p-3.5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-[22px] font-semibold text-ink tabular-nums">6.2</span>
          <span className="text-[11px] text-slate-500">mg/L · last 12h</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden>
          <line x1="0" x2={W} y1={y(7)} y2={y(7)} stroke="var(--color-critical)" strokeWidth="2" strokeDasharray="6 5" />
          <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="color-mix(in srgb, var(--color-primary) 12%, transparent)" />
          <path d={line} fill="none" stroke="var(--color-primary)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={x(data.length - 1)} cy={y(6.2)} r="5" fill="var(--color-primary)" stroke="#fff" strokeWidth="2.4" />
        </svg>
        <div className="mt-1.5 flex justify-between font-mono text-[10px] text-slate-400">
          {['09:00', '13:00', '17:00', '20:00'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="6" width="18" height="12" rx="2" />
          </svg>
          Rotate for a full chart
        </div>
      </PhoneFrame>
    ),
    code: `<div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-[15px]">
  <div className="mb-1.5 flex items-center justify-between">
    <span className="font-mono text-[22px] font-semibold tabular-nums text-ink">6.2</span>
    <span className="text-[11px] text-slate-500">mg/L · last 12h</span>
  </div>
  <svg viewBox="0 0 520 150" className="block h-auto w-full" aria-hidden>…</svg>
  <div className="mt-1.5 flex justify-between font-mono text-[10px] text-slate-400">…</div>
</div>`,
  },
]

export default function TrendChartPage() {
  return (
    <ComponentDoc
      title="Trend chart"
      intro={
        <>
          History with a scale. Used in the equipment dialog, the trend window and the mobile detail
          screen. Thresholds are drawn as dashed lines in the status ramp so an operator can see how
          close a value is to alarming, not just where it is.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['trend-chart']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Axis labels are mono at 10px in slate-400. Proportional digits make a y-axis look
            ragged.
          </>,
          <>
            Thresholds are dashed and use the status ramp; the series itself uses brand cyan or a
            pen colour. A series painted in a severity colour reads as permanently alarming.
          </>,
          <>
            Give the <code className="font-mono text-[12px]">svg</code> a{' '}
            <code className="font-mono text-[12px]">role=&quot;img&quot;</code> and an aria-label
            that <em>describes the trend</em>: direction, range and any threshold crossing.
          </>,
          <>
            Charts scale with their pane and never force a minimum width. A mimic or chart that
            demands 900px breaks every two-pane layout.
          </>,
          <>
            Markers on the chart link back to the alarm row they came from, and arriving there
            highlights that row for one second.
          </>,
        ],
      }}
    />
  )
}
