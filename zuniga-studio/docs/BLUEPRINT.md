# Zuniga Studio — Flagship Homepage Blueprint

*Strategic blueprint. No homepage copy in this document — structure, intent, motion, and conversion architecture only. Built to be reviewed by a senior design team before Figma/Framer production begins.*

*Companion document: `HOMEPAGE-CONCEPT.md` translates this blueprint into a cinematic walkthrough for stakeholder pitch.*

---

## Context

Zuniga Studio is positioning as a **premium website design studio for Florida small businesses**, deliberately rejecting three category defaults:

- the local-marketing-agency aesthetic (loud, busy, conversion-cliché)
- the freelancer portfolio (one-person voice, casual tone)
- the static WordPress-style business site (templated, transactional, depth-less)

The strategic move is to present small-business clients with an experience they typically only encounter when shopping a high-end consultancy. The thesis: when a contractor, therapist, or home-services owner lands on Zuniga Studio, the felt-quality of the site itself should be the strongest argument that we can do this for them too.

The homepage must hold three things in equilibrium at all times:

1. **Premium felt-quality** — restraint, typography, intentional motion, Apple-grade discipline
2. **Strategic clarity** — visitor leaves knowing what we do, who we do it for, why we're different, and exactly how to start
3. **SEO foundation** — naturally ranks for the five target query clusters without sacrificing voice

The output here is the structural blueprint a senior design team would walk into Figma with.

---

## Strategic Foundation (decisions made before section design)

These global decisions apply to every section. They are the through-line.

- **Voice register:** measured, declarative, never salesy. Sentences are short. Adjectives are rare. Every line should pass the "would a luxury architecture firm say this" test.
- **Typographic system:** Cinzel reserved for monumental moments — section openings, statement lines, named anchors. Body sans is the workhorse for everything else. Cinzel never appears at body sizes (it loses its character below ~24px).
- **Color hierarchy:**
  - **Obsidian** (`#0A0A0A`) and **Ivory** (`#FCFBF9`) are the structural binary — surfaces, type, the page itself
  - **Cream** (`#F7EAC4`) is the warming layer — softens transitions, used for off-white surfaces and secondary panels
  - **Gold** (`#D4AF37`) is the primary accent — used sparingly, almost as punctuation; primary CTAs, key highlights, decorative rules
  - **Bronze** (`#B38F24`) is the secondary accent — hover states, depth indicators, restrained foil moments
  - **Rule:** never more than one gold element on screen unless intentionally stacked for emphasis. Gold is a budget.
- **Motion philosophy:** no decorative animation. Every motion serves one of three purposes — orienting the user, revealing meaning, or rewarding interaction. Default timing: 400–600ms with `cubic-bezier(0.22, 1, 0.36, 1)` easing for reveals, faster (180–240ms) for hover responses.
- **Layout grid:** 12-column with generous gutters; wide editorial margins. The site should feel like it has *room*. Density is anti-luxury.
- **Accessibility floor:** all motion respects `prefers-reduced-motion`. Custom cursor must not replace pointer affordances — it augments. Contrast ratios meet WCAG AA at minimum on all gold/cream surfaces.
- **Performance budget:** under 1.5s LCP, under 100ms INP, single web font (Cinzel) preloaded with a system-sans fallback for body. Hero must render before motion engages.

---

## Assumptions baked into this blueprint

| # | Assumption | Why it matters | Status |
|---|---|---|---|
| A1 | **Built in Framer** | Motion vocabulary tuned to Framer's scroll-driven animation, Magic Motion, and component variants | Default — revise if migrating to Webflow or hand-coded Next.js |
| A2 | **2 case studies ready** | Selected Work uses spotlight pattern (not grid) | Locked per founder direction |
| A3 | **Founder-led by Clarisa Zuniga; boutique today, built to scale** | Studio Note is a signed founder's letter, not a team grid. Voice convention: present-tense singular when describing direct work ("I work with…"), declarative plural only when describing the studio's stance ("Zuniga Studio believes…"). Never fabricate a team. | Locked per founder direction |
| A4 | **Pricing not shown on homepage** | Premium-conversation positioning. Filters tire-kickers without committing to a public anchor. | Locked per founder direction |
| A5 | **Florida-wide service area** with city specificity in §08 + footer | SEO weight distributed across cities, not stacked on one metro | Default — revise if targeting a single metro |

**Voice convention (critical):**
Zuniga Studio is currently a founder-led boutique practice, designed to scale. The homepage voice must hold both truths simultaneously:
- "I" appears when describing direct work, working sessions, the founder's hand — these are real
- "Zuniga Studio" appears as the brand entity describing positions, beliefs, processes — this is the institution
- "We" should be used *sparingly*, and only in established-studio contexts where it implies a discipline/standard, not a team headcount
- Never imply staff sizes that don't exist. Premium audiences read fabricated team scale instantly.

---

## Section Architecture (overview)

| # | Section | Primary job |
|---|---|---|
| Global | Persistent UI Frame | Nav, floating contact CTA, custom cursor, route transitions |
| §01 | Hero / Opening Statement | Set tone, declare positioning, drive scroll |
| §02 | Identity Strip | Quiet trust layer (clients, press, recognition) |
| §03 | Manifesto | Philosophy & strategic stance — the "why" |
| §04 | Services Atlas | Five services rendered as an interactive system |
| §05 | Selected Work | Case study spotlights — proof of execution |
| §06 | Approach / The Process | Methodology — proof of strategic thinking |
| §07 | Proof | Metrics + anchor testimonial — outcomes evidence |
| §08 | Florida Coverage | Service area — does heavy SEO lifting |
| §09 | Studio Note (Founder's Letter) | Founder voice — humanize |
| §10 | Field Notes | Insights/journal teaser — long-tail SEO + thought leadership |
| §11 | Closing Invitation | Final CTA — typographic finale |
| Footer | Substantial Footer | SEO depth, navigation, contact, legal |

---

*For section-by-section detail (purpose, psychology, conversion goal, SEO purpose, layout, visual direction, motion, trust elements, content types), see the full 10-element treatment in the original strategic document. The cinematic walkthrough of how these sections render and feel as a sequence is in `HOMEPAGE-CONCEPT.md`.*

---

## Cross-Cutting Concerns

**Typographic hierarchy (Cinzel usage map):**
- Hero H1 (largest)
- Section anchor headings (medium)
- Manifesto pull statement (medium-large)
- Case study client names (medium)
- Process phase names (medium-small)
- Proof numbers + testimonial (medium)
- Closing statement (large)
- Founder signature + wordmark (small)
- **Never** in body, never below ~24px.

**Color rules:**
- Obsidian/ivory carry 90%+ of surfaces
- Cream warms transitions (sections that need to feel human)
- Gold = one per viewport maximum (with explicit stacking exception)
- Bronze = hover states + secondary depth indicators

**Motion principles:**
- All motion respects `prefers-reduced-motion: reduce`
- Reveal animations: 400–600ms, ease-out
- Hover responses: 180–240ms
- Scroll-driven: tied to scroll progress, never autoplay
- No looping animation visible without interaction (except the optional §08 map pulse)

**Accessibility floor:**
- AA contrast on all gold/cream surfaces
- Custom cursor augments — never replaces — system pointer
- Keyboard nav: all CTAs and interactive cards reachable + visible focus states (gold ring)
- Alt text on all imagery
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)

**SEO architecture:**
- Single `<h1>` (hero)
- `<h2>` per section anchor
- `<h3>` per service card, case study, process phase, article preview
- `Organization`, `Service`, `Review`, `BlogPosting`, `ContactPoint`, `LocalBusiness` schema as appropriate
- Open Graph + Twitter card metadata
- One internal link per logical jump (services → /services/X, cities → /florida/Y, articles → /journal/Z)

**Performance budget:**
- LCP < 1.5s
- INP < 100ms
- CLS < 0.05
- Cinzel preloaded with `font-display: swap`
- All custom SVG icons inline (no icon font)
- Imagery: AVIF with WebP fallback, responsive `srcset`

---

## Verification

How a senior design team should pressure-test this blueprint before opening Figma:

1. **Read the section table-of-contents aloud.** Does the homepage tell a complete story arc — opening statement → trust → philosophy → offering → proof → process → outcomes → coverage → humanity → ongoing thought → final invitation? If any section feels redundant or missing, address before sketching.
2. **Per-section audit:** for each of §01–§11, check that the **conversion goal** and **SEO purpose** are not in conflict.
3. **Motion inventory:** list every motion idea across sections. Does the total exceed ~15 distinct motions? If so, *cut*. Restraint is the brand.
4. **Cinzel audit:** count where Cinzel appears. If it appears more than ~10 times on the homepage, it loses its weight. Reserve it.
5. **Trust evidence audit:** walk every section asking "is the evidence here real, named, and verifiable?" Any answer of "no" is a fabrication risk.
6. **SEO weight check:** list the five target keyword clusters and trace where each is naturally embedded.
7. **Mobile pass:** mentally walk the homepage at 375px viewport. Does the asymmetric editorial layout collapse cleanly?
8. **Stakeholder review:** present `HOMEPAGE-CONCEPT.md` to Clarisa before any Figma work.

Once this blueprint is approved, the next deliverables are:
- **Lo-fi wireframes** at desktop + mobile per section
- **Typographic specimens** for Cinzel sizes 16/24/32/48/72/120
- **Motion prototypes** for the top 3 most ambitious interactions
- **Then** high-fidelity Figma + Framer production.
