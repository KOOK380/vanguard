import Image from "next/image";
import { cn } from "@/lib/cn";

type PhotoProps = {
  src: string;
  /** The width the photo takes on screen at each breakpoint, so next/image picks the right file. */
  sizes: string;
  width: number;
  height: number;
  /**
   * Descriptive alt text from the content layer. Empty only for an illustration beside its own
   * visible label (CLAUDE.md).
   */
  alt: string;
  className?: string;
  /** For the page's main image: eager, with high fetch priority. */
  priority?: boolean;
};

/**
 * An illustrative photo, served through next/image (CLAUDE.md, decision 292): resized for the slot
 * and the screen, as AVIF or WebP, lazy below the fold, with explicit dimensions so it causes no
 * layout shift. Photos from Sanity pass through the same optimiser (cdn.sanity.io is allowed in
 * next.config.ts).
 */
export function Photo({ src, sizes, width, height, alt, className, priority = false }: PhotoProps) {
  return (
    <Image
      src={src}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={cn("h-auto w-full", className)}
    />
  );
}
