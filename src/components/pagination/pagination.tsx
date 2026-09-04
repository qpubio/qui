"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { buttonVariants } from "../button/button";
import { cn } from "../../lib/utils";

type PaginationSize = "sm" | "md" | "lg";

const paginationVariants = cva("mx-auto flex w-full justify-center", {
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

const paginationContentVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "gap-0.5",
      md: "gap-0.5",
      lg: "gap-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const paginationLinkVariants = cva("", {
  variants: {
    size: {
      sm: "min-w-[var(--density-control-h-sm)] px-0",
      md: "min-w-[var(--density-control-h)] px-0",
      lg: "min-w-[var(--density-control-h-lg)] px-0",
    },
    isNav: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      isNav: true,
      size: "sm",
      class: "min-w-0 gap-1 px-2.5",
    },
    {
      isNav: true,
      size: "md",
      class: "min-w-0 gap-1.5 px-3",
    },
    {
      isNav: true,
      size: "lg",
      class: "min-w-0 gap-2 px-4",
    },
  ],
  defaultVariants: {
    size: "md",
    isNav: false,
  },
});

const paginationEllipsisVariants = cva(
  "flex items-center justify-center [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: {
        sm: "size-[var(--density-control-h-sm)]",
        md: "size-[var(--density-control-h)]",
        lg: "size-[var(--density-control-h-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function cloneChildrenWithSize(
  children: React.ReactNode,
  size: PaginationSize,
): React.ReactNode {
  return React.Children.map(children, (child): React.ReactNode => {
    if (React.isValidElement(child)) {
      if (typeof child.type === "string") {
        return child;
      }
      if (child.type === React.Fragment) {
        const fragmentProps = child.props as { children?: React.ReactNode };
        return React.cloneElement(
          child,
          {},
          cloneChildrenWithSize(fragmentProps.children, size),
        );
      }
      return React.cloneElement(child, { size } as React.ComponentProps<
        React.FunctionComponent<{ size?: PaginationSize }>
      >);
    }
    return child;
  });
}

/**
 * Builds a page-range list with ellipsis gaps for compound Pagination.
 * Returns page numbers and `"ellipsis"` placeholders.
 */
function getPaginationItems(
  page: number,
  totalPages: number,
  siblingCount = 1,
): (number | "ellipsis")[] {
  if (totalPages <= 0) return [];

  const current = Math.min(Math.max(1, page), totalPages);
  const siblings = Math.max(0, siblingCount);
  // first + last + current + 2×siblings + up to 2 ellipsis slots
  const totalPageNumbers = siblings * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(current - siblings, 1);
  const rightSiblingIndex = Math.min(current + siblings, totalPages);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1,
    );
    return [1, "ellipsis", ...rightRange];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );
    return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

interface PaginationProps
  extends React.ComponentProps<"nav">, VariantProps<typeof paginationVariants> {
  size?: PaginationSize;
}

function Pagination({
  className,
  size = "md",
  children,
  ...props
}: PaginationProps) {
  const childrenWithSize = cloneChildrenWithSize(children, size);

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(paginationVariants({ size }), className)}
      {...props}
    >
      {childrenWithSize}
    </nav>
  );
}

interface PaginationContentProps
  extends
    React.ComponentProps<"ul">,
    VariantProps<typeof paginationContentVariants> {
  size?: PaginationSize;
}

function PaginationContent({
  className,
  size = "md",
  children,
  ...props
}: PaginationContentProps) {
  const childrenWithSize = cloneChildrenWithSize(children, size);

  return (
    <ul
      data-slot="pagination-content"
      className={cn(paginationContentVariants({ size }), className)}
      {...props}
    >
      {childrenWithSize}
    </ul>
  );
}

interface PaginationItemProps extends React.ComponentProps<"li"> {
  size?: PaginationSize;
}

function PaginationItem({
  className,
  size = "md",
  children,
  ...props
}: PaginationItemProps) {
  const childrenWithSize = cloneChildrenWithSize(children, size);

  return (
    <li data-slot="pagination-item" className={className} {...props}>
      {childrenWithSize}
    </li>
  );
}

type PaginationLinkProps = {
  isActive?: boolean;
  isDisabled?: boolean;
  asChild?: boolean;
  size?: PaginationSize;
  /** When true, uses nav (prev/next) padding instead of square page-hit sizing. */
  isNav?: boolean;
} & Omit<React.ComponentProps<"a">, "size">;

function PaginationLink({
  className,
  isActive = false,
  isDisabled = false,
  asChild = false,
  size = "md",
  isNav = false,
  ...props
}: PaginationLinkProps) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      aria-current={isActive ? "page" : undefined}
      aria-disabled={isDisabled || undefined}
      data-slot="pagination-link"
      data-active={isActive || undefined}
      tabIndex={isDisabled ? -1 : props.tabIndex}
      className={cn(
        buttonVariants({
          variant: isActive ? "solid" : "light",
          size,
        }),
        paginationLinkVariants({ size, isNav }),
        isDisabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    />
  );
}

type PaginationNavLinkProps = Omit<PaginationLinkProps, "isNav"> & {
  text?: string;
};

function PaginationPrevious({
  className,
  text = "Previous",
  size = "md",
  children,
  ...props
}: PaginationNavLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size={size}
      isNav
      className={className}
      {...props}
    >
      {children ?? (
        <>
          <ChevronLeft />
          {text ? <span className="hidden sm:block">{text}</span> : null}
        </>
      )}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Next",
  size = "md",
  children,
  ...props
}: PaginationNavLinkProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size={size}
      isNav
      className={className}
      {...props}
    >
      {children ?? (
        <>
          {text ? <span className="hidden sm:block">{text}</span> : null}
          <ChevronRight />
        </>
      )}
    </PaginationLink>
  );
}

interface PaginationEllipsisProps
  extends
    React.ComponentProps<"span">,
    VariantProps<typeof paginationEllipsisVariants> {
  size?: PaginationSize;
}

function PaginationEllipsis({
  className,
  size = "md",
  ...props
}: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      role="presentation"
      className={cn(paginationEllipsisVariants({ size }), className)}
      {...props}
    >
      <MoreHorizontal />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  getPaginationItems,
  paginationVariants,
  paginationContentVariants,
  paginationLinkVariants,
  paginationEllipsisVariants,
};
