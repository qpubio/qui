"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Label } from "../label/label";
import type { TextareaPaletteColor, TextareaVisualVariant } from "./textarea.types";

const textareaVariants = cva(
  "selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 border bg-transparent transition-all outline-none resize-y disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0",
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
        sm: "min-h-[calc(var(--density-control-h-sm)*2.5)] px-3 py-1.5 rounded-xs text-xs",
        md: "min-h-[calc(var(--density-control-h)*2.5)] px-3 py-2 rounded-xs text-sm",
        lg: "min-h-[calc(var(--density-control-h-lg)*2.5)] px-3 py-2.5 rounded-xs text-base",
      },
    },
    compoundVariants: [
      {
        variant: "bordered",
        color: "default",
        class:
          "border-muted/30 bg-muted/5 placeholder:text-muted text-foreground hover:border-muted/80 focus:border-muted/80",
      },
      {
        variant: "bordered",
        color: "primary",
        class:
          "border-primary/30 bg-primary/5 placeholder:text-primary/70 text-primary hover:border-primary/80 focus:border-primary/80",
      },
      {
        variant: "bordered",
        color: "secondary",
        class:
          "border-secondary/30 bg-secondary/5 placeholder:text-secondary/70 text-secondary hover:border-secondary/80 focus:border-secondary/80",
      },
      {
        variant: "bordered",
        color: "info",
        class:
          "border-info/30 bg-info/5 placeholder:text-info/70 text-info hover:border-info/80 focus:border-info/80",
      },
      {
        variant: "bordered",
        color: "debug",
        class:
          "border-debug/30 bg-debug/5 placeholder:text-debug/70 text-debug hover:border-debug/80 focus:border-debug/80",
      },
      {
        variant: "bordered",
        color: "warning",
        class:
          "border-warning/30 bg-warning/5 placeholder:text-warning/70 text-warning hover:border-warning/80 focus:border-warning/80",
      },
      {
        variant: "bordered",
        color: "success",
        class:
          "border-success/30 bg-success/5 placeholder:text-success/70 text-success hover:border-success/80 focus:border-success/80",
      },
      {
        variant: "bordered",
        color: "error",
        class:
          "border-error/30 bg-error/5 placeholder:text-error/70 text-error hover:border-error/80 focus:border-error/80",
      },
      {
        variant: "bordered",
        color: "fatal",
        class:
          "border-fatal/30 bg-fatal/5 placeholder:text-fatal/70 text-fatal hover:border-fatal/80 focus:border-fatal/80",
      },
    ],
    defaultVariants: {
      variant: "bordered",
      color: "default",
      size: "md",
    },
  }
);

function Textarea({
  className,
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
}: Omit<React.ComponentProps<"textarea">, "size"> &
  VariantProps<typeof textareaVariants> & {
    variant?: TextareaVisualVariant;
    color?: TextareaPaletteColor;
    isInvalid?: boolean;
    errorMessage?: React.ReactNode;
    helperText?: React.ReactNode;
    label?: React.ReactNode;
    isRequired?: boolean;
    isDisabled?: boolean;
  }) {
  const generatedId = React.useId();
  const textareaId = id || (label ? generatedId : undefined);
  const effectiveColor = isInvalid ? "error" : color;

  return (
    <div>
      {label && (
        <Label htmlFor={textareaId} className="flex gap-1 mb-2" size={size || undefined}>
          {label}
          {isRequired && <span className="text-error">*</span>}
        </Label>
      )}
      <textarea
        id={textareaId}
        data-slot="textarea"
        aria-invalid={isInvalid}
        required={isRequired}
        disabled={isDisabled}
        className={cn(
          textareaVariants({ variant, color: effectiveColor, size }),
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

export { Textarea, textareaVariants };
