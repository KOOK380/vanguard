# Other page copy

Our Group, Careers, Contact, the enquiry form, the 404 page, the cookie banner and the newsletter sign-up. Follows [tone.md](../project-docs/tone.md) and [keyword-plan.md](../project-docs/keyword-plan.md). Source IDs are in [research.md](../project-docs/research.md). The Privacy Policy and Terms of Use are in [legal.md](legal.md).

"Notes" and "Build" lines are not for publishing.

---

## 1. Our Group

- **URL:** `/our-group/`
- **Meta title:** Our Group | Vanguard Technology
- **Meta description:** Businesses presented with Vanguard Technology: shipping, real estate, chauffeur services and The Park Hospitality, with its three hotels in Dubai.

**H1:** Our Group

**Intro:** The businesses below are presented with Vanguard Technology. They work in shipping, real estate, chauffeur services and hospitality. Each entry summarises how the business describes its own services.

### Vanguard Worldwide Shipping LLC

Vanguard Worldwide Shipping LLC provides global logistics services. The business describes its work as reliable and efficient, and focuses on the safe and timely delivery of goods internationally. We list it here for information, because its work is logistics rather than industrial automation. For automation, control system or maintenance enquiries, use the Vanguard Technology enquiry form on our Contact page.

### Vanguard ME Real Estate

Vanguard ME Real Estate specialises in property management, investment and real estate services. Its services are aimed at buyers, sellers and investors. We list it here for information, because its work is property rather than industrial automation. For SCADA, instrumentation or field service enquiries, use the Vanguard Technology enquiry form on our Contact page, where we can review your scope.

### Min Limousine LLC

Min Limousine LLC offers luxury chauffeur services. The business describes its transport as premium, with emphasis on comfort, style and reliability. We list it here for information, because its work is chauffeur transport rather than industrial automation. For PLC, electrical or turnkey project enquiries, use the Vanguard Technology enquiry form on our Contact page, where we can review your scope.

### The Park Hospitality

The Park Hospitality provides hospitality services, including accommodation and personalised guest service. Its group has three hotels in Dubai. The Park Hotel is a luxury stay with refined dining. Gulf Inn Al Nasr is a business stay with comfortable rooms and access to business and leisure destinations. The Oriental Hotel is a cultural stay combining eastern elegance with modern comfort.

**Call to action:** Explore automation solutions | Contact us

**Notes:** F17, F18, and the fuller text on https://vanguardgcc.com/clientsgroups/ recorded in [current-site.md](../project-docs/current-site.md). The site does not say whether these businesses are clients or group companies, so nothing here claims ownership (open facts 4 and 36). Each of the four entries is exactly 60 words. The site's own text is short, so the first three entries end with a signpost to the enquiry form rather than added detail. Left out as rank claims: "world-class", "top-tier", "landmark", "exceptional" and "5★" (open fact 46). The Park logo may appear here only (decision 114). Stock photos stand in for these businesses (`our-group/` in [image-credits.md](../project-docs/image-credits.md)).

---

## 2. Careers

- **URL:** `/careers/`
- **Meta title:** Careers in Industrial Automation | Vanguard Technology
- **Meta description:** Careers at Vanguard Technology in Abu Dhabi. Our team includes controls engineers, designers, programmers and support staff. Email your CV to apply.

**H1:** Careers at Vanguard Technology

**Intro:** Vanguard Technology is an industrial automation company in Abu Dhabi. Our team includes controls engineers, designers, programmers and support staff, with continual training as part of the work.

**H2:** How to apply

1. **Email your CV** to [info@vanguardgcc.com](mailto:info@vanguardgcc.com).
2. **Use a clear subject line,** with your discipline or the role you want.
3. **Tell us about your experience,** including the systems you work on and where you are based.

Your CV contains personal data. See our [Privacy Policy](/privacy-policy/) for how we handle it.

**H2:** Current vacancies

**Empty state:** No vacancies are listed at the moment. You can still email us your CV and tell us which discipline interests you.

**Call to action:** Email your CV to info@vanguardgcc.com | About Vanguard Technology

**Notes:** F15, F19. Who reads CVs at this address is unknown, and "continual training" comes from a passage that may be borrowed (open facts 7 and 53). The page does not promise a reply. The empty state describes this page only, and does not say the company has no openings. Remove it once a real vacancy is listed.

---

## 3. Contact

- **URL:** `/contact-us/`
- **Meta title:** Contact Vanguard Technology | Abu Dhabi, UAE
- **Meta description:** Contact Vanguard Technology in Abu Dhabi about automation, control systems and maintenance. Call +971 2 626 8001, email us or send an enquiry.

**H1:** Start a consultation

**Intro:** Tell us about your site, system and scope. Consultations are free. Use the form, or call or email us directly.

**Phone view:** The action bar gives Call and Email in one tap, so the page has no second set of buttons above the form.

**H2:** Contact details

- **Phone:** [+971 2 626 8001](tel:+97126268001)
- **Email:** [info@vanguardgcc.com](mailto:info@vanguardgcc.com)
- **Address:** 403, Cuba Cafe Building, PO Box 36864, Tourist Club Area, Al Zahiya Zone, Abu Dhabi, UAE

**H2:** What happens after your enquiry

1. **We review your details.** We look at your sector, system, site location and scope.
2. **We contact you.** We reply using the details you gave us, and may ask for drawings, system lists or other information.
3. **We agree the next step.** This may be a consultation, a quote or a review of your scope. For document requests, we tell you what we can provide.

**Call to action:** Send enquiry | Call us

**Notes:** F11, F14, F15, F16, F20. The address is the current site's text address, with its "Tourtist" and "No." errors corrected. The current site's map shows a different address, so this page has no map or directions (open fact 31). No hours or response times are given (open facts 19 and 27). The three steps describe the planned process, not a sourced fact, and the company must confirm them (open fact 61).

---

## 4. Enquiry form

**Build:** One form on `/contact-us/`. Buttons marked "pre-filled" set the request type, sector or system type (decision 81). Sends to info@vanguardgcc.com (decision 28). Use a hidden spam-trap field rather than a CAPTCHA, and no file upload at launch (decision 169).

**Form heading (H2):** Send your enquiry

**Form introduction:** All fields are required unless marked optional.

**Field groups, in this order:** Your request (Request type, Scope) | About your site (Sector, System type, Location, Project stage) | About you (Name, Organisation, Email, Phone, Message)

### Fields

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

### Messages

**Error summary heading:** Check these details

**Error summary text:** Correct the fields below, then send your enquiry again.

**Success heading:** Thank you. We have received your enquiry.

**Success text:** We will reply using the contact details you gave us. To add anything, call +971 2 626 8001 or email info@vanguardgcc.com.

**Sending failed:** We could not send your enquiry. Your details are still in the form. Try again, call +971 2 626 8001 or email info@vanguardgcc.com.

**Notes:** Decisions 27, 28, 68 and 81. "Thank you. We have received your enquiry." comes from `tone.md`. The success message must appear only after the send is confirmed. Check that info@vanguardgcc.com is monitored before launch (open fact 25). The Privacy Policy is in [legal.md](legal.md) and needs legal review (open fact 63).

---

## 5. 404 page

- **Meta title:** Page Not Found | Vanguard Technology
- **Indexing:** noindex

**H1:** We can't find that page

**Text:** The page may have moved, or the address may be wrong. Use the links below to continue.

**Primary button:** Explore solutions

**Secondary button:** Start a consultation

**Notes:** The H1 is the agreed exception to the contractions rule (decision 124). Old spam URLs also reach this page or return 410 (decision 59).

---

## 6. Cookie banner

**Build:** GA4 and Microsoft Clarity load only after consent (decisions 174 and 175). The banner sits at the bottom of the screen, does not block the page or the enquiry form, and causes no layout shift. Give the accept and decline buttons the same size and prominence. Full requirements are in [legal.md](legal.md).

**Text:** We would like to use Google Analytics and Microsoft Clarity to understand how this site is used. Clarity can record how you move through pages. The site works the same if you decline. See our [Privacy Policy](/privacy-policy/).

**Buttons:** Accept analytics | Decline analytics | Cookie settings

### Cookie settings

**Heading:** Cookie settings

**Introduction:** Choose which analytics tools we may use. You can change this at any time from the site footer.

| Toggle | Default | Description |
|---|---|---|
| Google Analytics | Off | Helps us understand which pages are used and how visitors reach them. |
| Microsoft Clarity | Off | Helps us find usability problems, using session recordings and heatmaps. |

**Button:** Save choices

**Footer link:** Cookie settings

**Notes:** Needs legal review (open fact 63). This replaces the earlier cookieless notice (decisions 38 and 170).

---

## 7. Newsletter sign-up

**Build:** Sits in the site footer. Uses a separate confirmation email, and sends nothing until the visitor confirms (decision 177). Keep it separate from the enquiry form.

**Heading:** Newsletter

**Introduction:** Updates from Vanguard Technology by email.

**Label:** Email address

**Checkbox, not ticked by default:** I agree to receive the Vanguard Technology newsletter by email. I can unsubscribe at any time. See the [Privacy Policy](/privacy-policy/).

**Button:** Subscribe

**Email error:** Enter your email address.

**Checkbox error:** Tick the box to confirm that you want the newsletter.

**Success:** Thank you. Check your email and confirm your subscription.

**Sending failed:** We could not complete your sign-up. Try again later.

**Notes:** Who writes the newsletter, what it covers and which tool sends it are unknown (open fact 64). Do not launch the form until these are settled.
