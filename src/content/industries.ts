import "server-only";
import { actions, meta, steps } from "./shared";
import { capabilityProfiles } from "./projects";
import { cell, field, label, list, page, pipe, records, sourcePageIds, type SourcePage } from "./source";
import type { CapabilityProfile, Hotspot, Industry, SolutionCard } from "./types";

const overview = page("industries-overview");

const cards: SolutionCard[] = records(overview, "Card").map((r) => ({ title: cell(r["Card"] ?? ""), text: r["Sentence"] ?? "", href: cell(r["Link"] ?? "") }));

/** The six plant model hotspots (site-content.md, 3D plant model hotspots). */
export const hotspots: Hotspot[] = records(page("3d-plant-hotspots"), "Hotspot label").map((r) => ({
  label: r["Hotspot label"] ?? "",
  // "`zone-oil-gas`: process columns…" gives the model group name.
  zone: (r["Model area"] ?? "").match(/^`([^`]+)`/)?.[1] ?? "",
  text: r["Text (25 words)"] ?? "",
  href: cell(r["Link"] ?? ""),
}));

/** "See it on the model (H2), and 3D plant hotspot (25 words)": the H2 is the label's first part. */
function modelField(p: SourcePage): { heading: string } {
  const b = p.blocks.find((x) => x.kind === "field" && x.label.includes(" (H2)"));
  if (!b || b.kind !== "field") throw new Error(`site-content.md: no model heading on "${p.title}".`);
  return { heading: b.label.split(" (H2)")[0] ?? "" };
}

function build(id: string): Industry {
  const p = page(id);
  const m = meta(p);
  const card = cards.find((c) => c.href === m.url);
  const hotspot = hotspots.find((h) => h.href === m.url);
  if (!card || !hotspot) throw new Error(`site-content.md: missing card or hotspot for ${m.url}.`);
  return {
    slug: m.url.split("/").filter(Boolean).pop() ?? "",
    name: p.title.replace(/^Industry: /, ""),
    card,
    meta: m,
    h1: field(p, "H1"),
    intro: field(p, "Intro"),
    photoAlt: field(p, "Photo alt text"),
    challenges: steps(p, "Operator challenges"),
    helps: steps(p, "How Vanguard helps"),
    typicalSystems: list(p, "Typical systems we deliver").map((i) => i.raw),
    actions: actions(card.title),
    modelHeading: modelField(p).heading,
    hotspot,
  };
}

/** The six industry pages, in the order of site-content.md. */
export const industries: Industry[] = sourcePageIds("industry-").map(build);

export const industriesOverview = {
  meta: meta(overview),
  h1: field(overview, "H1"),
  intro: field(overview, "Intro"),
  cards,
  buttons: pipe(field(overview, "Buttons")),
  actions: actions("Industries overview"),
};

export function industryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

/** Captions shared by every industry page, looked up so that a renamed label fails the build. */
const firstIndustry = page(sourcePageIds("industry-")[0] ?? "");
export const industryLabels = {
  challenges: label(firstIndustry, "Operator challenges"),
  helps: label(firstIndustry, "How Vanguard helps"),
  systems: label(firstIndustry, "Typical systems we deliver"),
};

/** The capability profiles whose Related line links to this industry. Power & Infrastructure has two. */
export function relatedProfiles(i: Industry): CapabilityProfile[] {
  return capabilityProfiles.items.filter((p) => p.related.some((r) => r.href === i.meta.url));
}
