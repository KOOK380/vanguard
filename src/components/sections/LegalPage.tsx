import { notFound } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import type { Action } from "@/content";
import type { Block, SourceSection } from "@/content/source";
import { a11y, menuLabel } from "@/content/site";
import { isLive, legalPagesApproved, routes } from "@/lib/routes";

type LegalProps = {
  href: string;
  h1: string;
  notice: string;
  lastUpdated: { label: string; value: string };
  sections: SourceSection[];
  actions: { primary: Action; secondary: Action };
};

function BlockView({ b }: { b: Block }) {
  switch (b.kind) {
    case "text":
      return (
        <p className="mt-4 text-body text-ink">
          <Rich text={b.text} />
        </p>
      );
    case "field":
      return (
        <p className="mt-4 text-body text-ink">
          <strong className="font-semibold">{b.label}</strong>
          <span className="block">
            <Rich text={b.value} />
          </span>
        </p>
      );
    case "list": {
      const List = b.ordered ? "ol" : "ul";
      return (
        <List className={`mt-4 ps-6 text-body text-ink marker:text-maroon-700 ${b.ordered ? "list-decimal" : "list-disc"}`}>
          {b.items.map((i) => (
            <li key={i.raw} className="py-1">
              <Rich text={i.raw} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <div role="region" aria-label={b.head[0]} tabIndex={0} className="mt-6 overflow-x-auto rounded-lg border border-hairline">
          <table className="w-full min-w-[40rem] border-collapse bg-white text-start text-compact">
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th key={h} scope="col" className="border-b border-hairline bg-stone-100 px-4 py-3 text-start font-semibold text-maroon-900">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r.join("|")} className="border-b border-hairline last:border-b-0">
                  {r.map((cell, i) => {
                    const Cell = i === 0 ? "th" : "td";
                    return (
                      <Cell key={i} scope={i === 0 ? "row" : undefined} className="px-4 py-3 align-top text-start font-normal text-ink">
                        <Rich text={cell} />
                      </Cell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "caption":
      return <p className="mt-4 text-body font-semibold text-ink">{b.text}</p>;
    case "faq":
      return null;
  }
}

/**
 * Privacy Policy and Terms of Use (decision 281), rendered from their sections as written. Both
 * are templates awaiting legal review (open fact 63) and still contain square-bracket placeholders,
 * so in production they are off, as a 404, until legalPagesApproved is set in src/lib/routes.ts.
 * The template notice stays visible until written legal approval.
 */
export function LegalPage({ href, h1, notice, lastUpdated, sections, actions }: LegalProps) {
  if (process.env.NODE_ENV === "production" && !legalPagesApproved) notFound();
  const primary = actions.primary.href;
  const secondary = actions.secondary.href;
  return (
    <main id="main">
      <PageHero breadcrumbLabel={a11y.breadcrumb} crumbs={[{ label: menuLabel(routes.home), href: routes.home }, { label: menuLabel(href) }]} h1={h1}>
        <p className="flex flex-wrap gap-x-2 text-small text-inverse-muted">
          <span>{lastUpdated.label}</span>
          <span>
            <Rich text={lastUpdated.value} />
          </span>
        </p>
      </PageHero>
      <Section>
        <div className="max-w-[47.5rem]">
          <p role="note" className="mb-10 flex items-start gap-3 rounded-md border border-gold-800 bg-gold-100 p-4 text-compact font-semibold text-gold-900">
            <CircleAlert aria-hidden="true" size={20} strokeWidth={2} className="mt-0.5 shrink-0" />
            <Rich text={notice} />
          </p>
          {sections.map((s) => {
            const id = `legal-${s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            return (
              <section key={s.heading} aria-labelledby={id} className="mt-10 first:mt-0">
                <h2 id={id} className="text-h4 text-(color:--heading)">
                  {s.heading}
                </h2>
                {s.blocks.filter((b) => !(b.kind === "field" && b.label === "Buttons")).map((b, i) => (
                  <BlockView key={i} b={b} />
                ))}
              </section>
            );
          })}
          <div className="mt-12 flex flex-col gap-4 md:flex-row">
            {primary && isLive(primary) ? (
              <Button href={primary} variant="secondary">
                {actions.primary.label}
              </Button>
            ) : null}
            {secondary && isLive(secondary) ? (
              <Button href={secondary} variant="ghost">
                {actions.secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Section>
    </main>
  );
}
