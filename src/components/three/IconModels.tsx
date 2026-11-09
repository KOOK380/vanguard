"use client";

import { useMemo, type ReactNode } from "react";
import { BoxGeometry, CylinderGeometry, EdgesGeometry, LineBasicMaterial, MeshStandardMaterial, TorusGeometry, type BufferGeometry } from "three";
import type { SolutionIconKind } from "@/components/icons/SolutionIcons";

/*
  Low-poly solution icons (decision 275). Matte only, one shared material per colour, from the 3D
  palette in design-system.md: the darkest structure colour stands in for "charcoal", which is not
  a token. Thin gold-500 lines mark the edges. Each model fits a unit box around the origin.
*/

const mat = (color: string) => new MeshStandardMaterial({ color, roughness: 0.92, metalness: 0 });
const M = {
  dark: mat("#8F857E"),
  mid: mat("#B4ABA1"),
  light: mat("#CFC8BF"),
  pipe: mat("#571926"),
  screen: mat("#3B181E"),
  gold: mat("#E19950"),
};
const edgeMat = new LineBasicMaterial({ color: "#E19950" });

type V3 = [number, number, number];

/** A mesh with gold lines on its hard edges (angles over 30°). */
function Part({ geo, m = M.dark, p = [0, 0, 0], r = [0, 0, 0], edges = true }: { geo: BufferGeometry; m?: MeshStandardMaterial; p?: V3; r?: V3; edges?: boolean }) {
  const edgeGeo = useMemo(() => (edges ? new EdgesGeometry(geo, 30) : null), [geo, edges]);
  return (
    <group position={p} rotation={r}>
      <mesh geometry={geo} material={m} />
      {edgeGeo ? <lineSegments geometry={edgeGeo} material={edgeMat} /> : null}
    </group>
  );
}

const box = (w: number, h: number, d: number) => new BoxGeometry(w, h, d);
const cyl = (r: number, h: number, seg = 16, r2 = r) => new CylinderGeometry(r2, r, h, seg);
const torus = (R: number, t: number, arc = Math.PI * 2) => new TorusGeometry(R, t, 6, 20, arc);
const X: V3 = [Math.PI / 2, 0, 0];

function Gear() {
  const teeth = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);
  return (
    <group rotation={X}>
      <Part geo={cyl(0.62, 0.28, 16)} />
      {teeth.map((a) => (
        <Part key={a} geo={box(0.22, 0.28, 0.22)} p={[Math.cos(a) * 0.72, 0, Math.sin(a) * 0.72]} r={[0, -a, 0]} />
      ))}
      <Part geo={cyl(0.2, 0.32, 12)} m={M.pipe} />
    </group>
  );
}

function Gauge() {
  return (
    <group>
      <Part geo={cyl(0.72, 0.2, 20)} m={M.light} r={X} />
      <Part geo={torus(0.72, 0.07)} m={M.dark} p={[0, 0, 0.1]} edges={false} />
      <Part geo={box(0.07, 0.5, 0.05)} m={M.pipe} p={[0.14, 0.16, 0.14]} r={[0, 0, -0.75]} edges={false} />
      <Part geo={cyl(0.1, 0.06, 12)} m={M.gold} p={[0, 0, 0.13]} r={X} edges={false} />
      <Part geo={box(0.34, 0.3, 0.3)} p={[0, -0.85, 0]} />
    </group>
  );
}

function Reel() {
  return (
    <group rotation={X}>
      <Part geo={cyl(0.75, 0.08, 20)} p={[0, 0.3, 0]} />
      <Part geo={cyl(0.75, 0.08, 20)} p={[0, -0.3, 0]} />
      <Part geo={cyl(0.5, 0.52, 20)} m={M.pipe} edges={false} />
      <Part geo={cyl(0.16, 0.7, 12)} m={M.mid} />
    </group>
  );
}

function Hook() {
  return (
    <group position={[0, 0.1, 0]}>
      <Part geo={cyl(0.04, 0.5, 8)} m={M.mid} p={[0, 0.75, 0]} edges={false} />
      <Part geo={box(0.5, 0.36, 0.3)} p={[0, 0.38, 0]} />
      <Part geo={cyl(0.07, 0.34, 10)} m={M.dark} p={[0, 0.04, 0]} />
      <Part geo={torus(0.3, 0.08, Math.PI * 1.5)} m={M.gold} p={[0.0, -0.46, 0]} r={[0, 0, Math.PI * 0.75]} edges={false} />
    </group>
  );
}

function Clipboard() {
  return (
    <group rotation={[-0.2, 0, 0]}>
      <Part geo={box(1.1, 1.45, 0.08)} />
      <Part geo={box(0.92, 1.15, 0.02)} m={M.light} p={[0, -0.08, 0.05]} edges={false} />
      <Part geo={box(0.46, 0.18, 0.12)} m={M.pipe} p={[0, 0.7, 0.04]} />
      {[0.18, -0.08, -0.34].map((y) => (
        <Part key={y} geo={box(0.6, 0.04, 0.02)} m={M.mid} p={[0, y, 0.07]} edges={false} />
      ))}
    </group>
  );
}

function Wrench() {
  return (
    <group rotation={[0, 0, -0.7]}>
      <Part geo={box(0.22, 1.2, 0.12)} p={[0, -0.25, 0]} />
      <Part geo={torus(0.26, 0.1, Math.PI * 1.45)} m={M.dark} p={[0, 0.55, 0]} r={[0, 0, -Math.PI * 0.22]} />
      <Part geo={cyl(0.13, 0.14, 10)} m={M.gold} p={[0, -0.85, 0]} r={X} edges={false} />
    </group>
  );
}

function Plc() {
  return (
    <group>
      <Part geo={box(1.0, 1.25, 0.55)} m={M.light} />
      <Part geo={box(1.0, 0.18, 0.6)} p={[0, 0.55, 0]} />
      <Part geo={box(1.0, 0.18, 0.6)} p={[0, -0.55, 0]} />
      {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
        <Part key={x} geo={box(0.1, 0.1, 0.04)} m={i === 1 ? M.gold : M.pipe} p={[x, 0.2, 0.29]} edges={false} />
      ))}
      <Part geo={box(0.7, 0.3, 0.04)} m={M.screen} p={[0, -0.12, 0.29]} edges={false} />
    </group>
  );
}

function Monitor() {
  return (
    <group position={[0, 0.15, 0]}>
      <Part geo={box(1.4, 0.9, 0.08)} />
      <Part geo={box(1.26, 0.76, 0.02)} m={M.screen} p={[0, 0, 0.05]} edges={false} />
      <Part geo={box(0.5, 0.03, 0.02)} m={M.gold} p={[-0.2, 0.05, 0.07]} r={[0, 0, 0.5]} edges={false} />
      <Part geo={cyl(0.06, 0.4, 8)} m={M.mid} p={[0, -0.65, 0]} edges={false} />
      <Part geo={box(0.6, 0.06, 0.34)} p={[0, -0.86, 0]} />
    </group>
  );
}

function Speaker() {
  return (
    <group>
      <Part geo={box(0.9, 1.5, 0.7)} />
      <Part geo={cyl(0.3, 0.06, 18)} m={M.screen} p={[0, -0.3, 0.36]} r={X} edges={false} />
      <Part geo={cyl(0.1, 0.08, 12)} m={M.gold} p={[0, -0.3, 0.38]} r={X} edges={false} />
      <Part geo={cyl(0.15, 0.06, 14)} m={M.screen} p={[0, 0.4, 0.36]} r={X} edges={false} />
    </group>
  );
}

const models: Record<SolutionIconKind, () => ReactNode> = {
  gear: Gear,
  gauge: Gauge,
  reel: Reel,
  hook: Hook,
  clipboard: Clipboard,
  wrench: Wrench,
  plc: Plc,
  monitor: Monitor,
  speaker: Speaker,
};

export function IconModel({ kind }: { kind: SolutionIconKind }) {
  const Model = models[kind];
  return <Model />;
}
