# Animation Step 2: Hero Entrance Timeline

## What you're doing

Adding a GSAP timeline that animates the hero section elements on page load. The headline, sub-headline, and CTA buttons stagger in sequentially when the page first loads. This is the only animation that triggers on page load — everything else is scroll-triggered (already working from Step 1).

## Read first

Review the Animation Brief (`NLX-labs_Animation_Brief.md`) Section 4.1 for the exact implementation. Then examine the existing `Hero.astro` component to understand its current markup structure.

## Steps

1. **Add data attributes to `Hero.astro`:** Add these attributes to the existing elements without changing any other markup or styling:
   - `data-hero-headline` on the headline element (`<h1>`)
   - `data-hero-subheadline` on the sub-headline element (`<p>`)
   - `data-hero-ctas` on the CTA button wrapper/container

2. **Add `initHeroEntrance()` to `animations.ts`:** Implement the orchestrated timeline exactly as specified in the Animation Brief Section 4.1:
   ```
   headline:     y: 30, opacity: 0, duration: 0.7, ease: power3.out
   sub-headline:  y: 20, opacity: 0, duration: 0.6, overlap: -=0.3
   CTAs:          y: 15, opacity: 0, duration: 0.5, overlap: -=0.25
   ```
   This function should check `prefersReducedMotion` independently and return early if true.

3. **Call `initHeroEntrance()` from `initAnimations()`:** It should run before the scroll-based functions. The hero elements also need to be included in the reduced-motion `gsap.set()` call so they're visible immediately when motion is disabled.

4. **Ensure no flash of invisible content:** The hero elements start with `opacity: 0` applied by GSAP's `from()` tween. Make sure there's no visible flash where the hero content appears then disappears then animates in. The GSAP timeline should run immediately on DOMContentLoaded — if there's a timing gap, consider setting the hero elements to `opacity: 0` via a CSS rule that GSAP then animates from.

## How to verify

- `npm run build` succeeds
- `npm run dev` — on page load, the hero headline appears first, then the sub-headline fades up slightly overlapping, then the CTAs fade up. The total sequence should feel fast and polished — under 1.5 seconds total.
- Hard refresh the page several times to confirm the entrance is consistent and clean with no flicker.
- Test in both Hebrew and English — the animation should look identical in both directions.
- Test with `prefers-reduced-motion: reduce` enabled — hero content should be immediately visible with no animation.
- Scroll down and back up — the hero should not re-animate. It plays once on load only.

## Do not

- Do not add any animations to other sections in this step
- Do not use SplitText or character-level animation on the headline — it fades up as a single block
- Do not add any delay before the timeline starts — it should begin immediately on DOMContentLoaded
- Do not change the hero's layout, spacing, typography, or colors
