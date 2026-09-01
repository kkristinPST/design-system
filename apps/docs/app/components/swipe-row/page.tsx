import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const Check = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function Row({ offset = 0, stale = false }: { offset?: number; stale?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[14px]">
      <div className="absolute inset-0 flex items-center justify-end gap-[7px] bg-success-solid pr-5 text-[13px] font-bold text-white">
        <Check />
        Acknowledge
      </div>
      <div
        className="relative flex touch-pan-y items-start gap-[11px] rounded-[14px] border border-slate-200 bg-white px-[13px] py-3 transition-transform duration-[180ms]"
        style={{ transform: `translateX(${offset}px)` }}
      >
        <span className="absolute inset-y-0 left-0 w-1 rounded-l bg-sev-crit" />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-[7px]">
            <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-slate-600">RAS 2</span>
            <span className="shrink-0 font-mono text-[11px] text-slate-400 tabular-nums">04:12</span>
          </div>
          <p className="text-[14px] font-semibold leading-tight text-ink">
            Dissolved oxygen low-low
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="font-mono text-[12px] font-semibold text-ink tabular-nums">6.2 mg/L</span>
            {stale && (
              <span className="inline-flex items-center gap-[3px] text-[10px] font-bold text-critical-text">
                Stale
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const variants: Variant[] = [
  {
    name: 'Rest state',
    platform: 'Mobile',
    description:
      'At rest the row looks like any alarm card. The action layer sits underneath, fully rendered but hidden by the card on top of it.',
    preview: (
      <PhoneFrame className="border-none bg-transparent p-0 shadow-none">
        <Row />
      </PhoneFrame>
    ),
    code: `<div className="relative overflow-hidden rounded-[14px]">
  {/* action layer — always rendered, revealed by translating the card */}
  <div className="absolute inset-0 flex items-center justify-end gap-[7px] bg-success-solid
    pr-5 text-[13px] font-bold text-white">
    <CheckIcon /> Acknowledge
  </div>

  {/* the card */}
  <div className="relative flex touch-pan-y items-start gap-[11px] rounded-[14px]
    border border-slate-200 bg-white px-[13px] py-3 transition-transform duration-[180ms]"
    style={{ transform: \`translateX(\${offset}px)\` }}>
    …
  </div>
</div>`,
  },
  {
    name: 'Swiped — action revealed',
    platform: 'Mobile',
    description:
      'Dragging left reveals the acknowledge layer on success-solid (#00734C), not the bright indicator green — white on the bare success token is only 2.3:1.',
    preview: (
      <PhoneFrame className="border-none bg-transparent p-0 shadow-none">
        <div className="flex flex-col gap-2">
          <Row offset={-92} />
          <Row offset={-150} stale />
        </div>
      </PhoneFrame>
    ),
    code: `{/* the reveal uses success-solid — NOT the bare success indicator green,
    which cannot carry white text (2.3:1) */}
<div className="absolute inset-0 bg-success-solid text-white">…</div>`,
  },
  {
    name: 'With the list',
    platform: 'Mobile',
    description:
      'Only the top row is swipeable at a time. Vertical scrolling is preserved with touch-action: pan-y, so a slightly-off drag scrolls the list rather than triggering an action.',
    preview: (
      <PhoneFrame className="border-none bg-transparent p-0 shadow-none">
        <div className="flex flex-col gap-2">
          <Row offset={-64} />
          <Row />
          <div className="relative overflow-hidden rounded-[14px] border border-slate-200 bg-white px-[13px] py-3">
            <span className="absolute inset-y-0 left-0 w-1 rounded-l bg-sev-high" />
            <div className="mb-1 flex items-center gap-[7px]">
              <span className="flex-1 truncate text-[11px] font-bold text-slate-600">Pump sump</span>
              <span className="font-mono text-[11px] text-slate-400 tabular-nums">38:04</span>
            </div>
            <p className="text-[14px] font-semibold leading-tight text-ink">Pump vibration high</p>
          </div>
        </div>
      </PhoneFrame>
    ),
    code: `{/* touch-action: pan-y keeps vertical scroll working while the row
    handles horizontal drags */}
<div className="touch-pan-y">…</div>`,
  },
]

export default function SwipeRowPage() {
  return (
    <ComponentDoc
      title="Swipe row"
      intro={
        <>
          A mobile alarm row that reveals acknowledge when dragged left. It is a shortcut for the
          most frequent action on the most frequent screen — never the only way to perform it.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['swipe-row']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Swipe is always a <strong>shortcut</strong>. The same action must exist as a button in
            the detail screen and in the bulk bar — a hidden gesture cannot be the only path.
          </>,
          <>
            The reveal uses <code className="font-mono text-[12px]">success-solid</code> (#00734C).
            The bright <code className="font-mono text-[12px]">success</code> indicator green is
            2.3:1 against white and must never carry a label.
          </>,
          <>
            <code className="font-mono text-[12px]">touch-action: pan-y</code> keeps the list
            scrollable. Without it a near-vertical drag is swallowed by the row.
          </>,
          <>
            Only non-destructive actions are swipeable. Disabling an alarm needs a confirm, and a
            confirm behind a gesture is an accident waiting to happen.
          </>,
          <>
            Every swipe fires a toast with Undo, because a gesture is much easier to trigger by
            mistake than a button.
          </>,
        ],
      }}
    />
  )
}
