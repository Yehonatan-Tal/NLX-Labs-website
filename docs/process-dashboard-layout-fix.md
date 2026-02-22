# Task: Fix Layout and Visual Hierarchy in the Process Dashboard Section

## Problems to Fix

1. **Section title is too low** — there's too much top padding/margin above the "How We Work" heading. Reduce it so the section feels like it starts sooner when scrolling into view.

2. **The terminal description box is not prominent enough:**
   - The font is too small — both the phase title and the description text need to be significantly larger (phase title should feel like a heading, description should be comfortable reading size)
   - The terminal box visually blends into the dark background — it needs more contrast/presence
   - The left accent border should be thicker and more visible

3. **The terminal and dashboard feel like two disconnected elements.**

## Proposed Solution

Move the terminal/description area INSIDE the dashboard window component — position it as a prominent bar at the bottom of the dashboard, above the progress bar. This way the entire thing reads as one unified component:

```
┌─────────────────────────────────────────────┐
│ ● ● ●   01 Discovery  02 Design  03 Deploy │  ← tab bar
│─────────────────────────────────────────────│
│ $ nlx analyze --workflow client_ops █       │  ← command line
│─────────────────────────────────────────────│
│  WORKFLOW MAP  │ OPPORTUNITY    │  PROJECT   │
│                │ ANALYSIS       │  SCOPE     │  ← 3 panels
│                │                │            │
│─────────────────────────────────────────────│
│  > Discovery & Scoping                      │
│  We work closely with you to understand...  │  ← description (LARGE, prominent)
│─────────────────────────────────────────────│
│ ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← progress bar
└─────────────────────────────────────────────┘
```

## Specific Requirements

- The description area inside the dashboard should have a slightly different background shade (one step lighter than the panels area) so it stands out as its own zone
- Phase title: large, bold, with the accent-colored `>` prompt — should feel like a subheading (at least 1.25rem–1.5rem)
- Description text: comfortable reading size (at least 1rem–1.125rem), keep the code/mono font and typing effect
- Thick left accent border (3–4px) on the description zone
- Reduce the section's top padding so the heading appears higher
- Keep all existing functionality: typing effect, tab switching, auto-cycle, i18n, RTL support, responsive behavior, reduced motion handling
