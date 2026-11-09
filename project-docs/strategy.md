# Site strategy

Written 2026-11-03. Based on [brief.md](brief.md), [research.md](research.md), [open-facts.md](open-facts.md) and [decisions.md](decisions.md). Keywords and titles are in [keyword-plan.md](keyword-plan.md).

"Source" refers to the fact IDs in `research.md`. A page can only state what its sources support (decision 55).

## Final sitemap

26 pages.

| Page | URL | Main menu | Source |
|---|---|---|---|
| Home | `/` | Logo | F1 to F16 |
| About | `/about-us/` | Yes | F1, F2, F13, F19 |
| **Solutions overview** | `/solutions/` | Yes | F2, F6, F7 |
| System Integration | `/solutions/system-integration/` | Under Solutions | F2, F3, F29 |
| Control & Instrumentation Engineering | `/solutions/control-instrumentation-engineering/` | Under Solutions | F6, F8 |
| Supply & Field Installation | `/solutions/automation-electrical-supply-installation/` | Under Solutions | F7, F10 |
| Turnkey Projects | `/solutions/turnkey-projects/` | Under Solutions | F2, F7 |
| Project Management | `/solutions/project-management/` | Under Solutions | F7, F20 |
| Field Services & Annual Maintenance Contracts | `/solutions/field-services-maintenance/` | Under Solutions | F6, F7, F11, F20 |
| PLC/SCADA Design & Validation | `/solutions/plc-scada-design-validation/` | Under Solutions | F3, F9, F23 |
| IT Consultancy | `/solutions/it-consultancy/` | Under Solutions | F7, F28, F29 |
| Audio/Visual Integration | `/solutions/audio-visual-integration/` | Under Solutions | F26 |
| **Industries overview** | `/industries/` | Yes | F4, F5 |
| Oil & Gas | `/industries/oil-gas/` | Under Industries | F5 |
| Water & Wastewater | `/industries/water-wastewater/` | Under Industries | F4, F5, F6 |
| District Cooling | `/industries/district-cooling/` | Under Industries | F4, F6 |
| Power & Infrastructure | `/industries/power-infrastructure/` | Under Industries | F4, F5 |
| HVAC & Building Management Systems | `/industries/hvac-building-management-systems/` | Under Industries | F6 |
| Safety Instrumented Systems | `/industries/safety-instrumented-systems/` | Under Industries | F6 |
| Capabilities | `/capabilities/` | Yes | F2 to F12 |
| Our Group | `/our-group/` | Footer and About | F17, F18 |
| Careers | `/careers/` | Footer | F19 |
| Contact | `/contact-us/` | Yes, as a button | F14, F15, F16 |
| Privacy Policy | `/privacy-policy/` | Footer | Draft for legal review |
| Terms of Use | `/terms/` | Footer | Draft for legal review |
| 404 | Any unknown URL | None | None |

**Structure decisions**
- **Capabilities/Projects is one page.** It is labelled Capabilities because no project can be sourced yet. It shows six typical project profiles, labelled as types of work (decisions 157 and 159). `/projects/` stays unused until a real project fills `content/case-study-template.md` (decisions 163 and 165).
- **Nine solution pages** follow the list in decision 137. Building and energy management, safety instrumented systems and condition monitoring remain in the scope of Control & Instrumentation Engineering.
- **Six industry pages** follow the list in decision 146. Power and Infrastructure share one page. HVAC & Building Management Systems and Safety Instrumented Systems are system types rather than sectors, but sit under Industries (decision 148).
- **Old URLs:** `/clientsgroups/` redirects to `/our-group/`. `/`, `/about-us/`, `/solutions/` and `/contact-us/` stay the same. WordPress leftovers redirect home, and spam URLs return 404 or 410 (decisions 53 and 59).

**On every page:** one H1, the phone number as a tap-to-call link, the email as a link, and a persistent call to action: the "Start a consultation" header button on desktop, and a Call and primary action bar on phones.

## Page layouts

Section order tested in [design/wireframes.html](design/wireframes.html) at 1440 px and 390 px. Findings are in [design/wireframe-review.md](design/wireframe-review.md).

| Page | Section order | 3D |
|---|---|---|
| **Home** | Hero with buttons; proof points and Our Partners; Our solutions; Industries we serve; From field instruments to SCADA; How we work, with a button; Why Vanguard; Capabilities; Tell us about your system | 3D hero; 3D icons on solution rows; photos on industry cards; 3D plant model |
| **PLC/SCADA Design & Validation** | Hero with buttons and linked industries; What we deliver; From field instruments to SCADA; How we work; FAQs; Our Partners and Based in Abu Dhabi; closing band "Tell us which platform your site runs on", with Discuss your SCADA scope and Request company documents | Static 3D render in hero; 3D plant model |
| **Other solution pages** | Hero with buttons and linked industries; What we deliver; How we work; FAQs; Our Partners and Based in Abu Dhabi; closing band "Tell us about your system" | Static 3D render in hero |
| **Field Services & Annual Maintenance Contracts** | As other solution pages, with the quote FAQ as a callout beside What we deliver, and a closing band "Tell us about your plant" | Static 3D render in hero |
| **Industry pages** | Hero with intro and buttons; Operator challenges; How Vanguard helps; See it on the model, with Typical systems we deliver; closing band with the page's primary button as H2 | 3D plant model focused on the page's hotspot |
| **Capabilities** | Hero with buttons; What we do; Our Partners; Company details beside Preparing a shortlist?; The types of work we deliver, as a single column of expanding profiles with the label always visible and the first open; Tell us about your system | None |
| **Contact** | Hero; form in three groups, beside Contact details and What happens after your enquiry on desktop, and above them on phones | None |

**Home card order:** System Integration, PLC/SCADA Design & Validation, Field Services & Annual Maintenance Contracts, Control & Instrumentation Engineering, Supply & Field Installation, Turnkey Projects, Project Management, IT Consultancy, Audio/Visual Integration. This follows the priority tiers in [keyword-plan.md](keyword-plan.md).

**3D icons** on Home are live low-poly models in one shared canvas on capable desktops, with matching SVG icons everywhere else (decision 275, replacing the pre-rendered images of decisions 191 and 203). **Live 3D** appears on capable desktops only, and everyone else sees the still image with the same links (decision 226). The visual design of Home, PLC/SCADA and Contact is in [design/design-review.md](design/design-review.md).

## User journeys

### 1. Oil & gas procurement engineer looking for a SCADA integrator

**Situation:** building a list of possible suppliers for a SCADA package, and likely to judge a company in under a minute before forwarding it to technical colleagues.

**Landing page:** `/solutions/plc-scada-design-validation/`, from a search such as "SCADA system integrator UAE". `/industries/oil-gas/` is the alternative entry, and each links to the other.

**What they must see**
1. In the first screen: SCADA, communications and control system implementation, in plain terms (F3).
2. Oil and gas named as a sector, with a link to that page (F5).
3. The rest of the scope around SCADA: PLC programs, instrumentation, electrical, field installation and maintenance (F7, F9).
4. The 3D view from field instruments through PLC to SCADA, with a static fallback.
5. "Our Partners", including ADNOC and CNPC, as logos only with no project wording (F12).
6. "Based in Abu Dhabi" with a working phone number and email (F14 to F16).
7. A prompt that says "Tell us which platform your site runs on", because no platforms are sourced.

**Action we want:** send the enquiry form, pre-filled with Oil & Gas and SCADA.

**Backup action:** request company documents.

**Known gap:** they'll probably look for vendor registration, platform experience and references, and we can't show them (open facts 11, 15 and 17). The document request is what keeps them in contact.

### 2. Facilities manager needing a maintenance contract for a district cooling plant

**Situation:** responsible for keeping a plant running, and wants to know quickly whether this company takes on maintenance of its controls and who to call.

**Landing page:** `/solutions/field-services-maintenance/`, from a search such as "automation maintenance contract UAE". `/industries/district-cooling/` is the alternative entry, from a search such as "district cooling maintenance contract UAE", and has a clear link to the maintenance page.

**What they must see**
1. In the first screen: annual maintenance contracts for automation and control systems (F7).
2. District cooling plants named, on the page itself (F4, F6).
3. What support includes, as the site lists it: technical resources, project support, maintenance services, technical expertise and remote support (F20).
4. Retrofit and field services for ageing systems (F6).
5. "24/7 support", with no response times or guarantees added (F11).
6. A short list of what to have ready: plant location, control system in use, and current support arrangement.
7. A phone number that can be tapped immediately (F14).

**Action we want:** send "Ask about a maintenance contract", pre-filled with District Cooling and Maintenance.

**Backup action:** call +971 2 626 8001.

**Known gap:** contract terms, coverage hours and response times aren't sourced (open fact 19). The page invites the question instead of answering it.

### 3. Consultant checking credentials before shortlisting

**Situation:** already knows the company's name, is deciding whether to shortlist it, and is looking for evidence to put on file.

**Landing page:** `/capabilities/`, from a search on the company name, a link in an email, or the menu on any page.

**What they must see**
1. In one view: what the company does, its sectors and systems, and its engineering disciplines (F2 to F8).
2. A clear document route in the first screen, repeated beside the company details: "Ask us for the company documents your prequalification process needs."
3. "Our Partners" logos, with no added claims (F12), kept apart from the profiles.
4. Company details: name, address, phone and email (F1, F14 to F16).
5. A link to the team's names and titles on About (F13).
6. Typical project profiles showing scope, systems and deliverables, clearly labelled as types of work and not completed projects.
7. No empty certification list, placeholder counter or vague "trusted by" claim.

**Action we want:** send "Request company documents", pre-filled with Prequalification.

**Backup action:** start a consultation.

**Known gap:** this is the weakest journey. A consultant will expect a trade licence, certifications, project references and a founding date, and we can't source any of them (open facts 1, 2, 11 and 15). The honest page and document request reduce the damage, but real documents are what would fix it. The page also can't confirm which documents the company holds (open fact 54).

## Calls to action by page

"Start a consultation" and the phone link also stay in the header throughout. Buttons marked "pre-filled" open `/contact-us/` with the form's sector, system or request type already chosen.

| Page | Primary | Secondary |
|---|---|---|
| Home | Start a consultation | Explore solutions |
| About | Start a consultation | View capabilities |
| Solutions overview | Start a consultation | Find your industry |
| System Integration | Discuss your integration scope (pre-filled) | View capabilities |
| Control & Instrumentation Engineering | Discuss your engineering scope (pre-filled) | See PLC and SCADA design |
| Supply & Field Installation | Request a supply or installation quote (pre-filled) | See turnkey projects |
| Turnkey Projects | Discuss your project (pre-filled) | See project management |
| Project Management | Discuss your project (pre-filled) | See turnkey projects |
| Field Services & Annual Maintenance Contracts | Ask about a maintenance contract (pre-filled) | Call us |
| PLC/SCADA Design & Validation | Discuss your SCADA scope (pre-filled) | See oil and gas |
| IT Consultancy | Discuss your IT requirements (pre-filled) | About Vanguard Technology |
| Audio/Visual Integration | Discuss your AV project (pre-filled) | About Vanguard Technology |
| Industries overview | Start a consultation | Explore solutions |
| Oil & Gas | Discuss your oil and gas project (pre-filled) | See PLC and SCADA design |
| Water & Wastewater | Discuss your water project (pre-filled) | See PLC and SCADA design |
| District Cooling | Discuss your plant (pre-filled) | See field services and maintenance |
| Power & Infrastructure | Discuss your power or infrastructure project (pre-filled) | See system integration |
| HVAC & Building Management Systems | Discuss your building controls (pre-filled) | See field services and maintenance |
| Safety Instrumented Systems | Discuss your safety system requirements (pre-filled) | See control and instrumentation engineering |
| Capabilities | Request company documents (pre-filled) | Start a consultation |
| Our Group | Explore automation solutions | Contact us |
| Careers | Email your CV to info@vanguardgcc.com | About Vanguard Technology |
| Contact | Send enquiry | Call us |
| Privacy Policy | Contact us about your data | Back to home |
| Terms of Use | Contact us | Back to home |
| 404 | Explore solutions | Start a consultation |

## Page notes

- **Development source:** all copy is merged in `site-content.md` (decision 189).
- **Other page copy:** Our Group, Careers, Contact, the enquiry form, 404, the cookie banner and the newsletter sign-up are in `content/other-pages.md`.
- **Legal pages:** templates are in `content/legal.md`, and must not launch without legal review (open fact 63).
- **Our Group:** repeats the site's own descriptions of the shipping, real estate, limousine and hospitality businesses and hotels. It makes no ownership claims, leaves out "5★" and stays out of the main menu, so it doesn't distract from automation enquiries (decision 75).
- **Careers:** lists no vacancies, since none can be sourced. It describes the kinds of roles the site mentions and invites CVs by email. The address is the only published one, and whether CVs reach the right person is unconfirmed (open fact 25, decision 76).
- **Industry pages:** copy is in `content/industries.md`. Operator challenges are general statements from outside sources, clearly separate from statements about Vanguard, and must not read as past project experience (decision 149). Each page also supplies the text for one plant model hotspot (decision 152).
- **Capabilities:** copy is in `content/capabilities.md`. Its profiles are not case studies and need company confirmation before launch (open fact 60).
- **Solution pages:** copy is in `content/solutions.md`. Unsourced wording was removed in the 2026-11-04 proofread (decision 182, open fact 56).
