import Link from 'next/link'
import type { ReactNode } from 'react'

import CodeBlock from '../../../components/CodeBlock'
import { asset } from '../../../components/asset'

function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[12px] text-ink">
      {children}
    </code>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <div className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-2.5 space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const families = [
  {
    prefix: '--njord-slate-*',
    name: 'The neutral spine',
    what: 'Eleven steps from ink to near-white. Chrome, text, borders and surfaces all come from here. Nothing in a resting screen needs anything else.',
  },
  {
    prefix: '--njord-primary',
    name: 'Brand cyan',
    what: 'Links, focus rings and selection. Never status, never an alarm priority.',
  },
  {
    prefix: '--njord-{status}-{bg,mid,text,solid}',
    name: 'Status tints',
    what: 'success · warning · critical · medium · primary · info. Each is a set, and the members are not interchangeable.',
  },
  {
    prefix: '--njord-sev-{crit,high,med,low,diag,ok}',
    name: 'The severity ramp',
    what: 'Alarm priority as a mark colour, plus the ink that sits on it and the text colour for a normal surface.',
  },
  {
    prefix: '--njord-fl-*',
    name: 'Process-fluid line coding',
    what: 'Ten pipe colours for SCADA mimics. Deliberately desaturated: a pipe must never read louder than an alarm.',
  },
  {
    prefix: '--njord-sc-*',
    name: 'SCADA equipment',
    what: 'ISA-101 HP-HMI symbol palette. Running and stopped are both neutral; abnormal red is the only saturated symbol colour in the set.',
  },
  {
    prefix: '--njord-r-* · --njord-shadow*',
    name: 'Radii and elevation',
    what: 'Five radii, four shadows. Elevation is shallow on purpose; a control room screen is read at a glance, and heavy depth reads as noise.',
  },
  {
    prefix: '--njord-font-{sans,mono}',
    name: 'The two families',
    what: 'Inter carries language, JetBrains Mono carries every number, tag, duration and setpoint.',
  },
]

export default function DesignTokens() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
        Get started
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Design tokens</h1>
      <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-slate-500">
        Every colour, type role, radius and shadow in this system has a name. One rule sits under
        all of it: a value is never typed as a literal into a screen; it is referenced by name, so
        it can be re-tuned once and change everywhere. This page is what the names mean and how to
        pair them.
      </p>

      <div className="mt-6 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        The tokens ship as a single CSS file for the gateway. Get it from{' '}
        <Link href="/styles/ignition" className="font-semibold text-primary-text hover:underline">
          Ignition Perspective
        </Link>{' '} (copy it off the page or download it) then reference the names below from your style
        classes.
      </div>

      {/* ── Families ── */}
      <h2 className="mt-9 text-base font-bold text-ink">The families</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {families.map(({ prefix, name, what }, i) => (
          <div key={prefix} className={`px-5 py-4 ${i > 0 ? 'border-t border-slate-100' : ''}`}>
            <div className="flex flex-wrap items-baseline gap-2">
              <p className="text-sm font-semibold text-ink">{name}</p>
              <code className="font-mono text-[11px] text-primary-text">{prefix}</code>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{what}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
        Every value, with its usage rule and contrast note, is on{' '}
        <Link href="/foundations/color" className="font-semibold text-primary-text hover:underline">
          Foundations → Color
        </Link>{' '}
        and{' '}
        <Link
          href="/foundations/severity-and-status"
          className="font-semibold text-primary-text hover:underline"
        >
          Severity &amp; status
        </Link>
        .
      </p>

      {/* ── Pairing ── */}
      <h2 className="mt-9 text-base font-bold text-ink">Pairing rules the names encode</h2>
      <Card title="The suffixes are not decoration">
        Each one has exactly one job, and swapping them is the most common way to fail contrast.
        <Bullets
          items={[
            <>
              <C>-bg</C> is a fill. <C>-text</C> is ink on an ordinary surface. <C>-solid</C> is a
              fill that carries white text at AA.
            </>,
            <>
              Never set a bare <C>--njord-sev-*</C> as text. Those are mark colours: dots, rails,
              chart fills. <C>--njord-sev-crit</C> is only 3.73:1 on white and{' '}
              <C>--njord-sev-high</C> is 2.06:1. Words use <C>--njord-sev-*-text</C>.
            </>,
            <>
              When a number sits directly on a severity fill, its ink is{' '}
              <C>--njord-sev-*-ink</C>: white on some rungs, near-black on others. It is not always
              white.
            </>,
            <>
              <C>--njord-success</C> is an indicator green at 2.3:1 on white. It marks a state; it
              never carries text. For a positive action surface use <C>--njord-success-solid</C>.
            </>,
            <>
              <C>--njord-slate-350</C> is decorative only; hairlines and dots. It does not clear AA
              as text. <C>--njord-slate-400</C> is the lightest step that does.
            </>,
          ]}
        />
      </Card>

      <Card title="How to reference one">
        Values in a style class are <C>var()</C> references, always. This is what makes the dark and
        legacy skins possible: they re-point the same names and nothing else changes.
        <CodeBlock
          code={`{
  "base": {
    "style": {
      "backgroundColor": "var(--njord-critical-solid)",
      "color": "#FFFFFF",
      "borderRadius": "var(--njord-r-sm)",
      "fontFamily": "var(--njord-font-sans)"
    }
  }
}

/* wrong — invisible to every re-skin, and to the next person */
{ "base": { "style": { "backgroundColor": "#D8302B" } } }`}
        />
      </Card>

      <Card title="Skins are the same tokens, re-pointed">
        Three skins ship: modern (default), dark and legacy. A skin is a list of overrides under a
        selector: no second stylesheet, no forked components. The dark skin is already in the theme
        file as <C>.njord-theme-dark</C>. Components that reference tokens correctly inherit it for
        free; components with an inline hex do not, which makes the skins a useful test of whether
        the implementation is honest. See{' '}
        <Link href="/styles/themes" className="font-semibold text-primary-text hover:underline">
          Themes
        </Link>
        .
      </Card>

      {/* ── Web ── */}
      <h2 className="mt-9 text-base font-bold text-ink">If you are building for the web too</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-600">
        The same token set exists with a <C>--color-</C> prefix for browser builds, wired as Tailwind
        v4 theme variables so each one is also a utility class: <C>bg-critical-solid</C>,{' '}
        <C>text-warning-text</C>, <C>rounded-lg</C>, <C>text-body</C>. The names after the prefix are
        identical to the Ignition ones, so a token is greppable across both codebases.
      </p>
      <CodeBlock
        label="Downloadable from this site"
        code={`/* tokens.css — the same values, --color-* prefix, Tailwind v4 @theme */
@import "tailwindcss";
@import "./tokens.css";

/* tokens.json — a flat name → value map, if you need neither */`}
        download={{ href: asset('/downloads/tokens.css'), filename: 'tokens.css' }}
      />
      <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
        <a href={asset('/downloads/tokens.json')} download className="font-semibold text-primary-text hover:underline">
          tokens.json
        </a>{' '}
        · a flat map for a consumer that speaks neither Tailwind nor Perspective.
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
        <a
          href={asset('/downloads/njord-process-symbols.zip')}
          download
          className="font-semibold text-primary-text hover:underline"
        >
          njord-process-symbols.zip
        </a>{' '}
        · the 41 SCADA symbols as flat SVG in all three skins, for Figma or anywhere CSS variables
        do not reach. See{' '}
        <Link href="/components/scada-symbols" className="font-semibold text-primary-text hover:underline">
          SCADA symbols
        </Link>
        .
      </p>

      <div className="mt-9 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        Next:{' '}
        <Link href="/styles/ignition" className="font-semibold text-primary-text hover:underline">
          Ignition Perspective
        </Link>{' '}
        for the theme file and the style-class library, or{' '}
        <Link href="/components/button" className="font-semibold text-primary-text hover:underline">
          Components
        </Link>{' '}
        for the specs themselves.
      </div>
    </div>
  )
}
