import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessJourney } from "@/components/sections/ProcessJourney";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import Image from "next/image";
import { aboutPage, company, deliveryProcess, homePage, teamSection } from "@/content";
import { getTeam } from "@/lib/cms/data";
import { a11y, menuLabel } from "@/content/site";
import { contactHref, routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata(aboutPage.meta);

/**
 * About (decision 277). All copy from the content layer. No team photos until real ones are
 * supplied, no LinkedIn links because no account is known (open fact 28), and no certifications
 * section because none is verified: the industry standards grid claims no certification.
 */
export default async function AboutPage() {
  const members = await getTeam();
  const { story, visionMission, values, standards } = company;
  const [, coversHead, scopeHead] = standards.columns;

  return (
    <main id="main">
      <PageHero
        breadcrumbLabel={a11y.breadcrumb}
        crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: menuLabel(routes.about) }]}
        h1={aboutPage.h1}
        intro={aboutPage.intro}
      />

      {/* Our story */}
      <Section labelledBy="about-story">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="about-story" className="text-h2 text-(color:--heading) lg:col-span-4">
            {story.heading}
          </h2>
          <div className="max-w-[40em] lg:col-span-8">
            {story.paragraphs.map((p) => (
              <p key={p} className="mb-4 text-lead text-(color:--body) last:mb-0">
                <Rich text={p} />
              </p>
            ))}
            <div className="mt-6">
              <TextLink href={routes.ourGroup}>{story.link}</TextLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision and mission */}
      <Section tone="stone" labelledBy="about-vision">
        <h2 id="about-vision" className="mb-8 text-h2 text-(color:--heading) lg:mb-12">
          {visionMission.heading}
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {visionMission.items.map((v) => (
            <li key={v.label} className="rounded-lg border border-hairline bg-white p-6 lg:p-8">
              <h3 className="text-eyebrow uppercase text-gold-800">{v.label}</h3>
              <p className="mt-3 text-h4 text-maroon-900">
                <Rich text={v.value} />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Our values */}
      <Section labelledBy="about-values">
        <h2 id="about-values" className="mb-8 text-h2 text-(color:--heading) lg:mb-12">
          {values.heading}
        </h2>
        <ul className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {values.items.map((v) => (
            <li key={v.title} className="border-t-2 border-maroon-700 pt-4">
              <h3 className="text-h5 text-maroon-900">{v.title}</h3>
              <p className="mt-2 text-compact text-muted">
                <Rich text={v.text} />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* How we work: the pipeline journey (decision 291), with the approved steps from Home. */}
      <Section labelledBy="about-process" className="border-t border-hairline">
        <h2 id="about-process" className="mb-8 text-h2 text-(color:--heading) lg:mb-12">
          {deliveryProcess.heading}
        </h2>
        <ProcessJourney id="about-process" steps={deliveryProcess.steps} copy={{ modelCaption: homePage.plant.caption, photoNote: homePage.industries.note }} />
      </Section>

      {/* Our team. Names and titles may be out of date (open fact 8). */}
      <Section tone="stone" labelledBy="about-team">
        <div className="mb-8 max-w-[47.5rem] lg:mb-12">
          <h2 id="about-team" className="text-h2 text-(color:--heading)">
            {teamSection.heading}
          </h2>
          <p className="mt-4 text-lead text-(color:--body)">
            <Rich text={teamSection.intro} />
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {members.map((m) => (
            <li key={m.name} className="rounded-lg border border-hairline bg-white p-6">
              {/* Only a real photo, supplied through Sanity, with its alt text. None exists yet. */}
              {"photo" in m && m.photo ? <Image src={m.photo.src} alt={m.photo.alt} width={m.photo.width} height={m.photo.height} unoptimized className="mb-4 aspect-square w-24 rounded-lg object-cover" /> : null}
              <h3 className="text-h5 text-maroon-900">{m.name}</h3>
              <p className="mt-1 text-compact font-semibold text-gold-800">{m.title}</p>
              <p className="mt-3 text-compact text-muted">
                <Rich text={m.bio} />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Industry standards for this work, in place of certifications, which are not verified. */}
      <Section labelledBy="about-standards">
        <div className="mb-8 max-w-[47.5rem] lg:mb-12">
          <h2 id="about-standards" className="text-h2 text-(color:--heading)">
            {standards.heading}
          </h2>
          <p className="mt-4 text-lead text-(color:--body)">
            <Rich text={standards.intro} />
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {standards.items.map((s) => (
            <li key={s.code} className="flex flex-col rounded-lg border border-hairline bg-white p-6">
              <h3 className="text-h5 text-maroon-900">{s.code}</h3>
              <dl className="mt-3 flex flex-1 flex-col gap-3 text-compact">
                <div>
                  <dt className="sr-only">{coversHead}</dt>
                  <dd className="text-ink">
                    <Rich text={s.covers} />
                  </dd>
                </div>
                <div className="mt-auto border-t border-hairline pt-3">
                  <dt className="text-small font-semibold text-muted">{scopeHead}</dt>
                  <dd className="text-muted">
                    <Rich text={s.scope} />
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[47.5rem] text-body text-(color:--body)">
          <Rich text={standards.closing} />
        </p>
      </Section>

      <CtaBand
        id="about-closing"
        heading={aboutPage.closing.heading}
        body={aboutPage.closing.body}
        primary={{ label: aboutPage.closing.primary, href: contactHref(aboutPage.actions.primary.prefill) }}
        secondary={{ label: aboutPage.closing.secondary, href: aboutPage.actions.secondary.href ?? routes.capabilities }}
      />
    </main>
  );
}
