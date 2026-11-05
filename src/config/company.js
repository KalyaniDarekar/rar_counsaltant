const rawSiteUrl = import.meta.env.VITE_SITE_URL?.trim();

export const company = {
  name: 'RAR Consultant',
  tagline: 'All IT Solutions Under One Roof',
  description: 'Practical digital services for ambitious small and local businesses across India.',
  phone: '+91 9158030333',
  phoneDisplay: '+91 91580 30333',
  email: 'dumbresanskar23@gmail.com',
  whatsappUrl:
    'https://wa.me/919158030333?text=Hello%20RAR%20Consultant%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.',
  country: 'India',
  registeredAddress: '[Registered Address]',
  city: '[City]',
  state: '[State]',
  locationDisplay: '[City, State, India]',
  workingHours: '[Add working days and hours]',
  grievanceOfficerName: '[Grievance Officer Name]',
  grievanceOfficerEmail: 'dumbresanskar23@gmail.com',
  grievanceResponseTimeline: '[Insert response timeline]',
  dataRetention:
    'RAR Consultant retains enquiry details only for as long as needed to respond and manage a potential engagement, then ordinarily deletes them within 12 months of the last interaction unless a longer period is required by law or necessary to establish, exercise, or defend legal claims. A copy sent to Web3Forms is subject to its configured retention setting; the provider currently allows retention for up to three years by default, so its per-form retention must be configured to align with this policy before launch.',
  consentVersion: 'v1.0',
  lastUpdated: 'November 1, 2026',
  siteUrl: rawSiteUrl ? rawSiteUrl.replace(/\/$/, '') : '',
};

export const siteRoutes = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About Us' },
  { path: '/services', title: 'Services' },
  { path: '/contact', title: 'Contact Us' },
  { path: '/privacy-policy', title: 'Privacy Policy' },
  { path: '/terms-and-conditions', title: 'Terms and Conditions' },
];

export const trustMetrics = [
  { value: 120, suffix: '+', label: 'Projects Delivered' },
  { value: 80, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years of Experience' },
  { value: 24, suffix: '/7', label: 'Support Availability' },
];
