import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const avatarVariants = cva(
  "relative flex size-8 shrink-0 overflow-hidden rounded-full",
  {
    variants: {},
    defaultVariants: {},
  }
);

const avatarImageVariants = cva("aspect-square size-full", {
  variants: {},
  defaultVariants: {},
});

const avatarFallbackVariants = cva(
  "bg-accent flex size-full items-center justify-center",
  {
    variants: {},
    defaultVariants: {},
  }
);

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants(), className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image> &
  VariantProps<typeof avatarImageVariants>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(avatarImageVariants(), className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> &
  VariantProps<typeof avatarFallbackVariants>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(avatarFallbackVariants(), className)}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants, avatarImageVariants, avatarFallbackVariants };
