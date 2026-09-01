'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { asset } from './asset'

const nav = [
  {
    section: 'Get started',
    links: [
      { label: 'Overview', href: '/' },
      { label: 'For developers', href: '/get-started/handoff' },
      { label: 'Design tokens', href: '/get-started/tokens' },
    ],
  },
  {
    section: 'Foundations',
    links: [
      { label: 'Color', href: '/foundations/color' },
      { label: 'Typography', href: '/foundations/typography' },
      { label: 'Spacing', href: '/foundations/spacing' },
      { label: 'Elevation & radii', href: '/foundations/elevation-and-radii' },
      { label: 'Severity & status', href: '/foundations/severity-and-status' },
      { label: 'UX Writing', href: '/foundations/ux-writing' },
      { label: 'Brand & logo', href: '/foundations/brand-and-logo' },
    ],
  },
  {
    section: 'Styles',
    links: [
      { label: 'Icons', href: '/styles/icons' },
      { label: 'Motion', href: '/styles/motion' },
      { label: 'Themes', href: '/styles/themes' },
      { label: 'Density & text size', href: '/styles/density' },
      { label: 'Ignition Perspective', href: '/styles/ignition' },
    ],
  },
  {
    section: 'Components',
    links: [
      { label: 'Button', href: '/components/button' },
      { label: 'Input', href: '/components/input' },
      { label: 'Select', href: '/components/select' },
      { label: 'Checkbox & radio', href: '/components/checkbox' },
      { label: 'Toggle switch', href: '/components/toggle-switch' },
      { label: 'Stepper', href: '/components/stepper' },
      { label: 'Card', href: '/components/card' },
      { label: 'KPI card', href: '/components/kpi-card' },
      { label: 'Badge', href: '/components/badge' },
      { label: 'Status dot', href: '/components/status-dot' },
      { label: 'Tag', href: '/components/tag' },
      { label: 'State tag', href: '/components/state-tag' },
      { label: 'Alarm row', href: '/components/alarm-row' },
      { label: 'Alarm ribbon', href: '/components/alarm-ribbon' },
      { label: 'Bulk bar', href: '/components/bulk-bar' },
      { label: 'Top bar', href: '/components/top-bar' },
      { label: 'Sidebar', href: '/components/sidebar' },
      { label: 'Tab bar', href: '/components/tab-bar' },
      { label: 'Page header', href: '/components/page-header' },
      { label: 'Quick links', href: '/components/quick-links' },
      { label: 'Filter tabs', href: '/components/filter-tabs' },
      { label: 'Filter chips', href: '/components/filter-chips' },
      { label: 'List row', href: '/components/list-row' },
      { label: 'Param row', href: '/components/param-row' },
      { label: 'Data table', href: '/components/data-table' },
      { label: 'Pagination', href: '/components/pagination' },
      { label: 'Dialog', href: '/components/dialog' },
      { label: 'Drawer', href: '/components/drawer' },
      { label: 'Bottom sheet', href: '/components/bottom-sheet' },
      { label: 'Toast', href: '/components/toast' },
      { label: 'Swipe row', href: '/components/swipe-row' },
      { label: 'Command palette', href: '/components/command-palette' },
      { label: 'Sparkline', href: '/components/sparkline' },
      { label: 'Trend chart', href: '/components/trend-chart' },
      { label: 'SCADA symbols', href: '/components/scada-symbols' },
      { label: 'Empty state', href: '/components/empty-state' },
    ],
  },
  {
    section: 'Patterns',
    links: [
      { label: 'Dashboard overview', href: '/patterns/dashboard-overview' },
      { label: 'Alarm feed', href: '/patterns/alarm-feed' },
      { label: 'Empty & loading states', href: '/patterns/empty-state' },
      { label: 'Alarm register', href: '/patterns/alarm-register' },
      { label: 'SCADA loop', href: '/patterns/scada-loop' },
      { label: 'Search & filter', href: '/patterns/search-and-filter' },
      { label: 'Navigation & breadcrumbs', href: '/patterns/navigation-and-breadcrumbs' },
      { label: 'Responsive & reflow', href: '/patterns/responsive-and-reflow' },
    ],
  },
  {
    section: 'Templates',
    links: [
      { label: 'Dashboard', href: '/templates/dashboard' },
      { label: 'Alarms', href: '/templates/alarms' },
      { label: 'SCADA', href: '/templates/scada' },
      { label: 'Mobile app', href: '/templates/mobile-app' },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[260px] shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-slate-200 bg-white flex flex-col">
      {/* Logo: the way back to the overview from anywhere */}
      <Link
        href="/"
        aria-label="NJORD Design System · overview"
        className="block px-5 py-6 border-b border-slate-200 transition-colors hover:bg-slate-50"
      >
        <img
          src={asset('/njord-logo-blue.svg')}
          alt="Company logo"
          className="h-10 w-auto"
        />

        <span className="text-sm font-semibold text-ink tracking-tight">
          Design System
        </span>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-6">
        {nav.map(({ section, links }) => (
          <div key={section}>
            <p className="px-2 mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              {section}
            </p>
            <ul className="space-y-0.5">
              {links.map(({ label, href }) => {
                const active = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center px-2 py-1.5 rounded-md text-sm transition-colors ${
                        active
                          ? 'bg-slate-100 text-ink font-medium'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-ink'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
