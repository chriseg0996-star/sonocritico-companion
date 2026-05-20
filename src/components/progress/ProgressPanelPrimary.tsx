"use client";

import { getGrowthStageLabel } from "@/lib/progreso";
import type { DomainStats } from "@/lib/progreso";
import styles from "@/components/progress/progress-page.module.css";

type Props = {
  domain: DomainStats;
  onContinue: () => void;
  className?: string;
};

export function ProgressPanelPrimary({ domain, onContinue, className }: Props) {
  const stage = getGrowthStageLabel(domain.percent);

  return (
    <section
      className={`${styles.panelCard} ${styles.orderDominant} ${className ?? ""}`}
      aria-labelledby="panel-primary-title"
    >
      <h2 className={styles.panelEyebrow} id="panel-primary-title">
        Dominio principal
      </h2>
      <p className={styles.panelDomainName} style={{ color: domain.color }}>
        {domain.label}
      </p>
      <p className={styles.panelDomainPct}>{domain.percent}%</p>
      <p className={styles.panelStage}>{stage}</p>

      <ul className={styles.panelStats}>
        <li>
          <span>Casos</span>
          <strong>{domain.cases}</strong>
        </li>
        <li>
          <span>Clips</span>
          <strong>{domain.clips}</strong>
        </li>
        <li>
          <span>Protocolos</span>
          <strong>{domain.protocols}</strong>
        </li>
      </ul>

      <button type="button" className={styles.panelCtaPrimary} onClick={onContinue}>
        Continuar
      </button>
    </section>
  );
}
