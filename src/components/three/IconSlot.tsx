"use client";

import { useEffect, useRef } from "react";
import { SolutionIcon, type SolutionIconKind } from "@/components/icons/SolutionIcons";
import { useIcon3D } from "./IconStage";

const SCROLL_QUIET_MS = 200;

/**
 * One solution icon: the SVG, server-rendered, and on capable desktops its 3D model drawn over the
 * tile by the shared canvas. The SVG fades out once the canvas has drawn. Hovering or focusing the
 * row turns the model once; nothing moves otherwise. A row that passes under a still pointer while
 * the page scrolls does not count as a hover (decision 295).
 */
export function IconSlot({ kind }: { kind: SolutionIconKind }) {
  const { enabled, ready, register, turn } = useIcon3D();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tile = ref.current;
    if (!tile || !enabled) return;
    register(kind, tile);
    return () => register(kind, null);
  }, [enabled, kind, register]);

  useEffect(() => {
    const row = ref.current?.closest<HTMLElement>("[data-icon-row]");
    if (!row || !enabled) return;
    let lastScroll = -Infinity;
    const onScroll = () => {
      lastScroll = performance.now();
    };
    const hover = () => {
      if (performance.now() - lastScroll > SCROLL_QUIET_MS) turn(kind);
    };
    const focus = () => turn(kind);
    window.addEventListener("scroll", onScroll, { passive: true });
    row.addEventListener("pointerenter", hover);
    row.addEventListener("focusin", focus);
    return () => {
      window.removeEventListener("scroll", onScroll);
      row.removeEventListener("pointerenter", hover);
      row.removeEventListener("focusin", focus);
    };
  }, [enabled, kind, turn]);

  const live = enabled && ready;
  return (
    <span ref={ref} className="relative inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-maroon-700 md:size-16">
      <SolutionIcon kind={kind} className={`size-7 transition-opacity duration-[320ms] ease-out md:size-9 ${live ? "opacity-0" : "opacity-100"}`} />
    </span>
  );
}
