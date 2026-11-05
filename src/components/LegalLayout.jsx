import { ArrowUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { company } from '../config/company.js';
import { PageHero } from './ContentBlocks.jsx';

export function slugifyHeading(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function LegalLayout({ title, description, sections }) {
  return (
    <main id="top">
      <PageHero
        eyebrow="RAR CONSULTANT / LEGAL"
        title={title}
        description={description}
        breadcrumb={[title]}
      />
      <section className="section-pad legal-section">
        <div className="page-container legal-layout">
          <aside className="legal-sidebar">
            <div className="legal-sidebar-inner">
              <p className="eyebrow">ON THIS PAGE</p>
              <nav aria-label={`${title} sections`}>
                {sections.map((section, index) => (
                  <a key={section.heading} href={`#${slugifyHeading(section.heading)}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {section.heading}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
          <article className="legal-content">
            <div className="legal-updated">
              <span>Last updated</span>
              <time dateTime="2026-11-01">{company.lastUpdated}</time>
            </div>
            <div className="legal-intro">
              <p>{description}</p>
              <Link to="/contact">
                Questions or rights requests? Contact us{' '}
                <ChevronRight size={14} aria-hidden="true" />
              </Link>
            </div>
            {sections.map((section, index) => (
              <section
                className="legal-block"
                id={slugifyHeading(section.heading)}
                key={section.heading}
              >
                <p className="legal-section-number">SECTION {String(index + 1).padStart(2, '0')}</p>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <a href="#top" className="back-to-top">
              <ArrowUp size={15} aria-hidden="true" />
              Back to top
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
