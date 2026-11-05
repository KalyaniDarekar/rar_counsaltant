import { Code2, Globe2, LineChart, MonitorCog, ShoppingBag, Store } from 'lucide-react';

export const services = [
  {
    slug: 'website-development',
    title: 'Website Development',
    short: 'Fast, accessible websites that turn a first visit into a confident next step.',
    description:
      'We design and build responsive business websites that explain your offer clearly, work beautifully on mobile, and give customers a simple way to get in touch.',
    included: [
      'Responsive business websites',
      'Landing pages and portfolios',
      'CMS integration',
      'Accessible, performance-minded front ends',
    ],
    idealFor:
      'Small businesses, consultants, service providers, and growing brands that need a credible online home.',
    icon: Globe2,
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    short: 'Purpose-built tools that make complex day-to-day work simpler.',
    description:
      'From a focused web app to a full internal dashboard, we shape software around the way your team works and the outcomes you need.',
    included: [
      'Web apps and dashboards',
      'Admin panels and automation tools',
      'API integration',
      'Responsive interfaces and maintainable code',
    ],
    idealFor: 'Teams that have outgrown spreadsheets or need a tailored way to manage operations.',
    icon: Code2,
  },
  {
    slug: 'search-engine-optimization',
    title: 'Search Engine Optimization (SEO)',
    short: 'A practical search foundation that helps the right customers discover you.',
    description:
      'We improve page structure, technical health, and local discoverability with a transparent plan and clear reporting.',
    included: [
      'On-page and technical SEO',
      'Keyword research',
      'Google Business Profile guidance',
      'Monthly reports',
    ],
    idealFor:
      'Businesses ready to build sustainable search visibility and improve how their pages communicate relevance.',
    icon: LineChart,
  },
  {
    slug: 'e-commerce-platform-portal',
    title: 'E-Commerce Platform / Portal',
    short: 'A simpler path from product discovery to a well-managed order.',
    description:
      'We create online stores and product portals designed for clear browsing, practical operations, and the payment flows your customers expect.',
    included: [
      'Online stores and product catalogs',
      'Indian payment gateway integration',
      'Order management',
      'Responsive storefront experience',
    ],
    idealFor:
      'Retailers and product businesses moving online or improving an existing digital sales channel.',
    icon: ShoppingBag,
  },
  {
    slug: 'local-business-digital-setup',
    title: 'Local Business Digital Setup',
    short:
      'The essential digital foundations that make a local business easier to find and contact.',
    description:
      'We help bring the practical pieces together—from your domain and business email to a stronger local listing and WhatsApp Business setup.',
    included: [
      'Domain and hosting setup',
      'Business email',
      'Google Maps listing',
      'WhatsApp Business and social profiles',
    ],
    idealFor:
      'Local shops, clinics, trades, and service businesses building their first consistent digital presence.',
    icon: Store,
  },
  {
    slug: 'website-maintenance',
    title: 'Website Maintenance',
    short: 'Steady care that keeps your site updated, safer, and running smoothly.',
    description:
      'We provide ongoing site care so updates, backups, security checks, and content changes do not get left until something breaks.',
    included: [
      'Software and content updates',
      'Backups and security monitoring',
      'Performance tuning',
      'Content changes and uptime support',
    ],
    idealFor:
      'Businesses that need a dependable partner to keep an existing website healthy and current.',
    icon: MonitorCog,
  },
];

export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));
