import TemplateSpec from '../../../components/TemplateSpec'

import ShellPreview from '../../../components/ShellPreview'
import NjIcon from '../../../components/NjIcon'
import { asset } from '../../../components/asset'

/* The nine facility-wide routes, exactly as NAV is declared in lib/chrome.jsx. */
const NAV = [
  { id: 'start', label: 'Dashboard', icon: 'home' },
  { id: 'navigation', label: 'Site Plan', icon: 'map' },
  { id: 'alarms', label: 'Alarms', icon: 'bell-ring', badge: 4 },
  { id: 'maneuver', label: 'Maneuver History', icon: 'history' },
  { id: 'reports', label: 'Reports', icon: 'file-text' },
  { id: 'feeding', label: 'Fish Feeding', icon: 'utensils' },
  { id: 'biology', label: 'Fish Biology', icon: 'fish' },
  { id: 'analytics', label: 'Analytics', icon: 'line-chart' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

const KPIS = [
  { l: 'Active alarms', v: '7', u: '', d: '+2 vs 24h', dir: 'down' },
  { l: 'Recirculation', v: '1 284', u: 'm³/h', d: '−1.2%', dir: 'flat' },
  { l: 'Feed today', v: '318', u: 'kg', d: '+4.1%', dir: 'up' },
  { l: 'Mean O₂', v: '8.1', u: 'mg/L', d: 'stable', dir: 'flat' },
]

const FEED = [
  { a: 'Dissolved oxygen low-low', tag: 'DO-0403', area: 'DPT1 Fish Tank', dot: 'var(--color-sev-crit)', age: '4h' },
  { a: 'Pump vibration high', tag: 'PU-11A', area: 'DPT3 Pump Sump', dot: 'var(--color-sev-high)', age: '38h' },
  { a: 'Flow deviation from setpoint', tag: 'FT-0220', area: 'Water Treatment', dot: 'var(--color-sev-med)', age: '21m' },
  { a: 'Lye dosing tank level low', tag: 'LT-0881', area: 'Lye Dosing', dot: 'var(--color-sev-high)', age: '1h' },
]

export default function DashboardTemplatePage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Templates</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Dashboard</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        The desktop shell: 240px sidebar, 64px top bar, the annunciator ribbon, then content. Every
        screen in the console is this frame with a different body. The preview below is the real
        1440&times;900 layout scaled to fit; every measurement in it is a true source value.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
        <ShellPreview width={1440} height={900} scale={0.597}>
          <div className="flex h-[900px] w-[1440px] bg-slate-50 font-sans">
            {/* ── Sidebar · 240px ── */}
            <aside className="flex w-[240px] shrink-0 flex-col bg-ink">
              <div className="flex h-[72px] items-center justify-between border-b border-white/[0.06] px-[22px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset('/njord-wordmark.png')} alt="NJORD" className="h-[26px] w-auto" />
                <button className="flex h-7 w-7 items-center justify-center rounded-md" aria-label="Collapse sidebar">
                  <NjIcon name="chevrons-left" size={18} color="var(--color-slate-400)" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-2.5 pb-1.5">
                {NAV.map((n) => {
                  const active = n.id === 'start'
                  return (
                    <button
                      key={n.id}
                      className={`flex h-[38px] w-full items-center justify-between gap-3 rounded-md px-3 text-left ${
                        active ? 'bg-slate-800 text-white' : 'text-slate-350'
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <NjIcon name={n.icon} size={18} />
                        <span className="whitespace-nowrap text-sm font-medium">{n.label}</span>
                      </span>
                      {n.badge ? (
                        <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-critical-solid px-[5px] font-mono text-[10px] font-bold text-white">
                          {n.badge}
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </nav>

              <button className="flex w-full items-center gap-3 border-t border-white/[0.08] px-[18px] py-3.5 text-left">
                <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-slate-700 font-mono text-xs font-bold text-white">
                  ES
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-white">E. Sørensen</span>
                  <span className="mt-px block whitespace-nowrap text-[11px] text-slate-350">Shift Supervisor</span>
                </span>
                <NjIcon name="chevron-up" size={15} color="var(--color-slate-400)" />
              </button>
            </aside>

            {/* ── Main ── */}
            <div className="flex min-w-0 flex-1 flex-col">
              {/* Top bar · 64px */}
              <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-7">
                <div className="flex min-w-0 flex-1 items-center gap-2.5 whitespace-nowrap">
                  <span className="h-[9px] w-[9px] shrink-0 rounded-full" style={{ background: 'var(--color-sev-ok)' }} />
                  <button className="inline-flex items-center gap-1 rounded-sm px-[7px] py-[3px] text-[13px] font-semibold text-slate-600">
                    Building 1
                    <NjIcon name="chevron-down" size={13} color="var(--color-slate-400)" />
                  </button>
                  <NjIcon name="chevron-right" size={15} color="var(--color-slate-300)" />
                  <button className="inline-flex items-center gap-1 rounded-sm px-[7px] py-[3px] text-[13px] font-semibold text-slate-600">
                    DPT1
                    <NjIcon name="chevron-down" size={13} color="var(--color-slate-400)" />
                  </button>
                  <NjIcon name="chevron-right" size={15} color="var(--color-slate-300)" />
                  <h1 className="m-0 min-w-[7ch] shrink truncate text-[19px] font-bold tracking-[-0.25px] text-ink">
                    Dashboard
                  </h1>
                </div>

                <div className="flex shrink-0 items-center gap-[18px]">
                  <span className="whitespace-nowrap font-mono text-xs font-medium tracking-[0.2px] text-slate-500">
                    04 Mar 2026 · 14:32
                  </span>
                  <button className="inline-flex h-[34px] items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-[13px] text-slate-500">
                    <NjIcon name="search" size={15} color="var(--color-slate-500)" />
                    <span className="font-medium">Search</span>
                    <span className="rounded-[5px] border border-slate-200 bg-white px-[5px] font-mono text-[11px] font-semibold text-slate-400">
                      ⌘K
                    </span>
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-critical-solid px-[9px] py-1 font-mono text-xs font-bold text-white">
                    <span className="h-[7px] w-[7px] rounded-full bg-white" />2
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-warning-bg px-[9px] py-1 font-mono text-xs font-bold text-warning-text">
                    <span className="h-[7px] w-[7px] rounded-full bg-warning" />5
                  </button>
                  <button className="relative flex h-10 w-10 items-center justify-center rounded-sm text-slate-600" aria-label="Alarms">
                    <NjIcon name="bell" size={19} />
                    <span className="absolute top-[3px] right-[5px] inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-critical-solid px-[3px] font-mono text-[9px] font-bold leading-[16px] text-white shadow-[0_0_0_2px_#fff]">
                      4
                    </span>
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-sm text-slate-600" aria-label="Notes">
                    <NjIcon name="notebook-pen" size={19} />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-sm text-slate-600" aria-label="Maneuver history">
                    <NjIcon name="history" size={19} />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-sm text-slate-600" aria-label="Help">
                    <NjIcon name="help-circle" size={19} />
                  </button>
                </div>
              </div>

              {/* Annunciator */}
              <div className="grid min-h-[56px] shrink-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5 border-b border-slate-200 border-l-4 border-l-critical bg-critical-bg py-2 pl-6 pr-5">
                <span className="shrink-0 rounded-sm bg-critical-solid px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.6px] text-white">
                  Critical
                </span>
                <button className="flex min-w-0 flex-col items-start gap-[3px] py-0.5 text-left">
                  <span className="block max-w-full truncate text-[14px] font-bold text-ink">
                    Dissolved oxygen low-low
                  </span>
                  <span className="flex max-w-full flex-wrap items-baseline gap-[9px] text-[11px]">
                    <span className="font-mono text-[11px] tracking-[0.3px] text-slate-600">DO-0403</span>
                    <span className="font-medium text-slate-600">· DPT1 Fish Tank</span>
                    <span className="font-mono text-slate-600">· 4h</span>
                  </span>
                </button>
                <div className="flex shrink-0 items-center gap-2.5">
                  <button className="inline-flex min-h-[34px] items-center gap-1.5 rounded-md bg-ink px-3.5 text-xs font-bold text-white">
                    <NjIcon name="check" size={15} />
                    Acknowledge
                  </button>
                  <button className="inline-flex min-h-[34px] items-center gap-1.5 whitespace-nowrap px-1.5 text-xs font-semibold text-primary-text">
                    +3 more unacknowledged
                    <NjIcon name="arrow-up-right" size={13} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="min-h-0 flex-1 overflow-hidden px-8 pt-7 pb-10">
                <div className="mb-4 grid grid-cols-4 gap-4">
                  {KPIS.map(({ l, v, u, d, dir }) => (
                    <div key={l} className="rounded-xl border border-slate-200 bg-white px-[18px] py-4 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]">
                      <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">{l}</span>
                        <NjIcon name="arrow-up-right" size={17} color="var(--color-slate-400)" />
                      </div>
                      <div className="mt-3 mb-[5px] flex items-baseline gap-[5px]">
                        <span className="font-mono text-2xl tracking-[-0.5px] text-ink tabular-nums">{v}</span>
                        {u && <span className="text-xs text-slate-600">{u}</span>}
                      </div>
                      <div
                        className="font-mono text-xs tabular-nums"
                        style={{
                          color:
                            dir === 'down'
                              ? 'var(--color-critical-text)'
                              : dir === 'up'
                                ? 'var(--color-success-text)'
                                : 'var(--color-fg-muted)',
                        }}
                      >
                        {d}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-[minmax(0,1fr)_352px] gap-4">
                  <div className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                      <span className="flex items-center gap-2.5">
                        <NjIcon name="bell-ring" size={17} color="var(--color-slate-600)" />
                        <span className="text-[15px] font-bold text-ink">Active alarms</span>
                      </span>
                      <button className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary-text">
                        View all <NjIcon name="arrow-up-right" size={14} />
                      </button>
                    </div>
                    <div className="px-5 py-[18px]">
                      {FEED.map(({ a, tag, area, dot, age }) => (
                        <div key={tag} className="flex items-center gap-3 border-b border-slate-100 py-2.5 last:border-b-0">
                          <span className="h-[9px] w-[9px] shrink-0 rounded-full shadow-[0_0_0_1px_rgba(15,24,43,0.16)]" style={{ background: dot }} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-medium text-ink">{a}</span>
                            <span className="mt-0.5 block text-[11px] text-slate-500">
                              <span className="font-mono">{tag}</span> · {area}
                            </span>
                          </span>
                          <span className="shrink-0 font-mono text-xs text-slate-500 tabular-nums">{age}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]">
                      <div className="flex items-center gap-2.5 border-b border-slate-200 px-5 py-4">
                        <NjIcon name="map" size={17} color="var(--color-slate-600)" />
                        <span className="text-[15px] font-bold text-ink">Facility</span>
                      </div>
                      <div className="px-5 py-[18px]">
                        {[
                          ['Building 1', '3 departments', 'var(--color-sev-ok)'],
                          ['Building 2', '3 departments', 'var(--color-sev-crit)'],
                          ['Building 3', '3 departments', 'var(--color-sev-ok)'],
                        ].map(([n, m, dot]) => (
                          <div key={n} className="flex items-center gap-2.5 border-b border-slate-100 py-2.5 last:border-b-0">
                            <span className="h-[9px] w-[9px] shrink-0 rounded-full shadow-[0_0_0_1px_rgba(15,24,43,0.16)]" style={{ background: dot }} />
                            <span className="flex-1 text-[13px] font-medium text-ink">{n}</span>
                            <span className="text-[11px] text-slate-400">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]">
                      <div className="flex items-center gap-2.5 border-b border-slate-200 px-5 py-4">
                        <NjIcon name="notebook-pen" size={17} color="var(--color-slate-600)" />
                        <span className="text-[15px] font-bold text-ink">Shift notes</span>
                      </div>
                      <div className="px-5 py-[18px]">
                        <p className="text-[13px] leading-relaxed text-slate-600">
                          DO in DPT1 has been drifting low all evening. Trend attached: keep an eye
                          on it after the 02:00 feed.
                        </p>
                        <p className="mt-2.5 text-[12px] text-slate-400">E. Sørensen · 2h ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ShellPreview>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Anatomy</p>
        <ul className="mt-3 space-y-2">
          {[
            <><strong>Sidebar · 240px</strong>: the NJORD wordmark at 26px in a 72px band, then the nine facility-wide routes (Dashboard, Site Plan, Alarms, Maneuver History, Reports, Fish Feeding, Fish Biology, Analytics, Settings). The unacknowledged count rides on Alarms. Account footer pinned to the bottom.</>,
            <><strong>Top bar · 64px</strong>: left: system-status dot, then <em>Building ▾ › Department ▾</em> as interactive scope dropdowns, then the page title. Right, in order: facility clock, search trigger, critical count pill, high count pill, bell with unacknowledged badge, then Notes, Maneuver history and Help.</>,
            <><strong>Annunciator</strong>: always present. Severity chip, alarm name over tag / area / age, Acknowledge, and the overflow count.</>,
            <><strong>Content</strong>: fluid gutters, a 4-up KPI row, then a main pane beside a clamped 352px rail.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        The scope dropdowns are the only navigation that changes <em>what data</em> a screen shows.
        The sidebar changes <em>which screen</em>. Screens carry no in-page{' '}
        <code className="font-mono text-[11px]">h1</code>; the top bar title is the document
        heading.
      </div>
      <TemplateSpec
        uses={['sidebar', 'top-bar', 'alarm-ribbon', 'kpi-card', 'card', 'trend-chart', 'sparkline', 'quick-links', 'list-row', 'status-dot', 'badge', 'tag']}
        viewPath="views/Njord/Templates/Dashboard/view.json"
        tree={`Dashboard (Flex column, 100vh)
├── Sidebar            embedded view · fixed 240px, full height
└── Flex column (grow)
    ├── TopBar         embedded view · fixed 64px
    ├── AlarmRibbon    embedded view · auto height, ALWAYS mounted
    └── Flex column    scroll container · fluid gutters via clamp()
        ├── KpiRow     flex wrap · 4 × KpiCard, basis 0 grow 1
        └── Flex row   gap 16
            ├── Main   grow 1 · charts and tables
            └── Rail   basis 352px, shrink 0 · activity and quick links

The shell — sidebar, top bar, ribbon — is the SAME frame on every desktop
screen. Build it once as a wrapper view and embed the body, rather than
rebuilding the chrome on each screen.`}
        reflow={[
          ['1400', 'Card grids step 4 → 3 columns'],
          ['1240', 'Top bar drops the search label and the keyboard shortcut cap'],
          ['1180', 'The 4-up KPI row splits 2×2; main and rail stack'],
          ['1100', 'Card grids step to 2 columns'],
          ['1080', 'Top bar drops the crumb trail and the clock'],
          ['980', 'Alarm ribbon actions move to their own row'],
        ]}
        watchFor={[
          <>
            The ribbon is <strong>always mounted</strong>, including when nothing is in alarm; it
            collapses to an all-clear line. A ribbon that disappears trains operators to stop
            looking at that band.
          </>,
          <>
            The unacknowledged count on the Alarms nav item must come from the same query as the
            ribbon, or the two will disagree on screen.
          </>,
          <>
            KPI cards use <code className="font-mono text-[12px]">basis: 0; grow: 1</code>, not a
            fixed width; otherwise the row will not split cleanly at 1180.
          </>,
          <>The scroll container is the content column, not the page. The shell never scrolls.</>,
        ]}
      />
    </div>
  )
}
