"use client";

import { TrendingUp } from "lucide-react";
import type { LearningScoreSnapshot } from "@/lib/learning";
import styles from "@/components/progress/knowledge-bloom.module.css";

type Props = {
  stageLabel: string;
  learning: LearningScoreSnapshot;
};

export function ProgressStatsRow({ stageLabel, learning }: Props) {
  return (
    <div className={styles.statsRow} aria-label="Resumen de nivel">
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Nivel actual</span>
        <span className={styles.statValue}>{stageLabel}</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>XP total</span>
        <span className={styles.statValue}>
          {learning.xp.toLocaleString("es")}
          <TrendingUp size={14} strokeWidth={1.5} className={styles.statIcon} aria-hidden />
        </span>
      </div>
    </div>
  );
}
