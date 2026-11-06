import { Component, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import { CookieConsentProvider } from '../hooks/CookieConsent.jsx';
import { ThemeProvider } from '../context/ThemeContext.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import FloatingContactActions from './FloatingContactActions.jsx';
import CookieBanner from './CookieBanner.jsx';
import ThemeSwitcher from './ThemeSwitcher.jsx';

class AppErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="error-page">
        <p className="eyebrow">RAR CONSULTANT</p>
        <h1>Something went wrong.</h1>
        <p>Refresh the page or contact us directly and we’ll help you find the right next step.</p>
        <Link className="button button-primary" to="/">
          Return home
        </Link>
      </main>
    );
  }
}

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        target?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
          block: 'start',
        });
      }, 50);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, search, hash]);
  return null;
}

function AnimatedRoute() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.48;

  return (
    <>
      <motion.div
        key={`progress-${location.pathname}`}
        className="route-progress"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{
          duration: duration || 0.01,
          ease: 'easeOut',
          opacity: { delay: duration, duration: 0.12 },
        }}
        aria-hidden="true"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="route-view"
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: 'blur(5px)' }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function SiteLayout() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <CookieConsentProvider>
          <AppErrorBoundary>
            <ScrollToTop />
            <Navbar />
            <AnimatedRoute />
            <Footer />
            <FloatingContactActions />
            <CookieBanner />
            <ThemeSwitcher />
          </AppErrorBoundary>
        </CookieConsentProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}
