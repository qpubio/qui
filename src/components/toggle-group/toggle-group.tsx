import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { toggleVariants } from "../toggle/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "md",
  variant: "solid",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        [
          // Layout
          "group/toggle-group flex w-fit items-center",
          "rounded-md",

          // Visual
          "border border-border dark:border-zinc-600",
        ].join(" "),
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        [
          // Group-specific styling
          "min-w-0 flex-1 shrink-0",
          "rounded-none shadow-none",
          "first:rounded-l-md last:rounded-r-md",
          "focus:z-10 focus-visible:z-10",
          
          // Bordered variant specific
          "data-[variant=bordered]:border-t-0 border-b-0",
          "data-[variant=bordered]:first:border-r data-[variant=bordered]:first:border-l-0",
          "data-[variant=bordered]:last:border-l data-[variant=bordered]:last:border-r-0",
        ].join(" "),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
