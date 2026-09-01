import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const dot = 'inline-block h-[9px] w-[9px] shrink-0 rounded-full shadow-[0_0_0_1px_rgba(15,24,43,0.16)]'

const variants: Variant[] = [
  {
    name: 'Severity ramp',
    platform: 'Desktop',
    description:
      '9px circle with a 1px ink ring at 16%; the ring is what keeps a bright dot defined against a light tint fill. These are the sev-* marks, never the -text tokens.',
    preview: (
      <div className="flex flex-wrap items-center gap-6">
        {[
          ['Critical', 'bg-sev-crit'],
          ['High', 'bg-sev-high'],
          ['Medium', 'bg-sev-med'],
          ['Low', 'bg-sev-low'],
          ['Diagnostic', 'bg-sev-diag'],
          ['Normal', 'bg-sev-ok'],
        ].map(([l, c]) => (
          <div key={l} className="flex items-center gap-2">
            <span className={`${dot} ${c}`} />
            <span className="text-[13px] text-slate-600">{l}</span>
          </div>
        ))}
      </div>
    ),
    code: `<span className="inline-block h-[9px] w-[9px] rounded-full bg-sev-crit
  shadow-[0_0_0_1px_rgba(15,24,43,0.16)]" />

bg-sev-crit  bg-sev-high  bg-sev-med  bg-sev-low  bg-sev-diag  bg-sev-ok`,
  },
  {
    name: 'Connection pill',
    platform: 'Desktop',
    description:
      'The top-bar site status. A 7px dot inside a mono pill; the dot carries the state, the label carries the meaning, so it survives a monochrome print.',
    preview: (
      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-[9px] py-1 font-mono text-xs font-bold text-success-text">
          <span className="h-[7px] w-[7px] rounded-full bg-success" />
          Live
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-warning-bg px-[9px] py-1 font-mono text-xs font-bold text-warning-text">
          <span className="h-[7px] w-[7px] rounded-full bg-warning" />
          Delayed 42s
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-critical-bg px-[9px] py-1 font-mono text-xs font-bold text-critical-text">
          <span className="h-[7px] w-[7px] rounded-full bg-critical" />
          Disconnected
        </button>
      </div>
    ),
    code: `<button className="inline-flex items-center gap-1.5 rounded-full bg-success-bg
  px-[9px] py-1 font-mono text-xs font-bold text-success-text">
  <span className="h-[7px] w-[7px] rounded-full bg-success" />
  Live
</button>`,
  },
  {
    name: 'Row rail',
    platform: 'Desktop',
    description:
      'Severity as a 3px inset rail on the first cell of a table row, plus a faint priority tint on the whole row. Subtle by design: a full saturated fill is the legacy skin, not this one.',
    preview: (
      <div className="w-[480px] overflow-hidden rounded-lg border border-slate-200 bg-white">
        {[
          { t: 'TK-04 · Dissolved oxygen low-low', c: 'shadow-[inset_3px_0_0_var(--color-critical)]', bg: 'bg-[color-mix(in_srgb,var(--color-critical)_7%,#fff)]' },
          { t: 'PU-11 · Pump vibration high', c: 'shadow-[inset_3px_0_0_var(--color-warning)]', bg: 'bg-[color-mix(in_srgb,var(--color-warning)_6%,#fff)]' },
          { t: 'FT-220 · Flow deviation', c: 'shadow-[inset_3px_0_0_var(--color-medium)]', bg: '' },
        ].map(({ t, c, bg }) => (
          <div key={t} className={`flex items-center gap-3 border-b border-slate-100 px-3.5 py-3 last:border-b-0 ${c} ${bg}`}>
            <span className="text-[13px] text-slate-600">{t}</span>
          </div>
        ))}
      </div>
    ),
    code: `{/* rail on the first cell */}
<td className="shadow-[inset_3px_0_0_var(--color-critical)]">

{/* faint priority tint on the row */}
<tr className="bg-[color-mix(in_srgb,var(--color-critical)_7%,var(--color-surface))]">`,
  },
  {
    name: 'Mobile · dots and rails',
    platform: 'Mobile',
    description:
      'The alarm row carries a 4px full-height rail on its leading edge, rounded to match the card. Inline dots stay at 9px with the same defining ring.',
    preview: (
      <PhoneFrame className="border-none bg-transparent shadow-none">
        <div className="flex flex-col gap-2">
          {[
            { t: 'Dissolved oxygen low-low', a: 'RAS 2 · TK-04', c: 'bg-sev-crit' },
            { t: 'Pump vibration high', a: 'Pump sump · PU-11', c: 'bg-sev-high' },
          ].map(({ t, a, c }) => (
            <div
              key={t}
              className="relative overflow-hidden rounded-[14px] border border-slate-200 bg-white px-[13px] py-3"
            >
              <span className={`absolute inset-y-0 left-0 w-1 rounded-l ${c}`} />
              <p className="text-[11px] font-bold text-slate-600">{a}</p>
              <p className="mt-1 text-[14px] font-semibold leading-tight text-ink">{t}</p>
            </div>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<div className="relative overflow-hidden rounded-[14px] border border-slate-200 bg-white
  px-[13px] py-3">
  <span className="absolute inset-y-0 left-0 w-1 rounded-l bg-sev-crit" />
  …
</div>`,
  },
]

export default function StatusDotPage() {
  return (
    <ComponentDoc
      title="Status dot"
      intro={
        <>
          The smallest status marker in the system: a 9px filled circle, always paired with a
          label. It appears inline in lists, inside connection pills, and as a 3px (desktop) or 4px
          (mobile) rail on the leading edge of a row.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['status-dot']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The dot never travels alone. It is a redundancy cue beside a word, so the state survives
            colour-blindness and monochrome printing; a bare dot is not a status.
          </>,
          <>
            Dots use the <code className="font-mono text-[12px]">sev-*</code> marks. Text beside them
            uses <code className="font-mono text-[12px]">sev-*-text</code>. Swapping the two is the
            most common contrast failure in the system.
          </>,
          <>
            The 1px ink ring at 16% is not decoration; without it a bright dot dissolves into a
            status-tint fill of the same hue.
          </>,
          <>
            In dark mode the ring flips to white at 20%, and in the legacy skin a dot inside a
            coloured alarm row is repainted in the row ink so a non-text indicator still clears 3:1.
          </>,
        ],
      }}
    />
  )
}
