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
        sm: "h-7 px-3 py-1 rounded-xs text-xs file:py-0 file:h-3.5 file:text-xs",
        md: "h-9 px-3 py-1 rounded-xs text-sm file:h-6 file:text-sm",
        lg: "h-12 px-3 py-2 rounded-xs text-base file:h-7 file:text-sm",
      },
    },
    compoundVariants: [
      // Default color variant
      {
        variant: "bordered",
        color: "default",
        class:
          "border-muted/30 bg-muted/5 placeholder:text-muted text-foreground file:text-muted hover:border-muted/80 focus:border-muted/80",
      },
      // Primary color variant
      {
        variant: "bordered",
        color: "primary",
        class:
          "border-primary/30 bg-primary/5 placeholder:text-primary/70 text-primary file:text-primary hover:border-primary/80 focus:border-primary/80",
      },
      // Secondary color variant
      {
        variant: "bordered",
        color: "secondary",
        class:
          "border-secondary/30 bg-secondary/5 placeholder:text-secondary/70 text-secondary file:text-secondary hover:border-secondary/80 focus:border-secondary/80",
      },
      // Info color variant
      {
        variant: "bordered",
        color: "info",
        class:
          "border-info/30 bg-info/5 placeholder:text-info/70 text-info file:text-info hover:border-info/80 focus:border-info/80",
      },
      // Debug color variant
      {
        variant: "bordered",
        color: "debug",
        class:
          "border-debug/30 bg-debug/5 placeholder:text-debug/70 text-debug file:text-debug hover:border-debug/80 focus:border-debug/80",
      },
      // Warning color variant
      {
        variant: "bordered",
        color: "warning",
        class:
          "border-warning/30 bg-warning/5 placeholder:text-warning/70 text-warning file:text-warning hover:border-warning/80 focus:border-warning/80",
      },
      // Success color variant
      {
        variant: "bordered",
        color: "success",
        class:
          "border-success/30 bg-success/5 placeholder:text-success/70 text-success file:text-success hover:border-success/80 focus:border-success/80",
      },
      // Error color variant
      {
        variant: "bordered",
        color: "error",
        class:
          "border-error/30 bg-error/5 placeholder:text-error/70 text-error file:text-error hover:border-error/80 focus:border-error/80",
      },
      // Fatal color variant
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
  }) {
  // Generate unique ID if none provided and label exists
  const generatedId = React.useId();
  const inputId = id || (label ? generatedId : undefined);

  // Override color with error if isInvalid is true
  const effectiveColor = isInvalid ? "error" : color;

  return (
    <div>
      {label && (
        <Label htmlFor={inputId} className="flex gap-1 mb-2" size={size || undefined}>
          {label}
          {isRequired && <span className="text-error">*</span>}
        </Label>
      )}
      <input
        type={type}
        id={inputId}
        data-slot="input"
        aria-invalid={isInvalid}
        required={isRequired}
        disabled={isDisabled}
        className={cn(
          inputVariants({ variant, color: effectiveColor, size }),
          // Only add invalid styles when actually invalid
          isInvalid && "border-error bg-error/10",
          className
        )}
        {...props}
      />
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
