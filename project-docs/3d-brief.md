# 3D brief

Written 2026-11-04. Covers the hero and plant models for the site. Visual rules are in [design-system.md](design-system.md), placement is in [strategy.md](strategy.md), and decisions 211 to 218 record the choices.

## Purpose

The 3D explains the work: how field instruments connect through PLC cabinets to a SCADA desk, and where each sector sits on a site. It is the clearest difference from the competitors reviewed, none of which uses 3D this way ([research.md](research.md)).

**Rules that cannot change**
- Everything is generic and captioned "Illustrative model". It never implies a real facility, client or project.
- No real logos, site names, vendor hardware or readable text.
- All content and links also work without 3D.
- The enquiry button sits outside the canvas, and page scrolling always wins.

## Where the models came from

We searched Sketchfab (CC0 and CC BY) and Poly Haven, and looked briefly at Poly Pizza. **We built both models ourselves.**

- **Poly Haven:** the closest CC0 models are worn electrical boxes with readable warning labels. They break the "no readable text" rule and look wrong for this sector.
- **Sketchfab:** it lists CC BY robot arms and panels, but downloads need a signed-in account, which we cannot create. Robot arms also suggest factory automation rather than process control, and the current site's factory-robot hero was already rejected for that reason.

Details are in [image-credits.md](image-credits.md). No third-party credit is owed.

## Results

Files are in `assets-raw/models/`. Sizes are the final compressed files, and counts were read back from them.

| Measure | Hero | Limit | Plant | Limit |
|---|---|---|---|---|
| **File** | `hero.glb` | | `plant.glb` | |
| **Size** | 168 KB | 3 MB (instruction); 300 KB (design system) | 179 KB | 5 MB (instruction); 700 KB (design system) |
| **Triangles** | 27,006 | 30,000 on phones | 26,646 | 75,000 on phones |
| **Meshes (draw calls before shadows)** | 26 | 40 | 35 | 100 |
| **Textures** | None | 2048 px maximum | None | 2048 px maximum |
| **Validator** | No errors or warnings | | No errors or warnings | |

| Still | Size | Limit |
|---|---|---|
| `hero-still-780.webp` | 47 KB | 80 KB |
| `hero-still-1400.webp` | 115 KB | 150 KB |
| `plant-still-780.webp` | 41 KB | 80 KB |
| `plant-still-1400.webp` | 97 KB | 150 KB |

**The 780 px stills are the mobile fallbacks.** Each still was rendered from the compressed `.glb`, so it matches what the viewer loads.

**Runtime:** `three.module.min.js` is 166 KB gzipped, with no tree-shaking. GLTFLoader and the Meshopt decoder add 29 KB, for 195 KB against the 200 KB limit. That leaves little room, so tree-shake in the build.

**Total so far:** 195 KB runtime and 347 KB models come to 542 KB, against the 1.5 MB limit. Scene code is not written yet (100 KB limit).

## Hero model

Root node: `hero-model`.

| Node | Contents |
|---|---|
| `base` | Plinth |
| `process-equipment` | Vessels, tanks, pipe rack and pumps |
| `process-lines` | Maroon process pipes, valves and flanges |
| `field-instruments` | Transmitters on stands; gold marks active ones |
| `signal-paths` | Cable trays and maroon signal lines |
| `control-cabinets` | Three PLC cabinets with generic modules |
| `scada-desk` | Desk, three screens with abstract graphics, and a chair |

**Why not a cabinet alone?** The instruction's fallback was a stylised control cabinet. It is here as `control-cabinets`, inside the full scene already approved for Home, because that scene explains the work (decision 212). Showing only that group is simple if a cabinet alone is ever preferred.

## Plant model

Root node: `plant-model`. Each `zone-*` group can be highlighted as a unit.

| Group | Contents | Hotspot node | Page |
|---|---|---|---|
| `zone-oil-gas` | Process columns, separator, pipe rack, pipes, flare stack | `hotspot-oil-gas` | `/industries/oil-gas/` |
| `zone-water-treatment` | Round clarifier tanks and rectangular basins | `hotspot-water-treatment` | `/industries/water-wastewater/` |
| `zone-district-cooling` | Plant hall, four cooling towers, pumps | `hotspot-district-cooling` | `/industries/district-cooling/` |
| `zone-substation` | Switch building, two transformers, fence, cable route | `hotspot-substation` | `/industries/power-infrastructure/` |
| `zone-office-bms` | Office building and rooftop units, with a nested `rooftop-bms` panel | `hotspot-office-bms` | `/industries/hvac-building-management-systems/` |
| `zone-safety-valves` | Valve and instrument group | `hotspot-safety-valves` | `/industries/safety-instrumented-systems/` |
| `process-links` | Pipes linking the zones | | |
| `base` | Plinth | | |

- **Hotspot nodes** are empty nodes with `label` and `page` in their extras. Project them to screen space for the HTML labels.
- **Hotspot text** is in [site-content.md](site-content.md), under 3D plant model hotspots. `plant-hotspots.json` gives each position as a percentage of the still image, for the fallback.
- **Public wording:** "Substation" is a model name only. The label is "Power & Infrastructure", because substation work is not in the sourced scope (keyword plan).
- **Sixth zone:** the instruction listed five. The safety zone is added because the site has that page and hotspot (decision 213).
- **Flare flame:** it is gold, in the mesh `zone-oil-gas-gold`, with no glow (decision 217).

## Materials

One shared matte material per colour, with roughness 0.92 and metalness 0. Names start with `vt-`.

`vt-ground`, `vt-light`, `vt-mid`, `vt-dark`, `vt-pipe`, `vt-gold`, `vt-screen`, `vt-paper`, `vt-dim`

Colours follow the 3D table in [design-system.md](design-system.md). `vt-screen` and `vt-paper` also use the brand tokens for screens and instrument dials.

## Loading

Both files use `EXT_meshopt_compression`, so the loader needs the decoder:

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
const { scene } = await loader.loadAsync('/models/plant.glb');
const zone = scene.getObjectByName('zone-oil-gas');
```

**Lighting:** soft shadows and contact shading are not in the files. The stills use many soft light samples, which a live page cannot. The viewer needs its own light setup, plus a baked ground shadow, and will not match the stills exactly until that is tuned.

**Behaviour:** loading, fallback conditions, camera limits and pause rules are in [design-system.md](design-system.md). Start the viewer only after the page is usable, with the still as the Largest Contentful Paint element. Skip it with no WebGL, Save-Data, reduced motion or low power.

## How to rebuild

The source is in `design/source/`, and uses this machine's paths.

1. `node make-models.js export` builds the raw `.glb` files from `scene.html`.
2. `gltf-transform weld` and `gltf-transform meshopt --level high` compress them.
3. `gltf-transform validate` checks them.
4. `node make-models.js still 128` renders the stills from the compressed files.

We did not use `gltf-transform optimize` (decision 216). The models have no textures, so nothing was resized.

## Not done yet

- **Live viewer:** not built, so frame rate, memory use and real load time are unmeasured. Software rendering was used here, so none of this has run on a phone GPU.
- **Selection state:** the dimmed and outlined selected state from the design system is not implemented. The group structure is ready for it.
- **Close-up detail:** at 14 sides, the large round tanks show visible facets up close. This suits the low-poly style at planned sizes, but check it if the plant is shown larger.
- **Solution page hero:** the mock-up still uses a separate higher-detail render (`sol-1100.webp`). Make it from `hero.glb` by showing the cabinet and desk groups, or export a third model.
- **Icons:** the 3D icons are pre-rendered from the higher-detail scene code, and need no `.glb`.

## Acceptance checks for the build

- [ ] Hero and plant stay within the limits above after any change.
- [ ] Every page reads and works with WebGL turned off.
- [ ] Selecting a zone dims the others, adds the maroon outline and opens its HTML label.
- [ ] The HTML hotspot list works by keyboard and screen reader, and drives the model.
- [ ] 60 fps on desktop and 30 fps on a mid-range phone, on real devices.
- [ ] Rendering pauses off-screen, and falls back below 20 fps for 3 seconds.
- [ ] The "Illustrative model" caption is visible wherever a model appears.
