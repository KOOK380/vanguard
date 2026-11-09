import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { HeroActions } from "@/components/sections/HeroActions";
import { PageHero } from "@/components/sections/PageHero";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { ourGroup } from "@/content";
import { a11y, menuLabel } from "@/content/site";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata(ourGroup.meta);

// The Park logo may appear on this page only (decision 114). It sits beside the business name, so alt="".
const logos: Record<string, { src: string; width: number; height: number }> = {
  "The Park Hospitality": { src: "/logos/group/the-park-hotel.webp", width: 361, height: 240 },
};

/**
 * Our Group (decision 281): one card per business. No links, because no website address is known
 * for any of them (open fact 73). The three hotels are named in The Park Hospitality's entry, which
 * is the only copy for them. Nothing claims ownership (open facts 4 and 36).
 */
export default function OurGroupPage() {
  const g = ourGroup;
  return (
    <main id="main">
      <PageHero
        breadcrumbLabel={a11y.breadcrumb}
        crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: menuLabel(routes.ourGroup) }]}
        h1={g.h1}
        intro={g.intro}
      >
        <HeroActions primary={g.actions.primary} secondary={g.actions.secondary} />
      </PageHero>

      <Section>
        <ul className="grid gap-6 md:grid-cols-2">
          {g.businesses.map((b) => {
            const logo = logos[b.name];
            return (
              <li key={b.name} className="flex flex-col rounded-lg border border-hairline bg-white p-6 lg:p-8">
                {/* Shown 64 px tall, so next/image is given that size and serves 1x and 2x files (decision 292). */}
                {logo ? <Image src={logo.src} alt="" width={Math.round((64 * logo.width) / logo.height)} height={64} className="mb-5 h-16 w-auto self-start" /> : null}
                <h2 className="text-h4 text-maroon-900">{b.name}</h2>
                <p className="mt-3 text-body text-ink">
                  <Rich text={b.text} />
                </p>
              </li>
            );
          })}
        </ul>
      </Section>
    </main>
  );
}
