"use client";

import type { DomainStats, KnowledgeRecommendation } from "@/lib/progreso";
import type { EvolutionMilestone, RecentActivityItem } from "@/lib/progreso";
import { ProgressPanelActivity } from "@/components/progress/ProgressPanelActivity";
import { ProgressPanelEvolution } from "@/components/progress/ProgressPanelEvolution";
import { ProgressPanelObjective } from "@/components/progress/ProgressPanelObjective";
import { ProgressPanelPrimary } from "@/components/progress/ProgressPanelPrimary";
import { ProgressPanelRecommended } from "@/components/progress/ProgressPanelRecommended";
import styles from "@/components/progress/progress-page.module.css";

type Props = {
  domain: DomainStats;
  nextObjective: string;
  recommendations: KnowledgeRecommendation[];
  recentActivity: RecentActivityItem[];
  evolutionMilestones: EvolutionMilestone[];
  onContinue: () => void;
  onStartObjective: () => void;
};

export function ProgressSideColumn({
  domain,
  nextObjective,
  recommendations,
  recentActivity,
  evolutionMilestones,
  onContinue,
  onStartObjective,
}: Props) {
  return (
    <div className={styles.sideStack}>
      <ProgressPanelPrimary domain={domain} onContinue={onContinue} />
      <ProgressPanelRecommended recommendations={recommendations} />
      <ProgressPanelObjective objective={nextObjective} onStart={onStartObjective} />
      <ProgressPanelEvolution milestones={evolutionMilestones} />
      <ProgressPanelActivity items={recentActivity} />
    </div>
  );
}
