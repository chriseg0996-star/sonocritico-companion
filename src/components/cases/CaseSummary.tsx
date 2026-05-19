"use client";

import Link from "next/link";
import type { InteractiveClinicalCase } from "@/lib/cases/types";
import { atlasHref, protocolHref, viewerHref } from "@/lib/cases/case-links";
import { caseProtocolLabel } from "@/lib/protocols/case-integration";
import styles from "@/components/cases/cases.module.css";

type Props = {
  caseDef: InteractiveClinicalCase;
  score: number;
  onClose: () => void;
};

export function CaseSummary({ caseDef, score, onClose }: Props) {
  const resources = caseDef.resources;
  const protocol = protocolHref(resources);
  const viewer = viewerHref(resources);
  const atlas = atlasHref(resources);
  const protocolLabel = caseProtocolLabel(resources);

  return (
    <article className={styles.stepCard}>
      <p className={styles.stepEyebrow}>Resultado</p>
      <p className={styles.scoreRing}>{score}%</p>
      <p className={styles.scoreLabel}>Decisiones óptimas en el flujo POCUS</p>

      <h2 className={styles.outcomeTitle}>{caseDef.outcome.title}</h2>
      <p className={styles.stepPrompt}>{caseDef.outcome.explanation}</p>
      <p className={styles.teaching}>{caseDef.outcome.teachingPoint}</p>

      <div className={styles.links}>
        {protocol && (
          <Link href={protocol} className={styles.linkBtn}>
            {protocolLabel ? `Protocolo ${protocolLabel}` : "Protocolo"}
          </Link>
        )}
        {viewer && <Link href={viewer} className={styles.linkBtn}>Abrir visor</Link>}
        {atlas && <Link href={atlas} className={styles.linkBtn}>Abrir atlas</Link>}
      </div>

      <button type="button" className={styles.nextBtn} onClick={onClose}>
        Volver a casos
      </button>
    </article>
  );
}
