import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Page width: 1280 px of content, with 16, 32 and 48 px margins by breakpoint. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-[calc(var(--container-content)+6rem)] px-4 md:px-8 lg:px-12", className)}>{children}</Tag>;
}
