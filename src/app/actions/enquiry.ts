"use server";

import { enquiryFormCopy } from "@/content/pages";
import { enquiryFieldNames, SPAM_TRAP, TURNSTILE_FIELD } from "@/lib/enquiry-fields";
import { readEnquiry, validateEnquiry, type EnquiryData, type EnquiryErrors, type EnquiryValues } from "@/lib/enquiry-schema";
import { enquiryInbox, mailer, renderEmail, siteOrigin, turnstileOk } from "@/lib/server/mail";

/**
 * The enquiry form's server action (decisions 27, 28, 81, 282 and 288). It checks the hidden spam
 * trap and Cloudflare Turnstile, validates with the same Zod schema as the browser, then emails the
 * enquiry to info@vanguardgcc.com through Resend, with the visitor as Reply-To. The visitor gets an
 * automatic reply that repeats the approved success message and their answers. Success is returned
 * only once Resend accepts the enquiry email; a failed automatic reply does not undo it.
 */

export type EnquiryState = {
  status: "idle" | "invalid" | "success" | "failed";
  errors?: EnquiryErrors;
  values?: EnquiryValues;
  /** Sent with a success, for the "generate_lead" event. No personal data. */
  lead?: { request: string; sector: string; system: string };
};

const schemaCopy = { fields: enquiryFormCopy.fields, consentError: enquiryFormCopy.consentError };

/** The answers as label and value pairs, in the form's own order and words. */
function answerRows(data: EnquiryData): [string, string][] {
  return enquiryFormCopy.groups.flatMap((g) =>
    g.fields.map((field): [string, string] => {
      const name = enquiryFieldNames[field] ?? field;
      return [enquiryFormCopy.fields[field]?.label ?? field, String(data[name as keyof EnquiryData] ?? "")];
    }),
  );
}

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Returned with an error, so that the form keeps every answer, including the ticked consent box.
  const values = readEnquiry(formData);

  // Spam trap: a filled hidden field ends quietly, without sending.
  if (String(formData.get(SPAM_TRAP) ?? "").length) return { status: "success" };

  const result = validateEnquiry(schemaCopy, values);
  if (!result.ok) return { status: "invalid", errors: result.errors, values };

  if (!(await turnstileOk(String(formData.get(TURNSTILE_FIELD) ?? "")))) return { status: "failed", values };

  const mail = mailer();
  if (!mail) return { status: "failed", values };

  const data = result.data;
  const origin = await siteOrigin();
  const rows = answerRows(data);
  const inbox = enquiryInbox();

  // Internal email to the inbox. Not published on the site, so its subject is a plain summary.
  const internal = renderEmail([{ kind: "heading", text: `${data.request}: ${data.organisation}` }, { kind: "rows", rows }], origin);
  try {
    const sent = await mail.resend.emails.send({
      from: mail.from,
      to: inbox,
      replyTo: data.email,
      subject: `Website enquiry: ${data.request}, ${data.organisation}`.replace(/\s+/g, " "),
      html: internal.html,
      text: internal.text,
    });
    if (sent.error) {
      console.error("Enquiry email failed", sent.error.message);
      return { status: "failed", values };
    }
  } catch (e) {
    console.error("Enquiry email failed", e);
    return { status: "failed", values };
  }

  // Automatic reply, in the approved words of the success message (site-content.md).
  const reply = renderEmail(
    [
      { kind: "heading", text: enquiryFormCopy.success.heading },
      { kind: "text", text: enquiryFormCopy.success.text },
      { kind: "rows", rows },
    ],
    origin,
  );
  try {
    const sent = await mail.resend.emails.send({ from: mail.from, to: data.email, replyTo: inbox, subject: enquiryFormCopy.success.heading, html: reply.html, text: reply.text });
    if (sent.error) console.error("Enquiry automatic reply failed", sent.error.message);
  } catch (e) {
    console.error("Enquiry automatic reply failed", e);
  }

  return { status: "success", lead: { request: data.request, sector: data.sector, system: data.system } };
}
