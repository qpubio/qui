"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Label } from "../label/label";
import type { InputPaletteColor, InputVisualVariant } from "./input.types";

const inputVariants = cva(
  "selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 border bg-transparent transition-all outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0",
  {
    variants: {
      variant: {
        bordered: "",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        info: "",
        debug: "",
        warning: "",
        success: "",
        error: "",
        fatal: "",
      },
      size: {
        sm: "h-[var(--density-control-h-sm)] px-3 py-1 rounded-xs text-xs file:py-0 file:h-3.5 file:text-xs",
        md: "h-[var(--density-control-h)] px-3 py-1 rounded-xs text-sm file:h-6 file:text-sm",
        lg: "h-[var(--density-control-h-lg)] px-3 py-2 rounded-xs text-base file:h-7 file:text-sm",
      },
    },
    compoundVariants: [
      {
        variant: "bordered",
        color: "default",
        class:
          "border-muted/30 bg-muted/5 placeholder:text-muted text-foreground file:text-muted hover:border-muted/80 focus:border-muted/80",
      },
      {
        variant: "bordered",
        color: "primary",
        class:
          "border-primary/30 bg-primary/5 placeholder:text-primary/70 text-primary file:text-primary hover:border-primary/80 focus:border-primary/80",
      },
      {
        variant: "bordered",
        color: "secondary",
        class:
          "border-secondary/30 bg-secondary/5 placeholder:text-secondary/70 text-secondary file:text-secondary hover:border-secondary/80 focus:border-secondary/80",
      },
      {
        variant: "bordered",
        color: "info",
        class:
          "border-info/30 bg-info/5 placeholder:text-info/70 text-info file:text-info hover:border-info/80 focus:border-info/80",
      },
      {
        variant: "bordered",
        color: "debug",
        class:
          "border-debug/30 bg-debug/5 placeholder:text-debug/70 text-debug file:text-debug hover:border-debug/80 focus:border-debug/80",
      },
      {
        variant: "bordered",
        color: "warning",
        class:
          "border-warning/30 bg-warning/5 placeholder:text-warning/70 text-warning file:text-warning hover:border-warning/80 focus:border-warning/80",
      },
      {
        variant: "bordered",
        color: "success",
        class:
          "border-success/30 bg-success/5 placeholder:text-success/70 text-success file:text-success hover:border-success/80 focus:border-success/80",
      },
      {
        variant: "bordered",
        color: "error",
        class:
          "border-error/30 bg-error/5 placeholder:text-error/70 text-error file:text-error hover:border-error/80 focus:border-error/80",
      },
      {
        variant: "bordered",
        color: "fatal",
        class:
          "border-fatal/30 bg-fatal/5 placeholder:text-fatal/70 text-fatal file:text-fatal hover:border-fatal/80 focus:border-fatal/80",
      },
    ],
    defaultVariants: {
      variant: "bordered",
      color: "default",
      size: "md",
    },
  }
);

const inputShellVariants = cva(
  "flex w-full min-w-0 items-center gap-2 border bg-transparent transition-all",
  {
    variants: {
      size: {
        sm: "h-[var(--density-control-h-sm)] px-2 rounded-xs text-xs",
        md: "h-[var(--density-control-h)] px-2.5 rounded-xs text-sm",
        lg: "h-[var(--density-control-h-lg)] px-3 rounded-xs text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function Input({
  className,
  type,
  variant,
  color,
  size,
  isInvalid = false,
  errorMessage,
  helperText,
  label,
  id,
  isRequired,
  isDisabled,
  startContent,
  endContent,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    variant?: InputVisualVariant;
    color?: InputPaletteColor;
    isInvalid?: boolean;
    errorMessage?: React.ReactNode;
    helperText?: React.ReactNode;
    label?: React.ReactNode;
    isRequired?: boolean;
    isDisabled?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
  }) {
  const generatedId = React.useId();
  const inputId = id || (label ? generatedId : undefined);
  const effectiveColor = isInvalid ? "error" : color;
  const hasAdornments = startContent != null || endContent != null;

  const fieldClass = cn(
    inputVariants({ variant, color: effectiveColor, size }),
    isInvalid && "border-error bg-error/10",
    hasAdornments &&
      "h-auto flex-1 border-0 bg-transparent px-0 py-0 shadow-none focus:border-0",
    className
  );

  const control = (
    <input
      type={type}
      id={inputId}
      data-slot="input"
      aria-invalid={isInvalid}
      required={isRequired}
      disabled={isDisabled}
      className={fieldClass}
      {...props}
    />
  );

  return (
    <div>
      {label && (
        <Label htmlFor={inputId} className="flex gap-1 mb-2" size={size || undefined}>
          {label}
          {isRequired && <span className="text-error">*</span>}
        </Label>
      )}
      {hasAdornments ? (
        <div
          data-slot="input-shell"
          className={cn(
            inputShellVariants({ size }),
            inputVariants({ variant, color: effectiveColor, size }),
            "py-0 focus-within:border-muted/80",
            effectiveColor === "primary" && "focus-within:border-primary/80",
            effectiveColor === "error" && "focus-within:border-error/80",
            isInvalid && "border-error bg-error/10",
            isDisabled && "opacity-50 pointer-events-none"
          )}
        >
          {startContent != null && (
            <span data-slot="input-start" className="shrink-0 text-muted">
              {startContent}
            </span>
          )}
          {control}
          {endContent != null && (
            <span data-slot="input-end" className="shrink-0 text-muted">
              {endContent}
            </span>
          )}
        </div>
      ) : (
        control
      )}
      {errorMessage && (
        <div className="text-sm text-error mt-0.5" role="alert">
          {errorMessage}
        </div>
      )}
      {helperText && !errorMessage && (
        <div
          className={cn(
            "text-muted mt-0.5",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base",
            !size && "text-sm"
          )}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}

export { Input, inputVariants };
