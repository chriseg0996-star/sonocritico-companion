"use client";

import styles from "@/components/progress/progress-page.module.css";

type Props = {
  objective: string;
  onStart: () => void;
  className?: string;
};

export function ProgressPanelObjective({ objective, onStart, className }: Props) {
  return (
    <section
      className={`${styles.panelCard} ${styles.orderObjective} ${className ?? ""}`}
      aria-labelledby="panel-objective-title"
    >
      <h2 className={styles.panelEyebrow} id="panel-objective-title">
        Próximo objetivo
      </h2>
      <p className={styles.panelBody}>{objective}</p>
      <button type="button" className={styles.panelCtaSecondary} onClick={onStart}>
        Iniciar objetivo
      </button>
    </section>
  );
}
