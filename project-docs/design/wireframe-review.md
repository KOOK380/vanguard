# Wireframe review

Reviewed 2026-11-04 against [strategy.md](../strategy.md), using Playwright (Chromium) at 1440 × 900 and 390 × 844. The wireframes are in [wireframes.html](wireframes.html). Decisions 190 to 199 record the changes.

- **First version:** `screenshots/v1/`, built in the order of `site-content.md`.
- **Final version:** `screenshots/v3/`, with full-page and first-screen shots of each page.
- **Measurements:** `report.json` in each folder. Positions are distances from the top of the page, in pixels.

Full-page phone shots hide the fixed action bar, because Playwright draws it mid-page. The first-screen shots show it.

## Results

| Measure | First version | Final version |
|---|---|---|
| Main button, Solution, desktop / phone | 1,808 / 2,213 | 358 / 379 |
| Main button, Industry, desktop / phone | 1,744 / 2,152 | 331 / 367 |
| Main button, Capabilities, desktop / phone | 2,556 / 3,772 | 282 / 303 |
| Plant model heading, Home, desktop / phone | 3,503 / 6,109 | 2,125 / about 3,500 |
| Home length on phones | 8,412 | About 6,700 |
| Call link always on screen, phones | No | Yes |
| Persistent main action, phones | No | Yes |
| 3D plant model on Solution and Industry pages | No | PLC/SCADA and all industry pages |
| Links under 24 px high, phones | Up to 4 per page | 0 |
| Horizontal scrolling | None | None |

All 88 headings and labels in the final wireframes appear in `site-content.md`.

## Does each page lead to its call to action?

| Page | Finding in the first version | Fix |
|---|---|---|
| **All, phones** | No persistent action and no call link in the header, which `strategy.md` requires on every page | Fixed action bar with Call and the page's primary action |
| **Home** | Good in the first screen, then no button for about 4,100 px on desktop | Added a button after How we work |
| **Solution** | No button until the end of the page | Added buttons to the hero, and kept the closing band |
| **Industry** | H1 alone in the first screen, with no intro or button | Added an intro and both buttons |
| **Capabilities** | Document request came only after six long profiles | Added it to the hero and beside Company details, and made the profiles expandable |
| **Contact** | Header button linked to the same page, and the phone link sat below the whole form | Hid the header button here. The phone bar gives Call and Email, as secondary buttons |

## Is the content order right for each journey?

### 1. Oil and gas procurement engineer (PLC/SCADA page)

| Must see | First version | Final version |
|---|---|---|
| SCADA scope in the first screen | Yes | Yes |
| Oil and gas named, with a link | Unlinked, at 1,143 px | Linked in the hero |
| Rest of the scope | Yes | Yes |
| 3D view from instruments to SCADA | **Missing** | After What we deliver |
| Our Partners | **Missing** | Before the closing band |
| Based in Abu Dhabi, phone and email | Footer only | Before the closing band |
| "Tell us which platform your site runs on" | Inside an FAQ | Also the closing heading |
| Backup: request company documents | **Missing** | Closing band |

### 2. Facilities manager, maintenance contract (Field Services page)

This page was not in the first version. It is where this journey lands, so it was added.

| Must see | Final version |
|---|---|
| Maintenance contracts in the first screen | H1 and intro |
| District cooling named on the page | First linked industry, and an FAQ |
| What support includes, and 24/7 support | What we deliver |
| What to have ready | Callout beside What we deliver |
| Phone number | Hero button, and the phone action bar |

The alternative entry, District Cooling, now links to maintenance in the hero and lists maintenance first under How Vanguard helps.

### 3. Consultant checking credentials (Capabilities page)

| Must see | First version | Final version |
|---|---|---|
| What the company does, in one view | Yes | Yes, in five columns on desktop |
| Document route | Last on the page | First screen, and beside Company details |
| Company details | After the profiles | Before the profiles |
| Partner logos, with no added claims | Directly after the profiles' section | Separated from the profiles (decision 159) |
| Team link | After the profiles | Before the profiles |
| Typical project profiles | Second, and long | Last, as expanding items with the label always visible |

## Other fixes

- **Home:** moved the plant model to follow the industries its hotspots link to. Merged the proof points and partner logos into one band, and made the cards compact on phones. Cards now follow the priority tiers, so IT and audio/visual come last.
- **Plant model:** moved the marker label so that it no longer covers a hotspot. Each industry page opens focused on its own hotspot.
- **Forms:** three groups, with the request first. Renamed the first group to avoid "What you need" above "What do you need?".
- **Capabilities:** a single column stops one open profile leaving gaps in a two-column grid.
- **Industry:** moved the heading above the model on phones, and removed a third closing button.
- **Tap targets:** enlarged inline phone, email and list links on phones.

## 3D placement

| Marker | Where | Build |
|---|---|---|
| **3D hero** | Home only | WebGL after the page is usable, with a static image as the LCP and fallback |
| **3D plant model** | Home, PLC/SCADA and all industry pages | Loads near the viewport, with an HTML list and static fallback, and "Explore" on touch |
| **3D icon** | Home cards, and solution and industry heroes | Pre-rendered images, not WebGL (decision 191) |

Capabilities and Contact have no 3D, so nothing competes with their document request and form.

## What this review cannot show

- **Real use:** nobody from the target audience has tried these. This checks the layout against `strategy.md`, and does not show how people behave.
- **Performance:** placeholders carry no weight. The 300 KB page budget and the 3D budget still need measuring in the build. Fifteen icons on Home at 8 KB each add up to 120 KB, lazy-loaded.
- **Other pages:** seven of the nine solution pages and five of the six industry pages use the same templates, but were not drawn separately.
- **Proof:** the layout makes the document request easy to find, but cannot replace the missing licences, certifications and project references (open facts 11, 15 and 54).
- **Fonts:** the wireframes use a system font, so final line breaks and positions will differ slightly.
