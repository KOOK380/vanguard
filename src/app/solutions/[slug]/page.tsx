import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, ORGANIZATION_ID, pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Phone } from "lucide-react";
import { actionHref, HeroActions } from "@/components/sections/HeroActions";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProfileCards } from "@/components/sections/ProfileCards";
import { Accordion } from "@/components/ui/Accordion";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { industriesServedLinks, relatedProfile, solutionLabels } from "@/content";
import { getSolution, getSolutions } from "@/lib/cms/data";
import { plain } from "@/content/source";
import { a11y, menuLabel } from "@/content/site";
import { isLive, routes } from "@/lib/routes";

/** The nine solution pages, prerendered at build time (decision 278). Any other slug is a 404. */
export async function generateStaticParams() {
  return (await getSolutions()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const s = await getSolution((await params).slug);
  return s ? pageMetadata(s.meta) : {};
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const s = await getSolution((await params).slug);
  if (!s) notFound();

  const L = solutionLabels;
  const served = industriesServedLinks(s);
  const profile = relatedProfile(s);
  const primaryHref = actionHref(s.actions.primary) ?? routes.contact;
  const secondaryHref = actionHref(s.actions.secondary);

  // Service structured data for the solution (decision 293): sourced facts only, provided by the
  // organisation across the UAE, which the company serves (site-content.md, About).
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.meta.description,
    url: absoluteUrl(s.meta.url),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
  };

  // FAQPage structured data, from the same questions and answers shown on the page.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: plain(f.question), acceptedAnswer: { "@type": "Answer", text: plain(f.answer) } })),
  };

  return (
    <main id="main">
      <JsonLd data={serviceSchema} />
      <PageHero
        breadcrumbLabel={a11y.breadcrumb}
        crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: menuLabel(routes.solutions), href: routes.solutions }, { label: s.name }]}
        h1={s.h1}
        intro={s.intro}
      >
        <HeroActions primary={s.actions.primary} secondary={s.actions.secondary} />
      </PageHero>

      {/* What we deliver */}
      <Section labelledBy="sol-deliver">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="sol-deliver" className="text-h2 text-(color:--heading) lg:col-span-4">
            {L.deliver}
          </h2>
          <ul className="grid gap-x-6 md:grid-cols-2 lg:col-span-8">
            {s.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-3 border-b border-hairline py-4 text-body text-ink">
                <Check aria-hidden="true" size={20} strokeWidth={2} className="mt-1 shrink-0 text-maroon-700" />
                <Rich text={d} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* How we work: three steps */}
      <Section tone="stone" labelledBy="sol-steps">
        <h2 id="sol-steps" className="mb-8 text-h2 text-(color:--heading) lg:mb-12">
          {L.steps}
        </h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {s.steps.map((step, i) => (
            <li key={step.title} className="rounded-lg border border-hairline bg-white p-6">
              <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full border-[1.5px] border-maroon-700 text-compact font-semibold text-maroon-700 tabular-nums">
                {i + 1}
              </span>
              <h3 className="mt-4 text-h5 text-maroon-900">
                <Rich text={step.title} />
              </h3>
              <p className="mt-2 text-compact text-muted">
                <Rich text={step.text} />
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Industries served, linked to the industry pages where the copy names them */}
      <Section labelledBy="sol-industries" compact>
        <h2 id="sol-industries" className="text-h4 text-(color:--heading)">
          {L.industriesServed}
        </h2>
        {served ? (
          <ul className="mt-4 flex flex-wrap gap-3">
            {served.map((i) => (
              <li key={i.href}>
                {isLive(i.href) ? (
                  <Link
                    href={i.href}
                    className="inline-flex min-h-11 items-center rounded-md border-[1.5px] border-maroon-700 px-4 text-btn-sm font-semibold text-maroon-700 transition-colors duration-[120ms] ease-out hover:bg-maroon-100"
                  >
                    {/* Sentence case for each item; the copy is one sentence in lower case. */}
                    <span className="inline-block first-letter:uppercase">{i.label}</span>
                  </Link>
                ) : (
                  <span className="inline-flex min-h-11 items-center rounded-md border border-hairline bg-white px-4 text-btn-sm text-ink">
                    <span className="inline-block first-letter:uppercase">{i.label}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 max-w-[44rem] text-body text-(color:--body)">
            <Rich text={s.industriesServed} />
          </p>
        )}
      </Section>

      {/* Related capability: the typical project profile that links to this solution */}
      <ProfileCards id="sol-profile" items={profile ? [profile] : []} />

      {/* FAQs, as native details, with FAQPage structured data */}
      {s.faqs.length ? (
        <Section labelledBy="sol-faqs">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
            <h2 id="sol-faqs" className="text-h2 text-(color:--heading) lg:col-span-4">
              {L.faqs}
            </h2>
            <Accordion
              className="lg:col-span-8"
              items={s.faqs.map((f, i) => ({ id: `faq-${i + 1}`, question: plain(f.question), answer: <Rich text={f.answer} /> }))}
            />
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
        </Section>
      ) : null}

      <CtaBand
        id="sol-closing"
        heading={s.closingBandHeading}
        primary={{ label: s.actions.primary.label, href: primaryHref }}
        secondary={{
          label: s.actions.secondary.label,
          href: secondaryHref ?? routes.capabilities,
          icon: secondaryHref?.startsWith("tel:") ? <Phone size={20} strokeWidth={1.5} /> : undefined,
        }}
      />
    </main>
  );
}
