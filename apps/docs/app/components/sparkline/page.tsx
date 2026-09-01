import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const series = [8.4, 8.3, 8.5, 8.2, 7.9, 7.6, 7.4, 7.1, 6.9, 6.6, 6.4, 6.2]

function path(data: number[], w: number, h: number) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - min) / span) * h
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function Spark({
  data = series,
  w = 96,
  h = 26,
  stroke = 'var(--color-slate-400)',
  fill,
}: {
  data?: number[]
  w?: number
  h?: number
  stroke?: string
  fill?: string
}) {
  const d = path(data, w, h)
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block overflow-visible" aria-hidden>
      {fill && <path d={`${d} L${w} ${h} L0 ${h} Z`} fill={fill} />}
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={w}
        cy={h - ((data[data.length - 1] - Math.min(...data)) / (Math.max(...data) - Math.min(...data) || 1)) * h}
        r="2.4"
        fill={stroke}
      />
    </svg>
  )
}

const variants: Variant[] = [
  {
    name: 'Inline sparkline',
    platform: 'Desktop',
    description:
      'A shape, not a chart: no axes, no gridlines, no tooltip. It answers one question: is this value rising or falling? The final point is marked so “now” is unambiguous.',
    preview: (
      <div className="w-[480px] overflow-hidden rounded-lg border border-slate-200 bg-white">
        {[
          { l: 'Dissolved oxygen', v: '6.2', u: 'mg/L', d: series, tone: 'var(--color-critical)' },
          { l: 'Temperature', v: '12.4', u: '°C', d: [12.1, 12.2, 12.3, 12.2, 12.4, 12.3, 12.4, 12.4], tone: 'var(--color-slate-400)' },
          { l: 'Flow', v: '284', u: 'm³/h', d: [240, 250, 262, 258, 270, 276, 280, 284], tone: 'var(--color-success)' },
        ].map(({ l, v, u, d, tone }, i, a) => (
          <div
            key={l}
            className={`flex items-center gap-4 px-3.5 py-3 ${i < a.length - 1 ? 'border-b border-slate-100' : ''}`}
          >
            <span className="flex-1 text-[13px] text-slate-600">{l}</span>
            <Spark data={d} stroke={tone} />
            <span className="w-[86px] text-right font-mono text-xs text-ink tabular-nums">
              {v} <span className="text-slate-500">{u}</span>
            </span>
          </div>
        ))}
      </div>
    ),
    code: `<svg width={96} height={26} viewBox="0 0 96 26" aria-hidden>
  <path d={linePath} fill="none" stroke="var(--color-critical)" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" />
  <circle cx={96} cy={lastY} r="2.4" fill="var(--color-critical)" />
</svg>

{/* the row states the value in text — the sparkline only shows the shape */}
<span className="font-mono text-xs tabular-nums text-ink">6.2 <span className="text-slate-500">mg/L</span></span>`,
  },
  {
    name: 'Filled and toned',
    platform: 'Desktop',
    description:
      'A filled variant for KPI cards. The tone follows the value’s status; but the status is always also stated in words, because a red line alone is not an alarm.',
    preview: (
      <div className="grid w-[520px] grid-cols-2 gap-4">
        {[
          { l: 'Dissolved O₂', v: '6.2', u: 'mg/L', s: 'Below band', tone: 'var(--color-critical)', fill: 'color-mix(in srgb, var(--color-critical) 12%, transparent)', st: 'text-critical-text' },
          { l: 'Flow', v: '284', u: 'm³/h', s: 'In band', tone: 'var(--color-success)', fill: 'color-mix(in srgb, var(--color-success) 14%, transparent)', st: 'text-slate-500' },
        ].map(({ l, v, u, s, tone, fill, st }) => (
          <div key={l} className="rounded-xl border border-slate-200 bg-white px-[18px] py-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">{l}</p>
            <p className="mt-3 mb-2 flex items-baseline gap-[5px]">
              <span className="font-mono text-2xl tracking-[-0.5px] text-ink tabular-nums">{v}</span>
              <span className="text-xs text-slate-600">{u}</span>
            </p>
            <Spark
              data={l === 'Flow' ? [240, 250, 262, 258, 270, 276, 280, 284] : series}
              w={180}
              h={32}
              stroke={tone}
              fill={fill}
            />
            <p className={`mt-2 text-xs font-semibold ${st}`}>{s}</p>
          </div>
        ))}
      </div>
    ),
    code: `<svg width={180} height={32} viewBox="0 0 180 32" aria-hidden>
  <path d={\`\${linePath} L180 32 L0 32 Z\`}
    fill="color-mix(in srgb, var(--color-critical) 12%, transparent)" />
  <path d={linePath} fill="none" stroke="var(--color-critical)" strokeWidth="1.6" />
</svg>
<p className="mt-2 text-xs font-semibold text-critical-text">Below band</p>`,
  },
  {
    name: 'Mobile · in a vitals tile',
    platform: 'Mobile',
    description:
      'Sized to the tile width and stripped back further. On a phone it is decoration on top of the number; the number is what gets read.',
    preview: (
      <PhoneFrame className="border-none bg-transparent shadow-none">
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { l: 'Dissolved O₂', v: '6.2', u: 'mg/L', s: 'Below band', tone: 'var(--color-critical)', crit: true },
            { l: 'Flow', v: '284', u: 'm³/h', s: 'In band', tone: 'var(--color-success)', crit: false },
          ].map(({ l, v, u, s, tone, crit }) => (
            <div
              key={l}
              className={`relative overflow-hidden rounded-2xl border bg-white px-3.5 py-[13px] ${
                crit ? 'border-critical-mid' : 'border-slate-200'
              }`}
            >
              {crit && <span className="absolute inset-y-0 left-0 w-1 bg-critical" />}
              <p className="text-[10px] font-extrabold uppercase tracking-[0.6px] text-slate-400">{l}</p>
              <p className="mt-[9px] font-mono text-[30px] font-semibold leading-none tracking-[-1px] text-ink tabular-nums">
                {v}
                <span className="ml-0.5 text-sm font-medium text-slate-400">{u}</span>
              </p>
              <div className="mt-2">
                <Spark
                  data={crit ? series : [240, 250, 262, 258, 270, 276, 280, 284]}
                  w={130}
                  h={22}
                  stroke={tone}
                />
              </div>
              <p className={`mt-2 text-[11px] ${crit ? 'font-semibold text-critical-text' : 'text-slate-500'}`}>
                {s}
              </p>
            </div>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<Sparkline data={series} width={130} height={22} stroke="var(--color-critical)" />`,
  },
]

export default function SparklinePage() {
  return (
    <ComponentDoc
      title="Sparkline"
      intro={
        <>
          A word-sized trace of recent history, shown beside a value rather than instead of it. It
          carries shape and direction only: for magnitude, thresholds or timestamps, use the{' '}
          <strong>Trend chart</strong>.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.sparkline}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The number is always present in text. A sparkline is never the sole carrier of a value;
            it has no scale, and it is invisible to a screen reader.
          </>,
          <>
            Mark the final point. Without it, which end is &ldquo;now&rdquo; is a coin flip.
          </>,
          <>
            Tone may follow status, but the status is stated in words underneath. A red line is not
            an alarm.
          </>,
          <>
            No axes, no gridlines, no tooltip. The moment any of those are needed, the component is
            a trend chart.
          </>,
          <>
            Mark it <code className="font-mono text-[12px]">aria-hidden</code>; the row it sits in
            already carries the accessible value.
          </>,
        ],
      }}
    />
  )
}
