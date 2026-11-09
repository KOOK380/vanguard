import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Used for aria-labelledby on the section. */
  id: string;
  title: ReactNode;
  eyebrow?: ReactNode;
  intro?: ReactNode;
  /** Keep headings in page order. H2 by default. */
  level?: 2 | 3;
  /** Content beside the heading on wide screens, such as a "View all" link. */
  aside?: ReactNode;
  className?: string;
};

export function SectionHeading({ id, title, eyebrow, intro, level = 2, aside, className }: SectionHeadingProps) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className={cn("mb-8 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-8", className)}>
      <div className="max-w-[47.5rem]">
        {eyebrow ? <p className="mb-3 text-eyebrow uppercase text-(color:--eyebrow)">{eyebrow}</p> : null}
        <Heading id={id} className={cn(level === 2 ? "text-h2" : "text-h3", "text-(color:--heading)")}>
          {title}
        </Heading>
        {intro ? <div className="mt-4 text-lead text-pretty text-(color:--body)">{intro}</div> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
