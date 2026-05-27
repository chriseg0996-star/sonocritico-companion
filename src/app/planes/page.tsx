"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PricingPage } from "@/features/billing/PricingPage";
import { useAuth } from "@/features/auth/useAuth";
import { toLegacyUser } from "@/features/auth/legacy";
import { LoadingScreen } from "@/hooks/useAuth";

export default function PlanesPage() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated || !user) {
    return (
      <PageShell>
        <PricingPage />
      </PageShell>
    );
  }

  return (
    <AppLayout user={toLegacyUser(user)}>
      <PageShell>
        <PricingPage />
      </PageShell>
    </AppLayout>
  );
}
