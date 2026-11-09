import { z } from "zod";
import { COMPANY_DOCUMENTS, CONSENT, enquiryFieldNames, OPTIONAL_FOR_DOCUMENTS, PHONE_DEFAULT } from "@/lib/enquiry-fields";

/**
 * The enquiry form's Zod schema, shared by the browser and the server action, so both apply the
 * same rules and the same error messages from site-content.md (decision 288). The copy is passed
 * in, because the content layer is server-only and the browser receives it as props.
 */

type FieldCopy = { options?: string[]; error?: string };
export type EnquirySchemaCopy = { fields: Record<string, FieldCopy>; consentError: string };
export type EnquiryValues = Record<string, string>;
export type EnquiryErrors = Record<string, string>;

/** Reads the posted fields, by their posted names, from a form. */
export function readEnquiry(formData: FormData): EnquiryValues {
  const values: EnquiryValues = {};
  for (const name of [...Object.values(enquiryFieldNames), CONSENT]) values[name] = String(formData.get(name) ?? "").trim();
  // The "+971" the phone field starts with counts as empty (decision 288).
  if (values.phone?.replace(/\s/g, "") === PHONE_DEFAULT.trim()) values.phone = "";
  return values;
}

function buildSchema(copy: EnquirySchemaCopy, request: string) {
  const F = copy.fields;
  const err = (field: string) => F[field]?.error ?? "";
  const oneOf = (field: string) => z.string().refine((v) => (F[field]?.options ?? []).includes(v), { message: err(field) });
  const text = (field: string) => z.string().trim().min(1, { message: err(field) }).max(4000);
  const optional = (field: string) => request === COMPANY_DOCUMENTS && OPTIONAL_FOR_DOCUMENTS.includes(field);
  const maybe = (field: string, schema: z.ZodType<string>) => (optional(field) ? z.union([z.literal(""), schema]) : schema);

  return z.object({
    request: oneOf("Request type"),
    scope: maybe("Scope", text("Scope")),
    sector: oneOf("Sector"),
    system: maybe("System type", oneOf("System type")),
    location: maybe("Location", text("Location")),
    stage: maybe("Project stage", oneOf("Project stage")),
    name: text("Name").pipe(z.string().max(200)),
    organisation: text("Organisation").pipe(z.string().max(200)),
    email: z.email({ error: err("Email") }).max(254),
    phone: z.union([z.literal(""), z.string().regex(/^\+?[0-9 ()-]{7,20}$/, { message: err("Phone") })]),
    message: z.string().max(4000),
    [CONSENT]: z.literal("on", { error: copy.consentError }),
  });
}

export type EnquiryData = z.infer<ReturnType<typeof buildSchema>>;

/** Validates the values. Errors are keyed by posted name, with the first message for each field. */
export function validateEnquiry(copy: EnquirySchemaCopy, values: EnquiryValues): { ok: true; data: EnquiryData } | { ok: false; errors: EnquiryErrors } {
  const parsed = buildSchema(copy, values.request ?? "").safeParse(values);
  if (parsed.success) return { ok: true, data: parsed.data };
  const errors: EnquiryErrors = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}
