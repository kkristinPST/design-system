import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const seg = 'rounded-md px-4 py-1.5 text-[13px] font-semibold whitespace-nowrap transition-colors'

const variants: Variant[] = [
  {
    name: 'Segmented tabs',
    platform: 'Desktop',
    description:
      'A slate-100 track inside a slate-200 border, 3px padding. The active segment lifts to the surface colour with a small shadow; the rest are slate-600 and darken on hover.',
    preview: (
      <div className="inline-flex flex-wrap gap-0.5 rounded-md border border-slate-200 bg-slate-100 p-[3px]">
        {['Active', 'Shelved', 'Out of service', 'History'].map((l, i) => (
          <button key={l} className={`${seg} ${i === 0 ? 'bg-white text-ink shadow-sm' : 'text-slate-600 hover:text-ink'}`}>
            {l}
          </button>
        ))}
      </div>
    ),
    code: `<div className="inline-flex flex-wrap gap-0.5 rounded-md border border-slate-200
  bg-slate-100 p-[3px]">
  <button className={\`rounded-md px-4 py-1.5 text-[13px] font-semibold whitespace-nowrap
    \${on ? "bg-white text-ink shadow-sm" : "text-slate-600 hover:text-ink"}\`}>
    Active
  </button>
</div>`,
  },
  {
    name: 'With icons and counts',
    platform: 'Desktop',
    description:
      'Tabs may carry a leading icon or a trailing count pill. The count sits on slate-200 and inverts to a 25% white wash when its tab is active.',
    preview: (
      <div className="inline-flex flex-wrap gap-0.5 rounded-md border border-slate-200 bg-slate-100 p-[3px]">
        {[
          { l: 'Active', n: 7, on: true },
          { l: 'Shelved', n: 2, on: false },
          { l: 'History', n: 0, on: false },
        ].map(({ l, n, on }) => (
          <button
            key={l}
            className={`inline-flex items-center justify-center gap-1.5 ${seg} ${
              on ? 'bg-ink text-white shadow-sm' : 'text-slate-600 hover:text-ink'
            }`}
          >
            {l}
            {n > 0 && (
              <span
                className={`rounded-full px-1.5 font-mono text-[10px] font-bold ${
                  on ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {n}
              </span>
            )}
          </button>
        ))}
      </div>
    ),
    code: `<button className={on ? "bg-ink text-white shadow-sm" : "text-slate-600 hover:text-ink"}>
  Active
  <span className={\`rounded-full px-1.5 font-mono text-[10px] font-bold
    \${on ? "bg-white/25 text-white" : "bg-slate-200 text-slate-600"}\`}>7</span>
</button>`,
  },
  {
    name: 'Wrapping',
    platform: 'Desktop',
    description:
      'A six-tab strip can be wider than a narrow content pane even on a wide monitor: an expanded sidebar on a tablet is enough. The strip wraps fluidly rather than at a breakpoint.',
    preview: (
      <div className="w-[380px]">
        <div className="inline-flex max-w-full flex-wrap gap-0.5 rounded-md border border-slate-200 bg-slate-100 p-[3px]">
          {['Active', 'Shelved', 'Out of service', 'Suppressed', 'History', 'Statistics'].map((l, i) => (
            <button key={l} className={`${seg} ${i === 0 ? 'bg-white text-ink shadow-sm' : 'text-slate-600'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>
    ),
    code: `/* the strip wraps; the pane it lives in caps its width */
.segmented       { flex-wrap: wrap }
.pagehead-right  { min-width: 0; max-width: 100% }
.pagehead-right > .segmented { max-width: 100% }`,
  },
  {
    name: 'Mobile · segmented control',
    platform: 'Mobile',
    description:
      'A borderless slate-100 track at 12px radius. Segments flex to equal width, the active one lifts to white, and each gets a 44px hit area from an invisible pseudo-element.',
    preview: (
      <PhoneFrame className="p-4">
        <div className="flex gap-0.5 rounded-xl bg-slate-100 p-[3px]">
          {[
            { l: 'Active', on: true },
            { l: 'Shelved', on: false },
            { l: 'History', on: false },
          ].map(({ l, on }) => (
            <button
              key={l}
              className={`relative flex-1 whitespace-nowrap rounded-[9px] px-1.5 py-2 text-[12px] font-semibold ${
                on ? 'bg-white text-ink shadow-sm' : 'text-slate-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-0.5 rounded-xl bg-slate-100 p-[3px]">
          {[
            { l: 'Day', on: false },
            { l: 'Week', on: true },
            { l: 'Month', on: false },
            { l: 'Year', on: false, off: true },
          ].map(({ l, on, off }) => (
            <button
              key={l}
              disabled={off}
              className={`relative flex-1 whitespace-nowrap rounded-[9px] px-1.5 py-2 text-[12px] font-semibold ${
                on ? 'bg-white text-ink shadow-sm' : 'text-slate-600'
              } ${off ? 'cursor-not-allowed opacity-[0.42]' : ''}`}
            >
              {l}
            </button>
          ))}
        </div>
      </PhoneFrame>
    ),
    code: `<div className="flex gap-0.5 rounded-xl bg-slate-100 p-[3px]">
  <button className={\`relative flex-1 rounded-[9px] px-1.5 py-2 text-[12px] font-semibold
    \${on ? "bg-white text-ink shadow-sm" : "text-slate-600"}\`}>Active</button>
  <button disabled className="opacity-[0.42] cursor-not-allowed">Year</button>
</div>`,
  },
]

export default function FilterTabsPage() {
  return (
    <ComponentDoc
      title="Filter tabs"
      intro={
        <>
          Switches which slice of the same dataset is shown. Desktop uses a bordered segmented
          strip; mobile uses a borderless track with equal-width segments. Tabs filter: they never
          navigate to a different screen.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['filter-tabs']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Tabs change the <em>filter</em>, not the destination. If the back button should undo it,
            it is navigation, not a tab.
          </>,
          <>
            The strip wraps fluidly rather than at a breakpoint, because pane width and viewport
            width are not the same thing.
          </>,
          <>
            An unavailable tab is disabled at 42% opacity, not removed. A disappearing tab makes
            the strip jump and hides that the slice exists.
          </>,
          <>
            In the legacy skin the track dissolves and each tab becomes a separate bordered button
            with an inset cyan ring when active.
          </>,
        ],
      }}
    />
  )
}
