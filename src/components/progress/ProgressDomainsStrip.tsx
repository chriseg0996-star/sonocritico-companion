"use client";

import type { DomainStats, KnowledgeDomainId } from "@/lib/progreso";
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
      className={`${styles.domainsCard} ${className ?? ""}`}
      aria-labelledby="progress-domains-title"
    >
      <h2 className={styles.domainsTitle} id="progress-domains-title">
        Dominios
      </h2>
      <div className={styles.domainsGrid}>
        {domains.map((d) => (
          <button
            key={d.id}
            type="button"
            className={styles.domainRow}
            onClick={() => onSelect(d.id)}
            aria-pressed={activeId === d.id}
          >
            <span className={styles.domainName}>
              <span className={styles.domainSwatch} style={{ background: d.color }} aria-hidden />
              {d.label}
            </span>
            <span className={styles.domainPct}>{d.percent}%</span>
            <span className={styles.domainBarTrack}>
              <span
                className={styles.domainBarFill}
                style={{ width: `${d.percent}%`, background: d.color }}
              />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
