import ComponentDoc, { PhoneFrame, type Variant } from '../../../components/ComponentDoc'
import { ignitionSpecs } from '../../../components/ignition-specs'

const seg = 'rounded-md px-4 py-1.5 text-[13px] font-semibold whitespace-nowrap'

const variants: Variant[] = [
  {
    name: 'Page header',
    platform: 'Desktop',
    description:
      'Subtitle on the left, controls on the right, tab strip below. There is no in-page h1 — the top bar owns the title, which is why the tab strip keeps the same y from page to page.',
    preview: (
      <div className="w-[760px]">
        <div className="mb-[18px]">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <div className="flex min-h-[24px] min-w-[260px] flex-1 basis-[300px] items-center">
              <p className="m-0 text-[13px] leading-5 text-pretty text-slate-600">
                7 active alarms across RAS 2 · 4 unacknowledged, 2 stale beyond 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <button className="inline-flex items-center gap-[7px] rounded-md border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm hover:bg-slate-50">
                Export
              </button>
              <button className="inline-flex items-center gap-[7px] rounded-md border border-ink bg-ink px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-slate-800">
                Acknowledge all
              </button>
            </div>
          </div>
          <div className="mt-4 inline-flex flex-wrap gap-0.5 rounded-md border border-slate-200 bg-slate-100 p-[3px]">
            {['Active', 'Shelved', 'Out of service', 'History'].map((l, i) => (
              <button
                key={l}
                className={`${seg} ${i === 0 ? 'bg-white text-ink shadow-sm' : 'text-slate-600 hover:text-ink'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    ),
    code: `<div className="mb-[18px]">
  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
    {/* subtitle side — keeps a real minimum so the ROW breaks, never the sentence */}
    <div className="flex min-h-[24px] min-w-[260px] flex-1 basis-[300px] items-center">
      <p className="text-[13px] leading-5 text-pretty text-slate-600">{summary}</p>
    </div>
    <div className="flex flex-wrap items-center justify-end gap-3">{actions}</div>
  </div>
  <TabStrip />
</div>`,
  },
  {
    name: 'With breadcrumb line',
    platform: 'Desktop',
    description:
      'Standalone screens that are not reached through the top bar carry their own crumb line above the summary: 13px slate-500, with the current page in ink at 600.',
    preview: (
      <div className="w-[760px]">
        <div className="mb-3 flex items-center gap-2">
          <button className="text-[13px] text-slate-500 hover:text-ink hover:underline">Process</button>
          <span className="inline-flex text-slate-300">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
          </span>
          <button className="text-[13px] text-slate-500 hover:text-ink hover:underline">RAS 2</button>
          <span className="inline-flex text-slate-300">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
          </span>
          <span className="text-[13px] font-semibold text-ink">Tank TK-04</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex min-h-[24px] min-w-[260px] flex-1 basis-[300px] items-center">
            <p className="m-0 text-[13px] leading-5 text-slate-600">
              Smolt · 42 400 fish · stocked 12 Feb
            </p>
          </div>
          <button className="inline-flex items-center gap-[7px] rounded-md border border-slate-300 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-sm">
            Open trend
          </button>
        </div>
      </div>
    ),
    code: `<div className="mb-3 flex items-center gap-2">
  <button className="text-[13px] text-slate-500 hover:text-ink hover:underline">Process</button>
  <ChevronIcon className="text-slate-300" />
  <span className="text-[13px] font-semibold text-ink">Tank TK-04</span>
</div>`,
  },
  {
    name: 'Mobile — screen header',
    platform: 'Mobile',
    description:
      'A 24px / 800 title with an optional back arrow and subtitle. Actions become 40px icon buttons; a segmented control sits directly underneath when the screen has views.',
    preview: (
      <PhoneFrame className="p-0">
        <div className="flex items-start justify-between gap-2.5 px-4 pt-1.5 pb-3">
          <div className="flex min-w-0 items-center gap-1">
            <button aria-label="Back" className="relative -ml-1.5 inline-flex p-0.5 text-ink">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <div className="min-w-0">
              <div className="text-2xl font-extrabold leading-[1.1] tracking-[-0.5px] text-ink">
                Tank TK-04
              </div>
              <div className="mt-[3px] truncate text-[12px] text-slate-500">
                RAS 2 · 42 400 fish
              </div>
            </div>
          </div>
          <button
            aria-label="More"
            className="relative inline-flex h-10 w-10 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>
          </button>
        </div>
        <div className="px-4 pb-4">
          <div className="flex gap-0.5 rounded-xl bg-slate-100 p-[3px]">
            {['Vitals', 'Feeding', 'Trend'].map((l, i) => (
              <button
                key={l}
                className={`flex-1 rounded-[9px] px-1.5 py-2 text-[12px] font-semibold ${
                  i === 0 ? 'bg-white text-ink shadow-sm' : 'text-slate-600'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </PhoneFrame>
    ),
    code: `<div className="flex items-start justify-between gap-2.5 px-4 pt-1.5 pb-3">
  <div className="flex min-w-0 items-center gap-1">
    <BackButton />
    <div className="min-w-0">
      <div className="text-2xl font-extrabold leading-[1.1] tracking-[-0.5px] text-ink">{title}</div>
      <div className="mt-[3px] truncate text-[12px] text-slate-500">{subtitle}</div>
    </div>
  </div>
  <IconButton />
</div>`,
  },
]

export default function PageHeaderPage() {
  return (
    <ComponentDoc
      title="Page header"
      intro={
        <>
          The block between the top bar and the content: a one-line summary, the screen&rsquo;s
          controls, and its tab strip. On mobile it becomes the large title header, since there is
          no persistent top bar to carry the page name.
        </>
      }
      variants={variants}
      ignition={ignitionSpecs['page-header']}
      notes={{
        heading: 'Rules',
        items: [
          <>
            Desktop screens carry <strong>no in-page h1</strong>. The top bar&rsquo;s title plus
            crumb is the page title — duplicating it pushes the tab strip to a different y on every
            screen and makes switching tabs jump.
          </>,
          <>
            The summary side keeps a real minimum width (basis 300px, min 260px) so it is the{' '}
            <em>row</em> that wraps, never the sentence. Without it the text collapses to a sliver
            and breaks one word per line.
          </>,
          <>
            Controls never re-align on wrap. Once the row breaks they sit under the summary on the
            same side they started.
          </>,
          <>
            The subtitle uses <code className="font-mono text-[12px]">text-pretty</code> so a
            one-line summary does not leave a single orphaned word.
          </>,
        ],
      }}
    />
  )
}
