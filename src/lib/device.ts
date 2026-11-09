/**
 * Whether this device may load WebGL (CLAUDE.md, "3D never blocks content"). Everyone else keeps
 * the still image, and downloads no 3D code:
 * - phones: under 768 px, or a coarse pointer
 * - low-power devices: Save-Data, 4 or fewer CPU cores, or 4 GB or less of memory
 * - prefers-reduced-motion: reduce
 * - no WebGL
 */
export function canRun3D(): boolean {
  if (typeof window === "undefined") return false;
  if (!window.matchMedia("(min-width: 48rem) and (pointer: fine)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) <= 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return false;
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") ?? c.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    return false;
  }
  return true;
}

/** Runs fn once the page has loaded and the main thread is idle, so 3D never competes with content. */
export function whenIdleAfterLoad(fn: () => void): () => void {
  let cancelled = false;
  let idle: number | undefined;
  const run = () => {
    if (cancelled) return;
    const ric = window.requestIdleCallback;
    idle = ric ? ric(fn, { timeout: 2000 }) : window.setTimeout(fn, 200);
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", run);
    if (idle !== undefined) (window.cancelIdleCallback ?? window.clearTimeout)(idle);
  };
}
