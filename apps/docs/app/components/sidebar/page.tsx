import ComponentDoc, { type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const Ic = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d={d} />
  </svg>
)

const items = [
  { l: 'Overview', d: 'M3 12 12 4l9 8v8H3Z', on: false, n: 0 },
  { l: 'Alarms', d: 'M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6', on: true, n: 7 },
  { l: 'Process', d: 'M4 7h16M4 12h16M4 17h16', on: false, n: 0 },
  { l: 'Trends', d: 'm4 16 5-6 4 4 7-8', on: false, n: 0 },
  { l: 'Reports', d: 'M6 3h9l5 5v13H6Z', on: false, n: 0 },
]

const variants: Variant[] = [
  {
    name: 'Navigation rail',
    platform: 'Desktop',
    description:
      '240px of ink chrome. Items are 38px with an 8px radius; active and hover both take slate-800, and the label turns white. Muted labels use slate-350 — the ramp’s light end, because slate-400 only reaches 3.8:1 on this dark surface.',
    preview: (
      <div className="flex h-[420px] w-[240px] flex-col overflow-hidden rounded-lg bg-ink">
        <div className="flex h-[72px] items-center justify-between border-b border-white/[0.06] px-[22px]">
          <span className="text-[17px] font-extrabold tracking-[3px] text-white">NJORD</span>
          <button aria-label="Collapse" className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-350 hover:bg-slate-800">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-2.5 pb-1.5">
          {items.map(({ l, d, on, n }) => (
            <button
              key={l}
              className={`flex h-[38px] w-full items-center justify-between gap-3 rounded-md px-3 text-left transition-colors ${
                on ? 'bg-slate-800 text-white' : 'text-slate-350 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <Ic d={d} />
                <span className="whitespace-nowrap text-sm font-medium">{l}</span>
              </span>
              {n > 0 && (
                <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-critical-solid px-[5px] font-mono text-[10px] font-bold text-white">
                  {n}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button className="flex w-full items-center gap-3 border-t border-white/[0.08] px-[18px] py-3.5 text-left transition-colors hover:bg-slate-800">
          <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-slate-700 font-mono text-xs font-bold text-white">
            KB
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold text-white">Kari Berg</span>
            <span className="mt-px block whitespace-nowrap text-[11px] text-slate-350">Operator</span>
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#90A1B9" strokeWidth="2" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
        </button>
      </div>
    ),
    code: `<aside className="flex w-[240px] flex-col bg-ink">
  <div className="flex h-[72px] items-center justify-between border-b border-white/[0.06] px-[22px]">…</div>
  <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-2.5 pb-1.5">
    <button className={\`flex h-[38px] w-full items-center justify-between gap-3 rounded-md px-3
      \${on ? "bg-slate-800 text-white"
            : "text-slate-350 hover:bg-slate-800 hover:text-white"}\`}>
      <span className="flex items-center gap-3"><Icon /><span className="text-sm font-medium">{label}</span></span>
      <Badge count={7} />
    </button>
  </nav>
  <UserFooter />
</aside>`,
  },
  {
    name: 'Collapsed rail',
    platform: 'Desktop',
    description:
      '72px. Labels drop, items centre, and a count badge becomes an 8px dot pinned to the icon — a number would not fit without shrinking the target.',
    preview: (
      <div className="flex h-[420px] w-[72px] flex-col overflow-hidden rounded-lg bg-ink">
        <div className="flex h-[72px] items-center justify-center border-b border-white/[0.06]">
          <span className="text-[15px] font-extrabold tracking-[1px] text-white">NJ</span>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {items.map(({ l, d, on, n }) => (
            <button
              key={l}
              aria-label={l}
              className={`relative flex h-[38px] w-full items-center justify-center rounded-md transition-colors ${
                on ? 'bg-slate-800 text-white' : 'text-slate-350 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Ic d={d} />
              {n > 0 && <span className="absolute top-1.5 right-3.5 h-2 w-2 rounded-full bg-critical" />}
            </button>
          ))}
        </nav>
        <div className="flex items-center justify-center border-t border-white/[0.08] py-3.5">
          <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-slate-700 font-mono text-xs font-bold text-white">
            KB
          </span>
        </div>
      </div>
    ),
    code: `{/* collapsed: 72px, centred, badge becomes a dot */}
<button className="relative flex h-[38px] w-full items-center justify-center rounded-md">
  <Icon />
  <span className="absolute top-1.5 right-3.5 h-2 w-2 rounded-full bg-critical" />
</button>`,
  },
  {
    name: 'Account menu',
    platform: 'Desktop',
    description:
      'Opens upward from the footer. The panel is always dark chrome in every theme, so its contents use fixed light values rather than the slate ramp — that ramp inverts in dark mode.',
    preview: (
      <div className="w-[260px] rounded-[10px] border border-white/[0.16] bg-ink p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        <div className="mb-1.5 flex items-center gap-2.5 border-b border-white/[0.12] px-2.5 pt-2 pb-2.5">
          <span className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-slate-700 font-mono text-[11px] font-bold text-white">
            KB
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-[#F1F5FA]">Kari Berg</span>
            <span className="block text-[11px] text-[#B9C4D6]">Operator · Bergen</span>
          </span>
        </div>
        {['Profile & preferences', 'Notes', 'Help'].map((l) => (
          <button
            key={l}
            className="flex w-full items-center gap-2.5 whitespace-nowrap rounded-[7px] px-2.5 py-[9px] text-left text-[13px] font-medium text-[#E6EBF3] transition-colors hover:bg-white/10 hover:text-white"
          >
            {l}
          </button>
        ))}
        <button className="flex w-full items-center gap-2.5 rounded-[7px] px-2.5 py-[9px] text-left text-[13px] font-medium text-[#E6EBF3] hover:bg-white/10">
          Dark theme
          <span className="ml-auto rounded-full border border-primary bg-primary px-2 py-px text-[11px] font-bold text-primary-ink">
            On
          </span>
        </button>
        <div className="my-1.5 mx-1 h-px bg-white/[0.12]" />
        <button className="flex w-full items-center gap-2.5 rounded-[7px] px-2.5 py-[9px] text-left text-[13px] font-medium text-[#FF8078] transition-colors hover:bg-[rgba(248,113,113,0.18)] hover:text-white">
          Sign out
        </button>
      </div>
    ),
    code: `<div className="rounded-[10px] border border-white/[0.16] bg-ink p-1.5
  shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
  {/* fixed light values — NOT the slate ramp, which inverts in dark mode */}
  <button className="text-[13px] font-medium text-[#E6EBF3] hover:bg-white/10 hover:text-white">
    Profile &amp; preferences
  </button>
  <button className="text-[#FF8078] hover:bg-[rgba(248,113,113,0.18)]">Sign out</button>
</div>`,
  },
]

export default function SidebarPage() {
  return (
    <ComponentDoc
      title="Sidebar"
      intro={
        <>
          The primary navigation rail. Always dark ink chrome, 240px expanded and 72px collapsed,
          with the account footer pinned to the bottom. Alarm counts ride on the nav item they
          belong to so the operator sees them without opening the screen.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.sidebar}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The rail is dark in every theme, so its muted tone comes from the{' '}
            <em>light</em> end of the ramp (<code className="font-mono text-[12px]">slate-350</code>
            ). The slate-400 used on white pages only reaches 3.8:1 here.
          </>,
          <>
            Anything inside the account menu uses fixed light hexes, never ramp tokens — in dark
            mode <code className="font-mono text-[12px]">slate-200</code> becomes a near-black
            #28374F on a near-black panel.
          </>,
          <>
            Collapsed, the account menu flies out to the <em>right</em> of the rail at its own
            width. It cannot inherit the 72px rail width or it renders as a sliver.
          </>,
          <>
            In the legacy skin the rail flips to a light #E7EAED classic nav. Both are AA-clean;
            do not hard-code the dark background.
          </>,
        ],
      }}
    />
  )
}
