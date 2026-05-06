

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import type { LabelSize } from "./label.types";

const labelVariants = cva(
  "flex items-center font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "gap-1.5 text-xs leading-none",
        md: "gap-2 text-sm leading-none",
        lg: "gap-2.5 text-base leading-none",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function Label({
  className,
  size,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & {
    size?: LabelSize;
  }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ size }), className)}
      {...props}
    />
  );
}

export { Label, labelVariants };
