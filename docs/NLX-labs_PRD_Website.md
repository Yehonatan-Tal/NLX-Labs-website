# NLX-labs — Product Requirements Document
## Corporate Identity Website

**Version:** 1.0
**Date:** February 2026
**Status:** Draft
**Target Launch:** Q1 2026 (ASAP)

---

## 1. Overview

### 1.1 Purpose

This document defines the requirements for the NLX-labs corporate identity website. It serves as the primary reference for design, development, and content decisions, and is intended to be used both as a project management artifact and as context for AI-assisted development (Claude Code).

### 1.2 Problem Statement

NLX-labs is a newly founded AI solutions company targeting small-to-medium businesses in Israel. The company currently has no web presence. Without a professional website, NLX-labs cannot effectively communicate its value proposition, establish credibility, or generate inbound leads from prospective clients. The website must serve as the company's digital front door — conveying technical competence, professionalism, and accessibility to non-technical business decision-makers.

### 1.3 Success Criteria

- Site is live and accessible within the target timeline.
- Professional visual identity that positions NLX-labs as a credible AI solutions provider.
- Fully bilingual (English and Hebrew) with seamless language switching.
- Clear call-to-action path: visitor → contact form submission or direct email.
- Mobile-responsive, fast-loading, and SEO-optimized.
- Lighthouse performance score ≥ 90 on all categories.

---

## 2. Target Audience

### 2.1 Primary Persona: Business Decision-Maker

Owner, CEO, COO, or department head of a non-tech-native SMB (20–200 employees) in Israel. This person recognizes operational inefficiencies but lacks in-house AI or data science capabilities. They are evaluating potential technology partners and need to quickly understand what NLX-labs does, whether it's relevant to them, and how to engage.

**Key characteristics:** Not deeply technical; values clarity over jargon. Likely browsing in Hebrew. Needs to see credibility signals (portfolio, methodology, professionalism). Decision-driven — wants to understand outcomes, not underlying technology.

### 2.2 Secondary Persona: Technical Evaluator

CTO, IT manager, or technical consultant who has been asked to vet NLX-labs. This person wants to understand technical approach, technology stack, and integration capabilities. May browse primarily in English.

### 2.3 Tertiary: Referral/Network Traffic

People who received a recommendation or encountered NLX-labs through networking. They need a quick confirmation of what the company does and how to get in touch.

---

## 3. Site Architecture & Pages

### 3.1 Site Map

The website is a multi-section single-page application (SPA) with smooth scroll navigation. Each section below represents a scroll-anchored area of the page, with a fixed navigation bar providing instant access to any section.

| Section | Nav Label | Purpose |
|---------|-----------|---------|
| Hero | — (top) | Immediate value proposition and primary CTA |
| Services | Services | What NLX-labs does and how it works |
| Process | How We Work | The 4-phase engagement model |
| Industries | Industries | Industry examples with use cases |
| About | About | Company story, values, and team |
| Contact | Contact | Contact form + direct email |

### 3.2 Section Specifications

#### 3.2.1 Hero Section

**Purpose:** Instantly communicate who NLX-labs is and what it does.

- Headline: A clear, compelling tagline (e.g., the company's core message from the Company Definition: "Tell us what's inefficient in your business, and we'll build you an AI-powered system that fixes it.").
- Sub-headline: One sentence expanding on the value proposition.
- Primary CTA button: "Get Started" / "Book a Discovery Call" → scrolls to Contact.
- Secondary CTA: "Learn More" → scrolls to Services.
- Visual: Abstract, modern background element (gradient, geometric pattern, or subtle animation). No stock photos.

#### 3.2.2 Services Section

**Purpose:** Explain the three core capabilities clearly.

- Three cards or columns: AI Engineering, Business Process Analysis, Tailored Implementation.
- Each card: icon, short title, 2–3 sentence description.
- Positioning statement: Reinforce that NLX-labs builds custom solutions (not off-the-shelf products).

#### 3.2.3 Process / How We Work Section

**Purpose:** Show the structured, professional engagement model.

- Visual timeline or step-flow showing the 4 phases: Discovery & Scoping → Design & Development → Deployment & Integration → Ongoing Support.
- Each phase: short description (1–2 sentences) emphasizing client collaboration.
- This section builds trust by showing methodology.

#### 3.2.4 Industries Section

**Purpose:** Help visitors self-identify ("this is for me").

- Grid or carousel of industry cards: Logistics & Customs, Education, Financial Services, Legal, Healthcare, Government, Retail.
- Each card: industry name, 2–3 example applications (drawn from the Company Definition).
- Closing statement: "We work with any industry. If your business has a process that could be smarter, we want to hear about it."

#### 3.2.5 About Section

**Purpose:** Humanize the company and establish credibility.

- Company story: Brief narrative about the founding vision.
- Guiding principles: Selected principles from the Company Definition, presented visually (icons + short text).
- Team: Placeholder for founder/team photos and bios (can be populated later).

#### 3.2.6 Contact Section

**Purpose:** Convert interest into engagement.

- Contact form: Name, Email, Company Name, Phone (optional), Message/Project Description.
- Direct email display: Clickable mailto link.
- Optional: Phone number, LinkedIn profile link.
- Form submission: Since GitHub Pages is static, form submissions will be handled via a third-party service (see Technical Architecture).

---

## 4. Functional Requirements

### 4.1 Navigation

- Fixed/sticky top navigation bar.
- Logo on the left; section links in the center or right.
- Language toggle (EN/HE) clearly visible in the nav bar.
- Mobile: hamburger menu with slide-out drawer.
- Smooth scroll to sections on click.
- Active section highlighting in nav as user scrolls.

### 4.2 Bilingual Support (i18n)

The site must be fully bilingual from launch:

1. All user-facing text externalized into locale files (en.json, he.json).
2. Language toggle in navigation switches all content instantly (no page reload).
3. Hebrew mode: full RTL layout — text alignment, navigation order, and visual flow all reversed.
4. Default language: Hebrew (primary market is Israel). English accessible via toggle.
5. URL structure: use a query parameter or hash (e.g., ?lang=en) since GitHub Pages does not support subdirectory routing.
6. Metadata (page title, meta description) also localized.

### 4.3 Contact Form

Since GitHub Pages serves only static files, the contact form requires a third-party form backend. Recommended options:

- **Formspree** (formspree.io) — free tier supports 50 submissions/month, simple integration, AJAX support.
- Alternatively: EmailJS, Netlify Forms (would require hosting change), or a custom serverless function.

**Form fields:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name | Text | Yes | Min 2 characters |
| Email | Email | Yes | Valid email format |
| Company | Text | Yes | Min 2 characters |
| Phone | Tel | No | Valid phone format |
| Message | Textarea | Yes | Min 10 characters |

Form behavior: client-side validation, loading state on submit, success confirmation message, error handling with user-friendly messaging. Anti-spam: honeypot field and/or reCAPTCHA integration.

### 4.4 Responsive Design

The site must be fully responsive across all standard breakpoints:

- Mobile: 320px–767px
- Tablet: 768px–1023px
- Desktop: 1024px+
- Large desktop: 1440px+ (max content width capped for readability)

Mobile-first design approach. Touch targets minimum 44x44px. No horizontal scrolling at any breakpoint.

### 4.5 Animations & Interactive Elements

The site should feel modern and polished without being flashy:

- Scroll-triggered fade-in/slide-in animations for sections and cards (subtle, using Intersection Observer).
- Smooth scroll behavior for navigation.
- Hover effects on cards, buttons, and links.
- Process timeline: animated step progression on scroll.
- Optional (v1.1): A lightweight AI-themed interactive element in the hero (e.g., animated node graph, particle field, or typing animation).

All animations must respect `prefers-reduced-motion`. Performance budget: animations must not cause jank or layout shifts.

---

## 5. Technical Architecture

### 5.1 Hosting & Deployment

| Attribute | Value |
|-----------|-------|
| Hosting | GitHub Pages |
| Custom Domain | TBD (to be acquired; GitHub Pages supports CNAME) |
| SSL | Automatic via GitHub Pages (Let's Encrypt) |
| Deployment | Push to main branch / GitHub Actions CI/CD |
| CDN | GitHub Pages CDN (built-in) |

**Constraint:** GitHub Pages serves static files only. No server-side rendering, no backend, no database. All dynamic behavior must be client-side or via third-party APIs.

### 5.2 Recommended Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Astro** (static site generator) — fast, lightweight, ships zero JS by default, excellent for content-focused sites |
| Styling | **Tailwind CSS** — utility-first, rapid development, built-in RTL support via `dir` attribute |
| Animation | CSS animations + Intersection Observer API (no heavy libraries) |
| i18n | Custom JSON-based locale system or astro-i18n plugin |
| Form Backend | **Formspree** (free tier) |
| Icons | Lucide Icons or Heroicons (SVG, tree-shakeable) |
| Font | Inter (Latin) + Heebo or Assistant (Hebrew) — both available on Google Fonts |
| Build Output | Static HTML/CSS/JS — deployable directly to GitHub Pages |

**Alternative:** If the team prefers React, Next.js with static export is a viable alternative. However, Astro is recommended for this project due to its lighter output, faster load times, and better fit for a content-focused marketing site.

### 5.3 Repository Structure

```
nlx-labs-website/
├── src/
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layouts (with RTL support)
│   ├── pages/            # Page routes
│   ├── i18n/             # Locale files (en.json, he.json)
│   ├── styles/           # Global styles & Tailwind config
│   └── assets/           # Images, SVGs, brand assets
├── public/               # Static files
├── astro.config.mjs      # Astro configuration
├── tailwind.config.cjs   # Tailwind configuration
└── package.json
```

### 5.4 Performance Requirements

| Metric | Target |
|--------|--------|
| Lighthouse Score | ≥ 90 on Performance, Accessibility, Best Practices, SEO |
| First Contentful Paint | < 1.5 seconds |
| Largest Contentful Paint | < 2.5 seconds |
| Total Bundle Size | < 200KB (gzipped, excluding fonts) |
| Image Optimization | WebP format, lazy loading, responsive srcset |
| Font Loading | `font-display: swap`; preload critical fonts |

---

## 6. Branding & Visual Design

### 6.1 Brand Identity (To Be Created)

NLX-labs does not yet have brand assets. The following must be created as part of this project:

1. **Logo:** Primary logo (horizontal), icon mark (for favicon/mobile), and variants for light/dark backgrounds.
2. **Color palette:** Primary, secondary, accent, and neutral colors. Must work in both light mode and potentially dark mode in the future.
3. **Typography:** Primary font pairing for headings and body. Must include a Hebrew-compatible typeface with good weight coverage.
4. **Favicon and Open Graph image.**

### 6.2 Design Direction

The visual identity should communicate: technical sophistication, approachability, trust, and modernity. The design language should feel like a premium technology company — clean, spacious, and confident — without being cold or inaccessible.

**Reference aesthetics:** Anthropic.com, Linear.app, Vercel.com, Stripe.com. These share a common design language: generous whitespace, restrained color palette, excellent typography, and a sense of clarity and focus.

**Key design principles:**

- Whitespace as a design element — let content breathe.
- Restrained color use — one or two accent colors, predominantly neutral palette.
- Typography-driven hierarchy — clear visual distinction between headings, body, and supporting text.
- No stock photography — use abstract graphics, geometric patterns, gradients, or custom illustrations.
- Dark/light flexibility — design assets that can adapt if dark mode is added later.

### 6.3 Recommended Color Palette (Starting Point)

| Role | Hex | Usage |
|------|-----|-------|
| Primary Dark | #1A2332 | Headings, nav, footer background |
| Primary Accent | #2D7DD2 | CTAs, links, highlights |
| Light Background | #F4F6F8 | Alternate section backgrounds |
| White | #FFFFFF | Primary background |
| Text Primary | #1F2937 | Body text |
| Text Secondary | #6B7280 | Supporting text, captions |

### 6.4 Typography Recommendation

| Role | Font |
|------|------|
| English Headings | Inter (Bold/Semibold) |
| English Body | Inter (Regular/Medium) |
| Hebrew Headings | Heebo (Bold/Semibold) or Assistant (Bold) |
| Hebrew Body | Heebo (Regular) or Assistant (Regular) |
| Monospace (if needed) | JetBrains Mono |

---

## 7. SEO & Metadata

- Semantic HTML5 elements throughout (header, nav, main, section, footer).
- Unique, localized meta title and description per language.
- Open Graph and Twitter Card meta tags for social sharing.
- Structured data (JSON-LD): Organization schema with name, logo, contact info.
- Sitemap.xml generation (automated by Astro).
- robots.txt configuration.
- Canonical URLs.
- Alt text on all images.
- hreflang tags for Hebrew and English language versions.

---

## 8. Accessibility

The website must meet WCAG 2.1 Level AA compliance:

- Keyboard navigation: all interactive elements focusable and operable via keyboard.
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text.
- ARIA labels on interactive elements where semantic HTML is insufficient.
- Focus indicators visible on all interactive elements.
- Screen reader friendly: proper heading hierarchy, landmark regions, alt text.
- Respects `prefers-reduced-motion` for animations.
- Respects `prefers-color-scheme` if dark mode is implemented.

---

## 9. Content Requirements

All website copy must be written in both English and Hebrew. The tone should be professional, confident, and clear — avoiding jargon and making AI accessible to non-technical audiences. Content should be drawn from and consistent with the NLX-labs Company Definition document.

**Content deliverables:**

- Hero section copy (headline + sub-headline) in both languages.
- Service descriptions (3 cards) in both languages.
- Process phase descriptions (4 phases) in both languages.
- Industry cards copy (7 industries) in both languages.
- About section narrative and principles in both languages.
- Contact section labels and success/error messages in both languages.
- Navigation labels in both languages.
- Legal: Privacy policy page (can be a simple linked page).

---

## 10. Milestones & Timeline

Given the ASAP timeline, the project follows a compressed delivery schedule:

| Phase | Deliverable | Duration | Dependencies |
|-------|------------|----------|-------------|
| Phase 1 | Brand identity (logo, colors, typography) | 3–4 days | None |
| Phase 2 | Design mockups (desktop + mobile) | 3–4 days | Phase 1 |
| Phase 3 | Content writing (EN + HE) | 3–4 days | Parallel with Phase 2 |
| Phase 4 | Development (all sections) | 7–10 days | Phases 1–3 |
| Phase 5 | QA, accessibility audit, performance tuning | 2–3 days | Phase 4 |
| Phase 6 | Launch & DNS configuration | 1 day | Phase 5 |

**Estimated total:** 3–4 weeks from project start to launch. Phases 2 and 3 can run in parallel. Development can begin on structural work before design is finalized.

---

## 11. Future Considerations (Post-v1)

The following are explicitly out of scope for v1 but should be designed for future extensibility:

- **Blog / Insights section:** For publishing articles, case studies, and thought leadership. Architecture should accommodate adding this as a route.
- **Case Studies / Portfolio:** Detailed project write-ups. Will be added as NLX-labs completes client projects.
- **Dark mode:** Design system should use CSS custom properties to make dark mode addition straightforward.
- **AI chatbot or interactive demo:** A live demonstration of NLX-labs capabilities on the website itself.
- **CMS integration:** If content updates become frequent, consider headless CMS (e.g., Contentful, Sanity) to decouple content from code.
- **Analytics:** Google Analytics 4 or Plausible (privacy-friendly) for tracking visitor behavior.
- **Cookie consent:** If analytics is added, implement a GDPR/privacy-compliant consent banner.

---

## 12. Claude Code Integration Notes

This document is intended to be injected as context into Claude Code sessions for AI-assisted development. The following notes are specifically for that purpose:

**Project identity:** This is the NLX-labs corporate identity website. NLX-labs is an Israeli AI solutions company targeting SMBs. Full company details are in the NLX-labs Company Definition document.

**Design intent:** The site should look like a premium tech company website (think Anthropic, Vercel, Stripe) — clean, modern, spacious. Avoid generic templates, stock photos, and busy layouts. Use whitespace generously.

**Critical requirements:** Bilingual (EN/HE) with full RTL support. Static-only (GitHub Pages). All text in locale files. Contact form via Formspree or equivalent. Mobile-first responsive.

**Content source:** All messaging, service descriptions, industry examples, and process phases should be derived from the NLX-labs Company Definition document.

**Quality bar:** Lighthouse ≥ 90 all categories. WCAG 2.1 AA. No stock photos. Semantic HTML. Proper heading hierarchy. `prefers-reduced-motion` respected.

---

*— End of Document —*
