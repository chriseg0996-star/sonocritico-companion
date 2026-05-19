"use client";

import type { MediaItem } from "@/lib/media/types";
import { AtlasCard } from "@/components/atlas/AtlasCard";
import styles from "@/components/atlas/atlas-library.module.css";

type Props = {
  items: MediaItem[];
  loading?: boolean;
  emptyMessage?: string;
  onSelect?: (item: MediaItem) => void;
};

/** Grid de media desde manifests (biblioteca). */
export function AtlasGrid({
  items,
  loading = false,
  emptyMessage = "Sin hallazgos para este módulo.",
  onSelect,
}: Props) {
  if (loading) {
    return <p className={styles.empty}>Cargando atlas…</p>;
  }

  if (items.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.grid} role="list">
      {items.map((item) => (
        <div key={item.id} role="listitem">
          <AtlasCard item={item} onOpen={onSelect} />
        </div>
      ))}
    </div>
  );
}
