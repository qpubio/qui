import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

// Context for sharing variant and color across tab components
interface TabsContextValue {
  variant?: "solid" | "underline";
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
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const TabsContext = React.createContext<TabsContextValue>({});

function Tabs({
  className,
  variant = "solid",
  color = "default",
  size = "md",
  fullWidth = false,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: "solid" | "underline";
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
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}) {
  return (
    <TabsContext.Provider value={{ variant, color, size, fullWidth }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

const tabsListVariants = cva("flex items-center justify-center relative", {
  variants: {
    variant: {
      solid: "bg-accent p-1",
      underline: "border-b border-border",
    },
    size: {
      sm: "h-7",
      md: "h-9",
      lg: "h-12",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      size: "sm",
      class: "rounded-sm",
    },
    {
      variant: "solid",
      size: "md",
      class: "rounded-md",
    },
    {
      variant: "solid",
      size: "lg",
      class: "rounded-lg",
    },
  ],
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-1.5 text-sm whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-ring focus-visible:ring-[2px] focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 relative z-10",
  {
    variants: {
      variant: {
        solid:
          "text-muted hover:text-muted/60 border border-transparent data-[state=active]:text-foreground rounded-md",
        underline:
          "text-muted hover:text-muted/60 rounded-none border-b-2 border-transparent data-[state=active]:text-foreground",
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
        sm: "h-[calc(100%-1px)] px-2 py-1 text-xs",
        md: "h-[calc(100%-1px)] px-3 py-1.5 text-sm",
        lg: "h-[calc(100%-1px)] px-4 py-2 text-base",
      },
    },
    compoundVariants: [
      // Solid variant colors - now only handle text colors, background handled by indicator
      {
        variant: "solid",
        color: "default",
        class: "data-[state=active]:text-foreground",
      },
      {
        variant: "solid",
        color: "primary",
        class: "data-[state=active]:text-primary-foreground",
      },
      {
        variant: "solid",
        color: "secondary",
        class: "data-[state=active]:text-secondary-foreground",
      },
      {
        variant: "solid",
        color: "info",
        class: "data-[state=active]:text-info-foreground",
      },
      {
        variant: "solid",
        color: "debug",
        class: "data-[state=active]:text-debug-foreground",
      },
      {
        variant: "solid",
        color: "warning",
        class: "data-[state=active]:text-warning-foreground",
      },
      {
        variant: "solid",
        color: "success",
        class: "data-[state=active]:text-success-foreground",
      },
      {
        variant: "solid",
        color: "error",
        class: "data-[state=active]:text-error-foreground",
      },
      {
        variant: "solid",
        color: "fatal",
        class: "data-[state=active]:text-fatal-foreground",
      },

      // Size adjustments for solid variant
      {
        variant: "solid",
        size: "sm",
        class: "rounded-xs",
      },
      {
        variant: "solid",
        size: "md",
        class: "rounded-sm",
      },
      {
        variant: "solid",
        size: "lg",
        class: "rounded-md",
      },

      // Underline variant colors - now only handle text colors, border handled by indicator
      {
        variant: "underline",
        color: "primary",
        class: "data-[state=active]:text-primary",
      },
      {
        variant: "underline",
        color: "secondary",
        class: "data-[state=active]:text-secondary",
      },
      {
        variant: "underline",
        color: "info",
        class: "data-[state=active]:text-info",
      },
      {
        variant: "underline",
        color: "debug",
        class: "data-[state=active]:text-debug",
      },
      {
        variant: "underline",
        color: "warning",
        class: "data-[state=active]:text-warning",
      },
      {
        variant: "underline",
        color: "success",
        class: "data-[state=active]:text-success",
      },
      {
        variant: "underline",
        color: "error",
        class: "data-[state=active]:text-error",
      },
      {
        variant: "underline",
        color: "fatal",
        class: "data-[state=active]:text-fatal",
      },

      // Size adjustments for underline variant
      {
        variant: "underline",
        size: "sm",
        class: "h-7 -mb-[2px]",
      },
      {
        variant: "underline",
        size: "md",
        class: "h-9 -mb-[2px]",
      },
      {
        variant: "underline",
        size: "lg",
        class: "h-12 -mb-[2px]",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
      size: "md",
    },
  }
);

// Indicator variants for the dedicated indicator element
const tabsIndicatorVariants = cva("absolute transition-all duration-200 ease-out", {
  variants: {
    variant: {
      solid: "rounded-md border border-transparent shadow-sm",
      underline: "border-b-2",
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
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    // Solid variant indicator colors
    {
      variant: "solid",
      color: "default",
      class: "bg-background border-border dark:bg-foreground/30",
    },
    {
      variant: "solid",
      color: "primary",
      class: "bg-primary",
    },
    {
      variant: "solid",
      color: "secondary",
      class: "bg-secondary",
    },
    {
      variant: "solid",
      color: "info",
      class: "bg-info",
    },
    {
      variant: "solid",
      color: "debug",
      class: "bg-debug",
    },
    {
      variant: "solid",
      color: "warning",
      class: "bg-warning",
    },
    {
      variant: "solid",
      color: "success",
      class: "bg-success",
    },
    {
      variant: "solid",
      color: "error",
      class: "bg-error",
    },
    {
      variant: "solid",
      color: "fatal",
      class: "bg-fatal",
    },

    // Underline variant indicator colors
    {
      variant: "underline",
      color: "default",
      class: "border-foreground",
    },
    {
      variant: "underline",
      color: "primary",
      class: "border-primary",
    },
    {
      variant: "underline",
      color: "secondary",
      class: "border-secondary",
    },
    {
      variant: "underline",
      color: "info",
      class: "border-info",
    },
    {
      variant: "underline",
      color: "debug",
      class: "border-debug",
    },
    {
      variant: "underline",
      color: "warning",
      class: "border-warning",
    },
    {
      variant: "underline",
      color: "success",
      class: "border-success",
    },
    {
      variant: "underline",
      color: "error",
      class: "border-error",
    },
    {
      variant: "underline",
      color: "fatal",
      class: "border-fatal",
    },

    // Size adjustments for solid indicator
    {
      variant: "solid",
      size: "sm",
      class: "rounded-xs",
    },
    {
      variant: "solid",
      size: "md",
      class: "rounded-sm",
    },
    {
      variant: "solid",
      size: "lg",
      class: "rounded-md",
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
  },
});

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant, color, size, fullWidth } = React.useContext(TabsContext);
  const [indicatorStyle, setIndicatorStyle] = React.useState({});
  const listRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Update indicator position
  const updateIndicatorPosition = React.useCallback(() => {
    if (!listRef.current || !scrollContainerRef.current) return;

    const activeElement = listRef.current.querySelector('[data-state="active"]') as HTMLElement;
    if (!activeElement) return;

    const rect = activeElement.getBoundingClientRect();
    const scrollContainerRect = scrollContainerRef.current.getBoundingClientRect();
    const scrollLeft = scrollContainerRef.current.scrollLeft;

    // Calculate position relative to the scroll container, accounting for scroll offset
    const left = rect.left - scrollContainerRect.left + scrollLeft;
    const width = rect.width;
    const height = rect.height;

    if (variant === "solid") {
      setIndicatorStyle({
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        top: "50%",
        transform: "translateY(-50%)",
      });
    } else {
      setIndicatorStyle({
        left: `${left}px`,
        width: `${width}px`,
        bottom: "-2px", // Position at bottom border
        transform: undefined,
      });
    }

    // Scroll active tab into view if it's not fully visible
    const containerWidth = scrollContainerRef.current.clientWidth;
    const elementLeft = left;
    const elementRight = left + width;

    if (elementLeft < scrollLeft) {
      // Element is to the left of visible area
      scrollContainerRef.current.scrollTo({
        left: elementLeft - 8, // Add some padding
        behavior: "smooth",
      });
    } else if (elementRight > scrollLeft + containerWidth) {
      // Element is to the right of visible area
      scrollContainerRef.current.scrollTo({
        left: elementRight - containerWidth + 8, // Add some padding
        behavior: "smooth",
      });
    }
  }, [variant]);

  // Set up mutation observer to watch for tab state changes
  React.useEffect(() => {
    if (!listRef.current) return;

    // Initial position
    updateIndicatorPosition();

    // Set up mutation observer to watch for data-state changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-state") {
          // Small delay to ensure DOM is updated
          setTimeout(updateIndicatorPosition, 0);
        }
      });
    });

    // Observe all tab triggers in the list
    const tabTriggers = listRef.current.querySelectorAll("[data-state]");
    tabTriggers.forEach((trigger) => {
      observer.observe(trigger, { attributes: true, attributeFilter: ["data-state"] });
    });

    // Also observe the list itself for child changes (in case tabs are added/removed)
    observer.observe(listRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-state"],
    });

    return () => observer.disconnect();
  }, [updateIndicatorPosition]);

  // Update on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setTimeout(updateIndicatorPosition, 0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicatorPosition]);

  return (
    <div
      ref={scrollContainerRef}
      className={cn("overflow-x-auto scrollbar-hide", fullWidth && "w-full")}
      style={{
        overflowY: "hidden", // Prevent vertical scrolling
        maxWidth: "100%", // Ensure it doesn't exceed container width
      }}
    >
      <TabsPrimitive.List
        ref={listRef}
        data-slot="tabs-list"
        className={cn(tabsListVariants({ variant, size }), fullWidth && "justify-start", className)}
        style={
          fullWidth
            ? { minWidth: "max-content", width: "100%" }
            : {
                minWidth: "max-content", // Allow tabs to take their natural width
                width: "max-content", // Ensure tabs don't shrink
              }
        }
        {...props}
      >
        {children}
        {/* Dedicated indicator element */}
        <div
          data-slot="tabs-indicator"
          className={cn(tabsIndicatorVariants({ variant, color, size }))}
          style={indicatorStyle}
        />
      </TabsPrimitive.List>
    </div>
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { variant, color, size } = React.useContext(TabsContext);

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, color, size }), className)}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  tabsIndicatorVariants,
};
