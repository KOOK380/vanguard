# Design system

Written 2026-11-03 for Direction B, Clean engineering white ([visual-directions.md](visual-directions.md)). Budgets come from [brief.md](brief.md).

## Colour

### Tokens

| Token | Hex | Use |
|---|---|---|
| `color-paper` | `#FBF9F6` | Page background |
| `color-white` | `#FFFFFF` | Cards, form fields, text on maroon |
| `color-stone-100` | `#F0EBE5` | Alternating sections |
| `color-stone-200` | `#E4DED7` | Disabled backgrounds, neutral badges |
| `color-hairline` | `#D9D2CA` | Decorative dividers and card edges only; too faint for controls |
| `color-border` | `#8F857E` | Form and control borders |
| `color-muted` | `#655B56` | Secondary text, helper text, placeholders |
| `color-ink` | `#231A1B` | Body text |
| `color-maroon-950` | `#2A1014` | Primary button active state |
| `color-maroon-900` | `#3B181E` | Headings, footer, enquiry band, primary button hover |
| `color-maroon-700` | `#571926` | Primary buttons, links, icons, focus ring on light |
| `color-maroon-100` | `#F6ECEA` | Secondary button hover, selected backgrounds |
| `color-inverse-muted` | `#D9CCC6` | Secondary text on maroon |
| `color-gold-500` | `#E19950` | Rules and highlights, 3D selection, focus ring on maroon, text on maroon only |
| `color-gold-300` | `#EDB98A` | Gold button hover |
| `color-gold-100` | `#FBEEDF` | Gold badge background |
| `color-gold-800` | `#8A5317` | Eyebrows and small gold-toned labels on light |
| `color-gold-900` | `#6F4210` | Gold badge text |
| `color-error` | `#A8201A` | Error text, icon and border |
| `color-error-100` | `#FBEAE8` | Error message background |
| `color-success` | `#1F6B45` | Success text, icon and border |
| `color-success-100` | `#E7F3EC` | Success message background |

### Text and background pairs

All ratios are calculated with the WCAG 2.x relative luminance formula and rounded to two decimals. The minimum for all text here is 4.5:1, including large text. Only pairs in this table may be used for text.

| Text | Background | Ratio | Use |
|---|---|---|---|
| `#231A1B` ink | `#FBF9F6` paper | 16.18:1 | Body text |
| `#231A1B` ink | `#FFFFFF` white | 17.00:1 | Text in cards and fields |
| `#231A1B` ink | `#F0EBE5` stone-100 | 14.35:1 | Text in alternating sections |
| `#231A1B` ink | `#E4DED7` stone-200 | 12.74:1 | Neutral badge |
| `#655B56` muted | `#FBF9F6` paper | 6.28:1 | Secondary text |
| `#655B56` muted | `#FFFFFF` white | 6.60:1 | Helper text, placeholders |
| `#655B56` muted | `#F0EBE5` stone-100 | 5.57:1 | Secondary text in sections |
| `#655B56` muted | `#E4DED7` stone-200 | 4.94:1 | Disabled button text |
| `#3B181E` maroon-900 | `#FBF9F6` paper | 14.96:1 | Headings |
| `#3B181E` maroon-900 | `#FFFFFF` white | 15.73:1 | Card headings |
| `#3B181E` maroon-900 | `#F0EBE5` stone-100 | 13.27:1 | Headings in sections |
| `#3B181E` maroon-900 | `#F6ECEA` maroon-100 | 13.56:1 | Secondary button active text |
| `#571926` maroon-700 | `#FBF9F6` paper | 12.71:1 | Links, secondary buttons |
| `#571926` maroon-700 | `#FFFFFF` white | 13.36:1 | Links in cards |
| `#571926` maroon-700 | `#F0EBE5` stone-100 | 11.27:1 | Links in sections |
| `#571926` maroon-700 | `#F6ECEA` maroon-100 | 11.51:1 | Secondary button hover |
| `#8A5317` gold-800 | `#FBF9F6` paper | 6.00:1 | Eyebrow |
| `#8A5317` gold-800 | `#FFFFFF` white | 6.31:1 | Eyebrow in cards |
| `#8A5317` gold-800 | `#F0EBE5` stone-100 | 5.32:1 | Eyebrow in sections |
| `#6F4210` gold-900 | `#FBEEDF` gold-100 | 7.47:1 | Gold badge |
| `#571926` maroon-700 | `#FBEEDF` gold-100 | 11.70:1 | Highlighted note |
| `#FFFFFF` white | `#571926` maroon-700 | 13.36:1 | Primary button |
| `#FFFFFF` white | `#3B181E` maroon-900 | 15.73:1 | Primary button hover, footer headings |
| `#FFFFFF` white | `#2A1014` maroon-950 | 17.76:1 | Primary button active |
| `#FBF9F6` paper | `#3B181E` maroon-900 | 14.96:1 | Footer and enquiry band text |
| `#FBF9F6` paper | `#571926` maroon-700 | 12.71:1 | Maroon badge |
| `#D9CCC6` inverse-muted | `#3B181E` maroon-900 | 10.04:1 | Secondary text on the band |
| `#D9CCC6` inverse-muted | `#571926` maroon-700 | 8.52:1 | Secondary text on maroon |
| `#E19950` gold-500 | `#3B181E` maroon-900 | 6.65:1 | Eyebrow and links on the band |
| `#E19950` gold-500 | `#571926` maroon-700 | 5.64:1 | Gold text on maroon |
| `#3B181E` maroon-900 | `#E19950` gold-500 | 6.65:1 | Gold button |
| `#3B181E` maroon-900 | `#EDB98A` gold-300 | 8.92:1 | Gold button hover |
| `#2A1014` maroon-950 | `#E19950` gold-500 | 7.50:1 | Gold button active |
| `#A8201A` error | `#FBF9F6` paper | 6.92:1 | Error text on page |
| `#A8201A` error | `#FFFFFF` white | 7.28:1 | Error text in cards |
| `#A8201A` error | `#FBEAE8` error-100 | 6.25:1 | Error message and badge |
| `#1F6B45` success | `#FBF9F6` paper | 6.15:1 | Success text on page |
| `#1F6B45` success | `#FFFFFF` white | 6.47:1 | Success text in cards |
| `#1F6B45` success | `#E7F3EC` success-100 | 5.68:1 | Success message and badge |

### Control and graphic pairs

Borders, icons and focus rings need at least 3:1 (WCAG 1.4.11).

| Element | Background | Ratio | Use |
|---|---|---|---|
| `#8F857E` border | `#FFFFFF` white | 3.61:1 | Field border |
| `#8F857E` border | `#FBF9F6` paper | 3.43:1 | Control border on page |
| `#8F857E` border | `#F0EBE5` stone-100 | 3.04:1 | Control border in sections |
| `#571926` maroon-700 | `#FBF9F6` paper | 12.71:1 | Focus ring and icons on light |
| `#E19950` gold-500 | `#3B181E` maroon-900 | 6.65:1 | Focus ring and icons on maroon |

### Pairs that fail

| Pair | Ratio | Rule |
|---|---|---|
| `#E19950` gold-500 on `#FBF9F6` paper | 2.25:1 | Never for text, icons or focus rings; decorative rules only |
| `#E19950` gold-500 on `#F0EBE5` stone-100 | 2.00:1 | Never for text, icons or focus rings; decorative rules only |
| `#D9D2CA` hairline on `#FBF9F6` paper | 1.43:1 | Decorative only; never the only sign of a control |

Colour never carries meaning alone. Errors, successes and selected states also use an icon, text or shape.

## Typography

**Inter** for all Latin text. **IBM Plex Sans Arabic** for the future Arabic version.

### Scale

Sizes are px, written as size/line height. Desktop applies from 1024 px, and sizes interpolate between 375 px and 1024 px with `clamp()`.

| Style | Desktop | Mobile | Weight | Letter spacing | Colour | Use |
|---|---|---|---|---|---|---|
| H1 | 56/64 | 36/44 | 600 | -0.02em | maroon-900 | One per page |
| H2 | 40/48 | 30/38 | 600 | -0.015em | maroon-900 | Main sections |
| H3 | 30/38 | 24/32 | 600 | -0.01em | maroon-900 | Sub-sections |
| H4 | 24/32 | 20/28 | 600 | -0.005em | maroon-900 | Card headings |
| H5 | 20/28 | 18/26 | 600 | 0 | ink | Minor headings |
| H6 | 18/26 | 17/26 | 600 | 0 | ink | Form groups, lists |
| Body | 17/28 | 17/28 | 400 | 0 | ink | All running text |
| Lead | 20/32 | 18/28 | 400 | 0 | ink | Hero and section introductions (decision 205) |
| Compact | 15/24 | 15/24 | 400 | 0 | ink or muted | Dense lists, card descriptions, footer (decision 205) |
| Small | 14/20 | 14/20 | 400 | 0 | muted | Helper text, captions, footer details |
| Eyebrow | 13/16 | 13/16 | 600 | 0.08em, uppercase | gold-800 | Short label above a heading |

### Rules

- Keep text to about 70 characters per line, and left-aligned.
- Headings follow page order; don't skip levels for looks.
- Use `font-variant-numeric: tabular-nums` for technical values, and sentence case everywhere except the eyebrow.
- Keep Small and Eyebrow as the smallest text. Nothing goes below 13 px.

### Font files

- Self-host Inter as a variable WOFF2 subset, with weights 400 to 600 and `font-display: swap`.
- Preload only the Latin file.
- All fonts on a page count toward the 300 KB page budget, with a limit of 80 KB.
- Inter and IBM Plex Sans Arabic are both open-licensed. Confirm the licence files when adding them to the project.

### Arabic

- Use the same sizes, increasing line height by about 10%.
- Don't use negative letter spacing or uppercase eyebrows, since Arabic has no such forms.
- Build with CSS logical properties (`margin-inline-start`) so layouts mirror with `dir="rtl"`.
- Mirror directional icons such as arrows, but not logos or the 3D model.

## Layout

### Spacing

Base unit: 4 px. Use only these values.

| Token | px | Typical use |
|---|---|---|
| `space-1` | 4 | Icon to text in badges |
| `space-2` | 8 | Icon to text, tight stacks |
| `space-3` | 12 | Label to field |
| `space-4` | 16 | Card content gap, mobile page margin |
| `space-5` | 24 | Grid gutter, card padding |
| `space-6` | 32 | Between form groups |
| `space-7` | 48 | Between content blocks |
| `space-8` | 64 | Mobile section spacing |
| `space-9` | 96 | Desktop section spacing |
| `space-10` | 128 | Largest breaks, such as around the 3D model |

### Grid

| Breakpoint | Width | Columns | Gutter | Page margin |
|---|---|---|---|---|
| Mobile | Under 768 px | 4 | 16 px | 16 px |
| Tablet | 768 to 1023 px | 8 | 24 px | 32 px |
| Desktop | 1024 px and up | 12 | 24 px | 48 px, then centred |

The container has a maximum of **1280 px** for its 12 columns, which makes each column about 84.67 px at full width. Margins sit outside it. Full-width bands such as the footer can run edge to edge, with their content inside the container.

- **Reading text:** 7 of 12 columns at most.
- **Cards:** 3 per row on desktop, 2 on tablet and 1 on mobile.
- **No horizontal page scrolling** at any width from 320 px.

### Radius

Small radii, to suit an engineering look.

| Token | px | Use |
|---|---|---|
| `radius-sm` | 2 | Badges, checkboxes |
| `radius-md` | 4 | Buttons, fields |
| `radius-lg` | 8 | Cards, 3D frame, messages |
| `radius-full` | 999 | Radio buttons only |

### Shadows

Prefer hairline borders. Shadows are tinted with maroon-900 and used sparingly.

| Token | Value | Use |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(59,24,30,.08)` | Sticky header |
| `shadow-md` | `0 4px 12px rgba(59,24,30,.10)` | Linked card hover, 3D labels |
| `shadow-lg` | `0 12px 32px rgba(59,24,30,.14)` | Dropdown menus only |

### Focus ring

Every interactive element uses `:focus-visible` with a 2 px solid outline and 2 px offset, in maroon-700 on light and gold-500 on maroon. It is never removed.

## Components

Every interactive target is at least 44 × 44 px.

### Buttons

Medium: 48 px high, 24 px side padding, 16/24 Inter semibold, `radius-md`. Small: 44 px high, 16 px side padding, 15/20 semibold. At most one primary button in each view.

| State | Primary | Secondary | Gold, on maroon only | Text link button |
|---|---|---|---|---|
| **Default** | White on maroon-700 | Maroon-700 text, 1.5 px maroon-700 border, transparent | Maroon-900 on gold-500 | Maroon-700, underlined |
| **Hover** | White on maroon-900 | Maroon-700 on maroon-100 | Maroon-900 on gold-300 | Maroon-900, thicker underline |
| **Active** | White on maroon-950 | Maroon-900 on maroon-100 | Maroon-950 on gold-500 | Maroon-900 |
| **Focus** | Focus ring | Focus ring | Gold ring with 2 px offset on maroon | Focus ring |
| **Disabled** | Muted on stone-200, no pointer | Muted on stone-200, no border | Muted on stone-200 | Muted, no underline |
| **Loading** | Spinner and "Sending…", width held, `aria-busy` | Same | Same | Not used |

Button labels start with a verb and match [strategy.md](strategy.md). Prefer not to disable the enquiry button; show errors on submit instead.

### Cards

White background, 1 px hairline border, `radius-lg`, 24 px padding. The whole card is one link only if it has one destination. Linked cards end with a text link.

| State | Static card | Linked card |
|---|---|---|
| **Default** | White, hairline border | White, hairline border |
| **Hover** | No change | `shadow-md`, border changes to `color-border`, arrow moves 4 px |
| **Active** | No change | No shadow, border maroon-700 |
| **Focus** | Not focusable | Focus ring around the whole card |
| **Selected** (3D list) | Not used | Maroon-100 background, 2 px maroon-700 left edge, `aria-current` |
| **Disabled** | Not used | Not used; remove unavailable cards |

Variants: **Solution**, **Industry**, and **Project record**, which stays unpublished until a real project exists (decisions 70 and 165; fields in `content/case-study-template.md`). There is no statistic card, because no figures are sourced (decision 69).

### Form fields

Label above the field in 15/20 semibold ink. Field: 48 px high, white, 1 px `color-border`, `radius-md`, 16 px text so iOS doesn't zoom. Helper text below in Small. Text inputs, selects and text areas share these states. Every field has a visible label; a placeholder never replaces it.

| State | Border | Background | Text | Extra |
|---|---|---|---|---|
| **Default** | 1 px border | White | Ink; placeholder muted | |
| **Hover** | 1 px maroon-700 | White | Ink | |
| **Focus** | 2 px maroon-700 and focus ring | White | Ink | |
| **Filled** | 1 px border | White | Ink | |
| **Pre-filled** | 1 px border | White | Ink | Helper text says it came from the page; can be changed |
| **Error** | 2 px error | White | Ink | Icon and message in error colour, `aria-invalid`, linked with `aria-describedby` |
| **Success** | 1 px border | White | Ink | Only for checks that matter, with icon and text |
| **Disabled** | 1 px hairline | Stone-200 | Muted | `disabled`; avoid in the enquiry form |
| **Read-only** | 1 px hairline | Stone-100 | Ink | `readonly` |

- **Checkbox:** 20 px box in a 44 px target. Checked: maroon-700 with white tick. Radio matches, with `radius-full`.
- **Select:** native control, for the best phone behaviour.
- **Required fields:** mark optional fields with "(optional)" rather than marking every required field with an asterisk.
- **Form errors:** on submit, show a summary at the top, move focus to it, and link each error to its field.
- **Sent message:** success-100 panel with icon and plain text, without implying a response time.

### Badges

Non-interactive labels: 13/16 semibold, 2 px by 8 px padding, `radius-sm`. Badges have one state each.

| Variant | Colours | Use |
|---|---|---|
| Neutral | Ink on stone-200 | Sector or system tag |
| Maroon | Paper on maroon-700 | Current section |
| Gold | Gold-900 on gold-100 | "Illustrative model" |
| Success | Success on success-100, with icon | Form status |
| Error | Error on error-100, with icon | Form status |

Don't use badges for claims such as "Certified", "ISO" or "Approved" unless they are sourced (decision 55).

If a tag becomes interactive, build it as a small button with all button states.

### Icons

- **Grid and stroke:** 24 px grid, 1.5 px stroke, square ends, no fill. Stroke scales with `vector-effect` so it stays even.
- **Sizes:** 16, 20, 24 and 32 px.
- **Format:** inline SVG with `currentColor`.
- **3D icons:** solution rows on Home use small pre-rendered images in the matte 3D style, at 64 px or less, 8 KB or less each, lazy-loaded below the first screen. They are not WebGL, and they always have a text label (decisions 191 and 203). Line icons remain for interface controls.
- **Labels:** icons accompany text. Decorative icons take `aria-hidden="true"`, and icon-only buttons have an `aria-label`.
- **Starter set:** phone, mail, location, arrow, chevron, menu, close, check, error, external link, plus simple symbols for each solution and industry.
- **No logos or vendor symbols** in the icon set.

| State | On light | On maroon |
|---|---|---|
| **Default** | Maroon-700 | Gold-500 or paper |
| **Hover** (with parent) | Maroon-900 | Gold-300 |
| **Active** | Maroon-950 | Gold-500 |
| **Focus** | Focus ring on parent | Gold ring on parent |
| **Disabled** | Muted | Inverse-muted |
| **Error / success** | Error / success | Not used |

### Photos

Sources and replacement priorities are in [image-credits.md](image-credits.md) and [open-facts.md](open-facts.md).

- **Treatment:** true colour with no heavy filters or dark overlays, apart from a light desaturation of about 15% so that stock photos sit with the palette (decision 206). Text never sits on a photo.
- **Labelling:** photos carry an "Illustrative photo" caption, or one "Photos are illustrative." note per group, until real project photos replace them (decision 207).
- **Checks:** view each photo at full size before use. Remove legible brands, recognisable vendor hardware, labels and signage (decision 206).
- **Radius:** `radius-lg` on cards and inline images.
- **Delivery:** AVIF or WebP in responsive sizes, with explicit dimensions, lazy-loaded below the fold, at 120 KB or less each (decision 118).
- **Wording:** captions and alt text describe what is visible, with no location or claim that it shows Vanguard's work (decision 116).
- **Brands:** crop out any legible logo or nameplate (decision 117).
- **Home hero:** uses 3D, not a photo (decision 119).

### Logo

The header and footer use a horizontal lockup, `design/assets/logos/vanguard-lockup.svg`, built from the shapes in the redrawn logo, so that the name stays legible at 40 to 52 px high (decision 201). It needs company approval (open fact 66).

## Motion

Motion explains a change. It never decorates or delays.

| Token | Value | Use |
|---|---|---|
| `motion-fast` | 120 ms | Hover and press colour |
| `motion-base` | 200 ms | Menus, card hover, message appearance |
| `motion-slow` | 320 ms | Large panels, 3D camera moves up to 800 ms |
| `ease-out` | `cubic-bezier(.2,0,0,1)` | Items entering or responding |
| `ease-in-out` | `cubic-bezier(.4,0,.2,1)` | 3D camera moves |

**Rules**
- Animate only `transform` and `opacity`, apart from colour changes on hover.
- No scroll-jacking, parallax, autoplaying carousels or animated counters.
- Page text is visible immediately; it doesn't fade in on scroll.
- Nothing flashes more than three times per second.
- Anything moving for over 5 seconds has a visible pause control (WCAG 2.2.2).

**With `prefers-reduced-motion: reduce`**

| Item | Behaviour |
|---|---|
| Hover and focus | Colour changes stay; movement is removed |
| Menus and messages | Appear instantly, or with a fade under 100 ms |
| 3D hero | Shows the static image; the 3D doesn't start |
| Plant model | Loads only if the visitor chooses to. Camera jumps between views, with no auto-rotation |
| Smooth scrolling | Off |

## 3D style

These rules apply to the hero and the plant model. The models are specified in [3d-brief.md](3d-brief.md). The plant is generic and is captioned "Illustrative model" using the gold badge (decision 99). It must have no real logos, site names, recognisable facilities or readable text.

### Materials

- Matte PBR only: roughness 0.85 to 1.0, metalness 0.
- No transparency, reflections, environment maps, bloom, glow or lens effects.
- Forms are clean and slightly simplified, with small bevels only on large, visible edges.
- One shared material for each colour, to keep draw calls low.

### Colours

| Role | Hex | Applies to |
|---|---|---|
| Ground | `#F0EBE5` | Floor and backdrop |
| Structure, light | `#CFC8BF` | Vessels, tanks, housings |
| Structure, mid | `#B4ABA1` | Frames, supports, panels |
| Structure, dark | `#8F857E` | Bases, small details |
| Process lines | `#571926` | Pipes and signal paths |
| Selected part | `#E19950` | Selected or active part only |
| Selected outline | `#571926` | Edge around the selected part |
| Dimmed | `#E4DED7` | Unselected parts while something is selected |

**Selection can't rely on gold alone.** Gold on the light structure colour is only 1.43:1, and on dimmed parts only 1.77:1. Selecting a part must also dim the others, add the maroon outline, and open its HTML label. Process lines remain clear at 11.27:1 against the ground.

### Lighting

- One soft hemisphere light plus one warm directional key light from the upper left, at about 45°.
- Soft shadows baked as ambient occlusion and a contact shadow on the ground.
- No real-time shadows on mobile; at most one 1024 px shadow map on desktop.
- Tone mapping must keep maroon and gold close to their brand values, checked side by side.

### Camera

- Perspective camera with a 30° field of view, for a calm, model-like view.
- Default view: three-quarter, from about 30° above.
- Plant model limits: horizontal orbit up to ±60°, vertical 15° to 60°, limited zoom, no panning.
- Hero: drift of up to ±3° on pointer movement, with no drag.
- Page scrolling always wins. The canvas never traps the scroll wheel or touch; on touch, rotation requires an explicit "Explore" control.
- Camera moves between systems take 800 ms at most, and jump straight there under reduced motion.

### Labels and controls

- Labels are HTML rather than textures, so they can be read, translated and mirrored.
- The plant model has six hotspots, one per industry page. Their text and model areas are in `content/industries.md` (decision 152).
- Leader lines are 1 px maroon-700, with labels in 13/16 Inter on white with `shadow-md` (ink on white, 17.00:1).
- Every system on the model also appears in an HTML list that works by keyboard and screen reader, and selecting from the list drives the model.
- The enquiry button sits outside the canvas.

### File and performance limits

The whole 3D package is limited to the brief's **1.5 MB compressed**.

| Item | Limit, compressed |
|---|---|
| 3D runtime | 200 KB |
| Scene code | 100 KB |
| Hero model | 300 KB |
| Plant model | 700 KB |
| Textures | 200 KB |
| **Total** | **1,500 KB** |

| Measure | Hero | Plant model |
|---|---|---|
| Triangles, desktop | 60,000 | 150,000 |
| Triangles, mobile | 30,000 | 75,000 |
| Draw calls | 40 | 100 |
| Largest texture | 1024 px, KTX2 | 1024 px, KTX2 |
| Frame rate target | 60 fps desktop, 30 fps mobile | 60 fps desktop, 30 fps mobile |

- **Format:** glTF binary with Meshopt or Draco compression.
- **Fallback image:** AVIF or WebP, 80 KB or less at phone size, and 150 KB or less at desktop size. It is the Largest Contentful Paint element and counts toward the 300 KB page budget, so it needs explicit dimensions.
- **Budget check:** at their limits, fonts and the desktop image use 230 of the 300 KB page budget, leaving 70 KB for HTML, CSS and JavaScript. Aim below both limits, and measure during the build.
- **Loading:** the 3D starts only after the page is usable. The plant model loads when it nears the viewport, on capable devices.
- **Skips 3D:** no WebGL, Save-Data on, reduced motion, or low-power devices. These visitors see the fallback.
- **Pixel ratio:** capped at 2 on desktop and 1.5 on mobile.
- **While running:** rendering pauses off-screen or in a hidden tab, and falls back to the image if frame rate stays under 20 fps for 3 seconds.
- **Layout:** the canvas has a reserved size, so loading causes no layout shift.
