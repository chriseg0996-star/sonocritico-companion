"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QuickActionsProvider } from "@/components/navigation";
import { ClinicalSearchProvider } from "@/components/search/ClinicalSearchProvider";
import { ClinicalViewerRoute } from "@/components/viewer/ClinicalViewerRoute";

function ViewerShellInner({ mediaId }: { mediaId: string }) {
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get("module");
  const autoplay = searchParams.get("autoplay") === "1";
  const fromProtocol = searchParams.get("fromProtocol");
  const fromStep = searchParams.get("fromStep");
  const errorsOpen = searchParams.get("errors") === "1";

  return (
    <QuickActionsProvider
      variant="viewer"
      contextHints={{
        mediaId,
        fromProtocol,
        fromStep,
      }}
    >
      <ClinicalViewerRoute
        mediaId={mediaId}
        moduleParam={moduleParam}
        autoplay={autoplay}
        fromProtocol={fromProtocol}
        fromStep={fromStep}
        errorsOpen={errorsOpen}
      />
    </QuickActionsProvider>
  );
}

/** Shell visor + acciones rápidas (sin tocar ClinicalViewer). */
export function ViewerQuickActionsShell({ mediaId }: { mediaId: string }) {
  return (
    <ClinicalSearchProvider>
      <Suspense fallback={null}>
        <ViewerShellInner mediaId={mediaId} />
      </Suspense>
    </ClinicalSearchProvider>
  );
}
