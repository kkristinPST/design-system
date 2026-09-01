import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const tag =
  'inline-flex items-center gap-[5px] whitespace-nowrap rounded-sm border py-0.5 pl-[5px] pr-[7px] font-mono text-[10px] font-bold tracking-[0.6px]'
const glyph =
  'inline-flex h-[13px] w-[13px] items-center justify-center rounded-[3px] bg-transparent text-[9px] font-extrabold shadow-[inset_0_0_0_1px_currentColor]'

const states = [
  { g: 'U', l: 'UNACK', cls: 'bg-critical-bg text-critical-text border-[color-mix(in_srgb,var(--color-critical)_22%,transparent)]', d: 'Active and not yet acknowledged.' },
  { g: 'A', l: 'ACK', cls: 'bg-slate-100 text-slate-600 border-slate-200', d: 'Active, acknowledged by an operator.' },
  { g: 'R', l: 'RTN', cls: 'bg-warning-bg text-warning-text border-[color-mix(in_srgb,var(--color-warning)_22%,transparent)]', d: 'Returned to normal, not yet acknowledged.' },
  { g: 'N', l: 'NORMAL', cls: 'bg-success-bg text-success-text border-[color-mix(in_srgb,var(--color-success)_22%,transparent)]', d: 'Inactive and acknowledged.' },
]

const suppressed = [
  { g: 'S', l: 'SHELVED', cls: 'bg-warning-bg text-warning-text border-[color-mix(in_srgb,var(--color-warning)_22%,transparent)]', d: 'Temporarily suppressed by an operator, with an expiry.' },
  { g: 'O', l: 'OUT OF SERVICE', cls: 'bg-slate-100 text-slate-600 border-slate-300', d: 'Suppressed by maintenance. Requires a work order.' },
]

const variants: Variant[] = [
  {
    name: 'Process + acknowledge state',
    platform: 'Desktop',
    description:
      'The four ISA-18.2 lifecycle states. Each pairs a colour with a leading letter glyph, so the state is distinguishable without colour (ISA-18.2 §11).',
    preview: (
      <div className="flex w-[460px] flex-col gap-3">
        {states.map(({ g, l, cls, d }) => (
          <div key={l} className="flex items-center gap-3">
            <span className={`${tag} ${cls}`}>
              <span className={glyph}>{g}</span>
              {l}
            </span>
            <span className="text-[13px] text-slate-600">{d}</span>
          </div>
        ))}
      </div>
    ),
    code: `<span className="inline-flex items-center gap-[5px] rounded-sm border py-0.5 pl-[5px] pr-[7px]
  font-mono text-[10px] font-bold tracking-[0.6px]
  bg-critical-bg text-critical-text
  border-[color-mix(in_srgb,var(--color-critical)_22%,transparent)]">
  <span className="inline-flex h-[13px] w-[13px] items-center justify-center rounded-[3px]
    text-[9px] font-extrabold shadow-[inset_0_0_0_1px_currentColor]">U</span>
  UNACK
</span>`,
  },
  {
    name: 'Suppression state',
    platform: 'Desktop',
    description:
      'Shelved and out-of-service are suppression, not lifecycle. They ride alongside the process state rather than replacing it, and both carry an expiry or a work order.',
    preview: (
      <div className="flex w-[460px] flex-col gap-3">
        {suppressed.map(({ g, l, cls, d }) => (
          <div key={l} className="flex items-center gap-3">
            <span className={`${tag} ${cls}`}>
              <span className={glyph}>{g}</span>
              {l}
            </span>
            <span className="text-[13px] text-slate-600">{d}</span>
          </div>
        ))}
      </div>
    ),
    code: `{/* shelved */}       bg-warning-bg text-warning-text
{/* out of service */} bg-slate-100  text-slate-600  border-slate-300`,
  },
  {
    name: 'Stale flag',
    platform: 'Desktop',
    description:
      'An alarm active for more than 24h. It is a separate pill, not a state — a stale alarm still has a process state, and hiding one behind the other loses information.',
    preview: (
      <div className="flex items-center">
        <span className={`${tag} bg-critical-bg text-critical-text border-[color-mix(in_srgb,var(--color-critical)_22%,transparent)]`}>
          <span className={glyph}>U</span>
          UNACK
        </span>
        <span className="ml-2 inline-flex items-center gap-1 rounded-sm border border-[color-mix(in_srgb,var(--color-warning)_25%,transparent)] bg-warning-bg px-1.5 py-px font-mono text-[9px] font-bold tracking-[0.5px] text-warning-text">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
          </svg>
          STALE 38h
        </span>
      </div>
    ),
    code: `<span className="ml-2 inline-flex items-center gap-1 rounded-sm bg-warning-bg px-1.5 py-px
  font-mono text-[9px] font-bold tracking-[0.5px] text-warning-text
  border border-[color-mix(in_srgb,var(--color-warning)_25%,transparent)]">
  <ClockIcon /> STALE 38h
</span>`,
  },
  {
    name: 'Mobile — state chips',
    platform: 'Mobile',
    description:
      'On the phone the glyph is dropped and the label carries the state alone, at 9px / 800. There is no dense table for it to disambiguate, and the row already shows a severity rail.',
    preview: (
      <PhoneFrame className="flex flex-wrap items-center gap-2 p-4">
        {[
          ['Unack', 'bg-critical-bg text-critical-text'],
          ['Ack', 'bg-slate-100 text-slate-600'],
          ['Normal', 'bg-success-bg text-success-text'],
          ['Shelved', 'bg-warning-bg text-warning-text'],
        ].map(([l, c]) => (
          <span
            key={l}
            className={`inline-flex shrink-0 items-center rounded px-[5px] py-0.5 text-[9px] font-extrabold uppercase tracking-[0.5px] ${c}`}
          >
            {l}
          </span>
        ))}
      </PhoneFrame>
    ),
    code: `<span className="inline-flex shrink-0 items-center rounded px-[5px] py-0.5
  text-[9px] font-extrabold uppercase tracking-[0.5px]
  bg-critical-bg text-critical-text">
  Unack
</span>`,
  },
]

export default function StateTagPage() {
  return (
    <ComponentDoc
      title="State tag"
      intro={
        <>
          The ISA-18.2 alarm lifecycle state, shown as a mono chip with a leading letter glyph.
          Process state and acknowledgement are one axis; suppression is a second, and the two are
          shown side by side rather than collapsed into one label.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['state-tag']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The letter glyph exists so state is readable without colour. Do not drop it on desktop —
            in a dense table, colour alone fails for roughly one in twelve male operators.
          </>,
          <>
            Suppression never replaces process state. A shelved alarm that is still active is{' '}
            <em>both</em> — showing only &ldquo;shelved&rdquo; hides a live process condition.
          </>,
          <>
            Stale is a flag, not a state. It sits beside the state tag with its own age.
          </>,
          <>
            The glyph is a 1px inset ring in{' '}
            <code className="font-mono text-[12px]">currentColor</code>, never a filled square — on
            a legacy alarm row a fill would only lighten the row colour and cost contrast.
          </>,
        ],
      }}
    />
  )
}
