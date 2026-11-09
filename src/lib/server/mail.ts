import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";
import { Resend } from "resend";

/**
 * Email delivery through Resend, Cloudflare Turnstile checks and newsletter confirmation tokens
 * (decision 288). Everything reads from environment variables, and each part reports itself as
 * unavailable when its variables are missing, so the forms show "Sending failed" and never a false
 * success.
 */

const env = (name: string) => process.env[name]?.trim() || undefined;

/** The Resend client and sender, or null when RESEND_API_KEY or RESEND_FROM is missing. */
export function mailer(): { resend: Resend; from: string } | null {
  const key = env("RESEND_API_KEY");
  const from = env("RESEND_FROM");
  return key && from ? { resend: new Resend(key), from } : null;
}

/** Where enquiries go (decision 28). */
export const enquiryInbox = () => env("ENQUIRY_TO") ?? "info@vanguardgcc.com";

/** The Resend segment (formerly "audience") that holds newsletter contacts. */
export const newsletterSegment = () => env("RESEND_SEGMENT_ID") ?? env("RESEND_AUDIENCE_ID");

async function requestHeaders() {
  const h = await headers();
  return {
    ip: h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
    origin: env("SITE_URL")?.replace(/\/+$/, "") ?? `${h.get("x-forwarded-proto") ?? "https"}://${h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000"}`,
  };
}

/** The site's own origin, for links in emails. SITE_URL wins over the request's host. */
export async function siteOrigin(): Promise<string> {
  return (await requestHeaders()).origin;
}

/**
 * Checks a Turnstile token with Cloudflare. Turnstile is enforced only when TURNSTILE_SECRET_KEY is
 * set; without it the hidden spam-trap field is the only check.
 */
export async function turnstileOk(token: string): Promise<boolean> {
  const secret = env("TURNSTILE_SECRET_KEY");
  if (!secret) return true;
  if (!token) return false;
  const { ip } = await requestHeaders();
  const body = new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) });
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, signal: AbortSignal.timeout(8000), cache: "no-store" });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/* ---------- Newsletter confirmation tokens ---------- */

const TOKEN_DAYS = 7;
const b64 = (s: string | Buffer) => Buffer.from(s).toString("base64url");

function tokenSecret(): string | undefined {
  return env("NEWSLETTER_TOKEN_SECRET");
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

/** A signed link token holding the email address and an expiry, or null without a secret. */
export function newsletterToken(email: string): string | null {
  const secret = tokenSecret();
  if (!secret) return null;
  const payload = b64(JSON.stringify({ e: email, x: Date.now() + TOKEN_DAYS * 864e5 }));
  return `${payload}.${sign(payload, secret)}`;
}

/** The email address in a valid, unexpired token, or null. */
export function readNewsletterToken(token: string): string | null {
  const secret = tokenSecret();
  const [payload, sig] = token.split(".");
  if (!secret || !payload || !sig) return null;
  const expected = Buffer.from(sign(payload, secret));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString()) as { e?: unknown; x?: unknown };
    return typeof e === "string" && typeof x === "number" && x > Date.now() ? e : null;
  } catch {
    return null;
  }
}

/* ---------- Email layout ---------- */

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Inline Markdown links, [text](/url), as HTML links, with relative URLs made absolute. */
function inlineHtml(text: string, origin: string) {
  return escape(text).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, t: string, u: string) => `<a href="${u.startsWith("/") ? origin + u : u}" style="color:#571926">${t}</a>`);
}
const inlineText = (text: string, origin: string) => text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, t: string, u: string) => `${t} (${u.startsWith("/") ? origin + u : u})`);

export type EmailBlock = { kind: "heading"; text: string } | { kind: "text"; text: string } | { kind: "rows"; rows: [string, string][] } | { kind: "button"; text: string; href: string };

/** Builds a plain, accessible email from blocks, in the design system's colours, as HTML and text. */
export function renderEmail(blocks: EmailBlock[], origin: string): { html: string; text: string } {
  const font = "font-family:Inter,Arial,Helvetica,sans-serif;";
  const html = blocks
    .map((b) => {
      if (b.kind === "heading") return `<h1 style="${font}font-size:22px;line-height:30px;font-weight:600;color:#3B181E;margin:0 0 16px">${escape(b.text)}</h1>`;
      if (b.kind === "text") return `<p style="${font}font-size:16px;line-height:26px;color:#231A1B;margin:0 0 16px">${inlineHtml(b.text, origin)}</p>`;
      if (b.kind === "button")
        return `<p style="margin:24px 0"><a href="${escape(b.href)}" style="${font}display:inline-block;background:#571926;color:#FFFFFF;font-size:16px;font-weight:600;line-height:24px;padding:12px 24px;border-radius:4px;text-decoration:none">${escape(b.text)}</a></p>`;
      const rows = b.rows
        .filter(([, v]) => v)
        .map(([k, v]) => `<tr><th scope="row" style="${font}text-align:left;vertical-align:top;font-size:14px;line-height:20px;color:#655B56;font-weight:600;padding:8px 16px 8px 0;border-top:1px solid #D9D2CA">${escape(k)}</th><td style="${font}font-size:15px;line-height:24px;color:#231A1B;padding:8px 0;border-top:1px solid #D9D2CA;white-space:pre-wrap">${escape(v)}</td></tr>`)
        .join("");
      return `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin:8px 0 16px">${rows}</table>`;
    })
    .join("\n");
  const text = blocks
    .map((b) => {
      if (b.kind === "heading" || b.kind === "text") return inlineText(b.text, origin);
      if (b.kind === "button") return `${b.text}: ${b.href}`;
      return b.rows
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
    })
    .join("\n\n");
  return {
    html: `<!doctype html><html lang="en-GB"><body style="margin:0;padding:24px;background:#FBF9F6"><div style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #D9D2CA;border-radius:8px;padding:32px">${html}</div></body></html>`,
    text,
  };
}
