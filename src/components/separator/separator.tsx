import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const separatorVariants = cva(
  "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

function Separator({
  className,
  orientation = "horizontal",
  isDecorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants> & {
    orientation?: "horizontal" | "vertical";
    isDecorative?: boolean;
  }) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={isDecorative}
      orientation={orientation}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  );
}

export { Separator, separatorVariants };
