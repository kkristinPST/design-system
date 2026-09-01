import Link from 'next/link'

import { iconSizes, iconStroke, iconSet, iconGroups } from '@njord/tokens'

import CodeBlock from '../../../components/CodeBlock'
import { iconGeometry, type IconNode } from '../../../components/lucide-geometry'

/**
 * One glyph, drawn from the vendored lucide geometry.
 *
 * Every icon on this page renders from the same data the application does, so a
 * glyph shown here cannot disagree with the glyph that ships.
 */
function Glyph({
  name,
  size = 24,
  strokeWidth = 2,
}: {
  name: string
  size?: number
  strokeWidth?: number | string
}) {
  const nodes: readonly IconNode[] | undefined = iconGeometry[name]
  if (!nodes) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {nodes.map(([Tag, attrs], i) => {
        const El = Tag as keyof React.JSX.IntrinsicElements
        return <El key={i} {...attrs} />
      })}
    </svg>
  )
}

const usage = `// The app resolves an icon by its Lucide name at render time.
<Icon name="alert-triangle" size={16} />

// Perspective: an SVG icon library path, library/icon
{
  "type": "ia.display.icon",
  "props": {
    "path": "lucide/alert-triangle",
    "color": "currentColor",
    "style": { "width": "16px", "height": "16px" }
  }
}`

export default function IconsPage() {
  const total = iconGroups.reduce((n, g) => n + g.icons.length, 0)

  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Styles</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Icons</h1>
      <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-slate-500">
        The set is <strong className="font-semibold text-ink">Lucide</strong>, pinned at v
        {iconSet.version} — a 24×24 outline family at stroke 2, round caps and joins, inheriting{' '}
        <code className="font-mono text-xs">currentColor</code>. All {total} glyphs the application
        uses are listed below, under Lucide&rsquo;s own names.
      </p>

      <div className="mt-5 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-[13px] leading-relaxed text-slate-600">
        <strong className="font-semibold text-ink">The name is the contract.</strong> Each name
        below is the literal string passed to the icon component, and it is Lucide&rsquo;s name,
        not a label invented for this page. There is no <code className="font-mono text-[11px]">close</code>,{' '}
        <code className="font-mono text-[11px]">edit</code>,{' '}
        <code className="font-mono text-[11px]">trend</code> or{' '}
        <code className="font-mono text-[11px]">alert</code> — they are{' '}
        <code className="font-mono text-[11px]">x</code>,{' '}
        <code className="font-mono text-[11px]">pencil</code>,{' '}
        <code className="font-mono text-[11px]">line-chart</code> and{' '}
        <code className="font-mono text-[11px]">alert-triangle</code>. A name that is not in Lucide
        resolves to null and the icon{' '}
        <strong className="font-semibold text-ink">silently renders as nothing</strong> — no error,
        no fallback glyph. Copy the names exactly.
      </div>

      {/* ── The set ── */}
      <h2 className="mt-10 text-base font-bold text-ink">The set</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Grouped by what the glyph is for. The number is how many call sites use it in the source
        application — high counts are the established choice for that job; a count of 1 is a
        one-off and a candidate for consolidation, not a precedent to copy.
      </p>

      <div className="mt-5 space-y-7">
        {iconGroups.map((group) => (
          <section key={group.title}>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
                {group.title}
              </h3>
              <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                {group.icons.length}
              </span>
            </div>
            {group.note ? (
              <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{group.note}</p>
            ) : null}
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {group.icons.map(({ name, count }) => (
                <div
                  key={name}
                  className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5"
                >
                  <span className="flex shrink-0 text-slate-600">
                    <Glyph name={name} size={20} />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-ink" title={name}>
                    {name}
                  </span>
                  <span
                    className="shrink-0 font-mono text-[10px] text-slate-400 tabular-nums"
                    title={`${count} call site${count === 1 ? '' : 's'}`}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        <strong className="text-ink">Equipment symbols are not icons.</strong> Pump, tank, valve,
        blower and the rest are drawn SVG on a stricter vocabulary, and none of them exists in
        Lucide. They live on{' '}
        <Link href="/components/scada-symbols" className="font-semibold text-ink hover:underline">
          SCADA symbols
        </Link>
        . Do not substitute a Lucide glyph for one, and do not mix the two sets in the same view.
      </div>

      {/* ── Sizes ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Sizes</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Always drawn on a 24×24 viewBox and rendered at one of these six sizes. Stroke stays 2 at
        every size — it is <em>not</em> scaled with the glyph, or a small icon turns spindly and a
        large one turns fat.
      </p>
      <div className="mt-4 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-[13px] leading-relaxed text-slate-600">
        <strong className="font-semibold text-ink">The rule that picks one:</strong> an icon&rsquo;s
        size follows the <em>text</em> it sits with, not the container it sits in. A 16px glyph
        beside 14/20 body reads as part of the sentence; the same glyph in a 40px button still
        follows the label, not the button. Sizing by container is what produced thirteen different
        icon sizes across the app — 10, 11, 13, 15, 17, 19, 22, 23 and 26, none of them named.
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {Object.entries(iconSizes).map(([token, s], i) => {
          const px = Number.parseInt(s.value, 10)
          return (
            <div
              key={token}
              className={`flex items-center gap-4 px-5 py-3 ${i > 0 ? 'border-t border-slate-100' : ''}`}
            >
              <span className="flex w-8 shrink-0 justify-center text-slate-600">
                <Glyph name="bell" size={px} />
              </span>
              <span className="w-12 shrink-0 font-mono text-xs text-slate-400 tabular-nums">
                {s.value}
              </span>
              <span className="w-24 shrink-0 font-mono text-[11px] text-primary-text">
                --{token}
              </span>
              <span className="text-[13px] text-slate-600">{s.use}</span>
            </div>
          )
        })}
      </div>

      {/* ── Stroke ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Stroke</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
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
              <Glyph name="bell" size={24} strokeWidth={st.value} />
            </span>
            <span className="w-12 shrink-0 font-mono text-xs text-slate-400 tabular-nums">
              {st.value}
            </span>
            <span className="w-40 shrink-0 font-mono text-[11px] text-primary-text">--{token}</span>
            <span className="text-[13px] text-slate-600">{st.use}</span>
          </div>
        ))}
      </div>

      {/* ── Usage ── */}
      <h2 className="mt-10 text-base font-bold text-ink">In context</h2>
      <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
        <button className="inline-flex items-center gap-[7px] rounded-md border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm">
          <Glyph name="download" size={14} />
          Export
        </button>
        <button
          aria-label="More actions"
          className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-sm text-slate-400 hover:bg-slate-100 hover:text-ink"
        >
          <Glyph name="more-vertical" size={16} />
        </button>
        <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-600">
          <Glyph name="clock" size={14} />
          Active for 04:12:38
        </span>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-critical-text">
          <Glyph name="alert-triangle" size={16} />
          DO high
        </span>
      </div>

      {/* ── Getting the set into Perspective ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Getting the set into Perspective</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Perspective ships Material icons, not Lucide, so the set has to be added as an SVG icon
        library on the gateway. Once installed, an icon is addressed as{' '}
        <code className="font-mono text-xs">library/name</code> — keep the library named{' '}
        <code className="font-mono text-xs">lucide</code> and every path below matches the names on
        this page exactly.
      </p>
      <div className="mt-4">
        <CodeBlock code={usage} label="Icon reference — app and Perspective" />
      </div>
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        Install only the {total} glyphs on this page rather than all {'1,700+'} in Lucide. The set
        being small and named is the point — an open library is how thirteen sizes and four
        different &ldquo;edit&rdquo; glyphs got in last time. Source them from{' '}
        <a
          href="https://lucide.dev"
          className="font-semibold text-ink hover:underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          lucide.dev
        </a>{' '}
        at v{iconSet.version} ({iconSet.license} licence) so the geometry matches this reference.
      </div>

      {/* ── Rules ── */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Use a name from this page. A name that is not in the set resolves to null and renders
              nothing at all — the failure is silent, so a typo ships.
            </>,
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
              An icon clarifies a label; it almost never replaces one. The exceptions are the
              close, overflow and chevron controls, where the glyph is the convention.
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
