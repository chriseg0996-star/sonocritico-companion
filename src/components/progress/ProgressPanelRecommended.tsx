"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { KnowledgeRecommendation } from "@/lib/progreso";
import styles from "@/components/progress/progress-page.module.css";

const KIND_LABEL: Record<KnowledgeRecommendation["kind"], string> = {
  case: "Caso",
  clip: "Clip",
  protocol: "Protocolo",
};

type Props = {
  recommendations: KnowledgeRecommendation[];
  className?: string;
};

export function ProgressPanelRecommended({ recommendations, className }: Props) {
  const router = useRouter();

  return (
    <section
      className={`${styles.panelCard} ${styles.orderReco} ${className ?? ""}`}
      aria-labelledby="panel-reco-title"
    >
      <h2 className={styles.panelEyebrow} id="panel-reco-title">
        Recomendado para ti
      </h2>
      <ul className={styles.recoCards}>
        {recommendations.map((rec) => (
          <li key={`${rec.kind}-${rec.href}`}>
            <button type="button" className={styles.recoCard} onClick={() => router.push(rec.href)}>
              <span className={styles.recoCardType}>{KIND_LABEL[rec.kind]}</span>
              <span className={styles.recoCardTitle}>{rec.label}</span>
              <ChevronRight size={16} className={styles.recoChevron} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
