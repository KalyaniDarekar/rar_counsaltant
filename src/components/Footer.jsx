import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { company } from '../config/company.js';
import { services } from '../config/services.js';
import { useCookieConsent } from '../hooks/CookieConsent.jsx';

export default function Footer() {
  const { reopen } = useCookieConsent();
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-main">
          <div className="footer-brand-column">
            <Link to="/" className="footer-logo-link" aria-label="RAR Consultant home">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="RAR Consultant"
                width="128"
                height="62"
                loading="lazy"
              />
            </Link>
            <p>
              {company.description} {company.tagline}.
            </p>
            <div className="footer-contact-links">
              <a href="tel:+919158030333">
                <Phone size={15} aria-hidden="true" />
                {company.phoneDisplay}
              </a>
              <a href={`mailto:${company.email}`}>
                <Mail size={15} aria-hidden="true" />
                {company.email}
              </a>
            </div>
          </div>
          <div className="footer-link-column">
            <h2>Explore</h2>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-link-column">
            <h2>Services</h2>
            {services.map((service) => (
              <Link key={service.slug} to={`/contact?service=${service.slug}`}>
                {service.title}
              </Link>
            ))}
          </div>
          <div className="footer-link-column">
            <h2>Legal &amp; privacy</h2>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
            <button type="button" className="footer-text-button" onClick={reopen}>
              Cookie Settings <ArrowUpRight size={13} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RAR Consultant. All rights reserved.</p>
          <p>Compliant with India's Digital Personal Data Protection Act, 2023.</p>
        </div>
      </div>
    </footer>
  );
}
