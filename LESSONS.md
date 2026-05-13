# Lessons learned — demo-site research

Running log of research gotchas, fixes, and experimental rules. **Read this at the start of every demo session** and apply entries as if they were in `CLAUDE.md`.

## How to use this file

- New entries on top, with date.
- Use the format below.
- When a lesson holds across multiple demos, **promote** it into `CLAUDE.md` and mark the entry here `[promoted]` (don't delete — the history is useful).

```markdown
## YYYY-MM-DD — short title

**Context:** what we were researching
**Problem:** what tripped us up (bad source, contradictory info, hallucinated detail, etc.)
**Fix / new rule:** what to do instead next time
**Status:** experimental | confirmed | promoted-to-CLAUDE.md
```

---

## 2026-05-13 — "Distinctive" vs. "conversion-ready" — pick before designing

**Context:** Built American Pressure Clean demo. First pass came out generic ("AI-default" SaaS-style navy gradient + aqua + rounded cards). Rebuilt using the `frontend-design` skill, which produced an industrial-editorial direction (heavy condensed display type, work-order metadata, spec-sheet service listings, paper-grain texture, safety-orange accent). User liked it for Carlos (the owner-prospect) but raised the legitimate concern that it might not be the right look for the *business type*.
**Problem:** There's a real tension between two design goals that pull opposite directions for service-business demos:
- **Distinctive / editorial** — memorable, signals "designer, not template-shop," wins on aesthetic
- **Conventional / trust-template** — clean white, big star rating, big phone, familiar layout — homeowner conversion bait
The `frontend-design` skill optimizes for the first. Service-business customers often need the second.
**Fix / new rule:** Before invoking `frontend-design`, ask: **"Is this demo's primary audience (a) the prospect we're pitching, or (b) the prospect's customers, browsing the live site?"**
- **(a) Pitch piece** — distinctive wins. Use `frontend-design` at full strength. Shows we're not a template shop.
- **(b) Live converter** — go hybrid: keep distinctive typography + palette, but use conventional layout patterns (cards, standard hero, normal contact section). Trust signals dominate.
- **Default when unclear:** hybrid. Distinctive typography/color is low-risk; maximalist editorial moves (work-order forms, field reports, blueprint grids) are high-variance.
Capture the answer in `NOTES.md` under "Design direction" before building.
**Status:** confirmed

---

## 2026-05-13 — Major directory sites block automated WebFetch

**Context:** Researching American Pressure Clean (Lake Worth, FL) — small operator, no website, ~43 Yelp reviews.
**Problem:** WebFetch returned HTTP 403 on Yelp, BBB, Sunbiz (FL state registry), and Buzzfile — all the high-signal Tier 1/2 sources. The pages exist and are visible to a normal browser, but blocked to automated fetching. This left Google search-result *snippets* as the deepest accessible source for most facts.
**Fix / new rule:**
- Treat Google search snippets as a valid Tier 2 source for cross-confirmation when the underlying Tier 1 source is unreachable — provided the snippet itself shows the data and ≥2 independent listings agree.
- Use multiple narrow search queries (full phone, full address with quotes, "owner-name + business-name") to triangulate facts when direct fetch fails.
- When direct access to Yelp specifically matters (reviews, photos), flag in `NOTES.md` that the page exists but content is unread, and tell the user we may need them to copy/paste content or screenshot.
- Do *not* rely on Tier 3 aggregators (Manta, YellowPages) as a substitute for blocked Tier 1.
**Status:** confirmed

## 2026-05-13 — Seed entry (delete once real entries accumulate)

**Context:** Setting up this playbook after losing a Claude Code conversation transcript to a reinstall.
**Problem:** No persistent record of how we research businesses for demos — risk of inventing facts, inconsistent quality across demos.
**Fix / new rule:** Codified the research process in `CLAUDE.md` (source tiers, standard pass, verified-vs-illustrative rule, hard no-go list). This `LESSONS.md` file captures everything that comes up after.
**Status:** confirmed
