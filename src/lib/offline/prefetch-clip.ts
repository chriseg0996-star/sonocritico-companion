import { resolveOfflineUrl } from "@/lib/offline/atlas-offline-manifest";

/** Clip bajo demanda — network-first en SW; devuelve false si no hay red ni caché. */
export async function prefetchClip(relativePath: string): Promise<boolean> {
  try {
    const res = await fetch(resolveOfflineUrl(relativePath), {
      credentials: "same-origin",
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function isClipCached(relativePath: string): Promise<boolean> {
  if (typeof caches === "undefined") return false;
  const { CACHE_ATLAS_CLIP } = await import("@/lib/offline/cache-names");
  const cache = await caches.open(CACHE_ATLAS_CLIP);
  return Boolean(await cache.match(resolveOfflineUrl(relativePath)));
}
