---
paths:
  - src/**
  - "*.astro"
---

# Accessibility (IS 5568 / WCAG 2.0 Level AA)

This site serves Israeli users and must conform to Israeli Standard **IS 5568** at Level AA (which equals WCAG 2.0 AA). Non-conformance carries statutory damages up to NIS 50,000 per violation — the plaintiff does not have to prove harm. Treat every UI change as a compliance change.

## Hard rules (NEVER / ALWAYS)

- **NEVER** use color alone to convey meaning. Always pair with text, icon, or pattern.
- **NEVER** set `outline: none` or `focus:outline-none` without a visible focus replacement. The global `:focus-visible` ring lives in `src/styles/global.css`.
- **NEVER** add an accessibility-overlay widget (accessiBe, EqualWeb, UserWay, etc.). These are widely criticized by the disability community and create more problems than they solve. Build a11y in, don't bolt it on.
- **NEVER** ship an interactive element without an accessible name. Buttons, links, and form inputs all need either visible text, `aria-label`, or `aria-labelledby`.
- **NEVER** use `<div onclick>` for actions. Use `<button>`. Use `<a>` only when navigating.
- **ALWAYS** pair decorative SVGs and Lucide icons with `aria-hidden="true"` and `focusable="false"` when sitting inside a labeled control. Icon-only buttons need `aria-label`.
- **ALWAYS** use semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` with a heading.
- **ALWAYS** keep one `<h1>` per page and never skip heading levels.
- **ALWAYS** label form inputs with `<label for>`. Required inputs get `aria-required="true"` and a visible asterisk (`<span aria-hidden="true">*</span>`).
- **ALWAYS** announce form success/error via `aria-live="polite"` (success) or `role="alert"` (error) wrapped containers.
- **ALWAYS** honor `prefers-reduced-motion` — every CSS animation and JS-driven motion must short-circuit when reduced motion is requested. Existing pattern: `animations.ts` and CSS `@media (prefers-reduced-motion: reduce)` blocks.
- **ALWAYS** keep touch targets ≥ 44×44 px (icon buttons especially).
- **ALWAYS** test in both `/` (EN, LTR) and `/he/` (HE, RTL) before claiming done.

## Color token cheat sheet (AA-compliant against the surface they're used on)

| Token | Hex | Use on | Contrast |
|---|---|---|---|
| `--color-text-primary` | `#1E252F` | white / light-bg | ✓ AAA |
| `--color-text-secondary` | `#5C6878` | white / light-bg | ✓ AA (5.7 / 5.3) |
| `--color-dark-text` | `#EDF0F5` | dark / dark-surface | ✓ AAA |
| `--color-dark-text-secondary` | `#B4BCCC` | dark / dark-surface | ✓ AA (~10:1) |
| `--color-accent` | `#E0685A` | white bg (text) | ✓ AA large only — do not use for body text on white |
| white | `#FFFFFF` | accent bg (button) | ✓ AA (~5.9 on `#E0685A`) |

Do not introduce new gray tokens without checking contrast against both `#FFFFFF` and `#07080a`. If you must use opacity (`text-white/60`), keep it ≥ 75% on dark surfaces; below that fails AA.

## Pre-merge checklist (8 items)

Before merging UI changes:

1. **Semantic** — landmarks present, heading order intact, no nested interactive elements.
2. **Alt / ARIA** — all images have meaningful or empty `alt`; decorative icons have `aria-hidden="true"`.
3. **Color contrast** — DevTools shows AA on every changed text/background pair.
4. **Focus** — Tab reaches every interactive element in visual order; outline visible on every focused element.
5. **Keyboard** — every action achievable without a mouse; modals/menus trap focus and Esc closes them; tabs respond to Arrow keys.
6. **Forms** — labels, `aria-required`, error IDs match `aria-describedby`, success/error in live regions.
7. **Motion** — `prefers-reduced-motion: reduce` disables every animation; no motion-induced flashing.
8. **RTL** — visit `/he/...` and verify no hardcoded `left`/`right` breaks layout; foreign-language words in Hebrew get inline `lang="en"`.

## Verification commands

```bash
npm run build           # must pass with zero errors
npx astro check         # TS + Astro diagnostics
npm run preview         # then run Lighthouse on http://localhost:4321/ and /he/ — a11y score ≥ 95
```

For the manual keyboard pass: load the page, press Tab from the URL bar, verify the skip-link appears first, Enter focuses `#main-content`, continue through the page.

## Accessibility statement (legal requirement)

- Lives at `/accessibility` (EN) and `/he/accessibility` (HE), content in `src/i18n/{en,he}.json` under `accessibility.content`.
- Names the accessibility coordinator (Yonatan Tal, `contact@nlxlabs.co.il`, +972-50-992-7121).
- Lists actual arrangements, testing methodology, known limitations, last-review date.
- Update the date whenever you change content materially (not for typos). Update the "Known limitations" section if a new pattern is added that has caveats.
- Reference the strict legal claim: **IS 5568 / WCAG 2.0 Level AA**. Do not upgrade to "WCAG 2.1" or "AAA" without re-auditing everything those criteria require.

## Anti-patterns to reject

- Floating accessibility widgets / toolbars / font-size buttons (browser zoom handles font-size).
- Color-only error states (`border-red` with no text or icon).
- `aria-hidden="true"` on a focusable element (creates a focus trap into invisible content).
- `tabindex` values greater than 0 (breaks tab order).
- Placeholder text as a label substitute.
- Auto-playing audio or video.
- Inaccessible custom controls re-invented when a native element exists.
