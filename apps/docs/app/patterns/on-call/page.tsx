import Link from 'next/link'
import type { ReactNode } from 'react'

function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[12px] text-ink">
      {children}
    </code>
  )
}

function Rules({ heading, items }: { heading: string; items: ReactNode[] }) {
  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{heading}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-600">
            <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const tiers = [
  { n: 1, who: 'Duty phone · Building 1', chans: 'SMS · UHF', after: 'immediately' },
  { n: 2, who: 'Shift supervisor', chans: 'SMS · Voice', after: 'resend after 5 min' },
  { n: 3, who: 'Operations manager', chans: 'Voice', after: 'resend after 15 min' },
]

export default function OnCallPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Patterns</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">On-call and paging</h1>
      <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-slate-500">
        Who a standing alarm reaches when nobody is at the console, on which channel, and what
        happens when it goes unanswered. It is the one part of the console that acts on its own
        while the control room is empty, so its language has to be precise about what it promises.
      </p>

      {/* ── The naming rule ── */}
      <div className="mt-5 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-[13px] leading-relaxed text-slate-600">
        <strong className="font-semibold text-ink">
          It is a paging window, not a schedule.
        </strong>{' '}
        The window belongs to the <em>group</em> and says when that group is reachable. It is never
        a person&rsquo;s working hours, and assigning someone to a group does not roster them. Call
        it a schedule and the screen starts making a promise about employment that the product
        cannot keep; the copy says only that assigning someone makes them reachable in the window
        and nothing more. An always-on window is <strong>&ldquo;Around the clock&rdquo;</strong>,
        not &ldquo;24/7&rdquo;.
      </div>

      {/* ── Escalation ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Escalation is an ordered list</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        A tier is a recipient, the channels they can be reached on, and when the page repeats.
        Order is the whole model, which is what lets it absorb a response signal later without
        being rebuilt.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[52px_minmax(0,1fr)_140px_180px] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500">
          <span>Tier</span>
          <span>Recipient</span>
          <span>Channels</span>
          <span>Repeat</span>
        </div>
        {tiers.map((t) => (
          <div
            key={t.n}
            className="grid grid-cols-[52px_minmax(0,1fr)_140px_180px] items-center gap-3 border-b border-slate-200 px-4 py-3 text-[13px] last:border-b-0"
          >
            <span className="font-mono text-[11px] tabular-nums text-slate-500">{t.n}</span>
            <span className="text-ink">{t.who}</span>
            <span className="font-mono text-[11px] text-slate-500">{t.chans}</span>
            <span className="text-slate-600">{t.after}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        <strong className="text-ink">Say &ldquo;resend after&rdquo;, not &ldquo;escalate if
        unanswered after&rdquo;</strong>, unless the dispatcher actually reports that a page was
        answered. Most do not. The second phrasing claims the system knows something it does not,
        and an operator who believes it will stop watching. If answer reporting arrives, the tier
        list gains a response column and the copy changes; the model does not, because an ordered
        list is already what response-driven escalation needs.
      </div>

      {/* ── Coverage ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Coverage</h2>
      <p className="mt-1.5 max-w-[68ch] text-[13px] leading-relaxed text-slate-500">
        A group covers an <strong>area</strong>. Empty means the whole facility, which is the safe
        default: a group that covers nothing silently pages nobody. Area coverage is what lets a
        building own its own duty phone, instead of leaning on priority to approximate geography.
      </p>

      <Rules
        heading="Rules"
        items={[
          <>
            <strong className="font-semibold text-ink">Never claim a person responded.</strong>{' '}
            Unless the dispatcher reports it, the product knows only that it sent a page. Every
            label, log line and report has to stay inside that.
          </>,
          <>
            <strong className="font-semibold text-ink">Two independent channels, and do not
            offer a switch for one of them.</strong> SMS and UHF radio are separate paths on
            purpose; that independence is what the NS 9416 conformance argument rests on. A
            site-level radio toggle invites someone to turn off half the redundancy from a
            settings screen. If a radio genuinely fails on its own, surface it beside the dispatch
            status, where an equipment state belongs.
          </>,
          <>
            <strong className="font-semibold text-ink">Show coverage gaps on the group, not in a
            report.</strong> A window with nobody assigned, or a member whose device cannot carry
            the channel the tier uses, is a live fault. It belongs on the card next to the window,
            where someone editing the roster will see it.
          </>,
          <>
            <strong className="font-semibold text-ink">A popover must not be clipped by its own
            card.</strong> The assign control sits inside a card with filled header and footer
            bands; giving that card <C>overflow: hidden</C> to keep the bands inside its radius
            clipped the popover instead. Let the bands carry the radius themselves, and flip the
            popover upward near the bottom of the viewport.
          </>,
          <>
            <strong className="font-semibold text-ink">State the assumptions in one place.</strong>{' '}
            This pattern is built on answers the integrator may not have yet: whether a page is
            reported as answered, whether every duty phone takes every channel, where the roster
            lives. Each is a single flag with a documented default, so a wrong guess is one value
            to change rather than an excavation across five screens.
          </>,
        ]}
      />

      <p className="mt-6 text-[13px] leading-relaxed text-slate-500">
        Related:{' '}
        <Link href="/patterns/alarm-feed" className="font-semibold text-ink hover:underline">
          Alarm feed
        </Link>{' '}
        for what raises the alarm in the first place, and{' '}
        <Link href="/foundations/ux-writing" className="font-semibold text-ink hover:underline">
          UX writing
        </Link>{' '}
        for the wider rule this page&rsquo;s naming follows.
      </p>
    </div>
  )
}
