"use client";

import type { MediaItem } from "@/lib/media/types";
import { getClinicalTeachingSections } from "@/lib/media/clinical-meta";
import { MEDIA_MODULE_LABELS } from "@/lib/media/atlas-filters";
import { AtlasProtocolPanel } from "@/components/atlas/AtlasProtocolPanel";
import { ViewerClinicalTeaching } from "@/components/viewer/ViewerClinicalTeaching";
import styles from "@/components/viewer/clinical-viewer.module.css";

type Props = {
  item: MediaItem;
  fromProtocol?: string | null;
  fromStep?: string | null;
};

/** Panel inferior: identificación + capa educativa clínica. */
export function ViewerMetadata({ item, fromProtocol, fromStep }: Props) {
  const moduleLabel = MEDIA_MODULE_LABELS[item.module as keyof typeof MEDIA_MODULE_LABELS] ?? item.module;
  const finding = item.metadata?.finding ?? item.category.replace(/-/g, " ");
  const probe = item.metadata?.probe;
  const plane = item.metadata?.plane;
  const teachingSections = getClinicalTeachingSections(item.metadata);

  return (
    <footer className={styles.metaPanel}>
      <AtlasProtocolPanel item={item} fromProtocol={fromProtocol} fromStep={fromStep} />
      <div className={styles.metaHeader}>
        <span className={styles.metaModule}>{moduleLabel}</span>
        <h2 className={styles.metaTitle}>{item.title}</h2>
        <p className={styles.metaFinding}>{finding}</p>
        {(probe || plane) && (
          <dl className={styles.metaGrid}>
            {probe && (
              <div className={styles.metaItem}>
                <strong>Sonda</strong>
                {probe}
              </div>
            )}
            {plane && (
              <div className={styles.metaItem}>
                <strong>Plano</strong>
                {plane}
              </div>
            )}
          </dl>
        )}
      </div>
      <ViewerClinicalTeaching sections={teachingSections} />
    </footer>
  );
}
