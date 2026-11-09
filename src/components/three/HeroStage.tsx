"use client";

import dynamic from "next/dynamic";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { canRun3D, whenIdleAfterLoad } from "@/lib/device";

// Loaded only on capable devices, after the page is usable (CLAUDE.md, decision 265).
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false, loading: () => null });

type HeroStageProps = {
  /** The still image, server-rendered. It is the fallback, and stays until the model is drawn. */
  children: ReactNode;
  labels: { pause: string; play: string };
};

/**
 * Holds the hero still and, on capable desktops, the live model on top of it. The still is the
 * Largest Contentful Paint element and the fallback: while the scene loads, if it is too slow, or
 * if WebGL fails, the still is what shows. When the model is drawn, the canvas fades in over 320 ms
 * and the still fades out. The pause button sits outside the canvas, because the model moves for
 * longer than 5 seconds (CLAUDE.md, Motion).
 */
export function HeroStage({ children, labels }: HeroStageProps) {
  const [enabled, setEnabled] = useState(false);
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!canRun3D()) return;
    return whenIdleAfterLoad(() => setEnabled(true));
  }, []);

  // If reduced motion is turned on, or the window narrows under 768 px, go back to the still.
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

  const onReady = useCallback(() => setLive(true), []);
  const onFallback = useCallback(() => {
    setLive(false);
    setEnabled(false);
  }, []);

  return (
    <div className="group/hero relative" data-3d={live ? "on" : "off"}>
      <div className="transition-opacity duration-[320ms] ease-out group-data-[3d=on]/hero:opacity-0">{children}</div>
      {enabled ? (
        <div aria-hidden="true" className="absolute inset-0 opacity-0 transition-opacity duration-[320ms] ease-out group-data-[3d=on]/hero:opacity-100">
          <HeroCanvas paused={paused} onReady={onReady} onFallback={onFallback} />
        </div>
      ) : null}
      {live ? (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="absolute end-4 top-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border-[1.5px] border-inverse-muted px-4 text-btn-sm font-semibold text-paper transition-colors duration-[120ms] ease-out hover:border-paper hover:bg-white/10 md:end-8"
        >
          {paused ? <Play aria-hidden="true" size={18} strokeWidth={1.5} /> : <Pause aria-hidden="true" size={18} strokeWidth={1.5} />}
          {paused ? labels.play : labels.pause}
        </button>
      ) : null}
    </div>
  );
}
