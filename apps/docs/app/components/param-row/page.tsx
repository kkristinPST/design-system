import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const Minus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
)
const Plus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
)

const variants: Variant[] = [
  {
    name: 'Editable parameter row',
    platform: 'Desktop',
    description:
      'Label on the left, control on the right, hairline underneath. A changed value turns primary-text so the pending edit is visible before it is committed.',
    preview: (
      <div className="w-[520px]">
        <p className="pb-3 pt-1 text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">
          Oxygen control
        </p>
        {[
          { l: 'Setpoint', v: '8.4', u: 'mg/L', changed: true },
          { l: 'High limit', v: '12.0', u: 'mg/L', changed: false },
        ].map(({ l, v, u, changed }) => (
          <div key={l} className="flex min-h-[34px] items-center justify-between gap-4 border-b border-slate-100 py-3">
            <span className="text-[13px] text-slate-600">{l}</span>
            <div className="flex items-center gap-2">
              <button
                aria-label="History"
                className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-100 hover:text-primary-text"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
              </button>
              <div className="flex items-center gap-0.5 rounded-md border border-slate-300 bg-white p-[3px]">
                <button className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-sm text-slate-500 hover:bg-slate-100 hover:text-ink">
                  <Minus />
                </button>
                <input
                  defaultValue={v}
                  className={`w-[58px] border-none bg-transparent text-center text-[15px] font-bold outline-none ${
                    changed ? 'text-primary-text' : 'text-ink'
                  }`}
                />
                <button className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-sm text-slate-500 hover:bg-slate-100 hover:text-ink">
                  <Plus />
                </button>
                <span className="pr-1 text-xs text-slate-400">{u}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    code: `<div className="flex min-h-[34px] items-center justify-between gap-4 border-b border-slate-100 py-3">
  <span className="text-[13px] text-slate-600">{label}</span>
  <div className="flex items-center gap-2">
    <HistoryButton />
    <Stepper value={value} unit={unit} changed={changed} />
  </div>
</div>

{/* a pending edit reads primary-text until it is committed */}
<input className={changed ? "text-primary-text" : "text-ink"} />`,
  },
  {
    name: 'Read-only rows',
    platform: 'Desktop',
    description:
      'Metadata about the parameter — who changed it, when, and against which limits. The value is bold ink; the label stays slate-500.',
    preview: (
      <div className="flex w-[520px] flex-col">
        {[
          ['Current value', '8.0 mg/L'],
          ['Last changed', '04 Mar 09:12 · K. Berg'],
          ['Allowed range', '6.0 – 12.0 mg/L'],
        ].map(([l, v]) => (
          <div key={l} className="flex items-center justify-between border-b border-slate-100 py-[9px] text-[13px] text-slate-500 last:border-b-0">
            {l}
            <span className="font-mono font-bold text-ink tabular-nums">{v}</span>
          </div>
        ))}
      </div>
    ),
    code: `<div className="flex items-center justify-between border-b border-slate-100 py-[9px]
  text-[13px] text-slate-500 last:border-b-0">
  Last changed
  <span className="font-mono font-bold text-ink tabular-nums">04 Mar 09:12 · K. Berg</span>
</div>`,
  },
  {
    name: 'Change warning',
    platform: 'Desktop',
    description:
      'When an edit crosses a governance threshold the row grows a warning band and the commit is gated. The comment field becomes required, not optional.',
    preview: (
      <div className="w-[520px]">
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-[color-mix(in_oklab,var(--color-critical)_28%,transparent)] bg-[color-mix(in_oklab,var(--color-critical)_10%,transparent)] px-3 py-2.5 text-[12px] font-semibold text-critical-text">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          </svg>
          Raising this limit above 12.0 requires a rationalization record.
        </div>
        <div className="pt-[15px]">
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">
            Reason for change <span className="text-critical">*</span>
          </label>
          <textarea
            rows={2}
            defaultValue=""
            placeholder="Required — recorded against the alarm"
            className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2.5 text-[13px] leading-relaxed outline-none placeholder:text-slate-400"
          />
        </div>
      </div>
    ),
    code: `<div className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[12px] font-semibold
  text-critical-text
  bg-[color-mix(in_oklab,var(--color-critical)_10%,transparent)]
  border border-[color-mix(in_oklab,var(--color-critical)_28%,transparent)]">
  <AlertIcon /> Raising this limit above 12.0 requires a rationalization record.
</div>`,
  },
  {
    name: 'Mobile — field rows',
    platform: 'Mobile',
    description:
      'A 52px row with a fixed 126px label column and a right-aligned mono value. Editable rows are buttons; read-only rows drop the pointer and the press state.',
    preview: (
      <PhoneFrame>
        {[
          { l: 'Setpoint', v: '8.4 mg/L', ro: false },
          { l: 'High limit', v: '12.0 mg/L', ro: false },
          { l: 'Last changed', v: '04 Mar · K. Berg', ro: true },
        ].map(({ l, v, ro }, i, a) => (
          <button
            key={l}
            disabled={ro}
            className={`flex min-h-[52px] w-full items-center gap-2.5 px-3.5 py-3 text-left ${
              i < a.length - 1 ? 'border-b border-slate-100' : ''
            } ${ro ? 'cursor-default' : 'active:bg-slate-50'}`}
          >
            <span className="w-[126px] shrink-0 text-[12px] font-bold text-slate-600">{l}</span>
            <span
              className={`flex-1 text-right font-mono text-[13px] tabular-nums ${
                ro ? 'font-medium text-slate-500' : 'font-semibold text-ink'
              }`}
            >
              {v}
            </span>
            {!ro && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round" className="shrink-0"><path d="m9 18 6-6-6-6" /></svg>
            )}
          </button>
        ))}
      </PhoneFrame>
    ),
    code: `<button disabled={readOnly} className={\`flex min-h-[52px] w-full items-center gap-2.5
  border-b border-slate-100 px-3.5 py-3 text-left
  \${readOnly ? "cursor-default" : "active:bg-slate-50"}\`}>
  <span className="w-[126px] shrink-0 text-[12px] font-bold text-slate-600">{label}</span>
  <span className={\`flex-1 text-right font-mono text-[13px] tabular-nums
    \${readOnly ? "font-medium text-slate-500" : "font-semibold text-ink"}\`}>{value}</span>
  {!readOnly && <ChevronRightIcon />}
</button>`,
  },
  {
    name: 'Mobile — long-text field',
    platform: 'Mobile',
    description:
      'Rationalization prose — cause, consequence, operator action. Stacked rather than side-by-side, with a modified-by line underneath, and an optional suggestion block.',
    preview: (
      <PhoneFrame>
        <div className="border-b border-slate-100 px-3.5 py-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[12px] font-bold text-slate-600">Operator action</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </div>
          <p className="m-0 text-[12px] leading-relaxed text-ink">
            Verify the oxygen cone is running, then raise the DO setpoint by 0.5 mg/L and confirm
            recovery within 15 minutes.
          </p>
          <p className="mt-[9px] font-mono text-[11px] text-slate-600">
            Modified 04 Mar · K. Berg
          </p>
        </div>
        <div className="px-3.5 py-3">
          <span className="text-[12px] font-bold text-slate-600">Consequence</span>
          <div className="mt-2 flex flex-col gap-1.5">
            <button className="rounded-[11px] border border-dashed border-slate-200 bg-slate-50 px-[11px] py-[9px] text-left text-[12px] leading-snug text-slate-600">
              Suggested: Fish stress and reduced feed intake within 30 minutes.
            </button>
          </div>
        </div>
      </PhoneFrame>
    ),
    code: `<div className="border-b border-slate-100 px-3.5 py-3">
  <div className="mb-1 flex items-center justify-between">
    <span className="text-[12px] font-bold text-slate-600">{label}</span><EditIcon />
  </div>
  <p className="text-[12px] leading-relaxed text-ink">{value}</p>
  <p className="mt-[9px] font-mono text-[11px] text-slate-600">Modified {date} · {author}</p>
</div>

{/* suggestion */}
<button className="rounded-[11px] border border-dashed border-slate-200 bg-slate-50
  px-[11px] py-[9px] text-left text-[12px] leading-snug text-slate-600">Suggested: …</button>`,
  },
]

export default function ParamRowPage() {
  return (
    <ComponentDoc
      title="Param row"
      intro={
        <>
          A single editable process value — a setpoint, an alarm limit, a rationalization field.
          Every param row shows the value, where it can go, and who last moved it, because changing
          a limit without that context is how alarm floods start.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['param-row']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            A pending edit reads <code className="font-mono text-[12px]">primary-text</code> until
            committed, so the operator can see what they have touched before they save.
          </>,
          <>
            Change history is one tap away on every editable row. It is not buried in an audit
            screen.
          </>,
          <>
            Crossing a governance threshold gates the commit and makes the reason field required.
            The warning explains the rule in a sentence — never just a red border.
          </>,
          <>
            Read-only rows on mobile drop both the chevron and the press state. A row that looks
            tappable and does nothing is worse than one that looks inert.
          </>,
        ],
      }}
    />
  )
}
