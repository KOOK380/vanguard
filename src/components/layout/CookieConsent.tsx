"use client";

import { useEffect, useEffectEvent, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Rich } from "@/components/ui/Rich";
import { onOpenCookieSettings, saveConsent, useConsent, type Consent } from "@/lib/consent";

/** Cookie banner and settings copy from the content layer, passed in because this is a client component. */
export type CookieCopy = {
  text: string;
  accept: string;
  decline: string;
  settings: string;
  dialog: { heading: string; intro: string; button: string; toggles: { key: keyof Consent; name: string; description: string; defaultOn: boolean }[] };
};

/**
 * Cookie banner and Cookie settings (decisions 174, 175 and 289). The banner appears at the bottom
 * of the screen until the visitor chooses. It is fixed over the page, so it causes no layout shift
 * and never blocks the page or the enquiry form; on phones it sits above the action bar. Accept and
 * Decline have the same size and style. Cookie settings is a native modal dialog with one choice per
 * tool, also opened from the footer. Without JavaScript nothing shows, and no analytics loads.
 */
export function CookieConsent({ copy }: { copy: CookieCopy }) {
  const consent = useConsent();
  const dialog = useRef<HTMLDialogElement>(null);
  const defaults: Consent = { ga: false, clarity: false, ...Object.fromEntries(copy.dialog.toggles.map((t) => [t.key, t.defaultOn])) };
  const [draft, setDraft] = useState<Consent>(defaults);

  // The toggles are controlled, so opening never re-mounts them and focus stays in the dialog.
  const open = () => {
    setDraft(consent ?? defaults);
    dialog.current?.showModal();
  };
  const openFromFooter = useEffectEvent(open);
  useEffect(() => onOpenCookieSettings(() => openFromFooter()), []);

  const save = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveConsent(draft);
    dialog.current?.close();
  };

  return (
    <>
      {consent === null ? (
        <div
          role="region"
          aria-label={copy.dialog.heading}
          className="fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-40 border-t border-hairline bg-white p-4 shadow-md md:start-6 md:end-auto md:bottom-6 md:max-w-xl md:rounded-lg md:border md:p-6"
        >
          <p className="text-compact text-ink">
            <Rich text={copy.text} />
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            <Button size="sm" variant="secondary" onClick={() => saveConsent({ ga: true, clarity: true })}>
              {copy.accept}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => saveConsent({ ga: false, clarity: false })}>
              {copy.decline}
            </Button>
            <Button size="sm" variant="ghost" onClick={open} className="col-span-2 md:col-span-1">
              {copy.settings}
            </Button>
          </div>
        </div>
      ) : null}

      <dialog
        ref={dialog}
        aria-labelledby="cookie-settings-heading"
        className="m-auto w-[calc(100%-32px)] max-w-lg rounded-lg border border-hairline bg-white p-6 text-ink shadow-lg backdrop:bg-ink/40 md:p-8"
      >
        <form onSubmit={save}>
          <h2 id="cookie-settings-heading" className="text-h4 text-maroon-900">
            {copy.dialog.heading}
          </h2>
          <p className="mt-2 text-compact text-muted">{copy.dialog.intro}</p>
          <div className="mt-6 grid gap-2">
            {copy.dialog.toggles.map((t) => (
              <FormField key={t.key} as="checkbox" id={`cookie-${t.key}`} name={t.key} label={t.name} help={t.description} checked={draft[t.key]} onChange={(e) => setDraft({ ...draft, [t.key]: e.currentTarget.checked })} />
            ))}
          </div>
          <div className="mt-6">
            <Button type="submit">{copy.dialog.button}</Button>
          </div>
        </form>
      </dialog>
    </>
  );
}
