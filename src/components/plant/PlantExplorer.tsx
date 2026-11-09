"use client";

import dynamic from "next/dynamic";
import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { cn } from "@/lib/cn";
import { canRun3D, whenIdleAfterLoad } from "@/lib/device";
import { HotspotMarker } from "./HotspotMarker";

// Loaded only on capable desktops, once the section nears the viewport (CLAUDE.md, decision 290).
const PlantCanvas = dynamic(() => import("@/components/three/PlantCanvas"), { ssr: false, loading: () => null });

export type PlantZone = {
  slug: string;
  /** Model group, such as "zone-oil-gas". */
  zone: string;
  /** Empty node holding the hotspot position, such as "hotspot-oil-gas". */
  anchor: string;
  label: string;
  /** The industry page, or null if it is not built. */
  href: string | null;
  text: string;
  solutions: { label: string; href: string }[];
  typical: string;
  /** The enquiry form with the industry's sector selected. */
  talkHref: string;
  /** Position on the still image, in per cent. */
  still: { x: number; y: number };
};

export type PlantCopy = { intro: string; caption: string; talk: string; solutions: string; typical: string };

// next/image's attributes for the still, in AVIF with a WebP fallback, sized to its slot (decision 292).
const { props: still } = getImageProps({ src: "/images/3d/plant-still-780.webp", width: 780, height: 520, alt: "", unoptimized: true, loading: "lazy" });
const stillSet = (ext: string) => `/images/3d/plant-still-780.${ext} 780w, /images/3d/plant-still-1400.${ext} 1400w`;
const stillSizes = "(min-width: 80rem) 840px, (min-width: 64rem) 62vw, 100vw";

const noop = () => () => {};
/** False on the server and during hydration, true after: hotspots are links until then. */
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

/**
 * The interactive plant (decision 290). Everyone gets the still image with HTML hotspots on top,
 * in a list that works by keyboard and screen reader; without JavaScript they are links to the
 * industry pages. On capable desktops (not phones, low-power devices, reduced motion or no WebGL),
 * the live model loads once the section nears the viewport and replaces the still when drawn; if
 * it is slow or fails, the still returns. Selecting a hotspot opens the side panel and, in 3D,
 * moves the camera to the zone. Escape closes it and returns focus to the hotspot.
 */
export function PlantExplorer({ id, zones, copy, size }: { id: string; zones: PlantZone[]; copy: PlantCopy; size: "full" | "compact" }) {
  const hydrated = useHydrated();
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [live, setLive] = useState(false);
  const zone = zones.find((z) => z.slug === selected) ?? null;
  const panelId = `${id}-panel`;

  // Start the model only on capable devices, near the viewport, once the page is idle.
  useEffect(() => {
    const el = stage.current;
    if (!el || !canRun3D()) return;
    let cancelIdle: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        cancelIdle = whenIdleAfterLoad(() => setEnabled(true));
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelIdle?.();
    };
  }, []);

  // Back to the still if reduced motion is turned on or the window narrows under 768 px.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 48rem) and (pointer: fine)");
    const check = () => {
      if (reduced.matches || !desktop.matches) {
        setLive(false);
        setEnabled(false);
      }
    };
    reduced.addEventListener("change", check);
    desktop.addEventListener("change", check);
    return () => {
      reduced.removeEventListener("change", check);
      desktop.removeEventListener("change", check);
    };
  }, []);

  const select = useCallback((slug: string | null) => {
    if (slug) opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(slug);
  }, []);

  // Focus moves to the panel when it opens, so screen readers announce it.
  useEffect(() => {
    if (selected) heading.current?.focus({ preventScroll: window.matchMedia("(min-width: 64rem)").matches });
  }, [selected]);

  // Escape closes the panel from anywhere in the section, including the 3D hotspots, which drei
  // renders outside React's tree, so this listens on the DOM.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !selected) return;
      e.preventDefault();
      const back = opener.current;
      setSelected(null);
      if (back?.isConnected) back.focus();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [selected]);

  const onReady = useCallback(() => setLive(true), []);
  const onFallback = useCallback(() => {
    setLive(false);
    setEnabled(false);
  }, []);

  const stageCols = size === "full" ? "lg:col-span-8" : "lg:col-span-7";
  const panelCols = size === "full" ? "lg:col-span-4" : "lg:col-span-5";

  return (
    <div ref={root} className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <figure ref={stage} className={cn("relative self-start", stageCols)} data-3d={live ? "on" : "off"}>
        <div className="group/plant relative aspect-[3/2] overflow-hidden rounded-lg border border-hairline bg-stone-100" data-3d={live ? "on" : "off"}>
          <picture>
            <source type="image/avif" srcSet={stillSet("avif")} sizes={stillSizes} />
            <source type="image/webp" srcSet={stillSet("webp")} sizes={stillSizes} />
            {/* The still's content is in the hotspot list over it and the panel beside it, so it is
                decorative here, beside its visible caption (decision 290). */}
            <img
              {...still}
              srcSet={stillSet("webp")}
              sizes={stillSizes}
              alt=""
              className="absolute inset-0 size-full object-cover transition-opacity duration-[320ms] ease-out group-data-[3d=on]/plant:opacity-0"
            />
          </picture>

          {enabled ? (
            // inert until drawn, so its hotspots are not a second set of tab stops beside the still's.
            <div inert={!live} className="absolute inset-0 opacity-0 transition-opacity duration-[320ms] ease-out group-data-[3d=on]/plant:opacity-100">
              <PlantCanvas zones={zones} selected={selected} panelId={panelId} onSelect={select} onReady={onReady} onFallback={onFallback} />
            </div>
          ) : null}

          {/* HTML hotspots on the still. Hidden once the live model, with its own hotspots, is drawn. */}
          <ul className="absolute inset-0 group-data-[3d=on]/plant:hidden">
            {zones.map((z) => (
              <li key={z.slug} className="absolute" style={{ insetInlineStart: `${z.still.x}%`, top: `${z.still.y}%` }}>
                <HotspotMarker
                  label={z.label}
                  selected={selected === z.slug}
                  panelId={panelId}
                  href={hydrated ? undefined : (z.href ?? undefined)}
                  onSelect={() => select(selected === z.slug ? null : z.slug)}
                />
              </li>
            ))}
          </ul>
        </div>
        <figcaption className="absolute start-3 bottom-3">
          <Badge variant="neutral">{copy.caption}</Badge>
        </figcaption>
      </figure>

      <div id={panelId} className={cn("rounded-lg border border-hairline bg-white p-6 lg:self-start", panelCols)} aria-live="polite">
        {zone ? (
          <div>
            <h3 ref={heading} tabIndex={-1} className="text-h4 text-maroon-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon-700">
              {zone.href ? (
                <Link href={zone.href} className="inline-flex items-start gap-2 py-1 underline-offset-[3px] hover:underline">
                  {zone.label}
                  <ArrowRight aria-hidden="true" size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-maroon-700" />
                </Link>
              ) : (
                zone.label
              )}
            </h3>
            <p className="mt-3 text-compact text-ink">
              <Rich text={zone.text} />
            </p>
            {zone.solutions.length ? (
              <>
                <h4 className="mt-6 text-eyebrow uppercase text-gold-800">{copy.solutions}</h4>
                <ul className="mt-1">
                  {zone.solutions.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="inline-flex min-h-11 items-center gap-2 text-compact font-medium text-maroon-700 underline decoration-1 underline-offset-[3px] hover:decoration-2">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {zone.typical ? (
              <>
                <h4 className="mt-5 text-eyebrow uppercase text-gold-800">{copy.typical}</h4>
                <p className="mt-2 text-compact text-ink">
                  <Rich text={zone.typical} />
                </p>
              </>
            ) : null}
            <Button href={zone.talkHref} size="sm" className="mt-6">
              {copy.talk}
            </Button>
          </div>
        ) : (
          <p className="text-compact text-muted">
            <Rich text={copy.intro} />
          </p>
        )}
      </div>
    </div>
  );
}
