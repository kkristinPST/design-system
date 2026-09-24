/**
 * NJORD process (P&ID mimic) symbols.
 *
 * Mirrors design_handoff_njord/process-symbols/process-symbols.jsx, which the
 * project packaged specifically for this design system. Geometry and path data
 * are VERBATIM; like that file, every piece of state is a prop rather than a
 * read from the app's alarm and trend stores.
 *
 * The handoff README is explicit about provenance: njord-ds-v2's SCADA
 * components are behind the app — they draw their own pump and fill the body
 * with sc-abnormal in alarm. The app replaced both. Treat this as the source.
 *
 * Styling lives in app/scada.css under the app's own .rasm-* class names.
 */

export type Alarm = {
  level: 'critical' | 'high' | 'medium' | 'low'
  /** Blocked and out-of-service alarms draw NOTHING: pass null, not a state. */
  state: 'unack' | 'ack' | 'returned'
}

/**
 * crit (red triangle) · warn (amber circle, high) · "warn lo" (yellow diamond,
 * medium and low).
 *
 * Medium and low emit BOTH classes, not "lo" alone: "lo" is additive, so every
 * .warn rule still applies and only the three it overrides — dot fill, readout
 * edge, tag ink — change. A rule added to .warn later then reaches them too.
 */
export const tone = (a?: Alarm | null) =>
  !a ? 'warn' : a.level === 'critical' ? 'crit' : a.level === 'high' ? 'warn' : 'warn lo'

export type Supp = 'blocked' | 'oos'

export const suppTitle = (s?: Supp | null) =>
  s === 'oos' ? 'Alarm out of service' : s === 'blocked' ? 'Alarm blocked' : ''

export function alarmTitle(a?: Alarm | null) {
  if (!a) return ''
  const st =
    a.state === 'unack' ? 'unacknowledged' : a.state === 'returned' ? 'returned to normal, not acknowledged' : 'acknowledged'
  return `${a.level[0].toUpperCase()}${a.level.slice(1)} alarm, ${st}`
}

/** The fill says run/stop and nothing else. An alarm never touches it. */
const psBody = (running?: boolean) => (running ? 'var(--color-sc-run)' : 'var(--color-sc-stop)')

type Sym = { cx: number; cy: number; s?: number; running?: boolean }

/** Centrifugal pump — the customer's windowed disc. */
export function SymPump({ cx, cy, s = 1.25, running }: Sym) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${s}) translate(-17.32,-16.43)`}>
      <path
        d="M33.75 16.4297C33.75 7.3558 26.3942 0 17.3203 0C8.24645 0 0.890625 7.3558 0.890625 16.4297C0.890625 25.5035 8.24645 32.8594 17.3203 32.8594C26.3942 32.8594 33.75 25.5035 33.75 16.4297Z"
        fill="var(--color-sc-fill-lite)"
      />
      <path
        className="sc-body"
        d="M17.2688 0.102936C8.22342 0.102936 0.890625 7.43573 0.890625 16.4812C0.890625 25.5267 8.22353 32.8594 17.2688 32.8594C26.3142 32.8594 33.6471 25.5266 33.6471 16.4812C33.6471 7.43562 26.3142 0.102936 17.2688 0.102936ZM17.013 2.66203L3.48148 17.2165C3.46834 16.9704 3.44972 16.73 3.44972 16.4807C3.44972 8.93509 9.50045 2.80004 17.013 2.66203ZM17.5247 2.66203C25.0374 2.80013 31.088 8.93565 31.088 16.4816C31.088 16.7309 31.0694 16.9713 31.0562 17.2174L17.5247 2.66203ZM4.44119 21.6318L30.0967 21.6318C28.0529 26.7094 23.0782 30.3007 17.2695 30.3007C11.4608 30.3007 6.48472 26.7094 4.44119 21.6318Z"
        fill={psBody(running)}
      />
    </g>
  )
}

/** CO2 stripping fan / blower — a two-leaf rotor in the same disc. */
export function SymFan({ cx, cy, s = 1.25, running }: Sym) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${s}) translate(-17.32,-16.43)`}>
      <path
        d="M33.75 16.4297C33.75 7.3558 26.3942 0 17.3203 0C8.24645 0 0.890625 7.3558 0.890625 16.4297C0.890625 25.5035 8.24645 32.8594 17.3203 32.8594C26.3942 32.8594 33.75 25.5035 33.75 16.4297Z"
        fill="var(--color-sc-fill-lite)"
      />
      <path
        className="sc-body"
        d="M0.890625 16.4324C0.890625 7.38686 8.21067 0.0664062 17.2567 0.0664062C26.3026 0.0664062 33.6227 7.38635 33.6227 16.4324C33.6227 25.4785 26.3026 32.7985 17.2567 32.7985C8.21067 32.7985 0.890625 25.4785 0.890625 16.4324ZM3.26523 16.4324C3.26523 22.1259 6.6631 27.0193 11.5443 29.2045L7.91822 6.06838C5.07763 8.62916 3.26523 12.3066 3.26523 16.4324ZM22.9685 29.2045C27.8497 27.0203 31.2476 22.1265 31.2476 16.4324C31.2476 12.3068 29.4353 8.62833 26.5947 6.06735L22.9685 29.2045Z"
        fill={psBody(running)}
      />
    </g>
  )
}

/**
 * Motor / impeller in a ring — inside the drum filter and the blower cabinet.
 *
 * Ring and shaft are the run/stop body, the ground between them is
 * sc-fill-lite: the same two-tone rule as the pump and the fan. It used to
 * paint ring and shaft sc-edge in BOTH states, which left a stopped drum
 * filter reading dark — the one thing the fill is supposed to tell you.
 */
export function SymMotor({ cx, cy, s = 1, running }: Sym) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${s}) translate(-21.08,-18.55)`}>
      <path
        className="sc-body"
        d="M39.637 18.5555C39.637 8.30849 31.3302 0.00164795 21.0832 0.00164795C10.8361 0.00164795 2.5293 8.30849 2.5293 18.5555C2.5293 28.8025 10.8361 37.1094 21.0832 37.1094C31.3302 37.1094 39.637 28.8025 39.637 18.5555Z"
        fill={psBody(running)}
      />
      <path
        d="M36.7374 18.5561C36.7374 9.91019 29.7285 2.90129 21.0826 2.90129C12.4366 2.90129 5.42773 9.91019 5.42773 18.5561C5.42773 27.202 12.4366 34.2109 21.0826 34.2109C29.7285 34.2109 36.7374 27.202 36.7374 18.5561Z"
        fill="var(--color-sc-fill-lite)"
      />
      <path className="sc-body" d="M15.2852 5.79898L15.2852 31.3105H26.8813V5.79898H15.2852Z" fill={psBody(running)} />
    </g>
  )
}

/** Dose / control valve — a bowtie. */
export function SymValve({ cx, cy, s = 1.1, running }: Sym) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${s}) translate(-10.32,-16.15)`}>
      <path
        className="sc-body"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6426 1.79492L10.3217 15.7762L1.00081 1.79492L19.6426 1.79492Z"
        fill={psBody(running)}
        stroke="var(--color-sc-edge)"
        strokeWidth="0.926"
      />
      <path
        className="sc-body"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6426 30.5008H1.00081L10.3217 16.5195L19.6426 30.5008Z"
        fill={psBody(running)}
        stroke="var(--color-sc-edge)"
        strokeWidth="0.926"
      />
    </g>
  )
}

/** Oxygenation cone — static, because a cone has no run state. */
export function SymCone({ cx, cy, s = 1.05 }: { cx: number; cy: number; s?: number }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${s}) translate(-14.18,-22.6)`}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1813 0.0395715C12.079 0.0395715 10.3748 0.32475 10.3748 0.676527V1.18609C10.3748 1.36717 10.837 1.53962 11.6436 1.66033V3.7339L4.10116 41.5981C4.05696 41.7154 4.03337 41.8333 4.03077 41.9514C4.03077 41.9909 4.03727 42.0296 4.04572 42.0678C4.04572 42.0737 4.05221 42.0797 4.05221 42.0857C4.28151 43.7894 8.7468 45.1341 14.1814 45.1361C19.615 45.1342 24.0799 43.79 24.3106 42.0867C24.3106 42.0906 24.3041 42.0946 24.3041 42.0986C24.3197 42.0504 24.3301 42.0016 24.3301 41.9513C24.3236 41.8416 24.3047 41.732 24.2646 41.6229L22.9596 35.0721L22.0229 30.37L16.7171 3.73341V1.65932C17.5229 1.53873 17.9842 1.36648 17.9859 1.18559V0.676018C17.9859 0.324241 16.2817 0.0390625 14.1794 0.0390625L14.1813 0.0395715Z"
        fill="var(--color-sc-vessel)"
        stroke="var(--color-sc-edge)"
        strokeWidth="0.926"
      />
      <path
        d="M14 41.6453C16.5068 41.6453 18.539 39.5653 18.539 36.9994C18.539 34.4336 16.5068 32.3535 14 32.3535C11.4931 32.3535 9.46094 34.4336 9.46094 36.9994C9.46094 39.5653 11.4931 41.6453 14 41.6453Z"
        fill="var(--color-sc-line)"
        stroke="var(--color-sc-edge)"
        strokeWidth="0.69"
      />
      <path
        d="M14 27.6453C16.5068 27.6453 18.539 25.5653 18.539 22.9994C18.539 20.4336 16.5068 18.3535 14 18.3535C11.4931 18.3535 9.46094 20.4336 9.46094 22.9994C9.46094 25.5653 11.4931 27.6453 14 27.6453Z"
        fill="var(--color-sc-line)"
        stroke="var(--color-sc-edge)"
        strokeWidth="0.69"
      />
    </g>
  )
}

/** Drum filter: node box 62x58, motor centred at 0.7. */
export function DrumFilterBox({ x, y, running }: { x: number; y: number; running?: boolean }) {
  return (
    <g>
      <rect className="rasm-box" x={x} y={y} width={62} height={58} rx="6" />
      <SymMotor cx={x + 31} cy={y + 29} s={0.7} running={running} />
    </g>
  )
}

/** Blower cabinet 66x86, fan at 0.82 in the lower half. The speed readout sits inside the top. */
export function BlowerCabinet({ x, y, running }: { x: number; y: number; running?: boolean }) {
  return (
    <g>
      <rect className="rasm-cab" x={x} y={y} width={66} height={86} rx="5" />
      <SymFan cx={x + 33} cy={y + 60} s={0.82} running={running} />
    </g>
  )
}

type Box = { x: number; y: number; w: number; h: number }

export function Bioreactor({ x, y, w, h }: Box) {
  return (
    <g aria-hidden="true">
      <rect x={x} y={y} width={w} height={h} rx="4" fill="var(--color-sc-vessel)" stroke="var(--color-sc-edge)" strokeWidth="1.4" />
      <rect x={x + 6} y={y + h * 0.42} width={w - 12} height={h * 0.58 - 6} fill="var(--color-sc-water)" opacity="0.55" />
      {[0, 1].map((b) => (
        <g key={b}>
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={i}
              x1={x + 18 + b * (w / 2 - 8) + i * 7}
              y1={y + h - 10}
              x2={x + 18 + b * (w / 2 - 8) + i * 7}
              y2={y + h - 26}
              stroke="var(--color-sc-line)"
              strokeWidth="1.3"
            />
          ))}
          <line
            x1={x + 16 + b * (w / 2 - 8)}
            y1={y + h - 10}
            x2={x + 16 + b * (w / 2 - 8) + 50}
            y2={y + h - 10}
            stroke="var(--color-sc-line)"
            strokeWidth="1.6"
          />
        </g>
      ))}
    </g>
  )
}

export function StripperColumn({ x, y, w, h }: Box) {
  return (
    <g aria-hidden="true">
      <rect x={x} y={y} width={w} height={h} rx="3" fill="var(--color-sc-vessel)" stroke="var(--color-sc-edge)" strokeWidth="1.4" />
      <rect x={x + 7} y={y + 8} width={w - 14} height={h - 40} fill="var(--color-sc-node)" stroke="var(--color-sc-line)" strokeWidth="1" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={i}
          x1={x + 7}
          y1={y + 16 + i * ((h - 56) / 9)}
          x2={x + w - 7}
          y2={y + 16 + i * ((h - 56) / 9)}
          stroke="var(--color-sc-line)"
          strokeWidth="1.2"
        />
      ))}
      <rect x={x + 7} y={y + h - 30} width={w - 14} height={22} fill="var(--color-sc-water)" opacity="0.5" />
    </g>
  )
}

/** Sump / collection basin — square-cornered, so it reads as civil works rather than a vessel. */
export function SumpBasin({ x, y, w, h }: Box) {
  return (
    <g aria-hidden="true">
      <path
        d={`M${x},${y} H${x + w} V${y + h} H${x} Z`}
        fill="var(--color-sc-vessel)"
        stroke="var(--color-sc-edge)"
        strokeWidth="1.4"
      />
      <rect x={x + 5} y={y + h * 0.34} width={w - 10} height={h * 0.66 - 5} fill="var(--color-sc-water)" opacity="0.5" />
    </g>
  )
}

/** Inlet / outlet flag. The width grows with the label; it never truncates. */
export function Flag({ x, y, label, dir = 'r' }: { x: number; y: number; label: string; dir?: 'r' | 'l' }) {
  const tip = 14
  const w = Math.max(96, Math.ceil(label.length * 7.1) + tip + 22)
  const h = 34
  const d =
    dir === 'r'
      ? `M${x},${y} H${x + w - tip} L${x + w},${y + h / 2} L${x + w - tip},${y + h} H${x} Z`
      : `M${x + w},${y} H${x + tip} L${x},${y + h / 2} L${x + tip},${y + h} H${x + w} Z`
  return (
    <g aria-hidden="true">
      <path d={d} fill="var(--color-sc-node)" stroke="var(--color-slate-400)" strokeWidth="1.4" />
      <text className="rasm-flag" x={x + w / 2 + (dir === 'r' ? -4 : 4)} y={y + h / 2 + 4} textAnchor="middle">
        {label}
      </text>
    </g>
  )
}

export function Pipe({ d, fluid = 'proc', idle }: { d: string; fluid?: string; idle?: boolean }) {
  return <path d={d} className={`rasm-pipe fl-${fluid}${idle ? ' fl-idle' : ''}`} />
}

export const FLUIDS: Record<string, { label: string; gas: boolean }> = {
  proc: { label: 'Process water', gas: false },
  raw: { label: 'Raw water', gas: false },
  drain: { label: 'Effluent / drain', gas: false },
  sludge: { label: 'Sludge', gas: false },
  glycol: { label: 'Glycol loop', gas: false },
  brine: { label: 'Brine / seawater', gas: false },
  chem: { label: 'Chemical dosing', gas: false },
  feed: { label: 'Feed transport', gas: false },
  o2: { label: 'Oxygen', gas: true },
  gas: { label: 'Air / CO₂ off-gas', gas: true },
}

/** Auto / Manual. Outline and letter share ONE token; Manual is a mode, never --warning. */
export function ModeChip({ x, y, mode, eqOos }: { x: number; y: number; mode: 'A' | 'M'; eqOos?: boolean }) {
  const man = mode === 'M'
  // A locked-out machine has no meaningful Auto/Manual, so the chip becomes a lock.
  if (eqOos)
    return (
      <g className="rasm-eqoos-chip">
        <title>Equipment out of service</title>
        <rect x={x} y={y} width="17" height="17" rx="3" />
        <g transform={`translate(${x + 3},${y + 3}) scale(0.46)`}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </g>
      </g>
    )
  return (
    <g>
      <title>{man ? 'Manual mode' : 'Automatic mode'}</title>
      <rect
        x={x}
        y={y}
        width="17"
        height="17"
        rx="3"
        fill="var(--color-sc-node)"
        stroke={man ? 'var(--color-sc-manual)' : 'var(--color-slate-300)'}
        strokeWidth="1.2"
      />
      <text className="rasm-mode" x={x + 8.5} y={y + 12.5} textAnchor="middle" fill={man ? 'var(--color-sc-manual)' : 'var(--color-slate-600)'}>
        {mode}
      </text>
    </g>
  )
}

/** Priority badge: triangle critical, circle otherwise; faded unless unacknowledged. */
export function AbnormalRing({ at, alarm }: { at: [number, number]; alarm: Alarm }) {
  const crit = alarm.level === 'critical'
  const lo = alarm.level === 'medium' || alarm.level === 'low'
  return (
    <g
      className={`rasm-abn ${tone(alarm)}${alarm.state === 'unack' ? ' unack' : ''}`}
      pointerEvents="none"
      transform={`translate(${at[0]},${at[1]})`}
    >
      {crit ? (
        <path className="rasm-abn-dot" d="M0 -8.8 L9 6.6 L-9 6.6 Z" strokeLinejoin="round" />
      ) : lo ? (
        <path className="rasm-abn-dot" d="M0 -9 L9 0 L0 9 L-9 0 Z" strokeLinejoin="round" />
      ) : (
        <circle className="rasm-abn-dot" r="8" />
      )}
      <text className="rasm-abn-g" y={crit ? 5.6 : 3.8} textAnchor="middle">
        !
      </text>
    </g>
  )
}

/**
 * Suppression mark: the alarm is deactivated, the condition is not.
 *
 * Neutral ink and a dashed SQUARE — never an alarm colour, and never the
 * alarm's circle or triangle. "We stopped listening" must not look like
 * "nothing is wrong", and must not look like an alarm either. Icons rather than
 * the register's B / M letters, because an out-of-service "M" would sit
 * directly under a Manual "M" mode chip in the same column.
 */
export function SuppMark({ at, supp }: { at: [number, number]; supp: Supp }) {
  return (
    <g className={`rasm-sup ${supp}`} pointerEvents="none" transform={`translate(${at[0]},${at[1]})`}>
      <rect className="rasm-sup-box" x="-8" y="-8" width="16" height="16" rx="3" />
      <g className="rasm-sup-ic" transform="translate(-5.5,-5.5) scale(0.46)">
        {supp === 'oos' ? (
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M4.93 4.93l14.14 14.14" />
          </>
        )}
      </g>
    </g>
  )
}

/**
 * Hit wrapper. `mark` is the badge anchor, PASSED IN — a symbol knows its own
 * centre, and getBBox inside an effect never resolves in time.
 *
 * `interactive` stands in for the app's onClick: these pages are static, so the
 * reference carries the role, tab stop and classes that drive :hover and
 * :focus-visible, but no handler.
 */
export function Eq({
  interactive,
  title,
  children,
  alarm,
  supp,
  eqOos,
  mark,
  className = '',
}: {
  interactive?: boolean
  title?: string
  children: React.ReactNode
  alarm?: Alarm | null
  /** The ALARM is deactivated. Independent of eqOos, and an active alarm wins. */
  supp?: Supp | null
  /** The MACHINE is locked out by the PLC. Independent of supp. */
  eqOos?: boolean
  mark?: [number, number]
  className?: string
}) {
  // Precedence: active alarm > suppression > none.
  const sp = alarm ? null : supp
  const cls = [
    interactive ? 'rasm-eq' : '',
    eqOos ? 'eq-oos' : '',
    alarm ? `rasm-eq-abn ${tone(alarm)}${alarm.state === 'unack' ? ' unack' : ''}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const label = [
    title,
    eqOos ? 'Equipment out of service' : null,
    alarm ? alarmTitle(alarm) : sp ? suppTitle(sp) : null,
  ]
    .filter(Boolean)
    .join(' — ')
  return (
    <g className={cls || undefined} role={interactive ? 'button' : undefined} tabIndex={interactive ? 0 : undefined}>
      {label ? <title>{label}</title> : null}
      {children}
      {alarm && mark ? <AbnormalRing at={mark} alarm={alarm} /> : null}
      {sp && mark ? <SuppMark at={mark} supp={sp} /> : null}
    </g>
  )
}

export function Tag2({
  x,
  y,
  tag,
  desc,
  anchor = 'middle',
  alarm,
}: {
  x: number
  y: number
  tag?: string
  desc?: string[]
  anchor?: 'middle' | 'start' | 'end'
  alarm?: Alarm | null
}) {
  return (
    <g aria-hidden="true" className={alarm ? `abn ${tone(alarm)}` : undefined}>
      {tag ? (
        <text className="rasm-tag" x={x} y={y} textAnchor={anchor}>
          {tag}
        </text>
      ) : null}
      {desc?.map((d, i) => (
        <text key={i} className="rasm-desc" x={x} y={y + 13 + i * 12} textAnchor={anchor}>
          {d}
        </text>
      ))}
    </g>
  )
}

/** Value readout. The box is not clickable; only the trend icon (right, +13) is. */
export function RD({
  x,
  y,
  w = 60,
  h = 25,
  value,
  unit,
  alarm,
  supp,
  trendable,
  trendOn,
  mono = true,
}: {
  x: number
  y: number
  w?: number
  h?: number
  value: string
  unit?: string
  alarm?: Alarm | null
  supp?: Supp | null
  trendable?: boolean
  trendOn?: boolean
  mono?: boolean
}) {
  const sp = alarm ? null : supp
  return (
    <g className={`rasm-rd${trendable ? ' t' : ''}${alarm ? ` abn ${tone(alarm)}` : ''}${sp ? ' sup' : ''}`}>
      <rect className="rasm-rd-box" x={x} y={y} width={w} height={h} rx="4" />
      <text className={`rasm-rd-v${mono ? '' : ' s'}`} x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle">
        {value}
        {unit ? <tspan className="rasm-rd-u"> {unit}</tspan> : null}
      </text>
      {trendable ? (
        <g className={`rasm-rd-tr${trendOn ? ' on' : ''}`} transform={`translate(${x + w + 13},${y + h / 2})`} role="button">
          <rect className="rasm-rd-trhit" x={-11} y={-11} width={22} height={22} />
          <rect className="rasm-rd-trbg" x={-9} y={-9} width={18} height={18} rx={4.5} />
          <g className="rasm-rd-trln" transform="translate(-6.3,-5.6) scale(0.7)">
            <path d="M3 3 L3 13 L15 13" />
            <path d="M6 10 L9 7 L11 9 L15 4" />
          </g>
        </g>
      ) : null}
    </g>
  )
}

/** Run/stop trend affordance. A step wave, so binary reads apart from the analog line chart. */
export function SymTrend({ cx, cy, on }: { cx: number; cy: number; on?: boolean }) {
  return (
    <g className={`rasm-symtrend${on ? ' on' : ''}`} transform={`translate(${cx},${cy})`} role="button">
      <rect x={-11} y={-11} width={22} height={22} fill="transparent" />
      <rect className="rasm-symtrend-bg" x={-9} y={-9} width={18} height={18} rx={4.5} />
      <g className="rasm-symtrend-ln" transform="translate(-6.5,-5) scale(0.72)">
        <path d="M1 12 H4 V3 H8 V12 H11 V3 H15" />
      </g>
    </g>
  )
}

/** Multiplicity: green running, amber in service but stopped, grey out of service. */
export function UnitDots({ cx, y, units }: { cx: number; y: number; units: { run?: boolean; duty?: boolean }[] }) {
  const gap = 16
  const x0 = cx - ((units.length - 1) * gap) / 2
  return (
    <g aria-hidden="true">
      {units.map((u, i) => (
        <circle
          key={i}
          cx={x0 + i * gap}
          cy={y}
          r="5.5"
          fill={u.run ? 'var(--color-success-solid)' : u.duty ? 'var(--color-warning-mid)' : 'var(--color-sc-stop)'}
          stroke="var(--color-sc-edge)"
          strokeWidth="1"
        />
      ))}
    </g>
  )
}

/* ── department-overview stage glyphs ──────────────────────────────────────
 *
 * One symbol stands for a whole process stage, the way the legacy Oversikt
 * sheet does: the combined department sheet draws ONE drum filter and carries
 * multiplicity in a row of UnitDots under it, rather than stacking three full
 * P&IDs. These are deliberately plainer than the equipment symbols above —
 * they are never in alarm and never carry a run state, because the stage is
 * the subject and the equipment inside it is not drawn.
 */
const vessel = {
  fill: 'var(--color-sc-vessel)',
  stroke: 'var(--color-sc-edge)',
  strokeWidth: 1.4,
} as const

type Stage = { cx: number; cy: number }

export function StageTank({ cx, cy }: Stage) {
  return (
    <g aria-hidden="true">
      <rect x={cx - 46} y={cy - 34} width="92" height="68" rx="6" {...vessel} />
      <rect x={cx - 41} y={cy - 6} width="82" height="35" rx="4" fill="var(--color-sc-water)" opacity=".5" />
    </g>
  )
}

export function StageHopper({ cx, cy }: Stage) {
  return (
    <g aria-hidden="true">
      <path d={`M${cx - 38},${cy - 34} H${cx + 38} L${cx + 12},${cy + 18} H${cx - 12} Z`} {...vessel} />
      <rect
        x={cx - 14}
        y={cy + 18}
        width="28"
        height="16"
        rx="3"
        fill="var(--color-sc-stop)"
        stroke="var(--color-sc-edge)"
        strokeWidth="1.2"
      />
    </g>
  )
}

export function StageDrum({ cx, cy }: Stage) {
  return (
    <g aria-hidden="true">
      <rect x={cx - 46} y={cy - 32} width="92" height="64" rx="6" {...vessel} />
      <circle cx={cx} cy={cy} r="21" fill="none" stroke="var(--color-sc-edge)" strokeWidth="1.6" />
      <path d={`M${cx - 21},${cy} H${cx + 21} M${cx},${cy - 21} V${cy + 21}`} stroke="var(--color-sc-edge)" strokeWidth="1.2" />
    </g>
  )
}

export function StageHx({ cx, cy }: Stage) {
  return (
    <g aria-hidden="true">
      <rect x={cx - 36} y={cy - 34} width="72" height="68" rx="5" {...vessel} />
      <path
        d={`M${cx - 36},${cy - 34} L${cx + 36},${cy + 34} M${cx + 36},${cy - 34} L${cx - 36},${cy + 34}`}
        stroke="var(--color-sc-edge)"
        strokeWidth="1.4"
      />
    </g>
  )
}

export function StageCone({ cx, cy }: Stage) {
  return (
    <g aria-hidden="true">
      <path d={`M${cx - 30},${cy - 32} H${cx + 30} L${cx},${cy + 32} Z`} {...vessel} />
    </g>
  )
}

export function StageDose({ cx, cy }: Stage) {
  return (
    <g aria-hidden="true">
      <rect x={cx - 26} y={cy - 34} width="52" height="50" rx="5" {...vessel} />
      <rect x={cx - 22} y={cy - 8} width="44" height="20" rx="3" fill="var(--color-sc-water)" opacity=".5" />
      <path d={`M${cx},${cy + 16} V${cy + 30}`} stroke="var(--color-sc-edge)" strokeWidth="1.4" />
    </g>
  )
}

export function StagePanel({ cx, cy }: Stage) {
  return (
    <g aria-hidden="true">
      <rect x={cx - 34} y={cy - 28} width="68" height="56" rx="5" {...vessel} />
      <rect
        x={cx - 24}
        y={cy - 18}
        width="48"
        height="26"
        rx="3"
        fill="var(--color-sc-stop)"
        stroke="var(--color-sc-edge)"
        strokeWidth="1"
      />
    </g>
  )
}

/**
 * Each glyph's half-width, so a pipe lands ON the symbol rather than short of
 * it. A fixed value was wrong the moment the shapes stopped being the same
 * size: the 30-wide cone left a visible gap at a shared 52.
 */
export const STAGE_HALF: Record<string, number> = {
  tank: 46,
  hopper: 38,
  drum: 46,
  hx: 36,
  cone: 30,
  dose: 26,
  bio: 48,
  sump: 48,
  panel: 34,
}

/**
 * The canonical cluster. Every mimic is authored to this geometry, taken from
 * the RAS lift pump:
 *
 *   readout    x cx-33, y cy-48, 66x25
 *   mode chip  x cx-40, y cy-20
 *   badge      [cx-32, cy+9] — the mode-chip column, under the chip
 *   run trend  cx+30
 *   tag        baseline cy+40, description lines +13 / +25
 *
 * Fans sit their chip lower: chip cy-8, badge cy+26.
 */
export const CLUSTER = {
  rd: (cx: number, cy: number) => ({ x: cx - 33, y: cy - 48, w: 66 }),
  chip: (cx: number, cy: number, fan = false) => ({ x: cx - 40, y: fan ? cy - 8 : cy - 20 }),
  badge: (cx: number, cy: number, fan = false): [number, number] => [cx - 32, fan ? cy + 26 : cy + 9],
  trend: (cx: number, cy: number) => ({ cx: cx + 30, cy }),
  tag: (cx: number, cy: number) => ({ x: cx, y: cy + 40 }),
} as const

export function EquipmentCluster({
  kind = 'pump',
  cx,
  cy,
  running,
  mode = 'A',
  alarm,
  value,
  unit = 'Hz',
  tag,
  name,
  trendValueOn,
  trendRunOn,
}: {
  kind?: 'pump' | 'fan' | 'valve'
  cx: number
  cy: number
  running?: boolean
  mode?: 'A' | 'M'
  alarm?: Alarm | null
  value?: string
  unit?: string
  tag?: string
  name: string
  trendValueOn?: boolean
  trendRunOn?: boolean
}) {
  const S = kind === 'fan' ? SymFan : kind === 'valve' ? SymValve : SymPump
  const fan = kind === 'fan'
  const rd = CLUSTER.rd(cx, cy)
  const chip = CLUSTER.chip(cx, cy, fan)
  const t = CLUSTER.tag(cx, cy)
  return (
    <g>
      {value != null ? <RD {...rd} value={value} unit={unit} trendable={!!tag} trendOn={trendValueOn} /> : null}
      <Eq title={name} alarm={alarm} mark={CLUSTER.badge(cx, cy, fan)} interactive>
        <S cx={cx} cy={cy} running={running} />
      </Eq>
      <ModeChip {...chip} mode={mode} />
      {kind !== 'valve' ? <SymTrend {...CLUSTER.trend(cx, cy)} on={trendRunOn} /> : null}
      <Tag2 {...t} tag={tag} desc={[name]} alarm={alarm} />
    </g>
  )
}
