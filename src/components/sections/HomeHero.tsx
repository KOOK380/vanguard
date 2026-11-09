import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";
import type { Actions } from "@/content";
import { isLive } from "@/lib/routes";
import { HeroNetwork } from "./HeroNetwork";
import { HeroVisual } from "./HeroVisual";

type HomeHeroProps = { eyebrow: string; h1: string; lead: string; caption: string; alt: string; motionLabels: { pause: string; play: string }; actions: Actions };

/**
 * Home hero (decision 262). Server-rendered text on the left, so it shows before any script, and
 * the visual slot on the right. Dark gradient between two design tokens, maroon-900 and
 * maroon-950. The primary button is hidden on phones, where the action bar has it (decision 208).
 */
export function HomeHero({ eyebrow, h1, lead, caption, alt, motionLabels, actions }: HomeHeroProps) {
  const { primary, secondary } = actions;
  return (
    <section aria-labelledby="home-hero-title" className="on-dark relative isolate overflow-hidden bg-linear-to-br from-maroon-900 to-maroon-950">
      <HeroNetwork />
      <Container className="relative grid items-center gap-y-8 pt-12 lg:min-h-[38.75rem] lg:grid-cols-12 lg:gap-x-6 lg:py-16">
        {/* Above the canvas, so the turning model never covers the text. */}
        <div className="relative z-10 lg:col-span-6">
          <p className="mb-4 text-eyebrow uppercase text-(color:--eyebrow)">{eyebrow}</p>
          <h1 id="home-hero-title" className="text-h1 text-(color:--heading)">
            {h1}
          </h1>
          <p className="mt-6 max-w-[34em] text-lead text-(color:--body)">
            <Rich text={lead} />
          </p>
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:flex-wrap">
            {primary.href && isLive(primary.href) ? (
              <div className="hidden md:block">
                <Button href={primary.href} variant="gold" onDark>
                  {primary.label}
                </Button>
              </div>
            ) : null}
            {secondary.href && isLive(secondary.href) ? (
              <Button href={secondary.href} variant="secondary" onDark icon={<ArrowRight size={20} strokeWidth={1.5} />} className="w-full md:w-auto">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
        {/* The visual bleeds past the content edge on desktop, as in the approved design. */}
        <div className="-mx-4 md:-mx-8 lg:col-span-6 lg:-ms-12 lg:-me-24">
          <HeroVisual caption={caption} alt={alt} motionLabels={motionLabels} />
        </div>
      </Container>
    </section>
  );
}
