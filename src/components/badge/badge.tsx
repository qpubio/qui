import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  [
    // Layout
    "inline-flex items-center justify-center",
    "w-fit whitespace-nowrap shrink-0",
    "gap-1",

    // Visual
    "rounded-md border",
    "text-xs font-medium",
    "overflow-hidden",

    // Interactive
    "focus-visible:ring-ring/50 focus-visible:ring-[2px]",
    "aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40",
    "aria-invalid:border-error",
    "transition-[color,box-shadow]",

    // Icons
    "[&>svg]:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "border-transparent",
        bordered: "bg-background",
        flat: "border-transparent",
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
        sm: "h-5 min-w-5 px-1 py-0.5 text-xs",
        md: "h-6 min-w-6 px-1 py-0.5 text-xs",
        lg: "h-7 min-w-7 px-1 py-0.5 text-sm",
      },
    },
    compoundVariants: [
      // Solid variant (solid backgrounds)
      {
        variant: "solid",
        color: "default",
        class: ["bg-foreground text-background", "[a&]:hover:bg-foreground/80"].join(" "),
      },
      {
        variant: "solid",
        color: "primary",
        class: ["bg-primary text-primary-foreground", "[a&]:hover:bg-primary/80"].join(" "),
      },
      {
        variant: "solid",
        color: "secondary",
        class: ["bg-secondary text-secondary-foreground", "[a&]:hover:bg-secondary/80"].join(" "),
      },
      {
        variant: "solid",
        color: "info",
        class: ["bg-info text-info-foreground", "[a&]:hover:bg-info/80"].join(" "),
      },
      {
        variant: "solid",
        color: "debug",
        class: ["bg-debug text-debug-foreground", "[a&]:hover:bg-debug/80"].join(" "),
      },
      {
        variant: "solid",
        color: "warning",
        class: ["bg-warning text-warning-foreground", "[a&]:hover:bg-warning/80"].join(" "),
      },
      {
        variant: "solid",
        color: "success",
        class: ["bg-success text-success-foreground", "[a&]:hover:bg-success/80"].join(" "),
      },
      {
        variant: "solid",
        color: "error",
        class: ["bg-error text-error-foreground", "[a&]:hover:bg-error/80"].join(" "),
      },
      {
        variant: "solid",
        color: "fatal",
        class: ["bg-fatal text-fatal-foreground", "[a&]:hover:bg-fatal/80"].join(" "),
      },

      // Bordered variant (border colors)
      {
        variant: "bordered",
        color: "default",
        class: ["border-foreground text-foreground", "[a&]:hover:bg-foreground/5"].join(" "),
      },
      {
        variant: "bordered",
        color: "primary",
        class: ["border-primary text-primary", "[a&]:hover:bg-primary/5"].join(" "),
      },
      {
        variant: "bordered",
        color: "secondary",
        class: ["border-secondary text-secondary", "[a&]:hover:bg-secondary/5"].join(" "),
      },
      {
        variant: "bordered",
        color: "info",
        class: ["border-info text-info", "[a&]:hover:bg-info/5"].join(" "),
      },
      {
        variant: "bordered",
        color: "debug",
        class: ["border-debug text-debug", "[a&]:hover:bg-debug/5"].join(" "),
      },
      {
        variant: "bordered",
        color: "warning",
        class: ["border-warning text-warning", "[a&]:hover:bg-warning/5"].join(" "),
      },
      {
        variant: "bordered",
        color: "success",
        class: ["border-success text-success", "[a&]:hover:bg-success/5"].join(" "),
      },
      {
        variant: "bordered",
        color: "error",
        class: ["border-error text-error", "[a&]:hover:bg-error/5"].join(" "),
      },
      {
        variant: "bordered",
        color: "fatal",
        class: ["border-fatal text-fatal", "[a&]:hover:bg-fatal/5"].join(" "),
      },

      // Flat variant (subtle backgrounds)
      {
        variant: "flat",
        color: "default",
        class: ["bg-foreground/10 text-foreground", "[a&]:hover:bg-foreground/15"].join(" "),
      },
      {
        variant: "flat",
        color: "primary",
        class: ["bg-primary/10 text-primary", "[a&]:hover:bg-primary/15"].join(" "),
      },
      {
        variant: "flat",
        color: "secondary",
        class: ["bg-secondary/10 text-secondary", "[a&]:hover:bg-secondary/15"].join(" "),
      },
      {
        variant: "flat",
        color: "info",
        class: ["bg-info/10 text-info", "[a&]:hover:bg-info/15"].join(" "),
      },
      {
        variant: "flat",
        color: "debug",
        class: ["bg-debug/10 text-debug", "[a&]:hover:bg-debug/15"].join(" "),
      },
      {
        variant: "flat",
        color: "warning",
        class: ["bg-warning/10 text-warning", "[a&]:hover:bg-warning/15"].join(" "),
      },
      {
        variant: "flat",
        color: "success",
        class: ["bg-success/10 text-success", "[a&]:hover:bg-success/15"].join(" "),
      },
      {
        variant: "flat",
        color: "error",
        class: ["bg-error/10 text-error", "[a&]:hover:bg-error/15"].join(" "),
      },
      {
        variant: "flat",
        color: "fatal",
        class: ["bg-fatal/10 text-fatal", "[a&]:hover:bg-fatal/15"].join(" "),
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      size: "md",
    },
  }
);

function Badge({
  className,
  variant,
  color,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    variant?: "solid" | "bordered" | "flat";
    color?:
      | "default"
      | "primary"
      | "secondary"
      | "info"
      | "debug"
      | "warning"
      | "success"
      | "error"
      | "fatal";
  }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, color, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
