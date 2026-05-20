"use client";

import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { ViewerQuickActionsShell } from "@/app/viewer/[mediaId]/ViewerQuickActionsShell";

type Props = {
  mediaId: string;
};

/** Ruta dedicada del visor — fullscreen sin AppLayout. */
export function ViewerPageClient({ mediaId }: Props) {
  const { user, loading } = useAuth("student");

  if (loading || !user) return <LoadingScreen />;

  return <ViewerQuickActionsShell mediaId={mediaId} />;
}
