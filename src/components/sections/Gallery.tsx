"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryPhoto = { src: string; alt: string; caption: string; credit: string };

type GalleryProps = {
  photos: GalleryPhoto[];
  /** Button names from the content layer. */
  labels: { close: string; previous: string; next: string };
};

/**
 * Case study photos with a lightbox (decision 281). Each thumbnail is a link to the full photo, so
 * it works without JavaScript. With JavaScript it opens a native modal dialog: Escape closes it,
 * Tab stays inside and focus returns to the thumbnail, and the arrow keys or buttons move between
 * photos. No motion beyond the browser's own.
 */
export function Gallery({ photos, labels }: GalleryProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const count = photos.length;
  const current = photos[index];

  const open = (i: number, el: HTMLElement) => {
    opener.current = el;
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = useCallback((d: number) => setIndex((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      // Keep Tab inside the dialog: a native modal still lets focus reach the browser's controls.
      if (e.key === "Tab") {
        const items = Array.from(d.querySelectorAll<HTMLElement>("button:not([disabled])"));
        if (!items.length) return;
        e.preventDefault();
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : i === -1 || i === items.length - 1 ? 0 : i + 1;
        items[next]?.focus();
      }
    };
    const closed = () => opener.current?.focus();
    d.addEventListener("keydown", key);
    d.addEventListener("close", closed);
    return () => {
      d.removeEventListener("keydown", key);
      d.removeEventListener("close", closed);
    };
  }, [step]);

  const ctrl = "inline-flex size-12 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-inverse-muted text-paper transition-colors duration-[120ms] ease-out hover:border-paper hover:bg-white/10";

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {photos.map((p, i) => (
          <li key={p.src}>
            <a
              href={p.src}
              onClick={(e) => {
                e.preventDefault();
                open(i, e.currentTarget);
              }}
              className="group/ph block overflow-hidden rounded-lg"
            >
              <span className="relative block aspect-[3/2]">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 48rem) 33vw, 50vw" className="object-cover transition-opacity duration-200 ease-out group-hover/ph:opacity-90" />
              </span>
            </a>
            <p className="mt-2 text-small text-muted">{p.caption}</p>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={current?.alt}
        className="on-dark m-auto h-dvh max-h-none w-full max-w-none bg-maroon-950 p-0 text-paper backdrop:bg-maroon-950"
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex justify-end p-4">
              <button type="button" aria-label={labels.close} onClick={() => dialog.current?.close()} className={ctrl}>
                <X aria-hidden="true" size={24} strokeWidth={1.5} />
              </button>
            </div>
            <figure className="relative mx-4 flex-1 md:mx-16">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </figure>
            <div className="flex items-center justify-between gap-4 p-4 md:px-16">
              <button type="button" aria-label={labels.previous} onClick={() => step(-1)} disabled={count < 2} className={ctrl}>
                <ChevronLeft aria-hidden="true" size={24} strokeWidth={1.5} />
              </button>
              <p aria-live="polite" className="max-w-[44rem] text-center text-compact">
                {current.caption}
                <span className="block text-small text-inverse-muted">{current.credit}</span>
              </p>
              <button type="button" aria-label={labels.next} onClick={() => step(1)} disabled={count < 2} className={ctrl}>
                <ChevronRight aria-hidden="true" size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
