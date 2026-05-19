"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { AtlasEntry } from "@/lib/atlas/types";
import type { MediaItem } from "@/lib/media/types";
import { mediaIdFromAtlasEntry, openViewerOptionsFromEntry } from "@/lib/viewer/atlas-entry-media";
import { buildViewerPath, saveViewerSession } from "@/lib/viewer/viewer-session";

/** Navega a /viewer/[mediaId] guardando módulo y scroll. */
export function useOpenViewer() {
  const router = useRouter();

  const openMedia = useCallback(
    (item: MediaItem, options?: { autoplay?: boolean; module?: string }) => {
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const module = options?.module ?? item.module;
      saveViewerSession({
        lastMediaId: item.id,
        lastModule: module,
        lastScrollY: scrollY,
        lastPath: typeof window !== "undefined" ? window.location.pathname : null,
      });
      router.push(
        buildViewerPath(item.id, {
          module,
          scroll: scrollY,
          autoplay: options?.autoplay,
        }),
      );
    },
    [router],
  );

  const openAtlasEntry = useCallback(
    (entry: AtlasEntry) => {
      const mediaId = mediaIdFromAtlasEntry(entry);
      if (!mediaId) return false;
      const opts = openViewerOptionsFromEntry(entry);
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      saveViewerSession({
        lastMediaId: mediaId,
        lastModule: opts.module ?? null,
        lastScrollY: scrollY,
        lastPath: typeof window !== "undefined" ? window.location.pathname : null,
      });
      router.push(
        buildViewerPath(mediaId, {
          module: opts.module,
          scroll: scrollY,
          autoplay: opts.autoplay,
        }),
      );
      return true;
    },
    [router],
  );

  return { openMedia, openAtlasEntry };
}
