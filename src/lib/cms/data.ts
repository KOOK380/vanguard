import "server-only";
import type { SolutionIconKind } from "@/components/icons/SolutionIcons";
import { company, phoneBarCopy, industries as contentIndustries, partners as contentPartners, privacyPage, solutions as contentSolutions, solutionsHomeOrder, teamSection, termsPage, vacancies as contentVacancies, caseStudies as contentCaseStudies } from "@/content";
import type { CaseStudyRecord, Vacancy } from "@/content";
import { solutionIconKinds, type PhotoSet } from "@/content/media";
import type { Block, SourceSection } from "@/content/source";
import type { Action, Industry, Partner, Solution, TeamMember } from "@/content/types";
import { markBuilt, routes } from "@/lib/routes";
import { imageUrl, sanityQuery, type SanityImage } from "./sanity";

/*
  GROQ queries with src/content as the fallback (decision 283). Each getter returns the same shape
  either way. Sanity is used only when it is configured and returns documents, so the site never
  shows an empty page because the dataset is new or unreachable.
*/

export type SiteImage = { src: string; alt: string; width: number; height: number };
export type SolutionData = Solution & { icon: SolutionIconKind };
/** A photo in two widths for srcset, from Sanity's image CDN (decision 285). */
export type ResponsiveImage = PhotoSet & { alt: string };
export type IndustryData = Industry & { photo?: ResponsiveImage };
export type TeamMemberData = TeamMember & { photo?: SiteImage; linkedin?: string };

type SanityAction = { label?: string; href?: string; prefill?: { request?: string; sector?: string; system?: string } };
const action = (a: SanityAction | undefined): Action => ({ label: a?.label ?? "", href: a?.href || null, prefill: { ...(a?.prefill?.request ? { request: a.prefill.request } : {}), ...(a?.prefill?.sector ? { sector: a.prefill.sector } : {}), ...(a?.prefill?.system ? { system: a.prefill.system } : {}) } });

function siteImage(img: SanityImage | undefined, width: number): SiteImage | undefined {
  const src = imageUrl(img, width);
  if (!src || !img) return undefined;
  const d = img.dimensions ?? { width, height: Math.round(width * 0.66) };
  return { src, alt: img.decorative ? "" : (img.alt ?? ""), width: width, height: Math.round((d.height / d.width) * width) };
}

/** Cropped to 3:2, the shape of the industry tiles and page photos, so no pixels are wasted. */
function responsiveImage(img: SanityImage | undefined): ResponsiveImage | undefined {
  const large = imageUrl(img, 840, 560);
  const small = imageUrl(img, 420, 280);
  if (!large || !small || !img) return undefined;
  return { src420: small, src840: large, width: 840, height: 560, alt: img.decorative ? "" : (img.alt ?? "") };
}

const imageFields = `{ ..., "dimensions": asset->metadata.dimensions }`;

/* ---------- Site settings ---------- */

export type SiteSettings = { name: string; phone: { display: string; href: string }; email: { display: string; href: string }; address: string; whatsappHref: string | null };

/** A wa.me link with the pre-filled message (decision 289), or null without a number. */
const whatsappLink = (number: string) => (number ? `https://wa.me/${number}?text=${encodeURIComponent(phoneBarCopy.whatsappMessage)}` : null);

export async function getSiteSettings(): Promise<SiteSettings> {
  const s = await sanityQuery<{ companyName?: string; phone?: string; email?: string; address?: string; whatsappNumber?: string } | null>(`*[_type == "siteSettings"][0]{ companyName, phone, email, address, whatsappNumber }`, {}, ["siteSettings"]);
  const envWa = process.env.WHATSAPP_NUMBER?.trim();
  const wa = s?.whatsappNumber || (envWa && /^\d{8,15}$/.test(envWa) ? envWa : "");
  if (!s?.phone || !s.email || !s.address) {
    return { name: company.name, phone: company.phone, email: company.email, address: company.address, whatsappHref: whatsappLink(wa) };
  }
  return {
    name: s.companyName ?? company.name,
    phone: { display: s.phone, href: `tel:${s.phone.replace(/[^\d+]/g, "")}` },
    email: { display: s.email, href: `mailto:${s.email}` },
    address: s.address,
    whatsappHref: whatsappLink(wa),
  };
}

/* ---------- Solutions ---------- */

type SanitySolution = {
  name: string; slug: string; cardTitle: string; cardText: string; homeOrder?: number; icon?: SolutionIconKind;
  metaTitle: string; metaDescription: string; h1: string; intro: string; deliverables?: string[]; steps?: { title: string; text: string }[];
  industriesServed: string; faqs?: { question: string; answer: string }[]; primaryAction?: SanityAction; secondaryAction?: SanityAction; closingBandHeading: string;
};

const solutionQuery = `*[_type == "solution" && defined(slug.current)] | order(order asc) {
  name, "slug": slug.current, cardTitle, cardText, homeOrder, icon, metaTitle, metaDescription, h1, intro, deliverables,
  steps[]{ title, text }, industriesServed, faqs[]{ question, answer }, primaryAction, secondaryAction, closingBandHeading
}`;

const fromContentSolution = (s: Solution): SolutionData => ({ ...s, icon: solutionIconKinds[s.slug as keyof typeof solutionIconKinds] ?? "gear" });

export async function getSolutions(): Promise<SolutionData[]> {
  const docs = await sanityQuery<SanitySolution[]>(solutionQuery, {}, ["solution"]);
  if (!docs?.length) return contentSolutions.map(fromContentSolution);
  return docs.map((d) => {
    const url = `${routes.solutions}${d.slug}/`;
    return {
      slug: d.slug,
      name: d.name,
      card: { title: d.cardTitle, text: d.cardText, href: url },
      meta: { url, title: d.metaTitle, description: d.metaDescription },
      h1: d.h1,
      intro: d.intro,
      deliverables: d.deliverables ?? [],
      steps: d.steps ?? [],
      industriesServed: d.industriesServed,
      faqs: d.faqs ?? [],
      actions: { primary: action(d.primaryAction), secondary: action(d.secondaryAction) },
      closingBandHeading: d.closingBandHeading,
      icon: d.icon ?? solutionIconKinds[d.slug as keyof typeof solutionIconKinds] ?? "gear",
      homeOrder: d.homeOrder,
    } as SolutionData & { homeOrder?: number };
  });
}

export async function getSolution(slug: string): Promise<SolutionData | undefined> {
  return (await getSolutions()).find((s) => s.slug === slug);
}

/** Home card order: the homeOrder field in Sanity, otherwise the order in site-content.md. */
export async function getSolutionsHomeOrder(): Promise<SolutionData[]> {
  const all = await getSolutions();
  const ordered = all.filter((s) => typeof (s as { homeOrder?: number }).homeOrder === "number");
  if (ordered.length === all.length) return [...ordered].sort((a, b) => ((a as { homeOrder?: number }).homeOrder ?? 0) - ((b as { homeOrder?: number }).homeOrder ?? 0));
  const bySlug = new Map(all.map((s) => [s.slug, s]));
  return solutionsHomeOrder.map((s) => bySlug.get(s.slug) ?? fromContentSolution(s));
}

/* ---------- Industries ---------- */

type SanityIndustry = {
  name: string; slug: string; cardTitle: string; cardText: string; photo?: SanityImage; metaTitle: string; metaDescription: string; h1: string; intro: string;
  challenges?: { title: string; text: string }[]; helps?: { title: string; text: string }[]; typicalSystems?: string[];
  primaryAction?: SanityAction; secondaryAction?: SanityAction; modelHeading?: string; hotspot?: { label?: string; zone?: string; text?: string };
};

const industryQuery = `*[_type == "industry" && defined(slug.current)] | order(order asc) {
  name, "slug": slug.current, cardTitle, cardText, photo ${imageFields}, metaTitle, metaDescription, h1, intro,
  challenges[]{ title, text }, helps[]{ title, text }, typicalSystems, primaryAction, secondaryAction, modelHeading, hotspot
}`;

export async function getIndustries(): Promise<IndustryData[]> {
  const docs = await sanityQuery<SanityIndustry[]>(industryQuery, {}, ["industry"]);
  if (!docs?.length) return contentIndustries;
  return docs.map((d) => {
    const url = `${routes.industries}${d.slug}/`;
    const fallback = contentIndustries.find((i) => i.slug === d.slug);
    return {
      slug: d.slug,
      name: d.name,
      card: { title: d.cardTitle, text: d.cardText, href: url },
      meta: { url, title: d.metaTitle, description: d.metaDescription },
      h1: d.h1,
      intro: d.intro,
      challenges: d.challenges ?? [],
      helps: d.helps ?? [],
      typicalSystems: d.typicalSystems ?? [],
      actions: { primary: action(d.primaryAction), secondary: action(d.secondaryAction) },
      modelHeading: d.modelHeading ?? fallback?.modelHeading ?? "",
      hotspot: { label: d.hotspot?.label ?? d.name, zone: d.hotspot?.zone ?? fallback?.hotspot.zone ?? "", text: d.hotspot?.text ?? "", href: url },
      photoAlt: d.photo?.alt ?? fallback?.photoAlt ?? "",
      photo: responsiveImage(d.photo),
    };
  });
}

export async function getIndustry(slug: string): Promise<IndustryData | undefined> {
  return (await getIndustries()).find((i) => i.slug === slug);
}

/* ---------- Case studies ---------- */

type SanityProject = {
  title: string; slug: string; client: string; location: string; year?: number; sector: string; systems?: string[];
  scope: string; challenge: string; solution: string; result: string; gallery?: SanityImage[]; projectState?: string; clientMayBeNamed?: boolean;
};

/** Published only with every approval recorded, as in content/case-study-template.md. */
const projectQuery = `*[_type == "project" && status == "Published" && defined(clientApproval) && defined(photoPermission) && defined(evidence) && defined(reviewedBy) && defined(reviewedDate)] | order(year desc) {
  title, "slug": slug.current, client, location, year, sector, systems, scope, challenge, solution, result, projectState, clientMayBeNamed, gallery[] ${imageFields}
}`;

export async function getCaseStudies(): Promise<CaseStudyRecord[]> {
  const docs = await sanityQuery<SanityProject[]>(projectQuery, {}, ["project"]);
  const list: CaseStudyRecord[] = docs?.length
    ? docs.map((d) => ({
        slug: d.slug,
        title: d.title,
        client: d.clientMayBeNamed ? d.client : null,
        location: d.location,
        year: d.projectState === "Completed" ? (d.year ?? null) : null,
        inProgress: d.projectState === "In progress",
        sector: d.sector,
        systems: d.systems ?? [],
        scope: d.scope,
        challenge: d.challenge,
        solution: d.solution,
        result: d.result,
        photos: (d.gallery ?? []).flatMap((g) => {
          const src = imageUrl(g, 1600);
          return src ? [{ src, alt: g.alt ?? "", caption: g.caption ?? "", credit: g.credit ?? "" }] : [];
        }),
      }))
    : contentCaseStudies;
  if (list.length) markBuilt(routes.projects, ...list.map((c) => `${routes.projects}${c.slug}/`));
  return list;
}

export async function getCaseStudy(slug: string): Promise<CaseStudyRecord | undefined> {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}

/* ---------- Team, partners, vacancies ---------- */

export async function getTeam(): Promise<TeamMemberData[]> {
  const docs = await sanityQuery<{ name: string; title: string; bio?: string; photo?: SanityImage; linkedin?: string }[]>(
    `*[_type == "teamMember"] | order(order asc) { name, title, bio, photo ${imageFields}, linkedin }`,
    {},
    ["teamMember"],
  );
  if (!docs?.length) return teamSection.members;
  return docs.map((d) => ({ name: d.name, title: d.title, bio: d.bio ?? "", photo: siteImage(d.photo, 480), linkedin: d.linkedin }));
}

export async function getPartners(): Promise<Partner[]> {
  const docs = await sanityQuery<{ name: string; logo?: SanityImage }[]>(`*[_type == "partner"] | order(order asc) { name, logo ${imageFields} }`, {}, ["partner"]);
  if (!docs?.length) return contentPartners.items;
  return docs.flatMap((d) => {
    const img = siteImage(d.logo, 400);
    return img ? [{ name: d.name, logo: { src: img.src, width: img.width, height: img.height } }] : [];
  });
}

export async function getVacancies(): Promise<Vacancy[]> {
  const docs = await sanityQuery<Vacancy[]>(`*[_type == "jobOpening" && published == true] | order(_createdAt desc) { "slug": _id, title, location, summary }`, {}, ["jobOpening"]);
  return docs?.length ? docs : contentVacancies;
}

/* ---------- Legal pages ---------- */

export type LegalData = {
  h1: string;
  meta: { title: string; description: string };
  notice: string;
  lastUpdated: { label: string; value: string };
  sections: SourceSection[];
  actions: { primary: Action; secondary: Action };
};

type SanityLegalBlock = { _type: string; text?: string; ordered?: boolean; items?: string[]; head?: string[]; rows?: string[][]; label?: string; value?: string };

function toBlock(b: SanityLegalBlock): Block | null {
  if (b._type === "paragraph" && b.text) return { kind: "text", text: b.text };
  if (b._type === "list") return { kind: "list", ordered: Boolean(b.ordered), items: (b.items ?? []).map((raw) => ({ raw })) };
  if (b._type === "table") return { kind: "table", head: b.head ?? [], rows: b.rows ?? [] };
  if (b._type === "labelled" && b.label) return { kind: "field", label: b.label, value: b.value ?? "" };
  return null;
}

export async function getLegalPage(slug: "privacy-policy" | "terms"): Promise<LegalData> {
  const fallback = slug === "terms" ? termsPage : privacyPage;
  const d = await sanityQuery<{ title: string; metaTitle: string; metaDescription: string; notice?: string; lastUpdated?: string; sections?: { heading: string; blocks?: SanityLegalBlock[] }[] } | null>(
    `*[_type == "legalPage" && slug.current == $slug][0]{ title, metaTitle, metaDescription, notice, lastUpdated, sections[]{ heading, blocks[]{ _type, text, ordered, items, head, "rows": rows[].cells, label, value } } }`,
    { slug },
    ["legalPage"],
  );
  const base = { actions: fallback.actions, lastUpdated: fallback.lastUpdated };
  if (!d?.sections?.length) return { ...base, h1: fallback.h1, meta: fallback.meta, notice: fallback.notice, sections: fallback.sections };
  return {
    ...base,
    h1: d.title,
    meta: { title: d.metaTitle, description: d.metaDescription },
    notice: d.notice ?? "",
    lastUpdated: { label: fallback.lastUpdated.label, value: d.lastUpdated ?? fallback.lastUpdated.value },
    sections: d.sections.map((s) => ({ heading: s.heading, level: 4, sections: [], blocks: (s.blocks ?? []).flatMap((b) => toBlock(b) ?? []) })),
  };
}
