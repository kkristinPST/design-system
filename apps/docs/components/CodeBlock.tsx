'use client'

import { useState } from 'react'

/**
 * A code block that can be copied in one click.
 *
 * Developers reach this system as a published URL and nothing else: no repo,
 * no file share. Every snippet they need has to be liftable straight off the
 * page, so this is the only code block the docs use.
 */
export default function CodeBlock({
  label,
  code,
  download,
  maxHeight,
}: {
  /** Small mono caption above the block; usually the file or resource path. */
  label?: string
  code: string
  /** Optional href for a "Download" link beside the copy button. */
  download?: { href: string; filename: string }
  /** Cap the height and scroll; for the long ones like the theme file. */
  maxHeight?: number
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard is unavailable over plain http on some hosts; the text is
      // still selectable, so fail quietly rather than throwing an error at the
      // reader.
      setCopied(false)
    }
  }

  const lines = code.split('\n').length

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-2">
        {label && <p className="font-mono text-[11px] text-slate-500">{label}</p>}
        <div className="ml-auto flex items-center gap-1.5">
          {download && (
            <a
              href={download.href}
              download={download.filename}
              className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-ink"
            >
              Download
            </a>
          )}
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${label ?? 'code'} to clipboard`}
            className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-ink"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <pre
        className="mt-1.5 overflow-auto rounded-md bg-ink px-4 py-3 font-mono text-[11px] leading-relaxed text-slate-300"
        style={maxHeight ? { maxHeight } : undefined}
      >
        {code}
      </pre>
      {lines > 40 && (
        <p className="mt-1 font-mono text-[10px] text-slate-400">{lines} lines</p>
      )}
    </div>
  )
}
