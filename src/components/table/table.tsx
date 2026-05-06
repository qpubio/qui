import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const tableVariants = cva("w-full caption-bottom text-sm", {
  variants: {
    variant: {
      default: "",
      striped:
        "[&_tbody_tr:nth-child(even)]:bg-accent/50 [&_tbody_tr:hover]:bg-accent [&_tbody_tr:nth-child(even):hover]:bg-accent/70",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const tableHeaderVariants = cva(
  "[&_tr]:bg-muted/20 [&_tr]:hover:bg-muted/20 [&_th]:font-medium [&_th]:uppercase [&_th]:text-muted",
  {
    variants: {},
    defaultVariants: {},
  }
);

const tableBodyVariants = cva("[&_tr:last-child]:border-0", {
  variants: {},
  defaultVariants: {},
});

const tableFooterVariants = cva(
  "bg-muted/50 border-t border-border font-medium [&>tr]:last:border-b-0",
  {
    variants: {},
    defaultVariants: {},
  }
);

const tableRowVariants = cva(
  "hover:bg-accent data-[state=selected]:bg-muted transition-colors",
  {
    variants: {
      variant: {
        default: "",
        interactive: "hover:bg-accent/50 cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const tableHeadVariants = cva(
  "text-foreground text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-12 px-2 text-sm",
        lg: "h-14 px-3 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const tableCellVariants = cva(
  "align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  {
    variants: {
      size: {
        sm: "p-1.5 text-xs",
        md: "p-3 text-sm",
        lg: "p-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const tableCaptionVariants = cva("text-muted mt-4 text-sm", {
  variants: {},
  defaultVariants: {},
});

function Table({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"table"> & VariantProps<typeof tableVariants>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn(tableVariants({ variant, size }), className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead"> & VariantProps<typeof tableHeaderVariants>) {
  return (
    <thead data-slot="table-header" className={cn(tableHeaderVariants(), className)} {...props} />
  );
}

function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody"> & VariantProps<typeof tableBodyVariants>) {
  return <tbody data-slot="table-body" className={cn(tableBodyVariants(), className)} {...props} />;
}

function TableFooter({
  className,
  ...props
}: React.ComponentProps<"tfoot"> & VariantProps<typeof tableFooterVariants>) {
  return (
    <tfoot data-slot="table-footer" className={cn(tableFooterVariants(), className)} {...props} />
  );
}

function TableRow({
  className,
  variant,
  ...props
}: React.ComponentProps<"tr"> & VariantProps<typeof tableRowVariants>) {
  return (
    <tr data-slot="table-row" className={cn(tableRowVariants({ variant }), className)} {...props} />
  );
}

function TableHead({
  className,
  size,
  ...props
}: React.ComponentProps<"th"> & VariantProps<typeof tableHeadVariants>) {
  return (
    <th data-slot="table-head" className={cn(tableHeadVariants({ size }), className)} {...props} />
  );
}

function TableCell({
  className,
  size,
  ...props
}: React.ComponentProps<"td"> & VariantProps<typeof tableCellVariants>) {
  return (
    <td data-slot="table-cell" className={cn(tableCellVariants({ size }), className)} {...props} />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption"> & VariantProps<typeof tableCaptionVariants>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(tableCaptionVariants(), className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableFooterVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
  tableCaptionVariants,
};
