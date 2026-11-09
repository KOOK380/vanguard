import { ChevronDown, CircleAlert, CircleCheck } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Shows a state without interaction. Only for the styleguide. */
export type FieldDemoState = "hover" | "focus";

type Base = {
  id: string;
  /** Text, or text with a link, as in the newsletter consent checkbox. */
  label: ReactNode;
  /**
   * Marks the field as not required. The label must already say "(optional)", as the copy in
   * site-content.md does, because this component adds no words of its own (decision 259).
   */
  optional?: boolean;
  help?: string;
  /** Shown when the value came from a pre-filled link. */
  prefilledNote?: string;
  error?: string;
  success?: string;
  demoState?: FieldDemoState;
  /** Set on a maroon section. Labels turn paper, the focus ring gold, and messages sit on a light chip. */
  onDark?: boolean;
  className?: string;
};

type TextFieldProps = Base & { as?: "input"; type?: "text" | "email" | "tel" } & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type" | "className">;
type TextareaFieldProps = Base & { as: "textarea" } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">;
type SelectFieldProps = Base & { as: "select"; options: string[]; /** Text of the empty first option, from the content layer. */ placeholder: string } & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className">;
type CheckboxFieldProps = Omit<Base, "optional" | "prefilledNote"> & { as: "checkbox" } & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type" | "className">;

export type FormFieldProps = TextFieldProps | TextareaFieldProps | SelectFieldProps | CheckboxFieldProps;

// The focus ring is set separately, because maroon-700 cannot be seen on a maroon section.
const control =
  "block w-full rounded-md border border-border bg-white px-3 py-[11px] text-field text-ink placeholder:text-muted transition-colors duration-[120ms] ease-out " +
  "hover:border-maroon-700 focus:border-maroon-700 focus:outline-2 focus:outline-offset-0 " +
  "data-[demo=hover]:border-maroon-700 data-[demo=focus]:border-maroon-700 data-[demo=focus]:outline-offset-0 " +
  "aria-invalid:border-2 aria-invalid:border-error " +
  "disabled:cursor-not-allowed disabled:border-hairline disabled:bg-stone-200 disabled:text-muted";

// Selects match :read-only in browsers, so this applies to inputs and text areas only.
const readOnly = "read-only:border-hairline read-only:bg-stone-100";

// The select's own arrow is removed and replaced by an icon, because a background-image arrow did
// not render. The end padding is inline, since px-3 already sets the inline padding (cn does not merge).
const selectReset = "appearance-none";

const ring = (onDark: boolean) => (onDark ? "focus:outline-gold-500" : "focus:outline-maroon-700");

function Messages({ id, help, prefilledNote, error, success, onDark = false }: Pick<Base, "id" | "help" | "prefilledNote" | "error" | "success" | "onDark">) {
  const note = onDark ? "text-inverse-muted" : "text-muted";
  // Error and success colours pass only on light, so on maroon they sit on their own light chip.
  const chip = onDark ? "w-fit rounded-sm px-2 py-1 " : "";
  return (
    <>
      {help ? <p id={`${id}-help`} className={cn("mt-1.5 text-small", note)}>{help}</p> : null}
      {prefilledNote ? <p id={`${id}-prefilled`} className={cn("mt-1.5 text-small", note)}>{prefilledNote}</p> : null}
      {error ? (
        <p id={`${id}-error`} className={cn("mt-1.5 flex items-start gap-1.5 text-small font-medium text-error", chip, onDark && "bg-error-100")}>
          <CircleAlert aria-hidden="true" size={16} strokeWidth={2} className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : null}
      {success ? (
        <p id={`${id}-success`} className={cn("mt-1.5 flex items-start gap-1.5 text-small font-medium text-success", chip, onDark && "bg-success-100")}>
          <CircleCheck aria-hidden="true" size={16} strokeWidth={2} className="mt-0.5 shrink-0" />
          {success}
        </p>
      ) : null}
    </>
  );
}

function describedBy(p: Pick<Base, "id" | "help" | "prefilledNote" | "error" | "success">): string | undefined {
  const ids = [p.help && `${p.id}-help`, p.prefilledNote && `${p.id}-prefilled`, p.error && `${p.id}-error`, p.success && `${p.id}-success`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function FormField(props: FormFieldProps) {
  const { id, label, help, error, success, demoState, className, onDark = false } = props;
  const prefilledNote = "prefilledNote" in props ? props.prefilledNote : undefined;
  const aria = { "aria-describedby": describedBy({ id, help, prefilledNote, error, success }), "aria-invalid": error ? true : undefined };

  if (props.as === "checkbox") {
    const { as: _a, id: _i, label: _l, help: _h, error: _e, success: _s, demoState: _d, className: _c, onDark: _od, ...rest } = props;
    return (
      <div className={className}>
        <label htmlFor={id} className={cn("flex min-h-11 cursor-pointer items-start gap-3 py-3 text-compact", onDark ? "text-paper" : "text-ink")}>
          <input id={id} type="checkbox" className={cn("mt-0.5 size-5 shrink-0 cursor-pointer rounded-sm", onDark ? "accent-gold-500" : "accent-maroon-700")} data-demo={demoState} {...aria} {...rest} />
          <span>{label}</span>
        </label>
        <Messages id={id} help={help} error={error} success={success} onDark={onDark} />
      </div>
    );
  }

  const optional = props.optional ?? false;
  const labelEl = (
    <label htmlFor={id} className={cn("mb-2 block text-label", onDark ? "text-paper" : "text-ink")}>
      {label}
    </label>
  );

  let field;
  if (props.as === "textarea") {
    const { as: _a, id: _i, label: _l, optional: _o, help: _h, prefilledNote: _p, error: _e, success: _s, demoState: _d, className: _c, onDark: _od, ...rest } = props;
    field = <textarea id={id} required={!optional} className={cn(control, ring(onDark), readOnly, "min-h-30 resize-y")} data-demo={demoState} {...aria} {...rest} />;
  } else if (props.as === "select") {
    const { as: _a, id: _i, label: _l, optional: _o, help: _h, prefilledNote: _p, error: _e, success: _s, demoState: _d, className: _c, onDark: _od, options, placeholder, ...rest } = props;
    field = (
      <div className="relative">
        <select id={id} required={!optional} className={cn(control, ring(onDark), selectReset, "min-h-12")} style={{ paddingInlineEnd: "3rem" }} data-demo={demoState} {...aria} {...rest}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" size={20} strokeWidth={1.5} className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-maroon-700" />
      </div>
    );
  } else {
    const { as: _a, id: _i, label: _l, optional: _o, help: _h, prefilledNote: _p, error: _e, success: _s, demoState: _d, className: _c, onDark: _od, type = "text", ...rest } = props;
    field = <input id={id} type={type} required={!optional} className={cn(control, ring(onDark), readOnly, "min-h-12")} data-demo={demoState} {...aria} {...rest} />;
  }

  return (
    <div className={className}>
      {labelEl}
      {field}
      <Messages id={id} help={help} prefilledNote={prefilledNote} error={error} success={success} onDark={onDark} />
    </div>
  );
}
