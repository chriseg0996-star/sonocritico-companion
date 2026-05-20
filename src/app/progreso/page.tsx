"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { getProgress, type LocalProgress } from "@/lib/auth";
import {
  KnowledgeBloom,
  KnowledgeDomainList,
  KnowledgeDominantBlock,
} from "@/components/progress";
import {
  computeKnowledgeHex,
  getKnowledgeRecommendations,
  loadSelectedDomain,
  saveSelectedDomain,
  type KnowledgeDomainId,
} from "@/lib/progreso";
import styles from "@/components/progress/knowledge-bloom.module.css";

export default function ProgresoPage() {
  const router = useRouter();
  const { user, loading } = useAuth("student");
  const [progress, setProgress] = useState<LocalProgress | null>(null);
  const [highlightId, setHighlightId] = useState<KnowledgeDomainId | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    setHighlightId(loadSelectedDomain());
  }, []);

  const snapshot = useMemo(() => (progress ? computeKnowledgeHex(progress) : null), [progress]);

  const dominant = snapshot?.primary ?? null;

  const continueHref = useMemo(() => {
    if (!progress || !dominant) return "/modulos";
    const recs = getKnowledgeRecommendations(dominant, progress);
    return recs[0]?.href ?? `/modulos`;
  }, [progress, dominant]);

  const handleSelect = useCallback((id: KnowledgeDomainId) => {
    setHighlightId(id);
    saveSelectedDomain(id);
  }, []);

  const handleContinue = useCallback(() => {
    router.push(continueHref);
  }, [router, continueHref]);

  if (loading || !user || !progress || !snapshot || !dominant) {
    return <LoadingScreen />;
  }

  return (
    <AppLayout user={user}>
      <PageShell>
        <PageHeader title="Mi progreso" subtitle="Mapa de crecimiento clínico" />

        <div className={styles.page}>
          <KnowledgeBloom
            globalPercent={snapshot.globalPercent}
            domains={snapshot.domains}
            activeId={highlightId}
            onDomainSelect={handleSelect}
          />

          <KnowledgeDomainList
            domains={snapshot.domains}
            activeId={highlightId}
            onSelect={handleSelect}
          />

          <KnowledgeDominantBlock domain={dominant} onContinue={handleContinue} />
        </div>
      </PageShell>
    </AppLayout>
  );
}
