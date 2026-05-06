import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "../../lib/utils";

const navigationMenuVariants = cva(
  "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
  {
    variants: {},
    defaultVariants: {},
  }
);

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> &
  VariantProps<typeof navigationMenuVariants> & {
    viewport?: boolean;
  }) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(navigationMenuVariants(), className)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

const navigationMenuListVariants = cva(
  "group flex flex-1 list-none items-center justify-center gap-1",
  {
    variants: {},
    defaultVariants: {},
  }
);

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List> &
  VariantProps<typeof navigationMenuListVariants>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(navigationMenuListVariants(), className)}
      {...props}
    />
  );
}

const navigationMenuItemVariants = cva("relative", {
  variants: {},
  defaultVariants: {},
});

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item> &
  VariantProps<typeof navigationMenuItemVariants>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn(navigationMenuItemVariants(), className)}
      {...props}
    />
  );
}

const navigationMenuTriggerVariants = cva(
  [
    // Layout & Display
    "group inline-flex h-9 w-max items-center justify-center",
    // Spacing & Shape
    "rounded-md px-4 py-2",
    // Typography
    "text-sm",
    // Base colors
    "bg-transparent text-zinc-600 dark:text-zinc-400",
    // Hover states
    "hover:bg-accent hover:text-accent-foreground dark:hover:text-accent-foreground",
    // Focus states
    "focus:bg-accent focus:text-accent-foreground",
    "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
    // Disabled states
    "disabled:pointer-events-none disabled:opacity-50",
    // Open states
    "data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground",
    "data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50",
    // Transitions & Effects
    "outline-none transition-[color,box-shadow]",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger> &
  VariantProps<typeof navigationMenuTriggerVariants>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerVariants(), className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 
          transition duration-300 
          group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

const navigationMenuContentVariants = cva(
  [
    // Motion animations
    "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
    "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
    "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
    "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
    // Position & Size
    "top-0 left-0 w-full p-2 pr-2.5",
    "md:absolute md:w-auto",
    // Viewport=false styles
    "group-data-[viewport=false]/navigation-menu:bg-popover",
    "group-data-[viewport=false]/navigation-menu:text-popover-foreground",
    "group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in",
    "group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out",
    "group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95",
    "group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",
    "group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0",
    "group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0",
    "group-data-[viewport=false]/navigation-menu:top-full",
    "group-data-[viewport=false]/navigation-menu:mt-1.5",
    "group-data-[viewport=false]/navigation-menu:overflow-hidden",
    "group-data-[viewport=false]/navigation-menu:rounded-md",
    "group-data-[viewport=false]/navigation-menu:border",
    "group-data-[viewport=false]/navigation-menu:border-popover-border",
    "group-data-[viewport=false]/navigation-menu:shadow",
    "group-data-[viewport=false]/navigation-menu:duration-200",
    // Link focus styles
    "**:data-[slot=navigation-menu-link]:focus:ring-0",
    "**:data-[slot=navigation-menu-link]:focus:outline-none",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content> &
  VariantProps<typeof navigationMenuContentVariants>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(navigationMenuContentVariants(), className)}
      {...props}
    />
  );
}

const navigationMenuViewportVariants = cva(
  [
    // Transform origin
    "origin-top-center",
    // Colors
    "bg-popover text-foreground",
    // Animations
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
    // Position & Size
    "relative mt-1.5 w-full overflow-hidden",
    "h-[var(--radix-navigation-menu-viewport-height)]",
    "md:w-[var(--radix-navigation-menu-viewport-width)]",
    // Appearance
    "rounded-md border border-popover-border shadow",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport> &
  VariantProps<typeof navigationMenuViewportVariants>) {
  return (
    <div className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(navigationMenuViewportVariants(), className)}
        {...props}
      />
    </div>
  );
}

const navigationMenuLinkVariants = cva(
  [
    // Layout
    "flex flex-col gap-1",
    // Spacing & Shape
    "rounded-sm p-2",
    // Typography
    "text-sm",
    // Base states
    "outline-none transition-all",
    // Hover states
    "hover:bg-accent hover:text-accent-foreground",
    // Focus states
    "focus:bg-accent focus:text-accent-foreground",
    "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1",
    // Active states
    "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent",
    "data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground",
    // SVG styles
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link> &
  VariantProps<typeof navigationMenuLinkVariants>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(navigationMenuLinkVariants(), className)}
      {...props}
    />
  );
}

const navigationMenuIndicatorVariants = cva(
  [
    // Position & Z-index
    "top-full z-[1]",
    // Layout
    "flex h-1.5 items-end justify-center overflow-hidden",
    // Animations
    "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
    "data-[state=hidden]:fade-out data-[state=visible]:fade-in",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator> &
  VariantProps<typeof navigationMenuIndicatorVariants>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(navigationMenuIndicatorVariants(), className)}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuVariants,
  navigationMenuListVariants,
  navigationMenuItemVariants,
  navigationMenuContentVariants,
  navigationMenuTriggerVariants,
  navigationMenuLinkVariants,
  navigationMenuIndicatorVariants,
  navigationMenuViewportVariants,
};
