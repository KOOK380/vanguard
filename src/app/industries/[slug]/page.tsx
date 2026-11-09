import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { actionHref, HeroActions } from "@/components/sections/HeroActions";
import { PageHero } from "@/components/sections/PageHero";
import { ProfileCards } from "@/components/sections/ProfileCards";
import { Photo } from "@/components/ui/Photo";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { homePage, industryLabels, relatedProfiles } from "@/content";
import { getIndustries, getIndustry } from "@/lib/cms/data";
import { industryPhotos } from "@/content/media";
import { a11y, menuLabel } from "@/content/site";
import { routes } from "@/lib/routes";

/** The six industry pages, prerendered at build time (decision 280). Unknown slugs 404 in src/proxy.ts. */
export async function generateStaticParams() {
  return (await getIndustries()).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const i = await getIndustry((await params).slug);
  return i ? pageMetadata(i.meta) : {};
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const ind = await getIndustry((await params).slug);
  if (!ind) notFound();

  const L = industryLabels;
  const local = industryPhotos[ind.slug];
  // A photo from Sanity, or the approved file in public/ with the alt text from site-content.md.
  const photo = ind.photo ?? (local ? { ...local, alt: ind.photoAlt } : undefined);
  const primaryHref = actionHref(ind.actions.primary) ?? routes.contact;
  const secondaryHref = actionHref(ind.actions.secondary) ?? routes.solutions;

  // The illustrative photo is the page's main image, so it loads first.
  const aside = photo ? (
    <figure>
      <Photo
        src={photo.src840}
        sizes="(min-width: 64rem) 500px, 100vw"
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        priority
        className="aspect-[3/2] rounded-lg object-cover"
      />
      <figcaption className="mt-2 text-small text-inverse-muted">{homePage.capabilities.photoCaption}</figcaption>
    </figure>
  ) : undefined;

  return (
    <main id="main">
      <PageHero
        breadcrumbLabel={a11y.breadcrumb}
        crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: menuLabel(routes.industries), href: routes.industries }, { label: ind.name }]}
        h1={ind.h1}
        intro={ind.intro}
        aside={aside}
      >
        <HeroActions primary={ind.actions.primary} secondary={ind.actions.secondary} />
      </PageHero>

      {/* Operator challenges: general statements from outside sources, not project experience (decision 149) */}
      <Section labelledBy="ind-challenges">
        <h2 id="ind-challenges" className="mb-8 text-h2 text-(color:--heading) lg:mb-12">
          {L.challenges}
        </h2>
        <ul className="grid gap-x-6 gap-y-8 md:grid-cols-2">
          {ind.challenges.map((c) => (
            <li key={c.title} className="border-t-2 border-maroon-700 pt-4">
              <h3 className="text-h5 text-maroon-900">
                <Rich text={c.title} />
              </h3>
              <p className="mt-2 text-body text-muted">
                <Rich text={c.text} />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* How Vanguard helps: each item ends with its link to the solution page */}
      <Section tone="stone" labelledBy="ind-helps">
        <h2 id="ind-helps" className="mb-8 text-h2 text-(color:--heading) lg:mb-12">
          {L.helps}
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {ind.helps.map((h) => (
            <li key={h.title} className="rounded-lg border border-hairline bg-white p-6">
              <h3 className="text-h5 text-maroon-900">
                <Rich text={h.title} />
              </h3>
              <p className="mt-2 text-body text-ink">
                <Rich text={h.text} linkClassName="inline-flex min-h-11 items-center font-semibold text-maroon-700 underline decoration-1 underline-offset-[3px] hover:decoration-2" />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Typical systems we deliver. The plant model section follows when it is built. */}
      <Section labelledBy="ind-systems">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
          <h2 id="ind-systems" className="text-h2 text-(color:--heading) lg:col-span-4">
            {L.systems}
          </h2>
          <ul className="grid gap-x-6 md:grid-cols-2 lg:col-span-8">
            {ind.typicalSystems.map((t) => (
              <li key={t} className="flex items-start gap-3 border-b border-hairline py-4 text-body text-ink">
                <Check aria-hidden="true" size={20} strokeWidth={2} className="mt-1 shrink-0 text-maroon-700" />
                <Rich text={t} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ProfileCards id="ind-profile" items={relatedProfiles(ind)} />

      {/* Closing band with the page's primary button as its H2 (approved page layout) */}
      <CtaBand
        id="ind-closing"
        heading={ind.actions.primary.label}
        primary={{ label: ind.actions.primary.label, href: primaryHref }}
        secondary={{ label: ind.actions.secondary.label, href: secondaryHref }}
      />
    </main>
  );
}
