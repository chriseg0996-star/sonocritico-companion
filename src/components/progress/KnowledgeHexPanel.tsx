"use client";

import { useRouter } from "next/navigation";
import type { DomainStats, KnowledgeRecommendation } from "@/lib/progreso";
import styles from "@/components/progress/knowledge-hex.module.css";

type Props = {
  domain: DomainStats;
  recommendations: KnowledgeRecommendation[];
};

const KIND_LABEL: Record<KnowledgeRecommendation["kind"], string> = {
  case: "Caso",
  clip: "Clip",
  protocol: "Protocolo",
};

export function KnowledgeHexPanel({ domain, recommendations }: Props) {
  const router = useRouter();

  return (
    <aside className={styles.panel} aria-labelledby="knowledge-hex-primary">
      <p className={styles.panelEyebrow} id="knowledge-hex-primary">
        Dominio principal
      </p>
      <p className={styles.panelDomain} style={{ color: domain.color }}>
        {domain.percent}%
        <span style={{ display: "block", fontSize: 22, marginTop: 4, color: "#f5f7fa" }}>
          {domain.label}
        </span>
      </p>

      <div className={styles.panelStats}>
        <div className={styles.panelStatRow}>
          <span>Casos</span>
          <span className={styles.panelStatValue}>{domain.cases}</span>
        </div>
        <div className={styles.panelStatRow}>
          <span>Clips</span>
          <span className={styles.panelStatValue}>{domain.clips}</span>
        </div>
        <div className={styles.panelStatRow}>
          <span>Protocolos</span>
          <span className={styles.panelStatValue}>{domain.protocols}</span>
        </div>
      </div>

      <section className={styles.recoSection} aria-label="Recomendado para ti">
        <h3 className={styles.recoTitle}>Recomendado para ti</h3>
        <ul className={styles.recoList}>
          {recommendations.map((rec) => (
            <li key={`${rec.kind}-${rec.href}`}>
              <button
                type="button"
                className={styles.recoBtn}
                onClick={() => router.push(rec.href)}
              >
                <span className={styles.recoKind}>{KIND_LABEL[rec.kind]}</span>
                <span>{rec.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
