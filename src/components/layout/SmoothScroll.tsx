"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Lenis smooth scrolling for mouse wheels (decision 255).
 * - Never starts with prefers-reduced-motion: reduce, and stops if it is turned on later.
 * - Skips coarse pointers and Save-Data, so touch scrolling stays fully native.
 * - Loaded with a dynamic import after hydration, so it is not in the first-load bundle.
 * - Native scrolling stays in control: no touch syncing, and anchors (the skip link) jump natively,
 *   so focus moves as normal.
 * - Menus and other popovers scroll on their own.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    let lenis: Lenis | null = null;
    let cancelled = false;

    const stop = () => {
      lenis?.destroy();
      lenis = null;
    };
    const start = async () => {
      if (lenis || reduced.matches || coarse.matches || saveData) return;
      const { default: LenisClass } = await import("lenis");
      if (cancelled || reduced.matches || lenis) return;
      lenis = new LenisClass({
        autoRaf: true,
        anchors: false,
        syncTouch: false,
        stopInertiaOnNavigate: true,
        allowNestedScroll: true,
        prevent: (node) => node.closest("[popover], dialog, [data-lenis-prevent]") !== null,
      });
    };
    const onChange = () => (reduced.matches || coarse.matches ? stop() : void start());

    void start();
    reduced.addEventListener("change", onChange);
    coarse.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      reduced.removeEventListener("change", onChange);
      coarse.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
