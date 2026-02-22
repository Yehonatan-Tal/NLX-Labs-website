# NLX Labs — Design Language Reference

A catalog of every visual/CSS technique used in the site's premium dark sections. Use this document as a reusable reference when applying the design language to new or existing sections.

---

## 1. Background & Texture System

### 1a. Base Dark Background

A near-black with the faintest blue undertone. This is the canvas everything sits on.

```css
background: #07080a;
```

**When to use:** Any dark section that needs the deep-space feel. Pair with the starfield and noise texture.

### 1b. Noise Grain Texture

An SVG fractal-noise overlay at very low opacity, adding analog grain that prevents flat digital banding. Applied via the `noise-texture` utility class.

```css
.noise-texture::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.025;
  background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');
  pointer-events: none;
}
```

**When to use:** Every dark section. Add `noise-texture` class to the `<section>` element alongside `relative` and `overflow-hidden`.

### 1c. Starfield (Static Dots)

9 layered radial-gradient dots at varying positions and sizes, each with its own background-size tile to avoid obvious repetition. Creates a sparse, realistic star scatter.

```css
.section::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(1px 1px at 17% 42%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1px 1px at 62% 18%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 83% 71%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 38% 86%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 71% 53%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 24% 12%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 91% 29%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1.5px 1.5px at 48% 35%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1.5px 1.5px at 79% 67%, rgba(255,255,255,0.40), transparent);
  background-size:
    277px 311px, 331px 263px, 263px 293px,
    293px 277px, 311px 331px, 349px 251px,
    251px 349px, 397px 367px, 367px 397px;
}
```

**Key details:**
- Standard dots are `1px`, accent dots are `1.5px`
- Opacities range 0.30–0.50
- Each tile has a unique prime-ish size (251–397px) to avoid visible tiling
- Uses the `::after` pseudo-element so it doesn't interfere with `::before` (noise texture)

**When to use:** Dark sections that want the space atmosphere. Vary the dot positions per section so adjacent sections don't mirror each other.

### 1d. Twinkling Stars (Animated)

A handful (3–5) of tiny dot elements with a pulsing opacity + glow animation. Adds subtle life to the starfield without being distracting.

```html
<div class="star-field" aria-hidden="true">
  <span class="twinkle-star" style="top:9%;left:22%;animation-duration:4.8s;animation-delay:0.5s"></span>
  <span class="twinkle-star" style="top:38%;left:81%;animation-duration:5.3s;animation-delay:2.4s"></span>
  <!-- 2-3 more, scattered -->
</div>
```

```css
.star-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.twinkle-star {
  position: absolute;
  display: block;
  width: 1.5px;
  height: 1.5px;
  border-radius: 50%;
  background: white;
  opacity: 0.25;
  animation: twinkle ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; box-shadow: none; }
  50% { opacity: 0.85; box-shadow: 0 0 3px rgba(255,255,255,0.4); }
}

@media (prefers-reduced-motion: reduce) {
  .twinkle-star { animation: none; opacity: 0.4; }
}
```

**Key details:**
- Each star gets a unique `animation-duration` (4–6s) and `animation-delay` to avoid sync
- At peak, stars gain a tiny white `box-shadow` glow
- Keep count low (3–5 per section) — this is sparse, not busy

---

## 2. Glow & Lighting Effects

### 2a. Ambient Glow Orbs

Large, softly blurred elliptical gradients that float slowly, adding warm/cool atmospheric light pools. Uses the global `glow-orb` class.

```css
/* Base (global.css) */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  will-change: transform;
}
```

Applied inline per orb:

```html
<!-- Warm accent orb (coral) -->
<div class="glow-orb animate-float-slower"
  style="width: 500px; height: 350px; top: 10%; left: 10%;
         background: radial-gradient(ellipse, rgba(224, 104, 90, 0.08) 0%, transparent 70%);">
</div>

<!-- Cool neutral orb (blue-gray) -->
<div class="glow-orb animate-float-slow"
  style="width: 400px; height: 300px; bottom: 10%; right: 10%;
         background: radial-gradient(ellipse, rgba(150, 160, 180, 0.05) 0%, transparent 70%);">
</div>
```

**Key details:**
- Warm orbs use accent color at 0.06–0.08 opacity
- Cool orbs use blue-gray at 0.04–0.05 opacity
- Sizes 300–500px, `filter: blur(80px)` makes them extremely soft
- Place 2 orbs per section, opposite corners, different sizes
- Wrap in `<div class="absolute inset-0" aria-hidden="true">`

### 2b. Floating Orb Animations

Two speed tiers of gentle drift animation. The orbs translate and scale subtly over long durations.

```css
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(10px, -15px) scale(1.02); }
  66% { transform: translate(-8px, 8px) scale(0.98); }
}

@keyframes float-slower {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-12px, -10px) scale(1.03); }
}

.animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
.animate-float-slower { animation: float-slower 25s ease-in-out infinite; }
```

### 2c. Breathing Glow (Box-Shadow Pulse)

An animated `box-shadow` that gently oscillates between dim and bright, giving a "powered on" living feel to elevated elements.

```css
animation: glow-breathe 8s ease-in-out infinite;

@keyframes glow-breathe {
  0%, 100% {
    box-shadow:
      0 0 10px rgba(255, 255, 255, 0.10),
      0 0 28px rgba(255, 255, 255, 0.06),
      0 0 50px rgba(255, 255, 255, 0.03),
      0 4px 16px rgba(0, 0, 0, 0.2),
      0 12px 48px rgba(0, 0, 0, 0.15);
  }
  50% {
    box-shadow:
      0 0 14px rgba(255, 255, 255, 0.22),
      0 0 32px rgba(255, 255, 255, 0.14),
      0 0 56px rgba(255, 255, 255, 0.06),
      0 4px 16px rgba(0, 0, 0, 0.2),
      0 12px 48px rgba(0, 0, 0, 0.15);
  }
}
```

**Key details:**
- White glow layers oscillate; depth shadows stay constant
- 8-second cycle, `ease-in-out` for organic feel
- Disable under `prefers-reduced-motion: reduce`

**When to use:** Hero elements, featured containers, or any single focal-point element that should feel alive. Use sparingly — one per section at most.

### 2d. Neon Text Glow

Multi-layered `text-shadow` creating a neon sign effect on accent-colored text.

```css
color: var(--color-accent);
text-shadow:
  0 0 4px rgba(224, 104, 90, 0.9),
  0 0 12px rgba(224, 104, 90, 0.7),
  0 0 24px rgba(224, 104, 90, 0.4),
  0 0 48px rgba(224, 104, 90, 0.2);
```

**When to use:** Small branded labels, badges, or emphasis text. Not for body text or headings.

### 2e. Accent Gradient Glow Line

A gradient line that fades from transparent → accent → transparent, with a soft glow.

```css
height: 1px;
background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
box-shadow: 0 0 6px rgba(224, 104, 90, 0.3);
```

**When to use:** Section dividers, decorative separators within heading areas.

---

## 3. Glass Morphism Treatments

### 3a. Standard Glass Card

The base glass card for dark sections. Semi-transparent background with blurred backdrop and a top-edge inner highlight.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 0 0 transparent;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(224, 104, 90, 0.2);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(224, 104, 90, 0.1);
  transform: translateY(-2px);
}
```

**Key details:**
- `inset 0 1px 0` creates a subtle top-edge light reflection
- Hover lifts 2px and reveals an accent border tint
- Transition uses `cubic-bezier(0.4, 0, 0.2, 1)` (Material ease-out)

### 3b. Animated Glass Entrance

Glass panels that start fully clear and animate in their blur + background when they become active or visible. Creates a "materializing" effect.

```css
/* Initial state — clear */
.panel {
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 12px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
  background: rgba(10, 14, 24, 0);
  backdrop-filter: blur(0px);
}

/* Activated — glass fades in */
.panel-active {
  animation: glassIn 0.5s ease-out forwards;
}

/* Stagger children */
.panel-active:nth-child(1) { animation-delay: 0.05s; }
.panel-active:nth-child(2) { animation-delay: 0.15s; }
.panel-active:nth-child(3) { animation-delay: 0.25s; }

@keyframes glassIn {
  from {
    background: rgba(10, 14, 24, 0);
    backdrop-filter: blur(0px);
  }
  to {
    background: rgba(10, 14, 24, 0.45);
    backdrop-filter: blur(12px) saturate(1.2);
  }
}
```

**Reduced motion fallback:**
```css
@media (prefers-reduced-motion: reduce) {
  .panel-active {
    animation: none;
    background: rgba(10, 14, 24, 0.45);
    backdrop-filter: blur(12px) saturate(1.2);
  }
}
```

**When to use:** Tabbed interfaces, phased content, or any element that appears dynamically on a dark background with a visible image or pattern behind it.

### 3c. Glass Frame (Double-Line Bevel)

A wrapper that creates a "glass picture frame" effect — two thin bright border lines separated by a frosted channel.

```css
/* Outer frame */
.frame {
  border-radius: 18px;
  padding: 4px;                              /* gap between outer and inner line */
  background: rgba(120, 130, 150, 0.12);     /* frosted gray channel fill */
  border: 1px solid rgba(255, 255, 255, 0.09); /* outer highlight line */
  backdrop-filter: blur(10px);
}

/* Inner content */
.frame-inner {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06); /* inner highlight line (dimmer) */
  background: #0c1022;
}
```

**Key details:**
- Outer border is brighter (0.09), inner is dimmer (0.06)
- The 4px `padding` creates the frosted channel between them
- Channel fill is blue-gray at very low opacity with backdrop-blur

### 3d. Glass Toolbar / Chrome Bar

Used for top bars, nav bars, or chrome strips within glass containers.

```css
.toolbar {
  background: rgba(15, 20, 30, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px) saturate(1.2);
}
```

**Variation — heavier glass (menu bar):**
```css
background: rgba(30, 34, 44, 0.85);
backdrop-filter: blur(24px) saturate(1.3);
```

---

## 4. Elevation & Depth

### 4a. Z-Index Layering (Dark Sections)

Depth stack for dark sections, from back to front:

| Layer | z-index | Contents |
|-------|---------|----------|
| Background | auto | Section `background-color` |
| Starfield | 0 | `::after` pseudo with star dots |
| Noise texture | auto (pseudo) | `::before` from `.noise-texture` |
| Glow orbs | auto | Absolutely positioned, `filter: blur(80px)` |
| Section dividers | auto | Top/bottom gradient lines |
| Content | 1 | The `relative z-1` content wrapper |

### 4b. Multi-Layer Box Shadows

Elevated dark elements use a combination of white glow layers (presence/light) and black depth layers (shadow/weight):

```css
box-shadow:
  /* White glow — ambient light presence */
  0 0 10px rgba(255, 255, 255, 0.12),
  0 0 28px rgba(255, 255, 255, 0.08),
  0 0 50px rgba(255, 255, 255, 0.04),
  /* Black depth — grounding weight */
  0 4px 16px rgba(0, 0, 0, 0.2),
  0 12px 48px rgba(0, 0, 0, 0.15);
```

**When to use:** Primary focal containers on dark backgrounds. The white glow makes them "float" while black shadows anchor them.

### 4c. Elevated Card (Light Sections)

For comparison — the light-section equivalent uses layered black shadows only:

```css
.elevated-card {
  background: var(--color-white);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.02),
    0 1px 2px rgba(0, 0, 0, 0.03),
    0 4px 12px rgba(0, 0, 0, 0.04);
}

.elevated-card:hover {
  border-color: rgba(224, 104, 90, 0.15);
  box-shadow:
    0 0 0 1px rgba(224, 104, 90, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.06),
    0 16px 40px rgba(0, 0, 0, 0.08);
  transform: translateY(-3px);
}
```

### 4d. Top-Edge Glow Line

A gradient line positioned at the top of a container to simulate "lit from above":

```css
.container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(224, 104, 90, 0.4), transparent);
  z-index: 2;
}
```

---

## 5. Color Application on Dark Backgrounds

### 5a. Design Token Palette

```css
/* Dark backgrounds */
--color-dark: #151A23;            /* Default dark bg */
/* Section-specific: #07080a      (deep space variant) */

/* Accent */
--color-accent: #E0685A;          /* Coral — CTAs, highlights, active states */
--color-accent-hover: #C85A4E;    /* Darker coral for hover */
--color-accent-glow: rgba(224, 104, 90, 0.15);

/* Text on dark */
--color-dark-text: #EDF0F5;       /* Primary text (near-white) */
--color-dark-text-secondary: #96A0B4; /* Secondary text (muted blue-gray) */

/* Borders on dark */
--color-border-glass: rgba(255, 255, 255, 0.07);
```

### 5b. Accent Color Usage

The accent coral (`#E0685A` / `rgba(224,104,90,…)`) appears at many opacity tiers:

| Opacity | Usage |
|---------|-------|
| 1.0 | Text labels, active tab text, CTA buttons |
| 0.3–0.4 | Gradient lines, bar fills, glow shadows |
| 0.1–0.25 | Active tab background, architectural box borders, indicator backgrounds |
| 0.06–0.08 | Ambient orbs, section dividers, hover border tints |

**Gradient fills:** Accent bars use a gradient from the base coral to a lighter peach for depth:
```css
background: linear-gradient(90deg, var(--color-accent), #f0917e);
box-shadow: 0 0 6px rgba(224, 104, 90, 0.3);
```

### 5c. Status / Data Colors

Green is the primary status color, tuned for dark backgrounds with a glow:

```css
/* Status dot */
background: #34d058;
box-shadow: 0 0 8px rgba(52, 208, 88, 0.5), 0 0 16px rgba(52, 208, 88, 0.2);

/* Status text */
color: #34d058;
text-shadow: 0 0 8px rgba(52, 208, 88, 0.3);

/* Checkmark */
color: #34d058;
text-shadow: 0 0 8px rgba(52, 208, 88, 0.4);
```

**Other indicator colors used inline:** `#34d058` (green — success), `#f0917e` (salmon — warning), `var(--color-accent)` (coral — emphasis).

### 5d. Color Indicator Dots

Small colored dots with a `currentColor` glow for findings/status lists:

```css
.indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 6px currentColor;
}
```

---

## 6. Typography on Dark Sections

### 6a. Section Heading

```css
font-size: 1.875rem;          /* mobile */
font-size: 2.25rem;           /* md (768px+) */
font-size: 2.75rem;           /* lg (1024px+) */
font-weight: 700 (bold);
line-height: 1.15;
letter-spacing: -0.025em;
text-wrap: balance;
```

**Color on dark:** `#B0C0D4` (soft blue-silver) instead of the default near-white `#EDF0F5`. This creates a starlight-tinted feel.

**When to use the tinted heading:** Dark sections with the space/starfield theme. Override via scoped CSS:
```css
.section :global(h2) {
  color: #B0C0D4;
}
```

### 6b. Section Subtitle

```css
font-size: 1rem;              /* base */
font-size: 1.125rem;          /* lg */
line-height: 1.65;
color: var(--color-dark-text-secondary); /* #96A0B4 */
max-width: 36rem;
```

### 6c. Text Hierarchy on Dark / Glass Surfaces

| Level | Color | Opacity | Usage |
|-------|-------|---------|-------|
| Primary | `var(--color-dark-text)` / `#EDF0F5` | 1.0 | Headings, stat values, emphasized text |
| Secondary | `var(--color-dark-text-secondary)` / `#96A0B4` | 1.0 | Body text, descriptions, labels |
| Muted | `rgba(255, 255, 255, 0.45)` | — | Inactive tabs, tertiary info |
| Dim | `rgba(255, 255, 255, 0.3)` | — | Timestamps, decorative text |

### 6d. Accent Data Values

Large numeric values use accent color with a subtle glow:

```css
font-size: 20px;
font-weight: 700;
color: var(--color-accent);
line-height: 1.2;
text-shadow: 0 0 12px rgba(224, 104, 90, 0.3);
```

### 6e. Micro Labels

Tiny uppercase labels for panel headers, categories:

```css
font-size: 9px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.08em;
color: rgba(255, 255, 255, 0.35);
```

### 6f. Monospace / Code Font

```css
font-family: var(--font-mono);
/* Resolves to: "Noto Sans Mono", "Menlo", "Monaco", "Courier New", monospace */
```

**Important:** Always use the `--font-mono` CSS variable, never write the font names directly in scoped styles. Astro's CSS minifier strips quotes from multi-word font names, breaking resolution. The variable preserves quotes through the build.

---

## 7. Borders & Dividers

### 7a. Glass Surface Borders

```css
/* Standard glass border */
border: 1px solid rgba(255, 255, 255, 0.07);

/* Slightly brighter for outer frames */
border: 1px solid rgba(255, 255, 255, 0.09);

/* Dimmer for inner/nested borders */
border: 1px solid rgba(255, 255, 255, 0.06);

/* Separator lines within surfaces */
border-bottom: 1px solid rgba(255, 255, 255, 0.04);
```

### 7b. Section Dividers

Placed at the top and bottom of dark sections as horizontal gradient lines:

```css
.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent) 30%, var(--color-accent) 70%, transparent);
  opacity: 0.2;
}
```

```html
<div class="absolute top-0 left-0 right-0 section-divider" aria-hidden="true"></div>
<div class="absolute bottom-0 left-0 right-0 section-divider" aria-hidden="true"></div>
```

### 7c. Branded Section Heading Divider

The "NLX labs" branded divider used above section titles:

```html
<div class="flex items-center gap-0 justify-center" aria-hidden="true">
  <div class="section-divider-line"></div>
  <span class="section-divider-label">NLX labs</span>
  <div class="section-divider-line"></div>
</div>
```

```css
.section-divider-line {
  flex: 1;
  max-width: 180px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
  box-shadow: 0 0 6px rgba(224, 104, 90, 0.3);
}

.section-divider-label {
  flex-shrink: 0;
  padding: 0 16px;
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  text-shadow:
    0 0 4px rgba(224, 104, 90, 0.9),
    0 0 12px rgba(224, 104, 90, 0.7),
    0 0 24px rgba(224, 104, 90, 0.4),
    0 0 48px rgba(224, 104, 90, 0.2);
}
```

### 7d. Accent Border Highlight on Hover/Active

Interactive elements reveal an accent-tinted border on hover or when active:

```css
/* Hover */
border-color: rgba(224, 104, 90, 0.2);

/* Active state */
border: 1px solid rgba(224, 104, 90, 0.25);
background: rgba(224, 104, 90, 0.1);
```

---

## 8. Animation & Motion Patterns

### 8a. Scroll Reveal — Fade Up

Primary scroll animation for section content. Uses GSAP + ScrollTrigger.

```
Attribute: data-animate="fade-up"
Start state: { y: 24, opacity: 0 }
End state:   { y: 0, opacity: 1 }
Duration: 0.6s
Easing: power3.out
Trigger: top 85% of viewport
Fires once: true
```

### 8b. Scroll Reveal — Stagger Cards

For grid containers where children animate in sequence:

```
Attribute: data-animate="stagger-cards"
Start state: { y: 24, opacity: 0 }
End state:   { y: 0, opacity: 1 }
Duration: 0.5s per card
Stagger: 0.1s between cards
Easing: power3.out
Trigger: top 80% of viewport
Fires once: true
```

### 8c. Scroll Reveal — Fade In

Simple opacity reveal without vertical movement:

```
Attribute: data-animate="fade-in"
Start state: { opacity: 0 }
End state:   { opacity: 1 }
Duration: 0.8s
Easing: power2.out
Trigger: top 85% of viewport
Fires once: true
```

### 8d. Pre-Animation Flash Prevention

CSS sets initial `opacity: 0` on animated elements to prevent a flash of content before GSAP runs:

```css
[data-animate="fade-in"],
[data-animate="stagger-cards"] > * {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  [data-animate="fade-in"],
  [data-animate="stagger-cards"] > * {
    opacity: 1;
  }
}
```

**Important:** When using CSS `opacity: 0` for flash prevention, always use GSAP's `fromTo()` (not `from()`), because `from()` reads the current CSS state as the target, resulting in 0→0 (no visible animation).

### 8e. Hover Transitions

All interactive cards/surfaces use the same transition curve:

```css
transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
```

Typical hover transforms: `translateY(-2px)` for glass cards, `translateY(-3px)` for elevated cards.

### 8f. Content Phase Transition

When swapping content (e.g., tabs), a quick fade+slide:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

animation: fadeIn 0.3s ease-out;
```

### 8g. Cursor Blink

For terminal/code elements:

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

animation: blink 1s step-end infinite;
```

### 8h. Reduced Motion — Global Policy

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Additionally, GSAP `initAnimations()` checks `prefers-reduced-motion` and immediately sets all animated elements to their final visible state without animation.

---

## 9. Spacing Patterns

### 9a. Section Padding

```css
/* Mobile */
padding-top: 4rem;      /* pt-16 */
padding-bottom: 6rem;   /* pb-24 */
padding-inline: 1.5rem; /* px-6 */

/* Desktop (lg / 1024px+) */
padding-top: 6rem;      /* lg:pt-24 */
padding-bottom: 9rem;   /* lg:pb-36 */
padding-inline: 3rem;   /* lg:px-12 */
```

### 9b. Content Container

```css
max-width: 72rem;  /* max-w-[72rem] — 1152px */
margin: 0 auto;
position: relative;
z-index: 1;        /* above backgrounds and glow orbs */
```

### 9c. Section Heading Spacing

```css
margin-bottom: 3.5rem;   /* mb-14 */
/* lg */
margin-bottom: 5rem;     /* lg:mb-20 */
```

The branded divider sits `margin-bottom: 1.5rem` (`mb-6`) above the heading text.

Subtitle has `margin-top: 1.25rem` (`mt-5`) below the heading.

### 9d. Glass Panel Internal Spacing

```css
padding: 12px;           /* desktop */
padding: 10px;           /* tablet (≤1024px) */
gap: 10px;               /* between panels in grid */
gap: 8px;                /* tablet/mobile */
```

---

## 10. Dark Section Template

A ready-to-use structural template for any new dark section:

```astro
<section class="relative pt-16 pb-24 lg:pt-24 lg:pb-36 px-6 lg:px-12 overflow-hidden noise-texture" style="background:#07080a">
  <!-- Ambient glow orbs -->
  <div class="absolute inset-0" aria-hidden="true">
    <div class="glow-orb animate-float-slower"
      style="width: 500px; height: 350px; top: 10%; left: 10%;
             background: radial-gradient(ellipse, rgba(224, 104, 90, 0.08) 0%, transparent 70%);">
    </div>
    <div class="glow-orb animate-float-slow"
      style="width: 400px; height: 300px; bottom: 10%; right: 10%;
             background: radial-gradient(ellipse, rgba(150, 160, 180, 0.05) 0%, transparent 70%);">
    </div>
  </div>

  <!-- Top divider -->
  <div class="absolute top-0 left-0 right-0 section-divider" aria-hidden="true"></div>

  <!-- Content -->
  <div class="relative z-1 mx-auto max-w-[72rem]">
    <SectionHeading title={t.title} subtitle={t.subtitle} dark accent />
    <!-- Section content here -->
  </div>

  <!-- Bottom divider -->
  <div class="absolute bottom-0 left-0 right-0 section-divider" aria-hidden="true"></div>
</section>
```

Add the starfield `::after` and twinkling stars per section as needed via scoped `<style>` blocks, varying dot positions to avoid repetition between adjacent dark sections.
