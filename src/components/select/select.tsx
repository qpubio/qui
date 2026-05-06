import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Label } from "../label/label";

const selectTriggerVariants = cva(
  [
    // Layout
    "flex w-full min-w-0 items-center justify-between gap-2",

    // Visual
    "border bg-transparent rounded-xs",

    // Typography
    "selection:bg-primary selection:text-primary-foreground",

    // Interactive
    "outline-none transition-all",
    "focus-visible:ring-0",

    // Placeholder
    "data-[placeholder]:text-muted",

    // States
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

    // Icons
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        bordered: "",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        info: "",
        debug: "",
        warning: "",
        success: "",
        error: "",
        fatal: "",
      },
      size: {
        sm: "h-7 px-3 py-1 rounded-xs text-xs",
        md: "h-9 px-3 py-1 rounded-xs text-sm",
        lg: "h-12 px-3 py-2 rounded-xs text-base",
      },
    },
    compoundVariants: [
      // Default color variant
      {
        variant: "bordered",
        color: "default",
        class:
          "border-muted/30 bg-muted/5 data-[placeholder]:text-muted text-foreground hover:border-muted/80 focus:border-muted/80",
      },
      // Primary color variant
      {
        variant: "bordered",
        color: "primary",
        class:
          "border-primary/30 bg-primary/5 data-[placeholder]:text-primary/70 text-primary hover:border-primary/80 focus:border-primary/80",
      },
      // Secondary color variant
      {
        variant: "bordered",
        color: "secondary",
        class:
          "border-secondary/30 bg-secondary/5 data-[placeholder]:text-secondary/70 text-secondary hover:border-secondary/80 focus:border-secondary/80",
      },
      // Info color variant
      {
        variant: "bordered",
        color: "info",
        class:
          "border-info/30 bg-info/5 data-[placeholder]:text-info/70 text-info hover:border-info/80 focus:border-info/80",
      },
      // Debug color variant
      {
        variant: "bordered",
        color: "debug",
        class:
          "border-debug/30 bg-debug/5 data-[placeholder]:text-debug/70 text-debug hover:border-debug/80 focus:border-debug/80",
      },
      // Warning color variant
      {
        variant: "bordered",
        color: "warning",
        class:
          "border-warning/30 bg-warning/5 data-[placeholder]:text-warning/70 text-warning hover:border-warning/80 focus:border-warning/80",
      },
      // Success color variant
      {
        variant: "bordered",
        color: "success",
        class:
          "border-success/30 bg-success/5 data-[placeholder]:text-success/70 text-success hover:border-success/80 focus:border-success/80",
      },
      // Error color variant
      {
        variant: "bordered",
        color: "error",
        class:
          "border-error/30 bg-error/5 data-[placeholder]:text-error/70 text-error hover:border-error/80 focus:border-error/80",
      },
      // Fatal color variant
      {
        variant: "bordered",
        color: "fatal",
        class:
          "border-fatal/30 bg-fatal/5 data-[placeholder]:text-fatal/70 text-fatal hover:border-fatal/80 focus:border-fatal/80",
      },
    ],
    defaultVariants: {
      variant: "bordered",
      color: "default",
      size: "md",
    },
  }
);

/** Props merged into `SelectTrigger` when using the labelled wrapper form of `Select`. */
type SelectTriggerMergedProps = Partial<VariantProps<typeof selectTriggerVariants>> & {
  id?: string;
  className?: string;
  "aria-invalid"?: boolean;
};

function Select({
  // Wrapper props (optional - for Input-like behavior)
  variant,
  color,
  size,
  isInvalid = false,
  errorMessage,
  helperText,
  label,
  id,
  isRequired,
  isDisabled,
  className,
  
  // Root props
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> &
  Partial<VariantProps<typeof selectTriggerVariants>> & {
    variant?: "bordered";
    color?:
      | "default"
      | "primary"
      | "secondary"
      | "info"
      | "debug"
      | "warning"
      | "success"
      | "error"
      | "fatal";
    isInvalid?: boolean;
    errorMessage?: React.ReactNode;
    helperText?: React.ReactNode;
    label?: React.ReactNode;
    id?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    className?: string;
  }) {
  // Generate unique ID if none provided and label exists
  const generatedId = React.useId();
  const selectId = id || (label ? generatedId : undefined);

  // Override color with error if isInvalid is true
  const effectiveColor = isInvalid ? "error" : color;

  // Check if any wrapper features are being used
  const isUsingWrapperFeatures = !!(
    label ||
    errorMessage ||
    helperText ||
    variant ||
    color ||
    size ||
    isInvalid
  );

  // If not using wrapper features, just render as primitive
  if (!isUsingWrapperFeatures) {
    return (
      <SelectPrimitive.Root data-slot="select" disabled={isDisabled} {...props}>
        {children}
      </SelectPrimitive.Root>
    );
  }

  // Using wrapper features - inject props into SelectTrigger
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectTrigger) {
      const childProps = child.props as SelectTriggerMergedProps;
      return React.cloneElement(child as React.ReactElement<SelectTriggerMergedProps>, {
        id: selectId,
        variant: childProps.variant || variant,
        color: childProps.color || effectiveColor,
        size: childProps.size || size,
        "aria-invalid": isInvalid,
        className: cn(
          isInvalid && ["border-error", "bg-error/10"],
          className,
          childProps.className
        ),
      });
    }
    return child;
  });

  return (
    <div>
      {label && (
        <Label htmlFor={selectId} className="flex gap-1 mb-2" size={size || undefined}>
          {label}
          {isRequired && <span className="text-error">*</span>}
        </Label>
      )}
      <SelectPrimitive.Root
        data-slot="select"
        disabled={isDisabled}
        required={isRequired}
        {...props}
      >
        {enhancedChildren}
      </SelectPrimitive.Root>
      {errorMessage && (
        <div className="text-sm text-error mt-0.5" role="alert">
          {errorMessage}
        </div>
      )}
      {helperText && !errorMessage && <div className="text-sm text-muted mt-0.5">{helperText}</div>}
    </div>
  );
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  variant,
  color,
  size,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(selectTriggerVariants({ variant, color, size }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          // Base styles
          "bg-popover text-popover-foreground",
          "rounded-xs border border-popover-border shadow-md",
          "z-50 min-w-[8rem]",

          // Layout
          "relative",
          "max-h-(--radix-select-content-available-height)",
          "origin-(--radix-select-content-transform-origin)",
          "overflow-x-hidden overflow-y-auto",

          // Animations
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",

          // Slide animations
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",

          position === "popper" && [
            "data-[side=bottom]:translate-y-1",
            "data-[side=left]:-translate-x-1",
            "data-[side=right]:translate-x-1",
            "data-[side=top]:-translate-y-1",
          ],
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" && [
              "h-[var(--radix-select-trigger-height)]",
              "w-full min-w-[var(--radix-select-trigger-width)]",
              "scroll-my-1",
            ]
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        // Layout
        "px-2 py-1.5",

        // Typography
        "text-xs text-muted",

        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Layout
        "relative flex w-full items-center gap-2",
        "py-1.5 pr-8 pl-2",
        "rounded-sm",

        // Typography
        "text-sm",

        // Interactive
        "cursor-default select-none",
        "outline-none",
        "focus:bg-accent focus:text-accent-foreground",

        // States
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",

        // Icons
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-muted",

        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        // Layout
        "-mx-1 my-1 h-px",

        // Visual
        "bg-border",

        // Interactive
        "pointer-events-none",

        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        // Layout
        "flex items-center justify-center py-1",

        // Interactive
        "cursor-default",

        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        // Layout
        "flex items-center justify-center py-1",

        // Interactive
        "cursor-default",

        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
};
