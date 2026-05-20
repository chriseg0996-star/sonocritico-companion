"use client";

import { useRouter } from "next/navigation";
import type { DomainStats, KnowledgeRecommendation } from "@/lib/progreso";
import type { RecentActivityItem } from "@/lib/progreso/page-helpers";
import styles from "@/components/progress/progress-page.module.css";

const KIND_LABEL: Record<KnowledgeRecommendation["kind"], string> = {
  case: "Caso",
  clip: "Clip",
  protocol: "Protocolo",
};

type Props = {
  domain: DomainStats;
  nextObjective: string;
  recommendations: KnowledgeRecommendation[];
  recentActivity: RecentActivityItem[];
  onContinue: () => void;
};

export function ProgressSideColumn({
  domain,
  nextObjective,
  recommendations,
  recentActivity,
  onContinue,
}: Props) {
  const router = useRouter();

  return (
    <>
      <section className={`${styles.card} ${styles.orderDominant}`} aria-labelledby="card-dominant">
        <p className={styles.cardEyebrow} id="card-dominant">
          Dominio dominante
        </p>
        <p className={styles.cardTitle} style={{ color: domain.color }}>
          {domain.label}
        </p>
        <p className={styles.cardPct}>{domain.percent}%</p>
        <button type="button" className={styles.continuarBtn} onClick={onContinue}>
          Continuar
        </button>
      </section>

      <section className={`${styles.card} ${styles.orderObjective}`} aria-labelledby="card-objective">
        <p className={styles.cardEyebrow} id="card-objective">
          Próximo objetivo
        </p>
        <p className={styles.cardBody}>{nextObjective}</p>
      </section>

      <section className={`${styles.card} ${styles.orderReco}`} aria-labelledby="card-reco">
        <p className={styles.cardEyebrow} id="card-reco">
          Recomendado para ti
        </p>
        <ul className={styles.recoList}>
          {recommendations.map((rec) => (
            <li key={`${rec.kind}-${rec.href}`}>
              <button
                type="button"
                className={styles.recoRow}
                onClick={() => router.push(rec.href)}
              >
                <span className={styles.recoKind}>{KIND_LABEL[rec.kind]}</span>
                <span>{rec.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.card} ${styles.orderActivity}`} aria-labelledby="card-activity">
        <p className={styles.cardEyebrow} id="card-activity">
          Actividad reciente
        </p>
        <ul className={styles.activityList}>
          {recentActivity.length === 0 ? (
            <li className={styles.activityItem}>
              <span className={styles.activityLabel}>Sin actividad reciente</span>
            </li>
          ) : (
            recentActivity.map((item) => (
              <li key={item.id} className={styles.activityItem}>
                <span className={styles.activityLabel}>{item.label}</span>
                <span className={styles.activityMeta}>{item.meta}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  );
}
