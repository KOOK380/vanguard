import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HeroActions } from "@/components/sections/HeroActions";
import { IndustryTiles } from "@/components/sections/IndustryTiles";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { homePage, industriesOverview } from "@/content";
import { getIndustries } from "@/lib/cms/data";
import { a11y, menuLabel } from "@/content/site";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata(industriesOverview.meta);

/** Industries overview (decision 280): the six industry tiles, in the order of site-content.md. */
export default async function IndustriesPage() {
  const o = industriesOverview;
  const industries = await getIndustries();
  return (
    <main id="main">
      <PageHero
        breadcrumbLabel={a11y.breadcrumb}
        crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: menuLabel(routes.industries) }]}
        h1={o.h1}
        intro={o.intro}
      >
        <HeroActions primary={o.actions.primary} secondary={o.actions.secondary} />
      </PageHero>

      <Section tone="stone">
        <IndustryTiles items={industries} headingLevel={2} />
        <p className="mt-6 text-small text-muted">{homePage.industries.note}</p>
      </Section>
    </main>
  );
}
