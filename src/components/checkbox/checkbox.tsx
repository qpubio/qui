import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const checkboxVariants = cva(
  [
    // Layout
    "peer shrink-0",

    // Visual
    "border rounded-[4px]",
    "shadow-xs",

    // Interactive
    "transition-all",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "outline-none",

    // Focus
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",

    // Validation
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive",
  ].join(" "),
  {
    variants: {
      variant: {
        default: ["border-muted/30 bg-muted/5", "data-[state=checked]:border-foreground"].join(" "),
        flat: ["border-transparent bg-foreground/20"].join(" "),
        light: ["border-transparent bg-foreground/5"].join(" "),
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
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
      },
    },
    compoundVariants: [
      // Default variant colors
      {
        variant: "default",
        color: "default",
        class: "data-[state=checked]:bg-foreground data-[state=checked]:text-background",
      },
      {
        variant: "default",
        color: "primary",
        class:
          "border-primary/30 bg-primary/5 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
      },
      {
        variant: "default",
        color: "secondary",
        class:
          "border-secondary/30 bg-secondary/5 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=checked]:border-secondary",
      },
      {
        variant: "default",
        color: "info",
        class:
          "border-info/30 bg-info/5 data-[state=checked]:bg-info data-[state=checked]:text-info-foreground data-[state=checked]:border-info",
      },
      {
        variant: "default",
        color: "debug",
        class:
          "border-debug/30 bg-debug/5 data-[state=checked]:bg-debug data-[state=checked]:text-debug-foreground data-[state=checked]:border-debug",
      },
      {
        variant: "default",
        color: "warning",
        class:
          "border-warning/30 bg-warning/5 data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground data-[state=checked]:border-warning",
      },
      {
        variant: "default",
        color: "success",
        class:
          "border-success/30 bg-success/5 data-[state=checked]:bg-success data-[state=checked]:text-success-foreground data-[state=checked]:border-success",
      },
      {
        variant: "default",
        color: "error",
        class:
          "border-error/30 bg-error/5 data-[state=checked]:bg-error data-[state=checked]:text-error-foreground data-[state=checked]:border-error",
      },
      {
        variant: "default",
        color: "fatal",
        class:
          "border-fatal/30 bg-fatal/5 data-[state=checked]:bg-fatal data-[state=checked]:text-fatal-foreground data-[state=checked]:border-fatal",
      },

      // Flat variant colors
      {
        variant: "flat",
        color: "default",
        class: "data-[state=checked]:bg-foreground data-[state=checked]:text-background",
      },
      {
        variant: "flat",
        color: "primary",
        class:
          "bg-primary/20 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
      },
      {
        variant: "flat",
        color: "secondary",
        class:
          "bg-secondary/20 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=checked]:border-secondary",
      },
      {
        variant: "flat",
        color: "info",
        class:
          "bg-info/20 data-[state=checked]:bg-info data-[state=checked]:text-info-foreground data-[state=checked]:border-info",
      },
      {
        variant: "flat",
        color: "debug",
        class:
          "bg-debug/20 data-[state=checked]:bg-debug data-[state=checked]:text-debug-foreground data-[state=checked]:border-debug",
      },
      {
        variant: "flat",
        color: "warning",
        class:
          "bg-warning/20 data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground data-[state=checked]:border-warning",
      },
      {
        variant: "flat",
        color: "success",
        class:
          "bg-success/20 data-[state=checked]:bg-success data-[state=checked]:text-success-foreground data-[state=checked]:border-success",
      },
      {
        variant: "flat",
        color: "error",
        class:
          "bg-error/20 data-[state=checked]:bg-error data-[state=checked]:text-error-foreground data-[state=checked]:border-error",
      },
      {
        variant: "flat",
        color: "fatal",
        class:
          "bg-fatal/20 data-[state=checked]:bg-fatal data-[state=checked]:text-fatal-foreground data-[state=checked]:border-fatal",
      },

      // Light variant colors
      {
        variant: "light",
        color: "default",
        class: "data-[state=checked]:bg-muted/30 data-[state=checked]:text-foreground",
      },
      {
        variant: "light",
        color: "primary",
        class:
          "bg-primary/10 data-[state=checked]:bg-primary/25 data-[state=checked]:text-foreground",
      },
      {
        variant: "light",
        color: "secondary",
        class:
          "bg-secondary/10 data-[state=checked]:bg-secondary/25 data-[state=checked]:text-foreground",
      },
      {
        variant: "light",
        color: "info",
        class: "bg-info/10 data-[state=checked]:bg-info/25 data-[state=checked]:text-foreground",
      },
      {
        variant: "light",
        color: "debug",
        class: "bg-debug/10 data-[state=checked]:bg-debug/25 data-[state=checked]:text-foreground",
      },
      {
        variant: "light",
        color: "warning",
        class:
          "bg-warning/10 data-[state=checked]:bg-warning/25 data-[state=checked]:text-foreground",
      },
      {
        variant: "light",
        color: "success",
        class:
          "bg-success/10 data-[state=checked]:bg-success/25 data-[state=checked]:text-foreground",
      },
      {
        variant: "light",
        color: "error",
        class: "bg-error/10 data-[state=checked]:bg-error/25 data-[state=checked]:text-foreground",
      },
      {
        variant: "light",
        color: "fatal",
        class: "bg-fatal/10 data-[state=checked]:bg-fatal/25 data-[state=checked]:text-foreground",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "default",
      size: "md",
    },
  }
);

const checkboxIndicatorVariants = cva(
  "flex items-center justify-center text-current transition-none",
  {
    variants: {
      size: {
        sm: "[&_svg]:size-2.5",
        md: "[&_svg]:size-3.5",
        lg: "[&_svg]:size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function Checkbox({
  className,
  variant,
  color,
  size,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant, color, size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(checkboxIndicatorVariants({ size }))}
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, checkboxVariants };
