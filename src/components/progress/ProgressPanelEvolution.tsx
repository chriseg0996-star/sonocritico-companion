"use client";

import type { EvolutionMilestone } from "@/lib/progreso";
import styles from "@/components/progress/progress-page.module.css";

type Props = {
  milestones: EvolutionMilestone[];
  className?: string;
};

export function ProgressPanelEvolution({ milestones, className }: Props) {
  return (
    <section
      className={`${styles.panelCard} ${styles.orderEvolution} ${className ?? ""}`}
      aria-labelledby="panel-evolution-title"
    >
      <h2 className={styles.panelEyebrow} id="panel-evolution-title">
        Evolución
      </h2>
      <ol className={styles.evolutionTrack}>
        {milestones.map((m, i) => (
          <li key={m.id} className={styles.evolutionStep}>
            <span
              className={styles.evolutionDot}
              data-state={m.state}
              aria-hidden
            />
            <span className={styles.evolutionLabel} data-state={m.state}>
              {m.label}
            </span>
            {i < milestones.length - 1 ? (
              <span className={styles.evolutionConnector} aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
