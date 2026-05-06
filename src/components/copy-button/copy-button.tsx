import * as React from "react";
import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Button } from "../button/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";

const copyButtonVariants = cva("transition-all duration-200", {
  variants: {
    variant: {
      default: "",
      overlay: "backdrop-blur-sm saturate-50 absolute",
    },
    position: {
      "top-right": "top-1 right-1",
      "top-left": "top-1 left-1",
      "bottom-right": "bottom-3 right-4",
      "bottom-left": "bottom-3 left-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CopyButtonProps {
  /** The text to copy to clipboard */
  text: string;
  /** Button variant */
  variant?: "default" | "overlay";
  /** Position when using overlay variant */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Button appearance variant */
  appearance?: "flat" | "light" | "ghost" | "solid";
  /** Whether to show icon only */
  isIconOnly?: boolean;
  /** Custom className */
  className?: string;
  /** Custom aria-label */
  ariaLabel?: string;
  /** Success message duration in milliseconds */
  successDuration?: number;
  /** Success tooltip text */
  successText?: string;
  /** Copy tooltip text */
  copyText?: string;
  /** Callback when copy succeeds */
  onCopySuccess?: () => void;
  /** Callback when copy fails */
  onCopyError?: (error: Error) => void;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      text,
      variant = "default",
      position,
      size = "sm",
      appearance = "flat",
      isIconOnly = true,
      className,
      ariaLabel,
      successDuration = 30000,
      successText = "Copied!",
      copyText = "Copy to clipboard",
      onCopySuccess,
      onCopyError,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    // Handle copy functionality
    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        onCopySuccess?.();
        setTimeout(() => setCopied(false), successDuration);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        onCopyError?.(error as Error);
      }
    }, [text, successDuration, onCopySuccess, onCopyError]);

    const buttonClassName = cn(copyButtonVariants({ variant, position }), className);

    const effectiveAriaLabel = ariaLabel || (copied ? successText : copyText);

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {isIconOnly ? (
            <Button
              ref={ref}
              variant={appearance}
              size={size}
              onClick={handleCopy}
              isIconOnly
              aria-label={effectiveAriaLabel}
              className={buttonClassName}
              {...props}
            >
              {copied ? (
                <Check className="size-3.5" strokeWidth={1.5} />
              ) : (
                <Copy className="size-3.5" strokeWidth={1.5} />
              )}
              <span className="sr-only">{effectiveAriaLabel}</span>
            </Button>
          ) : (
            <Button
              ref={ref}
              variant={appearance}
              size={size}
              onClick={handleCopy}
              aria-label={effectiveAriaLabel}
              className={buttonClassName}
              {...props}
            >
              {copied ? (
                <Check className="size-3.5" strokeWidth={1.5} />
              ) : (
                <Copy className="size-3.5" strokeWidth={1.5} />
              )}
              <span className="ml-2">{copied ? successText : copyText}</span>
              <span className="sr-only">{effectiveAriaLabel}</span>
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>{copied ? successText : copyText}</TooltipContent>
      </Tooltip>
    );
  }
);

CopyButton.displayName = "CopyButton";

export { CopyButton, copyButtonVariants };
