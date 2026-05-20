"use client";

import { useMemo } from "react";
import { getGrowthStageLabel, type DomainStats } from "@/lib/progreso";
import { DOMAIN_ICONS } from "@/components/progress/domain-icons";
import styles from "@/components/progress/knowledge-bloom.module.css";

type Props = {
  domain: DomainStats;
};

const RING_R = 38;
const CIRC = 2 * Math.PI * RING_R;

export function KnowledgeMasteryCard({ domain }: Props) {
  const Icon = DOMAIN_ICONS[domain.id];
  const offset = useMemo(() => CIRC - (domain.percent / 100) * CIRC, [domain.percent]);
  const stage = getGrowthStageLabel(domain.percent);

  return (
    <section className={styles.glassCard} aria-labelledby="mastery-title">
      <p className={styles.cardEyebrow} id="mastery-title">
        Dominio principal
      </p>

      <div className={styles.masteryRow}>
        <div className={styles.ringWrap} style={{ "--ring-color": domain.color } as React.CSSProperties}>
          <svg className={styles.ringSvg} viewBox="0 0 96 96" aria-hidden>
            <circle className={styles.ringTrack} cx="48" cy="48" r={RING_R} />
            <circle
              className={styles.ringProgress}
              cx="48"
              cy="48"
              r={RING_R}
              stroke={domain.color}
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
            />
          </svg>
          <div className={styles.ringInner}>
            <Icon size={18} strokeWidth={1.5} style={{ color: domain.color }} aria-hidden />
            <span className={styles.ringPct}>{domain.percent}%</span>
          </div>
        </div>

        <div className={styles.masteryMeta}>
          <p className={styles.masteryDomain} style={{ color: domain.color }}>
            {domain.label}
          </p>
          <p className={styles.masteryStage}>{stage}</p>
          <ul className={styles.masteryStats}>
            <li>
              Casos completados:{" "}
              <strong>
                {domain.cases}/{domain.casesTotal}
              </strong>
            </li>
            <li>
              Clips:{" "}
              <strong>
                {domain.clips}/{domain.clipsTotal}
              </strong>
            </li>
            <li>
              Protocolos:{" "}
              <strong>
                {domain.protocols}/{domain.protocolsTotal}
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
