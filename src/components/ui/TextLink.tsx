import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { isLive } from "@/lib/routes";
import { Button } from "./Button";

/**
 * "View all …" style link with an arrow. It renders nothing when its route is not built yet, so no
 * page links to a missing page (decision 253).
 */
export function TextLink({ href, children, onDark = false }: { href: string; children: ReactNode; onDark?: boolean }) {
  if (!isLive(href)) return null;
  return (
    <Button href={href} variant="ghost" onDark={onDark} icon={<ArrowRight size={20} strokeWidth={1.5} />} className="-ms-6">
      {children}
    </Button>
  );
}
