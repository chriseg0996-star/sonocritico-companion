"use client";

import type { DomainStats, KnowledgeRecommendation } from "@/lib/progreso";
import type { ObjectiveChecklist, RecentActivityItem } from "@/lib/progreso";
import { ProgressPanelActivity } from "@/components/progress/ProgressPanelActivity";
import { ProgressPanelObjective } from "@/components/progress/ProgressPanelObjective";
import { ProgressPanelPrimary } from "@/components/progress/ProgressPanelPrimary";
import { ProgressPanelRecommended } from "@/components/progress/ProgressPanelRecommended";
import styles from "@/components/progress/progress-page.module.css";

type Props = {
  domain: DomainStats;
  checklist: ObjectiveChecklist;
  objectiveProgress: number;
  recommendations: KnowledgeRecommendation[];
  recentActivity: RecentActivityItem[];
  onContinue: () => void;
};

export function ProgressSideColumn({
  domain,
  checklist,
  objectiveProgress,
  recommendations,
  recentActivity,
  onContinue,
}: Props) {
  return (
    <div className={styles.sideStack}>
      <ProgressPanelPrimary domain={domain} onContinue={onContinue} />
      <ProgressPanelRecommended recommendations={recommendations} />
      <ProgressPanelObjective checklist={checklist} progressPct={objectiveProgress} />
      <ProgressPanelActivity items={recentActivity} />
    </div>
  );
}
