"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const promptVariants = cva(
  [
    "flex w-full items-stretch gap-2 border-t border-border bg-card",
    "px-[var(--density-pad-sm)] py-2",
    "font-mono text-sm",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type PromptProps = Omit<React.ComponentProps<"form">, "onSubmit"> &
  VariantProps<typeof promptVariants> & {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    isDisabled?: boolean;
    /** Called with the trimmed value on submit. Return false to keep the text. */
    onSubmit?: (value: string) => void | boolean | Promise<void | boolean>;
    onValueChange?: (value: string) => void;
    inputProps?: Omit<
      React.ComponentProps<"input">,
      "value" | "defaultValue" | "onChange" | "disabled" | "placeholder"
    >;
    multiline?: boolean;
  };

function Prompt({
  className,
  size,
  prefix = "$",
  suffix,
  value: valueProp,
  defaultValue = "",
  placeholder,
  isDisabled,
  onSubmit,
  onValueChange,
  inputProps,
  multiline = false,
  ...props
}: PromptProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolled;

  const setValue = (next: string) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isDisabled) return;
    const result = await onSubmit?.(trimmed);
    if (result !== false) setValue("");
  };

  const sharedFieldClass = cn(
    "flex-1 min-w-0 bg-transparent outline-none",
    "text-foreground placeholder:text-muted/70",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "caret-cursor"
  );

  return (
    <form
      data-slot="prompt"
      className={cn(promptVariants({ size }), className)}
      onSubmit={handleSubmit}
      {...props}
    >
      {prefix != null && (
        <span
          data-slot="prompt-prefix"
          className="shrink-0 select-none text-primary pt-0.5"
          aria-hidden
        >
          {prefix}
        </span>
      )}
      {multiline ? (
        <textarea
          data-slot="prompt-input"
          rows={2}
          value={value}
          disabled={isDisabled}
          placeholder={placeholder}
          aria-label={inputProps?.["aria-label"] ?? "Command prompt"}
          className={cn(sharedFieldClass, "resize-none py-0.5")}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
        />
      ) : (
        <input
          data-slot="prompt-input"
          type="text"
          value={value}
          disabled={isDisabled}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          aria-label={inputProps?.["aria-label"] ?? "Command prompt"}
          className={sharedFieldClass}
          onChange={(e) => setValue(e.target.value)}
          {...inputProps}
        />
      )}
      {suffix != null && (
        <span data-slot="prompt-suffix" className="shrink-0 text-muted">
          {suffix}
        </span>
      )}
    </form>
  );
}

export { Prompt, promptVariants };
