# Zuniga Studio — progress log

Dated wrap entries, newest first. Read the top entry plus `README.md` and
`FLOW.md` to pick up cold.

---

### 📌 2026-07-30/31 — Ground-up rebuild + the full K1→K6 film shipped live

**What landed** (all on `main`, pushed, Pages deployed and verified):

| Commit | What |
|---|---|
| `2b7227d` | Scrapped both prior builds; consolidated Zuniga into the DemoSite repo |
| `5c04c93` | `websites/LESSONS.md`: verify canvas animation by pixel assertion |
| `a6461cc` | The full six-keyframe film |

**The pivotal correction.** Clarisa's six reference images are **keyframes of
one continuous motion**, not design options — Juan had her generate them
specifically so we could build the tweens. Two "open decisions" I had logged
(headline fork, ending) were artifacts of misreading them as alternatives;
`OPEN-DECISIONS.md` was deleted and `FLOW.md` written as the confirmed spec.
A three-variant `prototype` picker built on the wrong premise was deleted too.

**Structural changes**
- Zuniga moved from an unversioned folder outside any repo to
  `websites/zuniga-studio/` — under git for the first time. Old builds
  recoverable at `e2816c0`.
- `.claude/launch.json`: the three old Zuniga entries collapsed to one
  (`zuniga-site`, port 8003) pointing at the new path.

**The film** — ~17s, clock-driven, skippable, once per session:
K1 sphere-field genesis → K2 metal resolve + caption → K3 radial un-build with
"Digital stories / in motion." → K5 blueprint drawing itself (44 staggered
stroke elements) → wave sweep → K6 "Your Business" demo panel with count-up
stats. The last frame IS the hero; the particle field persists as ambient.

**Architecture:** `genesis.js` drives and emits phase classes on `<html>`
(`on-resolved/dissolve/blueprint/wave/end`); all DOM choreography is CSS in
`flow.css` keyed to those, so canvas and DOM can't drift. `flow.js` does only
what CSS can't (stat count-up, measured `--dpfit` panel fit). Set pieces
`wireframe.svg` + `demo-panel.html/css` were built in parallel by a workflow.

**Verified:** live at
`https://socialnoodlestudio-ai.github.io/DemoSite/zuniga-studio/` — remote SHA
matches local, all five assets 200, 44 stroke elements present, both headlines,
four stat counters, demonstration framing intact. Zero console errors. Panel
fits its stage exactly; no scrollbars.

**Bugs found and fixed:** `if (!start)` re-seeding the clock at ts=0 (froze the
whole film under instrumentation); ring-shaped particle distribution leaving a
dead centre; cobwebbed link clusters; a CSS specificity trap
(`html.js .beat.inkable`) that kept inked type blurred forever; demo panel
overflowing the locked viewport; grid overflow-alignment misplacing the scaled
panel; the wireframe exiting before the panel arrived.

---

## ▶ NEXT PICKUP

1. **Clarisa watches the live URL and reacts.** That's the gate — her notes on
   where it drags or rushes drive the polish pass. Tell her: plays once per
   session (new tab to rewatch), any click/scroll skips it, ~17s.
2. **Decide clock vs scroll** (`FLOW.md`). Currently a clock so it was
   watchable today. Recommendation on file: scroll-driven with play-through on
   first visit. This changes every tween's architecture — settle before polish.
3. **Build Phase 2's dock** — the one beat of the brief still missing. The mark
   currently dissolves in place instead of flying into the nav box first. The
   nav target already exists in `index.html`.
4. **Timing polish pass** — beat durations are first-draft; the K5→K6 seam is
   the most likely to need tightening.

## Deferred, with triggers

| Item | Trigger to act |
|---|---|
| Vector ZS monogram (Cormorant stand-in today) | Before any external launch — every keyframe renders this mark |
| Demo photography licence | Before K6 ships to a real domain |
| `og:url` / `og:image` (deliberately absent) | The moment a Zuniga domain is chosen |
| Rest of the site (work / studio / contact) | Before the site replaces socialnoodlestudio.com |
| 301s from socialnoodlestudio.com | At domain cutover — don't discard existing ranking |
