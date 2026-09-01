import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'
import { alarmRowInk } from '@njord/tokens'

const st =
  'inline-flex items-center gap-[5px] whitespace-nowrap rounded-sm border py-0.5 pl-[5px] pr-[7px] font-mono text-[10px] font-bold tracking-[0.6px]'
const glyph =
  'inline-flex h-[13px] w-[13px] items-center justify-center rounded-[3px] text-[9px] font-extrabold shadow-[inset_0_0_0_1px_currentColor]'
const act =
  'inline-flex items-center gap-[5px] rounded-sm border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-[0.3px] text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-ink'

const rows = [
  {
    sev: 'Critical',
    rail: 'shadow-[inset_3px_0_0_var(--color-critical)]',
    tint: 'bg-[color-mix(in_srgb,var(--color-critical)_7%,#fff)]',
    badge: 'bg-critical-solid text-white',
    state: { g: 'U', l: 'UNACK', cls: 'bg-critical-bg text-critical-text border-[color-mix(in_srgb,var(--color-critical)_22%,transparent)]' },
    area: 'RAS 2',
    tag: 'DO-0403',
    alarm: 'Dissolved oxygen low-low',
    value: '6.2 mg/L',
    age: '04:12:38',
    stale: false,
  },
  {
    sev: 'High',
    rail: 'shadow-[inset_3px_0_0_var(--color-warning)]',
    tint: 'bg-[color-mix(in_srgb,var(--color-warning)_6%,#fff)]',
    badge: 'bg-warning-bg text-warning-text',
    state: { g: 'A', l: 'ACK', cls: 'bg-slate-100 text-slate-600 border-slate-200' },
    area: 'Pump sump',
    tag: 'PU-11A',
    alarm: 'Pump vibration high',
    value: '7.8 mm/s',
    age: '38:04:11',
    stale: true,
  },
  {
    sev: 'Medium',
    rail: 'shadow-[inset_3px_0_0_var(--color-medium)]',
    tint: '',
    badge: 'bg-medium-bg text-medium-text',
    state: { g: 'R', l: 'RTN', cls: 'bg-warning-bg text-warning-text border-[color-mix(in_srgb,var(--color-warning)_22%,transparent)]' },
    area: 'Water treatment',
    tag: 'FT-220',
    alarm: 'Flow deviation from setpoint',
    value: '284 m³/h',
    age: '00:21:04',
    stale: false,
  },
]

const variants: Variant[] = [
  {
    name: 'Alarm table row',
    platform: 'Desktop',
    description:
      'Severity is a 3px inset rail plus a faint priority tint — critical at 7%, high at 6%. The tint makes the highest-priority rows conspicuous in a dense list (EEMUA 191) without shouting.',
    preview: (
      <div className="w-[820px] overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['', 'Priority', 'State', 'Area / tag', 'Alarm', 'Value', 'Active for', ''].map((h, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap border-b border-slate-200 bg-slate-50 px-3.5 py-[11px] text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.tag} className={r.tint}>
                <td className={`border-b border-slate-100 py-3 pl-3.5 pr-0 ${r.rail}`}>
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded border-[1.5px] border-slate-300 bg-white" />
                </td>
                <td className="border-b border-slate-100 px-3.5 py-3">
                  <span className={`inline-flex items-center rounded-sm px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.5px] ${r.badge}`}>
                    {r.sev}
                  </span>
                </td>
                <td className="border-b border-slate-100 px-3.5 py-3">
                  <span className={`${st} ${r.state.cls}`}>
                    <span className={glyph}>{r.state.g}</span>
                    {r.state.l}
                  </span>
                </td>
                <td className="border-b border-slate-100 px-3.5 py-3">
                  <span className="block whitespace-nowrap text-[13px] text-slate-600">{r.area}</span>
                  <span className="block font-mono text-[11px] tracking-[0.3px] text-slate-400">{r.tag}</span>
                </td>
                <td className="border-b border-slate-100 px-3.5 py-3">
                  <button className="text-left text-[13px] font-medium text-ink hover:text-primary-text hover:underline hover:underline-offset-2">
                    {r.alarm}
                  </button>
                  {r.stale && (
                    <span className="ml-2 inline-flex items-center rounded-sm border border-[color-mix(in_srgb,var(--color-warning)_25%,transparent)] bg-warning-bg px-1.5 py-px font-mono text-[9px] font-bold tracking-[0.5px] text-warning-text">
                      STALE
                    </span>
                  )}
                </td>
                <td className="border-b border-slate-100 px-3.5 py-3 text-right font-mono text-xs text-ink tabular-nums">
                  {r.value}
                </td>
                <td className="border-b border-slate-100 px-3.5 py-3 font-mono text-xs text-slate-500 tabular-nums">
                  {r.age}
                </td>
                <td className="border-b border-slate-100 px-3.5 py-3">
                  <div className="flex justify-end gap-1.5">
                    <button className={act}>Ack</button>
                    <button className={act}>Shelve</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    code: `<tr className="bg-[color-mix(in_srgb,var(--color-critical)_7%,var(--color-surface))]">
  <td className="shadow-[inset_3px_0_0_var(--color-critical)]">…</td>
  <td><SeverityBadge /></td>
  <td><StateTag /></td>
  <td>{area}<span className="font-mono text-[11px] text-slate-400">{tag}</span></td>
  <td><button className="hover:text-primary-text hover:underline">{alarm}</button></td>
  <td className="text-right font-mono text-xs tabular-nums">{value}</td>
  <td className="font-mono text-xs text-slate-500 tabular-nums">{age}</td>
  <td><RowActions /></td>
</tr>`,
  },
  {
    name: 'Selected and just-arrived',
    platform: 'Desktop',
    description:
      'Selection paints primary-bg and out-specifies the priority tint. A row arrived at from a trend marker adds a cyan rail and a one-second highlight fade, so a cross-screen jump lands somewhere visible.',
    preview: (
      <div className="w-[560px] overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-primary-bg px-3.5 py-3">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded border-[1.5px] border-primary bg-primary text-white">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="text-[13px] font-medium text-ink">Dissolved oxygen low-low</span>
          <span className="ml-auto font-mono text-xs text-slate-500">selected</span>
        </div>
        <div className="flex items-center gap-3 bg-primary-bg px-3.5 py-3 shadow-[inset_3px_0_0_var(--color-primary)]">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded border-[1.5px] border-slate-300 bg-white" />
          <span className="text-[13px] font-medium text-ink">Pump vibration high</span>
          <span className="ml-auto font-mono text-xs text-slate-500">arrived from trend</span>
        </div>
      </div>
    ),
    code: `{/* selected */}
<tr className="bg-primary-bg">

{/* arrived from a trend marker */}
<tr className="bg-primary-bg shadow-[inset_3px_0_0_var(--color-primary)] animate-[njRowHl_1s_ease]">`,
  },
  {
    name: 'Mobile — alarm row',
    platform: 'Mobile',
    description:
      'A 14px-radius card with a 4px severity rail. The area and time share the top line, the alarm name gets the second, and the reading plus any stale flag sit underneath.',
    preview: (
      <PhoneFrame className="border-none bg-transparent shadow-none">
        <div className="flex flex-col gap-2">
          {[
            { sev: 'Critical', rail: 'bg-sev-crit', badge: 'bg-critical-solid text-white', area: 'RAS 2', t: '04:12', a: 'Dissolved oxygen low-low', tag: 'DO-0403', v: '6.2 mg/L', stale: false },
            { sev: 'High', rail: 'bg-sev-high', badge: 'bg-warning-bg text-warning-text', area: 'Pump sump', t: '38:04', a: 'Pump vibration high', tag: 'PU-11A', v: '7.8 mm/s', stale: true },
          ].map((r) => (
            <div
              key={r.tag}
              className="relative overflow-hidden rounded-[14px] border border-slate-200 bg-white px-[13px] py-3"
            >
              <span className={`absolute inset-y-0 left-0 w-1 rounded-l ${r.rail}`} />
              <div className="mb-1 flex flex-wrap items-center gap-[7px]">
                <span className={`inline-flex shrink-0 items-center rounded-[5px] px-1.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.5px] ${r.badge}`}>
                  {r.sev}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-slate-600">
                  {r.area}
                </span>
                <span className="shrink-0 font-mono text-[11px] text-slate-400 tabular-nums">
                  {r.t}
                </span>
              </div>
              <p className="text-[14px] font-semibold leading-tight text-ink">{r.a}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-mono text-[11px] tracking-[0.3px] text-slate-500">{r.tag}</span>
                <span className="font-mono text-[12px] font-semibold text-ink tabular-nums">
                  {r.v}
                </span>
                {r.stale && (
                  <span className="inline-flex items-center gap-[3px] text-[10px] font-bold text-critical-text">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                    </svg>
                    Stale
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<div className="relative overflow-hidden rounded-[14px] border border-slate-200 bg-white
  px-[13px] py-3">
  <span className="absolute inset-y-0 left-0 w-1 rounded-l bg-sev-crit" />
  <div className="mb-1 flex items-center gap-[7px]">
    <SeverityBadge /> <span className="flex-1 truncate text-[11px] font-bold">{area}</span>
    <span className="font-mono text-[11px] text-slate-400 tabular-nums">{time}</span>
  </div>
  <p className="text-[14px] font-semibold text-ink">{alarm}</p>
  <div className="mt-1.5 flex items-center gap-2">…</div>
</div>`,
  },
]

export default function AlarmRowPage() {
  return (
    <ComponentDoc
      title="Alarm row"
      intro={
        <>
          One alarm in a list. Desktop uses a table row with a severity rail and a faint priority
          tint; mobile uses a 14px card with a 4px rail. On both, the alarm <em>name</em> is the
          identity — it is never the thing that gets truncated to make room for controls.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['alarm-row']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The priority tint is 6–7%, not a fill. Full saturated rows are the legacy skin, where
            hue codes state and lightness codes priority across a twelve-cell matrix.
          </>,
          <>
            Selection and trend-arrival highlight both out-specify the priority tint, so a selected
            critical row still reads as selected. In the legacy skin they switch to a left rail
            instead, because repainting a coded row would destroy its meaning.
          </>,
          <>
            Row actions are uppercase 11px outline buttons that tint on hover — ack goes green,
            disable goes red, investigate goes cyan. Disabled actions stay visible at 40% rather
            than disappearing.
          </>,
          <>
            Every row carries the severity three ways: badge, rail and tint. Colour is never the
            only channel.
          </>,
          <>
            <strong className="font-semibold text-ink">
              A saturated legacy row re-points its own ink.
            </strong>{' '}
            Nothing inside a filled row may use the ordinary text tokens —{' '}
            <code className="font-mono text-[11px]">--fg</code> is dark ink and would vanish on a
            red fill. Declare three custom properties on the row&rsquo;s cells and let every child
            inherit them:{' '}
            <code className="font-mono text-[11px]">--alm-ink</code> for text and glyphs,{' '}
            <code className="font-mono text-[11px]">--alm-ink-line</code> (
            {alarmRowInk.onSaturated.line}) for hairline borders and glyph rings, and{' '}
            <code className="font-mono text-[11px]">--alm-ink-wash</code> (
            {alarmRowInk.onSaturated.wash}) for a chip fill sitting on the row. Set them on the
            cells, never on <code className="font-mono text-[11px]">:root</code> — a global default
            leaks the override onto every unfilled row.
          </>,
          <>
            <strong className="font-semibold text-ink">Low severity inverts.</strong> Critical,
            high and medium fills are dark enough to carry white (
            <code className="font-mono text-[11px]">{alarmRowInk.onSaturated.ink}</code>). The low
            fill is pale, so its row flips to slate ink (
            <code className="font-mono text-[11px]">{alarmRowInk.onLow.ink}</code>) with matching
            line and wash, or the row becomes unreadable. It is the only severity that does this.
          </>,
        ],
      }}
    />
  )
}
