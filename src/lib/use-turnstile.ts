"use client";

import { useMemo, useRef, type RefObject } from "react";

/**
 * Cloudflare Turnstile for a form (decision 288). The script loads on the first call to load(), such
 * as the form's first focus, so it never delays the page. The widget renders in "interaction-only"
 * mode, so most visitors see nothing, and it writes its token into a hidden field in the form. With
 * no NEXT_PUBLIC_TURNSTILE_SITE_KEY, everything here does nothing and ready() is always true.
 */

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
};
type TurnstileWindow = Window & { turnstile?: TurnstileApi };

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const WAIT_MS = 15000;
let scriptPromise: Promise<TurnstileApi> | null = null;

function loadScript(): Promise<TurnstileApi> {
  scriptPromise ??= new Promise((resolve, reject) => {
    const w = window as TurnstileWindow;
    if (w.turnstile) return resolve(w.turnstile);
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => (w.turnstile ? resolve(w.turnstile) : reject(new Error("Turnstile did not start")));
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Turnstile did not load"));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export type Turnstile = {
  load: () => void;
  ready: () => boolean;
  submitWhenReady: () => void;
  reset: () => void;
};

/** form is the form element; container is an empty element in it where the widget may draw. */
export function useTurnstile(form: RefObject<HTMLFormElement | null>, container: RefObject<HTMLDivElement | null>, fieldName: string): Turnstile {
  const widget = useRef<string | null>(null);
  const waiting = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useMemo(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    /** Sends the waiting form: with a token, or without one if Turnstile failed, so the server says so. */
    const release = () => {
      if (!waiting.current) return;
      clearTimeout(waiting.current);
      waiting.current = null;
      form.current?.requestSubmit();
    };

    const load = () => {
      if (!siteKey || widget.current || !container.current) return;
      widget.current = "loading";
      loadScript()
        .then((api) => {
          if (!container.current) return;
          widget.current = api.render(container.current, {
            sitekey: siteKey,
            appearance: "interaction-only",
            theme: "light",
            language: "en",
            "response-field-name": fieldName,
            callback: release,
            "error-callback": release,
          });
        })
        .catch(() => {
          widget.current = null;
          release();
        });
    };

    const token = () => {
      const field = form.current?.elements.namedItem(fieldName);
      return field instanceof HTMLInputElement ? field.value : "";
    };

    return {
      load,
      ready: () => !siteKey || Boolean(token()),
      submitWhenReady: () => {
        if (waiting.current) return;
        waiting.current = setTimeout(release, WAIT_MS);
        load();
      },
      reset: () => {
        const api = (window as TurnstileWindow).turnstile;
        if (api && widget.current && widget.current !== "loading") api.reset(widget.current);
      },
    };
  }, [form, container, fieldName]);
}
