import "server-only";
import { cell, field, fields, page, records, section, table, texts } from "./source";

const footer = page("global-footer");
const about = page("about");
const capabilities = page("capabilities");

const story = section(about, "Our story");
const vm = section(about, "Vision and mission");
const values = section(about, "Our values");
const standards = section(about, "Industry standards for this work");
const whatWeDo = section(capabilities, "What we do");
const details = section(capabilities, "Company details");

// "+971 2 626 8001 | info@vanguardgcc.com | 403, Cuba Cafe Building, …"
const [phone = "", email = "", address = ""] = field(footer, "Contact").split(" | ");
const standardsHead = table(standards, "Standard").head;

export const company = {
  name: field(page("global-header"), "Logo"),
  phone: { display: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
  email: { display: email, href: `mailto:${email}` },
  /** The text address. The current site's map shows another (open fact 31). */
  address,

  aboutIntro: field(about, "Intro"),
  story: { heading: story.heading, paragraphs: texts(story), link: field(story, "Link") },
  visionMission: {
    heading: vm.heading,
    items: fields(vm),
  },
  values: {
    heading: values.heading,
    items: records(values, "Value").map((r) => ({ title: cell(r["Value"] ?? ""), text: r["Sentence"] ?? "" })),
  },
  /** Published standards that cover the work. No certification is claimed (decision 184). */
  standards: {
    heading: standards.heading,
    intro: field(standards, "Intro"),
    columns: standardsHead,
    items: records(standards, "Standard").map((r) => ({ code: cell(r["Standard"] ?? ""), covers: r["Covers"] ?? "", scope: r["Related scope"] ?? "" })),
    closing: field(standards, "Closing line"),
  },
  whatWeDo: { heading: whatWeDo.heading, items: fields(whatWeDo) },
  details: { heading: details.heading, items: fields(details) },
} as const;
