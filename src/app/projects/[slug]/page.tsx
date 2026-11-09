import type { Metadata } from "next";
import { pageMetadata, plainText, SITE_NAME } from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/sections/Gallery";
import { PageHero } from "@/components/sections/PageHero";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { caseStudyLabels, caseStudyText, enquiryFormCopy, industries, projectsCopy } from "@/content";
import { getCaseStudies, getCaseStudy } from "@/lib/cms/data";
import { a11y, menuLabel } from "@/content/site";
import { contactHref, isLive, routes } from "@/lib/routes";

/** No case study exists, so this returns a placeholder slug that 404s (Cache Components needs at least one). */
const NONE = "no-published-projects";

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.length ? caseStudies.map((c) => ({ slug: c.slug })) : [{ slug: NONE }];
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const c = await getCaseStudy((await params).slug);
  return c ? pageMetadata({ url: `/projects/${c.slug}/`, title: `${c.title} | ${SITE_NAME}`, description: plainText(c.scope).slice(0, 155) }) : { robots: { index: false } };
}

/**
 * A real case study (decision 281), in the template's order: title as H1; summary record (client,
 * location, year, sector, systems); scope; challenge; solution; result; photos with a lightbox;
 * call to action. The client shows only with written approval, otherwise "Client name withheld".
 */
export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const c = await getCaseStudy((await params).slug);
  if (!c) notFound();

  const L = caseStudyLabels;
  const industry = industries.find((i) => i.card.title === c.sector);
  // Pre-fill the form's Sector when one option matches, such as "Oil & Gas" and "Oil and gas".
  const norm = (t: string) => t.toLowerCase().replace(/&/g, "and");
  const sector = enquiryFormCopy.fields["Sector"]?.options?.find((o) => norm(o) === norm(c.sector));
  const record: { label: string; value: ReactNode }[] = [
    { label: L.client, value: c.client ?? caseStudyText.clientWithheld },
    { label: L.location, value: c.location },
    { label: L.year, value: c.inProgress ? caseStudyText.inProgress : c.year },
    {
      label: L.sector,
      value:
        industry && isLive(industry.meta.url) ? (
          <Link href={industry.meta.url} className="text-maroon-700 underline decoration-1 underline-offset-[3px] hover:decoration-2">
            {c.sector}
          </Link>
        ) : (
          c.sector
        ),
    },
    { label: L.systems, value: c.systems.join(", ") },
  ];
  const story = [
    { id: "cs-scope", label: L.scope, text: c.scope },
    { id: "cs-challenge", label: L.challenge, text: c.challenge },
    { id: "cs-solution", label: L.solution, text: c.solution },
    { id: "cs-result", label: L.result, text: c.result },
  ];

  return (
    <main id="main">
      <PageHero
        breadcrumbLabel={a11y.breadcrumb}
        crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: projectsCopy.menuLabel, href: routes.projects }, { label: c.title }]}
        h1={c.title}
      />

      <Section>
        {/* Summary record ("Project record" card) */}
        <dl className="grid gap-4 rounded-lg border border-hairline bg-white p-6 md:grid-cols-5">
          {record.map((r) => (
            <div key={r.label}>
              <dt className="text-small font-semibold text-muted">{r.label}</dt>
              <dd className="mt-1 text-compact text-ink">{r.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid max-w-[47.5rem] gap-10">
          {story.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id} className="text-h3 text-(color:--heading)">
                {s.label}
              </h2>
              <p className="mt-3 text-body text-ink">
                <Rich text={s.text} />
              </p>
            </section>
          ))}
        </div>
      </Section>

      <Section tone="stone" labelledBy="cs-photos">
        <h2 id="cs-photos" className="mb-8 text-h3 text-(color:--heading)">
          {L.photos}
        </h2>
        <Gallery photos={c.photos} labels={projectsCopy.gallery} />
      </Section>

      <CtaBand
        id="cs-closing"
        heading={caseStudyText.callToAction}
        primary={{ label: caseStudyText.callToAction, href: contactHref({ request: enquiryFormCopy.fields["Request type"]?.options?.[0], sector }) }}
        secondary={{ label: projectsCopy.menuLabel, href: routes.projects }}
      />
    </main>
  );
}
