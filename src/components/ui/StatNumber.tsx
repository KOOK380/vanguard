"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type StatNumberProps = {
  /**
   * Only a sourced figure from site-content.md. The site has no sourced statistics at present
   * (decisions 69 and 122), so this must not appear on a page until one exists.
   */
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  onDark?: boolean;
  className?: string;
};

const DURATION = 800; // motion-slow ceiling in design-system.md
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts up once when scrolled into view. The final value is in the server HTML, so it reads
 * correctly without JavaScript, for screen readers and with reduced motion.
 */
export function StatNumber({ value, label, prefix = "", suffix = "", decimals = 0, onDark = false, className }: StatNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const format = (n: number) => new Intl.NumberFormat("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already on screen, so show the value as it is
    let frame = 0;
    // Reset to the start value just before the number comes into view, so that it never shows 0
    // to a visitor, crawler or screenshot that has not reached it.
    const prime = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        prime.disconnect();
        setShown(0);
      },
      { rootMargin: "0px 0px 25% 0px" },
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        prime.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          setShown(value * ease(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    prime.observe(el);
    observer.observe(el);
    return () => {
      prime.disconnect();
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span className={cn("flex flex-col gap-1", onDark ? "on-dark" : "on-light", className)}>
      <span ref={ref} aria-hidden="true" className="text-h2 tabular-nums text-(color:--heading)">
        {prefix}
        {format(shown)}
        {suffix}
      </span>
      <span aria-hidden="true" className="text-compact text-(color:--secondary)">
        {label}
      </span>
      <span className="sr-only">
        {prefix}
        {format(value)}
        {suffix} {label}
      </span>
    </span>
  );
}
