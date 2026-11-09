import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";
import { getLegalPage } from "@/lib/cms/data";
import { routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getLegalPage("privacy-policy");
  return pageMetadata({ ...p.meta, url: routes.privacy });
}

/** From Sanity, or the draft in content/legal.md. Off in production until legal approval (decisions 281 and 283). */
export default async function PrivacyPolicyPage() {
  const p = await getLegalPage("privacy-policy");
  return <LegalPage href={routes.privacy} h1={p.h1} notice={p.notice} lastUpdated={p.lastUpdated} sections={p.sections} actions={p.actions} />;
}
