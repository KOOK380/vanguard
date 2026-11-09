import type { Metadata } from "next";
import { company } from "@/content";

/**
 * Search and sharing metadata (decision 293, keyword-plan.md). Every page uses its approved title
 * from site-content.md exactly as written ("absolute"), because each already ends with the brand;
 * the layout's "%s | Vanguard Technology" template covers any page without one.
 */

/** The canonical origin. The current site lives at vanguardgcc.com without www (current-site.md). */
export const SITE_URL = (process.env.SITE_URL?.trim() || "https://vanguardgcc.com").replace(/\/+$/, "");
export const SITE_NAME = company.name;
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

type PageMeta = { url: string; title: string; description?: string; noindex?: boolean };

/** The key of a page's branded share image at /og/<key>/, built by src/app/og/[key]/route.tsx. */
export function ogKey(url: string): string {
  const parts = url.split("/").filter(Boolean);
  if (!parts.length) return "home";
  return parts.join("--");
}

/** Title, description, canonical, Open Graph, Twitter card and robots for a page. */
export function pageMetadata(meta: PageMeta): Metadata {
  const image = { url: `/og/${ogKey(meta.url)}/`, width: 1200, height: 630, alt: meta.title };
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: meta.url },
    openGraph: {
      type: "website",
      url: meta.url,
      siteName: SITE_NAME,
      locale: "en_GB",
      title: meta.title,
      description: meta.description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [image.url] },
    ...(meta.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Inline Markdown ([text](url), **bold**, `code`) as plain text, for structured data. */
export function plainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** The address split for structured data: "403, Cuba Cafe Building, PO Box 36864, …, Abu Dhabi, UAE". */
export function postalAddress(address: string) {
  const parts = address.split(", ");
  const box = parts.find((p) => /^PO Box /.test(p));
  const country = parts.at(-1);
  const city = parts.at(-2);
  const street = parts.slice(0, -2).filter((p) => p !== box).join(", ");
  return {
    "@type": "PostalAddress",
    streetAddress: street,
    postOfficeBoxNumber: box?.replace(/^PO Box /, ""),
    addressLocality: city,
    addressCountry: country === "UAE" ? "AE" : country,
  };
}

/** Serialises JSON-LD safely inside a script tag. */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
