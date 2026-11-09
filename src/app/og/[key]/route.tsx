import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { aboutPage, capabilitiesPage, careersPage, contactPage, homePage, industriesOverview, ourGroup, privacyPage, solutionsOverview, termsPage } from "@/content";
import { getIndustries, getSolutions } from "@/lib/cms/data";
import { isLive, routes } from "@/lib/routes";
import { ogKey } from "@/lib/seo";

/**
 * Branded share images, 1200 × 630 (decision 293): the white lockup, a gold rule and the page's
 * approved H1 in Inter on maroon-900, the brand's dark colour. One per built page, prerendered at
 * build; pages that are off in production (such as the legal pages) get none.
 */

async function images(): Promise<Map<string, string>> {
  const [solutions, industries] = await Promise.all([getSolutions(), getIndustries()]);
  const pages: [string, string][] = [
    [routes.home, homePage.h1],
    [routes.about, aboutPage.h1],
    [routes.solutions, solutionsOverview.h1],
    [routes.industries, industriesOverview.h1],
    [routes.capabilities, capabilitiesPage.h1],
    [routes.ourGroup, ourGroup.h1],
    [routes.careers, careersPage.h1],
    [routes.contact, contactPage.h1],
    [routes.privacy, privacyPage.h1],
    [routes.terms, termsPage.h1],
    ...solutions.map((s): [string, string] => [s.meta.url, s.h1]),
    ...industries.map((i): [string, string] => [i.meta.url, i.h1]),
  ];
  return new Map(pages.filter(([url]) => isLive(url)).map(([url, h1]) => [ogKey(url), h1]));
}

export async function generateStaticParams() {
  return [...(await images()).keys()].map((key) => ({ key }));
}

/** Renders a page's image once and keeps the PNG (Cache Components, decision 293). Null for an unknown key. */
async function render(keyPromise: Promise<string>): Promise<Uint8Array | null> {
  "use cache";
  cacheLife("max");
  const key = await keyPromise;
  const title = (await images()).get(key);
  if (!title) return null;

  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/inter-latin-600-normal.woff")),
    readFile(join(process.cwd(), "public/logos/vanguard-lockup-white.svg")),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  const image = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#3B181E", fontFamily: "Inter" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img elements */}
        <img src={logoSrc} width={329} height={100} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 6, background: "#E19950", marginBottom: 32 }} />
          <div style={{ display: "flex", fontSize: title.length > 60 ? 54 : 64, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#FFFFFF", maxWidth: 960 }}>{title}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: "Inter", data: font, weight: 600, style: "normal" }] },
  );
  return new Uint8Array(await image.arrayBuffer());
}

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const png = await render(params.then((p) => p.key));
  if (!png) return new Response(null, { status: 404 });
  return new Response(png as BodyInit, { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" } });
}
