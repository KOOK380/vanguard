import "server-only";
import { actions, meta, steps } from "./shared";
import { industries } from "./industries";
import { capabilityProfiles } from "./projects";
import { cell, faqs, field, label, list, page, pipe, records, sourcePageIds } from "./source";
import type { CapabilityProfile, LinkItem, Solution, SolutionCard } from "./types";

const overview = page("solutions-overview");

const cards: SolutionCard[] = records(overview, "Card").map((r) => ({ title: cell(r["Card"] ?? ""), text: r["Sentence"] ?? "", href: cell(r["Link"] ?? "") }));

function build(id: string): Solution {
  const p = page(id);
  const m = meta(p);
  const card = cards.find((c) => c.href === m.url);
  if (!card) throw new Error(`site-content.md: no Solutions overview card links to ${m.url}.`);
  return {
    slug: m.url.split("/").filter(Boolean).pop() ?? "",
    name: p.title.replace(/^Solution: /, ""),
    card,
    meta: m,
    h1: field(p, "H1"),
    intro: field(p, "Intro"),
    deliverables: list(p, "What we deliver").map((i) => i.raw),
    steps: steps(p, "How we work"),
    industriesServed: field(p, "Industries served"),
    faqs: faqs(p),
    actions: actions(card.title),
    closingBandHeading: field(p, "Closing band H2"),
  };
}

/** The nine solution pages, in the order of site-content.md. */
export const solutions: Solution[] = sourcePageIds("solution-").map(build);

export const solutionsOverview = {
  meta: meta(overview),
  h1: field(overview, "H1"),
  intro: field(overview, "Intro"),
  cards,
  buttons: pipe(field(overview, "Buttons")),
  actions: actions("Solutions overview"),
};

/** Home card order (site-content.md, Page layouts), by card title: the first sentence of the field. */
const homeOrder = (field(page("page-layouts"), "Home card order").split(". ")[0] ?? "").split(", ");
export const solutionsHomeOrder: Solution[] = homeOrder.map((title) => {
  const s = solutions.find((x) => x.card.title === title);
  if (!s) throw new Error(`site-content.md: Home card order names "${title}", which has no card.`);
  return s;
});

export function solutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

/** Captions shared by every solution page, looked up so that a renamed label fails the build. */
const first = page(sourcePageIds("solution-")[0] ?? "");
export const solutionLabels = {
  deliver: label(first, "What we deliver"),
  steps: label(first, "How we work"),
  industriesServed: label(first, "Industries served"),
  faqs: label(first, "FAQs"),
};

const norm = (t: string) => t.toLowerCase().replace(/&/g, "and").replace(/[.\s]+$/, "").trim();

/**
 * "Oil and gas, water and wastewater, district cooling, power and infrastructure." as links to the
 * industry pages, keeping the copy's own words. Null when any part is not an industry page, as on
 * IT Consultancy and Audio/Visual Integration; those pages show the sentence as written.
 */
export function industriesServedLinks(s: Solution): LinkItem[] | null {
  const parts = s.industriesServed.split(", ");
  const items = parts.map((part) => {
    const match = industries.find((i) => norm(i.card.title) === norm(part));
    return match ? { label: part.replace(/\.$/, ""), href: match.meta.url } : null;
  });
  return items.every((i): i is LinkItem => i !== null) ? items : null;
}

/** The capability profile whose Related line links to this solution, if any. */
export function relatedProfile(s: Solution): CapabilityProfile | undefined {
  return capabilityProfiles.items.find((p) => p.related.some((r) => r.href === s.meta.url));
}
