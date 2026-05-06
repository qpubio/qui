import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-sm",
  {
    variants: {},
    defaultVariants: {},
  }
);

const cardHeaderVariants = cva(
  "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
  {
    variants: {},
    defaultVariants: {},
  }
);

const cardTitleVariants = cva("leading-none font-semibold", {
  variants: {},
  defaultVariants: {},
});

const cardDescriptionVariants = cva("text-muted text-sm", {
  variants: {},
  defaultVariants: {},
});

const cardActionVariants = cva(
  "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
  {
    variants: {},
    defaultVariants: {},
  }
);

const cardContentVariants = cva("px-6", {
  variants: {},
  defaultVariants: {},
});

const cardFooterVariants = cva(
  "flex items-center px-6 [.border-t]:pt-6",
  {
    variants: {},
    defaultVariants: {},
  }
);

function Card({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants(), className)}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardHeaderVariants>) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants(), className)}
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardTitleVariants>) {
  return (
    <div
      data-slot="card-title"
      className={cn(cardTitleVariants(), className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardDescriptionVariants>) {
  return (
    <div
      data-slot="card-description"
      className={cn(cardDescriptionVariants(), className)}
      {...props}
    />
  );
}

function CardAction({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardActionVariants>) {
  return (
    <div
      data-slot="card-action"
      className={cn(cardActionVariants(), className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardContentVariants>) {
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentVariants(), className)}
      {...props}
    />
  );
}

function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardFooterVariants>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterVariants(), className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  cardActionVariants,
  cardContentVariants,
  cardFooterVariants,
};
