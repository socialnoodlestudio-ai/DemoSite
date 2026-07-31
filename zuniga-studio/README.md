# Zuniga Studio

The site for Zuniga Studio — the rebrand of Social Noodle Studio, founder-led by
Clarisa Zuniga. This replaces socialnoodlestudio.com.

**This is a ground-up rebuild started 2026-07-30.** Two earlier builds were
abandoned: an editorial Cinzel-and-gold homepage, and a motion-first boutique
build in Space Grotesk with a 3D monogram. Neither matched the direction Clarisa
actually wants. Both are recoverable from git history at `e2816c0` if ever needed.

---

## What we're building

A cinematic five-phase hero that makes the visitor feel they watched a website get
built from nothing:

1. **Brand genesis** — particles drift, connect, and assemble the ZS monogram
2. **Brand takes its place** — the mark scales down and docks into the nav
3. **Digital architecture** — a blueprint wireframe draws itself, CAD-style
4. **Value reveal** — the headline emerges like ink on paper
5. **The engineering process** — the blueprint builds itself into a finished
   example client site under a sweeping metallic wave

Matte black and charcoal, metallic dusty rose as the primary accent, rose-gold
highlights, warm gold under 10%. References are Apple launches, Porsche reveal
films, Linear, Nothing. Explicitly not sci-fi, not neon, not Tron.

The full direction is `brief/creative-direction.md`, in Clarisa's own words.
Her reference frames are in `brief/images/`, named by phase.

---

## Current state

| Beat | Status |
|---|---|
| K1→K2 — Particle genesis | **Built.** Sphere-sprite particles (specular + rim light), star flares, bokeh depth-of-field, constellation web, silk filaments; converge into the ZS and resolve to brushed metal with caption. |
| K2→K3 — Dissolve | **Built.** The mark un-builds radially (blown off, not rewound); "Digital stories / in motion." inks in split around it; ghost sketches at the edges. |
| K3→K5 — Blueprint | **Built.** The wireframe panel draws itself stroke-by-stroke (44 elements, staggered `stroke-dashoffset`). |
| K5→K6 — Wave | **Built.** Metallic band sweeps the stage; wireframe converts into the "Your Business" demo panel; content staggers in; stats count up. |
| Final state | The film's last frame IS the hero: headline + demo panel + CTAs, particle field stays as ambient. Repeat visits skip straight here (still ambient). |
| Phase 2 dock-to-nav | Not built — the canvas mark fades at dissolve rather than flying to the nav box. The nav target exists. |

~17s end to end, skippable at any moment (click/scroll/key/button), once per
session, reduced-motion gets the finished page instantly. Driver is currently a
CLOCK; converting to scroll-driven is an open decision (`docs/FLOW.md`).

The rest of the site (work, studio, contact) does not exist yet in this build.

---

## Layout

```
zuniga-studio/
├── index.html              ← the page
├── assets/
│   ├── base.css            ← tokens + foundations
│   ├── genesis.css         ← Phase 1 stage + curtain
│   ├── genesis.js          ← Phase 1 system, self-contained
│   └── 3d/                 ← monogram renders + GLB source
├── brief/                  ← Clarisa's direction — the source of truth
│   ├── creative-direction.md
│   ├── images/             ← six reference frames, named by phase
│   ├── brand-references/   ← moodboards, palette sheet
│   └── reference-package-a/← design tokens derived from the brief
├── docs/
│   ├── FLOW.md             ← THE SPEC: six keyframes, one motion, five tweens
│   ├── BLUEPRINT.md        ← positioning + voice convention (still true)
│   └── LESSONS.md          ← hard-won gotchas, append-only, read before debugging
└── archive/                ← superseded docs from the abandoned builds
```

---

## Running it

```bash
python -m http.server 8003 --bind 0.0.0.0 --directory websites/zuniga-studio
```

Or in Claude Code: `preview_start` with the name `zuniga-site`.

The overture plays once per browser session. To see it again, clear
`sessionStorage` or open a new tab.

---

## Known gaps

- **No vector monogram.** The ZS exists only as raster renders and a GLB.
  `zs_monogram_transparent.png` is not actually transparent — it has a baked
  metallic background, so it cannot be alpha-sampled. Phase 1 currently draws
  the letterforms in Cormorant Garamond as a stand-in. A real vector mark from
  Clarisa is the single biggest quality upgrade available.
- **No domain decision.** `og:url` and `og:image` are deliberately omitted rather
  than pointed at the legacy GitHub Pages path. The previous build had them
  hardcoded and wrong.
- **The keyframe sequence is settled** — see `docs/FLOW.md`. The frames are one
  continuous motion ending on the demo site; the copy advances with it. The one
  mechanical question left is clock-driven vs scroll-driven.
- **Demo-client photography** in Phase 5 needs licensing.
