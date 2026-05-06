import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

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
      // Default and Contained variants (solid backgrounds) - both behave the same
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
}

function Code({ className, variant, color, size, display, ...props }: CodeProps) {
  return (
    <code className={cn(codeVariants({ variant, color, size, display }), className)} {...props} />
  );
}

export { Code, codeVariants };
