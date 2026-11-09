"use client";

import { Canvas, createPortal, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Edges, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Fragment, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Color, MathUtils, Vector3, type Mesh, type MeshStandardMaterial, type Object3D } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { HotspotMarker } from "@/components/plant/HotspotMarker";
import type { PlantZone } from "@/components/plant/PlantExplorer";
import { cameraEase as ease } from "./ease";
import { FpsGuard } from "./FpsGuard";

/**
 * Live plant scene (decision 290). Loaded only through PlantExplorer, with next/dynamic and
 * ssr: false. The camera starts where the still was rendered (make-models.js), so the canvas can
 * fade in over it without a jump. Orbit is limited to ±60° around that view and 15° to 60° above
 * the ground, with no panning. The wheel does not zoom, so it always scrolls the page (CLAUDE.md);
 * the camera moves closer only when a zone is selected, within fixed distance limits.
 */

const MODEL = "/models/plant.glb";
const FOV = 30;
const START = new Vector3(27, 30.2, 43);
const TARGET = new Vector3(-0.1, 0.35, 0.5);
const START_AZIMUTH = Math.atan2(START.x - TARGET.x, START.z - TARGET.z);
const FOCUS_DISTANCE = 30;
const MOVE_SECONDS = 0.8; // the 3D camera move token
const DIM = new Color("#E4DED7");
const DIM_AMOUNT = 0.75;

// design-system.md, 3D style: matte only. The model's materials are named after these roles.
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
const OUTLINE = { hover: "#E19950", selected: "#571926" };

type Prepared = { zones: Map<string, Mesh[]>; links: Mesh[] };

/**
 * Gives each zone its own copy of the shared colour materials, so the other zones can be dimmed
 * while one is selected. Done once per loaded scene, which useGLTF caches across pages.
 */
function prepare(scene: Object3D, zoneNames: string[]): Prepared {
  const cached = scene.userData.vtPrepared as Prepared | undefined;
  if (cached) return cached;
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
  const own = (group: Object3D | undefined) => {
    const list: Mesh[] = [];
    const copies = new Map<string, MeshStandardMaterial>();
    group?.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      const m = mesh.material as MeshStandardMaterial;
      let copy = copies.get(m.name);
      if (!copy) {
        copy = m.clone();
        copy.userData.base = copy.color.clone();
        copies.set(m.name, copy);
      }
      mesh.material = copy;
      list.push(mesh);
    });
    return list;
  };
  const prepared: Prepared = { zones: new Map(zoneNames.map((z) => [z, own(scene.getObjectByName(z))])), links: own(scene.getObjectByName("process-links")) };
  scene.userData.vtPrepared = prepared;
  return prepared;
}

function setDim(meshes: Mesh[], dim: boolean) {
  for (const mesh of meshes) {
    const m = mesh.material as MeshStandardMaterial;
    const base = m.userData.base as Color | undefined;
    if (base) m.color.copy(base).lerp(DIM, dim ? DIM_AMOUNT : 0);
  }
}

/** The zone group an object belongs to, if any. */
function zoneOf(o: Object3D | null): string | null {
  for (let p = o; p; p = p.parent) if (p.name.startsWith("zone-")) return p.name;
  return null;
}

/** Moves the camera and orbit target to the selected zone, or back to the start, over 800 ms. */
function CameraRig({ focus }: { focus: Vector3 | null }) {
  // The camera and controls are read through get() and the frame state, because three.js objects
  // are changed in place, which the React compiler does not allow on values returned by hooks.
  const get = useThree((s) => s.get);
  const move = useRef<{ fromP: Vector3; fromT: Vector3; toP: Vector3; toT: Vector3; t: number } | null>(null);

  useEffect(() => {
    const { camera, controls } = get();
    const orbit = controls as OrbitControlsImpl | null;
    if (!orbit) return;
    const fromP = camera.position.clone();
    const fromT = orbit.target.clone();
    // Keep the current viewing direction, and come closer.
    const toT = focus ? focus.clone() : TARGET.clone();
    const toP = focus ? toT.clone().add(fromP.clone().sub(fromT).normalize().multiplyScalar(FOCUS_DISTANCE)) : START.clone();
    orbit.enabled = false;
    move.current = { fromP, fromT, toP, toT, t: 0 };
  }, [focus, get]);

  useFrame((state, delta) => {
    const m = move.current;
    const orbit = state.controls as OrbitControlsImpl | null;
    if (!m || !orbit) return;
    m.t = Math.min(1, m.t + Math.min(delta, 0.1) / MOVE_SECONDS);
    const k = ease(m.t);
    state.camera.position.lerpVectors(m.fromP, m.toP, k);
    orbit.target.lerpVectors(m.fromT, m.toT, k);
    orbit.update();
    if (m.t >= 1) {
      move.current = null;
      orbit.enabled = true;
    }
  });
  return null;
}

type SceneProps = { zones: PlantZone[]; selected: string | null; panelId: string; onSelect: (slug: string | null) => void; onReady: () => void };

function Scene({ zones, selected, panelId, onSelect, onReady }: SceneProps) {
  // No Draco: the model uses Meshopt, and Draco's decoder would be fetched from a CDN.
  const { scene } = useGLTF(MODEL, false, true);
  const get = useThree((s) => s.get);
  const [hovered, setHovered] = useState<string | null>(null);
  const prepared = useMemo(() => prepare(scene, zones.map((z) => z.zone)), [scene, zones]);
  const anchors = useMemo(() => {
    scene.updateMatrixWorld(true);
    return new Map(zones.map((z) => [z.zone, scene.getObjectByName(z.anchor)?.getWorldPosition(new Vector3()) ?? null]));
  }, [scene, zones]);

  const selectedZone = zones.find((z) => z.slug === selected)?.zone ?? null;
  const focus = selectedZone ? (anchors.get(selectedZone) ?? null) : null;

  // While a zone is selected, every other zone and the linking pipes are dimmed.
  useLayoutEffect(() => {
    for (const [name, meshes] of prepared.zones) setDim(meshes, selectedZone !== null && name !== selectedZone);
    setDim(prepared.links, selectedZone !== null);
  }, [prepared, selectedZone]);

  useEffect(() => {
    get().gl.domElement.style.cursor = hovered ? "pointer" : "";
  }, [get, hovered]);

  // Two frames after mounting, the model has been drawn, so the canvas can fade in.
  useEffect(() => {
    let b = 0;
    const a = requestAnimationFrame(() => (b = requestAnimationFrame(onReady)));
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
    };
  }, [onReady]);

  const slugOf = (zone: string | null) => zones.find((z) => z.zone === zone)?.slug ?? null;
  const onMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(zoneOf(e.object));
  };
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta > 4) return; // the end of a drag, not a click
    const slug = slugOf(zoneOf(e.object));
    if (!slug) return;
    e.stopPropagation();
    onSelect(slug === selected ? null : slug);
  };

  // Edge lines, 2 px wide, on the hovered and selected zones: gold on hover, maroon when selected.
  // drei's inverted-hull Outlines cannot be used: the model's quantised positions scale its offset.
  const outlined = [...new Set([hovered, selectedZone].filter((z): z is string => Boolean(z)))];

  return (
    <>
      <primitive object={scene} onPointerMove={onMove} onPointerLeave={() => setHovered(null)} onClick={onClick} />
      {outlined.flatMap((zone) =>
        (prepared.zones.get(zone) ?? []).map((mesh) => (
          <Fragment key={`${zone}-${mesh.uuid}`}>
            {createPortal(<Edges threshold={30} lineWidth={2} color={zone === selectedZone ? OUTLINE.selected : OUTLINE.hover} />, mesh)}
          </Fragment>
        )),
      )}
      {zones.map((z) => {
        const at = anchors.get(z.zone);
        if (!at) return null;
        return (
          <Html key={z.slug} position={at} zIndexRange={[20, 10]}>
            <HotspotMarker
              label={z.label}
              selected={selected === z.slug}
              active={hovered === z.zone}
              panelId={panelId}
              onSelect={() => onSelect(selected === z.slug ? null : z.slug)}
              onHover={(over) => setHovered(over ? z.zone : null)}
            />
          </Html>
        );
      })}
      <CameraRig focus={focus} />
    </>
  );
}

type PlantCanvasProps = SceneProps & { onFallback: () => void };

export default function PlantCanvas({ onFallback, ...scene }: PlantCanvasProps) {
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

  return (
    <div ref={box} className="absolute inset-0">
      <Canvas
        flat
        frameloop={onScreen && tabVisible ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ fov: FOV, near: 0.1, far: 400, position: START.toArray() }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", onFallback, { once: true });
        }}
      >
        {/* One soft hemisphere light and one warm key light from the upper left at about 45°. */}
        <hemisphereLight args={["#ffffff", "#CBBFB2", 2.1]} />
        <directionalLight color="#FFF4E8" intensity={1.75} position={[-19.2, 29.2, 19.4]} />
        <OrbitControls
          makeDefault
          target={TARGET.toArray()}
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          minAzimuthAngle={START_AZIMUTH - Math.PI / 3}
          maxAzimuthAngle={START_AZIMUTH + Math.PI / 3}
          minPolarAngle={MathUtils.degToRad(30)}
          maxPolarAngle={MathUtils.degToRad(75)}
          minDistance={FOCUS_DISTANCE}
          maxDistance={START.distanceTo(TARGET)}
        />
        <Suspense fallback={null}>
          <Scene {...scene} />
          {/* Rendered once, so it costs nothing per frame. */}
          <ContactShadows position={[0, -0.55, 0]} scale={44} resolution={512} blur={2.4} far={5} opacity={0.3} color="#3B181E" frames={1} />
        </Suspense>
        <FpsGuard onSlow={onFallback} />
      </Canvas>
    </div>
  );
}
