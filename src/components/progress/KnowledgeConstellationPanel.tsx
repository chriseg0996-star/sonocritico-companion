"use client";

import type { DomainStats, KnowledgeRecommendation } from "@/lib/progreso";
import styles from "@/components/progress/knowledge-constellation.module.css";

type Props = {
  domain: DomainStats;
  nextCase: KnowledgeRecommendation | null;
  onContinue: () => void;
  onNextCase: () => void;
};

export function KnowledgeConstellationPanel({
  domain,
  nextCase,
  onContinue,
  onNextCase,
}: Props) {
  return (
    <aside className={styles.panel} aria-labelledby="constellation-dominant">
      <p className={styles.panelEyebrow} id="constellation-dominant">
        Dominio dominante
      </p>
      <p className={styles.panelDomain} style={{ color: domain.color }}>
        {domain.label}
      </p>

      <button type="button" className={styles.continuarBtn} onClick={onContinue}>
        Continuar
      </button>

      <button
        type="button"
        className={styles.siguienteBtn}
        onClick={onNextCase}
        disabled={!nextCase}
      >
        {nextCase ? `Siguiente caso · ${nextCase.label}` : "Siguiente caso"}
      </button>
    </aside>
  );
}
