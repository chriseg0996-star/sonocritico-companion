"use client";

import { layout } from "@/lib/typography";
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
        maxWidth: narrow ? layout.contentNarrow : layout.contentMax,
      }}
    >
      {children}
    </div>
  );
}
