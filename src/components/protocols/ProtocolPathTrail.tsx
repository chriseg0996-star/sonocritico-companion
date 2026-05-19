"use client";

import type { ProtocolTrailEntry } from "@/lib/protocols/types";
import styles from "@/components/protocols/protocol.module.css";

type Props = {
  entries: ProtocolTrailEntry[];
  currentTitle: string;
};

/** Ruta recorrida en el protocolo (workstation). */
export function ProtocolPathTrail({ entries, currentTitle }: Props) {
  if (entries.length === 0) return null;

  return (
    <nav className={styles.pathTrail} aria-label="Ruta recorrida">
      <p className={styles.pathTrailTitle}>Ruta recorrida</p>
      <ol className={styles.pathTrailList}>
        {entries.map((entry) => (
          <li key={`${entry.stepId}-${entry.decisionLabel ?? ""}`} className={styles.pathTrailItem}>
            <strong>{entry.stepTitle}</strong>
            {entry.decisionLabel ? ` → ${entry.decisionLabel}` : null}
          </li>
        ))}
        <li className={styles.pathTrailItem}>
          <strong>{currentTitle}</strong>
          <span aria-hidden> (actual)</span>
        </li>
      </ol>
    </nav>
  );
}
