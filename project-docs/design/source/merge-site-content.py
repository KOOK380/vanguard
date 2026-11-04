import os, re
base = r"C:\Users\learn\OneDrive\Desktop\Vangurad"
c = lambda n: open(os.path.join(base, "content", n), encoding="utf-8").read().replace("\r\n", "\n")

def links(t):
    t = t.replace("../project-docs/", "")
    for f, a in [("legal.md", "privacy-policy"), ("capabilities.md", "capabilities"), ("case-study-template.md", "cms-case-study-template")]:
        t = t.replace(f"]({f})", f"](#{a})")
    return t

def internal(t):
    t = re.sub(r"^\*\*Notes:\*\* ", "> **Internal note, do not publish:** ", t, flags=re.M)
    t = re.sub(r"^\*\*Build:\*\* ", "> **Build note:** ", t, flags=re.M)
    t = re.sub(r"^\*\*Plant model area:\*\* ", "> **3D build note:** Plant model area: ", t, flags=re.M)
    return t

def demote(t, by=1):
    return re.sub(r"^(#{2,5}) ", lambda m: "#" * (len(m.group(1)) + by) + " ", t, flags=re.M)

def split_secs(t):
    return [s.strip() for s in re.split(r"\n---\n", t)]

def tidy(t):
    t = re.sub(r"^\*\*H2:\*\* (.+)$", r"### \1", t, flags=re.M)
    return internal(links(t)).strip()

pages = []  # (title, anchor, body)
def page(title, body, anchor=None):
    a = anchor or re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    pages.append((title, a, body.strip()))

def named(secs):
    out = {}
    for s in secs:
        m = re.match(r"## (?:\d\. )?(.+)", s)
        if m:
            out[m.group(1)] = re.sub(r"^## .+\n+", "", s, count=1)
    return out

# Home and About
def copy_page(name, url):
    t = c(name)
    s = t[t.index("## Search"):]
    parts = re.split(r"^## ", s, flags=re.M)[1:]
    out = [f"- **URL:** `{url}`"]
    for p in parts:
        head, _, body = p.partition("\n")
        body = body.strip()
        if head == "Search":
            body = re.sub(r"- \*\*Primary keyword:\*\* .+\n", "", body).replace("**Page title:**", "**Meta title:**")
            out.append(body)
        elif head.startswith("Copy: "):
            label = head[6:]
            h2 = re.search(r"^\*\*H2:\*\* (.+)$", body, flags=re.M)
            body2 = re.sub(r"^\*\*H2:\*\* .+\n+", "", body, flags=re.M)
            if h2:
                out.append(f"### {h2.group(1)}\n\n{body2}")
            elif re.search(r"\*\*H1:\*\*", body):
                out.append(body)
            else:
                out.append(f"### Section: {label}\n\n{body}")
        else:
            out.append("> **Internal sources, do not publish.**\n\n" + re.sub(r"^", "", body))
    return tidy("\n\n".join(out))

home = copy_page("home.md", "/")
home = home.replace("These replace statistics, because no numbers can be sourced.\n\n", "> **Build note:** These replace statistics, because no numbers can be sourced.\n\n")
home = home.replace("Step numbers show order only. They are not statistics.", "> **Build note:** Step numbers show order only. They are not statistics.")
about = copy_page("about.md", "/about-us/")
about = about.replace("Use no photos until real ones are supplied.", "> **Build note:** Use no photos until real ones are supplied.")
about = about.replace("No certifications are verified, so the page has no certifications section.\n\n", "> **Build note:** No certifications are verified, so the page has no certifications section.\n\n")

ov = named(split_secs(c("overviews.md"))[1:] + [])
ovs = split_secs(c("overviews.md"))
global_block = ovs[1]
header = global_block[global_block.index("## Header"):global_block.index("## Phone action bar")].replace("## Header\n\n", "")
bar = global_block[global_block.index("## Phone action bar"):global_block.index("## Footer")].replace("## Phone action bar\n\n", "")
footer = global_block[global_block.index("## Footer"):].replace("## Footer\n\n", "")
ovmap = named(ovs[2:])

oth = named(split_secs(c("other-pages.md"))[1:])
leg = split_secs(c("legal.md"))
legmap = named(leg)
ind = named(split_secs(c("industries.md"))[1:])
sol = named(split_secs(c("solutions.md"))[1:])

# Capabilities
cap = c("capabilities.md")
rules = cap[cap.index("**Build rules"):cap.index('"Notes" lines')].strip()
capbody = cap[cap.index("## Search"):]
capbody = capbody.replace("## Search\n\n", "", 1)
capbody = re.sub(r"\n---\n", "\n", capbody)
capbody = re.sub(r"^## Typical project profiles\n\n\*\*H2:\*\* The types of work we deliver", "### Typical project profiles: The types of work we deliver", capbody, flags=re.M)
capbody = re.sub(r"^### (\d\. )", r"#### \1", capbody, flags=re.M)
capbody = re.sub(r"^## ", "### ", capbody, flags=re.M)
capbody = tidy(capbody).replace("**H2:** ", "")
capbody = "> **Build rules: these are not case studies.** " + re.sub(r"^\*\*Build rules \(decision 159\)\*\*\n", "", rules).replace("\n- ", " ").replace("- ", "", 1) + "\n\n" + capbody

# Global
page("Header", tidy(header), "global-header")
page("Phone action bar", tidy(bar), "global-phone-bar")
page("Footer", tidy(footer), "global-footer")
page("Cookie banner", demote(tidy(oth["Cookie banner"])), "global-cookie-banner")
page("Newsletter sign-up", tidy(oth["Newsletter sign-up"]), "global-newsletter")
page("Enquiry form", demote(tidy(oth["Enquiry form"])), "global-enquiry-form")
n_global = len(pages)

page("Home", home)
page("About", about)
page("Solutions overview", tidy(ovmap["Solutions overview"]))
for k, v in sol.items():
    page("Solution: " + k, tidy(v))
page("Industries overview", tidy(ovmap["Industries overview"]))
for k, v in ind.items():
    page("Industry: " + k, tidy(v))
page("Capabilities", capbody)
page("Our Group", demote(tidy(oth["Our Group"])))
page("Careers", tidy(oth["Careers"]))
page("Contact", tidy(oth["Contact"]))
notice = leg[0][leg[0].index("> **TEMPLATE"):leg[0].index("**How to read")].strip()
page("Privacy Policy", links(notice) + "\n\n" + demote(tidy(legmap["Privacy Policy"])))
page("Terms of Use", links(notice) + "\n\n" + demote(tidy(legmap["Terms of Use"])))
page("404 page", tidy(oth["404 page"]))
n_pages = len(pages)

tpl = c("case-study-template.md")
tpl = re.sub(r"^# .+\n+", "", tpl)
page("CMS: Case study template", demote(links(tpl), 1).replace("#### Published", "#### Published"), "cms-case-study-template")
adv = legmap["Notes for the legal adviser"]
build = legmap["Build requirements"]
page("Legal and analytics build requirements", links(build), "legal-build-requirements")
page("Notes for the legal adviser", links(adv), "legal-adviser-notes")

# Hotspots
hot = []
for k, v in ind.items():
    url = re.search(r"URL:\*\* `(.+?)`", v).group(1)
    h = re.search(r"hotspot \(25 words\):\*\* (.+)", v).group(1).strip()
    a = re.search(r"Plant model area:\*\* (.+)", v).group(1).strip()
    hot.append(f"| {k} | {a} | {h} | `{url}` |")
hot_table = "| Hotspot label | Model area | Text (25 words) | Link |\n|---|---|---|---|\n" + "\n".join(hot)
page("3D plant model hotspots", "> **Build note:** The plant is generic and captioned \"Illustrative model\" (decision 99). Labels are HTML, not textures.\n\n" + hot_table, "3d-plant-hotspots")

cta = """| Page | Primary button | Primary link | Pre-filled fields | Secondary button | Secondary link |
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
| 404 | Explore solutions | `/solutions/` | None | Start a consultation | `/contact-us/` |"""
page("Buttons and pre-filled enquiries", cta, "buttons-and-prefill")

st = open(os.path.join(base, "project-docs", "strategy.md"), encoding="utf-8").read().replace("\r\n", "\n")
lay = st[st.index("## Page layouts"):]
lay = lay[lay.index("\n"):lay.index("\n## ", 5) if "\n## " in lay[5:] else None].strip()
page("Page layouts", lay.replace("(design/", "(design/"), "page-layouts")

def toc(items):
    return "\n".join(f"- [{t}](#{a})" for t, a, _ in items)

glob = pages[:n_global]
site = pages[n_global:n_pages]
dev = pages[n_pages:]

head = f"""# Vanguard Technology: site content

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

{toc(glob)}

**Pages:**

{toc(site)}

**Development reference:**

{toc(dev)}
"""
body = head
for t, a, b in pages:
    body += f"\n---\n\n<a id=\"{a}\"></a>\n\n## {t}\n\n{b}\n"
body = re.sub(r"\n{3,}", "\n\n", body)
body = body.replace("**Call to action:**", "**Buttons:**")
with open(os.path.join(base, "project-docs", "site-content.md"), "w", encoding="utf-8", newline="\n") as f:
    f.write(body)
print("pages", len(pages), "words", len(body.split()))
