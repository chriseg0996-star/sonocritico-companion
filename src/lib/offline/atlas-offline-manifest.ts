import { getAllMediaItems } from "@/lib/media/manifests";
import { getMediaPreviewSrc } from "@/lib/media/atlas-filters";
import { withBasePath } from "@/lib/paths";

/** Rutas relativas (sin basePath) para still + thumb — precaché offline. */
export function getAtlasPrecachePaths(): string[] {
  const paths = new Set<string>();
  for (const item of getAllMediaItems()) {
    const preview = getMediaPreviewSrc(item);
    if (preview) paths.add(preview);
    if (item.still) paths.add(item.still);
    if (item.thumb && item.thumb !== item.still) paths.add(item.thumb);
  }
  return [...paths].sort();
}

/** Clips — solo bajo demanda (network-first + cache al reproducir). */
export function getAtlasClipPaths(): string[] {
  const paths = new Set<string>();
  for (const item of getAllMediaItems()) {
    if (item.clip) paths.add(item.clip);
  }
  return [...paths].sort();
}

export function resolveOfflineUrl(path: string): string {
  return withBasePath(path);
}

export function getAtlasPrecacheUrls(): string[] {
  return getAtlasPrecachePaths().map(resolveOfflineUrl);
}
