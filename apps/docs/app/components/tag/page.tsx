import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Equipment tag',
    platform: 'Desktop + Mobile',
    description:
      'The plant identifier for a piece of equipment or an instrument. Always mono, 12px, 0.3px tracking, slate-600; it is a machine-readable code, and mono is what signals that.',
    preview: (
      <div className="flex flex-wrap items-center gap-5">
        {['TK-04', 'PT-1201', 'PU-11A', 'FIC-0342', 'DO-0403'].map((t) => (
          <span key={t} className="font-mono text-xs tracking-[0.3px] text-slate-600 tabular-nums">
            {t}
          </span>
        ))}
      </div>
    ),
    code: `<span className="font-mono text-xs tracking-[0.3px] text-slate-600 tabular-nums">
  PT-1201
</span>`,
  },
  {
    name: 'Tag in context',
    platform: 'Desktop',
    description:
      'Beside a human name the tag is the quiet half. The name is sans and carries the meaning; the tag is mono and carries the address.',
    preview: (
      <div className="w-[440px] overflow-hidden rounded-lg border border-slate-200 bg-white">
        {[
          ['Recirculation pump A', 'PU-11A', 'Running'],
          ['DO transmitter, tank 4', 'DO-0403', 'Fault'],
        ].map(([name, tag, state]) => (
          <div key={tag} className="flex items-center gap-3 border-b border-slate-100 px-3.5 py-3 last:border-b-0">
            <span className="flex-1 text-[13px] font-medium text-ink">{name}</span>
            <span className="font-mono text-xs tracking-[0.3px] text-slate-400">{tag}</span>
            <span
              className={`inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.5px] ${
                state === 'Fault' ? 'bg-critical-bg text-critical-text' : 'bg-success-bg text-success-text'
              }`}
            >
              {state}
            </span>
          </div>
        ))}
      </div>
    ),
    code: `<span className="flex-1 text-[13px] font-medium text-ink">{name}</span>
<span className="font-mono text-xs tracking-[0.3px] text-slate-400">{tag}</span>`,
  },
  {
    name: 'Data & duration',
    platform: 'Desktop + Mobile',
    description:
      'The same mono family carries readings and elapsed times. All of it is tabular-nums, so a column of durations aligns on the digit and a ticking value does not jitter.',
    preview: (
      <div className="w-[440px] space-y-2.5">
        {[
          ['Active for', '04:12:38'],
          ['Reading', '6.24 mg/L'],
          ['Deviation', '−1.81 mg/L'],
        ].map(([l, v]) => (
          <div key={l} className="flex items-center justify-between">
            <span className="text-[13px] text-slate-600">{l}</span>
            <span className="font-mono text-xs text-slate-500 tabular-nums">{v}</span>
          </div>
        ))}
      </div>
    ),
    code: `<span className="font-mono text-xs text-slate-500 tabular-nums">04:12:38</span>`,
  },
  {
    name: 'Note type chips',
    platform: 'Desktop',
    description:
      'A sans classification chip, distinct from the mono equipment tag. Safety and handover take status tints; everything else stays neutral. The picker form flips to solid ink when selected.',
    preview: (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-[7px]">
          <span className="inline-flex items-center gap-[5px] whitespace-nowrap rounded-sm bg-critical-bg px-2 py-0.5 text-[11px] font-bold text-critical-text">
            Safety
          </span>
          <span className="inline-flex items-center gap-[5px] whitespace-nowrap rounded-sm bg-primary-bg px-2 py-0.5 text-[11px] font-bold text-primary-text">
            Handover
          </span>
          <span className="inline-flex items-center gap-[5px] whitespace-nowrap rounded-sm bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
            General
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-[7px]">
          {[
            { l: 'Safety', sel: false },
            { l: 'Handover', sel: true },
            { l: 'General', sel: false },
          ].map(({ l, sel }) => (
            <button
              key={l}
              className={`inline-flex cursor-pointer items-center gap-[5px] whitespace-nowrap rounded-sm border px-2 py-0.5 text-[11px] font-bold transition-all ${
                sel ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-primary'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    ),
    code: `{/* label form */}
<span className="rounded-sm bg-critical-bg px-2 py-0.5 text-[11px] font-bold text-critical-text">
  Safety
</span>

{/* picker form */}
<button className={sel
  ? "border-ink bg-ink text-white"
  : "border-slate-200 bg-white text-slate-600 hover:border-primary"}>Handover</button>`,
  },
  {
    name: 'Mobile · tag in an alarm row',
    platform: 'Mobile',
    description:
      'The tag shrinks with the row but keeps mono. On the phone it sits in the meta line under the alarm name, never competing with it for the first read.',
    preview: (
      <PhoneFrame className="p-3">
        <div className="relative overflow-hidden rounded-[14px] border border-slate-200 bg-white px-[13px] py-3">
          <span className="absolute inset-y-0 left-0 w-1 rounded-l bg-sev-crit" />
          <div className="mb-1 flex flex-wrap items-center gap-[7px]">
            <span className="inline-flex shrink-0 items-center rounded-[5px] bg-critical-solid px-1.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.5px] text-white">
              Critical
            </span>
            <span className="flex-1 truncate text-[11px] font-bold text-slate-600">RAS 2</span>
            <span className="shrink-0 font-mono text-[11px] text-slate-400 tabular-nums">04:12</span>
          </div>
          <p className="text-[14px] font-semibold leading-tight text-ink">
            Dissolved oxygen low-low
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-[0.3px] text-slate-500">DO-0403</span>
            <span className="font-mono text-[12px] font-semibold text-ink tabular-nums">
              6.2 mg/L
            </span>
          </div>
        </div>
      </PhoneFrame>
    ),
    code: `<div className="mt-1.5 flex items-center gap-2">
  <span className="font-mono text-[11px] tracking-[0.3px] text-slate-500">DO-0403</span>
  <span className="font-mono text-[12px] font-semibold text-ink tabular-nums">6.2 mg/L</span>
</div>`,
  },
]

export default function TagPage() {
  return (
    <ComponentDoc
      title="Tag"
      intro={
        <>
          The mono label that carries a machine identity: an equipment tag, an instrument ID, a
          reading, a duration. If a human wrote it, it is sans; if the plant assigned it, it is
          mono. That split is the whole rule.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.tag}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Mono means &ldquo;this is an identifier or a measurement&rdquo;. Never set a sentence in
            mono, and never set a tag in sans.
          </>,
          <>
            Everything mono is <code className="font-mono text-[12px]">tabular-nums</code>. A column
            of tags or durations must align on the digit.
          </>,
          <>
            The tag is subordinate to the name beside it, slate-400 or slate-500 against the
            name&rsquo;s ink. An operator scans names first and confirms by tag.
          </>,
          <>
            Note-type chips are a different component: sans, classifying, sometimes clickable. Do
            not style them like equipment tags.
          </>,
        ],
      }}
    />
  )
}
