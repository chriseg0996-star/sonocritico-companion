"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AtlasFilters } from "@/components/atlas/AtlasFilters";
import { AtlasGrid } from "@/components/atlas/AtlasGrid";
import { AtlasHeader } from "@/components/atlas/AtlasHeader";
import { AtlasViewTabs, type AtlasLibraryView } from "@/components/atlas/AtlasViewTabs";
import { AtlasErrorsPanel } from "@/components/atlas/AtlasErrorsPanel";
import { useMedia } from "@/lib/media/useMedia";
import type { AtlasFilterModule } from "@/lib/media/atlas-filters";
import type { MediaItem } from "@/lib/media/types";
import { useOpenViewer } from "@/lib/viewer/use-open-viewer";
import styles from "@/components/atlas/atlas-library.module.css";

function isAtlasFilterModule(m: string): m is AtlasFilterModule {
  return m === "lung" || m === "fast" || m === "cardiac" || m === "vexus";
}

function parseView(v: string | null): AtlasLibraryView {
  return v === "errors" ? "errors" : "findings";
}

/** Vista atlas biblioteca — grid + filtros; visor en `/viewer/[mediaId]`. */
export function AtlasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get("module");
  const viewParam = searchParams.get("view");
  const queryParam = searchParams.get("q")?.trim() ?? "";
  const initialModule: AtlasFilterModule =
    moduleParam && isAtlasFilterModule(moduleParam) ? moduleParam : "lung";

  const [module, setModule] = useState<AtlasFilterModule>(initialModule);
  const [view, setView] = useState<AtlasLibraryView>(() => parseView(viewParam));
  const { items, loading } = useMedia(module);
  const { openMedia } = useOpenViewer();

  const displayItems = useMemo(() => {
    if (!queryParam) return items;
    const term = queryParam.toLowerCase();
    return items.filter((item) => {
      const finding = item.metadata?.finding?.toLowerCase() ?? "";
      return (
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        finding.includes(term)
      );
    });
  }, [items, queryParam]);

  useEffect(() => {
    if (moduleParam && isAtlasFilterModule(moduleParam) && moduleParam !== module) {
      setModule(moduleParam);
    }
  }, [moduleParam, module]);

  useEffect(() => {
    setView(parseView(viewParam));
  }, [viewParam]);

  useEffect(() => {
    const scroll = searchParams.get("scroll");
    if (!scroll) return;
    const y = Number.parseInt(scroll, 10);
    if (Number.isFinite(y) && y > 0) {
      requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
    }
  }, [searchParams]);

  const syncUrl = useCallback(
    (nextModule: AtlasFilterModule, nextView: AtlasLibraryView) => {
      const params = new URLSearchParams();
      params.set("module", nextModule);
      if (nextView === "errors") params.set("view", "errors");
      router.replace(`/biblioteca?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  const handleSelect = useCallback(
    (item: MediaItem, options?: { autoplay?: boolean }) => {
      openMedia(item, { module, autoplay: options?.autoplay });
    },
    [openMedia, module],
  );

  const handleModuleChange = useCallback(
    (next: AtlasFilterModule) => {
      setModule(next);
      syncUrl(next, view);
    },
    [syncUrl, view],
  );

  const handleViewChange = useCallback(
    (next: AtlasLibraryView) => {
      setView(next);
      syncUrl(module, next);
    },
    [syncUrl, module],
  );

  return (
    <section aria-label="Atlas POCUS">
      <AtlasHeader />
      <AtlasFilters active={module} onChange={handleModuleChange} />
      <AtlasViewTabs active={view} onChange={handleViewChange} />
      {view === "findings" ? (
        <>
          <p className={styles.count}>
            {loading
              ? "…"
              : queryParam
                ? `${displayItems.length} de ${items.length} · “${queryParam}”`
                : `${items.length} hallazgo${items.length === 1 ? "" : "s"}`}
          </p>
          <AtlasGrid items={displayItems} loading={loading} onSelect={handleSelect} />
        </>
      ) : (
        <div className={styles.errorsPanelWrap}>
          <AtlasErrorsPanel module={module} />
        </div>
      )}
    </section>
  );
}
