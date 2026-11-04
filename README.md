# Vanguard Technology website

Website for Vanguard Technology, an industrial automation company in Abu Dhabi. Built with Next.js (App Router), TypeScript and Tailwind CSS, with Three.js for the 3D.

**Status:** project setup only. The page at `/` is still the Next.js starter page, and the site has not been built yet.

## Requirements

- Node.js 20.9 or later (set up with 22.15)
- npm

## Run it

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Other commands

Check the code:

```bash
npm run lint
```

Make a production build:

```bash
npm run build
```

Run the production build:

```bash
npm run start
```

## Folders

| Folder | Holds |
|---|---|
| `src/app` | Routes, layouts and global styles |
| `src/components/layout` | Header, footer and phone action bar |
| `src/components/ui` | Buttons, cards, form fields and other small parts |
| `src/components/sections` | Page sections |
| `src/components/three` | 3D viewers |
| `src/lib` | Shared helpers |
| `src/content` | Copy and data used by the site's code |
| `public/models` | Compressed `.glb` models |
| `public/images` | Optimised photos and renders |
| `public/logos` | Vanguard and partner logos |
| `project-docs` | Strategy, design system, decisions, open facts and design mock-ups |
| `content` | Editable copy that `project-docs/site-content.md` is generated from |
| `assets-raw` | Original photos, logos and 3D models, before optimising |

## Before you build a page

- **Copy:** use [project-docs/site-content.md](project-docs/site-content.md). It includes page layouts, button links and what not to publish.
- **Design:** follow [project-docs/design-system.md](project-docs/design-system.md) and the mock-ups in `project-docs/design/`.
- **3D:** follow [project-docs/3d-brief.md](project-docs/3d-brief.md). The models use Meshopt compression, so the loader needs the decoder.
- **Facts:** only sourced facts go on the site. Open items are in [project-docs/open-facts.md](project-docs/open-facts.md).

## Licences

- Keep this repository private. The stock photos in `assets-raw` must not be published as a browsable collection, and the partner logos are other organisations' trademarks.
- Photo sources and terms are in [project-docs/image-credits.md](project-docs/image-credits.md).
