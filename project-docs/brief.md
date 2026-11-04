# Project brief: Vanguard Technology website

Created 2026-11-03. Current site: https://vanguardgcc.com/

## Goal

Build a credible, fast B2B website with tasteful 3D that generates enquiries from oil & gas, water, district cooling, power and infrastructure operators and contractors in the UAE.

The site has one job: help an engineer or project lead decide quickly that Vanguard Technology covers their scope, then make it easy to send a useful enquiry.

## Project rules

- Never invent facts, clients, projects, numbers, certifications or testimonials.
- If something can't be verified, write around it neutrally and add it to [open-facts.md](open-facts.md).
- There is no client input or approval. Decide, record it in [decisions.md](decisions.md), and continue.

## The company, as far as we can support it

Everything below comes from Vanguard Technology's own website, read on 2026-11-03, which we treat as the starting truth. Searches found no independent source that confirms it. The full record is in [current-site.md](current-site.md).

| Topic | What the current site says |
|---|---|
| Business | "End-to-end Industrial Automation solutions"; a "full-service system integrator" |
| Technical scope | SCADA, communications and control; PLC programming; system design, assembly and integration |
| Named system areas | Control & process automation; water & waste water; HVAC control systems; district cooling plants; integrated building & energy management systems; safety instrumented systems; condition monitoring systems; retrofit, maintenance and field services |
| Sectors | Oil and gas, power, water, infrastructure; also process industry and district cooling plants |
| Services | Turnkey projects; project management; engineering services; supply of automation, instrumentation and electrical products; field installation; annual maintenance contracts; IT consultancy |
| Electrical work | Supply and installation of cable laying, trunking, DB, indoor and outdoor lighting, duct work |
| Contact | 403, Cuba Cafe Building, PO Box 36864, Tourist Club Area, Al Zahiya Zone, Abu Dhabi, UAE (the Contact page map shows a different address; see `open-facts.md` item 31); +971 2 626 8001; info@vanguardgcc.com |

## Problems with the current site

These are the problems the new site has to fix:

- **No project enquiry route.** The Contact page's HTML has no enquiry form, only a newsletter sign-up. Footer links are placeholders.
- **No proof behind the claims.** Six logos appear under "Our Partners" with no scope or context, one of them the German automobile club's, and the "Our Projects" page describes no projects.
- **A confused message.** Shipping, real estate, limousine and hotel content sits next to automation, and Vision and Mission are mixed up.
- **Template content.** The site has stock photos, generic FAQs (including card payment methods), a sentence that names a different company ("GAS"), and spelling errors in headings.
- **Claims a buyer can't check.** Examples are "pioneer", "world-class", "global clientele" and "the only vertically integrated specialty contractor operating in the UAE".
- **Heavy for what it does.** The home page's HTML has 25 script tags and 36 stylesheet links, and includes a logo declared at 7500 × 7500 px.

## Audience

No audience research or analytics were available, so these groups are assumptions drawn from the project goal.

| Group | Typical roles | What they need to find out |
|---|---|---|
| **Operators and asset owners** | Maintenance, operations, instrumentation & control and engineering leads | Can you support, retrofit or maintain our systems? How do we start a maintenance contract? |
| **Contractors** | Project managers, MEP and EPC engineering leads, procurement | Can you take this automation package? What exactly is in your scope? |

Both groups are likely to be technical, short of time and wary of marketing language. Many will first look on a phone and evaluate on a desktop. Some will need to forward the site to a colleague, so pages have to make sense when shared alone.

## Message

Lead with specific scope in plain engineering language: which systems, which sectors, which stages of a project and who to contact. Specificity has to do the work that project names and certifications would normally do, because we can't support those yet.

## Success measures

All figures below are targets we set for this project. They aren't facts about the company.

### Launch gates (pass or fail)

| Area | Measure | Target |
|---|---|---|
| Honesty | Factual statements traced to the current site or listed in `open-facts.md` | 100% |
| Honesty | Clients, projects, numbers, certifications or testimonials published that aren't on the current site or verified | 0 |
| Speed | Largest Contentful Paint, mobile | 2.5 s or less |
| Speed | Interaction to Next Paint, once field data exists | 200 ms or less |
| Speed | Cumulative Layout Shift | 0.1 or less |
| Speed | Page weight before any 3D loads, compressed | 300 KB or less |
| 3D | Content and enquiry form usable before and without the 3D | Yes, on every page |
| 3D | Works with WebGL off, on low-power devices and with reduced motion | Static fallback shown |
| 3D | 3D download, compressed and loaded after the page is usable | 1.5 MB or less |
| Accessibility | WCAG 2.2 AA, automated checks plus keyboard and screen reader pass | No known failures |
| Enquiry | Form tested from a phone and a desktop, including error states | Passes |
| Enquiry | Phone and email reachable in one tap from every page | Yes |

### After launch

| Measure | How we use it |
|---|---|
| Form enquiries per month | Main measure. No numeric target yet because there is no baseline. Set one after the first 90 days of data. |
| Qualified share of enquiries | An enquiry qualifies if it gives an organisation, a UAE site or project, a sector and a scope. |
| Phone and email clicks | Tracked as secondary enquiry signals. |
| Enquiries by sector | Shows which of the five sectors the site is reaching. |
| Enquiry page conversion rate | Shows where visitors drop out, and guides changes to the form and pages. |
| Search visibility for service and sector terms | Tracked in Search Console. Baseline taken at launch. |

## Out of scope for now

- Case studies and testimonials, until they can be verified. Partner logos follow decisions 42 to 45.
- Content for the shipping, real estate, limousine and hotel businesses beyond the Our Group page (decision 75).
- Blog and customer portal.
