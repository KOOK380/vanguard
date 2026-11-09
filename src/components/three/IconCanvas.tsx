"use client";

import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { MathUtils, PerspectiveCamera, Scene, type Group } from "three";
import type { SolutionIconKind } from "@/components/icons/SolutionIcons";
import { IconModel } from "./IconModels";

const TURN_MS = 800; // the longest motion token, for 3D moves
const CLEAR = 1;
const DRAW = 2;

/** One turn, eased, each time `turns` goes up. It asks for frames only while it moves. */
function Spinner({ kind, turns }: { kind: SolutionIconKind; turns: number }) {
  const g = useRef<Group>(null);
  const anim = useRef({ from: 0, to: 0, start: 0 });
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const a = anim.current;
    a.from = g.current?.rotation.y ?? 0;
    a.to = turns * Math.PI * 2;
    a.start = performance.now();
    invalidate();
  }, [turns, invalidate]);

  useFrame(() => {
    const a = anim.current;
    if (!g.current || g.current.rotation.y === a.to) return;
    const t = Math.min(1, (performance.now() - a.start) / TURN_MS);
    // cubic-bezier(.4,0,.2,1) is close to smootherstep for a full turn.
    const e = t * t * t * (t * (t * 6 - 15) + 10);
    g.current.rotation.y = MathUtils.lerp(a.from, a.to, e);
    if (t < 1) invalidate();
  });

  return (
    <group ref={g}>
      <IconModel kind={kind} />
    </group>
  );
}

/** Clears the whole canvas before the icons are drawn, so no earlier frame can remain. */
function Clear() {
  useFrame(({ gl }) => {
    gl.autoClear = false;
    gl.setScissorTest(false);
    gl.clear(true, true);
  }, CLEAR);
  return null;
}

/**
 * Draws one icon into its tile's rectangle of the shared canvas. The canvas and the tile are
 * measured together, in the same frame, so the page's scroll position cancels out and the icon is
 * in the right place even while the page is moving (decision 295).
 */
function Icon({ kind, tile, turns }: { kind: SolutionIconKind; tile: HTMLElement; turns: number }) {
  const scene = useMemo(() => new Scene(), []);
  const camera = useMemo(() => {
    const c = new PerspectiveCamera(30, 1, 0.1, 50);
    c.position.set(2.2, 1.7, 3.6);
    c.lookAt(0, 0, 0);
    return c;
  }, []);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => invalidate(), [invalidate]);

  useFrame(({ gl }) => {
    const box = gl.domElement.getBoundingClientRect();
    const r = tile.getBoundingClientRect();
    if (!r.width) return;
    const left = r.left - box.left;
    const bottom = box.bottom - r.bottom;
    gl.setViewport(left, bottom, r.width, r.height);
    gl.setScissor(left, bottom, r.width, r.height);
    gl.setScissorTest(true);
    gl.render(scene, camera);
    gl.setScissorTest(false);
  }, DRAW);

  return createPortal(
    <>
      <hemisphereLight args={["#ffffff", "#CBBFB2", 2.1]} />
      <directionalLight color="#FFF4E8" intensity={1.75} position={[-3, 4, 3]} />
      <Spinner kind={kind} turns={turns} />
    </>,
    scene,
  );
}

type IconCanvasProps = {
  tiles: Partial<Record<SolutionIconKind, HTMLElement>>;
  turns: Partial<Record<SolutionIconKind, number>>;
  onReady: () => void;
  onFallback: () => void;
};

/**
 * The one canvas for every solution icon. It covers the solution list and scrolls with it, and
 * draws only on demand: once when the icons mount, on resize, and during a hover turn. It takes no
 * pointer events, so the rows and page scrolling are untouched.
 */
export default function IconCanvas({ tiles, turns, onReady, onFallback }: IconCanvasProps) {
  const box = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(Boolean(e?.isIntersecting)));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const icons = Object.entries(tiles) as [SolutionIconKind, HTMLElement][];

  return (
    <div ref={box} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Canvas
        flat
        // R3F sets pointer-events: auto on its wrapper, so the canvas must opt out itself.
        style={{ pointerEvents: "none" }}
        frameloop={onScreen ? "demand" : "never"}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", onFallback, { once: true });
          requestAnimationFrame(() => requestAnimationFrame(onReady));
        }}
      >
        <Clear />
        {icons.map(([kind, tile]) => (
          <Icon key={kind} kind={kind} tile={tile} turns={turns[kind] ?? 0} />
        ))}
      </Canvas>
    </div>
  );
}
