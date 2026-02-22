# NLX-Labs Corporate Website — Design Specification

## Purpose

This document is the single source of truth for all visual and interaction design decisions on the NLX-labs website. It is intended to be used alongside the Implementation Plan so that any AI coding agent (or human developer) produces a site that looks and feels premium — not generic.

Everything here overrides default or "safe" choices. When in doubt, follow the principles in this document.

---

## Reference DNA

The design language is derived from five reference sites. What we take from each:

| Site | What We Borrow | What We Skip |
|------|---------------|--------------|
| **anthropic.com** | Editorial whitespace, content-forward layout, muted confidence, unhurried pacing | Earth tones, serif typography |
| **apple.com** | Extreme hierarchy through scale, cinematic section transitions, dark/light rhythm, concise copy | Product imagery focus, carousel patterns |
| **linear.app** | Crisp precision, polished card surfaces, developer-grade attention to detail, subtle hover states | Dark-mode-first palette, dense feature grids |
| **vercel.com** | Minimal density, strong typographic contrast, clean section dividers, purposeful negative space | Code-heavy sections, globe animations |
| **raycast.com** | Premium micro-interactions, glass-effect surfaces, keyboard-visual metaphors, community social proof | Extension store layout, macOS-specific metaphors |

**The synthesis:** A light, spacious, typography-driven site with subtle but precise animations. It should feel like a serious AI company — not a marketing agency. Clean enough for a CTO, approachable enough for a business owner who has never hired a tech vendor before.

---

## 1. Design Principles

These five rules override any default or generic choice.

### 1.1 Space Is a Feature
Negative space is the primary tool for visual hierarchy. Every section should breathe. No element should feel crowded. When choosing between "add more content" and "add more space," choose space.

### 1.2 Typography Does the Heavy Lifting
Hierarchy is communicated through font size, weight, and spacing — not through color fills, borders, or decorative elements. Headlines should be noticeably large. The difference between an `h2` and body text should be obvious from across the room.

### 1.3 Restrained Motion
Animations exist to confirm interaction and guide attention — never to decorate or impress. Every animation must pass the test: "Would the experience be worse without this?" If the answer is no, remove the animation.

### 1.4 Precision Over Decoration
No gradients for decoration. No drop shadows for decoration. No border-radius larger than `0.75rem` (12px). Every visual treatment must serve legibility or hierarchy. The site should look like it was built by engineers who care about design — not designers chasing trends.

### 1.5 Quiet Confidence
The site should never shout, beg, or over-explain. It should feel like a company that knows what it does and trusts the visitor to recognize value. This means: short headlines, restrained use of accent color, no exclamation marks in UI copy, no "🚀" energy.

---

## 2. Color Application

The palette tokens are defined in the Implementation Plan (`global.css`). This section specifies **how** and **where** to apply them.

### 2.1 Existing Tokens (from Implementation Plan)

| Token | Hex | Purpose |
|-------|-----|---------|
| `--color-dark` | `#1A2332` | Hero section background, nav background (on scroll), footer background |
| `--color-accent` | `#2D7DD2` | Primary CTA fills, links, active indicators, icon accents |
| `--color-accent-hover` | `#2468B0` | Hover/pressed state for accent elements |
| `--color-light-bg` | `#F4F6F8` | Alternating section background (creates rhythm against white) |
| `--color-white` | `#FFFFFF` | Default page background, card surfaces |
| `--color-text-primary` | `#1F2937` | Body text on light backgrounds |
| `--color-text-secondary` | `#6B7280` | Subtitles, supporting text, meta information |

### 2.2 Additional Tokens to Define

Add these to `global.css` under the existing `@theme` block:

| Token | Hex | Purpose |
|-------|-----|---------|
| `--color-dark-text` | `#F1F5F9` | Primary text on dark backgrounds (hero, footer) |
| `--color-dark-text-secondary` | `#94A3B8` | Secondary text on dark backgrounds |
| `--color-border-subtle` | `#E5E7EB` | Card borders, dividers on light backgrounds |
| `--color-surface-elevated` | `#FFFFFF` | Card surfaces that sit above `--color-light-bg` |
| `--color-accent-soft` | `#EBF4FF` | Light accent tint for icon backgrounds, tags, highlights |

### 2.3 Section Background Rhythm

The page alternates backgrounds to create visual rhythm and prevent monotony:

| Section | Background | Text Colors |
|---------|-----------|-------------|
| **Nav** | Transparent → `--color-dark` on scroll (with backdrop-blur) | White always |
| **Hero** | `--color-dark` | `--color-dark-text`, `--color-dark-text-secondary` |
| **Services** | `--color-white` | Primary, secondary |
| **Process** | `--color-light-bg` | Primary, secondary |
| **Industries** | `--color-white` | Primary, secondary |
| **About** | `--color-light-bg` | Primary, secondary |
| **Contact** | `--color-white` | Primary, secondary |
| **Footer** | `--color-dark` | `--color-dark-text`, `--color-dark-text-secondary` |

This gives the page a **light sandwich**: dark bookends (hero + footer) with an alternating white/gray body. The dark hero creates a strong first impression; the dark footer provides a grounding close.

### 2.4 Accent Color Rules

- Accent blue (`#2D7DD2`) is used **sparingly** — only for interactive elements and strategic emphasis
- Maximum of **one** accent-colored element visible per viewport at any time (besides nav CTA)
- Never use accent as a section background fill
- Icon accent treatment: icon rendered in accent color on a soft accent tint (`--color-accent-soft`) circular or rounded-square background
- Links in body text use accent color with no underline; underline appears on hover via `text-decoration-thickness: 1px` and `underline-offset: 4px`

---

## 3. Typography

### 3.1 Font Stack

As defined in Implementation Plan — no changes:
- **English:** Inter (Google Fonts), system-ui fallback
- **Hebrew:** Heebo (Google Fonts), system-ui fallback

### 3.2 Type Scale

A large, confident type scale inspired by Anthropic and Apple. All values are `rem` at base `16px`.

| Role | Size (desktop) | Size (mobile) | Weight | Line Height | Letter Spacing |
|------|---------------|---------------|--------|-------------|----------------|
| **Hero headline** | `3.5rem` (56px) | `2.25rem` (36px) | 700 | 1.1 | `-0.025em` |
| **Hero sub-headline** | `1.25rem` (20px) | `1.125rem` (18px) | 400 | 1.6 | `0` |
| **Section h2** | `2.5rem` (40px) | `1.75rem` (28px) | 700 | 1.2 | `-0.02em` |
| **Section subtitle** | `1.125rem` (18px) | `1rem` (16px) | 400 | 1.6 | `0` |
| **Card title** | `1.25rem` (20px) | `1.125rem` (18px) | 600 | 1.3 | `-0.01em` |
| **Card description** | `1rem` (16px) | `0.9375rem` (15px) | 400 | 1.65 | `0` |
| **Body / paragraph** | `1.0625rem` (17px) | `1rem` (16px) | 400 | 1.7 | `0` |
| **Nav link** | `0.9375rem` (15px) | — | 500 | 1 | `0` |
| **Button label** | `0.9375rem` (15px) | `0.9375rem` (15px) | 500 | 1 | `0` |
| **Caption / small** | `0.875rem` (14px) | `0.8125rem` (13px) | 400 | 1.5 | `0.01em` |
| **Form label** | `0.875rem` (14px) | `0.875rem` (14px) | 500 | 1.4 | `0.01em` |

### 3.3 Typography Rules

- **Negative letter-spacing on headlines** is critical for the premium feel. Do not skip it.
- Hero headline and section h2 should use `text-wrap: balance` to prevent awkward line breaks.
- Maximum line width for body text paragraphs: `65ch`. For wider layouts, constrain the text column — do not let body text span the full container.
- Section subtitles are rendered in `--color-text-secondary` and provide context beneath the h2. They should be a single sentence, never more than two lines on desktop.
- On dark backgrounds, headline text uses `--color-dark-text` (`#F1F5F9`) — not pure white (`#FFFFFF`), which is too harsh.
- Hebrew text in Heebo naturally reads slightly larger than Inter at the same size. No size adjustment needed — Heebo's x-height is already well-matched.

---

## 4. Spacing System

### 4.1 Section Spacing

| Context | Desktop | Mobile |
|---------|---------|--------|
| Between major sections (vertical padding per section) | `6rem` (96px) top and bottom | `4rem` (64px) top and bottom |
| Hero section vertical padding | `8rem` (128px) top, `6rem` (96px) bottom | `5rem` (80px) top, `4rem` (64px) bottom |
| Section heading to first content element | `3rem` (48px) | `2rem` (32px) |
| Between cards in a grid | `2rem` (32px) gap | `1.5rem` (24px) gap |
| Between process steps | `2.5rem` (40px) | `2rem` (32px) |

### 4.2 Container

- Max content width: `72rem` (1152px)
- Horizontal padding (gutter): `1.5rem` (24px) on mobile, `2rem` (32px) on tablet, `3rem` (48px) on desktop
- The content container is always horizontally centered
- Full-bleed backgrounds extend to viewport edges; content stays within the container

### 4.3 Card Internal Spacing

| Element | Value |
|---------|-------|
| Card padding | `2rem` (32px) on all sides |
| Icon to title | `1.25rem` (20px) |
| Title to description | `0.75rem` (12px) |
| If card has a list (industry examples): title to list | `1rem` (16px) |
| List item spacing | `0.5rem` (8px) |

---

## 5. Layout & Grid

### 5.1 Responsive Breakpoints

| Name | Min-width | Typical use |
|------|-----------|-------------|
| Mobile | `0` | Single column, stacked layout |
| Tablet | `640px` | 2-column grids |
| Desktop | `1024px` | Full multi-column layout, side-by-side contact |
| Wide | `1280px` | Max container width reached, additional breathing room |

### 5.2 Section Grid Patterns

| Section | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Services** (3 cards) | 3-column equal grid | 3-column (cards are compact enough) | 1-column stack |
| **Process** (4 steps) | Horizontal timeline with 4 columns | 2×2 grid | 1-column vertical timeline |
| **Industries** (7 cards) | 4-column grid (4+3 rows) | 3-column grid (3+3+1) | 2-column grid |
| **Principles** (6 cards) | 3-column grid (3+3 rows) | 2-column grid (2+2+2) | 1-column stack |
| **Contact** | 2-column: intro text (left) + form (right) | 1-column stacked | 1-column stacked |

### 5.3 Card Design

Cards are used in Services, Industries, and Principles sections. Consistent treatment:

- **Background:** `--color-surface-elevated` (white) when on `--color-light-bg` sections, or `--color-light-bg` when on white sections. The card should always have subtle contrast against its section background.
- **Border:** `1px solid --color-border-subtle`
- **Border radius:** `0.75rem` (12px) — this is the **maximum** radius used anywhere on the site
- **Shadow (resting state):** none
- **Shadow (hover):** `0 4px 24px rgba(0, 0, 0, 0.06)` — barely visible, just enough to suggest lift
- **Hover transform:** `translateY(-2px)` — subtle, not dramatic
- **Transition:** `all 0.25s cubic-bezier(0.4, 0, 0.2, 1)` — applied to shadow and transform together
- **No inner borders, no header bars, no colored top stripes.** Cards are clean rectangles.

### 5.4 Icon Treatment in Cards

- Icons are rendered at `24px` from Lucide
- Each icon sits inside a `48px × 48px` container with:
  - Background: `--color-accent-soft` (`#EBF4FF`)
  - Border-radius: `0.625rem` (10px) — slightly squircled
  - Icon color: `--color-accent`
- This creates a consistent, polished icon badge that avoids the "naked floating icon" look

---

## 6. Component-Specific Design

### 6.1 Navigation

**Inspired by:** Linear (transparent → solid on scroll), Vercel (minimal items, strong CTA)

- **Initial state (at top):** Fully transparent background. Logo and links in white (over the dark hero). No border.
- **Scrolled state:** Background transitions to `--color-dark` with `backdrop-filter: blur(12px)` and slight transparency (`rgba(26, 35, 50, 0.92)`). Add a `1px` bottom border in `rgba(255, 255, 255, 0.08)`.
- **Transition:** Background and border animate over `0.3s ease`.
- **Logo:** Rendered in white at all times (since nav is always over dark hero or dark-filled).
- **Nav links:** White, `font-weight: 500`, `0.9375rem`. On hover: `opacity: 0.75` transition. No underlines.
- **Active link (scroll spy):** `opacity: 1` and a `2px` bottom indicator line in `--color-accent`, offset `6px` below text.
- **CTA button:** Solid accent background with white text. Sits at inline-end of nav.
- **Hamburger (mobile):** Clean `Menu` icon in white. `44×44px` touch target.
- **Sticky:** Fixed to viewport top. `z-index: 50`.
- **Height:** `4rem` (64px) on desktop, `3.5rem` (56px) on mobile.
- **Language toggle:** Minimal pill/badge. `0.8125rem` font, semi-bold. Border: `1px solid rgba(255, 255, 255, 0.25)`. On hover: `rgba(255, 255, 255, 0.15)` background.

### 6.2 Mobile Menu

**Inspired by:** Raycast (slide-out drawer), Linear (focus trap)

- Slides in from inline-end (right in LTR, left in RTL)
- Background: `--color-dark`
- Full viewport height, width `85vw` max `320px`
- Overlay: `rgba(0, 0, 0, 0.5)` backdrop behind the drawer
- Links listed vertically, `1.25rem` font, `3.5rem` row height for touch targets
- Language toggle at the bottom of the drawer
- Close button: `X` icon, top inline-end corner, `44×44px`
- Animation: slide in `0.3s cubic-bezier(0.4, 0, 0.2, 1)`, overlay fades in `0.2s`
- Focus trapped inside drawer while open
- Escape key closes

### 6.3 Hero Section

**Inspired by:** Anthropic (editorial confidence), Apple (scale and simplicity)

This is the single most important section. It must feel commanding and spacious.

- **Background:** `--color-dark` (`#1A2332`) — full bleed to viewport edges
- **Subtle background texture:** A faint radial gradient (`radial-gradient(ellipse at 50% 0%, rgba(45, 125, 210, 0.08) 0%, transparent 60%)`) — an extremely subtle blue glow at the top center, barely perceptible. If it feels noticeable, reduce the opacity.
- **Content:** Centered horizontally. Max width for the headline: `48rem` (768px). Max width for the sub-headline: `40rem` (640px).
- **Headline:** `3.5rem` / 700 weight / `-0.025em` tracking. Color: `--color-dark-text`. Text-align: center. `text-wrap: balance`.
- **Sub-headline:** `1.25rem` / 400 weight. Color: `--color-dark-text-secondary`. Text-align: center. Margin-top: `1.5rem`.
- **CTA group:** Two buttons side-by-side with `1rem` gap. Centered. Margin-top: `2.5rem`.
  - Primary CTA: Solid `--color-accent` background, white text, `0.625rem 1.75rem` padding.
  - Secondary CTA: Transparent background, `1px solid rgba(255, 255, 255, 0.25)` border, white text.
  - Both: `border-radius: 0.5rem`, `font-weight: 500`, `0.9375rem` font, `min-height: 48px`.
- **Vertical rhythm:** `8rem` top padding (desktop) to push content below nav. `6rem` bottom padding.
- **No image, no illustration, no animation in the hero.** The words and the space do the work.

### 6.4 Services Section

**Inspired by:** Vercel (clean 3-card grid), Linear (card precision)

- Background: `--color-white`
- Section heading + subtitle centered
- 3-column grid of `ServiceCard` components
- Below the grid: the positioning statement as a standalone centered paragraph in `--color-text-secondary`, `font-style: italic`, max-width `40rem`
- Cards use `--color-light-bg` background (subtle differentiation against the white section)

### 6.5 Process Section

**Inspired by:** Linear (timeline/step visualization), Apple (clean progression)

- Background: `--color-light-bg`
- Horizontal timeline on desktop: 4 steps connected by a thin line (`1px`, `--color-border-subtle`)
- Each step has:
  - A numbered badge: `40px × 40px` circle, `--color-accent` background, white number, `font-weight: 700`, `1rem`
  - The connecting line runs horizontally through the center of the badges
  - Title below badge: `1.25rem / 600`
  - Description below title: `1rem / 400`, `--color-text-secondary`
- On mobile: vertical timeline. Line runs along inline-start edge. Steps stacked vertically.
- Steps animate in staggered on scroll (see Section 7)

### 6.6 Industries Section

**Inspired by:** Raycast (extension grid), Vercel (clean grid density)

- Background: `--color-white`
- 4-column grid on desktop (7 cards as 4+3, second row left-aligned, not center-justified)
- Each `IndustryCard`:
  - Icon badge (same treatment as 5.4)
  - Industry name: `1.125rem / 600`
  - Example applications as a compact list: `0.875rem`, `--color-text-secondary`, with a subtle left border (`2px solid --color-accent-soft`) instead of bullet points — cleaner look
- Closing statement below the grid: centered, `--color-text-secondary`

### 6.7 About Section

**Inspired by:** Anthropic (narrative weight), Linear (principle cards)

- Background: `--color-light-bg`
- Narrative paragraph: max-width `48rem`, centered, `1.0625rem`, generous `1.7` line-height. Give it room to breathe.
- "Our Guiding Principles" sub-heading: `1.75rem / 600`, centered, `2.5rem` spacing above
- 3-column grid of `PrincipleCard` components (same card styling as 5.3)

### 6.8 Contact Section

**Inspired by:** Linear (clean form), Vercel (two-column CTA area)

- Background: `--color-white`
- Desktop: 2-column layout
  - Left column (40%): Heading, subtitle, intro paragraph, email link (accent-colored with subtle arrow icon)
  - Right column (60%): Contact form on a `--color-light-bg` surface with card border-radius and border
- Mobile: stacked, intro first then form

**Form design:**
- Input fields: `min-height: 48px`, `border: 1px solid --color-border-subtle`, `border-radius: 0.5rem`, `padding: 0.75rem 1rem`
- Focus state: border transitions to `--color-accent`, plus standard focus-visible outline
- Labels above inputs, `0.875rem / 500`
- Textarea: min-height `120px`, resizable vertically only
- Submit button: full-width accent CTA, same styling as hero primary button
- Success state: form replaced by checkmark icon and confirmation message (no modal)
- Error messages: inline below fields, `#DC2626`, `0.8125rem`

### 6.9 Footer

**Inspired by:** Anthropic (dark, simple)

- Background: `--color-dark` — full bleed
- Content: Logo (white), copyright, privacy link
- Simple single-row layout, centered or spread
- Text: `--color-dark-text-secondary`, `0.875rem`
- Vertical padding: `3rem`
- Keep minimal. No multi-column link trees. This is a single-page site for a young company.

---

## 7. Animation & Interaction

### 7.1 Global Rules

- All animations respect `prefers-reduced-motion: reduce` (already in `global.css`)
- Never animate `width`, `height`, or layout-triggering properties. Stick to `transform` and `opacity`.
- Default easing: `cubic-bezier(0.4, 0, 0.2, 1)` — for all UI transitions
- Spring easing for scroll reveals: `cubic-bezier(0.16, 1, 0.3, 1)` — slightly bouncy deceleration

### 7.2 Scroll Reveal Animations

Elements animate into view via `IntersectionObserver` (`ScrollAnimator.astro`):

| Element Type | Animation | Duration | Stagger |
|-------------|-----------|----------|---------|
| Section headings | Fade up (`opacity 0→1`, `translateY 20px→0`) | `0.6s` | — |
| Cards in a grid | Fade up | `0.5s` | `0.1s` between cards |
| Process steps | Fade up | `0.5s` | `0.15s` between steps |
| Standalone paragraphs | Fade in (opacity only, no translate) | `0.8s` | — |

**Rules:**
- `IntersectionObserver` threshold: `0.15` (trigger when 15% visible)
- `rootMargin`: `0px 0px -60px 0px` (trigger slightly before element reaches bottom edge)
- Each element animates **once**. Add `.is-visible` and disconnect.
- Stagger via `transition-delay` as inline styles or CSS custom properties

### 7.3 Hover Interactions

| Element | Hover Effect | Duration |
|---------|-------------|----------|
| Cards (Service, Industry, Principle) | `translateY(-2px)` + shadow `0 4px 24px rgba(0, 0, 0, 0.06)` | `0.25s` |
| Primary CTA button | Background darkens to `--color-accent-hover` | `0.15s` |
| Secondary CTA button (dark bg) | Background fills to `rgba(255, 255, 255, 0.1)` | `0.15s` |
| Nav links | Opacity `0.75` | `0.15s` |
| Footer links | Text underline appears | `0.15s` |
| Body text links | Underline appears (`underline-offset: 4px`) | `0.15s` |
| Form inputs | Border color transitions to `--color-accent` | `0.15s` |

### 7.4 Nav Scroll Transition

- Trigger: `scroll > 50px` from top
- Properties animated: `background-color`, `border-bottom-color`
- Duration: `0.3s ease`
- Implementation: toggle class `.nav-scrolled` via passive scroll listener

### 7.5 What NOT to Animate

Explicitly avoid:
- Parallax backgrounds
- Rotating or pulsing icons
- Number counters / odometers
- Typing/typewriter effects on the headline
- Particle systems or canvas backgrounds
- Bounce effects on buttons
- Horizontal slide-in from sides (except mobile menu)
- Any animation longer than `0.8s`

---

## 8. Responsive Design

### 8.1 Approach

Mobile-first CSS using Tailwind breakpoints. The mobile layout is the base; larger breakpoints add columns and increase spacing.

### 8.2 Key Responsive Behaviors

| Element | Mobile (<640px) | Tablet (640–1023px) | Desktop (1024px+) |
|---------|----------------|--------------------|--------------------|
| Nav | Hamburger + drawer | Hamburger + drawer | Inline links + CTA |
| Hero headline | `2.25rem`, left-aligned | `2.75rem`, centered | `3.5rem`, centered |
| Hero content | Left-aligned, full-width | Centered, max-width | Centered, max-width |
| Service cards | 1-column stack | 3-column grid | 3-column grid |
| Process steps | Vertical timeline | 2×2 grid | Horizontal 4-column |
| Industry cards | 2-column grid | 3-column grid | 4-column grid |
| Principle cards | 1-column stack | 2-column grid | 3-column grid |
| Contact layout | Stacked (intro → form) | Stacked | 2-column side-by-side |
| Section padding | `4rem` vertical | `5rem` vertical | `6rem` vertical |

### 8.3 RTL-Specific Notes

- All spacing uses Tailwind v4 logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `text-start`, `text-end`)
- Hero sub-headline and about narrative remain centered in both directions
- Mobile menu slides from inline-end (right in LTR, left in RTL)
- Process timeline: step 1 is always at inline-start in horizontal mode
- Contact 2-column: intro at inline-start, form at inline-end
- No `rtl:` overrides should be needed if logical properties are used consistently

---

## 9. Form Design Details

### 9.1 Visual States

| State | Border | Background | Additional |
|-------|--------|-----------|------------|
| Default | `--color-border-subtle` | `white` | — |
| Focus | `--color-accent` | `white` | `2px` outline via `:focus-visible` |
| Error | `#DC2626` | `white` | Error message in `#DC2626` below field |
| Filled (valid) | `--color-border-subtle` | `white` | No green check — keep it quiet |
| Disabled / Submitting | `--color-border-subtle` | `--color-light-bg` | Reduced opacity (`0.6`) |

### 9.2 Honeypot

Visually hidden field: `position: absolute; left: -9999px; tab-index: -1;`. Do not use `display: none` (bots detect it).

---

## 10. Accessibility Reinforcement

Already implied by the Implementation Plan but worth restating from a design lens:

- All interactive elements: minimum `44 × 44px` touch target
- Color contrast: `#1F2937` on `#FFFFFF` ≈ 13:1; `#F1F5F9` on `#1A2332` ≈ 11:1 (both exceed WCAG AA)
- Focus-visible outlines: `2px solid --color-accent` with `2px` offset
- Skip-to-content link: first focusable element, visually hidden until focused
- Form errors: associated via `aria-describedby`
- Mobile menu: `aria-expanded`, `role="dialog"`, focus trap
- Never rely on color alone to convey information

---

## 11. Do-Not-Do List

If the implementation drifts toward any of these, course-correct immediately.

| ❌ Don't | ✅ Do Instead |
|----------|--------------|
| Gradient backgrounds on sections | Flat solid colors from the defined palette |
| Box shadows on resting-state cards | Shadows only appear on hover |
| Rounded corners > 12px | Max `border-radius: 0.75rem` everywhere |
| Colorful multi-tone icon sets | Monochrome icons in accent blue |
| More than two font families | Stick to Inter and Heebo |
| Bold + italic + uppercase combined | One emphasis technique per element |
| Decorative dividers (waves, SVG shapes) | Clean color breaks between sections |
| Stock photos or AI-generated images | No imagery. Typography and space do the work. |
| Testimonial carousels | Not needed — company is newly founded |
| "Trusted by" logo bars | Not needed — no clients yet |
| Floating chat widgets | Contact form is sufficient |
| Cookie banners (unless legally required) | Site is static with no tracking cookies |
| Loading screens or splash pages | Static HTML loads instantly |
| Scroll-jacking | Let the browser handle scroll physics |
| Any animation longer than 0.8s | Keep everything fast and tight |

---

## 12. Quick Reference Checklist

For the developer or agent building each component:

### Before Starting Any Component:
1. Is the spacing generous enough? (Err on too much space)
2. Is the font size hierarchy clear? (Headlines should feel *big*)
3. Does the component need animation? (Probably just fade-up on scroll)
4. Does it work in RTL? (Use logical properties only)

### Visual Quality Checks:
- [ ] Headlines use negative letter-spacing
- [ ] Body text maxes out at `65ch` width
- [ ] Cards have `1px` subtle border, no resting shadow
- [ ] Icon badges use the soft-accent background treatment
- [ ] Accent color is used sparingly — interactive elements only
- [ ] Hover states are subtle (`-2px` lift, `0.06` opacity shadow)
- [ ] Section backgrounds alternate: white → light-bg → white → light-bg
- [ ] Hero and footer are the only dark sections
- [ ] All transitions use `cubic-bezier(0.4, 0, 0.2, 1)` or the spring variant
- [ ] No animation exceeds `0.8s`
- [ ] Form inputs are `48px` minimum height
- [ ] Touch targets are `44×44px` minimum
- [ ] `text-wrap: balance` applied to all headlines

---

*This document should be injected alongside `NLX-labs_Implementation_Plan.md` as context for AI coding agents. Together, the two documents provide complete technical and visual specifications for the NLX-labs corporate website.*
