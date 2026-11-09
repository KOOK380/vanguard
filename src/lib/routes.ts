/**
 * Routes from the sitemap in project-docs/strategy.md. Paths are code, not copy, so they live here
 * and not in site-content.md.
 */
export const routes = {
  home: "/",
  about: "/about-us/",
  solutions: "/solutions/",
  industries: "/industries/",
  capabilities: "/capabilities/",
  ourGroup: "/our-group/",
  careers: "/careers/",
  contact: "/contact-us/",
  privacy: "/privacy-policy/",
  terms: "/terms/",
  projects: "/projects/",
  /** Opened from the newsletter confirmation email only; noindex and never linked (decision 288). */
  newsletterConfirm: "/newsletter/confirm/",
} as const;

/**
 * Routes that exist. CLAUDE.md forbids links to pages that are not built, so production builds
 * leave out every link to a route not listed here (decision 253). Development shows them all,
 * so the full menu can be reviewed. Add each route as its page is built.
 */
/** The nine solution slugs, from the sitemap. Also used by src/proxy.ts to 404 unknown slugs early. */
export const solutionSlugs = [
  "system-integration",
  "control-instrumentation-engineering",
  "automation-electrical-supply-installation",
  "turnkey-projects",
  "project-management",
  "field-services-maintenance",
  "plc-scada-design-validation",
  "it-consultancy",
  "audio-visual-integration",
];
const solutionRoutes = solutionSlugs.map((slug) => `${routes.solutions}${slug}/`);

/** The six industry slugs, from the sitemap. Also used by src/proxy.ts. */
export const industrySlugs = ["oil-gas", "water-wastewater", "district-cooling", "power-infrastructure", "hvac-building-management-systems", "safety-instrumented-systems"];
const industryRoutes = industrySlugs.map((slug) => `${routes.industries}${slug}/`);

/**
 * Set to true only after written legal approval of the Privacy Policy and Terms of Use, with every
 * square-bracket placeholder filled (open fact 63, legal build requirements in site-content.md).
 * Until then both pages work in development and stay off in production (decision 281).
 */
export const legalPagesApproved = false;
const legalRoutes = legalPagesApproved ? [routes.privacy, routes.terms] : [];

const builtRoutes = new Set<string>([
  routes.home,
  routes.about,
  routes.solutions,
  ...solutionRoutes,
  routes.industries,
  ...industryRoutes,
  routes.capabilities,
  routes.ourGroup,
  routes.careers,
  routes.contact,
  ...legalRoutes,
]);

/**
 * Marks routes as built from server code that knows they exist, such as /projects/ once a case
 * study is published. It runs at build time, before any page is rendered.
 */
export function markBuilt(...hrefs: string[]): void {
  for (const h of hrefs) builtRoutes.add(h);
}

export function isLive(href: string): boolean {
  if (!href.startsWith("/")) return true;
  const path = href.split(/[?#]/)[0] ?? href;
  return process.env.NODE_ENV !== "production" || builtRoutes.has(path);
}

/**
 * A link to the enquiry form that pre-fills fields, for buttons marked "pre-filled" in
 * site-content.md (decision 81). The form reads these query parameters (decision 272).
 */
export function contactHref(prefill: { request?: string; sector?: string; system?: string } = {}): string {
  const q = new URLSearchParams();
  if (prefill.request) q.set("request", prefill.request);
  if (prefill.sector) q.set("sector", prefill.sector);
  if (prefill.system) q.set("system", prefill.system);
  const s = q.toString();
  return s ? `${routes.contact}?${s}` : routes.contact;
}
