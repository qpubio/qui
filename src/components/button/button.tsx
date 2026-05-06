import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import type { ButtonPaletteColor, ButtonVisualVariant, IconOnlyButtonProps, RegularButtonProps } from "./button.types";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all motion-safe:active:scale-[0.98] motion-safe:data-[state=open]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring focus-visible:ring-[2px] focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-error aria-invalid:border-error",
  {
    variants: {
      variant: {
        solid: "bg-foreground text-background hover:bg-foreground/80",
        faded: "border border-muted/35 bg-muted/15 text-foreground hover:bg-muted/30",
        bordered:
          "border border-foreground bg-background hover:bg-foreground/5 hover:text-foreground/80 hover:border-foreground/80",
        light: "hover:bg-muted/15",
        flat: "bg-muted/15 hover:bg-muted/10 hover:text-muted",
        ghost: "border border-foreground bg-background hover:bg-foreground hover:text-background",
        link: "underline-offset-4 hover:underline motion-safe:active:scale-100 motion-safe:data-[state=open]:scale-100",
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
        sm: "h-7 rounded-sm text-xs gap-1.5 px-3 has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-9 px-4 py-2 has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 rounded-lg text-base px-6 has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    compoundVariants: [
      // Solid variants (solid backgrounds)
      {
        variant: "solid",
        color: "default",
        class: "bg-foreground text-background hover:bg-foreground/80",
      },
      {
        variant: "solid",
        color: "primary",
        class: "bg-primary text-primary-foreground hover:bg-primary/80",
      },
      {
        variant: "solid",
        color: "secondary",
        class: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      {
        variant: "solid",
        color: "info",
        class: "bg-info text-info-foreground hover:bg-info/80",
      },
      {
        variant: "solid",
        color: "debug",
        class: "bg-debug text-debug-foreground hover:bg-debug/80",
      },
      {
        variant: "solid",
        color: "warning",
        class: "bg-warning text-warning-foreground hover:bg-warning/80",
      },
      {
        variant: "solid",
        color: "success",
        class: "bg-success text-success-foreground hover:bg-success/80",
      },
      {
        variant: "solid",
        color: "error",
        class: "bg-error text-error-foreground hover:bg-error/80",
      },
      {
        variant: "solid",
        color: "fatal",
        class: "bg-fatal text-fatal-foreground hover:bg-fatal/80",
      },

      // Faded variant (subtle backgrounds)
      {
        variant: "faded",
        color: "default",
        class: "border border-muted/35 bg-muted/15 text-foreground hover:bg-muted/30",
      },
      {
        variant: "faded",
        color: "primary",
        class: "border border-primary/35 bg-primary/15 text-primary hover:bg-primary/30",
      },
      {
        variant: "faded",
        color: "secondary",
        class: "border border-secondary/35 bg-secondary/15 text-secondary hover:bg-secondary/30",
      },
      {
        variant: "faded",
        color: "info",
        class: "border border-info/35 bg-info/15 text-info hover:bg-info/30",
      },
      {
        variant: "faded",
        color: "debug",
        class: "border border-debug/35 bg-debug/15 text-debug hover:bg-debug/30",
      },
      {
        variant: "faded",
        color: "warning",
        class: "border border-warning/35 bg-warning/15 text-warning hover:bg-warning/30",
      },
      {
        variant: "faded",
        color: "success",
        class: "border border-success/35 bg-success/15 text-success hover:bg-success/30",
      },
      {
        variant: "faded",
        color: "error",
        class: "border border-error/35 bg-error/15 text-error hover:bg-error/30",
      },
      {
        variant: "faded",
        color: "fatal",
        class: "border border-fatal/35 bg-fatal/15 text-fatal hover:bg-fatal/30",
      },

      // Bordered variant (border colors)
      {
        variant: "bordered",
        color: "default",
        class:
          "border border-foreground bg-background text-foreground hover:bg-foreground/5 hover:text-foreground/80 hover:border-foreground/80",
      },
      {
        variant: "bordered",
        color: "primary",
        class:
          "border border-primary text-primary bg-background hover:bg-primary/5 hover:text-primary/80 hover:border-primary/80",
      },
      {
        variant: "bordered",
        color: "secondary",
        class:
          "border border-secondary text-secondary bg-background hover:bg-secondary/5 hover:text-secondary/80 hover:border-secondary/80",
      },
      {
        variant: "bordered",
        color: "info",
        class:
          "border border-info text-info bg-background hover:bg-info/5 hover:text-info/80 hover:border-info/80",
      },
      {
        variant: "bordered",
        color: "debug",
        class:
          "border border-debug text-debug bg-background hover:bg-debug/5 hover:text-debug/80 hover:border-debug/80",
      },
      {
        variant: "bordered",
        color: "warning",
        class:
          "border border-warning text-warning bg-background hover:bg-warning/5 hover:text-warning/80 hover:border-warning/80",
      },
      {
        variant: "bordered",
        color: "success",
        class:
          "border border-success text-success bg-background hover:bg-success/5 hover:text-success/80 hover:border-success/80",
      },
      {
        variant: "bordered",
        color: "error",
        class:
          "border border-error text-error bg-background hover:bg-error/5 hover:text-error/80 hover:border-error/80",
      },
      {
        variant: "bordered",
        color: "fatal",
        class:
          "border border-fatal text-fatal bg-background hover:bg-fatal/5 hover:text-fatal/80 hover:border-fatal/80",
      },

      // Light variant (subtle backgrounds)
      {
        variant: "light",
        color: "default",
        class: "text-foreground hover:bg-muted/20",
      },
      {
        variant: "light",
        color: "primary",
        class: "text-primary hover:bg-primary/20",
      },
      {
        variant: "light",
        color: "secondary",
        class: "text-secondary hover:bg-secondary/20",
      },
      {
        variant: "light",
        color: "info",
        class: "text-info hover:bg-info/20",
      },
      {
        variant: "light",
        color: "debug",
        class: "text-debug hover:bg-debug/20",
      },
      {
        variant: "light",
        color: "warning",
        class: "text-warning hover:bg-warning/20",
      },
      {
        variant: "light",
        color: "success",
        class: "text-success hover:bg-success/20",
      },
      {
        variant: "light",
        color: "error",
        class: "text-error hover:bg-error/20",
      },
      {
        variant: "light",
        color: "fatal",
        class: "text-fatal hover:bg-fatal/20",
      },

      // Flat variant (subtle backgrounds)
      {
        variant: "flat",
        color: "default",
        class: "bg-muted/20 text-foreground hover:bg-muted/10 hover:text-foreground/80",
      },
      {
        variant: "flat",
        color: "primary",
        class: "bg-primary/20 text-primary hover:bg-primary/15 hover:text-primary/80",
      },
      {
        variant: "flat",
        color: "secondary",
        class: "bg-secondary/20 text-secondary hover:bg-secondary/15 hover:text-secondary/80",
      },
      {
        variant: "flat",
        color: "info",
        class: "bg-info/20 text-info hover:bg-info/15 hover:text-info/80",
      },
      {
        variant: "flat",
        color: "debug",
        class: "bg-debug/20 text-debug hover:bg-debug/15 hover:text-debug/80",
      },
      {
        variant: "flat",
        color: "warning",
        class: "bg-warning/20 text-warning hover:bg-warning/15 hover:text-warning/80",
      },
      {
        variant: "flat",
        color: "success",
        class: "bg-success/20 text-success hover:bg-success/15 hover:text-success/80",
      },
      {
        variant: "flat",
        color: "error",
        class: "bg-error/20 text-error hover:bg-error/15 hover:text-error/80",
      },
      {
        variant: "flat",
        color: "fatal",
        class: "bg-fatal/20 text-fatal hover:bg-fatal/15 hover:text-fatal/80",
      },

      // Ghost variant (subtle backgrounds)
      {
        variant: "ghost",
        color: "default",
        class:
          "border border-foreground bg-background text-foreground hover:bg-foreground hover:text-background",
      },
      {
        variant: "ghost",
        color: "primary",
        class:
          "border border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
      },
      {
        variant: "ghost",
        color: "secondary",
        class:
          "border border-secondary bg-background text-secondary hover:bg-secondary hover:text-secondary-foreground",
      },
      {
        variant: "ghost",
        color: "info",
        class:
          "border border-info bg-background text-info hover:bg-info hover:text-info-foreground",
      },
      {
        variant: "ghost",
        color: "debug",
        class:
          "border border-debug bg-background text-debug hover:bg-debug hover:text-debug-foreground",
      },
      {
        variant: "ghost",
        color: "warning",
        class:
          "border border-warning bg-background text-warning hover:bg-warning hover:text-warning-foreground",
      },
      {
        variant: "ghost",
        color: "success",
        class:
          "border border-success bg-background text-success hover:bg-success hover:text-success-foreground",
      },
      {
        variant: "ghost",
        color: "error",
        class:
          "border border-error bg-background text-error hover:bg-error hover:text-error-foreground",
      },
      {
        variant: "ghost",
        color: "fatal",
        class:
          "border border-fatal bg-background text-fatal hover:bg-fatal hover:text-fatal-foreground",
      },

      // Link variant (text only)
      {
        variant: "link",
        color: "default",
        class: "text-foreground underline-offset-4 hover:underline",
      },
      {
        variant: "link",
        color: "primary",
        class: "text-primary underline-offset-4 hover:underline",
      },
      {
        variant: "link",
        color: "secondary",
        class: "text-secondary underline-offset-4 hover:underline",
      },
      {
        variant: "link",
        color: "info",
        class: "text-info underline-offset-4 hover:underline",
      },
      {
        variant: "link",
        color: "debug",
        class: "text-debug underline-offset-4 hover:underline",
      },
      {
        variant: "link",
        color: "warning",
        class: "text-warning underline-offset-4 hover:underline",
      },
      {
        variant: "link",
        color: "success",
        class: "text-success underline-offset-4 hover:underline",
      },
      {
        variant: "link",
        color: "error",
        class: "text-error underline-offset-4 hover:underline",
      },
      {
        variant: "link",
        color: "fatal",
        class: "text-fatal underline-offset-4 hover:underline",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      color: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  color,
  asChild = false,
  isIconOnly = false,
  isDisabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    variant?: ButtonVisualVariant;
    color?: ButtonPaletteColor;
    isDisabled?: boolean;
  } & (IconOnlyButtonProps | RegularButtonProps)) {
  const Comp = asChild ? Slot : "button";

  // Generate icon-only classes based on size
  const iconOnlyClasses = isIconOnly
    ? {
        sm: "size-7 px-0",
        md: "size-9 px-0",
        lg: "size-12 px-0",
      }[size || "md"]
    : "";

  // Development warning for accessibility
  if (process.env.NODE_ENV === "development" && isIconOnly) {
    const hasAccessibleName = props["aria-label"] || props["aria-labelledby"] || props.title;
    if (!hasAccessibleName) {
      console.warn(
        "Button with isIconOnly=true should have an accessible name. " +
          "Provide aria-label, aria-labelledby, or title prop for screen reader accessibility."
      );
    }
  }

  return (
    <Comp
      data-slot="button"
      disabled={isDisabled}
      className={cn(buttonVariants({ variant, size, color }), iconOnlyClasses, className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
