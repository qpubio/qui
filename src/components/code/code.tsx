"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { CopyButton } from "../copy-button/copy-button";

const codeVariants = cva(
  "inline-block whitespace-nowrap rounded-md font-mono transition-colors",
  {
    variants: {
      variant: {
        default: "bg-foreground/5 text-muted",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        error: "",
        fatal: "",
        info: "",
        debug: "",
      },
      size: {
        sm: "px-1 py-0.5 text-xs",
        md: "px-2 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
      display: {
        inline: "inline-block",
        block: "block whitespace-pre-wrap",
      },
    },
    compoundVariants: [
      {
        variant: ["default"],
        color: "primary",
        class: "bg-primary/20 text-primary",
      },
      {
        variant: ["default"],
        color: "secondary",
        class: "bg-secondary/20 text-secondary",
      },
      {
        variant: ["default"],
        color: "success",
        class: "bg-success/20 text-success",
      },
      {
        variant: ["default"],
        color: "warning",
        class: "bg-warning/20 text-warning",
      },
      {
        variant: ["default"],
        color: "error",
        class: "bg-error/20 text-error",
      },
      {
        variant: ["default"],
        color: "fatal",
        class: "bg-fatal/20 text-fatal",
      },
      {
        variant: ["default"],
        color: "info",
        class: "bg-info/20 text-info",
      },
      {
        variant: ["default"],
        color: "debug",
        class: "bg-debug/20 text-debug",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      display: "inline",
      color: "default",
    },
  }
);

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {
  variant?: "default";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "fatal"
    | "info"
    | "debug";
  /** Show 1-based line numbers when `display="block"`. */
  lineNumbers?: boolean;
  /** Language hint shown in the block chrome (presentational). */
  language?: string;
  /** Enable a copy control for block code. Uses string children or `copyText`. */
  showCopy?: boolean;
  /** Explicit text to copy when children are not a plain string. */
  copyText?: string;
}

function Code({
  className,
  variant,
  color,
  size,
  display,
  lineNumbers = false,
  language,
  showCopy = false,
  copyText,
  children,
  ...props
}: CodeProps) {
  const isBlock = display === "block";
  const textForCopy =
    copyText ?? (typeof children === "string" ? children : undefined);

  if (!isBlock || (!lineNumbers && !showCopy && !language)) {
    return (
      <code
        data-slot="code"
        className={cn(codeVariants({ variant, color, size, display }), className)}
        {...props}
      >
        {children}
      </code>
    );
  }

  const lines =
    lineNumbers && typeof children === "string"
      ? children.replace(/\n$/, "").split("\n")
      : null;

  return (
    <div
      data-slot="code-block"
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-card",
        className
      )}
    >
      {(language || (showCopy && textForCopy)) && (
        <div
          data-slot="code-block-header"
          className="flex items-center justify-between gap-2 border-b border-border px-3 py-1.5 text-xs text-muted font-mono"
        >
          <span>{language ?? ""}</span>
          {showCopy && textForCopy != null && (
            <CopyButton text={textForCopy} size="sm" appearance="ghost" />
          )}
        </div>
      )}
      <div className="relative overflow-x-auto p-3">
        {showCopy && textForCopy != null && !language && (
          <CopyButton
            text={textForCopy}
            variant="overlay"
            position="top-right"
            size="sm"
            appearance="ghost"
          />
        )}
        {lines ? (
          <code
            data-slot="code"
            className={cn(
              codeVariants({
                variant,
                color,
                size,
                display: "block",
              }),
              "bg-transparent rounded-none p-0 w-full"
            )}
            {...props}
          >
            {lines.map((line, i) => (
              <span key={i} className="flex">
                <span
                  data-slot="code-line-number"
                  className="select-none pr-4 text-right text-muted tabular-nums w-8 shrink-0"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <span className="flex-1 whitespace-pre-wrap">{line || " "}</span>
              </span>
            ))}
          </code>
        ) : (
          <code
            data-slot="code"
            className={cn(
              codeVariants({ variant, color, size, display: "block" }),
              "bg-transparent rounded-none p-0"
            )}
            {...props}
          >
            {children}
          </code>
        )}
      </div>
    </div>
  );
}

export { Code, codeVariants };
