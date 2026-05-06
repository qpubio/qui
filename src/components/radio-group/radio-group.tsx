import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const radioGroupItemVariants = cva(
  [
    // Layout
    "aspect-square shrink-0 rounded-full",

    // Visual
    "border shadow-xs",

    // Interactive
    "transition-[color,box-shadow]",
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
        default: ["border-input text-primary", "dark:bg-input/30"].join(" "),
        flat: ["border-transparent bg-foreground/20"].join(" "),
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
        class: "data-[state=checked]:border-foreground data-[state=checked]:text-foreground",
      },
      {
        variant: "default",
        color: "primary",
        class:
          "border-primary/30 bg-primary/5 text-primary data-[state=checked]:border-primary data-[state=checked]:text-primary",
      },
      {
        variant: "default",
        color: "secondary",
        class:
          "border-secondary/30 bg-secondary/5 text-secondary data-[state=checked]:border-secondary data-[state=checked]:text-secondary",
      },
      {
        variant: "default",
        color: "info",
        class:
          "border-info/30 bg-info/5 text-info data-[state=checked]:border-info data-[state=checked]:text-info",
      },
      {
        variant: "default",
        color: "debug",
        class:
          "border-debug/30 bg-debug/5 text-debug data-[state=checked]:border-debug data-[state=checked]:text-debug",
      },
      {
        variant: "default",
        color: "warning",
        class:
          "border-warning/30 bg-warning/5 text-warning data-[state=checked]:border-warning data-[state=checked]:text-warning",
      },
      {
        variant: "default",
        color: "success",
        class:
          "border-success/30 bg-success/5 text-success data-[state=checked]:border-success data-[state=checked]:text-success",
      },
      {
        variant: "default",
        color: "error",
        class:
          "border-error/30 bg-error/5 text-error data-[state=checked]:border-error data-[state=checked]:text-error",
      },
      {
        variant: "default",
        color: "fatal",
        class:
          "border-fatal/30 bg-fatal/5 text-fatal data-[state=checked]:border-fatal data-[state=checked]:text-fatal",
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
    ],
    defaultVariants: {
      variant: "default",
      color: "default",
      size: "md",
    },
  }
);

const radioGroupIndicatorVariants = cva("relative flex items-center justify-center", {
  variants: {
    size: {
      sm: "[&_svg]:size-1.5",
      md: "[&_svg]:size-2",
      lg: "[&_svg]:size-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  variant,
  color,
  size,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioGroupItemVariants>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(radioGroupItemVariants({ variant, color, size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(radioGroupIndicatorVariants({ size }))}
      >
        <CircleIcon className="fill-current absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem, radioGroupItemVariants };
