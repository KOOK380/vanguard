import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SolutionIcon } from "@/components/icons/SolutionIcons";
import { HeroActions } from "@/components/sections/HeroActions";
import { PageHero } from "@/components/sections/PageHero";
import { PlantSection } from "@/components/sections/PlantSection";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { solutionsOverview } from "@/content";
import { getSolutions } from "@/lib/cms/data";
import { a11y, menuLabel } from "@/content/site";
import { isLive, routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata(solutionsOverview.meta);

/** Solutions overview (decision 278): the nine solution cards, then the interactive plant (decision 290). */
export default async function SolutionsPage() {
  const o = solutionsOverview;
  const solutions = await getSolutions();
  return (
    <main id="main">
      <PageHero
        breadcrumbLabel={a11y.breadcrumb}
        crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: menuLabel(routes.solutions) }]}
        h1={o.h1}
        intro={o.intro}
      >
        <HeroActions primary={o.actions.primary} secondary={o.actions.secondary} />
      </PageHero>

      <Section>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => {
            const c = s.card;
            const kind = s.icon;
            const inner = (
              <>
                <span className="inline-flex size-16 items-center justify-center rounded-lg bg-stone-100 text-maroon-700">
                  <SolutionIcon kind={kind} className="size-9" />
                </span>
                <h2 className="mt-5 flex items-start justify-between gap-3 text-h5 text-maroon-900">
                  {c.title}
                  {isLive(c.href) ? (
                    <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-maroon-700 transition-transform duration-200 ease-out group-hover/card:translate-x-1" />
                  ) : null}
                </h2>
                <p className="mt-2 text-compact text-muted">
                  <Rich text={c.text} />
                </p>
              </>
            );
            const box = "group/card flex h-full flex-col rounded-lg border border-hairline bg-white p-6 transition-[box-shadow,border-color] duration-200 ease-out";
            return (
              <li key={c.href}>
                {isLive(c.href) ? (
                  <Link href={c.href} className={`${box} hover:border-border hover:shadow-md`}>
                    {inner}
                  </Link>
                ) : (
                  <div className={box}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>
      <PlantSection id="solutions-plant" />
    </main>
  );
}
