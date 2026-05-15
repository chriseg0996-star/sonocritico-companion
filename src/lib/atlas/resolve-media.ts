import { getImage } from "@/lib/mock-data";
import { withBasePath } from "@/lib/paths";
import type { AtlasEntry } from "@/lib/atlas/types";

export type ResolvedAtlasMedia = {
  src: string;
  thumbnailSrc: string;
  posterSrc?: string;
  alt: string;
  isPlaceholder: boolean;
};

export function resolveAtlasMedia(entry: AtlasEntry): ResolvedAtlasMedia {
  if (entry.src) {
    const thumb = entry.thumbnailSrc ?? entry.src;
    return {
      src: withBasePath(entry.src),
      thumbnailSrc: withBasePath(thumb),
      posterSrc: entry.posterSrc ? withBasePath(entry.posterSrc) : undefined,
      alt: entry.title,
      isPlaceholder: false,
    };
  }

  const img = entry.imageId ? getImage(entry.imageId) : undefined;
  if (img) {
    return {
      src: withBasePath(img.src),
      thumbnailSrc: withBasePath(img.thumbnailSrc ?? img.src),
      posterSrc: img.posterSrc ? withBasePath(img.posterSrc) : undefined,
      alt: img.finding,
      isPlaceholder: false,
    };
  }

  return {
    src: "",
    thumbnailSrc: "",
    alt: entry.title,
    isPlaceholder: true,
  };
}
