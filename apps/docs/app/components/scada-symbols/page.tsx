import ComponentDoc, { type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

/*
 * These are the shipping symbols, transcribed path-for-path from the process
 * mimics. They are the CUSTOMER's own symbol set, recreated from the legacy
 * SCADA capture so the picture reads the way operators already know it — not a
 * textbook ISA set. A generic ISA pump is not what is on the wall, so a
 * developer measuring off an idealised one builds the wrong drawing.
 *
 * Every symbol is centred on (0,0) here, the way the mimics place them:
 *   translate(cx,cy) scale(s) translate(-halfW,-halfH)
 */

/** Running is a solid dark neutral, stopped a light one. Colour only for abnormal. */
const body = (running?: boolean, abnormal?: boolean) =>
  abnormal ? 'var(--color-sc-abnormal)' : running ? 'var(--color-sc-run)' : 'var(--color-sc-stop)'

/** Centrifugal pump: a windowed disc. The cut-outs are the symbol, not decoration. */
function SymPump({ running, abnormal, s = 1.25 }: { running?: boolean; abnormal?: boolean; s?: number }) {
  return (
    <g transform={`scale(${s}) translate(-17.32,-16.43)`}>
      <path
        d="M33.75 16.4297C33.75 7.3558 26.3942 0 17.3203 0C8.24645 0 0.890625 7.3558 0.890625 16.4297C0.890625 25.5035 8.24645 32.8594 17.3203 32.8594C26.3942 32.8594 33.75 25.5035 33.75 16.4297Z"
        fill="var(--color-sc-fill-lite)"
      />
      <path
        d="M17.2688 0.102936C8.22342 0.102936 0.890625 7.43573 0.890625 16.4812C0.890625 25.5267 8.22353 32.8594 17.2688 32.8594C26.3142 32.8594 33.6471 25.5266 33.6471 16.4812C33.6471 7.43562 26.3142 0.102936 17.2688 0.102936ZM17.013 2.66203L3.48148 17.2165C3.46834 16.9704 3.44972 16.73 3.44972 16.4807C3.44972 8.93509 9.50045 2.80004 17.013 2.66203ZM17.5247 2.66203C25.0374 2.80013 31.088 8.93565 31.088 16.4816C31.088 16.7309 31.0694 16.9713 31.0562 17.2174L17.5247 2.66203ZM4.44119 21.6318L30.0967 21.6318C28.0529 26.7094 23.0782 30.3007 17.2695 30.3007C11.4608 30.3007 6.48472 26.7094 4.44119 21.6318Z"
        fill={body(running, abnormal)}
      />
    </g>
  )
}

/** CO2 stripping fan / blower: a two-leaf rotor in the same disc. */
function SymFan({ running, abnormal, s = 1.25 }: { running?: boolean; abnormal?: boolean; s?: number }) {
  return (
    <g transform={`scale(${s}) translate(-17.32,-16.43)`}>
      <path
        d="M33.75 16.4297C33.75 7.3558 26.3942 0 17.3203 0C8.24645 0 0.890625 7.3558 0.890625 16.4297C0.890625 25.5035 8.24645 32.8594 17.3203 32.8594C26.3942 32.8594 33.75 25.5035 33.75 16.4297Z"
        fill="var(--color-sc-fill-lite)"
      />
      <path
        d="M0.890625 16.4324C0.890625 7.38686 8.21067 0.0664062 17.2567 0.0664062C26.3026 0.0664062 33.6227 7.38635 33.6227 16.4324C33.6227 25.4785 26.3026 32.7985 17.2567 32.7985C8.21067 32.7985 0.890625 25.4785 0.890625 16.4324ZM3.26523 16.4324C3.26523 22.1259 6.6631 27.0193 11.5443 29.2045L7.91822 6.06838C5.07763 8.62916 3.26523 12.3066 3.26523 16.4324ZM22.9685 29.2045C27.8497 27.0203 31.2476 22.1265 31.2476 16.4324C31.2476 12.3068 29.4353 8.62833 26.5947 6.06735L22.9685 29.2045Z"
        fill={body(running, abnormal)}
      />
    </g>
  )
}

/** Motor / impeller in a ring. Sits inside the drum filter and the MBBR blower cabinet. */
function SymMotor({ running, abnormal, s = 1 }: { running?: boolean; abnormal?: boolean; s?: number }) {
  return (
    <g transform={`scale(${s}) translate(-21.08,-18.55)`}>
      <path
        d="M39.637 18.5555C39.637 8.30849 31.3302 0.00164795 21.0832 0.00164795C10.8361 0.00164795 2.5293 8.30849 2.5293 18.5555C2.5293 28.8025 10.8361 37.1094 21.0832 37.1094C31.3302 37.1094 39.637 28.8025 39.637 18.5555Z"
        fill="var(--color-sc-edge)"
      />
      <path
        d="M36.7374 18.5561C36.7374 9.91019 29.7285 2.90129 21.0826 2.90129C12.4366 2.90129 5.42773 9.91019 5.42773 18.5561C5.42773 27.202 12.4366 34.2109 21.0826 34.2109C29.7285 34.2109 36.7374 27.202 36.7374 18.5561Z"
        fill={body(running, abnormal)}
      />
      <path d="M15.2852 5.79898L15.2852 31.3105H26.8813V5.79898H15.2852Z" fill="var(--color-sc-edge)" />
    </g>
  )
}

/** Dose / control valve: a bowtie. */
function SymValve({ running, abnormal, s = 1.1 }: { running?: boolean; abnormal?: boolean; s?: number }) {
  const f = body(running, abnormal)
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
function SymCone({ s = 1.05 }: { s?: number }) {
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
function ModeChip({ mode }: { mode: 'A' | 'M' }) {
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

/** The value readout box, with the trend affordance that appears beside it. */
function RD({ value, unit, accent, trend }: { value: string; unit: string; accent?: string; trend?: boolean }) {
  return (
    <g>
      <rect x="-30" y="-12.5" width="60" height="25" rx="4" fill="#fff" stroke={accent ?? 'var(--color-slate-200)'} strokeWidth="1.4" />
      <text x="0" y="4.5" textAnchor="middle" fontSize="13" fontFamily="var(--font-mono)" fill={accent ?? 'var(--color-fg)'}>
        {value}
        <tspan fontSize="9.5" fill="var(--color-fg-muted)"> {unit}</tspan>
      </text>
      {trend ? (
        <g transform="translate(43,0)">
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
function Flag({ label, dir = 'r' }: { label: string; dir?: 'r' | 'l' }) {
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

/** The abnormal mark: a ring badge beside the symbol. Triangle is critical, circle is not. */
function AbnormalMark({ critical }: { critical?: boolean }) {
  return (
    <g>
      {critical ? (
        <path
          d="M0 -8.8 L9 6.6 L-9 6.6 Z"
          fill="var(--color-sc-abnormal)"
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      ) : (
        <circle r="8" fill="var(--color-warning)" stroke="#fff" strokeWidth="1.4" />
      )}
      <text x="0" y={critical ? 5.6 : 3.8} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">
        !
      </text>
    </g>
  )
}

function Cell({
  label,
  children,
  w = 108,
  h = 92,
}: {
  label: string
  children: React.ReactNode
  w?: number
  h?: number
}) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <svg width={w} height={h} viewBox={`${-w / 2} ${-h / 2} ${w} ${h}`} aria-hidden>
        {children}
      </svg>
      <span className="max-w-[120px] text-center text-xs leading-snug text-slate-600">{label}</span>
    </div>
  )
}

const fluids = [
  ['Process / recirculated', 'var(--color-fl-proc)', false],
  ['Raw · intake · make-up', 'var(--color-fl-raw)', false],
  ['Effluent · drain', 'var(--color-fl-drain)', false],
  ['Sludge · dead fish', 'var(--color-fl-sludge)', false],
  ['Glycol loop', 'var(--color-fl-glycol)', false],
  ['Brine · seawater', 'var(--color-fl-brine)', false],
  ['Oxygen (gas)', 'var(--color-fl-o2)', true],
  ['Air · CO₂ off-gas', 'var(--color-fl-gas)', true],
  ['Chemical dosing', 'var(--color-fl-chem)', false],
  ['Feed transport', 'var(--color-fl-feed)', false],
] as const

const variants: Variant[] = [
  {
    name: 'The symbol set',
    platform: 'Desktop',
    description:
      'The customer’s own symbols, recreated from the legacy SCADA capture so the picture reads the way operators already know it. A pump is a windowed disc, not a circle with a triangle; the blower is a two-leaf rotor in the same disc; the motor sits in a ring inside the drum filter and the blower cabinet. Do not substitute a textbook ISA set: it is not what is on the wall.',
    preview: (
      <div className="flex flex-wrap items-start gap-6 rounded-xl border border-slate-200 bg-white p-6">
        <Cell label="Pump">
          <SymPump running />
        </Cell>
        <Cell label="Fan / blower">
          <SymFan running />
        </Cell>
        <Cell label="Motor / impeller">
          <SymMotor running />
        </Cell>
        <Cell label="Dose / control valve">
          <SymValve running />
        </Cell>
        <Cell label="O₂ cone">
          <SymCone />
        </Cell>
      </div>
    ),
    code: `/* Every symbol is centred on its own point and scaled from there:
   translate(cx,cy) scale(s) translate(-halfW,-halfH)
   Pump and fan share the same outer disc in sc-fill-lite; only the
   inner body path differs, and that path carries the run state. */
<g transform="translate(120,80) scale(1.25) translate(-17.32,-16.43)">
  <path d="M33.75 16.43C33.75 7.36 26.39 0 17.32 0…" fill="var(--njord-sc-fill-lite)"/>
  <path d="M17.27 0.10C8.22 0.10 0.89 7.44…"        fill="var(--njord-sc-run)"/>
</g>`,
  },
  {
    name: 'Equipment states',
    platform: 'Desktop',
    description:
      'NORMAL IS NEUTRAL. Running is a solid dark neutral, stopped a light one, and saturated colour appears only when something is abnormal. A mimic where every running pump is green teaches operators to ignore green, which is exactly what high-performance HMI exists to prevent. Only the inner body path changes; the outer disc stays put.',
    preview: (
      <div className="flex flex-wrap items-start gap-7 rounded-xl border border-slate-200 bg-white p-6">
        <Cell label="Running">
          <SymPump running />
        </Cell>
        <Cell label="Stopped">
          <SymPump />
        </Cell>
        <Cell label="In alarm">
          <g>
            <SymPump running abnormal />
            <g transform="translate(0,26)">
              <AbnormalMark />
            </g>
          </g>
        </Cell>
        <Cell label="Critical, unacknowledged">
          <g>
            <SymPump running abnormal />
            <g transform="translate(0,26)">
              <AbnormalMark critical />
            </g>
          </g>
        </Cell>
      </div>
    ),
    code: `const body = (running, abnormal) =>
  abnormal ? 'var(--njord-sc-abnormal)'
  : running ? 'var(--njord-sc-run)'
            : 'var(--njord-sc-stop)'

/* The alarm badge sits in the MODE-CHIP COLUMN, directly under the chip,
   which moves up to make room. Its anchor is passed in, never measured:
   a symbol already knows its own centre, and getBBox inside an effect
   never resolves in time. */`,
  },
  {
    name: 'Mode chip and readout',
    platform: 'Desktop',
    description:
      'Every controllable symbol carries an A / M chip. Manual is drawn exactly like Auto — outline and letter, never a fill — with only the colour differing: a filled chip carried more weight than the alarm badges beside it. Outline and letter share one token, so there is no second colour to keep legible. The readout box is not clickable; hovering it reveals the trend icon, and only that icon sends the value to Trends.',
    preview: (
      <div className="flex flex-wrap items-center gap-9 rounded-xl border border-slate-200 bg-white p-6">
        <Cell label="Auto" w={56} h={56}>
          <ModeChip mode="A" />
        </Cell>
        <Cell label="Manual" w={56} h={56}>
          <ModeChip mode="M" />
        </Cell>
        <Cell label="Readout, trendable" w={130} h={56}>
          <g transform="translate(-14,0)">
            <RD value="42" unit="Hz" trend />
          </g>
        </Cell>
        <Cell label="Readout, manual setpoint" w={130} h={56}>
          <g transform="translate(-14,0)">
            <RD value="0.0" unit="L/h" accent="var(--color-sc-manual)" trend />
          </g>
        </Cell>
        <Cell label="Flow flag" w={140} h={56}>
          <Flag label="Fish tanks" />
        </Cell>
      </div>
    ),
    code: `/* A/M chip — 17x17, rx 3, outline only */
<rect width="17" height="17" rx="3" fill="var(--njord-sc-node)"
      stroke="var(--njord-sc-manual)" stroke-width="1.2"/>
<text text-anchor="middle" fill="var(--njord-sc-manual)">M</text>

/* Readout — rx 4, mono value, smaller unit, trend icon 13px to the right */
<rect width="60" height="25" rx="4"/>`,
  },
  {
    name: 'Fluid line coding',
    platform: 'Desktop',
    description:
      'Ten process fluids, each with its own pipe colour. Gases are dashed as well as coloured, so the coding survives a monochrome print and a colour-blind operator. Deliberately desaturated: routing must never shout louder than an alarm.',
    preview: (
      <div className="grid w-[560px] grid-cols-2 gap-x-8 gap-y-3">
        {fluids.map(([l, c, dashed]) => (
          <div key={l} className="flex items-center gap-3">
            <svg width="44" height="10" viewBox="0 0 44 10" aria-hidden className="shrink-0">
              <line
                x1="1"
                y1="5"
                x2="43"
                y2="5"
                stroke={c}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={dashed ? '9 5' : undefined}
              />
            </svg>
            <span className="text-[13px] text-slate-600">{l}</span>
          </div>
        ))}
      </div>
    ),
    code: `--fl-proc:   #2C6FA8   /* process / recirculated water */
--fl-raw:    #4093D2   /* raw · intake · make-up        */
--fl-drain:  #6E7B8C   /* effluent · drain · overflow   */
--fl-sludge: #8A7250   --fl-glycol: #B87214
--fl-brine:  #2AA198   --fl-chem:   #B0563F
--fl-feed:   #5F7A2E
--fl-o2:     #1F8FA8   /* gas — DASHED */
--fl-gas:    #6E7B8C   /* gas — DASHED */`,
  },
  {
    name: 'Mimic fragment',
    platform: 'Desktop',
    description:
      'A drum filter feeding the bioreactor, with the tag block under each symbol and the reading above it. This is the arrangement every mimic uses: readout above, mode chip and alarm badge in the left column, tag and description below, trend affordance to the right.',
    preview: (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
        <svg
          viewBox="0 0 560 220"
          className="block h-auto w-full"
          role="img"
          aria-label="Backwash pump filter 1 stopped, feeding drum filter 1, which discharges to the bioreactor at 248 centimetres"
        >
          {/* pipes */}
          <path d="M104 96 H150" fill="none" stroke="var(--color-fl-proc)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M214 96 H300" fill="none" stroke="var(--color-fl-proc)" strokeWidth="3.5" strokeLinecap="round" />

          {/* backwash pump */}
          <g transform="translate(76,96)">
            <SymPump />
          </g>
          <g transform="translate(46,78)">
            <ModeChip mode="A" />
          </g>
          <g transform="translate(76,50)">
            <RD value="0" unit="Hz" />
          </g>
          <text x="76" y="136" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-fg-muted)">
            DPT1-FIL0-PU1
          </text>
          <text x="76" y="150" textAnchor="middle" fontSize="11" fontFamily="var(--font-sans)" fill="var(--color-fg-muted)">
            Backwash pump filter 1
          </text>

          {/* drum filter: motor in a cabinet */}
          <rect x="150" y="62" width="64" height="68" rx="6" fill="var(--color-sc-node)" stroke="var(--color-slate-300)" strokeWidth="1.4" />
          <g transform="translate(182,96)">
            <SymMotor running />
          </g>
          <g transform="translate(160,74)">
            <ModeChip mode="A" />
          </g>
          <text x="182" y="150" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-fg-muted)">
            DPT1-FIL1-FE1
          </text>
          <text x="182" y="164" textAnchor="middle" fontSize="11" fontFamily="var(--font-sans)" fill="var(--color-fg-muted)">
            Drum filter 1
          </text>

          {/* bioreactor */}
          <g>
            <rect x="300" y="40" width="200" height="130" rx="4" fill="var(--color-sc-vessel)" stroke="var(--color-sc-edge)" strokeWidth="1.4" />
            <rect x="306" y={40 + 130 * 0.42} width="188" height={130 * 0.58 - 6} fill="var(--color-sc-water)" opacity="0.55" />
            {[0, 1].map((b) => (
              <g key={b}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <line
                    key={i}
                    x1={318 + b * (200 / 2 - 8) + i * 7}
                    y1={40 + 130 - 10}
                    x2={318 + b * (200 / 2 - 8) + i * 7}
                    y2={40 + 130 - 26}
                    stroke="var(--color-sc-line)"
                    strokeWidth="1.3"
                  />
                ))}
                <line
                  x1={316 + b * (200 / 2 - 8)}
                  y1={40 + 130 - 10}
                  x2={316 + b * (200 / 2 - 8) + 50}
                  y2={40 + 130 - 10}
                  stroke="var(--color-sc-line)"
                  strokeWidth="1.6"
                />
              </g>
            ))}
          </g>
          <g transform="translate(374,96)">
            <RD value="248" unit="cm" trend />
          </g>
          <text x="400" y="186" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-fg-muted)">
            DPT1-AEB0-LT1
          </text>
          <text x="400" y="200" textAnchor="middle" fontSize="11" fontFamily="var(--font-sans)" fill="var(--color-fg-muted)">
            Level in bioreactor
          </text>
        </svg>
      </div>
    ),
    code: `/* Bioreactor — vessel fill, water at 55%, diffuser grid along the floor */
<rect rx="4" fill="var(--njord-sc-vessel)" stroke="var(--njord-sc-edge)" stroke-width="1.4"/>
<rect y={h*0.42} height={h*0.58-6} fill="var(--njord-sc-water)" opacity="0.55"/>

/* Stripper column — the same vessel with stacked packing hatch instead */
<rect x={x+7} y={y+8} width={w-14} height={h-40}
      fill="var(--njord-sc-node)" stroke="var(--njord-sc-line)" stroke-width="1"/>`,
  },
  {
    name: 'Interactive nodes',
    platform: 'Desktop',
    description:
      'Clicking a piece of equipment opens its popup; hovering a readout reveals the trend icon, and only that icon sends the parameter to Trends. Clickable groups take role="button" and are keyboard-activatable, with the same 2px focus ring as any other control.',
    preview: (
      <div className="flex items-center gap-10 rounded-xl border border-slate-200 bg-white p-6">
        {[
          { l: 'Default', ring: false, hover: false },
          { l: 'Hover', ring: false, hover: true },
          { l: 'Focus', ring: true, hover: false },
        ].map(({ l, ring, hover }) => (
          <div key={l} className="flex flex-col items-center gap-2.5">
            <svg
              width="72"
              height="60"
              viewBox="-36 -30 72 60"
              className={ring ? 'rounded outline outline-2 outline-offset-[1px] outline-primary' : ''}
              aria-hidden
            >
              {hover ? <circle r="23" fill="none" stroke="var(--color-primary)" strokeWidth="1.6" /> : null}
              <SymPump running />
            </svg>
            <span className="text-xs text-slate-600">{l}</span>
          </div>
        ))}
      </div>
    ),
    code: `<g role="button" tabIndex={0} class="rasm-eq">…</g>

/* focus ring parity with every other control */
.rasm-eq:focus-visible { outline: 2px solid var(--primary); outline-offset: 1px }`,
  },
]

export default function ScadaSymbolsPage() {
  return (
    <ComponentDoc
      title="SCADA symbols"
      intro={
        <>
          The process-mimic vocabulary: equipment shapes, pipes and readout nodes. It follows
          ISA-101 high-performance HMI; the diagram is quiet by default, and saturated colour means
          something is wrong.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['scada-symbols']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            <strong className="font-semibold text-ink">A mode chip shares the line under the
            readout with the setpoint.</strong> Placed beside the glyph it lands on the process
            pipe or the return run. A setpoint sits under every reading and turns amber only when
            the value leaves its band.
          </>,
          <>
            <strong className="font-semibold text-ink">The viewBox must never outgrow its
            container.</strong> Mimic text is authored in viewBox units, so a 1600-unit sheet
            dropped into a 790px card scales to 0.49 and renders its tags at under 5px. Bound the
            width and wrap the rows; never fix it by shrinking the font. Measure what actually
            rendered:{' '}
            <code className="font-mono text-[11px]">
              parseFloat(getComputedStyle(tag).fontSize) * (svgRect.width / viewBox.width)
            </code>
            .
          </>,
          <>
            When a diagram wraps to a second row, route the connector{' '}
            <strong>through the gutter between rows</strong>. Along the next row&rsquo;s centreline
            it runs straight through that row&rsquo;s first glyphs.
          </>,
          <>
            <strong className="font-semibold text-ink">An alarm on a machine is drawn AROUND the
            symbol, never into it.</strong> A ring on the symbol&rsquo;s own bounding box plus a
            corner badge. Do not recolour the body: fill already means run/stop, so a filled red
            pump reads as &ldquo;running red&rdquo; rather than &ldquo;in alarm&rdquo;.
          </>,
          <>
            <strong className="font-semibold text-ink">Shape carries priority, not just colour.</strong>{' '}
            A <strong>triangle</strong> badge is critical; a <strong>circle</strong> is high and
            below. The triangle is the universal danger shape, so it belongs to the loudest state.
            Unacknowledged reads louder than acknowledged, because nobody has looked yet.
          </>,
          <>
            Mark only <strong>standing</strong> alarms. A blocked or deactivated alarm is not an
            abnormal condition the operator is being told about, and drawing it would re-create
            the noise that blocking was used to remove.
          </>,
          <>
            <strong className="font-semibold text-ink">Manual mode is not an alarm.</strong> It
            takes <code className="font-mono text-[12px]">sc-manual</code>, an amber family that is
            deliberately <em>not</em> <code className="font-mono text-[12px]">warning</code>: a
            manual chip in the exact high-alarm amber, beside a high-alarm badge, reads as a second
            warning. Outline and letter share the one token, so it only has to clear 4.5:1 against{' '}
            <code className="font-mono text-[12px]">sc-node</code>, its own fill, and must stay
            quieter than the alarm badges next to it.
          </>,
          <>
            Normal is <strong>gray</strong>. Running and stopped differ by lightness, not hue;
            colour on a mimic is reserved for abnormal states.
          </>,
          <>
            <code className="font-mono text-[12px]">sc-abnormal</code> is the only saturated symbol
            colour on the diagram. Everything else is neutral or a desaturated fluid tone.
          </>,
          <>
            Gases are dashed as well as coloured, so fluid coding survives a monochrome print or a
            colour-blind reader.
          </>,
          <>
            The legacy skin is monochrome by definition; every fluid falls back to the pipe colour.
            Never hard-code a fluid hex.
          </>,
          <>
            Mimics scale with their pane and never declare a minimum width, or they break every
            two-pane workspace layout.
          </>,
        ],
      }}
    />
  )
}
