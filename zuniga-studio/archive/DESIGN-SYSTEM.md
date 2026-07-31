# Zuniga Studio — Visual Design System

*The translation layer between the cinematic concept and Figma production. This document specifies the visual decisions in measurable terms — type scales, spacing tokens, grid behavior, interaction states — so that nothing is left to interpretation when files are created.*

*Companion to `BLUEPRINT.md` (strategy) and `HOMEPAGE-CONCEPT.md` (cinematic walkthrough). Read those first if you haven't.*

---

## How to read this document

The first part defines the **foundational systems** — type, color, spacing, grid, motion, cursor — that every section relies on. These are global tokens. Reference them by name (not by raw value) in the section specs.

The second part walks the homepage section by section. Each of the 13 frames specifies seven elements in order:

1. Visual layout
2. Typography hierarchy
3. Spacing system
4. Imagery style
5. Grid structure
6. Interaction design
7. What should NOT be included

The third part is the **component library** — reusable patterns (buttons, cards, links, form fields, cursor states) that recur across the page.

The fourth is the **global anti-pattern register** — moves that are forbidden anywhere on the site.

A designer should be able to begin Figma after reading this document, with no ambiguity about what a thing looks like or behaves like.

---

# Part 1 — Foundational Systems

## 1.1 Type system

### Display family — Cinzel

Cinzel is the architectural voice. It carries the monumental moments only. Never appears below 24px. Two weights only: **700 (Bold)** for most display use, **400 (Regular)** reserved for body within the manifesto pull statement.

| Token | Size (desktop / mobile) | Weight | Line-height | Letter-spacing | Use |
|---|---|---|---|---|---|
| `display-xl` | `clamp(72px, 8vw, 144px)` / 56px floor | 700 | 0.92 | -0.025em | Hero H1, Closing statement |
| `display-l` | `clamp(56px, 6vw, 96px)` / 44px floor | 700 | 0.95 | -0.02em | Proof metrics, Manifesto pull |
| `display-m` | `clamp(36px, 4vw, 56px)` / 32px floor | 700 | 1.0 | -0.015em | Anchor testimonial, About content heading |
| `display-s` | `clamp(28px, 3vw, 40px)` / 26px floor | 700 | 1.05 | -0.01em | Section anchors, Case study client names |
| `display-xs` | `24px` / 24px floor | 700 | 1.1 | 0 | Process phase names, Service card names, Founder name |
| `display-wordmark` | `15px` / 14px | 700 | 1.0 | 0.18em (tracked) | Nav wordmark |

### Body family — Söhne (or fallback: Inter, system-ui)

Söhne is recommended for body — a refined modern grotesk with proper small-caps and stylistic alternates. If licensing is a constraint, Inter or General Sans are acceptable substitutes. Two weights: **400 (Regular)** for body, **500 (Medium)** for emphasis. Never bold.

| Token | Size (desktop / mobile) | Weight | Line-height | Letter-spacing | Use |
|---|---|---|---|---|---|
| `body-l` | `20px` / 18px | 400 | 1.55 | 0 | Lede, Manifesto body |
| `body-m` | `16px` / 16px | 400 | 1.6 | 0 | Body paragraphs |
| `body-s` | `14px` / 14px | 400 | 1.55 | 0 | Card descriptions, meta lines |
| `body-xs` | `12px` / 12px | 500 | 1.4 | 0.14em (tracked) | Small-caps labels, eyebrow text |
| `body-mono` | `11px` / 11px | 500 | 1.4 | 0.18em (tracked) | Form field labels, code-like meta |
| `button-label` | `14px` / 14px | 500 | 1.0 | 0.08em (tracked) | All button labels |

### Type rules (global, non-negotiable)

- Cinzel **never** below 24px
- Cinzel **never** rendered in italic (the typeface doesn't carry it gracefully)
- Body **never** rendered in regular italic — emphasis is conveyed by gold underline or color, not slant
- Small caps achieved via OpenType feature `font-feature-settings: "smcp"` on Söhne, never via `text-transform: uppercase` on lowercase letters
- Maximum measure for body: 68 characters (`max-width: ~620px` at body-m)
- Hyphenation: off. Allow rags. Editorial standard.

## 1.2 Color system

```
--obsidian:        #0A0A0A    /* primary dark surface, primary type on light */
--obsidian-90:    rgba(10, 10, 10, 0.90)  /* nav scrolled background */
--obsidian-mute:   rgba(10, 10, 10, 0.65)  /* secondary type on light */
--obsidian-faint:  rgba(10, 10, 10, 0.40)  /* tertiary type on light, hairlines */

--ivory:           #FCFBF9    /* primary light surface, primary type on dark */
--ivory-mute:      rgba(252, 251, 249, 0.75)  /* secondary type on dark */
--ivory-faint:     rgba(252, 251, 249, 0.45)  /* tertiary type on dark, hairlines */

--cream:           #F7EAC4    /* warming surface — manifesto, identity strip, about */
--cream-deep:      #F0E2B0    /* hover state on cream cards, derived */

--gold:            #D4AF37    /* primary accent — CTAs, rules, key highlights */
--gold-soft:       rgba(212, 175, 55, 0.08)  /* radial gradients, ambient glow */
--gold-ring:       rgba(212, 175, 55, 0.40)  /* focus rings */

--bronze:          #B38F24    /* hover state on gold, secondary accent */
```

### Color usage rules

- 90% of pixels are obsidian or ivory
- Cream appears in §03 Manifesto, §04 Services (card interiors), §08 Florida Coverage, §09 Studio Note, §11 Closing transition. Nowhere else.
- Gold is a **budget**: maximum one gold element per viewport unless stacked deliberately
- Bronze appears only as the hover state of gold — never as a primary surface
- Never mix gold and cream in adjacent elements without an obsidian or ivory separator — they vibrate
- No gradient backgrounds anywhere except the §08 radial cursor spotlight and the §07/§11 ambient gold pulses
- WCAG AA contrast minimum: obsidian on ivory passes; obsidian on cream passes; ivory on obsidian passes; gold on obsidian passes (CTAs use obsidian text on gold, not gold on obsidian)

## 1.3 Spacing system

8-point base. Tokens are referenced by name in all section specs.

```
--space-2:    4px
--space-3:    8px
--space-4:   16px
--space-5:   24px
--space-6:   32px
--space-7:   48px
--space-8:   64px
--space-9:   96px
--space-10: 128px
--space-11: 192px
```

### Vertical rhythm rules

- Section vertical padding: `clamp(--space-9, 12vw, --space-11)` (`96px` mobile → `192px` desktop)
- Horizontal page padding: `clamp(--space-5, 6vw, --space-9)` (`24px` mobile → `96px` desktop)
- Heading-to-body gap within section: `--space-6` (32px)
- Paragraph-to-paragraph: `--space-4` (16px)
- Inter-card gap (Services Atlas, Field Notes): `--space-5` (24px)
- Inter-spotlight gap (Selected Work): `clamp(--space-10, 14vw, --space-11)` — substantial breathing room

### Element-internal spacing

- Card padding: `--space-7` (48px) on desktop, `--space-5` (24px) on mobile
- Button padding: `--space-4 --space-5` (vertical horizontal — 16/24px)
- Input padding: `--space-3 0` (8px top/bottom, 0 horizontal — borders define edges)

## 1.4 Grid system

### Breakpoints

| Name | Range | Columns | Gutter | Outer margin |
|---|---|---|---|---|
| `mobile` | `<480px` | 4 | 16px | 24px |
| `mobile-l` | `480–767px` | 4 | 20px | 32px |
| `tablet` | `768–1023px` | 8 | 24px | 48px |
| `desktop` | `1024–1439px` | 12 | 24px | 64px |
| `desktop-l` | `1440px+` | 12 | 24px | `(viewport - 1280px) / 2` (centers content) |

### Max content width

`1280px` for primary content (text columns, card grids).
`1440px` for hero/closing statements that bleed wider.
Full-width (`100vw`) only for the obsidian §07/§11 sections.

### Asymmetric layouts

Several sections (§01, §05, §09) use asymmetric editorial composition. Specified per section. Default rule: asymmetric layouts ride the 12-column grid; "60/40 split" means cols 1–7 / cols 8–12 with a one-column gutter.

## 1.5 Motion system

```
--motion-reveal:        600ms cubic-bezier(0.22, 1, 0.36, 1)
--motion-hover:         200ms cubic-bezier(0.4, 0, 0.2, 1)
--motion-press:         120ms cubic-bezier(0.4, 0, 0.2, 1)
--motion-letter-fast:    30ms (stagger between letters in hero reveal)
--motion-letter-slow:    50ms (stagger between letters in closing)
--motion-word-stagger:   80ms (stagger between words in manifesto)
--motion-card-stagger:   80ms (stagger between cards in Services Atlas)
--motion-stamp:         800ms cubic-bezier(0.22, 1, 0.36, 1)  /* spotlights, signature */
```

### Motion rules

- All reveals: opacity `0 → 1` + transform `translateY(12px) → translateY(0)`
- All hovers: scale, color, shadow only — never position changes (avoid layout jitter)
- No looping animation visible without interaction (exception: §11 closing background pulse, 8s cycle, ≤4% opacity)
- All motion respects `prefers-reduced-motion: reduce` — replaces transforms with immediate opacity-only fades
- Scroll-driven animations tied to scroll progress, never autoplay
- Cursor trailing: spring physics `{ mass: 0.5, stiffness: 200, damping: 20 }` — calm, never bouncy

## 1.6 Cursor system

A small custom cursor augments the system pointer. The system pointer remains visible at all times (this is non-negotiable for accessibility).

| State | Visual | Trigger |
|---|---|---|
| `default` | 12px obsidian disc | Resting, over body/empty space |
| `text` | 4px obsidian dot | Over selectable text |
| `interactive` | 28px ring, 1.5px obsidian stroke, transparent fill | Over links, buttons, cards |
| `interactive-gold` | 28px ring filling with gold (200ms) | Over primary CTAs |
| `case-view` | 28px ring with `View` text in 11px tracked small caps inside | Over case study spotlights |
| `read` | 28px ring with `Read` text inside | Over journal article cards |
| `serving` | 28px ring with `Serving` text inside | Over Florida map dots and city names |
| `arrow` | 28px ring with `→` arrow inside | Over service cards |

Spring trailing: enabled on all states. Reduced motion: cursor follows directly without spring.

## 1.7 Iconography

- All icons are custom SVG line illustrations
- Stroke width: 1.5px at 24px size, 2px at 32–48px size
- Line caps: square (`stroke-linecap: square`) — matches the architectural feel
- Line joins: miter (`stroke-linejoin: miter`)
- Color: obsidian on light surfaces, ivory on dark
- Never use an icon font. Never use icon libraries (Feather, Lucide, etc.) without customization
- Icon families per section: Services (5 unique), Process (4 unique), Field Notes categories (3–5 unique). Total icon library: ~12–14 icons

---

# Part 2 — Section-by-Section Visual Spec

Each section below specifies the 7 requested elements. Reference the foundational tokens by name.

---

## §01 — Hero / Opening Statement

### 1. Visual layout

- Full viewport height (`100vh`)
- 12-column grid, cols 1–8 carry the headline + CTAs, cols 9–12 carry the vertical gold rule + Roman numeral
- Headline begins at `--space-9` from the top of the viewport
- Supporting line sits `--space-6` below the headline
- CTAs sit `--space-6` below the supporting line
- Bottom-aligned meta strip at `--space-7` from the viewport bottom
- Vertical gold rule on the right runs from `30%` to `70%` of viewport height, perfectly centered horizontally within its column
- Roman numeral `I` sits at the top of the gold rule, `--space-3` above it

### 2. Typography hierarchy

- Headline: `display-xl` Cinzel, color `--obsidian`
- Supporting line: `body-l`, color `--obsidian-mute`, max-width `480px`
- Meta strip: `body-xs`, color `--obsidian-faint`
- Roman numeral: `display-xs` Cinzel, color `--obsidian`

### 3. Spacing system

- Section padding (vertical): `--space-9` top, hero ends at viewport bottom (no bottom padding — sits to viewport edge)
- Padding horizontal: `clamp(--space-5, 6vw, --space-9)`
- Internal gaps: as above

### 4. Imagery style

**None.** No photography, no illustration, no animated character. The only visual element is the vertical gold rule and the Roman numeral. Restraint is the entire visual statement of this section.

### 5. Grid structure

- Desktop: cols 1–8 for text content, col 11 (centered within cols 10–12) for vertical rule
- Tablet: cols 1–6 for text, col 8 for vertical rule
- Mobile: full-width text, vertical rule moves to bottom of section as a horizontal accent above the meta strip

### 6. Interaction design

- **Headline reveal:** letter-by-letter mask-from-below, `--motion-letter-fast` (30ms) stagger, `--motion-reveal` (600ms) per letter. Triggered once on page load.
- **Supporting line + CTAs:** fade in with `--motion-word-stagger` (80ms) delay after final headline letter resolves
- **Primary CTA hover:** `--gold` background shifts to `--bronze`, cursor enters `interactive-gold` state, micro-scale of `1.02` over `--motion-hover`
- **Secondary CTA hover:** outline thickens from 1.5px to 2px, fill shifts to `rgba(--obsidian, 0.04)`
- **Scroll cue:** small chevron bobs `8px` vertically every `4s` (`ease-in-out`), disappears on first scroll input
- **Cursor in hero:** default state, expands to `interactive` over CTA links

### 7. What should NOT be included

- No hero image, video, or background gradient
- No carousel of taglines
- No "scroll for more" overlay text below the chevron
- No client logos visible above the fold
- No animated typography of the supporting line (it fades in once, no looping)
- No stat counters in the hero
- No background pattern (the subtle blueprint grid mentioned in motion notes is REMOVED — too noisy for the hero)
- No social proof badges, no "as seen in" line

---

## §02 — Identity Strip

### 1. Visual layout

- Single horizontal band, full content width
- Single row: left meta label, right cluster of 3–5 monochrome wordmarks
- If fewer than 3 client marks, replaced by a single founder-credential line centered

### 2. Typography hierarchy

- Meta label: `body-xs` small-caps tracked, color `--obsidian-faint`
- Client wordmarks: rendered as SVGs at uniform height of `28px`, color inheriting `--obsidian` at 60% opacity

### 3. Spacing system

- Section padding (vertical): `clamp(--space-8, 10vw, --space-10)` (64–128px) — less than primary sections; this is a transitional strip
- Meta label to wordmark cluster: `--space-9` horizontal gap
- Wordmark-to-wordmark gap: `--space-8` (64px)
- Mobile: marks wrap to 2 rows with `--space-5` vertical gap between rows

### 4. Imagery style

- Wordmarks only — never company logos with marks attached
- All SVG, monochrome (single color), uniform height regardless of original aspect ratio
- Sourced as official logo/wordmark files, simplified to single-color line-art if necessary
- If founder credential is used instead: text only, no portraits, no third-party logos

### 5. Grid structure

- Desktop: meta label on cols 1–2, wordmarks on cols 4–12 with `space-between` distribution
- Mobile: meta label on its own row, wordmarks centered on next row

### 6. Interaction design

- **Wordmark reveal on scroll:** sequential fade-in, `--motion-card-stagger` (80ms) between each
- **Wordmark hover:** opacity transitions from 60% to 100%, no scale, no shadow. Only the hovered mark transitions; others remain at 60%.
- **Cursor over wordmark:** stays in `default` state — wordmarks are not clickable

### 7. What should NOT be included

- No carousel, no auto-scroll, no horizontal movement
- No "as featured in" alternative styling
- No more than 5 wordmarks (visual budget hard cap)
- No animated logo reveals (e.g., shapes drawing themselves)
- No tooltips on hover
- No hyperlinks on the wordmarks unless the client has explicitly approved cross-promotion
- No counts (e.g., "Trusted by 50+ businesses") — non-specific claims weaken the section

---

## §03 — Manifesto

### 1. Visual layout

- Background: `--cream`
- Single column, centered, max-width `720px`
- Cinzel pull statement at top, body paragraphs below
- Thin horizontal gold rule beneath the pull statement, `120px` wide, centered

### 2. Typography hierarchy

- Pull statement: `display-l` Cinzel, color `--obsidian`
- Body paragraphs: `body-l`, color `--obsidian-mute`
- Emphasized phrase (gold underline): same as body, color shifts to `--obsidian`, gold underline at `2px` offset from baseline

### 3. Spacing system

- Section padding (vertical): `clamp(--space-10, 14vw, --space-11)` (128–192px)
- Pull statement to gold rule: `--space-6` (32px)
- Gold rule to first body paragraph: `--space-7` (48px)
- Paragraph-to-paragraph: `--space-5` (24px)

### 4. Imagery style

**None.** No images. No icons. No decorative SVGs. The manifesto is pure type. The gold rule is the only non-typographic element.

### 5. Grid structure

- Desktop: content occupies cols 4–9 (centered single column, ~6 cols wide)
- Tablet: cols 2–7
- Mobile: full content width

### 6. Interaction design

- **Pull statement reveal:** word-by-word fade-in, `--motion-word-stagger` (80ms) between words, `--motion-reveal` (600ms) per word
- **Gold rule:** draws from left to right after final pull-statement word resolves, `400ms` duration, `--motion-reveal` easing
- **Body paragraphs:** fade in sequentially, `200ms` stagger between paragraphs, opacity + 12px lift
- **Gold underline on emphasized phrase:** writes from left to right when paragraph enters viewport, triggered once, `500ms` duration

### 7. What should NOT be included

- No decorative quotation marks around the pull statement (it's a declarative statement, not a quote)
- No author attribution beneath the manifesto (it's the studio's voice, not a person's)
- No background imagery, no parchment textures, no luxury patterns
- No drop cap on the first paragraph (we reserve drop caps for §09 only)
- No "read more" expansion — the section is fully visible at all times
- No bullet lists — the manifesto is prose, full stop

---

## §04 — Services Atlas

### 1. Visual layout

- Background: `--ivory`
- Section anchor heading at top-left of content grid
- Asymmetric card composition: 1 large primary card + 4 supporting cards in a staircase pattern
- Layout pattern (desktop):
  - Row 1: Primary card (cols 1–7, height ~480px) | Supporting card 1 (cols 8–12, height ~228px)
  - Row 2: Primary card continues | Supporting card 2 (cols 8–12, height ~228px)
  - Row 3: Supporting card 3 (cols 1–6, height ~228px) | Supporting card 4 (cols 7–12, height ~228px)
- All cards: `--cream` background, `1px` `--obsidian-faint` border, sharp corners (`border-radius: 0`)
- Each card contains: Roman numeral (top-left), service name, description, included specifics, per-card CTA (bottom)

### 2. Typography hierarchy

- Section anchor: `display-s` Cinzel, color `--obsidian`
- Roman numeral: `display-xs` Cinzel, color `--obsidian-mute`
- Service name: `display-xs` Cinzel, color `--obsidian`
- Description: `body-m`, color `--obsidian-mute`
- Included specifics (bullets): `body-s`, color `--obsidian-mute`
- Per-card CTA: `button-label`, color `--obsidian`, with `→` glyph

### 3. Spacing system

- Section padding (vertical): `clamp(--space-10, 14vw, --space-11)`
- Anchor heading to card grid: `--space-9` (96px)
- Inter-card gap: `--space-5` (24px)
- Card internal padding: `--space-7` (48px) all sides
- Within card: Roman numeral to service name `--space-6`, service name to description `--space-3`, description to bullets `--space-5`, bullets to CTA `--space-5`

### 4. Imagery style

- One custom line-illustration icon per service (5 total), revealed on hover only
- Icons live in `--obsidian` stroke, `1.5px` weight, no fill
- Icons are hidden behind the right edge of the card by default; on hover, they translate `40px` leftward into view + fade in
- No photography, no service mockup screenshots, no service-category stock visuals

### 5. Grid structure

- Desktop (≥1024px): asymmetric staircase as described
- Tablet (768–1023px): 2-column grid, primary card spans both cols of row 1
- Mobile (<768px): single column, all cards stacked vertically, equal height

### 6. Interaction design

- **Card reveal on scroll:** sequential, `--motion-card-stagger` (80ms) between cards, `--motion-reveal` per card
- **Card hover:**
  - Lift `4px` (`translateY(-4px)`)
  - Shadow appears: `0 24px 48px rgba(10, 10, 10, 0.08)`
  - Gold underline draws beneath service name (left to right, `300ms`)
  - Hidden icon reveals from right edge (`--motion-stamp` 800ms)
  - Background tints from `--cream` to `--cream-deep`
- **Cursor over card:** `arrow` state (ring with `→` inside)
- **Grid cursor spotlight:** a `600px` radial gradient at `--gold-soft` follows the cursor position within the section bounds. Tracks at `~16ms` updates (60fps). Spotlight is contained within the section — does not bleed outside.
- **CTA hover within card:** underline becomes solid (gold), `→` translates 4px right

### 7. What should NOT be included

- No card-flip animations
- No "see more" expansion of card descriptions
- No images, photographs, or mockup screenshots inside cards
- No pricing or "starting at" anchors
- No service comparison tables
- No badges (e.g., "Most Popular," "Best Value")
- No rounded corners (`border-radius: 0` enforced)
- No colored card backgrounds (only `--cream` / `--cream-deep`)
- No more than 5 cards — the visual budget is locked

---

## §05 — Selected Work

### 1. Visual layout

- Background: `--cream`
- Section anchor heading at top-left
- 2 case study spotlights, alternating left/right composition
- Each spotlight: 60/40 split (image / text)
- Spotlight 1: image cols 1–7, text cols 8–12
- Spotlight 2: text cols 1–5, image cols 6–12
- Vertical gap between spotlights: `clamp(--space-10, 14vw, --space-11)`
- "View All Work →" link at bottom-right of section

### 2. Typography hierarchy

- Section anchor: `display-s` Cinzel
- Client name: `display-s` Cinzel
- Category descriptor: `body-xs` small-caps tracked, color `--obsidian-faint`
- Outcome stat: `display-l` Cinzel (the headline figure — `+340%`, `5.2×`, etc.)
- Outcome stat descriptor: `body-s`, color `--obsidian-mute`
- Project tag list: `body-xs` small-caps tracked, separated by `·`
- "View Case Study →" link: `button-label`, color `--obsidian`

### 3. Spacing system

- Section padding (vertical): `clamp(--space-10, 14vw, --space-11)`
- Anchor to first spotlight: `--space-9`
- Within spotlight text column: category to client name `--space-4`, client name to outcome stat `--space-6`, outcome stat to tag list `--space-5`, tag list to CTA `--space-6`
- Image-text horizontal gap: `--space-7` (48px) on desktop, vertical gap `--space-7` on mobile

### 4. Imagery style

- Each spotlight features one large client image
- Images: real product screenshots, framed within a deliberate device mockup that feels intentional (an architectural framing — like a magazine fold-out)
- Treatment: minimal — clean screenshots, no shadows, no perspective, no floating screens, no glassy reflections
- Acceptable mockup styles:
  - **Editorial frame:** screenshot sits within a thin obsidian-rule border, slight offset from page grid
  - **Browser chrome:** if browser chrome shown, it's minimal — just a thin top bar with three dots, no URL, no buttons
- Image aspect: `4:3` standard
- Maximum image height: `560px` on desktop

### 5. Grid structure

- Desktop (≥1024px): 60/40 split as described, alternating direction
- Tablet (768–1023px): 50/50 split, alternating
- Mobile (<768px): stacked — image on top, text below, full-width each

### 6. Interaction design

- **Spotlight reveal on scroll:**
  - Image stamps in: starts at `scale(0.92)` and `opacity 0`, animates to `scale(1.0)` and `opacity 1` over `--motion-stamp` (800ms)
  - Text content fades in with `200ms` lag after image
- **Image parallax:** image translates at `0.85×` scroll speed within its container (not `0.7×` as previously specified — `0.7×` is too aggressive at typical scroll speeds)
- **Outcome stat counter:** counts from `0` to final value over `800ms`, starts when stat enters viewport, eased
- **Spotlight hover:**
  - Image gains subtle `scale(1.02)` over `--motion-hover`
  - Hidden tagline reveals beneath project tags: `Read the full work →`
  - Cursor enters `case-view` state (ring with `View` inside)
- **CTA hover within spotlight:** `→` translates 6px right

### 7. What should NOT be included

- No carousel of case studies
- No "before / after" sliders
- No client testimonial quotes within the spotlight (those live in §07)
- No video autoplay on hover
- No project filter chips (work index page handles filtering, not the homepage)
- No more than 3 spotlights on the homepage
- No "Industry: [X]" labels (the category descriptor already covers this)
- No tech stack badges ("Built with Webflow," "WordPress," etc.)
- No rounded corners on images

---

## §06 — Approach / The Process

### 1. Visual layout

- Background: `--ivory`
- Section anchor heading at top-left
- 4 phase blocks arranged vertically
- Layout per phase:
  - Roman numeral on cols 1–2 (centered vertically within phase block)
  - Phase content on cols 4–10 (offset for breathing room)
- Single vertical gold rule running through col 2 from the top of Phase I to the bottom of Phase IV — drawn by scroll
- Each phase block height: ~`280px` desktop, ~`200px` mobile

### 2. Typography hierarchy

- Section anchor: `display-s` Cinzel
- Roman numeral: `display-l` Cinzel (size ~`96px`)
- Phase name: `display-xs` Cinzel
- Phase description: `body-m`, color `--obsidian-mute`
- Deliverable callout: `body-xs` small-caps tracked, color `--gold` (only place gold appears in this section's type)

### 3. Spacing system

- Section padding (vertical): `clamp(--space-10, 14vw, --space-11)`
- Anchor to first phase: `--space-9`
- Inter-phase gap: `0` (the gold rule is continuous)
- Within phase: numeral to phase content horizontal `--space-7`, phase name to description `--space-4`, description to deliverable callout `--space-5`

### 4. Imagery style

- One small custom line-illustration icon per phase (4 total)
- Icons sit beside the phase name, sized `32px`, color `--obsidian`
- Icons drawn from the same line-illustration family as Services icons — consistent stroke weight, no fill
- Icon families per phase:
  - Discovery: a magnifying glass or open document
  - Strategy: a small architectural diagram or flow arrows
  - Design & Build: a square within a square (frame)
  - Launch & Optimize: a stylized chart or upward line

### 5. Grid structure

- Desktop (≥1024px): 12-col, layout as described
- Tablet (768–1023px): numeral on cols 1–2, content cols 3–8 — tighter
- Mobile (<768px): numeral and phase content stack vertically, gold rule moves to a thinner accent on the left edge

### 6. Interaction design

- **Gold rule scroll-draw:** the rule's stroke-dashoffset is tied directly to scroll position. As the user scrolls from the section's top to its bottom, the rule extends from 0 to 100%. This is the signature motion of the section.
- **Phase activation:** when a phase's center enters the middle 40% of the viewport, its Roman numeral fills with `--gold`. Phases outside this zone fade to 60% opacity. Transition: `--motion-hover` (200ms).
- **Phase hover:** numeral lifts slightly with a brightness increase. Expanded descriptor reveals beneath the phase description — an additional `body-s` paragraph at `opacity 0` by default, `opacity 1` on hover. Cursor enters `interactive` state with a `+` glyph inside.
- **Phase reveal on scroll:** content slides in horizontally from `translateX(-12px)` to `0`, with opacity, `--motion-reveal`

### 7. What should NOT be included

- No phase progress percentage labels
- No "click to expand each phase" pattern — desktop hover reveals the expanded descriptor, mobile shows it always
- No client logos within phase descriptions
- No video walkthroughs of the process
- No "Book a Discovery Call" CTA within the phases (process is informational, not transactional)
- No more than 4 phases — additional steps belong on a dedicated `/approach` page
- No interspersed quotes or testimonials between phases

---

## §07 — Proof

### 1. Visual layout

- Background: `--obsidian` — full-bleed
- Top half: 3–4 metric tiles in a horizontal row, evenly distributed
- Middle: thin gold horizontal rule, `120px` centered
- Bottom half: anchor testimonial centered, with attribution beneath
- Subtle vertical light gradient on background, peaks at `2%` opacity, drifts at `0.05× scroll`

### 2. Typography hierarchy

- Metric number: `display-l` Cinzel, color `--ivory`
- Metric descriptor: `body-xs` small-caps tracked, color `--ivory-mute`
- Testimonial pull-quote: `display-m` Cinzel, color `--ivory`
- Opening gold quote-mark: `display-xl` Cinzel, color `--gold`, sits before the pull-quote
- Client name (attribution): `body-m` Söhne Medium, color `--ivory`
- Client title + business: `body-s`, color `--ivory-mute`

### 3. Spacing system

- Section padding (vertical): `clamp(--space-11, 16vw, calc(--space-11 + --space-7))` (192px to ~240px)
- Metric tiles top to gold rule: `--space-10` (128px)
- Gold rule to testimonial: `--space-9` (96px)
- Testimonial to attribution: `--space-6` (32px)
- Within attribution: client photo to name `--space-4`

### 4. Imagery style

- One small client photo or business logo per testimonial
- Photo treatment: circular crop, `64px` diameter, full color (single exception to the no-color-photography rule)
- Logo treatment: `64px` height, monochrome ivory
- No background imagery, no decorative SVGs
- The gold opening quote-mark is the only flourish

### 5. Grid structure

- Desktop (≥1024px): 12-col. Metric tiles centered, distributed across cols 2–11. Testimonial centered cols 3–10.
- Tablet (768–1023px): metric tiles wrap to 2x2 grid, testimonial centered
- Mobile (<768px): metric tiles stack vertically, testimonial centered full-width

### 6. Interaction design

- **Metric counters:** each animates from `0` to final value over `800ms`, sequentially staggered by `--motion-card-stagger` (80ms) starting when the section enters viewport
- **Testimonial reveal:**
  - Gold opening quote-mark fades in first (`300ms` before pull-quote)
  - Pull-quote letters fade in left-to-right with a slight blur-to-clear effect (filter: blur(4px) → blur(0)), `1.2s` total
  - Attribution fades in `400ms` after pull-quote completes
- **Background gradient:** subtle vertical gradient drifts at `0.05× scroll` rate — barely perceptible
- **No hover interactions** — this is a viewing section, not an interactive one

### 7. What should NOT be included

- No multiple testimonials (one anchor only — carousels weaken trust at premium tier)
- No star ratings (numerical metrics already provide quantitative evidence)
- No "Trustpilot," "Google Reviews," "Clutch" badges
- No video testimonials embedded
- No "View More Testimonials →" link from this section (the singular focus is the point)
- No bar charts or graphical data viz around the metrics — numbers stand alone
- No animated background imagery (the gradient drift is the only background motion)

---

## §08 — Florida Coverage

### 1. Visual layout

- Background: `--cream`
- Section anchor heading at top-left
- Two-column composition:
  - Left half: custom Florida map SVG with city dots
  - Right half: vertical city roster list, one city per row
- Map and list aligned along their vertical centers
- Closing line below both columns, centered

### 2. Typography hierarchy

- Section anchor: `display-s` Cinzel
- City name (in roster): `body-l` (`20px`), color `--obsidian`
- City meta (in roster): `body-xs` small-caps tracked, color `--obsidian-faint`
- Closing line: `body-s`, color `--obsidian-mute`, italic-feeling but not italic (use letter-spacing and `body` weight instead)

### 3. Spacing system

- Section padding (vertical): `clamp(--space-10, 14vw, --space-11)`
- Anchor to two-column block: `--space-9`
- Between columns (horizontal gap): `--space-9` desktop, stacks mobile
- City-to-city vertical gap in roster: `--space-5` (24px)
- City name to meta (within roster row): horizontal gap `--space-4`
- Two-column block to closing line: `--space-9`

### 4. Imagery style

- One custom-drawn Florida outline SVG
- Style: line-drawn, `1.5px` stroke, color `--obsidian`, no fill
- The outline should feel hand-drawn — irregular hairlines, not perfectly geometric. Reference: travel guide illustrations, vintage map insets
- City dots: `8px` filled circles in `--obsidian`, transition to `--gold` on illumination
- Map dimensions: ~`480px` wide, ~`360px` tall on desktop
- No labels on the map itself (city names are in the right column roster)
- No coordinate grid, no compass rose, no legend

### 5. Grid structure

- Desktop (≥1024px): map on cols 1–6, roster on cols 7–12
- Tablet (768–1023px): map on cols 1–4, roster on cols 5–8
- Mobile (<768px): map on top, roster below, both full-width. Map scales down to ~`320px` wide.

### 6. Interaction design

- **Map dot illumination on scroll:** dots animate from `--obsidian` to `--gold` sequentially with `--motion-card-stagger` (80ms) stagger
- **City roster reveal on scroll:** roster rows fade in paired with their map dots
- **Hover on city name in roster:** corresponding map dot scales `1.4×` and pulses gold for `400ms`, gold underline draws beneath the city name in the roster
- **Hover on map dot:** corresponding city name in roster gains a gold underline, city dot scales `1.4×`
- **Cursor over city or dot:** `serving` state (ring with `Serving` inside)
- **No ambient looping pulse on map dots** (the original concept's optional ambient pulse is REMOVED — adds noise without value)

### 7. What should NOT be included

- No Google Maps embed
- No interactive zoom or pan on the map
- No "click a city to see local case studies"
- No map markers with labels above them
- No state boundary lines for neighboring states (Florida outline only)
- No coordinates, compass rose, or scale bar
- No "We work everywhere" caveat that contradicts the Florida focus
- No more than 10 cities (visual budget cap; additional cities belong in the footer's expanded link list)

---

## §09 — Studio Note (Founder's Letter)

### 1. Visual layout

- Background: `--cream`
- Two-column editorial spread, modeled on a magazine "Letter from the Editor"
- Left column: large portrait of Clarisa Zuniga
- Right column: meta line, letter body (paragraphs), typed name, handwritten signature

### 2. Typography hierarchy

- Meta line above letter: `body-xs` small-caps tracked, color `--obsidian-faint`
- Letter body paragraphs: `body-l` (`20px`), color `--obsidian`
- First letter of the first paragraph: drop cap — `display-m` Cinzel, color `--gold`, floats left, line-height `0.85`
- Typed name: `display-xs` Cinzel, color `--obsidian`
- Handwritten signature: rendered as SVG, scaled to `~140px` wide, color `--obsidian`

### 3. Spacing system

- Section padding (vertical): `clamp(--space-10, 14vw, --space-11)`
- Meta line to first paragraph: `--space-6` (32px)
- Paragraph-to-paragraph: `--space-4` (16px)
- Final paragraph to typed name: `--space-8` (64px)
- Typed name to signature: `--space-4` (16px)
- Portrait to letter (horizontal gap): `--space-9` desktop, `--space-7` mobile (when stacked, vertical)

### 4. Imagery style

- One portrait of Clarisa Zuniga
- Style: photographic, commissioned (never AI-generated, never stock)
- Treatment: black and white OR single-tone (sepia-leaning warm cream tones)
- Composition: portrait crop (3:4 or 4:5 aspect), three-quarter or direct gaze, natural light, neutral background
- Resolution: minimum `1600px` on the long edge for retina
- Format: AVIF with WebP fallback
- The portrait should feel taken with intent — not a stock headshot, not a corporate profile picture

### 5. Grid structure

- Desktop (≥1024px): portrait cols 1–5, letter cols 7–12
- Tablet (768–1023px): portrait cols 1–4, letter cols 5–8
- Mobile (<768px): portrait on top (full width, max `320px` wide centered), letter below

### 6. Interaction design

- **Portrait reveal on scroll:** scale `1.04 → 1.0` + opacity fade, `800ms`, eased
- **Letter text reveal:** paragraphs fade in with `200ms` stagger after portrait completes
- **Signature draw:** SVG path animates via `stroke-dashoffset` over `800ms`, eased — feels like the letter is being signed
- **Hover on portrait:** treatment shifts from B&W to low-saturation color over `400ms`. On mouse-out, returns to B&W over `600ms`.
- **No other interactions** — this is a reading section, not an exploratory one

### 7. What should NOT be included

- No "About Us" plurals or team-collective language in the letter
- No fabricated team members visible in the portrait
- No social media icons or links beside the portrait
- No "Read more about Clarisa →" expansion link from this section (her bio lives at `/studio`)
- No quote attributed to Clarisa hovering over the portrait
- No timestamp on the letter ("Written May 2026") — the letter is evergreen
- No headshot-style portrait (corporate executive photo aesthetic is forbidden — magazine portrait only)

---

## §10 — Field Notes (Journal Teaser)

### 1. Visual layout

- Background: `--ivory`
- Section anchor at top-left
- 3 article preview cards in a horizontal row
- Each card: meta line at top, article title in middle, excerpt below, "Read →" link at bottom
- All cards type-only — no images
- "All Field Notes →" link at bottom-right of section

### 2. Typography hierarchy

- Section anchor: `display-s` Cinzel
- Card meta line: `body-xs` small-caps tracked, color `--obsidian-faint`
- Card title: `display-xs` Cinzel (`24px`), color `--obsidian`
- Card excerpt: `body-s`, color `--obsidian-mute`
- Card "Read →" link: `button-label`, color `--obsidian`
- "All Field Notes →" link: `button-label`, color `--obsidian`

### 3. Spacing system

- Section padding (vertical): `clamp(--space-10, 14vw, --space-11)`
- Anchor to card row: `--space-9`
- Inter-card gap: `--space-5` (24px)
- Within card: meta to title `--space-4`, title to excerpt `--space-4`, excerpt to read link `--space-5`
- Card row to "All Field Notes" link: `--space-7`

### 4. Imagery style

**None.** No thumbnails, no hero images, no category icons within cards. Type-only is the discipline.

### 5. Grid structure

- Desktop (≥1024px): 3 cards in row, each spans cols 1–4, 5–8, 9–12
- Tablet (768–1023px): 2 cards on row 1, 1 card on row 2 (centered)
- Mobile (<768px): single column, cards stacked

### 6. Interaction design

- **Card reveal on scroll:** sequential fade-in, `100ms` stagger, `--motion-reveal`
- **Card hover:**
  - Gold underline draws beneath article title (left to right, `300ms`)
  - Thin gold rule extends from card right edge into the gutter — a `24px` horizontal line at the vertical center of the card, drawing right over `400ms`
  - Cursor enters `read` state (ring with `Read` inside)
- **No background color change on hover** — discipline

### 7. What should NOT be included

- No article thumbnails or hero images on cards
- No estimated reading time ("5 min read")
- No author photos or names on cards (author bylines live on the article page)
- No category color-coding
- No more than 3 cards on the homepage (the journal index handles more)
- No "Subscribe to our newsletter" inline within this section
- No engagement metrics ("142 reads")

---

## §11 — Closing Invitation

### 1. Visual layout

- Background: `--obsidian` — full-bleed
- Centered closing statement
- Two CTAs side-by-side below the statement
- Meta line at the bottom: email + Florida location
- Faint gold radial gradient ambient pulse (`--gold-soft` peak at `4%` opacity, cycle every `8s`)

### 2. Typography hierarchy

- Closing statement: `display-xl` Cinzel, color `--ivory`
- Primary CTA label: `button-label`, color `--obsidian`, on `--gold` button
- Secondary CTA label: `button-label`, color `--ivory`, outlined
- Meta line: `body-xs` small-caps tracked, color `--ivory-mute`

### 3. Spacing system

- Section padding (vertical): `clamp(--space-11, 18vw, calc(--space-11 + --space-9))` (192–288px) — substantial, this is a finale
- Closing statement to CTA row: `--space-8` (64px)
- Inter-CTA gap (horizontal): `--space-4` (16px)
- CTA row to meta line: `--space-9` (96px)

### 4. Imagery style

**None.** No imagery, no SVGs, no decorative elements. The closing statement is the visual.

### 5. Grid structure

- Desktop (≥1024px): closing statement constrained to cols 2–11 (centered)
- Tablet (768–1023px): cols 1–8 full
- Mobile (<768px): full width, CTAs stack vertically

### 6. Interaction design

- **Closing statement reveal:** letter-by-letter mask-from-below, `--motion-letter-slow` (50ms stagger), `--motion-reveal` per letter — slower than the hero to give gravitas. Triggered on scroll into view.
- **CTAs fade in:** after the final letter resolves, `200ms` stagger, both at once.
- **Background ambient pulse:** radial gradient at `--gold-soft` cycles peak opacity from `0%` to `4%` to `0%` over `8s`, infinite loop. Center of gradient: viewport center. Reduced motion: disabled entirely.
- **Primary CTA hover:** fills with deeper `--bronze`, cursor enters `interactive-gold` state, scales `1.02`
- **Secondary CTA hover:** outline thickens, fill becomes `rgba(--ivory, 0.04)`
- **Scroll snap behavior:** section behaves like a chapter close — slight scroll deceleration when entering the section's center 60% of viewport (subtle, not jarring)

### 7. What should NOT be included

- No contact form embedded in the closing
- No social media icon row
- No "Schedule a call" calendar embed inline
- No animated background imagery beyond the gold pulse
- No quote or testimonial in the closing
- No "Last updated" timestamp
- No multi-column layout — the statement is centered and singular

---

## Footer (Substantial)

### 1. Visual layout

- Background: `--obsidian` — continuous with §11 (no tonal break)
- 4-column layout:
  - Col 1: wordmark + tagline + Florida location + email
  - Col 2: Services links (5 items)
  - Col 3: Florida cities links (6–10 items)
  - Col 4: Studio nav (Work, Approach, Journal, Contact)
- Thin gold rule beneath the columns
- Bottom strip: copyright (left) + "Designed and built in Florida" (center) + legal links (right)

### 2. Typography hierarchy

- Wordmark in footer: `display-wordmark` Cinzel
- Tagline beneath wordmark: `body-s`, color `--ivory-mute`
- Column headers (e.g., "Services," "Florida"): `body-xs` small-caps tracked, color `--gold`
- Column link items: `body-s`, color `--ivory-mute`
- Wordmark + location + email: `body-s`, color `--ivory-mute`
- Bottom strip text: `body-xs` small-caps tracked, color `--ivory-faint`

### 3. Spacing system

- Footer padding (vertical): `clamp(--space-9, 12vw, --space-10)` (96–128px)
- Column gap: `--space-7` (48px)
- Column header to first link: `--space-5` (24px)
- Inter-link gap within column: `--space-3` (8px)
- Columns to gold rule: `--space-8` (64px)
- Gold rule to bottom strip: `--space-6` (32px)

### 4. Imagery style

- Wordmark only — no other imagery in footer
- No "social media icon row" (intentional restraint — premium studios don't need to advertise their Instagram in the footer)

### 5. Grid structure

- Desktop (≥1024px): 4 columns evenly distributed across cols 1–12 (each col spans 3 grid cols)
- Tablet (768–1023px): 2 columns × 2 rows
- Mobile (<768px): single column, all sections stacked

### 6. Interaction design

- **Wordmark hover:** gold underline draws beneath, slight scale `1.02`
- **Link hover:** gold underline writes from left, `200ms`
- **Newsletter input (if added, in Col 1):** on focus, gold ring appears around the input (1.5px `--gold`), input background lightens slightly to `rgba(--ivory, 0.04)`
- **Cursor over links:** `interactive` state
- **Bottom strip:** no hover interactions on legal links (just default underline on hover)
- **Restraint principle:** the footer is the quietest motion zone on the page. No reveal animations on scroll into footer.

### 7. What should NOT be included

- No social media icon row (Instagram, Twitter, LinkedIn icons)
- No "Made with ❤️ in Florida" emoji-driven taglines
- No back-to-top floating arrow
- No "Subscribe and get 10% off" newsletter incentive
- No cookie banner integrated into the footer (handled separately)
- No widgets, plugins, or third-party badges
- No "Powered by [Framer / Webflow]" attribution
- No language switcher (English-only site)

---

# Part 3 — Component Library

Reusable patterns that appear across multiple sections. Specifications here override section-specific instructions if conflicts arise.

## 3.1 Primary CTA Button

| State | Background | Text color | Border | Shadow |
|---|---|---|---|---|
| Default | `--gold` | `--obsidian` | none | none |
| Hover | `--bronze` | `--obsidian` | none | `0 6px 16px rgba(212, 175, 55, 0.32)` |
| Active (press) | `--bronze` | `--obsidian` | none | `0 2px 6px rgba(212, 175, 55, 0.20)` |
| Focus | `--gold` | `--obsidian` | `2px --gold-ring` outline (offset 2px) | none |

- Padding: `--space-4 --space-5` (16px top/bottom, 24px left/right)
- Border-radius: `0` (sharp corners)
- Font: `button-label`
- Transition: `--motion-hover` on all properties

## 3.2 Secondary CTA Button (Ghost)

| State | Background | Text color | Border |
|---|---|---|---|
| Default | transparent | `--obsidian` (light contexts) / `--ivory` (dark contexts) | `1.5px --obsidian` / `1.5px --ivory` |
| Hover | `rgba(--obsidian, 0.04)` / `rgba(--ivory, 0.04)` | same as default | `2px --obsidian` / `2px --ivory` |
| Focus | same as default | same as default | `2px --gold-ring` outline (offset 2px) |

## 3.3 Service / Field Notes Card

- Background: `--cream` (services) or transparent (field notes)
- Border: `1px --obsidian-faint`
- Border-radius: `0`
- Padding: `--space-7` desktop, `--space-5` mobile
- Hover: lift `4px`, shadow `0 24px 48px rgba(--obsidian, 0.08)`, background → `--cream-deep` (services only)
- Transition: `--motion-hover`

## 3.4 Section Anchor Pattern

Every section that opens with an anchor heading uses:

- `display-s` Cinzel for the heading
- Optional small-caps eyebrow above (`body-xs` tracked, color `--gold` or `--obsidian-faint`)
- Optional thin horizontal gold rule beneath, `60px` wide
- Anchored to left of content grid (cols 1+)

## 3.5 Link (in-body)

- Default: color `--obsidian` (or `--ivory` on dark), no underline
- Hover: gold underline writes from left, `--motion-hover`
- Active: color `--bronze`
- Focus: `--gold-ring` outline, 2px offset

## 3.6 Form Field (Input / Textarea)

- Background: transparent
- Border: bottom `1.5px --obsidian` (or `--ivory` on dark) — no other borders
- Padding: `--space-3` (8px) top and bottom, 0 horizontal
- Font: `body-m`
- Focus: bottom border thickens to `2px` and changes to `--gold`
- Label: `body-mono` tracked, sits above the input
- No floating labels, no placeholder-as-label patterns

## 3.7 Cursor states

Specified in Foundational Systems § 1.6. Reference: `default`, `text`, `interactive`, `interactive-gold`, `case-view`, `read`, `serving`, `arrow`.

---

# Part 4 — Global Anti-Pattern Register

Things that are forbidden anywhere on the site. If a designer is tempted to add any of these, the answer is no.

### Layout anti-patterns
- Rounded corners on cards, buttons, or images (`border-radius: 0` enforced; exceptions only on circular elements like client photos and the cursor disc)
- Soft drop shadows that feel like SaaS marketing pages (heavy diffusion, large blur)
- "Bento box" grid layouts of mismatched card sizes pretending to feel designed
- Stacked horizontal scrolls that hide content
- Floating "Chat with us" widgets

### Type anti-patterns
- Cinzel below 24px (loses its character — illegible at small sizes)
- Italic Cinzel
- Bolded body text (use color or underline for emphasis instead)
- All-uppercase Cinzel (the typeface is already capital-driven; further uppercase is redundant)
- Multi-color gradient type fills
- Drop caps anywhere except §09 founder's letter

### Color anti-patterns
- Purple, blue, or other "tech startup" accents
- Gradient backgrounds (exception: §08 cursor spotlight, §07/§11 ambient pulses)
- Cream and gold adjacent without a separator (vibrates)
- Bronze as a primary surface (it's a hover-state-only color)
- Pure white (`#FFFFFF`) — always use `--ivory`
- Pure black (`#000000`) — always use `--obsidian`

### Imagery anti-patterns
- Stock photography of any kind
- AI-generated imagery
- Photos of laptops, hands typing, abstract office scenes
- Logos of "as seen in" press without verifiable links
- Carousel of client testimonials
- Decorative SVG patterns (geometric overlays, dots, lines, "Apple-style" mesh gradients)
- Cinema-grade video backgrounds in the hero

### Motion anti-patterns
- Autoplay video
- Parallax that moves faster than `0.85× scroll` (causes nausea)
- Hover effects on touch devices (use scroll-triggered alternatives)
- Looping animations visible without interaction (exception: §11 ambient pulse)
- Wobble, bounce, or elastic easing
- More than `15` distinct motion patterns across the homepage
- Letter-by-letter reveals applied to body paragraphs (only display type)

### Interaction anti-patterns
- Cursor that fully replaces the system pointer (must augment, never replace)
- Custom cursor without a reduced-motion fallback
- Hover states that change layout (no width/height transitions)
- "Click to flip" cards
- Hidden interactions discoverable only by accident
- Tooltips on hover for primary content
- Confirmation modals for non-destructive actions

### SEO/content anti-patterns
- Keyword stuffing in the manifesto or service descriptions
- Hidden text for SEO
- More than one `<h1>` on the page
- Generic alt text ("image," "photo")
- Meta descriptions over 160 characters
- Missing OG image
- Empty schema markup tags

---

# Part 5 — Pre-Figma Checklist

Before opening Figma, lock the following:

1. ✅ Type scale tokens approved (Foundational Systems § 1.1)
2. ✅ Color tokens approved (Foundational Systems § 1.2)
3. ✅ Spacing scale approved (Foundational Systems § 1.3)
4. ✅ Grid breakpoints approved (Foundational Systems § 1.4)
5. ✅ Motion timing tokens approved (Foundational Systems § 1.5)
6. ✅ Cursor states approved (Foundational Systems § 1.6)
7. ⏳ Söhne body font licensed (or fallback to Inter confirmed)
8. ⏳ Cinzel weights confirmed available via Google Fonts
9. ⏳ Clarisa Zuniga portrait photography commissioned
10. ⏳ Handwritten signature SVG captured
11. ⏳ Custom Florida map SVG illustrated
12. ⏳ Custom service icons illustrated (5)
13. ⏳ Custom process icons illustrated (4)
14. ⏳ Client wordmarks collected and simplified to monochrome SVG (3–5)
15. ⏳ 2 case study spotlight images prepared (real screenshots, framed)
16. ⏳ 3 journal article previews drafted (titles, dates, excerpts)

Items 1–6 (the system tokens) should be locked first as a separate approval — they don't depend on content readiness and they're the foundation everything else inherits.

Items 7–16 are content/asset prerequisites; they can be acquired in parallel with early Figma work but must be in place before high-fidelity comps go to development.

---

# Part 6 — Figma File Structure (recommended)

When the Figma file is created:

```
🟡 Zuniga Studio — Homepage
├── 📐 Foundations
│   ├── Color tokens
│   ├── Type scale
│   ├── Spacing scale
│   ├── Grid + breakpoints
│   └── Motion timing reference
├── 🧩 Components
│   ├── Buttons (primary, ghost, with focus states)
│   ├── Cards (service, field notes)
│   ├── Form fields
│   ├── Section anchors
│   ├── Links (in-body, with hover state)
│   └── Cursor variants (visual references)
├── 🎨 Icons
│   ├── Services (5 icons)
│   ├── Process (4 icons)
│   └── Misc (arrow, chevron, signature stamp)
├── 📄 Pages
│   ├── Homepage — Desktop 1440
│   ├── Homepage — Tablet 768
│   ├── Homepage — Mobile 375
│   └── Homepage — Annotated (motion + interaction notes)
└── 🗂 Handoff
    ├── Production-ready frames
    ├── Asset exports
    └── Dev specs (for Framer handoff)
```

Each section in the Homepage page is its own Auto Layout frame, labeled `§01 Hero`, `§02 Identity Strip`, etc. — matching the section IDs throughout this document.

---

*End of design system specification. Ready for Figma.*
