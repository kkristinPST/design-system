import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const bb =
  'inline-flex items-center gap-1.5 rounded-sm bg-white px-3 py-1.5 text-xs font-bold tracking-[0.3px] text-ink transition-colors hover:bg-slate-100'
const bbGhost =
  'inline-flex items-center gap-1.5 rounded-sm bg-transparent px-3 py-1.5 text-xs font-bold tracking-[0.3px] text-white/75 transition-colors hover:bg-slate-800 hover:text-white'

const variants: Variant[] = [
  {
    name: 'Bulk action bar',
    platform: 'Desktop',
    description:
      'Appears above a table once rows are selected. Dark ink surface, mono count on the left, actions on the right. It wraps rather than pushing a button off the card.',
    preview: (
      <div className="flex w-[620px] flex-wrap items-center gap-3 gap-y-2.5 rounded-md bg-ink px-4 py-2.5 text-white">
        <span className="font-mono text-[13px] font-bold">4 selected</span>
        <span className="ml-auto flex flex-wrap items-center gap-2">
          <button className={bb}>Acknowledge</button>
          <button className={bb}>Shelve</button>
          <button className={bbGhost}>Clear selection</button>
        </span>
      </div>
    ),
    code: `<div className="flex flex-wrap items-center gap-3 gap-y-2.5 rounded-md bg-ink
  px-4 py-2.5 text-white">
  <span className="font-mono text-[13px] font-bold">4 selected</span>
  <span className="ml-auto flex flex-wrap items-center gap-2">
    <button className="rounded-sm bg-white px-3 py-1.5 text-xs font-bold text-ink
      hover:bg-slate-100">Acknowledge</button>
    <button className="rounded-sm px-3 py-1.5 text-xs font-bold text-white/75
      hover:bg-slate-800 hover:text-white">Clear selection</button>
  </span>
</div>`,
  },
  {
    name: 'Flush inside a card',
    platform: 'Desktop',
    description:
      'When the bar is a direct child of a card it goes full-bleed: radius and bottom margin are dropped so it reads as a band, not a floating pill. As the first child it keeps the card’s top corners.',
    preview: (
      <div className="w-[620px] rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <div className="flex flex-wrap items-center gap-3 rounded-t-xl bg-ink px-4 py-2.5 text-white">
          <span className="font-mono text-[13px] font-bold">12 selected</span>
          <span className="ml-auto flex items-center gap-2">
            <button className={bb}>Enable</button>
            <button className={bbGhost}>Clear</button>
          </span>
        </div>
        <table className="w-full border-collapse">
          <tbody>
            {['DO-0403 · Dissolved oxygen low', 'PU-11A · Vibration high'].map((t) => (
              <tr key={t}>
                <td className="border-b border-slate-100 px-4 py-3 text-[13px] text-slate-600">{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    code: `{/* card > bulkbar : full-bleed band */}
<div className="rounded-t-xl bg-ink px-4 py-2.5 text-white">…</div>

/* CSS equivalent
   .card > .bulkbar             { border-radius: 0; margin-bottom: 0 }
   .card > .bulkbar:first-child { border-radius: var(--r-lg) var(--r-lg) 0 0 } */`,
  },
  {
    name: 'Mobile · floating bulk bar',
    platform: 'Mobile',
    description:
      'A rounded ink pill floating 12px inside the screen edges, sitting directly above the tab bar. Chips inside it go transparent with a light border so they read on the dark fill.',
    preview: (
      <PhoneFrame className="relative p-0">
        <div className="space-y-2 p-3 pb-2">
          {['DO-0403 · Dissolved oxygen low', 'PU-11A · Vibration high', 'FT-220 · Flow deviation'].map((t) => (
            <div key={t} className="rounded-[14px] border border-slate-200 bg-white px-3 py-2.5 text-[12px] text-slate-600">
              {t}
            </div>
          ))}
        </div>

        <div className="mx-3 mb-2 flex items-center gap-2 rounded-2xl bg-ink px-3.5 py-2.5 shadow-[0_10px_26px_rgba(15,24,43,0.34)]">
          <span className="flex-1 text-xs font-semibold text-[#E6EBF3]">
            <b className="text-sm text-white">3</b> selected
          </span>
          <button className="inline-flex min-h-[36px] items-center rounded-full border border-white/28 bg-transparent px-3 text-xs font-semibold text-[#E6EBF3]">
            Shelve
          </button>
          <button className="inline-flex h-10 shrink-0 items-center rounded-[14px] bg-success px-3.5 text-[13px] font-bold text-white">
            Ack
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
    code: `<div className="absolute inset-x-0 bottom-[calc(83px+env(safe-area-inset-bottom))] z-60
  mx-3 flex items-center gap-2 rounded-2xl bg-ink px-3.5 py-2.5
  shadow-[0_10px_26px_rgba(15,24,43,0.34)]">
  <span className="flex-1 text-xs font-semibold text-[#E6EBF3]">
    <b className="text-sm text-white">3</b> selected
  </span>
  <button className="min-h-[36px] rounded-full border border-white/28 px-3 text-xs
    font-semibold text-[#E6EBF3]">Shelve</button>
  <button className="h-10 rounded-[14px] bg-success px-3.5 text-[13px] font-bold text-white">Ack</button>
</div>`,
  },
]

export default function BulkBarPage() {
  return (
    <ComponentDoc
      title="Bulk bar"
      intro={
        <>
          Appears when rows are selected and carries the actions that apply to all of them. Dark
          ink on both builds; it is a temporary mode, and the dark surface says so. Desktop docks
          it above the table; mobile floats it above the tab bar.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['bulk-bar']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The count is mono and states the number explicitly. &ldquo;Selected&rdquo; without a
            number is not enough when the selection can span pages.
          </>,
          <>
            There is always a visible way out: a ghost &ldquo;Clear selection&rdquo;. Selection
            mode must never be a trap.
          </>,
          <>
            The bar wraps (<code className="font-mono text-[12px]">flex-wrap</code>, 10px row gap)
            so no action is ever pushed outside the card. Do not solve overflow by hiding buttons
            behind an overflow menu.
          </>,
          <>
            On mobile it sits above the tab bar using{' '}
            <code className="font-mono text-[12px]">env(safe-area-inset-bottom)</code>, so it clears
            the home indicator on every device.
          </>,
        ],
      }}
    />
  )
}
