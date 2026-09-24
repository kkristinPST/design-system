import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

/* The chart is one fixed viewBox scaled to its container: 980 x 360, padded
   18 right and 30 bottom. padL grows with the number of axis gutters, padT
   with whether separate axes are on. These are the application's numbers. */
const W = 980
const H = 360
const PAD_R = 18
const PAD_B = 30

/** Deterministic sample data, so the page renders identically on every build. */
function series(n: number, base: number, amp: number, drift: number, seed: number) {
  return Array.from({ length: n }, (_, i) => {
    const f = i / (n - 1)
    return base + Math.sin((i + seed) * 0.7) * amp + Math.sin((i + seed) * 0.23) * amp * 0.6 + drift * f
  })
}

type Pen = { name: string; tag: string; unit: string; color: string; v: number[] }

/* The application's TREND_COLORS, in order. The operator picks from this set;
   it is a fixed palette, not a computed one. */
const PENS: Pen[] = [
  { name: 'Dissolved oxygen', tag: 'DPT1-FT02-AT1', unit: 'mg/L', color: '#00AEEE', v: series(60, 7.6, 0.22, -1.5, 3) },
  { name: 'Water temperature', tag: 'DPT1-FT02-TT1', unit: '°C', color: '#00C483', v: series(60, 12.4, 0.16, 0.5, 11) },
  { name: 'Recirculation flow', tag: 'DPT1-RAS0-FT1', unit: 'm³/h', color: '#8B5CF6', v: series(60, 1284, 22, -40, 7) },
]

const PAD_L_SINGLE = 56
const plotW = (padL: number) => W - padL - PAD_R

/** Dynamic scale: fit the data in view, then pad 16 % so the line is not on the frame. */
function scaleOf(v: number[]) {
  let mn = Math.min(...v)
  let mx = Math.max(...v)
  const pad = (mx - mn) * 0.16
  mn -= pad
  mx += pad
  return { mn, mx }
}

const xAt = (i: number, n: number, padL: number) => padL + (i / (n - 1)) * plotW(padL)
const yAt = (val: number, mn: number, mx: number, padT: number) =>
  padT + (1 - (val - mn) / (mx - mn)) * (H - padT - PAD_B)

function penPath(p: Pen, padL: number, padT: number) {
  const { mn, mx } = scaleOf(p.v)
  return p.v
    .map((val, i) => `${i === 0 ? 'M' : 'L'}${xAt(i, p.v.length, padL).toFixed(1)},${yAt(val, mn, mx, padT).toFixed(1)}`)
    .join(' ')
}

const TICKF = [0, 0.25, 0.5, 0.75, 1]
const X_LABELS = ['09:00', '12:00', '15:00', '18:00', '21:00']

/** Decimals come from the span, not the maximum — see the note on narrow gutters. */
const decOf = (mn: number, mx: number, narrow: boolean) => {
  const s = mx - mn
  return narrow ? (s < 2 ? 2 : s < 20 ? 1 : 0) : Math.abs(mx) < 5 ? 2 : Math.abs(mx) < 50 ? 1 : 0
}

function ChartFrame({ children, height = H }: { children: React.ReactNode; height?: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <svg viewBox={`0 0 ${W} ${height}`} className="block h-auto w-full" role="img" aria-label="Trend chart">
        {children}
      </svg>
    </div>
  )
}

function Gridlines({ padL, padT }: { padL: number; padT: number }) {
  const { mn, mx } = scaleOf(PENS[0].v)
  return (
    <>
      {TICKF.map((f, i) => {
        const yy = yAt(mn + f * (mx - mn), mn, mx, padT)
        return <line key={'y' + i} x1={padL} y1={yy} x2={W - PAD_R} y2={yy} stroke="var(--color-slate-100)" strokeWidth="1" />
      })}
      {X_LABELS.map((_, i) => {
        const xx = padL + (i / (X_LABELS.length - 1)) * plotW(padL)
        return (
          <line
            key={'x' + i}
            x1={xx}
            y1={padT}
            x2={xx}
            y2={H - PAD_B}
            stroke="var(--color-slate-100)"
            strokeWidth="1"
            strokeDasharray={i === 0 || i === X_LABELS.length - 1 ? '0' : '2 5'}
          />
        )
      })}
    </>
  )
}

function XLabels({ padL }: { padL: number }) {
  return (
    <>
      {X_LABELS.map((l, i) => (
        <text
          key={l}
          className="fill-slate-400 font-mono text-[11px]"
          x={padL + (i / (X_LABELS.length - 1)) * plotW(padL)}
          y={H - 9}
          textAnchor={i === 0 ? 'start' : i === X_LABELS.length - 1 ? 'end' : 'middle'}
        >
          {l}
        </text>
      ))}
    </>
  )
}

/** Focused pen 2.6px at full opacity; the rest 1.7px at 0.66. Last value gets a dot. */
function Pens({ padL, padT, focus = 0 }: { padL: number; padT: number; focus?: number }) {
  return (
    <>
      {PENS.map((p, i) => {
        const { mn, mx } = scaleOf(p.v)
        const isFocus = i === focus
        return (
          <g key={p.tag} opacity={isFocus ? 1 : 0.66}>
            <path
              d={penPath(p, padL, padT)}
              fill="none"
              stroke={p.color}
              strokeWidth={isFocus ? 2.6 : 1.7}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle
              cx={xAt(p.v.length - 1, p.v.length, padL)}
              cy={yAt(p.v[p.v.length - 1], mn, mx, padT)}
              r="3.2"
              fill={p.color}
            />
          </g>
        )
      })}
    </>
  )
}

const variants: Variant[] = [
  {
    name: 'Trend view',
    platform: 'Desktop',
    description:
      'The workspace chart. Every pen carries its OWN vertical scale, fitted to the data in view and padded 16 %, so signals in different units share one plot without one flattening the others. Only the focused pen is drawn at full weight; the rest drop to 1.7px and 0.66 opacity, and the single y axis is labelled and coloured for the focused pen alone. Five gridlines, five time ticks, a dot on each last value, and a NOW pill where the present falls inside the window. The chart is one fixed 980 x 360 viewBox scaled to its pane, so it never demands a minimum width.',
    preview: (
      <ChartFrame>
        <Gridlines padL={PAD_L_SINGLE} padT={30} />
        {/* single y axis, coloured for the focused pen */}
        {(() => {
          const { mn, mx } = scaleOf(PENS[0].v)
          const d = decOf(mn, mx, false)
          return (
            <g>
              {TICKF.map((f, i) => (
                <text
                  key={i}
                  className="font-mono text-[11px]"
                  fill={PENS[0].color}
                  x={PAD_L_SINGLE - 9}
                  y={yAt(mn + f * (mx - mn), mn, mx, 30) + 3}
                  textAnchor="end"
                >
                  {(mn + f * (mx - mn)).toFixed(d)}
                </text>
              ))}
              <text className="font-mono text-[11px] font-bold" fill={PENS[0].color} x={PAD_L_SINGLE - 9} y={24} textAnchor="end">
                mg/L
              </text>
            </g>
          )
        })()}
        <Pens padL={PAD_L_SINGLE} padT={30} />
        {/* now line and pill */}
        <g>
          <line x1={W - PAD_R - 90} y1={26} x2={W - PAD_R - 90} y2={H - PAD_B} stroke="var(--color-primary)" strokeWidth="1.25" strokeDasharray="3 3" opacity="0.75" />
          <rect x={W - PAD_R - 110} y={15} width="40" height="15" rx="7.5" fill="var(--color-primary)" />
          <text x={W - PAD_R - 90} y={26} textAnchor="middle" className="fill-white font-mono text-[10px] font-bold">
            NOW
          </text>
        </g>
        <XLabels padL={PAD_L_SINGLE} />
      </ChartFrame>
    ),
    code: `/* Per-pen normalisation is the whole point: pens in mg/L, °C and m³/h
   cannot share one scale. Each gets its own, fitted to the window.
   A pen with dyn === false plots against the operator's OWN fixed
   Range min / max instead, so a boolean can be pinned to 0..2 and stop
   reading as noise. */
const norm = (pts, pen) => {
  if (pen.dyn === false && pen.rMin != null && pen.rMax != null) return { mn: pen.rMin, mx: pen.rMax }
  let mn = Math.min(...pts.map(p => p.v)), mx = Math.max(...pts.map(p => p.v))
  if (mn === mx) { mn -= 1; mx += 1 }
  const pad = (mx - mn) * 0.16
  return { mn: mn - pad, mx: mx + pad }
}

<path stroke={pen.color} strokeWidth={isFocus ? 2.6 : 1.7} opacity={isFocus ? 1 : 0.66} />`,
  },
  {
    name: 'Y axis · Single and Separate',
    platform: 'Desktop',
    description:
      'Single gives one scale, labelled and coloured for the focused signal. Separate gives every pen its own labelled gutter with a colour rail and its unit above it. Gutters are capped: 10 axes on a control-room monitor, 7 below 1500px and 5 below 1180px, and the gutter narrows from 54 to 46 to 40 units as the count rises, or ten gutters would eat 422 of the 980 and leave the plot narrower than its own furniture. Past the cap the focused pen always keeps its axis and the rest still plot on their own scale; an "axes 3/5" control below the gutters says so and opens the picker.',
    preview: (() => {
      const nAx = 3
      const AXW = 54
      const padL = 22 + nAx * AXW
      const padT = 42
      return (
        <ChartFrame>
          <Gridlines padL={padL} padT={padT} />
          {PENS.map((p, i) => {
            const { mn, mx } = scaleOf(p.v)
            const d = decOf(mn, mx, AXW < 50)
            const gr = 22 + (i + 1) * AXW
            const dim = i !== 0
            return (
              <g key={p.tag} opacity={dim ? 0.85 : 1}>
                <line x1={gr - 4} y1={padT} x2={gr - 4} y2={H - PAD_B} stroke={p.color} strokeWidth={dim ? 1.5 : 2.5} />
                <rect x={gr - 9} y={padT - 13} width="11" height={dim ? 2.5 : 3.5} rx="1.5" fill={p.color} />
                {TICKF.map((f, k) => (
                  <text
                    key={k}
                    className="fill-slate-500 font-mono text-[10px]"
                    x={gr - 12}
                    y={yAt(mn + f * (mx - mn), mn, mx, padT) + 3}
                    textAnchor="end"
                  >
                    {(mn + f * (mx - mn)).toFixed(d)}
                  </text>
                ))}
                <text className="font-mono text-[10px] font-bold" fill={p.color} x={gr - 12} y={padT - 21} textAnchor="end">
                  {p.unit}
                </text>
              </g>
            )
          })}
          <Pens padL={padL} padT={padT} />
          <text className="fill-primary-text font-mono text-[10px] font-bold" x={padL - 12} y={H - PAD_B + 14} textAnchor="end">
            axes 3/5
          </text>
          <XLabels padL={padL} />
        </ChartFrame>
      )
    })(),
    code: `const AXMAX = vw >= 1500 ? 10 : vw >= 1180 ? 7 : 5
const AXW   = nAx <= 5 ? 54 : nAx <= 7 ? 46 : 40
const padL  = nAx ? 22 + nAx * AXW : 56
const padT  = sepAxes ? 42 : 30

/* Decimals come from the SPAN, not the maximum, once gutters are narrow.
   A pH axis maxes at ~7 but covers 0.3 of range, and rounding it to whole
   numbers printed "7 7 7 7 7" — five identical ticks is an axis that says
   nothing. */
const decOf = (r) => {
  const s = r.mx - r.mn
  return axNarrow ? (s < 2 ? 2 : s < 20 ? 1 : 0)
                  : (Math.abs(r.mx) < 5 ? 2 : Math.abs(r.mx) < 50 ? 1 : 0)
}`,
  },
  {
    name: 'Crosshair readout',
    platform: 'Desktop',
    description:
      'Hovering the plot reads every visible pen at one instant: a dashed vertical rule, a dot on each pen at that moment, and a panel with the timestamp and one row per pen. The panel flips to whichever side has room and is clamped inside the plot. Rows are capped to what fits the plot height and the focused pen always makes the cut; the remainder collapses into "+N more signals" rather than overflowing the chart.',
    preview: (() => {
      const padL = PAD_L_SINGLE
      const padT = 30
      const hi = 38
      const cx = xAt(hi, PENS[0].v.length, padL)
      const bw = 268
      const bx = cx + 16
      const by = padT + 6
      return (
        <ChartFrame>
          <Gridlines padL={padL} padT={padT} />
          <Pens padL={padL} padT={padT} />
          <g pointerEvents="none">
            <line x1={cx} y1={padT} x2={cx} y2={H - PAD_B} stroke="var(--color-slate-500)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
            {PENS.map((p) => {
              const { mn, mx } = scaleOf(p.v)
              return <circle key={p.tag} cx={cx} cy={yAt(p.v[hi], mn, mx, padT)} r="3.4" fill={p.color} stroke="#fff" strokeWidth="1.5" />
            })}
            <rect x={bx} y={by} width={bw} height={32 + PENS.length * 19 + 6} rx="9" fill="#fff" stroke="var(--color-slate-300)" strokeWidth="1" />
            <text x={bx + 14} y={by + 21} className="fill-slate-500 font-mono text-[11px]">
              04/03 15:20
            </text>
            {PENS.map((p, i) => {
              const { mn, mx } = scaleOf(p.v)
              const ry = by + 32 + i * 19 + 10
              return (
                <g key={p.tag}>
                  <circle cx={bx + 18} cy={ry - 4} r="3.6" fill={p.color} />
                  <text x={bx + 28} y={ry} className="fill-ink text-[12px]">
                    {p.name}
                  </text>
                  <text x={bx + bw - 14} y={ry} textAnchor="end" className="fill-ink font-mono text-[12px] font-bold">
                    {p.v[hi].toFixed(decOf(mn, mx, false))}
                    <tspan className="fill-slate-400 font-normal"> {p.unit}</tspan>
                  </text>
                </g>
              )
            })}
          </g>
          <XLabels padL={padL} />
        </ChartFrame>
      )
    })(),
    code: `/* Rows are capped to what fits the plot height; the focused pen always
   makes the cut, and the rest become a count. */
const maxRows = Math.max(3, Math.floor((H - padT - padB - 44) / 19))
let shown = vis.slice(0, maxRows)
if (fpen && !shown.includes(fpen)) shown = [fpen].concat(vis.filter(s => s !== fpen).slice(0, maxRows - 1))
const more = vis.length - shown.length

/* Flip to the side with room, then clamp inside the plot. */
const right = cx < (padL + W - padR) / 2
const bx = right ? Math.min(cx + 16, W - padR - bw) : Math.max(padL + 4, cx - 16 - bw)`,
  },
  {
    name: 'Alarm markers and limit lines',
    platform: 'Desktop',
    description:
      'With Alarms on, every alarm these signals raised is marked on the timeline, strictly 1:1 with its measured value: a dashed rule in the severity colour, a pennant flag at the top, and a dot on the pen at that instant. A discrete alarm — no analog value — gets a white diamond with a bolt and a grey dotted rule instead, and no dot, because there is no value to sit on. Alongside them, every alarm limit the register holds for the focused tag is drawn as a static dashed line, not only the ones that fired. Limits follow the FOCUS: with several pens on their own normalised scales a limit line has no honest position. A limit outside the visible band is not dropped — it is pinned to the edge and labelled with an arrow, so the operator knows it exists and which way it lies.',
    preview: (() => {
      const padL = PAD_L_SINGLE
      const padT = 30
      const { mn, mx } = scaleOf(PENS[0].v)
      const mAt = 41
      const mx1 = xAt(mAt, PENS[0].v.length, padL)
      const dAt = 17
      const dx = xAt(dAt, PENS[0].v.length, padL)
      const limY = yAt(6.9, mn, mx, padT)
      return (
        <ChartFrame>
          <Gridlines padL={padL} padT={padT} />
          <Pens padL={padL} padT={padT} />
          {/* in-band limit */}
          <g>
            <line x1={padL} x2={W - PAD_R} y1={limY} y2={limY} stroke="var(--color-critical)" strokeWidth="1.2" strokeDasharray="7 4" opacity=".75" />
            <text x={W - PAD_R - 4} y={limY - 5} textAnchor="end" className="fill-critical-text font-mono text-[10px] font-bold">
              LO 6.9
            </text>
          </g>
          {/* off-scale limit, pinned to the top edge */}
          <text x={W - PAD_R - 4} y={padT + 7} textAnchor="end" className="fill-slate-400 font-mono text-[10px] font-bold">
            HI 9.2 ↑
          </text>
          {/* analog marker */}
          <g>
            <line x1={mx1} y1={padT} x2={mx1} y2={H - PAD_B} stroke="var(--color-critical)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            <g transform={`translate(${mx1},${padT - 4})`}>
              <path d="M0 -15 L12 -6 L12 6 L0 -1 Z M0 -15 L0 10" fill="var(--color-critical)" stroke="#fff" strokeWidth="1" strokeLinejoin="round" transform="translate(0.5,0)" />
            </g>
            <circle cx={mx1} cy={yAt(PENS[0].v[mAt], mn, mx, padT)} r="4" fill="var(--color-critical)" stroke="#fff" strokeWidth="1.6" />
          </g>
          {/* discrete marker */}
          <g>
            <line x1={dx} y1={padT} x2={dx} y2={H - PAD_B} stroke="var(--color-slate-400)" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
            <g transform={`translate(${dx},${padT - 4})`}>
              <path d="M0 -14 L11 -3 L0 8 L-11 -3 Z" fill="#fff" stroke="var(--color-slate-500)" strokeWidth="1.3" />
              <path d="M1.5 -8 L-3 -1 L0 -1 L-1.5 5 L3.5 -2 L0.5 -2 Z" fill="var(--color-slate-500)" />
            </g>
          </g>
          <XLabels padL={padL} />
        </ChartFrame>
      )
    })(),
    code: `/* Every limit the register holds for the focused tag, not just the ones
   that fired. An off-scale limit is pinned to the edge and arrowed, never
   dropped — the operator has to know it is there. */
njTagLimits(fpen.pen.id).map(l => {
  const inside = l.value >= mn && l.value <= mx
  const ly = inside ? yOf(l.value, mn, mx) : (l.value > mx ? padT + 7 : H - padB - 7)
  const lab = THR_LABEL[l.kind] + " " + l.value + (inside ? "" : l.value > mx ? " ↑" : " ↓")
  …
})

/* When limits are shown the focused pen's scale also opens up far enough to
   contain them. A healthy signal — the normal case — otherwise scales to its
   own noise and every limit line falls outside the band and never draws. */`,
  },
  {
    name: 'Investigating an alarm',
    platform: 'Desktop',
    description:
      'Investigate on an alarm row centres the chart on the event rather than opening a blank one. A focus bar replaces the range bar: what is being investigated, its tag, the centred timestamp, and a ± window of 15m, 30m, 1h or 3h. The alarm moment is drawn as a solid critical rule and the crossed threshold gets a labelled chip. Window navigation and the quick ranges are disabled while focused, because they would move the chart off the thing being investigated; Clear focus is the way out. Investigating ADDS the pen rather than replacing the working set, and when other signals are already plotted the toast offers Show only this, which snapshots for undo.',
    preview: (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-bg text-primary-text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="22" y1="12" x2="18" y2="12" />
              <line x1="6" y1="12" x2="2" y2="12" />
              <line x1="12" y1="6" x2="12" y2="2" />
              <line x1="12" y1="22" x2="12" y2="18" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">Investigating</p>
            <p className="truncate text-[13px] font-bold text-ink">Dissolved oxygen low-low</p>
            <p className="font-mono text-[11px] text-slate-500">DPT1-FT02-AT1 · centered 04/03 04:12</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500">Window ±</span>
            <div className="inline-flex gap-0.5 rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              {['15m', '30m', '1h', '3h'].map((w) => (
                <span
                  key={w}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${w === '30m' ? 'bg-ink text-white' : 'text-slate-600'}`}
                >
                  {w}
                </span>
              ))}
            </div>
            <span className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">Open alarm</span>
            <span className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">Clear focus</span>
          </div>
        </div>
        <ChartFrame height={220}>
          {(() => {
            const padL = PAD_L_SINGLE
            const padT = 30
            const { mn, mx } = scaleOf(PENS[0].v)
            const cx = padL + plotW(padL) / 2
            const thrY = 30 + (1 - 0.72) * (220 - 30 - PAD_B)
            return (
              <>
                {TICKF.map((f, i) => {
                  const yy = 30 + f * (220 - 30 - PAD_B)
                  return <line key={i} x1={padL} y1={yy} x2={W - PAD_R} y2={yy} stroke="var(--color-slate-100)" strokeWidth="1" />
                })}
                <path
                  d={PENS[0].v
                    .map((val, i) => `${i === 0 ? 'M' : 'L'}${xAt(i, PENS[0].v.length, padL).toFixed(1)},${(30 + (1 - (val - mn) / (mx - mn)) * (220 - 30 - PAD_B)).toFixed(1)}`)
                    .join(' ')}
                  fill="none"
                  stroke={PENS[0].color}
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                />
                <line x1={cx} y1={26} x2={cx} y2={220 - PAD_B} stroke="var(--color-critical)" strokeWidth="1.4" opacity="0.55" />
                <line x1={padL} x2={W - PAD_R} y1={thrY} y2={thrY} stroke="var(--color-critical)" strokeWidth="1.4" strokeDasharray="5 4" opacity="0.85" />
                <rect x={W - PAD_R - 66} y={thrY - 17} width="66" height="15" rx="3" fill="var(--color-critical)" />
                <text x={W - PAD_R - 33} y={thrY - 6} textAnchor="middle" className="fill-white font-mono text-[10px] font-bold">
                  LL 6.2
                </text>
              </>
            )
          })()}
        </ChartFrame>
      </div>
    ),
    code: `store.centerOn(alarm)   // sets centerTs + focusAlarm, disables the range presets
store.setWindowMin(30)  // FOCUS_WINDOWS = [15, 30, 60, 180] minutes each side
store.clearFocus()

/* njInvestigateAlarm still ADDS the pen — context usually helps and the
   operator did not ask us to throw their working set away. When other
   signals are already plotted the toast offers Show only this. */
trendStore.solo(id)     // snapshots for undo`,
  },
  {
    name: 'Range bar and query cost',
    platform: 'Desktop',
    description:
      'Quick presets sit on a segment with earlier / later window arrows. Custom reveals the explicit bar in place: start, end, sample interval, a Dynamic toggle that pins the end to now, and Apply. Interval takes effect the moment it is chosen, because it is the sampling RESOLUTION and applies to the presets too — waiting for Apply would make a quick range look broken. Everything else waits for Apply, because it issues a historian query. The bar states the resulting point count, and above a threshold it warns BEFORE Apply what the query will cost and offers the way out: download the range instead of drawing it. The cost is read from the range and the interval, never from what the chart drew — the plot caps its sample count, so that number reports the drawing, not the query.',
    preview: (
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500">‹</span>
          <div className="inline-flex gap-0.5 rounded-lg border border-slate-200 bg-slate-50 p-0.5">
            {['1h', '6h', '24h', '7d', 'Custom'].map((r) => (
              <span
                key={r}
                className={`rounded-md px-3 py-1 text-xs font-semibold ${r === 'Custom' ? 'bg-ink text-white' : 'text-slate-600'}`}
              >
                {r}
              </span>
            ))}
          </div>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-300">›</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
            {[
              ['Start date', '04/03/2026 09:00'],
              ['End date', '04/03/2026 21:00'],
            ].map(([l, v]) => (
              <label key={l} className="block">
                <span className="block text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">{l}</span>
                <span className="mt-1 block rounded-lg border border-slate-200 px-2.5 py-1.5 font-mono text-[12px] text-ink">{v}</span>
              </label>
            ))}
            <label className="block">
              <span className="block text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">Interval</span>
              <span className="mt-1 block rounded-lg border border-slate-200 px-2.5 py-1.5 text-[12px] text-ink">1 minute</span>
            </label>
            <label className="block">
              <span className="block text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">Live</span>
              <span className="mt-1 flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[12px] text-slate-600">
                <span className="h-3.5 w-3.5 rounded-[4px] border border-slate-300" /> Dynamic
              </span>
            </label>
            <span className="ml-auto rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-white">Apply</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2 border-t border-slate-100 pt-2.5">
            <span className="font-mono text-[12px] font-bold text-ink tabular-nums">720 points</span>
            <span className="text-[11px] text-slate-500">per pen, one every 1 minute</span>
          </div>
          <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-warning-mid bg-warning-bg px-3 py-2 text-[11px] leading-relaxed text-slate-600">
            <span className="mt-[1px] shrink-0 text-warning-text">⚠</span>
            <span>
              This range asks the historian for about <b className="font-mono tabular-nums">43 200</b> points across 3 pens. It will
              be slow, and the chart draws at most 2 000 per pen. Widen the interval, or take the raw data instead.{' '}
              <span className="font-semibold text-primary-text">Download without plotting</span>
            </span>
          </div>
        </div>
      </div>
    ),
    code: `/* Read the cost from the RANGE and the INTERVAL, never from view.n —
   the chart caps its sample count, so view.n reports what was DRAWN, not
   what the historian was asked for. Costed on the PENDING fields, not the
   applied view: a warning after Apply is not a warning. */
const per   = Math.max(1, Math.round(spanMs / intervalMs))
const total = per * Math.max(1, visiblePens)
if (total < 20000) return null

/* Interval applies to the presets too, so it takes effect on change. */
const pickIv = (v) => { setIv(v); store.setInterval(v) }`,
  },
  {
    name: 'Signals panel',
    platform: 'Desktop',
    description:
      'The pen list beside the chart. Each row is a swatch, the name and its group, the current value, and hide / remove. Under it sit min, max and average over the window in view — the legacy pen table’s three stat columns — and a button that opens pen details: colour, decimals, aggregate, fixed range, separate axis, flow accumulation and an estimation line. The head acts on the SET (save as a Trend Group; Undo and Clear share an overflow, because Clear is only safe with Undo beside it and neither is a daily action). The foot ADDS a row, at the end of the list where the next row lands.',
    preview: (
      <div className="w-[380px] rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <span className="flex items-center gap-2 text-[13px] font-bold text-ink">
            Signals
            <span className="rounded-full bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-600">3</span>
          </span>
          <span className="flex gap-1.5">
            <span className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-600">Save group</span>
            <span className="rounded-lg border border-slate-200 px-1.5 py-1 text-[11px] text-slate-600">⋮</span>
          </span>
        </div>
        {PENS.map((p, i) => (
          <div key={p.tag} className={`border-b border-slate-100 px-4 py-2.5 ${i === 0 ? 'bg-slate-50' : ''}`}>
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: p.color }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-semibold text-ink">{p.name}</span>
                <span className="block truncate font-mono text-[10px] text-slate-400">{p.tag}</span>
              </span>
              <span className="font-mono text-[13px] font-bold text-ink tabular-nums">
                {p.v[p.v.length - 1].toFixed(p.unit === 'm³/h' ? 0 : 1)}
                <span className="ml-0.5 text-[10px] font-normal text-slate-400">{p.unit}</span>
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-3 pl-5">
              {(['Min', 'Max', 'Avg'] as const).map((s) => {
                const vals = p.v
                const n = s === 'Min' ? Math.min(...vals) : s === 'Max' ? Math.max(...vals) : vals.reduce((a, b) => a + b, 0) / vals.length
                return (
                  <span key={s} className="text-[10px] text-slate-400">
                    {s} <b className="font-mono text-slate-600">{n.toFixed(p.unit === 'm³/h' ? 0 : 1)}</b>
                  </span>
                )
              })}
              <span className="ml-auto rounded-md border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">Auto</span>
            </div>
          </div>
        ))}
        <div className="flex gap-2 px-4 py-3">
          <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600">+ Add signal</span>
          <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-600">Browse all…</span>
        </div>
      </div>
    ),
    code: `<PenRow pen={p} current={curOf(p.id)} stats={statsOf[p.id]}
  focused={store.focus === p.id}
  onFocus={() => store.setFocus(p.id)}
  onToggle={() => store.toggle(p.id)}
  onRemove={() => store.remove(p.id)} />

/* Adding a signal: the dropdown is fine for a handful of well-known
   parameters, but a facility has thousands, so Browse is a TREE —
   system → equipment → parameter — with a filter that searches names AND
   tags, multi-select, and Select all per equipment. A filter reveals its
   hits: while a term is active every node is open, so nobody expands ten
   folders to find a match. */`,
  },
  {
    name: 'Event timeline · discrete alarm',
    platform: 'Desktop',
    description:
      'A discrete alarm has no analog value, so centring a chart on it would draw an empty plot. It opens an event timeline instead: the sequence of events around the alarm, the focal one marked in its severity colour. If the same equipment carries an analog signal, the footer offers to add it to the trend, which is the closest thing to a chart this alarm can honestly produce.',
    preview: (
      <div className="w-[560px] rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">⚡</span>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-ink">Event timeline · DPT1 Drum filter</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
              DPT1-DF01-XA1 · discrete signal, no associated process value. Showing the sequence of events around 04:12.
            </p>
          </div>
        </div>
        <div className="mt-3 space-y-0">
          {[
            ['04:21', 'Auto-diagnostic logged', false],
            ['04:14', 'Fault latched, output inhibited', false],
            ['04:12', 'Drum filter motor protection tripped', true],
            ['04:06', 'Watchdog threshold approached', false],
            ['03:58', 'Signal quality degraded', false],
          ].map(([t, s, focal]) => (
            <div
              key={t as string}
              className={`flex items-center gap-3 rounded-lg px-2 py-1.5 ${focal ? 'bg-critical-bg' : ''}`}
            >
              <span className="font-mono text-[11px] text-slate-400">{t}</span>
              <span className={`h-2 w-2 shrink-0 rounded-full ${focal ? 'bg-critical' : 'bg-slate-300'}`} />
              <span className={`flex-1 text-[12px] ${focal ? 'font-bold text-ink' : 'text-slate-600'}`}>{s}</span>
              {focal ? (
                <span className="rounded-sm bg-critical-solid px-1.5 py-[2px] text-[9px] font-bold uppercase text-white">alarm</span>
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-2.5 text-[11px] text-slate-500">
          <span>
            Related analog signal on this equipment: <b className="text-ink">Drum filter differential pressure</b>
          </span>
          <span className="ml-auto font-semibold text-primary-text">Add to trend →</span>
        </div>
      </div>
    ),
    code: `// alarmIsAnalog(a) decides which surface an alarm opens
store.focusAlarm    // analog  → MultiTrendChart centred on centerTs
store.eventTimeline // discrete → <EventTimeline />`,
  },
  {
    name: 'Mobile · trend card',
    platform: 'Mobile',
    description:
      'One pen, the value above the plot and mono time labels below. Below the chart sits a landscape hint: rotating the phone opens a full-width chart. The multi-pen workspace, the separate axes and the crosshair are desktop surfaces; a phone gets the signal and its limit.',
    preview: (() => {
      const w = 520
      const h = 150
      const p = PENS[0]
      const { mn, mx } = scaleOf(p.v)
      const px = (i: number) => (i / (p.v.length - 1)) * w
      const py = (v: number) => h - ((v - mn) / (mx - mn)) * h
      const d = p.v.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ')
      return (
        <PhoneFrame className="p-3.5">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[22px] font-semibold text-ink tabular-nums">
              {p.v[p.v.length - 1].toFixed(1)}
            </span>
            <span className="text-[11px] text-slate-500">mg/L · last 12h</span>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full" aria-hidden>
            <line x1="0" x2={w} y1={py(6.9)} y2={py(6.9)} stroke="var(--color-critical)" strokeWidth="2" strokeDasharray="6 5" />
            <path d={`${d} L${w} ${h} L0 ${h} Z`} fill="color-mix(in srgb, var(--color-primary) 12%, transparent)" />
            <path d={d} fill="none" stroke={p.color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={px(p.v.length - 1)} cy={py(p.v[p.v.length - 1])} r="5" fill={p.color} stroke="#fff" strokeWidth="2.4" />
          </svg>
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-slate-400">
            {['09:00', '13:00', '17:00', '21:00'].map((t) => (
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
      )
    })(),
    code: `<div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-[15px]">
  <div className="mb-1.5 flex items-center justify-between">
    <span className="font-mono text-[22px] font-semibold tabular-nums text-ink">6.2</span>
    <span className="text-[11px] text-slate-500">mg/L · last 12h</span>
  </div>
  <svg viewBox="0 0 520 150" className="block h-auto w-full" aria-hidden>…</svg>
</div>`,
  },
]

export default function TrendChartPage() {
  return (
    <ComponentDoc
      title="Trend chart"
      intro={
        <>
          History with a scale, and the facility&rsquo;s investigation surface. The Trends workspace
          plots any set of signals against time, marks the alarms those signals raised on the same
          timeline, and centres on one when an operator asks to investigate it. The same chart
          appears smaller in the equipment dialog, the floating trend window and the mobile detail
          screen.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['trend-chart']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            <strong className="font-semibold text-ink">Every pen carries its own scale.</strong> A
            facility plots mg/L beside °C beside m³/h; one shared axis flattens all but the largest
            into a straight line. Dynamic fitting is the default, a pen can be pinned to a fixed
            Range min / max instead, and the y axis labels whichever pen has focus.
          </>,
          <>
            <strong className="font-semibold text-ink">Alarm limits follow the focus, not the
            plot.</strong> With several pens normalised to their own ranges, a horizontal limit line
            has no honest position on anyone else&rsquo;s scale. When limits are shown, the focused
            pen&rsquo;s scale also opens far enough to contain them, or a healthy signal scales to
            its own noise and every limit falls outside the band and never draws.
          </>,
          <>
            <strong className="font-semibold text-ink">A range picker is a preset segment with
            Custom as one of its options</strong>, revealed in place when chosen. Not an
            always-visible Start / End / Interval bar: that puts the expensive, deliberate control
            permanently in front of the cheap, common one, and both set the same thing with no
            indication of which won.
          </>,
          <>
            <strong className="font-semibold text-ink">The shape tells the operator which kind of
            control they are touching.</strong> A preset applies instantly, because it is cheap and
            reversible. Custom reveals fields and waits for <strong>Apply</strong>, because it
            issues a historian query. Interval is the exception and is deliberate: it is the
            sampling resolution and applies to the presets too, so it takes effect on change.
          </>,
          <>
            <strong className="font-semibold text-ink">State the cost before the operator commits
            to it.</strong> Historian resolution and query speed are backend limits the interface
            cannot fix. What it owes the operator is an honest estimate, read from the range and the
            interval rather than from what was drawn, and a way out: download the range instead of
            plotting it.
          </>,
          <>
            <strong className="font-semibold text-ink">Investigating adds a pen, it does not
            replace the set.</strong> Context usually helps and the operator did not ask for their
            working set to be thrown away. Offer <em>Show only this</em> in the toast instead, and
            snapshot it so undo works.
          </>,
          <>
            A discrete alarm opens an <strong>event timeline</strong>, never an empty chart. If the
            equipment has an analog signal, offer it.
          </>,
          <>
            Axis labels are mono at 10&ndash;11px. Proportional digits make a y axis look ragged.
            Decimals come from the span rather than the maximum once gutters are narrow, or an axis
            covering 0.3 of range prints the same number five times.
          </>,
          <>
            Pen colours come from a fixed eight-colour palette the operator picks from. They are a
            pen identity, not a status &mdash; a pen keeps its colour whatever the value does.
            Thresholds and markers are the only things on the chart that use the severity ramp.
          </>,
          <>
            Give the <code className="font-mono text-[12px]">svg</code> a{' '}
            <code className="font-mono text-[12px]">role=&quot;img&quot;</code> and an aria-label
            that <em>describes the trend</em>: direction, range and any threshold crossing.
          </>,
          <>
            Charts scale with their pane and never force a minimum width. The chart is one fixed
            viewBox, so nothing inside it can know how small it has been drawn &mdash; the axis
            count answers to the real window width from outside.
          </>,
          <>
            A range change re-samples the historian, so it gets a chart skeleton rather than a
            frozen old plot.
          </>,
        ],
      }}
    />
  )
}
