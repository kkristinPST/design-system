import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const badge =
  'inline-flex items-center gap-[5px] rounded-sm px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.5px] whitespace-nowrap'

const variants: Variant[] = [
  {
    name: 'Severity badges',
    platform: 'Desktop',
    description:
      'The alarm priority ramp. Critical is the only one that inverts to a solid fill; it uses critical-solid (#D8302B) so white text stays AA. The rest are tint-on-tint.',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <span className={`${badge} bg-critical-solid text-white`}>Critical</span>
        <span className={`${badge} bg-warning-bg text-warning-text`}>High</span>
        <span className={`${badge} bg-medium-bg text-medium-text`}>Medium</span>
        <span className={`${badge} bg-slate-100 text-slate-600`}>Low</span>
        <span className={`${badge} bg-slate-100 text-slate-600`}>Diagnostic</span>
      </div>
    ),
    code: `<span className="inline-flex items-center gap-[5px] rounded-sm px-2 py-[3px]
  text-[10px] font-bold uppercase tracking-[0.5px] bg-critical-solid text-white">Critical</span>

bg-warning-bg  text-warning-text   {/* High   */}
bg-medium-bg   text-medium-text    {/* Medium */}
bg-slate-100   text-slate-600      {/* Low / Diagnostic */}`,
  },
  {
    name: 'Status badges',
    platform: 'Desktop',
    description:
      'Non-alarm conditions: equipment health, connection, review state. Same geometry, drawn from the status tint triplets.',
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <span className={`${badge} bg-success-bg text-success-text`}>Normal</span>
        <span className={`${badge} bg-primary-bg text-primary-text`}>Running</span>
        <span className={`${badge} bg-warning-bg text-warning-text`}>Review due</span>
        <span className={`${badge} bg-critical-bg text-critical-text`}>Fault</span>
        <span className={`${badge} bg-slate-100 text-slate-600`}>Offline</span>
      </div>
    ),
    code: `bg-success-bg  text-success-text
bg-primary-bg  text-primary-text
bg-warning-bg  text-warning-text
bg-critical-bg text-critical-text
bg-slate-100   text-slate-600`,
  },
  {
    name: 'Count badge',
    platform: 'Desktop',
    description:
      'A mono numeral on the critical-solid fill, pinned to the sidebar item or bell it counts. A 2px white ring separates it from whatever it overlaps.',
    preview: (
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 rounded-md bg-ink px-3 py-2">
          <span className="text-sm font-medium text-slate-350">Alarms</span>
          <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-critical-solid px-[5px] font-mono text-[10px] font-bold text-white">
            7
          </span>
        </div>
        <button aria-label="Notifications" className="relative p-1 text-slate-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" />
          </svg>
          <span className="absolute -top-[3px] -right-1 inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-critical-solid px-[3px] font-mono text-[9px] font-bold leading-[16px] text-white shadow-[0_0_0_2px_#fff]">
            3
          </span>
        </button>
      </div>
    ),
    code: `{/* sidebar */}
<span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full
  bg-critical-solid px-[5px] font-mono text-[10px] font-bold text-white">7</span>

{/* overlapping a bell — needs the ring */}
<span className="absolute -top-[3px] -right-1 h-[15px] min-w-[15px] rounded-full
  bg-critical-solid font-mono text-[9px] font-bold text-white shadow-[0_0_0_2px_#fff]">3</span>`,
  },
  {
    name: 'Mobile · badges',
    platform: 'Mobile',
    description:
      'Tightened to 9px / 800 weight with 5px radius so they fit inside a 13px alarm row without crowding the alarm name.',
    preview: (
      <PhoneFrame className="flex flex-wrap items-center gap-2 p-4">
        {[
          ['Critical', 'bg-critical-solid text-white'],
          ['High', 'bg-warning-bg text-warning-text'],
          ['Medium', 'bg-medium-bg text-medium-text'],
          ['Low', 'bg-slate-100 text-slate-600'],
        ].map(([l, c]) => (
          <span
            key={l}
            className={`inline-flex shrink-0 items-center rounded-[5px] px-1.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.5px] ${c}`}
          >
            {l}
          </span>
        ))}
      </PhoneFrame>
    ),
    code: `<span className="inline-flex shrink-0 items-center rounded-[5px] px-1.5 py-[3px]
  text-[9px] font-extrabold uppercase tracking-[0.5px] bg-critical-solid text-white">
  Critical
</span>`,
  },
  {
    name: 'Mobile · tab bar count',
    platform: 'Mobile',
    description:
      'Pinned to a tab icon. It carries a 1.5px border in the surface colour so it stays legible when it overlaps the icon beneath it.',
    preview: (
      <PhoneFrame>
        <div className="flex items-stretch border-t border-slate-200 bg-white px-1.5 pt-1.5 pb-4">
          {[
            { l: 'Home', on: false, n: 0 },
            { l: 'Alarms', on: true, n: 7 },
            { l: 'Tanks', on: false, n: 0 },
            { l: 'More', on: false, n: 0 },
          ].map(({ l, on, n }) => (
            <button
              key={l}
              className={`relative flex flex-1 flex-col items-center gap-[3px] px-0.5 py-1.5 ${
                on ? 'text-primary-text' : 'text-slate-400'
              }`}
            >
              <span className="relative inline-flex">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" />
                </svg>
                {n > 0 && (
                  <span className="absolute -top-[5px] -right-[9px] inline-flex h-4 min-w-[16px] items-center justify-center rounded-full border-[1.5px] border-white bg-critical-solid px-1 font-mono text-[10px] font-extrabold text-white">
                    {n}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-semibold tracking-[0.1px]">{l}</span>
            </button>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<span className="absolute -top-[5px] -right-[9px] inline-flex h-4 min-w-[16px]
  items-center justify-center rounded-full border-[1.5px] border-white bg-critical-solid
  px-1 font-mono text-[10px] font-extrabold text-white">
  {count}
</span>`,
  },
]

export default function BadgePage() {
  return (
    <ComponentDoc
      title="Badge"
      intro={
        <>
          A short, uppercase label that classifies the thing beside it. Desktop badges are 10px;
          mobile tightens to 9px. Counts are always mono so a number changing from 9 to 10 does not
          shift the row.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.badge}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Only <strong>Critical</strong> gets a solid fill, and it uses{' '}
            <code className="font-mono text-[12px]">critical-solid</code> (#D8302B) rather than the
            bare critical mark; the mark itself is 3.73:1 on white and cannot carry white text.
          </>,
          <>
            Medium alarm priority uses its own royal blue, never brand cyan. Under ISA-101 alarm
            colour is reserved for alarm state, and cyan already means link / focus / selection.
          </>,
          <>
            A badge classifies; it does not act. If it is clickable it is a chip or a button, and it
            needs a hit target to match.
          </>,
          <>
            On a legacy-skin alarm row every badge goes flat outline, because it sits on one of
            twelve saturated row fills and no tint would survive.
          </>,
        ],
      }}
    />
  )
}
