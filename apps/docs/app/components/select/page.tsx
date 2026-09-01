import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Select',
    platform: 'Desktop',
    description:
      'Filter-bar and dialog dropdown. Asymmetric padding (12px left, 8px right) leaves room for the caret without pushing the label off-centre.',
    preview: (
      <div className="flex items-center gap-3">
        <span className="text-[13px] font-semibold text-ink">Priority</span>
        <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white py-1.5 pl-3 pr-2 text-[13px] text-ink">
          All priorities
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    ),
    code: `<button className="inline-flex items-center gap-2 rounded-md border border-slate-300
  bg-white py-1.5 pl-3 pr-2 text-[13px] text-ink">
  All priorities
  <ChevronDownIcon />
</button>`,
  },
  {
    name: 'Rows-per-page select',
    platform: 'Desktop',
    description:
      'A native <select> restyled to match. It keeps native semantics — and the theme sets color-scheme so the OS paints the popup to match the skin instead of a light backdrop under light text.',
    preview: (
      <div className="inline-flex items-center gap-2 text-[13px] text-slate-600">
        Rows per page
        <select
          defaultValue="50"
          className="cursor-pointer appearance-none rounded-md border border-slate-300 bg-white py-1.5 pl-3 pr-7 text-[13px] text-ink outline-none [background-image:linear-gradient(45deg,transparent_50%,#666F7D_50%),linear-gradient(135deg,#666F7D_50%,transparent_50%)] [background-position:calc(100%-14px)_calc(50%+1px),calc(100%-9px)_calc(50%+1px)] [background-repeat:no-repeat] [background-size:5px_5px,5px_5px]"
        >
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
    ),
    code: `<select className="appearance-none rounded-md border border-slate-300 bg-white
  py-1.5 pl-3 pr-7 text-[13px] text-ink cursor-pointer
  [background-image:linear-gradient(45deg,transparent_50%,#666F7D_50%),
                    linear-gradient(135deg,#666F7D_50%,transparent_50%)]
  [background-position:calc(100%-14px)_calc(50%+1px),calc(100%-9px)_calc(50%+1px)]
  [background-size:5px_5px,5px_5px] [background-repeat:no-repeat]">
  <option>25</option><option>50</option><option>100</option>
</select>

/* the theme must also set  color-scheme: dark | light  so the native popup follows the skin */`,
  },
  {
    name: 'Stacked enum list',
    platform: 'Desktop',
    description:
      'When there are many or long options, a dropdown becomes a guessing game. Use a full-width radio list instead: the selected row takes a cyan border and primary-bg fill.',
    preview: (
      <div className="flex w-[420px] flex-col gap-1.5">
        {[
          { label: 'Instrument fault', sel: false },
          { label: 'Planned maintenance', sel: true },
          { label: 'Nuisance — awaiting rationalization', sel: false },
        ].map(({ label, sel }) => (
          <button
            key={label}
            className={`flex w-full items-center gap-2.5 rounded-md border px-3 py-2.5 text-left transition-colors ${
              sel ? 'border-primary bg-primary-bg' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span
              className={`inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                sel ? 'border-primary bg-primary text-white' : 'border-slate-300'
              }`}
            >
              {sel && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span className="text-sm font-semibold text-ink">{label}</span>
          </button>
        ))}
      </div>
    ),
    code: `<button className={sel
  ? "border-primary bg-primary-bg"
  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}>
  <span className={sel ? "border-primary bg-primary text-white" : "border-slate-300"}>
    {sel && <CheckIcon />}
  </span>
  <span className="text-sm font-semibold text-ink">{label}</span>
</button>`,
  },
  {
    name: 'Mobile — select',
    platform: 'Mobile',
    description:
      'A full-width native select with an inlined SVG chevron. 12px radius and 34px right padding so the caret never collides with a long value.',
    preview: (
      <PhoneFrame className="p-4">
        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Note type
        </label>
        <select
          defaultValue="Handover"
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white bg-[right_12px_center] bg-no-repeat py-[11px] pl-3 pr-[34px] text-sm text-ink outline-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2390A1B9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
          }}
        >
          <option>Handover</option>
          <option>Safety</option>
          <option>General</option>
        </select>
      </PhoneFrame>
    ),
    code: `<select
  className="w-full appearance-none rounded-xl border border-slate-200 bg-white
    bg-[right_12px_center] bg-no-repeat py-[11px] pl-3 pr-[34px] text-sm text-ink"
  style={{ backgroundImage: "url(\\"data:image/svg+xml,…chevron…\\")" }}>
  <option>Handover</option>
</select>`,
  },
  {
    name: 'Mobile — option sheet',
    platform: 'Mobile',
    description:
      'The preferred mobile picker. Options are 48px rows in a scrollable bordered list; the active row is bold on a slate-50 fill with a cyan check.',
    preview: (
      <PhoneFrame className="p-4">
        <div className="overflow-hidden rounded-[14px] border border-slate-200">
          {[
            { label: 'Critical', on: false },
            { label: 'High', on: true },
            { label: 'Medium', on: false },
            { label: 'Low', on: false },
          ].map(({ label, on }, i, a) => (
            <button
              key={label}
              className={`flex min-h-[48px] w-full items-center gap-[9px] px-3.5 py-3 text-left text-sm text-ink ${
                i < a.length - 1 ? 'border-b border-slate-100' : ''
              } ${on ? 'bg-slate-50 font-bold' : ''}`}
            >
              <span className="flex-1">{label}</span>
              {on && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00AEEE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<button className={\`flex min-h-[48px] w-full items-center gap-[9px] px-3.5 py-3
  border-b border-slate-100 text-sm text-ink \${on ? "bg-slate-50 font-bold" : ""}\`}>
  <span className="flex-1">{label}</span>
  {on && <CheckIcon className="text-primary" />}
</button>`,
  },
]

export default function SelectPage() {
  return (
    <ComponentDoc
      title="Select"
      intro={
        <>
          Choosing one value from a known set. Short lists use a dropdown; long or wordy lists use
          a stacked radio list on desktop and a full-height option sheet on mobile, because a
          native popup hides its options until you commit to opening it.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.select}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Any theme that restyles a native <code className="font-mono text-[12px]">select</code>{' '}
            must also set <code className="font-mono text-[12px]">color-scheme</code>. Without it the
            OS paints a light popup behind light text — the rows-per-page picker was unreadable in
            dark mode for exactly this reason.
          </>,
          <>
            Past roughly five options, or any option longer than a few words, switch to the stacked
            list. The dropdown stops being a shortcut once you have to open it to read it.
          </>,
          <>Selection is border + fill + a check glyph — never fill alone.</>,
        ],
      }}
    />
  )
}
