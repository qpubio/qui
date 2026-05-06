import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const spinnerVariants = cva("animate-spin rounded-full border-2", {
  variants: {
    color: {
      default: "border-foreground/20 border-t-foreground",
      current: "border-foreground/20 border-t-current",
      primary: "border-primary/20 border-t-primary",
      secondary: "border-secondary/20 border-t-secondary",
      info: "border-info/20 border-t-info",
      debug: "border-debug/20 border-t-debug",
      success: "border-success/20 border-t-success",
      warning: "border-warning/20 border-t-warning",
      error: "border-error/20 border-t-error",
      fatal: "border-fatal/20 border-t-fatal",
    },
    size: {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ className, color, size, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(spinnerVariants({ color, size }), className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
