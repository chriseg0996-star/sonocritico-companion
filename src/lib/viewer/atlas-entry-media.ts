import type { AtlasEntry } from "@/lib/atlas/types";
import { findMediaItemById } from "@/lib/media/manifests";

/** Mapea entrada atlas legacy → id de manifest (`lung-b-lines`, etc.). */
export function mediaIdFromAtlasEntry(entry: AtlasEntry): string | null {
  const ref = entry.mediaRef;
  if (!ref) return null;
  const category = String(ref.category).replace(/\//g, "-");
  const candidate = `${ref.module}-${category}`;
  if (findMediaItemById(candidate)) return candidate;
  return null;
}

export function openViewerOptionsFromEntry(entry: AtlasEntry) {
  return {
    autoplay: entry.kind === "clip",
    module: entry.mediaRef?.module,
  };
}
