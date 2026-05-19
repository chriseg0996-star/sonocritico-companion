"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { ClinicalViewerRoute } from "@/components/viewer/ClinicalViewerRoute";

function ViewerContent({ mediaId }: { mediaId: string }) {
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get("module");
  const autoplay = searchParams.get("autoplay") === "1";
  const fromProtocol = searchParams.get("fromProtocol");
  const fromStep = searchParams.get("fromStep");
  const errorsOpen = searchParams.get("errors") === "1";

  return (
    <ClinicalViewerRoute
      mediaId={mediaId}
      moduleParam={moduleParam}
      autoplay={autoplay}
      fromProtocol={fromProtocol}
      fromStep={fromStep}
      errorsOpen={errorsOpen}
    />
  );
}

type Props = {
  mediaId: string;
};

/** Ruta dedicada del visor — fullscreen sin AppLayout. */
export function ViewerPageClient({ mediaId }: Props) {
  const { user, loading } = useAuth("student");

  if (loading || !user) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ViewerContent mediaId={mediaId} />
    </Suspense>
  );
}
