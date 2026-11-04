# Visual directions

Written 2026-11-03. Scored against [brief.md](brief.md). Competitors are the ones reviewed in [research.md](research.md).

**Chosen: Direction B, Clean engineering white (87/100).** The reasons and rules are under [The choice](#the-choice).

## What the competitor sites look like

We viewed the home page heroes of Avanceon, Almafor, AGAC, Al Qudwa and TechnoServe. They share one formula:

- **Dark photo hero with white headline.** All five use a darkened photo of a plant, control room or hard-hatted workers. On Almafor and Al Qudwa the headline was hard to read in our screenshots, although they may have been caught mid-animation.
- **White pages below the hero**, with Poppins, Inter or similar fonts.
- **Accents vary:** blue and orange on Avanceon, black on Almafor, a maroon-tinted refinery with an orange gradient on AGAC, purple and pink on Al Qudwa, and navy, blue and red on TechnoServe.

Two things follow. A light hero with a 3D model would stand apart from all five. AGAC's warm, dark look is also already close to what maroon and gold would look like in a dark design.

## Brand colours

| Colour | Hex | Note |
|---|---|---|
| Deep maroon | `#3B181E` | As supplied, and matches the logo file |
| Maroon | `#571926` | As supplied; the logo file samples at about `#561A26` |
| Gold | `#E19950` | As supplied; the logo file samples at about `#E49751` |

**Gold has one hard limit:** on a light background it reaches only about 2.2:1, so it fails as text. It works as text on maroon (6.65:1) and behind maroon text (6.65:1). All three directions have to respect this.

## The three directions

### A. Dark industrial premium

| Element | Approach |
|---|---|
| **Mood** | Serious, heavy and cinematic, like a control room at night |
| **Colour** | Near-black `#160A0D` background, `#3B181E` and `#571926` panels, gold for accents and buttons, warm off-white `#F3ECE6` text (16.57:1), muted `#BFAFA6` (9.14:1) |
| **Typography** | Alexandria for headings and Arabic; Inter for body |
| **Photo style** | Low-key and dramatic, with deep shadow. Needs real site photography, which we don't have |
| **Icon style** | Thin gold line icons |
| **3D look** | Metallic plant model lit from the side, gold light trails along process lines, soft glow |
| **Reference sites** | [AGAC](https://www.agac.ae/) for the warm dark hero, which is also the warning; [TechnoServe](https://technoservegroup.com/) for a dark, overlaid hero |

**Strength:** the most striking 3D hero.

**Risks:**
- Maroon, gold and black can read as luxury hospitality rather than engineering, which is worse with hotels on the Our Group page.
- Long technical pages are harder to read on dark, especially outdoors on a phone.
- It looks like AGAC and joins the dark-hero formula.
- Reflections, glow and lighting cost the most in speed.

### B. Clean engineering white

| Element | Approach |
|---|---|
| **Mood** | Precise, calm and open, like a well-kept engineering document |
| **Colour** | Warm paper background, ink text, maroon for headings, primary buttons and footer, gold for highlights only. Details below |
| **Typography** | Inter for all Latin text, IBM Plex Sans Arabic for later Arabic (updated by decision 103) |
| **Photo style** | None by default. Real photos of real work only, once sourced: natural light, true colour, no heavy filters |
| **Icon style** | 1.5 px line icons in maroon, with square ends and simple technical shapes |
| **3D look** | Matte, model-like plant in warm greys, process lines in maroon, selected parts in gold, soft shadows on a light background |
| **Reference sites** | [Avanceon](https://www.avanceon.ae/) for its light globe card, the only 3D-like feature found; [Almafor's project pages](https://www.almafor.com/projects/al.hamra.stormwater.lifting.station/) for clear, structured technical content |

**Strength:** the easiest to read, the lightest to load, and unlike any competitor's hero.

**Risks:**
- It could look plain or generic if the 3D is weak.
- The 3D has less natural drama on a light background.

### C. Blueprint technical

| Element | Approach |
|---|---|
| **Mood** | Technical and drawn, like a marked-up engineering sheet |
| **Colour** | Drafting-paper `#F4EFE6`, maroon `#571926` linework (11.66:1), darker gold `#85500F` for notes (5.82:1), and panels in `#3B181E` with gold lines (6.65:1). No blue, since maroon and gold must stay |
| **Typography** | Barlow for headings and body, JetBrains Mono for labels, IBM Plex Sans Arabic for later Arabic |
| **Photo style** | None. Line drawings replace photos |
| **Icon style** | Drawing-symbol style, with fine lines and leader marks |
| **3D look** | Wireframe plant with edge lines, section cuts and dimension-style labels |
| **Reference sites** | None in `research.md` works this way. [Almafor's](https://www.almafor.com/) network graphic over its hero is the nearest |

**Strength:** the most distinctive, and needs no photos.

**Risks:**
- Engineers will notice drawing conventions used as decoration, and a made-up drawing could look like a real plant or project.
- Fine lines and small mono labels are hard to read on phones.
- A wireframe makes depth hard to judge in an interactive model.
- Keeping up the concept costs extra on every page.

## Scores

Scores run from 1 (poor) to 5 (strong). They are our judgement and haven't been tested with users. Weights follow the brief, whose priorities are credibility, enquiries and speed, with "tasteful" 3D in support.

| Criterion | Weight | A | B | C | Why |
|---|---:|---:|---:|---:|---|
| Credibility with technical buyers | 25 | 3 | 4 | 4 | A risks a luxury feel. C risks fake-looking drawings. |
| Clear path to enquiry | 20 | 3 | 5 | 4 | Maroon buttons stand out most on B's light pages. |
| Speed | 15 | 3 | 5 | 4 | B's matte model and no photos make it lightest. Wireframes add little, but C's linework adds some. |
| Readability and accessibility | 15 | 3 | 5 | 3 | B is best for long reading, phones and sunlight. C's fine detail suffers. |
| Fit with 3D hero and plant model | 10 | 5 | 3 | 4 | A is most dramatic. B needs careful modelling to hold attention. |
| Fit with maroon and gold brand | 5 | 5 | 4 | 3 | A uses them most fully. C makes them secondary to linework. |
| Stands apart from competitors | 5 | 2 | 4 | 5 | A joins the dark-hero formula and resembles AGAC. |
| Works without photos | 5 | 3 | 3 | 5 | A and B need the 3D to carry the page, while C is built for it. |
| **Total, out of 100** | | **65** | **87** | **78** | |

**Sensitivity check:** B still wins if 3D is given far more weight. Moving 15 points from credibility to 3D gives A 71, B 84 and C 78.

## The choice

**Direction B, Clean engineering white.**

1. **It serves the actual reader.** Engineers and procurement staff read long technical pages, often on phones. B is the easiest to read.
2. **It supports the enquiry goal.** On a light page, the maroon button is the strongest element on screen.
3. **It is the fastest.** No photos and a matte model make the brief's page and 3D budgets realistic.
4. **It stands apart.** All five competitor heroes viewed are dark photos with white text. A light hero with a 3D plant isn't what any of them do.
5. **It doesn't pretend.** Direction A depends on site photography we can't source, and Direction C on drawings that could look like real plants. B makes the fewest visual claims.

**What we give up:** A's drama. The maroon footer, enquiry band and gold highlights in the 3D must supply the warmth and weight. If the hero looks plain once built, improve its modelling and lighting before changing direction.

**One detail borrowed from C:** thin leader lines with labels on the 3D model, because they help explain the plant.

Final tokens and component rules are in [design-system.md](design-system.md), which takes priority over the summary below.

### Colour

Each pairing below was calculated against WCAG contrast thresholds.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| Paper | `#FBF9F6` | Page background | |
| Stone | `#F0EBE5` | Alternating sections and cards | |
| Border | `#8F857E` | Form and control borders | 3.43:1 on paper |
| Muted text | `#655B56` | Secondary text | 6.28:1 on paper; 5.57:1 on stone |
| Ink | `#231A1B` | Body text | 16.18:1 on paper |
| Deep maroon | `#3B181E` | H1 and H2, footer and enquiry band | 14.96:1 on paper |
| Maroon | `#571926` | Primary buttons and links | 12.71:1 on paper; white text 13.36:1 |
| Gold | `#E19950` | Rules, highlights, 3D selection, text on maroon only | 6.65:1 on deep maroon; 2.25:1 on paper, so never text there |
| Dark gold | `#8A5317` | Gold-toned small labels on light | 6.00:1 on paper |
| Error | `#A8201A` | Form errors, always with an icon and text | 6.92:1 on paper |
| Success | `#1F6B45` | Form confirmation, always with an icon and text | 6.15:1 on paper |

Error red sits close to the brand maroon, so colour alone must never carry the meaning.

### Typography

- Inter, self-hosted and subset, so fonts stay inside the page budget.
- Body text is at least 17 px, with a line length of about 70 characters.
- IBM Plex Sans Arabic matches for the later Arabic version.

### Photos and icons

- **Photos:** free-licence industrial photos, clearly illustrative, until real project photos replace them (decisions 115 and 116). No AI images that look like real sites. See [image-credits.md](image-credits.md).
- **Icons:** one custom SVG set at 1.5 px, used only where it helps someone scan a page. Icons never replace a label.

### 3D

The site has two pieces, sharing one look:

| | Hero | Interactive plant model |
|---|---|---|
| **Job** | Show at a glance what the company works on | Explain the path from field instruments through PLC to SCADA |
| **Interaction** | Slow movement that responds lightly to the pointer | Select a system to see a label and a link to its solution page |
| **Without 3D** | Pre-rendered image of the same model | Labelled diagram with the same links |

**Look**
- Matte warm-grey forms with soft baked shadows, no reflections, glow or lens effects.
- Process lines in maroon. Gold for the selected or active part only.
- Labels use leader lines, and remain real HTML text so they can be read and translated.

**Honesty rule:** the plant is generic and must not resemble a real facility, client asset or project. Its caption says "Illustrative model" (decision 99).

**Limits**
- Both load only after the page is usable, within the brief's 1.5 MB for 3D.
- They respect reduced-motion settings and show the fallback on low-power devices.
- All content and links stay available without 3D, by keyboard and to screen readers.
- The enquiry button is never placed behind or inside the 3D.
