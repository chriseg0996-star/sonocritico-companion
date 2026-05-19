"use client";

import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProtocolList } from "@/components/protocols";
import { getInteractiveProtocols } from "@/lib/protocols";

export default function ProtocolosPage() {
  const { user, loading } = useAuth("student");
  const protocols = getInteractiveProtocols();

  if (loading || !user) return <LoadingScreen />;

  return (
    <AppLayout user={user}>
      <PageShell narrow>
        <PageHeader
          eyebrow="Consulta"
          title="Protocolos clínicos"
          subtitle="Navegación paso a paso — decisiones, acciones y enlaces al atlas."
        />
        <ProtocolList protocols={protocols} />
      </PageShell>
    </AppLayout>
  );
}
