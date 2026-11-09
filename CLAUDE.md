# Vanguard Technology website: project rules

@AGENTS.md

These rules are permanent. They apply to all work in this repository. Details are in `project-docs/`, and later entries in `project-docs/decisions.md` replace earlier ones.

## Client and goal

Vanguard Technology is an industrial automation company and system integrator in Abu Dhabi, UAE. It offers SCADA, communications and control systems, PLC programs, instrumentation, electrical supply and field installation, turnkey projects, project management and annual maintenance contracts.

**The site must be a credible, fast B2B website with tasteful 3D that generates enquiries** from oil and gas, water, district cooling, power and infrastructure operators and contractors in the UAE. It has one job: help an engineer or project lead decide quickly that Vanguard covers their scope, then make it easy to send a useful enquiry.

The audience is technical, short of time and wary of marketing language. Many first look on a phone, and some forward the page to a colleague, so each page must make sense when shared alone. Lead with specific scope in plain engineering language.

**Launch gates** (`project-docs/brief.md`):

| Measure | Limit |
|---|---|
| Largest Contentful Paint, mobile | 2.5 s or less |
| Interaction to Next Paint | 200 ms or less |
| Cumulative Layout Shift | 0.1 or less |
| Page weight before any 3D loads, compressed | 300 KB or less |
| 3D download, compressed, after the page is usable | 1.5 MB or less |
| WCAG 2.2 AA, automated plus keyboard and screen reader | No known failures |
| Published facts traced to a source or `open-facts.md` | 100% |
| Invented clients, projects, numbers, certifications or testimonials | 0 |

## Copy and facts

- **All copy comes from `project-docs/site-content.md`.** Use it word for word. It holds page copy, meta tags, button links, pre-filled fields and page layouts.
- **Never invent text.** If copy is missing, do not write it into the site. Flag the gap in your reply and add it to `project-docs/open-facts.md`.
- **Do not publish** lines marked "Internal note", "Build note" or "3D build note", or anything under "Internal sources". Square brackets are details still to fill in, and none may reach the live site.
- **To change copy,** edit `content/`, run `npm run content` (it regenerates `site-content.md` and `src/content/generated/site-content.ts`), and check any new fact against `current-site.md` and `research.md`.
- **Sanity is the CMS** (decision 283). Studio is at `/studio`. Pages read through `src/lib/cms/data.ts`, which uses Sanity when configured and falls back to `src/content`. The first import copies `src/content` word for word (`npm run sanity:import`). After that, copy edited in Sanity must still follow these rules: no invented facts, every fact traced to `research.md` or `open-facts.md`, and alt text on every image.
- **Pages read copy only from `src/content`** (`import { … } from "@/content"`), never as literals. Lint fails on text in JSX and on literal `alt`, `aria-label`, `title` or `placeholder` values. Render inline Markdown with `<Rich>`. Client components get their copy as props, because the content layer is server-only. Open items are in `project-docs/content-open-items.md`.
- **Never invent facts, clients, projects, numbers, certifications or testimonials.** Do not name vendors or platforms, claim compliance with a standard, or show statistics. No case studies until a real project passes `content/case-study-template.md`.
- **Decide and record.** There is no client input or approval. Make the call, log it in `decisions.md` with the next number, and continue. Never rewrite old entries.
- **Language:** British English, no contractions or idioms, short sentences (`project-docs/tone.md`).
- **Known unconfirmed items** are at the top of `site-content.md`. Do not present them as settled when reporting.

## Accessibility

- **Exactly one H1 per page.** Headings follow page order, with no skipped levels. The logo is not an H1.
- **Alt text on every image.** It describes what is visible, with no location or claim that it shows Vanguard's work. Use `alt=""` only for a purely decorative image beside its own text label, such as a 3D icon on a solution row.
- **Contrast at least 4.5:1 for all text, including large text,** and 3:1 for borders, icons and focus rings. Use only the pairs listed in `design-system.md`.
- **Keyboard accessible.** Everything works by keyboard, in a logical order, with a skip link. The `:focus-visible` ring is never removed. Every target is at least 44 × 44 px.
- **Forms:** visible labels, errors linked with `aria-describedby`, and on submit a summary that takes focus. Colour never carries meaning alone.

## 3D never blocks content

- **Text renders first.** All content and links are in the server-rendered HTML, and work with no JavaScript or WebGL.
- **3D lazy-loads** after the page is usable, with `next/dynamic` and `ssr: false`. The plant model loads when it nears the viewport. A 3D package never enters the shared first-load bundle.
- **A still image is the Largest Contentful Paint element,** with explicit dimensions, so that loading causes no layout shift.
- **Still image only, with no WebGL download,** on:
  - mobile (under 768 px, or a coarse pointer)
  - low-power devices (Save-Data, 4 or fewer CPU cores, or 4 GB or less of memory)
  - `prefers-reduced-motion: reduce`
  - no WebGL support
- **Fall back to the still** if the frame rate stays under 20 fps for 3 seconds. Pause rendering off-screen or in a hidden tab.
- **Same content without 3D:** hotspot labels and links are HTML, in a list that works by keyboard and screen reader.
- **Page scrolling always wins.** The canvas never traps the wheel or touch, and the enquiry button sits outside it.
- **Honesty:** caption every model "Illustrative model". No real logos, sites, vendor hardware or readable text.

Models are in `public/models/`, stills in `public/images/3d/` and hotspot positions in `src/content/plant-hotspots.json`. They are specified in `project-docs/3d-brief.md`. They use Meshopt, so the loader needs the decoder.

## Code

- **Use the design system in code:** tokens are in `src/app/globals.css` and components in `src/components/ui/`. Add no colours, sizes or shadows outside them, and check new states on `/styleguide/`. `cn()` does not merge classes, so never pass two utilities for the same property.
- **Server Components by default.** Use a Client Component only for 3D, animation or forms, including the cookie banner and newsletter. Keep it as a small leaf. FAQs, profile items and the phone menu use native `<details>` first.
- **TypeScript strict.** Do not weaken `tsconfig.json`, and do not use `any` or `@ts-ignore`. Validate form input with Zod on the server.
- **No `#` links.** Every link goes to a real route, `tel:`, `mailto:` or a real element ID such as the skip link. If a page is not built yet, do not link to it, and flag the gap. Real actions are buttons.
- **URLs have trailing slashes** and follow the sitemap in `project-docs/strategy.md`. Keep `/projects/` off until a real project is published.
- **Heavy libraries:** load `three`, React Three Fiber, drei, GSAP, Lenis and Framer Motion only where a page needs them. Together they exceed the page budget.
- **Before finishing a change:** run `npm run lint` and `npm run build`. For UI, check the page at 1440 px and 390 px.
- **Assets:** use the optimised files in `public/`. Never use a photo marked "Hold" in `project-docs/image-credits.md`. Serve photos through `next/image`, and label stock as illustrative. `assets-raw/` holds the originals, and is not copied to `public/` as it stands.

## Design tokens

Source of truth: `project-docs/design-system.md`. Direction: clean engineering white. The signed-off mock-ups are `project-docs/design/home.html`, `solution.html` and `contact.html`. There is no dark mode.

### Colours

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FBF9F6` | Page background |
| `white` | `#FFFFFF` | Cards, fields |
| `stone-100` | `#F0EBE5` | Bands behind Industries and the plant model |
| `stone-200` | `#E4DED7` | Disabled, neutral badges |
| `hairline` | `#D9D2CA` | Decorative dividers only |
| `border` | `#8F857E` | Form and control borders |
| `muted` | `#655B56` | Secondary text |
| `ink` | `#231A1B` | Body text |
| `maroon-950` | `#2A1014` | Primary button active |
| `maroon-900` | `#3B181E` | Headings, footer, Why Vanguard |
| `maroon-700` | `#571926` | Primary buttons, links, icons, focus ring on light, closing band |
| `maroon-100` | `#F6ECEA` | Secondary hover, selected |
| `inverse-muted` | `#D9CCC6` | Secondary text on maroon |
| `gold-500` | `#E19950` | Text, buttons and focus ring on maroon only; decorative rules on light |
| `gold-300` | `#EDB98A` | Gold button hover |
| `gold-100` | `#FBEEDF` | Gold badge background |
| `gold-800` | `#8A5317` | Eyebrows on light |
| `gold-900` | `#6F4210` | Gold badge text |
| `error` / `error-100` | `#A8201A` / `#FBEAE8` | Errors, with an icon and text |
| `success` / `success-100` | `#1F6B45` / `#E7F3EC` | Success, with an icon and text |

**Gold `#E19950` is never text, icons or a focus ring on a light background** (2.25:1 on paper). The one gold button on light is the header quote button, with a maroon border (decision 249).

### Type

**Inter** for all Latin text, self-hosted as a variable WOFF2 with `font-display: swap`, 80 KB or less. Replace the starter's Geist. IBM Plex Sans Arabic is for the later Arabic version, so use CSS logical properties.

| Style | Desktop | Mobile | Weight | Tracking |
|---|---|---|---|---|
| H1 | 56/64 | 36/44 | 600 | -0.02em |
| H2 | 40/48 | 30/38 | 600 | -0.015em |
| H3 | 30/38 | 24/32 | 600 | -0.01em |
| H4 | 24/32 | 20/28 | 600 | -0.005em |
| H5 | 20/28 | 18/26 | 600 | 0 |
| H6 | 18/26 | 17/26 | 600 | 0 |
| Lead | 20/32 | 18/28 | 400 | 0 |
| Body | 17/28 | 17/28 | 400 | 0 |
| Compact | 15/24 | 15/24 | 400 | 0 |
| Small | 14/20 | 14/20 | 400 | 0 |
| Eyebrow | 13/16 | 13/16 | 600 | 0.08em, uppercase |

Nothing goes below 13 px. Keep lines to about 70 characters, left-aligned, in sentence case except the eyebrow.

### Spacing and layout

- **Spacing, in px only:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Sections are 96 on desktop and 64 on mobile.
- **Grid:** 12 columns with a 24 px gutter and 48 px margin from 1024 px, to a 1280 px maximum. 8 columns at 768 to 1023 px, with a 24 px gutter and 32 px margin. 4 columns under 768 px, with 16 px for both.
- **No horizontal scrolling** at any width from 320 px.
- **Radius:** 2 px badges and checkboxes, 4 px buttons and fields, 8 px cards and images, 999 px radio buttons only.
- **Shadows:** prefer hairline borders. `0 1px 2px rgba(59,24,30,.08)` for the sticky header, and `0 4px 12px rgba(59,24,30,.10)` for card hover and 3D labels.
- **Buttons:** 48 px high with 24 px padding, or small at 44 px with 16 px. At most one primary button in each view. Gold buttons appear on maroon only, except the header quote button.
- **Fields:** 48 px high, with 16 px text so that iOS does not zoom.
- **Phones:** a fixed action bar (Call, WhatsApp once a number is set, Get a quote) replaces the header button, and the hero's primary button is hidden. The desktop menu shows from 1280 px (`xl`, header only).
- **Photos:** illustrative stock, labelled as such, with no text on top and no photo in the Home hero. AVIF or WebP, 120 KB or less, lazy-loaded below the fold.

### Motion

Motion explains a change. It never decorates or delays.

- **Tokens:** 120 ms for hover and press, 200 ms for menus and card hover, 320 ms for large panels, and 800 ms at most for 3D camera moves.
- **Easing:** `cubic-bezier(.2,0,0,1)` for items responding, and `cubic-bezier(.4,0,.2,1)` for camera moves.
- **Animate only `transform` and `opacity`,** apart from colour on hover.
- **No** scroll-jacking, parallax, autoplaying carousels, animated counters or text that fades in on scroll. Anything moving over 5 seconds has a pause control.
- **Lenis** must leave native scrolling in control.
- **`prefers-reduced-motion: reduce`:** remove movement, keep colour changes, turn smooth scrolling off and start no 3D.

### 3D style

- **Materials:** matte only, roughness 0.85 to 1.0, metalness 0, with one shared material per colour. No transparency, reflections, environment maps, bloom, glow or lens effects.
- **Colours:** ground `#F0EBE5`; structure `#CFC8BF`, `#B4ABA1` and `#8F857E`; process lines `#571926`; selected or active `#E19950`; dimmed `#E4DED7`.
- **Selection:** must also dim other parts, add a maroon outline and open an HTML label, because gold alone is too faint.
- **Light:** one soft hemisphere light and one warm key light from the upper left at about 45°, with baked soft shadows.
- **Camera:** 30° field of view, three-quarter view from about 30° above. Plant orbit ±60° horizontally and 15° to 60° vertically, with limited zoom and no panning. Hero: one turn every 40 s with a pause button, and a damped tilt of up to 8° towards the pointer (decision 265).
- **Limits, compressed:** runtime 200 KB, scene code 100 KB, hero 300 KB, plant 700 KB. Pixel ratio capped at 2. Desktop targets: 60 fps, 60,000 triangles on the hero and 150,000 on the plant.
- **Stills:** 80 KB or less at phone size, and 150 KB or less on desktop.
