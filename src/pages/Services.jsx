import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { PageHero, SectionHeading } from '../components/ContentBlocks.jsx';
import Reveal from '../components/Reveal.jsx';
import { services } from '../config/services.js';
import { company } from '../config/company.js';

const faqs = [
  {
    question: 'How do I get a quote?',
    answer:
      'Tell us what you need through the enquiry form. We will review the scope and discuss a tailored proposal. We do not publish fixed prices because each project has different requirements.',
  },
  {
    question: 'Can I ask for just one service?',
    answer:
      'Yes. You can enquire about one service or combine several. We will focus the conversation on the outcome you need.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'Timing depends on the scope, content, integrations, and review process. We will discuss a realistic schedule as part of the proposal.',
  },
  {
    question: 'Do you guarantee search rankings?',
    answer:
      'No. Search results depend on many factors outside any one provider’s control. We focus on sound technical and on-page foundations, transparent work, and useful reporting.',
  },
  {
    question: 'Can you maintain a website you did not build?',
    answer:
      'We can review an existing site and discuss a suitable maintenance scope. The right support depends on its platform, access, and current condition.',
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="faq-list">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <article className={`faq-item${open ? ' faq-open' : ''}`} key={faq.question}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                <span>{faq.question}</span>
                <span className="faq-toggle">
                  <ChevronDown size={18} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`faq-panel-${index}`}
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}

export default function Services() {
  const schema = services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: company.name,
      ...(company.siteUrl ? { url: company.siteUrl } : {}),
    },
    areaServed: { '@type': 'Country', name: 'India' },
  }));

  return (
    <main>
      <SEO
        title="IT Services"
        description="Explore website development, custom software, SEO, e-commerce, local business digital setup, and website maintenance."
        path="/services"
        jsonLd={schema}
      />
      <PageHero
        eyebrow="OUR SERVICES"
        title="One roof. Six ways to"
        accent="move forward."
        description="Choose focused help for a single need or bring connected parts of your digital work together."
        breadcrumb={['Services']}
      />
      <section className="section-pad service-details-section">
        <div className="page-container">
          <div className="service-page-intro">
            <SectionHeading
              eyebrow="PRACTICAL IT SOLUTIONS"
              title="Built around your"
              accent="business needs."
              text="Every project starts with a clear conversation about your goals, timing, and scope. Quotes are tailored to the work—no invented package prices."
            />
            <p className="service-intro-note">
              <CircleHelp size={17} aria-hidden="true" /> Looking for an option not listed?{' '}
              <Link to="/contact">Tell us about it.</Link>
            </p>
          </div>
          <div className="service-detail-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal
                  id={`service-${service.slug}`}
                  className={`service-detail-row${index % 2 ? ' service-detail-reverse' : ''}`}
                  key={service.slug}
                  delay={0.02}
                >
                  <div className="service-detail-visual">
                    <span className="service-detail-number">0{index + 1}</span>
                    <div className="service-detail-icon">
                      <Icon size={40} strokeWidth={1.35} aria-hidden="true" />
                    </div>
                    <span className="service-detail-arc" aria-hidden="true" />
                  </div>
                  <div className="service-detail-copy">
                    <p className="eyebrow">SERVICE 0{index + 1}</p>
                    <h2>{service.title}</h2>
                    <p className="service-detail-description">{service.description}</p>
                    <h3>What’s included</h3>
                    <ul className="included-list">
                      {service.included.map((item) => (
                        <li key={item}>
                          <Check size={15} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="ideal-for">
                      <strong>Ideal for:</strong> {service.idealFor}
                    </p>
                    <Link className="button button-primary" to={`/contact?service=${service.slug}`}>
                      Get a Quote <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-pad faq-section">
        <div className="page-container faq-layout">
          <div>
            <SectionHeading
              eyebrow="GOOD TO KNOW"
              title="A few common"
              accent="questions."
              text="If you need a more specific answer, send us a message and we’ll talk it through."
            />
            <Link className="text-link" to="/contact">
              Ask us directly <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <FaqAccordion />
        </div>
      </section>
      <section className="section-pad">
        <div className="page-container">
          <div className="simple-cta">
            <div>
              <p className="eyebrow">NO FIXED PACKAGE PRICES</p>
              <h2>
                Let’s scope the right work <span className="text-gradient">for you.</span>
              </h2>
            </div>
            <Link to="/contact" className="button button-primary">
              Get a Free Quote <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
