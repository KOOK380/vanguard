import "server-only";
import { sourcePages } from "./generated/site-content";

/**
 * Typed access to the copy parsed from project-docs/site-content.md (decision 259).
 * Strings are kept word for word, including inline Markdown: **bold**, [links](/url) and `code`.
 * Render them with <Rich>, or use plain() where only text is allowed, such as an aria-label.
 * Every accessor throws when copy is missing, so a renamed label fails the build instead of
 * leaving an empty space on a page.
 */

export type ListItem = { raw: string; lead?: string; rest?: string };
export type Block =
  | { kind: "field"; label: string; value: string }
  | { kind: "caption"; text: string }
  | { kind: "text"; text: string }
  | { kind: "list"; ordered: boolean; items: ListItem[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "faq"; question: string; answer: string };
export type SourceSection = { heading: string; level: number; blocks: Block[]; sections: SourceSection[] };
export type SourcePage = { id: string; title: string; blocks: Block[]; sections: SourceSection[] };
type SourceNode = SourcePage | SourceSection;

/** Inline Markdown from site-content.md. Render with <Rich>. */
export type Inline = string;

function fail(what: string, where: SourceNode): never {
  const name = "title" in where ? where.title : where.heading;
  throw new Error(`site-content.md: ${what} not found in "${name}". Check the label in content/ and regenerate.`);
}

export function page(id: string): SourcePage {
  const p = sourcePages[id];
  if (!p) throw new Error(`site-content.md: no page with anchor "${id}".`);
  return p;
}

/** Page anchors that start with a prefix, such as "solution-", in document order. */
export function sourcePageIds(prefix: string): string[] {
  return Object.keys(sourcePages).filter((id) => id.startsWith(prefix));
}

/** Blocks of a node in document order, including those of its subsections. */
function walk(node: SourceNode): Block[] {
  return [...node.blocks, ...node.sections.flatMap(walk)];
}

/** The section with this heading, at any depth. */
/** The section with this heading, or undefined when the copy does not exist yet. */
export function maybeSection(node: SourceNode, heading: string): SourceSection | undefined {
  return findSection(node, heading);
}

export function section(node: SourceNode, heading: string): SourceSection {
  return findSection(node, heading) ?? fail(`Section "${heading}"`, node);
}

function findSection(node: SourceNode, heading: string): SourceSection | undefined {
  for (const s of node.sections) {
    if (s.heading === heading) return s;
    const inner = findSection(s, heading);
    if (inner) return inner;
  }
  return undefined;
}

export function sections(node: SourceNode): SourceSection[] {
  return node.sections;
}

/** "**Label:** value" as a line, or as a list item. Searches the node's own blocks first. */
export function maybeField(node: SourceNode, label: string): Inline | undefined {
  for (const b of walk(node)) {
    if (b.kind === "field" && b.label === label) return b.value;
    if (b.kind === "list") {
      const item = b.items.find((i) => i.lead === `${label}:`);
      if (item?.rest !== undefined) return item.rest;
    }
  }
  return undefined;
}

export function field(node: SourceNode, label: string): Inline {
  return maybeField(node, label) ?? fail(`Field "${label}"`, node);
}

/** All "**Label:** value" lines of a node, in order, such as the Company details list. */
export function fields(node: SourceNode): { label: string; value: Inline }[] {
  const out: { label: string; value: Inline }[] = [];
  for (const b of node.blocks) {
    if (b.kind === "field") out.push({ label: b.label, value: b.value });
    if (b.kind === "list") for (const i of b.items) if (i.lead?.endsWith(":") && i.rest !== undefined) out.push({ label: i.lead.slice(0, -1), value: i.rest });
  }
  return out;
}

/** The list after a bold caption such as "**What we deliver**", or the first list when no caption is given. */
export function list(node: SourceNode, caption?: string): ListItem[] {
  const blocks = walk(node);
  const start = caption === undefined ? 0 : blocks.findIndex((b) => b.kind === "caption" && b.text === caption);
  if (start === -1) fail(`List "${caption}"`, node);
  const found = blocks.slice(start).find((b): b is Extract<Block, { kind: "list" }> => b.kind === "list");
  return found?.items ?? fail(`List after "${caption ?? "start"}"`, node);
}

/** The first table whose first column heading matches, or the first table. */
export function table(node: SourceNode, firstHeading?: string): { head: string[]; rows: string[][] } {
  const t = walk(node).find((b): b is Extract<Block, { kind: "table" }> => b.kind === "table" && (firstHeading === undefined || b.head[0] === firstHeading));
  return t ?? fail(`Table "${firstHeading ?? "any"}"`, node);
}

/** Table rows as records keyed by column heading. */
export function records(node: SourceNode, firstHeading?: string): Record<string, string>[] {
  const t = table(node, firstHeading);
  return t.rows.map((r) => Object.fromEntries(t.head.map((h, i) => [h, r[i] ?? ""])));
}

export function faqs(node: SourceNode): { question: Inline; answer: Inline }[] {
  return walk(node).flatMap((b) => (b.kind === "faq" ? [{ question: b.question, answer: b.answer }] : []));
}

/** Plain paragraphs directly under a node. */
export function texts(node: SourceNode): Inline[] {
  return node.blocks.flatMap((b) => (b.kind === "text" ? [b.text] : []));
}

/**
 * A caption or field label shown as text, such as "Systems involved". It is looked up, so a label
 * that is renamed in site-content.md fails the build here.
 */
export function label(node: SourceNode, text: string): string {
  const ok = walk(node).some((b) => (b.kind === "caption" && b.text === text) || (b.kind === "field" && b.label === text));
  return ok ? text : fail(`Label "${text}"`, node);
}

/** "A | B (pre-filled)" into ["A", "B"]. "(pre-filled)" marks a button that pre-fills the form. */
export function pipe(value: string): string[] {
  return value.split(" | ").map((v) => v.replace(/ \(pre-filled\)$/, "").trim());
}

/** Removes a cell's whole-cell bold or code marks: "**Consult**" to "Consult", "`/x/`" to "/x/". */
export function cell(value: string): string {
  return value.replace(/^\*\*(.+)\*\*$/, "$1").replace(/^`(.+)`$/, "$1");
}

/** Inline Markdown as plain text, for attributes and metadata. */
export function plain(value: Inline): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

/** Every [text](href) in a value, such as a Related line. */
export function links(value: Inline): { label: string; href: string }[] {
  return [...value.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => ({ label: m[1] ?? "", href: m[2] ?? "" }));
}

/** Square-bracket placeholders that are not links, such as "[Date of legal approval]". */
export const PLACEHOLDER = /\[([^\][]+)\](?!\()/;
