import type { MetadataRoute } from "next";
import { getCaseStudies, getIndustries, getSolutions } from "@/lib/cms/data";
import { isLive, routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

/**
 * sitemap.xml (decision 293): every page that is live in production, including the solutions,
 * industries and published case studies that come from Sanity when it is configured. Pages that are
 * off (the legal pages until approved, /projects/ until a case study is published) and noindex
 * pages (404, newsletter confirmation, Studio, styleguide) are left out. No lastmod is given,
 * because no reliable edit date exists for pages built from site-content.md.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [solutions, industries, caseStudies] = await Promise.all([getSolutions(), getIndustries(), getCaseStudies()]);
  const urls = [
    routes.home,
    routes.about,
    routes.solutions,
    ...solutions.map((s) => s.meta.url),
    routes.industries,
    ...industries.map((i) => i.meta.url),
    routes.capabilities,
    routes.ourGroup,
    routes.careers,
    routes.contact,
    ...(caseStudies.length ? [routes.projects, ...caseStudies.map((c) => `${routes.projects}${c.slug}/`)] : []),
    routes.privacy,
    routes.terms,
  ];
  return [...new Set(urls)].filter((u) => isLive(u)).map((u) => ({ url: absoluteUrl(u) }));
}
