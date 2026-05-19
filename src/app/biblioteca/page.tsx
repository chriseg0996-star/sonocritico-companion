"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { AtlasPage } from "@/components/atlas/AtlasPage";
import { buildViewerPath } from "@/lib/viewer/viewer-session";

function BibliotecaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mediaId = searchParams.get("media");

  useEffect(() => {
    if (!mediaId) return;
    const module = searchParams.get("module") ?? undefined;
    const scroll = searchParams.get("scroll");
    const scrollY = scroll ? Number.parseInt(scroll, 10) : undefined;
    const fromProtocol = searchParams.get("fromProtocol") ?? undefined;
    const fromStep = searchParams.get("fromStep") ?? undefined;
    router.replace(
      buildViewerPath(mediaId, {
        module,
        scroll: Number.isFinite(scrollY) ? scrollY : undefined,
        fromProtocol,
        fromStep,
      }),
    );
  }, [mediaId, router, searchParams]);

  if (mediaId) return null;

  return <AtlasPage />;
}

export default function BibliotecaPage() {
  const { user, loading } = useAuth("student");

  if (loading || !user) return <LoadingScreen />;

  return (
    <AppLayout user={user}>
      <PageShell>
        <Suspense fallback={null}>
          <BibliotecaContent />
        </Suspense>
      </PageShell>
    </AppLayout>
  );
}
