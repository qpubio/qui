import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

type BreadcrumbSize = "sm" | "md" | "lg";

const breadcrumbVariants = cva("", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const breadcrumbListVariants = cva("text-muted flex flex-wrap items-center break-words", {
  variants: {
    size: {
      sm: "gap-1 text-xs",
      md: "gap-1.5 text-sm sm:gap-2.5",
      lg: "gap-2 text-base sm:gap-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const breadcrumbItemVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-1.5",
      lg: "gap-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const breadcrumbLinkVariants = cva("hover:text-foreground transition-colors", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const breadcrumbPageVariants = cva("text-foreground font-normal", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const breadcrumbSeparatorVariants = cva("", {
  variants: {
    size: {
      sm: "[&>svg]:size-3",
      md: "[&>svg]:size-3.5",
      lg: "[&>svg]:size-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const breadcrumbEllipsisVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      sm: "size-7",
      md: "size-9",
      lg: "size-11",
    },
  },
});

// Helper to clone children and inject size prop
function cloneChildrenWithSize(children: React.ReactNode, size: BreadcrumbSize): React.ReactNode {
  return React.Children.map(children, (child): React.ReactNode => {
    if (React.isValidElement(child)) {
      // Skip string elements (like "div", "span", etc.)
      if (typeof child.type === "string") {
        return child;
      }
      // Skip React.Fragment
      if (child.type === React.Fragment) {
        // Recursively clone fragment children
        const fragmentProps = child.props as { children?: React.ReactNode };
        return React.cloneElement(child, {}, cloneChildrenWithSize(fragmentProps.children, size));
      }
      // Clone component and inject size
      return React.cloneElement(child, { size } as React.ComponentProps<
        React.FunctionComponent<{ size?: BreadcrumbSize }>
      >);
    }
    return child;
  });
}

interface BreadcrumbProps
  extends React.ComponentProps<"nav">,
    VariantProps<typeof breadcrumbVariants> {
  size?: BreadcrumbSize;
}

function Breadcrumb({ className, size = "md", children, ...props }: BreadcrumbProps) {
  const childrenWithSize = cloneChildrenWithSize(children, size);

  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(breadcrumbVariants({ size }), className)}
      {...props}
    >
      {childrenWithSize}
    </nav>
  );
}

interface BreadcrumbListProps
  extends React.ComponentProps<"ol">,
    VariantProps<typeof breadcrumbListVariants> {
  size?: BreadcrumbSize;
}

function BreadcrumbList({ className, size = "md", children, ...props }: BreadcrumbListProps) {
  const childrenWithSize = cloneChildrenWithSize(children, size);

  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(breadcrumbListVariants({ size }), className)}
      {...props}
    >
      {childrenWithSize}
    </ol>
  );
}

interface BreadcrumbItemProps
  extends React.ComponentProps<"li">,
    VariantProps<typeof breadcrumbItemVariants> {
  size?: BreadcrumbSize;
}

function BreadcrumbItem({ className, size = "md", children, ...props }: BreadcrumbItemProps) {
  const childrenWithSize = cloneChildrenWithSize(children, size);

  return (
    <li
      data-slot="breadcrumb-item"
      className={cn(breadcrumbItemVariants({ size }), className)}
      {...props}
    >
      {childrenWithSize}
    </li>
  );
}

interface BreadcrumbLinkProps
  extends React.ComponentProps<"a">,
    VariantProps<typeof breadcrumbLinkVariants> {
  asChild?: boolean;
  size?: BreadcrumbSize;
}

function BreadcrumbLink({
  asChild = false,
  className,
  size = "md",
  ...props
}: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(breadcrumbLinkVariants({ size }), className)}
      {...props}
    />
  );
}

interface BreadcrumbPageProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof breadcrumbPageVariants> {
  size?: BreadcrumbSize;
}

function BreadcrumbPage({ className, size = "md", ...props }: BreadcrumbPageProps) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(breadcrumbPageVariants({ size }), className)}
      {...props}
    />
  );
}

interface BreadcrumbSeparatorProps
  extends React.ComponentProps<"li">,
    VariantProps<typeof breadcrumbSeparatorVariants> {
  size?: BreadcrumbSize;
}

function BreadcrumbSeparator({
  children,
  className,
  size = "md",
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbSeparatorVariants({ size }), className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

interface BreadcrumbEllipsisProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof breadcrumbEllipsisVariants> {
  size?: BreadcrumbSize;
}

function BreadcrumbEllipsis({ className, size = "md", ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbEllipsisVariants({ size }), className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbVariants,
  breadcrumbListVariants,
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbPageVariants,
  breadcrumbSeparatorVariants,
  breadcrumbEllipsisVariants,
};
