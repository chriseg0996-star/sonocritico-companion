"use client";

import { useCallback, useEffect, useState } from "react";
import { AtlasFilters } from "@/components/atlas/AtlasFilters";
import { AtlasGrid } from "@/components/atlas/AtlasGrid";
import { AtlasHeader } from "@/components/atlas/AtlasHeader";
import { ClinicalViewer } from "@/components/viewer";
import { findMediaItemById } from "@/lib/media/manifests";
import { useMedia } from "@/lib/media/useMedia";
import type { AtlasFilterModule } from "@/lib/media/atlas-filters";
import type { MediaItem, MediaModuleId } from "@/lib/media/types";
import styles from "@/components/atlas/atlas-library.module.css";

function isAtlasFilterModule(m: MediaModuleId): m is AtlasFilterModule {
  return m === "lung" || m === "fast" || m === "cardiac" || m === "vexus";
}

type Props = {
  /** Abre visor desde búsqueda (`/biblioteca?media=id`). */
  initialMediaId?: string | null;
};

/** Vista atlas biblioteca — grid + filtros + visor clínico. */
export function AtlasPage({ initialMediaId = null }: Props) {
  const [module, setModule] = useState<AtlasFilterModule>("lung");
  const { items, loading } = useMedia(module);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!initialMediaId) return;
    const found = findMediaItemById(initialMediaId);
    if (found && isAtlasFilterModule(found.module) && found.module !== module) {
      setModule(found.module);
    }
  }, [initialMediaId, module]);

  useEffect(() => {
    if (!initialMediaId) return;
    const index = items.findIndex((entry) => entry.id === initialMediaId);
    if (index >= 0) setViewerIndex(index);
  }, [initialMediaId, items]);

  const handleSelect = useCallback((item: MediaItem) => {
    const index = items.findIndex((entry) => entry.id === item.id);
    if (index >= 0) setViewerIndex(index);
  }, [items]);

  const handleModuleChange = useCallback((next: AtlasFilterModule) => {
    setModule(next);
    setViewerIndex(null);
  }, []);

  return (
    <section aria-label="Atlas POCUS">
      <AtlasHeader />
      <AtlasFilters active={module} onChange={handleModuleChange} />
      <p className={styles.count}>
        {loading ? "…" : items.length} hallazgo{items.length === 1 ? "" : "s"}
      </p>
      <AtlasGrid items={items} loading={loading} onSelect={handleSelect} />

      {viewerIndex !== null && items.length > 0 && (
        <ClinicalViewer
          items={items}
          index={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onIndexChange={setViewerIndex}
        />
      )}
    </section>
  );
}
