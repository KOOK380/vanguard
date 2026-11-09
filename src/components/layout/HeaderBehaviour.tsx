"use client";

import { useEffect } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), summary, input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** True when the element is inside a closed <details>, other than as that element's own summary. */
function inClosedDetails(el: HTMLElement): boolean {
  let d = el.closest("details");
  while (d) {
    if (!d.open && !(el.tagName === "SUMMARY" && el.parentElement === d)) return true;
    d = d.parentElement?.closest("details") ?? null;
  }
  return false;
}

/**
 * Small enhancements for the header. The menus are native popovers, so they open, close with
 * Escape and return focus without JavaScript. This adds:
 * - aria-expanded on each menu button
 * - closing a menu when one of its links is chosen, because client-side navigation keeps it open
 * - for the phone menu: a focus trap, and the rest of the page made inert while it is open
 */
export function HeaderBehaviour({ menuId }: { menuId: string }) {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    document.querySelectorAll<HTMLButtonElement>("button[popovertarget]").forEach((button) => {
      const target = document.getElementById(button.getAttribute("popovertarget") ?? "");
      if (!target || button.getAttribute("popovertargetaction") === "hide") return;
      button.setAttribute("aria-expanded", String(target.matches(":popover-open")));
      const sync = (e: Event) => button.setAttribute("aria-expanded", String((e as ToggleEvent).newState === "open"));
      target.addEventListener("toggle", sync);
      cleanups.push(() => target.removeEventListener("toggle", sync));
    });

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest("a[href]");
      const popover = link?.closest<HTMLElement>("[popover]");
      if (popover?.matches(":popover-open")) popover.hidePopover();
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    const menu = document.getElementById(menuId);
    if (menu) {
      const outside = () =>
        Array.from(document.body.children).filter((el): el is HTMLElement => el instanceof HTMLElement && !el.contains(menu));
      const header = menu.closest("header");
      const headerRest = () => (header ? Array.from(header.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el !== menu) : []);
      const setInert = (on: boolean) => [...outside(), ...headerRest()].forEach((el) => (el.inert = on));

      // beforetoggle runs before the browser restores focus to the menu button, so the button
      // must be made usable again here, not in toggle.
      const before = (e: Event) => {
        if ((e as ToggleEvent).newState === "closed") setInert(false);
      };
      const after = (e: Event) => {
        if ((e as ToggleEvent).newState !== "open") return;
        setInert(true);
        menu.querySelector<HTMLElement>(FOCUSABLE)?.focus();
      };
      // Chrome loses focus to the body when tabbing past a closed <details> inside a popover, so
      // the trap moves focus itself on every Tab, through the items that can be seen.
      const trap = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        const items = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => !inClosedDetails(el) && el.getClientRects().length > 0);
        if (!items.length) return;
        e.preventDefault();
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : i === -1 || i === items.length - 1 ? 0 : i + 1;
        items[next]?.focus();
      };
      // The desktop layout hides the menu button, so close the menu if the window widens.
      const wide = window.matchMedia("(min-width: 80rem)");
      const onWide = () => {
        if (wide.matches && menu.matches(":popover-open")) menu.hidePopover();
      };
      menu.addEventListener("beforetoggle", before);
      menu.addEventListener("toggle", after);
      menu.addEventListener("keydown", trap);
      wide.addEventListener("change", onWide);
      cleanups.push(() => {
        menu.removeEventListener("beforetoggle", before);
        menu.removeEventListener("toggle", after);
        menu.removeEventListener("keydown", trap);
        wide.removeEventListener("change", onWide);
        setInert(false);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [menuId]);

  return null;
}
