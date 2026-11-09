import { getImageProps } from "next/image";
import { HeroStage } from "@/components/three/HeroStage";
import { Badge } from "@/components/ui/Badge";

type HeroVisualProps = {
  /** "Illustrative model", from the content layer. Every model carries it (CLAUDE.md). */
  caption: string;
  /** Pause and play labels for the live model, from the content layer. */
  motionLabels: { pause: string; play: string };
  /** Alt text of the still, from the content layer (decision 285). */
  alt: string;
};

/**
 * The hero's visual slot. For now it is the still render of the hero model, which is also the
 * Largest Contentful Paint element: explicit dimensions, eager, high fetch priority, and the AVIF
 * (or WebP) width that fits its slot. On capable desktops, HeroStage loads the live model over it after
 * the page is usable, and the still stays as the fallback (decisions 262 and 265).
 *
 * The still's alt text comes from site-content.md (decision 285).
 */
export function HeroVisual({ caption, motionLabels, alt }: HeroVisualProps) {
  const common = {
    alt,
    unoptimized: true,
    fetchPriority: "high" as const,
    loading: "eager" as const,
  };
  // getImageProps gives next/image's attributes to a plain img inside picture, so the stills can be
  // offered as AVIF with WebP as the fallback. Both widths are the same render, so the browser picks
  // by the slot's width (decision 292).
  const { props: img } = getImageProps({ ...common, src: "/images/3d/hero-still-780.webp", width: 780, height: 572 });
  const sizes = "(min-width: 80rem) 800px, (min-width: 64rem) 58vw, 100vw";
  const set = (ext: string) => `/images/3d/hero-still-780.${ext} 780w, /images/3d/hero-still-1400.${ext} 1400w`;
  // No preload hint: Next.js prefetches Home from every page's logo link, and React applies a preload
  // carried in that prefetch, so every page would download this image (decision 292). The img's
  // eager loading and high fetch priority are enough.

  return (
    <figure className="relative">
      <HeroStage labels={motionLabels}>
        <picture>
          <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
          <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
          <img {...img} srcSet={set("webp")} sizes={sizes} alt={alt} className="h-auto w-full" />
        </picture>
      </HeroStage>
      <figcaption className="absolute start-4 bottom-2 md:start-8 md:bottom-6">
        <Badge variant="gold">{caption}</Badge>
      </figcaption>
    </figure>
  );
}
