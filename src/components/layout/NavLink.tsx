"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";

const strip = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

type NavLinkProps = { href: string; className?: string; children: ReactNode };

function CurrentAwareLink({ href, className, children }: NavLinkProps) {
  const pathname = usePathname();
  const current = strip(pathname ?? "") === strip(href);
  return (
    <Link href={href} className={className} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  );
}

/**
 * A menu link that sets aria-current="page" on the current page. Reading the URL suspends on routes
 * whose path is known only at request time, such as /studio/, under Cache Components; the fallback
 * is the same link without aria-current (decision 283).
 */
export function NavLink(props: NavLinkProps) {
  return (
    <Suspense
      fallback={
        <Link href={props.href} className={props.className}>
          {props.children}
        </Link>
      }
    >
      <CurrentAwareLink {...props} />
    </Suspense>
  );
}

type PathSwitchProps = { path: string; match?: ReactNode; children: ReactNode };

function PathSwitchInner({ path, match = null, children }: PathSwitchProps) {
  const pathname = usePathname();
  return <>{strip(pathname ?? "") === strip(path) ? match : children}</>;
}

/** Renders `match` on the given path and `children` everywhere else. The fallback is `children`. */
export function PathSwitch(props: PathSwitchProps) {
  return (
    <Suspense fallback={props.children}>
      <PathSwitchInner {...props} />
    </Suspense>
  );
}
