import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { actionHref, HeroActions } from "@/components/sections/HeroActions";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { capabilitiesPage, capabilityProfiles, company } from "@/content";
import { getPartners } from "@/lib/cms/data";
import { a11y, menuLabel } from "@/content/site";
import { isLive, routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata(capabilitiesPage.meta);

/**
 * Capabilities (decision 281), in the approved order: hero with buttons; What we do; Our Partners;
 * Company details beside Preparing a shortlist?; the typical project profiles as expanding items,
 * label always visible and the first open; closing band. Build rules: the profiles are not case
 * studies, carry the label on every profile, have no photos, and the partner logos stay apart.
 */
export default async function CapabilitiesPage() {
  const partners = await getPartners();
  const c = capabilitiesPage;
  const p = capabilityProfiles;
  const docsHref = actionHref(c.actions.primary) ?? routes.contact;
  const consultHref = actionHref(c.actions.secondary) ?? routes.contact;
  const [labelHead = "", ...rest] = p.label.split(". ");
  const labelRest = rest.join(". ");
  const detailHref: Record<string, string> = { Phone: company.phone.href, Email: company.email.href };

  return (
    <main id="main">
      <PageHero
        breadcrumbLabel={a11y.breadcrumb}
        crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: menuLabel(routes.capabilities) }]}
        h1={c.h1}
        intro={c.intro}
      >
        <HeroActions primary={c.actions.primary} secondary={c.actions.secondary} />
      </PageHero>

      {/* What we do */}
      <Section labelledBy="cap-what">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="cap-what" className="text-h2 text-(color:--heading) lg:col-span-4">
            {company.whatWeDo.heading}
          </h2>
          <dl className="divide-y divide-hairline border-y border-hairline lg:col-span-8">
            {company.whatWeDo.items.map((i) => (
              <div key={i.label} className="grid gap-1 py-4 md:grid-cols-3 md:gap-6">
                <dt className="text-compact font-semibold text-maroon-900">{i.label}</dt>
                <dd className="text-body text-ink md:col-span-2">
                  <Rich text={i.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Our Partners: logos only, apart from the profiles. Permission is unconfirmed (open fact 9). */}
      <Section tone="stone" labelledBy="cap-partners" compact>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
          <h2 id="cap-partners" className="shrink-0 text-h5 text-(color:--heading)">
            {c.partnersHeading}
          </h2>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {partners.map((pt) => (
              <li key={pt.name}>
                <Image src={pt.logo.src} alt={pt.name} width={pt.logo.width} height={pt.logo.height} unoptimized className="h-10 w-auto md:h-12" />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Company details beside Preparing a shortlist? */}
      <Section labelledBy="cap-details">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7">
            <h2 id="cap-details" className="mb-6 text-h2 text-(color:--heading)">
              {company.details.heading}
            </h2>
            <dl className="divide-y divide-hairline border-y border-hairline">
              {company.details.items.map((d) => (
                <div key={d.label} className="grid gap-1 py-4 md:grid-cols-3 md:gap-6">
                  <dt className="text-compact font-semibold text-maroon-900">{d.label}</dt>
                  <dd className="text-body text-ink md:col-span-2">
                    {detailHref[d.label] ? (
                      <a href={detailHref[d.label]} className="inline-flex min-h-11 items-center text-maroon-700 underline decoration-1 underline-offset-[3px] hover:decoration-2">
                        {d.value}
                      </a>
                    ) : (
                      <Rich text={d.value} />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <aside aria-labelledby="cap-shortlist" className="self-start rounded-lg border border-hairline bg-stone-100 p-6 lg:col-span-5 lg:p-8">
            <h2 id="cap-shortlist" className="text-h4 text-maroon-900">
              {c.shortlist.heading}
            </h2>
            <p className="mt-3 text-body text-ink">
              <Rich text={c.shortlist.text} />
            </p>
            {isLive(docsHref) ? (
              <div className="mt-6">
                <Button href={docsHref} variant="secondary">
                  {c.closing.primary}
                </Button>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>

      {/* The types of work we deliver: native details, the first open, the label in every summary */}
      <Section tone="stone" labelledBy="cap-profiles">
        <div className="max-w-[52rem]">
          <p className="mb-3 text-eyebrow uppercase text-(color:--eyebrow)">{p.eyebrow}</p>
          <h2 id="cap-profiles" className="text-h2 text-(color:--heading)">
            {p.heading}
          </h2>
          <p className="mt-4 text-lead text-(color:--body)">
            <Rich text={p.intro} />
          </p>
          <div className="mt-8 flex flex-col gap-4">
            {p.items.map((pr, i) => (
              <details key={pr.number} open={i === 0} className="group/pr rounded-lg border border-hairline bg-white">
                {/* A summary may hold phrasing content and one heading, so its parts sit directly inside it. */}
                <summary className="relative block min-h-11 cursor-pointer list-none p-6 pe-16 [&::-webkit-details-marker]:hidden">
                  <Badge variant="neutral">{labelHead}</Badge>
                  <span className="mt-1 block text-small text-muted">{labelRest}</span>
                  <h3 className="mt-3 text-h4 text-maroon-900">{pr.title}</h3>
                  <ChevronDown aria-hidden="true" size={24} strokeWidth={1.5} className="absolute end-6 top-6 text-maroon-700 transition-transform duration-200 ease-out group-open/pr:rotate-180" />
                </summary>
                <div className="border-t border-hairline px-6 pt-5 pb-6">
                  <p className="text-body text-ink">
                    <Rich text={pr.scope} />
                  </p>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {[
                      { heading: p.labels.systems, items: pr.systems },
                      { heading: p.labels.deliverables, items: pr.deliverables },
                    ].map((g) => (
                      <div key={g.heading}>
                        <h4 className="text-h6 text-maroon-900">{g.heading}</h4>
                        <ul className="mt-2 list-disc ps-5 text-compact text-ink marker:text-maroon-700">
                          {g.items.map((it) => (
                            <li key={it} className="py-0.5">
                              <Rich text={it} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <h4 className="mt-6 text-h6 text-maroon-900">{p.labels.outcome}</h4>
                  <p className="mt-1 text-compact text-ink">
                    <Rich text={pr.outcome} />
                  </p>
                  <p className="mt-2 text-compact text-muted">
                    <Rich text={p.closingLine} />
                  </p>
                  <h4 className="mt-6 text-h6 text-maroon-900">{p.labels.related}</h4>
                  <ul className="mt-1 flex flex-wrap gap-x-6">
                    {pr.related.map((r) => (
                      <li key={r.href}>
                        {isLive(r.href) ? (
                          <Link href={r.href} className="inline-flex min-h-11 items-center font-semibold text-maroon-700 underline decoration-1 underline-offset-[3px] hover:decoration-2">
                            {r.label}
                          </Link>
                        ) : (
                          <span className="inline-flex min-h-11 items-center">{r.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        id="cap-closing"
        heading={c.closing.heading}
        body={c.closing.text}
        primary={{ label: c.closing.primary, href: docsHref }}
        secondary={{ label: c.closing.secondary, href: consultHref }}
      />
    </main>
  );
}
