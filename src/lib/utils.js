export function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

export function formatPhoneDisplay(value) {
  return value || '+91 91580 30333';
}

export function absoluteSiteUrl(siteUrl, path = '/') {
  if (!siteUrl) return '';
  const base = siteUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
