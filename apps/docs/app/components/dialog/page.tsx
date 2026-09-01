import ComponentDoc, { type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const btnSecondary =
  'inline-flex items-center gap-[7px] rounded-md border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm hover:bg-slate-50'
const btnPrimary =
  'inline-flex items-center gap-[7px] rounded-md border border-ink bg-ink px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-slate-800'
const btnDanger =
  'inline-flex items-center gap-[7px] rounded-md border border-critical bg-critical px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-[#D8332E]'

const Scrim = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full justify-center rounded-lg bg-[rgba(15,24,43,0.46)] p-8">{children}</div>
)

const variants: Variant[] = [
  {
    name: 'Dialog',
    platform: 'Desktop',
    description:
      'Icon tile, title and optional tag in the header; a slate-50 footer with actions right-aligned. The panel is anchored near the top of the scrim, not vertically centred.',
    preview: (
      <Scrim>
        <div className="flex w-[440px] flex-col overflow-hidden rounded-xl bg-white shadow-[0_12px_32px_rgba(15,24,43,0.12)]">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-[18px] py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
              </span>
              <div className="flex min-w-0 flex-col gap-[3px]">
                <span className="text-base font-bold tracking-[-0.2px] text-ink">Shelve alarm</span>
                <span className="self-start font-mono text-[11px] tracking-[0.3px] text-slate-400">
                  DO-0403
                </span>
              </div>
            </div>
            <button aria-label="Close" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-ink">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="overflow-y-auto p-[18px]">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.8px] text-slate-400">
              Duration
            </span>
            <div className="flex flex-wrap gap-2">
              {['1h', '4h', '8h', '24h'].map((d, i) => (
                <button
                  key={d}
                  className={`rounded-md border px-[13px] py-[7px] text-[13px] font-semibold transition-all ${
                    i === 1 ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-px shrink-0">
                <circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" />
              </svg>
              The alarm returns automatically when the shelve period expires.
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-slate-200 bg-slate-50 px-[18px] py-3.5">
            <button className={btnSecondary}>Cancel</button>
            <button className={btnPrimary}>Shelve for 4h</button>
          </div>
        </div>
      </Scrim>
    ),
    code: `<div className="fixed inset-0 z-[2000] flex items-start justify-center bg-[rgba(15,24,43,0.46)]
  p-8 pt-[max(40px,9vh)]">
  <div className="flex max-h-[calc(100vh-72px)] flex-col overflow-hidden rounded-xl bg-white shadow-lg">
    <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-[18px] py-4">…</header>
    <div className="overflow-y-auto p-[18px]">…</div>
    <footer className="flex items-center justify-end gap-2.5 border-t border-slate-200
      bg-slate-50 px-[18px] py-3.5">…</footer>
  </div>
</div>`,
  },
  {
    name: 'Confirm dialog',
    platform: 'Desktop',
    description:
      'Centred, iconic and short. A destructive confirm uses the critical-bg icon well and a danger commit; the detail line repeats exactly what will be affected, in mono.',
    preview: (
      <Scrim>
        <div className="flex w-[380px] flex-col overflow-hidden rounded-xl bg-white shadow-[0_12px_32px_rgba(15,24,43,0.12)]">
          <div className="flex flex-col items-center gap-2.5 px-6 pt-[26px] pb-5 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-critical-bg text-critical-text">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4M12 17h.01" />
                <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
              </svg>
            </span>
            <p className="text-[17px] font-bold text-ink">Take out of service?</p>
            <p className="m-0 max-w-[320px] text-sm leading-relaxed text-slate-600">
              This suppresses the alarm indefinitely and requires a work order to restore.
            </p>
            <span className="rounded-sm bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-500">
              DO-0403 · RAS 2 · TK-04
            </span>
          </div>
          <div className="flex items-center justify-end gap-2.5 border-t border-slate-200 bg-slate-50 px-[18px] py-3.5">
            <button className={btnSecondary}>Cancel</button>
            <button className={btnDanger}>Take out of service</button>
          </div>
        </div>
      </Scrim>
    ),
    code: `<div className="flex flex-col items-center gap-2.5 px-6 pt-[26px] pb-5 text-center">
  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full
    bg-critical-bg text-critical-text"><AlertIcon /></span>
  <p className="text-[17px] font-bold text-ink">Take out of service?</p>
  <p className="max-w-[320px] text-sm leading-relaxed text-slate-600">{message}</p>
  <span className="rounded-sm bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-500">{detail}</span>
</div>`,
  },
  {
    name: 'Split footer',
    platform: 'Desktop',
    description:
      'When the dialog carries metadata (who last changed a value, when it was rationalized) the footer splits: context on the left, actions on the right.',
    preview: (
      <Scrim>
        <div className="w-[460px] overflow-hidden rounded-xl bg-white shadow-[0_12px_32px_rgba(15,24,43,0.12)]">
          <div className="px-[18px] py-6 text-center text-[13px] text-slate-400">dialog body</div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-[18px] py-3.5">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
              Last changed 04 Mar by K. Berg
            </span>
            <span className="flex items-center gap-2.5">
              <button className={btnSecondary}>Cancel</button>
              <button className={btnPrimary}>Save</button>
            </span>
          </div>
        </div>
      </Scrim>
    ),
    code: `<footer className="flex flex-wrap items-center justify-between gap-3 border-t
  border-slate-200 bg-slate-50 px-[18px] py-3.5">
  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
    <ClockIcon /> Last changed 04 Mar by K. Berg
  </span>
  <span className="flex items-center gap-2.5"><Cancel /><Save /></span>
</footer>`,
  },
]

export default function DialogPage() {
  return (
    <ComponentDoc
      title="Dialog"
      intro={
        <>
          A modal that interrupts to collect a decision. Anchored near the top of the scrim rather
          than vertically centred, so a dialog whose content changes height (switching tabs inside
          it) grows downward and its header never jumps.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.dialog}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Anchor with <code className="font-mono text-[12px]">align-items: flex-start</code> and a{' '}
            <code className="font-mono text-[12px]">padding-top</code> of roughly 9vh. Vertical
            centring makes the panel jump every time its content resizes.
          </>,
          <>
            The body scrolls; the header and footer do not. Actions must stay reachable in a long
            dialog without scrolling to the bottom.
          </>,
          <>
            Destructive confirms name the object in mono. &ldquo;Are you sure?&rdquo; without
            stating <em>what</em> is not a confirmation.
          </>,
          <>
            Below 700px the dialog goes full-width and the footer buttons stretch to share the row.
            Fixed-column grids inside it reflow with auto-fit.
          </>,
        ],
      }}
    />
  )
}
