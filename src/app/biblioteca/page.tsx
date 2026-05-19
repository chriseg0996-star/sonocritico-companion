"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { AtlasPage } from "@/components/atlas/AtlasPage";

function BibliotecaContent() {
  const searchParams = useSearchParams();
  const mediaId = searchParams.get("media");

  return <AtlasPage initialMediaId={mediaId} />;
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
