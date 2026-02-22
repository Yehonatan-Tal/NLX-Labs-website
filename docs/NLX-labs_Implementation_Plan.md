# NLX-Labs Corporate Website — Implementation Plan

## Context

NLX-labs is a newly founded Israeli AI solutions company targeting SMBs. It currently has no web presence. This plan covers building a bilingual (EN/HE) corporate identity website as a static SPA deployed to GitHub Pages. The repo is cloned and empty at `C:\Users\Erika\Desktop\NLX-Labs-website\`. All content derives from the Company Definition document; all requirements from the PRD.

**Target repo**: `C:\Users\Erika\Desktop\NLX-Labs-website\`
**Source docs**: `C:\Users\Erika\Desktop\NLX_Labs\docs\` (PRD + Company Definition)
**Design spec**: `C:\Users\Erika\Desktop\NLX_Labs\docs\NLX-labs_Design_Specification.md` — Single source of truth for all visual and interaction design decisions. Must be followed for spacing, typography, color application, animation, and component-specific styling. When in doubt, the Design Specification overrides default choices.

---

## 1. Project Setup

### 1.1 Initialize Astro Project

```bash
cd C:\Users\Erika\Desktop\NLX-Labs-website
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

### 1.2 Install Dependencies

**Runtime:**
```bash
npm install astro@^5 tailwindcss@^4 @tailwindcss/vite @lucide/astro
```

**Dev:**
```bash
npm install -D typescript@^5.7 @astrojs/check prettier prettier-plugin-astro
```

| Package | Reason |
|---------|--------|
| `astro@^5` | Static site generator, zero JS by default, perfect for GitHub Pages |
| `tailwindcss@^4` | Utility-first CSS with native logical properties for RTL (`ps-*`, `pe-*`, `ms-*`, `me-*`) |
| `@tailwindcss/vite` | Tailwind v4 Vite plugin integration |
| `@lucide/astro` | SVG icons, tree-shakeable, Astro-native |
| `typescript@^5.7` | Type safety |
| `@astrojs/check` | Astro-specific TypeScript diagnostics |
| `prettier` + plugin | Code formatting for `.astro` files |

### 1.3 Configuration Files

**`astro.config.mjs`**

```javascript
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://yehonatan-tal.github.io",
  base: "/NLX-Labs-website",
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
```

> **Note:** `site` and `base` must be updated once the actual GitHub username/org and custom domain are confirmed. If a custom domain is used, remove `base` and set `site` to the custom domain.

**`tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@i18n/*": ["src/i18n/*"],
      "@assets/*": ["src/assets/*"],
      "@styles/*": ["src/styles/*"]
    }
  }
}
```

**`src/styles/global.css`**

```css
@import "tailwindcss";

@theme {
  --color-dark: #1A2332;
  --color-accent: #2D7DD2;
  --color-accent-hover: #2468B0;
  --color-light-bg: #F4F6F8;
  --color-white: #FFFFFF;
  --color-text-primary: #1F2937;
  --color-text-secondary: #6B7280;
  --color-dark-text: #F1F5F9;
  --color-dark-text-secondary: #94A3B8;
  --color-border-subtle: #E5E7EB;
  --color-surface-elevated: #FFFFFF;
  --color-accent-soft: #EBF4FF;

  --font-sans-en: "Inter", system-ui, sans-serif;
  --font-sans-he: "Heebo", system-ui, sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  body {
    font-family: var(--font-sans-en);
    color: var(--color-text-primary);
  }

  [dir="rtl"] body {
    font-family: var(--font-sans-he);
  }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.animate-slide-start {
  opacity: 0;
  transform: translateX(-24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

[dir="rtl"] .animate-slide-start {
  transform: translateX(24px);
}

.animate-slide-start.is-visible {
  opacity: 1;
  transform: translateX(0);
}
```

**`.prettierrc`**

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": { "parser": "astro" }
    }
  ]
}
```

**`.gitignore`**

```
node_modules/
dist/
.astro/
.DS_Store
*.log
.env
.env.*
```

---

## 2. Directory Structure & File-by-File Breakdown

```
NLX-Labs-website/
├── public/
│   ├── favicon.svg              # SVG favicon, "NLX" mark in accent color
│   ├── og-image.png             # 1200x630 OG image for social sharing
│   ├── robots.txt               # Allow all crawlers, point to sitemap
│   └── CNAME                    # Custom domain (if applicable)
├── src/
│   ├── assets/
│   │   ├── logo.svg             # Horizontal logo: "NLX" bold + "labs" light
│   │   └── logo-icon.svg        # Square icon-only mark
│   ├── components/
│   │   ├── SEOHead.astro        # <head> meta: title, description, OG, hreflang, canonical
│   │   ├── JsonLd.astro         # Organization schema JSON-LD
│   │   ├── Button.astro         # Reusable button (primary/secondary/ghost variants)
│   │   ├── SectionHeading.astro # Standardized <h2> + optional subtitle
│   │   ├── ScrollAnimator.astro # IntersectionObserver script for scroll animations
│   │   ├── Nav.astro            # Fixed sticky nav with scroll spy + hamburger
│   │   ├── MobileMenu.astro     # Slide-out mobile drawer with focus trap
│   │   ├── LanguageToggle.astro # EN/HE toggle button, updates ?lang= param
│   │   ├── Hero.astro           # Full-viewport hero: headline, sub, 2 CTAs, gradient bg
│   │   ├── Services.astro       # Section wrapper: heading + 3 ServiceCards + positioning
│   │   ├── ServiceCard.astro    # Icon + title + description card
│   │   ├── Process.astro        # Section wrapper: heading + 4 ProcessSteps with timeline
│   │   ├── ProcessStep.astro    # Step badge + title + description + connector line
│   │   ├── Industries.astro     # Section wrapper: heading + 7 IndustryCards + closing
│   │   ├── IndustryCard.astro   # Icon + industry name + example bullet list
│   │   ├── About.astro          # Section: narrative + 6 PrincipleCards
│   │   ├── PrincipleCard.astro  # Icon + principle title + description
│   │   ├── Contact.astro        # Section: intro text + email link + ContactForm
│   │   ├── ContactForm.astro    # Formspree AJAX form with validation + honeypot
│   │   ├── Footer.astro         # Dark footer: logo, copyright, privacy link
│   │   └── ScrollToTop.astro    # Fixed button, appears on scroll, scrolls to top
│   ├── i18n/
│   │   ├── types.ts             # TypeScript interface for all translation keys
│   │   ├── i18n.ts              # Core: getLocaleFromUrl, getTranslations, getDirection
│   │   ├── en.json              # Full English translations
│   │   └── he.json              # Full Hebrew translations
│   ├── layouts/
│   │   └── Layout.astro         # Root <html>: sets lang/dir, loads fonts, global.css, SEO
│   ├── pages/
│   │   ├── index.astro          # Single page: assembles all sections, reads locale
│   │   ├── privacy.astro        # Privacy policy page (bilingual, linked from footer)
│   │   └── 404.astro            # Custom 404 page for GitHub Pages (bilingual)
│   └── styles/
│       └── global.css           # Tailwind entry + theme + base + animations
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions: build + deploy to Pages
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── .prettierrc
├── .gitignore
└── README.md
```

### File Descriptions (Dependency Order)

#### Group 1: Configuration (no dependencies)
- **`package.json`** — Auto-generated by `npm create astro`. Scripts: `dev`, `build`, `preview`, `astro check`.
- **`astro.config.mjs`** — Astro config with site URL, base path, Tailwind v4 Vite plugin.
- **`tsconfig.json`** — TypeScript config with path aliases.
- **`.prettierrc`** — Prettier config with astro plugin.
- **`.gitignore`** — Standard ignores.

#### Group 2: Static Files (`public/`)
- **`public/favicon.svg`** — SVG favicon. Simple geometric "NLX" mark in accent color (#2D7DD2).
- **`public/og-image.png`** — 1200x630 Open Graph image. Dark background with NLX-labs logo and tagline.
- **`public/robots.txt`** — Allows all crawlers, points to auto-generated sitemap.xml.
- **`public/CNAME`** — Custom domain string (only if custom domain is used).

#### Group 3: Brand Assets (`src/assets/`)
- **`src/assets/logo.svg`** — Horizontal SVG logo: "NLX" bold + "labs" lighter weight. Uses `currentColor` for light/dark adaptability.
- **`src/assets/logo-icon.svg`** — Square icon mark for mobile nav and favicon fallback.

#### Group 4: i18n System (`src/i18n/`)
- **`src/i18n/types.ts`** — TypeScript interface defining complete translation key structure. Single source of truth.
- **`src/i18n/i18n.ts`** — Core i18n module with locale detection, translation retrieval, direction helpers.
- **`src/i18n/en.json`** — Full English translations organized by section.
- **`src/i18n/he.json`** — Full Hebrew translations, mirrors en.json key structure exactly.

#### Group 5: Styles (`src/styles/`)
- **`src/styles/global.css`** — Tailwind v4 entry, custom theme tokens, base styles, scroll animations, `prefers-reduced-motion`.

#### Group 6: Layout (`src/layouts/`)
- **`src/layouts/Layout.astro`** — Root HTML layout. Sets `<html lang dir>`, loads Google Fonts (Inter, Heebo) via preconnect, imports global.css, renders SEOHead + JsonLd, skip-to-content link, wraps `<slot>`.

#### Group 7: Utility Components
- **`SEOHead.astro`** — Renders `<title>`, `<meta>`, OG tags, Twitter cards, hreflang tags, canonical URL. All localized.
- **`JsonLd.astro`** — Organization schema JSON-LD script tag.
- **`Button.astro`** — Reusable button/link. Variants: primary (solid accent), secondary (bordered), ghost (text). Min 44x44px touch target.
- **`SectionHeading.astro`** — Standardized `<h2>` + optional `<p>` subtitle.
- **`ScrollAnimator.astro`** — `<script>` that initializes IntersectionObserver for scroll animations. Respects `prefers-reduced-motion`.

#### Group 8: Navigation Components
- **`Nav.astro`** — Fixed sticky nav. Logo inline-start, desktop links, LanguageToggle, hamburger (mobile). Script: scroll spy (IntersectionObserver), background opacity on scroll.
- **`MobileMenu.astro`** — Slide-out drawer. Nav links + LanguageToggle. Focus trap, Escape key handler, overlay backdrop.
- **`LanguageToggle.astro`** — Button switching EN↔HE. Updates `?lang=` param via `window.location.replace()`.

#### Group 9: Section Components
- **`Hero.astro`** — Full viewport. Headline, sub-headline, 2 CTAs. CSS gradient background with optional geometric SVG pattern.
- **`Services.astro`** — Section wrapper: SectionHeading + 3 ServiceCards (responsive grid) + positioning statement.
- **`ServiceCard.astro`** — Lucide icon + title + description. Hover: subtle lift + shadow.
- **`Process.astro`** — Section wrapper: SectionHeading + 4 ProcessSteps with connecting timeline line.
- **`ProcessStep.astro`** — Step number badge + title + description + connector line (hidden on last step).
- **`Industries.astro`** — Section wrapper: SectionHeading + 7 IndustryCards (responsive grid) + closing statement.
- **`IndustryCard.astro`** — Lucide icon + industry name + bulleted examples list.
- **`About.astro`** — Section wrapper: SectionHeading + narrative paragraph + principles sub-heading + 6 PrincipleCards grid.
- **`PrincipleCard.astro`** — Lucide icon + principle title + one-sentence description.
- **`Contact.astro`** — Two-column: intro text + email link (left) | ContactForm (right). Single column on mobile.
- **`ContactForm.astro`** — HTML form with Formspree endpoint. Fields: name, email, company, phone (optional), message. Honeypot field. AJAX submission via fetch. Loading/success/error states.
- **`Footer.astro`** — Dark background. Logo, copyright (dynamic year), privacy policy link (links to `/privacy`).
- **`ScrollToTop.astro`** — Fixed-position button in bottom-right (bottom-left in RTL). Hidden by default, appears after scrolling past the hero section. Smooth-scrolls to top on click. Contains `<script>` for scroll-based visibility toggle. Uses `ArrowUp` Lucide icon. Respects `prefers-reduced-motion`.

#### Group 10: Pages
- **`src/pages/index.astro`** — Single page. Reads locale from URL, passes translations to all section components in order: Nav, Hero, Services, Process, Industries, About, Contact, Footer, ScrollToTop, ScrollAnimator.
- **`src/pages/privacy.astro`** — Privacy policy page. Uses `Layout.astro` with same i18n system. Contains bilingual privacy policy text (basic placeholder for v1). Includes Nav and Footer for consistent navigation. Linked from footer on main page.
- **`src/pages/404.astro`** — Custom 404 error page. Astro generates `404.html` which GitHub Pages serves for unmatched routes. Bilingual heading + message + "Back to Home" button. Uses Layout.astro for consistent styling.

#### Group 11: Deployment
- **`.github/workflows/deploy.yml`** — GitHub Actions workflow for GitHub Pages deployment.

---

## 3. i18n Architecture

### Approach

**Build-time locale rendering + client-side URL-based switching.**

- Hebrew is the **default language** (no query param needed).
- English is activated via `?lang=en`.
- Switching triggers `window.location.replace()` — effectively instant since assets are cached after first load.
- No page reload flicker for subsequent switches.

### Type System (`src/i18n/types.ts`)

```typescript
export type Locale = "he" | "en";

export interface Translations {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    services: string;
    process: string;
    industries: string;
    about: string;
    contact: string;
    languageToggle: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
    positioningStatement: string;
  };
  process: {
    title: string;
    subtitle: string;
    steps: Array<{ title: string; description: string }>;
  };
  industries: {
    title: string;
    subtitle: string;
    items: Array<{ name: string; examples: string[] }>;
    closingStatement: string;
  };
  about: {
    title: string;
    subtitle: string;
    narrative: string;
    principlesTitle: string;
    principles: Array<{ title: string; description: string }>;
  };
  contact: {
    title: string;
    subtitle: string;
    intro: string;
    emailLabel: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
    };
    validation: {
      nameRequired: string;
      nameMin: string;
      emailRequired: string;
      emailInvalid: string;
      companyRequired: string;
      companyMin: string;
      phoneInvalid: string;
      messageRequired: string;
      messageMin: string;
    };
  };
  footer: {
    copyright: string;
    privacyPolicy: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
    content: string;       // HTML string with privacy policy sections
  };
  notFound: {
    title: string;
    message: string;
    backHome: string;
  };
  common: {
    scrollToTop: string;
    skipToContent: string;
  };
}
```

### Core Module (`src/i18n/i18n.ts`)

```typescript
import type { Locale, Translations } from "./types";
import en from "./en.json";
import he from "./he.json";

export const DEFAULT_LOCALE: Locale = "he";
export const LOCALES: Locale[] = ["he", "en"];

const translations: Record<Locale, Translations> = { en, he };

export function getLocaleFromUrl(url: URL): Locale {
  const param = url.searchParams.get("lang");
  if (param && LOCALES.includes(param as Locale)) {
    return param as Locale;
  }
  return DEFAULT_LOCALE;
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "he" ? "rtl" : "ltr";
}

export function getAlternateUrl(currentUrl: URL, locale: Locale): string {
  const url = new URL(currentUrl.toString());
  if (locale === DEFAULT_LOCALE) {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", locale);
  }
  return url.toString();
}

export function getFontFamily(locale: Locale): string {
  return locale === "he"
    ? "'Heebo', system-ui, sans-serif"
    : "'Inter', system-ui, sans-serif";
}
```

### How Components Consume Translations

In `index.astro` frontmatter:
```astro
---
import { getLocaleFromUrl, getTranslations, getDirection } from "@i18n/i18n";

const locale = getLocaleFromUrl(Astro.url);
const t = getTranslations(locale);
const dir = getDirection(locale);
---

<Layout lang={locale} dir={dir} meta={t.meta}>
  <Nav t={t.nav} locale={locale} />
  <Hero t={t.hero} />
  <Services t={t.services} />
  <Process t={t.process} />
  <Industries t={t.industries} />
  <About t={t.about} />
  <Contact t={t.contact} />
  <Footer t={t.footer} locale={locale} />
  <ScrollAnimator />
</Layout>
```

Each section component accesses its translation slice via props:
```astro
---
// Hero.astro
interface Props {
  t: Translations["hero"];
}
const { t } = Astro.props;
---
<section id="hero">
  <h1>{t.headline}</h1>
  <p>{t.subheadline}</p>
  <a href="#contact">{t.ctaPrimary}</a>
  <a href="#services">{t.ctaSecondary}</a>
</section>
```

### RTL Switching

`<html lang={locale} dir={dir}>` is set at build time based on the locale.

**Tailwind v4 logical properties used throughout:**

| Instead of | Use | Behavior |
|------------|-----|----------|
| `pl-4` / `pr-4` | `ps-4` / `pe-4` | padding-inline-start / padding-inline-end |
| `ml-4` / `mr-4` | `ms-4` / `me-4` | margin-inline-start / margin-inline-end |
| `left-0` / `right-0` | `start-0` / `end-0` | inset-inline-start / inset-inline-end |
| `text-left` / `text-right` | `text-start` / `text-end` | text-align: start / text-align: end |

For directional transforms where logical properties are insufficient:
```html
<div class="translate-x-4 rtl:-translate-x-4">...</div>
```

### Language Toggle Mechanism

`LanguageToggle.astro` renders a button with `data-target-locale` attribute. Client-side script on click:
1. If target is "he": remove `?lang=` param from URL
2. If target is "en": set `?lang=en`
3. Call `window.location.replace(newUrl)` — no history entry, near-instant reload from cache

### Default Language Behavior

- Visit with no `?lang=` → Hebrew (RTL, `dir="rtl"`, `lang="he"`)
- Toggle shows "EN" (indicating user can switch to English)
- Click → URL becomes `?lang=en` → English (LTR, `dir="ltr"`, `lang="en"`)
- Toggle shows "HE" (indicating user can switch back)
- `x-default` hreflang points to Hebrew version (no `?lang=` param)

---

## 4. Component List

### Layout & Utility Components

| Component | Props | Responsibility |
|-----------|-------|---------------|
| `Layout.astro` | `lang: Locale`, `dir: "rtl"\|"ltr"`, `meta: Translations["meta"]`, `currentUrl: URL` | Root HTML document, Google Fonts, global.css, skip-to-content |
| `SEOHead.astro` | `meta: Translations["meta"]`, `locale: Locale`, `currentUrl: URL` | All `<head>` meta: title, description, OG, Twitter, hreflang, canonical |
| `JsonLd.astro` | `locale: Locale` | Organization schema JSON-LD |
| `Button.astro` | `variant: "primary"\|"secondary"\|"ghost"`, `href?: string`, `type?: "button"\|"submit"`, `class?: string`, `ariaLabel?: string` | Consistent button styling, renders `<a>` or `<button>`, 44x44px min touch |
| `SectionHeading.astro` | `title: string`, `subtitle?: string`, `align?: "center"\|"start"` | Standardized `<h2>` + subtitle with consistent spacing |
| `ScrollAnimator.astro` | (none) | IntersectionObserver for `.animate-on-scroll` elements, respects `prefers-reduced-motion` |

### Navigation Components

| Component | Props | Responsibility |
|-----------|-------|---------------|
| `Nav.astro` | `t: Translations["nav"]`, `locale: Locale` | Fixed sticky nav, desktop links, scroll spy, hamburger toggle |
| `MobileMenu.astro` | `t: Translations["nav"]`, `locale: Locale` | Slide-out drawer, nav links, focus trap, Escape/overlay close |
| `LanguageToggle.astro` | `locale: Locale`, `label: string` | EN/HE switch button, URL param update |

### Section Components

| Component | Props | Responsibility |
|-----------|-------|---------------|
| `Hero.astro` | `t: Translations["hero"]` | Full viewport, headline, sub-headline, 2 CTA buttons, gradient bg |
| `Services.astro` | `t: Translations["services"]` | Heading + 3 ServiceCards + positioning statement |
| `ServiceCard.astro` | `icon: string`, `title: string`, `description: string` | Individual card with hover lift effect |
| `Process.astro` | `t: Translations["process"]` | Heading + 4 ProcessSteps with timeline connector |
| `ProcessStep.astro` | `number: number`, `title: string`, `description: string`, `isLast: boolean` | Step badge, title, description, connector line |
| `Industries.astro` | `t: Translations["industries"]` | Heading + 7 IndustryCards + closing statement |
| `IndustryCard.astro` | `icon: string`, `name: string`, `examples: string[]` | Industry icon, name, bulleted examples |
| `About.astro` | `t: Translations["about"]` | Narrative paragraph + 6 PrincipleCards |
| `PrincipleCard.astro` | `icon: string`, `title: string`, `description: string` | Principle icon, title, description |
| `Contact.astro` | `t: Translations["contact"]` | Two-column: intro + email | ContactForm |
| `ContactForm.astro` | `t: Translations["contact"]["form"]`, `validation: Translations["contact"]["validation"]`, `locale: Locale` | Formspree AJAX form, validation, honeypot, states |
| `Footer.astro` | `t: Translations["footer"]`, `locale: Locale` | Dark footer, logo, copyright with dynamic year, privacy policy link |
| `ScrollToTop.astro` | `label: string` | Fixed button bottom-end, appears on scroll, smooth-scrolls to top |

### Page Components

| Component | Props | Responsibility |
|-----------|-------|---------------|
| `index.astro` | (reads locale from URL) | Main SPA page, assembles all sections, passes translations |
| `privacy.astro` | (reads locale from URL) | Privacy policy page with Nav + Footer, bilingual content |
| `404.astro` | (reads locale from URL) | Custom 404 page, heading + message + "Back to Home" button |

### Lucide Icon Mapping

| Usage | Icon |
|-------|------|
| AI Engineering | `Brain` |
| Process Analysis | `Search` |
| Tailored Implementation | `Wrench` |
| Logistics & Customs | `Truck` |
| Education | `GraduationCap` |
| Financial Services | `BarChart3` |
| Legal | `Scale` |
| Healthcare | `HeartPulse` |
| Government | `Landmark` |
| Retail | `ShoppingCart` |
| Client Knowledge Leads | `Users` |
| Honest Assessment | `Shield` |
| Measurable Outcomes | `Target` |
| Build for Independence | `Rocket` |
| Responsible AI | `Lock` |
| Grow Through Excellence | `Award` |
| Hamburger Menu | `Menu` |
| Close Menu | `X` |
| Scroll to Top | `ArrowUp` |

---

## 5. Content Plan

### 5.1 Content Derivation Summary

| Category | Source |
|----------|--------|
| Hero headline/subheadline | Company Definition section 2 (core tagline) — minor adaptation |
| Service descriptions (3) | Company Definition section 3 table — direct extraction |
| Process phases (4) | Company Definition section 5.1 — condensed for web |
| Industry names + examples (7) | Company Definition section 4.2 table — direct extraction |
| Guiding principles (6) | Company Definition section 9 — condensed for web |
| About narrative | Company Definition sections 1, 2, 6 — combined and adapted |
| Nav labels, CTAs | PRD section 3.1 + fresh |
| Form labels, validation, meta/SEO, footer | All fresh copy |

### 5.2 Navigation Labels

| Key | English | Hebrew | Source |
|-----|---------|--------|--------|
| `nav.services` | "Services" | "שירותים" | Fresh |
| `nav.process` | "How We Work" | "איך אנחנו עובדים" | PRD 3.1 |
| `nav.industries` | "Industries" | "תעשיות" | PRD 3.1 |
| `nav.about` | "About" | "אודות" | PRD 3.1 |
| `nav.contact` | "Contact" | "צור קשר" | PRD 3.1 |
| `nav.languageToggle` | "HE" (when in EN) | "EN" (when in HE) | Fresh |
| `nav.menuOpen` | "Open menu" | "פתח תפריט" | Fresh (a11y) |
| `nav.menuClose` | "Close menu" | "סגור תפריט" | Fresh (a11y) |

### 5.3 Meta / SEO

| Key | English | Hebrew |
|-----|---------|--------|
| `meta.title` | "NLX-labs \| AI Solutions for Business" | "NLX-labs \| פתרונות בינה מלאכותית לעסקים" |
| `meta.description` | "Custom AI solutions that transform business operations. NLX-labs partners with SMBs to design, develop, and deploy tailored AI systems." | "פתרונות בינה מלאכותית מותאמים אישית שמשנים את הפעילות העסקית. NLX-labs שותפה לעסקים קטנים ובינוניים בתכנון, פיתוח ויישום מערכות AI." |

### 5.4 Hero Section

| Key | English | Hebrew | Source |
|-----|---------|--------|--------|
| `hero.headline` | "Tell us what's inefficient in your business. We'll build the AI to fix it." | "ספרו לנו מה לא עובד בעסק שלכם. אנחנו נבנה את ה-AI שיתקן את זה." | Adapted from Company Def. section 2 tagline |
| `hero.subheadline` | "NLX-labs partners with businesses to design, develop, and deploy custom AI solutions that deliver measurable results from day one." | "NLX-labs שותפה לעסקים בתכנון, פיתוח ויישום פתרונות AI מותאמים אישית שמספקים תוצאות מדידות מהיום הראשון." | Derived from Company Def. sections 2-3 |
| `hero.ctaPrimary` | "Get Started" | "בואו נתחיל" | Fresh (PRD 3.2.1) |
| `hero.ctaSecondary` | "Learn More" | "למידע נוסף" | PRD 3.2.1 |

### 5.5 Services Section

| Key | English | Hebrew | Source |
|-----|---------|--------|--------|
| `services.title` | "What We Do" | "מה אנחנו עושים" | Fresh |
| `services.subtitle` | "Three core capabilities that transform your business operations" | "שלוש יכולות ליבה שמשנות את הפעילות העסקית שלכם" | Fresh |
| `services.items[0].title` | "AI Engineering" | "הנדסת בינה מלאכותית" | Company Def. section 3 |
| `services.items[0].description` | "Deep technical capability in building AI-driven software systems, from intelligent automation to natural language processing and predictive analytics." | "יכולת טכנית מעמיקה בבניית מערכות תוכנה מבוססות AI, מאוטומציה חכמה ועד עיבוד שפה טבעית ואנליטיקה חזויה." | Company Def. section 3 table |
| `services.items[1].title` | "Business Process Analysis" | "ניתוח תהליכים עסקיים" | Company Def. section 3 |
| `services.items[1].description` | "We listen, understand, and map your operational workflows, identifying exactly where AI creates genuine, measurable value for your business." | "אנחנו מקשיבים, מבינים ומתארים את התהליכים התפעוליים שלכם, ומזהים בדיוק איפה AI יוצר ערך אמיתי ומדיד לעסק שלכם." | Company Def. section 3 table |
| `services.items[2].title` | "Tailored Implementation" | "יישום מותאם אישית" | Company Def. section 3 |
| `services.items[2].description` | "End-to-end delivery of custom solutions that integrate into your existing business infrastructure and produce results from day one." | "אספקה מקצה לקצה של פתרונות מותאמים אישית שמשתלבים בתשתית העסקית הקיימת שלכם ומניבים תוצאות מהיום הראשון." | Company Def. section 3 table |
| `services.positioningStatement` | "We don't sell off-the-shelf products. Every solution is custom-built to your specific workflow and business needs." | "אנחנו לא מוכרים מוצרים מדף. כל פתרון נבנה בהתאמה מלאה לתהליכי העבודה ולצרכים העסקיים הספציפיים שלכם." | Derived from Company Def. section 6 |

### 5.6 Process / How We Work Section

| Key | English | Hebrew | Source |
|-----|---------|--------|--------|
| `process.title` | "How We Work" | "איך אנחנו עובדים" | PRD 3.1 |
| `process.subtitle` | "A structured, collaborative approach from discovery to deployment" | "גישה מובנית ושיתופית מגילוי ועד יישום" | Fresh |
| `process.steps[0].title` | "Discovery & Scoping" | "גילוי והגדרת היקף" | Company Def. 5.1 |
| `process.steps[0].description` | "We work closely with you to understand your operations, identify high-impact opportunities for AI, and define a clear scope with expected outcomes." | "אנחנו עובדים בשיתוף פעולה הדוק איתכם כדי להבין את הפעילות שלכם, לזהות הזדמנויות בעלות השפעה גבוהה ל-AI, ולהגדיר היקף ברור עם תוצאות צפויות." | Adapted from Company Def. 5.1 Phase 1 |
| `process.steps[1].title` | "Design & Development" | "תכנון ופיתוח" | Company Def. 5.1 |
| `process.steps[1].description` | "Full design, development, and testing of your AI solution with iterative feedback loops to ensure it meets your exact needs." | "תכנון, פיתוח ובדיקות מלאות של פתרון ה-AI שלכם עם מחזורי משוב איטרטיביים כדי לוודא שהוא עונה בדיוק על הצרכים שלכם." | Adapted from Company Def. 5.1 Phase 2 |
| `process.steps[2].title` | "Deployment & Integration" | "יישום ואינטגרציה" | Company Def. 5.1 |
| `process.steps[2].description` | "Seamless deployment into your operational environment with system integration, staff training, and documentation for smooth adoption." | "יישום חלק בסביבה התפעולית שלכם עם אינטגרציה למערכות, הדרכת צוות ותיעוד לאימוץ מוצלח." | Adapted from Company Def. 5.1 Phase 3 |
| `process.steps[3].title` | "Ongoing Support" | "תמיכה שוטפת" | Company Def. 5.1 |
| `process.steps[3].description` | "Continuous monitoring, optimization, and expansion. We're a long-term partner invested in your ongoing success." | "ניטור מתמשך, אופטימיזציה והרחבה. אנחנו שותפים לטווח ארוך שמחויבים להצלחה המתמשכת שלכם." | Adapted from Company Def. 5.1 Phase 4 |

### 5.7 Industries Section

| Key | English | Hebrew | Source |
|-----|---------|--------|--------|
| `industries.title` | "Industries We Serve" | "תעשיות שאנחנו משרתים" | Fresh |
| `industries.subtitle` | "We're industry-agnostic. If your business has a process that could be smarter, we want to hear about it." | "אנחנו לא מוגבלים לתעשייה מסוימת. אם יש לעסק שלכם תהליך שיכול להיות חכם יותר, נשמח לשמוע על כך." | Adapted from PRD 3.2.4 + Company Def. section 3 |

**7 Industry Cards** (all from Company Definition section 4.2 table):

| Industry (EN) | Industry (HE) | Example Applications (EN) |
|----------------|----------------|--------------------------|
| Logistics & Customs | לוגיסטיקה ומכס | Document classification, Compliance checking, Shipment routing, Regulatory form processing |
| Education | חינוך | Adaptive assessments, Admin workflow automation, Student progress analytics, Curriculum planning |
| Financial Services | שירותים פיננסיים | Anomaly detection, Automated reporting, Client communication analysis, Risk assessment |
| Legal | משפטים | Contract analysis, Document review automation, Case research, Billing optimization |
| Healthcare | בריאות | Scheduling optimization, Patient communication, Records management, Insurance processing |
| Government | ממשל ורשויות | Citizen service automation, Permit processing, Resource allocation |
| Retail | קמעונאות | Inventory prediction, Customer service automation, Demand forecasting, Supplier management |

| Key | English | Hebrew |
|-----|---------|--------|
| `industries.closingStatement` | "Don't see your industry? We work with any business that has processes to optimize." | "לא מוצאים את התעשייה שלכם? אנחנו עובדים עם כל עסק שיש לו תהליכים לייעול." |

### 5.8 About Section

| Key | English | Hebrew | Source |
|-----|---------|--------|--------|
| `about.title` | "About NLX-labs" | "אודות NLX-labs" | Fresh |
| `about.subtitle` | "Making AI accessible for every business" | "הופכים בינה מלאכותית לנגישה לכל עסק" | Derived from Company Def. section 2 |
| `about.narrative` | "Founded in 2026 in Israel, NLX-labs exists to make artificial intelligence accessible and actionable for businesses that don't have in-house AI capabilities. We believe the transformative power of AI should not be exclusive to tech companies or large enterprises. We listen first, engineer second, and build long-term partnerships that grow with your business." | "NLX-labs נוסדה ב-2026 בישראל כדי להפוך בינה מלאכותית לנגישה ויישומית עבור עסקים שאין להם יכולות AI פנימיות. אנחנו מאמינים שהכוח המהפכני של AI לא צריך להיות בלעדי לחברות טכנולוגיה או ארגונים גדולים. אנחנו מקשיבים קודם, מפתחים אחר כך, ובונים שותפויות ארוכות טווח שגדלות יחד עם העסק שלכם." | Adapted from Company Def. sections 1-2, 6 |
| `about.principlesTitle` | "Our Guiding Principles" | "העקרונות המנחים שלנו" | Fresh |

**6 Guiding Principles** (all from Company Definition section 9):

| # | EN Title | EN Description | HE Title |
|---|----------|---------------|----------|
| 1 | Client Knowledge Leads | You know your business better than anyone. We translate that knowledge into intelligent systems. | הידע של הלקוח מוביל |
| 2 | Honest Assessment | If AI isn't the right solution, we'll tell you. Trust is built through candor. | הערכה כנה |
| 3 | Measurable Outcomes | Every project has clear, quantifiable success criteria defined before development begins. | תוצאות מדידות |
| 4 | Build for Independence | We build systems you can own and operate. Our goal is to empower, not create dependency. | בנייה לעצמאות |
| 5 | Responsible AI | Transparency, fairness, and data privacy at the core. Every system we build is explainable and ethical. | AI אחראי |
| 6 | Grow Through Excellence | The best marketing is a client whose business was measurably improved. | צמיחה דרך מצוינות |

### 5.9 Contact Section

| Key | English | Hebrew |
|-----|---------|--------|
| `contact.title` | "Let's Talk" | "בואו נדבר" |
| `contact.subtitle` | "Ready to explore what AI can do for your business?" | "מוכנים לגלות מה AI יכול לעשות עבור העסק שלכם?" |
| `contact.intro` | "Tell us about your business challenge. We'll get back to you within one business day to discuss how we can help." | "ספרו לנו על האתגר העסקי שלכם. נחזור אליכם תוך יום עסקים אחד כדי לדון כיצד נוכל לסייע." |
| `contact.emailLabel` | "Or email us directly:" | "או שלחו לנו אימייל ישירות:" |

**Form Labels:**

| Key | English | Hebrew |
|-----|---------|--------|
| `form.name` | "Full Name" | "שם מלא" |
| `form.namePlaceholder` | "John Doe" | "ישראל ישראלי" |
| `form.email` | "Email" | "אימייל" |
| `form.emailPlaceholder` | "john@company.com" | "info@company.co.il" |
| `form.company` | "Company" | "חברה" |
| `form.companyPlaceholder` | "Company Name" | "שם החברה" |
| `form.phone` | "Phone (optional)" | "טלפון (אופציונלי)" |
| `form.phonePlaceholder` | "+972-XX-XXX-XXXX" | "050-XXX-XXXX" |
| `form.message` | "Tell us about your project" | "ספרו לנו על הפרויקט שלכם" |
| `form.messagePlaceholder` | "Describe the business challenge you'd like to solve..." | "תארו את האתגר העסקי שתרצו לפתור..." |
| `form.submit` | "Send Message" | "שליחת הודעה" |
| `form.submitting` | "Sending..." | "שולח..." |
| `form.successTitle` | "Message Sent!" | "ההודעה נשלחה!" |
| `form.successMessage` | "Thank you for reaching out. We'll get back to you within one business day." | "תודה שפניתם אלינו. נחזור אליכם תוך יום עסקים אחד." |
| `form.errorTitle` | "Something went wrong" | "משהו השתבש" |
| `form.errorMessage` | "Please try again or email us directly." | "אנא נסו שוב או שלחו לנו אימייל ישירות." |

**Validation Messages:**

| Key | English | Hebrew |
|-----|---------|--------|
| `validation.nameRequired` | "Name is required" | "שם הוא שדה חובה" |
| `validation.nameMin` | "Name must be at least 2 characters" | "השם חייב להכיל לפחות 2 תווים" |
| `validation.emailRequired` | "Email is required" | "אימייל הוא שדה חובה" |
| `validation.emailInvalid` | "Please enter a valid email" | "אנא הזינו כתובת אימייל תקינה" |
| `validation.companyRequired` | "Company name is required" | "שם החברה הוא שדה חובה" |
| `validation.companyMin` | "Company name must be at least 2 characters" | "שם החברה חייב להכיל לפחות 2 תווים" |
| `validation.phoneInvalid` | "Please enter a valid phone number" | "אנא הזינו מספר טלפון תקין" |
| `validation.messageRequired` | "Message is required" | "הודעה היא שדה חובה" |
| `validation.messageMin` | "Message must be at least 10 characters" | "ההודעה חייבת להכיל לפחות 10 תווים" |

### 5.10 Footer

| Key | English | Hebrew |
|-----|---------|--------|
| `footer.copyright` | "© {year} NLX-labs. All rights reserved." | "© {year} NLX-labs. כל הזכויות שמורות." |
| `footer.privacyPolicy` | "Privacy Policy" | "מדיניות פרטיות" |

### 5.11 Common

| Key | English | Hebrew |
|-----|---------|--------|
| `common.scrollToTop` | "Scroll to top" | "חזרה למעלה" |
| `common.skipToContent` | "Skip to main content" | "דילוג לתוכן הראשי" |

### 5.12 Privacy Policy Page

| Key | English | Hebrew | Source |
|-----|---------|--------|--------|
| `privacy.title` | "Privacy Policy" | "מדיניות פרטיות" | Fresh |
| `privacy.lastUpdated` | "Last updated: {date}" | "עדכון אחרון: {date}" | Fresh |
| `privacy.content` | HTML string with sections: Information We Collect, How We Use It, Contact Form Data, Cookies, Third-Party Services, Your Rights, Contact Us | Hebrew equivalent | Fresh — basic v1 placeholder covering Formspree data collection, no cookies (no analytics in v1), contact info for data requests |

**Note:** The privacy policy is a basic v1 placeholder. It should be reviewed by legal counsel before launch. Key points to cover:
- Contact form data is processed via Formspree (third-party). Link to Formspree's own privacy policy.
- No cookies or analytics tracking in v1.
- No user accounts or persistent data storage.
- Contact email for privacy inquiries.

### 5.13 404 Page

| Key | English | Hebrew | Source |
|-----|---------|--------|--------|
| `notFound.title` | "Page Not Found" | "הדף לא נמצא" | Fresh |
| `notFound.message` | "The page you're looking for doesn't exist or has been moved." | "הדף שאתם מחפשים לא קיים או שהועבר." | Fresh |
| `notFound.backHome` | "Back to Home" | "חזרה לדף הבית" | Fresh |

---

## 6. Build & Deployment

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: Install, build, and upload site
        uses: withastro/action@v5
        with:
          node-version: 22

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Build Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview production build locally |
| `npx astro check` | TypeScript and Astro diagnostics |

### Pre-Deployment Checklist

1. **Create Formspree form** at formspree.io, get form ID, hardcode in `ContactForm.astro`
2. **Update `site` and `base`** in `astro.config.mjs` to match actual GitHub Pages URL
3. **Set GitHub Pages source** to "GitHub Actions" in repo settings (Settings → Pages → Source → GitHub Actions)
4. If custom domain: create `public/CNAME`, remove `base` from astro config, update `site`

---

## 7. Implementation Order (12 Steps)

Each step produces a testable increment.

| Step | Files Created | Rationale | How to Test |
|------|--------------|-----------|-------------|
| **1. Scaffolding** | `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.prettierrc`, `global.css` | Foundation must exist first | `npm run dev` starts without errors |
| **2. i18n System** | `types.ts`, `i18n.ts`, `en.json`, `he.json` | Every component depends on translations | Import in test page, verify both locale objects |
| **3. Layout + SEO** | `Layout.astro`, `SEOHead.astro`, `JsonLd.astro`, `favicon.svg`, `robots.txt` | Root wrapper for all content | Correct `<html lang dir>`, fonts load, meta tags in source |
| **4. UI Primitives** | `Button.astro`, `SectionHeading.astro`, `ScrollAnimator.astro`, `ScrollToTop.astro` | Shared by all sections/pages | Render on test page, verify variants, animations, scroll-to-top visibility |
| **5. Navigation** | `Nav.astro`, `MobileMenu.astro`, `LanguageToggle.astro` | Always visible, affects entire page | Sticky nav, scroll spy, mobile drawer, language switch |
| **6. Hero** | `Hero.astro`, `logo.svg`, `logo-icon.svg` | First section, validates design direction | Full viewport, gradient bg, CTAs scroll correctly, RTL works |
| **7. Services** | `Services.astro`, `ServiceCard.astro` | Second section, establishes card pattern | 3-card responsive grid, hover effects, scroll animations |
| **8. Process** | `Process.astro`, `ProcessStep.astro` | Timeline visual pattern | 4 steps with connectors, responsive layout |
| **9. Industries** | `Industries.astro`, `IndustryCard.astro` | Larger grid (7 items) | 2/3/4 column responsive grid, bullet lists |
| **10. About** | `About.astro`, `PrincipleCard.astro` | Narrative + card combination | Text + 6 principles grid renders in both languages |
| **11. Contact + Footer** | `Contact.astro`, `ContactForm.astro`, `Footer.astro` | Primary conversion, build last for stability | Form validation, AJAX submit, success/error states, footer privacy link |
| **12. Privacy + 404** | `privacy.astro`, `404.astro` | Secondary pages, depend on Layout + Nav + Footer | Privacy page renders bilingual, 404 page shows message + back button, both pages have consistent nav/footer |
| **13. OG Image + Final Assembly** | Finalize `index.astro`, `deploy.yml`, `og-image.png`, `README.md` | Integration + QA + deployment | Full QA checklist below |

### OG Image Creation (Step 13)

The `public/og-image.png` (1200x630) will be created as a hand-crafted SVG converted to PNG. Approach:

1. **Create `src/assets/og-image.svg`** — An SVG file (1200x630 viewBox) with:
   - Dark background (#1A2332)
   - NLX-labs logo centered
   - Tagline text below: "AI Solutions for Business" / "פתרונות בינה מלאכותית לעסקים"
   - Subtle geometric accent elements in brand blue (#2D7DD2)
2. **Convert to PNG** — Use a build script or manual conversion (`npx svgexport src/assets/og-image.svg public/og-image.png 1200:630`) or create it manually in a design tool.
3. **Alternative**: If design tooling is unavailable, generate the PNG programmatically using an HTML-to-image approach via a simple Node script with `@vercel/og` or `satori`, run once during development (not at build time).

---

## 8. Verification Checklist (Step 13)

1. `npx astro check` — zero errors
2. `npm run build` — succeeds without warnings
3. Lighthouse audit on preview build — all scores >= 90 (Performance, Accessibility, Best Practices, SEO)
4. Test Hebrew (default) and English (`?lang=en`) on desktop and mobile viewports
5. Contact form submission works with real Formspree endpoint
6. Full keyboard navigation through all interactive elements
7. RTL layout correct in Hebrew: nav order, text alignment, padding/margin directions all reversed
8. `prefers-reduced-motion` disables all animations
9. HTML valid via W3C validator
10. Open Graph tags render correctly (test with opengraph.xyz or similar)
11. Privacy policy page renders correctly in both languages, linked from footer
12. 404 page renders when visiting a non-existent route (e.g., `/nonexistent`)
13. Scroll-to-top button appears after scrolling past hero, scrolls to top on click
14. OG image exists at correct path and renders in social share previews
