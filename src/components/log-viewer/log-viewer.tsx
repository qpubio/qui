"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export type LogLevel =
  | "debug"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "fatal"
  | "default";

export type LogLineData = {
  id?: string;
  timestamp?: React.ReactNode;
  level?: LogLevel;
  message: React.ReactNode;
};

const logViewerVariants = cva(
  [
    "flex flex-col overflow-auto",
    "font-mono text-xs leading-relaxed",
    "bg-background text-foreground",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "text-[11px]",
        md: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const logLineVariants = cva(
  "grid grid-cols-[auto_auto_1fr] gap-x-3 gap-y-0 px-2 py-0.5 hover:bg-accent/40",
  {
    variants: {
      level: {
        default: "",
        debug: "",
        info: "",
        success: "",
        warning: "",
        error: "bg-error/5",
        fatal: "bg-fatal/10",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      level: "default",
      interactive: false,
    },
  }
);

const levelLabel: Record<LogLevel, string> = {
  default: "LOG",
  debug: "DEBUG",
  info: "INFO",
  success: "OK",
  warning: "WARN",
  error: "ERROR",
  fatal: "FATAL",
};

const levelClass: Record<LogLevel, string> = {
  default: "text-muted",
  debug: "text-debug",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  fatal: "text-fatal",
};

export type LogLineProps = React.ComponentProps<"div"> &
  VariantProps<typeof logLineVariants> & {
    timestamp?: React.ReactNode;
    level?: LogLevel;
    showLevel?: boolean;
  };

function LogLine({
  className,
  timestamp,
  level = "default",
  showLevel = true,
  interactive,
  children,
  ...props
}: LogLineProps) {
  return (
    <div
      data-slot="log-line"
      data-level={level}
      className={cn(logLineVariants({ level, interactive }), className)}
      {...props}
    >
      <span
        data-slot="log-line-timestamp"
        className="text-muted tabular-nums shrink-0"
      >
        {timestamp ?? ""}
      </span>
      {showLevel ? (
        <span
          data-slot="log-line-level"
          className={cn("shrink-0 font-semibold w-12", levelClass[level])}
        >
          {levelLabel[level]}
        </span>
      ) : (
        <span />
      )}
      <span data-slot="log-line-message" className="min-w-0 break-words">
        {children}
      </span>
    </div>
  );
}

export type LogViewerProps = React.ComponentProps<"div"> &
  VariantProps<typeof logViewerVariants> & {
    items?: LogLineData[];
    autoScroll?: boolean;
    showLevel?: boolean;
    /** Opt-in live region for streaming lines */
    live?: boolean | "polite" | "assertive";
    onLineClick?: (item: LogLineData, index: number) => void;
  };

function LogViewer({
  className,
  size,
  items = [],
  autoScroll = false,
  showLevel = true,
  live = false,
  onLineClick,
  children,
  ...props
}: LogViewerProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!autoScroll || !ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [autoScroll, items, children]);

  const liveValue =
    live === true ? "polite" : live === false ? undefined : live;

  return (
    <div
      ref={ref}
      data-slot="log-viewer"
      role="log"
      aria-live={liveValue}
      aria-relevant={liveValue ? "additions" : undefined}
      className={cn(logViewerVariants({ size }), className)}
      {...props}
    >
      {children ??
        items.map((item, index) => (
          <LogLine
            key={item.id ?? index}
            timestamp={item.timestamp}
            level={item.level}
            showLevel={showLevel}
            interactive={Boolean(onLineClick)}
            onClick={
              onLineClick ? () => onLineClick(item, index) : undefined
            }
          >
            {item.message}
          </LogLine>
        ))}
    </div>
  );
}

export {
  LogViewer,
  LogLine,
  logViewerVariants,
  logLineVariants,
};
