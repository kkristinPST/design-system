import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const paths: Record<string, string> = {
  home: 'M3 12 12 4l9 8v8H3Z',
  alarms: 'M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6',
  tanks: 'M5 4h14v16H5Z M5 10h14',
  trends: 'm4 16 5-6 4 4 7-8',
  more: 'M4 12h16M4 6h16M4 18h16',
}

function TabBar({ active = 'alarms', badges = { alarms: 7 } as Record<string, number> }) {
  const tabs = ['home', 'alarms', 'tanks', 'trends', 'more']
  return (
    <div className="flex items-stretch border-t border-slate-200 bg-white px-1.5 pt-1.5 pb-[26px]">
      {tabs.map((k) => {
        const on = k === active
        const n = badges[k] ?? 0
        return (
          <button
            key={k}
            className={`relative flex flex-1 flex-col items-center gap-[3px] px-0.5 py-1.5 ${
              on ? 'text-primary-text' : 'text-slate-400'
            }`}
          >
            <span className="relative inline-flex">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={paths[k]} />
              </svg>
              {n > 0 && (
                <span className="absolute -top-[5px] -right-[9px] inline-flex h-4 min-w-[16px] items-center justify-center rounded-full border-[1.5px] border-white bg-critical-solid px-1 font-mono text-[10px] font-extrabold text-white">
                  {n}
                </span>
              )}
            </span>
            <span className="text-[10px] font-semibold capitalize tracking-[0.1px]">{k}</span>
          </button>
        )
      })}
    </div>
  )
}

const variants: Variant[] = [
  {
    name: 'Bottom tab bar',
    platform: 'Mobile',
    description:
      'Five destinations, icon over a 10px label. The active tab takes primary-text; the rest sit at slate-400. Bottom padding of 26px clears the home indicator.',
    preview: (
      <PhoneFrame className="p-0">
        <div className="p-6 text-center text-xs text-slate-400">screen content</div>
        <TabBar />
      </PhoneFrame>
    ),
    code: `<div className="flex items-stretch border-t border-slate-200 bg-white px-1.5 pt-1.5 pb-[26px]">
  <button className={\`flex flex-1 flex-col items-center gap-[3px] px-0.5 py-1.5
    \${on ? "text-primary-text" : "text-slate-400"}\`}>
    <span className="relative inline-flex">
      <Icon size={21} />
      {n > 0 && <TabBadge n={n} />}
    </span>
    <span className="text-[10px] font-semibold tracking-[0.1px]">{label}</span>
  </button>
</div>`,
  },
  {
    name: 'Tab badge',
    platform: 'Mobile',
    description:
      'A mono count pinned to the icon with a 1.5px border in the surface colour, so it stays legible where it overlaps. It counts unacknowledged alarms, not total alarms.',
    preview: (
      <PhoneFrame className="p-0">
        <TabBar active="home" badges={{ alarms: 12, trends: 3 }} />
      </PhoneFrame>
    ),
    code: `<span className="absolute -top-[5px] -right-[9px] inline-flex h-4 min-w-[16px]
  items-center justify-center rounded-full border-[1.5px] border-white bg-critical-solid
  px-1 font-mono text-[10px] font-extrabold text-white">
  {count}
</span>`,
  },
  {
    name: 'Segmented control',
    platform: 'Mobile',
    description:
      'In-screen switching, not navigation. A slate-100 track with 12px radius; the active pill lifts to the surface colour with a small shadow. Targets are 44px via an invisible pseudo-element.',
    preview: (
      <PhoneFrame className="p-4">
        <div className="flex gap-0.5 rounded-xl bg-slate-100 p-[3px]">
          {[
            { l: 'Active', on: true },
            { l: 'Shelved', on: false },
            { l: 'History', on: false },
          ].map(({ l, on }) => (
            <button
              key={l}
              className={`relative flex-1 whitespace-nowrap rounded-[9px] px-1.5 py-2 text-[12px] font-semibold ${
                on ? 'bg-white text-ink shadow-sm' : 'text-slate-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<div className="flex gap-0.5 rounded-xl bg-slate-100 p-[3px]">
  <button className={\`relative flex-1 rounded-[9px] px-1.5 py-2 text-[12px] font-semibold
    \${on ? "bg-white text-ink shadow-sm" : "text-slate-600"}\`}>
    Active
  </button>
</div>

/* 44px target without changing the ink:
   .m-seg button::before { content:""; position:absolute; left:50%; top:50%;
     transform:translate(-50%,-50%); min-width:44px; min-height:44px } */`,
  },
  {
    name: 'Variant switcher',
    platform: 'Mobile',
    description:
      'A dark ink strip used in the prototype to flip between screen variants. The active option takes the brand cyan; inactive options sit on a 10% white wash.',
    preview: (
      <PhoneFrame className="p-0">
        <div className="mx-4 my-3 flex items-center gap-2 rounded-xl bg-ink py-[7px] pl-3 pr-2 text-white">
          <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.6px] text-white/60">
            View
          </span>
          <span className="flex flex-1 gap-[3px] rounded-[9px] bg-white/10 p-[3px]">
            {[
              { l: 'List', on: true },
              { l: 'Map', on: false },
              { l: 'Stats', on: false },
            ].map(({ l, on }) => (
              <button
                key={l}
                className={`flex-1 rounded-[7px] px-1 py-1.5 text-xs font-bold ${
                  on ? 'bg-primary text-white' : 'text-white/70'
                }`}
              >
                {l}
              </button>
            ))}
          </span>
        </div>
      </PhoneFrame>
    ),
    code: `<div className="flex items-center gap-2 rounded-xl bg-ink py-[7px] pl-3 pr-2 text-white">
  <span className="text-[10px] font-extrabold uppercase tracking-[0.6px] text-white/60">View</span>
  <span className="flex flex-1 gap-[3px] rounded-[9px] bg-white/10 p-[3px]">
    <button className={on ? "bg-primary text-white" : "text-white/70"}>List</button>
  </span>
</div>`,
  },
]

export default function TabBarPage() {
  return (
    <ComponentDoc
      title="Tab bar"
      intro={
        <>
          The mobile counterpart of the desktop sidebar. Five fixed destinations at the bottom of
          the screen, plus the segmented control used for switching views <em>within</em> a screen.
          The two are different things and must not be swapped.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['tab-bar']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The tab bar navigates between screens; the segmented control filters inside one. Using a
            segmented control for navigation loses the back stack.
          </>,
          <>
            Five destinations maximum. A sixth belongs behind &ldquo;More&rdquo;.
          </>,
          <>
            Bottom padding is 26px plus{' '}
            <code className="font-mono text-[12px]">env(safe-area-inset-bottom)</code> so the labels
            clear the home indicator on every device.
          </>,
          <>
            The badge counts <em>unacknowledged</em> alarms. A count that includes acknowledged
            alarms never reaches zero, and a badge that never clears stops being read.
          </>,
        ],
      }}
    />
  )
}
