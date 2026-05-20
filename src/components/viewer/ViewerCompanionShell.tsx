"use client";

import { Suspense } from "react";
import { CompanionLayoutShell } from "@/components/companion/CompanionLayoutShell";
import type { CompanionLayoutHints } from "@/lib/layout-context";

type Props = {
  children: React.ReactNode;
  hints: CompanionLayoutHints;
};

/** Visor + panel companion (sin modificar ClinicalViewer). */
export function ViewerCompanionShell({ children, hints }: Props) {
  return (
    <Suspense fallback={<>{children}</>}>
      <CompanionLayoutShell hints={hints}>{children}</CompanionLayoutShell>
    </Suspense>
  );
}
