import * as z from "zod/mini";

/**
 * The newsletter sign-up's Zod schema, shared by the browser and the server action (decision 288).
 * It uses zod/mini, the smaller build, because the browser loads it on demand at the first submit
 * (decision 292).
 */
export type NewsletterSchemaCopy = { emailError: string; consentError: string };
export type NewsletterErrors = { email?: string; consent?: string };

export function validateNewsletter(copy: NewsletterSchemaCopy, raw: { email: string; consent: string }): { ok: true; email: string } | { ok: false; errors: NewsletterErrors } {
  const schema = z.object({
    email: z.email({ error: copy.emailError }).check(z.maxLength(254, { error: copy.emailError })),
    consent: z.literal("on", { error: copy.consentError }),
  });
  const parsed = schema.safeParse(raw);
  if (parsed.success) return { ok: true, email: parsed.data.email.toLowerCase() };
  const errors: NewsletterErrors = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0];
    if ((key === "email" || key === "consent") && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}
