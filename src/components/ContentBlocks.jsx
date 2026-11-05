import { ArrowDownRight, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function SectionHeading({ eyebrow, title, accent, text, align = 'left' }) {
  return (
    <div className={`section-heading text-${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>
        {title}
        {accent && (
          <>
            {' '}
            <span className="text-gradient">{accent}</span>
          </>
        )}
      </h2>
      {text && <p className="section-intro">{text}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, accent, description, breadcrumb = [] }) {
  return (
    <section className="page-hero">
      <div className="page-container page-hero-inner">
        {breadcrumb.length > 0 && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {breadcrumb.map((item) => (
              <span key={item} className="breadcrumb-item">
                <ChevronRight size={13} aria-hidden="true" />
                {item}
              </span>
            ))}
          </nav>
        )}
        <div className="page-hero-copy">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>
            {title}
            {accent && (
              <>
                {' '}
                <span className="text-gradient">{accent}</span>
              </>
            )}
          </h1>
          {description && <p className="page-hero-description">{description}</p>}
        </div>
        <svg className="page-hero-arc" viewBox="0 0 560 160" aria-hidden="true">
          <path
            d="M14 124C171 29 381 15 535 81"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M45 138C199 65 373 55 487 92"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity=".45"
          />
        </svg>
        <ArrowDownRight className="page-hero-arrow" size={34} aria-hidden="true" />
      </div>
    </section>
  );
}

export function ServiceCard({ service, index = 0 }) {
  const Icon = service.icon;
  return (
    <motion.article
      className="service-card glass-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.46, delay: (index % 3) * 0.07 }}
      whileHover={{ y: -7, rotateX: 1.5, rotateY: -1.5 }}
    >
      <div className="service-card-top">
        <span className="icon-tile">
          <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <span className="service-index">0{index + 1}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.short}</p>
      <Link className="text-link" to={`/services#service-${service.slug}`}>
        Learn More <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </motion.article>
  );
}
