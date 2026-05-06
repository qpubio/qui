import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// Context to pass props to child components
interface DrawerContextValue {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "solid" | "bordered" | "flat" | "faded";
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
}

const DrawerContext = React.createContext<DrawerContextValue>({});

const drawerOverlayVariants = cva(
  "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        solid: "bg-background/90 backdrop-blur-sm backdrop-saturate-150",
        bordered: "bg-background/80 backdrop-blur-sm",
        flat: "bg-background/70",
        faded: "bg-background/60",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
);

const drawerContentVariants = cva(
  "group/drawer-content bg-background fixed z-50 flex h-auto flex-col shadow-lg",
  {
    variants: {
      size: {
        sm: "data-[vaul-drawer-direction=top]:max-h-[60vh] data-[vaul-drawer-direction=bottom]:max-h-[60vh] data-[vaul-drawer-direction=right]:w-1/2 data-[vaul-drawer-direction=left]:w-1/2",
        md: "data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=left]:sm:max-w-sm",
        lg: "data-[vaul-drawer-direction=top]:max-h-[90vh] data-[vaul-drawer-direction=bottom]:max-h-[90vh] data-[vaul-drawer-direction=right]:w-4/5 data-[vaul-drawer-direction=left]:w-4/5 data-[vaul-drawer-direction=right]:sm:max-w-md data-[vaul-drawer-direction=left]:sm:max-w-md",
        xl: "data-[vaul-drawer-direction=top]:max-h-[95vh] data-[vaul-drawer-direction=bottom]:max-h-[95vh] data-[vaul-drawer-direction=right]:w-5/6 data-[vaul-drawer-direction=left]:w-5/6 data-[vaul-drawer-direction=right]:sm:max-w-lg data-[vaul-drawer-direction=left]:sm:max-w-lg",
        full: "data-[vaul-drawer-direction=top]:max-h-full data-[vaul-drawer-direction=bottom]:max-h-full data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=left]:w-full",
      },
      variant: {
        solid: "border-border",
        bordered: "border-2 border-border",
        flat: "border-0",
        faded: "border border-border/50",
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
    },
    compoundVariants: [
      // Color variants for solid
      {
        variant: "solid",
        color: "default",
        class: "bg-background text-foreground border-border",
      },
      {
        variant: "solid",
        color: "primary",
        class: "bg-primary text-primary-foreground border-primary",
      },
      {
        variant: "solid",
        color: "secondary",
        class: "bg-secondary text-secondary-foreground border-secondary",
      },
      {
        variant: "solid",
        color: "info",
        class: "bg-info text-info-foreground border-info",
      },
      {
        variant: "solid",
        color: "debug",
        class: "bg-debug text-debug-foreground border-debug",
      },
      {
        variant: "solid",
        color: "warning",
        class: "bg-warning text-warning-foreground border-warning",
      },
      {
        variant: "solid",
        color: "success",
        class: "bg-success text-success-foreground border-success",
      },
      {
        variant: "solid",
        color: "error",
        class: "bg-error text-error-foreground border-error",
      },
      {
        variant: "solid",
        color: "fatal",
        class: "bg-fatal text-fatal-foreground border-fatal",
      },
      // Color variants for bordered
      {
        variant: "bordered",
        color: "default",
        class: "bg-background text-foreground border-foreground",
      },
      {
        variant: "bordered",
        color: "primary",
        class: "bg-background text-primary border-primary",
      },
      {
        variant: "bordered",
        color: "secondary",
        class: "bg-background text-secondary border-secondary",
      },
      {
        variant: "bordered",
        color: "info",
        class: "bg-background text-info border-info",
      },
      {
        variant: "bordered",
        color: "debug",
        class: "bg-background text-debug border-debug",
      },
      {
        variant: "bordered",
        color: "warning",
        class: "bg-background text-warning border-warning",
      },
      {
        variant: "bordered",
        color: "success",
        class: "bg-background text-success border-success",
      },
      {
        variant: "bordered",
        color: "error",
        class: "bg-background text-error border-error",
      },
      {
        variant: "bordered",
        color: "fatal",
        class: "bg-background text-fatal border-fatal",
      },
      // Color variants for flat
      {
        variant: "flat",
        color: "default",
        class: "bg-muted/10 text-foreground",
      },
      {
        variant: "flat",
        color: "primary",
        class: "bg-primary/10 text-primary",
      },
      {
        variant: "flat",
        color: "secondary",
        class: "bg-secondary/10 text-secondary",
      },
      {
        variant: "flat",
        color: "info",
        class: "bg-info/10 text-info",
      },
      {
        variant: "flat",
        color: "debug",
        class: "bg-debug/10 text-debug",
      },
      {
        variant: "flat",
        color: "warning",
        class: "bg-warning/10 text-warning",
      },
      {
        variant: "flat",
        color: "success",
        class: "bg-success/10 text-success",
      },
      {
        variant: "flat",
        color: "error",
        class: "bg-error/10 text-error",
      },
      {
        variant: "flat",
        color: "fatal",
        class: "bg-fatal/10 text-fatal",
      },
      // Color variants for faded
      {
        variant: "faded",
        color: "default",
        class: "bg-foreground/5 text-foreground border-foreground/20",
      },
      {
        variant: "faded",
        color: "primary",
        class: "bg-primary/5 text-primary border-primary/20",
      },
      {
        variant: "faded",
        color: "secondary",
        class: "bg-secondary/5 text-secondary border-secondary/20",
      },
      {
        variant: "faded",
        color: "info",
        class: "bg-info/5 text-info border-info/20",
      },
      {
        variant: "faded",
        color: "debug",
        class: "bg-debug/5 text-debug border-debug/20",
      },
      {
        variant: "faded",
        color: "warning",
        class: "bg-warning/5 text-warning border-warning/20",
      },
      {
        variant: "faded",
        color: "success",
        class: "bg-success/5 text-success border-success/20",
      },
      {
        variant: "faded",
        color: "error",
        class: "bg-error/5 text-error border-error/20",
      },
      {
        variant: "faded",
        color: "fatal",
        class: "bg-fatal/5 text-fatal border-fatal/20",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "solid",
      color: "default",
    },
  }
);

const drawerHeaderVariants = cva(
  "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
  {
    variants: {},
    defaultVariants: {},
  }
);

const drawerFooterVariants = cva("mt-auto flex flex-col gap-2 p-4", {
  variants: {},
  defaultVariants: {},
});

const drawerTitleVariants = cva("text-foreground font-semibold", {
  variants: {},
  defaultVariants: {},
});

const drawerDescriptionVariants = cva("text-muted text-sm", {
  variants: {},
  defaultVariants: {},
});

function Drawer({
  size = "md",
  variant = "solid",
  color = "default",
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "solid" | "bordered" | "flat" | "faded";
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
}) {
  return (
    <DrawerContext.Provider value={{ size, variant, color }}>
      <DrawerPrimitive.Root data-slot="drawer" {...props} />
    </DrawerContext.Provider>
  );
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay> &
  VariantProps<typeof drawerOverlayVariants> & {
    variant?: "solid" | "bordered" | "flat" | "faded";
  }) {
  const context = React.useContext(DrawerContext);
  const overlayVariant = variant ?? context.variant ?? "solid";

  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(drawerOverlayVariants({ variant: overlayVariant }), className)}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  size,
  variant,
  color,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> &
  VariantProps<typeof drawerContentVariants> & {
    size?: "sm" | "md" | "lg" | "xl" | "full";
    variant?: "solid" | "bordered" | "flat" | "faded";
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
  }) {
  const context = React.useContext(DrawerContext);
  const contentSize = size ?? context.size ?? "md";
  const contentVariant = variant ?? context.variant ?? "solid";
  const contentColor = color ?? context.color ?? "default";

  return (
    <DrawerPortal>
      <DrawerOverlay variant={contentVariant} />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          drawerContentVariants({
            size: contentSize,
            variant: contentVariant,
            color: contentColor,
          }),
          // Direction-specific positioning
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:border-l",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:border-r",
          className
        )}
        {...props}
      >
        <div className="bg-border mx-auto mt-4 hidden h-1 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof drawerHeaderVariants>) {
  return (
    <div data-slot="drawer-header" className={cn(drawerHeaderVariants(), className)} {...props} />
  );
}

function DrawerFooter({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof drawerFooterVariants>) {
  return (
    <div data-slot="drawer-footer" className={cn(drawerFooterVariants(), className)} {...props} />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title> & VariantProps<typeof drawerTitleVariants>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(drawerTitleVariants(), className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description> &
  VariantProps<typeof drawerDescriptionVariants>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(drawerDescriptionVariants(), className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  drawerOverlayVariants,
  drawerContentVariants,
  drawerHeaderVariants,
  drawerFooterVariants,
  drawerTitleVariants,
  drawerDescriptionVariants,
};
