import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// Context to pass props to child components
interface DialogContextValue {
  isDismissable?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full" | "fullscreen";
}

const DialogContext = React.createContext<DialogContextValue>({});

const dialogContentVariants = cva(
  "bg-dialog fixed inset-0 z-50 m-auto grid w-full h-fit gap-4 rounded-lg border border-border p-6 shadow-lg duration-200",
  {
    variants: {
      size: {
        sm: "max-w-[calc(100%-2rem)] sm:max-w-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        md: "max-w-[calc(100%-2rem)] sm:max-w-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        lg: "max-w-[calc(100%-2rem)] sm:max-w-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        xl: "max-w-[calc(100%-2rem)] sm:max-w-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        full: "max-w-[calc(100%-2rem)] sm:max-w-[90vw] max-h-[90vh] overflow-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        fullscreen: "max-w-full max-h-full h-full w-full m-0 rounded-none border-0 p-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function Dialog({
  isDismissable = true,
  isOpen,
  onOpenChange,
  size = "md",
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Root>, "open" | "onOpenChange"> & {
  isDismissable?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl" | "full" | "fullscreen";
}) {
  return (
    <DialogContext.Provider value={{ isDismissable, size }}>
      <DialogPrimitive.Root
        data-slot="dialog"
        open={isOpen}
        onOpenChange={onOpenChange}
        {...props}
      />
    </DialogContext.Provider>
  );
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  const { size } = React.useContext(DialogContext);
  
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-background/90 backdrop-blur-sm backdrop-saturate-150",
        size !== "fullscreen" && "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content>;

function DialogContent({
  className,
  children,
  showCloseButton,
  ...props
}: DialogContentProps &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean;
  }) {
  const { isDismissable, size } = React.useContext(DialogContext);

  // If showCloseButton is explicitly set, use that value, otherwise use isDismissable
  const shouldShowCloseButton = showCloseButton !== undefined ? showCloseButton : isDismissable;

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ size }), className)}
        onPointerDownOutside={
          !isDismissable
            ? (e: Parameters<NonNullable<DialogContentProps["onPointerDownOutside"]>>[0]) =>
                e.preventDefault()
            : undefined
        }
        onEscapeKeyDown={
          !isDismissable
            ? (e: Parameters<NonNullable<DialogContentProps["onEscapeKeyDown"]>>[0]) =>
                e.preventDefault()
            : undefined
        }
        {...props}
      >
        {children}
        {shouldShowCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="data-[state=open]:text-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-0 focus:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted text-sm", className)}
      {...props}
    />
  );
}

// Custom hook for dialog state management
function useDialog(defaultOpen: boolean = false) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants,
  useDialog,
};
