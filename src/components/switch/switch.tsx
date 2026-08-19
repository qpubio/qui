"use client"

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const switchVariants = cva(
  [
    // Layout
    "peer group/switch relative inline-flex shrink-0 items-center",

    // Visual
    "rounded-md border border-transparent",

    // Interactive
    "transition-all outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",

    // Expanded hit area
    "after:absolute after:-inset-x-3 after:-inset-y-2",

    // Focus
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",

    // Validation
    "aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40",
    "aria-invalid:border-error",

    // Unchecked track (qui has no --input token)
    "data-[state=unchecked]:bg-foreground/20",
  ].join(" "),
  {
    variants: {
      color: {
        default: "data-[state=checked]:bg-foreground",
        primary: "data-[state=checked]:bg-primary",
        secondary: "data-[state=checked]:bg-secondary",
        info: "data-[state=checked]:bg-info",
        debug: "data-[state=checked]:bg-debug",
        warning: "data-[state=checked]:bg-warning",
        success: "data-[state=checked]:bg-success",
        error: "data-[state=checked]:bg-error",
        fatal: "data-[state=checked]:bg-fatal",
      },
      size: {
        sm: "h-[14px] w-6",
        md: "h-[18.4px] w-8",
        lg: "h-6 w-11",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
    },
  }
);

const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-md shadow-xs ring-0",
    "transition-transform",
    // Prefer group state from Root — Thumb may not always mirror data-state
    "group-data-[state=unchecked]/switch:translate-x-0",
    "group-data-[state=unchecked]/switch:bg-foreground",
    "group-data-[state=checked]/switch:bg-background",
    "dark:group-data-[state=checked]/switch:bg-primary-foreground",
  ].join(" "),
  {
    variants: {
      size: {
        // Travel = track − thumb − ~2px inset (w-6/w-8/w-11 vs size-3/4/5)
        sm: "size-3 group-data-[state=checked]/switch:translate-x-[10px]",
        md: "size-4 group-data-[state=checked]/switch:translate-x-[14px]",
        lg: "size-5 group-data-[state=checked]/switch:translate-x-[22px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function Switch({
  className,
  color,
  size,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ color, size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumbVariants({ size }))}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch, switchVariants };
