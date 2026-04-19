# Architecture

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18.3.1 + TypeScript |
| Build tool | Vite 6.3.5 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Animations | Framer Motion (`motion/react` v12) |
| UI primitives | shadcn/ui + Radix UI |
| Package manager | pnpm |

Exported from Figma Make. No backend, no routing library, no global state manager.

---

## File Structure

```
hbo-rewind/
├── index.html                    # Root HTML, mounts React app
├── vite.config.ts                # Vite config + Figma asset resolver plugin
├── src/
│   ├── main.tsx                  # ReactDOM entry point
│   ├── app/
│   │   ├── App.tsx               # Root component — frame router + nav logic
│   │   └── components/
│   │       ├── Frame1.tsx        # Screen 1 — Intro / Welcome
│   │       ├── Frame2.tsx        # Screen 2 — Total watch time
│   │       ├── Frame3.tsx        # Screen 3 — Top show feature
│   │       ├── Frame4.tsx        # Screen 4 — Top 5 shows list
│   │       ├── Frame5.tsx        # Screen 5 — Achievement badge
│   │       ├── Frame6.tsx        # Screen 6 — Top genres bar chart
│   │       ├── Frame7.tsx        # Screen 7 — Household comparison
│   │       ├── Frame8.tsx        # Screen 8 — Summary + share
│   │       ├── ProgressIndicator.tsx
│   │       ├── figma/
│   │       │   └── ImageWithFallback.tsx
│   │       └── ui/               # shadcn/ui components (button, card, etc.)
│   ├── imports/
│   │   ├── F1.tsx – F8.tsx       # Per-frame Figma-generated SVG/asset imports
│   │   └── svg-*.ts              # SVG path data for gradients, blobs, icons
│   ├── styles/
│   │   ├── index.css             # Main CSS entry
│   │   ├── tailwind.css          # Tailwind v4 directives
│   │   ├── theme.css             # CSS custom properties / design tokens
│   │   └── fonts.css             # Font declarations
│   └── assets/                   # 12 PNG images exported from Figma
```

---

## Navigation

`App.tsx` owns all navigation state. There is no router.

```
state: currentFrame (0–7), direction ("next" | "prev")
```

**Advancing:** tap the right 3/4 of the screen, or press `→` / `Space`  
**Going back:** tap the left 1/4 of the screen, or press `←`

The screen area is divided by two invisible overlapping `div` click zones layered above the frame content. The active frame is rendered inside a Framer Motion `AnimatePresence` block — when `currentFrame` changes, the outgoing frame exits and the incoming frame enters with a directional slide.

---

## Animation System

### Frame transitions (App.tsx)

Uses `AnimatePresence` with a `direction`-aware spring slide:

```ts
// enter from right (next) or left (prev)
initial: { x: direction === "next" ? "100%" : "-100%", opacity: 0, scale: 0.95 }
animate: { x: 0, opacity: 1, scale: 1 }
exit:    { x: direction === "next" ? "-100%" : "100%", opacity: 0, scale: 0.95 }
transition: { type: "spring", stiffness: 350, damping: 30 }
```

### Per-frame entrance animations

Every `Frame*.tsx` orchestrates its own staggered entrance using `motion.div` with incremental `delay` values:

| Delay range | Elements |
|------------|---------|
| 0.0 – 0.2s | Header / title |
| 0.3 – 0.5s | Primary content (image, big number) |
| 0.6 – 0.8s | Secondary elements |
| 0.9 – 1.1s | Supporting text |
| 1.2 – 1.9s | Tertiary items, buttons |

Common motion patterns:
- **Fade + slide up:** `y: 20→0`, `opacity: 0→1`
- **Scale pop:** `scale: 0.5→1` with spring
- **3D flip:** `rotateY: 90→0` for posters (Frame 3, 8)
- **Bar grow:** `height: 0→Xpx` or `width: 0→Xpx` for charts (Frame 6, 7)
- **Rotate in:** `rotate: ±20→final` for tilted poster cards (Frame 2)
- **Count-up:** `useMotionValue` + `useTransform` animating a number 0 → 17,382 (Frame 2)

---

## Asset Pipeline

Figma Make exports images as content-hashed PNGs into `src/assets/` and references them with a custom scheme:

```ts
import poster from "figma:asset/abc123.png"
```

`vite.config.ts` includes a custom **Figma asset resolver plugin** that rewrites these imports to `src/assets/<filename>.png` at build time. This is the only non-standard Vite behavior in the project.

SVG paths (gradient filters, blobs, decorative shapes) are stored as TypeScript string constants in `src/imports/svg-*.ts` and inlined into components rather than loaded as external files.

---

## Progress Indicator

`ProgressIndicator.tsx` receives `currentFrame` and renders 8 progress bar segments at the top of the screen. Active segment is highlighted; completed segments are full; upcoming segments are empty/dim. Positioned absolutely above the frame content.

---

## Key Constraints (Figma Make export)

- All layout is **pixel-exact absolute positioning** — `top-[Xpx]`, `left-[calc(50%-Xpx)]`, `inset-[...]`. No flexbox/grid at the page level.
- No media queries. The design targets a single fixed viewport: **393 × 852px** (iPhone 15 Pro dimensions).
- Font strings are inline Tailwind utilities: `font-['Proxima_Nova:400']`.
- Components are large monolithic files (200–500 lines each) — this is expected for Figma Make output.
