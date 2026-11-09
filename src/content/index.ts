import "server-only";

/**
 * The content layer (decision 259). Pages and components read copy from here, never as literals.
 * The root layout imports this file, so every module is evaluated on every build: copy that is
 * missing from site-content.md fails the build, even for pages not built yet.
 */
export { company } from "./company";
export { solutions, solutionsOverview, solutionsHomeOrder, solutionBySlug, solutionLabels, industriesServedLinks, relatedProfile } from "./solutions";
export { industries, industriesOverview, industryBySlug, hotspots, industryLabels, relatedProfiles } from "./industries";
export { caseStudies, capabilityProfiles, caseStudyText, caseStudyLabels, projectsCopy, caseStudyBySlug, PROJECTS_IN_MENU_FROM } from "./projects";
export type { CaseStudyRecord, Vacancy } from "./cms";

import { loadVacancies } from "./cms";
/** Published vacancies from content/careers/ (decision 281). None now, so Careers shows its empty state. */
export const vacancies = loadVacancies();
export { teamSection } from "./team";
export { partners } from "./partners";
export { stats, proofPoints } from "./stats";
export { deliveryProcess, enquiryProcess, applicationProcess } from "./process";
export { ourGroup } from "./our-group";
export {
  headerCopy,
  phoneBarCopy,
  footerCopy,
  cookieCopy,
  newsletterCopy,
  enquiryFormCopy,
  homePage,
  aboutPage,
  capabilitiesPage,
  careersPage,
  contactPage,
  privacyPage,
  termsPage,
  notFoundPage,
  metaByUrl,
} from "./pages";
export type * from "./types";
