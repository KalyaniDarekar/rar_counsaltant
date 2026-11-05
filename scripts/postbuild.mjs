import fs from 'node:fs/promises';
import path from 'node:path';
import { loadEnv } from 'vite';

const root = process.cwd();
const dist = path.join(root, 'dist');
const env = loadEnv('production', root, 'VITE_');
const basePath = process.env.VERCEL ? '/' : (env.VITE_BASE_PATH || '/');
const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/$/, '');
const routeManifest = JSON.parse(
  await fs.readFile(path.join(root, 'public/manus-routes.json'), 'utf8'),
);

function normalizedBase(value) {
  if (!value.startsWith('/')) return `/${value}/`;
  return value.endsWith('/') ? value : `${value}/`;
}

const base = normalizedBase(basePath);
const baseSuffix = base === '/' ? '' : base.slice(0, -1);
let sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
let robots = 'User-agent: *\nAllow: /\n';

if (siteUrl) {
  let parsed;
  try {
    parsed = new URL(siteUrl);
  } catch {
    throw new Error('VITE_SITE_URL must be a valid absolute URL, such as https://rarconsultant.in');
  }
  if (!['http:', 'https:'].includes(parsed.protocol))
    throw new Error('VITE_SITE_URL must use HTTP or HTTPS.');
  for (const route of routeManifest.routes) {
    const routePath = route.path === '/' ? '' : route.path.replace(/^\//, '');
    const loc = new URL(`${baseSuffix}/${routePath}`.replace(/\/{2,}/g, '/'), `${parsed.origin}/`)
      .href;
    sitemap += `  <url><loc>${loc.replace(/&/g, '&amp;')}</loc></url>\n`;
  }
  sitemap += '</urlset>\n';
  robots += `Sitemap: ${siteUrl}${base === '/' ? '' : base.slice(0, -1)}/sitemap.xml\n`;
} else {
  sitemap += '</urlset>\n';
}

await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await fs.writeFile(path.join(dist, 'robots.txt'), robots);

const notFoundTemplate = await fs.readFile(path.join(root, 'public/404.html'), 'utf8');
await fs.writeFile(
  path.join(dist, '404.html'),
  notFoundTemplate.replaceAll('__RAR_BASE_PATH__', base),
);
console.log(
  `Static postbuild complete. Site origin: ${siteUrl || '(not configured; absolute SEO URLs omitted)'}`,
);
