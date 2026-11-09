import { HomeHero } from "@/components/sections/HomeHero";
import { CapabilitiesSection, ClosingBand, IndustriesSection, ProcessSection, SolutionsSection, WhySection } from "@/components/sections/HomeSections";
import { PlantSection } from "@/components/sections/PlantSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { capabilitiesPage, deliveryProcess, homePage, partners, proofPoints } from "@/content";
import { getIndustries, getPartners, getSiteSettings, getSolutionsHomeOrder } from "@/lib/cms/data";
import { contactHref, routes } from "@/lib/routes";

/**
 * Home, in the order requested (decision 271): hero, trust bar, solutions, industries, the plant
 * model (decision 290, where site-content.md places it), Why Vanguard, capabilities, how we work and
 * the closing band. No stats bar, because no figure is sourced.
 */
export default async function Home() {
  const h = homePage;
  const [settings, solutionsList, industriesList, partnerList] = await Promise.all([getSiteSettings(), getSolutionsHomeOrder(), getIndustries(), getPartners()]);
  const wa = settings.whatsappHref;
  return (
    <main id="main">
      <HomeHero eyebrow={h.eyebrow} h1={h.h1} lead={h.lead} caption={h.heroCaption} alt={h.heroAlt} motionLabels={h.heroMotion} actions={h.actions} />
      <TrustBar proofPoints={proofPoints} partnersLabel={partners.label} partners={partnerList} />
      <SolutionsSection heading={h.solutions.heading} intro={h.solutions.intro} link={h.solutions.link} linkHref={routes.solutions} items={solutionsList} />
      <IndustriesSection heading={h.industries.heading} intro={h.industries.intro} link={h.industries.link} linkHref={routes.industries} note={h.industries.note} items={industriesList} />
      {/* Same stone band as Industries above, so a hairline separates them. */}
      <PlantSection id="home-plant" size="compact" className="border-t border-hairline" />
      <WhySection heading={h.why.heading} items={h.why.items} />
      <CapabilitiesSection
        heading={h.capabilities.heading}
        intro={h.capabilities.intro}
        button={{ label: h.capabilities.button, href: contactHref(capabilitiesPage.actions.primary.prefill) }}
        link={h.capabilities.link}
        linkHref={routes.capabilities}
        photoCaption={h.capabilities.photoCaption}
        photoAlt={h.capabilities.photoAlt}
      />
      <ProcessSection heading={deliveryProcess.heading} steps={deliveryProcess.steps} button={h.actions.primary} />
      <ClosingBand
        heading={h.closing.heading}
        body={h.closing.body}
        primary={{ label: h.closing.primary, href: routes.contact }}
        whatsapp={wa ? { label: h.closing.whatsapp, href: wa } : null}
        call={{ label: h.closing.call, href: settings.phone.href }}
      />
    </main>
  );
}
