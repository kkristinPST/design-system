import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Bottom sheet',
    platform: 'Mobile',
    description:
      'Rises from the bottom edge with a 22px top radius and a slate-300 grip. Maximum 82% of the screen, so the context behind it is always partly visible.',
    preview: (
      <PhoneFrame className="relative p-0">
        <div className="p-4">
          {['DO-0403 · Dissolved oxygen low', 'PU-11A · Vibration high'].map((t) => (
            <div key={t} className="mb-2 rounded-[14px] border border-slate-200 bg-white px-3 py-2.5 text-[12px] text-slate-600">
              {t}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col justify-end bg-[rgba(15,24,43,0.4)]">
          <div className="flex max-h-[82%] flex-col rounded-t-[22px] bg-white px-4 pt-2 pb-5">
            <span className="mx-auto mt-1.5 mb-3 h-[5px] w-10 rounded-[3px] bg-slate-300" />
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[1px] text-slate-500">
              Quick actions
            </p>
            <div className="flex flex-col overflow-hidden rounded-[14px] border border-slate-200">
              {['Acknowledge', 'Shelve for 4 hours', 'Add a note', 'Open trend'].map((l, i, a) => (
                <button
                  key={l}
                  className={`flex min-h-[48px] items-center gap-[9px] px-3.5 py-3 text-left text-sm text-ink ${
                    i < a.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PhoneFrame>
    ),
    code: `<div className="absolute inset-0 z-[90] flex flex-col justify-end bg-[rgba(15,24,43,0.4)]">
  <div className="flex max-h-[82%] flex-col rounded-t-[22px] bg-white
    px-4 pt-2 pb-[calc(20px+env(safe-area-inset-bottom))]
    animate-[msheetin_280ms_cubic-bezier(.2,.8,.2,1)]">
    <span className="mx-auto mt-1.5 mb-3 h-[5px] w-10 rounded-[3px] bg-slate-300" />
    …
  </div>
</div>`,
  },
  {
    name: 'Search sheet',
    platform: 'Mobile',
    description:
      'The sheet form of search. A filled slate-100 well at the top, then a scrolling result list: the keyboard covers the lower half, so the field must be at the top.',
    preview: (
      <PhoneFrame className="relative p-0">
        <div className="h-[120px]" />
        <div className="absolute inset-0 flex flex-col justify-end bg-[rgba(15,24,43,0.4)]">
          <div className="flex max-h-[82%] flex-col rounded-t-[22px] bg-white px-4 pt-2 pb-5">
            <span className="mx-auto mt-1.5 mb-3 h-[5px] w-10 rounded-[3px] bg-slate-300" />
            <div className="mb-2.5 flex items-center gap-[9px] rounded-[13px] bg-slate-100 px-3.5 py-3">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
              </svg>
              <input
                defaultValue="TK-04"
                className="flex-1 border-none bg-transparent text-[15px] text-ink outline-none"
              />
            </div>
            <div className="overflow-y-auto">
              {[
                ['Tank TK-04', 'RAS 2 · 42 400 fish'],
                ['DO-0403', 'Dissolved oxygen · TK-04'],
                ['TK-04 feed schedule', 'Feeding · 6 cycles/day'],
              ].map(([t, s], i, a) => (
                <button
                  key={t}
                  className={`flex min-h-[48px] w-full items-center gap-[9px] px-1 py-3 text-left ${
                    i < a.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">{t}</span>
                    <span className="mt-0.5 block truncate text-[12px] text-slate-500">{s}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PhoneFrame>
    ),
    code: `<div className="mb-2.5 flex items-center gap-[9px] rounded-[13px] bg-slate-100 px-3.5 py-3">
  <SearchIcon />
  <input className="flex-1 bg-transparent text-[15px] text-ink outline-none" />
</div>
<div className="overflow-y-auto">{results}</div>`,
  },
  {
    name: 'Centred confirm',
    platform: 'Mobile',
    description:
      'A destructive confirm does not slide from the bottom: it pops in the centre with a 20px radius, so it is clearly a decision rather than a drawer of options.',
    preview: (
      <PhoneFrame className="relative p-0">
        <div className="h-[120px]" />
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(15,24,43,0.4)] px-4">
          <div className="w-full rounded-[20px] bg-white px-4 pt-4 pb-5">
            <p className="mt-1 mb-1.5 text-[17px] font-extrabold text-ink">Disable this alarm?</p>
            <p className="text-[13px] leading-relaxed text-slate-600">
              DO-0403 will stop annunciating until it is re-enabled from the desktop console.
            </p>
            <div className="mt-3.5 flex gap-[9px]">
              <button className="inline-flex h-[50px] flex-1 items-center justify-center rounded-[14px] border border-slate-200 bg-white text-sm font-bold text-ink">
                Cancel
              </button>
              <button className="inline-flex h-[50px] flex-1 items-center justify-center rounded-[14px] bg-critical text-sm font-bold text-white">
                Disable
              </button>
            </div>
          </div>
        </div>
      </PhoneFrame>
    ),
    code: `<div className="absolute inset-0 z-[90] flex items-center justify-center
  bg-[rgba(15,24,43,0.4)] px-4">
  <div className="w-full rounded-[20px] bg-white px-4 pt-4 pb-5
    animate-[mpop_240ms_ease]">
    <p className="text-[17px] font-extrabold text-ink">Disable this alarm?</p>
    <p className="text-[13px] leading-relaxed text-slate-600">{message}</p>
    <div className="mt-3.5 flex gap-[9px]"><Cancel /><Confirm /></div>
  </div>
</div>`,
  },
]

export default function BottomSheetPage() {
  return (
    <ComponentDoc
      title="Bottom sheet"
      intro={
        <>
          The mobile equivalent of a dialog. Options, pickers and search rise from the bottom edge
          within thumb reach; destructive confirms pop in the centre instead, because a decision
          should not appear where a swipe habitually lands.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['bottom-sheet']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Maximum height is 82%. A sheet that fills the screen is a page, and it should have been
            pushed onto the navigation stack instead.
          </>,
          <>
            Bottom padding is{' '}
            <code className="font-mono text-[12px]">calc(20px + env(safe-area-inset-bottom))</code>,
            so the last row clears the home indicator.
          </>,
          <>
            Any input goes at the <em>top</em> of the sheet. The keyboard takes the lower half, and
            a field below it is unreachable.
          </>,
          <>
            The grip is decorative; the sheet must also be dismissible by tapping the scrim. Never
            make a drag gesture the only way out.
          </>,
        ],
      }}
    />
  )
}
