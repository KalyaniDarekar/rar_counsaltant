import { Helmet } from 'react-helmet-async';
import { Head as SSGHead } from 'vite-react-ssg';
import { company } from '../config/company.js';

function escapeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function withBasePath(value) {
  const base = import.meta.env.BASE_URL || '/';
  const suffix = value === '/' ? '' : value.replace(/^\//, '');
  return `${base.endsWith('/') ? base : `${base}/`}${suffix}`;
}

export default function SEO({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  jsonLd,
  noIndex = false,
}) {
  const fullTitle = title.includes('RAR Consultant') ? title : `${title} | RAR Consultant`;
  const canonical = company.siteUrl ? `${company.siteUrl}${withBasePath(path)}` : '';
  const absoluteImage = company.siteUrl ? `${company.siteUrl}${withBasePath(image)}` : '';
  const keywords =
    'IT solutions, website development, custom software, SEO, e-commerce, local business digital setup, website maintenance';
  const tags = (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="RAR Consultant" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {absoluteImage && <meta property="og:image" content={absoluteImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {absoluteImage && <meta name="twitter:image" content={absoluteImage} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex,follow" />}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(jsonLd) }}
        />
      )}
    </>
  );

  if (typeof window === 'undefined') return <SSGHead>{tags}</SSGHead>;
  return <Helmet>{tags}</Helmet>;
}
