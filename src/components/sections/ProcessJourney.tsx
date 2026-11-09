"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Rich } from "@/components/ui/Rich";
import { cn } from "@/lib/cn";
import { canRun3D, whenIdleAfterLoad } from "@/lib/device";

// Loaded only on capable desktops from 1024 px, once the section nears the viewport (decision 291).
const PipelineCanvas = dynamic(() => import("@/components/three/PipelineCanvas"), { ssr: false, loading: () => null });

export type JourneyStep = { number: number; title: string; text: string; photo: { src: string; alt: string; width: number; height: number } };

type ProcessJourneyProps = { id: string; steps: JourneyStep[]; copy: { modelCaption: string; photoNote: string } };

/**
 * "How we work" on About (decision 291). From 1024 px, the visual stays in view (CSS sticky) while
 * the five step cards scroll past normally and stay readable at all times. When a card reaches the
 * middle of the screen, the camera glides along the pipeline to its station. Nothing is pinned and
 * no text fades in, as CLAUDE.md's motion rules require; the page scroll is never taken over.
 *
 * The visual is the live model on capable desktops, or else the step's photo. Under 1024 px and
 * with reduced motion, there is no visual beside the list: each card shows its photo instead.
 */
export function ProcessJourney({ id, steps, copy }: ProcessJourneyProps) {
  const stage = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [live, setLive] = useState(false);

  // The card crossing the middle of the screen is the active step.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // The model loads on capable desktops from 1024 px, near the viewport, once the page is idle.
  useEffect(() => {
    const el = stage.current;
    if (!el || !canRun3D() || !window.matchMedia("(min-width: 64rem)").matches) return;
    let cancelIdle: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        cancelIdle = whenIdleAfterLoad(() => setEnabled(true));
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelIdle?.();
    };
  }, []);

  // Back to the photos if reduced motion is turned on or the window narrows under 1024 px.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 64rem) and (pointer: fine)");
    const check = () => {
      if (reduced.matches || !wide.matches) {
        setLive(false);
        setEnabled(false);
      }
    };
    reduced.addEventListener("change", check);
    wide.addEventListener("change", check);
    return () => {
      reduced.removeEventListener("change", check);
      wide.removeEventListener("change", check);
    };
  }, []);

  const onReady = useCallback(() => setLive(true), []);
  const onFallback = useCallback(() => {
    setLive(false);
    setEnabled(false);
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* The visual repeats the cards' content, so it is hidden from screen readers. */}
      <div aria-hidden="true" className="hidden lg:col-span-7 lg:block motion-reduce:lg:hidden">
        <div ref={stage} className="group/journey sticky top-28 aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-stone-100" data-3d={live ? "on" : "off"}>
          {steps.map((s, i) => (
            <Image
              key={s.number}
              src={s.photo.src}
              alt=""
              fill
              sizes="(min-width: 80rem) 728px, 58vw"
              className={cn(
                "object-cover transition-opacity duration-[320ms] ease-out group-data-[3d=on]/journey:opacity-0",
                i === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          {enabled ? (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-[320ms] ease-out group-data-[3d=on]/journey:opacity-100">
              <PipelineCanvas active={active} onReady={onReady} onFallback={onFallback} />
            </div>
          ) : null}
          <span className="absolute start-3 bottom-3">
            <Badge variant="neutral">{live ? copy.modelCaption : copy.photoNote}</Badge>
          </span>
        </div>
      </div>

      <div className="lg:col-span-5 motion-reduce:lg:col-span-12">
        <ol aria-labelledby={id} className="flex flex-col gap-6 lg:gap-0 motion-reduce:lg:grid motion-reduce:lg:grid-cols-3 motion-reduce:lg:gap-6">
          {steps.map((s, i) => (
            <li
              key={s.number}
              ref={(el) => {
                items.current[i] = el;
              }}
              data-index={i}
              aria-current={i === active ? "step" : undefined}
              // From 1024 px, each card has most of a screen to itself, so one station is active at a time.
              className="lg:flex lg:min-h-[70vh] lg:items-center motion-reduce:lg:block motion-reduce:lg:min-h-0"
            >
              <article
                className={cn(
                  "w-full rounded-lg border bg-white p-6 transition-colors duration-200 ease-out",
                  i === active ? "lg:border-maroon-700 lg:shadow-md motion-reduce:lg:border-hairline motion-reduce:lg:shadow-none" : "",
                  "border-hairline",
                )}
              >
                <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full border-[1.5px] border-maroon-700 text-compact font-semibold text-maroon-700 tabular-nums">
                  {s.number}
                </span>
                <h3 className="mt-4 text-h4 text-maroon-900">{s.title}</h3>
                <p className="mt-2 text-body text-ink">
                  <Rich text={s.text} />
                </p>
                <div className="relative mt-5 aspect-[3/2] overflow-hidden rounded-lg lg:hidden motion-reduce:lg:block">
                  <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 90vw, 100vw" className="object-cover" />
                </div>
              </article>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-small text-muted lg:hidden motion-reduce:lg:block">{copy.photoNote}</p>
      </div>
    </div>
  );
}
