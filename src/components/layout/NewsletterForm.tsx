"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { subscribe, type NewsletterState } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Rich } from "@/components/ui/Rich";
import { SPAM_TRAP } from "@/lib/enquiry-fields";
import type { NewsletterErrors } from "@/lib/newsletter-schema";

/** Newsletter copy from the content layer, passed in because this is a client component. */
export type NewsletterCopy = {
  label: string;
  consent: string;
  button: string;
  sending: string;
  success: string;
  failed: string;
  summaryHeading: string;
  emailError: string;
  consentError: string;
  /** "Leave this field empty", shared with the enquiry form's spam trap. */
  spamTrapLabel: string;
};

function SubmitButton({
  copy,
  pending,
}: {
  copy: NewsletterCopy;
  pending: boolean;
}) {
  return (
    <Button
      type="submit"
      variant="gold"
      onDark
      loading={pending}
      loadingLabel={copy.sending}
      className="w-full md:w-auto"
    >
      {copy.button}
    </Button>
  );
}

/**
 * Footer newsletter sign-up. It works without JavaScript, because the form posts to a server
 * action. With JavaScript, the same Zod schema checks it first, and an error summary takes focus
 * after a failed submit. A hidden spam trap stops simple bots from sending confirmation emails
 * (decision 288).
 */
export function NewsletterForm({ copy }: { copy: NewsletterCopy }) {
  const [state, action, pending] = useActionState<NewsletterState, FormData>(
    subscribe,
    { status: "idle" },
  );
  const summary = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLParagraphElement>(null);
  const [clientErrors, setClientErrors] = useState<{
    errors: NewsletterErrors;
    after: NewsletterState;
  } | null>(null);

  useEffect(() => {
    if (state.status === "invalid") summary.current?.focus();
    if (state.status === "success" || state.status === "failed")
      status.current?.focus();
  }, [state]);

  useEffect(() => {
    if (clientErrors) summary.current?.focus();
  }, [clientErrors]);

  // The schema loads on the first submit, not with the page: this form is in the shared layout, and
  // Zod would otherwise add about 24 KB to every page's first load (decision 292). A valid form is
  // then sent to the server action, which checks it again with the same schema. Without JavaScript,
  // the form posts to the action directly.
  function check(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    void import("@/lib/newsletter-schema").then(({ validateNewsletter }) => {
      const result = validateNewsletter(copy, {
        email: String(data.get("email") ?? "").trim(),
        consent: String(data.get("consent") ?? ""),
      });
      if (!result.ok)
        return setClientErrors({ errors: result.errors, after: state });
      setClientErrors(null);
      startTransition(() => action(data));
    });
  }

  if (state.status === "success") {
    return (
      <p
        ref={status}
        tabIndex={-1}
        role="status"
        className="on-light flex items-start gap-2 rounded-md bg-success-100 px-4 py-3 text-compact font-medium text-success"
      >
        <CircleCheck
          aria-hidden="true"
          size={20}
          strokeWidth={2}
          className="mt-0.5 shrink-0"
        />
        {copy.success}
      </p>
    );
  }

  const errors =
    clientErrors && clientErrors.after === state
      ? clientErrors.errors
      : (state.errors ?? {});
  const list = [
    errors.email && { id: "newsletter-email", text: errors.email },
    errors.consent && { id: "newsletter-consent", text: errors.consent },
  ].filter((e): e is { id: string; text: string } => Boolean(e));

  const consentLabel = (
    <Rich
      text={copy.consent}
      linkClassName="py-3 text-paper underline decoration-1 underline-offset-[3px] hover:text-gold-300"
    />
  );

  return (
    <form
      action={action}
      onSubmit={check}
      noValidate
      className="grid gap-x-3 md:grid-cols-[1fr_auto] md:items-end"
    >
      {list.length ? (
        <div
          ref={summary}
          tabIndex={-1}
          role="alert"
          aria-labelledby="newsletter-summary"
          className="on-light mb-4 rounded-md border-2 border-error bg-white p-4 text-ink md:col-span-2"
        >
          <h3
            id="newsletter-summary"
            className="flex items-center gap-2 text-h6 text-error"
          >
            <CircleAlert aria-hidden="true" size={20} strokeWidth={2} />
            {copy.summaryHeading}
          </h3>
          <ul className="mt-2 list-disc ps-6 text-compact">
            {list.map((e) => (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  className="inline-flex min-h-11 items-center text-maroon-700 underline"
                >
                  {e.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {state.status === "failed" ? (
        <p
          ref={status}
          tabIndex={-1}
          role="alert"
          className="on-light mb-4 flex items-start gap-2 rounded-md bg-error-100 px-4 py-3 text-compact font-medium text-error md:col-span-2"
        >
          <CircleAlert
            aria-hidden="true"
            size={20}
            strokeWidth={2}
            className="mt-0.5 shrink-0"
          />
          {copy.failed}
        </p>
      ) : null}
      <FormField
        key={`email-${state.email ?? ""}`}
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        label={copy.label}
        defaultValue={state.email}
        error={errors.email}
        onDark
      />
      <div className="mt-3 md:mt-0">
        <SubmitButton copy={copy} pending={pending} />
      </div>
      <FormField
        as="checkbox"
        id="newsletter-consent"
        name="consent"
        label={consentLabel}
        error={errors.consent}
        onDark
        className="mt-2 md:col-span-2"
      />
      {/* Spam trap, hidden from view and from screen readers */}
      <div
        aria-hidden="true"
        className="absolute -start-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="newsletter-website">{copy.spamTrapLabel}</label>
        <input
          id="newsletter-website"
          name={SPAM_TRAP}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
    </form>
  );
}
