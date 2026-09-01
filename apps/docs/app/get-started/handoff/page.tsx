import Link from 'next/link'
import type { ReactNode } from 'react'

import { ignitionSpecs } from '../../../components/ignition-specs'

function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[12px] text-ink">
      {children}
    </code>
  )
}

function Step({
  n,
  title,
  href,
  children,
}: {
  n: number
  title: string
  href?: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-4 border-t border-slate-100 px-5 py-4 first:border-t-0">
      <span
        aria-hidden
        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 font-mono text-[11px] font-bold text-slate-600"
      >
        {n}
      </span>
      <div className="min-w-0 flex-1">
        {href ? (
          <Link href={href} className="text-sm font-semibold text-ink hover:underline">
            {title} →
          </Link>
        ) : (
          <p className="text-sm font-semibold text-ink">{title}</p>
        )}
        <div className="mt-1 text-[13px] leading-relaxed text-slate-600">{children}</div>
      </div>
    </div>
  )
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const scope = [
  { n: 7, label: 'Foundations', href: '/foundations/color', what: 'colour, type, spacing, elevation, severity, writing, brand' },
  { n: 5, label: 'Styles', href: '/styles/icons', what: 'icons, motion, the three skins, density, this Ignition guide' },
  { n: Object.keys(ignitionSpecs).length, label: 'Components', href: '/components', what: 'each with desktop + mobile variants and its Perspective spec' },
  { n: 7, label: 'Patterns', href: '/patterns/dashboard-overview', what: 'how components compose into real screens' },
  { n: 4, label: 'Templates', href: '/templates/dashboard', what: 'full-screen frames — dashboard, alarms, SCADA, mobile' },
]

export default function Handoff() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
        Get started
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">For developers</h1>
      <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-slate-500">
        This site is the specification for the NJORD redesign, and it is complete: every token,
        component, pattern and screen you need to rebuild the application in Ignition Perspective is
        documented here, with the Perspective JSON ready to copy. There is nothing to install and no
        other document to chase.
      </p>

      {/* ── Migrating an existing project ── */}
      <h2 className="mt-9 text-base font-bold text-ink">
        You are starting from an existing project
      </h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-600">
        This is a retheme and a replacement, not a greenfield build. There is already a working
        Perspective project with live tag bindings, alarm journal queries and named queries behind
        it. None of that changes — <strong className="font-semibold text-ink">this system
        specifies presentation only</strong>. Keep every binding you have.
      </p>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <Step n={1} title="Add the theme alongside the one you use now">
          A Perspective theme is a folder, not a file, and a project can carry several. Install{' '}
          <C>njord</C> next to your current theme and switch a single test view to it. Nothing else
          in the project is affected until you point a view at it, so this step is reversible.
        </Step>
        <Step n={2} title="Reskin before you restructure">
          Replace hardcoded colours, fonts and radii in your existing views with{' '}
          <C>var(--njord-…)</C> references first, leaving the layout alone. The screens will look
          substantially closer to the target while every binding stays exactly where it was, and it
          surfaces token gaps early — while they are still cheap.
        </Step>
        <Step n={3} title="Then replace components, leaf-first">
          Swap the small pieces before their containers — badge, tag, status dot, state tag, then
          rows, then cards, then whole views. A container rebuilt around old leaves has to be
          rebuilt again. Each component page carries the style-class JSON to paste.
        </Step>
        <Step n={4} title="Restructure the screens last">
          Only once the components are right do the templates matter. The four under{' '}
          <Link href="/templates/dashboard" className="font-semibold text-ink hover:underline">
            Templates
          </Link>{' '}
          give regions, sizing, breakpoints and a component inventory per screen.
        </Step>
      </div>
      <div className="mt-4 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        <strong className="text-ink">Where the old project and this system disagree, this system
        wins</strong> — that is what it is for. The exceptions are the six{' '}
        <a href="#non-negotiables" className="font-semibold text-ink hover:underline">
          non-negotiables
        </a>{' '}
        below, which are not preferences and must not be traded away for a smaller diff.
      </div>

      {/* ── Start here ── */}
      <h2 className="mt-9 text-base font-bold text-ink">
        The order of work, once the theme is in
      </h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-600">
        Build it in this order and nothing later is ever blocked by something earlier.
      </p>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <Step n={1} title="Install the theme and the fonts" href="/styles/ignition">
          One CSS file carries every token. It installs as a theme folder under{' '}
          <C>data/config/resources/core/…/themes/</C> and must extend the base light theme. Then
          make Inter and JetBrains Mono resolvable. Until this is done nothing else will look right,
          because every style class below refers to it — and the failure modes here are all silent.
        </Step>
        <Step n={2} title="Build the style-class library" href="/styles/ignition">
          One class per component variant, values as <C>var(--njord-…)</C> references only. The
          complete index is at the foot of the Ignition page; the JSON for each class is on that
          component&rsquo;s own page.
        </Step>
        <Step n={3} title="Build the components" href="/components">
          {Object.keys(ignitionSpecs).length} of them. Each page shows the live desktop and mobile
          variants, the geometry, the states, and a Perspective block naming the component it maps
          to plus its view JSON and gotchas.
        </Step>
        <Step n={4} title="Learn the patterns" href="/patterns/dashboard-overview">
          How the pieces compose — alarm feed, alarm register, SCADA loop, search and filter,
          navigation, reflow. These carry the behavioural rules that make the system ISA-18.2
          compliant, not just the visual ones.
        </Step>
        <Step n={5} title="Assemble the screens" href="/templates/dashboard">
          Four full-screen templates. Each carries a layout spec — regions, sizing, breakpoints and
          the component inventory — alongside the rendered reference.
        </Step>
      </div>

      {/* ── Non-negotiables ── */}
      <h2 id="non-negotiables" className="mt-9 scroll-mt-6 text-base font-bold text-ink">
        The non-negotiables
      </h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-600">
        Most of this system is preference and can be argued with. These six are not — they are what
        make it an ISA-101 / ISA-18.2 console rather than a dashboard, and breaking one breaks the
        safety argument, not just the look.
      </p>
      <div className="mt-4 rounded-xl border border-critical-mid bg-critical-bg p-5">
        <Bullets
          items={[
            <>
              <strong className="font-semibold text-ink">No colour literals anywhere.</strong> Not in
              a style class, not inline on a component. Every value is a{' '}
              <C>var(--njord-…)</C> reference. Inline colour cannot be re-skinned, and both the dark
              and legacy skins work purely by re-pointing tokens.
            </>,
            <>
              <strong className="font-semibold text-ink">Colour is reserved for abnormal.</strong>{' '}
              Normal equipment is neutral gray. If a screen at rest is colourful, an alarm has
              nowhere left to shout from.
            </>,
            <>
              <strong className="font-semibold text-ink">Never one channel.</strong> Every state is
              carried three ways at once — fill, glyph or rail, and words. Colour alone fails
              colour-blind operators, monochrome print and a sun-washed screen.
            </>,
            <>
              <strong className="font-semibold text-ink">Alarms sort by priority, then age.</strong>{' '}
              Never newest-first. A three-hour-old critical outranks a one-minute-old low.
            </>,
            <>
              <strong className="font-semibold text-ink">Every number is mono and tabular.</strong>{' '}
              Set <C>fontVariantNumeric: tabular-nums</C> on all readouts, or a polling value shifts
              its neighbours on each update.
            </>,
            <>
              <strong className="font-semibold text-ink">MEDIUM is not brand cyan.</strong> Medium
              priority has its own royal blue. Brand cyan means link, focus and selection — it never
              carries status.
            </>,
          ]}
        />
      </div>

      {/* ── Boundaries ── */}
      <h2 className="mt-9 text-base font-bold text-ink">What is and is not specified</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-600">
        This system is the front end and nothing else. Everything in the right-hand column already
        exists in your base project and is not being asked to change — you are reskinning and
        rebuilding what sits on top of it.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-ink">Specified here — follow it</p>
          <Bullets
            items={[
              'Every colour, type role, radius, spacing step and shadow.',
              'Component geometry, states, and which Perspective component each maps to.',
              'Screen layout, regions, breakpoints and reflow behaviour.',
              'Interaction rules — sort order, acknowledge flows, empty and loading states.',
              'Label and message wording, including tone and capitalisation.',
            ]}
          />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-ink">
            Already yours — this system does not touch it
          </p>
          <Bullets
            items={[
              'Tag paths, UDT structure and the alarm data model.',
              'Gateway architecture, redundancy and project organisation.',
              'Security levels, roles and which actions they gate.',
              'Historian configuration and query performance.',
              'Named queries, scripts and every binding behind a view.',
            ]}
          />
          <p className="mt-3 border-t border-slate-100 pt-3 text-[12px] leading-relaxed text-slate-500">
            One genuine choice remains yours: whether a given view is an embedded view, a flex
            repeater or a table. Pick per screen — this system specifies what it must look like and
            how it must behave, never which Perspective container gets you there.
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        <span className="font-semibold text-ink">When something is not covered:</span> ask rather
        than invent. A missing token or an unspecified state is a gap in this spec, and the fix
        belongs here so the next person inherits it — not in one view where it will drift.
      </div>

      {/* ── Scope ── */}
      <h2 className="mt-9 text-base font-bold text-ink">What you are being handed</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {scope.map(({ n, label, href, what }, i) => (
          <Link
            key={label}
            href={href}
            className={`flex flex-wrap items-baseline gap-x-3 px-5 py-3 transition-colors hover:bg-slate-50 ${
              i > 0 ? 'border-t border-slate-100' : ''
            }`}
          >
            <span className="w-8 shrink-0 font-mono text-sm font-bold text-ink">{n}</span>
            <span className="w-28 shrink-0 text-[13px] font-semibold text-ink">{label}</span>
            <span className="text-[13px] text-slate-500">{what}</span>
          </Link>
        ))}
      </div>
      <p className="mt-3 max-w-[68ch] text-[13px] leading-relaxed text-slate-600">
        Plus three skins — modern, dark and legacy — that are the same token set re-pointed. Ship
        modern first; the other two cost almost nothing once the components read tokens properly,
        and they are the proof that they do.
      </p>

      <div className="mt-9 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        Next:{' '}
        <Link href="/styles/ignition" className="font-semibold text-primary-text hover:underline">
          Ignition Perspective
        </Link>{' '}
        for the theme file and the style-class library, or{' '}
        <Link href="/get-started/tokens" className="font-semibold text-primary-text hover:underline">
          Design tokens
        </Link>{' '}
        for the naming and pairing rules behind every value.
      </div>
    </div>
  )
}
