import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  Code2,
  HeartHandshake,
  LockKeyhole,
  MessageSquareText,
  MoveRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { trustMetrics } from '../config/company.js';
import { services } from '../config/services.js';
import { localBusinessSchema, organizationSchema } from '../config/seo.js';
import SEO from '../components/SEO.jsx';
import { SectionHeading, ServiceCard } from '../components/ContentBlocks.jsx';
import Reveal from '../components/Reveal.jsx';

const Hero3D = lazy(() => import('../components/Hero3D.jsx'));

const usps = [
  {
    icon: BadgeCheck,
    title: 'Affordable by design',
    text: 'Practical scope and clear proposals help you invest in what matters first.',
  },
  {
    icon: Zap,
    title: 'Fast, focused delivery',
    text: 'A direct process keeps decisions moving and work aimed at your business goals.',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated support',
    text: 'Talk to a partner who stays available as your needs evolve.',
  },
  {
    icon: Code2,
    title: 'Modern technology',
    text: 'Thoughtful tools and current practices support a dependable digital foundation.',
  },
  {
    icon: MessageSquareText,
    title: 'Transparent communication',
    text: 'Clear updates, agreed scope, and no surprises about what happens next.',
  },
  {
    icon: LockKeyhole,
    title: 'Privacy-minded work',
    text: 'Purposeful data collection and practical privacy choices are part of the build.',
  },
];

const process = [
  {
    number: '01',
    title: 'Discover',
    text: 'Understand your business, audience, goals, and constraints.',
  },
  { number: '02', title: 'Design', text: 'Shape a clear experience and agree the right scope.' },
  { number: '03', title: 'Develop', text: 'Build, review, and refine the solution with you.' },
  {
    number: '04',
    title: 'Deploy',
    text: 'Prepare the launch and hand over a solution you can use.',
  },
  {
    number: '05',
    title: 'Support',
    text: 'Keep improving with practical maintenance and guidance.',
  },
];

const technologies = [
  'React',
  'Node.js',
  'WordPress',
  'Shopify',
  'JavaScript',
  'HTML & CSS',
  'Google Business Profile',
  'E-commerce',
  'SEO',
];
const sampleQuotes = [
  {
    quote:
      '“The team made our website project feel clear and manageable, from the first conversation to launch.”',
    source: 'Sample testimonial — replace with an approved client review.',
  },
  {
    quote:
      '“We appreciated the practical guidance and the way the solution was shaped around our business.”',
    source: 'Sample testimonial — replace with an approved client review.',
  },
  {
    quote: '“A responsive partner who helped us understand the next step in our digital setup.”',
    source: 'Sample testimonial — replace with an approved client review.',
  },
];

function MetricCounter({ metric, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '40px' });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(metric.value);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!inView || reduceMotion || animatedRef.current) return undefined;
    animatedRef.current = true;
    setCount(0);
    const start = performance.now();
    const duration = 1200;
    let frame;
    const update = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(metric.value * eased));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [inView, metric.value, reduceMotion]);

  return (
    <motion.div
      ref={ref}
      className="metric-card"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
    >
      <strong>
        {count}
        {metric.suffix}
      </strong>
      <span>{metric.label}</span>
    </motion.div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const words = 'Powering Your Business With Smart IT Solutions'.split(' ');
  return (
    <section className="hero-section">
      <div className="hero-bg-glow" aria-hidden="true" />
      <div className="page-container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            ALL IT SOLUTIONS UNDER ONE ROOF
          </p>
          <h1 aria-label="Powering Your Business With Smart IT Solutions">
            <span className="hero-word-line">
              {words.slice(0, 2).map((word, index) => (
                <motion.span
                  className="hero-word"
                  key={word}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="hero-word-line">
              {words.slice(2, 4).map((word, index) => (
                <motion.span
                  className="hero-word"
                  key={word}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.26 + index * 0.08 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="hero-word-line hero-word-line-accent">
              {words.slice(4).map((word, index) => (
                <motion.span
                  className="hero-word"
                  key={word}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.42 + index * 0.08 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>
          <motion.p
            className="hero-description"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            From websites and custom software to search visibility and ongoing support, get one
            practical partner for your digital growth.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <Link to="/services" className="button button-secondary">
              Explore Services <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="button button-primary">
              Get a Free Quote <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
          <div className="hero-note">
            <span className="hero-note-line" />
            Built for small and local businesses across India
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-label">
            <span /> DIGITAL SYSTEMS / RAR.01
          </div>
          <Suspense
            fallback={
              <div className="hero-visual hero-visual-fallback-only">
                <span className="fallback-core" />
              </div>
            }
          >
            <Hero3D />
          </Suspense>
          <span className="hero-art-coordinate">18° 31’ 12.0” N</span>
        </div>
        <a className="hero-scroll" href="#home-proof" aria-label="Scroll to company highlights">
          <ArrowDown size={15} aria-hidden="true" />
          <span>Scroll to explore</span>
        </a>
      </div>
      <svg
        className="hero-swoosh"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 86C365 30 803 34 1440 92" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M0 101C427 53 914 58 1440 104"
          fill="none"
          stroke="currentColor"
          strokeWidth=".8"
          opacity=".5"
        />
      </svg>
    </section>
  );
}

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, localBusinessSchema],
  };
  const techItems = [...technologies, ...technologies];

  return (
    <>
      <SEO
        title="Smart IT Solutions for Growing Businesses"
        description="Websites, custom software, SEO, e-commerce, local digital setup, and maintenance from RAR Consultant in India."
        path="/"
        jsonLd={structuredData}
      />
      <main>
        <Hero />
        <section id="home-proof" className="trust-section section-pad">
          <div className="page-container">
            <div className="trust-intro">
              <span className="eyebrow">A STRONGER DIGITAL FOUNDATION</span>
              <p>Clear solutions. Thoughtful delivery. Support that stays close.</p>
            </div>
            <div className="metrics-row">
              {trustMetrics.map((metric, index) => (
                <MetricCounter key={metric.label} metric={metric} index={index} />
              ))}
            </div>
            <p className="placeholder-disclaimer">
              Illustrative placeholder figures — replace with verified business metrics before
              launch.
            </p>
          </div>
        </section>

        <section className="section-pad services-preview-section">
          <div className="page-container">
            <div className="section-header-row">
              <SectionHeading
                eyebrow="WHAT WE DO"
                title="The right digital help, in"
                accent="one place."
                text="Choose focused support for the next stage of your business—or bring several needs together with one partner."
              />
              <Link className="text-link section-side-link" to="/services">
                View all services <MoveRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="service-grid">
              {services.map((service, index) => (
                <ServiceCard key={service.slug} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad why-section">
          <div className="page-container why-layout">
            <div className="why-copy">
              <SectionHeading
                eyebrow="WHY RAR CONSULTANT"
                title="Technology should move"
                accent="your business forward."
                text="We keep the process understandable and the work connected to real business needs—without making digital transformation feel out of reach."
              />
              <Link className="text-link" to="/about">
                Get to know us <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="usp-list">
              {usps.map(({ icon: Icon, title, text }, index) => (
                <Reveal className="usp-item" delay={index * 0.04} key={title}>
                  <span className="usp-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <span className="usp-number">0{index + 1}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad process-section">
          <div className="page-container">
            <SectionHeading
              eyebrow="A CLEAR WAY FORWARD"
              title="A simple process. Strong"
              accent="work, together."
              text="From the first conversation to ongoing care, each stage stays collaborative and clear."
              align="center"
            />
            <div className="process-track">
              {process.map((step, index) => (
                <Reveal className="process-step" delay={index * 0.08} key={step.number}>
                  <span className="process-number">{step.number}</span>
                  <span className="process-marker" aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="tech-section" aria-label="Technology and platforms">
          <div className="page-container tech-topline">
            <span className="eyebrow">TOOLS THAT MAKE THE WORK WORK</span>
            <span>Selected to fit the project, not the other way around.</span>
          </div>
          <div className="tech-marquee">
            <div className="tech-marquee-track">
              {techItems.map((tech, index) => (
                <span key={`${tech}-${index}`} className="tech-pill">
                  <Sparkles size={13} aria-hidden="true" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad testimonial-section">
          <div className="page-container testimonial-layout">
            <div>
              <SectionHeading
                eyebrow="A SAMPLE, NOT A CLAIM"
                title="Good work starts with"
                accent="a good conversation."
                text="These sample lines show the style of feedback we hope to earn. They are not client reviews and must be replaced with approved testimonials."
              />
              <p className="sample-badge">
                <Clock3 size={14} aria-hidden="true" /> Sample content — not a client endorsement
              </p>
            </div>
            <div className="testimonial-card glass-card">
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.22 }}
                >
                  <blockquote>{sampleQuotes[quoteIndex].quote}</blockquote>
                  <p className="sample-source">{sampleQuotes[quoteIndex].source}</p>
                </motion.div>
              </AnimatePresence>
              <div className="testimonial-controls">
                <span>
                  {String(quoteIndex + 1).padStart(2, '0')} <i>/</i>{' '}
                  {String(sampleQuotes.length).padStart(2, '0')}
                </span>
                <div>
                  <button
                    type="button"
                    aria-label="Previous sample quote"
                    onClick={() =>
                      setQuoteIndex((quoteIndex + sampleQuotes.length - 1) % sampleQuotes.length)
                    }
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next sample quote"
                    onClick={() => setQuoteIndex((quoteIndex + 1) % sampleQuotes.length)}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad final-cta-section">
          <div className="page-container">
            <div className="final-cta-card">
              <div className="cta-orbit" aria-hidden="true" />
              <div className="final-cta-copy">
                <p className="eyebrow">YOUR NEXT STEP STARTS HERE</p>
                <h2>
                  Ready to take your business <span className="text-gradient">online?</span>
                </h2>
                <p>
                  Share what you’re working toward. We’ll help you find a practical way forward.
                </p>
              </div>
              <Link to="/contact" className="button button-primary">
                Start a conversation <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
