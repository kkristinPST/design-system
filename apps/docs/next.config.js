/** @type {import('next').NextConfig} */

// GitHub Pages serves a project site at /<repo>/, not at a domain root. Set this
// to '' if the site ever moves to a custom domain or an apex Pages site.
//
// It is also exported to the client as NEXT_PUBLIC_BASE_PATH, because `basePath`
// only rewrites Next's own <Link> and asset pipeline — a hand-written href="/foo"
// in an <a> or <img> is left alone and 404s. Anything under public/ must go
// through the asset() helper in components/asset.ts, which reads this value.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/design-system';

const nextConfig = {
  // Pages is static hosting with no Node runtime. Every route in this site
  // already prerenders, so a static export loses nothing.
  output: 'export',
  basePath,

  // Emit every route as <route>/index.html rather than <route>.html.
  //
  // Required for GitHub Pages. The export also writes a <route>/ directory for
  // the RSC payload, and Pages resolves /styles/icons by looking for
  // /styles/icons/index.html FIRST — it finds that directory, finds no index,
  // and returns 404. Without this flag every route below the root is dead while
  // the CSS and assets load fine, which makes it look like a routing bug rather
  // than a hosting one.
  trailingSlash: true,
  // There is no image optimiser behind a static export.
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

module.exports = nextConfig;
