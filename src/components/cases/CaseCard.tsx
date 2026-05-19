"use client";

import { ChevronRight } from "lucide-react";
import type { InteractiveClinicalCase } from "@/lib/cases/types";
import { getCaseProgress } from "@/lib/cases/case-storage";
import styles from "@/components/cases/cases.module.css";

type Props = {
  caseDef: InteractiveClinicalCase;
  onOpen: (caseId: string) => void;
};

export function CaseCard({ caseDef, onOpen }: Props) {
  const progress = getCaseProgress(caseDef.id);

  return (
    <button type="button" className={styles.card} onClick={() => onOpen(caseDef.id)}>
      <p className={styles.cardTitle}>{caseDef.title}</p>
      <p className={styles.cardTagline}>{caseDef.tagline}</p>
      <p className={styles.cardTagline} style={{ marginBottom: 10 }}>
        {caseDef.presentation.slice(0, 120)}…
      </p>
      <div className={styles.cardMeta}>
        {progress.completed && (
          <span className={`${styles.badge} ${styles.badgeDone}`}>
            Completado · {progress.score}%
          </span>
        )}
        {progress.started && !progress.completed && (
          <span className={styles.badge}>En curso</span>
        )}
        <span className={styles.badge}>
          {caseDef.difficulty === "intermedio" ? "Intermedio" : "Básico"}
        </span>
        {!progress.started && <span className={styles.badge}>Nuevo</span>}
        <ChevronRight size={16} strokeWidth={1.5} color="#5c6573" aria-hidden />
      </div>
    </button>
  );
}
