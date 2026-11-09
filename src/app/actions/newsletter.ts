"use server";

import { newsletter, newsletterEnabled } from "@/content/site";
import { SPAM_TRAP } from "@/lib/enquiry-fields";
import { validateNewsletter, type NewsletterErrors } from "@/lib/newsletter-schema";
import { mailer, newsletterSegment, newsletterToken, renderEmail, siteOrigin } from "@/lib/server/mail";
import { routes } from "@/lib/routes";

export type NewsletterState = {
  status: "idle" | "invalid" | "success" | "failed";
  errors?: NewsletterErrors;
  /** Returned so that the field keeps its value after an error. */
  email?: string;
};

/**
 * Footer newsletter sign-up, with double opt-in (decisions 177 and 288). It validates with the same
 * Zod schema as the browser, adds the address to the Resend segment as unsubscribed, and emails a
 * signed confirmation link. The contact becomes subscribed only when the link is opened, on
 * /newsletter/confirm/. The reply is the same whether or not the address was already known, so the
 * form does not reveal who is subscribed.
 */
export async function subscribe(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const raw = { email: String(formData.get("email") ?? "").trim(), consent: String(formData.get("consent") ?? "") };

  // Spam trap: a filled hidden field ends quietly, without sending.
  if (String(formData.get(SPAM_TRAP) ?? "").length) return { status: "success" };

  const result = validateNewsletter(newsletter, raw);
  if (!result.ok) return { status: "invalid", email: raw.email, errors: result.errors };

  const mail = mailer();
  const segment = newsletterSegment();
  const token = newsletterToken(result.email);
  if (!newsletterEnabled() || !mail || !segment || !token) return { status: "failed", email: raw.email };

  try {
    // An existing contact makes this fail, which is fine: the confirmation link still subscribes it.
    await mail.resend.contacts.create({ email: result.email, unsubscribed: true, segments: [{ id: segment }] });

    const origin = await siteOrigin();
    const link = `${origin}${routes.newsletterConfirm}?token=${encodeURIComponent(token)}`;
    const email = renderEmail(
      [
        { kind: "heading", text: newsletter.confirmEmail.subject },
        { kind: "text", text: newsletter.confirmEmail.text },
        { kind: "button", text: newsletter.confirmEmail.button, href: link },
      ],
      origin,
    );
    const sent = await mail.resend.emails.send({ from: mail.from, to: result.email, subject: newsletter.confirmEmail.subject, html: email.html, text: email.text });
    if (sent.error) {
      console.error("Newsletter confirmation email failed", sent.error.message);
      return { status: "failed", email: raw.email };
    }
    return { status: "success" };
  } catch (e) {
    console.error("Newsletter sign-up failed", e);
    return { status: "failed", email: raw.email };
  }
}
