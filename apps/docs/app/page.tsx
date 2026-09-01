import Link from 'next/link'

const sections = [
  {
    title: 'Get started',
    href: '/get-started/handoff',
    desc: 'Implementing this in Ignition: the order of work, the six rules that are not negotiable, and what is left to your judgement.',
    items: ['For developers', 'Design tokens'],
  },
  {
    title: 'Foundations',
    href: '/foundations/color',
    desc: 'The slate ramp, status tints, the severity ramp, type, spacing and elevation.',
    items: ['Color', 'Typography', 'Spacing', 'Elevation & radii', 'Severity & status'],
  },
  {
    title: 'Styles',
    href: '/styles/icons',
    desc: 'Icons, motion, the three skins, and the density and text-size preferences.',
    items: ['Icons', 'Motion', 'Themes', 'Density & text size'],
  },
  {
    title: 'Components',
    href: '/components',
    desc: '36 components, each documenting its desktop and mobile variants together.',
    items: ['Button', 'Alarm row', 'Alarm ribbon', 'Data table', 'Bottom sheet', 'SCADA symbols'],
  },
  {
    title: 'Patterns',
    href: '/patterns/dashboard-overview',
    desc: 'How components compose into the screens operators actually use.',
    items: ['Dashboard overview', 'Alarm feed', 'Alarm register', 'SCADA loop', 'Responsive & reflow'],
  },
  {
    title: 'Templates',
    href: '/templates/dashboard',
    desc: 'Full-screen frames: the desktop shell and the mobile app build.',
    items: ['Dashboard', 'Alarms', 'SCADA', 'Mobile app'],
  },
]

const principles = [
  {
    t: 'Colour is a scarce resource',
    d: 'Under ISA-101, saturated colour is reserved for abnormal conditions. Normal equipment is neutral gray; the chrome is slate; brand cyan means link, focus and selection (never status.',
  },
  {
    t: 'Never one channel',
    d: 'Every state is carried three ways at once) badge, glyph or rail, and words. The interface survives colour-blindness, a monochrome print and a sun-washed screen.',
  },
  {
    t: 'Language is sans, machines are mono',
    d: 'Inter carries prose and labels; JetBrains Mono carries every reading, tag, duration and setpoint, always tabular so a live value never shifts its neighbours.',
  },
  {
    t: 'Mobile is rebuilt, not reflowed',
    d: 'The phone build shares every token but rebuilds the layouts: tables become cards, dialogs become sheets, the mimic becomes a list of readings.',
  },
]

export default function Home() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
        NJORD Design System
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">
        An operations console, documented
      </h1>
      <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-slate-500">
        The design system behind the NJORD redesign: a fish-farming SCADA and alarm console built
        to ISA-18.2 and ISA-101. Tokens, components, patterns and full-screen templates, with the
        desktop and mobile builds documented side by side.
      </p>

      {/* ── Principles ── */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {principles.map(({ t, d }) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-ink">{t}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{d}</p>
          </div>
        ))}
      </div>

      {/* ── Sections ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Contents</h2>
      <div className="mt-5 space-y-3">
        {sections.map(({ title, href, desc, items }) => (
          <Link
            key={title}
            href={href}
            className="block rounded-xl border border-slate-200 bg-white px-5 py-4 transition-all duration-150 hover:border-slate-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-ink">{title}</p>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-slate-400"
                aria-hidden
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{desc}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {items.map((i) => (
                <span
                  key={i}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  {i}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        Building this in Ignition Perspective? Everything you need is on this site: the complete
        theme file, a style class for every component variant, and the view JSON to go with it, all
        copyable from the page. Start at{' '}
        <Link href="/get-started/handoff" className="font-semibold text-primary-text hover:underline">
          For developers
        </Link>
        .
      </div>
    </div>
  )
}
