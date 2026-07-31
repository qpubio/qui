"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const statusBarVariants = cva(
  [
    "flex w-full items-center gap-3 border-t border-border bg-card",
    "font-mono text-xs text-muted",
    "px-[var(--density-pad-sm)] py-1",
  ].join(" "),
  {
    variants: {
      position: {
        top: "border-t-0 border-b",
        bottom: "",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

const statusBarSegmentVariants = cva(
  "inline-flex items-center gap-1.5 shrink-0",
  {
    variants: {
      tone: {
        default: "text-muted",
        primary: "text-primary",
        success: "text-success",
        warning: "text-warning",
        error: "text-error",
        info: "text-info",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
);

export type StatusBarProps = React.ComponentProps<"div"> &
  VariantProps<typeof statusBarVariants> & {
    /** Accessible label for the status region */
    label?: string;
  };

function StatusBar({
  className,
  position,
  label = "Status",
  role = "status",
  ...props
}: StatusBarProps) {
  return (
    <div
      data-slot="status-bar"
      role={role}
      aria-label={label}
      className={cn(statusBarVariants({ position }), className)}
      {...props}
    />
  );
}

export type StatusBarSegmentProps = React.ComponentProps<"span"> &
  VariantProps<typeof statusBarSegmentVariants>;

function StatusBarSegment({
  className,
  tone,
  ...props
}: StatusBarSegmentProps) {
  return (
    <span
      data-slot="status-bar-segment"
      className={cn(statusBarSegmentVariants({ tone }), className)}
      {...props}
    />
  );
}

function StatusBarSpacer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="status-bar-spacer"
      className={cn("flex-1 min-w-2", className)}
      {...props}
    />
  );
}

export {
  StatusBar,
  StatusBarSegment,
  StatusBarSpacer,
  statusBarVariants,
  statusBarSegmentVariants,
};
