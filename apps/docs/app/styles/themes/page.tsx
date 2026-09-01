import { skinList, allTokens } from '@njord/tokens'

// The three skins, the selectors they answer to and every token they remap all
// come from @njord/tokens — the same source that generates the CSS. This page
// cannot fall out of date with the stylesheet it documents.
const themes = skinList

// Base value for a token name (without the leading --): the default skin's own
// override if it has one, otherwise the value declared in @theme.
const base = new Map(allTokens().map((t) => [t.web.slice(2), t.value]))
for (const [key, value] of Object.entries(themes[0].tokens)) base.set(key, value)

// Every token any non-default skin re-points, in a stable order.
const remappedKeys = [
  ...new Set(themes.slice(1).flatMap((s) => Object.keys(s.tokens))),
]
const remapped: [string, ...string[]][] = remappedKeys.map((key) => [
  `--${key}`,
  ...themes.map((s) => s.tokens[key] ?? base.get(key) ?? '—'),
])

export default function ThemesPage() {
  return (
    <div className="max-w-[900px]">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Styles</p>
      <h1 className="text-2xl font-bold tracking-tight text-ink">Themes</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        Three skins over one token set. Every component reads from semantic variables, so a theme is
        a list of remapped tokens rather than a second stylesheet — re-pointing them re-skins every
        screen at once.
      </p>

      {/* ── Cards ── */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {themes.map((t) => (
          <div key={t.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="p-3" style={{ background: t.preview.bg }}>
              <div className="flex gap-2">
                <div className="w-8 rounded" style={{ background: t.preview.rail }}>
                  <div className="mx-1 mt-1.5 h-1 rounded-full" style={{ background: t.preview.railText }} />
                  <div className="mx-1 mt-1 h-1 rounded-full opacity-60" style={{ background: t.preview.railText }} />
                  <div className="mx-1 mt-1 mb-1.5 h-1 rounded-full opacity-60" style={{ background: t.preview.railText }} />
                </div>
                <div className="flex-1 rounded p-2" style={{ background: t.preview.surface, border: `1px solid ${t.preview.border}` }}>
                  <div className="h-1.5 w-2/3 rounded-full" style={{ background: t.preview.fg, opacity: 0.85 }} />
                  <div className="mt-1.5 h-1 w-1/2 rounded-full" style={{ background: t.preview.fg, opacity: 0.35 }} />
                  <div className="mt-2 h-3 w-12 rounded" style={{ background: t.preview.primary }} />
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 px-4 py-3.5">
              <p className="text-sm font-semibold text-ink">{t.name}</p>
              <p className="mt-0.5 font-mono text-[10px] text-slate-400">{t.selector}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{t.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Remap table ── */}
      <h2 className="mt-10 text-base font-bold text-ink">What a theme remaps</h2>
      <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr>
              {['Token', 'Modern', 'Dark', 'Legacy'].map((h) => (
                <th key={h} className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {remapped.map(([token, ...vals]) => (
              <tr key={token}>
                <td className="border-b border-slate-100 px-4 py-2.5 font-mono text-xs font-semibold text-ink">{token}</td>
                {vals.map((v, i) => (
                  <td key={i} className="border-b border-slate-100 px-4 py-2.5 font-mono text-xs text-slate-600">
                    <span className="inline-flex items-center gap-2">
                      {v.startsWith('#') && (
                        <span className="h-3 w-3 shrink-0 rounded-sm border border-slate-200" style={{ background: v }} />
                      )}
                      {v}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Legacy alarm matrix ── */}
      <h2 className="mt-10 text-base font-bold text-ink">The legacy alarm matrix</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
        The legacy skin&rsquo;s signature is the fully-coded alarm row. Hue encodes state —
        unacknowledged red, acknowledged purple, returned-to-normal blue — and lightness encodes
        priority. Normal, shelved and out-of-service rows carry no fill at all.
      </p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        {[
          { state: 'Unack', colors: ['#C62B2B', '#D14343', '#E86D6D', '#F28787'] },
          { state: 'Ack', colors: ['#8A39DB', '#9349DE', '#AA6DE8', '#BC87F2'] },
          { state: 'RTN', colors: ['#2E5EAA', '#4A72B4', '#7198D6', '#A0BEEF'] },
        ].map(({ state, colors }) => (
          <div key={state} className="flex items-center border-b border-slate-200 last:border-b-0">
            <span className="w-20 shrink-0 bg-white px-3 py-2.5 text-xs font-semibold text-ink">{state}</span>
            {colors.map((c, i) => (
              <span
                key={c}
                className="flex-1 px-3 py-2.5 text-[11px] font-bold"
                style={{ background: c, color: i < 2 ? '#fff' : '#0F182B' }}
              >
                {['Critical', 'High', 'Medium', 'Low'][i]}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Rules</p>
        <ul className="mt-3 space-y-2">
          {[
            <>
              Never hard-code a colour, radius or shadow in a component. If it is not a token, it
              will be wrong in at least one of the three skins.
            </>,
            <>
              Every theme sets <code className="font-mono text-[12px]">color-scheme</code>, so
              native controls — select popups, scrollbars, date pickers — follow the skin instead of
              painting a light backdrop under light text.
            </>,
            <>
              The dark skin lifts the severity ramp so dots and chart fills stay legible, and flips
              every <code className="font-mono text-[12px]">*-ink</code> value to dark, because all
              six dark fills are lifted tints.
            </>,
            <>
              In the legacy skin, selection and trend-arrival cannot repaint a coded alarm row
              without destroying its meaning — they mark it with a left rail instead.
            </>,
            <>
              All three skins are AA-clean. A theme is never an excuse to drop contrast.
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
