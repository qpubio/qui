"use client"

import { chrome } from "#chrome";
import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted/15 rounded-md", chrome.skeletonMotion, className)}
      {...props}
    />
  );
}

export { Skeleton };
