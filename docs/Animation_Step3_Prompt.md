# Animation Step 3: Scroll Reveal Refinement

## What you're doing

Upgrading the scroll animations from the uniform `fade-up` applied in Step 1 to differentiated, polished behavior: staggered card grids, staggered process steps with longer delays, opacity-only fades for standalone paragraphs, and hooking the nav background transition into ScrollTrigger. After this step, all GSAP animations are complete.

## Read first

Review the Animation Brief (`NLX-labs_Animation_Brief.md`) Sections 4.2 through 4.6. Then examine the current components to understand their grid/container structure — you need to identify the parent containers that wrap card grids and process steps.

## Steps

### 1. Staggered card grids (Services, Industries, Principles)

In `Services.astro`, `Industries.astro`, and `About.astro` (which contains the principles grid): find the parent container that wraps the card grid. Change its children's animation approach:

- **Remove** `data-animate="fade-up"` from individual cards (`ServiceCard`, `IndustryCard`, `PrincipleCard`)
- **Add** `data-animate="stagger-cards"` to the parent grid container

Add `initCardGrids()` to `animations.ts` as specified in Animation Brief Section 4.3:
- Targets: children of `[data-animate="stagger-cards"]` containers
- Values: y: 24, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out"
- ScrollTrigger: trigger on the container, start: "top 80%", once: true

### 2. Staggered process steps

In `Process.astro`: find the parent container that wraps the process steps.

- **Remove** `data-animate="fade-up"` from individual `ProcessStep` components
- **Add** `data-animate="stagger-steps"` to the parent steps container

Add `initProcessSteps()` to `animations.ts` as specified in Animation Brief Section 4.4:
- Targets: children of `[data-animate="stagger-steps"]` containers
- Values: y: 24, opacity: 0, duration: 0.5, stagger: 0.15, ease: "power3.out"
- ScrollTrigger: trigger on the container, start: "top 80%", once: true

### 3. Opacity-only paragraph fades

Identify standalone paragraphs that are not inside cards: the positioning statement in Services, the closing statement in Industries, and the narrative paragraph in About. These should use a gentler animation.

- **Change** their `data-animate="fade-up"` to `data-animate="fade-in"`

Add `initFadeParagraphs()` to `animations.ts` as specified in Animation Brief Section 4.5:
- Targets: `[data-animate="fade-in"]` elements
- Values: opacity: 0 only (no y movement), duration: 0.8, ease: "power2.out"
- ScrollTrigger: trigger on the element, start: "top 85%", once: true

### 4. Nav scroll transition via ScrollTrigger

The nav currently transitions from transparent to solid on scroll. If there's an existing vanilla scroll listener handling this, replace it with the GSAP ScrollTrigger approach from Animation Brief Section 4.6.

- Add `data-nav` attribute to the `<nav>` element in `Nav.astro` (if not already present)
- Add `initNavScroll()` to `animations.ts` that uses `ScrollTrigger.create()` to toggle `.nav-scrolled` class at scroll > 50px
- If there's an existing scroll listener doing the same thing, remove it to avoid duplicate behavior

### 5. Update `initAnimations()` in `animations.ts`

The main function should now call all animation functions in order:
```
initHeroEntrance()
initSectionHeadings()     // existing fade-up for headings
initCardGrids()           // new
initProcessSteps()        // new
initFadeParagraphs()      // new
initNavScroll()           // new
```

Rename the existing `initScrollReveals()` to `initSectionHeadings()` if it isn't already — it now specifically handles `[data-animate="fade-up"]` elements, which should be section headings and any other standalone elements that aren't cards, steps, or paragraphs.

### 6. CSS for staggered elements

The same flash-prevention approach from Step 2 applies: elements inside `[data-animate="stagger-cards"]` and `[data-animate="stagger-steps"]` containers start at `opacity: 0` and need to be visible immediately when `prefers-reduced-motion` is active. Add CSS rules matching the pattern used for the hero elements. Also add `[data-animate="fade-in"]` elements to this treatment.

Update the reduced-motion `gsap.set()` call to include the new selectors.

## How to verify

- `npm run build` succeeds
- `npm run dev` — scroll through the full page slowly:
  - **Section headings** fade up individually as before
  - **Service cards** (3) stagger in one after another with ~0.1s gaps — not all at once
  - **Process steps** (4) stagger in with ~0.15s gaps — slightly slower than cards, creating a sequential progression feel
  - **Industry cards** (7) stagger in with ~0.1s gaps
  - **Principle cards** (6) stagger in with ~0.1s gaps
  - **Standalone paragraphs** (positioning statement, closing statement, narrative) fade in gently with opacity only — no upward movement
  - **Nav** transitions from transparent to solid at ~50px scroll, and back when scrolling to top
- No content is ever invisible during normal scrolling speed
- Test both Hebrew and English — stagger direction should feel natural in both LTR and RTL
- Test with `prefers-reduced-motion: reduce` — everything visible immediately, no animations
- No visual regressions in layout or spacing

## Do not

- Do not install Lottie or create Lottie components (that's Step 4)
- Do not change any component's HTML structure or styling beyond swapping data attributes
- Do not add any new animation types not specified here
- Do not use scrub, pin, or scroll-linked animations — everything triggers once and completes
