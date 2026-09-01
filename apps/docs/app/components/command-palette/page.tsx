import ComponentDoc, { type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Command palette',
    platform: 'Desktop',
    description:
      'Opened with ⌘K from anywhere. 640px wide, anchored 14vh from the top, capped at 66vh. Results are grouped, the selected row takes primary-bg, and the hint is mono and right-aligned.',
    preview: (
      <div className="flex w-full justify-center rounded-lg bg-[rgba(15,24,43,0.45)] p-8">
        <div className="flex max-h-[420px] w-[560px] flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-2.5 border-b border-slate-200 px-4 py-3.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input
              defaultValue="tk-04"
              className="flex-1 border-none bg-transparent text-base text-ink outline-none placeholder:text-slate-400"
            />
            <span className="rounded-[5px] border border-slate-200 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-400">
              ESC
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-1.5">
            {[
              {
                g: 'Screens',
                rows: [
                  { l: 'Tank TK-04', h: 'RAS 2 · 42 400 fish', sel: true },
                  { l: 'RAS 2 mimic', h: 'Process · overview', sel: false },
                ],
              },
              {
                g: 'Alarms',
                rows: [
                  { l: 'Dissolved oxygen low-low', h: 'DO-0403 · critical', sel: false },
                  { l: 'Feed line blocked', h: 'HF-0412 · medium', sel: false },
                ],
              },
              {
                g: 'Actions',
                rows: [{ l: 'Acknowledge all in RAS 2', h: '4 alarms', sel: false }],
              },
            ].map(({ g, rows }) => (
              <div key={g}>
                <p className="px-2.5 pt-2.5 pb-1 text-[10px] font-bold uppercase tracking-[0.06em] text-slate-400">
                  {g}
                </p>
                {rows.map(({ l, h, sel }) => (
                  <button
                    key={l}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] text-left ${
                      sel ? 'bg-primary-bg' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="inline-flex w-2.5 shrink-0 items-center justify-center">
                      {sel && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </span>
                    <span className="truncate text-sm font-medium text-ink">{l}</span>
                    <span className="ml-auto max-w-[46%] truncate font-mono text-xs text-slate-400">
                      {h}
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="flex gap-[18px] border-t border-slate-200 px-4 py-2.5 text-xs text-slate-400">
            {[
              ['↑↓', 'Navigate'],
              ['↵', 'Open'],
              ['⌘K', 'Toggle'],
            ].map(([k, l]) => (
              <span key={l}>
                <kbd className="mr-[3px] rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[11px] font-semibold text-slate-500">
                  {k}
                </kbd>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    code: `<div className="fixed inset-0 z-[200] flex items-start justify-center
  bg-[rgba(15,24,43,0.45)] pt-[min(14vh,120px)]">
  <div className="flex max-h-[66vh] w-[min(640px,92vw)] flex-col overflow-hidden
    rounded-[14px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
    <div className="flex items-center gap-2.5 border-b border-slate-200 px-4 py-3.5">
      <SearchIcon />
      <input className="flex-1 bg-transparent text-base text-ink outline-none" />
      <kbd>ESC</kbd>
    </div>
    <div className="flex-1 overflow-y-auto p-1.5">
      <p className="px-2.5 pt-2.5 pb-1 text-[10px] font-bold uppercase
        tracking-[0.06em] text-slate-400">Screens</p>
      <button className={sel ? "bg-primary-bg" : "hover:bg-slate-50"}>
        <span className="truncate text-sm font-medium text-ink">{label}</span>
        <span className="ml-auto max-w-[46%] truncate font-mono text-xs text-slate-400">{hint}</span>
      </button>
    </div>
    <footer className="flex gap-[18px] border-t border-slate-200 px-4 py-2.5">…</footer>
  </div>
</div>`,
  },
  {
    name: 'Search trigger',
    platform: 'Desktop',
    description:
      'The top-bar entry point. It advertises the shortcut rather than hiding it, and sheds the label then the keycap as the bar narrows — the icon alone survives.',
    preview: (
      <div className="flex items-center gap-6">
        <button className="inline-flex h-[34px] items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-[13px] text-slate-500 hover:border-slate-300 hover:bg-white">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <span className="font-medium">Search</span>
          <span className="rounded-[5px] border border-slate-200 bg-white px-[5px] font-mono text-[11px] font-semibold text-slate-400">
            ⌘K
          </span>
        </button>
        <button aria-label="Search" className="inline-flex h-[34px] items-center rounded-md border border-slate-200 bg-slate-50 px-2 text-slate-500">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        </button>
      </div>
    ),
    code: `<button className="inline-flex h-[34px] items-center gap-2 rounded-md border border-slate-200
  bg-slate-50 px-2.5 text-[13px] text-slate-500 hover:border-slate-300 hover:bg-white">
  <SearchIcon />
  <span className="font-medium">Search</span>
  <kbd className="rounded-[5px] border border-slate-200 bg-white px-[5px]
    font-mono text-[11px] font-semibold text-slate-400">⌘K</kbd>
</button>

@media (max-width: 1240px) { .tb-search-lbl, .tb-search-kbd { display: none } }`,
  },
  {
    name: 'No results',
    platform: 'Desktop',
    description:
      'The palette keeps its input and footer and states the miss in the body. It never collapses to nothing — a shrinking panel under a typing cursor is disorienting.',
    preview: (
      <div className="flex w-full justify-center rounded-lg bg-[rgba(15,24,43,0.45)] p-8">
        <div className="flex w-[560px] flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-2.5 border-b border-slate-200 px-4 py-3.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666F7D" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input defaultValue="tk-99" className="flex-1 border-none bg-transparent text-base text-ink outline-none" />
            <span className="rounded-[5px] border border-slate-200 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-400">
              ESC
            </span>
          </div>
          <p className="px-3 py-7 text-center text-sm text-slate-400">
            No screens, alarms or actions match &ldquo;tk-99&rdquo;.
          </p>
          <div className="flex gap-[18px] border-t border-slate-200 px-4 py-2.5 text-xs text-slate-400">
            <span>
              <kbd className="mr-[3px] rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[11px] font-semibold text-slate-500">
                ⌘K
              </kbd>
              Toggle
            </span>
          </div>
        </div>
      </div>
    ),
    code: `<p className="px-3 py-7 text-center text-sm text-slate-400">
  No screens, alarms or actions match “{query}”.
</p>`,
  },
]

export default function CommandPalettePage() {
  return (
    <ComponentDoc
      title="Command palette"
      intro={
        <>
          Keyboard-first navigation across screens, alarms, equipment and actions. It is the fastest
          route to anywhere in the console, which is why the top bar advertises its shortcut instead
          of hiding it behind an icon.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['command-palette']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Results are grouped by kind and every row carries a mono hint capped at 46% width, so a
            long tag can never push the label out of view.
          </>,
          <>
            Selection is a fill plus a leading dot, not a border — a border would shift the row by a
            pixel as you arrow through the list.
          </>,
          <>
            The footer keeps the keyboard map visible. A palette is a keyboard tool, and hiding its
            keys defeats it.
          </>,
          <>
            There is no mobile counterpart. The phone uses the search bottom sheet, where the
            keyboard already owns half the screen.
          </>,
        ],
      }}
    />
  )
}
