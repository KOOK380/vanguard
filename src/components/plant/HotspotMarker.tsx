"use client";

import { cn } from "@/lib/cn";

type HotspotMarkerProps = {
  label: string;
  selected: boolean;
  /** Shows the label, as when the zone itself is hovered in the 3D scene. */
  active?: boolean;
  /** ID of the side panel the hotspot opens. */
  panelId: string;
  /** Before hydration, a link to the industry page, so the hotspot works without JavaScript. */
  href?: string;
  onSelect: () => void;
  onHover?: (over: boolean) => void;
};

/**
 * One plant hotspot, used on the still and in the 3D scene (decision 290): a 48 px target (44 px
 * plus room for the fractional offsets of 3D positioning, decision 292) with a
 * gold dot. Gold is too faint on light backgrounds to stand alone (2.25:1), so the dot has a
 * maroon-700 ring that gives it 3:1, as the header quote button does (decision 249). The label shows
 * on hover, on focus and while selected. The ring pulses three times on load, under 5 seconds, so
 * it needs no pause control, and not at all with reduced motion.
 */
export function HotspotMarker({ label, selected, active = false, panelId, href, onSelect, onHover }: HotspotMarkerProps) {
  const inner = (
    <>
      <span aria-hidden="true" className="absolute inset-0 m-auto size-4 rounded-full bg-gold-500 motion-safe:animate-plant-pulse" />
      <span
        aria-hidden="true"
        className={cn(
          "relative size-4 rounded-full border-2 border-maroon-700 shadow-sm transition-transform duration-[120ms] ease-out group-hover/spot:scale-125 group-focus-visible/spot:scale-125",
          // Selected turns the dot maroon, so the state does not rely on the gold alone.
          selected ? "scale-125 bg-maroon-700" : "bg-gold-500",
        )}
      />
      <span
        className={cn(
          "pointer-events-none absolute bottom-full start-1/2 mb-1 w-max max-w-56 -translate-x-1/2 rounded-md border border-hairline bg-white px-2 py-1 text-small font-semibold text-maroon-900 shadow-md transition-opacity duration-200 ease-out rtl:translate-x-1/2",
          selected || active ? "opacity-100" : "opacity-0 group-hover/spot:opacity-100 group-focus-visible/spot:opacity-100",
        )}
      >
        {label}
      </span>
    </>
  );
  const box =
    "group/spot relative flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full rtl:translate-x-1/2 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-maroon-700";
  if (href) {
    return (
      <a href={href} className={box} aria-label={label}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={box}
      aria-label={label}
      aria-expanded={selected}
      aria-controls={panelId}
      onClick={onSelect}
      onPointerEnter={() => onHover?.(true)}
      onPointerLeave={() => onHover?.(false)}
      onFocus={() => onHover?.(true)}
      onBlur={() => onHover?.(false)}
    >
      {inner}
    </button>
  );
}
