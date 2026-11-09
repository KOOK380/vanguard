/**
 * One-time import of src/content into Sanity (decision 283).
 *
 *   npm run sanity:import            dry run: writes scripts/sanity-import.ndjson and a summary
 *   npm run sanity:import -- --write  writes to the dataset (needs SANITY_API_WRITE_TOKEN)
 *   npm run sanity:import -- --write --photos  also uploads the six industry photos
 *
 * Copy is taken word for word from the content layer. Documents have fixed IDs. Each run creates a
 * document if it is missing and then sets only the fields below, so fields an editor added in Studio,
 * such as a replacement photo, are kept. Nothing is invented: no testimonials, case studies or job
 * openings exist, so none are created. With --photos, each industry's approved photo from public/images/
 * is uploaded with its alt text from site-content.md (decision 285). Team photos do not exist. Partner
 * logos are uploaded with the partner's name as alt text.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { caseStudies, company, industries, partners, solutions, solutionsHomeOrder, teamSection, vacancies, privacyPage, termsPage } from "@/content";
import { industryPhotos, solutionIconKinds } from "@/content/media";
import type { Block } from "@/content/source";
import type { Action } from "@/content/types";

const write = process.argv.includes("--write");
const withPhotos = process.argv.includes("--photos");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN ?? "";

if (write && (!projectId || !token)) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN to write. Run without --write for a dry run.");
  process.exit(1);
}

const client = write ? createClient({ projectId, dataset, token, apiVersion: "2026-11-01", useCdn: false }) : null;

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36).padStart(6, "0")}`;
const keyed = <T extends object>(items: T[]) => items.map((i) => ({ _key: key(), ...i }));
const actionDoc = (a: Action) => ({ _type: "action", label: a.label, href: a.href ?? undefined, prefill: a.prefill });

type Doc = { _id: string; _type: string; [k: string]: unknown };
const docs: Doc[] = [];

/* Site settings */
docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  companyName: company.name,
  phone: company.phone.display,
  email: company.email.display,
  address: company.address,
});

/* Solutions */
const homeIndex = new Map(solutionsHomeOrder.map((s, i) => [s.slug, i + 1]));
solutions.forEach((s, i) =>
  docs.push({
    _id: `solution-${s.slug}`,
    _type: "solution",
    name: s.name,
    slug: { _type: "slug", current: s.slug },
    order: i + 1,
    homeOrder: homeIndex.get(s.slug),
    cardTitle: s.card.title,
    cardText: s.card.text,
    icon: solutionIconKinds[s.slug as keyof typeof solutionIconKinds],
    metaTitle: s.meta.title,
    metaDescription: s.meta.description,
    h1: s.h1,
    intro: s.intro,
    deliverables: s.deliverables,
    steps: keyed(s.steps.map((st) => ({ _type: "titledText", title: st.title, text: st.text }))),
    industriesServed: s.industriesServed,
    faqs: keyed(s.faqs.map((f) => ({ _type: "faq", question: f.question, answer: f.answer }))),
    primaryAction: actionDoc(s.actions.primary),
    secondaryAction: actionDoc(s.actions.secondary),
    closingBandHeading: s.closingBandHeading,
  }),
);

/* Industries (photos are added in main() with --photos) */
industries.forEach((ind, i) =>
  docs.push({
    _id: `industry-${ind.slug}`,
    _type: "industry",
    name: ind.name,
    slug: { _type: "slug", current: ind.slug },
    order: i + 1,
    cardTitle: ind.card.title,
    cardText: ind.card.text,
    metaTitle: ind.meta.title,
    metaDescription: ind.meta.description,
    h1: ind.h1,
    intro: ind.intro,
    challenges: keyed(ind.challenges.map((c) => ({ _type: "titledText", title: c.title, text: c.text }))),
    helps: keyed(ind.helps.map((h) => ({ _type: "titledText", title: h.title, text: h.text }))),
    typicalSystems: ind.typicalSystems,
    primaryAction: actionDoc(ind.actions.primary),
    secondaryAction: actionDoc(ind.actions.secondary),
    modelHeading: ind.modelHeading,
    hotspot: { label: ind.hotspot.label, zone: ind.hotspot.zone, text: ind.hotspot.text },
  }),
);

/* Team: names and titles may be out of date (open fact 8); no photos or profiles exist */
teamSection.members.forEach((m, i) => docs.push({ _id: `team-${i + 1}`, _type: "teamMember", name: m.name, title: m.title, bio: m.bio, order: i + 1 }));

/* Job openings and case studies: only real, published entries, of which there are none now */
vacancies.forEach((v) => docs.push({ _id: `job-${v.slug}`, _type: "jobOpening", title: v.title, location: v.location, summary: v.summary, published: true }));
if (caseStudies.length) console.warn(`${caseStudies.length} case studies found in content/projects/. Import them in Studio with their approvals and photos; this script does not copy approval records.`);

/* Legal pages, in their parsed block structure */
const legalBlock = (b: Block) => {
  if (b.kind === "text") return { _type: "paragraph", _key: key(), text: b.text };
  if (b.kind === "list") return { _type: "list", _key: key(), ordered: b.ordered, items: b.items.map((i) => i.raw) };
  if (b.kind === "table") return { _type: "table", _key: key(), head: b.head, rows: b.rows.map((r) => ({ _type: "row", _key: key(), cells: r })) };
  if (b.kind === "field" && b.label !== "Buttons") return { _type: "labelled", _key: key(), label: b.label, value: b.value };
  return null;
};
for (const [slug, p] of [["privacy-policy", privacyPage], ["terms", termsPage]] as const) {
  docs.push({
    _id: `legal-${slug}`,
    _type: "legalPage",
    title: p.h1,
    slug: { _type: "slug", current: slug },
    metaTitle: p.meta.title,
    metaDescription: p.meta.description,
    notice: p.notice,
    lastUpdated: p.lastUpdated.value,
    sections: p.sections.map((s) => ({ _type: "legalSection", _key: key(), heading: s.heading, blocks: s.blocks.flatMap((b) => legalBlock(b) ?? []) })),
  });
}

/** The full-size original of an approved photo set: /images/home/<name>-840.webp -> public/images/<name>.webp */
const originalOf = (src840: string) => path.join(process.cwd(), "public", "images", path.basename(src840).replace(/-840\.webp$/, ".webp"));

async function main() {
  /* Industry photos, uploaded once with their alt text (decision 285) */
  if (withPhotos) {
    for (const ind of industries) {
      const set = industryPhotos[ind.slug];
      const doc = docs.find((d) => d._id === `industry-${ind.slug}`);
      if (!set || !doc) continue;
      if (!ind.photoAlt) throw new Error(`No "Photo alt text" for ${ind.slug} in site-content.md.`);
      const file = originalOf(set.src840);
      const asset = client ? await client.assets.upload("image", fs.readFileSync(file), { filename: path.basename(file), contentType: "image/webp" }) : null;
      doc.photo = { _type: "imageWithAlt", alt: ind.photoAlt, decorative: false, asset: { _type: "reference", _ref: asset?._id ?? `(uploaded on --write from ${path.relative(process.cwd(), file)})` } };
    }
  }

  /* Partners: logos uploaded with the partner's name as alt text */
  for (const [i, pt] of partners.items.entries()) {
    const file = path.join(process.cwd(), "public", pt.logo.src);
    let asset: { _id: string } | null = null;
    if (client) asset = await client.assets.upload("image", fs.readFileSync(file), { filename: path.basename(file), contentType: "image/webp" });
    docs.push({
      _id: `partner-${pt.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      _type: "partner",
      name: pt.name,
      order: i + 1,
      permissionConfirmed: false,
      logo: { _type: "imageWithAlt", alt: pt.name, decorative: false, asset: asset ? { _type: "reference", _ref: asset._id } : { _type: "reference", _ref: `(uploaded on --write from ${pt.logo.src})` } },
    });
  }

  const counts = docs.reduce<Record<string, number>>((m, d) => ((m[d._type] = (m[d._type] ?? 0) + 1), m), {});
  if (!client) {
    const out = path.join(process.cwd(), "scripts", "sanity-import.ndjson");
    fs.writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
    console.log(`Dry run: ${docs.length} documents written to ${path.relative(process.cwd(), out)}`);
    console.log(counts);
    return;
  }
  const tx = client.transaction();
  for (const { _id, _type, ...fields } of docs) {
    tx.createIfNotExists({ _id, _type });
    tx.patch(_id, (p) => p.set(fields));
  }
  await tx.commit();
  console.log(`Imported ${docs.length} documents into ${projectId}/${dataset}.`, counts);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
