/** Whether an href leaves the Next.js router: phone, email, other sites or files. */
export function isExternalHref(href: string): boolean {
  return /^(tel:|mailto:|https?:\/\/)/.test(href) || /\.[a-z0-9]+$/i.test(href);
}

/**
 * Stops placeholder links. A bare "#" or an empty href is never allowed (CLAUDE.md, "No # links").
 * Fragments that point at a real element, such as "#main", are allowed.
 */
export function assertRealHref(href: string): void {
  if (href.trim() === "" || href.trim() === "#") {
    throw new Error(`Placeholder link "${href}". Link to a real route, tel:, mailto: or element ID, or leave the link out.`);
  }
}
