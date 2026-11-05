import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

export default function NotFound() {
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  return (
    <main className="not-found-page">
      <SEO
        title="Page Not Found"
        description="The requested page could not be found."
        path={location.pathname}
        noIndex
      />
      <motion.div
        className="not-found-content"
        initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(7px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: reduceMotion ? 0 : 0.48 }}
      >
        <p className="eyebrow">RAR CONSULTANT / 404</p>
        <span className="not-found-code">404</span>
        <h1>
          This page went <span className="text-gradient">off the map.</span>
        </h1>
        <p>
          The address may have changed, or the page may never have existed. Let’s get you back to a
          useful next step.
        </p>
        <Link to="/" className="button button-primary">
          <ArrowLeft size={16} aria-hidden="true" />
          Return to Home <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </motion.div>
      <div className="not-found-orbit" aria-hidden="true">
        <span />
      </div>
    </main>
  );
}
