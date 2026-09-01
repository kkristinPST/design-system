const userQuestions = [
  'Is this operator mid-incident, or reviewing at a desk?',
  'What decision does this text have to support, right now?',
  'What is the smallest amount of information that supports it?',
  'Does this name the equipment, the value and the limit?',
  'What is the next action, and is it visible from here?',
]

const dosDonts = [
  { do: 'Dissolved oxygen 6.2 mg/L — below the 7.0 low limit.', dont: 'Process variable out of range.' },
  { do: 'Acknowledge', dont: 'Submit acknowledgement request' },
  { do: 'No alarms match these filters.', dont: 'No data available.' },
  { do: 'Take out of service', dont: 'Permanently suppress this alarm from the alarm system' },
  { do: 'Raising this limit above 12.0 requires a rationalization record.', dont: 'Invalid value.' },
]

const writingRules = [
  {
    rule: 'Name the thing',
    guidance:
      'Every message states the equipment, the value and the limit it crossed. An operator should be able to act without opening anything else.',
    example: {
      do: 'TK-04 dissolved oxygen 6.2 mg/L, below 7.0.',
      dont: 'Tank reading is low.',
    },
  },
  {
    rule: 'Cause before consequence',
    guidance:
      'Rationalization text runs cause → consequence → operator action, in that order. It is the sequence an operator thinks in.',
    example: {
      do: 'Cone output insufficient for biomass. Fish stress within 30 minutes. Raise the DO setpoint by 0.5 mg/L.',
      dont: 'Check the oxygen system.',
    },
  },
  {
    rule: 'Active voice',
    guidance: 'Put the actor first. Active voice is shorter and faster to scan under pressure.',
    example: { do: 'K. Berg acknowledged this alarm at 09:22.', dont: 'This alarm was acknowledged at 09:22.' },
  },
  {
    rule: 'Sentence case',
    guidance:
      'Sentence case everywhere — labels, headings, buttons. Uppercase is reserved for badges, state tags and eyebrows, where it is a typographic role rather than emphasis.',
    example: { do: 'Acknowledge all', dont: 'Acknowledge All' },
  },
  {
    rule: 'Numerals and units',
    guidance:
      'Always numerals, always with the unit, always mono. A number without its unit is not a reading.',
    example: { do: '6.2 mg/L', dont: 'six point two' },
  },
  {
    rule: 'Say why, not just no',
    guidance:
      'A blocked action explains the rule that blocked it and what would unblock it. A bare error teaches an operator nothing.',
    example: {
      do: 'Above the 12.0 mg/L maximum for this tank.',
      dont: 'Invalid input.',
    },
  },
  {
    rule: 'Distinguish empty from broken',
    guidance:
      '“No active alarms” and “No alarms match these filters” mean opposite things. Never let them share wording.',
    example: { do: 'No alarms match these filters.', dont: 'Nothing to show.' },
  },
]

export default function UXWritingPage() {
  return (
    <div className="max-w-2xl space-y-12">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Foundations
        </p>
        <h1 className="text-2xl font-semibold text-neutral-900">
          UX Writing Guidelines
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Principles and rules for writing UI copy that is clear, consistent, and
          genuinely useful.
        </p>
      </div>

      {/* Section 1 */}
      <section>
        <h2 className="text-base font-semibold text-neutral-900">
          1. User-centered content
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Before writing a single word, answer these questions:
        </p>
        <ul className="mt-4 space-y-2">
          {userQuestions.map((q) => (
            <li key={q} className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
              <span className="text-sm text-neutral-700">{q}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 2 */}
      <section>
        <h2 className="text-base font-semibold text-neutral-900">
          2. Clear and simple communication
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Say the most with the least. If a word doesn't help the user, cut it.
        </p>
        <div className="mt-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-t-lg bg-success-bg px-3 py-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-success-text">
                Do
              </span>
            </div>
            <div className="rounded-t-lg bg-critical-bg px-3 py-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-critical-text">
                Don't
              </span>
            </div>
          </div>
          {dosDonts.map(({ do: doText, dont }) => (
            <div key={doText} className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-[color-mix(in_srgb,var(--color-success)_30%,transparent)] bg-success-bg px-4 py-3">
                <p className="text-sm text-slate-700">{doText}</p>
              </div>
              <div className="rounded-lg border border-[color-mix(in_srgb,var(--color-critical)_28%,transparent)] bg-critical-bg px-4 py-3">
                <p className="text-sm text-slate-700 line-through decoration-critical-mid">
                  {dont}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 */}
      <section>
        <h2 className="text-base font-semibold text-neutral-900">
          3. Respectful conversations
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          The product speaks to real people in real moments — sometimes stressful
          ones. Write accordingly.
        </p>
        <div className="mt-5 space-y-3">
          {[
            ['Friendly, not cutesy', 'Warm and approachable without being cloying. "Oops!" is fine once. "Oopsie daisy!" is not.'],
            ['Inclusive by default', 'Avoid gendered language, cultural idioms, and anything that assumes a particular background.'],
            ['Direct, not blunt', 'Get to the point without being curt. Skip filler phrases like "Please note that…" and just say the thing.'],
            ['Never blame the user', 'When something goes wrong, describe the condition, not the person. "Above the 12.0 mg/L maximum for this tank" beats "You entered the wrong value."'],
          ].map(([label, text]) => (
            <div key={label} className="rounded-lg border border-neutral-200 px-5 py-4">
              <p className="text-sm font-semibold text-neutral-900">{label}</p>
              <p className="mt-1 text-sm text-neutral-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 */}
      <section>
        <h2 className="text-base font-semibold text-neutral-900">
          4. Writing rules
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Mechanical decisions made once so writers don't have to debate them every
          time.
        </p>
        <div className="mt-5 divide-y divide-neutral-100 rounded-xl border border-neutral-200">
          {writingRules.map(({ rule, guidance, example }) => (
            <div key={rule} className="px-5 py-5">
              <p className="text-sm font-semibold text-neutral-900">{rule}</p>
              <p className="mt-1 text-sm text-neutral-500">{guidance}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-md border border-[color-mix(in_srgb,var(--color-success)_30%,transparent)] bg-success-bg px-3 py-2">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-success-text">
                    Do
                  </p>
                  <p className="text-xs text-slate-700">{example.do}</p>
                </div>
                <div className="rounded-md border border-[color-mix(in_srgb,var(--color-critical)_28%,transparent)] bg-critical-bg px-3 py-2">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-critical-text">
                    Don't
                  </p>
                  <p className="text-xs text-slate-700">{example.dont}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
