import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const Minus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 12h14" />
  </svg>
)
const Plus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const variants: Variant[] = [
  {
    name: 'Setpoint stepper',
    platform: 'Desktop',
    description:
      'The large form used in a setpoint dialog. 44px hit targets either side of a 28px mono value, with the allowed range stated underneath so it is visible while editing.',
    preview: (
      <div className="w-[380px]">
        <p className="mb-3.5 text-[13px] text-slate-600">Dissolved oxygen setpoint</p>
        <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 p-2">
          <button className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-ink transition-colors hover:bg-slate-100">
            <Minus />
          </button>
          <span className="flex items-baseline gap-1.5">
            <span className="font-mono text-[28px] font-bold tracking-[-0.5px] text-ink tabular-nums">
              8.4
            </span>
            <span className="text-[13px] text-slate-400">mg/L</span>
          </span>
          <button className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-ink transition-colors hover:bg-slate-100">
            <Plus />
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-[13px] text-slate-500">
            Current
            <span className="font-mono font-bold text-ink tabular-nums">8.0 mg/L</span>
          </div>
          <div className="flex items-center justify-between text-[13px] text-slate-500">
            Last changed
            <span className="font-mono font-bold text-ink tabular-nums">04 Mar, K. Berg</span>
          </div>
        </div>
        <p className="mt-2.5 text-xs text-slate-400">Allowed range 6.0 – 12.0 mg/L</p>
      </div>
    ),
    code: `<div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 p-2">
  <button className="h-11 w-11 rounded-md border border-slate-200 bg-white hover:bg-slate-100">
    <MinusIcon />
  </button>
  <span className="flex items-baseline gap-1.5">
    <span className="font-mono text-[28px] font-bold tracking-[-0.5px] tabular-nums">8.4</span>
    <span className="text-[13px] text-slate-400">mg/L</span>
  </span>
  <button className="h-11 w-11 …"><PlusIcon /></button>
</div>`,
  },
  {
    name: 'Inline stepper',
    platform: 'Desktop',
    description:
      'The compact form used in a parameter row, where many values are edited in one dialog. Focus lights the whole wrapper rather than the inner input.',
    preview: (
      <div className="w-[440px]">
        {[
          { label: 'High-high limit', value: '14.0', unit: 'mg/L', focus: false },
          { label: 'High limit', value: '12.5', unit: 'mg/L', focus: true },
        ].map(({ label, value, unit, focus }) => (
          <div
            key={label}
            className="flex min-h-[34px] items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0"
          >
            <span className="text-[13px] text-slate-600">{label}</span>
            <div
              className={`flex items-center gap-0.5 rounded-md border bg-white p-[3px] ${
                focus ? 'border-primary shadow-[0_0_0_3px_var(--color-primary-bg)]' : 'border-slate-300'
              }`}
            >
              <button className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink">
                <Minus />
              </button>
              <input
                defaultValue={value}
                className="w-[58px] border-none bg-transparent text-center text-[15px] font-bold text-ink outline-none"
              />
              <button className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink">
                <Plus />
              </button>
              <span className="pr-1 text-xs text-slate-400">{unit}</span>
            </div>
          </div>
        ))}
      </div>
    ),
    code: `<div className="flex items-center gap-0.5 rounded-md border border-slate-300 bg-white p-[3px]
  focus-within:border-primary focus-within:shadow-[0_0_0_3px_var(--color-primary-bg)]">
  <button className="h-[30px] w-[30px] rounded-sm text-slate-500 hover:bg-slate-100"><MinusIcon /></button>
  <input className="w-[58px] bg-transparent text-center text-[15px] font-bold outline-none" />
  <button className="h-[30px] w-[30px] …"><PlusIcon /></button>
  <span className="pr-1 text-xs text-slate-400">mg/L</span>
</div>`,
  },
  {
    name: 'Mobile — value stepper',
    platform: 'Mobile',
    description:
      'A 58px tall control with 58px square buttons on each end — usable with gloves. The current value sits above it and the meta strip below states the range and last change.',
    preview: (
      <PhoneFrame className="p-4">
        <div className="mb-2.5 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-[13px] py-[11px] text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
          Current
          <b className="font-mono text-[15px] font-bold normal-case tracking-normal text-ink tabular-nums">
            8.0 mg/L
          </b>
        </div>

        <div className="flex h-[58px] items-stretch overflow-hidden rounded-[14px] border border-slate-200 bg-white">
          <button className="inline-flex w-[58px] shrink-0 items-center justify-center border-r border-slate-200 bg-slate-50 text-ink">
            <Minus />
          </button>
          <input
            defaultValue="8.4"
            className="min-w-0 flex-1 border-none bg-transparent text-center font-mono text-[22px] font-bold text-ink outline-none tabular-nums"
          />
          <span className="self-center pr-3.5 font-mono text-[13px] font-bold text-slate-600">
            mg/L
          </span>
          <button className="inline-flex w-[58px] shrink-0 items-center justify-center border-l border-slate-200 bg-slate-50 text-ink">
            <Plus />
          </button>
        </div>

        <div className="mt-2.5 flex gap-2">
          {[
            ['Min', '6.0'],
            ['Max', '12.0'],
          ].map(([l, v]) => (
            <span
              key={l}
              className="flex flex-1 flex-col gap-[3px] rounded-[11px] bg-slate-50 px-[11px] py-[9px] text-[11px] font-bold uppercase tracking-wide text-slate-600"
            >
              {l}
              <b className="font-mono text-[13px] font-bold normal-case tracking-normal text-ink tabular-nums">
                {v}
              </b>
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
          Raising the setpoint above 12.0 requires a rationalization record.
        </p>
      </PhoneFrame>
    ),
    code: `<div className="flex h-[58px] items-stretch overflow-hidden rounded-[14px]
  border border-slate-200 bg-white">
  <button className="w-[58px] border-r border-slate-200 bg-slate-50"><MinusIcon /></button>
  <input className="flex-1 bg-transparent text-center font-mono text-[22px] font-bold
    tabular-nums outline-none" />
  <span className="self-center pr-3.5 font-mono text-[13px] font-bold text-slate-600">mg/L</span>
  <button className="w-[58px] border-l border-slate-200 bg-slate-50"><PlusIcon /></button>
</div>`,
  },
  {
    name: 'Mobile — out of range',
    platform: 'Mobile',
    description:
      'When the entered value breaks a limit the reason line turns critical-text and the commit button disables. The stepper itself does not turn red — the explanation carries the state.',
    preview: (
      <PhoneFrame className="p-4">
        <div className="flex h-[58px] items-stretch overflow-hidden rounded-[14px] border border-slate-200 bg-white">
          <button className="inline-flex w-[58px] shrink-0 items-center justify-center border-r border-slate-200 bg-slate-50 text-ink">
            <Minus />
          </button>
          <input
            defaultValue="13.6"
            className="min-w-0 flex-1 border-none bg-transparent text-center font-mono text-[22px] font-bold text-ink outline-none tabular-nums"
          />
          <span className="self-center pr-3.5 font-mono text-[13px] font-bold text-slate-600">mg/L</span>
          <button className="inline-flex w-[58px] shrink-0 items-center justify-center border-l border-slate-200 bg-slate-50 text-ink">
            <Plus />
          </button>
        </div>
        <p className="mt-2.5 text-xs font-semibold leading-relaxed text-critical-text">
          Above the 12.0 mg/L maximum for this tank.
        </p>
        <button
          disabled
          className="mt-3 inline-flex h-[50px] w-full cursor-not-allowed items-center justify-center rounded-[14px] border border-slate-200 bg-slate-100 text-sm font-bold text-slate-400"
        >
          Save setpoint
        </button>
      </PhoneFrame>
    ),
    code: `<p className="text-xs font-semibold text-critical-text">
  Above the 12.0 mg/L maximum for this tank.
</p>
<button disabled className="h-[50px] w-full rounded-[14px] border border-slate-200
  bg-slate-100 text-sm font-bold text-slate-400 cursor-not-allowed">
  Save setpoint
</button>`,
  },
]

export default function StepperPage() {
  return (
    <ComponentDoc
      title="Stepper"
      intro={
        <>
          Numeric entry for setpoints, alarm limits and rationalization values. Every stepper shows
          the current value, the allowed range and the last change alongside the field — a setpoint
          is never edited without the context that makes it safe.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.stepper}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The value is always mono and <code className="font-mono text-[12px]">tabular-nums</code>,
            so nudging it does not shift the layout under your thumb.
          </>,
          <>
            Range, current value and last change are part of the control, not a tooltip. An operator
            changing a limit must be able to see what they are changing it from.
          </>,
          <>
            Out of range disables the commit and explains why in words. The field does not turn red
            on its own — a red box without a sentence tells the operator nothing.
          </>,
          <>
            Mobile buttons are 58px square. This is one of the few controls where the ink itself is
            enlarged, because it is used with wet or gloved hands on a walkway.
          </>,
        ],
      }}
    />
  )
}
