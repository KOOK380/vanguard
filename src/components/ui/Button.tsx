import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { assertRealHref, isExternalHref } from "@/lib/links";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "gold";
export type ButtonSize = "sm" | "md" | "lg";
/** Shows a state without interaction. Only for the styleguide. */
export type ButtonDemoState = "hover" | "active" | "focus";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Set when the button sits on a maroon section. */
  onDark?: boolean;
  /** Decorative icon placed after the label, such as an arrow. */
  icon?: ReactNode;
  /** Decorative icon placed before the label, such as a phone. */
  leadingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
  demoState?: ButtonDemoState;
};

type LinkProps = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
type NativeButtonProps = CommonProps & {
  href?: undefined;
  /** Shows a spinner and this label, keeps the width, and sets aria-busy. */
  loading?: boolean;
  loadingLabel?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = LinkProps | NativeButtonProps;

const base =
  // Labels may wrap on narrow screens, because some copy is long, such as "See control and
  // instrumentation engineering" (decision 280). Single-line buttons keep their minimum height.
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-md border-[1.5px] py-2 text-center font-semibold transition-colors duration-[120ms] ease-out select-none";

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-btn-sm",
  md: "min-h-12 px-6 text-btn-md",
  lg: "min-h-14 px-8 text-btn-lg",
};

// Hover and active classes are repeated as data-demo variants, so the styleguide can show each state.
const variantsLight: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-maroon-700 text-white hover:bg-maroon-900 active:bg-maroon-950 data-[demo=hover]:bg-maroon-900 data-[demo=active]:bg-maroon-950 disabled:bg-stone-200 disabled:text-muted",
  secondary:
    "border-maroon-700 text-maroon-700 hover:bg-maroon-100 active:bg-maroon-100 active:text-maroon-900 data-[demo=hover]:bg-maroon-100 data-[demo=active]:bg-maroon-100 data-[demo=active]:text-maroon-900 disabled:border-transparent disabled:bg-stone-200 disabled:text-muted",
  ghost:
    "border-transparent text-maroon-700 underline decoration-1 underline-offset-[3px] hover:bg-maroon-100 hover:text-maroon-900 active:text-maroon-950 data-[demo=hover]:bg-maroon-100 data-[demo=hover]:text-maroon-900 data-[demo=active]:text-maroon-950 disabled:text-muted disabled:no-underline",
  // Gold on light is allowed only with a maroon border, because gold on paper is 2.25:1 (decision 249).
  gold: "border-maroon-700 bg-gold-500 text-maroon-900 hover:bg-gold-300 active:bg-gold-500 active:text-maroon-950 data-[demo=hover]:bg-gold-300 data-[demo=active]:text-maroon-950 disabled:border-transparent disabled:bg-stone-200 disabled:text-muted",
};

const variantsDark: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-maroon-700 text-white hover:bg-maroon-950 active:bg-maroon-950 data-[demo=hover]:bg-maroon-950 data-[demo=active]:bg-maroon-950 disabled:bg-stone-200 disabled:text-muted",
  secondary:
    "border-inverse-muted text-paper hover:border-paper hover:bg-white/10 active:bg-white/5 data-[demo=hover]:border-paper data-[demo=hover]:bg-white/10 data-[demo=active]:bg-white/5 disabled:border-transparent disabled:bg-stone-200 disabled:text-muted",
  ghost:
    "border-transparent text-paper underline decoration-1 underline-offset-[3px] hover:bg-white/10 active:bg-white/5 data-[demo=hover]:bg-white/10 data-[demo=active]:bg-white/5 disabled:text-inverse-muted disabled:no-underline",
  gold: "border-transparent bg-gold-500 text-maroon-900 hover:bg-gold-300 active:bg-gold-500 active:text-maroon-950 data-[demo=hover]:bg-gold-300 data-[demo=active]:text-maroon-950 disabled:bg-stone-200 disabled:text-muted",
};

function classesFor(variant: ButtonVariant, size: ButtonSize, onDark: boolean, className?: string): string {
  return cn(base, sizes[size], onDark ? variantsDark[variant] : variantsLight[variant], "disabled:cursor-not-allowed", className);
}

function Inner({ children, icon, leadingIcon }: Pick<CommonProps, "children" | "icon" | "leadingIcon">) {
  return (
    <>
      {leadingIcon ? <span aria-hidden="true" className="inline-flex shrink-0">{leadingIcon}</span> : null}
      <span>{children}</span>
      {icon ? (
        <span aria-hidden="true" className="inline-flex shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-1">
          {icon}
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", onDark = false, icon, leadingIcon, className, children, demoState } = props;
  const classes = classesFor(variant, size, onDark, className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, onDark: _d, icon: _i, leadingIcon: _l, className: _c, children: _ch, demoState: _ds, ...rest } = props;
    assertRealHref(href);
    const content = <Inner icon={icon} leadingIcon={leadingIcon}>{children}</Inner>;
    return isExternalHref(href) ? (
      <a href={href} className={classes} data-demo={demoState} {...rest}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} data-demo={demoState} {...rest}>
        {content}
      </Link>
    );
  }

  const { loading = false, loadingLabel, type = "button", variant: _v, size: _s, onDark: _d, icon: _i, leadingIcon: _l, className: _c, children: _ch, demoState: _ds, href: _h, ...rest } = props;
  if (loading && !loadingLabel) throw new Error("A loading button needs loadingLabel, taken from site-content.md.");
  return (
    <button type={type} className={classes} data-demo={demoState} aria-busy={loading || undefined} {...rest}>
      {loading ? (
        <>
          {/* The hidden label keeps the button's width while it shows the loading label. */}
          <span className="invisible inline-flex items-center gap-2" aria-hidden="true">
            <Inner icon={icon} leadingIcon={leadingIcon}>{children}</Inner>
          </span>
          <span className="absolute inset-0 inline-flex items-center justify-center gap-2">
            <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" />
            <span>{loadingLabel}</span>
          </span>
        </>
      ) : (
        <Inner icon={icon} leadingIcon={leadingIcon}>{children}</Inner>
      )}
    </button>
  );
}
