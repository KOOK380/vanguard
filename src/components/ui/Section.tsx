import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * light: paper. stone: the stone band behind Industries and the plant model.
 * dark: maroon-900, as for Why Vanguard. band: maroon-700, as for closing bands.
 */
export type SectionTone = "light" | "stone" | "dark" | "band";

type SectionProps = {
  tone?: SectionTone;
  /** ID of the section's heading, for aria-labelledby. */
  labelledBy?: string;
  id?: string;
  /** Leave out the inner Container, for full-bleed content. */
  bleed?: boolean;
  /** Smaller vertical padding, for bands and strips. */
  compact?: boolean;
  className?: string;
  children: ReactNode;
};

const tones: Record<SectionTone, string> = {
  light: "on-light bg-paper",
  stone: "on-light bg-stone-100",
  dark: "on-dark bg-maroon-900",
  band: "on-dark bg-maroon-700",
};

export function Section({ tone = "light", labelledBy, id, bleed = false, compact = false, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(tones[tone], "text-(color:--body)", compact ? "py-12 lg:py-16" : "py-16 lg:py-24", className)}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
