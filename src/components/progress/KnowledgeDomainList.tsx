"use client";

import type { DomainStats, KnowledgeDomainId } from "@/lib/progreso";
import styles from "@/components/progress/knowledge-bloom.module.css";

type Props = {
  domains: DomainStats[];
  activeId: KnowledgeDomainId | null;
  onSelect: (id: KnowledgeDomainId) => void;
};

export function KnowledgeDomainList({ domains, activeId, onSelect }: Props) {
  return (
    <ul className={styles.domainList} aria-label="Dominios clínicos">
      {domains.map((d) => {
        const isActive = activeId === d.id;
        return (
          <li key={d.id}>
            <button
              type="button"
              className={`${styles.domainRow} ${isActive ? styles.domainRowActive : ""}`}
              onClick={() => onSelect(d.id)}
            >
              <span className={styles.domainName}>
                <span className={styles.domainDot} style={{ background: d.color }} aria-hidden />
                {d.label}
              </span>
              <span className={styles.domainPct}>{d.percent}%</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
