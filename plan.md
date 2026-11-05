# RAR Consultant Website — Implementation Plan

## Scope and architecture

Build the requested six-route React website as a browser-only static application. Use React 18, Vite, Tailwind CSS 3, React Router DOM v6, Framer Motion, `@react-three/fiber`/`@react-three/drei`, React Hook Form, Zod, `react-helmet-async`, and lucide-react. No application server, Express process, database, or stored enquiry data will be introduced. The contact form will POST directly to Web3Forms, and its access key will be read only from `VITE_WEB3FORMS_ACCESS_KEY` at build time. The email cannot be verified end-to-end until the owner supplies a key linked to `dumbresanskar23@gmail.com`.

Routes will be `/`, `/about`, `/services`, `/contact`, `/privacy-policy`, and `/terms-and-conditions`, with a custom fallback for unknown routes. Shared layout will include the sticky navigation, footer, consent banner, floating Call and WhatsApp controls, route transitions, scroll-to-top behavior, and an error boundary. `AnimatePresence` will coordinate transitions and a thin red top rule. The services catalogue and editable trust-strip numbers will be centralized in configuration. The contact page will map the requested service query parameter to the select field.

Home will lead with the requested lazy-loaded procedural R3F network/globe, red orbit arc, reduced-motion/WebGL fallback, and responsive particle count. The rest of the page will carry the animated trust strip, six service previews, six value propositions, five-stage process, technology marquee, explicitly sample-labelled testimonial carousel, and final contact CTA. About and Services will use dedicated route content. The six detailed service descriptions and included work will follow the brief, without price promises. Privacy and Terms will have separate long-form pages with desktop table of contents and mobile-friendly sections, using centralized company/legal placeholders.

## Contact, consent, and legal-data handling

The form will normalize and validate the five requested fields with Zod and RHF, sanitize description markup, limit the telephone input, derive an IST consent timestamp, and include the consent text version. The checkbox will gate the button together with field validity. Submission states will cover pending, success, timeout, network and provider failures; the Web3Forms honeypot and 60-second timestamp-only throttle will be client-side. No visitor-submitted values will be persisted to localStorage or written to logs. A missing access key will produce a developer-console configuration warning and a safe on-page explanation; no key will be fabricated or hardcoded.

The consent and privacy copy will identify Web3Forms as the third-party Data Processor and disclose possible processing outside India. The policy will cover the requested DPDP Act/Rules and IT Act topics, retention, rights/grievance contact, cookies, children, breach handling, and third-party links. Terms will cover all 23 requested business/legal subjects. Explicit editable placeholders (including address, Grievance Officer, city/state, working hours/location, and serviceable operational details) will live in `src/config/company.js`. The requested lawyer-review caveat will appear in the README only, not public pages. Cookie preferences will distinguish essential from optional categories and remain reversible through the footer; no site-authored analytics will load by default. Before implementation, the platform-injected analytics and badge scripts will also be disabled where settings allow, to align platform defaults with the no-tracking requirement.

## Static rendering, SEO, and delivery

Use Vite with build-time static prerendering for every known route so route HTML contains page content and route metadata before browser JavaScript runs; retain React Router for client-side navigation. Use one `<h1>` per route, page-specific title/description and social metadata, JSON-LD for Organization/LocalBusiness and Services, plus `robots.txt`, `sitemap.xml`, Netlify `_redirects`, Vercel rewrites, and a static route manifest. Since no production domain was supplied, absolute canonical/`og:url` and sitemap host values must not be guessed; they will be driven by a documented `VITE_SITE_URL` setting and omitted or left non-production-ready until the owner supplies the real origin. The README will document how to configure the site origin and Web3Forms key on the target platforms.

Pin the package manager in the manifest, commit its lockfile and explicit lifecycle-script policy, and use a reproducible `pnpm install --frozen-lockfile` plus Vite build for `/dist`. Development will use the project's existing port 3000. Static hosting instructions will cover Vercel, Netlify, Cloudflare Pages, and GitHub Pages, including the GitHub Pages `404.html`/HashRouter fallback option. The Webdev static publication declaration will point to the real `dist` output and include a self-contained install-and-build command; it will not enable server or database features. Local validation will include dependency install, static build, route-manifest retrieval, and code inspection/diagnostics. A read-only requirements review will trace the connected routes, consent, form submission, and legal disclosures before handoff.

## Project structure

- `public/`: vector-derived logo and favicon/OG assets, sitemap/robots, Netlify redirects, route manifest, and static fallback assets.
- `src/components/`: shared navbar, footer, floating contact actions, cookie consent/preferences, animated route shell, error boundary, SEO helper, service cards, and contact form.
- `src/pages/`: Home, About, Services, Contact, Privacy Policy, Terms, and Not Found route components.
- `src/config/`: company/legal placeholders, service catalogue, trust numbers, and route metadata.
- `src/hooks/`: consent, scroll, reduced-motion, and shared UI state.
- `src/lib/`: Zod/RHF schemas and normalizers, Web3Forms submission/timeout logic, and utility functions.
- `scripts/`: static route prerendering and sitemap generation if required by the selected SSG integration.
- Root configuration: `App.jsx`, `main.jsx`, `index.css`, Vite, Tailwind, ESLint, Prettier, `.env.example`, `vercel.json`, deployment redirects, `README.md`, `plan.md`, and `TODO.md`.

## Design system

**Design movement:** premium dark-tech editorial design, using the specified royal-blue/red identity as a restrained, recognizable agency system.

**Core principles:** trust before spectacle; generous, readable typography; purposeful motion; and clear, low-friction contact actions.

**Color philosophy:** near-black navy provides calm contrast; saturated blue signals technical competence; bright red is reserved for the logo arc and decisive action; white and muted lavender-blue keep text legible.

**Layout paradigm:** a wide, asymmetrical hero with the copy anchored to one side and the 3D network occupying the other, followed by alternating editorial/service bands and compact proof points rather than a monotonous repeated grid. Small-screen layouts collapse into a clear single column.

**Signature elements:** the red orbital swoosh; a subtle royal-blue radial glow; and glass panels with a fine white border. Motion will be restrained, short, and disabled/reduced when the visitor requests reduced motion.

**Interaction and animation:** clear focus states; a single animated active-link marker; gentle reveal/hover movement; word-staggered hero copy; animated counters and process steps; accessible FAQ expansion; and no animation dependence for reading or form submission.

**Typography:** Poppins for strong headings and compact uppercase labels with tracking; Inter for paragraphs, labels, and controls. Heading scale will be responsive, body copy comfortable at mobile widths, and font loading will use `font-display: swap`.

**Brand essence:** practical digital partner for Indian small and local businesses, bringing core IT services together under one roof. Personality: capable, direct, supportive.

**Brand voice:** specific and reassuring, with action-first CTAs. Examples: “A better digital foundation starts here.” and “Tell us what your business needs next.”

**Wordmark and logo:** a compact bespoke SVG/Raster-compatible mark with bold white `RAR`, an arcing red swoosh, and tracked red `CONSULTANT` on a deep royal-blue field. The upload contains the written brief but no logo image; this will be an original approximation of the described mark, not a claim to reproduce a missing original asset.

**Signature brand color:** `#0000A0` royal blue, paired with `#FF1A1A` red for its distinctive swoosh and CTA emphasis.

## Assumptions for approval

The source attachment includes no actual `logo.png`, no Web3Forms access key, no production domain, and no completed legal business details. The implementation will provide the matching logo asset and centralized editable placeholders; the owner must configure the genuine form key and domain before live delivery/production SEO. Legal copy is a practical template, not legal advice, and the README will require qualified Indian legal review before launch.