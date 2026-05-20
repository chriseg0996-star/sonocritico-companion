"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { getProgress, type LocalProgress } from "@/lib/auth";
import { computeLearningScore, touchLearningActivity } from "@/lib/learning";
import type { LearningScoreSnapshot } from "@/lib/learning";
import {
  KnowledgeConstellation,
  ProgressBottomBand,
  ProgressPageHeader,
  ProgressSideColumn,
} from "@/components/progress";
import {
  computeKnowledgeHex,
  getEvolutionMilestones,
  getKnowledgeRecommendations,
  getObjectiveChecklist,
  getObjectiveProgress,
  getRecentActivity,
  loadSelectedDomain,
  recordEvolutionSnapshot,
  saveSelectedDomain,
  type KnowledgeDomainId,
} from "@/lib/progreso";
import styles from "@/components/progress/progress-page.module.css";

export default function ProgresoPage() {
  const router = useRouter();
  const { user, loading } = useAuth("student");
  const [progress, setProgress] = useState<LocalProgress | null>(null);
  const [learning, setLearning] = useState<LearningScoreSnapshot | null>(null);
  const [highlightId, setHighlightId] = useState<KnowledgeDomainId | null>(null);

  useEffect(() => {
    touchLearningActivity();
    setProgress(getProgress());
    setLearning(computeLearningScore());
    setHighlightId(loadSelectedDomain());
  }, []);

  const snapshot = useMemo(() => (progress ? computeKnowledgeHex(progress) : null), [progress]);

  const dominant = snapshot?.primary ?? null;

  const recommendations = useMemo(() => {
    if (!progress || !dominant) return [];
    return getKnowledgeRecommendations(dominant, progress);
  }, [progress, dominant]);

  const checklist = useMemo(() => {
    if (!dominant) return { case: false, clip: false, protocol: false };
    return getObjectiveChecklist(dominant);
  }, [dominant]);

  const objectiveProgress = useMemo(() => getObjectiveProgress(checklist), [checklist]);

  const recentActivity = useMemo(() => {
    if (!progress) return [];
    return getRecentActivity(progress);
  }, [progress]);

  const evolutionMilestones = useMemo(() => {
    if (!snapshot) return [];
    return getEvolutionMilestones(snapshot.globalPercent);
  }, [snapshot]);

  useEffect(() => {
    if (snapshot) recordEvolutionSnapshot(snapshot.globalPercent);
  }, [snapshot]);

  const continueHref = recommendations[0]?.href ?? "/modulos";

  const handleSelect = useCallback((id: KnowledgeDomainId) => {
    setHighlightId(id);
    saveSelectedDomain(id);
  }, []);

  const handleContinue = useCallback(() => {
    router.push(continueHref);
  }, [router, continueHref]);

  if (loading || !user || !progress || !snapshot || !dominant || !learning) {
    return <LoadingScreen />;
  }

  return (
    <AppLayout user={user}>
      <PageShell className={styles.page}>
        <div className={styles.grid}>
          <ProgressPageHeader learning={learning} className={`${styles.headerSpan} ${styles.orderHeader}`} />

          <div className={`${styles.colLeft} ${styles.orderConstellationCol}`}>
            <div className={styles.constellationWrap}>
              <div className={styles.constellationScaled}>
                <KnowledgeConstellation
                  globalPercent={snapshot.globalPercent}
                  domains={snapshot.domains}
                  activeId={highlightId}
                  onDomainSelect={handleSelect}
                />
              </div>
            </div>
          </div>

          <div className={styles.colRight}>
            <ProgressSideColumn
              domain={dominant}
              checklist={checklist}
              objectiveProgress={objectiveProgress}
              recommendations={recommendations}
              recentActivity={recentActivity}
              onContinue={handleContinue}
            />
          </div>

          <ProgressBottomBand
            domains={snapshot.domains}
            activeId={highlightId}
            evolutionMilestones={evolutionMilestones}
            onSelectDomain={handleSelect}
            className={styles.bottomSpan}
          />
        </div>
      </PageShell>
    </AppLayout>
  );
}
