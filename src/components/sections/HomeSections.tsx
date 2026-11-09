import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { IndustryData, SolutionData } from "@/lib/cms/data";
import { IconSlot } from "@/components/three/IconSlot";
import { IconStage } from "@/components/three/IconStage";
import { capabilitiesPhoto } from "@/content/media";
import { isLive } from "@/lib/routes";
import { CtaBand } from "./CtaBand";
import { IndustryTiles } from "./IndustryTiles";

/*
  Home sections after the hero, from the approved design (project-docs/design/home.html) and the
  content layer. All are server-rendered and static: no scroll animation, because CLAUDE.md bans
  text that fades in on scroll and decorative motion (decision 271). Only hover states move.
*/


/** A link when the route is built, otherwise the same content without a link (decision 253). */
function MaybeLink({
  href,
  className,
  children,
  iconRow = false,
}: {
  href: string;
  className: string;
  children: ReactNode;
  iconRow?: boolean;
}) {
  const row = iconRow ? { "data-icon-row": "" } : {};
  return isLive(href) ? (
    <Link href={href} className={className} {...row}>
      {children}
    </Link>
  ) : (
    <div className={className} {...row}>
      {children}
    </div>
  );
}


/* ---------- Our solutions ---------- */

type SolutionsProps = {
  heading: string;
  intro: string;
  link: string;
  linkHref: string;
  items: SolutionData[];
};

export function SolutionsSection({
  heading,
  intro,
  link,
  linkHref,
  items,
}: SolutionsProps) {
  return (
    <Section labelledBy="home-solutions">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="home-solutions" className="text-h2 text-(color:--heading)">
              {heading}
            </h2>
            <p className="mt-4 text-body text-(color:--body)">
              <Rich text={intro} />
            </p>
            <div className="mt-6">
              <TextLink href={linkHref}>{link}</TextLink>
            </div>
          </div>
        </div>
        {/* One shared canvas for the nine icons (decision 275). */}
        <div className="lg:col-span-8">
          <IconStage>
            <ul className="border-t border-hairline">
              {items.map((s) => (
                <li key={s.slug} className="border-b border-hairline">
                  <MaybeLink
                    href={s.card.href}
                    iconRow
                    className="group/row flex items-center gap-4 py-5 transition-colors duration-200 ease-out hover:bg-white md:gap-6 md:px-4"
                  >
                    <IconSlot kind={s.icon} />
                    <span className="min-w-0 flex-1">
                      <h3 className="text-h5 text-maroon-900">
                        {s.card.title}
                      </h3>
                      <span className="mt-1 block text-compact text-muted">
                        <Rich text={s.card.text} />
                      </span>
                    </span>
                    {isLive(s.card.href) ? (
                      <ArrowRight
                        aria-hidden="true"
                        size={20}
                        strokeWidth={1.5}
                        className="shrink-0 text-maroon-700 transition-transform duration-200 ease-out group-hover/row:translate-x-1"
                      />
                    ) : null}
                  </MaybeLink>
                </li>
              ))}
            </ul>
          </IconStage>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Industries we serve ---------- */

type IndustriesProps = {
  heading: string;
  intro: string;
  link: string;
  linkHref: string;
  note: string;
  items: IndustryData[];
};

export function IndustriesSection({
  heading,
  intro,
  link,
  linkHref,
  note,
  items,
}: IndustriesProps) {
  return (
    <Section tone="stone" labelledBy="home-industries">
      <SectionHeading
        id="home-industries"
        title={heading}
        intro={<Rich text={intro} />}
        aside={<TextLink href={linkHref}>{link}</TextLink>}
      />
      <IndustryTiles items={items} />
      <p className="mt-6 text-small text-muted">{note}</p>
    </Section>
  );
}

/* ---------- Why Vanguard ---------- */

export function WhySection({
  heading,
  items,
}: {
  heading: string;
  items: { title: string; text: string }[];
}) {
  return (
    <Section tone="dark" labelledBy="home-why">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-6">
        <h2
          id="home-why"
          className="text-h2 text-(color:--heading) lg:col-span-4"
        >
          {heading}
        </h2>
        <ul className="grid gap-x-6 gap-y-8 md:grid-cols-2 lg:col-span-8">
          {items.map((w) => (
            <li key={w.title} className="border-t border-inverse-muted/30 pt-4">
              <h3 className="text-h6 text-(color:--heading)">{w.title}</h3>
              <p className="mt-2 text-compact text-(color:--secondary)">
                <Rich text={w.text} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- Capabilities ---------- */

type CapabilitiesProps = {
  heading: string;
  intro: string;
  button: { label: string; href: string };
  link: string;
  linkHref: string;
  photoCaption: string;
  photoAlt: string;
};

export function CapabilitiesSection({
  heading,
  intro,
  button,
  link,
  linkHref,
  photoCaption,
  photoAlt,
}: CapabilitiesProps) {
  return (
    <Section labelledBy="home-capabilities">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-6">
          <h2 id="home-capabilities" className="text-h2 text-(color:--heading)">
            {heading}
          </h2>
          <p className="mt-4 max-w-[34em] text-body text-(color:--body)">
            <Rich text={intro} />
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            {isLive(button.href) ? (
              <Button href={button.href} variant="secondary">
                {button.label}
              </Button>
            ) : null}
            <TextLink href={linkHref}>{link}</TextLink>
          </div>
        </div>
        <figure className="lg:col-span-6">
          <Photo
            src={capabilitiesPhoto.src}
            width={capabilitiesPhoto.width}
            height={capabilitiesPhoto.height}
            sizes="(min-width: 64rem) 600px, 100vw"
            alt={photoAlt}
            className="rounded-lg"
          />
          <figcaption className="mt-2 text-small text-muted">
            {photoCaption}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

/* ---------- How we work ---------- */

type ProcessProps = {
  heading: string;
  steps: { number: number; title: string; text: string }[];
  button: { label: string; href: string | null };
};

/**
 * Five steps as a static timeline. Numbers show order only; they are not statistics. The button
 * is hidden on phones, where the action bar has the primary action (decision 208).
 */
export function ProcessSection({ heading, steps, button }: ProcessProps) {
  return (
    <Section labelledBy="home-process" className="border-t border-hairline">
      <h2
        id="home-process"
        className="mb-10 text-h2 text-(color:--heading) lg:mb-12"
      >
        {heading}
      </h2>
      <ol className="relative grid gap-8 md:grid-cols-5 md:gap-6">
        {/* The connecting line, behind the numbers, on wide screens. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-5 hidden h-px bg-hairline md:block"
        />
        {steps.map((s) => (
          <li
            key={s.number}
            className="relative flex gap-4 md:flex-col md:gap-0"
          >
            <span
              aria-hidden="true"
              className="relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-maroon-700 bg-paper text-compact font-semibold text-maroon-700 tabular-nums"
            >
              {s.number}
            </span>
            <div className="md:mt-5">
              <h3 className="text-h5 text-maroon-900">{s.title}</h3>
              <p className="mt-2 text-compact text-muted">
                <Rich text={s.text} />
              </p>
            </div>
          </li>
        ))}
      </ol>
      {button.href && isLive(button.href) ? (
        <div className="mt-10 hidden md:block">
          <Button href={button.href}>{button.label}</Button>
        </div>
      ) : null}
    </Section>
  );
}

/* ---------- Closing band ---------- */

type ClosingProps = {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  whatsapp: { label: string; href: string } | null;
  call: { label: string; href: string };
};

/** "Tell us about your system": Request a quote, and WhatsApp once a number is confirmed, otherwise Call (decision 271). */
export function ClosingBand({ heading, body, primary, whatsapp, call }: ClosingProps) {
  const secondary = whatsapp
    ? { ...whatsapp, icon: <MessageCircle size={20} strokeWidth={1.5} />, external: true }
    : { ...call, icon: <Phone size={20} strokeWidth={1.5} /> };
  return <CtaBand id="home-closing" heading={heading} body={body} primary={primary} secondary={secondary} />;
}
