# Social Noodle Studio · Demo Sites

Live concept builds for prospective and active clients. Each folder is a self-contained, hand-built static site — no frameworks, no templates, no AI stock filler.

## Live URLs

Once GitHub Pages is enabled on this repo, the demos publish at:

| Demo | Path | What it is |
| --- | --- | --- |
| **PF Auto Style** | `/PF-Auto-Style/` | Auto wraps, tint, PPF · West Palm Beach |
| **Devi's Exclusive Fashion** | `/devise-exclusive-fashion-website/` | Luxury Indian wear & bridal · Port St. Lucie |
| **Social Noodle Studio** | `/social-noodle-studio-website/` | Agency's own marketing site |

Root (`/`) is a landing page that lists all three.

## Local development

Each demo folder is plain HTML/CSS/JS. To preview locally:

```bash
cd <demo-folder>
python -m http.server 8000
# then open http://localhost:8000
```

## Notes

- Demos are not indexed by search engines (`<meta name="robots" content="noindex">` where appropriate).
- Per-demo research notes live in `NOTES.md` inside each folder and are git-ignored — they're internal-only.
- The `qr-code.png` files are local-network only and git-ignored.
