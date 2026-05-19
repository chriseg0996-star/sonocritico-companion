import { CACHE_ATLAS_MEDIA } from "@/lib/offline/cache-names";
import { getAtlasPrecacheUrls } from "@/lib/offline/atlas-offline-manifest";

const BATCH = 8;

/** Precarga thumb + still vía fetch (SW cache-first los persiste). */
export async function warmAtlasMedia(
  onProgress?: (done: number, total: number) => void,
): Promise<{ ok: number; failed: number; total: number }> {
  const urls = getAtlasPrecacheUrls();
  let ok = 0;
  let failed = 0;

  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH);
    const results = await Promise.allSettled(
      batch.map((url) =>
        fetch(url, { credentials: "same-origin", cache: "force-cache" }).then((r) => {
          if (!r.ok) throw new Error(String(r.status));
        }),
      ),
    );
    for (const r of results) {
      if (r.status === "fulfilled") ok += 1;
      else failed += 1;
    }
    onProgress?.(ok + failed, urls.length);
  }

  return { ok, failed, total: urls.length };
}

/** Comprueba si thumb/still están en Cache Storage. */
export async function isAtlasMediaCached(): Promise<boolean> {
  if (typeof caches === "undefined") return false;
  const urls = getAtlasPrecacheUrls();
  if (urls.length === 0) return false;
  const cache = await caches.open(CACHE_ATLAS_MEDIA);
  const checks = await Promise.all(urls.map((url) => cache.match(url)));
  return checks.every(Boolean);
}
