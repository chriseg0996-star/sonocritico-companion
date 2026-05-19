"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark, BookOpen, GitCompare, LayoutGrid } from "lucide-react";
import type { MediaItem } from "@/lib/media/types";
import { getMediaProtocolLink } from "@/lib/protocols/media-links";
import { buildProtocolStepUrl } from "@/lib/protocols/protocol-navigation";
import { findComparisonForMediaId, buildComparePath, saveCompareSession } from "@/lib/compare";
import { hasErrorsForMediaId } from "@/lib/training";
import { isFindingSaved, toggleSavedFinding } from "@/lib/viewer/viewer-session";
import { useViewerShell } from "@/components/viewer/ViewerShellContext";
import errorStyles from "@/components/viewer/viewer-errors.module.css";
import styles from "@/components/viewer/clinical-viewer.module.css";

type Props = {
  item: MediaItem;
};

/** Acciones rápidas — solo iconos (arriba derecha). */
export function ViewerQuickActions({ item }: Props) {
  const router = useRouter();
  const shell = useViewerShell();
  const [saved, setSaved] = useState(() => isFindingSaved(item.id));
  const protocol = getMediaProtocolLink(item.id);
  const comparison = findComparisonForMediaId(item.id);
  const hasErrors = hasErrorsForMediaId(item.id);

  const handleSave = useCallback(() => {
    setSaved(toggleSavedFinding(item.id));
  }, [item.id]);

  const handleCompare = useCallback(() => {
    if (!comparison) return;
    saveCompareSession({
      lastPairId: comparison.id,
      lastProtocolSlug: comparison.protocolSlug,
      lastReferenceMediaId: comparison.referenceMediaId,
      lastCompareMediaId: comparison.compareMediaId,
    });
    router.push(buildComparePath(comparison.id, { fromMedia: item.id }));
  }, [comparison, router, item.id]);

  return (
    <div className={styles.quickActions} role="toolbar" aria-label="Acciones rápidas">
      {hasErrors && shell?.openErrors && (
        <button type="button" className={errorStyles.errorsCta} onClick={shell.openErrors}>
          Ver errores
        </button>
      )}
      {comparison && (
        <button
          type="button"
          className={styles.quickBtn}
          aria-label="Comparar"
          title="Comparar"
          onClick={handleCompare}
        >
          <GitCompare size={18} strokeWidth={1.5} />
        </button>
      )}
      {protocol && (
        <Link
          href={buildProtocolStepUrl(protocol.protocolSlug, protocol.stepId, { mediaId: item.id })}
          className={styles.quickBtn}
          aria-label="Ver protocolo"
          title="Ver protocolo"
        >
          <BookOpen size={18} strokeWidth={1.5} />
        </Link>
      )}
      <button
        type="button"
        className={styles.quickBtn}
        aria-label="Ver atlas"
        title="Ver atlas"
        onClick={() => router.push(`/biblioteca?module=${encodeURIComponent(item.module)}`)}
      >
        <LayoutGrid size={18} strokeWidth={1.5} />
      </button>
      <button
        type="button"
        className={`${styles.quickBtn}${saved ? ` ${styles.quickBtnActive}` : ""}`}
        aria-label={saved ? "Quitar de guardados" : "Guardar"}
        aria-pressed={saved}
        title="Guardar"
        onClick={handleSave}
      >
        <Bookmark size={18} strokeWidth={1.5} fill={saved ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
