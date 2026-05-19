"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MediaItem } from "@/lib/media/types";
import { getMediaProtocolLink } from "@/lib/protocols/media-links";
import {
  buildProtocolStepUrl,
  type ProtocolReturnContext,
} from "@/lib/protocols/protocol-navigation";
import { useProtocolContextOptional } from "@/components/protocols/ProtocolContext";
import styles from "@/components/atlas/atlas-protocol-panel.module.css";

type Props = {
  item: MediaItem;
  fromProtocol?: string | null;
  fromStep?: string | null;
};

/** Panel protocolo ↔ atlas en visor (workstation). */
export function AtlasProtocolPanel({ item, fromProtocol, fromStep }: Props) {
  const router = useRouter();
  const protocolCtx = useProtocolContextOptional();
  const link = getMediaProtocolLink(item.id);
  const [showInterpretation, setShowInterpretation] = useState(false);

  const scrollToExample = useCallback(() => {
    document.querySelector("[data-clinical-viewport]")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const returnCtx: ProtocolReturnContext | null =
    fromProtocol && fromStep
      ? { protocolSlug: fromProtocol, stepId: fromStep, mediaId: item.id }
      : protocolCtx?.returnToProtocol ?? null;

  const protocolHref = link
    ? buildProtocolStepUrl(link.protocolSlug, link.stepId, { mediaId: item.id })
    : null;

  const handleOpenProtocol = useCallback(() => {
    if (!link || !protocolHref) return;
    protocolCtx?.saveLastVisit(link.protocolSlug, link.stepId, item.id);
    protocolCtx?.clearReturn();
    router.push(protocolHref);
  }, [link, protocolHref, protocolCtx, item.id, router]);

  if (!link && !returnCtx) return null;

  return (
    <aside className={styles.panel} aria-label="Protocolo relacionado">
      <p className={styles.panelTitle}>Protocolo · Atlas</p>
      <div className={styles.actions}>
        <button type="button" className={styles.btn} onClick={scrollToExample}>
          Ver ejemplo
        </button>
        {protocolHref && link && (
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleOpenProtocol}>
            Ver protocolo — {link.protocolTitle}
          </button>
        )}
        {link?.interpretation && (
          <button
            type="button"
            className={styles.btn}
            onClick={() => setShowInterpretation((v) => !v)}
            aria-expanded={showInterpretation}
          >
            Ver interpretación
          </button>
        )}
        {returnCtx && (
          <Link
            href={buildProtocolStepUrl(returnCtx.protocolSlug, returnCtx.stepId)}
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => protocolCtx?.clearReturn()}
          >
            Volver al protocolo
          </Link>
        )}
      </div>
      {link?.interpretation && (
        <p className={styles.interpretation} hidden={!showInterpretation} role="note">
          {link.interpretation}
        </p>
      )}
      {link && (
        <p className={styles.returnHint}>
          Paso: {link.stepTitle} · {item.title}
        </p>
      )}
    </aside>
  );
}
