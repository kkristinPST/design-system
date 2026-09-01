import { durations, easings, keyframes } from '@njord/tokens'

// Durations, easings and keyframes all come from the token package — every name
// shown here is a name that ships in the theme file.
const durationRows = Object.entries(durations).map(([token, d]) => ({
  token,
  ms: d.value,
  use: d.use,
}))

const easingRows = Object.entries(easings).map(([token, e]) => ({
  token,
  curve: e.value,
  use: e.use,
}))

const named = Object.entries(keyframes).map(([name, k]) => ({
  name,
  css: k.css.replace(/var\(--PRIMARY_BG\)/g, 'primary-bg')
    .replace(/var\(--PRIMARY\)/g, 'primary')
    .replace(/var\(--SURFACE\)/g, 'surface'),
  use: k.use,
}))

export default function MotionPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Styles</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Motion</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        Motion here is functional, never decorative. It shows where a panel came from and confirms
        that a press registered — nothing more. In a control room, an animation that delays
        information is a defect.
      </p>

      {/* ── Durations ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Duration</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {durationRows.map(({ token, ms, use }) => (
          <div key={token} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-slate-100 px-5 py-3.5 last:border-b-0">
            <span className="w-16 shrink-0 font-mono text-xs font-semibold text-ink tabular-nums">{ms}</span>
            <span className="w-24 shrink-0 font-mono text-[11px] text-primary-text">{token}</span>
            <span className="flex-1 text-[13px] text-slate-600">{use}</span>
          </div>
        ))}
      </div>

      {/* ── Easing ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Easing</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {easingRows.map(({ token, use, curve }) => (
          <div key={token} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-slate-100 px-5 py-3.5 last:border-b-0">
            <span className="w-24 shrink-0 font-mono text-[11px] text-primary-text">{token}</span>
            <span className="flex-1 text-[13px] text-slate-600">{use}</span>
            <span className="font-mono text-[11px] text-slate-400">{curve}</span>
          </div>
        ))}
      </div>

      {/* ── Keyframes ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Named keyframes</h2>
      <div className="mt-5 space-y-3">
        {named.map(({ name, css, use }) => (
          <div key={name} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-mono text-[13px] font-semibold text-ink">{name}</span>
              <span className="text-xs text-slate-500">{use}</span>
            </div>
            <pre className="mt-2.5 overflow-x-auto rounded-md bg-ink px-3.5 py-2.5 font-mono text-[11px] leading-relaxed text-slate-300">
              {css}
            </pre>
          </div>
        ))}
      </div>

      {/* ── What animates ── */}
      <h2 className="mt-10 text-base font-bold text-ink">What may animate</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--color-success)_30%,transparent)] bg-success-bg p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-success-text">Yes</p>
          <ul className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed text-slate-700">
            <li>· Panels entering and leaving (transform + opacity)</li>
            <li>· Hover and press feedback on controls</li>
            <li>· A row highlighting after a cross-screen jump</li>
            <li>· Indeterminate spinners</li>
          </ul>
        </div>
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--color-critical)_28%,transparent)] bg-critical-bg p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-critical-text">No</p>
          <ul className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed text-slate-700">
            <li>· A live process value counting up to its reading</li>
            <li>· Charts drawing themselves on load</li>
            <li>· Alarms fading or sliding in — they appear immediately</li>
            <li>· Anything that delays a number an operator is waiting for</li>
          </ul>
        </div>
      </div>

      {/* ── Reduced motion ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Reduced motion</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Both builds honour the OS setting, collapsing every animation and transition to effectively
        zero. Nothing is lost, because motion is never the only carrier of meaning.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-md bg-ink px-4 py-3 font-mono text-[11px] leading-relaxed text-slate-300">
{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}`}
      </pre>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Animate <code className="font-mono text-[12px]">transform</code> and{' '}
              <code className="font-mono text-[12px]">opacity</code> only. Animating width, height
              or offsets forces layout on every frame.
            </>,
            <>
              Entry may animate; <strong>arrival of information may not</strong>. An alarm appears
              at full opacity the instant it exists.
            </>,
            <>
              Nothing exceeds 300ms except the deliberate one-second row highlight, which is a
              wayfinding cue rather than a transition.
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
