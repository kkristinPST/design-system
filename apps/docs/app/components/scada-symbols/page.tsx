import ComponentDoc, { type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

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
    name: 'Equipment states',
    platform: 'Desktop',
    description:
      'ISA-101 high-performance HMI: NORMAL is neutral gray and colour is reserved for ABNORMAL. Running / open is a solid dark neutral; stopped / closed is a light neutral.',
    preview: (
      <div className="flex flex-wrap items-start gap-8">
        {[
          { l: 'Running / open', fill: 'var(--color-sc-run)', stroke: 'var(--color-sc-edge)', text: '#fff' },
          { l: 'Stopped / closed', fill: 'var(--color-sc-stop)', stroke: 'var(--color-sc-edge)', text: 'var(--color-ink)' },
          { l: 'In alarm', fill: 'var(--color-sc-abnormal)', stroke: 'var(--color-sc-edge)', text: '#fff' },
        ].map(({ l, fill, stroke, text }) => (
          <div key={l} className="flex flex-col items-center gap-2.5">
            <svg width="96" height="70" viewBox="0 0 96 70" aria-hidden>
              <circle cx="34" cy="35" r="19" fill={fill} stroke={stroke} strokeWidth="1.6" />
              <path d="M34 16 L53 35 L34 54 Z" fill={fill} stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
              <rect x="58" y="27" width="30" height="16" rx="2" fill="var(--color-sc-node)" stroke="var(--color-sc-edge)" strokeWidth="1.2" />
              <text x="73" y="38" textAnchor="middle" className="font-mono text-[9px]" fill="var(--color-ink)">
                PU-11
              </text>
              <text x="34" y="39" textAnchor="middle" className="font-mono text-[9px] font-bold" fill={text}>
                P
              </text>
            </svg>
            <span className="text-xs text-slate-600">{l}</span>
          </div>
        ))}
      </div>
    ),
    code: `--sc-run:      #3C4A5E   /* running / open  — energized, solid neutral */
--sc-stop:     #C9D2DC   /* stopped / closed — de-energized, light neutral */
--sc-abnormal: #F53E39   /* in alarm — the ONLY saturated symbol colour */
--sc-edge:     #222B3A   /* equipment outlines */
--sc-node:     #FFFFFF   /* readout / equipment boxes */`,
  },
  {
    name: 'Fluid line coding',
    platform: 'Desktop',
    description:
      'Ten process fluids, each with its own pipe colour. Gases are dashed as well as coloured, so the distinction survives a monochrome print. Deliberately desaturated: status must still read louder.',
    preview: (
      <div className="grid w-[560px] grid-cols-2 gap-x-8 gap-y-3">
        {fluids.map(([l, c, dashed]) => (
          <div key={l} className="flex items-center gap-3">
            <svg width="44" height="10" viewBox="0 0 44 10" aria-hidden className="shrink-0">
              <line
                x1="1" y1="5" x2="43" y2="5"
                stroke={c}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={dashed ? '7 5' : undefined}
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
      'A tank, a pump and a readout. Values sit in white node boxes rather than floating on the diagram, and the halo token gives any free-floating label an outline against the schematic.',
    preview: (
      <div className="w-[560px] rounded-xl border border-slate-200 bg-white p-5">
        <svg viewBox="0 0 520 190" className="block h-auto w-full" role="img" aria-label="Tank TK-04 at 6.2 milligrams per litre feeding recirculation pump PU-11A, which is running">
          <path d="M60 40 h120 v96 a12 12 0 0 1 -12 12 h-96 a12 12 0 0 1 -12 -12 Z" fill="var(--color-sc-vessel)" stroke="var(--color-sc-edge)" strokeWidth="1.6" />
          <path d="M60 88 h120 v48 a12 12 0 0 1 -12 12 h-96 a12 12 0 0 1 -12 -12 Z" fill="var(--color-sc-water)" opacity="0.55" />
          <text x="120" y="32" textAnchor="middle" className="font-mono text-[11px] font-bold" fill="var(--color-ink)">TK-04</text>

          <line x1="180" y1="112" x2="260" y2="112" stroke="var(--color-fl-proc)" strokeWidth="5" strokeLinecap="round" />
          <line x1="300" y1="112" x2="392" y2="112" stroke="var(--color-fl-proc)" strokeWidth="5" strokeLinecap="round" />
          <line x1="120" y1="40" x2="120" y2="14" stroke="var(--color-fl-o2)" strokeWidth="4" strokeDasharray="7 5" strokeLinecap="round" />

          <circle cx="280" cy="112" r="20" fill="var(--color-sc-run)" stroke="var(--color-sc-edge)" strokeWidth="1.6" />
          <path d="M280 92 L300 112 L280 132 Z" fill="var(--color-sc-run)" stroke="var(--color-sc-edge)" strokeWidth="1.6" strokeLinejoin="round" />
          <text x="280" y="152" textAnchor="middle" className="font-mono text-[10px]" fill="var(--color-ink)" stroke="var(--color-sc-halo)" strokeWidth="3" paintOrder="stroke">
            PU-11A
          </text>

          <rect x="392" y="92" width="86" height="40" rx="3" fill="var(--color-sc-node)" stroke="var(--color-sc-edge)" strokeWidth="1.2" />
          <text x="435" y="108" textAnchor="middle" className="font-mono text-[9px]" fill="var(--color-slate-500)">DO-0403</text>
          <text x="435" y="124" textAnchor="middle" className="font-mono text-[13px] font-bold" fill="var(--color-critical-text)">6.2 mg/L</text>
        </svg>
      </div>
    ),
    code: `{/* values live in white node boxes, not floating on the schematic */}
<rect fill="var(--color-sc-node)" stroke="var(--color-sc-edge)" strokeWidth="1.2" />
<text className="font-mono text-[13px] font-bold" fill="var(--color-critical-text)">6.2 mg/L</text>

{/* a free-floating label gets a halo outline */}
<text stroke="var(--color-sc-halo)" strokeWidth="3" paintOrder="stroke">PU-11A</text>`,
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
              width="70"
              height="60"
              viewBox="0 0 70 60"
              className={ring ? 'rounded outline outline-2 outline-offset-[1px] outline-primary' : ''}
              aria-hidden
            >
              <circle cx="26" cy="30" r="17" fill="var(--color-sc-run)" stroke={stroke} strokeWidth="1.8" />
              <path d="M26 13 L43 30 L26 47 Z" fill="var(--color-sc-run)" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <span className="text-xs text-slate-600">{l}</span>
          </div>
        ))}
      </div>
    ),
    code: `<g role="button" tabIndex={0} className="cursor-pointer
  hover:[&>rect]:stroke-primary hover:[&>circle]:stroke-primary">
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
