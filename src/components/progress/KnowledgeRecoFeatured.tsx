"use client";

import { useRouter } from "next/navigation";
import type { KnowledgeRecommendation } from "@/lib/progreso";
import styles from "@/components/progress/knowledge-bloom.module.css";

const KIND_LABEL: Record<KnowledgeRecommendation["kind"], string> = {
  case: "Caso",
  clip: "Clip",
  protocol: "Protocolo",
};

type Props = {
  recommendation: KnowledgeRecommendation | null;
  onContinue: () => void;
};

export function KnowledgeRecoFeatured({ recommendation, onContinue }: Props) {
  const router = useRouter();

  if (!recommendation) return null;

  return (
    <section className={`${styles.glassCard} ${styles.recoCard}`} aria-labelledby="reco-title">
      <p className={styles.cardEyebrow} id="reco-title">
        Recomendado para ti
      </p>
      <p className={styles.recoKind}>{KIND_LABEL[recommendation.kind]}</p>
      <p className={styles.recoHeadline}>{recommendation.label}</p>
      <button type="button" className={styles.comenzarBtn} onClick={() => router.push(recommendation.href)}>
        Comenzar
      </button>
      <button type="button" className={styles.continuarLink} onClick={onContinue}>
        Ver todo el plan de estudio
      </button>
    </section>
  );
}
