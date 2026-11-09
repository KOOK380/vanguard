import "server-only";
import { markBuilt, routes } from "@/lib/routes";
import { loadCaseStudies, type CaseStudyRecord } from "./cms";
import { field, label, links, list, maybeField, maybeSection, page, records, section, sections } from "./source";
import type { CapabilityProfile } from "./types";

/**
 * Real case studies, from the CMS files in content/projects/ (decision 281). None exists, and none
 * may be invented (CLAUDE.md, decision 163). An entry appears only when it is Published with every
 * approval recorded. /projects/ is off while the list is empty, and the menu shows Projects from
 * three entries.
 */
export const caseStudies: CaseStudyRecord[] = loadCaseStudies();
export const PROJECTS_IN_MENU_FROM = 3;
if (caseStudies.length) markBuilt(routes.projects, ...caseStudies.map((c) => `${routes.projects}${c.slug}/`));

const profilesSection = section(page("capabilities"), "Typical project profiles: The types of work we deliver");

/**
 * The six "typical project profiles" on Capabilities. They describe types of work, not completed
 * projects, and must always show their label (site-content.md, Capabilities build rules).
 */
export const capabilityProfiles = {
  /** "Typical project profiles: The types of work we deliver": eyebrow and H2. */
  eyebrow: profilesSection.heading.split(": ")[0] ?? "",
  heading: profilesSection.heading.split(": ")[1] ?? "",
  intro: field(profilesSection, "Intro"),
  label: field(profilesSection, "Label on every profile"),
  closingLine: field(profilesSection, "Closing line after the outcome on every profile"),
  items: sections(profilesSection).map((s): CapabilityProfile => {
    const [, n = "0", title = s.heading] = s.heading.match(/^(\d+)\. (.+)$/) ?? [];
    return {
      number: Number(n),
      title,
      scope: field(s, "Scope"),
      systems: list(s, "Systems involved").map((i) => i.raw),
      deliverables: list(s, "Typical deliverables").map((i) => i.raw),
      outcome: field(s, "The outcome you can expect"),
      related: links(field(s, "Related")),
    };
  }),
  labels: (() => {
    const first = sections(profilesSection)[0];
    if (!first) throw new Error("site-content.md: no capability profiles.");
    return {
      systems: label(first, "Systems involved"),
      deliverables: label(first, "Typical deliverables"),
      outcome: label(first, "The outcome you can expect"),
      related: label(first, "Related"),
    };
  })(),
};

// Words the case study page shows, quoted in the CMS template's field rules.
const cms = records(section(page("cms-case-study-template"), "Published fields"), "Field");
const quoted = (fieldName: string, n = 0) => {
  const row = cms.find((r) => r["Field"] === fieldName);
  const match = [...(row?.["Rule"] ?? "").matchAll(/"([^"]+)"/g)][n]?.[1];
  if (!match) throw new Error(`site-content.md: no quoted text in the CMS rule for ${fieldName}.`);
  return match;
};

export const caseStudyText = {
  clientWithheld: quoted("Client", 1),
  inProgress: quoted("Year", 1),
  /** "8. Call to action: Discuss a similar project (pre-filled)" in the template's page layout. */
  callToAction: (list(section(page("cms-case-study-template"), "Page layout")).at(-1)?.raw.split(": ")[1] ?? "").replace(/ \(pre-filled\)$/, ""),
};

/** Field names shown on a case study page, from the template's "Published fields" table. */
const fieldNames = new Set(cms.map((r) => r["Field"] ?? ""));
const fieldName = (name: string) => {
  if (!fieldNames.has(name)) throw new Error(`site-content.md: no "${name}" row in the case study fields.`);
  return name;
};
export const caseStudyLabels = {
  client: fieldName("Client"),
  location: fieldName("Location"),
  year: fieldName("Year"),
  sector: fieldName("Sector"),
  systems: fieldName("Systems"),
  scope: fieldName("Scope"),
  challenge: fieldName("Challenge"),
  solution: fieldName("Solution"),
  result: fieldName("Result"),
  photos: fieldName("Photos"),
};

/*
  Copy for the projects pages. It does not exist yet (open fact 72). It is expected as a
  "Projects page" section in content/case-study-template.md. Until then development shows
  bracketed placeholders, which Rich refuses in production, and a production build with a
  published project stops here.
*/
const projectsSection = maybeSection(page("cms-case-study-template"), "Projects page");
const copy = (labelName: string) => (projectsSection ? maybeField(projectsSection, labelName) : undefined);
const want = ["Menu label", "Meta title", "Meta description", "H1", "Intro", "Close button", "Previous photo button", "Next photo button"] as const;
const missingCopy = want.filter((w) => !copy(w));
if (caseStudies.length && missingCopy.length && process.env.NODE_ENV === "production") {
  throw new Error(`A case study is published, but the projects page copy is missing: ${missingCopy.join(", ")}. Add it to content/case-study-template.md (open fact 72).`);
}
const orPlaceholder = (w: (typeof want)[number]) => copy(w) ?? `[Projects page: ${w}]`;
export const projectsCopy = {
  menuLabel: orPlaceholder("Menu label"),
  metaTitle: orPlaceholder("Meta title"),
  metaDescription: orPlaceholder("Meta description"),
  h1: orPlaceholder("H1"),
  intro: orPlaceholder("Intro"),
  gallery: { close: orPlaceholder("Close button"), previous: orPlaceholder("Previous photo button"), next: orPlaceholder("Next photo button") },
};

export function caseStudyBySlug(slug: string): CaseStudyRecord | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
