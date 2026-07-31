# Zuniga Studio — Lessons learned

*Append-only log of technical gotchas and design-direction learnings from the build. Read before debugging anything that feels familiar. Format borrowed from `websites/LESSONS.md`.*

---

## 2026-05-14 — `background-clip: text` doesn't propagate to child spans painting the text

**Context:** Hero "MEAN IT." and closing "the work." are wrapped in `<em>` with `background: var(--gold-foil); background-clip: text; color: transparent` to render the words as metallic gradient text. After adding kinetic typography (which wraps each letter in `.letter-kin > .letter` spans via JS), the user reported "the last two words of the header are not visible."

**Problem:** `background-clip: text` only clips the background to text **painted directly by that element**. Once the actual letters are rendered by inner `<span>` children, the parent `<em>` no longer paints any text directly — so its clipped background has nothing to map to and renders as nothing. The inner spans inherit `color: transparent` but have no background of their own. Result: completely invisible.

**Fix:** Push the `background-clip: text` declaration **down to the innermost spans that actually render letters**. In CSS: `.hero-headline em .letter { background: var(--gold-foil); background-clip: text; color: transparent; ... }`. Use `background-size` ≥ 250% on the letter (rather than 200% on the em) so the foil reads consistently across letters even though each letter has its own gradient.

Also add an `@supports not (background-clip: text)` fallback to a solid gold color for browser compatibility.

**Status:** confirmed

---

## 2026-05-14 — `display: contents` breaks IntersectionObserver

**Context:** §06 Approach was structured with `.approach-timeline` as a 2-column grid (numeral col + content col), and `.phase` used `display: contents` so each phase's numeral and content would flatten into direct grid items of the timeline. Each `.phase` had `data-reveal` for the IntersectionObserver reveal system. User reported that only the Roman numerals were visible in the Process section — names, descriptions, and deliverables were missing.

**Problem:** Elements with `display: contents` have no layout box. **IntersectionObserver does not fire for elements without a layout box.** So `.phase` never received the `is-revealed` class, which meant `.phase-content` (default `opacity: 0; translateX(-24px)`) never animated to visible. Numerals were visible because they don't have that transition baked in — their default state is opacity 1.

**Fix:** Move the 2-column grid down from `.approach-timeline` to each `.phase`. Each phase is now its own `display: grid; grid-template-columns: 160px 1fr` block, gaining a real layout box. The absolutely-positioned `.approach-rule` still works because it's positioned relative to `.approach-timeline`. IntersectionObserver fires correctly. `is-revealed` is added. Content animates in.

**Status:** confirmed

**Related anti-pattern:** any element that needs IntersectionObserver-driven reveals must have its own box. Avoid `display: contents` on elements with `data-reveal`. If subgrid is needed for column alignment, restructure rather than reach for `display: contents`.

---

## 2026-05-14 — `overflow: hidden` on word containers clips kinetic parallax

**Context:** During the editorial reveal system, `.word` was given `overflow: hidden` so the per-letter `translateY(110%)` slide-up was visually masked (letter starts below the word baseline, hidden, slides into view). Then kinetic typography was added on top: each letter wrapped in `.letter-kin` that translates ±10px based on mouse magnetism. User reported the last two words of the header not visible on both mobile and laptop.

**Problem:** With `overflow: hidden` on the word, **any kinetic shift of a letter beyond the word's natural bounds gets clipped**. Letters near the edges of their words would visually disappear or be cut off as the cursor approached. Combined with the `background-clip: text` bug above, the gold em words were completely invisible.

**Fix:** Remove `overflow: hidden` from `.word`. Replace the heavy `translateY(110%)` slide-up reveal with a softer `translateY(40%)` + opacity transition. The opacity does the visual masking — letters are invisible during the early part of slide (opacity 0) and become visible only as they near their natural position. No clipping needed.

**Status:** confirmed

**Lesson generalized:** when adding a mouse-driven motion system on top of an existing reveal system, audit all `overflow: hidden` constraints. They were fine when motion was scripted and predictable. They break when motion can flow in any direction.

---

## 2026-05-14 — Editorial atmosphere vs interaction-first product feel

**Context:** First draft of the homepage felt "static and premium" — clean, editorial, magazine-like. User said it should feel "like a story / want to keep scrolling." First response was to add **film grain SVG overlay** and **ambient radial gradients** on §03 Manifesto, §05 Selected Work, §06 Approach. User pushed back hard: "I do NOT want additional grain, ambient gradients, or magazine-style texture. I want the website itself to feel responsive and immersive." Specifically called out wanting kinetic typography, scroll storytelling, SVG-based motion systems, interactive hero, layout transformations, shape morphing.

**Problem:** Atmosphere (grain, drift, gradient) makes the site feel **printed** — like a magazine. The visitor doesn't interact with atmosphere, they observe it. For a studio whose pitch is "we specialize in interactive web experiences," atmosphere reads as the wrong category. The reference points are Apple product launches, Framer showcase sites, award-winning agency portfolios — not architecture portfolios or editorial layouts.

**Fix:**
- Stripped all grain and ambient gradients.
- Built kinetic systems: mouse-magnetized letters (hero + closing), scroll-velocity marquee (§02), 3D card tilt + stroke-draw icons + Z-layered numerals (§04), traveling gold dashes on a vertical SVG line (§06), slot-machine number scramble (§07), breathing map + cursor-driven 3D tilt + gold ripple on hover (§08).
- Documented the new direction in `INTERACTION-SYSTEM.md` with per-section 5-point treatment.

**Status:** confirmed

**How to apply next time:** for premium studios that position around "interactive experiences," default to interaction-driven motion BEFORE atmospheric texture. Atmosphere reads as editorial / luxury-print. Interaction reads as product / software. Pick the right metaphor for the studio's positioning, not just for the visual taste of the moment.

---

## 2026-05-14 — Service-business demo: distinctive vs conversion-template (cross-applies)

**Context:** Earlier in the same session, building the American Pressure Clean demo under Social Noodle Studio (pre-rebrand). First pass came out generic "AI-default" SaaS aesthetic. Used `frontend-design` skill for v2 → bold industrial-editorial direction. User liked it but raised the legitimate concern that it might not be the right look for a homeowner-facing service business.

**Problem:** Distinctive editorial design and small-business conversion design pull opposite directions:
- **Pitch piece** (the demo we use to win the client) → distinctive wins. Editorial signals "designer, not template-shop."
- **Live conversion site** (what the client's customers see and call from) → conventional wins. Familiar trust-template patterns convert; novelty creates friction.

**Fix / rule:** Before invoking a distinctive-design skill or system, ask: **"Is this primarily a pitch piece for the prospect, or a live site for the prospect's customers?"** Capture the answer in NOTES.md before building.

**Status:** confirmed (originally captured in `websites/LESSONS.md`, re-recorded here because it applies to Zuniga work too — Zuniga is the studio's own pitch piece, so distinctive at full strength is correct)

---

## 2026-05-14 — `display: contents` on grid children + IntersectionObserver lesson (generalized)

This is the broader principle behind two of the bugs above:

**Animation systems and layout systems need to be designed together.** When you reach for a layout trick (`display: contents`, `overflow: hidden`, absolute positioning) that solves a layout problem cleanly, audit how it interacts with:
- IntersectionObserver (needs layout boxes)
- Per-element transforms (need their own transform context)
- Pointer events (some layout tricks break hit-testing)
- Stacking contexts (z-index can interact unexpectedly with layout properties)

For Zuniga specifically: the kinetic typography + reveal system + 3D card tilt + sticky scroll storytelling layers are all going to compete for the same transform and overflow properties. Future iterations should map out which element layer owns which property before adding new motion.
