import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const Switch = ({ on }: { on: boolean }) => (
  <span
    className={`relative inline-block h-7 w-[46px] shrink-0 rounded-[20px] transition-colors ${
      on ? 'bg-success' : 'bg-slate-300'
    }`}
  >
    <span
      className={`absolute top-[3px] left-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform ${
        on ? 'translate-x-[18px]' : ''
      }`}
    />
  </span>
)

const variants: Variant[] = [
  {
    name: 'Switch · off / on',
    platform: 'Mobile',
    description:
      '46×28 track, 22px knob, 18px travel. On is the indicator green: this control states a system condition, so it uses the status ramp rather than brand cyan.',
    preview: (
      <div className="flex items-center gap-10">
        {[false, true].map((on) => (
          <div key={String(on)} className="flex flex-col items-center gap-2">
            <Switch on={on} />
            <span className="text-[11px] text-slate-500">{on ? 'On' : 'Off'}</span>
          </div>
        ))}
      </div>
    ),
    code: `<span className={\`relative h-7 w-[46px] rounded-[20px] transition-colors
  \${on ? "bg-success" : "bg-slate-300"}\`}>
  <span className={\`absolute top-[3px] left-[3px] h-[22px] w-[22px] rounded-full
    bg-white shadow-sm transition-transform \${on ? "translate-x-[18px]" : ""}\`} />
</span>`,
  },
  {
    name: 'Settings rows',
    platform: 'Mobile',
    description:
      'The switch sits at the end of a list row and is never the only target: the whole 52px row toggles. The visual control stays compact; the hit area is inflated invisibly.',
    preview: (
      <PhoneFrame>
        {[
          { t: 'Push notifications', s: 'Critical and high alarms', on: true },
          { t: 'Outdoor / high contrast', s: 'Heavier borders, bolder numerals', on: false },
          { t: 'Keep screen awake', s: 'While a mimic is open', on: true },
        ].map(({ t, s, on }, i, a) => (
          <button
            key={t}
            className={`flex min-h-[52px] w-full items-center gap-3 px-4 py-3.5 text-left ${
              i < a.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold leading-tight text-ink">{t}</span>
              <span className="mt-0.5 block truncate text-[12px] text-slate-500">{s}</span>
            </span>
            <Switch on={on} />
          </button>
        ))}
      </PhoneFrame>
    ),
    code: `<button className="flex min-h-[52px] w-full items-center gap-3 px-4 py-3.5 text-left
  border-b border-slate-100">
  <span className="min-w-0 flex-1">
    <span className="block text-sm font-semibold text-ink">{title}</span>
    <span className="block truncate text-[12px] text-slate-500">{subtitle}</span>
  </span>
  <Switch on={on} />
</button>`,
  },
  {
    name: 'Toggle pill',
    platform: 'Desktop',
    description:
      'The desktop equivalent inside the account menu. A compact pill that flips to a filled brand-cyan chip with primary-ink text when active; the panel is always dark chrome, so it cannot read from the slate ramp.',
    preview: (
      <div className="w-[260px] rounded-[10px] border border-white/16 bg-ink p-1.5">
        {[
          { label: 'Dark theme', on: true },
          { label: 'Compact density', on: false },
        ].map(({ label, on }) => (
          <button
            key={label}
            className="flex w-full items-center gap-2.5 rounded-[7px] px-2.5 py-[9px] text-left text-[13px] font-medium text-[#E6EBF3] transition-colors hover:bg-white/10"
          >
            {label}
            <span
              className={`ml-auto rounded-full px-2 py-px text-[11px] font-bold ${
                on
                  ? 'border border-primary bg-primary text-primary-ink'
                  : 'border border-white/28 text-[#C3CEDE]'
              }`}
            >
              {on ? 'On' : 'Off'}
            </span>
          </button>
        ))}
      </div>
    ),
    code: `<button className="flex w-full items-center gap-2.5 rounded-[7px] px-2.5 py-[9px]
  text-[13px] font-medium text-[#E6EBF3] hover:bg-white/10">
  {label}
  <span className={\`ml-auto rounded-full px-2 py-px text-[11px] font-bold \${on
    ? "border border-primary bg-primary text-primary-ink"
    : "border border-white/28 text-[#C3CEDE]"}\`}>
    {on ? "On" : "Off"}
  </span>
</button>`,
  },
]

export default function ToggleSwitchPage() {
  return (
    <ComponentDoc
      title="Toggle switch"
      intro={
        <>
          Flips a setting that takes effect immediately: no save step. Mobile uses a sliding
          switch; desktop uses a compact on/off pill inside the dark account menu. If a change
          needs confirming, it is a checkbox in a form, not a switch.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['toggle-switch']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            A switch applies instantly. Anything that needs a Save button is a checkbox, not a
            switch.
          </>,
          <>
            &ldquo;On&rdquo; is <strong>success green</strong>, not brand cyan: a switch reports a
            system condition, and cyan belongs to links, focus and selection.
          </>,
          <>
            The switch keeps its compact 46×28 ink but the row carries the 44px target. Do not
            enlarge the control to satisfy WCAG 2.5.5.
          </>,
          <>
            Anything inside the dark account menu uses fixed light values, never the slate ramp;
            that ramp inverts in dark mode and would turn the labels near-black on near-black.
          </>,
        ],
      }}
    />
  )
}
