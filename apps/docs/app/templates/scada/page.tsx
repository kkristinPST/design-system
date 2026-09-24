import TemplateSpec from '../../../components/TemplateSpec'
import { SymPump, DrumFilterBox, AbnormalRing, CLUSTER } from '../../../components/scada'

export default function ScadaTemplatePage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Templates</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">SCADA</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        A process screen: area tabs, a full-width mimic, and a detail dock on the right. The mimic
        scales with its pane and never declares a minimum width, so the two-pane grid can stack
        cleanly at 1180px.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4">
        {/* header */}
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5">
          <p className="min-h-[24px] min-w-[240px] flex-1 basis-[280px] text-[13px] leading-5 text-slate-600">
            RAS 2 recirculation · 4 of 4 pumps running
          </p>
          <div className="inline-flex flex-wrap gap-0.5 rounded-md border border-slate-200 bg-slate-100 p-[3px]">
            {['Overview', 'RAS 1', 'RAS 2', 'Water treatment'].map((l, i) => (
              <button key={l} className={`rounded-md px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${i === 2 ? 'bg-white text-ink shadow-sm' : 'text-slate-600'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_220px] gap-3">
          {/* mimic */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5">
            <svg viewBox="0 0 520 230" className="rasm block h-auto w-full" role="img" aria-label="RAS 2 loop: tank TK-04 at 6.2 milligrams per litre, below band; pump PU-11A running; drum filter and biofilter normal">
              {/* tank */}
              <path d="M28 46 h96 v96 a12 12 0 0 1 -12 12 h-72 a12 12 0 0 1 -12 -12 Z" fill="var(--color-sc-vessel)" stroke="var(--color-sc-edge)" strokeWidth="1.5" />
              <path d="M28 90 h96 v52 a12 12 0 0 1 -12 12 h-72 a12 12 0 0 1 -12 -12 Z" fill="var(--color-sc-water)" opacity="0.5" />
              <text x="76" y="38" textAnchor="middle" className="font-mono text-[11px] font-bold" fill="var(--color-ink)">TK-04</text>

              {/* O2 dashed */}
              <line x1="76" y1="46" x2="76" y2="18" stroke="var(--color-fl-o2)" strokeWidth="4" strokeDasharray="7 5" strokeLinecap="round" />
              <text x="90" y="24" className="font-mono text-[9px]" fill="var(--color-slate-500)">O₂</text>

              {/* pipes */}
              <line x1="124" y1="112" x2="182" y2="112" stroke="var(--color-fl-proc)" strokeWidth="5" strokeLinecap="round" />
              <line x1="222" y1="112" x2="286" y2="112" stroke="var(--color-fl-proc)" strokeWidth="5" strokeLinecap="round" />
              <line x1="352" y1="112" x2="416" y2="112" stroke="var(--color-fl-proc)" strokeWidth="5" strokeLinecap="round" />
              <path d="M462 112 v70 H76 v-28" fill="none" stroke="var(--color-fl-proc)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

              {/* drain */}
              <line x1="319" y1="146" x2="319" y2="192" stroke="var(--color-fl-drain)" strokeWidth="4" strokeLinecap="round" />
              <text x="330" y="188" className="font-mono text-[9px]" fill="var(--color-slate-500)">drain</text>

              {/* pump */}
              <SymPump cx={202} cy={112} running />
              <AbnormalRing at={CLUSTER.badge(202, 112)} alarm={{ level: 'critical', state: 'unack' }} />
              <text x="202" y="150" textAnchor="middle" className="font-mono text-[9px]" fill="var(--color-ink)" stroke="var(--color-sc-halo)" strokeWidth="3" paintOrder="stroke">PU-11A</text>

              {/* drum filter */}
              <DrumFilterBox x={288} y={83} running />
              <text x="319" y="80" textAnchor="middle" className="font-mono text-[9px]" fill="var(--color-slate-500)">Drum filter</text>

              {/* biofilter */}
              <rect x="416" y="80" width="46" height="64" rx="3" fill="var(--color-sc-fill-lite)" stroke="var(--color-sc-edge)" strokeWidth="1.4" />
              <text x="439" y="72" textAnchor="middle" className="font-mono text-[9px]" fill="var(--color-slate-500)">MBBR</text>

              {/* readout; abnormal */}
              <rect x="132" y="176" width="86" height="38" rx="4" fill="#fff" stroke="var(--color-sc-abnormal)" strokeWidth="2.4" />
              <text x="175" y="191" textAnchor="middle" className="font-mono text-[9px]" fill="var(--color-slate-500)">DO-0403</text>
              <text x="175" y="206" textAnchor="middle" className="font-mono text-[12px] font-bold" fill="var(--color-critical-text)">6.2 mg/L</text>
            </svg>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-slate-100 pt-2.5">
              {[
                ['Process water', 'var(--color-fl-proc)', false],
                ['Drain', 'var(--color-fl-drain)', false],
                ['Oxygen', 'var(--color-fl-o2)', true],
              ].map(([l, c, dashed]) => (
                <span key={l as string} className="inline-flex items-center gap-1.5 text-[10px] text-slate-500">
                  <svg width="20" height="8" viewBox="0 0 20 8" aria-hidden>
                    <line x1="1" y1="4" x2="19" y2="4" stroke={c as string} strokeWidth="3" strokeLinecap="round" strokeDasharray={dashed ? '5 4' : undefined} />
                  </svg>
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* dock */}
          <div className="space-y-2.5">
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-3 py-2.5">
                <p className="text-xs font-bold text-ink">Loop vitals</p>
              </div>
              {[['Dissolved O₂', '6.2', true], ['Temperature', '12.4', false], ['Flow', '284', false], ['Level', '78', false]].map(([l, v, crit]) => (
                <div key={l as string} className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 last:border-b-0">
                  <span className="flex-1 text-[11px] text-slate-600">{l}</span>
                  <span className={`font-mono text-[11px] font-bold tabular-nums ${crit ? 'text-critical-text' : 'text-ink'}`}>{v}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.8px] text-slate-400">Equipment</p>
              <p className="mt-1.5 text-[10px] leading-relaxed text-slate-600">4 running · 0 stopped · 0 in alarm</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Anatomy</p>
        <ul className="mt-3 space-y-2">
          {[
            <><strong>Area tabs</strong>: switch which loop the mimic shows. Same screen, different scope.</>,
            <><strong>Mimic</strong>: ISA-101 high-performance: neutral equipment, saturated colour only for abnormal, values in white node boxes.</>,
            <><strong>Fluid legend</strong>: always present. Line coding is meaningless without it, and gases are dashed as well as coloured.</>,
            <><strong>Dock</strong>: loop vitals and equipment counts. Selecting a node fills it without navigating away.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <TemplateSpec
        uses={['filter-tabs', 'scada-symbols', 'param-row', 'card', 'kpi-card', 'status-dot', 'state-tag', 'badge', 'tag', 'trend-chart']}
        viewPath="views/Njord/Templates/Scada/view.json"
        tree={`Scada (inside the Dashboard shell)
└── Flex column
    ├── AreaTabs       switches the loop shown — same screen, different scope
    └── Flex row       gap 16
        ├── Mimic      grow 1 · NO min-width, so the grid can stack
        │   ├── SVG    equipment symbols + fluid lines + white value nodes
        │   └── Legend always visible, gases dashed as well as coloured
        └── Dock       basis 352px, shrink 0 · loop vitals, equipment counts

Draw the mimic as one SVG with a viewBox and let it scale, rather than
absolutely positioning components on a coordinate container — the latter
cannot reflow and will not survive a different screen size.`}
        reflow={[
          ['1180', 'Mimic and dock stack; the mimic keeps its aspect ratio'],
          ['900', 'Node detail opens as a full-screen sheet rather than filling the dock'],
        ]}
        watchFor={[
          <>
            <strong>Normal equipment is neutral gray.</strong> Running and stopped are both
            desaturated; abnormal red is the only saturated symbol colour on the screen. A colourful
            resting mimic is the classic ISA-101 failure.
          </>,
          <>
            The fluid legend is not optional. Line coding carries no meaning without it, and gases
            are distinguished by dashes as well as colour so it survives monochrome.
          </>,
          <>
            Selecting a node fills the dock; it never navigates away. Operators lose their place in
            the process if the mimic unmounts.
          </>,
          <>
            Values sit in white node boxes over the pipework so they stay legible whatever is behind
            them, and every one is mono and tabular.
          </>,
        ]}
      />
    </div>
  )
}
