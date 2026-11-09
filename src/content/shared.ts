import "server-only";
import { cell, field, list, maybeField, page, records, type SourcePage } from "./source";
import type { Action, Actions, Meta, Prefill } from "./types";

/** URL and meta tags from the bullet list at the top of a page. */
export function meta(p: SourcePage): Meta {
  const url = maybeField(p, "URL");
  return {
    url: url ? cell(url) : "",
    title: field(p, "Meta title"),
    description: maybeField(p, "Meta description") ?? "",
    noindex: maybeField(p, "Indexing") === "noindex" || undefined,
  };
}

function prefill(value: string): Prefill {
  const out: Prefill = {};
  if (value === "None") return out;
  for (const part of value.split("; ")) {
    const [k, v] = part.split(": ");
    if (!v) continue;
    if (k === "Request") out.request = v;
    if (k === "Sector") out.sector = v;
    if (k === "System") out.system = v;
  }
  return out;
}

const buttonRows = () => records(page("buttons-and-prefill"), "Page");

/**
 * The page's two buttons, from "Buttons and pre-filled enquiries", by the name in its first
 * column, such as "Home" or "Supply & Field Installation".
 */
export function actions(pageName: string): Actions {
  const row = buttonRows().find((r) => r["Page"] === pageName);
  if (!row) throw new Error(`site-content.md: no buttons row for "${pageName}".`);
  const href = (v: string | undefined) => (v && v.startsWith("`") ? cell(v) : null);
  const primary: Action = { label: row["Primary button"] ?? "", href: href(row["Primary link"]), prefill: prefill(row["Pre-filled fields"] ?? "None") };
  const secondary: Action = { label: row["Secondary button"] ?? "", href: href(row["Secondary link"]), prefill: {} };
  return { primary, secondary };
}

/** Titled steps from a list such as "**Define the scope.** Tell us…". */
export function steps(p: Parameters<typeof list>[0], caption?: string) {
  return list(p, caption).map((i) => ({ title: i.lead ?? "", text: i.rest ?? i.raw }));
}
