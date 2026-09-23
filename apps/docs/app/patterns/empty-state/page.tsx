import Link from 'next/link'
import type { ReactNode } from 'react'

import CodeBlock from '../../../components/CodeBlock'

function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[12px] text-ink">
      {children}
    </code>
  )
}

type Tone = 'info' | 'neutral' | 'good' | 'warn'

const toneClass: Record<Tone, string> = {
  info: 'bg-primary-bg text-primary-text',
  neutral: 'bg-slate-100 text-slate-400',
  good: 'bg-success-bg text-success-text',
  warn: 'bg-warning-bg text-warning-text',
}

const reasons: {
  key: string
  when: string
  icon: string
  tone: Tone
  action: string
  glyph: ReactNode
}[] = [
  {
    key: 'empty',
    when: 'Nothing exists yet',
    icon: 'inbox',
    tone: 'info',
    action: 'The primary action that creates the first one',
    glyph: <path d="M4 13h4l1 3h6l1-3h4M4 13 6 5h12l2 8v6H4v-6Z" />,
  },
  {
    key: 'filtered',
    when: 'A filter excludes everything',
    icon: 'filter-x',
    tone: 'neutral',
    action: 'Clear filters · never a create action',
    glyph: <path d="M3 4h18l-7 8v6l-4 2v-8L3 4ZM17 15l4 4M21 15l-4 4" />,
  },
  {
    key: 'search',
    when: 'A query excludes everything',
    icon: 'search-x',
    tone: 'neutral',
    action: 'Echo the query in the title, offer Clear search',
    glyph: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM21 21l-4.35-4.35M9 9l4 4M13 9l-4 4" />,
  },
  {
    key: 'resolved',
    when: 'Nothing is wrong',
    icon: 'check-circle-2',
    tone: 'good',
    action: 'None · this is good news',
    glyph: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  },
  {
    key: 'blocked',
    when: 'Not permitted, or switched off',
    icon: 'lock',
    tone: 'warn',
    action: 'None · say who can change it',
    glyph: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    key: 'error',
    when: 'The fetch failed',
    icon: 'alert-triangle',
    tone: 'warn',
    action: 'Retry',
    glyph: <path d="M12 4 2.5 20h19L12 4ZM12 10v4M12 17h.01" />,
  },
]

const sizes = [
  { name: 'region', padding: '72 / 24', tile: '56px', gap: '14', title: 'card-title', use: 'A whole card or panel' },
  { name: 'card', padding: '48 / 24', tile: '48px', gap: '12', title: 'body-strong', use: 'A dialog body or list card' },
  { name: 'compact', padding: '32 / 20', tile: '40px', gap: '10', title: 'body-strong', use: 'A small panel or side rail' },
  { name: 'row', padding: '32 / 20', tile: '24px, no tile', gap: '10', title: 'body', use: 'Inside a table body · laid out horizontally' },
]

const loading = [
  {
    band: 'Under ~1s',
    show: 'Nothing',
    why: 'A flash of skeleton is worse than a beat of stillness.',
  },
  {
    band: '1–2s',
    show: 'Spinner in the pressed control',
    why: 'The feedback belongs where the click happened. The button keeps its label, gains aria-busy, and its leading icon is swapped for the spinner; so it never changes width under the cursor.',
  },
  {
    band: 'Over ~2s, total unknown',
    show: 'Skeleton in the shape of the content',
    why: 'The operator can start reading the layout before the data lands.',
  },
  {
    band: 'Over ~2s, total known',
    show: 'Determinate bar + Cancel',
    why: 'A long job must be interruptible, and the percentage must be the true ratio of work completed.',
  },
]

function Tile({ size, tone, glyph }: { size: number; tone: Tone; glyph: ReactNode }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl ${toneClass[tone]}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {glyph}
      </svg>
    </div>
  )
}

export default function StatesPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Patterns</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Empty &amp; loading states</h1>
      <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-slate-500">
        Every surface that can hold data can also be empty, and there are six different reasons for
        it. Collapsing them into one &ldquo;No data&rdquo; is how an operator loses the ability to
        tell a quiet plant from a broken query. One anatomy, four sizes, six reasons; and one
        component, so no screen invents a fifth shape of nothing-here.
      </p>

      <div className="mt-6 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        These are <strong className="font-semibold text-ink">behavioural</strong> rules: which
        state to show, when, and what it may offer. Geometry and colour come from the tokens. For
        the markup of a single instance see{' '}
        <Link href="/components/empty-state" className="font-semibold text-primary-text hover:underline">
          Components → Empty state
        </Link>
        .
      </div>

      {/* ── Anatomy ── */}
      <h2 className="mt-10 text-base font-bold text-ink">One anatomy</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Vertical and centred: icon tile → title → one line of body → optional actions. Body copy is
        capped at 360px with <C>text-wrap: pretty</C>; the icon tile takes <C>radius-lg</C>.
      </p>
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-8">
        <div className="flex flex-col items-center gap-[14px] text-center">
          <Tile size={56} tone="neutral" glyph={reasons[1].glyph} />
          <p className="text-base font-bold text-ink">No alarms match these filters</p>
          <p className="max-w-[360px] text-[13px] leading-relaxed text-slate-600">
            Priority: Critical, High · Area: RAS 2 · Last 24 hours
          </p>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
            Clear filters
          </button>
        </div>
      </div>

      {/* ── Sizes ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Four sizes</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Picked by the container, not by how important the message feels. Note that{' '}
        <C>row</C> is the odd one: no tile, and laid out <strong>horizontally</strong> so it sits
        inside a table body without breaking the grid.
      </p>
      <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr>
              {['Size', 'Padding', 'Icon tile', 'Gap', 'Title role', 'Use'].map((h) => (
                <th
                  key={h}
                  className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizes.map(({ name, padding, tile, gap, title, use }) => (
              <tr key={name}>
                <td className="border-b border-slate-100 px-4 py-2.5 font-mono text-[11px] text-primary-text">
                  {name}
                </td>
                <td className="border-b border-slate-100 px-4 py-2.5 font-mono text-xs text-slate-600">
                  {padding}
                </td>
                <td className="border-b border-slate-100 px-4 py-2.5 font-mono text-xs text-slate-600">
                  {tile}
                </td>
                <td className="border-b border-slate-100 px-4 py-2.5 font-mono text-xs text-slate-600">
                  {gap}
                </td>
                <td className="border-b border-slate-100 px-4 py-2.5 font-mono text-xs text-slate-600">
                  {title}
                </td>
                <td className="border-b border-slate-100 px-4 py-2.5 text-[13px] text-slate-500">
                  {use}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
        Every number here is on the spacing scale: <C>sp-72</C>, <C>sp-56</C>, <C>sp-48</C>,{' '}
        <C>sp-24</C>, <C>sp-20</C>, <C>sp-14</C>, <C>sp-12</C>, <C>sp-10</C>. See{' '}
        <Link href="/foundations/spacing" className="font-semibold text-primary-text hover:underline">
          Spacing
        </Link>
        .
      </p>

      {/* ── Inline tier ── */}
      <h3 className="mt-8 text-sm font-bold text-ink">Below the four: the inline tier</h3>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        A single muted line (no tile, no title, no action) for a dropdown, popover or sub-panel
        where a full empty state would dominate its container. It is a{' '}
        <strong>separate component</strong>, not a fifth size: nothing about it is configurable
        except alignment.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
            Centred: default
          </p>
          <div className="rounded-lg border border-slate-200 px-[14px] py-3 text-center text-xs text-slate-500">
            No matching parameters
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
            Left; for left-aligned lists
          </p>
          <div className="rounded-lg border border-slate-200 px-[2px] py-2.5 pl-3 text-xs text-slate-500">
            No one assigned
          </div>
        </div>
      </div>

      {/* ── Reasons ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Six reasons</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        The reason decides the icon, the tone and: the point of it; what action is offered. Tone
        paints <strong>only the icon tile</strong>; the title and body stay neutral, so an empty
        state can never be mistaken for an alarm.
      </p>
      <div className="mt-5 space-y-3">
        {reasons.map(({ key, when, icon, tone, action, glyph }) => (
          <div
            key={key}
            className="flex flex-wrap items-start gap-4 rounded-xl border border-slate-200 bg-white p-5"
          >
            <Tile size={40} tone={tone} glyph={glyph} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2.5">
                <code className="font-mono text-[12px] font-semibold text-primary-text">{key}</code>
                <p className="text-sm font-semibold text-ink">{when}</p>
              </div>
              <p className="mt-1 text-[12px] text-slate-500">
                <span className="font-mono">{icon}</span> · tone {tone}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                <span className="font-semibold text-ink">Action: </span>
                {action}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── The resolved rule ── */}
      <div className="mt-5 rounded-xl border border-critical-mid bg-critical-bg p-5">
        <p className="text-sm font-semibold text-critical-text">
          The <code className="font-mono">resolved</code> rule, safety-relevant
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-critical-text">
          <strong className="font-semibold">
            <code className="font-mono">resolved</code> is only legal when nothing is narrowing the
            list.
          </strong>{' '}
          On any view with a search box or filter chips the reason must be computed, never
          hard-coded:
        </p>
        <CodeBlock code={`reason = q ? "search" : filter ? "filtered" : "resolved"`} />
        <p className="mt-3 text-[13px] leading-relaxed text-critical-text">
          Hard-coding it caused a real defect on the Active alarm list: a text search that matched
          nothing rendered a green check and &ldquo;No standing alarms&rdquo; while 18 alarms were
          standing and merely filtered out. That is the highest-consequence sentence in the product.
          A view may only hard-code <code className="font-mono">resolved</code> if it has no filter
          input at all.
        </p>
      </div>

      {/* ── Loading ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Loading, by duration</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        Which indicator to show is decided by how long the work takes, not by preference. Measure
        first.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {loading.map(({ band, show, why }, i) => (
          <div key={band} className={`px-5 py-4 ${i > 0 ? 'border-t border-slate-100' : ''}`}>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="w-[168px] shrink-0 font-mono text-xs font-semibold text-ink">
                {band}
              </span>
              <span className="text-[13px] font-semibold text-ink">{show}</span>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{why}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-sm font-bold text-ink">How each one is drawn</h3>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {[
          ['Skeleton', 'slate-100 fill, radius-sm, a 1.4s sweep of surface at 70% alpha. Disabled under prefers-reduced-motion. Variants: text (lines of varied width, 12px tall, 10px apart), block, chart (bar silhouette on a hairline baseline), table (rows on hairlines).'],
          ['Spinner', '2px ring in currentColor over a 25%-alpha track, 700ms linear; 2.4s under reduced motion.'],
          ['Progress', 'Label (body-strong) and percentage (mono 12px, tabular) on one row; 6px track in slate-100 with a primary fill; a sub-line (small, slate-500) stating the real counts; Cancel right-aligned. The indeterminate variant is a 32% band sliding on 1.1s.'],
        ].map(([name, spec], i) => (
          <div key={name} className={`px-5 py-4 ${i > 0 ? 'border-t border-slate-100' : ''}`}>
            <p className="text-[13px] font-semibold text-ink">{name}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{spec}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
        The loop durations are tokens: <C>d-shimmer</C>, <C>d-spin</C>, <C>d-spin-reduced</C>,{' '}
        <C>d-indeterminate</C>; see{' '}
        <Link href="/styles/motion" className="font-semibold text-primary-text hover:underline">
          Motion
        </Link>
        . The ~1s and ~2s thresholds are perception boundaries, not token values.
      </p>

      <div className="mt-4 rounded-xl border border-critical-mid bg-critical-bg p-5">
        <p className="text-sm font-semibold text-critical-text">Progress is never faked</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-critical-text">
          A determinate bar must be driven by real work done in real chunks, so the percentage is the
          true ratio of work completed and Cancel genuinely stops it. An animated bar that tracks
          nothing teaches operators that progress is decorative; and then they cannot tell a slow
          export from a hung one. <strong className="font-semibold">If the total is unknown, use a
          skeleton, not a bar.</strong> Cancelling must leave nothing written, and say so.
        </p>
      </div>

      {/* ── Copy ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Copy</h2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
        <ul className="space-y-2">
          {[
            <>
              Titles state the condition. Sentence case, no full stop:{' '}
              <em>&ldquo;No trend groups yet&rdquo;</em>.
            </>,
            <>
              Body is one line, imperative where an action follows:{' '}
              <em>
                &ldquo;Plot the parameters you analyse together, then save them as a group&rdquo;
              </em>
              .
            </>,
            <>
              Loading copy names the work and its size:{' '}
              <em>&ldquo;Sampling 3 signals over the last 7 d&rdquo;</em>. Never a bare
              &ldquo;Loading…&rdquo;.
            </>,
            <>No exclamation marks, no apology, no emoji.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Rules ── */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
            <>
              <strong className="font-semibold text-ink">Instructions belong in the empty state,
              not above the working screen.</strong> A permanent how-to on a screen someone opens
              daily is a layout cost, not guidance: it is read once and then occupies chart height
              forever. Put it where there is nothing to look at yet, and it disappears the moment
              it stops being needed.
            </>,
          {[
            <>
              One shared implementation. Nothing else may define its own empty-state or loading
              shape; a fifth shape is how the pattern dies.
            </>,
            <>
              Never merge <C>empty</C> and <C>filtered</C> into one message. &ldquo;No trend
              groups&rdquo; and &ldquo;No trend groups match&rdquo; need different copy and different
              actions, and merging them strands whoever filtered too hard.
            </>,
            <>
              Only <C>empty</C> offers a create action. Offering one on a filtered list invites a
              duplicate record.
            </>,
            <>
              An em-dash in an empty table <em>cell</em> is not an empty state; that is a missing
              value, not a missing set. Leave it alone.
            </>,
            <>
              A table&rsquo;s empty state is the <C>row</C> size, spanning all columns; never a
              floating block that detaches from the header.
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
