"use client";

import { Flame } from "lucide-react";
import type { LearningScoreSnapshot, SonocriticLevelId } from "@/lib/learning";
import styles from "@/components/learning/learning-score.module.css";

const LEVEL_CLASS: Record<SonocriticLevelId, string> = {
  novato: styles.levelNovato,
  explorador: styles.levelExplorador,
  operador: styles.levelOperador,
  sonocritico: styles.levelSonocritico,
  instructor: styles.levelInstructor,
};

const PILLAR_LABELS: { key: keyof LearningScoreSnapshot["pillars"]; label: string }[] = [
  { key: "hallazgos", label: "Hallazgos" },
  { key: "casos", label: "Casos" },
  { key: "repaso", label: "Repaso" },
  { key: "precision", label: "Precisión" },
];

type Props = {
  snapshot: LearningScoreSnapshot;
};

export function LearningScorePanel({ snapshot }: Props) {
  const levelClass = LEVEL_CLASS[snapshot.level.id];

  return (
    <section className={styles.panel} aria-labelledby="sonocritic-score-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow} id="sonocritic-score-title">
            Sonocritic Score
          </p>
          <p className={styles.total}>{snapshot.total}</p>
        </div>
        <div className={`${styles.levelBadge} ${levelClass}`}>
          <div>{snapshot.level.label}</div>
          <div style={{ fontSize: 9, fontWeight: 400, marginTop: 2, opacity: 0.85 }}>
            {snapshot.xp} XP
          </div>
        </div>
      </div>

      <div className={styles.xpRow}>
        <span>Nivel {snapshot.level.label}</span>
        <span>
          {snapshot.nextLevel
            ? `${snapshot.xpToNext} XP → ${snapshot.nextLevel.label}`
            : "Nivel máximo"}
        </span>
      </div>
      <div
        className={styles.xpBar}
        role="progressbar"
        aria-valuenow={snapshot.levelProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.xpFill} style={{ width: `${snapshot.levelProgress}%` }} />
      </div>

      <p className={styles.streak}>
        <Flame size={12} strokeWidth={1.5} aria-hidden />
        Racha {snapshot.streakDays} {snapshot.streakDays === 1 ? "día" : "días"}
      </p>

      <div className={styles.pillars}>
        {PILLAR_LABELS.map(({ key, label }) => {
          const value = snapshot.pillars[key];
          return (
            <div key={key} className={styles.pillar}>
              <div className={styles.pillarLabel}>
                <span>{label}</span>
                <span className={styles.pillarValue}>{value}%</span>
              </div>
              <div className={styles.pillarBar}>
                <div className={styles.pillarFill} style={{ width: `${value}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
