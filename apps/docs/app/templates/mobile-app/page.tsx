import TemplateSpec from '../../../components/TemplateSpec'

import NjPhone, { MRibbon, MHead } from '../../../components/NjPhone'
import NjIcon from '../../../components/NjIcon'

const ALARMS = [
  { s: 'Crit', b: 'bg-critical-solid text-white', rail: 'bg-sev-crit', area: 'DPT1 Fish Tank', t: '04:12', a: 'Dissolved oxygen low-low', tag: 'DO-0403', v: '6.2 mg/L', stale: false },
  { s: 'High', b: 'bg-warning-bg text-warning-text', rail: 'bg-sev-high', area: 'DPT3 Pump Sump', t: '38:04', a: 'Pump vibration high', tag: 'PU-11A', v: '7.8 mm/s', stale: true },
  { s: 'Med', b: 'bg-medium-bg text-medium-text', rail: 'bg-sev-med', area: 'Water Treatment', t: '00:21', a: 'Flow deviation from setpoint', tag: 'FT-0220', v: '284 m³/h', stale: false },
  { s: 'High', b: 'bg-warning-bg text-warning-text', rail: 'bg-sev-high', area: 'Lye Dosing', t: '01:04', a: 'Lye tank level low', tag: 'LT-0881', v: '18 %', stale: false },
]

const VITALS = [
  { l: 'Dissolved O₂', v: '6.2', u: 'mg/L', s: 'Below band', st: 'critical' },
  { l: 'Temperature', v: '12.4', u: '°C', s: 'In band', st: 'ok' },
  { l: 'pH', v: '7.1', u: '', s: 'In band', st: 'ok' },
  { l: 'Flow', v: '284', u: 'm³/h', s: 'Trending down', st: 'high' },
]

export default function MobileAppTemplatePage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Templates</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Mobile app</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        The field build: an iPhone 16 Pro shell: a 393&times;852 screen inside a 413&times;872
        device. The frames below are drawn at those exact dimensions and scaled as a whole, so
        every proportion matches the running prototype.
      </p>

      <div className="mt-8 flex flex-wrap gap-6">
        {/* ── Alarm list ── */}
        <NjPhone caption="Alarm list" active="Alarms">
          <MRibbon />
          <MHead title="Alarms" sub="Building 1 · DPT1 · 7 active" actions={['search', 'filter']} />

          {/* filter chips */}
          <div className="flex flex-none gap-[7px] overflow-hidden px-4 py-1">
            {[
              ['All', 21, true],
              ['Critical', 2, false],
              ['High', 5, false],
              ['Medium', 11, false],
            ].map(([l, n, on]) => (
              <span
                key={l as string}
                className={`inline-flex min-h-[38px] flex-none items-center gap-[5px] rounded-full border px-3 text-xs font-semibold ${
                  on ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                {l}
                <span className={`font-mono text-[11px] font-extrabold ${on ? 'text-white/70' : 'text-slate-500'}`}>
                  {n}
                </span>
              </span>
            ))}
          </div>

          {/* scroll region */}
          <div className="min-h-0 flex-1 overflow-hidden px-4 pt-2 pb-6">
            <div className="flex flex-col gap-2">
              {ALARMS.map((r) => (
                <div key={r.tag} className="relative overflow-hidden rounded-[14px] border border-slate-200 bg-white px-[13px] py-3">
                  <span className={`absolute inset-y-0 left-0 w-1 rounded-l ${r.rail}`} />
                  <div className="mb-1 flex flex-wrap items-center gap-[7px]">
                    <span className={`flex-none rounded-[5px] px-1.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.5px] ${r.b}`}>
                      {r.s}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-slate-600">{r.area}</span>
                    <span className="flex-none font-mono text-[11px] text-slate-400 tabular-nums">{r.t}</span>
                  </div>
                  <p className="text-[14px] font-semibold leading-tight text-ink">{r.a}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="font-mono text-[11px] tracking-[0.3px] text-slate-500">{r.tag}</span>
                    <span className="font-mono text-[12px] font-semibold text-ink tabular-nums">{r.v}</span>
                    {r.stale && (
                      <span className="inline-flex items-center gap-[3px] text-[10px] font-bold text-critical-text">
                        <NjIcon name="history" size={10} strokeWidth={3} />
                        Stale
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </NjPhone>

        {/* ── Tank detail ── */}
        <NjPhone caption="Tank detail" active="Tanks">
          <MRibbon />
          <MHead title="Fish Tank 04" sub="Building 1 · DPT1 · 42 400 fish" back actions={['more']} />

          <div className="min-h-0 flex-1 overflow-hidden px-4 pb-6">
            <p className="mx-1 mb-[9px] mt-[18px] text-[10px] font-extrabold uppercase tracking-[1px] text-slate-400">
              Vitals
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {VITALS.map(({ l, v, u, s, st }) => (
                <div
                  key={l}
                  className={`relative overflow-hidden rounded-2xl border bg-white px-3.5 py-[13px] ${
                    st === 'critical' ? 'border-critical-mid' : st === 'high' ? 'border-warning-mid' : 'border-slate-200'
                  }`}
                >
                  {st !== 'ok' && (
                    <span className={`absolute inset-y-0 left-0 w-1 ${st === 'critical' ? 'bg-critical' : 'bg-warning'}`} />
                  )}
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.6px] text-slate-400">{l}</p>
                  <p className="mt-[9px] font-mono text-[30px] font-semibold leading-none tracking-[-1px] text-ink tabular-nums">
                    {v}
                    {u && <span className="ml-0.5 text-sm font-medium text-slate-400">{u}</span>}
                  </p>
                  <p
                    className={`mt-[7px] text-[11px] leading-tight ${
                      st === 'critical'
                        ? 'font-semibold text-critical-text'
                        : st === 'high'
                          ? 'font-semibold text-warning-text'
                          : 'text-slate-500'
                    }`}
                  >
                    {s}
                  </p>
                </div>
              ))}
            </div>

            <p className="mx-1 mb-[9px] mt-[18px] text-[10px] font-extrabold uppercase tracking-[1px] text-slate-400">
              Details
            </p>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {[
                ['Feeding', 'Next 14:30'],
                ['Biomass', '18 420 kg'],
                ['Density', '42 kg/m³'],
                ['Notes', '2 this shift'],
              ].map(([l, v], i, a) => (
                <div
                  key={l}
                  className={`flex min-h-[48px] items-center gap-[9px] px-3.5 py-3 ${
                    i < a.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <span className="flex-1 text-[12px] font-semibold text-slate-600">{l}</span>
                  <span className="font-mono text-sm font-bold text-ink tabular-nums">{v}</span>
                  <NjIcon name="chevron-right" size={16} color="var(--color-slate-400)" />
                </div>
              ))}
            </div>
          </div>
        </NjPhone>

        {/* ── Bottom sheet ── */}
        <NjPhone caption="Quick actions sheet" active="Alarms">
          <MRibbon />
          <MHead title="Alarms" sub="Building 1 · DPT1 · 7 active" />
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div className="px-4">
              <div className="flex flex-col gap-2">
                {ALARMS.slice(0, 3).map((r) => (
                  <div key={r.tag} className="relative overflow-hidden rounded-[14px] border border-slate-200 bg-white px-[13px] py-3">
                    <span className={`absolute inset-y-0 left-0 w-1 rounded-l ${r.rail}`} />
                    <p className="text-[14px] font-semibold leading-tight text-ink">{r.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* scrim + sheet */}
            <div className="absolute inset-0 z-[90] flex flex-col justify-end bg-[rgba(15,24,43,0.4)]">
              <div className="flex max-h-[82%] flex-col rounded-t-[22px] bg-white px-4 pt-2 pb-5">
                <span className="mx-auto mb-3 mt-1.5 h-[5px] w-10 flex-none rounded-[3px] bg-slate-300" />
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[1px] text-slate-500">
                  Dissolved oxygen low-low
                </p>
                <div className="flex flex-col overflow-hidden rounded-[14px] border border-slate-200">
                  {[
                    ['Acknowledge', 'check'],
                    ['Shelve for 4 hours', 'history'],
                    ['Add a note', 'notebook-pen'],
                    ['Open trend', 'line-chart'],
                  ].map(([l, ic], i, a) => (
                    <button
                      key={l}
                      className={`flex min-h-[48px] items-center gap-[9px] px-3.5 py-3 text-left text-sm text-ink ${
                        i < a.length - 1 ? 'border-b border-slate-100' : ''
                      }`}
                    >
                      <NjIcon name={ic} size={17} color="var(--color-slate-600)" />
                      {l}
                    </button>
                  ))}
                </div>
                <div className="mt-3.5 flex gap-[9px]">
                  <button className="inline-flex h-[50px] flex-1 items-center justify-center rounded-[14px] border border-slate-200 bg-white text-sm font-bold text-ink">
                    Cancel
                  </button>
                  <button className="inline-flex h-[50px] flex-1 items-center justify-center gap-[7px] rounded-[14px] bg-success text-sm font-bold text-white">
                    <NjIcon name="check" size={17} strokeWidth={3} />
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </NjPhone>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Anatomy</p>
        <ul className="mt-3 space-y-2">
          {[
            <><strong>Device</strong>: 413&times;872 with a 56px radius; the screen is 393&times;852 at 47px inside 10px of bezel. Dynamic island 126&times;36 at the top, home indicator 140&times;5 at the bottom.</>,
            <><strong>Status bar · 54px</strong>: 15px semibold time on the left, indicators on the right, 32px / 34px side padding so nothing sits under the island.</>,
            <><strong>Alarm ribbon</strong>: pinned under the status bar on every screen with a 4px severity rail and an overflow count. Collapses to an all-clear line; never disappears.</>,
            <><strong>Screen header</strong>: 24px / 800 title at -0.5px tracking, optional back arrow and subtitle, 40px icon buttons carrying 44px targets.</>,
            <><strong>Scroll region</strong>: the only scrolling area, 16px gutters, contained overscroll and a hidden scrollbar.</>,
            <><strong>Tab bar</strong>: five destinations, 21px glyphs over 10px labels, unacknowledged count on Alarms, 26px bottom padding plus the safe-area inset.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <TemplateSpec
        uses={['alarm-ribbon', 'tab-bar', 'list-row', 'swipe-row', 'bottom-sheet', 'param-row', 'toast', 'status-dot', 'badge', 'state-tag', 'empty-state', 'stepper', 'toggle-switch']}
        viewPath="views/Njord/Mobile/Shell/view.json"
        tree={`Shell (393 × 852 — a session-scoped mobile layout, NOT the desktop views reflowed)
└── Flex column, 100vh
    ├── StatusBar      54px · 32/34px side padding, clear of the island
    ├── AlarmRibbon    pinned · 4px severity rail + overflow count
    ├── ScreenHeader   24px/800 title, optional back arrow, 40px icon buttons
    ├── ScrollRegion   grow 1 · THE only scrolling area, 16px gutters
    └── TabBar         5 destinations · 21px glyphs over 10px labels
                       26px bottom padding + safe-area inset

The phone build shares every token but rebuilds the layouts: tables become
cards, dialogs become bottom sheets, the mimic becomes a list of readings.`}
        reflow={[
          ['393', 'The design width · an iPhone 16 Pro screen'],
          ['≥ 430', 'Gutters grow; content max-width holds so lines stay readable'],
          ['≤ 375', 'Two-up stat rows stack; nothing else changes'],
        ]}
        watchFor={[
          <>
            <strong>Touch targets are 44px minimum</strong> even where the visible control is 40px.
            This screen is used in gloves, on a walkway, in weather.
          </>,
          <>
            The alarm ribbon is pinned under the status bar on <em>every</em> screen and collapses to
            an all-clear line rather than disappearing.
          </>,
          <>
            Only the scroll region scrolls. A page that scrolls as a whole will hide the tab bar and
            the ribbon exactly when they are needed.
          </>,
          <>
            Destructive swipe actions need a confirm step. A pocket-triggered acknowledge is
            indistinguishable from a real one in the audit trail.
          </>,
          <>
            Respect the safe-area insets top and bottom, or the island and the home indicator will
            sit on top of controls.
          </>,
        ]}
      />
    </div>
  )
}
