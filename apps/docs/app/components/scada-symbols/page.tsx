import ComponentDoc, { type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

/*
 * These are the shipping symbols, not an approximation of them. Each one mirrors
 * the application's own primitive, so a developer measuring off this page gets
 * the drawing the control room actually has.
 */

/** Running / open is a solid dark neutral, stopped / closed a light one. Colour only for abnormal. */
const stateFill = (running?: boolean, abnormal?: boolean) =>
  abnormal ? 'var(--color-sc-abnormal)' : running ? 'var(--color-sc-run)' : 'var(--color-sc-stop)'

/** Centrifugal pump: a circle with a discharge wedge. Not a triangle. */
function Pump({ running, abnormal, r = 17 }: { running?: boolean; abnormal?: boolean; r?: number }) {
  const f = stateFill(running, abnormal)
  return (
    <g>
      <circle cx="0" cy="0" r={r} fill={f} stroke="var(--color-sc-edge)" strokeWidth="1.5" />
      <path
        d={`M0,${-r} L${r + 8},${-r + 4} L${r + 8},${r - 4} L0,${r} Z`}
        fill={f}
        stroke="var(--color-sc-edge)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </g>
  )
}

/** Blower / fan: a neutral circle whose three blades carry the state. */
function Fan({ running, abnormal, r = 16 }: { running?: boolean; abnormal?: boolean; r?: number }) {
  return (
    <g>
      <circle cx="0" cy="0" r={r} fill="var(--color-sc-node)" stroke="var(--color-sc-edge)" strokeWidth="1.5" />
      {[0, 120, 240].map((a) => (
        <path
          key={a}
          d={`M0,0 L${r - 3},-5 A${r - 3},${r - 3} 0 0 1 ${r - 3},5 Z`}
          transform={`rotate(${a})`}
          fill={stateFill(running, abnormal)}
        />
      ))}
    </g>
  )
}

/** Two triangles meeting at a point. A regulating valve adds the actuator stem. */
function Valve({
  open,
  abnormal,
  regulating,
  w = 13,
}: {
  open?: boolean
  abnormal?: boolean
  regulating?: boolean
  w?: number
}) {
  const f = stateFill(open, abnormal)
  return (
    <g>
      <path d={`M${-w},${-w * 0.8} L0,0 L${-w},${w * 0.8} Z`} fill={f} stroke="var(--color-sc-edge)" strokeWidth="1.4" />
      <path d={`M${w},${-w * 0.8} L0,0 L${w},${w * 0.8} Z`} fill={f} stroke="var(--color-sc-edge)" strokeWidth="1.4" />
      {regulating ? (
        <g>
          <line x1="0" y1="0" x2="0" y2={-w - 8} stroke="var(--color-sc-edge)" strokeWidth="1.4" />
          <rect
            x={-7}
            y={-w - 15}
            width="14"
            height="8"
            rx="2"
            fill="var(--color-sc-node)"
            stroke="var(--color-sc-edge)"
            strokeWidth="1.4"
          />
        </g>
      ) : null}
    </g>
  )
}

/** Tank or vessel with a fill level. The wall is sc-vessel at 3px, not the symbol edge. */
function Vessel({
  w = 90,
  h = 70,
  pct = 55,
  rounded = true,
}: {
  w?: number
  h?: number
  pct?: number
  rounded?: boolean
}) {
  const fh = (h - 4) * (pct / 100)
  return (
    <g transform={`translate(${-w / 2} ${-h / 2})`}>
      <rect
        x="0"
        y="0"
        width={w}
        height={h}
        rx={rounded ? 8 : 2}
        fill="var(--color-sc-node)"
        stroke="var(--color-sc-vessel)"
        strokeWidth="3"
      />
      <rect x="3" y={h - 2 - fh} width={w - 6} height={fh} rx={rounded ? 5 : 1} fill="var(--color-fl-proc)" opacity=".28" />
      <line x1="3" y1={h - 2 - fh} x2={w - 3} y2={h - 2 - fh} stroke="var(--color-fl-proc)" strokeWidth="1.6" />
    </g>
  )
}

/** The classic ISA bubble: measurement code over loop number, both mono. */
function Instrument({ code, loop, r = 15 }: { code: string; loop: string; r?: number }) {
  return (
    <g>
      <circle cx="0" cy="0" r={r} fill="var(--color-sc-node)" stroke="var(--color-sc-edge)" strokeWidth="1.4" />
      <text x="0" y="-2" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="700" fill="var(--color-fg)">
        {code}
      </text>
      <text x="0" y="9" textAnchor="middle" fontSize="8.5" fontFamily="var(--font-mono)" fill="var(--color-fg-muted)">
        {loop}
      </text>
    </g>
  )
}

function Cell({
  label,
  children,
  w = 96,
  h = 82,
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
      <span className="text-center text-xs text-slate-600">{label}</span>
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
      'Five shapes carry the whole process vocabulary. A pump is a circle with a discharge wedge; a fan is a circle whose blades carry the state; a valve is two triangles meeting at a point; a vessel draws its wall in sc-vessel rather than the symbol edge; an instrument is the ISA bubble with a two-line mono tag.',
    preview: (
      <div className="flex flex-wrap items-start gap-7 rounded-xl border border-slate-200 bg-white p-6">
        <Cell label="Pump">
          <Pump running />
        </Cell>
        <Cell label="Fan / blower">
          <Fan running />
        </Cell>
        <Cell label="Valve">
          <Valve open />
        </Cell>
        <Cell label="Regulating valve">
          <Valve open regulating />
        </Cell>
        <Cell label="Vessel" w={112} h={92}>
          <Vessel />
        </Cell>
        <Cell label="Instrument">
          <Instrument code="LT" loop="0220" />
        </Cell>
      </div>
    ),
    code: `/* Pump — circle plus discharge wedge, both in the state fill */
<circle r="17" fill={stateFill} stroke="var(--njord-sc-edge)" stroke-width="1.5"/>
<path d="M0,-17 L25,-13 L25,13 L0,17 Z" fill={stateFill} …/>

/* Valve — two triangles, point to point */
<path d="M-13,-10.4 L0,0 L-13,10.4 Z" …/>
<path d="M13,-10.4 L0,0 L13,10.4 Z" …/>

/* Vessel — the WALL is sc-vessel at 3px; the level is fl-proc at .28 */
<rect width="90" height="70" rx="8" fill="var(--njord-sc-node)"
      stroke="var(--njord-sc-vessel)" stroke-width="3"/>`,
  },
  {
    name: 'Equipment states',
    platform: 'Desktop',
    description:
      'NORMAL IS NEUTRAL. Running / open is a solid dark neutral, stopped / closed a light one, and saturated colour appears only when something is abnormal. A mimic where every running pump is green teaches operators to ignore green, which is exactly what high-performance HMI exists to prevent.',
    preview: (
      <div className="flex flex-wrap items-start gap-8 rounded-xl border border-slate-200 bg-white p-6">
        <Cell label="Running / open">
          <Pump running />
        </Cell>
        <Cell label="Stopped / closed">
          <Pump />
        </Cell>
        <Cell label="In alarm">
          <Pump running abnormal />
        </Cell>
        <Cell label="Valve open">
          <Valve open />
        </Cell>
        <Cell label="Valve closed">
          <Valve />
        </Cell>
      </div>
    ),
    code: `const fill = (running, abnormal) =>
  abnormal ? 'var(--njord-sc-abnormal)'
  : running ? 'var(--njord-sc-run)'
            : 'var(--njord-sc-stop)'`,
  },
  {
    name: 'Fluid line coding',
    platform: 'Desktop',
    description:
      'Ten process fluids, each with its own pipe colour at 3.5px. Gases are dashed as well as coloured, so the coding survives a monochrome print and a colour-blind operator. Deliberately desaturated: routing must never shout louder than an alarm.',
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
    code: `/* One marker per mimic, reused by every arrowed pipe.
   fill="context-stroke" makes the head inherit its own line's colour. */
<marker id="njd-arrow" viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="5" markerHeight="5" orient="auto-start-reverse">
  <path d="M0,1 L9,5 L0,9 z" fill="context-stroke"/>
</marker>

<path class="njd-pipe fl-o2" stroke-width="3.5" marker-end="url(#njd-arrow)"/>`,
  },
  {
    name: 'Mimic fragment',
    platform: 'Desktop',
    description:
      'A vessel feeding a pump, with an instrument bubble on the line and the reading in a white node box. Values sit in node boxes rather than floating on the diagram, and the halo token gives any free-floating label an outline against the schematic.',
    preview: (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
        <svg
          viewBox="0 0 520 190"
          className="block h-auto w-full"
          role="img"
          aria-label="Tank TK-04 at 6.2 milligrams per litre feeding recirculation pump PU-11A, which is running"
        >
          <defs>
            <marker
              id="njd-arrow-doc"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0,1 L9,5 L0,9 z" fill="context-stroke" />
            </marker>
          </defs>

          <g transform="translate(110 100)">
            <Vessel w={110} h={104} pct={62} />
          </g>
          <text x="110" y="34" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-fg-muted)">
            TK-04
          </text>

          <path
            d="M168 100 H250"
            fill="none"
            stroke="var(--color-fl-proc)"
            strokeWidth="3.5"
            strokeLinecap="round"
            markerEnd="url(#njd-arrow-doc)"
          />
          <g transform="translate(209 62)">
            <Instrument code="LT" loop="0220" />
          </g>
          <line x1="209" y1="79" x2="209" y2="100" stroke="var(--color-sc-line)" strokeWidth="1" strokeDasharray="3 3" />

          <g transform="translate(288 100)">
            <Pump running />
          </g>
          <text
            x="288"
            y="146"
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--color-fg-muted)"
            stroke="var(--color-sc-halo)"
            strokeWidth="3"
            paintOrder="stroke"
          >
            PU-11A
          </text>

          <path
            d="M322 100 H392"
            fill="none"
            stroke="var(--color-fl-proc)"
            strokeWidth="3.5"
            strokeLinecap="round"
            markerEnd="url(#njd-arrow-doc)"
          />

          <rect x="398" y="80" width="86" height="40" rx="10" fill="#fff" stroke="var(--color-slate-200)" strokeWidth="1.5" />
          <circle cx="471" cy="93" r="4.5" fill="var(--color-sev-ok)" />
          <text x="411" y="97" fontSize="10" fontFamily="var(--font-sans)" fontWeight="700" fill="var(--color-fg-muted)">
            DO
          </text>
          <text x="411" y="113" fontSize="13" fontFamily="var(--font-mono)" fill="var(--color-fg)">
            6.2<tspan fontSize="10" fill="var(--color-fg-muted)"> mg/L</tspan>
          </text>
        </svg>
      </div>
    ),
    code: `/* A node box is white with a slate-200 hairline and rx 10. It is chrome sitting
   ON the diagram, not a piece of equipment, so it takes neither sc-node nor
   sc-edge. The status dot lives at (w-13, 13), r 4.5. */
<rect width="86" height="40" rx="10" fill="#fff"
      stroke="var(--njord-slate-200)" stroke-width="1.5"/>

/* A label that floats free gets a halo so the schematic cannot eat it */
<text stroke="var(--njord-sc-halo)" stroke-width="3" paint-order="stroke">PU-11A</text>`,
  },
  {
    name: 'Interactive nodes',
    platform: 'Desktop',
    description:
      'Clickable groups take role="button" and are keyboard-activatable. Hover outlines the shape in brand cyan; focus gets the same 2px ring as any other control.',
    preview: (
      <div className="flex items-center gap-10 rounded-xl border border-slate-200 bg-white p-6">
        {[
          { l: 'Default', stroke: 'var(--color-sc-edge)', ring: false },
          { l: 'Hover', stroke: 'var(--color-primary)', ring: false },
          { l: 'Focus', stroke: 'var(--color-sc-edge)', ring: true },
        ].map(({ l, stroke, ring }) => (
          <div key={l} className="flex flex-col items-center gap-2.5">
            <svg
              width="82"
              height="60"
              viewBox="-41 -30 82 60"
              className={ring ? 'rounded outline outline-2 outline-offset-[1px] outline-primary' : ''}
              aria-hidden
            >
              <g>
                <circle cx="0" cy="0" r="17" fill="var(--color-sc-run)" stroke={stroke} strokeWidth="1.8" />
                <path
                  d="M0,-17 L25,-13 L25,13 L0,17 Z"
                  fill="var(--color-sc-run)"
                  stroke={stroke}
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <span className="text-xs text-slate-600">{l}</span>
          </div>
        ))}
      </div>
    ),
    code: `<g role="button" tabIndex={0} className="cursor-pointer
  hover:[&>circle]:stroke-primary hover:[&>path]:stroke-primary">
  …
</g>

/* focus ring parity with every other control */
svg g[role="button"]:focus-visible { outline: 2px solid var(--primary); outline-offset: 1px }`,
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
