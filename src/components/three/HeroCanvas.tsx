"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { MathUtils, type Group, type Mesh, type MeshStandardMaterial } from "three";
import { FpsGuard } from "./FpsGuard";

/**
 * Live hero scene (decision 265). Loaded only through HeroStage, with next/dynamic and ssr: false,
 * so none of this enters the first-load bundle. The camera and lights match the render of the
 * still image, so the canvas can fade in over it without a jump.
 */

const MODEL = "/models/hero.glb";

// design-system.md, 3D style: matte only, one shared material per colour. The model's materials
// are named after these roles. Screen and paper are the SCADA screens' own colours.
const PALETTE: Record<string, string> = {
  "vt-ground": "#F0EBE5",
  "vt-light": "#CFC8BF",
  "vt-mid": "#B4ABA1",
  "vt-dark": "#8F857E",
  "vt-pipe": "#571926",
  "vt-gold": "#E19950",
  "vt-dim": "#E4DED7",
  "vt-screen": "#3B181E",
  "vt-paper": "#FBF9F6",
};

// The canvas reaches 10% past the still on every side, so the model's corners have room as it
// turns. A wider field of view keeps the framing of the still's 30° camera exactly:
// tan(fov / 2) = 1.2 × tan(15°).
const OVERSCAN = 0.1;
const FOV = MathUtils.radToDeg(2 * Math.atan((1 + 2 * OVERSCAN) * Math.tan(MathUtils.degToRad(15))));

const TURN_SECONDS = 40;
const MAX_TILT = MathUtils.degToRad(8);

function Model({ onReady }: { onReady: () => void }) {
  // No Draco: the model uses Meshopt, and Draco's decoder would be fetched from a CDN.
  const { scene } = useGLTF(MODEL, false, true);

  useLayoutEffect(() => {
    scene.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      const m = mesh.material as MeshStandardMaterial;
      const hex = PALETTE[m.name];
      if (hex) m.color.set(hex);
      m.roughness = 0.92;
      m.metalness = 0;
      m.emissive.set(0x000000);
      m.envMapIntensity = 0;
      m.transparent = false;
    });
  }, [scene]);

  // Two frames after mounting, the model has been drawn, so the canvas can fade in.
  useEffect(() => {
    let a = 0;
    let b = 0;
    a = requestAnimationFrame(() => (b = requestAnimationFrame(onReady)));
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [onReady]);

  return <primitive object={scene} />;
}

/** One turn every 40 seconds, and a damped tilt of up to 8 degrees towards the pointer. */
function Rig({ paused, children }: { paused: boolean; children: ReactNode }) {
  const tilt = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 };
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((_, delta) => {
    if (paused || !tilt.current || !spin.current) return;
    const dt = Math.min(delta, 0.1); // no jump after a pause or a hidden tab
    spin.current.rotation.y += (dt * Math.PI * 2) / TURN_SECONDS;
    tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, pointer.current.y * MAX_TILT, 4, dt);
    tilt.current.rotation.y = MathUtils.damp(tilt.current.rotation.y, pointer.current.x * MAX_TILT, 4, dt);
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>{children}</group>
    </group>
  );
}

type HeroCanvasProps = { paused: boolean; onReady: () => void; onFallback: () => void };

export default function HeroCanvas({ paused, onReady, onFallback }: HeroCanvasProps) {
  const box = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  // Rendering stops off-screen and in a hidden tab.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(Boolean(e?.isIntersecting)));
    io.observe(el);
    const vis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  const frameloop = !onScreen || !tabVisible ? "never" : paused ? "demand" : "always";

  return (
    <div ref={box} className="pointer-events-none absolute -inset-[10%]">
      <Canvas
        flat
        // R3F sets pointer-events: auto on its wrapper, so the canvas must opt out itself.
        style={{ pointerEvents: "none" }}
        frameloop={frameloop}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ fov: FOV, near: 0.1, far: 400, position: [11.2, 13.4, 21.4] }}
        onCreated={({ camera, gl }) => {
          camera.lookAt(-0.25, 0.55, 0.1);
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", onFallback, { once: true });
        }}
      >
        {/* One soft hemisphere light and one warm key light from the upper left at about 45°. */}
        <hemisphereLight args={["#ffffff", "#CBBFB2", 2.1]} />
        <directionalLight color="#FFF4E8" intensity={1.75} position={[-19.2, 29.2, 19.4]} />
        <Suspense fallback={null}>
          <Rig paused={paused}>
            <Model onReady={onReady} />
            {/* Rendered once, and turning with the model, so it costs nothing per frame. */}
            <ContactShadows position={[0, -0.42, 0]} scale={24} resolution={512} blur={2.4} far={4} opacity={0.34} color="#3B181E" frames={1} />
          </Rig>
        </Suspense>
        {paused ? null : <FpsGuard onSlow={onFallback} />}
      </Canvas>
    </div>
  );
}
