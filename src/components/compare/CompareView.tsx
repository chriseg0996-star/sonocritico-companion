"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { findMediaItemById } from "@/lib/media/manifests";
import type { MediaComparisonPair } from "@/lib/compare/types";
import { saveCompareSession } from "@/lib/compare/compare-session";
import { CompareSyncProvider } from "@/components/compare/CompareSyncContext";
import { CompareSyncBar } from "@/components/compare/CompareSyncBar";
import { ComparePane } from "@/components/compare/ComparePane";
import { CompareFooter } from "@/components/compare/CompareFooter";
import styles from "@/components/compare/compare.module.css";

type Props = {
  pair: MediaComparisonPair;
  fromMedia?: string | null;
};

export function CompareView({ pair, fromMedia }: Props) {
  const refItem = findMediaItemById(pair.referenceMediaId);
  const cmpItem = findMediaItemById(pair.compareMediaId);

  useEffect(() => {
    saveCompareSession({
      lastPairId: pair.id,
      lastProtocolSlug: pair.protocolSlug,
      lastReferenceMediaId: pair.referenceMediaId,
      lastCompareMediaId: pair.compareMediaId,
    });
  }, [pair]);

  if (!refItem?.item || !cmpItem?.item) {
    return (
      <div className={styles.shell}>
        <p className={styles.empty}>Comparación no disponible.</p>
        <Link href="/biblioteca?module=lung" className={styles.backLink}>
          Volver a biblioteca
        </Link>
      </div>
    );
  }

  const backHref = fromMedia ? `/viewer/${encodeURIComponent(fromMedia)}` : "/biblioteca?module=lung";

  return (
    <CompareSyncProvider>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href={backHref} className={styles.backBtn} aria-label="Volver">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </Link>
          <h1 className={styles.title}>{pair.title}</h1>
        </header>

        <CompareSyncBar />

        <div className={styles.split}>
          <ComparePane
            item={refItem.item}
            label={pair.referenceLabel}
            role="reference"
            preferClip={pair.referencePreferClip}
            isMaster
          />
          <ComparePane
            item={cmpItem.item}
            label={pair.compareLabel}
            role="compare"
            preferClip={pair.comparePreferClip}
          />
        </div>

        <CompareFooter protocolSlug={pair.protocolSlug} bibliographyHref={pair.bibliographyHref} />
      </div>
    </CompareSyncProvider>
  );
}
