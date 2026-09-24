import Link from 'next/link'

/* The facility Dashboard, as the application composes it. The layout here is a
   reduced-scale reproduction of screens/start.jsx plus the two full-width cards
   it mounts (DashTankVitals from screens/tank-vitals.jsx, DashConsumption from
   screens/consumption.jsx), not an idealised dashboard. */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-[10px] font-bold uppercase tracking-[1px] text-slate-400">{children}</p>
}

function Kpi({
  label,
  value,
  unit,
  delta,
  dir = 'flat',
  link,
}: {
  label: string
  value: string
  unit?: string
  delta: string
  dir?: 'up' | 'down' | 'flat'
  link?: boolean
}) {
  // 12px delta text uses the AA-safe -text ramp, never the loud status hues
  const tone = dir === 'down' ? 'text-critical-text' : dir === 'flat' ? 'text-slate-500' : 'text-success-text'
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">{label}</span>
        {/* a clickable KPI swaps its own icon for the drill-through arrow */}
        <span className="shrink-0 text-slate-400">{link ? '↗' : '◔'}</span>
      </div>
      <p className="mt-2 flex items-baseline gap-1">
        <span className="font-mono text-xl text-ink tabular-nums">{value}</span>
        {unit ? <span className="text-[11px] text-slate-500">{unit}</span> : null}
      </p>
      <p className={`mt-1 text-[11px] leading-snug ${tone}`}>{delta}</p>
    </div>
  )
}

function CardHead({ title, right, caption }: { title: string; right?: string; caption?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
      <span className="flex min-w-0 items-baseline gap-2">
        <span className="text-[13px] font-bold text-ink">{title}</span>
        {caption ? <span className="truncate text-[11px] text-slate-400">{caption}</span> : null}
      </span>
      {right ? <span className="shrink-0 text-xs font-semibold text-primary-text">{right}</span> : null}
    </div>
  )
}

/** One vertical gauge: alarm band tinted on the track, setpoint a tick, fill to value. */
function Gauge({ pct, band, sp, tone }: { pct: number; band?: number; sp?: number; tone: string }) {
  return (
    <span className="relative block h-[52px] w-[9px] overflow-hidden rounded-full bg-slate-100">
      {band != null ? <span className="absolute inset-x-0 bottom-0 bg-critical-bg" style={{ height: `${band}%` }} /> : null}
      <span className={`absolute inset-x-0 bottom-0 ${tone}`} style={{ height: `${pct}%` }} />
      {sp != null ? <span className="absolute inset-x-[-2px] h-[2px] bg-slate-500" style={{ bottom: `${sp}%` }} /> : null}
    </span>
  )
}

function TankCell({ n, o2, lvl, state }: { n: number; o2: string; lvl: string; state: 'ok' | 'high' | 'critical' | 'off' }) {
  const ring =
    state === 'critical' ? 'border-critical-mid' : state === 'high' ? 'border-warning-mid' : 'border-slate-200'
  const fill = state === 'critical' ? 'bg-critical' : state === 'high' ? 'bg-warning' : 'bg-primary'
  const val = state === 'critical' ? 'text-critical-text' : state === 'high' ? 'text-warning-text' : 'text-ink'
  return (
    <div className={`flex flex-col items-center gap-1.5 rounded-lg border bg-white px-2.5 py-2 ${ring}`}>
      <div className="flex gap-2">
        <span className="flex flex-col items-center gap-1">
          <Gauge pct={state === 'off' ? 0 : 62} band={18} sp={72} tone={state === 'off' ? 'bg-slate-300' : fill} />
          <span className={`font-mono text-[11px] font-bold tabular-nums ${val}`}>{o2}</span>
          <span className="text-[9px] text-slate-400">O₂ %</span>
        </span>
        <span className="flex flex-col items-center gap-1">
          <Gauge pct={state === 'off' ? 0 : 54} tone={state === 'off' ? 'bg-slate-300' : 'bg-primary'} />
          <span className="font-mono text-[11px] font-bold text-ink tabular-nums">{lvl}</span>
          <span className="text-[9px] text-slate-400">cm</span>
        </span>
      </div>
      <span className="text-[10px] font-semibold text-ink">Tank {n}</span>
      <span className="text-[9px] text-slate-400">{state === 'off' ? 'Deactivated' : 'Idle'}</span>
    </div>
  )
}

const RULES = [
  <>
    <strong className="font-semibold text-ink">The vitals row is exception-based, not a summary.</strong>{' '}
    Every card on it is a worst case with the thing that caused it named underneath: <em>Min</em> O₂
    across every active tank, <em>Max</em> TAN, <em>Max</em> turbidity. An average across a facility
    hides the one tank that is in trouble, which is the only tank the operator wanted to know about.
  </>,
  <>
    <strong className="font-semibold text-ink">A facility-scoped number comes from the facility
    register.</strong> Reading a department fixture and labelling it &ldquo;facility&rdquo; reported{' '}
    <span className="font-mono text-[12px]">3 of 4</span> tanks on a page headed Facility overview,
    when the site runs 26 across five departments. Where a detail is only known for instrumented
    equipment, subtract it from the register total rather than switching source.
  </>,
  <>
    <strong className="font-semibold text-ink">Every KPI drills into the filtered list behind
    it</strong>, and says so by swapping its own icon for an arrow. A number an operator cannot open
    is a dead end.
  </>,
  <>
    Delta and context lines are 12px, so they use the <span className="font-mono text-[12px]">-text</span>{' '}
    end of the status ramp, never the solid hues. Small text in{' '}
    <span className="font-mono text-[12px]">critical</span> does not clear AA.
  </>,
  <>
    <strong className="font-semibold text-ink">There is no department picker anywhere on this
    screen.</strong> A dashboard that shows one department of six is a dashboard that hides five.
    The all-department rail is always present, and a department&rsquo;s process sheet hangs off it as
    a drawer rather than replacing it.
  </>,
  <>
    <strong className="font-semibold text-ink">Collapsing clips, it does not reflow.</strong> The
    Tank Vitals fold keeps every department laid out and clips to the first row&rsquo;s measured
    height, so nothing moves on toggle and no horizontal scroller appears. A clipped group is made
    inert: left focusable, Tab lands on a gauge nobody can see and the browser scrolls the hidden
    flow to reveal it, stranding the card mid-department.
  </>,
  <>
    A department with <strong>no tanks</strong> still gets a row of chips. Unreachable is not an
    option just because a department has no fish in it.
  </>,
  <>
    The alarm feed is capped at six, sorted by severity then age. The row opens the Active list, the
    area opens its process screen, and the chart icon opens the trend centred on that alarm.
  </>,
  <>
    Nothing on the dashboard animates its value in. Numbers appear as soon as they exist.
  </>,
]

export default function DashboardOverviewPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Patterns</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Dashboard overview</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        The facility landing screen. It answers, in order: what is wrong, what is the water doing,
        how is the plant running, and what did the last shift change. It is scoped to the whole
        facility and stays that way &mdash; nothing on it narrows to one department.
      </p>

      {/* ── Desktop composition ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Desktop composition</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Two KPI rows under their own eyebrows, then a grid: the alarm feed spanning the left, status
        and notes stacked on the right, and three full-width cards below it.
      </p>

      <div className="mt-5 space-y-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-5">
        {/* page head */}
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <p className="text-lg font-bold tracking-tight text-ink">Dashboard</p>
            <p className="text-[11px] text-slate-500">
              Land-based RAS facility · 3 buildings · 9 departments · 04/03/2026 15:20
            </p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">
              Maneuver History
            </span>
            <span className="rounded-lg bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-white">Site Plan</span>
          </div>
        </div>

        {/* vitals KPI row */}
        <div>
          <Eyebrow>Water chemistry · live</Eyebrow>
          <div className="grid grid-cols-4 gap-3">
            <Kpi label="Min O₂ Sat" value="88.4" unit="%" delta="Tank 3 · emergency O₂ limit 85 %" dir="down" link />
            <Kpi label="Tanks in Operation" value="25" unit="of 26" delta="1 deactivated" link />
            <Kpi label="Max TAN" value="0.62" unit="mg/L" delta="Biofilter · alarm limit 1.50 mg/L" dir="up" link />
            <Kpi label="Max Turbidity" value="0.45" unit="NTU" delta="Drum filter out · alarm limit 1.0 NTU" dir="up" link />
          </div>
        </div>

        {/* operations KPI row */}
        <div>
          <Eyebrow>Operations</Eyebrow>
          <div className="grid grid-cols-4 gap-3">
            <Kpi label="Active Alarms" value="7" delta="2 critical · 3 high" dir="down" link />
            <Kpi label="Over Capacity" value="1" delta="Tank 7 · 104 % of max" dir="down" link />
            <Kpi label="Mortality 7d" value="5.0" unit="k" delta="1.9 % of stock · ↓ vs prev week" dir="up" link />
            <Kpi label="Deactivated" value="3" delta="2 blocked · 1 out of service" dir="down" link />
          </div>
        </div>

        {/* grid: alarms | facility + notes */}
        <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-3">
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
              <span className="flex items-baseline gap-2">
                <span className="text-[13px] font-bold text-ink">Active Alarms</span>
                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-600">7</span>
              </span>
              <span className="flex gap-3 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <span className="h-[7px] w-[7px] rounded-full bg-sev-crit" /> <b className="font-mono">2</b> critical
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-[7px] w-[7px] rounded-full bg-sev-high" /> <b className="font-mono">3</b> high
                </span>
                <span className="inline-flex items-center gap-1 text-warning-text">
                  ⏱ <b className="font-mono">1</b> stale
                </span>
              </span>
            </div>
            {[
              ['critical', 'bg-sev-crit', 'DPT1 Fish Tank 3', 'Dissolved oxygen low-low', 'DPT1-FT03-AT1', '18m', true],
              ['high', 'bg-sev-high', 'DPT2 MBBR', 'Blower vibration high', 'DPT2-MB01-VT1', '2h', false],
              ['medium', 'bg-sev-med', 'DPT1 Drum filter', 'Differential pressure deviation', 'DPT1-DF01-PDT1', '4h', false],
            ].map(([lvl, dot, area, alarm, tag, ago, stale]) => (
              <div key={alarm as string} className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-2.5 last:border-b-0">
                <span className={`h-8 w-[3px] shrink-0 rounded-full ${dot}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.5px] text-slate-500">{lvl}</span>
                    <span className="truncate text-[11px] font-semibold text-primary-text">{area}</span>
                    {stale ? <span className="text-[10px] text-warning-text">⏱ stale</span> : null}
                    <span className="ml-auto shrink-0 font-mono text-[10px] text-slate-400">{ago}</span>
                  </div>
                  <div className="truncate text-xs text-slate-600">
                    {alarm} <span className="font-mono text-[10px] text-slate-400">· {tag}</span>
                  </div>
                </div>
                <span className="shrink-0 rounded-md border border-slate-200 px-1.5 py-1 text-[10px] text-slate-500" title="Investigate">
                  ◠
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2.5">
              <span className="text-[11px] text-slate-400">Tip: click an area to jump to its process screen</span>
              <span className="text-[11px] font-semibold text-primary-text">View all active ↗</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white">
              <CardHead title="Facility Status" right="Site Plan ↗" />
              <div className="divide-y divide-slate-100">
                {[
                  ['Building 1', 'critical', 'bg-sev-crit', 'DPT1 · DPT2 · DPT3', '14 systems'],
                  ['Building 2', 'high', 'bg-sev-high', 'DPT1 · DPT2', '9 systems'],
                  ['Building 3', 'ok', 'bg-success-solid', 'DPT1 · DPT2', '11 systems'],
                ].map(([name, st, dot, depts, n]) => (
                  <div key={name as string} className="px-3.5 py-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-ink">{name}</span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.4px] text-slate-500">
                        <span className={`h-[7px] w-[7px] rounded-full ${dot}`} />
                        {st === 'ok' ? 'Nominal' : st === 'high' ? 'Warning' : 'Critical'}
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between text-[10px] text-slate-400">
                      <span>{depts}</span>
                      <span className="font-mono">{n}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <span className="flex items-baseline gap-2">
                  <span className="text-[13px] font-bold text-ink">Notes</span>
                  <span className="rounded-full bg-primary-bg px-1.5 py-0.5 text-[10px] font-bold text-primary-text">1 new</span>
                </span>
                <span className="text-xs font-semibold text-primary-text">All notes ↗</span>
              </div>
              <div className="space-y-2 p-3">
                <div className="rounded-lg border border-slate-200 p-2.5">
                  <span className="rounded-sm bg-primary px-1.5 py-[2px] text-[8px] font-bold uppercase tracking-[0.5px] text-white">
                    New
                  </span>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                    DO in Tank 3 drifting low all evening. Trend attached.
                  </p>
                  <p className="mt-1.5 flex items-baseline justify-between text-[10px] text-slate-400">
                    <span className="font-mono">DPT1-FT03</span>
                    <span>M. Haugen · 14:02</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* full width: tank vitals */}
        <div className="rounded-xl border border-slate-200 bg-white">
          <CardHead title="Tank Vitals" caption="Every department · O₂ saturation · water level · pump sump" />
          <div className="space-y-3 p-3.5">
            {[
              ['Building 1 · DPT1', true],
              ['Building 1 · DPT2', false],
            ].map(([dept, crit]) => (
              <div key={dept as string}>
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink">
                    <span className="text-slate-400">›</span> {dept}
                    <span className="ml-1 rounded border border-slate-200 px-1 py-[1px] text-[9px] font-bold uppercase tracking-[0.4px] text-slate-500">
                      Overview
                    </span>
                  </span>
                  {crit ? (
                    <span className="rounded-sm bg-critical-solid px-1.5 py-[2px] text-[9px] font-bold uppercase text-white">
                      O₂ critical
                    </span>
                  ) : null}
                  <span className="ml-auto text-[11px] font-semibold text-primary-text">Fish Tank ↗</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {crit ? (
                    <>
                      <TankCell n={1} o2="94.2" lvl="210" state="ok" />
                      <TankCell n={2} o2="93.8" lvl="208" state="ok" />
                      <TankCell n={3} o2="88.4" lvl="204" state="critical" />
                      <TankCell n={4} o2="—" lvl="—" state="off" />
                    </>
                  ) : (
                    <>
                      <TankCell n={1} o2="95.1" lvl="212" state="ok" />
                      <TankCell n={2} o2="91.0" lvl="199" state="high" />
                    </>
                  )}
                  <div className="flex flex-col items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2">
                    <span className="flex flex-col items-center gap-1">
                      <Gauge pct={48} tone="bg-primary" />
                      <span className="font-mono text-[11px] font-bold text-ink tabular-nums">193</span>
                      <span className="text-[9px] text-slate-400">cm</span>
                    </span>
                    <span className="text-[10px] font-semibold text-ink">Pump Sump</span>
                    <span className="inline-flex items-center gap-1 text-[9px] text-slate-400">
                      <span className="h-[6px] w-[6px] rounded-full bg-slate-300" /> <b className="font-mono">0</b> Hz
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center">
              <span className="text-[11px] font-semibold text-slate-500">⌄ Show 4 more departments</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.6px] text-slate-400">No tanks</span>
              {['Building 2 · Water treatment', 'Building 3 · Energy'].map((d) => (
                <span key={d} className="rounded-md border border-slate-200 px-2 py-1 text-[11px] text-slate-600">
                  › {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* full width: consumption */}
        <div className="rounded-xl border border-slate-200 bg-white">
          <CardHead title="Consumption" caption="Last 7 days" right="Full sheet ↗" />
          <div className="grid grid-cols-4 gap-3 p-3.5">
            {[
              ['Feed', '2 184', 'kg', '+3.2 %', 'up'],
              ['Oxygen', '1 042', 'Nm³', '−1.8 %', 'down'],
              ['Electricity', '18 400', 'kWh', '+0.4 %', 'up'],
              ['Chemicals', '≈ 96', 'L', '−4.1 %', 'down'],
            ].map(([l, v, u, d, dir]) => (
              <div key={l as string} className="rounded-lg border border-slate-200 px-3 py-2.5">
                <p className="text-[10px] font-semibold text-slate-500">{l}</p>
                <p className="mt-1 flex items-baseline gap-1">
                  <span className="font-mono text-[15px] font-bold text-ink tabular-nums">{v}</span>
                  <span className="text-[10px] text-slate-400">{u}</span>
                </p>
                <p className={`text-[10px] font-semibold ${dir === 'up' ? 'text-slate-500' : 'text-success-text'}`}>{d}</p>
                <svg viewBox="0 0 60 16" className="mt-1.5 block h-4 w-full" aria-hidden>
                  {[6, 9, 5, 11, 8, 13, 10].map((h, i) => (
                    <rect key={i} x={i * 8.6} y={16 - h} width="5.5" height={h} rx="1.5" fill="var(--color-primary)" opacity="0.45" />
                  ))}
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* full width: maneuvers */}
        <div className="rounded-xl border border-slate-200 bg-white">
          <CardHead title="Maneuver History" right="View all ↗" />
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                {['Date / Time', 'Area', 'Maneuver', 'Change', 'Operator'].map((h) => (
                  <th
                    key={h}
                    className="border-b border-slate-200 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.6px] text-slate-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['04 Mar · 13:52', 'DPT1 Fish Tank 2', 'O₂ saturation setpoint', '92.0 %', '94.0 %', 'E. Sørensen', false],
                ['04 Mar · 13:23', 'DPT2 CO₂-stripper', 'Stripper fan 2 override', 'Auto 60 %', 'Manual 85 %', 'M. Haugen', true],
                ['04 Mar · 13:42', 'DPT2 MBBR', 'Biofilter recirculation pump', 'Stopped', 'Running', 'System', false],
              ].map(([t, area, sig, from, to, op, warn]) => (
                <tr key={t as string} className={warn ? 'bg-warning-bg' : ''}>
                  <td className="border-b border-slate-100 px-3 py-2 font-mono text-[11px] font-semibold text-ink">{t}</td>
                  <td className="border-b border-slate-100 px-3 py-2 text-[11px] text-slate-600">{area}</td>
                  <td className="border-b border-slate-100 px-3 py-2 text-[11px] font-semibold text-ink">{sig}</td>
                  <td className="border-b border-slate-100 px-3 py-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px]">
                      <span className="rounded border border-slate-200 px-1.5 py-[2px] text-slate-500">{from}</span>
                      <span className="text-slate-400">→</span>
                      <span className="rounded border border-slate-300 px-1.5 py-[2px] font-semibold text-ink">{to}</span>
                    </span>
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2 text-[11px] text-slate-600">{op}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── The drawer ── */}
      <h2 className="mt-10 text-base font-bold text-ink">The department sheet is a drawer on the rail</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Clicking a department&rsquo;s name in the Tank Vitals rail opens its process sheet directly
        beneath it: every process in that department as one simplified combined mimic, one symbol per
        stage with multiplicity carried in a row of unit dots. The rail <em>is</em> the selector, so
        there is no dropdown and the all-department view never goes away. Do not auto-expand the fold
        on pick &mdash; a department that was just clicked is by definition visible, and forcing the
        fold open pushes the drawer far below the click. There is no SCADA or fullscreen button on
        the sheet: it is deliberately low-density and readable whole at card size, and clicking a
        stage opens that system&rsquo;s real diagram, which is the drill-down. A department that owns
        a hand-drawn combined mimic still gets the composed sheet here, with a link out to the
        detailed one &mdash; a full P&amp;ID at a fixed 1500-unit viewBox squeezed into a card scales
        to about half and renders its tags at 5px.
      </p>
      <p className="mt-2.5 text-[13px] leading-relaxed text-slate-500">
        See{' '}
        <Link href="/components/scada-symbols" className="font-semibold text-primary-text hover:underline">
          SCADA symbols
        </Link>{' '}
        for the stage glyphs and the three-state unit dots the sheet is built from.
      </p>

      {/* ── Mobile ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Mobile</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        The same priority order, stacked. The annunciator stays pinned, the KPI rows become a 2×2
        tile grid, and the two-pane grid collapses into a single column in a fixed source order.
      </p>
      <div className="mt-5 w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <button className="flex w-full items-center gap-2.5 border-b border-slate-200 border-l-4 border-l-critical bg-critical-bg py-2 pl-3 pr-3.5 text-left">
          <span className="shrink-0 rounded-[5px] bg-critical-solid px-1.5 py-[3px] text-[9px] font-extrabold uppercase text-white">
            Crit
          </span>
          <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-ink">Dissolved oxygen low-low</span>
          <span className="shrink-0 rounded-full bg-[rgba(15,24,43,0.1)] px-[7px] py-0.5 font-mono text-[11px] font-extrabold text-ink">
            +6
          </span>
        </button>

        <div className="bg-slate-50 p-4">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[1px] text-slate-400">Water chemistry</p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              ['Min O₂ Sat', '88.4', '%', true],
              ['Max TAN', '0.62', 'mg/L', false],
              ['Max Turbidity', '0.45', 'NTU', false],
              ['Tanks', '25', 'of 26', false],
            ].map(([l, v, u, crit]) => (
              <div
                key={l as string}
                className={`relative overflow-hidden rounded-2xl border bg-white px-3 py-2.5 ${crit ? 'border-critical-mid' : 'border-slate-200'}`}
              >
                {crit ? <span className="absolute inset-y-0 left-0 w-1 bg-critical" /> : null}
                <p className="text-[9px] font-extrabold uppercase tracking-[0.6px] text-slate-400">{l}</p>
                <p className="mt-1.5 font-mono text-2xl font-semibold leading-none tracking-[-1px] text-ink tabular-nums">
                  {v}
                  <span className="ml-0.5 text-[11px] font-medium text-slate-400">{u}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Rules ── */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2.5">
          {RULES.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
