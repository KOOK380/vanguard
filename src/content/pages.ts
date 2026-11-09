import "server-only";
import { routes } from "@/lib/routes";
import { industries, industriesOverview } from "./industries";
import { ourGroup } from "./our-group";
import { actions, meta } from "./shared";
import { solutions, solutionsOverview } from "./solutions";
import { cell, field, fields, label, page, pipe, records, section, sections, type SourceSection } from "./source";
import type { Meta } from "./types";

/* ---------- Site-wide ---------- */

const header = page("global-header");
const bar = page("global-phone-bar");
const foot = page("global-footer");
const cookies = page("global-cookie-banner");
const news = page("global-newsletter");
const form = page("global-enquiry-form");

export const headerCopy = {
  logoAlt: field(header, "Logo"),
  menu: pipe(field(header, "Main menu")),
  solutionsLink: field(header, "Solutions menu link"),
  industriesLink: field(header, "Industries menu link"),
  phone: field(header, "Phone link"),
  button: field(header, "Button"),
  names: {
    mainNav: field(header, "Main menu name"),
    menuButton: field(header, "Phone menu button name"),
    closeMenu: field(header, "Close menu button name"),
    actionBar: field(header, "Phone action bar name"),
  },
  skipLink: field(header, "Skip link"),
  breadcrumb: field(header, "Breadcrumb name"),
};

const [call = "", whatsapp = "", getQuote = ""] = pipe(field(bar, "Buttons"));
export const phoneBarCopy = {
  call,
  whatsapp,
  getQuote,
  contactPage: field(bar, "Contact page button"),
  /** The user's own wording, kept with its contraction (decision 289). Sent as the WhatsApp text. */
  whatsappMessage: field(bar, "WhatsApp pre-filled message"),
};

export const footerCopy = {
  companyHeading: label(foot, "Company links").replace(/ links$/, ""),
  solutionsHeading: label(foot, "Solutions links").replace(/ links$/, ""),
  industriesHeading: label(foot, "Industries links").replace(/ links$/, ""),
  company: pipe(field(foot, "Company links")),
  legal: pipe(field(foot, "Legal links")),
  /** "© [current year] Vanguard Technology. All rights reserved." */
  copyright: (year: number) => field(foot, "Copyright").replace("[current year]", String(year)),
};

const settings = section(cookies, "Cookie settings");
export const cookieCopy = {
  text: field(cookies, "Text"),
  buttons: pipe(field(cookies, "Buttons")),
  settings: {
    heading: field(settings, "Heading"),
    intro: field(settings, "Introduction"),
    toggles: records(settings, "Toggle").map((r) => ({ name: r["Toggle"] ?? "", defaultOn: r["Default"] === "On", description: r["Description"] ?? "" })),
    button: field(settings, "Button"),
    footerLink: field(settings, "Footer link"),
  },
};

export const newsletterCopy = {
  heading: field(news, "Heading"),
  intro: field(news, "Introduction"),
  label: field(news, "Label"),
  /** Inline Markdown with the Privacy Policy link. */
  consent: field(news, "Checkbox, not ticked by default"),
  button: field(news, "Button"),
  emailError: field(news, "Email error"),
  consentError: field(news, "Checkbox error"),
  success: field(news, "Success"),
  failed: field(news, "Sending failed"),
  confirmEmail: { subject: field(news, "Confirmation email subject"), text: field(news, "Confirmation email text"), button: field(news, "Confirmation email button") },
  confirmed: field(news, "Confirmed page heading"),
  expired: { heading: field(news, "Expired link heading"), text: field(news, "Expired link text") },
  // Shared with the enquiry form, which has the only copy of these words (decision 256).
  sending: field(form, "Button while sending"),
  summaryHeading: field(form, "Error summary heading"),
};

const fieldRows = records(section(form, "Fields"), "Field");
function lastQuote(value: string): string {
  const q = [...value.matchAll(/"([^"]+)"/g)].at(-1)?.[1];
  if (!q) throw new Error(`site-content.md: no quoted help text in "${value.slice(0, 40)}".`);
  return q;
}
export const enquiryFormCopy = {
  heading: field(form, "Form heading (H2)"),
  intro: field(form, "Form introduction"),
  groups: pipe(field(form, "Field groups, in this order")).map((g) => {
    const [name = "", list = ""] = g.split(" (");
    return { name, fields: list.replace(/\)$/, "").split(", ") };
  }),
  fields: Object.fromEntries(
    fieldRows.map((r) => [
      r["Field"] ?? "",
      {
        label: r["Label"] ?? "",
        help: r["Help text"] || undefined,
        options: r["Options"] ? (r["Options"] ?? "").split("; ") : undefined,
        error: r["Error message"] || undefined,
      },
    ]),
  ) as Record<string, { label: string; help?: string; options?: string[]; error?: string }>,
  // These two lines are instructions that quote the help text; the help text is the last quotation.
  companyDocumentsHelp: lastQuote(field(form, "Company documents")),
  jobApplicationsHelp: lastQuote(field(form, "Job applications")),
  prefilledHelp: field(form, "Pre-filled field help text"),
  spamTrapLabel: field(form, "Spam-trap field label (hidden from view and from screen readers)"),
  /** Inline Markdown with the Privacy Policy link (decision 288). */
  consent: field(form, "Consent checkbox above the button, not ticked by default"),
  consentError: field(form, "Consent error"),
  button: field(form, "Button"),
  sending: field(form, "Button while sending"),
  errorSummary: { heading: field(form, "Error summary heading"), text: field(form, "Error summary text") },
  success: { heading: field(form, "Success heading"), text: field(form, "Success text") },
  failed: field(form, "Sending failed"),
};

/* ---------- Pages ---------- */

const home = page("home");
const sec = (heading: string) => section(home, heading);
export const homePage = {
  meta: meta(home),
  eyebrow: field(home, "Eyebrow"),
  h1: field(home, "H1"),
  lead: field(home, "Supporting sentence"),
  heroCaption: field(home, "Hero caption"),
  heroAlt: field(home, "Hero image alt text"),
  heroMotion: { pause: field(home, "Animation pause button"), play: field(home, "Animation play button") },
  actions: actions("Home"),
  solutions: { heading: sec("Our solutions").heading, intro: field(sec("Our solutions"), "Intro"), link: field(sec("Our solutions"), "Link") },
  industries: {
    heading: sec("Industries we serve").heading,
    intro: field(sec("Industries we serve"), "Intro"),
    link: field(sec("Industries we serve"), "Link"),
    note: field(sec("Industries we serve"), "Note under the cards"),
  },
  plant: {
    heading: sec("From field instruments to SCADA").heading,
    intro: field(sec("From field instruments to SCADA"), "Intro"),
    caption: field(sec("From field instruments to SCADA"), "Caption"),
    /** The user's wording (decision 290). Opens the enquiry form with the zone's sector. */
    talk: field(sec("From field instruments to SCADA"), "Panel button"),
  },
  why: { heading: sec("Why Vanguard").heading, items: records(sec("Why Vanguard"), "Title").map((r) => ({ title: cell(r["Title"] ?? ""), text: r["Sentence"] ?? "" })) },
  capabilities: {
    heading: sec("Capabilities").heading,
    intro: field(sec("Capabilities"), "Intro"),
    button: field(sec("Capabilities"), "Button"),
    link: field(sec("Capabilities"), "Link"),
    photoCaption: field(sec("Capabilities"), "Photo caption"),
    photoAlt: field(sec("Capabilities"), "Photo alt text"),
  },
  closing: {
    heading: sec("Tell us about your system").heading,
    body: field(sec("Tell us about your system"), "Body"),
    primary: field(sec("Tell us about your system"), "Primary button"),
    whatsapp: field(sec("Tell us about your system"), "Secondary button"),
    call: field(sec("Tell us about your system"), "Secondary button until WhatsApp is confirmed"),
  },
};

const about = page("about");
const aboutClose = section(about, "Talk to us about your system");
export const aboutPage = {
  meta: meta(about),
  h1: field(about, "H1"),
  intro: field(about, "Intro"),
  actions: actions("About"),
  closing: { heading: aboutClose.heading, body: field(aboutClose, "Body"), primary: field(aboutClose, "Primary button"), secondary: field(aboutClose, "Secondary button") },
};

const caps = page("capabilities");
const capsCta = section(caps, "Call to action");
const partnersSec = section(caps, "Our Partners");
export const capabilitiesPage = {
  meta: meta(caps),
  h1: field(caps, "H1"),
  intro: field(caps, "Intro"),
  partnersHeading: partnersSec.heading,
  shortlist: { heading: field(capsCta, "H2 (beside Company details)"), text: field(capsCta, "Text") },
  closing: { heading: field(capsCta, "Closing band H2"), text: field(capsCta, "Closing band text"), primary: field(capsCta, "Primary button").replace(/ \(pre-filled\)$/, ""), secondary: field(capsCta, "Secondary button") },
  actions: actions("Capabilities"),
};

const careers = page("careers");
const vacancies = section(careers, "Current vacancies");
export const careersPage = {
  meta: meta(careers),
  h1: field(careers, "H1"),
  intro: field(careers, "Intro"),
  vacancies: { heading: vacancies.heading, empty: field(vacancies, "Empty state") },
  buttons: pipe(field(careers, "Buttons")),
  actions: actions("Careers"),
};

const contact = page("contact");
const details = section(contact, "Contact details");
export const contactPage = {
  meta: meta(contact),
  h1: field(contact, "H1"),
  intro: field(contact, "Intro"),
  details: { heading: details.heading, items: fields(details) },
  buttons: pipe(field(contact, "Buttons")),
  actions: actions("Contact"),
};

/** Legal pages are rendered from their sections as written. They are templates (open fact 63). */
function legal(id: string, name: string) {
  const p = page(id);
  return {
    meta: meta(p),
    notice: field(p, "Template notice (visible on the page)"),
    h1: field(p, "H1"),
    lastUpdated: { label: label(p, "Last updated"), value: field(p, "Last updated") },
    sections: sections(p) as SourceSection[],
    buttons: pipe(field(p, "Buttons")),
    actions: actions(name),
  };
}
export const privacyPage = legal("privacy-policy", "Privacy Policy");
export const termsPage = legal("terms-of-use", "Terms of Use");

const nf = page("404-page");
export const notFoundPage = {
  meta: meta(nf),
  h1: field(nf, "H1"),
  text: field(nf, "Text"),
  actions: actions("404"),
};

/* ---------- Meta for every page, by URL ---------- */

export const metaByUrl: Record<string, Meta> = Object.fromEntries(
  [
    homePage.meta,
    aboutPage.meta,
    solutionsOverview.meta,
    ...solutions.map((s) => s.meta),
    industriesOverview.meta,
    ...industries.map((i) => i.meta),
    capabilitiesPage.meta,
    ourGroup.meta,
    careersPage.meta,
    contactPage.meta,
    privacyPage.meta,
    termsPage.meta,
  ].map((m) => [m.url, m]),
);

// The sitemap's routes must match the URLs in site-content.md.
// /projects/ is left out: its copy does not exist yet (open fact 72), and the route is off.
// /newsletter/confirm/ is not in the sitemap: it is reached only from the confirmation email (decision 288).
for (const url of Object.values(routes)) {
  if (url === routes.projects || url === routes.newsletterConfirm) continue;
  if (!metaByUrl[url]) throw new Error(`site-content.md has no page with URL ${url}.`);
}
