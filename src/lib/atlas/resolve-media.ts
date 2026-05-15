import { getImage } from "@/lib/mock-data";
import { withBasePath } from "@/lib/paths";
import type { AtlasEntry } from "@/lib/atlas/types";

export type ResolvedAtlasMedia = {
  src: string;
  thumbnailSrc: string;
  posterSrc?: string;
  alt: string;
  isPlaceholder: boolean;
  /** SVG animado o gif — usar img, no video */
  isRasterClip: boolean;
};

function isVideoFile(src: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(src);
}

export function resolveAtlasMedia(entry: AtlasEntry): ResolvedAtlasMedia {
  if (entry.src) {
    const thumb = entry.thumbnailSrc ?? entry.src;
    const src = withBasePath(entry.src);
    const thumbnailSrc = withBasePath(thumb);
    const isClip = entry.kind === "clip" || entry.mediaType === "video";
    const isRasterClip = isClip && isVideoFile(src);
    return {
      src,
      thumbnailSrc,
      posterSrc: entry.posterSrc ? withBasePath(entry.posterSrc) : undefined,
      alt: entry.title,
      isPlaceholder: false,
      isRasterClip,
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
      isRasterClip: false,
    };
  }

  return {
    src: "",
    thumbnailSrc: "",
    alt: entry.title,
    isPlaceholder: true,
    isRasterClip: false,
  };
}

/** Precarga silenciosa de imágenes adyacentes en el viewer */
export function preloadAtlasMedia(entries: AtlasEntry[], centerIndex: number): void {
  const neighbors = [centerIndex - 1, centerIndex, centerIndex + 1];
  for (const i of neighbors) {
    const e = entries[i];
    if (!e) continue;
    const { src, isPlaceholder, isRasterClip } = resolveAtlasMedia(e);
    if (isPlaceholder || isRasterClip || !src) continue;
    const img = new Image();
    img.src = src;
  }
}
