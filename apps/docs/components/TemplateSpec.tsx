import Link from 'next/link'
import type { ReactNode } from 'react'

import CodeBlock from './CodeBlock'

/**
 * The build spec that sits under every template preview.
 *
 * The preview above it shows WHAT the screen looks like and the anatomy list
 * says what each region is. This says how to actually construct it in
 * Perspective: which components it needs, where it reflows, and what to watch
 * for. Developers reach this system as a URL and nothing else, so the screen
 * spec has to be complete on the page.
 */
export type TemplateSpecProps = {
  /** Component slugs this screen is assembled from; links to each spec page. */
  uses: string[]
  /** Suggested Perspective view path. */
  viewPath: string
  /** The composition, as a view tree sketch. */
  tree: string
  /** Reflow points that actually affect THIS screen, from Responsive & reflow. */
  reflow: [string, string][]
  /** Screen-specific things that go wrong if missed. */
  watchFor: ReactNode[]
}

const label = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase())

export default function TemplateSpec({
  uses,
  viewPath,
  tree,
  reflow,
  watchFor,
}: TemplateSpecProps) {
  return (
    <section className="mt-8 overflow-hidden rounded-xl border border-slate-300 bg-white">
      <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-200 bg-slate-50 px-5 py-3.5">
        <span
          aria-hidden
          className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#F7901E] font-mono text-[11px] font-bold text-white"
        >
          IA
        </span>
        <p className="text-sm font-bold text-ink">Build spec</p>
        <Link
          href="/styles/ignition"
          className="ml-auto text-xs font-semibold text-primary-text hover:underline"
        >
          Theme &amp; setup
        </Link>
      </div>

      <div className="px-5 py-4">
        {/* ── Inventory ── */}
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Components it is built from
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
          Build these first; each page carries its style-class JSON and view JSON.
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {uses.map((slug) => (
            <Link
              key={slug}
              href={`/components/${slug}`}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-ink"
            >
              {label(slug)}
            </Link>
          ))}
        </div>

        {/* ── Composition ── */}
        <p className="mt-5 text-xs font-bold uppercase tracking-widest text-slate-400">
          Composition
        </p>
        <CodeBlock label={viewPath} code={tree} />

        {/* ── Reflow ── */}
        <p className="mt-5 text-xs font-bold uppercase tracking-widest text-slate-400">
          Where this screen reflows
        </p>
        <div className="mt-2.5 overflow-hidden rounded-lg border border-slate-200">
          {reflow.map(([at, what], i) => (
            <div
              key={at}
              className={`flex flex-wrap items-baseline gap-x-3 px-3.5 py-2 ${
                i > 0 ? 'border-t border-slate-100' : ''
              }`}
            >
              <span className="w-16 shrink-0 font-mono text-[11px] font-semibold text-ink">
                {at}
              </span>
              <span className="text-[12px] leading-relaxed text-slate-600">{what}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
          The full ladder, and the five rules behind it, are on{' '}
          <Link
            href="/patterns/responsive-and-reflow"
            className="font-semibold text-primary-text hover:underline"
          >
            Responsive &amp; reflow
          </Link>
          . Breakpoints are shared across the console; never invent a per-screen one.
        </p>

        {/* ── Watch for ── */}
        <p className="mt-5 text-xs font-bold uppercase tracking-widest text-slate-400">
          Watch for
        </p>
        <ul className="mt-2.5 space-y-2">
          {watchFor.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
