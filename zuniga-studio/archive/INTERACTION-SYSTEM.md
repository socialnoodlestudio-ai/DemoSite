# Zuniga Studio — Homepage Interaction System

*Replaces the editorial-atmosphere treatment with an interaction-first system. The site behaves as a living digital product, not a digital magazine. Each section is built around motion, response, and visible state — not grain, gradients, or print-style texture.*

*Companion to `BLUEPRINT.md`, `HOMEPAGE-CONCEPT.md`, and `DESIGN-SYSTEM.md`.*

---

## Operating principles

Five rules that govern every motion decision on the page:

1. **Atmosphere is the wrong tool.** No grain, no ambient radial gradients, no parchment textures. The page is responsive surface, not aged paper.
2. **Every motion has a cause.** Motion is triggered by scroll, mouse, hover, or activation — not by ambient decoration. Decorative loops are reserved for elements that *are* the interaction (the flowing rule, the marquee, the breathing map).
3. **Letters, lines, and shapes are software.** They respond to the visitor — magnetize, deform, draw themselves, redraw. Type is alive.
4. **Section transitions are interaction events.** When you scroll from one section to the next, something resolves, slides, or transforms. Sections do not stack like printed pages.
5. **Performance is the felt experience.** Frame-perfect transforms over filters, GPU compositing, `will-change` where appropriate, `requestAnimationFrame` for everything that updates per-frame.

For every section below, the five questions are answered in order:
**(1) How does the section move? (2) What reacts to scroll? (3) What reacts to hover? (4) What SVG / motion elements are present? (5) How does it transition into the next section?**

---

## Global Layer — The Persistent Frame

A small system that lives above all sections.

**1. How it moves.** The custom cursor follows the mouse with spring physics — a 12px obsidian disc that leads, a 28px ring that trails by ~80ms. The nav bar's background animates in (`opacity 0 → 0.92` + blur) when scrolled past 20px. The floating Start a Project CTA enters from below with a 500ms ease-out lift after 600px of scroll.

**2. What reacts to scroll.** Nav background opacity, floating CTA visibility, and the reading progress fill on the right edge (a thin gold-sheen line that grows downward as the visitor descends, paired with a gold dot at the leading edge).

**3. What reacts to hover.** The cursor expands into a ring over any interactive element, fills with gold over primary CTAs. Nav links draw a gold underline from left to right (200ms). The float CTA gains a deeper shadow and lifts 2px.

**4. SVG / motion elements.** The cursor itself is two animated DOM elements with `transform: translate3d` driven each frame. Reading progress is two absolutely-positioned divs animated via CSS `height` + `top` transitions.

**5. Transition.** The frame is always present. It does not transition between sections — it is what holds the sections together.

---

## §01 Hero — Kinetic Opening

**1. How it moves.** The headline writes itself in letter by letter with a 30ms stagger (`translateY(110%) → 0` per letter, ease-out 600ms). Once revealed, every letter becomes mouse-magnetized — each letter shifts up to ~10px toward the cursor based on proximity, falling off quadratically over a 360px radius. The vertical gold rule on the right has a perpetual flowing gradient (5s cycle) and a gold dot that travels top-to-bottom continuously, drawing the eye downward and signaling "scroll."

**2. What reacts to scroll.** The hero mark (Roman numeral + rule) drifts upward at 0.18× scroll speed, the lede paragraph at 0.08× — creating subtle parallax depth. The scroll cue chevron hides on first scroll input. The nav frame solidifies past 20px scroll.

**3. What reacts to hover.** The Roman numeral "I" — on hovering the right-column hero mark, the numeral scales 1.5× **and rotates 360°** in a single 500ms `cubic-bezier(0.34, 1.56, 0.64, 1)` move (the overshoot easing gives it physical character), simultaneously transforming into the metallic gold foil via `background-clip: text`. The Cinzel "MEAN IT." emphasis word continuously drifts its foil gradient on an 8s cycle whether you interact or not — a subtle pulse of metallic life. Primary CTA lifts 2px and the gradient travels from `0% 50%` to `100% 50%` (shimmer pass).

**4. SVG / motion elements.** The vertical gold rule is a CSS gradient with `background-size: 100% 300%` and `background-position` animated. The traveling dot is a pseudo-element with `top` animated 0 to 100% over 5s. Per-letter mouse magnetism is implemented via `transform: translate3d(var(--kx), var(--ky), 0)` on inline-block wrappers, updated each frame via `requestAnimationFrame`.

**5. Transition.** Hero → Identity: the hero releases at the bottom — its ivory surface ends abruptly into the obsidian marquee band. The visual contrast is itself the transition. The traveling dot reaches the bottom of the rule just as the marquee begins, handing scroll motion to scroll velocity.

---

## §02 Identity Strip — Scroll-Velocity Marquee

**1. How it moves.** A horizontal marquee of large Cinzel words ("Boutique design practice rooted in Florida ✦ Strategy & brand ✦ Hand-coded websites ✦ Local SEO that ranks ✦ Selective engagements") slides continuously leftward at a base speed of 0.4px/frame. Each ✦ separator rotates at 8s/cycle. The whole band is on an obsidian surface that creates a hard visual break from the cream sections on either side.

**2. What reacts to scroll.** **Scroll velocity boosts the marquee speed.** A scroll listener tracks `Δy` per frame, accumulates a velocity value (capped at 30), and adds it to the per-frame translation. Fast scrolling makes the marquee race; slow scrolling lets it cruise. The boost decays exponentially at 0.92× per frame, so the marquee gradually returns to base speed after the scroll stops. The visitor *feels their scroll* in the band.

**3. What reacts to hover.** Hovering a marquee word scales it 1.08× and transforms it into metallic gold-foil text (the foil gradient with `background-clip: text`). The word lights up as the cursor crosses it; the rest stay obsidian-on-obsidian.

**4. SVG / motion elements.** No SVG. The marquee is a flex row with `transform: translate3d` updated each frame. Two identical sets of items are placed back-to-back; when the position has scrolled one set's width, it snaps back by that width — seamless loop. Gradient masks on the left and right edges fade the text into the surface.

**5. Transition.** Identity → Manifesto: the obsidian band ends, the cream surface begins. The manifesto's pull statement reveals word-by-word as soon as it crosses the viewport threshold — visually catching the energy released by the marquee.

---

## §03 Manifesto — Word-by-Word Kinetic Reveal

**1. How it moves.** The pull statement reveals word-by-word with an 80ms stagger (`translateY(40%) → 0` + opacity, 600ms ease-out per word). After the final word lands, a thin gold-sheen rule writes itself horizontally beneath the statement (left-to-right, 600ms). Body paragraphs fade up with a 200ms stagger between them.

**2. What reacts to scroll.** Each element triggers its reveal at the moment its top edge crosses 88% of the viewport (Intersection Observer with `threshold: 0.12`). Once revealed, the section is static — the kinetic moment is the entrance.

**3. What reacts to hover.** The emphasized phrase ("the same restraint, the same intention") draws a gold-sheen underline from left to right (500ms) on scroll, and remains visible after. There is no hover interaction on the body text — the manifesto is a reading section.

**4. SVG / motion elements.** No SVG. All motion is CSS transform + opacity transitions driven by Intersection Observer class toggles.

**5. Transition.** Manifesto → Services: the cream surface continues into the ivory Services section. The visual handoff is a subtle background lightening. The Services section's anchor heading slides in as soon as it crosses threshold.

---

## §04 Services Atlas — 3D Cards, Stroke-Drawn Icons, Z-Layered Depth

**1. How it moves.** Cards reveal sequentially with an 80ms stagger on scroll. Once the section is in view and the cursor enters the grid, a soft gold radial spotlight (~500px diameter) tracks the cursor position across the section via a CSS custom property updated per `mousemove`. Each card has its own internal radial that intensifies when the card is hovered.

**2. What reacts to scroll.** Card entry only — they fade-up and stagger in. The section is built for interaction once revealed, not scroll progression.

**3. What reacts to hover.** This is where the section comes alive:
- **3D card tilt:** each card uses `transform: perspective(1000px) rotateX(...) rotateY(...)` driven by the cursor's offset from the card's center. Maximum tilt is ±6°. On `mouseleave`, the rotation springs back to zero over 300ms.
- **Z-layered depth:** the card's body content translates +20px on the Z-axis and the Roman numeral translates +40px on Z, **scaling 1.5×** and transforming into metallic gold-foil text via `background-clip`. Lift creates real perceived depth.
- **Stroke-drawn SVG icons:** each service icon's paths have `stroke-dasharray: 500; stroke-dashoffset: 500` by default (invisible). On hover, `stroke-dashoffset` transitions to 0 over 1000ms — **the icon draws itself in front of the visitor**. Fill elements (the small dot in the magnifying glass, etc.) fade in 600ms after the strokes begin.
- **Card hover:** lifts -6px, gains a 32px shadow + 1px gold-deep border, background tints from cream to cream-deep.
- The internal radial spotlight intensifies (`rgba(220, 190, 94, 0.18)` from transparent), creating a localized warm glow under the cursor.

**4. SVG / motion elements.** Five custom service icons (Website Design = browser frame, Local SEO = search lens, E-Commerce = shopping cart, Maintenance = clock, Brand = shield/check) are line-illustrations with `stroke-linecap: square` and `stroke-linejoin: miter`. They are 56px and live in the top-right corner of each card. The stroke-draw on hover is the section's signature interactive moment.

**5. Transition.** Services → Selected Work: ivory surface gives way to cream. The Selected Work anchor heading enters with a fade-up. The shift in background tone signals a chapter break without needing a hard divider.

---

## §05 Selected Work — Stamped Image Reveals + Counter Scrambles

**1. How it moves.** Each spotlight enters with a substantial coordinated motion: the device-frame mockup image stamps in (scales 0.92 → 1.0 + opacity over 800ms, `--motion-stamp` easing), the text content fades up with a 200ms lag, and the outcome stat number counts from 0 to final value over 800ms.

**2. What reacts to scroll.** **Boosted parallax** — the mockup image translates ±30px relative to the spotlight container as it passes through the viewport (0.85× scroll speed) and stays scaled 1.08× to give it cinematic depth. The text content moves at a slower rate (±20px) so image and text have visibly different parallax planes — layered depth via differential speed.

**3. What reacts to hover.** The mockup gains a 1.02× scale. The cursor changes into the `View` ring (custom cursor state with "View" text inside). The "View Case Study →" link gets an underline that draws from left and the arrow translates 6px right.

**4. SVG / motion elements.** The mockups are pure CSS — device chrome (mock window dots on a top bar), gradient backgrounds, and the brand mark inside (PF, D). On scroll, these compose into a moving editorial image without needing real screenshots in this build. Real client screenshots would replace the mock layer at production.

**5. Transition.** Work → Approach: cream gives way to ivory. The Approach section's anchor heading enters, immediately followed by Phase I sliding in horizontally from -24px with the gold rule beginning to populate.

---

## §06 Approach — Traveling Dashes, Activating Phases, Connector Stubs

**1. How it moves.** The signature motion is a vertical gold rule with **continuously traveling dashes** running top to bottom — a `stroke-dasharray: 3 18` pattern with `stroke-dashoffset` animated from 0 to -42 over 2.4s, infinite. It reads as **data flowing down the timeline**. Behind it, a static obsidian-faint base line. Over it, a scroll-driven progress line that grows downward as the visitor scrolls through the section.

**2. What reacts to scroll.** Three things:
- The progress line's `stroke-dashoffset` is tied directly to scroll position within the section. As the visitor descends, the gold trail extends, marking how far they've read.
- Phase activation: when a phase's center enters the middle 40% of the viewport, the phase gains `is-active` — its Roman numeral fills with the animated metallic gold-foil (with a `foilDrift` 6s loop), the numeral shifts -8px to the left toward the rule, and a horizontal gold connector "stub" (`var(--space-6)` wide, 2px tall, with a soft gold glow) draws itself from the rule to the phase content over 500ms.
- Phase reveal: each phase's content slides in from `translateX(-24px) opacity 0` to `translateX(0) opacity 1` when scrolled into view.

**3. What reacts to hover.** Hover on a phase content block subtly intensifies (no major change — the active state is the primary feedback). The phase deliverable line stays in metallic gold throughout.

**4. SVG / motion elements.** Three stacked SVG `<line>` elements forming the rule: base (static), traveling dashes (CSS animation), progress trail (JS-driven `stroke-dashoffset`). Each phase has its own 32px line-illustration icon (magnifier, grid, frame, ascending chart) inline with the phase name.

**5. Transition.** Approach → Proof: ivory surface ends, obsidian begins. This is the page's strongest tonal contrast — the visitor crosses from light to dark just as the metrics arrive. The shift signals "now the evidence."

---

## §07 Proof — Number Scramble + Cinematic Quote

**1. How it moves.** When the section enters view, all four metric numbers **scramble**: for ~700ms they cycle through random digits of the target's length (each frame), like a slot machine. Then they settle into a smooth count-up to the target value over 600ms with `ease-out-cubic`. The "1:1" and "FL" metrics (non-numeric) appear directly. The testimonial quote then reveals — the gold opening quote-mark fades in first, then the pull-quote letters reveal letter-by-letter with a slight blur-to-clear effect.

**2. What reacts to scroll.** The section trigger is scroll into viewport (Intersection Observer, threshold 0.4). The metric numbers begin scrambling, settle, then the quote begins. Subtle vertical light gradient on the obsidian background drifts at 0.05× scroll.

**3. What reacts to hover.** No primary hover interactions in this section — it is a "watching" moment. The cursor remains in default obsidian-on-obsidian (visible via difference blend mode).

**4. SVG / motion elements.** None. The scramble is JavaScript text-content cycling on the metric elements. The gold rule between metrics and quote is the standard sheen gradient (140px wide, 1.5px tall).

**5. Transition.** Proof → Coverage: obsidian ends, cream begins. The cream is a relief after the obsidian's intensity. The coverage section's anchor heading "Florida-Based · Statewide" fades up.

---

## §08 Florida Coverage — Living Map, Breathing Outline, Cursor-Tilted

**1. How it moves.** The Florida outline has a continuous **breathing animation** — `scale(1) → scale(1.012)` paired with `opacity 1 → 0.92` on a 7-second `ease-in-out` infinite loop. The map *inhales and exhales*. The whole SVG has a 3D tilt that follows the cursor (`rotateX`/`rotateY` up to ±8°), driven by `mousemove` over the map container.

**2. What reacts to scroll.** When the section enters view, the nine city dots illuminate sequentially with an 80ms stagger. Each illuminated dot then begins its own pulse cycle (a `dotPulse` animation at 2.4s + a random per-dot delay so they don't all pulse in unison). The dots continue pulsing indefinitely.

**3. What reacts to hover.** Two layered behaviors:
- **Two-way binding:** hovering a city name on the right highlights its dot on the map (scale 1.6× + brighter gold + class `is-hover`). Hovering a dot highlights its city name (gold underline + brighter dot).
- **Gold ripple:** when a city is hovered (either via name or dot), a separate concentric SVG `<circle>` at the dot's position animates — `scale(1) → scale(6)` over 1.2s with opacity fading from 0.9 to 0 and `stroke-width` shrinking 2.5 → 0.5. The dot **broadcasts a gold ripple outward across the map**.

**4. SVG / motion elements.** A custom hand-drawn Florida outline SVG path (60+ Bezier control points). Nine `<circle class="city-dot">` markers. Nine paired `<circle class="city-ripple">` siblings inserted via JS, positioned identically, ready to animate on hover. The cursor changes to the `Serving` ring over cities and dots.

**5. Transition.** Coverage → Studio Note: cream continues into cream (no tonal shift). The studio note has a subtle top border to acknowledge the section change. The portrait reveals with a slow scale (1.04 → 1.0) + opacity, taking the visitor's attention from map to face.

---

## §09 Studio Note — Portrait Reveal + Signature Draw

**1. How it moves.** The portrait scales from 1.04 to 1.0 over 800ms while opacity fades up. Letter paragraphs fade in with a 200ms stagger after the portrait completes. The handwritten signature SVG path animates via `stroke-dashoffset` from 800 to 0 over 800ms — **the letter is being signed in front of the visitor**. The first paragraph's first character is rendered as a 4em metallic gold-foil drop-cap (Cinzel, line-height 0.85).

**2. What reacts to scroll.** Triggers on viewport intersection (threshold 0.4). The signature delays 800ms after entering view, drawing itself slowly.

**3. What reacts to hover.** Hovering the portrait shifts its filter from black-and-white toward low-saturation color over 400ms (`filter: saturate(0.6) hue-rotate(-10deg)`). The portrait *responds* — Clarisa "appears" when the visitor pays attention. On `mouseleave`, the filter reverses over 600ms.

**4. SVG / motion elements.** The portrait is a stylized SVG silhouette (placeholder until photography is commissioned). The signature is a hand-drawn SVG path with `stroke-dasharray: 800; stroke-dashoffset: 800` by default, animating to 0 on viewport entry. A small "CLARISA ZUNIGA" caption sits at the bottom of the portrait frame.

**5. Transition.** Studio Note → Field Notes: cream gives way to ivory. The field notes' anchor heading fades up, immediately followed by the three article cards staggering in.

---

## §10 Field Notes — Type-Only Discipline

**1. How it moves.** Three article cards fade up with a 100ms stagger on scroll. Otherwise the section is intentionally static — minimal kinetic noise. This is the discipline moment of the page.

**2. What reacts to scroll.** Card entry only.

**3. What reacts to hover.** Each card gains:
- Gold underline beneath the article title, drawing left-to-right (300ms).
- A thin horizontal gold rule extends from the card's right edge into the gutter, drawing right (24px over 400ms).
- The "Read →" link arrow translates 4px right.
- The cursor changes to the `Read` ring with "Read" text inside.

No image, no scaling, no color shift. The interaction is precise, not dramatic.

**4. SVG / motion elements.** None. Pure typography + CSS pseudo-elements for the underline and gutter rule.

**5. Transition.** Field Notes → Closing: ivory gives way to obsidian. The closing statement begins to write itself in letter-by-letter the moment the section crosses threshold. The most dramatic tonal shift since the Proof section.

---

## §11 Closing Invitation — Letter Reveal + Ambient Gold Pulse

**1. How it moves.** The closing statement "Let's begin / the work." reveals letter-by-letter with a slower 50ms stagger (compared to the hero's 30ms) — the closing should feel weightier. The "the work." em element is rendered in metallic gold-foil with the same `foilDrift` animation as the hero's "MEAN IT.". After the final letter resolves, the two CTAs fade in side-by-side with a 200ms stagger.

**2. What reacts to scroll.** A faint radial gold-soft gradient at the viewport center pulses on an 8-second cycle (0% → 4% opacity → 0%). The pulse is subtle enough that visitors feel "the room is breathing" but never recognize the source. Letter reveal triggers on viewport entry.

**3. What reacts to hover.** Primary CTA fills with the foil gradient and the gradient travels (shimmer pass). Secondary CTA's outline thickens. The email link in the meta line shifts to ivory on hover.

**4. SVG / motion elements.** None. The closing is pure typography + CSS gradient pulse. The letter reveal uses the same `.letter-kin → .letter` system as the hero, so mouse magnetism applies here too — the closing statement responds to the cursor just like the opening did.

**5. Transition.** Closing → Footer: obsidian continues into obsidian. The footer's substantial four-column layout fades in as the visitor crosses into it. There is no tonal break — the page bottom is one continuous dark room.

---

## Footer — Quiet Closer

**1. How it moves.** Minimal motion. The footer is intentionally the quietest zone on the page. No reveal animations.

**2. What reacts to scroll.** Nothing.

**3. What reacts to hover.** Footer links draw a gold underline from left to right (200ms). The wordmark gains an underline + slight scale. The email link shifts color.

**4. SVG / motion elements.** None.

**5. Transition.** This is the bottom. The visitor either scrolls back up (where reading progress retreats and sections reverse) or clicks Start a Project.

---

## What's deliberately *not* in this system

The user explicitly requested these be removed and they are:

- ❌ Film grain overlay (removed from HTML and CSS)
- ❌ Ambient radial gradients on Manifesto, Selected Work, Approach (all removed)
- ❌ Editorial / parchment / aged-paper aesthetic
- ❌ Slow ambient drift used for "atmosphere"

And these are not implemented in this build, but represent the natural next iteration if the direction holds:

- ⏳ Sticky scroll storytelling on Selected Work spotlights (each spotlight pins as you scroll into it, mockup animates while pinned, releases on exit)
- ⏳ Number scrambles in the spotlight outcome stats (currently use the standard counter)
- ⏳ Service card content typing in letter-by-letter on hover
- ⏳ Path morphing between phase icons in §06 (I → II → III → IV transitions)
- ⏳ Particle gather effect before the closing statement resolves
- ⏳ Per-section "data thread" — a single gold path that travels from Hero rule → Approach rule → Closing pulse, visually connecting the page as one circuit

---

## Performance & accessibility floor

- All motion respects `prefers-reduced-motion: reduce`. Reveal animations become instant. The cursor system is hidden entirely. The marquee, breathing map, and ambient pulses stop.
- Mouse magnetism, 3D card tilt, and map tilt are all gated by `prefers-reduced-motion` and `@media (hover: none)`.
- Per-frame work (cursor, marquee, parallax, letter magnetism) runs through `requestAnimationFrame` with `passive` scroll listeners.
- All transformed elements use `will-change: transform` where the transform updates per-frame.
- Reading progress, marquee, and cursor are hidden under 880px viewport to preserve mobile performance and reduce visual noise.

---

## What changed from the editorial treatment

| Editorial direction (rejected) | Interaction-first direction (current) |
|---|---|
| Film grain SVG overlay | Removed |
| Ambient radial gradients in §03, §05, §06 | Removed |
| Reading progress bar (kept — works either way) | Kept |
| Letters: simple translateY reveal | Letters: translateY reveal **+ mouse-magnetism via `.letter-kin` wrapper** |
| Hero rule: static obsidian line | Hero rule: **flowing gradient + traveling gold dot** |
| Hero Roman numeral: static | Roman numeral: **scale 1.5× + 360° rotate + foil-text on hover** |
| Identity strip: single centered line | Identity strip: **scroll-velocity marquee** with rotating ✦ separators |
| Service icons: hidden, slide in on hover | Service icons: **stroke-draw themselves** on hover via `stroke-dashoffset` |
| Service cards: lift + shadow on hover | Service cards: **3D tilt** + **Z-axis layering** + **per-card radial spotlight** + lift |
| Service numerals: gold color on hover | Service numerals: **scale 1.5× + Z-translate +40px + metallic foil** on hover |
| Approach rule: static drawn on scroll | Approach rule: **base line + traveling dashes loop + scroll-driven progress trail** |
| Phase activation: numeral color shift | Phase activation: foil numeral + **horizontal gold connector stub** drawing from rule to content + numeral translates -8px |
| Proof counters: smooth count-up | Proof counters: **slot-machine scramble** then settle |
| Florida map: static outline + sequential dot illumination | Florida map: **breathing outline** + **continuously-pulsing dots** with desynced delays + **cursor-driven 3D tilt** + **gold ripple on dot hover** |
| Studio portrait: B&W → color on hover (kept) | Same |
| Closing: letter reveal + gold pulse (kept) | Same + closing letters also use mouse-magnetism |

The result: every visible element of the page is either responding to the visitor or signaling its own life. The site is software, not paper.
