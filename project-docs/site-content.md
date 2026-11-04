# Vanguard Technology: site content

Single source of copy for development, organised by page. Generated from the files in `content/` on 2026-11-04 (decision 189). Edit those files, then regenerate this one.

## How to use this file

- **Publish** everything except the items below.
- **Do not publish** lines starting "Internal note", "Build note" or "3D build note", or anything under "Internal sources".
- **Square brackets** mark details to fill in. None may remain on the live site.
- **Meta title and description** go in the page head. Every page has one H1.
- **Spelling:** British English. Keep the wording as written. Changes to factual statements need a source in [research.md](research.md).

**Related documents:** [design/wireframes.html](design/wireframes.html), [design-system.md](design-system.md), [strategy.md](strategy.md), [keyword-plan.md](keyword-plan.md), [image-credits.md](image-credits.md), [open-facts.md](open-facts.md).

## Before launch

Copy is proofread and checked against the sources, but these items are still open.

| Blocker | Open fact |
|---|---|
| Legal review of the Privacy Policy and Terms of Use, which are templates | 63 |
| Registered legal name and licence number, and service provider names | 65, 64 |
| Correct office address (the current site shows two) | 31 |
| That the phone number and info@vanguardgcc.com are monitored | 23, 25 |
| Safety Instrumented Systems page: confirm the experience, or remove the page | 59 |
| Capability profiles: confirm each type of work | 60 |
| Team names and titles: confirm that they are current | 8 |
| Permission to show partner logos | 9 |
| Newsletter content and sending tool; hold the form until settled | 64 |
| Cookie table: test the live site | 62 |

## Contents

**Site-wide:**

- [Header](#global-header)
- [Phone action bar](#global-phone-bar)
- [Footer](#global-footer)
- [Cookie banner](#global-cookie-banner)
- [Newsletter sign-up](#global-newsletter)
- [Enquiry form](#global-enquiry-form)

**Pages:**

- [Home](#home)
- [About](#about)
- [Solutions overview](#solutions-overview)
- [Solution: System Integration](#solution-system-integration)
- [Solution: Control & Instrumentation Engineering](#solution-control-instrumentation-engineering)
- [Solution: Supply of Automation & Electrical Products and Field Installation](#solution-supply-of-automation-electrical-products-and-field-installation)
- [Solution: Turnkey Projects](#solution-turnkey-projects)
- [Solution: Project Management](#solution-project-management)
- [Solution: Field Services & Annual Maintenance Contracts](#solution-field-services-annual-maintenance-contracts)
- [Solution: PLC/SCADA Design & Validation](#solution-plc-scada-design-validation)
- [Solution: IT Consultancy](#solution-it-consultancy)
- [Solution: Audio/Visual Integration](#solution-audio-visual-integration)
- [Industries overview](#industries-overview)
- [Industry: Oil & Gas](#industry-oil-gas)
- [Industry: Water & Wastewater](#industry-water-wastewater)
- [Industry: District Cooling](#industry-district-cooling)
- [Industry: Power & Infrastructure](#industry-power-infrastructure)
- [Industry: HVAC & Building Management Systems](#industry-hvac-building-management-systems)
- [Industry: Safety Instrumented Systems](#industry-safety-instrumented-systems)
- [Capabilities](#capabilities)
- [Our Group](#our-group)
- [Careers](#careers)
- [Contact](#contact)
- [Privacy Policy](#privacy-policy)
- [Terms of Use](#terms-of-use)
- [404 page](#404-page)

**Development reference:**

- [CMS: Case study template](#cms-case-study-template)
- [Legal and analytics build requirements](#legal-build-requirements)
- [Notes for the legal adviser](#legal-adviser-notes)
- [3D plant model hotspots](#3d-plant-hotspots)
- [Buttons and pre-filled enquiries](#buttons-and-prefill)
- [Page layouts](#page-layouts)

---

<a id="global-header"></a>

## Header

**Logo:** Vanguard Technology, linked to the home page

**Main menu:** About | Solutions | Industries | Capabilities

**Phone link:** +971 2 626 8001

**Button:** Start a consultation. Hidden on the Contact page, whose H1 is the same.

---

<a id="global-phone-bar"></a>

## Phone action bar

> **Build note:** Fixed to the bottom of the screen under 768 px, on every page. It replaces the header button on phones, and must not cover content or the cookie banner.

| Page | Left button | Right button |
|---|---|---|
| All pages, unless listed | Call | Start a consultation |
| Solution and industry pages | Call | The page's primary button |
| Capabilities | Call | Request company documents |
| Contact | Call | Email us, styled as a secondary button so that the form stays the main action |

---

<a id="global-footer"></a>

## Footer

**Contact:** +971 2 626 8001 | info@vanguardgcc.com | 403, Cuba Cafe Building, PO Box 36864, Tourist Club Area, Al Zahiya Zone, Abu Dhabi, UAE

**Company links:** About | Capabilities | Our Group | Careers | Contact

**Solutions links:** The nine solution pages

**Industries links:** The six industry pages

**Legal links:** Privacy Policy | Terms of Use | Cookie settings

**Copyright:** © [current year] Vanguard Technology. All rights reserved.

> **Internal note, do not publish:** Open fact 43 sets the current year only. No social icons, because no account is known (open fact 28).

---

<a id="global-cookie-banner"></a>

## Cookie banner

> **Build note:** GA4 and Microsoft Clarity load only after consent (decisions 174 and 175). The banner sits at the bottom of the screen, does not block the page or the enquiry form, and causes no layout shift. Give the accept and decline buttons the same size and prominence. Full requirements are in [legal.md](#privacy-policy).

**Text:** We would like to use Google Analytics and Microsoft Clarity to understand how this site is used. Clarity can record how you move through pages. The site works the same if you decline. See our [Privacy Policy](/privacy-policy/).

**Buttons:** Accept analytics | Decline analytics | Cookie settings

#### Cookie settings

**Heading:** Cookie settings

**Introduction:** Choose which analytics tools we may use. You can change this at any time from the site footer.

| Toggle | Default | Description |
|---|---|---|
| Google Analytics | Off | Helps us understand which pages are used and how visitors reach them. |
| Microsoft Clarity | Off | Helps us find usability problems, using session recordings and heatmaps. |

**Button:** Save choices

**Footer link:** Cookie settings

> **Internal note, do not publish:** Needs legal review (open fact 63). This replaces the earlier cookieless notice (decisions 38 and 170).

---

<a id="global-newsletter"></a>

## Newsletter sign-up

> **Build note:** Sits in the site footer. Uses a separate confirmation email, and sends nothing until the visitor confirms (decision 177). Keep it separate from the enquiry form.

**Heading:** Newsletter

**Introduction:** Updates from Vanguard Technology by email.

**Label:** Email address

**Checkbox, not ticked by default:** I agree to receive the Vanguard Technology newsletter by email. I can unsubscribe at any time. See the [Privacy Policy](/privacy-policy/).

**Button:** Subscribe

**Email error:** Enter your email address.

**Checkbox error:** Tick the box to confirm that you want the newsletter.

**Success:** Thank you. Check your email and confirm your subscription.

**Sending failed:** We could not complete your sign-up. Try again later.

> **Internal note, do not publish:** Who writes the newsletter, what it covers and which tool sends it are unknown (open fact 64). Do not launch the form until these are settled.

---

<a id="global-enquiry-form"></a>

## Enquiry form

> **Build note:** One form on `/contact-us/`. Buttons marked "pre-filled" set the request type, sector or system type (decision 81). Sends to info@vanguardgcc.com (decision 28). Use a hidden spam-trap field rather than a CAPTCHA, and no file upload at launch (decision 169).

**Form heading (H2):** Send your enquiry

**Form introduction:** All fields are required unless marked optional.

**Field groups, in this order:** Your request (Request type, Scope) | About your site (Sector, System type, Location, Project stage) | About you (Name, Organisation, Email, Phone, Message)

#### Fields

| Field | Label | Help text | Options | Error message |
|---|---|---|---|---|
| Request type | What do you need? | Choose the closest match. | Project enquiry; Maintenance or field support; Supply or installation quote; Company documents; Other | Choose what you need. |
| Name | Your name | | | Enter your name. |
| Organisation | Organisation | | | Enter your organisation. |
| Email | Email address | We use this to reply to you. | | Enter your email address so we can reply. |
| Phone | Phone number (optional) | Include the country code. | | Enter a valid phone number, or leave this empty. |
| Sector | Sector | | Oil and gas; Water and wastewater; District cooling; Power; Infrastructure; HVAC and building management systems; Other | Choose a sector. |
| System type | System type | Choose the main system. | SCADA; PLC and control systems; Communications; Instrumentation; Electrical and field installation; HVAC control; Building and energy management; Safety instrumented systems; Condition monitoring; IT consultancy; Audio/visual; Not sure | Choose a system type, or choose "Not sure". |
| Location | Site or project location | City or area, and country. | | Enter the site or project location. |
| Project stage | Project stage | | Early planning; Design; Tender; Installation; Existing system in operation; Not sure | Choose a project stage, or choose "Not sure". |
| Scope | What is your scope? | Describe the work you need, such as an upgrade, a supply package or a maintenance contract. | | Describe the scope you need. |
| Message | Anything else we should know? (optional) | You can mention your existing platform, programme or documents. We will ask for files if we need them. | | |

**Company documents:** when this request type is chosen, System type, Location, Project stage and Scope become optional, and their labels update to show this. Show this help text under the request type: "Tell us which documents your prequalification process needs."

**Job applications:** show this help text when "Other" is chosen: "Applying for a job? Email your CV to info@vanguardgcc.com."

**Pre-filled field help text:** Selected from the page you visited. You can change it.

**Spam-trap field label (hidden from view and from screen readers):** Leave this field empty

**Privacy note above the button:** We use these details to respond to your enquiry. See our [Privacy Policy](/privacy-policy/).

**Button:** Send enquiry

**Button while sending:** Sending

#### Messages

**Error summary heading:** Check these details

**Error summary text:** Correct the fields below, then send your enquiry again.

**Success heading:** Thank you. We have received your enquiry.

**Success text:** We will reply using the contact details you gave us. To add anything, call +971 2 626 8001 or email info@vanguardgcc.com.

**Sending failed:** We could not send your enquiry. Your details are still in the form. Try again, call +971 2 626 8001 or email info@vanguardgcc.com.

> **Internal note, do not publish:** Decisions 27, 28, 68 and 81. "Thank you. We have received your enquiry." comes from `tone.md`. The success message must appear only after the send is confirmed. Check that info@vanguardgcc.com is monitored before launch (open fact 25). The Privacy Policy is in [legal.md](#privacy-policy) and needs legal review (open fact 63).

---

<a id="home"></a>

## Home

- **URL:** `/`

- **Meta title:** Industrial Automation: Abu Dhabi, Dubai & UAE | Vanguard
- **Meta description:** Vanguard Technology is an industrial automation company in Abu Dhabi. SCADA, control systems and maintenance for industry and infrastructure in the UAE.

**Eyebrow:** SCADA. Control. Instrumentation.

**H1:** Industrial automation and system integration for the UAE

**Supporting sentence:** Vanguard Technology is an industrial automation company in Abu Dhabi, delivering SCADA and control systems for oil and gas, water, district cooling, power and infrastructure.

**Primary button:** Start a consultation

**Secondary button:** Explore solutions

### Section: proof points

> **Build note:** These replace statistics, because no numbers can be sourced.

- Abu Dhabi based
- End-to-end delivery
- 24/7 support
- Free consultations

### Section: trust bar

**Label:** Our Partners

**Logos:** ADNOC, CNPC, Khalifa University, SAPCO. Logos only, with no other text.

### Our solutions

**Intro:** We deliver complete automation systems, from SCADA and PLC programs to instrumentation, electrical work and maintenance. We use proven technologies and a practical approach. Choose a solution to see what it covers.

**Link:** View all solutions

### Industries we serve

**Intro:** We work in oil and gas, power, water and infrastructure. Most of our systems control water and wastewater, district cooling plants, process industry, power and infrastructure projects. Choose your sector to see what we offer.

**Link:** View all industries

**Note under the cards:** Photos are illustrative.

### From field instruments to SCADA

**Intro:** Select an area of this illustrative plant to see the work we offer there.

**Caption:** Illustrative model

**Hotspots:** The six industry hotspots, listed in the 3D plant model section. Each opens its text and links to its page.

### How we work

| Step | Title | Sentence |
|---|---|---|
| 1 | **Consult** | Tell us your sector, site and scope. Consultations are free. |
| 2 | **Design** | We design the control, electrical and instrumentation systems and validate the PLC programs. |
| 3 | **Supply** | We supply the automation instrumentation and electrical products your project needs. |
| 4 | **Install** | We install the system in the field. |
| 5 | **Maintain** | We support the system through annual maintenance contracts, field services and retrofits. |

> **Build note:** Step numbers show order only. They are not statistics.

### Why Vanguard

| Title | Sentence |
|---|---|
| **End-to-end delivery** | We cover engineering, supply, installation, project management and maintenance. |
| **Proven technologies** | We take a practical approach to SCADA, communications and control. |
| **Engineers across disciplines** | Our engineers work in control systems, electrical and instrumentation. |
| **Support after installation** | We offer annual maintenance contracts, field services and 24/7 support. |
| **Based in Abu Dhabi** | We are based in Abu Dhabi and serve the UAE, including Dubai. |

### Capabilities

**Intro:** Our team includes controls engineers, designers, programmers and support staff. We offer system design, integration, turnkey projects and field services. Preparing a shortlist? Ask us for the company documents your prequalification process needs.

**Button:** Request company documents

**Link:** View capabilities

**Photo caption:** Illustrative photo

### Tell us about your system

**Body:** Start with a free consultation. Share your sector, site and scope.

**Primary button:** Start a consultation

**Secondary button:** Call +971 2 626 8001

> **Internal sources, do not publish.**

| Copy | Source |
|---|---|
| Industrial automation company; end-to-end delivery | F2 |
| Abu Dhabi based | F16 |
| SCADA, control | F3 |
| Instrumentation; control, electrical and instrumentation engineers | F8 |
| Sector list in the hero | F4, F5 |
| 24/7 support; free consultations | F11 |
| Our Partners logos | F12; permission unconfirmed (open fact 9) |
| PLC programs; validation | F9 |
| Proven technologies and a practical approach | F23 |
| Engineering, supply, installation, project management, maintenance | F7 |
| Electrical work | F10 |
| Field services, retrofits | F6, F20 |
| Serves the UAE, including Dubai | F21, decision 82, open fact 52 |
| Team roles | F19 (with "support staff" for "support personnel") |
| System design, integration, turnkey projects | F7, F9, F22 |
| Document request wording | Open facts 15 and 54 |
| Plant model wording | Decision 99; areas from F4, F5 and F6 |
| Phone number | F14 |
| Install | F7 |

---

<a id="about"></a>

## About

- **URL:** `/about-us/`

- **Meta title:** About Vanguard Technology | Automation in Abu Dhabi, UAE
- **Meta description:** Vanguard Technology is a full-service system integrator in Abu Dhabi, offering SCADA, control systems, instrumentation and maintenance across the UAE.

**H1:** About Vanguard Technology

**Intro:** We are an industrial automation company and full-service system integrator, based in Abu Dhabi.

### Our story

Vanguard group was founded to create a one-stop solution: a vertically integrated network of specialty contractors. Its founders expected companies to outsource more of their specialist services.

Vanguard Technology offers end-to-end industrial automation. We implement SCADA, communications and control systems, using proven technologies and a practical approach. Most of our systems control water and wastewater, district cooling plants, process industry, power and infrastructure projects.

We also work in oil and gas. We are based in Abu Dhabi and serve the UAE, including Dubai.

**Link:** Our Group

### Vision and mission

**Our vision:** To set the standard for services to the oil and gas, power, water and infrastructure sectors.

**Our mission:** To deliver quality industrial automation services to our customers at competitive prices.

### Our values

| Value | Sentence |
|---|---|
| **Quality** | We use proven technologies and a practical approach. |
| **Professionalism** | Our team receives continual training. |
| **Integrity** | We work with integrity and honesty. |
| **Fairness** | We offer competitive prices and treat our customers fairly. |

### Our team

**Intro:** Our team includes controls engineers, designers, programmers and support staff.

| Name | Title | Bio |
|---|---|---|
| **Mohamed Mansoor** | CEO | Mohamed Mansoor is the CEO of Vanguard Technology. |
| **Joseph Roche** | Project Manager | Joseph Roche is a Project Manager at Vanguard Technology. Our services include project management. |
| **Alissia Maguire** | IT Consultant | Alissia Maguire is an IT Consultant at Vanguard Technology. Our services include IT consultancy. |

> **Build note:** Use no photos until real ones are supplied.

### Industry standards for this work

> **Build note:** No certifications are verified, so the page has no certifications section.

**Intro:** These published standards cover areas of the work we offer. We do not claim certification against them.

| Standard | Covers | Related scope |
|---|---|---|
| **IEC 61131-3** | Programming languages for programmable controllers | PLC programming |
| **IEC 61511** | Functional safety of safety instrumented systems in the process industry | Safety instrumented systems |
| **ISA-5.1** | Instrumentation and control symbols and identification | Instrumentation |
| **ISA-101.01** | Human machine interfaces for process automation systems | SCADA and control systems |
| **ISA-18.2** | Management of alarm systems for the process industries | SCADA and control systems |
| **IEC 61439** | Low-voltage switchgear and controlgear assemblies | Electrical products |

**Closing line:** Ask us which standards apply to your project, or for the company documents your prequalification process needs.

### Talk to us about your system

**Body:** Start with a free consultation. Share your sector, site and scope.

**Primary button:** Start a consultation

**Secondary button:** View capabilities

> **Internal sources, do not publish.**

| Copy | Source |
|---|---|
| Name; company type | F1, F2 |
| Based in Abu Dhabi; serves the UAE, including Dubai | F16, F21, decision 82 |
| Story: one-stop solution, specialty contractors, outsourcing | F24 |
| SCADA, communications and control; proven technologies | F3, F23 |
| System and sector statements | F4, F5 |
| Vision and mission | F25, in shorter wording (decision 130); not approved by the company |
| Values | F25, with examples from F19 and F23 |
| Team roles, training | F19 |
| Names and titles | F13; **no independent record and may be out of date (open fact 8)** |
| Project management, IT consultancy | F7 |
| Standard titles and scope | S1 to S6 |
| Industry standards list | S1 to S6. These describe the standards only. Nothing says the company uses them (decision 184, open fact 16) |
| Document request wording | Open facts 15 and 54 |
| Free consultation | F11 |

**Left out on purpose:**
- Founding year, and any length of history (decisions 21 and 56).
- "The only vertically integrated specialty contractor" and other rank claims (decision 18).
- "Employee-owners" (decision 49).
- Earlier IT consulting history, which is background only (research B2).

---

<a id="solutions-overview"></a>

## Solutions overview

- **URL:** `/solutions/`
- **Meta title:** Industrial Automation Solutions in the UAE | Vanguard
- **Meta description:** Automation solutions from Abu Dhabi: system integration, PLC and SCADA, instrumentation, supply, installation, project management and maintenance.

**H1:** Industrial automation solutions

**Intro:** We are a full-service system integrator with manufacturing capabilities. We use proven technologies and a practical approach. Choose a solution to see what we deliver.

| Card | Sentence | Link |
|---|---|---|
| **System Integration** | We implement SCADA, communications and control systems as complete solutions. | `/solutions/system-integration/` |
| **Control & Instrumentation Engineering** | Our engineers work in control systems, electrical engineering and instrumentation engineering. | `/solutions/control-instrumentation-engineering/` |
| **Supply & Field Installation** | We supply automation instrumentation and electrical products, and install them in the field. | `/solutions/automation-electrical-supply-installation/` |
| **Turnkey Projects** | Our scope runs from engineering and supply through field installation, project management and maintenance. | `/solutions/turnkey-projects/` |
| **Project Management** | We offer project management, project support and technical resources. | `/solutions/project-management/` |
| **Field Services & Annual Maintenance Contracts** | We offer annual maintenance contracts, field services, retrofit work and remote support. | `/solutions/field-services-maintenance/` |
| **PLC/SCADA Design & Validation** | We design and validate PLC programs and implement SCADA systems. | `/solutions/plc-scada-design-validation/` |
| **IT Consultancy** | We offer IT consultancy alongside our automation services. | `/solutions/it-consultancy/` |
| **Audio/Visual Integration** | We offer audio/visual integration for businesses, entertainment venues, educational institutions and smart homes. | `/solutions/audio-visual-integration/` |

**Buttons:** Start a consultation | Find your industry

> **Internal note, do not publish:** F2, F3, F7, F8, F9, F20, F23, F26.

---

<a id="solution-system-integration"></a>

## Solution: System Integration

- **URL:** `/solutions/system-integration/`
- **Meta title:** System Integrator: Abu Dhabi, Dubai & UAE | Vanguard
- **Meta description:** Full-service system integrator in Abu Dhabi. We implement SCADA, communications and control systems for industry and infrastructure in the UAE.

**H1:** Industrial system integration

**Intro:** We are a full-service system integrator with manufacturing capabilities. We implement SCADA, communications and control systems as complete solutions, not only conceptual designs.

**What we deliver**
- System design, assembly and integration
- SCADA, communications and control system implementation
- PLC programs for control systems
- Automation instrumentation and electrical products
- Integrated building and energy management systems
- Retrofit services

**How we work**
1. **Define the scope.** Tell us your site, existing systems and requirements.
2. **Design and integrate.** We design the system and integrate its control, communications and SCADA elements.
3. **Install and support.** We install in the field and support the system through field services and maintenance.

**Industries served:** Oil and gas, water and wastewater, district cooling, power and infrastructure.

**FAQs**

**What information do you need to assess an integration project?**
Send us the site location, the systems involved and your required scope. Existing drawings or system lists also help.

**Which control platforms do you integrate?**
Tell us which platform your site runs on. We will confirm how we can support it.

**Can you provide documents for prequalification?**
Ask us for the company documents your prequalification process needs.

**Buttons:** Discuss your integration scope (pre-filled) | View capabilities

> **Internal note, do not publish:** F2, F3, F4, F5, F6, F7, F9, F29.

---

<a id="solution-control-instrumentation-engineering"></a>

## Solution: Control & Instrumentation Engineering

- **URL:** `/solutions/control-instrumentation-engineering/`
- **Meta title:** Control & Instrumentation Engineering, UAE | Vanguard
- **Meta description:** Control, electrical and instrumentation engineering in Abu Dhabi, covering process automation, HVAC control, safety and condition monitoring systems.

**H1:** Control and instrumentation engineering

**Intro:** Our engineers work in control systems, electrical engineering and instrumentation engineering. We apply this to process automation, safety and monitoring systems across industry and infrastructure.

**What we deliver**
- Control and process automation engineering
- Instrumentation engineering
- Electrical engineering
- HVAC control systems
- Safety instrumented systems
- Condition monitoring systems

**How we work**
1. **Review your requirements.** Share your process, site and existing systems.
2. **Engineer the system.** We prepare the control, electrical and instrumentation design.
3. **Support delivery.** We support supply, installation and maintenance as your project needs.

**Industries served:** Oil and gas, water and wastewater, district cooling, power and infrastructure.

**FAQs**

**Do you work on safety instrumented systems?**
Yes. Safety instrumented systems are among the systems we work on. Tell us your requirements so we can review your scope.

**Do you cover building and HVAC controls?**
Yes. We work on HVAC control systems and integrated building and energy management systems.

**Which standards apply to my project?**
See "Industry standards for this work" on our About page, and ask us which apply. We do not claim certification against them.

**Buttons:** Discuss your engineering scope (pre-filled) | See PLC and SCADA design

> **Internal note, do not publish:** F4, F5, F6, F8. The site lists safety instrumented systems with no detail (open fact 59).

---

<a id="solution-supply-of-automation-electrical-products-and-field-installation"></a>

## Solution: Supply of Automation & Electrical Products and Field Installation

- **URL:** `/solutions/automation-electrical-supply-installation/`
- **Meta title:** Automation & Electrical Supply and Installation | Vanguard
- **Meta description:** Supply of automation instrumentation and electrical products, with field installation, cable laying, trunking and lighting, from Abu Dhabi across the UAE.

**H1:** Supply of automation and electrical products and field installation

**Intro:** We supply automation instrumentation and electrical products, and we install them in the field. Our electrical scope includes cable laying, trunking, distribution boards, lighting and duct work.

**What we deliver**
- Supply of automation instrumentation
- Supply of electrical products
- Field installation
- Cable laying and trunking
- Distribution boards (DB)
- Indoor and outdoor lighting, and duct work

**How we work**
1. **Share your list.** Send your items, quantities, drawings and site location.
2. **Confirm the scope.** We confirm what we will supply and what we will install.
3. **Supply and install.** We deliver the agreed products and carry out field installation.

**Industries served:** Oil and gas, water and wastewater, district cooling, power and infrastructure.

**FAQs**

**What should a quote request include?**
Include your item list, quantities, any specified brands, the site location and your required date.

**Can you supply specified brands?**
Send us the brands in your specification. We will confirm what we can supply.

**Where do you install?**
We are based in Abu Dhabi and serve the UAE, including Dubai.

**Buttons:** Request a supply or installation quote (pre-filled) | See turnkey projects

> **Internal note, do not publish:** F4, F5, F7, F10, F21, decision 82. "Distribution boards" spells out the site's "DB". No brands are named (open fact 17).

---

<a id="solution-turnkey-projects"></a>

## Solution: Turnkey Projects

- **URL:** `/solutions/turnkey-projects/`
- **Meta title:** Turnkey Automation Projects in the UAE | Vanguard
- **Meta description:** Turnkey automation projects in the UAE, covering engineering, supply, field installation, project management and maintenance from an Abu Dhabi base.

**H1:** Turnkey automation projects

**Intro:** We offer turnkey project solutions for industrial automation. Our scope runs from engineering and supply through field installation, project management and maintenance.

**What we deliver**
- Engineering and system design
- Supply of automation instrumentation and electrical products
- Field installation
- Cable laying, trunking and lighting
- Project management
- Annual maintenance contracts after installation

**How we work**
1. **Agree the scope.** We review your requirements and define what the turnkey package includes.
2. **Deliver the package.** We engineer, supply and install the system.
3. **Maintain the system.** We can continue support through an annual maintenance contract.

**Industries served:** Oil and gas, water and wastewater, district cooling, power and infrastructure.

**FAQs**

**What does your turnkey scope include?**
It can include engineering, supply, field installation, project management and maintenance. We agree the exact scope for each project.

**Do you take on part of a package?**
Tell us the part you need. We will confirm what we can take on.

**What do you need to price a turnkey project?**
Send us your specification, drawings, site location and programme.

**Buttons:** Discuss your project (pre-filled) | See project management

> **Internal note, do not publish:** F2, F4, F5, F6, F7, F8, F10, F29. Commissioning is left out (open fact 55).

---

<a id="solution-project-management"></a>

## Solution: Project Management

- **URL:** `/solutions/project-management/`
- **Meta title:** Automation Project Management in the UAE | Vanguard
- **Meta description:** Project management for automation projects in the UAE, with project support, technical resources and technical expertise from an Abu Dhabi base.

**H1:** Project management for automation projects

**Intro:** We offer project management as part of our automation services. Our support includes technical resources, project support and technical expertise.

**What we deliver**
- Project management for automation projects
- Project support
- Technical resources
- Technical expertise
- Maintenance services
- Remote support

**How we work**
1. **Understand the project.** Share your scope, programme and contract arrangements.
2. **Agree the scope.** We agree the project management and support you need.
3. **Provide support.** We provide the agreed project management and support.

**Industries served:** Oil and gas, water and wastewater, district cooling, power and infrastructure.

**FAQs**

**Do you manage only your own scope?**
Tell us what you need managed. We will confirm what we can take on.

**What project support do you offer?**
Our support includes technical resources, project support, technical expertise and remote support. Share your project details and the support you need.

**What should I send you first?**
Send your scope, programme, site location and contract arrangements.

**Buttons:** Discuss your project (pre-filled) | See turnkey projects

> **Internal note, do not publish:** F4, F5, F7, F20. The site names project management with no detail, so the page stays with its listed support items.

---

<a id="solution-field-services-annual-maintenance-contracts"></a>

## Solution: Field Services & Annual Maintenance Contracts

- **URL:** `/solutions/field-services-maintenance/`
- **Meta title:** Field Services & Maintenance Contracts, UAE | Vanguard
- **Meta description:** Annual maintenance contracts, field services, retrofit and remote support for automation and control systems in the UAE, including district cooling plants.

**H1:** Field services and annual maintenance contracts

**Intro:** We offer annual maintenance contracts and field services for automation and control systems. Our support includes maintenance services, retrofit work, remote support and technical expertise.

**What we deliver**
- Annual maintenance contracts
- Maintenance services
- Retrofit work
- Remote support
- Technical resources and expertise
- 24/7 support

**How we work**
1. **Tell us about your plant.** Share the site, the control system in use and your current support arrangement.
2. **Agree the contract.** We agree the scope of maintenance and support with you.
3. **Provide support.** We provide the agreed field services and maintenance.

**Industries served:** Oil and gas, water and wastewater, district cooling, power and infrastructure.

**FAQs**

**Do you maintain district cooling plant controls?**
District cooling plants are among the systems we work on. Tell us about your plant and the control system in use.

**What does 24/7 support cover?**
We offer 24/7 support. Ask us what coverage your contract would include.

**What do you need to quote for a maintenance contract?**
Send us the site location, control system in use, your current support arrangement and the support you need.

**Buttons:** Ask about a maintenance contract (pre-filled) | Call us

> **Internal note, do not publish:** F4, F5, F6, F7, F11, F20. No terms are added to 24/7 support (open fact 19).

---

<a id="solution-plc-scada-design-validation"></a>

## Solution: PLC/SCADA Design & Validation

- **URL:** `/solutions/plc-scada-design-validation/`
- **Meta title:** PLC & SCADA Design and Validation, UAE | Vanguard
- **Meta description:** PLC and SCADA system design and validation in Abu Dhabi. We implement SCADA, communications and control systems for oil and gas, water and power in the UAE.

**H1:** PLC and SCADA design and validation

**Intro:** We design and validate PLC programs and implement SCADA, communications and control systems. We use proven technologies and a practical approach.

**What we deliver**
- Control system design
- PLC program development
- PLC program validation
- SCADA implementation
- Communications for SCADA and control systems
- Retrofit services

**How we work**
1. **Define the system.** Share your process, site, platform and control requirements.
2. **Design and program.** We design the control system and develop the PLC programs.
3. **Validate and implement.** We validate the PLC programs and implement the system.

**Industries served:** Oil and gas, water and wastewater, district cooling, power and infrastructure.

**FAQs**

**Which PLC and SCADA platforms do you work with?**
Tell us which platform your site runs on. We will confirm how we can support it.

**Can you work with an existing SCADA system?**
Our services include retrofit work. Share details of your current system so we can review it.

**Which standards apply to my project?**
See "Industry standards for this work" on our About page, and ask us which apply. We do not claim certification against them.

**Buttons:** Discuss your SCADA scope (pre-filled) | See oil and gas

> **Internal note, do not publish:** F3, F4, F5, F6, F9, F23. No platforms are named (open fact 17). Standards: open fact 16.

---

<a id="solution-it-consultancy"></a>

## Solution: IT Consultancy

- **URL:** `/solutions/it-consultancy/`
- **Meta title:** IT Consultancy in Abu Dhabi and the UAE | Vanguard
- **Meta description:** IT consultancy from Vanguard Technology in Abu Dhabi, covering application systems and analytics that turn data into actionable insights.

**H1:** IT consultancy

**Intro:** We offer IT consultancy alongside our automation services. Our work covers application systems and analytics.

**What we deliver**
- IT consultancy
- Analytics that turn data into actionable insights
- Application system design
- Application system development
- Application system maintenance
- Consulting on application systems

**How we work**
1. **Understand your needs.** Tell us about your organisation, systems and goals.
2. **Advise.** We review your requirements and recommend a practical way forward.
3. **Support the next steps.** We agree any further support you need.

**Industries served:** Organisations in the sectors we serve, including oil and gas, power, water and infrastructure.

**FAQs**

**Is this industrial or office IT?**
Tell us about your systems and what you need. We will confirm how we can help.

**Do you offer cybersecurity advice?**
Tell us what you need reviewed. We will confirm how we can help.

**How do we start?**
Start with a free consultation. Share your organisation, systems and goals.

**Buttons:** Discuss your IT requirements (pre-filled) | About Vanguard Technology

> **Internal note, do not publish:** F5, F7, F11, F22, F28, F29. Archived services are left out because they may no longer be offered (F27, open fact 57).

---

<a id="solution-audio-visual-integration"></a>

## Solution: Audio/Visual Integration

- **URL:** `/solutions/audio-visual-integration/`
- **Meta title:** Audio Visual Integration in Abu Dhabi and UAE | Vanguard
- **Meta description:** Audio visual integration from Abu Dhabi for businesses, entertainment venues, educational institutions and smart homes across the UAE.

**H1:** Audio/visual integration

**Intro:** We offer audio/visual integration for businesses, entertainment venues, educational institutions and smart homes. It supports communication, interaction and productivity.

**What we deliver**
- AV integration for businesses
- AV integration for entertainment venues
- AV integration for educational institutions
- AV integration for smart homes
- Systems that support communication and interaction
- Systems that support productivity

**How we work**
1. **Describe the space.** Tell us the room or venue, how it is used and what you need.
2. **Design the system.** We recommend an AV approach for your requirements.
3. **Integrate.** We integrate the agreed system.

**Industries served:** Businesses, entertainment venues, educational institutions and smart homes.

**FAQs**

**What do you need to assess an AV project?**
Send us the site location, room or venue details, and how the system will be used.

**Which AV brands do you work with?**
Tell us your requirements or specification. We will confirm what we can provide.

**Where do you work?**
We are based in Abu Dhabi and serve the UAE, including Dubai.

**Buttons:** Discuss your AV project (pre-filled) | About Vanguard Technology

> **Internal note, do not publish:** F21, F26, decision 82. No brands are named (open fact 17).

---

<a id="industries-overview"></a>

## Industries overview

- **URL:** `/industries/`
- **Meta title:** Industries We Serve in the UAE | Vanguard Technology
- **Meta description:** Automation and control for oil and gas, water and wastewater, district cooling, power and infrastructure in the UAE, from an Abu Dhabi base.

**H1:** Industries we serve

**Intro:** We work in oil and gas, power, water and infrastructure. Most of our systems control water and wastewater, district cooling plants, process industry, power and infrastructure projects. Two further pages cover HVAC and building systems, and safety instrumented systems.

| Card | Sentence | Link |
|---|---|---|
| **Oil & Gas** | SCADA, communications and control systems, with instrumentation and field installation. | `/industries/oil-gas/` |
| **Water & Wastewater** | SCADA and control systems, with PLC programs and maintenance. | `/industries/water-wastewater/` |
| **District Cooling** | Control systems and SCADA for plants, with retrofit and annual maintenance contracts. | `/industries/district-cooling/` |
| **Power & Infrastructure** | SCADA and control systems, electrical installation and project management. | `/industries/power-infrastructure/` |
| **HVAC & Building Management Systems** | HVAC control and integrated building and energy management systems. | `/industries/hvac-building-management-systems/` |
| **Safety Instrumented Systems** | Our control, electrical and instrumentation engineers work on these systems. | `/industries/safety-instrumented-systems/` |

**Buttons:** Start a consultation | Explore solutions

> **Internal note, do not publish:** F3, F4, F5, F6, F7, F8, F9, F10. Decision 148.

---

<a id="industry-oil-gas"></a>

## Industry: Oil & Gas

- **URL:** `/industries/oil-gas/`
- **Meta title:** Oil & Gas Automation: Abu Dhabi, Dubai & UAE | Vanguard
- **Meta description:** SCADA, communications and control systems for oil and gas in the UAE, with PLC programs, instrumentation, field installation and maintenance from Abu Dhabi.

**H1:** Automation and control for oil and gas

**Intro:** SCADA, communications and control systems, with instrumentation and field installation.

**Operator challenges**
1. **Dispersed field sites.** Field sites can cover large areas and rely on a mix of wired, cellular, satellite and radio links.
2. **Mixed equipment.** Legacy equipment and devices from different manufacturers can make integration difficult.
3. **Upgrades on running systems.** A SCADA upgrade may have to proceed without disrupting operations, and a poorly planned changeover can itself cause downtime.
4. **One view for operators.** Old and new technology from several vendors can sit in one system, while operators still need a standard view.

**How Vanguard helps**
- **Integrate the scope.** We implement SCADA, communications and control systems as complete systems. See [System Integration](/solutions/system-integration/).
- **Design and validate.** We design and validate PLC programs, and implement SCADA systems. Tell us which platform your site runs on. See [PLC/SCADA Design & Validation](/solutions/plc-scada-design-validation/).
- **Supply and install.** We supply automation instrumentation and electrical products, and install them in the field. See [Supply & Field Installation](/solutions/automation-electrical-supply-installation/).
- **Support the system.** We offer annual maintenance contracts, field services, retrofit and remote support. See [Field Services & Annual Maintenance Contracts](/solutions/field-services-maintenance/).

**Typical systems we deliver**
- SCADA, communications and control systems
- Control and process automation
- PLC programs
- Automation instrumentation
- Electrical products and field installation

**Buttons:** Discuss your oil and gas project (pre-filled) | See PLC and SCADA design

**See it on the model (H2), and 3D plant hotspot (25 words):** Oil and gas field sites can cover large areas. We implement SCADA, communications and control systems, with PLC programs, instrumentation, electrical products and field installation.

> **3D build note:** Plant model area: `zone-oil-gas`: process columns, pipework and flare stack.

> **Internal note, do not publish:** Challenges: G1, G2, G3, G8. Vanguard: F3, F5, F6, F7, F9, F10, F20.

---

<a id="industry-water-wastewater"></a>

## Industry: Water & Wastewater

- **URL:** `/industries/water-wastewater/`
- **Meta title:** Water & Wastewater Automation in the UAE | Vanguard
- **Meta description:** SCADA and control systems for water and wastewater in the UAE, with PLC programs, instrumentation, turnkey delivery and maintenance from Abu Dhabi.

**H1:** Automation and control for water and wastewater

**Intro:** SCADA and control systems, with PLC programs and maintenance.

**Operator challenges**
1. **Lost site data.** Remote pumping sites can lose readings when a cellular or radio link fails, unless data is stored locally.
2. **Time spent on site checks.** Landline alarms and daily trips to check tank levels cost time and money.
3. **Pressure on utilities.** Water and wastewater systems face ageing infrastructure, staffing shortages and rising operating costs.
4. **Compliance reporting.** Regulatory demands make historical data important for compliance reports.

**How Vanguard helps**
- **Design and validate.** We design and validate PLC programs, and implement SCADA systems, for water and wastewater. See [PLC/SCADA Design & Validation](/solutions/plc-scada-design-validation/).
- **Engineer the system.** Our engineers work in control systems, electrical engineering and instrumentation. See [Control & Instrumentation Engineering](/solutions/control-instrumentation-engineering/).
- **Deliver one scope.** We offer turnkey projects that cover engineering, supply, field installation and maintenance. See [Turnkey Projects](/solutions/turnkey-projects/).
- **Support the system.** We offer annual maintenance contracts, field services, retrofit and remote support. See [Field Services & Annual Maintenance Contracts](/solutions/field-services-maintenance/).

**Typical systems we deliver**
- SCADA, communications and control systems
- Control and process automation
- PLC programs
- Automation instrumentation
- Electrical products and field installation

**Buttons:** Discuss your water project (pre-filled) | See PLC and SCADA design

**See it on the model (H2), and 3D plant hotspot (25 words):** Water and wastewater sites are widely spread. We implement SCADA and control systems, design PLC programs and support systems through field services and maintenance contracts.

> **3D build note:** Plant model area: `zone-water-treatment`: treatment tanks and pipework.

> **Internal note, do not publish:** Challenges: G4, G5. Vanguard: F3, F4, F5, F6, F7, F8, F9, F20. "Widely spread" in the hotspot rests on G4.

---

<a id="industry-district-cooling"></a>

## Industry: District Cooling

- **URL:** `/industries/district-cooling/`
- **Meta title:** District Cooling Automation: Abu Dhabi & Dubai | Vanguard
- **Meta description:** Control systems and SCADA for district cooling plants in the UAE, with retrofit, field services and annual maintenance contracts from Abu Dhabi.

**H1:** Automation and control for district cooling plants

**Intro:** Control systems and SCADA for plants, with retrofit and annual maintenance contracts.

**Operator challenges**
1. **Low delta-T.** Many district cooling systems see low return temperatures, which raises water flow and congests the network.
2. **Chiller demand.** Low delta-T can mean more chiller operation and less use of free cooling.
3. **Controls in customer buildings.** Building control set points that are too low can reduce performance at the building connection.
4. **Ageing plant controls.** As control systems age, their strategies can stop reflecting plant changes, and affordable spares become harder to find.

**How Vanguard helps**
- **Maintain and retrofit.** We offer annual maintenance contracts, retrofit, field services, remote support and 24/7 support. See [Field Services & Annual Maintenance Contracts](/solutions/field-services-maintenance/).
- **Engineer the controls.** We work on control and process automation for district cooling plants. See [Control & Instrumentation Engineering](/solutions/control-instrumentation-engineering/).
- **Design and validate.** We design and validate PLC programs, and implement SCADA systems, for district cooling plants. See [PLC/SCADA Design & Validation](/solutions/plc-scada-design-validation/).
- **Supply and install.** We supply automation instrumentation and electrical products, and install them in the field. See [Supply & Field Installation](/solutions/automation-electrical-supply-installation/).

**Typical systems we deliver**
- SCADA, communications and control systems
- Control and process automation
- PLC programs
- Automation instrumentation
- Retrofit, maintenance and field services

**Buttons:** Discuss your plant (pre-filled) | See field services and maintenance

**See it on the model (H2), and 3D plant hotspot (25 words):** Chilled water return temperature affects pumping and chiller operation. Our control and SCADA systems serve district cooling plants, with retrofit, maintenance and field services support.

> **3D build note:** Plant model area: `zone-district-cooling`: plant hall and cooling towers.

> **Internal note, do not publish:** Challenges: G6, G8 (G8 is not specific to district cooling). Vanguard: F3, F4, F6, F7, F9, F11, F20. No terms are added to "24/7 support" (open fact 19). The page does not claim that Vanguard fixes low delta-T.

---

<a id="industry-power-infrastructure"></a>

## Industry: Power & Infrastructure

- **URL:** `/industries/power-infrastructure/`
- **Meta title:** Power & Infrastructure Automation, UAE | Vanguard
- **Meta description:** SCADA, control systems and electrical installation for power and infrastructure projects in the UAE, with project management and maintenance from Abu Dhabi.

**H1:** Automation and control for power and infrastructure

**Intro:** SCADA and control systems, electrical installation and project management.

**Operator challenges**
1. **Ageing control systems.** Spare parts and people who know older control systems become harder to find.
2. **Connections to older systems.** Linking auxiliary systems such as water treatment and emissions monitoring to an old control system can be difficult.
3. **Interfaces between suppliers.** When subsystems are split among suppliers, keeping interfaces correct becomes complex, and issues need resolving before handover.
4. **Contractor coordination.** Systems can share space, power and communications, so a delay in one can spread to others.

**How Vanguard helps**
- **Integrate the scope.** We implement SCADA, communications and control systems as complete systems. See [System Integration](/solutions/system-integration/).
- **Deliver one scope.** We offer turnkey projects that cover engineering, supply, field installation and maintenance. See [Turnkey Projects](/solutions/turnkey-projects/).
- **Manage the work.** We offer project management for automation, instrumentation and electrical work. See [Project Management](/solutions/project-management/).
- **Supply and install.** Our electrical scope includes cable laying, trunking, DB, lighting and duct work. See [Supply & Field Installation](/solutions/automation-electrical-supply-installation/).

**Typical systems we deliver**
- SCADA, communications and control systems
- Control and process automation
- Automation instrumentation
- Electrical field installation, including cable laying, trunking, DB, indoor and outdoor lighting and duct work

**Buttons:** Discuss your power or infrastructure project (pre-filled) | See system integration

**See it on the model (H2), and 3D plant hotspot (25 words):** Power and infrastructure projects bring many systems and contractors together. We integrate SCADA, communications and control systems, and provide electrical installation, project management and maintenance.

> **3D build note:** Plant model area: `zone-substation`: switch building, fenced transformers and cable route. No recognisable power station or transport asset.

> **Internal note, do not publish:** Challenges: G7, G8, G9, G10. G9 and G10 come from rail tunnel projects. Vanguard: F3, F4, F5, F6, F7, F10, F20. The sources give no scope that separates power from infrastructure.

---

<a id="industry-hvac-building-management-systems"></a>

## Industry: HVAC & Building Management Systems

- **URL:** `/industries/hvac-building-management-systems/`
- **Meta title:** HVAC Control & Building Management, UAE | Vanguard
- **Meta description:** HVAC control and integrated building and energy management systems in the UAE, with electrical installation, field services and maintenance from Abu Dhabi.

**H1:** HVAC control and building management systems

**Intro:** HVAC control and integrated building and energy management systems.

**Operator challenges**
1. **Sensor drift.** Temperature, pressure and CO2 readings can lose accuracy, so controls respond to bad information.
2. **Forgotten overrides.** A set point changed to resolve a complaint may never be reset.
3. **Outdated schedules.** Schedules that lag behind building use can leave equipment running outside occupied hours.
4. **Commissioning gaps.** Commissioning deficiencies that are never resolved can widen the gap between actual and design energy use.

**How Vanguard helps**
- **Engineer the controls.** We work on HVAC control systems as part of our engineering services. See [Control & Instrumentation Engineering](/solutions/control-instrumentation-engineering/).
- **Integrate building systems.** We work on integrated building and energy management systems. See [System Integration](/solutions/system-integration/).
- **Supply and install.** Our electrical scope includes cable laying, trunking, DB, lighting and duct work. See [Supply & Field Installation](/solutions/automation-electrical-supply-installation/).
- **Support the system.** We offer annual maintenance contracts, field services, retrofit and remote support. See [Field Services & Annual Maintenance Contracts](/solutions/field-services-maintenance/).

**Typical systems we deliver**
- HVAC control systems
- Integrated building and energy management systems
- Retrofit, maintenance and field services
- Electrical field installation, including trunking, DB, indoor and outdoor lighting and duct work

**Buttons:** Discuss your building controls (pre-filled) | See field services and maintenance

**See it on the model (H2), and 3D plant hotspot (25 words):** Building performance drifts as sensors age and overrides remain in place. We offer HVAC control, integrated building and energy management systems and annual maintenance contracts.

> **3D build note:** Plant model area: `zone-office-bms`: office building with rooftop units and a BMS panel.

> **Internal note, do not publish:** Challenges: G11, G12. Vanguard: F3, F6, F7, F10, F20. The site says "integrated building and energy management". "Building management systems" is the page name set by project instruction, and body copy uses the site's term (open fact 58). No platform is named (open fact 17).

---

<a id="industry-safety-instrumented-systems"></a>

## Industry: Safety Instrumented Systems

- **URL:** `/industries/safety-instrumented-systems/`
- **Meta title:** Safety Instrumented Systems in the UAE | Vanguard
- **Meta description:** Safety instrumented systems work from Abu Dhabi, supported by control, electrical and instrumentation engineers, field installation and maintenance services.

**H1:** Safety instrumented systems

**Intro:** Our control, electrical and instrumentation engineers work on these systems.

**Operator challenges**
1. **Bypass control.** Trip bypasses without time limits or authorisation records can outlast the shift they were meant for.
2. **Meaningful proof tests.** Tests need to run at their defined intervals and reach the valve, not stop at the logic solver.
3. **Records on demand.** Auditors may ask for proof test records going back several years.
4. **Recording real demands.** Every real demand on a safety system is integrity data, so it should not go unrecorded.

**How Vanguard helps**
- **Engineer the scope.** Our control, electrical and instrumentation engineers work on safety instrumented systems. See [Control & Instrumentation Engineering](/solutions/control-instrumentation-engineering/).
- **Review the connections.** We implement communications and control systems. Tell us how your safety system connects to them. See [System Integration](/solutions/system-integration/).
- **Supply and install.** We supply automation instrumentation and electrical products, and install them in the field. See [Supply & Field Installation](/solutions/automation-electrical-supply-installation/).
- **Support the system.** We offer annual maintenance contracts and field services. Tell us your requirements so we can review your scope. See [Field Services & Annual Maintenance Contracts](/solutions/field-services-maintenance/).

For standards, see "Industry standards for this work" on our [About page](/about-us/). We do not claim certification against them.

**Typical systems we deliver**
- Safety instrumented systems

**Buttons:** Discuss your safety system requirements (pre-filled) | See control and instrumentation engineering

**See it on the model (H2), and 3D plant hotspot (25 words):** Safety systems depend on controlled bypasses, proof testing and records. Our control, instrumentation and electrical engineers work on safety instrumented systems. Tell us your requirements.

> **3D build note:** Plant model area: `zone-safety-valves`: a generic field valve and instrument group. No readable tags, and no implied safety function.

> **Internal note, do not publish:** Challenges: G13, a vendor article, because no standard or regulator text could be read. Vanguard: F3, F6, F7, F8, F10, F19, F20. The site lists safety instrumented systems with no detail, so confirm this page before launch or remove it (open fact 59). No standards are named here (decisions 134, 142 and 153). This page makes no claim about functional safety competence, safety integrity levels, proof testing or lifecycle services, because none is sourced.

---

<a id="capabilities"></a>

## Capabilities

> **Build rules: these are not case studies.** Show the "Typical project profile" label on every profile, not just once at the top. Do not use the word "Projects" as a menu item or heading for this content. Do not place photos beside a profile, or mark up profiles with case study or review structured data. Keep the "Our Partners" logos in their own section, away from the profiles.

- **URL:** `/capabilities/`
- **Meta title:** Automation Capabilities & Company Details | Vanguard
- **Meta description:** The types of automation work Vanguard Technology delivers in the UAE, with systems, deliverables and company details. Request your prequalification documents.

**H1:** Capabilities and company details

**Intro:** Vanguard Technology is an industrial automation company in Abu Dhabi. This page sets out what we do, the types of work we deliver and how to reach us.

### What we do

**Engineering disciplines:** Control systems, electrical engineering and instrumentation engineering.

**Systems:** SCADA, communications and control systems, PLC programs, HVAC control, integrated building and energy management, safety instrumented systems and condition monitoring.

**Services:** Engineering, supply, field installation, turnkey projects, project management, retrofit, field services and annual maintenance contracts.

**Sectors:** Oil and gas, water and wastewater, district cooling, power and infrastructure.

**Our team:** Controls engineers, designers, programmers and support staff.

> **Internal note, do not publish:** F2, F3, F4, F5, F6, F7, F8, F9, F19.

### Our Partners

**Logos:** ADNOC, CNPC, Khalifa University, SAPCO. Logos only, with no other text.

> **Internal note, do not publish:** F12. Permission is unconfirmed (open fact 9). No logo links to or sits beside a profile.

### Company details

- **Company:** Vanguard Technology
- **Address:** 403, Cuba Cafe Building, PO Box 36864, Tourist Club Area, Al Zahiya Zone, Abu Dhabi, UAE
- **Phone:** +971 2 626 8001
- **Email:** info@vanguardgcc.com
- **Team:** See names and titles on our [About page](/about-us/).

> **Internal note, do not publish:** F1, F13, F14, F15, F16. The address conflicts with the current site's map (open fact 31). No licence, founding date or certification is listed (open facts 1, 2 and 15).

### Typical project profiles: The types of work we deliver

**Intro:** These profiles show the types of work we deliver. They are not records of completed projects, and they name no client or site. We agree the actual scope with you for each project.

**Label on every profile:** Typical project profile. This describes a type of work we deliver. It is not a completed project.

**Closing line after the outcome on every profile:** Results depend on your site and the agreed scope.

#### 1. SCADA and control system retrofit for a water or wastewater site

**Scope:** We carry out retrofit work on SCADA, communications and control systems at water and wastewater sites. The work covers system design, PLC programs, supply and field installation.

**Systems involved**
- SCADA
- PLC programs and control systems
- Communications
- Automation instrumentation
- Electrical products

**Typical deliverables**
- System design
- PLC programs
- PLC program validation
- SCADA, communications and control system implementation
- Field installation
- Field services and maintenance, if you need them

**The outcome you can expect:** A SCADA and control system designed and implemented to the agreed scope. You can add field services and an annual maintenance contract.

**Related:** [PLC/SCADA Design & Validation](/solutions/plc-scada-design-validation/) | [Water & Wastewater](/industries/water-wastewater/)

> **Internal note, do not publish:** F3, F4, F6, F7, F9, F20, F29. Retitled from the instruction's "SCADA upgrade for a water pumping station", because pumping stations are not sourced (decision 185).

#### 2. PLC and control system delivery for a district cooling plant

**Scope:** We design, assemble and integrate control systems for district cooling plants, and develop their PLC programs. The work can include supply and field installation.

**Systems involved**
- PLC programs and control systems
- SCADA and communications
- Control and process automation
- Automation instrumentation
- Electrical products

**Typical deliverables**
- Control, electrical and instrumentation design
- System assembly and integration
- PLC programs
- PLC program validation
- Supply of automation instrumentation and electrical products
- Field installation

**The outcome you can expect:** A control system and PLC programs delivered to the agreed design and scope.

**Related:** [Control & Instrumentation Engineering](/solutions/control-instrumentation-engineering/) | [District Cooling](/industries/district-cooling/)

> **Internal note, do not publish:** F2, F3, F4, F6, F7, F8, F9, F29. Retitled from the instruction's "PLC and control panel delivery", because control panels are not sourced (decision 185).

#### 3. Annual maintenance contract for BMS and HVAC controls

**Scope:** We maintain and support integrated building and energy management systems and HVAC control systems under an annual contract. We agree the systems covered and the support you need before the contract starts.

**Systems involved**
- Integrated building and energy management systems
- HVAC control systems

**Typical deliverables**
- An agreed maintenance scope
- Maintenance services
- Field services
- Remote support
- Technical resources and expertise
- 24/7 support

**The outcome you can expect:** One agreed support arrangement for your building controls. Your contract sets out what it covers.

**Related:** [Field Services & Annual Maintenance Contracts](/solutions/field-services-maintenance/) | [HVAC & Building Management Systems](/industries/hvac-building-management-systems/)

> **Internal note, do not publish:** F6, F7, F11, F20. "BMS" is from the project instruction, and the text uses the site's term. No response times or support terms are added (open fact 19).

#### 4. Instrumentation and field installation package for an oil and gas facility

**Scope:** We supply automation instrumentation and electrical products for an oil and gas facility, and install them in the field. The electrical work can include cable laying, trunking, DB, lighting and duct work.

**Systems involved**
- Automation instrumentation
- Electrical products
- Cable laying and trunking
- Distribution boards (DB)
- Indoor and outdoor lighting

**Typical deliverables**
- Supply of automation instrumentation
- Supply of electrical products
- Cable laying and trunking
- DB and lighting installation
- Duct work
- Field installation

**The outcome you can expect:** Products and field installation under one agreed scope.

**Related:** [Supply & Field Installation](/solutions/automation-electrical-supply-installation/) | [Oil & Gas](/industries/oil-gas/)

> **Internal note, do not publish:** F5, F7, F10.

#### 5. Turnkey electrical and control package for an infrastructure project

**Scope:** We take one agreed package from engineering through supply, field installation and project management. The package can cover control systems, SCADA, instrumentation and electrical work.

**Systems involved**
- SCADA, communications and control systems
- PLC programs
- Automation instrumentation
- Electrical field installation

**Typical deliverables**
- Engineering and system design
- Supply of automation instrumentation and electrical products
- Field installation
- PLC programs
- Project management and project support
- An annual maintenance contract, if you need one

**The outcome you can expect:** Engineering, supply, installation and project management under one agreed package, with the option of maintenance afterwards.

**Related:** [Turnkey Projects](/solutions/turnkey-projects/) | [Power & Infrastructure](/industries/power-infrastructure/)

> **Internal note, do not publish:** F2, F3, F4, F5, F6, F7, F9, F10, F20. Commissioning is left out (open fact 55).

#### 6. Control system retrofit for a power facility

**Scope:** We carry out retrofit work on control systems at power facilities. We agree the scope with you, then design, supply and install the work.

**Systems involved**
- Control systems
- PLC programs
- SCADA and communications
- Automation instrumentation
- Electrical field installation

**Typical deliverables**
- An agreed retrofit scope
- System design
- PLC programs and validation
- Supply of automation instrumentation and electrical products
- Field installation
- Field services and maintenance, if you need them

**The outcome you can expect:** A retrofitted control system delivered to the agreed scope. Field services and maintenance can follow.

**Related:** [Field Services & Annual Maintenance Contracts](/solutions/field-services-maintenance/) | [Power & Infrastructure](/industries/power-infrastructure/)

> **Internal note, do not publish:** F3, F4, F5, F6, F7, F9, F20.

### Call to action

**H2 (beside Company details):** Preparing a shortlist?

**Text:** Ask us for the company documents your prequalification process needs.

**Closing band H2:** Tell us about your system

**Closing band text:** Start with a free consultation, or ask for the company documents your prequalification process needs.

**Primary button:** Request company documents (pre-filled)

**Secondary button:** Start a consultation

> **Internal note, do not publish:** Which documents the company holds is unconfirmed (open fact 54).

---

<a id="our-group"></a>

## Our Group

- **URL:** `/our-group/`
- **Meta title:** Our Group | Vanguard Technology
- **Meta description:** Businesses presented with Vanguard Technology: shipping, real estate, chauffeur services and The Park Hospitality, with its three hotels in Dubai.

**H1:** Our Group

**Intro:** The businesses below are presented with Vanguard Technology. They work in shipping, real estate, chauffeur services and hospitality. Each entry summarises how the business describes its own services.

#### Vanguard Worldwide Shipping LLC

Vanguard Worldwide Shipping LLC provides global logistics services. The business describes its work as reliable and efficient, and focuses on the safe and timely delivery of goods internationally. We list it here for information, because its work is logistics rather than industrial automation. For automation, control system or maintenance enquiries, use the Vanguard Technology enquiry form on our Contact page.

#### Vanguard ME Real Estate

Vanguard ME Real Estate specialises in property management, investment and real estate services. Its services are aimed at buyers, sellers and investors. We list it here for information, because its work is property rather than industrial automation. For SCADA, instrumentation or field service enquiries, use the Vanguard Technology enquiry form on our Contact page, where we can review your scope.

#### Min Limousine LLC

Min Limousine LLC offers luxury chauffeur services. The business describes its transport as premium, with emphasis on comfort, style and reliability. We list it here for information, because its work is chauffeur transport rather than industrial automation. For PLC, electrical or turnkey project enquiries, use the Vanguard Technology enquiry form on our Contact page, where we can review your scope.

#### The Park Hospitality

The Park Hospitality provides hospitality services, including accommodation and personalised guest service. Its group has three hotels in Dubai. The Park Hotel is a luxury stay with refined dining. Gulf Inn Al Nasr is a business stay with comfortable rooms and access to business and leisure destinations. The Oriental Hotel is a cultural stay combining eastern elegance with modern comfort.

**Buttons:** Explore automation solutions | Contact us

> **Internal note, do not publish:** F17, F18, and the fuller text on https://vanguardgcc.com/clientsgroups/ recorded in [current-site.md](current-site.md). The site does not say whether these businesses are clients or group companies, so nothing here claims ownership (open facts 4 and 36). Each of the four entries is exactly 60 words. The site's own text is short, so the first three entries end with a signpost to the enquiry form rather than added detail. Left out as rank claims: "world-class", "top-tier", "landmark", "exceptional" and "5★" (open fact 46). The Park logo may appear here only (decision 114). Stock photos stand in for these businesses (`our-group/` in [image-credits.md](image-credits.md)).

---

<a id="careers"></a>

## Careers

- **URL:** `/careers/`
- **Meta title:** Careers in Industrial Automation | Vanguard Technology
- **Meta description:** Careers at Vanguard Technology in Abu Dhabi. Our team includes controls engineers, designers, programmers and support staff. Email your CV to apply.

**H1:** Careers at Vanguard Technology

**Intro:** Vanguard Technology is an industrial automation company in Abu Dhabi. Our team includes controls engineers, designers, programmers and support staff, with continual training as part of the work.

### How to apply

1. **Email your CV** to [info@vanguardgcc.com](mailto:info@vanguardgcc.com).
2. **Use a clear subject line,** with your discipline or the role you want.
3. **Tell us about your experience,** including the systems you work on and where you are based.

Your CV contains personal data. See our [Privacy Policy](/privacy-policy/) for how we handle it.

### Current vacancies

**Empty state:** No vacancies are listed at the moment. You can still email us your CV and tell us which discipline interests you.

**Buttons:** Email your CV to info@vanguardgcc.com | About Vanguard Technology

> **Internal note, do not publish:** F15, F19. Who reads CVs at this address is unknown, and "continual training" comes from a passage that may be borrowed (open facts 7 and 53). The page does not promise a reply. The empty state describes this page only, and does not say the company has no openings. Remove it once a real vacancy is listed.

---

<a id="contact"></a>

## Contact

- **URL:** `/contact-us/`
- **Meta title:** Contact Vanguard Technology | Abu Dhabi, UAE
- **Meta description:** Contact Vanguard Technology in Abu Dhabi about automation, control systems and maintenance. Call +971 2 626 8001, email us or send an enquiry.

**H1:** Start a consultation

**Intro:** Tell us about your site, system and scope. Consultations are free. Use the form, or call or email us directly.

**Phone view:** The action bar gives Call and Email in one tap, so the page has no second set of buttons above the form.

### Contact details

- **Phone:** [+971 2 626 8001](tel:+97126268001)
- **Email:** [info@vanguardgcc.com](mailto:info@vanguardgcc.com)
- **Address:** 403, Cuba Cafe Building, PO Box 36864, Tourist Club Area, Al Zahiya Zone, Abu Dhabi, UAE

### What happens after your enquiry

1. **We review your details.** We look at your sector, system, site location and scope.
2. **We contact you.** We reply using the details you gave us, and may ask for drawings, system lists or other information.
3. **We agree the next step.** This may be a consultation, a quote or a review of your scope. For document requests, we tell you what we can provide.

**Buttons:** Send enquiry | Call us

> **Internal note, do not publish:** F11, F14, F15, F16, F20. The address is the current site's text address, with its "Tourtist" and "No." errors corrected. The current site's map shows a different address, so this page has no map or directions (open fact 31). No hours or response times are given (open facts 19 and 27). The three steps describe the planned process, not a sourced fact, and the company must confirm them (open fact 61).

---

<a id="privacy-policy"></a>

## Privacy Policy

> **TEMPLATE: NOT LEGAL ADVICE. A QUALIFIED UAE LEGAL ADVISER MUST REVIEW THIS BEFORE IT IS PUBLISHED.**
> We wrote both documents from the planned website and public sources. No lawyer has reviewed them, and the company has not approved them. Do not treat them as final, or as proof of compliance. The review is tracked in [open-facts.md](open-facts.md) item 63.

- **URL:** `/privacy-policy/`
- **Meta title:** Privacy Policy | Vanguard Technology
- **Meta description:** How Vanguard Technology handles personal data from enquiries, newsletter sign-ups, CVs and consented website analytics.

**Template notice (visible on the page):** This policy is a template awaiting review by a legal adviser.

**H1:** Privacy Policy

**Last updated:** [Date of legal approval]

#### Who we are

Vanguard Technology [registered legal name and trade licence number] is responsible for the personal data described in this policy. Our address is 403, Cuba Cafe Building, PO Box 36864, Tourist Club Area, Al Zahiya Zone, Abu Dhabi, UAE. You can contact us at [info@vanguardgcc.com](mailto:info@vanguardgcc.com) or [+971 2 626 8001](tel:+97126268001).

#### The law we follow

We handle personal data in line with applicable UAE law. This includes Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data, known as the Personal Data Protection Law (PDPL).

#### What we collect and why

| Source | Personal data | Why we use it | Ground | How long we keep it |
|---|---|---|---|---|
| **Enquiry form** | Name, organisation, email address, phone number if given, and the details in your enquiry | To reply, assess your enquiry and prepare a consultation, quote or requested documents | Your consent, or steps you ask us to take before a contract [adviser to confirm] | [24 months] after our last contact, or longer under a contract or the law |
| **Newsletter** | Email address, and the date and record of your consent | To send our newsletter | Your consent | Until you unsubscribe. We then keep a minimal record so that we do not email you again |
| **Emails, calls and CVs** | Your contact details, your message, and anything in your CV | To respond to you, or to consider you for a role | Your consent, or steps you ask us to take before a contract [adviser to confirm] | [24 months] for enquiries and [12 months] for CVs |
| **Google Analytics 4** | Cookie identifiers, pages viewed, site actions, approximate location, and device and browser details | To understand how the site is used and improve it | Your consent | 14 months |
| **Microsoft Clarity** | Cookie identifiers, pages viewed, clicks, scrolling, mouse movement, session recordings, and device and browser details | To find usability problems and improve the site | Your consent | Recordings for 30 days, and click and heatmap data for 9 months. Sessions we label are kept for 9 months |
| **Server and security records** | IP address, browser details, pages requested, time and spam-check data | To run and protect the site | [Adviser to confirm] | [30 days], unless needed for a security issue |

Please do not put sensitive personal data in your enquiry. Do not send confidential project documents until we have agreed how to handle them.

#### Analytics and cookies

We use Google Analytics 4 and Microsoft Clarity only if you accept them. Neither tool loads until you do, and you can choose each one separately. The site works the same if you decline.

Clarity can record how you move through pages. It masks text in input boxes and drop-down menus, so it does not record what you enter in our forms.

We do not use these tools to advertise to you. Microsoft says that one Clarity cookie, MUID, is used for advertising, site analytics and other operational purposes.

| Cookie | Set by | Purpose | Duration |
|---|---|---|---|
| `_ga` | Google Analytics | Identifies a visitor | 12 months |
| `_ga_<container-id>` | Google Analytics | Stores session state | 12 months |
| `_clck` | Microsoft Clarity | Stores the Clarity user ID and preferences | [Confirm by testing] |
| `_clsk` | Microsoft Clarity | Connects page views into one recording | [Confirm by testing] |
| `CLID` | Microsoft Clarity | Identifies when Clarity first saw this visitor on any site using Clarity | [Confirm by testing] |
| `MUID` | Microsoft | Identifies browsers visiting Microsoft sites, for advertising, site analytics and other operational purposes | [Confirm by testing] |
| `MR`, `SM`, `ANONCHK` | Microsoft | Support the MUID cookie | [Confirm by testing] |

We store your cookie choice in your browser for 12 months, so that we do not ask you again on every page. This record is not used to identify you.

To change your choice, use **Cookie settings** in the site footer. Your browser settings also let you remove cookies.

#### Who receives your data

We do not sell your personal data. We share it only as needed with:

- **Google,** for Google Analytics, if you accept it
- **Microsoft,** for Clarity, if you accept it
- **Our service providers,** for website hosting, form delivery, email and newsletters: [names of providers]
- **Our professional advisers,** where needed
- **Authorities,** where the law requires it

#### Transfers outside the UAE

Our service providers may process personal data outside the UAE. Where this happens, we take the steps that applicable law requires. [Adviser to confirm the safeguards and countries.]

#### Security

We use reasonable technical and organisational measures to protect personal data. No website or email system is completely secure, so we cannot promise absolute security.

#### Your rights

Under the PDPL and other applicable law, you may be able to:

- Ask what personal data we hold and how we use it
- Receive a copy of your data, or ask us to send it to another organisation
- Ask us to correct inaccurate data
- Ask us to delete your data
- Ask us to restrict or stop using your data
- Ask for human review of a decision made solely by automated means
- Withdraw your consent at any time

Withdrawing consent does not affect our earlier use of your data. These rights have legal limits, and we may need to confirm your identity first.

To use a right, email [info@vanguardgcc.com](mailto:info@vanguardgcc.com). If you are not satisfied with our response, you may complain to [the competent UAE data protection authority].

#### Automated decisions

We do not make decisions about you solely by automated means. [Company to confirm.]

#### Children

This site is for businesses and professionals. It is not intended for children, and we do not knowingly collect their data.

#### Changes to this policy

We may update this policy. The date at the top shows the latest version. If a change affects how we use data under your consent, we will ask for your consent again where the law requires it.

**Buttons:** Contact us about your data | Back to home

---

<a id="terms-of-use"></a>

## Terms of Use

> **TEMPLATE: NOT LEGAL ADVICE. A QUALIFIED UAE LEGAL ADVISER MUST REVIEW THIS BEFORE IT IS PUBLISHED.**
> We wrote both documents from the planned website and public sources. No lawyer has reviewed them, and the company has not approved them. Do not treat them as final, or as proof of compliance. The review is tracked in [open-facts.md](open-facts.md) item 63.

- **URL:** `/terms/`
- **Meta title:** Terms of Use | Vanguard Technology
- **Meta description:** The terms that apply when you use the Vanguard Technology website, including its content, enquiries, intellectual property and liability.

**Template notice (visible on the page):** These terms are a template awaiting review by a legal adviser.

**H1:** Terms of Use

**Last updated:** [Date of legal approval]

#### About these terms

These terms apply when you use this website, which is run by Vanguard Technology [registered legal name and trade licence number]. By using the site, you accept these terms. If you do not accept them, please do not use the site.

#### Information on this site

The site gives general information about our services. It is not professional advice, and it does not replace a site assessment or a written contract. We try to keep it accurate and up to date, but we do not promise that it is complete or current.

#### Illustrations and typical work

- **Photos:** unless we say otherwise, photos are illustrative. They do not show our staff, sites, clients or projects.
- **3D models:** these are illustrative. They do not show a real facility or project.
- **Typical project profiles:** these describe types of work we deliver. They are not records of completed projects, and they do not promise a particular result.

#### Enquiries and services

An enquiry, consultation or quote does not create a contract, and the site is not an offer to supply services. Any services are subject to a separate written agreement, which takes priority over these terms.

#### Acceptable use

You must not:

- Use the site unlawfully, or in a way that harms others
- Send false, misleading or malicious information
- Try to gain unauthorised access to the site or its systems
- Disrupt the site, or introduce malicious code
- Collect data from the site by automated means without our written permission

#### Intellectual property

We or our licensors own the content and design of this site. You may view and print pages for your own business use. You must not copy, publish or sell our content without our written permission.

Third-party names and logos belong to their owners. Showing them does not give you any right to use them.

#### Other websites and businesses

We are not responsible for the content or practices of other websites that we link to. Information on our Our Group page is general, and you should check details directly with the business concerned.

#### Availability

We may change, suspend or withdraw any part of the site at any time. We do not promise that it will always be available or free from errors.

#### Liability

To the extent the law allows, we provide the site "as is", without warranties. We are not liable for loss arising from your use of the site, or from relying on its content. Nothing in these terms limits a liability that cannot be limited by law. [Adviser to confirm.]

#### Privacy

Our [Privacy Policy](/privacy-policy/) explains how we handle personal data.

#### Changes to these terms

We may update these terms. The date at the top shows the latest version. Please check it when you return to the site.

#### Governing law

These terms are governed by the laws applicable in the Emirate of Abu Dhabi and the federal laws of the UAE. The courts of Abu Dhabi have jurisdiction over any dispute. [Adviser to confirm.]

#### Contact

Email [info@vanguardgcc.com](mailto:info@vanguardgcc.com) or call [+971 2 626 8001](tel:+97126268001). Our address is 403, Cuba Cafe Building, PO Box 36864, Tourist Club Area, Al Zahiya Zone, Abu Dhabi, UAE.

**Buttons:** Contact us | Back to home

---

<a id="404-page"></a>

## 404 page

- **Meta title:** Page Not Found | Vanguard Technology
- **Indexing:** noindex

**H1:** We can't find that page

**Text:** The page may have moved, or the address may be wrong. Use the links below to continue.

**Primary button:** Explore solutions

**Secondary button:** Start a consultation

> **Internal note, do not publish:** The H1 is the agreed exception to the contractions rule (decision 124). Old spam URLs also reach this page or return 410 (decision 59).

---

<a id="cms-case-study-template"></a>

## CMS: Case study template

For adding real projects through the CMS (decision 163). **This file holds no project data, and none should be invented to test or demonstrate it.** Use obvious placeholders in test entries, and never publish them.

### How it works

- Entries are created in the CMS as drafts (decision 164).
- An entry goes live only when the checklist below is complete.
- `/projects/` and the Projects menu item stay off until the first entry is published. After that, each entry appears at `/projects/<slug>/`.
- The six profiles in [capabilities.md](#capabilities) stay on Capabilities, still labelled as typical work.

### Fields

#### Published fields

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

#### Internal fields (never published)

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

### Writing the result

- **Use a measured figure only with a source.** Record who measured it, how and when.
- **Without a figure, state what was handed over.** "The system was handed over and is maintained under an annual contract" is a valid result, if true.
- **Do not imply cause without evidence.** A saving or fault reduction needs a before and after comparison.
- **Do not use the client's words as a quote without written approval.**

### Photo rules

- Use real project photos only. No stock photos, renders or photos from suppliers presented as the site.
- Hide screens, tags and documents that the client has not cleared.
- Get consent from anyone who can be identified.
- Check that workers are shown in correct protective equipment.
- Upload at 2400 px wide or less. The build compresses each image to 120 KB or less, in line with the page budget.

### Before publishing

- [ ] Every field in "Published fields" is complete.
- [ ] The client has approved the text in writing.
- [ ] Photo permission is on file.
- [ ] Evidence supports the scope and result.
- [ ] Any figure has a recorded source.
- [ ] Sector, systems and scope match the site's stated services, or those pages have been updated.
- [ ] The text follows [tone.md](tone.md).
- [ ] The matching row in [open-facts.md](open-facts.md) has been updated with the source and date.

### Blank entry

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

### Page layout

1. Title as the H1
2. Summary record: client, location, year, sector and systems
3. Scope
4. Challenge
5. Solution
6. Result
7. Photos
8. Call to action: Discuss a similar project (pre-filled)

The summary record uses the **Project record** card variant in [design-system.md](design-system.md).

---

<a id="legal-build-requirements"></a>

## Legal and analytics build requirements

The policy is true only if the build does all of this (decisions 175 and 176). Check each item on the live site before launch.

- [ ] Do not load GA4 or Clarity before consent. This includes Clarity's no-consent mode, which still collects data.
- [ ] Offer separate choices for GA4 and Clarity, and let visitors change them from the footer.
- [ ] Set GA4 data retention to 14 months and its cookies to 12 months.
- [ ] Keep Google Ads links, advertising features and Google signals off in GA4.
- [ ] On acceptance, send Clarity `ad_Storage: denied` and `analytics_Storage: granted`. Then test which cookies it sets, and update the table.
- [ ] Set Clarity masking to Balanced, and check recordings of both forms for captured personal data.
- [ ] Clear GA4 and Clarity cookies when consent is withdrawn.
- [ ] Add every service provider to "Who receives your data".
- [ ] Add an unsubscribe link to every newsletter.
- [ ] Remove the template notices only after written legal approval.

---

<a id="legal-adviser-notes"></a>

## Notes for the legal adviser

1. **Primary text.** The official PDPL text would not open for us. We relied on the UAE Government portal and secondary guides (L1 to L3 in [research.md](research.md)). Check every statement of rights and grounds against the law itself.
2. **Which law applies.** Please confirm that the PDPL is the right regime for this company. Its registration is unknown (open fact 2), and DIFC and ADGM have their own data protection laws.
3. **Executive regulations.** One commercial guide reported in September 2026 that they had not been issued. Please confirm their status, along with any effect on transfers, breach notice, data protection officers and timelines.
4. **Regulator.** One source reports a June 2026 change that may affect the regulator's role, so the policy does not name one. Please add the correct authority.
5. **Grounds for processing.** Please confirm the ground in each row of the table, especially server logs and spam protection.
6. **Analytics.** Microsoft describes one Clarity cookie, MUID, as used for advertising, site analytics and other operational purposes. Please confirm that the wording and consent design are adequate.
7. **Company commitments.** Statements that we do not sell data, use reasonable security and make no automated decisions have no source. The company must confirm them.
8. **Other points.** Please advise on retention periods, transfer safeguards, liability limits, governing law and whether an Arabic version is needed.

---

<a id="3d-plant-hotspots"></a>

## 3D plant model hotspots

> **Build note:** The plant is generic and captioned "Illustrative model" (decision 99). Labels are HTML, not textures.

| Hotspot label | Model area | Text (25 words) | Link |
|---|---|---|---|
| Oil & Gas | `zone-oil-gas`: process columns, pipework and flare stack. | Oil and gas field sites can cover large areas. We implement SCADA, communications and control systems, with PLC programs, instrumentation, electrical products and field installation. | `/industries/oil-gas/` |
| Water & Wastewater | `zone-water-treatment`: treatment tanks and pipework. | Water and wastewater sites are widely spread. We implement SCADA and control systems, design PLC programs and support systems through field services and maintenance contracts. | `/industries/water-wastewater/` |
| District Cooling | `zone-district-cooling`: plant hall and cooling towers. | Chilled water return temperature affects pumping and chiller operation. Our control and SCADA systems serve district cooling plants, with retrofit, maintenance and field services support. | `/industries/district-cooling/` |
| Power & Infrastructure | `zone-substation`: switch building, fenced transformers and cable route. No recognisable power station or transport asset. | Power and infrastructure projects bring many systems and contractors together. We integrate SCADA, communications and control systems, and provide electrical installation, project management and maintenance. | `/industries/power-infrastructure/` |
| HVAC & Building Management Systems | `zone-office-bms`: office building with rooftop units and a BMS panel. | Building performance drifts as sensors age and overrides remain in place. We offer HVAC control, integrated building and energy management systems and annual maintenance contracts. | `/industries/hvac-building-management-systems/` |
| Safety Instrumented Systems | `zone-safety-valves`: a generic field valve and instrument group. No readable tags, and no implied safety function. | Safety systems depend on controlled bypasses, proof testing and records. Our control, instrumentation and electrical engineers work on safety instrumented systems. Tell us your requirements. | `/industries/safety-instrumented-systems/` |

---

<a id="buttons-and-prefill"></a>

## Buttons and pre-filled enquiries

| Page | Primary button | Primary link | Pre-filled fields | Secondary button | Secondary link |
|---|---|---|---|---|---|
| Home | Start a consultation | `/contact-us/` | None | Explore solutions | `/solutions/` |
| About | Start a consultation | `/contact-us/` | None | View capabilities | `/capabilities/` |
| Solutions overview | Start a consultation | `/contact-us/` | None | Find your industry | `/industries/` |
| System Integration | Discuss your integration scope | `/contact-us/` | Request: Project enquiry | View capabilities | `/capabilities/` |
| Control & Instrumentation Engineering | Discuss your engineering scope | `/contact-us/` | Request: Project enquiry | See PLC and SCADA design | `/solutions/plc-scada-design-validation/` |
| Supply & Field Installation | Request a supply or installation quote | `/contact-us/` | Request: Supply or installation quote | See turnkey projects | `/solutions/turnkey-projects/` |
| Turnkey Projects | Discuss your project | `/contact-us/` | Request: Project enquiry | See project management | `/solutions/project-management/` |
| Project Management | Discuss your project | `/contact-us/` | Request: Project enquiry | See turnkey projects | `/solutions/turnkey-projects/` |
| Field Services & Annual Maintenance Contracts | Ask about a maintenance contract | `/contact-us/` | Request: Maintenance or field support | Call us | `tel:+97126268001` |
| PLC/SCADA Design & Validation | Discuss your SCADA scope | `/contact-us/` | Request: Project enquiry; System: SCADA | See oil and gas | `/industries/oil-gas/` |
| IT Consultancy | Discuss your IT requirements | `/contact-us/` | Request: Other; System: IT consultancy | About Vanguard Technology | `/about-us/` |
| Audio/Visual Integration | Discuss your AV project | `/contact-us/` | Request: Project enquiry; System: Audio/visual | About Vanguard Technology | `/about-us/` |
| Industries overview | Start a consultation | `/contact-us/` | None | Explore solutions | `/solutions/` |
| Oil & Gas | Discuss your oil and gas project | `/contact-us/` | Request: Project enquiry; Sector: Oil and gas | See PLC and SCADA design | `/solutions/plc-scada-design-validation/` |
| Water & Wastewater | Discuss your water project | `/contact-us/` | Request: Project enquiry; Sector: Water and wastewater | See PLC and SCADA design | `/solutions/plc-scada-design-validation/` |
| District Cooling | Discuss your plant | `/contact-us/` | Request: Project enquiry; Sector: District cooling | See field services and maintenance | `/solutions/field-services-maintenance/` |
| Power & Infrastructure | Discuss your power or infrastructure project | `/contact-us/` | Request: Project enquiry | See system integration | `/solutions/system-integration/` |
| HVAC & Building Management Systems | Discuss your building controls | `/contact-us/` | Request: Project enquiry; Sector: HVAC and building management systems | See field services and maintenance | `/solutions/field-services-maintenance/` |
| Safety Instrumented Systems | Discuss your safety system requirements | `/contact-us/` | Request: Project enquiry; System: Safety instrumented systems | See control and instrumentation engineering | `/solutions/control-instrumentation-engineering/` |
| Capabilities | Request company documents | `/contact-us/` | Request: Company documents | Start a consultation | `/contact-us/` |
| Our Group | Explore automation solutions | `/solutions/` | None | Contact us | `/contact-us/` |
| Careers | Email your CV to info@vanguardgcc.com | `mailto:info@vanguardgcc.com` | None | About Vanguard Technology | `/about-us/` |
| Contact | Send enquiry | Form submit | None | Call us | `tel:+97126268001` |
| Privacy Policy | Contact us about your data | `mailto:info@vanguardgcc.com` | None | Back to home | `/` |
| Terms of Use | Contact us | `/contact-us/` | None | Back to home | `/` |
| 404 | Explore solutions | `/solutions/` | None | Start a consultation | `/contact-us/` |

---

<a id="page-layouts"></a>

## Page layouts

Section order tested in [design/wireframes.html](design/wireframes.html) at 1440 px and 390 px. Findings are in [design/wireframe-review.md](design/wireframe-review.md).

| Page | Section order | 3D |
|---|---|---|
| **Home** | Hero with buttons; proof points and Our Partners; Our solutions; Industries we serve; From field instruments to SCADA; How we work, with a button; Why Vanguard; Capabilities; Tell us about your system | 3D hero; 3D icons on solution rows; photos on industry cards; 3D plant model |
| **PLC/SCADA Design & Validation** | Hero with buttons and linked industries; What we deliver; From field instruments to SCADA; How we work; FAQs; Our Partners and Based in Abu Dhabi; closing band "Tell us which platform your site runs on", with Discuss your SCADA scope and Request company documents | Static 3D render in hero; 3D plant model |
| **Other solution pages** | Hero with buttons and linked industries; What we deliver; How we work; FAQs; Our Partners and Based in Abu Dhabi; closing band "Tell us about your system" | 3D icon in hero |
| **Field Services & Annual Maintenance Contracts** | As other solution pages, with the quote FAQ as a callout beside What we deliver, and a closing band "Tell us about your plant" | 3D icon in hero |
| **Industry pages** | Hero with intro and buttons; Operator challenges; How Vanguard helps; See it on the model, with Typical systems we deliver; closing band with the page's primary button as H2 | 3D icon in hero; 3D plant model focused on the page's hotspot |
| **Capabilities** | Hero with buttons; What we do; Our Partners; Company details beside Preparing a shortlist?; The types of work we deliver, as a single column of expanding profiles with the label always visible and the first open; Tell us about your system | None |
| **Contact** | Hero; form in three groups, beside Contact details and What happens after your enquiry on desktop, and above them on phones | None |

**Home card order:** System Integration, PLC/SCADA Design & Validation, Field Services & Annual Maintenance Contracts, Control & Instrumentation Engineering, Supply & Field Installation, Turnkey Projects, Project Management, IT Consultancy, Audio/Visual Integration. This follows the priority tiers in [keyword-plan.md](keyword-plan.md).

**3D icons** are small pre-rendered images, not WebGL (decisions 191 and 203). The visual design of Home, PLC/SCADA and Contact is in [design/design-review.md](design/design-review.md).
