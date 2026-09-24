import ComponentDoc, { type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'
import {
  Pipe,
  Tag2,
  Bioreactor,
  SymPump,
  SymFan,
  SymMotor,
  SymValve,
  SymCone,
  DrumFilterBox,
  BlowerCabinet,
  ModeChip,
  AbnormalRing,
  EquipmentCluster,
  CLUSTER,
  RD,
  Flag,
  UnitDots,
} from '../../../components/scada'

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
          <SymPump cx={0} cy={0} running />
        </Cell>
        <Cell label="Fan / blower">
          <SymFan cx={0} cy={0} running />
        </Cell>
        <Cell label="Motor / impeller">
          <SymMotor cx={0} cy={0} running />
        </Cell>
        <Cell label="Dose / control valve">
          <SymValve cx={0} cy={0} running />
        </Cell>
        <Cell label="O₂ cone">
          <SymCone cx={0} cy={0} />
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
      'Running is a solid dark neutral, stopped a light one, and that is ALL the symbol ever says. An alarm does not recolour it and does not outline it: the badge alone carries the alarm. Colour marks priority and shape repeats it, so the pair survives colour-blindness; opacity marks whether anyone has looked, and acknowledgement never changes hue.',
    preview: (
      <div className="flex flex-wrap items-start gap-7 rounded-xl border border-slate-200 bg-white p-6">
        <Cell label="Running">
          <SymPump cx={0} cy={0} running />
        </Cell>
        <Cell label="Stopped">
          <SymPump cx={0} cy={0} />
        </Cell>
        <Cell label="High, unacknowledged">
          <g>
            <SymPump cx={0} cy={0} running />
            <AbnormalRing at={CLUSTER.badge(0, 0)} alarm={{ level: 'high', state: 'unack' }} />
          </g>
        </Cell>
        <Cell label="Critical, unacknowledged">
          <g>
            <SymPump cx={0} cy={0} running />
            <AbnormalRing at={CLUSTER.badge(0, 0)} alarm={{ level: 'critical', state: 'unack' }} />
          </g>
        </Cell>
        <Cell label="Critical, acknowledged">
          <g>
            <SymPump cx={0} cy={0} running />
            <AbnormalRing at={CLUSTER.badge(0, 0)} alarm={{ level: 'critical', state: 'ack' }} />
          </g>
        </Cell>
        <Cell label="Blocked or out of service">
          <SymPump cx={0} cy={0} running />
        </Cell>
      </div>
    ),
    code: `/* The symbol carries run state and nothing else. */
const body = (running) =>
  running ? 'var(--njord-sc-run)' : 'var(--njord-sc-stop)'

/* The badge sits in the MODE-CHIP COLUMN, directly under the chip, which
   moves up to make room: (cx - 32, cy + 9). Not centred, not on a flank —
   the readout is above, the tag below, the trend affordance right, so that
   column is the only free side. The anchor is passed in, never measured:
   a symbol already knows its centre, and getBBox inside an effect never
   resolves in time. */
<path d="M0 -8.8 L9 6.6 L-9 6.6 Z" fill="var(--njord-sc-abnormal)"/>  /* critical */
<circle r="8" fill="var(--njord-warning)"/>                            /* high and below */
.rasm-abn:not(.unack) { opacity: .45 }                                /* acknowledged */`,
  },
  {
    name: 'Mode chip and readout',
    platform: 'Desktop',
    description:
      'Every controllable symbol carries an A / M chip. Manual is drawn exactly like Auto — outline and letter, never a fill — with only the colour differing: a filled chip carried more weight than the alarm badges beside it. Outline and letter share one token, so there is no second colour to keep legible. The readout box is not clickable; hovering it reveals the trend icon, and only that icon sends the value to Trends.',
    preview: (
      <div className="flex flex-wrap items-center gap-9 rounded-xl border border-slate-200 bg-white p-6">
        <Cell label="Auto" w={56} h={56}>
          <ModeChip x={-8.5} y={-8.5} mode="A" />
        </Cell>
        <Cell label="Manual" w={56} h={56}>
          <ModeChip x={-8.5} y={-8.5} mode="M" />
        </Cell>
        <Cell label="Readout, trendable" w={130} h={56}>
          <RD x={-33} y={-12.5} w={66} value="42" unit="Hz" trendable />
        </Cell>
        <Cell label="Readout, manual setpoint" w={130} h={56}>
          <RD x={-33} y={-12.5} w={66} value="0.0" unit="L/h" trendable alarm={{ level: 'high', state: 'unack' }} />
        </Cell>
        <Cell label="Flow flag" w={140} h={56}>
          <Flag x={-60} y={-17} label="Fish tanks" />
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
      'The canonical cluster, twice. Every mimic is authored to this geometry, taken from the RAS lift pump: readout above at cy-48, mode chip left at cx-40, alarm badge under the chip at [cx-32, cy+9], run/stop trend right at cx+30, tag and description below from cy+40. Fans sit their chip lower.',
    preview: (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5">
        <svg
          viewBox="0 0 560 230"
          className="rasm block h-auto w-full"
          role="img"
          aria-label="Backwash pump filter 1 stopped and in alarm, feeding drum filter 1, which discharges to the bioreactor at 248 centimetres"
        >
          <Pipe d="M118 120 H176" />
          <Pipe d="M242 120 H300" />

          <EquipmentCluster
            cx={86}
            cy={120}
            running={false}
            mode="A"
            value="0"
            unit="Hz"
            tag="DPT1-FIL0-PU1"
            name="Backwash pump filter 1"
            alarm={{ level: 'high', state: 'unack' }}
          />

          <DrumFilterBox x={178} y={91} running />
          <ModeChip x={186} y={99} mode="A" />
          <Tag2 x={209} y={172} tag="DPT1-FIL1-FE1" desc={['Drum filter 1']} />

          <Bioreactor x={300} y={52} w={200} h={130} />
          <RD x={367} y={107} w={66} value="248" unit="cm" trendable />
          <Tag2 x={400} y={200} tag="DPT1-AEB0-LT1" desc={['Level in bioreactor']} />
        </svg>
      </div>
    ),
    code: `/* The cluster every mimic is authored to, from symbol centre (cx, cy): */
readout    x cx-33, y cy-48, 66x25
mode chip  x cx-40, y cy-20        /* fan: cy-8  */
badge      [cx-32, cy+9]           /* fan: cy+26 */
run trend  cx+30
tag        baseline cy+40, description lines +13 / +25

/* The badge anchor is PASSED IN, never measured: getBBox inside an effect
   never resolves in time, and re-measuring every render would loop. */`,
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
              <SymPump cx={0} cy={0} running />
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
            <strong className="font-semibold text-ink">Suppression draws nothing.</strong> A
            blocked or out-of-service alarm is not an abnormal condition the operator is being
            told about, so the symbol renders exactly as if there were no alarm: pass no alarm at
            all rather than a suppressed state. Drawing it would re-create the noise that
            blocking was used to remove.
          </>,
          <>
            <strong className="font-semibold text-ink">Cyan is interaction, never state.</strong>{' '}
            Hover, focus and &ldquo;on Trends&rdquo; are the only things that may use it. A symbol
            never turns cyan because of something the process is doing.
          </>,
          <>
            <strong className="font-semibold text-ink">Known gap: medium and low are drawn as
            high.</strong> The mimic carries two tones where the register carries five, so a
            medium and a low alarm are indistinguishable on the diagram. Deliberate in the
            application; it needs a decision from the alarm-philosophy owner before this system
            states it as a rule.
          </>,
          <>
            <strong className="font-semibold text-ink">Known gap: not every symbol can show an
            alarm.</strong> Dose valves carry no tag, drum filters carry a tag but no badge
            anchor, and the blower cabinet&rsquo;s alarm lives on its speed readout instead. Each
            of those needs a decision rather than a default.
          </>,
          <>
            <strong className="font-semibold text-ink">Known gap: hover is invisible on a bare
            symbol.</strong> The application writes{' '}
            <code className="font-mono text-[11px]">drop-shadow(0 0 0 2px …)</code>, and{' '}
            <code className="font-mono text-[11px]">drop-shadow()</code> has no spread argument, so
            the declaration is invalid and dropped: a pump, fan or valve changes only the cursor.
            Boxed symbols get a cyan stroke from a separate rule and are fine. This reference uses
            the two-argument form so the state is at least visible.
          </>,
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
            <code className="font-mono text-[12px]">sc-abnormal</code> is the only saturated colour
            on the diagram, and it belongs to the alarm <strong>badge</strong>, not to the symbol.
            Everything else is neutral or a desaturated fluid tone.
          </>,
          <>
            <strong className="font-semibold text-ink">An alarm never recolours or outlines the
            symbol.</strong> Its fill already means run/stop, so a red pump reads as
            &ldquo;running red&rdquo;; an added stroke is a second treatment competing with the
            badge, and on a dense P&amp;ID the ring collided with neighbours and asked the operator
            to read a thin outline rather than the shape they already scan.
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
