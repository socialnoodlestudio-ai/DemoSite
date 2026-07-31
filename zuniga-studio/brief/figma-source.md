# Zuniga Studio — Brand Tokens (from Figma)

Live Figma source of truth for Clarisa Zuniga's brand:

**https://www.figma.com/design/DukgOKihBUXsj4tHkYyJBV/Untitled**

The file is titled "Untitled" (placeholder) and contains a single page "Page 1" with one frame **"Brand Board"** holding five published components.

---

## Color tokens

All values pulled directly from Figma "Brand Board" components.

| Token | Hex | Use |
|---|---|---|
| Matte Ink | `#0B0C10` | Primary canvas / dark surfaces |
| Alabaster White | `#F7F5F0` | Primary type, light surfaces, structural 1px rules |
| Desert Rose Quartz | `#E2B4B4` | Accent — italics, interactive states, key highlights |
| Liquid Chrome | `#C0C0C4` | Reflective metallic details — buttons, badges, chrome material moments |

## Derived rose family (for gradients + states)

| Token | Hex | Notes |
|---|---|---|
| `--rose-soft` | `#F2D1D1` | Light end of quartz gradients |
| `--rose-deep` | `#C29393` | Shadow / pressed state end of quartz gradients |

---

## Material gradients (defined as Figma components)

### Desert Rose Quartz — conic refraction
Layered over a soft pink linear base. This is the material applied to the italic `transform` word in the hero headline.

```css
background:
  conic-gradient(
    from 207deg at -38% 0%,
    rgba(226,180,180,0.6) 14%,
    rgba(248,220,220,0.6) 17%,
    rgba(239,206,206,0.6) 20%,
    rgba(251,233,233,0.6) 25%,
    rgba(245,207,207,0.6) 27%,
    rgba(251,233,233,0.6) 31%,
    rgba(244,215,215,0.6) 35%,
    rgba(255,240,240,0.6) 37%,
    rgba(226,180,180,0.6) 39%,
    rgba(254,221,221,0.6) 40%,
    rgba(251,231,231,0.6) 41%,
    rgba(230,187,187,0.6) 44%
  ),
  linear-gradient(120deg, #F2D1D1 0%, #E2B4B4 50%, #C29393 100%);
box-shadow: inset 0px -3px 1px 0px rgba(255,255,255,0.6);
```

### Liquid Chrome — conic reflection
Defined as a Figma component. Used for reflective metallic details.

```css
background:
  conic-gradient(
    from 210deg at -25% -16%,
    rgba(173,173,178,0.9) 7%,
    rgba(255,255,255,0.9) 13%,
    rgba(230,230,250,0.9) 20%,
    rgba(192,192,196,0.9) 46%,
    rgba(153,155,163,0.9) 57%,
    rgba(255,255,255,0.9) 69%,
    rgba(168,169,173,0.9) 77%,
    rgba(197,199,212,0.9) 92%
  ),
  linear-gradient(134deg, rgba(255,255,255,0.1) 0%, rgba(141,141,129,0.1) 100%);
box-shadow: inset 0px -3px 1px 0px rgba(255,255,255,0.6);
```

### Inner-edge material sheen
A thin highlight applied to material samples in the brand board:

```css
box-shadow: inset 0px -3px 1px 0px rgba(255,255,255,0.6);
```

---

## Typography

| Role | Family | Weight | Source |
|---|---|---|---|
| Display | **Space Grotesk** | 400–500 | Figma "Zuniga Studio" wordmark component (40px Regular) |
| Body / labels / telemetry / mono accents | **Space Mono** | 400 / 700 | Used throughout the homepage for mono-data labels, telemetry widgets, nav links, meta strips |

Both fonts are on Google Fonts.

### Sizing notes from the homepage

| Use | Size | Letter-spacing |
|---|---|---|
| Hero headline | `clamp(54px, 8.6vw, 156px)` | `-0.025em` |
| Wordmark | 13–15px | `0.18em` (tracked out) |
| Mono labels | 11px | `0.18em` uppercase |
| Mono data | 11px | `0.08em` |
| Telemetry | 10px | `0.22em` uppercase |

---

## Brand marks

### Wordmark
"Zuniga Studio" in Space Grotesk Regular at 40px. Sentence case in the Figma source; rendered uppercase + letter-spaced in nav/footer lockups.

### Sculpted ZS monogram
A 3D rendered monogram with rose-quartz body and polished gold bevel edges, sitting on a small plinth (museum / podium presentation). Photographic asset in `homepage/zs-monogram.png` and `brand-references/02-kinetic-monogram-concept.png`.

This monogram is the centerpiece visual element used on the hero. Production target is a real-time WebGL volumetric version driven by scroll progress + cursor; current build uses the rendered PNG as a placeholder.

---

## Material applications (from the brand sheet)

From `brand-references/03-brand-sheet-with-palette.png`:

- **Black plates** — Matte Ink Substrate. Primary surface for hero, footer, content modules.
- **Cream/white panels** — Alabaster White. Used for editorial body text frames, case study labels.
- **Pink material moments** — Rose Quartz conic gradient. Used for accent words, hover states, the metallic ZS monogram body.
- **Silver material moments** — Liquid Chrome conic gradient. Used for buttons, badges, chrome detail elements (reflective fixtures, not primary type).
