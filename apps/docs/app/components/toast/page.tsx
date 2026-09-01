import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const variants: Variant[] = [
  {
    name: 'Toast',
    platform: 'Desktop',
    description:
      'A dark ink pill confirming a completed action, with the undo affordance built in. It states what happened and to what; never a bare “Saved”.',
    preview: (
      <div className="flex flex-col gap-3">
        <div className="flex w-[420px] items-center gap-2.5 rounded-[13px] bg-ink px-4 py-3 text-[13px] font-semibold text-white shadow-[0_12px_32px_rgba(15,24,43,0.12)]">
          <span className="text-success">
            <Check />
          </span>
          4 alarms acknowledged
          <button className="ml-auto shrink-0 rounded-lg border border-white/28 bg-white/[0.14] px-2.5 py-1.5 text-xs font-bold text-white hover:bg-white/[0.26]">
            Undo
          </button>
        </div>
        <div className="flex w-[420px] items-center gap-2.5 rounded-[13px] bg-ink px-4 py-3 text-[13px] font-semibold text-white shadow-[0_12px_32px_rgba(15,24,43,0.12)]">
          <span className="text-critical">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" />
            </svg>
          </span>
          Could not reach the controller
          <button className="ml-auto shrink-0 rounded-lg border border-white/28 bg-white/[0.14] px-2.5 py-1.5 text-xs font-bold text-white hover:bg-white/[0.26]">
            Retry
          </button>
        </div>
      </div>
    ),
    code: `<div className="flex items-center gap-2.5 rounded-[13px] bg-ink px-4 py-3
  text-[13px] font-semibold text-white shadow-lg">
  <CheckIcon className="text-success" />
  4 alarms acknowledged
  <button className="ml-auto rounded-lg border border-white/28 bg-white/[0.14]
    px-2.5 py-1.5 text-xs font-bold text-white hover:bg-white/[0.26]">Undo</button>
</div>`,
  },
  {
    name: 'Mobile · toast',
    platform: 'Mobile',
    description:
      'Pinned 96px from the bottom so it clears the tab bar, inset 16px from each edge. It rises 14px with a fade on entry. The action button carries an invisible 44px hit area.',
    preview: (
      <PhoneFrame className="relative p-0">
        <div className="p-4">
          {['DO-0403 · Dissolved oxygen low', 'PU-11A · Vibration high'].map((t) => (
            <div key={t} className="mb-2 rounded-[14px] border border-slate-200 bg-white px-3 py-2.5 text-[12px] text-slate-600">
              {t}
            </div>
          ))}
        </div>

        <div className="mx-4 mb-3 flex items-center gap-[9px] rounded-[13px] bg-ink px-[15px] py-[13px] text-[13px] font-semibold text-white shadow-[0_12px_32px_rgba(15,24,43,0.12)]">
          <span className="text-success">
            <Check />
          </span>
          Alarm acknowledged
          <button className="relative ml-auto shrink-0 rounded-lg border border-white/28 bg-white/[0.14] px-[11px] py-1.5 text-xs font-bold text-white">
            Undo
          </button>
        </div>

        <div className="flex items-stretch border-t border-slate-200 bg-white px-1.5 pt-1.5 pb-4">
          {['Home', 'Alarms', 'Tanks', 'More'].map((l, i) => (
            <span
              key={l}
              className={`flex flex-1 flex-col items-center gap-[3px] py-1.5 text-[10px] font-semibold ${
                i === 1 ? 'text-primary-text' : 'text-slate-400'
              }`}
            >
              <span className="h-[21px] w-[21px] rounded-md bg-current opacity-20" />
              {l}
            </span>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<div className="absolute inset-x-4 bottom-24 z-[80] flex items-center gap-[9px]
  rounded-[13px] bg-ink px-[15px] py-[13px] text-[13px] font-semibold text-white
  shadow-lg animate-[mtoastin_280ms_ease]">
  <CheckIcon className="text-success" />
  Alarm acknowledged
  <button className="relative ml-auto rounded-lg border border-white/28 bg-white/[0.14]
    px-[11px] py-1.5 text-xs font-bold text-white">Undo</button>
</div>

/* 44px target on a compact button
   .m-toast-act::before { content:""; position:absolute; left:50%; top:50%;
     transform:translate(-50%,-50%); min-width:44px; min-height:44px } */`,
  },
  {
    name: 'Offline banner',
    platform: 'Mobile',
    description:
      'Not a toast; a persistent slate-800 bar that stays until connectivity returns. It shows the queued write count in mono on a warning pill, so nothing looks lost.',
    preview: (
      <PhoneFrame className="p-0">
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-[7px] text-[12px] font-semibold text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M2 2 22 22" /><path d="M5 12a10 10 0 0 1 5-2.6" /><path d="M14 9.4A10 10 0 0 1 19 12" /><path d="M12 19h.01" />
          </svg>
          Offline; changes will sync
          <span className="ml-auto rounded-full bg-warning px-[7px] py-px font-mono text-[10px] font-extrabold text-ink">
            3
          </span>
        </div>
        <div className="p-6 text-center text-xs text-slate-400">screen content</div>
      </PhoneFrame>
    ),
    code: `<div className="flex items-center gap-2 bg-slate-800 px-4 py-[7px]
  text-[12px] font-semibold text-white">
  <OfflineIcon />
  Offline — changes will sync
  <span className="ml-auto rounded-full bg-warning px-[7px] py-px
    font-mono text-[10px] font-extrabold text-ink">3</span>
</div>`,
  },
]

export default function ToastPage() {
  return (
    <ComponentDoc
      title="Toast"
      intro={
        <>
          Transient confirmation that an action completed, on a dark ink surface at both sizes.
          Toasts report outcomes; they never ask questions. Anything needing a decision is a dialog
          or a bottom sheet.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.toast}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Name the object and the count. &ldquo;4 alarms acknowledged&rdquo; is useful;
            &ldquo;Saved&rdquo; is not: especially after a bulk action.
          </>,
          <>
            Anything reversible carries <strong>Undo</strong> in the toast. That is the only place
            the operator will look for it.
          </>,
          <>
            A toast is wrapped in a live region so a screen reader announces it. A visual-only
            confirmation is no confirmation.
          </>,
          <>
            Connection loss is <em>not</em> a toast. It is a persistent banner with a queued-write
            count, because it does not resolve on its own.
          </>,
        ],
      }}
    />
  )
}
