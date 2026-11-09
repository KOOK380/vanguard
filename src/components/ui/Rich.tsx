import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { isLive } from "@/lib/routes";

/** Same pattern as PLACEHOLDER in src/content/source.ts, kept here so client components can use Rich. */
const PLACEHOLDER = /\[([^\][]+)\](?!\()/;
const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;

type RichProps = {
  /** Inline Markdown from the content layer: [links](/url), **bold** and `code`. */
  text: string;
  /** Classes for links. Defaults to the section's link colour. */
  linkClassName?: string;
};

/**
 * Renders copy from site-content.md word for word. A link to a page that is not built becomes
 * plain text (decision 253). A square-bracket placeholder stops a production build, because none
 * may reach the live site (CLAUDE.md).
 */
// py-3 on an inline link enlarges its target to 44 px without changing the line spacing (CLAUDE.md).
const defaultLink = "py-3 text-(color:--link) underline decoration-1 underline-offset-[3px] hover:decoration-2";

export function Rich({ text, linkClassName = defaultLink }: RichProps) {
  const withoutLinks = text.replace(/\[[^\]]+\]\([^)]+\)/g, "");
  if (process.env.NODE_ENV === "production" && PLACEHOLDER.test(withoutLinks)) {
    throw new Error(`Unfilled placeholder in published copy: "${withoutLinks.match(PLACEHOLDER)?.[0]}". See project-docs/content-open-items.md.`);
  }
  const parts: ReactNode[] = text.split(TOKEN).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label = "", href = ""] = link;
      if (!isLive(href)) return <Fragment key={i}>{label}</Fragment>;
      return href.startsWith("/") ? (
        <Link key={i} href={href} className={linkClassName}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} className={linkClassName}>
          {label}
        </a>
      );
    }
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    if (/^`[^`]+`$/.test(part)) return <code key={i}>{part.slice(1, -1)}</code>;
    return <Fragment key={i}>{part}</Fragment>;
  });
  return <>{parts}</>;
}
