import { iconSizes, iconStroke } from '@njord/tokens'

type Icon = { name: string; d: React.ReactNode }

const I = {
  chevronRight: <path d="m9 18 6-6-6-6" />,
  chevronDown: <polyline points="6 9 12 15 18 9" />,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  more: <><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8Z" />,
  bell: <><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
  check: <polyline points="20 6 9 17 4 12" />,
  alert: <><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  trend: <path d="m4 16 5-6 4 4 7-8" />,
  gauge: <><path d="M12 14 16 9" /><path d="M4 18a9 9 0 1 1 16 0" /></>,
  tank: <><path d="M5 4h14v16H5Z" /><path d="M5 10h14" /></>,
  pump: <><circle cx="9" cy="12" r="5" /><path d="M9 7 16 12l-7 5Z" /></>,
  valve: <><path d="M4 8 12 12 4 16Z" /><path d="M20 8 12 12l8 4Z" /></>,
  note: <><path d="M6 3h9l5 5v13H6Z" /><path d="M9 13h6M9 17h4" /></>,
  report: <><path d="M6 3h9l5 5v13H6Z" /><path d="M9 17v-4M12 17v-6M15 17v-2" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  download: <><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M4 21h16" /></>,
  refresh: <><path d="M20 11a8 8 0 1 0-2 6" /><path d="M20 5v6h-6" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
} satisfies Record<string, React.ReactNode>

const categories: { name: string; note: string; icons: Icon[] }[] = [
  {
    name: 'Navigation',
    note: 'Chevrons point the direction of travel. A right chevron on a row means it drills in.',
    icons: [
      { name: 'chevron-right', d: I.chevronRight },
      { name: 'chevron-down', d: I.chevronDown },
      { name: 'chevron-left', d: I.chevronLeft },
      { name: 'menu', d: I.menu },
      { name: 'close', d: I.close },
      { name: 'more', d: I.more },
    ],
  },
  {
    name: 'Actions',
    note: 'Always paired with a label except in a toolbar, where the aria-label carries it.',
    icons: [
      { name: 'search', d: I.search },
      { name: 'filter', d: I.filter },
      { name: 'edit', d: I.edit },
      { name: 'download', d: I.download },
      { name: 'refresh', d: I.refresh },
      { name: 'user', d: I.user },
    ],
  },
  {
    name: 'Status',
    note: 'Never the sole carrier of state — they sit beside a word and a colour.',
    icons: [
      { name: 'check', d: I.check },
      { name: 'alert', d: I.alert },
      { name: 'info', d: I.info },
      { name: 'clock', d: I.clock },
      { name: 'bell', d: I.bell },
    ],
  },
  {
    name: 'Process',
    note: 'Used in navigation and list rows. Mimic symbols are a separate vocabulary.',
    icons: [
      { name: 'tank', d: I.tank },
      { name: 'pump', d: I.pump },
      { name: 'valve', d: I.valve },
      { name: 'gauge', d: I.gauge },
      { name: 'trend', d: I.trend },
      { name: 'note', d: I.note },
      { name: 'report', d: I.report },
    ],
  },
]

const sizes = Object.entries(iconSizes).map(([token, i]) => ({
  token,
  px: Number.parseInt(i.value, 10),
  use: i.use,
}))

export default function IconsPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Styles</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Icons</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        A 24×24 outline set drawn at 2px stroke with round caps and joins, inheriting{' '}
        <code className="font-mono text-xs">currentColor</code>. Icons clarify a label; they almost
        never replace one.
      </p>

      <div className="mt-8 space-y-8">
        {categories.map(({ name, note, icons }) => (
          <div key={name}>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">{name}</h2>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{note}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {icons.map(({ name: n, d }) => (
                <div
                  key={n}
                  className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-3.5"
                >
                  <span className="text-slate-600">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {d}
                    </svg>
                  </span>
                  <span className="text-center font-mono text-[10px] leading-tight text-slate-400">{n}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Sizes ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Sizes</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Always drawn on a 24×24 viewBox and rendered at one of these six sizes. Stroke stays 2 at
        every size — it is <em>not</em> scaled with the glyph, or a small icon turns spindly and a
        large one turns fat. Colour always inherits <code className="font-mono text-xs">currentColor</code>.
      </p>
      <div className="mt-4 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-[13px] leading-relaxed text-slate-600">
        <strong className="font-semibold text-ink">The rule that picks one:</strong> an icon&rsquo;s
        size follows the <em>text</em> it sits with, not the container it sits in. A 16px glyph
        beside 14/20 body reads as part of the sentence; the same glyph in a 40px button still
        follows the label, not the button. Sizing by container is what produced thirteen different
        icon sizes across the app.
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {sizes.map(({ token, px, use }) => (
          <div key={token} className="flex items-center gap-4 border-b border-slate-100 px-5 py-3 last:border-b-0">
            <span className="flex w-8 shrink-0 justify-center text-slate-600">
              <svg width={px} height={px} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {I.bell}
              </svg>
            </span>
            <span className="w-12 shrink-0 font-mono text-xs text-slate-400 tabular-nums">{px}px</span>
            <span className="w-20 shrink-0 font-mono text-[11px] text-primary-text">{token}</span>
            <span className="text-[13px] text-slate-600">{use}</span>
          </div>
        ))}
      </div>

      {/* ── Stroke ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Stroke</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Constant across every size. The one exception is the active tab on the mobile tab bar,
        which thickens slightly so the current tab reads without relying on colour alone.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {Object.entries(iconStroke).map(([token, st], i) => (
          <div
            key={token}
            className={`flex items-center gap-4 px-5 py-3 ${i > 0 ? 'border-t border-slate-100' : ''}`}
          >
            <span className="flex w-8 shrink-0 justify-center text-slate-600">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={st.value}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {I.bell}
              </svg>
            </span>
            <span className="w-12 shrink-0 font-mono text-xs text-slate-400 tabular-nums">{st.value}</span>
            <span className="w-40 shrink-0 font-mono text-[11px] text-primary-text">--{token}</span>
            <span className="text-[13px] text-slate-600">{st.use}</span>
          </div>
        ))}
      </div>

      {/* ── Usage ── */}
      <h2 className="mt-10 text-base font-bold text-ink">In context</h2>
      <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
        <button className="inline-flex items-center gap-[7px] rounded-md border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{I.download}</svg>
          Export
        </button>
        <button aria-label="More actions" className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-sm text-slate-400 hover:bg-slate-100 hover:text-ink">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{I.more}</svg>
        </button>
        <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{I.clock}</svg>
          Active for 04:12:38
        </span>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Icons inherit <code className="font-mono text-[12px]">currentColor</code>. Never
              hard-code a fill, or the glyph will not follow the dark and legacy skins.
            </>,
            <>
              Decorative icons take <code className="font-mono text-[12px]">aria-hidden</code>;
              icon-only buttons take an <code className="font-mono text-[12px]">aria-label</code>.
              There is no third case.
            </>,
            <>
              An icon-only control still needs a 40px (desktop) or 44px (mobile) target, even when
              the glyph is 16px.
            </>,
            <>
              Process icons are for navigation and lists. SCADA mimic symbols are a separate,
              stricter vocabulary — do not mix them.
            </>,
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
