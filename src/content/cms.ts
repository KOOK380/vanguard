import "server-only";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { z } from "zod";
import type { CaseStudy } from "./types";

/**
 * Entries written by the CMS (decision 164: Decap, a Git-based CMS, so entries are files in the
 * repository). Read once at build. Each file is Markdown with YAML front matter, in the format of
 * the blank entry in content/case-study-template.md. Nothing here is invented: with no files, the
 * lists are empty (decision 281).
 *
 * PROJECTS_DIR and CAREERS_DIR can point elsewhere, for testing with placeholder entries that are
 * never published.
 */

const root = process.cwd();

function readEntries(dir: string): { file: string; data: unknown }[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(md|markdown)$/.test(f) && !f.startsWith("_") && f.toLowerCase() !== "readme.md")
    .sort()
    .map((file) => {
      const text = fs.readFileSync(path.join(dir, file), "utf8");
      const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!m) throw new Error(`CMS entry ${file} has no front matter.`);
      return { file, data: yaml.load(m[1] ?? "") };
    });
}

const filled = z.string().trim().min(1);

/* ---------- Case studies (content/case-study-template.md) ---------- */

const photo = z.object({ image: filled, alt: filled, caption: filled, credit: filled });

const caseStudyEntry = z.object({
  title: filled.max(70),
  slug: filled.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  client: filled,
  location: filled,
  year: z.number().int().min(1990).max(2100).nullable().optional(),
  sector: z.enum(["Oil & Gas", "Water & Wastewater", "District Cooling", "Power & Infrastructure", "HVAC & Building Management Systems"]),
  systems: z.array(filled).min(1),
  scope: filled,
  challenge: filled,
  solution: filled,
  result: filled,
  photos: z.array(photo).min(1).max(6),
  status: z.enum(["Draft", "In review", "Approved", "Published"]),
  project_state: z.enum(["Completed", "In progress"]),
  client_may_be_named: z.boolean(),
  client_approval: z.string().optional().default(""),
  photo_permission: z.string().optional().default(""),
  evidence: z.string().optional().default(""),
  reviewed_by: z.string().optional().default(""),
  reviewed_date: z.union([z.string(), z.date()]).optional(),
});

/** Published only when every check in "Before publishing" has a record (content/case-study-template.md). */
function publishable(e: z.infer<typeof caseStudyEntry>, file: string): boolean {
  if (e.status !== "Published") return false;
  const missing: string[] = (["client_approval", "photo_permission", "evidence", "reviewed_by"] as const).filter((k) => !e[k].trim());
  if (!e.reviewed_date) missing.push("reviewed_date");
  if (e.project_state === "Completed" && !e.year) throw new Error(`Case study ${file}: a completed project needs its year.`);
  if (missing.length) throw new Error(`Case study ${file} is marked Published but has no ${missing.join(", ")}. Complete the checklist first.`);
  return true;
}

export type CaseStudyRecord = CaseStudy & { inProgress: boolean };

export function loadCaseStudies(): CaseStudyRecord[] {
  const dir = process.env.PROJECTS_DIR ? path.resolve(process.env.PROJECTS_DIR) : path.join(root, "content", "projects");
  return readEntries(dir).flatMap(({ file, data }) => {
    const parsed = caseStudyEntry.safeParse(data);
    if (!parsed.success) {
      // A draft may be incomplete; a published entry must be valid.
      if ((data as { status?: string } | null)?.status === "Published") throw new Error(`Case study ${file}: ${parsed.error.issues.map((i) => i.path.join(".") + " " + i.message).join("; ")}`);
      return [];
    }
    const e = parsed.data;
    if (!publishable(e, file)) return [];
    return [
      {
        slug: e.slug,
        title: e.title,
        client: e.client_may_be_named ? e.client : null,
        location: e.location,
        year: e.project_state === "Completed" ? (e.year ?? null) : null,
        inProgress: e.project_state === "In progress",
        sector: e.sector,
        systems: e.systems,
        scope: e.scope,
        challenge: e.challenge,
        solution: e.solution,
        result: e.result,
        photos: e.photos.map((p) => ({ src: p.image, alt: p.alt, caption: p.caption, credit: p.credit })),
      },
    ];
  });
}

/* ---------- Vacancies ---------- */

export type Vacancy = { slug: string; title: string; location: string; summary: string };

const vacancyEntry = z.object({ title: filled, location: filled, summary: filled, status: z.enum(["Draft", "Published"]) });

export function loadVacancies(): Vacancy[] {
  const dir = process.env.CAREERS_DIR ? path.resolve(process.env.CAREERS_DIR) : path.join(root, "content", "careers");
  return readEntries(dir).flatMap(({ file, data }) => {
    const parsed = vacancyEntry.safeParse(data);
    if (!parsed.success || parsed.data.status !== "Published") return [];
    return [{ slug: file.replace(/\.(md|markdown)$/, ""), title: parsed.data.title, location: parsed.data.location, summary: parsed.data.summary }];
  });
}
