# Design

## Concept

HBO Max 2025 Rewind — a mobile-only, tap-through experience that surfaces a user's year-in-review stats. 8 sequential screens, each with a single focused stat or visual. Dark, cinematic aesthetic consistent with HBO Max branding.

---

## Viewport

Fixed at **393 × 852px** (iPhone 15 Pro) rendered inside a dark `#0f0f0f` page with rounded corners (`border-radius: 40px`). Desktop visitors see the phone frame centered against the dark background. No responsive breakpoints.

---

## Color

| Role | Value |
|------|-------|
| Page background | `#0f0f0f` |
| Text — primary | `#ffffff` |
| Text — secondary | `#cccccc` |
| Text — tertiary | `rgba(255,255,255,0.5)` |
| Surface / card | `#25272d` |
| Border | `#1b1b1b`, `rgba(204,204,204,0.8)` |
| Accent blue | `#00305C` / `#00315F` |
| Accent purple | `#40137A` |
| Accent magenta | `#7A1363` |

Gradient blobs (large radial `<svg>` shapes with feColorMatrix + feBlend filters) provide ambient color in the background of most screens. They appear as soft pools of deep blue and purple on the near-black background, giving depth without hard shapes.

Gradient text appears on large display numbers: white-to-gray fade using `background-clip: text`.

---

## Typography

| Font | Weight | Usage |
|------|--------|-------|
| Alfa Slab One | Regular | Large display numbers (80–120px), the "2025" hero text |
| Proxima Nova | Regular / Bold | All body copy, labels, screen titles (14–28px) |
| SF Pro Display | Medium | Status bar time and icons (16px) |

Font strings are applied as inline Tailwind utilities: `font-['Alfa_Slab_One:400']`.

Text sizes use Tailwind arbitrary values (`text-[80px]`). Line heights are explicit (`leading-[133%]`, `leading-[28px]`).

---

## Layout Approach

All layout is absolute-positioned within the 393 × 852px frame. Figma Make exports exact pixel coordinates:

```
top-[64px] left-[calc(50%-149px)]
```

Centering uses `left-[calc(50%-Xpx)]` or the `translate-x-[-50%]` pattern. There is no flexbox or grid at the page layout level — only within small isolated components like lists or button groups.

---

## Screen-by-Screen

### Frame 1 — Welcome
- Circular profile photo (144px) centered with spring scale-in
- "Hey Wilson!" greeting + subtitle
- Hero "2025" text at 120px in white-to-gray gradient, spring entrance (delay 1.1s)
- HBO Max quilt image as background with dark gradient overlay
- "Rewind" label + icon fades in last (delay 1.2s)

### Frame 2 — Watch Time
- Animated count-up number: **17,382** at 80px Alfa Slab One (0 → 17,382 over 1.2s)
- Stat copy: minutes watched, 42 movies, 183 episodes
- Three movie posters in a fan arrangement: left tilted +8°, center straight, right tilted −18°
- Posters rotate in from ±20° on entrance (cascade: 1.5s, 1.7s, 1.9s)

### Frame 3 — Top Show
- Full-bleed feature for **Game of Thrones**
- 298 × 298px poster with 3D flip entrance (`rotateY: 90° → 0`)
- Tagline: "You watched 54 episodes. We get it. We love John Snow too."
- Background blobs fill top + bottom edges

### Frame 4 — Top 5 Shows
- Ranked list: Game of Thrones, Succession, Silicon Valley, The White Lotus, Friends
- Each row: rank number, show poster, title, episode count
- Rows slide in from the left in a cascade (0.6s + index × 0.15s)
- "Top 5 shows" title in a white badge, swap icon animates −180° → 0 on enter

### Frame 5 — Achievement Badge
- Badge: **"Binge Watching Warrior"** on white pill background, scales in with spring
- Supporting illustration (240 × 249px)
- Stat: "You finished the first season of Succession in just 3 days"
- Tagline: "No days off in the Roy family"
- Decorative SVG lines in bottom half

### Frame 6 — Top Genres
- Vertical bar chart (3 bars, grow from height 0):
  - Sci-Fi — 240px tall, purple border
  - Drama — 272px tall (tallest), blue border, rank #1
  - Action — 240px tall, purple border
- Bars animate up sequentially (0.5s + index × 0.2s)
- Bottom glow: polygon SVG with multiple drop-shadows
- Copy: "You came for the action. You stayed for the drama."

### Frame 7 — Household Comparison
- Horizontal bar chart (3 bars, grow from width 0):
  - Mom — 24,897 min (longest)
  - Wilson — 17,382 min
  - Oliver — 14,631 min
- Each bar is 80px tall, `#25272d`, with a profile photo at the trailing edge
- Custom per-bar border-radius values from Figma (84px, 105px, 84px)
- Copy: "You weren't alone on the couch. Did Mom hog the remote?"

### Frame 8 — Summary + Share
- Large rotated "2025" text (96px, 270° rotation) on left edge
- Center show poster (264 × 264px) with 3D scale entrance
- Two-column lists:
  - Left: Top 5 Shows
  - Right: Top 5 Movies (Harry Potter, Dune, Batman Begins, Inception, Kingsman)
- Stat boxes: "Minutes Watched / 17,382" and "Top Genre / Drama"
- Two CTA buttons:
  - **Share** (white bg, black text, share icon)
  - **Your 2026 Picks** (dark border, white text, arrow icon)
- Lists cascade from their respective sides; buttons spring in last (1.6s, 1.7s)

---

## Shared Visual Patterns

**Background blobs** — every screen uses large `<svg>` elements with `feColorMatrix`, `feBlend`, and `feComposite` filters to create soft ambient color. They are always positioned outside the content area (top-left, bottom-right corners) and never compete with text.

**Gradient overlays** — semi-transparent `div` layers with `bg-gradient-to-b from-[#0f0f0f] to-transparent` mask the top and bottom of background images to blend them into the dark background.

**Decorative SVG lines** — thin, low-opacity curved paths appear in Frame 5 and Frame 8 as atmospheric texture.

**Depth via blur** — `blur-[24.8px]` and `backdrop-blur` on certain background elements push them visually behind content.

---

## Progress Indicator

8 thin bar segments across the top of the screen. Current segment is bright; completed are full-white; upcoming are dim. Provides orientation without being intrusive.

---

## Motion System

All animation runs through Framer Motion (`motion/react`). No CSS transitions, no keyframe animations — everything uses spring physics or explicit tween durations.

### Animation Patterns

**1. Fade + slide-up** — the default entrance for text, labels, and secondary content
```js
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: X, duration: 0.6 }}
```
Use `y: 30` for more dramatic content, `y: -20` for top-down entries (e.g. titles sliding down from above).

**2. Scale pop** — profile photos, badges, icons, small UI elements
```js
initial={{ scale: 0, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ delay: X, type: "spring", stiffness: 200, damping: 15 }}
```

**3. 3D flip** — poster/card reveal (Frame 3, Frame 8 hero)
```js
initial={{ opacity: 0, scale: 0.6, rotateY: 90 }}
animate={{ opacity: 1, scale: 1, rotateY: 0 }}
transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 100 }}
```

**4. Bar grow — vertical** — genre chart bars (Frame 6)
```js
initial={{ height: 0, opacity: 0 }}
animate={{ height: targetPx, opacity: 1 }}
transition={{ delay: 0.5 + index * 0.2, duration: 0.8, type: "spring", stiffness: 120, damping: 12 }}
```
Top-ranked bar: `stiffness: 120, damping: 12`. Other bars: `stiffness: 100, damping: 15`.

**5. Bar grow — horizontal** — household comparison bars (Frame 7)
```js
initial={{ width: 0, opacity: 0 }}
animate={{ width: targetPx, opacity: 1 }}
transition={{ delay: 0.5 + index * 0.2, duration: 0.6, ease: "easeOut" }}
```
Note: uses tween + `ease: "easeOut"`, not spring — horizontal bars feel better with a clean decel.

**6. Background blob entrance** — always the same, always behind everything
```js
initial={{ opacity: 0, scale: 1.5 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 1.5, ease: "easeOut" }}
```
Blobs enter slowly and from a larger scale so they feel atmospheric, not interactive.

### Delay Ladder

Every frame orchestrates its own staggered entrance using this ladder:

| Window | Content |
|--------|---------|
| 0.0–0.2s | Background blobs, status bar, section header/title |
| 0.3–0.5s | Primary content — hero poster, badge, chart base |
| 0.6–0.8s | Secondary elements — supporting stats, taglines |
| 0.9–1.1s | Supporting text, list item onset |
| 1.2–1.9s | Cascade tail, tertiary items, CTA buttons |

For cascading lists use `delay: base + index * 0.15` (tight, like Frame 4 show rows) or `delay: base + index * 0.2` (loose, like bar charts).

### Duration Reference

| Use | Duration | Type |
|-----|----------|------|
| Quick opacity reveal | 0.5s | tween |
| Standard fade+slide | 0.6s | tween |
| Chart bar grow | 0.6–0.8s | spring or tween |
| Poster/hero spring | 1.0s | spring |
| Background blobs | 1.5s | ease-out tween |

### Spring Parameter Reference

| Use | stiffness | damping |
|-----|-----------|---------|
| Gentle content, poster | 100 | 15 |
| Chart bars (ranked) | 120 | 12 |
| Supporting scale-in | 150 | — |
| Badge/avatar pop | 200 | 15 |

### What Not to Do

- No `ease-in-out` for entrances — it feels webby. Use springs or `ease-out`.
- No CSS `transition:` properties on frame-level elements.
- Don't animate blobs with spring — they're atmospheric, not reactive.
- Don't give every element the same delay — the stagger ladder is what makes frames feel orchestrated.

---

## Spacing

All layout is absolute-positioned to pixel-exact Figma coordinates. Spacing "tokens" below reflect constants that recur across frames — not a grid system.

### Content Column

The primary content column is **345px wide**, centered within the 393px frame:
```
left: calc(50% - 172.5px)   or   left-[calc(50%-172.5px)]
```
This gives 24px gutters on each side.

### Vertical Zones

| Zone | Top offset | Contents |
|------|-----------|---------|
| Status bar | 18px | Clock, icons |
| Header | 64px | Frame title, navigation icons |
| Primary content onset | 168–236px | Hero stat, poster, badge |
| Body / list area | 236–680px | Ranked lists, charts, supporting copy |
| CTA / bottom | 720–810px | Buttons, share prompts |

### Recurring Gap Values

| Context | Value |
|---------|-------|
| List row gap (vertical) | `gap-[16px]` |
| Row interior gap (rank + content) | `gap-[24px]` |
| Tight detail gap (sub-labels) | `gap-[4px]` |
| Button icon gap | `gap-[8px]` |

### Padding Conventions

| Element | Padding |
|---------|---------|
| Pill CTA button | `px-[24px] py-[8px]` |
| Badge label | `px-[8px] py-[4px]` |

---

## Border Radius

Absolute-positioned layout means border-radius is applied per-element, not via a global scale. These are the values in active use:

| Element | Value | Notes |
|---------|-------|-------|
| Phone container | `40px` | Set in App.tsx |
| CTA / pill buttons | `80px` | Full pill — Frame 8 share/picks buttons |
| Profile avatar | `~189px` | Effectively circular for 144px element |
| Blob shapes | `300px`–`500px` | Amorphous, directional (e.g. `rounded-bl-[300px]`) |
| Horizontal bars (Frame 7) | Figma-exact values | 84px and 105px per bar — do not normalize |

The general rule: **more interactive elements use rounder radii**. Atmospheric/background elements use extreme values (300px+) to look organic. There is no mid-tier card radius — surfaces in frame context are full-bleed or use the Figma-exact value.

---

## Design Tokens (theme.css)

Uses oklch color space. Variables cover:
- `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- `--chart-1` through `--chart-5`
- `--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-xl`

These power the shadcn/ui component layer. The Frame components themselves use hardcoded hex/rgba values matching the Figma export — the token system is available but not yet wired to the frame-level design.
