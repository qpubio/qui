import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-md border p-4 text-sm flex items-start gap-x-4 transition-[color,background-color,border-color]",
  {
    variants: {
      variant: {
        solid: "border-transparent",
        bordered: "bg-background",
        flat: "border-transparent",
        faded: "",
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
    },
    compoundVariants: [
      // Solid variant (solid backgrounds)
      {
        variant: "solid",
        color: "default",
        class: "bg-foreground text-background",
      },
      {
        variant: "solid",
        color: "primary",
        class: "bg-primary text-primary-foreground",
      },
      {
        variant: "solid",
        color: "secondary",
        class: "bg-secondary text-secondary-foreground",
      },
      {
        variant: "solid",
        color: "info",
        class: "bg-info text-info-foreground",
      },
      {
        variant: "solid",
        color: "debug",
        class: "bg-debug text-debug-foreground",
      },
      {
        variant: "solid",
        color: "warning",
        class: "bg-warning text-warning-foreground",
      },
      {
        variant: "solid",
        color: "success",
        class: "bg-success text-success-foreground",
      },
      {
        variant: "solid",
        color: "error",
        class: "bg-error text-error-foreground",
      },
      {
        variant: "solid",
        color: "fatal",
        class: "bg-fatal text-fatal-foreground",
      },

      // Bordered variant (border colors)
      {
        variant: "bordered",
        color: "default",
        class: "border-foreground text-foreground",
      },
      {
        variant: "bordered",
        color: "primary",
        class: "border-primary text-primary",
      },
      {
        variant: "bordered",
        color: "secondary",
        class: "border-secondary text-secondary",
      },
      {
        variant: "bordered",
        color: "info",
        class: "border-info text-info",
      },
      {
        variant: "bordered",
        color: "debug",
        class: "border-debug text-debug",
      },
      {
        variant: "bordered",
        color: "warning",
        class: "border-warning text-warning",
      },
      {
        variant: "bordered",
        color: "success",
        class: "border-success text-success",
      },
      {
        variant: "bordered",
        color: "error",
        class: "border-error text-error",
      },
      {
        variant: "bordered",
        color: "fatal",
        class: "border-fatal text-fatal",
      },

      // Flat variant (subtle backgrounds)
      {
        variant: "flat",
        color: "default",
        class: "bg-muted/10 text-foreground",
      },
      {
        variant: "flat",
        color: "primary",
        class: "bg-primary/10 text-primary",
      },
      {
        variant: "flat",
        color: "secondary",
        class: "bg-secondary/10 text-secondary",
      },
      {
        variant: "flat",
        color: "info",
        class: "bg-info/10 text-info",
      },
      {
        variant: "flat",
        color: "debug",
        class: "bg-debug/10 text-debug",
      },
      {
        variant: "flat",
        color: "warning",
        class: "bg-warning/10 text-warning",
      },
      {
        variant: "flat",
        color: "success",
        class: "bg-success/10 text-success",
      },
      {
        variant: "flat",
        color: "error",
        class: "bg-error/10 text-error",
      },
      {
        variant: "flat",
        color: "fatal",
        class: "bg-fatal/10 text-fatal",
      },

      // Faded variant (very subtle border and background)
      {
        variant: "faded",
        color: "default",
        class: "bg-foreground/5 border-foreground/20 text-foreground",
      },
      {
        variant: "faded",
        color: "primary",
        class: "bg-primary/5 border-primary/20 text-primary",
      },
      {
        variant: "faded",
        color: "secondary",
        class: "bg-secondary/5 border-secondary/20 text-secondary",
      },
      {
        variant: "faded",
        color: "info",
        class: "bg-info/5 border-info/20 text-info",
      },
      {
        variant: "faded",
        color: "debug",
        class: "bg-debug/5 border-debug/20 text-debug",
      },
      {
        variant: "faded",
        color: "warning",
        class: "bg-warning/5 border-warning/20 text-warning",
      },
      {
        variant: "faded",
        color: "success",
        class: "bg-success/5 border-success/20 text-success",
      },
      {
        variant: "faded",
        color: "error",
        class: "bg-error/5 border-error/20 text-error",
      },
      {
        variant: "faded",
        color: "fatal",
        class: "bg-fatal/5 border-fatal/20 text-fatal",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
    },
  }
);

function Alert({
  className,
  variant,
  color,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    variant?: "solid" | "bordered" | "flat" | "faded";
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
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, color }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-icon"
      className={cn("w-5 h-5 flex-shrink-0 [&>svg]:w-full [&>svg]:h-full", className)}
      {...props}
    />
  );
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-content" className={cn("flex-grow", className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-title" className={cn("font-medium leading-5", className)} {...props} />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-sm font-light leading-5", className)}
      {...props}
    />
  );
}

export { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription };
