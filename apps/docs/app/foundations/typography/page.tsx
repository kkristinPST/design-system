import { typeScale, mobileTypeScale, fontWeights } from '@njord/tokens'

const order = [
  'display', 'metric', 'h1', 'title', 'readout', 'h2', 'cardTitle', 'bodyStrong', 'body',
  'sectionLabel', 'small', 'data', 'tag', 'caption', 'eyebrow', 'badge', 'axis',
] as const

const sample: Record<string, string> = {
  display: '87',
  readout: '2.41 bar',
  axis: '06:00  12:00  18:00',
  metric: '1 284',
  data: '6.24 mg/L',
  tag: 'PT-1201',
  badge: 'Critical',
  eyebrow: 'Active alarms',
  sectionLabel: 'Rationalization',
}

export default function TypographyPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Foundations</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Typography</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        Two families with one rule between them: <strong>Inter</strong> carries language,{' '}
        <strong>JetBrains Mono</strong> carries every number, tag, duration and setpoint. If the
        plant assigned it, it is mono; if a person wrote it, it is sans.
      </p>

      {/* ── Families ── */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">Sans</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-ink">Inter</p>
          <p className="mt-1 font-mono text-[11px] text-primary-text">font-sans</p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
            Labels, prose, buttons, navigation. Weights 400 – 800.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">Mono</p>
          <p className="mt-2 font-mono text-2xl text-ink">JetBrains Mono</p>
          <p className="mt-1 font-mono text-[11px] text-primary-text">font-mono</p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
            Readings, tags, timestamps, counts. Always{' '}
            <span className="font-mono text-xs">tabular-nums</span>.
          </p>
        </div>
      </div>

      {/* ── Naming ── */}
      <div className="mt-4 rounded-xl border border-slate-300 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-ink">How to reference the scale</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
          Every role below is three tokens — size, line height and, where it is not zero, letter
          spacing. Add the prefix for your build:
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Ignition Perspective
            </p>
            <p className="mt-1 font-mono text-[12px] leading-relaxed text-ink">
              fontSize: var(--njord-text-body)
              <br />
              lineHeight: var(--njord-lh-body)
              <br />
              letterSpacing: var(--njord-ls-eyebrow)
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Web build
            </p>
            <p className="mt-1 font-mono text-[12px] leading-relaxed text-ink">
              class=&quot;text-body&quot;
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
              One Tailwind class carries size and line height together.
            </p>
          </div>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-slate-600">
          Weight is not a token — set it from the number in each row. The HMI scale is in{' '}
          <span className="font-mono text-[11px]">px</span>; the web scale is the same values in{' '}
          <span className="font-mono text-[11px]">rem</span>, so browser text-size settings still
          work.
        </p>
      </div>

      {/* ── Scale ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Scale</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {order.map((key) => {
          const t = typeScale[key]
          const isMono = t.fontFamily === 'mono'
          return (
            <div key={key} className="border-b border-slate-100 px-5 py-4 last:border-b-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span
                  className={isMono ? 'font-mono text-ink tabular-nums' : 'text-ink'}
                  style={{
                    fontSize: t.fontSize,
                    lineHeight: t.lineHeight,
                    fontWeight: t.fontWeight,
                    letterSpacing: t.letterSpacing,
                    textTransform: 'transform' in t ? (t.transform as 'uppercase') : undefined,
                  }}
                >
                  {sample[key] ?? 'Dissolved oxygen low-low'}
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  {t.fontSize} / {t.lineHeight} · {t.fontWeight}
                  {t.letterSpacing !== '0' ? ` · ${t.letterSpacing}` : ''}
                </span>
              </div>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-primary-text">
                  text-{t.token}
                </code>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-primary-text">
                  lh-{t.token}
                </code>
                {t.letterSpacing !== '0' && (
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-primary-text">
                    ls-{t.token}
                  </code>
                )}
                <span className="basis-full sm:basis-auto">{t.usage}</span>
              </p>
            </div>
          )
        })}
      </div>

      {/* ── Mobile ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Mobile overrides</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        The phone build re-tunes a handful of roles for a 393px viewport — titles get heavier,
        metrics get much larger, and labels get tighter. Everything not listed is shared with
        desktop.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {Object.entries(mobileTypeScale).map(([key, v]) => (
          <div key={key} className="flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-100 px-5 py-3.5 last:border-b-0">
            <span
              className={'fontFamily' in v && v.fontFamily === 'mono' ? 'font-mono text-ink tabular-nums' : 'text-ink'}
              style={{
                fontSize: v.fontSize,
                lineHeight: v.lineHeight,
                fontWeight: v.fontWeight,
                letterSpacing: v.letterSpacing,
              }}
            >
              {key === 'vitalValue' || key === 'readValue' ? '6.2' : key === 'badge' ? 'CRIT' : 'Dissolved oxygen'}
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              {key} · {v.fontSize} / {v.fontWeight}
            </span>
          </div>
        ))}
      </div>

      {/* ── Weights ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Weights</h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {Object.entries(fontWeights).map(([name, w]) => (
          <div key={name} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
            <p className="text-lg text-ink" style={{ fontWeight: w }}>
              Aa
            </p>
            <p className="mt-1 font-mono text-[11px] text-slate-400">
              {name} · {w}
            </p>
          </div>
        ))}
      </div>

      {/* ── Rules ── */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Every mono role is <code className="font-mono text-[12px]">tabular-nums</code>. A
              polling value with proportional digits jitters, and a column of durations will not
              align.
            </>,
            <>
              Screens carry no in-page <code className="font-mono text-[12px]">h1</code> — the top
              bar owns the page title, so the content below keeps the same y on every screen.
            </>,
            <>
              Text size is a user preference implemented as{' '}
              <code className="font-mono text-[12px]">zoom</code> on the working area, not a
              font-size sweep. The layout reflows at the new size, so nothing can overlap.
            </>,
            <>
              Never set a sentence in mono, and never set an equipment tag in sans. The family is
              what tells an operator whether a string is a word or an address.
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
