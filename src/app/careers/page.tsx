import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { MapPin } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { applicationProcess, careersPage, company } from "@/content";
import { getVacancies } from "@/lib/cms/data";
import { a11y, menuLabel } from "@/content/site";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata(careersPage.meta);

/**
 * Careers (decision 281): how to apply, then the vacancies from content/careers/, or the empty
 * state when none is published. The page promises no reply (open facts 7 and 53).
 */
export default async function CareersPage() {
  const vacancies = await getVacancies();
  const c = careersPage;
  const cvHref = c.actions.primary.href ?? company.email.href;
  const aboutHref = c.actions.secondary.href ?? routes.about;

  return (
    <main id="main">
      <PageHero
        breadcrumbLabel={a11y.breadcrumb}
        crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: menuLabel(routes.careers) }]}
        h1={c.h1}
        intro={c.intro}
      />

      {/* How to apply */}
      <Section labelledBy="car-apply">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="car-apply" className="text-h2 text-(color:--heading) lg:col-span-4">
            {applicationProcess.heading}
          </h2>
          <div className="lg:col-span-8">
            <ol className="grid gap-6 md:grid-cols-3">
              {applicationProcess.steps.map((s, i) => (
                <li key={s.title} className="rounded-lg border border-hairline bg-white p-6">
                  <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full border-[1.5px] border-maroon-700 text-compact font-semibold text-maroon-700 tabular-nums">
                    {i + 1}
                  </span>
                  {/* The copy reads as one sentence: "Email your CV to info@…". */}
                  <p className="mt-4 text-body text-ink">
                    <Rich text={s.raw} />
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-compact text-muted">
              <Rich text={applicationProcess.note} />
            </p>
          </div>
        </div>
      </Section>

      {/* Current vacancies, or the empty state */}
      <Section tone="stone" labelledBy="car-vacancies">
        <h2 id="car-vacancies" className="mb-8 text-h2 text-(color:--heading)">
          {c.vacancies.heading}
        </h2>
        {vacancies.length ? (
          <ul className="grid gap-6 md:grid-cols-2">
            {vacancies.map((v) => (
              <li key={v.slug} className="rounded-lg border border-hairline bg-white p-6">
                <h3 className="text-h5 text-maroon-900">{v.title}</h3>
                <p className="mt-1 flex items-center gap-2 text-compact text-muted">
                  <MapPin aria-hidden="true" size={16} strokeWidth={1.5} />
                  {v.location}
                </p>
                <p className="mt-3 text-body text-ink">
                  <Rich text={v.summary} />
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-[47.5rem] rounded-lg border border-hairline bg-white p-6 lg:p-8">
            <p className="text-lead text-ink">
              <Rich text={c.vacancies.empty} />
            </p>
            <div className="mt-6">
              <Button href={cvHref} variant="secondary">
                {c.actions.primary.label}
              </Button>
            </div>
          </div>
        )}
      </Section>

      <CtaBand
        id="car-closing"
        heading={c.actions.primary.label}
        primary={{ label: c.actions.primary.label, href: cvHref }}
        secondary={{ label: c.actions.secondary.label, href: aboutHref }}
      />
    </main>
  );
}
