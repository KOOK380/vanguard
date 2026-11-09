"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SolutionIconKind } from "@/components/icons/SolutionIcons";
import { canRun3D, whenIdleAfterLoad } from "@/lib/device";

const IconCanvas = dynamic(() => import("./IconCanvas"), { ssr: false, loading: () => null });

type IconState = {
  enabled: boolean;
  ready: boolean;
  /** Tells the shared canvas where an icon's tile is, or that it has gone. */
  register: (kind: SolutionIconKind, tile: HTMLElement | null) => void;
  /** Turns an icon once. */
  turn: (kind: SolutionIconKind) => void;
};
const IconContext = createContext<IconState>({ enabled: false, ready: false, register: () => {}, turn: () => {} });
export const useIcon3D = () => useContext(IconContext);

/**
 * Wraps the solution list. On capable desktops only (the hero's gates: not under 768 px, no coarse
 * pointer, no reduced motion, WebGL, more than 4 cores and 4 GB, no Save-Data), and after the page
 * is usable, it loads one shared canvas for all nine icons (decision 275). Everyone else keeps the
 * server-rendered SVG icons and downloads no 3D code.
 */
export function IconStage({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [tiles, setTiles] = useState<Partial<Record<SolutionIconKind, HTMLElement>>>({});
  const [turns, setTurns] = useState<Partial<Record<SolutionIconKind, number>>>({});

  const register = useCallback((kind: SolutionIconKind, tile: HTMLElement | null) => {
    setTiles((current) => {
      const next = { ...current };
      if (tile) next[kind] = tile;
      else delete next[kind];
      return next;
    });
  }, []);
  const turn = useCallback((kind: SolutionIconKind) => setTurns((t) => ({ ...t, [kind]: (t[kind] ?? 0) + 1 })), []);
  const context = useMemo(() => ({ enabled, ready, register, turn }), [enabled, ready, register, turn]);

  useEffect(() => {
    if (!canRun3D()) return;
    return whenIdleAfterLoad(() => setEnabled(true));
  }, []);

  // Back to the SVG icons if reduced motion is turned on, or the window narrows under 768 px.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 48rem) and (pointer: fine)");
    const check = () => {
      if (reduced.matches || !desktop.matches) {
        setReady(false);
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

  const onReady = useCallback(() => setReady(true), []);
  const onFallback = useCallback(() => {
    setReady(false);
    setEnabled(false);
  }, []);

  return (
    <IconContext.Provider value={context}>
      <div className="relative">
        {children}
        {enabled ? <IconCanvas tiles={tiles} turns={turns} onReady={onReady} onFallback={onFallback} /> : null}
      </div>
    </IconContext.Provider>
  );
}
