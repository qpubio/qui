import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const progressVariants = cva("relative w-full overflow-hidden rounded-full", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
    color: {
      default: "bg-foreground/20",
      primary: "bg-primary/20",
      secondary: "bg-secondary/20",
      info: "bg-info/20",
      debug: "bg-debug/20",
      warning: "bg-warning/20",
      success: "bg-success/20",
      error: "bg-error/20",
      fatal: "bg-fatal/20",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

const progressIndicatorVariants = cva("h-full w-full flex-1 transition-all", {
  variants: {
    color: {
      default: "bg-foreground",
      primary: "bg-primary",
      secondary: "bg-secondary",
      info: "bg-info",
      debug: "bg-debug",
      warning: "bg-warning",
      success: "bg-success",
      error: "bg-error",
      fatal: "bg-fatal",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

function Progress({
  className,
  value,
  size,
  color,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & VariantProps<typeof progressVariants>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(progressVariants({ size, color }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(progressIndicatorVariants({ color }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress, progressVariants, progressIndicatorVariants };
