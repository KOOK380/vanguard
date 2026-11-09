import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconBoxProps = {
  /** A line icon. The box is decorative, so the nearby text must carry the meaning. */
  icon?: LucideIcon;
  /** Or a pre-rendered 3D icon image, with alt="" because its label sits beside it. */
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
  className?: string;
};

const boxes = { sm: "size-10", md: "size-12", lg: "size-16" };
const icons = { sm: 20, md: 24, lg: 32 };

export function IconBox({ icon: Icon, children, size = "md", onDark = false, className }: IconBoxProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg",
        boxes[size],
        Icon ? (onDark ? "bg-white/10 text-gold-500" : "bg-maroon-100 text-maroon-700") : "",
        className,
      )}
    >
      {Icon ? <Icon size={icons[size]} strokeWidth={1.5} absoluteStrokeWidth /> : children}
    </span>
  );
}
