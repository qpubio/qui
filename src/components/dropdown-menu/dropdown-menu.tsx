import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const dropdownMenuContentVariants = cva(
  [
    // Base styles
    "bg-popover text-foreground",
    "rounded-md border border-popover-border p-1 shadow-lg",
    "z-50 min-w-[8rem]",
    
    // Layout
    "max-h-(--radix-dropdown-menu-content-available-height)",
    "origin-(--radix-dropdown-menu-content-transform-origin)",
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
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

const dropdownMenuItemVariants = cva(
  [
    // Layout
    "relative flex items-center gap-2",
    "px-2 py-1.5",
    "rounded-sm",
    
    // Typography
    "text-sm",
    
    // Interactive
    "cursor-pointer select-none",
    "outline-none",
    "focus:bg-foreground/10 focus:text-accent-foreground",
    
    // States
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "data-[inset]:pl-8",
    
    // Icons
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

const dropdownMenuCheckboxItemVariants = cva(
  [
    // Layout
    "relative flex items-center gap-2",
    "py-1.5 pr-2 pl-8",
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
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

const dropdownMenuRadioItemVariants = cva(
  [
    // Layout
    "relative flex items-center gap-2",
    "py-1.5 pr-2 pl-8",
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
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

const dropdownMenuLabelVariants = cva(
  [
    // Layout
    "px-2 py-1.5",
    "data-[inset]:pl-8",
    
    // Typography
    "text-xs text-muted font-light",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

const dropdownMenuSeparatorVariants = cva(
  [
    // Layout
    "-mx-1 my-1 h-px",
    
    // Visual
    "bg-popover-border",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

const dropdownMenuShortcutVariants = cva(
  [
    // Layout
    "ml-auto",
    
    // Typography
    "text-xs tracking-widest",
    "text-muted",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

const dropdownMenuSubTriggerVariants = cva(
  [
    // Layout
    "flex items-center",
    "px-2 py-1.5",
    "rounded-sm",
    "data-[inset]:pl-8",
    
    // Typography
    "text-sm",
    
    // Interactive
    "cursor-default select-none",
    "outline-none",
    
    // States
    "focus:bg-accent focus:text-accent-foreground",
    "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

const dropdownMenuSubContentVariants = cva(
  [
    // Base styles
    "bg-popover text-popover-foreground",
    "rounded-md border border-border p-1 shadow-lg",
    "z-50 min-w-[8rem]",
    
    // Layout
    "origin-(--radix-dropdown-menu-content-transform-origin)",
    "overflow-hidden",
    
    // Animations
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    
    // Slide animations
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
    "data-[side=top]:slide-in-from-bottom-2",
  ].join(" "),
  {
    variants: {},
    defaultVariants: {},
  }
);

function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> &
  VariantProps<typeof dropdownMenuContentVariants>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(dropdownMenuContentVariants(), className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuItem({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> &
  VariantProps<typeof dropdownMenuItemVariants> & {
    inset?: boolean;
  }) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      className={cn(dropdownMenuItemVariants(), className)}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> &
  VariantProps<typeof dropdownMenuCheckboxItemVariants>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(dropdownMenuCheckboxItemVariants(), className)}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> &
  VariantProps<typeof dropdownMenuRadioItemVariants>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(dropdownMenuRadioItemVariants(), className)}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> &
  VariantProps<typeof dropdownMenuLabelVariants> & {
    inset?: boolean;
  }) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(dropdownMenuLabelVariants(), className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator> &
  VariantProps<typeof dropdownMenuSeparatorVariants>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(dropdownMenuSeparatorVariants(), className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof dropdownMenuShortcutVariants>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(dropdownMenuShortcutVariants(), className)}
      {...props}
    />
  );
}

function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> &
  VariantProps<typeof dropdownMenuSubTriggerVariants> & {
    inset?: boolean;
  }) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(dropdownMenuSubTriggerVariants(), className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> &
  VariantProps<typeof dropdownMenuSubContentVariants>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(dropdownMenuSubContentVariants(), className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  dropdownMenuCheckboxItemVariants,
  dropdownMenuRadioItemVariants,
  dropdownMenuLabelVariants,
  dropdownMenuSeparatorVariants,
  dropdownMenuShortcutVariants,
  dropdownMenuSubTriggerVariants,
  dropdownMenuSubContentVariants,
};
