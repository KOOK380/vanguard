import { getSiteSettings } from "@/lib/cms/data";
import { absoluteUrl, ORGANIZATION_ID, postalAddress, SITE_URL } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/**
 * Organization structured data on every page (decision 293), with only sourced facts: the name,
 * site, logo, phone, email and address from the site settings. No social profiles exist (open fact
 * 28), so there is no sameAs.
 */
export async function OrganizationJsonLd() {
  const site = await getSiteSettings();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: site.name,
        url: SITE_URL,
        logo: absoluteUrl("/logos/vanguard-logo-512.png"),
        telephone: site.phone.display.replace(/\s/g, ""),
        email: site.email.display,
        address: postalAddress(site.address),
      }}
    />
  );
}
