/**
 * Prefix a path under public/ with the deployment's base path.
 *
 * Next's `basePath` rewrites <Link> hrefs and everything in its own asset
 * pipeline, but NOT a hand-written href="/x" or src="/x". Those resolve to the
 * domain root and 404 wherever the site is not served from one — which is every
 * GitHub Pages project site. Route those through `asset()` instead.
 *
 * Routes do not need this: use <Link href="/foundations/color"> and Next adds
 * the prefix itself. This is only for files in public/.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function asset(path: string): string {
  return `${BASE}${path}`
}
