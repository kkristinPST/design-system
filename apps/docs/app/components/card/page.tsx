import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Card with header',
    platform: 'Desktop',
    description:
      '12px radius, slate-200 border, soft shadow. The header is 16/20 padding with a hairline under it; the body is 18/20. Header actions sit at the far right and wrap below the title on narrow panes.',
    preview: (
      <div className="w-[480px] rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="text-[15px] font-bold text-ink">Active alarms</span>
            <span className="rounded-sm bg-critical-bg px-2 py-0.5 font-mono text-[10px] font-bold text-critical-text">
              7
            </span>
          </div>
          <button className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary-text hover:underline">
            View all
          </button>
        </div>
        <div className="px-5 py-[18px]">
          <p className="text-[13px] leading-relaxed text-slate-600">
            Card body content sits on 18px vertical / 20px horizontal padding. A card that
            contains a full-bleed block — a table, a filter bar, a divided row list — drops its
            own padding so the child&rsquo;s hairline meets the card edge.
          </p>
        </div>
      </div>
    ),
    code: `<div className="rounded-xl border border-slate-200 bg-white shadow">
  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
    <span className="text-[15px] font-bold text-ink">Active alarms</span>
    <button className="text-[13px] font-semibold text-primary-text">View all</button>
  </div>
  <div className="px-5 py-[18px]">…</div>
</div>`,
  },
  {
    name: 'Bare card',
    platform: 'Desktop',
    description:
      'No header — the card is just a surface. Used for chart panels and summary blocks where a title would duplicate the section heading above it.',
    preview: (
      <div className="w-[480px] rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
          Water treatment
        </p>
        <p className="mt-2 font-mono text-2xl tracking-[-0.5px] text-ink tabular-nums">
          1 284 <span className="text-xs text-slate-600">m³/h</span>
        </p>
        <p className="mt-1.5 text-[13px] text-slate-600">Total recirculation across four loops.</p>
      </div>
    ),
    code: `<div className="rounded-xl border border-slate-200 bg-white p-5 shadow">
  <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">Water treatment</p>
  <p className="mt-2 font-mono text-2xl tabular-nums text-ink">1 284 <span className="text-xs">m³/h</span></p>
</div>`,
  },
  {
    name: 'Card holding a full-bleed block',
    platform: 'Desktop',
    description:
      'When a table or filter bar is a direct child, the card has no padding and the child owns the edges. The first child rounds its own top corners so it does not paint over the card radius.',
    preview: (
      <div className="w-[480px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Tag', 'Reading', 'State'].map((h) => (
                <th
                  key={h}
                  className="border-b border-slate-200 bg-slate-50 px-3.5 py-[11px] text-left text-[10px] font-bold uppercase tracking-[0.8px] text-slate-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['PT-1201', '2.41 bar', 'Normal'],
              ['DO-0403', '6.2 mg/L', 'Low'],
            ].map(([a, b, c]) => (
              <tr key={a}>
                <td className="border-b border-slate-100 px-3.5 py-3 font-mono text-xs text-ink">{a}</td>
                <td className="border-b border-slate-100 px-3.5 py-3 font-mono text-xs text-slate-600 tabular-nums">{b}</td>
                <td className="border-b border-slate-100 px-3.5 py-3 text-[13px] text-slate-600">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    code: `{/* card has NO padding — the table owns the edges */}
<div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow">
  <table className="w-full border-collapse">…</table>
</div>`,
  },
  {
    name: 'Mobile — card',
    platform: 'Mobile',
    description:
      'A 16px radius (larger than desktop, matching the phone idiom) with only a small shadow. Stacked cards sit 12px apart; internal padding is 15/16.',
    preview: (
      <PhoneFrame className="border-none bg-transparent p-0 shadow-none">
        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-[15px] shadow-sm">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.6px] text-slate-400">
              Tank TK-04
            </p>
            <p className="mt-2 font-mono text-[26px] font-semibold leading-none tracking-[-0.5px] text-ink tabular-nums">
              6.2 <span className="text-xs font-medium text-slate-400">mg/L</span>
            </p>
            <p className="mt-1.5 text-[10px] text-slate-500">Band 6.0 – 12.0</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-[15px] shadow-sm">
            <p className="text-sm font-bold text-ink">Feeding</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
              Next cycle 14:30 · 42 kg scheduled
            </p>
          </div>
        </div>
      </PhoneFrame>
    ),
    code: `<div className="rounded-2xl border border-slate-200 bg-white px-4 py-[15px] shadow-sm">
  …
</div>
{/* stacked cards: gap-3 (12px) */}`,
  },
  {
    name: 'Mobile — divided list card',
    platform: 'Mobile',
    description:
      'A card whose children are rows. The card clips at 16px radius, rows divide on slate-100, and the last row drops its divider so no hairline floats against the card edge.',
    preview: (
      <PhoneFrame>
        {[
          ['Dissolved oxygen', '6.2 mg/L'],
          ['Temperature', '12.4 °C'],
          ['pH', '7.1'],
        ].map(([l, v], i, a) => (
          <div
            key={l}
            className={`flex min-h-[48px] items-center gap-[9px] px-3.5 py-3 ${
              i < a.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <span className="flex-1 text-[12px] font-semibold text-slate-600">{l}</span>
            <span className="font-mono text-sm font-bold text-ink tabular-nums">{v}</span>
          </div>
        ))}
      </PhoneFrame>
    ),
    code: `<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
  {rows.map((r, i) => (
    <div className="flex min-h-[48px] items-center gap-[9px] px-3.5 py-3
      border-b border-slate-100 last:border-b-0">…</div>
  ))}
</div>`,
  },
]

export default function CardPage() {
  return (
    <ComponentDoc
      title="Card"
      intro={
        <>
          The container every screen is built from. Desktop cards are 12px radius with a soft
          shadow; mobile cards are 16px radius with a lighter one. A card either owns its padding
          or hands it to a full-bleed child — never both.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.card}
      notes={{
        heading: 'Rules',
        items: [
          <>
            If a card&rsquo;s direct child is structural — a header, filter bar, table, bulk bar or
            divided row list — the card drops its padding. Keeping both double-pads the child and
            detaches its hairline from the card edge, which reads as a frame inside a frame.
          </>,
          <>
            An opaque, square, full-bleed first child (a table header, a bulk bar) must round its
            own top corners. Do not solve this by clipping the card — that would also clip column
            pickers and row-action popovers.
          </>,
          <>
            In the legacy skin cards lose their shadow entirely and lean on a heavier border. Do
            not hard-code the shadow; read it from the elevation tokens.
          </>,
        ],
      }}
    />
  )
}
