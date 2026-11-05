import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

function BrandLogo({ onClick }) {
  return (
    <Link to="/" className="brand-lockup" aria-label="RAR Consultant home" onClick={onClick}>
      <img
        className="brand-logo"
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="RAR Consultant"
        width="128"
        height="62"
      />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const links = (mobile = false) =>
    navLinks.map(({ label, to, end }) => (
      <NavLink
        key={to}
        to={to}
        end={end}
        className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
        onClick={mobile ? () => setOpen(false) : undefined}
      >
        {({ isActive }) => (
          <>
            {label}
            {isActive && (
              <motion.span
                className="nav-underline"
                layoutId="active-nav"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </>
        )}
      </NavLink>
    ));

  return (
    <header className={`site-header${scrolled ? ' site-header-scrolled' : ''}`}>
      <div className="nav-shell page-container">
        <BrandLogo onClick={() => setOpen(false)} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links()}
        </nav>
        <div className="nav-actions">
          <Link to="/contact" className="button button-primary nav-quote">
            Get a Free Quote <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {links(true)}
            <Link
              to="/contact"
              className="button button-primary mobile-quote"
              onClick={() => setOpen(false)}
            >
              Get a Free Quote <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
