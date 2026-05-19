"use client";

import { Suspense, use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProtocolRunner } from "@/components/protocols";
import { getInteractiveProtocol } from "@/lib/protocols";
import styles from "@/components/protocols/protocol.module.css";

function ProtocoloRunnerContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const media = searchParams.get("media");
  const protocol = getInteractiveProtocol(slug);

  if (!protocol) {
    return (
      <>
        <p className={styles.empty}>Protocolo no encontrado.</p>
        <Link href="/protocolos" className={styles.textBtn}>
          ← Volver a protocolos
        </Link>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow={protocol.tag} title={protocol.title} subtitle={protocol.subtitle} />
      <ProtocolRunner
        protocol={protocol}
        initialStepId={step}
        returnMediaId={media}
      />
    </>
  );
}

export default function ProtocoloSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { user, loading } = useAuth("student");

  if (loading || !user) return <LoadingScreen />;

  return (
    <AppLayout user={user}>
      <PageShell narrow>
        <Suspense fallback={null}>
          <ProtocoloRunnerContent slug={slug} />
        </Suspense>
      </PageShell>
    </AppLayout>
  );
}
