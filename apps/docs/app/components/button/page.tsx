import ComponentDoc, { type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const variants: Variant[] = [
  {
    name: 'Primary',
    platform: 'Desktop',
    description:
      'The committing action. Dark ink, not brand cyan: cyan is reserved for links, focus and selection. One per view.',
    preview: (
      <button className="inline-flex items-center gap-[7px] rounded-md border border-ink bg-ink px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-slate-800">
        Acknowledge
      </button>
    ),
    code: `<button className="inline-flex items-center gap-[7px] rounded-md border border-ink
  bg-ink px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-slate-800">
  Acknowledge
</button>`,
  },
  {
    name: 'Secondary',
    platform: 'Desktop',
    description: 'Supporting actions beside a primary. White surface, strong border, 1px lift.',
    preview: (
      <button className="inline-flex items-center gap-[7px] rounded-md border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm transition-colors hover:bg-slate-50">
        Export
      </button>
    ),
    code: `<button className="inline-flex items-center gap-[7px] rounded-md border border-slate-300
  bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm hover:bg-slate-50">
  Export
</button>`,
  },
  {
    name: 'Ghost',
    platform: 'Desktop',
    description: 'Low-emphasis actions in toolbars and dense chrome. No border until hover.',
    preview: (
      <button className="inline-flex items-center gap-[7px] rounded-md border border-transparent px-3.5 py-2 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-slate-100">
        Columns
      </button>
    ),
    code: `<button className="inline-flex items-center gap-[7px] rounded-md border border-transparent
  px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-100">
  Columns
</button>`,
  },
  {
    name: 'Danger',
    platform: 'Desktop',
    description:
      'Destructive or irreversible actions: disabling an alarm, taking equipment out of service.',
    preview: (
      <button className="inline-flex items-center gap-[7px] rounded-md border border-critical bg-critical px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#D8332E]">
        Take out of service
      </button>
    ),
    code: `<button className="inline-flex items-center gap-[7px] rounded-md border border-critical
  bg-critical px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-[#D8332E]">
  Take out of service
</button>`,
  },
  {
    name: 'Small / icon / link',
    platform: 'Desktop',
    description:
      'Compact row-level actions. The link button carries an invisible 24px tall hit area (WCAG 2.5.8) without changing its ink.',
    preview: (
      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-[5px] rounded-md border border-slate-300 bg-white px-2.5 py-[5px] text-xs font-semibold text-ink shadow-sm">
          Shelve
        </button>
        <button
          aria-label="More"
          className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-sm border-none bg-transparent text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </button>
        <button className="relative inline-flex items-center gap-1 text-[13px] font-semibold text-primary-text hover:text-[#006A93]">
          View details
        </button>
      </div>
    ),
    code: `{/* small */}   <button className="… px-2.5 py-[5px] text-xs …">Shelve</button>
{/* icon */}    <button className="h-[30px] w-[30px] … text-slate-400 hover:bg-slate-100" />
{/* link */}    <button className="text-[13px] font-semibold text-primary-text">View details</button>`,
  },
  {
    name: 'Disabled',
    platform: 'Desktop',
    description: 'Opacity 0.45, shadow removed, not-allowed cursor. Never hide an action: disable it.',
    preview: (
      <button
        disabled
        className="inline-flex cursor-not-allowed items-center gap-[7px] rounded-md border border-ink bg-ink px-3.5 py-2 text-[13px] font-semibold text-white opacity-45 shadow-none"
      >
        Acknowledge
      </button>
    ),
    code: `<button disabled className="… opacity-45 shadow-none cursor-not-allowed">
  Acknowledge
</button>`,
  },
  {
    name: 'Mobile · full-width actions',
    platform: 'Mobile',
    description:
      'A 50px tall, 14px radius bar. Buttons flex to share the row equally and sit in the sticky footer of a detail screen. Ack uses the bright indicator green; primary uses brand cyan.',
    preview: (
      <div className="w-[340px] rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex gap-[9px]">
          <button className="inline-flex h-[50px] flex-1 items-center justify-center gap-[7px] rounded-[14px] border border-transparent bg-white text-sm font-bold text-ink ring-1 ring-slate-200 ring-inset">
            Snooze
          </button>
          <button className="inline-flex h-[50px] flex-1 items-center justify-center gap-[7px] rounded-[14px] border border-transparent bg-success text-sm font-bold text-white">
            Acknowledge
          </button>
        </div>
      </div>
    ),
    code: `<div className="flex gap-[9px]">
  <button className="h-[50px] flex-1 rounded-[14px] bg-white text-sm font-bold text-ink
    ring-1 ring-slate-200 ring-inset">Snooze</button>
  <button className="h-[50px] flex-1 rounded-[14px] bg-success text-sm font-bold text-white">
    Acknowledge
  </button>
</div>`,
  },
  {
    name: 'Mobile · primary / danger / disabled',
    platform: 'Mobile',
    description:
      'Same 50px bar across all intents. Disabled drops to a slate-100 fill with slate-400 ink rather than fading the whole control.',
    preview: (
      <div className="flex w-[340px] flex-col gap-[9px] rounded-xl border border-slate-200 bg-white p-4">
        <button className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-primary text-sm font-bold text-white">
          Save setpoint
        </button>
        <button className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-critical text-sm font-bold text-white">
          Disable alarm
        </button>
        <button
          disabled
          className="inline-flex h-[50px] cursor-not-allowed items-center justify-center rounded-[14px] border border-slate-200 bg-slate-100 text-sm font-bold text-slate-400"
        >
          Save setpoint
        </button>
      </div>
    ),
    code: `<button className="h-[50px] rounded-[14px] bg-primary  text-sm font-bold text-white">Save setpoint</button>
<button className="h-[50px] rounded-[14px] bg-critical text-sm font-bold text-white">Disable alarm</button>
<button disabled className="h-[50px] rounded-[14px] bg-slate-100 border border-slate-200
  text-sm font-bold text-slate-400 cursor-not-allowed">Save setpoint</button>`,
  },
  {
    name: 'Mobile · icon button',
    platform: 'Mobile',
    description:
      'Drawn at 40×40 but given a 44×44 minimum hit area. Used in the screen header for search, filter and notifications.',
    preview: (
      <div className="flex items-center gap-[6px] rounded-xl border border-slate-200 bg-white p-4">
        {['search', 'filter', 'bell'].map((k) => (
          <button
            key={k}
            aria-label={k}
            className="relative inline-flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {k === 'search' && <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>}
              {k === 'filter' && <path d="M3 5h18l-7 8v6l-4 2v-8Z" />}
              {k === 'bell' && <><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" /></>}
            </svg>
          </button>
        ))}
      </div>
    ),
    code: `<button className="h-10 w-10 min-h-[44px] min-w-[44px] rounded-xl border border-slate-200
  bg-white text-slate-600 inline-flex items-center justify-center">
  <SearchIcon />
</button>`,
  },
]

export default function ButtonPage() {
  return (
    <ComponentDoc
      title="Button"
      intro={
        <>
          Triggers an action. Emphasis runs primary &rarr; secondary &rarr; ghost; danger is
          reserved for destructive intent. Desktop buttons are 13px and compact; mobile
          buttons are a 50px tall bar so they clear a gloved thumb.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs.button}
      notes={{
        heading: 'Rules',
        items: [
          <>
            The desktop primary is <strong>ink</strong>, not brand cyan. Cyan is reserved for
            links, focus rings and selection: an action painted cyan competes with them.
          </>,
          <>
            Mobile primary <em>is</em> cyan, because on the phone there is no dense chrome for it
            to compete with and the bar needs to read as the one committing action.
          </>,
          <>
            Never put text on bare <code className="font-mono text-[12px]">success</code>; it is a
            2.3:1 indicator green. Use <code className="font-mono text-[12px]">success-solid</code>{' '}
            (#00734C) when a green surface must carry a white label.
          </>,
          <>
            Compact controls (link buttons, chips) keep their small ink but get an invisible 24px
            / 44px hit area. Do not &ldquo;fix&rdquo; a small target by raising its line-height.
          </>,
        ],
      }}
    />
  )
}
