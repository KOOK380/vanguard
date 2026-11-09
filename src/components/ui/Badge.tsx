import { CircleAlert, CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** gold is for "Illustrative model". Never use a badge for an unsourced claim such as "Certified". */
export type BadgeVariant = "neutral" | "maroon" | "gold" | "success" | "error";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-stone-200 text-ink",
  maroon: "bg-maroon-700 text-paper",
  gold: "bg-gold-100 text-gold-900",
  success: "bg-success-100 text-success",
  error: "bg-error-100 text-error",
};

export function Badge({ variant = "neutral", className, children }: { variant?: BadgeVariant; className?: string; children: ReactNode }) {
  const Icon = variant === "success" ? CircleCheck : variant === "error" ? CircleAlert : null;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-eyebrow tracking-normal", variants[variant], className)}>
      {Icon ? <Icon aria-hidden="true" size={14} strokeWidth={2} /> : null}
      {children}
    </span>
  );
}
