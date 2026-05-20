"use client";

import { useRouter } from "next/navigation";
import type { DomainStats, KnowledgeRecommendation } from "@/lib/progreso";
import styles from "@/components/progress/knowledge-bloom.module.css";

const KIND_LABEL: Record<KnowledgeRecommendation["kind"], string> = {
  case: "Caso",
  clip: "Clip",
  protocol: "Protocolo",
};

type Props = {
  domain: DomainStats;
  recommendations: KnowledgeRecommendation[];
  onContinue: () => void;
};

export function KnowledgeBloomPanel({ domain, recommendations, onContinue }: Props) {
  const router = useRouter();

  return (
    <aside className={styles.panel} aria-labelledby="bloom-panel-dominant">
      <p className={styles.panelEyebrow} id="bloom-panel-dominant">
        Dominio dominante
      </p>
      <p className={styles.panelDomain} style={{ color: domain.color }}>
        {domain.label}
      </p>

      <button type="button" className={styles.continuarBtn} onClick={onContinue}>
        Continuar
      </button>

      <div className={styles.recoBlock}>
        <p className={styles.recoTitle}>Recomendado</p>
        <ul className={styles.recoList}>
          {recommendations.map((rec) => (
            <li key={`${rec.kind}-${rec.href}`}>
              <button
                type="button"
                className={styles.recoItem}
                onClick={() => router.push(rec.href)}
              >
                <span className={styles.recoKind}>{KIND_LABEL[rec.kind]}</span>
                <span>{rec.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
