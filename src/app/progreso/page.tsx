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
  ProgressDomainsStrip,
  ProgressGrowthLegend,
  ProgressPageHeader,
  ProgressSideColumn,
} from "@/components/progress";
import {
  computeKnowledgeHex,
  getKnowledgeRecommendations,
  getNextObjective,
  getRecentActivity,
  loadSelectedDomain,
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

  const nextObjective = useMemo(() => {
    if (!dominant) return "";
    return getNextObjective(dominant);
  }, [dominant]);

  const recentActivity = useMemo(() => {
    if (!progress) return [];
    return getRecentActivity(progress);
  }, [progress]);

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
          <div className={styles.colLeft}>
            <ProgressPageHeader learning={learning} className={styles.orderHeader} />

            <div className={`${styles.constellationWrap} ${styles.orderConstellation}`}>
              <div className={styles.constellationScaled}>
                <KnowledgeConstellation
                  globalPercent={snapshot.globalPercent}
                  domains={snapshot.domains}
                  activeId={highlightId}
                  onDomainSelect={handleSelect}
                />
              </div>
            </div>

            <ProgressGrowthLegend className={`${styles.legendDesktop} ${styles.orderLegend}`} />
          </div>

          <div className={styles.colRight}>
            <ProgressSideColumn
              domain={dominant}
              nextObjective={nextObjective}
              recommendations={recommendations}
              recentActivity={recentActivity}
              onContinue={handleContinue}
            />
          </div>

          <ProgressDomainsStrip
            domains={snapshot.domains}
            activeId={highlightId}
            onSelect={handleSelect}
            className={`${styles.domainsSection} ${styles.orderDomains}`}
          />
        </div>
      </PageShell>
    </AppLayout>
  );
}
