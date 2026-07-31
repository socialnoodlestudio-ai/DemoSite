# Zuniga Studio — Claude Design Packages

Two parallel design-system packages live in this folder. Each is a complete, self-contained DesignSync bundle. **Pick one, `cd` into it, then run `/design-sync`** — don't sync both at once.

## The two packages

### `01-clarisa-brief--package-a/`
> **Source:** Clarisa's creative direction brief (text + 3 storyboard images in `../images/`).
> **Voice:** Full-stack growth agency. "BUILT TO GROW. DESIGNED TO CONVERT." Demo client = "YOUR BUSINESS." Copy mentions design, development, SEO, hosting, automations, backend.
> **Palette:** Matte black + charcoal + metallic dusty rose + rose-gold edge + tiny warm-gold accent (<10%).
> **Type:** High-contrast modern serif display (Cormorant Garamond) + clean sans body (Inter).
> **Hero motif:** Cinematic 5-phase build animation — molecular genesis → docked logo → blueprint architecture → value reveal → engineered website.

### `02-current-zuniga--package-b/`
> **Source:** The live site we've been building (existing zuniga.css + the multi-page boutique build).
> **Voice:** Motion-first Florida boutique. "Digital experiences that transform attention into action." Three clients at a time. Hand-coded. Florida-focused.
> **Palette:** Matte ink (#0B0C10) + alabaster + Desert Rose Quartz (#E2B4B4) + Liquid Chrome (#C0C0C4). No gold.
> **Type:** Space Grotesk (display + body) + Space Mono (eyebrow/labels).
> **Hero motif:** 3D rose-quartz ZS monogram (Three.js GLB) + editorial typographic headline + side scroll progress.

## How they differ at a glance

| | Package A (Clarisa) | Package B (Current) |
|---|---|---|
| Positioning | Full-stack growth agency | Motion-first FL boutique |
| Primary accent | Metallic dusty rose + rose-gold | Desert Rose Quartz (cleaner pink) |
| Gold? | Yes (luxury punctuation) | No |
| Display type | Modern serif (Cormorant) | Geometric sans (Space Grotesk) |
| Hero animation | 5-phase cinematic genesis | Idle 3D monogram, no story arc |
| Demo client copy | "YOUR BUSINESS" | n/a (real Zuniga homepage) |

## Which one to ship?

Open question for Clarisa. Package A wins if Zuniga is rebranding to a broader growth-agency positioning. Package B wins if she's keeping the motion-first FL boutique identity she chose for the live site.

## File map per package

```
<package>/
├── README.md                 ← package notes
├── foundations/              ← design tokens (color, type, motion, spacing)
├── components/               ← reusable pieces (monogram, nav, buttons, panels)
├── phases/                   ← hero animation storyboard breakdown
└── pages/                    ← assembled hero state(s)
```

Every HTML file starts with a `<!-- @dsCard group="..." -->` comment so the Design pane indexes it automatically.

## Reference images

The 3 storyboard images Clarisa supplied live one folder up at `../images/`. They show Package A's intended final aesthetic only — they don't describe Package B.
