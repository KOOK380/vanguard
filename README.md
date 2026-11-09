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
| `public/images` | Optimised WebP photos, and 3D stills in `3d/` |
| `public/logos` | Vanguard logos, `partners/` and `group/` |
| `public/icons` | Web app icons |
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

## Content

All copy comes from `project-docs/site-content.md`, which is built from `content/`. After editing `content/`, run:

```bash
npm run content
```

This regenerates `site-content.md` and `src/content/generated/site-content.ts`, checks that every string is word for word, and updates `project-docs/content-open-items.md`. Pages import copy from `@/content`; lint fails on text written into JSX (decision 259).

## Content managed outside the copy file

- **Case studies:** `content/projects/*.md`, one file per project, in the format in `content/projects/README.md`. `/projects/` stays off until one is published; the menu shows Projects from three (decision 281).
- **Vacancies:** `content/careers/*.md`. Careers shows its empty state when none is published.
- **Legal pages:** set `legalPagesApproved` in `src/lib/routes.ts` only after written legal approval and with every placeholder filled. Until then, `/privacy-policy/` and `/terms/` are off in production.

## Sanity CMS

Studio is at `/studio`. Until `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, the site reads `src/content`, exactly as before (decision 283).

To connect it:

1. Create a Sanity project and dataset, and add the site's domain (and `http://localhost:3000`) as CORS origins with credentials.
2. Set the Sanity variables below.
3. Import the content: run `npm run sanity:import` for a dry run, then `npm run sanity:import -- --write`. Add `--photos` to upload the six industry photos with their alt text. Other photos are uploaded in Studio, where alt text is required.
4. In Sanity, add a webhook: POST to `https://<site>/api/revalidate`, all document types, on create, update and delete, projection `{_type, "slug": slug.current}`, with `SANITY_REVALIDATE_SECRET` as its secret.

## Enquiry form and newsletter

Both send through Resend (decision 288). Without `RESEND_API_KEY` and `RESEND_FROM`, a valid enquiry shows "Sending failed" with the phone number and email address, never a false success. The newsletter stays hidden in production until Resend, its segment and `NEWSLETTER_TOKEN_SECRET` are all set.

- **Enquiry:** emailed to `ENQUIRY_TO` with the visitor as Reply-To, plus an automatic reply to the visitor in the approved success message. A hidden spam-trap field and Cloudflare Turnstile stop spam. On success the page pushes `generate_lead` to `dataLayer` and `gtag`, if analytics has loaded after consent, with no personal data.
- **Newsletter:** double opt-in. The address is added to the segment as unsubscribed and gets a signed link, valid for 7 days, to `/newsletter/confirm/`, which marks it subscribed.
- **Setup:** verify the sending domain in Resend (SPF and DKIM records), create the segment, and create a Turnstile widget for the site's domain in Cloudflare. For local testing, Cloudflare's published test keys always pass: site key `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`.

## Tests

`npm run test:e2e` builds the site and runs the Playwright tests in `e2e/`. Email goes to a local stand-in for Resend, and Turnstile and analytics are off, so nothing is sent to an outside service. Run `npx playwright install chromium` once on a new machine. Run `npm run build` afterwards before starting the site locally, because the tests build with their own settings.

## Environment variables

All are optional. Without them, the parts they control stay hidden in production.

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID. Turns Sanity on; without it the site uses `src/content` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset. Default `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API date. Default `2026-11-01` |
| `SANITY_API_READ_TOKEN` | Only for a private dataset. Server only |
| `SANITY_API_WRITE_TOKEN` | Only for `npm run sanity:import -- --write`. Never deploy it |
| `SANITY_REVALIDATE_SECRET` | Secret shared with the Sanity webhook that calls `/api/revalidate` |
| `WHATSAPP_NUMBER` | Shows WhatsApp in the phone action bar and the floating desktop button, with the pre-filled message. Full international number, digits only (decisions 251 and 289) |
| `RESEND_API_KEY` | Resend API key with sending and contacts access. Server only. Needed for the enquiry form and the newsletter (decision 288) |
| `RESEND_FROM` | Sender, on a domain verified in Resend, such as `Vanguard Technology <website@vanguardgcc.com>` |
| `ENQUIRY_TO` | Inbox for enquiries. Default `info@vanguardgcc.com` |
| `RESEND_SEGMENT_ID` | Resend segment (formerly "audience") for newsletter contacts. `RESEND_AUDIENCE_ID` also works |
| `NEWSLETTER_TOKEN_SECRET` | Long random string that signs newsletter confirmation links. Changing it voids links already sent |
| `SITE_URL` | The canonical address, default `https://vanguardgcc.com` (no www, as the current site). Used for canonicals, Open Graph, structured data, the sitemap and links in emails. Set it on preview hosts too, or they will point search engines at the live domain (decision 293) |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID, such as `G-XXXXXXX`. Loads only after consent. With either analytics ID set, the cookie banner and footer "Cookie settings" link appear (decision 289). Set at build time |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID. Loads only after consent. Set at build time |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key. Shows the check on the enquiry form. Set at build time |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret. When set, the server refuses enquiries without a valid token. Server only |
| `SHOW_STYLEGUIDE` | `true` serves `/styleguide/` in a production build (decision 244) |

Links to pages that are not built yet appear only in development. Add each route to `builtRoutes` in `src/content/site.ts` as its page is built (decision 253).
