import { media as cardiacMedia } from "@/generated/cardiac-media-manifest";
import { media as fastMedia } from "@/generated/fast-media-manifest";
import { media as lungMedia } from "@/generated/lung-media-manifest";
import { media as vexusMedia } from "@/generated/vexus-media-manifest";
import type { MediaItem, MediaModuleId } from "@/lib/media/types";

const BY_MODULE: Record<"lung" | "fast" | "cardiac" | "vexus", MediaItem[]> = {
  lung: lungMedia,
  fast: fastMedia,
  cardiac: cardiacMedia,
  vexus: vexusMedia,
};

export function getMediaForModule(module: MediaModuleId): MediaItem[] {
  if (module in BY_MODULE) {
    return BY_MODULE[module as keyof typeof BY_MODULE];
  }
  return [];
}

/** Todos los ítems de manifests (búsqueda global). */
export function getAllMediaItems(): MediaItem[] {
  return [...lungMedia, ...fastMedia, ...cardiacMedia, ...vexusMedia];
}

export function findMediaItemById(mediaId: string): { item: MediaItem; module: MediaModuleId } | null {
  for (const module of ["lung", "fast", "cardiac", "vexus"] as const) {
    const item = getMediaForModule(module).find((entry) => entry.id === mediaId);
    if (item) return { item, module };
  }
  return null;
}
