"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { GuardiaWorkflowPanel } from "@/components/guardia";

function GuardiaContent() {
  const searchParams = useSearchParams();
  const escenario = searchParams.get("escenario");

  return <GuardiaWorkflowPanel initialComplaintId={escenario} />;
}

export default function GuardiaPage() {
  const { user, loading } = useAuth("student");

  if (loading || !user) return <LoadingScreen />;

  return (
    <AppLayout user={user}>
      <PageShell narrow>
        <Suspense fallback={null}>
          <GuardiaContent />
        </Suspense>
      </PageShell>
    </AppLayout>
  );
}
