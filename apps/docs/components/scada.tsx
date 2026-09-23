/**
 * The shipping mimic symbols, transcribed path-for-path from the process
 * screens. They are the CUSTOMER's own symbol set, recreated from the legacy
 * SCADA capture so the picture reads the way operators already know it. They
 * are NOT a textbook ISA set, and substituting one builds the wrong drawing.
 *
 * Every page that draws a mimic imports from here. Three pages had their own
 * hand-drawn copies and all three had drifted, which is what this module exists
 * to stop.
 *
 * Each symbol is centred on (0,0), the way the mimics place them:
 *   translate(cx,cy) scale(s) translate(-halfW,-halfH)
 */

/**
 * Run state, and ONLY run state.
 *
 * An alarm never recolours a symbol. The fill already carries run/stop, so a
 * red pump reads as "running red"; and an added outline is a second treatment
 * competing with the badge. The badge alone marks the alarm, which also keeps
 * one consistent mark facility-wide.
 */
const body = (running?: boolean) => (running ? 'var(--color-sc-run)' : 'var(--color-sc-stop)')

/** Centrifugal pump: a windowed disc. The cut-outs are the symbol, not decoration. */
export function SymPump({ running, s = 1.25 }: { running?: boolean; s?: number }) {
  return (
    <g transform={`scale(${s}) translate(-17.32,-16.43)`}>
      <path
        d="M33.75 16.4297C33.75 7.3558 26.3942 0 17.3203 0C8.24645 0 0.890625 7.3558 0.890625 16.4297C0.890625 25.5035 8.24645 32.8594 17.3203 32.8594C26.3942 32.8594 33.75 25.5035 33.75 16.4297Z"
        fill="var(--color-sc-fill-lite)"
      />
      <path
        d="M17.2688 0.102936C8.22342 0.102936 0.890625 7.43573 0.890625 16.4812C0.890625 25.5267 8.22353 32.8594 17.2688 32.8594C26.3142 32.8594 33.6471 25.5266 33.6471 16.4812C33.6471 7.43562 26.3142 0.102936 17.2688 0.102936ZM17.013 2.66203L3.48148 17.2165C3.46834 16.9704 3.44972 16.73 3.44972 16.4807C3.44972 8.93509 9.50045 2.80004 17.013 2.66203ZM17.5247 2.66203C25.0374 2.80013 31.088 8.93565 31.088 16.4816C31.088 16.7309 31.0694 16.9713 31.0562 17.2174L17.5247 2.66203ZM4.44119 21.6318L30.0967 21.6318C28.0529 26.7094 23.0782 30.3007 17.2695 30.3007C11.4608 30.3007 6.48472 26.7094 4.44119 21.6318Z"
        fill={body(running)}
      />
    </g>
  )
}

/** CO2 stripping fan / blower: a two-leaf rotor in the same disc. */
export function SymFan({ running, s = 1.25 }: { running?: boolean; s?: number }) {
  return (
    <g transform={`scale(${s}) translate(-17.32,-16.43)`}>
      <path
        d="M33.75 16.4297C33.75 7.3558 26.3942 0 17.3203 0C8.24645 0 0.890625 7.3558 0.890625 16.4297C0.890625 25.5035 8.24645 32.8594 17.3203 32.8594C26.3942 32.8594 33.75 25.5035 33.75 16.4297Z"
        fill="var(--color-sc-fill-lite)"
      />
      <path
        d="M0.890625 16.4324C0.890625 7.38686 8.21067 0.0664062 17.2567 0.0664062C26.3026 0.0664062 33.6227 7.38635 33.6227 16.4324C33.6227 25.4785 26.3026 32.7985 17.2567 32.7985C8.21067 32.7985 0.890625 25.4785 0.890625 16.4324ZM3.26523 16.4324C3.26523 22.1259 6.6631 27.0193 11.5443 29.2045L7.91822 6.06838C5.07763 8.62916 3.26523 12.3066 3.26523 16.4324ZM22.9685 29.2045C27.8497 27.0203 31.2476 22.1265 31.2476 16.4324C31.2476 12.3068 29.4353 8.62833 26.5947 6.06735L22.9685 29.2045Z"
        fill={body(running)}
      />
    </g>
  )
}

/** Motor / impeller in a ring. Sits inside the drum filter and the MBBR blower cabinet. */
export function SymMotor({ running, s = 1 }: { running?: boolean; s?: number }) {
  return (
    <g transform={`scale(${s}) translate(-21.08,-18.55)`}>
      <path
        d="M39.637 18.5555C39.637 8.30849 31.3302 0.00164795 21.0832 0.00164795C10.8361 0.00164795 2.5293 8.30849 2.5293 18.5555C2.5293 28.8025 10.8361 37.1094 21.0832 37.1094C31.3302 37.1094 39.637 28.8025 39.637 18.5555Z"
        fill="var(--color-sc-edge)"
      />
      <path
        d="M36.7374 18.5561C36.7374 9.91019 29.7285 2.90129 21.0826 2.90129C12.4366 2.90129 5.42773 9.91019 5.42773 18.5561C5.42773 27.202 12.4366 34.2109 21.0826 34.2109C29.7285 34.2109 36.7374 27.202 36.7374 18.5561Z"
        fill={body(running)}
      />
      <path d="M15.2852 5.79898L15.2852 31.3105H26.8813V5.79898H15.2852Z" fill="var(--color-sc-edge)" />
    </g>
  )
}

/** Dose / control valve: a bowtie. */
export function SymValve({ running, s = 1.1 }: { running?: boolean; s?: number }) {
  const f = body(running)
  return (
    <g transform={`scale(${s}) translate(-10.32,-16.15)`}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6426 1.79492L10.3217 15.7762L1.00081 1.79492L19.6426 1.79492Z"
        fill={f}
        stroke="var(--color-sc-edge)"
        strokeWidth="0.926"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6426 30.5008H1.00081L10.3217 16.5195L19.6426 30.5008Z"
        fill={f}
        stroke="var(--color-sc-edge)"
        strokeWidth="0.926"
      />
    </g>
  )
}

/** Oxygenation cone (DOX). Static: it has no run state to show. */
export function SymCone({ s = 1.05 }: { s?: number }) {
  return (
    <g transform={`scale(${s}) translate(-14.18,-22.6)`}>
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

/** Auto / manual chip. Manual is drawn like Auto: outline and letter, never a fill. */
export function ModeChip({ mode }: { mode: 'A' | 'M' }) {
  const man = mode === 'M'
  return (
    <g transform="translate(-8.5,-8.5)">
      <rect
        x="0"
        y="0"
        width="17"
        height="17"
        rx="3"
        fill="var(--color-sc-node)"
        stroke={man ? 'var(--color-sc-manual)' : 'var(--color-slate-300)'}
        strokeWidth="1.2"
      />
      <text
        x="8.5"
        y="12.5"
        textAnchor="middle"
        fontSize="10.5"
        fontFamily="var(--font-sans)"
        fontWeight="700"
        fill={man ? 'var(--color-sc-manual)' : 'var(--color-slate-600)'}
      >
        {mode}
      </text>
    </g>
  )
}

/**
 * The abnormal badge. One rule, two independent axes:
 *
 *   COLOUR = priority. Red for critical, amber for high and below.
 *   SHAPE  = the same thing again. Triangle critical, circle otherwise, because
 *            red-versus-amber cannot answer "critical or high" for a
 *            colour-blind operator.
 *   OPACITY = whether anyone has looked. Solid unacknowledged, faded once
 *            acknowledged. Acknowledgement must never change hue: that reads as
 *            a different kind of alarm rather than the same one, later.
 *
 * It is placed in the MODE-CHIP COLUMN, directly under the chip — never centred
 * on the glyph and never on a flank. The readout sits above, the tag below and
 * the trend affordance right, so that column is the only free side. Relative to
 * a symbol centred at (cx,cy) the anchor is (cx - 32, cy + 9).
 */
export const ABN_OFFSET = { dx: -32, dy: 9 } as const

export function AbnormalBadge({ critical, acknowledged }: { critical?: boolean; acknowledged?: boolean }) {
  return (
    <g opacity={acknowledged ? 0.45 : 1} pointerEvents="none">
      {critical ? (
        <path d="M0 -8.8 L9 6.6 L-9 6.6 Z" fill="var(--color-sc-abnormal)" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      ) : (
        <circle r="8" fill="var(--color-warning)" stroke="#fff" strokeWidth="1.4" />
      )}
      <text
        x="0"
        y={critical ? 5.6 : 3.8}
        textAnchor="middle"
        fontSize="10"
        fontFamily="var(--font-sans)"
        fontWeight="700"
        fill={critical ? '#fff' : '#3d2c00'}
      >
        !
      </text>
    </g>
  )
}

/**
 * Value readout.
 *
 * A sensor readout IS its alarm, so it marks itself — but only on the box edge
 * and the value. It must not also carry a badge: a lye pump once drew an amber
 * ring round the symbol, a second round its readout and an amber Manual chip,
 * three amber shapes for one condition. The badge belongs to the SYMBOL, the
 * edge to the readout.
 */
export function RD({
  value,
  unit,
  alarm,
  trend,
  w = 60,
}: {
  value: string
  unit: string
  alarm?: 'crit' | 'warn'
  trend?: boolean
  w?: number
}) {
  const stroke = alarm === 'crit' ? 'var(--color-sc-abnormal)' : alarm === 'warn' ? 'var(--color-warning)' : 'var(--color-slate-200)'
  return (
    <g>
      <rect x={-w / 2} y="-12.5" width={w} height="25" rx="4" fill="#fff" stroke={stroke} strokeWidth={alarm ? 2.4 : 1.4} />
      <text
        x="0"
        y="4.5"
        textAnchor="middle"
        fontSize="13"
        fontFamily="var(--font-mono)"
        fill={alarm ? 'var(--color-critical-text)' : 'var(--color-fg)'}
      >
        {value}
        <tspan fontSize="9.5" fill="var(--color-fg-muted)"> {unit}</tspan>
      </text>
      {trend ? (
        <g transform={`translate(${w / 2 + 13},0)`}>
          <rect x="-9" y="-9" width="18" height="18" rx="4.5" fill="var(--color-primary-bg)" />
          <g
            transform="translate(-6.3,-5.6) scale(0.7)"
            fill="none"
            stroke="var(--color-primary-text)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3 L3 13 L15 13" />
            <path d="M6 10 L9 7 L11 9 L15 4" />
          </g>
        </g>
      ) : null}
    </g>
  )
}

/** Inlet / outlet flow flag. The tip points the way the fluid travels. */
export function Flag({ label, dir = 'r' }: { label: string; dir?: 'r' | 'l' }) {
  const tip = 14
  const w = Math.max(96, Math.ceil(label.length * 7.1) + tip + 22)
  const h = 34
  const d =
    dir === 'r'
      ? `M0,0 H${w - tip} L${w},${h / 2} L${w - tip},${h} H0 Z`
      : `M${w},0 H${tip} L0,${h / 2} L${tip},${h} H${w} Z`
  return (
    <g transform={`translate(${-w / 2},${-h / 2})`}>
      <path d={d} fill="var(--color-sc-node)" stroke="var(--color-slate-400)" strokeWidth="1.4" />
      <text
        x={w / 2 + (dir === 'r' ? -4 : 4)}
        y={h / 2 + 4}
        textAnchor="middle"
        fontSize="12"
        fontFamily="var(--font-sans)"
        fontWeight="600"
        fill="var(--color-fg)"
      >
        {label}
      </text>
    </g>
  )
}
