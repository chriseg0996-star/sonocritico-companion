import { getImage } from "@/lib/mock-data";
import { withBasePath } from "@/lib/paths";
import { getLungManifestMedia } from "@/lib/atlas/lung-media-manifest";
import type { AtlasEntry } from "@/lib/atlas/types";

export type ResolvedAtlasMedia = {
  src: string;
  thumbnailSrc: string;
  posterSrc?: string;
  alt: string;
  isPlaceholder: boolean;
  isRasterClip: boolean;
};

function isVideoFile(src: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(src);
}

function fromManifest(entry: AtlasEntry): ResolvedAtlasMedia | null {
  if (!entry.mediaRef || entry.mediaRef.module !== "lung") return null;
  const slot = entry.kind === "clip" ? "clip" : "still";
  const m = getLungManifestMedia(entry.mediaRef.category, slot);
  if (!m) {
    if (slot === "clip") return null;
    const still = getLungManifestMedia(entry.mediaRef.category, "still");
    if (!still) return null;
    return buildResolved(entry, still);
  }
  return buildResolved(entry, m);
}

function buildResolved(
  entry: AtlasEntry,
  m: { src: string; thumb: string; poster?: string; mime: string }
): ResolvedAtlasMedia {
  const src = withBasePath(m.src);
  const thumbnailSrc = withBasePath(m.thumb);
  const isRasterClip = (entry.kind === "clip" || m.mime === "video") && isVideoFile(src);
  return {
    src,
    thumbnailSrc,
    posterSrc: m.poster ? withBasePath(m.poster) : undefined,
    alt: entry.title,
    isPlaceholder: false,
    isRasterClip,
  };
}

export function resolveAtlasMedia(entry: AtlasEntry): ResolvedAtlasMedia {
  const manifestRes = fromManifest(entry);
  if (manifestRes) return manifestRes;

  if (entry.src) {
    const thumb = entry.thumbnailSrc ?? entry.src;
    const src = withBasePath(entry.src);
    const thumbnailSrc = withBasePath(thumb);
    const isRasterClip =
      (entry.kind === "clip" || entry.mediaType === "video") && isVideoFile(src);
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

export function preloadAtlasMedia(entries: AtlasEntry[], centerIndex: number): void {
  const neighbors = [centerIndex - 1, centerIndex, centerIndex + 1];
  for (const i of neighbors) {
    const e = entries[i];
    if (!e) continue;
    const { src, isPlaceholder, isRasterClip } = resolveAtlasMedia(e);
    if (isPlaceholder || !src) continue;
    if (isRasterClip) {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.muted = true;
      v.src = src;
      continue;
    }
    const img = new Image();
    img.src = src;
  }
}
