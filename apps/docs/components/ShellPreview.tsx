import type { ReactNode } from 'react'

/**
 * Renders a design at its REAL pixel dimensions and scales the whole thing down
 * to fit the docs column. Every value inside is a true source px value, so the
 * preview is proportionally 1:1 with the running app rather than re-estimated.
 */
export default function ShellPreview({
  width,
  height,
  scale,
  children,
  className = '',
}: {
  width: number
  height: number
  scale: number
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ width: width * scale, height: height * scale }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
