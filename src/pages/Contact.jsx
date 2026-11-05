import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { PageHero } from '../components/ContentBlocks.jsx';
import { company } from '../config/company.js';

const contactOptions = [
  {
    icon: Phone,
    eyebrow: 'CALL',
    title: company.phoneDisplay,
    href: 'tel:+919158030333',
    external: false,
  },
  {
    icon: Mail,
    eyebrow: 'EMAIL',
    title: company.email,
    href: `mailto:${company.email}`,
    external: false,
  },
  {
    icon: MessageCircle,
    eyebrow: 'WHATSAPP',
    title: 'Chat with our team',
    href: company.whatsappUrl,
    external: true,
  },
];

export default function Contact() {
  return (
    <main>
      <SEO
        title="Contact RAR Consultant"
        description="Tell RAR Consultant what your business needs. Enquire about websites, software, SEO, e-commerce, digital setup, or maintenance."
        path="/contact"
      />
      <PageHero
        eyebrow="LET’S START A CONVERSATION"
        title="What can we help you"
        accent="build next?"
        description="Share a little about your goals. We’ll use your details only to respond and prepare a relevant quote."
        breadcrumb={['Contact Us']}
      />
      <section className="section-pad contact-page-section">
        <div className="page-container contact-page-layout">
          <aside className="contact-info-column">
            <p className="eyebrow">REACH OUT DIRECTLY</p>
            <h2>
              A clear answer is <span className="text-gradient">just a message away.</span>
            </h2>
            <p className="contact-info-intro">
              Choose the channel that works for you, or send an enquiry and we’ll follow up using
              the contact details you provide.
            </p>
            <div className="contact-option-list">
              {contactOptions.map(({ icon: Icon, eyebrow, title, href, external }) => (
                <a
                  className="contact-option glass-card"
                  key={eyebrow}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                >
                  <span className="contact-option-icon">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <small>{eyebrow}</small>
                    <strong>{title}</strong>
                  </span>
                  <span className="contact-option-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
            <div className="contact-meta-list">
              <div>
                <Clock3 size={18} aria-hidden="true" />
                <span>
                  <small>WORKING HOURS</small>
                  <strong>{company.workingHours}</strong>
                </span>
              </div>
              <div>
                <MapPin size={18} aria-hidden="true" />
                <span>
                  <small>LOCATION</small>
                  <strong>{company.locationDisplay}</strong>
                </span>
              </div>
            </div>
            <p className="contact-privacy-note">
              Your enquiry is handled according to our{' '}
              <Link to="/privacy-policy">Privacy Policy</Link>. We do not store form submissions in
              a database.
            </p>
          </aside>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
