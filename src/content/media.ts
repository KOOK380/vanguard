/**
 * Image files for content, by page slug. Paths are code, not copy. Every photo is illustrative
 * stock marked "In design" in project-docs/image-credits.md, and none is on Hold.
 */

export type PhotoSet = { src420: string; src840: string; width: number; height: number };

/** Shape of each solution's icon, as SVG and as a low-poly 3D model (decision 275). */
export const solutionIconKinds = {
  "system-integration": "gear",
  "control-instrumentation-engineering": "gauge",
  "automation-electrical-supply-installation": "reel",
  "turnkey-projects": "hook",
  "project-management": "clipboard",
  "field-services-maintenance": "wrench",
  "plc-scada-design-validation": "plc",
  "it-consultancy": "monitor",
  "audio-visual-integration": "speaker",
} as const satisfies Record<string, import("@/components/icons/SolutionIcons").SolutionIconKind>;

/** Pre-rendered 3D icons, 128 px (decisions 191 and 203). No longer used on Home (decision 275). */
export const solutionIcons: Record<string, string> = {
  "system-integration": "/images/3d/icons/icon-system-integration.webp",
  "control-instrumentation-engineering": "/images/3d/icons/icon-control-instrumentation.webp",
  "automation-electrical-supply-installation": "/images/3d/icons/icon-supply-installation.webp",
  "turnkey-projects": "/images/3d/icons/icon-turnkey.webp",
  "project-management": "/images/3d/icons/icon-project-management.webp",
  "field-services-maintenance": "/images/3d/icons/icon-field-services.webp",
  "plc-scada-design-validation": "/images/3d/icons/icon-plc-scada.webp",
  "it-consultancy": "/images/3d/icons/icon-it-consultancy.webp",
  "audio-visual-integration": "/images/3d/icons/icon-audio-visual.webp",
};

const set = (name: string): PhotoSet => ({ src420: `/images/home/${name}-420.webp`, src840: `/images/home/${name}-840.webp`, width: 840, height: 560 });

/** Home industry cards (image-credits.md, "Home, Industries"). */
export const industryPhotos: Record<string, PhotoSet> = {
  "oil-gas": set("refinery-columns-pipework"),
  "water-wastewater": set("wastewater-treatment-tanks-aerial"),
  "district-cooling": set("cooling-units-outdoor-rows"),
  "power-infrastructure": set("power-plant-striped-stacks"),
  "hvac-building-management-systems": set("rooftop-air-conditioning-units"),
  "safety-instrumented-systems": set("control-panel-push-buttons"),
};

/** Home Capabilities photo. */
export const capabilitiesPhoto = { src: "/images/home/process-pipework-black-white-900.webp", width: 900, height: 700 };
