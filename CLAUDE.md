# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev          # Start dev server (localhost:4321)
npm run build        # Production build to ./dist/
npm run preview      # Preview production build
npx astro check      # TypeScript + Astro diagnostics
```

No test framework is configured. Validate changes with `npm run build` (catches TypeScript and Astro errors).

## Architecture

**Static bilingual corporate site** built with Astro 5 + Tailwind CSS v4. Deployed to GitHub Pages via `withastro/action@v5` (Node 22, push to `main` triggers deploy). Site URL: `https://yehonatan-tal.github.io/NLX-Labs-website/`

### i18n: Path-Based Routing

- Hebrew (default, RTL): `/NLX-Labs-website/`
- English (LTR): `/NLX-Labs-website/en/`
- Each locale has its own page files: `src/pages/index.astro` (he) and `src/pages/en/index.astro` (en). Same pattern for `privacy.astro`.
- Translations are typed JSON: `src/i18n/en.json`, `src/i18n/he.json`
- Types defined in `src/i18n/types.ts` — all translation keys are typed via the `Translations` interface
- `src/i18n/i18n.ts` exports: `getLocaleFromUrl()`, `getTranslations()`, `getDirection()`, `getAlternateUrl()`, `getFontFamily()`

### BASE_URL Gotcha

`import.meta.env.BASE_URL` may or may not have a trailing slash. Always normalize:
```ts
const raw = import.meta.env.BASE_URL;
const base = raw.endsWith("/") ? raw : `${raw}/`;
```

### Section Rhythm

The homepage uses predominantly dark sections with gradient transitions between them:
```
Dark Hero (#000) → Dark Services (#07080a) → Dark Process (#07080a) → Light Industries → Dark About (#07080a) → Light Contact → Dark Footer
```

Hero and Services use gradient fades (bottom of Hero, top of Services) to seamlessly blend their different dark backgrounds.

- **Dark sections** use `noise-texture` class, `glow-orb` ambient lighting, `glass-card` for cards, `section-divider` gradient borders, starfield `::after` pseudo-elements, twinkling star elements
- **Light sections** use `elevated-card` for cards with multi-layer shadows

Full visual technique catalog: `docs/design-language-reference.md`

### Design Token Palette (Cool Slate + Living Coral)

All colors defined as CSS custom properties in `src/styles/global.css` under `@theme`. Accent is `#E0685A` (coral). Dark bg is `#151A23`. Dark section bg is `#07080a`. Full palette in `docs/color-palette.md`.

**Hardcoded accent rgba values** appear in component `style` attributes for glow orbs and shadows (e.g., `rgba(224, 104, 90, 0.15)`). When changing the accent color, grep for `rgba(224, 104, 90` across all components.

### RTL Support

Uses Tailwind v4 logical properties: `ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*` instead of `pl-*`, `pr-*`, `ml-*`, `mr-*`, `left-*`, `right-*`. The `dir` attribute is set on `<html>` based on locale. Code-simulation elements (like dashboards or terminals) and the navbar should use `dir="ltr"` to stay left-to-right regardless of page locale.

### Path Aliases (tsconfig.json)

`@/*`, `@components/*`, `@layouts/*`, `@i18n/*`, `@assets/*`, `@styles/*` all map to `src/` subdirectories.

### External Integrations

- **Formspree** (`xwpkkqjd`): Contact form submission in `ContactForm.astro`, includes client-side validation with translated error messages
- **Google Fonts**: Inter (English) + Rubik (Hebrew) + Noto Sans Mono (code/terminal). Loaded in `Layout.astro`.
- **Lucide**: Icons via `@lucide/astro` (not `lucide-astro`)

### Scroll Animations (GSAP)

GSAP + ScrollTrigger powers all scroll-triggered animations via `src/scripts/animations.ts`. Elements use `data-animate` attributes (`fade-up`, `stagger-cards`, `fade-in`). Hero uses `data-hero-*` attributes for a page-load entrance timeline. Respects `prefers-reduced-motion`.

`src/scripts/hero-parallax.ts` adds mouse-driven parallax to the hero section (two layers: ambient glow + background image with 3D tilt). No hover media query guard — mousemove events simply don't fire on touch-only usage.

### Layout & Page Pattern

Pages import `Layout.astro` and pass `lang`, `dir`, `meta`, `currentUrl`. The layout handles SEO, fonts, structured data (`JsonLd`), skip-to-content link, and animation initialization. Each section is a standalone component receiving its `t` (translations) slice as a prop.

### Logo

The site logo SVG lives at `src/assets/logo.svg` (imported in Nav and Footer). The original source files are in `docs/` (`logo.svg`, `logo1.svg`, `logo2.svg`, `logoWhite.svg`). The logo contains coral accent paths and dark/white structural paths.

## Key Gotchas

### Astro CSS Minifier Strips Font Quotes

Astro/Vite's CSS minifier strips single quotes from font names in scoped `<style>` blocks. Multi-word font names like `'Noto Sans Mono'` become `Noto Sans Mono` in the built CSS, which browsers can't resolve. **Always use the `var(--font-mono)` CSS variable** (defined in `global.css`) instead of writing font names directly in component styles.

### GSAP `from()` vs `fromTo()` with Pre-Hidden Elements

CSS sets `opacity: 0` on animated elements to prevent flash before GSAP runs. `gsap.from()` reads the current CSS state as the animation target — since both "from" and "to" end up as `opacity: 0`, nothing visually changes. **Always use `gsap.fromTo()` with explicit start AND end values** when CSS pre-hides elements.

### Astro Module Scripts and DOMContentLoaded

Astro bundles `<script>` tags as `type="module"`, which are deferred. By the time they execute, `DOMContentLoaded` has usually already fired. Always check `document.readyState`:
```js
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fn);
} else {
  fn();
}
```

### Glass Morphism on Wrappers vs Children

Applying `backdrop-filter: blur()` on a full-width wrapper blurs everything behind it, including background images meant to be visible. Apply glass blur only to individual leaf elements (panels, toolbars) that should have the frosted effect, not to their parent containers.

### Noto Sans Mono Missing Hebrew Glyphs

`Noto Sans Mono` does NOT include Hebrew characters. Always pair with a Hebrew-capable fallback: `font-family: var(--font-mono), "Rubik", monospace;`

### `backdrop-filter` Breaks Inside `transform-style: preserve-3d`

A parent with `transform-style: preserve-3d` (used for the hero parallax 3D tilt) prevents `backdrop-filter: blur()` from working on its children. Use mask-based fades or gradient overlays instead.
