"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const MIN_FPS = 20;
const SLOW_SECONDS = 3;

/** Falls back to the still if the frame rate stays under 20 fps for 3 seconds (CLAUDE.md). */
export function FpsGuard({ onSlow }: { onSlow: () => void }) {
  const s = useRef({ frames: 0, time: 0, slow: 0 });
  useFrame((_, delta) => {
    if (delta > 0.5) return; // resuming after a pause, not a slow frame
    const a = s.current;
    a.frames += 1;
    a.time += delta;
    if (a.time < 1) return;
    a.slow = a.frames / a.time < MIN_FPS ? a.slow + 1 : 0;
    a.frames = 0;
    a.time = 0;
    if (a.slow >= SLOW_SECONDS) onSlow();
  });
  return null;
}
