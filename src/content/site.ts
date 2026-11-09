import "server-only";
import { routes } from "@/lib/routes";
import { company } from "./company";
import { industries as industryPages } from "./industries";
import { footerCopy, headerCopy, newsletterCopy, phoneBarCopy } from "./pages";
import { caseStudies, PROJECTS_IN_MENU_FROM, projectsCopy } from "./projects";
import { solutions as solutionPages } from "./solutions";

/**
 * Navigation and contact data for the header, footer and phone action bar. All words come from the
 * content layer (decision 259); this file only joins them to routes.
 */

export { isLive } from "@/lib/routes";

export const contact = {
  phoneDisplay: company.phone.display,
  phoneHref: company.phone.href,
  email: company.email.display,
  emailHref: company.email.href,
  address: company.address,
} as const;

/**
 * WhatsApp is shown only once a number is confirmed (decision 72, open fact 69). Set
 * WHATSAPP_NUMBER to the full international number, digits only, such as 9715XXXXXXXX.
 */
export function whatsappHref(): string | null {
  const n = process.env.WHATSAPP_NUMBER?.trim();
  return n && /^\d{8,15}$/.test(n) ? `https://wa.me/${n}` : null;
}

export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; href: string; overviewLabel: string; items: NavItem[] };

// Menu words are matched to routes by the label used in site-content.md.
const routeFor: Record<string, string> = {
  Home: routes.home,
  About: routes.about,
  Solutions: routes.solutions,
  Industries: routes.industries,
  Capabilities: routes.capabilities,
  "Our Group": routes.ourGroup,
  Careers: routes.careers,
  Contact: routes.contact,
  "Privacy Policy": routes.privacy,
  "Terms of Use": routes.terms,
};
function to(label: string): string {
  const href = routeFor[label];
  if (!href) throw new Error(`No route for menu item "${label}".`);
  return href;
}

export const solutions: NavGroup = {
  label: "",
  href: routes.solutions,
  overviewLabel: headerCopy.solutionsLink,
  items: solutionPages.map((s) => ({ label: s.name, href: s.meta.url })),
};
export const industries: NavGroup = {
  label: "",
  href: routes.industries,
  overviewLabel: headerCopy.industriesLink,
  items: industryPages.map((i) => ({ label: i.name, href: i.meta.url })),
};

/** Main menu in the order of site-content.md. */
export const mainMenu: (NavItem | NavGroup)[] = headerCopy.menu.map((label) => {
  if (to(label) === routes.solutions) return { ...solutions, label };
  if (to(label) === routes.industries) return { ...industries, label };
  return { label, href: to(label) };
});
solutions.label = mainMenu.find((m) => m.href === routes.solutions)?.label ?? "";
// Projects joins the menu, after Capabilities, from three published case studies (decision 281).
if (caseStudies.length >= PROJECTS_IN_MENU_FROM) {
  const at = mainMenu.findIndex((m) => m.href === routes.capabilities) + 1;
  mainMenu.splice(at, 0, { label: projectsCopy.menuLabel, href: routes.projects });
}
industries.label = mainMenu.find((m) => m.href === routes.industries)?.label ?? "";

export const quote = { label: headerCopy.button, barLabel: phoneBarCopy.getQuote, href: routes.contact } as const;

export const phoneBar = phoneBarCopy;

export const a11y = { ...headerCopy.names, skipLink: headerCopy.skipLink, logoAlt: headerCopy.logoAlt, breadcrumb: headerCopy.breadcrumb } as const;

/** A page's navigation label by route, for breadcrumbs: from the main menu, then the footer lists. */
export function menuLabel(href: string): string {
  const item = mainMenu.find((m) => m.href === href) ?? footer.company.items.find((m) => m.href === href) ?? footer.legal.find((m) => m.href === href);
  if (!item) throw new Error(`No menu or footer item for ${href}.`);
  return item.label;
}

export function isGroup(item: NavItem | NavGroup): item is NavGroup {
  return "items" in item;
}

/** Footer columns. "Cookie settings" is left out until the cookie banner exists (decision 258). */
export const footer = {
  company: { heading: footerCopy.companyHeading, items: footerCopy.company.map((label) => ({ label, href: to(label) })) },
  solutionsHeading: footerCopy.solutionsHeading,
  industriesHeading: footerCopy.industriesHeading,
  legal: footerCopy.legal.filter((l) => routeFor[l]).map((label) => ({ label, href: to(label) })),
  copyright: footerCopy.copyright,
};

/**
 * Social accounts. None is known: the current site's icons have no links, and searches found no
 * account (open fact 28). Add confirmed profiles here, with the platform name as the label.
 */
export const social: NavItem[] = [];

export const newsletter = newsletterCopy;

/**
 * The newsletter is held until its content is settled (open fact 64). It shows in development, and
 * in production only once Resend, its segment and the confirmation-link secret are set (decision 288).
 */
export function newsletterEnabled(): boolean {
  const e = process.env;
  const ready = Boolean(e.RESEND_API_KEY && e.RESEND_FROM && (e.RESEND_SEGMENT_ID || e.RESEND_AUDIENCE_ID) && e.NEWSLETTER_TOKEN_SECRET);
  return process.env.NODE_ENV !== "production" || ready;
}
