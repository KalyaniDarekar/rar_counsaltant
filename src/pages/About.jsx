import {
  ArrowRight,
  Compass,
  Heart,
  Lightbulb,
  ShieldCheck,
  Target,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { PageHero, SectionHeading } from '../components/ContentBlocks.jsx';
import Reveal from '../components/Reveal.jsx';
import { trustMetrics } from '../config/company.js';

const values = [
  {
    icon: Heart,
    title: 'People first',
    text: 'We start with the people who use the tools and the business they support.',
  },
  {
    icon: Lightbulb,
    title: 'Practical thinking',
    text: 'The right solution is useful, understandable, and matched to the real need.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust through clarity',
    text: 'We aim for honest conversations about scope, privacy, and the next step.',
  },
  {
    icon: UsersRound,
    title: 'Work together',
    text: 'Good outcomes come from listening, shared decisions, and steady feedback.',
  },
];

const approach = [
  {
    number: '01',
    title: 'Listen closely',
    text: 'Learn what you do, where you want to go, and what is getting in the way.',
  },
  {
    number: '02',
    title: 'Agree the scope',
    text: 'Turn the conversation into a clear, practical proposal before work begins.',
  },
  {
    number: '03',
    title: 'Build with you',
    text: 'Share progress, review the details, and refine the work together.',
  },
  {
    number: '04',
    title: 'Stay available',
    text: 'Support and maintenance options help your digital work keep moving.',
  },
];

export default function About() {
  return (
    <main>
      <SEO
        title="About RAR Consultant"
        description="Meet RAR Consultant, a practical IT partner for small and local businesses seeking dependable digital solutions."
        path="/about"
      />
      <PageHero
        eyebrow="ABOUT RAR CONSULTANT"
        title="A practical partner for your"
        accent="digital journey."
        description="We bring essential IT services together so small and local businesses can move forward with confidence."
        breadcrumb={['About Us']}
      />

      <section className="section-pad story-section">
        <div className="page-container story-layout">
          <Reveal className="story-aside">
            <span className="story-mark">
              RAR<span> / </span>01
            </span>
            <div className="story-aside-line" />
            <p>Technology should make the next step clearer—not harder to reach.</p>
          </Reveal>
          <div className="story-copy">
            <p className="eyebrow">OUR STORY</p>
            <h2>
              Built around one simple idea:{' '}
              <span className="text-gradient">good technology should feel within reach.</span>
            </h2>
            <p>
              RAR Consultant is an Indian IT solutions company focused on helping small and local
              businesses build a more useful digital presence. From a first website to custom tools
              and ongoing care, we bring connected services under one roof.
            </p>
            <p>
              Our story is still being written with the businesses we support. What stays constant
              is a practical approach: listen carefully, explain the options, agree the scope, and
              make technology work for the people who use it.
            </p>
            <div className="story-callout">
              <span className="callout-dot" />
              <span>Clear advice. Thoughtful delivery. Support that stays close.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad mission-section">
        <div className="page-container mission-grid">
          <Reveal className="mission-card glass-card">
            <span className="icon-tile">
              <Target size={20} aria-hidden="true" />
            </span>
            <p className="eyebrow">OUR MISSION</p>
            <h2>
              Make digital progress <span className="text-gradient">practical.</span>
            </h2>
            <p>
              Help businesses access the right technology, with clear communication and a dependable
              partner at every stage.
            </p>
          </Reveal>
          <Reveal className="mission-card mission-card-vision glass-card" delay={0.12}>
            <span className="icon-tile">
              <Compass size={20} aria-hidden="true" />
            </span>
            <p className="eyebrow">OUR VISION</p>
            <h2>
              More businesses, <span className="text-gradient">better equipped.</span>
            </h2>
            <p>
              Be a trusted long-term guide for local and growing teams as they build, improve, and
              maintain their digital foundations.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad values-section">
        <div className="page-container">
          <SectionHeading
            eyebrow="WHAT GUIDES US"
            title="Values that show up in"
            accent="the way we work."
            text="The best partnership is built from the everyday details: listening, honest expectations, and support after launch."
          />
          <div className="value-grid">
            {values.map(({ icon: Icon, title, text }, index) => (
              <Reveal className="value-card glass-card" delay={index * 0.07} key={title}>
                <span className="icon-tile">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad about-metrics-section">
        <div className="page-container about-metrics-layout">
          <div>
            <p className="eyebrow">WHAT WE DO</p>
            <h2>
              Digital foundations for <span className="text-gradient">everyday business.</span>
            </h2>
            <p>
              We connect web development, custom software, search, e-commerce, local digital setup,
              and maintenance into one useful service offer.
            </p>
          </div>
          <div className="about-metrics">
            {trustMetrics.map((metric, index) => (
              <Reveal as="div" key={metric.label} delay={index * 0.07}>
                <strong>
                  {metric.value}
                  {metric.suffix}
                </strong>
                <span>{metric.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="page-container placeholder-disclaimer">
          Illustrative placeholder figures — confirm and update these values before launch.
        </p>
      </section>

      <section className="section-pad approach-section">
        <div className="page-container">
          <SectionHeading
            eyebrow="HOW WE WORK"
            title="From a first question to"
            accent="steady support."
            text="A collaborative method keeps the work useful, transparent, and grounded in your goals."
          />
          <div className="approach-list">
            {approach.map((step, index) => (
              <Reveal className="approach-row" delay={index * 0.06} key={step.number}>
                <span className="approach-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <ArrowRight size={17} aria-hidden="true" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad local-trust-section">
        <div className="page-container local-trust-layout">
          <div>
            <p className="eyebrow">SMALL BUSINESS, BIG POSSIBILITIES</p>
            <h2>
              Local businesses deserve{' '}
              <span className="text-gradient">good digital support, too.</span>
            </h2>
          </div>
          <div>
            <p>
              Small teams need solutions that fit their budgets, timelines, and daily reality. We
              keep the conversation direct and the work connected to what helps customers find,
              understand, and contact your business.
            </p>
            <p>
              Whether you are choosing a domain, improving an existing site, or planning a new tool,
              we help make the options easier to understand.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-container">
          <div className="simple-cta">
            <div>
              <p className="eyebrow">LET’S TALK ABOUT WHAT’S NEXT</p>
              <h2>
                Need a dependable <span className="text-gradient">IT partner?</span>
              </h2>
            </div>
            <Link to="/contact" className="button button-primary">
              Contact RAR Consultant <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
