"use client";

import Link from "next/link";
import type { CaseOutcome, CaseRouteEntry, InteractiveClinicalCase } from "@/lib/cases/types";
import { atlasHref, protocolHref, viewerHref } from "@/lib/cases/case-links";
import { caseProtocolLabel } from "@/lib/protocols/case-integration";
import styles from "@/components/cases/cases.module.css";

type Props = {
  caseDef: InteractiveClinicalCase;
  outcome: CaseOutcome;
  score: number;
  route?: CaseRouteEntry[];
  onClose: () => void;
};

const PATH_LABELS: Record<CaseOutcome["pathType"], string> = {
  optimal: "Ruta óptima",
  partial: "Ruta parcial",
  incorrect: "Ruta incorrecta",
};

export function CaseSummary({ caseDef, outcome, score, route, onClose }: Props) {
  const resources = outcome.resources ?? caseDef.defaultResources;
  const protocol = protocolHref(resources);
  const viewer = viewerHref(resources);
  const atlas = atlasHref(resources);
  const protocolLabel = caseProtocolLabel(resources);

  const pathClass =
    outcome.pathType === "optimal"
      ? styles.pathOptimal
      : outcome.pathType === "partial"
        ? styles.pathPartial
        : styles.pathIncorrect;

  return (
    <article className={styles.stepCard}>
      <p className={styles.stepEyebrow}>Resultado</p>
      <p className={styles.scoreRing}>{score}%</p>
      <p className={styles.scoreLabel}>Score según decisiones en el flujo POCUS</p>
      <span className={`${styles.pathBadge} ${pathClass}`}>{PATH_LABELS[outcome.pathType]}</span>

      <h2 className={styles.outcomeTitle}>{outcome.title}</h2>
      <p className={styles.stepPrompt}>{outcome.explanation}</p>
      <p className={styles.teaching}>{outcome.teachingPoint}</p>

      {route && route.length > 0 && (
        <p className={styles.routeHint} aria-live="polite">
          Ruta guardada · {route.length} decisiones
        </p>
      )}

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
