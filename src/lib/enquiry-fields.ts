/**
 * Posted names of the enquiry form's fields, keyed by the field names in site-content.md's
 * Fields table. Shared by the form and its server action.
 */
export const enquiryFieldNames: Record<string, string> = {
  "Request type": "request",
  Scope: "scope",
  Sector: "sector",
  "System type": "system",
  Location: "location",
  "Project stage": "stage",
  Name: "name",
  Organisation: "organisation",
  Email: "email",
  Phone: "phone",
  Message: "message",
};

/** Request type that makes four fields optional (site-content.md, Enquiry form). */
export const COMPANY_DOCUMENTS = "Company documents";
export const OPTIONAL_FOR_DOCUMENTS = ["System type", "Location", "Project stage", "Scope"];
/** Request type that shows the job applications note. */
export const OTHER_REQUEST = "Other";

/** Name of the hidden spam-trap field. */
export const SPAM_TRAP = "website";

/** Posted name of the consent checkbox (decision 288). */
export const CONSENT = "consent";
/** What the phone field starts with, so that UAE numbers need only the local part (decision 288). */
export const PHONE_DEFAULT = "+971 ";
/** Field Cloudflare Turnstile adds to the form with its token. */
export const TURNSTILE_FIELD = "cf-turnstile-response";
