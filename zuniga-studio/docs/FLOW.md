# The Flow — one continuous motion

Confirmed by Juan 2026-07-30, walking Clarisa's frames in order. **The six
reference images are keyframes of ONE sequence**, generated specifically so we
could build the tweens between them. They are not options, and nothing here is
open for a pick. The word that governs every transition: **smoothly** — one
continuous move, no cuts, no crossfades between unrelated scenes.

## Keyframes, in order

| # | Frame (`brief/images/`) | What's on screen | Copy on screen |
|---|---|---|---|
| K1 | `phase1-genesis-opening.jpg` | Particles converging, web forming, ZS not yet resolved | — |
| K2 | `phase1-monogram-resolved.png` | ZS solid rose-gold metal, field orbiting | *Molecular genesis. Narrative assembled.* |
| K3 | `phase2-dissolve-digital-stories.jpeg` | ZS dissolving back to particles; ghost wireframes appear behind | *DIGITAL STORIES* / *IN MOTION* |
| K4 | `phase3-plinth-stage-landscape.jpeg` | Camera pulled back: stone plinth, blueprint panel floating upper-right | *Zuniga Studio. Tech-luxury narrative focused.* |
| K5 | `phase3-blueprint.png` + `phase3-wireframe-portrait.jpeg` | Wireframe centered, glowing, drawing itself | *BUILT TO GROW. DESIGNED TO CONVERT.* |
| K6 | `phase5-final-demo.png` | Wireframe resolved into the finished "Your Business" demo site | headline holds; demo carries its own copy |

The copy is kinetic — it advances with the motion and **lands on the business
promise**. The sequence ends on K6. Both "open decisions" previously logged were
artifacts of misreading these frames as alternatives; that doc is gone.

## The tweens — what actually gets built

| Tween | The move | Notes |
|---|---|---|
| K1→K2 | Particles gravitate, assemble, resolve to metal | **BUILT** — `assets/genesis.js` |
| K2→K3 | The mark un-builds: the same particles that formed it disperse outward; ghost wireframes fade up behind the dissolve | Same particle pool, reversed with new targets. Not a shatter, not a crossfade |
| K3→K4 | Camera pulls back; the stage widens; plinth rises into frame; the blueprint panel condenses out of the dispersed particles upper-right | The "camera" is scale+translate on layered groups — no 3D needed |
| K4→K5 | Push back in toward the panel; wireframe lines draw themselves stroke-by-stroke | SVG stroke-dashoffset; CAD feel, not neon |
| K5→K6 | The metallic wave sweeps the wireframe; outlines become components, type fades in, photography develops, stats count up | The signature moment. Masked gradient sweep over a real DOM panel |

## Fixed constraints (carried from the brief + house rules)

- Skippable at any moment; once per session; `prefers-reduced-motion` gets a
  gentler, shorter path — never a locked-out one.
- Demo-site metrics/brand are fiction and must be visibly framed as a
  demonstration. Photography must be licensed before K6 ships.
- Gold stays under 10% of the surface. No neon, no Tron.

## Still genuinely open (mechanical, not creative)

- **Clock or scroll?** Does the flow play on a timer or ride the scroll
  position? Changes the architecture of every tween, so it gets settled before
  K2→K3 is built. (Recommendation on file: scroll-driven with a play-through
  default on first visit — visitor keeps control, film stays intact.)
- The vector monogram. Every keyframe renders the ZS; it still exists only as
  raster + Cormorant stand-in.
