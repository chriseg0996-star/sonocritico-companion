"use client";

import type { DomainStats } from "@/lib/progreso";
import styles from "@/components/progress/knowledge-bloom.module.css";

type Props = {
  domain: DomainStats;
  onContinue: () => void;
};

export function KnowledgeDominantBlock({ domain, onContinue }: Props) {
  return (
    <section className={styles.dominant} aria-labelledby="dominant-domain-title">
      <p className={styles.dominantEyebrow}>Dominio dominante</p>
      <h2 id="dominant-domain-title" className={styles.dominantTitle} style={{ color: domain.color }}>
        {domain.label}
      </h2>
      <div className={styles.dominantStats}>
        <p className={styles.dominantStat}>{domain.clips} clips</p>
        <p className={styles.dominantStat}>{domain.protocols} protocolos</p>
        <p className={styles.dominantStat}>{domain.cases} casos</p>
      </div>
      <button type="button" className={styles.continuarBtn} onClick={onContinue}>
        Continuar
      </button>
    </section>
  );
}
