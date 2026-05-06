import { CheckIcon, InfoIcon, Loader2Icon, TriangleAlertIcon, XIcon } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-foreground text-background size-5 rounded-full inline-flex items-center justify-center">
    {children}
  </div>
);

const Toaster = ({ theme = "system", ...props }: ToasterProps) => (
  <Sonner
    theme={theme}
      className="toaster group"
      icons={{
        success: (
          <IconWrapper>
            <CheckIcon size={12} />
          </IconWrapper>
        ),
        info: (
          <IconWrapper>
            <InfoIcon size={12} />
          </IconWrapper>
        ),
        warning: (
          <IconWrapper>
            <TriangleAlertIcon size={12} />
          </IconWrapper>
        ),
        error: (
          <IconWrapper>
            <XIcon size={12} />
          </IconWrapper>
        ),
        loading: (
          <IconWrapper>
            <Loader2Icon size={12} className="animate-spin" />
          </IconWrapper>
        ),
      }}
      style={
        {
          "--normal-bg": "oklch(var(--popover))",
          "--normal-text": "oklch(var(--popover-foreground))",
          "--normal-border": "oklch(var(--popover-border))",
          "--border-radius": "var(--radius)",
          "--shadow": "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          "--toast-svg-margin-start": 0,
          "--toast-svg-margin-end": 0,
        } as React.CSSProperties
      }
      {...props}
    />
);

export { Toaster };
