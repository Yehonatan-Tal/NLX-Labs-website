# NLX-Labs Animation Implementation Brief

## Context

The NLX-labs corporate website is already built and functional. It is a bilingual (EN/HE) static site built with Astro 5, Tailwind CSS 4, and deployed to GitHub Pages. All six sections (Hero, Services, Process, Industries, About, Contact) plus Navigation and Footer are implemented and working in both languages with full RTL support.

The site currently uses a hand-rolled `ScrollAnimator.astro` component with `IntersectionObserver` and CSS classes (`.animate-on-scroll`, `.is-visible`) for basic scroll reveal animations.

**This document specifies how to upgrade the animation layer.** Replace the CSS-only scroll animation system with GSAP + ScrollTrigger, and add strategic Lottie animations at specific touchpoints. Nothing else about the site changes — layout, colors, typography, spacing, i18n, content, and components all stay exactly as they are.

Two companion documents describe the existing site:

- **NLX-labs_Implementation_Plan.md** — Full technical architecture, file structure, i18n system, component specs, content plan, and deployment config.
- **NLX-labs_Design_Specification.md** — Complete visual design system: color tokens, typography scale, spacing, component-level design specs, animation principles, responsive behavior, and a "do-not-do" list.

---

## 1. Dependencies to Add

### GSAP

```bash
npm install gsap
```

GSAP is 100% free for commercial use (acquired by Webflow, April 2025). All plugins — including ScrollTrigger, SplitText, and others — are included in the base package.

### Lottie (dotlottie-web)

```bash
npm install @lottiefiles/dotlottie-web
```

This is LottieFiles' lightweight web runtime for rendering `.lottie` (dotLottie) files. It's smaller and more performant than the older `lottie-web` player.

---

## 2. What to Remove

### Delete: `ScrollAnimator.astro`

The existing `ScrollAnimator.astro` component uses `IntersectionObserver` and CSS classes for scroll reveals. Delete this component entirely. GSAP's ScrollTrigger replaces it with far more control, better easing, and built-in stagger support.

### Remove: CSS animation classes from `global.css`

Remove these CSS classes from `global.css`:

```css
.animate-on-scroll { ... }
.animate-on-scroll.is-visible { ... }
.animate-slide-start { ... }
.animate-slide-start.is-visible { ... }
```

GSAP handles all entrance animations programmatically. CSS-based animation states are no longer needed.

### Remove: `<ScrollAnimator />` from page assembly

The existing `index.astro` includes `<ScrollAnimator />` as the last component. Remove this reference. GSAP initialization happens via a script in `Layout.astro` instead.

### Remove: `animate-on-scroll` class references from components

Any existing components that apply `.animate-on-scroll` or `.animate-slide-start` CSS classes should have those classes removed and replaced with the appropriate `data-animate` attribute (see Section 3).

### Keep: `prefers-reduced-motion` handling in `global.css`

The reduced-motion media query in `global.css` stays as a CSS fallback. GSAP also checks for reduced motion preference independently (see Section 5).

### Keep: All existing design values

The Design Specification's timing, easing, stagger, and behavior values remain the target. GSAP is the engine that implements them. Reference the Design Spec's Section 7 (Animation & Interaction) for:

- Easing curves: `cubic-bezier(0.4, 0, 0.2, 1)` for UI transitions, `cubic-bezier(0.16, 1, 0.3, 1)` for scroll reveals
- Stagger values: `0.1s` between cards, `0.15s` between process steps
- Duration values: `0.5s`–`0.8s` for reveals, `0.15s`–`0.25s` for hovers
- The "What NOT to Animate" list (no parallax, no typewriter effects, no pulsing icons, nothing over 0.8s)

---

## 3. GSAP Architecture

### Core Setup: `src/scripts/animations.ts`

Create a single TypeScript module that initializes GSAP and registers plugins. This is imported by the Layout component's client-side script.

```typescript
// src/scripts/animations.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initAnimations(): void {
  if (prefersReducedMotion) {
    // Make all elements visible immediately, no animations
    gsap.set("[data-animate]", { opacity: 1, y: 0, x: 0 });
    return;
  }

  initHeroEntrance();
  initSectionHeadings();
  initCardGrids();
  initProcessSteps();
  initFadeParagraphs();
  initNavScroll();
}

// ... individual functions defined below
```

### Loading GSAP in Astro

In `Layout.astro`, add a client-side script (replacing the previous `<ScrollAnimator />` approach):

```astro
<!-- At the bottom of Layout.astro, before closing </body> -->
<script>
  import { initAnimations } from "@/scripts/animations";
  
  // Run after DOM is ready
  document.addEventListener("DOMContentLoaded", initAnimations);
</script>
```

### Data Attributes for Animation Targets

Replace existing CSS animation classes with `data-` attributes on elements that should animate. This separates animation concerns from styling:

| Attribute | Purpose | Replaces |
|-----------|---------|----------|
| `data-animate="fade-up"` | Standard fade + translate-Y entrance | `.animate-on-scroll` |
| `data-animate="fade-in"` | Opacity-only entrance (for paragraphs) | `.animate-on-scroll` (partial) |
| `data-animate="stagger-cards"` | Parent container whose children stagger in | `.animate-on-scroll` on individual cards |
| `data-animate="stagger-steps"` | Parent container for process step stagger | `.animate-on-scroll` on individual steps |

Components that currently use `.animate-on-scroll` should be updated to use the appropriate `data-animate` attribute instead.

---

## 4. Animation Implementations

### 4.1 Hero Section — Orchestrated Entrance

The hero is the first thing visitors see. Give it a polished orchestrated entrance on page load (not scroll-triggered). Add `data-hero-headline`, `data-hero-subheadline`, and `data-hero-ctas` attributes to the existing Hero.astro markup.

```typescript
function initHeroEntrance(): void {
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from("[data-hero-headline]", {
    y: 30,
    opacity: 0,
    duration: 0.7,
  })
  .from("[data-hero-subheadline]", {
    y: 20,
    opacity: 0,
    duration: 0.6,
  }, "-=0.3") // overlap with previous
  .from("[data-hero-ctas]", {
    y: 15,
    opacity: 0,
    duration: 0.5,
  }, "-=0.25");
}
```

**Important:** This is the only entrance animation that runs on page load. All other sections animate on scroll.

### 4.2 Section Headings — Fade Up

Every `<SectionHeading>` component gets `data-animate="fade-up"` on its wrapper.

```typescript
function initSectionHeadings(): void {
  gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]').forEach((el) => {
    gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out", // equivalent to cubic-bezier(0.16, 1, 0.3, 1)
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  });
}
```

### 4.3 Card Grids — Staggered Fade Up

The Services, Industries, and Principles sections have card grids. The parent container gets `data-animate="stagger-cards"`, and each card child animates in sequence.

```typescript
function initCardGrids(): void {
  gsap.utils.toArray<HTMLElement>('[data-animate="stagger-cards"]').forEach((container) => {
    const cards = container.children;
    gsap.from(cards, {
      y: 24,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true,
      },
    });
  });
}
```

### 4.4 Process Steps — Staggered with Longer Delay

The Process section's 4 steps animate with a longer stagger to emphasize timeline progression.

```typescript
function initProcessSteps(): void {
  gsap.utils.toArray<HTMLElement>('[data-animate="stagger-steps"]').forEach((container) => {
    const steps = container.children;
    gsap.from(steps, {
      y: 24,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true,
      },
    });
  });
}
```

### 4.5 Standalone Paragraphs — Opacity Fade

The positioning statement (Services), closing statement (Industries), and narrative paragraph (About) use opacity-only fades — no vertical movement. Gentler, appropriate for body text.

```typescript
function initFadeParagraphs(): void {
  gsap.utils.toArray<HTMLElement>('[data-animate="fade-in"]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  });
}
```

### 4.6 Nav Background Transition

Replace any existing vanilla scroll listener for the nav background transition with GSAP ScrollTrigger:

```typescript
function initNavScroll(): void {
  const nav = document.querySelector("[data-nav]") as HTMLElement;
  if (!nav) return;

  ScrollTrigger.create({
    start: "top -50",
    onUpdate: (self) => {
      if (self.direction === 1 && self.scroll() > 50) {
        nav.classList.add("nav-scrolled");
      }
      if (self.scroll() <= 50) {
        nav.classList.remove("nav-scrolled");
      }
    },
  });
}
```

The `.nav-scrolled` class applies visual changes (background color, border, backdrop-blur) via existing CSS transitions. GSAP just handles the trigger logic.

---

## 5. Reduced Motion Handling

GSAP must fully respect `prefers-reduced-motion`. The approach:

1. At the top of `animations.ts`, check the media query.
2. If reduced motion is preferred, call `gsap.set()` to make all animated elements immediately visible (opacity 1, transforms reset), then return without registering any ScrollTrigger instances.
3. No animations fire, but all content is visible. The page looks identical to the animated version, just without motion.

```typescript
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  gsap.set("[data-animate], [data-hero-headline], [data-hero-subheadline], [data-hero-ctas]", {
    opacity: 1,
    y: 0,
    x: 0,
  });
  return;
}
```

The existing CSS `prefers-reduced-motion` block in `global.css` stays as a fallback for CSS transitions (hover states, nav background).

---

## 6. Lottie Integration

### Strategy

Lottie animations are used sparingly at high-impact touchpoints — not on every element. The goal is to add moments of delight without undermining the restrained, confident tone of the site.

### Where to Use Lottie

| Location | What to Animate | Trigger | Notes |
|----------|----------------|---------|-------|
| **Service cards** (3 cards) | Animated icon replacing the static Lucide icon | Plays once on scroll-in | Each card's icon badge becomes a subtle Lottie single-play animation. Source icons that match: brain/AI, search/analysis, wrench/implementation. |
| **Contact form success state** | Animated checkmark/confirmation | Plays once on form submit success | Replaces the static checkmark icon. A satisfying "success" animation after form submission. |
| **404 page** (if built) | Animated illustration | Loops gently | A friendly "page not found" animation. |

### Where NOT to Use Lottie

- **Hero section** — The Design Spec says "No image, no illustration, no animation in the hero." Respect this.
- **Process steps** — The numbered badges and timeline are clean as static elements.
- **Industry cards** — 7 animated icons would be excessive and slow. Keep as static Lucide icons.
- **Principle cards** — 6 animated icons is too many. Keep as static Lucide icons.
- **Background/ambient** — No floating particles, no ambient Lottie loops.

### Lottie Component: `src/components/LottieIcon.astro`

Create a thin wrapper component:

```astro
---
interface Props {
  src: string;        // Path to .lottie file in /public/animations/
  alt: string;        // Accessible description
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
  class?: string;
}

const { src, alt, width = 48, height = 48, loop = false, autoplay = false, class: className } = Astro.props;
---

<div
  class:list={["lottie-container", className]}
  data-lottie-src={src}
  data-lottie-loop={loop}
  data-lottie-autoplay={autoplay}
  role="img"
  aria-label={alt}
  style={`width: ${width}px; height: ${height}px;`}
>
  <!-- Canvas will be created by JS -->
</div>
```

### Lottie Initialization: `src/scripts/lottie-init.ts`

```typescript
import { DotLottie } from "@lottiefiles/dotlottie-web";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initLottieAnimations(): void {
  const containers = document.querySelectorAll<HTMLElement>("[data-lottie-src]");

  containers.forEach((container) => {
    const src = container.dataset.lottieSrc!;
    const loop = container.dataset.lottieLoop === "true";
    const autoplay = container.dataset.lottieAutoplay === "true";

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const dotLottie = new DotLottie({
      canvas,
      src,
      loop,
      autoplay: prefersReducedMotion ? false : autoplay,
    });

    // For non-autoplay animations, play on scroll-in
    if (!autoplay && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              dotLottie.play();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(container);
    }

    // If reduced motion, show first frame (static)
    if (prefersReducedMotion) {
      dotLottie.setFrame(0);
    }
  });
}
```

Import and call `initLottieAnimations()` from `Layout.astro` alongside the GSAP init.

### Sourcing Lottie Files

Place `.lottie` files in `public/animations/`. Source them from:

1. **Creattie** (https://creattie.com) — Curated, consistent quality. Best for cohesive icon sets.
2. **LottieFiles** (https://lottiefiles.com) — Largest free library. Good for the success checkmark animation.

Choose animations that:
- Use a minimal, line-art or flat style (not 3D, not cartoonish)
- Can be color-customized to match the site's accent color
- Are under 50KB each
- Play in under 2 seconds for single-play animations
- Have a clean, professional aesthetic — nothing playful or childish

File naming convention:
```
public/animations/
  icon-ai-engineering.lottie
  icon-process-analysis.lottie
  icon-implementation.lottie
  success-checkmark.lottie
```

---

## 7. New Files to Create

These files are added to the existing project structure. Nothing else moves or changes location.

```
src/
  scripts/
    animations.ts          # GSAP initialization and all scroll/entrance animations
    lottie-init.ts         # Lottie player initialization
  components/
    LottieIcon.astro       # Lottie wrapper component
public/
  animations/              # Directory for .lottie files
    icon-ai-engineering.lottie
    icon-process-analysis.lottie
    icon-implementation.lottie
    success-checkmark.lottie
```

---

## 8. Implementation Steps

The animation upgrade should be done in four sequential steps, each independently testable:

| Step | What to Do | How to Test |
|------|-----------|-------------|
| **1. Engine swap** | Install `gsap`. Create `animations.ts`. Wire into `Layout.astro`. Remove `ScrollAnimator.astro`, its CSS classes from `global.css`, and its reference in `index.astro`. Replace `.animate-on-scroll` classes in existing components with `data-animate` attributes. | Existing scroll reveals work as before, now powered by GSAP. `npm run build` succeeds. No visual regressions. |
| **2. Hero entrance** | Add `data-hero-*` attributes to `Hero.astro`. Implement the orchestrated timeline in `animations.ts`. | Page load shows headline → sub-headline → CTAs staggering in smoothly. |
| **3. Scroll refinement** | Tune stagger timing on card grids and process steps. Add opacity-only fades to standalone paragraphs. Hook nav transition into ScrollTrigger. | Scroll through full page — animations feel polished, natural stagger, no content invisible during slow scroll. |
| **4. Lottie integration** | Install `@lottiefiles/dotlottie-web`. Create `LottieIcon.astro` and `lottie-init.ts`. Source .lottie files. Replace static Lucide icons in ServiceCard with Lottie. Add success animation to ContactForm. | Service card icons animate on scroll-in. Form success shows animated checkmark. |

---

## 9. Performance Budget

Animation must not compromise the existing Lighthouse ≥90 scores.

| Concern | Constraint |
|---------|-----------|
| GSAP bundle size | ~28KB minified + gzipped (core + ScrollTrigger). Acceptable. |
| dotlottie-web bundle | ~15KB minified + gzipped. Acceptable. |
| Individual .lottie files | Each must be under 50KB. Total animation assets under 200KB. |
| Animation performance | GSAP only animates `transform` and `opacity` (GPU-composited). Never animate layout properties. |
| Lottie rendering | `<canvas>` based rendering. Avoid more than 3 Lottie instances visible simultaneously. |
| Lazy loading | Lottie files in below-fold sections only initialize when near the viewport. The IntersectionObserver in `lottie-init.ts` handles this. |

---

## 10. Quality Checklist

Before considering animations complete:

- [ ] `prefers-reduced-motion: reduce` disables ALL animations (GSAP + Lottie). Page content is fully visible, just static.
- [ ] Hero entrance plays on page load, feels polished but fast (total sequence under 1.5s).
- [ ] Scroll reveals trigger at the right moment — content should never be invisible when a user scrolls slowly.
- [ ] Card staggers feel natural, not mechanical. `0.1s` gaps, not identical simultaneous appearances.
- [ ] Process steps stagger creates a sense of sequential progression.
- [ ] No animation exceeds `0.8s` duration (Design Spec rule).
- [ ] Lottie service card icons are visually consistent with each other (same style, same weight, same color scheme).
- [ ] Lottie success checkmark plays exactly once and stays on the completed frame.
- [ ] All animations work correctly in both LTR (English) and RTL (Hebrew) layouts.
- [ ] No layout shift (CLS) caused by animated elements transitioning from `opacity: 0` — elements should reserve their space in the layout even before becoming visible.
- [ ] Lighthouse Performance score remains ≥ 90 after adding GSAP + Lottie.
- [ ] Total JavaScript shipped to the client (GSAP + dotlottie-web + init scripts) stays under 60KB gzipped.

---

## 11. What NOT to Do

Reinforcing the Design Spec's "do-not-do" list, plus GSAP-specific pitfalls:

- **Do not use GSAP for hover effects.** CSS transitions handle hovers (already defined in existing CSS). GSAP is for scroll-triggered reveals and the hero entrance only.
- **Do not use SplitText on the hero headline.** Character-by-character text animation would violate the "Quiet Confidence" principle. The headline fades up as a block.
- **Do not add scroll-linked (scrub) animations.** No elements should move in sync with scroll position. Animations trigger once and complete, then the element is static.
- **Do not use GSAP's ScrollSmoother.** The site uses native `scroll-behavior: smooth`. Let the browser handle scroll physics.
- **Do not animate elements re-entering the viewport.** Each element animates exactly once. Use `once: true` in ScrollTrigger.
- **Do not add Lottie animations to any section not listed in Section 6.** Three service icons + one success checkmark. That's it.
- **Do not use bounce or elastic easing.** Use `power3.out` (smooth deceleration) and `power2.out`. No spring physics, no overshoot.
- **Do not change any existing layout, spacing, typography, colors, or component structure.** This is an animation-only upgrade.

---

*This document should be read alongside the Design Specification for visual intent and the Implementation Plan for technical architecture. For all non-animation concerns, those two documents remain the authoritative source.*
