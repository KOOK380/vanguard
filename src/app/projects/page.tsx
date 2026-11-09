import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { caseStudyText, projectsCopy } from "@/content";
import { getCaseStudies } from "@/lib/cms/data";
import { a11y, menuLabel } from "@/content/site";
import { routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  return (await getCaseStudies()).length ? pageMetadata({ url: routes.projects, title: projectsCopy.metaTitle, description: projectsCopy.metaDescription }) : { robots: { index: false } };
}

/**
 * Projects (decision 281): real case studies from the CMS. Off, as a 404, until the first entry is
 * published (CLAUDE.md, decision 165). No case study exists now.
 */
export default async function ProjectsPage() {
  const caseStudies = await getCaseStudies();
  if (!caseStudies.length) notFound();
  return (
    <main id="main">
      <PageHero
        breadcrumbLabel={a11y.breadcrumb}
        crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: projectsCopy.menuLabel }]}
        h1={projectsCopy.h1}
        intro={projectsCopy.intro}
      />
      <Section>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((c) => {
            const cover = c.photos[0];
            return (
              <li key={c.slug}>
                <Link
                  href={`${routes.projects}${c.slug}/`}
                  className="group/card flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-white transition-[box-shadow,border-color] duration-200 ease-out hover:border-border hover:shadow-md"
                >
                  {cover ? (
                    <span className="relative block aspect-[3/2]">
                      <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 64rem) 400px, (min-width: 48rem) 50vw, 100vw" className="object-cover" />
                    </span>
                  ) : null}
                  <span className="flex flex-1 flex-col p-6">
                    <span className="text-eyebrow uppercase text-(color:--eyebrow)">{c.sector}</span>
                    <h2 className="mt-2 flex items-start justify-between gap-3 text-h5 text-maroon-900">
                      {c.title}
                      <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-maroon-700 transition-transform duration-200 ease-out group-hover/card:translate-x-1" />
                    </h2>
                    <span className="mt-2 text-compact text-muted">
                      {c.location}
                      {c.inProgress ? <span className="block">{caseStudyText.inProgress}</span> : c.year ? <span className="block tabular-nums">{c.year}</span> : null}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </main>
  );
}
