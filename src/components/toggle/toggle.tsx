import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const toggleVariants = cva(
  [
    // Layout
    "inline-flex items-center justify-center",
    "w-fit whitespace-nowrap shrink-0",
    "gap-2",
    
    // Visual
    "rounded-md border text-muted",
    "text-sm font-medium",
    "overflow-hidden",
    
    // Interactive
    "transition-all",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:bg-foreground/10 hover:text-foreground",
    "data-[state=on]:bg-foreground/10 data-[state=on]:text-foreground",
    
    // Focus
    "outline-none",
    "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "focus-visible:border-ring",
    
    // Validation
    "aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40",
    "aria-invalid:border-error",
    
    // Icons
    "[&_svg]:pointer-events-none",
    "[&_svg:not([class*='size-'])]:size-4",
    "[&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: [
          "bg-transparent border-transparent",
          "hover:bg-foreground/10 hover:text-foreground",
          "data-[state=on]:bg-accent data-[state=on]:text-foreground",
        ].join(" "),
        bordered: [
          "border-transparent bg-transparent",
          "hover:text-foreground hover:bg-transparent",
          "data-[state=on]:border-popover-border data-[state=on]:dark:border-zinc-500 data-[state=on]:bg-transparent data-[state=on]:text-foreground",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-1.5 min-w-8 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-9 px-2 min-w-9 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 px-2.5 min-w-10 text-base [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
