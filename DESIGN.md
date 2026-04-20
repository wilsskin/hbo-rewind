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

### Typefaces

| Font | Weight(s) | Role |
|------|-----------|------|
| Alfa Slab One | Regular | Large display numbers (48–120px), hero "2025" text |
| Hanken Grotesk | Regular, Medium, Bold | All body copy, labels, screen titles |
| SF Pro Display | Medium | Status bar time only |

Font strings are applied as inline Tailwind utilities: `font-['Alfa_Slab_One:Regular',sans-serif]`, `font-['Hanken_Grotesk:Bold',sans-serif]`. Note: the project previously referenced Proxima Nova in early design docs; the codebase uses Hanken Grotesk throughout.

---

### Font Styles Reference

All sizes, weights, line heights, letter spacings, and colors documented from the actual component classes.

#### Display — Hero Number (Alfa Slab One)

| Name | Size | Weight | Line Height | Letter Spacing | Color | Used in |
|------|------|--------|-------------|----------------|-------|---------|
| Hero 2025 | 120px | Regular | normal | 2.4px | white→`#999` gradient | Frame 1 |
| Watch Count | 80px | Regular | 80px | 1.6px | white→`#999` gradient | Frame 2 |
| Rotated 2025 | 96px | Regular | 158px | 1.92px | `#d9d9d9`→`#737373` gradient | Frame 8 |
| Chart Rank #1 | 80px | Regular | 64px | — | white | Frame 6 |
| Chart Rank #2/#3 | 48px | Regular | 48px | — | `rgba(204,204,204,0.8)` | Frame 6 |

Tailwind class pattern: `font-['Alfa_Slab_One:Regular',sans-serif]`

---

#### Title — Screen Title (Hanken Grotesk Bold 28px)

| Property | Value |
|----------|-------|
| Size | 28px |
| Weight | Bold |
| Line height | 120% |
| Letter spacing | −0.02em |
| Color | `#ffffff` (primary) · `#cccccc` (show name, Frame 3) · `#25272d` (badge labels on white bg, Frames 4 & 5) |
| Used in | Frame 1 "Hey Wilson!", Frame 3 "Your top show" / "Game of Thrones", Frame 4 "Top 5 shows", Frame 5 "Binge Watching Warrior", Frame 6 "Your top genres", Frame 7 "How you stack up", Frame 8 stat values "17,382" / "Drama" |

Tailwind class pattern: `font-bold font-['Hanken_Grotesk:Bold',sans-serif] text-[28px] leading-[120%] tracking-[-0.02em]`

---

#### Label — Top Chrome / Section Header (Hanken Grotesk Bold 18px)

| Property | Value |
|----------|-------|
| Size | 18px |
| Weight | Bold |
| Line height | normal |
| Letter spacing | — |
| Color | `#ffffff` |
| Used in | "2025 Rewind" header label (all frames via TopChrome) |

Tailwind class pattern: `font-['Hanken_Grotesk:Bold',sans-serif] text-[18px] leading-[normal]`

---

#### Body — Supporting Copy (Hanken Grotesk Regular 18px)

| Property | Value |
|----------|-------|
| Size | 18px |
| Weight | Regular |
| Line height | 1.33 (133%) |
| Letter spacing | — |
| Color | `#cccccc` (secondary) · `#ffffff` (primary) |
| Used in | Taglines, supporting stats, body paragraphs (Frames 1–8) |

Tailwind class pattern: `font-['Hanken_Grotesk:Regular',sans-serif] text-[18px] leading-[1.33]`

Variant — stat micro-labels (Frame 8 "Minutes Watched" / "Top Genre"):  
`font-['Hanken_Grotesk:Regular',sans-serif] text-[18px] leading-[18px]` · color `#cccccc`

---

#### List Item — Show / Row Name (Hanken Grotesk Bold 18px)

| Property | Value |
|----------|-------|
| Size | 18px |
| Weight | Bold |
| Line height | 1.33 |
| Color | `#ffffff` |
| Used in | Frame 4 ranked list show names |

Tailwind class pattern: `font-['Hanken_Grotesk:Bold',sans-serif] text-[18px] leading-[1.33]`

---

#### Small Label (Hanken Grotesk Regular/Bold 16px)

| Variant | Size | Weight | Line Height | Color | Used in |
|---------|------|--------|-------------|-------|---------|
| Episode count / bar names | 16px | Regular | 18px | `#cccccc` | Frame 4 episode count, Frame 7 bar person labels |
| Swap / nav label | 16px | Regular | 16px | `#ffffff` | Frame 4 swap icon label |
| CTA button text | 16px | Bold | 1.15 | `#000000` (Share) · `#ffffff` (2026 Picks) | Frame 8 CTA buttons |

Tailwind class patterns:
- Regular: `font-['Hanken_Grotesk:Regular',sans-serif] text-[16px] leading-[18px]`
- Bold CTA: `font-['Hanken_Grotesk:Bold',sans-serif] text-[16px] leading-[1.15]`

---

#### UI — Status Bar Time (SF Pro Display Medium 16px)

| Property | Value |
|----------|-------|
| Size | 16px |
| Weight | Medium |
| Line height | 16px |
| Letter spacing | 0.2px |
| Color | `#ffffff` |
| Used in | "10:53" clock (all frames) |

Tailwind class pattern: `font-['SF_Pro_Display:Medium',sans-serif] text-[16px] leading-[16px] tracking-[0.2px]`

---

#### Accent — "Rewind" Badge Label (Hanken Grotesk Medium 18px)

| Property | Value |
|----------|-------|
| Size | 18px |
| Weight | Medium |
| Line height | 1.33 |
| Color | `rgba(255,255,255,0.5)` |
| Used in | Frame 1 "Rewind" badge below logo |

Tailwind class pattern: `font-['Hanken_Grotesk:Medium',sans-serif] text-[18px] leading-[1.33]`

---

### Typography Quick Reference

| Style name | Size | Weight | LH | LS | Font |
|------------|------|--------|----|----|------|
| Display Hero | 96–120px | Regular | normal | 1.6–2.4px | Alfa Slab One |
| Display Large | 80px | Regular | 80px | 1.6px | Alfa Slab One |
| Display Medium | 48px | Regular | 48px | — | Alfa Slab One |
| Screen Title | 28px | **Bold 700** | 120% | −0.02em | Hanken Grotesk |
| Section Header | 18px | **Bold** | normal | — | Hanken Grotesk |
| List Item Name | 18px | **Bold** | 1.33 | — | Hanken Grotesk |
| Body Copy | 18px | Regular | 1.33 | — | Hanken Grotesk |
| Stat Micro-label | 18px | Regular | 18px | — | Hanken Grotesk |
| Small Label | 16px | Regular | 18px | — | Hanken Grotesk |
| CTA Button | 16px | **Bold** | 1.15 | — | Hanken Grotesk |
| Status Bar | 16px | Medium | 16px | 0.2px | SF Pro Display |

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

## HBO Brand Motion Principles

These principles distinguish HBO's cinematic aesthetic from generic streaming UI. Every animation decision should pass the test: does this feel like a film, or does it feel like an app?

**Typography leads, always** — The hero stat or title is the *first* element to appear on every frame (delay ≤ 0.2s), not the last. Copy and context follow after. This mirrors how HBO title cards work: subject establishes itself before context arrives.

**Deliberate pacing** — HBO motion never rushes. Standard entrance durations are 600–900ms. Spring stiffness for content-level elements stays ≤ 150. Anything faster or bouncier reads as "app", not "cinema".

**Depth-push transitions** — Between-frame transitions feel like a film cut, not a carousel page-turn. The exiting frame scales down (0.92) and drifts slightly in its exit direction; the entering frame arrives from the side at 97% scale and settles to 100%. The asymmetry (small exit drift vs full-width entry) creates a "push away / new scene arrives" read.

**Ambient backgrounds are alive** — Background blobs must use a slow continuous rotation loop (`duration: 40–60s, repeat: Infinity, ease: "linear"`). Static blobs look like a screenshot. Two blobs should rotate at different speeds (e.g. 40s and 55s) and with offset delays so they never sync.

**Deep color stays deep** — Never introduce anything brighter than `#cccccc` for body text. The deep navy (`#00305C`), purple (`#40137A`), and magenta (`#7A1363`) accents exist only in blob gradients and occasional borders — never as solid fill on surfaces that compete with text.

**No visible overshoot on content** — Reserve spring overshoot (e.g. `[0.34, 1.56, 0.64, 1]`) for micro-feedback moments (landing pop, badge arrive). Content entrances use springs that settle cleanly: `stiffness: 80–120, damping: 15+`.

---

## Wrapped Experience Principles

What makes Spotify Wrapped, LinkedIn Year in Review, and similar stat-reveal experiences feel satisfying — and how to apply that here.

**The two-act reveal** — Every stat frame has two acts: (1) the number lands alone, big, in silence for a beat, then (2) context copy arrives to explain it. Minimum 400ms separation between hero stat and supporting copy. Never reveal them simultaneously — the beat of "what does that mean?" before the answer is the tension that makes it engaging.

**The landing moment** — When a counter finishes counting, something must happen. A scale micro-pulse (`scale: 1 → 1.07 → 1` over 350ms with `ease: [0.34, 1.56, 0.64, 1]`) signals arrival and punctuates the reveal. Without it the counter just stops — anticlimactic.

**Counter easing that builds anticipation** — Use `ease: [0.16, 1, 0.3, 1]` (expo-out equivalent): starts very fast, decelerates sharply in the final 20% of values. The number feeling like it's "fighting to stop" at the final value creates more tension than a smooth ease-out. The user leans in as it slows.

**Poster/image entrances are reveals, not fades** — Show art shouldn't just fade in. It should feel like it's being surfaced from behind. Use `rotateY: 90 → 0` (3D flip) or `scale: 1.1 → 1.0` (zoom-out reveal). Never `opacity: 0 → 1` alone for hero images — that's a loading state, not a reveal.

**One wow moment per frame** — Design toward a single beat where everything resolves: the number lands and pulses, the poster flips into place, the bars hit their height. Avoid diluting it with too many simultaneous animations. Supporting elements should be clearly secondary.

**Stat is the star, decoration is late** — The stat/number arrives first (delay 0.1–0.2s). The poster or primary visual arrives next (0.3–0.5s). Copy arrives after (0.7–0.9s). Decorative posters, tertiary text, and atmospheric elements arrive last (1.0s+). Decoration that arrives before the stat steals the reveal.

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
