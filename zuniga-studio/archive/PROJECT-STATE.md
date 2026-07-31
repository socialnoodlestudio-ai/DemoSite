# Zuniga Studio — Project State

*Single source of truth for the project. Updated at session boundaries so any future Claude session can pick up the thread without re-deriving context.*

*If you're a future session: start here, then read whichever document(s) are relevant to the task.*

---

## What this project is

Zuniga Studio is **the rebrand of Social Noodle Studio** — Juan's Florida web design agency. The new positioning is a **premium boutique design studio** targeting Florida small businesses, presented as **founder-led by Clarisa Zuniga** (real person, not fiction). The rebrand is substantial: from accessible hand-built demos to editorial/architectural premium.

**Legacy brand:** Social Noodle Studio. Repo: `socialnoodlestudio-ai/DemoSite` (still active with demos for PF Auto Style, Devise Fashion, American Pressure Clean).

**Forward brand:** Zuniga Studio. Local project: `C:\Users\juand\OneDrive\Desktop\Claude Projects\zuniga-studio\`. No GitHub repo yet — pending migration decision.

---

## Document map (read in this order if new)

1. **`BLUEPRINT.md`** — Strategy. Why this brand exists, voice convention, assumption table (A1–A5). The "why."
2. **`HOMEPAGE-CONCEPT.md`** — Cinematic walkthrough of the homepage experience. Present-tense narrative. The "what it feels like."
3. **`DESIGN-SYSTEM.md`** — Technical visual spec. Type scale, color tokens, spacing, grid, motion, cursor. Per-section visual specs with 7 elements. The "what it looks like."
4. **`INTERACTION-SYSTEM.md`** — Interaction-first redesign. Per-section: how it moves, what reacts to scroll, what reacts to hover, SVG/motion elements, transitions. **This document supersedes the editorial direction in `HOMEPAGE-CONCEPT.md` and parts of `DESIGN-SYSTEM.md`** wherever they conflict.
5. **`LESSONS.md`** — Technical gotchas + design-direction learnings discovered during this build. Append-only. Read before debugging anything that feels familiar.

---

## What's actually built

### Files

```
zuniga-studio/
├── BLUEPRINT.md
├── HOMEPAGE-CONCEPT.md
├── DESIGN-SYSTEM.md
├── INTERACTION-SYSTEM.md
├── PROJECT-STATE.md        ← this file
├── LESSONS.md
└── homepage/
    ├── index.html          ← full homepage, 13 frames + footer
    ├── styles.css          ← interaction-first implementation
    ├── script.js           ← all motion + interaction systems
    └── qr-code.png         ← LAN preview QR (gitignored if a repo gets added)
```

### Preview server config

Lives in `C:\Users\juand\OneDrive\Desktop\Claude Projects\.claude\launch.json` as the entry `zuniga-homepage`:

```json
{
  "name": "zuniga-homepage",
  "runtimeExecutable": "python",
  "runtimeArgs": ["-m", "http.server", "8001", "--bind", "0.0.0.0", "--directory", "zuniga-studio/homepage"],
  "port": 8001
}
```

Launch in Claude Code: `preview_start` with name `zuniga-homepage`.

**Preview URLs:**
- Laptop: `http://localhost:8001/`
- Phone (same Wi-Fi): `http://<LAN-IP>:8001/` — LAN IP at last check was `10.0.0.83` but can change
- QR for phone: `zuniga-studio/homepage/qr-code.png`

### What renders in the browser

Full 13-frame homepage:

- **§01 Hero** — Cinzel headline "Quiet design / for businesses / that <em>mean it.</em>" with letter-by-letter reveal and mouse-magnetism per letter. Vertical gold rule on right with flowing gradient + traveling gold dot. Roman numeral "I" that scales 1.5× + rotates 360° + transforms to foil on hover.
- **§02 Identity Strip** — Obsidian band with scroll-velocity Cinzel marquee. Items: "Boutique design practice rooted in Florida ✦ Strategy & brand ✦ Hand-coded websites ✦ Local SEO that ranks ✦ Selective engagements". Spinning gold ✦ separators. Hover any word → metallic gold foil + scale.
- **§03 Manifesto** — Cream background. Pull statement "Small businesses deserve a serious studio." reveals word-by-word. Gold sheen rule below. 3 body paragraphs with emphasized phrase "the same restraint, the same intention" gaining gold underline.
- **§04 Services Atlas** — Ivory background, 2-col grid. Primary card (Website Design & Redesign) spans full-width with cream gradient. 4 supporting cards (Local SEO, E-Commerce, Maintenance, Brand Identity) in 2×2 below. 3D card tilt on cursor (±6°), Z-layered depth (body +20px Z, numeral +40px Z + 1.5× scale + foil), per-card radial spotlight, SVG icons that stroke-draw themselves on hover (stroke-dashoffset 500 → 0 over 1000ms).
- **§05 Selected Work** — Cream. 2 case study spotlights (PF Auto Style + Devise Exclusive Fashion, carrying forward from Social Noodle legacy). Editorial device-frame mockups in pure CSS (PF: dark gradient with orange "PF" mark, Devise: maroon gradient with gold "D"). Boosted parallax (±30px image, ±20px text, image at 1.08× scale). Counter animations for outcome stats.
- **§06 Approach** — Ivory. 4-phase timeline. Each phase is its own `display: grid` (NOT `display: contents` — see LESSONS.md). Gold vertical rule with 3 layers: base obsidian-faint line + continuously-traveling dashes (data-flow effect) + scroll-driven progress trail. Active phase: foil numeral, -8px x-shift, horizontal gold connector stub draws from rule to content. Phase content slides in from -24px x.
- **§07 Proof** — Obsidian. 4 metrics with **slot-machine scramble** (700ms random digit cycling) then settle (600ms count-up). Anchor testimonial (placeholder, not fabricated) with letter-by-letter pull-quote and gold opening quote-mark.
- **§08 Florida Coverage** — Cream. Living custom Florida outline SVG (continuous 7s breathe), 9 city dots that pulse continuously on individually-delayed cycles. Cursor-driven 3D tilt of whole map. Hover a city or dot → gold ripple circle scales 1 → 6 with fading opacity. Two-way binding between city names and dots.
- **§09 Studio Note** — Cream, two-column. Abstract SVG portrait silhouette (placeholder for commissioned photography of Clarisa). Founder's letter with gold-foil drop-cap. Handwritten signature SVG draws itself on scroll via stroke-dashoffset.
- **§10 Field Notes** — Ivory. Three type-only article cards (no images — discipline). Hover: gold underline + horizontal rule extending into gutter.
- **§11 Closing** — Obsidian. "Let's begin / <em>the work.</em>" letter reveal at 50ms stagger (weightier than hero). Same mouse-magnetism. Gold radial pulse cycle 8s.
- **Footer** — Obsidian. 4-column substantial footer with gold rule.

### Global persistent layer

- **Custom cursor** — 12px obsidian disc + 28px trailing ring with spring physics. State changes: interactive (over links), gold (over primary CTAs), text (over text).
- **Reading progress** — Right edge. Thin gold-sheen vertical line that grows downward + gold dot at leading edge.
- **Nav** — Transparent over hero, solidifies to ivory+blur on scroll.
- **Floating CTA** — Bottom-right, appears after 600px scroll, hides over contact section.

### Color system (locked)

```css
--obsidian:     #0A0A0A
--ivory:        #FCFBF9
--cream:        #F4ECD8       /* cooler than original #F7EAC4 */
--cream-deep:   #ECDFC0
--gold:         #C9A227       /* richer, less yellow than original #D4AF37 */
--gold-light:   #EDDA9C
--gold-bright:  #DCBE5E
--gold-deep:    #8B6914
--bronze:       #8B6914
--gold-foil:    linear-gradient(135deg, #EDDA9C, #DCBE5E, #C9A227, #8B6914, #B8911F, #DCBE5E)
--gold-sheen:   linear-gradient(90deg, #8B6914, #DCBE5E, #EDDA9C, #DCBE5E, #8B6914)
```

### Type system (locked)

- **Display:** Cinzel (700 bold), never below 24px. Loaded from Google Fonts.
- **Body:** Inter (400/500), Söhne preferred when licensed. Loaded from Google Fonts.

---

## Voice convention (critical — never break)

Zuniga Studio is **founder-led by Clarisa Zuniga**, a boutique practice currently, designed to scale. Voice must hold both truths:

- **"I"** appears when describing direct work, working sessions, the founder's hand
- **"Zuniga Studio"** appears as the brand entity describing positions, beliefs, processes
- **"We"** used sparingly, only in established-discipline contexts (never implies team headcount)
- **Never fabricate team scale.** Premium audiences read fabricated team size instantly.

This rule comes from the user's direct correction during the BLUEPRINT phase. See assumption A3 in `BLUEPRINT.md`.

---

## Known asset placeholders (swap before production)

- **Clarisa's portrait** — Currently an abstract SVG silhouette in §09. Needs commissioned B&W or single-tone magazine-treated portrait.
- **Handwritten signature** — Currently a generic curve SVG path. Needs Clarisa's actual signature scanned + vectorized.
- **Florida map** — Hand-drawn simplified outline SVG. Could use a more refined illustration.
- **Service icons (5) + Process icons (4)** — Line-illustrations in correct style. Refinable.
- **Case study screenshots** — Pure CSS approximations of PF Auto Style and Devise Fashion. Real screenshots should replace at production.
- **Testimonial** — Placeholder explicitly marked `[ Pending — supplied by client at launch ]`. Never fabricate.
- **Client wordmarks (§02)** — Currently substituted by the kinetic marquee. If real clients land for Zuniga, swap back to honest-fallback identity strip.

---

## What's queued for next iteration

Listed in `INTERACTION-SYSTEM.md` at the bottom, repeated here for visibility:

- ⏳ **Sticky scroll storytelling** on Selected Work — each spotlight pins as user scrolls into it, mockup animates while pinned (scrolling through fake page content), releases on exit
- ⏳ **Service card content typing in letter-by-letter** on hover
- ⏳ **Path morphing between phase icons** in §06 (I → II → III → IV SVG morph transitions)
- ⏳ **Particle gather effect** before the closing statement resolves
- ⏳ **Per-section "data thread"** — single gold path that travels from Hero rule → Approach rule → Closing pulse, visually connecting the page as one circuit
- ⏳ **Real assets** — portrait, signature, map, icons, screenshots, testimonial
- ⏳ **GitHub repo migration** — eventually move Zuniga to its own org/repo
- ⏳ **Multi-page** — `/work/[client]`, `/services/[service]`, `/florida/[city]`, `/journal/[article]` pages

---

## Rebrand-related decisions still open

- Whether to eventually deprecate the `socialnoodlestudio-ai/DemoSite` repo, migrate it under Zuniga's org, or run both
- Whether the existing demo work (PF Auto Style, Devise, American Pressure Clean) gets re-presented as Zuniga case studies (current homepage assumes yes — PF and Devise are §05 spotlights)
- Real GitHub Pages deployment for Zuniga preview
- Domain decision (zunigastudio.com is the current placeholder)
