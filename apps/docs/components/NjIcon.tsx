import type { ReactNode } from 'react'

/**
 * The lucide glyphs the NJORD chrome actually uses, by their source names
 * (see lib/chrome.jsx). 24x24 viewBox, 2px stroke, currentColor.
 */
const paths: Record<string, ReactNode> = {
  home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z" /><path d="M9 3v15M15 6v15" /></>,
  'bell-ring': <><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" /><path d="M2 8a5 5 0 0 1 2-4M22 8a5 5 0 0 0-2-4" /></>,
  bell: <><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></>,
  'file-text': <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v5h6" /><path d="M8 13h8M8 17h5" /></>,
  utensils: <><path d="M4 2v7a3 3 0 0 0 6 0V2" /><path d="M7 2v20" /><path d="M17 2c-1.5 2-2 4-2 7 0 2 1 3 2 3v10" /></>,
  fish: <><path d="M2 12c3-5 8-7 12-7 4 0 7 3 8 7-1 4-4 7-8 7-4 0-9-2-12-7Z" /><path d="M18 12h.01" /><path d="M2 12c2 1 3 3 3 5" /></>,
  'line-chart': <><path d="M3 3v18h18" /><path d="m7 14 4-5 3 3 5-6" /></>,
  // lucide "settings-2"; sliders. Chosen over the gear because the gear path
  // is dense enough that it turns to mush at the 18px the sidebar draws it at.
  settings: <><path d="M20 7h-9M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></>,
  'chevrons-left': <><path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" /></>,
  'chevron-left': <path d="m15 18-6-6 6-6" />,
  'chevron-right': <path d="m9 18 6-6-6-6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-up': <path d="m18 15-6-6-6 6" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  'notebook-pen': <><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /><path d="M2 6h4M2 12h4M2 18h4" /><path d="M18.4 2.6a2 2 0 1 1 3 3L16 11l-4 1 1-4Z" /></>,
  'help-circle': <><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></>,
  check: <polyline points="20 6 9 17 4 12" />,
  'check-circle-2': <><circle cx="12" cy="12" r="10" /><polyline points="16 10 11 15 8 12" /></>,
  'arrow-up-right': <><path d="M7 17 17 7" /><path d="M9 7h8v8" /></>,
  'alert-triangle': <><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></>,
}

export default function NjIcon({
  name,
  size = 18,
  strokeWidth = 2,
  className,
  color,
}: {
  name: keyof typeof paths | string
  size?: number
  strokeWidth?: number
  className?: string
  color?: string
}) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      style={{ flex: 'none' }}
    >
      {d}
    </svg>
  )
}
