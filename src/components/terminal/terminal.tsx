"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const terminalVariants = cva(
  [
    "flex flex-col overflow-hidden",
    "rounded-md border border-border bg-background text-foreground",
    "font-mono text-sm",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "min-h-48",
        md: "min-h-64",
        lg: "min-h-96",
        full: "min-h-0 h-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const terminalTitleBarVariants = cva(
  [
    "flex items-center gap-2 border-b border-border bg-card",
    "px-[var(--density-pad-sm)] py-1.5",
    "text-xs text-muted",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

export type TerminalProps = React.ComponentProps<"div"> &
  VariantProps<typeof terminalVariants>;

function Terminal({ className, size, ...props }: TerminalProps) {
  return (
    <div
      data-slot="terminal"
      className={cn(terminalVariants({ size }), className)}
      {...props}
    />
  );
}

export type TerminalTitleBarProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode;
  showControls?: boolean;
  actions?: React.ReactNode;
};

function TerminalTitleBar({
  className,
  title,
  showControls = true,
  actions,
  children,
  ...props
}: TerminalTitleBarProps) {
  return (
    <div
      data-slot="terminal-title-bar"
      className={cn(terminalTitleBarVariants(), className)}
      {...props}
    >
      {showControls && (
        <div
          data-slot="terminal-controls"
          className="flex items-center gap-1.5"
          aria-hidden
        >
          <span className="size-2.5 rounded-full bg-error/80" />
          <span className="size-2.5 rounded-full bg-warning/80" />
          <span className="size-2.5 rounded-full bg-success/80" />
        </div>
      )}
      {title != null && (
        <div
          data-slot="terminal-title"
          className="flex-1 truncate text-center font-medium text-foreground/80"
        >
          {title}
        </div>
      )}
      {children}
      {actions != null && (
        <div data-slot="terminal-actions" className="ml-auto flex items-center gap-1">
          {actions}
        </div>
      )}
    </div>
  );
}

function TerminalBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="terminal-body"
      className={cn(
        "flex-1 min-h-0 overflow-auto p-[var(--density-pad-sm)]",
        className
      )}
      {...props}
    />
  );
}

function TerminalCursor({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="terminal-cursor"
      aria-hidden
      className={cn(
        "inline-block w-2 h-[1em] align-text-bottom bg-cursor",
        "motion-safe:animate-pulse",
        className
      )}
      {...props}
    />
  );
}

export {
  Terminal,
  TerminalTitleBar,
  TerminalBody,
  TerminalCursor,
  terminalVariants,
  terminalTitleBarVariants,
};
