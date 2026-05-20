"use client";

import type { DomainStats, KnowledgeDomainId } from "@/lib/progreso";
import { DOMAIN_ICONS } from "@/components/progress/domain-icons";
import styles from "@/components/progress/progress-page.module.css";

type Props = {
  domains: DomainStats[];
  activeId: KnowledgeDomainId | null;
  onSelect: (id: KnowledgeDomainId) => void;
  className?: string;
};

export function ProgressDomainsStrip({ domains, activeId, onSelect, className }: Props) {
  return (
    <section
      className={`${styles.panelCard} ${styles.domainsPanel} ${className ?? ""}`}
      aria-labelledby="progress-domains-title"
    >
      <h2 className={styles.panelEyebrow} id="progress-domains-title">
        Dominios
      </h2>
      <div className={styles.domainsGrid}>
        {domains.map((d) => {
          const Icon = DOMAIN_ICONS[d.id];
          return (
            <button
              key={d.id}
              type="button"
              className={styles.domainCell}
              onClick={() => onSelect(d.id)}
              aria-pressed={activeId === d.id}
            >
              <span className={styles.domainCellHead}>
                <span className={styles.domainCellIcon} style={{ color: d.color }}>
                  <Icon size={14} strokeWidth={1.5} aria-hidden />
                </span>
                <span className={styles.domainCellName}>{d.label}</span>
                <span className={styles.domainCellPct}>{d.percent}%</span>
              </span>
              <span className={styles.domainMicroTrack}>
                <span
                  className={styles.domainMicroFill}
                  style={{ width: `${d.percent}%`, background: d.color }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
