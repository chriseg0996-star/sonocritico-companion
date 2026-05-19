"use client";

import { CONTENT_MAX_WIDTH, CONTENT_NARROW_MAX_WIDTH } from "@/lib/layout-config";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  narrow,
  className,
}: {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("page-shell", narrow && "page-shell--narrow", className)}
      style={{
        maxWidth: narrow ? CONTENT_NARROW_MAX_WIDTH : CONTENT_MAX_WIDTH,
      }}
    >
      {children}
    </div>
  );
}
