import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";
import { isLive } from "@/lib/routes";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export type Crumb = { label: string; href?: string };

type PageHeroProps = {
  /** The breadcrumb's accessible name, from the content layer. */
  breadcrumbLabel: string;
  /** From Home to the current page. The last item is the current page and has no link. */
  crumbs: Crumb[];
  h1: string;
  /** Inline Markdown from the content layer. */
  intro?: string;
  /** Buttons or other content under the intro. */
  children?: ReactNode;
  /** Content beside the text on desktop and under it on phones, such as an illustrative photo. */
  aside?: ReactNode;
};

/**
 * The hero for every page except Home (decision 277): the same dark gradient as the Home hero,
 * a breadcrumb, the page's one H1 and its intro. Server-rendered and static. Breadcrumb links are
 * at least 44 px high (CLAUDE.md), and a crumb whose page is not built shows as text.
 */
export function PageHero({ breadcrumbLabel, crumbs, h1, intro, children, aside }: PageHeroProps) {
  const last = crumbs.length - 1;
  // BreadcrumbList structured data from the same trail (decision 293). The current page, last,
  // has no link, as Google allows.
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, ...(i < last && c.href && isLive(c.href) ? { item: absoluteUrl(c.href) } : {}) })),
  };
  return (
    <section aria-labelledby="page-title" className="on-dark bg-linear-to-br from-maroon-900 to-maroon-950">
      <JsonLd data={breadcrumbs} />
      <Container className="pt-4 pb-12 lg:pt-6 lg:pb-16">
        <nav aria-label={breadcrumbLabel}>
          <ol className="flex flex-wrap items-center text-small text-inverse-muted">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center">
                {i < last && c.href && isLive(c.href) ? (
                  <Link href={c.href} className="inline-flex min-h-11 min-w-11 items-center justify-center text-paper underline decoration-1 underline-offset-[3px] hover:text-gold-500">
                    {c.label}
                  </Link>
                ) : (
                  <span className="inline-flex min-h-11 items-center" aria-current={i === last ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
                {i < last ? <ChevronRight aria-hidden="true" size={16} strokeWidth={1.5} className="mx-2 shrink-0" /> : null}
              </li>
            ))}
          </ol>
        </nav>
        <div className={aside ? "mt-6 grid items-center gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-x-6" : "mt-6 lg:mt-10"}>
          <div className={aside ? "lg:col-span-7" : "max-w-3xl"}>
            <h1 id="page-title" className="text-h1 text-(color:--heading)">
              {h1}
            </h1>
            {intro ? (
              <p className="mt-6 max-w-[34em] text-lead text-(color:--body)">
                <Rich text={intro} />
              </p>
            ) : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
