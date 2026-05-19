"use client";

import { useMemo } from "react";
import { getMediaForModule } from "@/lib/media/manifests";
import type { MediaItem, MediaModuleId } from "@/lib/media/types";

export type UseMediaResult = {
  items: MediaItem[];
  loading: boolean;
};

/** Ítems del módulo desde manifests generados (`npm run media:manifest`). */
export function useMedia(module: MediaModuleId): UseMediaResult {
  const items = useMemo(() => getMediaForModule(module), [module]);
  return { items, loading: false };
}
