import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** IDs of items that start open. */
  defaultOpen?: string[];
  /** Set to let only one item stay open, using the native name attribute. */
  exclusiveName?: string;
  className?: string;
};

/** Native details and summary: works by keyboard and with no JavaScript. */
export function Accordion({ items, defaultOpen = [], exclusiveName, className }: AccordionProps) {
  return (
    <div className={cn("border-t border-hairline", className)}>
      {items.map((item) => (
        <details key={item.id} id={item.id} name={exclusiveName} open={defaultOpen.includes(item.id)} className="group/acc border-b border-hairline">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-3 text-h6 text-maroon-900 [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDown aria-hidden="true" size={24} strokeWidth={1.5} className="shrink-0 text-maroon-700 transition-transform duration-200 ease-out group-open/acc:rotate-180" />
          </summary>
          <div className="max-w-[44rem] pb-6 text-body">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
