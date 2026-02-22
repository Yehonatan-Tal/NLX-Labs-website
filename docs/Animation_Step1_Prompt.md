# Animation Step 1: Engine Swap — GSAP Replaces ScrollAnimator

## What you're doing

The site currently uses a hand-rolled `ScrollAnimator.astro` component with `IntersectionObserver` and CSS classes for scroll reveal animations. You are replacing that system with GSAP + ScrollTrigger. This is a like-for-like swap — the animations should look and feel the same as before (or better), just powered by a more capable engine.

**Do not add any new animations in this step.** No hero entrance, no stagger tuning, no Lottie. Just swap the engine cleanly.

## Read first

Before making any changes, read the Animation Brief (`NLX-labs_Animation_Brief.md`) in full — particularly Sections 2, 3, and 5. Then examine the existing codebase to understand how `ScrollAnimator.astro` works, which components use `.animate-on-scroll` or `.animate-slide-start` classes, and where those CSS classes are defined in `global.css`.

## Steps

1. **Install GSAP:**
   ```bash
   npm install gsap
   ```

2. **Create `src/scripts/animations.ts`** following the architecture in the Animation Brief Section 3. For this step, implement only:
   - GSAP + ScrollTrigger registration
   - `prefersReducedMotion` check
   - A single `initScrollReveals()` function that replicates the existing scroll reveal behavior: elements with `data-animate="fade-up"` fade in and translate up on scroll, triggering once. Use the values from the Animation Brief Section 4.2 (y: 24, opacity: 0, duration: 0.6, ease: "power3.out", trigger start: "top 85%", once: true).

3. **Wire GSAP into `Layout.astro`:** Add the client-side script import at the bottom of the body, before the closing `</body>` tag. See Animation Brief Section 3 for the exact pattern.

4. **Update existing components:** Go through every component that currently uses `.animate-on-scroll` or `.animate-slide-start` CSS classes. Replace those classes with `data-animate="fade-up"`. Keep all other classes and attributes untouched.

5. **Remove the old system:**
   - Delete `src/components/ScrollAnimator.astro`
   - Remove the `<ScrollAnimator />` reference from `index.astro` (or wherever it's included)
   - Remove the `.animate-on-scroll`, `.animate-on-scroll.is-visible`, `.animate-slide-start`, and `.animate-slide-start.is-visible` CSS class definitions from `global.css`
   - Keep the `prefers-reduced-motion` media query block in `global.css` — that stays

6. **Verify the reduced motion path:** When `prefers-reduced-motion: reduce` is active, GSAP should immediately set all `[data-animate]` elements to `opacity: 1` and `y: 0` without any animation. No content should be invisible.

7. **Update `CLAUDE.md`:** The "Scroll Animations" section at the bottom of `CLAUDE.md` currently describes the old system (`ScrollAnimator.astro`, `.animate-on-scroll` classes, `IntersectionObserver`). Replace that section with:
   ```
   ### Scroll Animations

   GSAP + ScrollTrigger powers all scroll-triggered animations via `src/scripts/animations.ts`. Elements use `data-animate` attributes (e.g., `data-animate="fade-up"`, `data-animate="stagger-cards"`). Hero uses `data-hero-*` attributes for a page-load entrance timeline. See `NLX-labs_Animation_Brief.md` for full spec. Respects `prefers-reduced-motion`.
   ```
   This keeps `CLAUDE.md` accurate to the actual codebase.

## How to verify

- `npm run build` succeeds without errors
- `npm run dev` — scroll through the full page in both Hebrew (default) and English (`?lang=en`). Every element that previously animated on scroll should still animate on scroll with the same general behavior (fade up into view).
- No content is invisible or missing at any scroll position
- No visual regressions in layout, spacing, or typography
- Check the browser console for any GSAP errors or warnings

## Do not

- Do not add the hero entrance timeline yet (that's Step 2)
- Do not add stagger to card grids or process steps yet (that's Step 3)
- Do not install `@lottiefiles/dotlottie-web` or create any Lottie components (that's Step 4)
- Do not change any component's HTML structure, layout, or styling beyond swapping the animation class for a data attribute
- Do not add any new `data-animate` variants beyond `fade-up` in this step
