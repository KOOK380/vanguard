# Case study template

For adding real projects through the CMS (decision 163). **This file holds no project data, and none should be invented to test or demonstrate it.** Use obvious placeholders in test entries, and never publish them.

## How it works

- Entries are created in the CMS as drafts (decision 164).
- An entry goes live only when the checklist below is complete.
- `/projects/` and the Projects menu item stay off until the first entry is published. After that, each entry appears at `/projects/<slug>/`.
- The six profiles in [capabilities.md](capabilities.md) stay on Capabilities, still labelled as typical work.

## Fields

### Published fields

| Field | CMS type | Required | What to enter | Rule |
|---|---|---|---|---|
| Title | Text, up to 70 characters | Yes | System and site type, such as "[System] for [type of site]" | Plain description, with no rank words |
| Slug | Text | Yes | Lowercase words with hyphens | Becomes the URL. Do not change it after publishing |
| Client | Text | Yes | The client's legal or trading name | Shown only if "Client may be named" is Yes. Otherwise the page shows "Client name withheld" |
| Location | Text | Yes | City or area, and country | Shown at the level the client approves |
| Year | Number, four digits | Yes, once completed | Year the work was completed | While work is under way, leave it blank and set "Project state" to In progress. The page then shows "In progress" |
| Sector | Select | Yes | Oil & Gas, Water & Wastewater, District Cooling, Power & Infrastructure, or HVAC & Building Management Systems | Links to the matching industry page |
| Systems | Multi-select | Yes | SCADA, PLC, communications, HVAC control, building and energy management, safety instrumented systems, condition monitoring, instrumentation, electrical | A safety instrumented systems entry also links to that page. Name a platform or vendor in the text only if it was used on this project and the client approves |
| Scope | Rich text, up to 80 words | Yes | What Vanguard Technology was responsible for | Separate our work from other contractors' work |
| Challenge | Rich text, up to 80 words | Yes | The problem the client needed solved at this site | Facts about this site, not general industry statements |
| Solution | Rich text, up to 120 words | Yes | What was designed, supplied, installed or maintained | Past tense. Only work actually carried out |
| Result | Rich text, up to 80 words | Yes | What was handed over or changed | See "Writing the result" |
| Photos | Image list, 1 to 6 | Yes | Real photos of this project | See "Photo rules" |

Each photo needs its own alt text, caption and photographer or owner credit.

### Internal fields (never published)

| Field | CMS type | Required | What to enter |
|---|---|---|---|
| Status | Select | Yes | Draft, In review, Approved, Published. New entries start as Draft |
| Project state | Select | Yes | Completed or In progress |
| Client may be named | Yes or No | Yes | Yes only with the client's written approval |
| Client approval | File or link | To publish | The client's written approval of the text, including any logo use |
| Photo permission | File or link | To publish | Permission from the client and site owner |
| Evidence | File or link | To publish | A record that supports the scope and result, such as a contract extract or handover certificate |
| Result source | Text | If the result has a figure | Who measured it, how and when |
| Reviewed by | Text and date | To publish | The Vanguard Technology person who checked the facts |

## Writing the result

- **Use a measured figure only with a source.** Record who measured it, how and when.
- **Without a figure, state what was handed over.** "The system was handed over and is maintained under an annual contract" is a valid result, if true.
- **Do not imply cause without evidence.** A saving or fault reduction needs a before and after comparison.
- **Do not use the client's words as a quote without written approval.**

## Photo rules

- Use real project photos only. No stock photos, renders or photos from suppliers presented as the site.
- Hide screens, tags and documents that the client has not cleared.
- Get consent from anyone who can be identified.
- Check that workers are shown in correct protective equipment.
- Upload at 2400 px wide or less. The build compresses each image to 120 KB or less, in line with the page budget.

## Before publishing

- [ ] Every field in "Published fields" is complete.
- [ ] The client has approved the text in writing.
- [ ] Photo permission is on file.
- [ ] Evidence supports the scope and result.
- [ ] Any figure has a recorded source.
- [ ] Sector, systems and scope match the site's stated services, or those pages have been updated.
- [ ] The text follows [tone.md](../project-docs/tone.md).
- [ ] The matching row in [open-facts.md](../project-docs/open-facts.md) has been updated with the source and date.

## Blank entry

The CMS creates this file for each project. Comments are for editors.

```yaml
---
# Published fields
title: ""
slug: ""
client: ""
location: ""
year:              # Leave blank while the project is in progress
sector: ""
systems: []
scope: ""
challenge: ""
solution: ""
result: ""
photos: []         # Each item: { image: "", alt: "", caption: "", credit: "" }

# Internal fields, never published
status: "Draft"
project_state: ""
client_may_be_named: false
client_approval: ""
photo_permission: ""
evidence: ""
result_source: ""
reviewed_by: ""
reviewed_date: ""
---
```

## Page layout

1. Title as the H1
2. Summary record: client, location, year, sector and systems
3. Scope
4. Challenge
5. Solution
6. Result
7. Photos
8. Call to action: Discuss a similar project (pre-filled)

The summary record uses the **Project record** card variant in [design-system.md](../project-docs/design-system.md).
