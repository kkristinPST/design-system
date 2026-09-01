import { severity, severityChip } from '@njord/tokens'

const levels = [
  {
    key: 'critical',
    label: 'Critical',
    meaning: 'Immediate action required. Safety, fish welfare or equipment damage.',
    response: 'Respond now',
  },
  {
    key: 'high',
    label: 'High',
    meaning: 'Prompt action required to prevent escalation.',
    response: 'Respond within minutes',
  },
  {
    key: 'medium',
    label: 'Medium',
    meaning: 'Informational. A deviation worth knowing about.',
    response: 'Review this shift',
  },
  {
    key: 'low',
    label: 'Low',
    meaning: 'Minor deviation, no immediate consequence.',
    response: 'Review when convenient',
  },
  {
    key: 'diagnostic',
    label: 'Diagnostic',
    meaning: 'Instrument or system health, not a process condition.',
    response: 'Maintenance',
  },
  {
    key: 'ok',
    label: 'Normal',
    meaning: 'Within band. Not an alarm.',
    response: '—',
  },
] as const

const states = [
  ['U', 'Unack', 'Active, not yet acknowledged', 'bg-critical-bg text-critical-text'],
  ['A', 'Ack', 'Active, acknowledged by an operator', 'bg-slate-100 text-slate-600'],
  ['R', 'RTN', 'Returned to normal, not yet acknowledged', 'bg-warning-bg text-warning-text'],
  ['N', 'Normal', 'Inactive and acknowledged', 'bg-success-bg text-success-text'],
]

const suppression = [
  ['S', 'Shelved', 'Operator-suppressed with an expiry', 'bg-warning-bg text-warning-text'],
  ['O', 'Out of service', 'Maintenance-suppressed, needs a work order', 'bg-slate-100 text-slate-600'],
]

export default function SeverityAndStatusPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Foundations</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Severity &amp; status</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        The alarm vocabulary, governed by ISA-18.2 and ISA-101. Severity says how urgently to act;
        state says where the alarm is in its lifecycle; suppression says why it is not annunciating.
        The three are independent, and the interface shows all three at once.
      </p>

      {/* ── Severity ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Severity</h2>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[110px_1fr_150px] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500">
          <span>Level</span><span>Meaning</span><span>Expected response</span>
        </div>
        {levels.map(({ key, label, meaning, response }) => {
          const s = severity[key]
          return (
            <div key={key} className="grid grid-cols-[110px_1fr_150px] items-start gap-3 border-b border-slate-200 px-4 py-3 last:border-b-0">
              <span className="flex items-center gap-2">
                <span className="h-[9px] w-[9px] shrink-0 rounded-full shadow-[0_0_0_1px_rgba(15,24,43,0.16)]" style={{ background: s.mark }} />
                <span className="text-[13px] font-semibold" style={{ color: s.text }}>{label}</span>
              </span>
              <span className="text-[13px] leading-relaxed text-slate-600">{meaning}</span>
              <span className="text-[13px] text-slate-500">{response}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-5 rounded-lg border border-[color-mix(in_srgb,var(--color-medium)_28%,transparent)] bg-medium-bg px-4 py-3 text-[12px] leading-relaxed text-medium-text">
        <strong>Medium has its own royal blue</strong> (#2563EB), deliberately not the brand cyan.
        Under ISA-101 alarm colour is reserved for alarm state — and cyan already means link, focus
        and selection everywhere else in the console.
      </div>

      {/* ── Filled chips ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Filled severity chips</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        A solid badge that carries its own label, for the places a tint would disappear — on a
        tinted alarm ribbon, on a tab-bar badge. Each fill is paired with the one ink that clears
        AA on it at 9px. Use the pair; never mix a fill with a different ink.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[130px_1fr_110px_90px] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500">
          <span>Chip</span><span>Token</span><span>Fill / ink</span><span>Contrast</span>
        </div>
        {levels.map(({ key, label }) => {
          const c = severityChip[key]
          return (
            <div key={key} className="grid grid-cols-[130px_1fr_110px_90px] items-center gap-3 border-b border-slate-200 px-4 py-3 last:border-b-0">
              <span
                className="inline-flex w-fit items-center rounded-sm px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.5px]"
                style={{ background: c.fill, color: c.ink }}
              >
                {label}
              </span>
              <code className="font-mono text-[11px] text-slate-500">
                --color-sev-chip-{key === 'critical' ? 'crit' : key === 'diagnostic' ? 'diag' : key === 'medium' ? 'med' : key}
              </code>
              <span className="font-mono text-[11px] text-slate-500">{c.fill} / {c.ink}</span>
              <span className="font-mono text-[11px] text-slate-500">{c.ratio}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[12px] leading-relaxed text-slate-600">
        <strong>Low and Normal are not their marks.</strong> The severity marks for those two
        (#90A1B9 and #00C483) cannot carry a label at any size, so the chip drops to a slate and a
        deep green instead. That is why this is a separate set rather than a fill built from{' '}
        <code className="font-mono text-[11px]">--color-sev-*</code>.
      </div>

      {/* ── Three channels ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Three channels, never one</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Every alarm row carries its severity three ways at once — badge, rail and tint — so the
        state survives colour-blindness, a monochrome print and a sun-washed screen.
      </p>
      <div className="mt-5 w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
        {[
          { l: 'Critical', badge: 'bg-critical-solid text-white', rail: 'shadow-[inset_3px_0_0_var(--color-critical)]', tint: 'bg-[color-mix(in_srgb,var(--color-critical)_7%,#fff)]' },
          { l: 'High', badge: 'bg-warning-bg text-warning-text', rail: 'shadow-[inset_3px_0_0_var(--color-warning)]', tint: 'bg-[color-mix(in_srgb,var(--color-warning)_6%,#fff)]' },
          { l: 'Medium', badge: 'bg-medium-bg text-medium-text', rail: 'shadow-[inset_3px_0_0_var(--color-medium)]', tint: '' },
        ].map(({ l, badge, rail, tint }) => (
          <div key={l} className={`flex items-center gap-3 border-b border-slate-100 px-3.5 py-3 last:border-b-0 ${rail} ${tint}`}>
            <span className={`inline-flex shrink-0 items-center rounded-sm px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.5px] ${badge}`}>
              {l}
            </span>
            <span className="text-[13px] text-slate-600">Badge · 3px rail · faint priority tint</span>
          </div>
        ))}
      </div>

      {/* ── Lifecycle ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Lifecycle state</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        Process condition crossed with acknowledgement. Each tag carries a letter glyph so state is
        readable without colour.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {states.map(([g, l, d, cls]) => (
          <div key={l} className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0">
            <span className={`inline-flex shrink-0 items-center gap-[5px] rounded-sm py-0.5 pl-[5px] pr-[7px] font-mono text-[10px] font-bold tracking-[0.6px] ${cls}`}>
              <span className="inline-flex h-[13px] w-[13px] items-center justify-center rounded-[3px] text-[9px] font-extrabold shadow-[inset_0_0_0_1px_currentColor]">
                {g}
              </span>
              {l.toUpperCase()}
            </span>
            <span className="text-[13px] text-slate-600">{d}</span>
          </div>
        ))}
      </div>

      {/* ── Suppression ── */}
      <h2 className="mt-10 text-base font-bold text-ink">Suppression</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        A second, independent axis. A shelved alarm that is still active is <em>both</em> shelved
        and unacknowledged — showing only the suppression hides a live process condition.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {suppression.map(([g, l, d, cls]) => (
          <div key={l} className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0">
            <span className={`inline-flex shrink-0 items-center gap-[5px] rounded-sm py-0.5 pl-[5px] pr-[7px] font-mono text-[10px] font-bold tracking-[0.6px] ${cls}`}>
              <span className="inline-flex h-[13px] w-[13px] items-center justify-center rounded-[3px] text-[9px] font-extrabold shadow-[inset_0_0_0_1px_currentColor]">
                {g}
              </span>
              {l.toUpperCase()}
            </span>
            <span className="text-[13px] text-slate-600">{d}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Colour is never the only channel. Badge, glyph, rail and words carry the same
              information in parallel.
            </>,
            <>
              Use the <code className="font-mono text-[12px]">mark</code> for fills,{' '}
              <code className="font-mono text-[12px]">ink</code> for a number sitting on that fill,
              and <code className="font-mono text-[12px]">text</code> for a foreground on an
              ordinary surface. Mixing them up is the system&rsquo;s most common contrast failure.
            </>,
            <>
              An alarm active for more than 24h gets a separate <strong>stale</strong> pill. It is a
              flag, not a state — it never replaces the lifecycle tag.
            </>,
            <>
              Priority tint is 6–7%, not a fill. Full saturated rows belong to the legacy skin,
              where hue codes state and lightness codes priority.
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
