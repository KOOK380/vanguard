# Design review

Reviewed 2026-11-04. Covers [home.html](home.html), [solution.html](solution.html) and [contact.html](contact.html), built from [wireframes.html](wireframes.html), [design-system.md](../design-system.md) and [site-content.md](../site-content.md). Decisions 200 to 210 record the choices.

**Final screenshots:** [final-screenshots/](final-screenshots/), at 1440 px and 390 px, with full-page and first-screen shots of each page, plus form errors, the sent message and the cookie banner. Full-page phone shots hide the fixed action bar, because Playwright draws it mid-page. The first-screen shots show it.

## Sign-off

**Signed off as the visual direction for the build**, subject to the limits below. The pages look specific to this company and sector. A light page with an engineering model is unlike the dark photo heroes of the competitors reviewed, and it makes no claim the sources cannot support.

## Critique rounds

### Round 1: the hero works, and the rest is a template

| Criterion | Finding | Change |
|---|---|---|
| Credibility | Company name unreadable in the stacked logo | Horizontal lockup from the existing shapes |
| Credibility | Partner logos tiny, with white boxes showing | Larger, and blended into the page |
| Premium feel | Dated control room photo fought the palette | Removed |
| Hierarchy | Why Vanguard had no weight | Maroon-900 section |
| Hierarchy | Plant model small and adrift | Closer render, larger stage, on stone |
| Spacing | Evenly alternating stone and paper bands | Stone only behind Industries and the plant |
| Spacing | Home was 10,840 px long on phones | Compact rows, 2-column sector cards, fewer photos |
| Polish | Double-escaped "&amp;amp;", an orphaned word, 4 of 9 solutions in the footer | Fixed |
| Solution page | Hero crop had a hard edge, and the icon was muddy | Dedicated render, no icon |

### Round 2: much stronger, and the details now show

| Criterion | Finding | Change |
|---|---|---|
| Hierarchy | Two identical primary buttons on the phone's first screen | Hero primary hidden on phones |
| Premium feel | Last Why Vanguard item sat alone in its row | Ruled two-column schedule |
| Contrast | Saturated blue switchgear clashed with maroon | Black and white process pipework |
| Polish | Badges floated away from their models, and breadcrumb underlines were misaligned | Moved and aligned |

### Round 3: checked at full resolution

| Criterion | Finding | Change |
|---|---|---|
| Polish | Icons showed faint squares, and the plant's corner was clipped | Shadows fade out before the image edge, and the camera moved |
| Consistency | Added eyebrow text, and text sizes off the scale | Eyebrow removed, and type returned to the scale with two logged additions |
| Credibility | Stock photos could read as Vanguard's work | "Illustrative photo" labels |
| Phone | Photo sat above its heading | Reordered |

### Round 4: what an engineer would notice

| Criterion | Finding | Change |
|---|---|---|
| Credibility | **The cabinet photo showed hardware a controls engineer would recognise as one vendor's**, although the site names no platform | Replaced with a generic panel-testing photo |
| Credibility | Brand mark and signage on the HVAC photo, barcode on the safety panel, lettering on the cooling units, tag and meter on the pipework | Cropped |
| Speed | 840 px photos were sent to 170 px phone slots | 420 px versions added |
| Access | Phone hotspots were 36 px | 44 px |

### Round 5: final polish

The heading balance rule had produced a poor H1 break, which is fixed. A last faint mark on the HVAC photo is cropped out. I found nothing further that I would hold the design for.

## Checks on the final pages

| Check | Result |
|---|---|
| axe-core, WCAG 2.2 A and AA, all six page views | 0 violations |
| Horizontal scrolling at 1440 px and 390 px | None |
| One H1 per page | Yes |
| Text under 13 px | None |
| Form: errors, summary links, sent message, pre-filled request type | Work in Chromium |
| Render fallback sizes | Desktop 112 KB (limit 150), phone 48 KB (limit 80) |
| Photos | All under 120 KB |

axe-core catches only some accessibility problems. Keyboard use and a screen reader still need a manual test in the build.

## Limits of this sign-off

- **Stock photos remain the weakest part.** They are good, but they are not Vanguard's work. Real project photos would do more for credibility than any further design change ([open-facts.md](../open-facts.md), images to replace).
- **Proof is still thin.** Design cannot replace licences, certifications and project references. An oil and gas buyer will still ask for them (open facts 11 and 15).
- **Company facts are unconfirmed.** Partner logo permission (9), the address (31), the horizontal logo (66) and the service scope all remain open.
- **The 3D is a static render.** The stills now come from the final models in `assets-raw/models/` ([3d-brief.md](../3d-brief.md)), but the live WebGL viewer is not built, so frame rate and the 1.5 MB budget are untested.
- **Page weight needs checking in the build.** Before compression, the first screen on Home is about 244 KB on desktop and 180 KB on phones, against the 300 KB budget. Chromium also fetches lazy images near the viewport early, so Home reached 489 KB on desktop and 377 KB on phones, also before compression. The plant model should load by script as it nears the viewport.
- **These are mock-ups.** Only these three pages are designed. Forms do not send, many links are placeholders, and `site.css` still has its critique rounds stacked in order, so it should be consolidated for the build.
- **Testing:** Chromium only, at two widths, with no real users.

## Source files

`source/` holds the scene, render, page and asset scripts. They use this machine's absolute paths and need Playwright, Three.js, axe-core and Inter from npm.
