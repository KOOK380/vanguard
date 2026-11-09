import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { Section } from "@/components/ui/Section";
import { isLive } from "@/lib/routes";

type Action = { label: string; href: string; icon?: ReactNode; external?: boolean };

/** body is optional: most solution pages have no closing band text yet (open fact 68). */
type CtaBandProps = { id: string; heading: string; body?: string; primary: Action; secondary: Action };

/**
 * The closing band on maroon-700 (approved design). Gold primary, which is allowed on maroon, and a
 * dark secondary. The primary is hidden on phones, where the action bar has it (decision 208).
 */
export function CtaBand({ id, heading, body, primary, secondary }: CtaBandProps) {
  return (
    <Section tone="band" labelledBy={id} compact>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div>
          <h2 id={id} className="text-h3 text-(color:--heading)">
            {heading}
          </h2>
          {body ? (
            <p className="mt-2 text-body text-(color:--body)">
              <Rich text={body} />
            </p>
          ) : null}
        </div>
        {/* Buttons wrap rather than overflow when two long labels meet a long heading (decision 292). */}
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap lg:max-w-[50%] lg:justify-end">
          {isLive(primary.href) ? (
            <div className="hidden md:block">
              <Button href={primary.href} variant="gold" onDark leadingIcon={primary.icon}>
                {primary.label}
              </Button>
            </div>
          ) : null}
          {isLive(secondary.href) ? (
            <Button
              href={secondary.href}
              variant="secondary"
              onDark
              leadingIcon={secondary.icon}
              className="w-full md:w-auto"
              {...(secondary.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
