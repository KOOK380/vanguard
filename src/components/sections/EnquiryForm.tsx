"use client";

import { useActionState, useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { CircleAlert, CircleCheck } from "lucide-react";
import { sendEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Rich } from "@/components/ui/Rich";
import { COMPANY_DOCUMENTS, CONSENT, enquiryFieldNames, OPTIONAL_FOR_DOCUMENTS, OTHER_REQUEST, PHONE_DEFAULT, SPAM_TRAP, TURNSTILE_FIELD } from "@/lib/enquiry-fields";
import { readEnquiry, validateEnquiry, type EnquiryErrors } from "@/lib/enquiry-schema";
import { useTurnstile } from "@/lib/use-turnstile";

type FieldCopy = { label: string; help?: string; options?: string[]; error?: string };

/** The enquiry form's copy from the content layer, passed in because this is a client component. */
export type EnquiryCopy = {
  heading: string;
  intro: string;
  groups: { name: string; fields: string[] }[];
  fields: Record<string, FieldCopy>;
  companyDocumentsHelp: string;
  jobApplicationsHelp: string;
  prefilledHelp: string;
  spamTrapLabel: string;
  /** Inline Markdown with the Privacy Policy link. */
  consent: string;
  consentError: string;
  button: string;
  sending: string;
  errorSummary: { heading: string; text: string };
  success: { heading: string; text: string };
  failed: string;
  /** "(optional)", taken from the copy's own optional labels. */
  optionalSuffix: string;
};

const TEXTAREAS = new Set(["Scope", "Message"]);
const INPUT_TYPES: Record<string, { type: "text" | "email" | "tel"; autoComplete?: string }> = {
  Name: { type: "text", autoComplete: "name" },
  Organisation: { type: "text", autoComplete: "organization" },
  Email: { type: "email", autoComplete: "email" },
  Phone: { type: "tel", autoComplete: "tel" },
  Location: { type: "text" },
};
// Optional by default, as their labels in the copy say.
const ALWAYS_OPTIONAL = new Set(["Phone", "Message"]);

function Submit({ copy }: { copy: EnquiryCopy }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} loadingLabel={copy.sending} className="w-full md:w-auto">
      {copy.button}
    </Button>
  );
}

/**
 * The enquiry form (decision 282), from site-content.md: three groups, visible labels, help text,
 * errors linked with aria-describedby, and an error summary that takes focus. Buttons on other pages
 * pre-fill it in the browser (decision 272); without JavaScript the form still works, unfilled. "Company documents" makes four fields optional, and "Other" shows the
 * job applications note. The same Zod schema runs in the browser before sending and in the server
 * action (decision 288). A hidden spam trap and Cloudflare Turnstile stop spam; Turnstile loads only
 * once the visitor starts on the form, so it adds nothing to the first page load. Without
 * JavaScript the form still posts, but Turnstile cannot run, so the visitor sees "Sending failed"
 * with the phone number and email address.
 */
/** The query string, read in the browser; empty on the server, so the page stays static. */
const subscribe = () => () => {};
const useQuery = () => useSyncExternalStore(subscribe, () => window.location.search, () => "");

/** Values from a pre-filled link (decision 272), kept only when they match an option in the copy. */
function readPrefill(query: string, copy: EnquiryCopy): Record<string, string> {
  const q = new URLSearchParams(query);
  const out: Record<string, string> = {};
  for (const [field, key] of [["Request type", "request"], ["Sector", "sector"], ["System type", "system"]] as const) {
    const value = q.get(key);
    if (value && copy.fields[field]?.options?.includes(value)) out[enquiryFieldNames[field] ?? key] = value;
  }
  return out;
}

/** Sends "generate_lead" to Google Tag Manager or gtag, if either has loaded after consent. No personal data. */
function trackLead(lead: NonNullable<EnquiryState["lead"]>) {
  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  const params = { form: "enquiry", request_type: lead.request, sector: lead.sector, system_type: lead.system };
  w.dataLayer?.push({ event: "generate_lead", ...params });
  w.gtag?.("event", "generate_lead", params);
}

export function EnquiryForm({ copy }: { copy: EnquiryCopy }) {
  const [state, action] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" });
  const form = useRef<HTMLFormElement>(null);
  const widget = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile(form, widget, TURNSTILE_FIELD);
  // Errors found in the browser, kept until the next server reply.
  const [clientErrors, setClientErrors] = useState<{ errors: EnquiryErrors; after: EnquiryState } | null>(null);
  const query = useQuery();
  const prefill = readPrefill(query, copy);
  const values = state.values ?? prefill;
  // The request type chosen since the last submission, or else the submitted or pre-filled one.
  const [picked, setPicked] = useState<{ value: string; after: EnquiryState } | null>(null);
  const request = picked && picked.after === state ? picked.value : (values.request ?? "");
  const summary = useRef<HTMLDivElement>(null);
  const result = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "invalid") summary.current?.focus();
    if (state.status === "success" || state.status === "failed") result.current?.focus();
    if (state.status === "success" && state.lead) trackLead(state.lead);
    // A Turnstile token works once, so a failed send needs a new one.
    if (state.status === "failed") turnstile.reset();
  }, [state, turnstile]);

  useEffect(() => {
    if (clientErrors) summary.current?.focus();
  }, [clientErrors]);

  /** Runs the shared schema before sending. Valid answers go on to the server action. */
  function check(e: FormEvent<HTMLFormElement>) {
    const result = validateEnquiry({ fields: copy.fields, consentError: copy.consentError }, readEnquiry(new FormData(e.currentTarget)));
    if (!result.ok) {
      e.preventDefault();
      setClientErrors({ errors: result.errors, after: state });
      return;
    }
    setClientErrors(null);
    // Wait for Turnstile's token, then send automatically.
    if (!turnstile.ready()) {
      e.preventDefault();
      turnstile.submitWhenReady();
    }
  }

  if (state.status === "success") {
    return (
      <div ref={result} tabIndex={-1} role="status" className="rounded-lg border-2 border-success bg-success-100 p-6 text-success">
        <h2 className="flex items-center gap-2 text-h4">
          <CircleCheck aria-hidden="true" size={24} strokeWidth={2} />
          {copy.success.heading}
        </h2>
        <p className="mt-2 text-body text-ink">
          <Rich text={copy.success.text} />
        </p>
      </div>
    );
  }

  const errors = clientErrors && clientErrors.after === state ? clientErrors.errors : (state.errors ?? {});
  const docs = request === COMPANY_DOCUMENTS;
  const labelFor = (field: string) => {
    const base = copy.fields[field]?.label ?? field;
    return docs && OPTIONAL_FOR_DOCUMENTS.includes(field) ? `${base} ${copy.optionalSuffix}` : base;
  };
  const summaryItems = [...Object.values(enquiryFieldNames), CONSENT].flatMap((name) => (errors[name] ? [{ id: `enq-${name}`, text: errors[name] ?? "" }] : []));

  return (
    <form ref={form} action={action} onSubmit={check} onFocus={() => turnstile.load()} noValidate>
      <h2 id="enquiry-form" className="text-h3 text-(color:--heading)">
        {copy.heading}
      </h2>
      <p className="mt-2 text-compact text-muted">
        <Rich text={copy.intro} />
      </p>

      {summaryItems.length ? (
        <div ref={summary} tabIndex={-1} role="alert" aria-labelledby="enq-summary" className="mt-6 rounded-md border-2 border-error bg-white p-4 text-ink">
          <h3 id="enq-summary" className="flex items-center gap-2 text-h6 text-error">
            <CircleAlert aria-hidden="true" size={20} strokeWidth={2} />
            {copy.errorSummary.heading}
          </h3>
          <p className="mt-1 text-compact">
            <Rich text={copy.errorSummary.text} />
          </p>
          <ul className="mt-2 list-disc ps-6 text-compact">
            {summaryItems.map((e) => (
              <li key={e.id}>
                <a href={`#${e.id}`} className="inline-flex min-h-11 items-center text-maroon-700 underline">
                  {e.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {state.status === "failed" ? (
        <div ref={result} tabIndex={-1} role="alert" className="mt-6 flex items-start gap-2 rounded-md bg-error-100 p-4 text-compact font-medium text-error">
          <CircleAlert aria-hidden="true" size={20} strokeWidth={2} className="mt-0.5 shrink-0" />
          <p>
            <Rich text={copy.failed} />
          </p>
        </div>
      ) : null}

      {copy.groups.map((g) => (
        <fieldset key={g.name} className="mt-8">
          {/* Floated, so the divider runs the full width instead of breaking around the legend. */}
          <legend className="float-left w-full border-t border-hairline pt-6 text-h5 text-maroon-900">{g.name}</legend>
          <div className="clear-both grid gap-x-6 gap-y-5 pt-5 md:grid-cols-2">
            {g.fields.map((field) => {
              const name = enquiryFieldNames[field] ?? field;
              const f = copy.fields[field];
              const id = `enq-${name}`;
              const optional = ALWAYS_OPTIONAL.has(field) || (docs && OPTIONAL_FOR_DOCUMENTS.includes(field));
              // The phone field starts with the UAE country code (decision 288).
              const value = (name === "phone" ? values[name] || PHONE_DEFAULT : values[name]) ?? "";
              const prefilled = !state.values && Boolean(prefill[name]);
              let help = f?.help;
              if (field === "Request type" && docs) help = copy.companyDocumentsHelp;
              if (field === "Request type" && request === OTHER_REQUEST) help = copy.jobApplicationsHelp;
              const common = {
                id,
                name,
                label: labelFor(field),
                optional,
                help,
                error: errors[name],
                prefilledNote: prefilled ? copy.prefilledHelp : undefined,
                className: TEXTAREAS.has(field) ? "md:col-span-2" : undefined,
              };
              const key = `${id}-${state.status}-${value}`;
              if (f?.options) {
                return (
                  <FormField
                    key={key}
                    {...common}
                    as="select"
                    options={f.options}
                    placeholder=""
                    defaultValue={value}
                    onChange={field === "Request type" ? (e) => setPicked({ value: e.currentTarget.value, after: state }) : undefined}
                  />
                );
              }
              if (TEXTAREAS.has(field)) return <FormField key={key} {...common} as="textarea" defaultValue={value} rows={5} />;
              const t = INPUT_TYPES[field] ?? { type: "text" as const };
              return <FormField key={key} {...common} type={t.type} autoComplete={t.autoComplete} defaultValue={value} />;
            })}
          </div>
        </fieldset>
      ))}

      {/* Spam trap, hidden from view and from screen readers (site-content.md) */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="enq-website">{copy.spamTrapLabel}</label>
        <input id="enq-website" name={SPAM_TRAP} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <FormField
        key={`enq-consent-${state.status}-${values[CONSENT] ?? ""}`}
        as="checkbox"
        id={`enq-${CONSENT}`}
        name={CONSENT}
        label={<Rich text={copy.consent} />}
        defaultChecked={values[CONSENT] === "on"}
        error={errors[CONSENT]}
        className="mt-8 border-t border-hairline pt-6"
      />
      {/* Cloudflare Turnstile draws its check here, only when it needs the visitor (interaction-only). */}
      <div ref={widget} className="mt-4 empty:hidden" />
      <div className="mt-6">
        <Submit copy={copy} />
      </div>
    </form>
  );
}
