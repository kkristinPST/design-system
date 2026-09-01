import Link from 'next/link'

type Entry = {
  name: string
  href: string
  description: string
  platform: 'Desktop' | 'Mobile' | 'Both'
}

const groups: { group: string; items: Entry[] }[] = [
  {
    group: 'Actions & input',
    items: [
      { name: 'Button', href: '/components/button', description: 'Primary, secondary, ghost and danger, at both sizes.', platform: 'Both' },
      { name: 'Input', href: '/components/input', description: 'Text fields, search and textareas.', platform: 'Both' },
      { name: 'Select', href: '/components/select', description: 'Dropdowns, stacked enums and the mobile option sheet.', platform: 'Both' },
      { name: 'Checkbox & radio', href: '/components/checkbox', description: 'Multi- and single-select, including indeterminate.', platform: 'Both' },
      { name: 'Toggle switch', href: '/components/toggle-switch', description: 'Settings that apply immediately.', platform: 'Both' },
      { name: 'Stepper', href: '/components/stepper', description: 'Setpoints and alarm limits, with range and history.', platform: 'Both' },
    ],
  },
  {
    group: 'Containers',
    items: [
      { name: 'Card', href: '/components/card', description: 'The surface every screen is built from.', platform: 'Both' },
      { name: 'KPI card', href: '/components/kpi-card', description: 'A single number with label and context.', platform: 'Both' },
      { name: 'Empty state', href: '/components/empty-state', description: 'Why a list is empty, and what to do about it.', platform: 'Both' },
    ],
  },
  {
    group: 'Status & markers',
    items: [
      { name: 'Badge', href: '/components/badge', description: 'Severity, status and count badges.', platform: 'Both' },
      { name: 'Status dot', href: '/components/status-dot', description: '9px marks, connection pills and row rails.', platform: 'Both' },
      { name: 'Tag', href: '/components/tag', description: 'Mono equipment tags, readings and durations.', platform: 'Both' },
      { name: 'State tag', href: '/components/state-tag', description: 'ISA-18.2 lifecycle and suppression states.', platform: 'Both' },
    ],
  },
  {
    group: 'Alarms',
    items: [
      { name: 'Alarm row', href: '/components/alarm-row', description: 'One alarm in a list · table row or card.', platform: 'Both' },
      { name: 'Alarm ribbon', href: '/components/alarm-ribbon', description: 'The persistent ISA-18.2 annunciator.', platform: 'Both' },
      { name: 'Bulk bar', href: '/components/bulk-bar', description: 'Actions across a selection.', platform: 'Both' },
      { name: 'Swipe row', href: '/components/swipe-row', description: 'Swipe-to-acknowledge shortcut.', platform: 'Mobile' },
    ],
  },
  {
    group: 'Navigation',
    items: [
      { name: 'Top bar', href: '/components/top-bar', description: 'Scope, page title, search and site status.', platform: 'Both' },
      { name: 'Sidebar', href: '/components/sidebar', description: 'The dark navigation rail, expanded and collapsed.', platform: 'Desktop' },
      { name: 'Tab bar', href: '/components/tab-bar', description: 'Bottom destinations and segmented controls.', platform: 'Mobile' },
      { name: 'Page header', href: '/components/page-header', description: 'Summary, controls and tab strip.', platform: 'Both' },
      { name: 'Quick links', href: '/components/quick-links', description: 'Signposts with a subtitle.', platform: 'Both' },
      { name: 'Command palette', href: '/components/command-palette', description: 'Keyboard-first navigation, ⌘K.', platform: 'Desktop' },
    ],
  },
  {
    group: 'Data',
    items: [
      { name: 'Filter tabs', href: '/components/filter-tabs', description: 'Switch which slice of a dataset is shown.', platform: 'Both' },
      { name: 'Filter chips', href: '/components/filter-chips', description: 'Applied filters, visible and dismissible.', platform: 'Both' },
      { name: 'List row', href: '/components/list-row', description: 'The mobile equivalent of a table row.', platform: 'Both' },
      { name: 'Param row', href: '/components/param-row', description: 'One editable process value.', platform: 'Both' },
      { name: 'Data table', href: '/components/data-table', description: 'Dense tabular data with density and overflow rules.', platform: 'Desktop' },
      { name: 'Pagination', href: '/components/pagination', description: 'Pager on desktop, load-more on mobile.', platform: 'Both' },
      { name: 'Sparkline', href: '/components/sparkline', description: 'A word-sized trace beside a value.', platform: 'Both' },
      { name: 'Trend chart', href: '/components/trend-chart', description: 'History with a scale and thresholds.', platform: 'Both' },
      { name: 'SCADA symbols', href: '/components/scada-symbols', description: 'Equipment, pipes and fluid line coding.', platform: 'Desktop' },
    ],
  },
  {
    group: 'Overlays',
    items: [
      { name: 'Dialog', href: '/components/dialog', description: 'Modal that collects a decision.', platform: 'Desktop' },
      { name: 'Drawer', href: '/components/drawer', description: 'Right-hand detail panel.', platform: 'Desktop' },
      { name: 'Bottom sheet', href: '/components/bottom-sheet', description: 'The mobile dialog, plus centred confirms.', platform: 'Mobile' },
      { name: 'Toast', href: '/components/toast', description: 'Transient confirmation with undo.', platform: 'Both' },
    ],
  },
]

const tone: Record<Entry['platform'], string> = {
  Desktop: 'border-slate-200 bg-slate-50 text-slate-500',
  Mobile: 'border-primary/30 bg-primary-bg text-primary-text',
  Both: 'border-slate-200 bg-white text-slate-500',
}

export default function ComponentsPage() {
  const total = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Components</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Components</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        {total} components imported from the NJORD Redesign project. Each page documents the
        desktop and mobile variants together, with the rules that govern them and copy-paste
        markup.
      </p>

      <div className="mt-8 space-y-10">
        {groups.map(({ group, items }) => (
          <section key={group}>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
              {group}
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {items.map(({ name, href, description, platform }) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-all duration-150 hover:border-slate-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-ink">{name}</p>
                    <span
                      className={`ml-auto shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tone[platform]}`}
                    >
                      {platform}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
