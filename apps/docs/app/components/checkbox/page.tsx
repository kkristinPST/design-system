import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const Check = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const variants: Variant[] = [
  {
    name: 'Checkbox — off, on, indeterminate',
    platform: 'Desktop',
    description:
      '16px box, 1.5px slate-300 border, 4px radius. Checked and indeterminate both fill with brand cyan; the header checkbox of a partly-selected table is indeterminate, never checked.',
    preview: (
      <div className="flex items-center gap-6">
        {[
          { label: 'Off', on: false, ind: false },
          { label: 'On', on: true, ind: false },
          { label: 'Indeterminate', on: false, ind: true },
        ].map(({ label, on, ind }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded border-[1.5px] ${
                on || ind ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {on && <Check />}
              {ind && <span className="h-[2px] w-[8px] rounded-full bg-current" />}
            </span>
            <span className="text-[11px] text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    ),
    code: `<span className={\`inline-flex h-4 w-4 items-center justify-center rounded border-[1.5px]
  \${on || ind ? "border-primary bg-primary text-white" : "border-slate-300 bg-white"}\`}>
  {on  && <CheckIcon />}
  {ind && <span className="h-[2px] w-[8px] rounded-full bg-current" />}
</span>`,
  },
  {
    name: 'Checkbox in a table row',
    platform: 'Desktop',
    description:
      'The selection column of an alarm table. Hovering the box previews the cyan border so the target is discoverable before the click.',
    preview: (
      <div className="w-[440px] overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-3.5 py-2.5">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded border-[1.5px] border-primary bg-primary text-white">
            <span className="h-[2px] w-[8px] rounded-full bg-current" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Alarm</span>
        </div>
        {[
          { t: 'TK-04 · Dissolved oxygen low', on: true },
          { t: 'PU-11 · Pump vibration high', on: false },
        ].map(({ t, on }) => (
          <div key={t} className="flex items-center gap-3 border-b border-slate-100 px-3.5 py-3 last:border-b-0">
            <span
              className={`inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded border-[1.5px] transition-colors ${
                on ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white hover:border-primary'
              }`}
            >
              {on && <Check />}
            </span>
            <span className="text-[13px] text-slate-600">{t}</span>
          </div>
        ))}
      </div>
    ),
    code: `<span className={\`h-4 w-4 rounded border-[1.5px] cursor-pointer transition-colors
  \${on ? "border-primary bg-primary text-white"
        : "border-slate-300 bg-white hover:border-primary"}\`}>
  {on && <CheckIcon />}
</span>`,
  },
  {
    name: 'Radio — option row',
    platform: 'Desktop',
    description:
      'A 14px ring inside a full-width option row. Selecting fills the ring and lifts the whole row to a cyan border on primary-bg — the row is the target, not just the dot.',
    preview: (
      <div className="flex w-[420px] flex-col gap-[7px]">
        {[
          { label: 'Instrument fault', on: false },
          { label: 'Planned maintenance', on: true },
        ].map(({ label, on }) => (
          <button
            key={label}
            className={`flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-left text-[13px] transition-colors ${
              on ? 'border-primary bg-primary-bg text-ink' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span
              className={`inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                on ? 'border-primary' : 'border-slate-300'
              }`}
            >
              {on && <span className="h-[7px] w-[7px] rounded-full bg-primary" />}
            </span>
            {label}
          </button>
        ))}
      </div>
    ),
    code: `<button className={on
  ? "border-primary bg-primary-bg text-ink"
  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"}>
  <span className={\`h-[14px] w-[14px] rounded-full border-[1.5px]
    \${on ? "border-primary" : "border-slate-300"}\`}>
    {on && <span className="h-[7px] w-[7px] rounded-full bg-primary" />}
  </span>
  {label}
</button>`,
  },
  {
    name: 'Mobile — checkbox',
    platform: 'Mobile',
    description:
      'Scaled up to 22px with a 7px radius so it is comfortably tappable, and always paired with a row-height target rather than being hit directly.',
    preview: (
      <PhoneFrame>
        {[
          { t: 'TK-04 · DO low', s: 'Rationalized · reviewed 12 Mar', on: true },
          { t: 'PU-11 · Vibration high', s: 'Awaiting review', on: false },
        ].map(({ t, s, on }, i, a) => (
          <button
            key={t}
            className={`flex min-h-[52px] w-full items-center gap-2.5 px-3.5 py-3 text-left ${
              i < a.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <span
              className={`inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[7px] border-[1.5px] ${
                on ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {on && <Check size={13} />}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-tight text-ink">{t}</span>
              <span className="mt-0.5 block truncate text-[12px] text-slate-500">{s}</span>
            </span>
          </button>
        ))}
      </PhoneFrame>
    ),
    code: `<span className={\`h-[22px] w-[22px] rounded-[7px] border-[1.5px] inline-flex
  items-center justify-center
  \${on ? "border-primary bg-primary text-white" : "border-slate-300 bg-white"}\`}>
  {on && <CheckIcon />}
</span>`,
  },
]

export default function CheckboxPage() {
  return (
    <ComponentDoc
      title="Checkbox & radio"
      intro={
        <>
          Multi-select uses a square checkbox; single-select uses a round radio. Both fill with
          brand cyan when active. Desktop draws them at 16px / 14px; mobile scales the checkbox to
          22px and always wraps it in a full row target.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.checkbox}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Square means &ldquo;any number&rdquo;, round means &ldquo;exactly one&rdquo;. Never mix
            the shapes within one group — the shape is the affordance.
          </>,
          <>
            A table header checkbox over a partial selection is <strong>indeterminate</strong>, not
            checked. Checked means every row on the page is selected.
          </>,
          <>
            The tap target is the row, not the box. On mobile the row is 52px tall even though the
            box is drawn at 22px.
          </>,
        ],
      }}
    />
  )
}
