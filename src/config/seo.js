import { company } from './company.js';

const basePath = import.meta.env.BASE_URL || '/';
const logoUrl = company.siteUrl ? `${company.siteUrl}${basePath}logo.png` : '';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  description: company.description,
  email: company.email,
  telephone: company.phone,
  ...(company.siteUrl ? { url: company.siteUrl, logo: logoUrl } : {}),
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: company.name,
  description: company.description,
  telephone: company.phone,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: company.city,
    addressRegion: company.state,
    addressCountry: 'IN',
  },
  ...(company.siteUrl ? { url: company.siteUrl } : {}),
};
