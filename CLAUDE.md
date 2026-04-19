# HBO Rewind — Claude Guide

## What this is

HBO Max 2025 Rewind: a mobile-only, tap-through "year in review" experience. 8 sequential screens, each revealing a single viewing stat. Dark, cinematic aesthetic. No backend — all data is hardcoded.

## Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 + pnpm |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation | Framer Motion (`motion/react` v12) |
| UI primitives | shadcn/ui + Radix UI |

## Key architecture facts

- **No router.** `App.tsx` owns all navigation via `currentFrame` (0–7) + `direction` state.
- **No global state manager.** Each Frame component is self-contained.
- **Fixed viewport: 393 × 852px** (iPhone 15 Pro). No responsive breakpoints. All layout is absolute-positioned.
- Frames are monolithic files (200–500 lines) — this is expected for Figma Make output, don't refactor them apart.
- Figma asset imports use the custom scheme `import img from "figma:asset/abc123.png"` — the Vite plugin in `vite.config.ts` rewrites these to `src/assets/`. Don't change this.

## Design rules

- Background color: `#0f0f0f`. Phone container uses `rounded-[40px]`.
- **Dark, cinematic** — never add bright surfaces, harsh whites, or flat UI patterns.
- Background blobs are large `<svg>` elements with `feColorMatrix`/`feBlend` filters creating soft ambient color (deep blue/purple). Keep them in corners, never over text.
- Accent colors: blue `#00305C`, purple `#40137A`, magenta `#7A1363`. Use sparingly.
- Display font: **Alfa Slab One** (large numbers, hero text). Body: **Proxima Nova**.
- Font strings as inline Tailwind: `font-['Alfa_Slab_One:400']`, `font-['Proxima_Nova:400']`.
- Text sizes use arbitrary Tailwind values: `text-[80px]`, `leading-[133%]`.

## Animation conventions

- Every Frame orchestrates its own staggered entrance. Follow this delay ladder:
  - 0.0–0.2s → header/title
  - 0.3–0.5s → primary content
  - 0.6–0.8s → secondary elements
  - 0.9–1.1s → supporting text
  - 1.2–1.9s → tertiary items, buttons
- Standard patterns: fade+slide-up (`y: 20→0`), scale-pop (spring), 3D flip (`rotateY: 90→0`), bar-grow (`height/width: 0→Xpx`).
- Frame transitions in `App.tsx` use a spring slide: `stiffness: 350, damping: 30`.
- Don't add transitions that feel "webby" (ease-in-out opacity fades, CSS transitions). Keep everything Framer Motion with spring physics.


## What to avoid

- Don't introduce flexbox/grid at the page-layout level — it will break the pixel-exact Figma positioning.
- Don't add media queries or responsive logic.
- Don't wire shadcn design tokens to the Frame components — they use hardcoded hex values matching Figma. The token system is for shadcn UI primitives only.
- Don't split Frame files into sub-components unless explicitly asked — the monolithic structure is intentional.
- Don't add a routing library.
