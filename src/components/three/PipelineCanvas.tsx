"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { CatmullRomCurve3, MeshStandardMaterial, Vector3 } from "three";
import { cameraEase } from "./ease";

/**
 * The About page's delivery pipeline (decision 291): five stations along one process line, built
 * from simple matte shapes, with no logos, vendor hardware or readable text. The camera glides
 * along the line to the active station in 800 ms when its card reaches the middle of the screen.
 * The page scrolls normally; nothing here listens to the wheel or the scroll position. It renders
 * only on demand, so a still scene costs nothing.
 */

// design-system.md, 3D style.
const C = {
  ground: "#F0EBE5",
  light: "#CFC8BF",
  mid: "#B4ABA1",
  dark: "#8F857E",
  pipe: "#571926",
  gold: "#E19950",
  dim: "#E4DED7",
  screen: "#3B181E",
  paper: "#FBF9F6",
};
const STATIONS = [
  new Vector3(-16, 0, 2),
  new Vector3(-8, 0, -2),
  new Vector3(0, 0, 2),
  new Vector3(8, 0, -2),
  new Vector3(16, 0, 2),
];
// Far enough back to show the neighbouring stations and the line between them.
const CAMERA_OFFSET = new Vector3(8.5, 8, 13.5);
const LOOK_OFFSET = new Vector3(0, 0.9, 0);
const MOVE_SECONDS = 0.8;

type Mats = Record<keyof typeof C, MeshStandardMaterial>;

/** One shared matte material per colour (design-system.md), disposed with the scene. */
function useMaterials(): Mats {
  const mats = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(C).map(([k, v]) => [
          k,
          new MeshStandardMaterial({ color: v, roughness: 0.92, metalness: 0 }),
        ]),
      ) as Mats,
    [],
  );
  useEffect(
    () => () => Object.values(mats).forEach((m) => m.dispose()),
    [mats],
  );
  return mats;
}

type Box = [number, number, number];
const box = (
  m: MeshStandardMaterial,
  size: Box,
  pos: Box,
  rot: Box = [0, 0, 0],
) => (
  <mesh position={pos} rotation={rot} material={m}>
    <boxGeometry args={size} />
  </mesh>
);
const cyl = (
  m: MeshStandardMaterial,
  r: number,
  h: number,
  pos: Box,
  rot: Box = [0, 0, 0],
  seg = 16,
) => (
  <mesh position={pos} rotation={rot} material={m}>
    <cylinderGeometry args={[r, r, h, seg]} />
  </mesh>
);

function Stations({ active, m }: { active: number; m: Mats }) {
  return (
    <>
      {/* Plinth */}
      {box(m.ground, [80, 0.4, 48], [0, -0.2, 0])}
      {/* Pads, with a thin gold ring round the active one (decorative; the card says which step). */}
      {STATIONS.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          {cyl(m.dim, 2.4, 0.08, [0, 0.04, 0], [0, 0, 0], 32)}
          {i === active ? (
            <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m.gold}>
              <torusGeometry args={[2.45, 0.09, 8, 48]} />
            </mesh>
          ) : null}
        </group>
      ))}

      {/* 1 Consult: a control desk with two screens and a chair */}
      <group position={STATIONS[0]?.toArray()}>
        {box(m.light, [3, 0.9, 1.2], [0, 0.45, 0])}
        {box(m.dark, [0.08, 0.5, 0.08], [-0.6, 1.15, -0.3])}
        {box(m.dark, [0.08, 0.5, 0.08], [0.6, 1.15, -0.3])}
        {box(m.screen, [1, 0.65, 0.08], [-0.6, 1.6, -0.3])}
        {box(m.screen, [1, 0.65, 0.08], [0.6, 1.6, -0.3])}
        {cyl(m.dark, 0.35, 0.12, [0, 0.55, 1.1])}
        {box(m.dark, [0.7, 0.8, 0.12], [0, 1.0, 1.4])}
      </group>

      {/* 2 Design: a drawing table with a sheet, and a filing cabinet */}
      <group position={STATIONS[1]?.toArray()}>
        {box(m.mid, [0.12, 1, 0.12], [-1, 0.5, -0.6])}
        {box(m.mid, [0.12, 1, 0.12], [1, 0.5, -0.6])}
        {box(m.mid, [0.12, 1, 0.12], [-1, 0.5, 0.6])}
        {box(m.mid, [0.12, 1, 0.12], [1, 0.5, 0.6])}
        {box(m.light, [2.6, 0.1, 1.7], [0, 1.1, 0], [-0.3, 0, 0])}
        {box(m.paper, [1.8, 0.02, 1.1], [0, 1.17, 0.02], [-0.3, 0, 0])}
        {box(m.dark, [0.9, 1.3, 0.8], [1.9, 0.65, -0.4])}
      </group>

      {/* 3 Supply: crates on a pallet and a cabinet ready to ship */}
      <group position={STATIONS[2]?.toArray()}>
        {box(m.mid, [2.8, 0.2, 2], [0, 0.1, 0])}
        {box(m.light, [1.1, 1, 1], [-0.7, 0.7, -0.3])}
        {box(m.light, [1.1, 1, 1], [0.5, 0.7, 0.3])}
        {box(m.mid, [0.9, 0.8, 0.9], [-0.6, 1.6, -0.3])}
        {box(m.dark, [0.9, 2.2, 0.7], [2.1, 1.1, -0.2])}
      </group>

      {/* 4 Install: a control cabinet, a raised cable tray and a field instrument */}
      <group position={STATIONS[3]?.toArray()}>
        {box(m.light, [1.4, 2.4, 0.7], [-1, 1.2, 0])}
        {box(m.dark, [0.02, 2.2, 0.02], [-1, 1.2, 0.36])}
        {box(m.dark, [0.08, 2.8, 0.08], [-1, 1.4, -0.6])}
        {box(m.dark, [0.08, 2.8, 0.08], [1.4, 1.4, -0.6])}
        {box(m.dark, [3, 0.1, 0.45], [0.2, 2.8, -0.6])}
        {cyl(m.mid, 0.06, 1.6, [1.4, 0.8, 0.6])}
        {cyl(m.paper, 0.28, 0.12, [1.4, 1.7, 0.6], [Math.PI / 2, 0, 0], 20)}
      </group>

      {/* 5 Maintain: a motor and pump on a skid, with a valve and a gauge */}
      <group position={STATIONS[4]?.toArray()}>
        {box(m.dark, [3, 0.25, 1.2], [0, 0.125, 0])}
        {cyl(m.mid, 0.55, 1.5, [-0.5, 0.8, 0], [0, 0, Math.PI / 2], 20)}
        {cyl(m.light, 0.6, 0.5, [0.8, 0.85, 0], [Math.PI / 2, 0, 0], 20)}
        {cyl(m.pipe, 0.18, 1.2, [0.8, 1.6, 0])}
        <mesh
          position={[0.8, 2.2, 0]}
          rotation={[0, 0, Math.PI / 2]}
          material={m.dark}
        >
          <torusGeometry args={[0.3, 0.05, 8, 20]} />
        </mesh>
        {cyl(m.gold, 0.2, 0.08, [1.25, 1.2, 0.35], [Math.PI / 2, 0, 0], 20)}
      </group>
    </>
  );
}

/** The process line linking the stations, behind them. */
function Pipeline({ m }: { m: Mats }) {
  const curve = useMemo(
    () =>
      new CatmullRomCurve3(
        STATIONS.map((p) => new Vector3(p.x, 0.45, p.z - 2.6)),
      ),
    [],
  );
  return (
    <mesh material={m.pipe}>
      <tubeGeometry args={[curve, 160, 0.2, 10, false]} />
    </mesh>
  );
}

function Scene({ active }: { active: number }) {
  const m = useMaterials();
  return (
    <>
      <Stations active={active} m={m} />
      <Pipeline m={m} />
    </>
  );
}

/** Glides along the line to the active station, rendering frames only while it moves. */
function CameraRig({ active }: { active: number }) {
  const get = useThree((s) => s.get);
  const paths = useMemo(
    () => ({
      eye: new CatmullRomCurve3(
        STATIONS.map((p) => p.clone().add(CAMERA_OFFSET)),
      ),
      look: new CatmullRomCurve3(
        STATIONS.map((p) => p.clone().add(LOOK_OFFSET)),
      ),
    }),
    [],
  );
  const u = useRef(0);
  const move = useRef<{ from: number; to: number; t: number } | null>(null);
  const at = (i: number) => i / (STATIONS.length - 1);

  useEffect(() => {
    move.current = { from: u.current, to: at(active), t: 0 };
    get().invalidate();
  }, [active, get]);

  useFrame((state, delta) => {
    const m = move.current;
    if (m) {
      m.t = Math.min(1, m.t + Math.min(delta, 0.1) / MOVE_SECONDS);
      u.current = m.from + (m.to - m.from) * cameraEase(m.t);
      if (m.t >= 1) move.current = null;
      else state.invalidate();
    }
    state.camera.position.copy(paths.eye.getPointAt(u.current));
    state.camera.lookAt(paths.look.getPointAt(u.current));
  });
  return null;
}

type PipelineCanvasProps = {
  active: number;
  onReady: () => void;
  onFallback: () => void;
};

export default function PipelineCanvas({
  active,
  onReady,
  onFallback,
}: PipelineCanvasProps) {
  // Two frames after mounting, the scene has been drawn, so the canvas can fade in.
  useEffect(() => {
    let b = 0;
    const a = requestAnimationFrame(() => (b = requestAnimationFrame(onReady)));
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [onReady]);

  return (
    <Canvas
      flat
      frameloop="demand"
      dpr={[1, 1.5]}
      // Nothing to interact with, so the canvas never takes the pointer or the wheel.
      style={{ pointerEvents: "none" }}
      gl={{ alpha: true, antialias: true }}
      camera={{
        fov: 30,
        near: 0.1,
        far: 200,
        position: STATIONS[0]?.clone().add(CAMERA_OFFSET).toArray(),
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener("webglcontextlost", onFallback, {
          once: true,
        });
      }}
    >
      {/* One soft hemisphere light and one warm key light from the upper left at about 45°. */}
      <hemisphereLight args={["#ffffff", "#CBBFB2", 2.1]} />
      <directionalLight
        color="#FFF4E8"
        intensity={1.75}
        position={[-19.2, 29.2, 19.4]}
      />
      <Scene active={active} />
      <ContactShadows
        position={[0, 0.01, 0]}
        scale={[80, 48]}
        resolution={1024}
        blur={2.2}
        far={4}
        opacity={0.3}
        color="#3B181E"
        frames={1}
      />
      <CameraRig active={active} />
    </Canvas>
  );
}
