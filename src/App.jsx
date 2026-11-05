import SiteLayout from './components/SiteLayout.jsx';

const lazyPage = (loader) => async () => {
  const module = await loader();
  return { Component: module.default };
};

export const routes = [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, lazy: lazyPage(() => import('./pages/Home.jsx')) },
      { path: 'about', lazy: lazyPage(() => import('./pages/About.jsx')) },
      { path: 'services', lazy: lazyPage(() => import('./pages/Services.jsx')) },
      { path: 'contact', lazy: lazyPage(() => import('./pages/Contact.jsx')) },
      { path: 'privacy-policy', lazy: lazyPage(() => import('./pages/PrivacyPolicy.jsx')) },
      { path: 'terms-and-conditions', lazy: lazyPage(() => import('./pages/Terms.jsx')) },
      { path: '*', lazy: lazyPage(() => import('./pages/NotFound.jsx')) },
    ],
  },
];
