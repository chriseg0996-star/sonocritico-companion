"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Btn } from "@/components/ui/base";
import { getProgress, type LocalProgress } from "@/lib/auth";
import { LearningScorePanel } from "@/components/learning/LearningScorePanel";
import { computeLearningScore, touchLearningActivity } from "@/lib/learning";
import type { LearningScoreSnapshot } from "@/lib/learning";
import { KnowledgeHex, KnowledgeHexPanel } from "@/components/progress";
import {
  computeKnowledgeHex,
  getKnowledgeRecommendations,
  loadSelectedDomain,
  saveSelectedDomain,
  type KnowledgeDomainId,
} from "@/lib/progreso";
import styles from "@/components/progress/knowledge-hex.module.css";

export default function ProgresoPage() {
  const router = useRouter();
  const { user, loading } = useAuth("student");
  const [progress, setProgress] = useState<LocalProgress | null>(null);
  const [learningScore, setLearningScore] = useState<LearningScoreSnapshot | null>(null);
  const [selectedId, setSelectedId] = useState<KnowledgeDomainId | null>(null);

  useEffect(() => {
    touchLearningActivity();
    setProgress(getProgress());
    setLearningScore(computeLearningScore());
    setSelectedId(loadSelectedDomain());
  }, []);

  const hex = useMemo(() => (progress ? computeKnowledgeHex(progress) : null), [progress]);

  const selectedDomain = useMemo(() => {
    if (!hex) return null;
    const id = selectedId ?? hex.primary.id;
    return hex.domains.find((d) => d.id === id) ?? hex.primary;
  }, [hex, selectedId]);

  const recommendations = useMemo(() => {
    if (!progress || !selectedDomain) return [];
    return getKnowledgeRecommendations(selectedDomain, progress);
  }, [progress, selectedDomain]);

  const handleSelect = useCallback((id: KnowledgeDomainId) => {
    setSelectedId(id);
    saveSelectedDomain(id);
  }, []);

  if (loading || !user || !progress || !learningScore || !hex || !selectedDomain) {
    return <LoadingScreen />;
  }

  return (
    <AppLayout user={user}>
      <PageShell>
        <PageHeader
          title="Mi progreso"
          subtitle="Mapa radial de conocimiento por dominio"
        />

        <LearningScorePanel snapshot={learningScore} />

        <div className={styles.layout}>
          <div className={styles.layoutHex}>
            <KnowledgeHex
              globalPercent={hex.globalPercent}
              domains={hex.domains}
              selectedId={selectedDomain.id}
              onSelect={handleSelect}
            />
          </div>
          <div className={styles.layoutPanel}>
            <KnowledgeHexPanel domain={selectedDomain} recommendations={recommendations} />
          </div>
        </div>

        <Btn
          variant="ghost"
          onClick={() => router.push("/modulos")}
          style={{ marginTop: 16, width: "100%" }}
        >
          Ver todos los módulos
        </Btn>
      </PageShell>
    </AppLayout>
  );
}
