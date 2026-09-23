import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Search field',
    platform: 'Desktop',
    description:
      'The filter-bar search. Icon and input sit on one line and must never wrap. It is elastic (flex 1 1 200px, min 150px) so the filter groups beside it stay on the same row while there is room.',
    preview: (
      <label className="flex min-w-[280px] items-center gap-[9px] rounded-md border border-slate-300 bg-white px-3 py-2">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input
          defaultValue=""
          placeholder="Search alarms, tags or areas"
          className="w-full border-none bg-transparent text-[13px] text-ink outline-none placeholder:text-slate-400"
        />
      </label>
    ),
    code: `<label className="flex min-w-[280px] items-center gap-[9px] rounded-md
  border border-slate-300 bg-white px-3 py-2">
  <SearchIcon />
  <input placeholder="Search alarms, tags or areas"
    className="w-full border-none bg-transparent text-[13px] text-ink outline-none
      placeholder:text-slate-400" />
</label>`,
  },
  {
    name: 'Text field · default, focus, error',
    platform: 'Desktop',
    description:
      'Focus is a cyan border plus a 3px primary-bg ring; never a colour change alone. Error text uses critical-text, not the bare critical mark.',
    preview: (
      <div className="flex w-[420px] flex-col gap-4">
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Reason
          </label>
          <input
            defaultValue=""
            placeholder="Why is this being shelved?"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-[9px] text-[13px] text-ink outline-none placeholder:text-slate-400"
          />
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Reason; focused
          </label>
          <input
            defaultValue="Sensor replacement scheduled"
            className="w-full rounded-md border border-primary bg-white px-3 py-[9px] text-[13px] text-ink shadow-[0_0_0_3px_var(--color-primary-bg)] outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Duration, error
          </label>
          <input
            defaultValue=""
            className="w-full rounded-md border border-critical bg-white px-3 py-[9px] text-[13px] text-ink outline-none"
          />
          <p className="mt-1.5 text-[12px] font-semibold text-critical-text">
            A shelve duration is required.
          </p>
        </div>
      </div>
    ),
    code: `{/* default */} <input className="w-full rounded-md border border-slate-300 bg-white
  px-3 py-[9px] text-[13px] text-ink outline-none placeholder:text-slate-400" />

{/* focus */}   border-primary shadow-[0_0_0_3px_var(--color-primary-bg)]
{/* error */}   border-critical  +  <p className="text-critical-text">…</p>`,
  },
  {
    name: 'Textarea',
    platform: 'Desktop',
    description:
      'Notes and comments. Vertical resize only: horizontal resize would break the dialog grid. 1.5 line-height for multi-line legibility.',
    preview: (
      <div className="w-[420px]">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Note
        </label>
        <textarea
          rows={3}
          defaultValue=""
          placeholder="Add context for the next shift…"
          className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2.5 text-[13px] leading-relaxed text-ink outline-none placeholder:text-slate-400"
        />
      </div>
    ),
    code: `<textarea rows={3} placeholder="Add context for the next shift…"
  className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2.5
    text-[13px] leading-relaxed text-ink outline-none placeholder:text-slate-400" />`,
  },
  {
    name: 'Mobile · text field',
    platform: 'Mobile',
    description:
      'A 48px tall, 12px radius control at 15px type; large enough that iOS will not zoom the viewport on focus. Focus adds a 3px cyan ring.',
    preview: (
      <PhoneFrame className="p-4">
        <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Setpoint reason
        </label>
        <input
          defaultValue=""
          placeholder="Enter a reason"
          className="h-12 w-full rounded-xl border border-slate-200 bg-white px-[13px] text-[15px] text-ink outline-none placeholder:text-slate-400"
        />
        <label className="mt-4 mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Focused
        </label>
        <input
          defaultValue="Calibration drift"
          className="h-12 w-full rounded-xl border border-primary bg-white px-[13px] text-[15px] text-ink shadow-[0_0_0_3px_rgba(0,174,238,0.18)] outline-none"
        />
      </PhoneFrame>
    ),
    code: `<input placeholder="Enter a reason"
  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-[13px]
    text-[15px] text-ink outline-none placeholder:text-slate-400" />

{/* focus */} border-primary shadow-[0_0_0_3px_rgba(0,174,238,0.18)]`,
  },
  {
    name: 'Mobile · search bar & textarea',
    platform: 'Mobile',
    description:
      'The search bar is a filled slate-100 well inside a bottom sheet, with no border. The note textarea is 96px minimum so the keyboard does not cover the whole field.',
    preview: (
      <PhoneFrame className="p-4">
        <div className="mb-2.5 flex items-center gap-[9px] rounded-[13px] bg-slate-100 px-3.5 py-3">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          <input
            defaultValue=""
            placeholder="Search"
            className="flex-1 border-none bg-transparent text-[15px] text-ink outline-none placeholder:text-slate-400"
          />
        </div>
        <textarea
          rows={4}
          defaultValue=""
          placeholder="Add a note…"
          className="min-h-[96px] w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm leading-relaxed text-ink outline-none placeholder:text-slate-400"
        />
      </PhoneFrame>
    ),
    code: `{/* sheet search */}
<div className="flex items-center gap-[9px] rounded-[13px] bg-slate-100 px-3.5 py-3">
  <SearchIcon />
  <input placeholder="Search" className="flex-1 bg-transparent text-[15px] outline-none" />
</div>

{/* note */}
<textarea className="min-h-[96px] w-full rounded-xl border border-slate-200 p-3 text-sm" />`,
  },
]

export default function InputPage() {
  return (
    <ComponentDoc
      title="Input"
      intro={
        <>
          Text entry across both builds. Desktop inputs are 13px with a 1px slate-300 border;
          mobile inputs are 48px tall at 15px type so iOS will not zoom on focus. Focus is always
          a cyan border <em>plus</em> a soft ring; colour alone is never the only signal.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.input}
      notes={{
        heading: 'Rules',
        items: [
          <>
            <strong className="font-semibold text-ink">Cap a search field inside a toolbar.</strong>{' '}
            Left to flex it takes every spare pixel and pushes the row&rsquo;s last action onto a
            second line. Cap the width, let the bar shrink, and keep one row.
          </>,
          <>
            If the cap clips the placeholder, <strong>shorten the copy, do not widen the
            field</strong>. The column headers already say what is searchable, so
            &ldquo;Filter alarms…&rdquo; carries as much as a sentence naming every column.
          </>,
          <>
            A search field is one line: icon + input. It may shrink, but it must never wrap; a
            wrapped field puts the magnifier on its own row.
          </>,
          <>
            Numeric entry does not use a plain input. Use the{' '}
            <strong>Stepper</strong> so a value can be nudged without a keyboard, and so the
            allowed range is visible while editing.
          </>,
          <>
            Placeholders are hints, never labels. Every field keeps a persistent label above it so
            the meaning survives once the field is filled.
          </>,
        ],
      }}
    />
  )
}
