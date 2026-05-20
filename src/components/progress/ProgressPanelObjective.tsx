"use client";

import type { ObjectiveChecklist } from "@/lib/progreso";
import styles from "@/components/progress/progress-page.module.css";

type Props = {
  checklist: ObjectiveChecklist;
  progressPct: number;
  className?: string;
};

export function ProgressPanelObjective({ checklist, progressPct, className }: Props) {
  const rows = [
    { key: "case" as const, label: "1 caso" },
    { key: "clip" as const, label: "1 clip" },
    { key: "protocol" as const, label: "1 protocolo" },
  ];

  return (
    <section
      className={`${styles.panelCard} ${styles.orderObjective} ${className ?? ""}`}
      aria-labelledby="panel-objective-title"
    >
      <h2 className={styles.panelEyebrow} id="panel-objective-title">
        Próximo objetivo
      </h2>
      <p className={styles.objectiveLead}>Completa:</p>
      <ul className={styles.checklist}>
        {rows.map(({ key, label }) => (
          <li key={key} className={styles.checklistItem}>
            <span className={styles.checkbox} data-checked={checklist[key] ? "true" : "false"} aria-hidden />
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <div className={styles.objectiveBarTrack}>
        <span className={styles.objectiveBarFill} style={{ width: `${progressPct}%` }} />
      </div>
    </section>
  );
}
