# Demo-Site Research Playbook

You are working in the Social Noodle Studio demo-sites repo. Each subfolder is a hand-built static demo for a prospective or active client. Visual and code style are intentionally **per-client** — do not try to standardize them. What **is** standardized is the research process below. Follow it for every new demo.

> **Before starting any new demo work in this repo, read [LESSONS.md](LESSONS.md).** It contains experimental and recently-learned rules that haven't yet been promoted into this file. Apply them as if they were in here.

---

## 1. Source tiers — what counts as verified

Every factual claim on a demo site must trace to **at least one Tier 1 source, OR two Tier 2 sources that agree.** Otherwise it's illustrative (see §4) or it doesn't go on the site.

- **Tier 1 — treat as fact.** Google Business Profile; business's own social media with verified-ownership signals (regular posts, owner-style replies, consistent branding/voice); state business registry; the business's own published materials (flyers, menus, brochures shared online).
- **Tier 2 — likely accurate, cross-reference before using.** Yelp, BBB, Nextdoor, local news coverage, direct customer reviews on Tier 1 platforms.
- **Tier 3 — leads only, never facts.** Aggregator sites (Yellow Pages, Manta, Chamber listings), third-party "best of" roundups, AI-generated summaries that appear in search results.
- **Tier 4 — do not use.** Hearsay, my own training-data assumptions, plausible-sounding inferences, anything I can't trace to a source.

I will use **WebSearch and WebFetch tools, not my training data**, because most local businesses aren't in training, and details like hours and addresses change.

## 2. The standard research pass — in this order, every time

1. **Google Business Profile** — name, address, phone, hours, primary category, photos owned by the business, recent reviews, owner replies.
2. **Business's own social profiles** — Facebook, Instagram, TikTok. About sections, services they actually promote, posting cadence, recent posts (anniversaries, new offerings).
3. **State business registry** — legal name, DBAs, founding year, owner if listed.
4. **Yelp / BBB / Nextdoor** — cross-check address + hours, scan reviews for recurring praise or complaints that reveal real strengths.
5. **Local news / blog mentions** — founding story, awards, expansions, anniversaries.
6. **Image audit** — only use photos the business has clearly published as their own. Never use AI/stock for things claimed to be real (their shop, their team, their actual work).

## 2.5 Two-pass approach — inventory before deep-read

Don't read every source top-to-bottom. Work in two passes:

**Pass 1 — inventory scan (cheap, broad).** For each source in §2, the goal is *what's on this page?*, not extraction. Use WebFetch with a prompt like: "List the sections, content types, and notable items on this page. Don't extract details — just inventory what exists." Output should be short (one paragraph per source).

**Pass 2 — targeted deep-read.** Now decide what's worth pulling in full. The fact sheet in §3 is the **floor, not the ceiling** — always grab those. Then deep-read anything Pass 1 surfaced that's high-signal:

- Pinned posts, "featured" content, top-of-profile items — the business is telling you what matters to them.
- Recently dated content — proves the business is active and gives current talking points.
- Owner-authored long-form content (founder stories, replies to negative reviews) — voice and values come through here in ways no third-party source captures.
- Visual assets the business owns (logos, real photos of shop/team/work, color treatments).

**Why this matters:** a checklist alone would miss the unexpected gold (a 5-paragraph founder backstory in a Facebook post, a flyer with a current promotion, a community-event album). The inventory pass surfaces it without making me read everything in full.

## 3. Standard fact sheet to extract (record in `NOTES.md`)

- Legal name + DBAs
- Address(es) — confirmed against ≥2 sources
- Phone, email, contact methods
- Hours of operation (note when last updated, if visible)
- Service/product list — **only items the business has documented somewhere**
- Years in business / founded date
- Owner / key team names (only if publicly listed by the business itself)
- Reviews snapshot — rating, count, recurring themes
- Brand cues — logo, colors the business actually uses, photography style
- Geographic service area

## 4. Verified vs. illustrative

For each section of the demo, content is either:

- **Verified** — sourced, can be defended if the client asks "where did you get this?"
- **Illustrative** — plausible filler used because the prospect has no website yet (service descriptions written from category norms, generic testimonial *structure*, gallery placeholders).

Illustrative content is fine — it's a demo. But it **must**:
- Be flagged as illustrative in `NOTES.md` with reasoning.
- Never be specific in a way that could be wrong: no invented testimonial names, no fabricated certifications, no claimed years/awards that weren't earned, no fake brand partnerships, no made-up team members.

## 5. Discrepancy handling

When sources disagree (GBP says one address, Facebook another), **do not pick one silently.** Log both in `NOTES.md` under "Discrepancies / open questions" and ask the user before using either.

## 6. `NOTES.md` template (every new demo starts with this)

`NOTES.md` lives inside the demo folder and is gitignored (already covered by `.gitignore`).

```markdown
# Research notes — <Business Name>

## Sources consulted
- [Google Business Profile](URL) — accessed YYYY-MM-DD
- [Facebook](URL) — accessed YYYY-MM-DD
- ...

## Verified facts
- ...

## Illustrative content (used in demo, not verified)
- "20+ years experience" → category norm, not directly stated by business
- Testimonial copy structure → generic, no specific names invented
- ...

## Discrepancies / open questions
- ...

## Things to confirm with client at handoff
- ...
```

## 7. Hard no-go list

- No invented owner names, founder bios, or employee names.
- No fabricated testimonials with specific quoted names.
- No claimed certifications, awards, or brand partnerships unless documented.
- No AI-generated stock photos posing as real shop/team/work photos.
- No silently filling in hours/address/phone when sources disagree — flag and ask.
- No relying on my training data for facts about the business.

## 8. Standard delivery workflow — every demo follows this flow

1. **Research** — run §1–§7. Produce `NOTES.md` in the new demo folder.
2. **Build locally** — new folder at the repo root named with the business slug (lowercase, hyphenated, e.g. `american-pressure-clean/`). Flat structure inside: `index.html`, `styles.css`, `script.js`, `NOTES.md`. **Always invoke the `frontend-design` skill before writing the HTML/CSS** — it's installed locally and exists to avoid generic "AI default" aesthetics (predictable navy-gradient heroes, rounded-corner cards, identical section flow). Skipping it produces competent but forgettable demos.
3. **Local preview** — start `python -m http.server 8000` from the demo folder, bound to all interfaces so phones on the same Wi-Fi can reach it. Share both the `localhost:8000` URL and the LAN URL (`http://<local-ip>:8000`).
4. **QR code** — generate a `qr-code.png` in the demo folder pointing to the LAN URL so the user can scan and check on their phone. Already gitignored per `.gitignore`.
5. **Wait for explicit approval** — do not commit, do not push. Pause until the user says something like "looks good, push it." Mobile responsiveness is part of the approval — the user will test the QR-code preview on their phone.
6. **Commit and push to `main`** — only after approval. Stage the demo folder by name (not `git add .`). Push to `origin main`. GitHub Pages will serve at `/<demo-folder>/`.
7. **Landing page update** — do not auto-update the root `index.html` (the demos list). Ask the user if they want the new demo linked from the landing page.

## 9. When you hit something this playbook doesn't cover

Add an entry to [LESSONS.md](LESSONS.md) before finishing the session. If the same lesson comes up across multiple demos, promote it into this file and mark the original `[promoted]`.
