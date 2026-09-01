import Link from 'next/link'
import type { ReactNode } from 'react'

import CodeBlock from './CodeBlock'

export type Platform = 'Desktop' | 'Mobile' | 'Desktop + Mobile'

export type Variant = {
  /** Variant name, e.g. "Primary" or "Mobile — full-width actions". */
  name: string
  /** Which build this variant belongs to. */
  platform: Platform
  /** One or two sentences: what it is for, and the rule that governs it. */
  description: string
  /** Live rendering of the variant. */
  preview: ReactNode
  /** Copy-paste markup for the variant. */
  code: string
}

/** Ignition Perspective implementation notes for a component. */
export type Ignition = {
  /** Which Perspective component(s) this is built from. */
  maps: ReactNode
  /** Perspective style-class resource JSON. */
  styles?: { path: string; json: string }
  /** Perspective view JSON for the component itself. */
  view?: { path?: string; json: string }
  /** An optional binding, expression or Jython script. */
  script?: { label: string; code: string }
  /** Gotchas specific to implementing this one in Perspective. */
  notes?: ReactNode[]
}

const platformTone: Record<Platform, string> = {
  Desktop: 'border-slate-200 bg-slate-50 text-slate-500',
  Mobile: 'border-primary/30 bg-primary-bg text-primary-text',
  'Desktop + Mobile': 'border-slate-300 bg-white text-slate-600',
}

/**
 * The shared documentation shell for every page under /components.
 * Section eyebrow → title → intro → one card per variant → Ignition → notes.
 */
export default function ComponentDoc({
  section = 'Components',
  title,
  intro,
  variants,
  ignition,
  notes,
}: {
  section?: string
  title: string
  intro: ReactNode
  variants: Variant[]
  ignition?: Ignition
  /** Optional closing rules — anatomy, accessibility, do-not list. */
  notes?: { heading: string; items: ReactNode[] }
}) {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
        {section}
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
      <div className="mt-2 text-sm leading-relaxed text-slate-500">{intro}</div>

      <div className="mt-8 space-y-4">
        {variants.map(({ name, platform, description, preview, code }) => (
          <div
            key={name}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <div className="flex items-center justify-center bg-slate-50 px-8 py-10">
              {preview}
            </div>
            <div className="border-t border-slate-200 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-ink">{name}</p>
                <span
                  className={`rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${platformTone[platform]}`}
                >
                  {platform}
                </span>
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                {description}
              </p>
              <CodeBlock code={code} />
            </div>
          </div>
        ))}
      </div>

      {ignition && (
        <section className="mt-8 overflow-hidden rounded-xl border border-slate-300 bg-white">
          <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-200 bg-slate-50 px-5 py-3.5">
            <span
              aria-hidden
              className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#F7901E] font-mono text-[11px] font-bold text-white"
            >
              IA
            </span>
            <p className="text-sm font-bold text-ink">Ignition Perspective</p>
            <Link
              href="/styles/ignition"
              className="ml-auto text-xs font-semibold text-primary-text hover:underline"
            >
              Theme &amp; setup
            </Link>
          </div>

          <div className="px-5 py-4">
            <p className="text-[13px] leading-relaxed text-slate-600">
              <span className="font-semibold text-ink">Maps to: </span>
              {ignition.maps}
            </p>

            {ignition.styles && (
              <CodeBlock label={ignition.styles.path} code={ignition.styles.json} />
            )}
            {ignition.view && (
              <CodeBlock
                label={ignition.view.path ?? 'view.json — component'}
                code={ignition.view.json}
              />
            )}
            {ignition.script && (
              <CodeBlock label={ignition.script.label} code={ignition.script.code} />
            )}

            {ignition.notes && ignition.notes.length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3.5">
                {ignition.notes.map((n, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600"
                  >
                    <span
                      aria-hidden
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300"
                    />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {notes && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {notes.heading}
          </p>
          <ul className="mt-3 space-y-2">
            {notes.items.map((item, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600"
              >
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/** Wraps a mobile preview in a phone-width surface so it reads at its real scale. */
export function PhoneFrame({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}
