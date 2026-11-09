import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { assertRealHref, isExternalHref } from "@/lib/links";

export type CardDemoState = "hover" | "active" | "focus";

type CardProps = {
  /** Makes the whole card one link. Use only when the card has one destination. */
  href?: string;
  /** Selected state, as in the 3D system list. Sets aria-current. */
  selected?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Shows a state without interaction. Only for the styleguide. */
  demoState?: CardDemoState;
};

const base = "on-light group/card block rounded-lg border border-hairline p-6 text-ink";

export function Card({ href, selected = false, as: Tag = "div", className, children, demoState }: CardProps) {
  // Background and left edge are set once here, because joined classes do not override each other.
  const selectedClasses = selected ? "border-l-2 border-l-maroon-700 bg-maroon-100" : "bg-white";
  if (href) {
    assertRealHref(href);
    const classes = cn(
      base,
      "transition-[box-shadow,border-color] duration-200 ease-out hover:border-border hover:shadow-md active:border-maroon-700 active:shadow-none",
      "data-[demo=hover]:border-border data-[demo=hover]:shadow-md data-[demo=active]:border-maroon-700",
      selectedClasses,
      className,
    );
    const shared = { className: classes, "data-demo": demoState, "aria-current": selected ? ("true" as const) : undefined };
    return isExternalHref(href) ? (
      <a href={href} {...shared}>
        {children}
      </a>
    ) : (
      <Link href={href} {...shared}>
        {children}
      </Link>
    );
  }
  return <Tag className={cn(base, selectedClasses, className)}>{children}</Tag>;
}

type CardTitleProps = { level?: 2 | 3 | 4; className?: string; children: ReactNode };

/** Card heading in the H4 style. Choose the level that keeps the page's heading order. */
export function CardTitle({ level = 3, className, children }: CardTitleProps) {
  const Heading = (`h${level}` as "h2" | "h3" | "h4");
  return <Heading className={cn("text-h4 text-maroon-900", className)}>{children}</Heading>;
}

export function CardText({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("mt-2 text-compact text-muted", className)}>{children}</p>;
}

/** The "text link" ending of a linked card. It is text, because the card itself is the link. */
export function CardLinkText({ children }: { children: ReactNode }) {
  return (
    <span className="mt-4 inline-flex items-center gap-2 font-semibold text-maroon-700 underline decoration-1 underline-offset-[3px] group-hover/card:decoration-2 group-data-[demo=hover]/card:decoration-2">
      {children}
      <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} className="transition-transform duration-200 ease-out group-hover/card:translate-x-1 group-data-[demo=hover]/card:translate-x-1" />
    </span>
  );
}
