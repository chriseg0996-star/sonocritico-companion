/* Auto-generated — npm run generate:sw — F2.7 v0.4.0 */
const CACHE_SHELL = "sonocritico-shell-v0.4.0";
const CACHE_ATLAS_MEDIA = "sonocritico-atlas-media-v0.4.0";
const CACHE_ATLAS_CLIP = "sonocritico-atlas-clip-v0.4.0";
const BASE_PATH = "";

const PRECACHE_URLS = [
  "/",
  "/biblioteca/",
  "/offline.html",
  "/media/cardiac/a4c-fevi-reduced/still.svg",
  "/media/cardiac/fevi-hyperdynamic/still.svg",
  "/media/cardiac/ivc-normal/still.svg",
  "/media/cardiac/ivc-plethoric/still.svg",
  "/media/cardiac/pericardial-effusion/still.svg",
  "/media/cardiac/plax-normal/still.svg",
  "/media/cardiac/psax-mitral/still.svg",
  "/media/cardiac/rv-dilated/still.svg",
  "/media/cardiac/septum-d-shape/still.svg",
  "/media/cardiac/subxiphoid-normal/still.svg",
  "/media/cardiac/tamponade/still.svg",
  "/media/fast/hemothorax/still.svg",
  "/media/fast/luq-fluid/still.svg",
  "/media/fast/luq-normal/still.svg",
  "/media/fast/pelvis-fluid/still.svg",
  "/media/fast/pelvis-normal/still.svg",
  "/media/fast/pericardial-effusion/still.svg",
  "/media/fast/pleural-sliding/still.svg",
  "/media/fast/pneumothorax/still.svg",
  "/media/fast/ruq-fluid/still.svg",
  "/media/fast/ruq-normal/still.svg",
  "/media/fast/subxiphoid-normal/still.svg",
  "/media/lung/a-lines/still.svg",
  "/media/lung/b-lines/still.svg",
  "/media/lung/consolidation/still.svg",
  "/media/lung/lung-point/still.svg",
  "/media/lung/plaps/still.svg",
  "/media/lung/pleural-effusion/still.svg",
  "/media/vexus/hepatic-s-inversion/still.svg",
  "/media/vexus/hepatic-s-normal/still.svg",
  "/media/vexus/ivc-normal/still.svg",
  "/media/vexus/ivc-plethoric/still.svg",
  "/media/vexus/portal-normal/still.svg",
  "/media/vexus/portal-pulsatile/still.svg",
  "/media/vexus/renal-continuous/still.svg",
  "/media/vexus/renal-discontinuous/still.svg",
  "/media/vexus/vexus-severe/still.svg"
];
const CLIP_PATH_HINTS = [
  "/media/cardiac/pericardial-effusion/clip.svg",
  "/media/cardiac/plax-normal/clip.svg",
  "/media/fast/pleural-sliding/clip.svg",
  "/media/fast/ruq-fluid/clip.svg",
  "/media/lung/a-lines/clip.svg",
  "/media/lung/b-lines/clip.svg",
  "/media/lung/consolidation/clip.svg",
  "/media/lung/lung-point/clip.svg",
  "/media/vexus/hepatic-s-normal/clip.svg",
  "/media/vexus/portal-normal/clip.svg",
  "/media/vexus/portal-pulsatile/clip.svg",
  "/media/vexus/renal-discontinuous/clip.svg"
];

function isClipRequest(url) {
  return /\/clip\.(webm|mp4|svg|gif|webp)(\?|$)/i.test(url.pathname);
}

function isAtlasMediaRequest(url) {
  return url.pathname.includes("/media/") && !isClipRequest(url);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const shellCache = await caches.open(CACHE_SHELL);
      const mediaCache = await caches.open(CACHE_ATLAS_MEDIA);
      await Promise.allSettled(
        PRECACHE_URLS.map(async (url) => {
          try {
            const res = await fetch(url);
            if (!res.ok) return;
            const target = url.includes("/media/") ? mediaCache : shellCache;
            await target.put(url, res);
          } catch (_) {
            /* red lenta — warm desde cliente */
          }
        }),
      );
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([CACHE_SHELL, CACHE_ATLAS_MEDIA, CACHE_ATLAS_CLIP]);
      const names = await caches.keys();
      await Promise.all(names.filter((n) => !keep.has(n)).map((n) => caches.delete(n)));
      await self.clients.claim();
    })(),
  );
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  try {
    const res = await fetch(request);
    if (res.ok) await cache.put(request, res.clone());
    return res;
  } catch {
    return hit ?? Response.error();
  }
}

async function networkFirstClip(request) {
  const cache = await caches.open(CACHE_ATLAS_CLIP);
  try {
    const res = await fetch(request);
    if (res.ok) await cache.put(request, res.clone());
    return res;
  } catch {
    const hit = await cache.match(request);
    if (hit) return hit;
    throw new Error("clip unavailable offline");
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res.ok) void cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);
  return hit ?? (await network) ?? Response.error();
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const shell = await caches.open(CACHE_SHELL);
          const biblioteca = await shell.match(BASE_PATH + "/biblioteca/");
          if (biblioteca) return biblioteca;
          const offline = await shell.match(BASE_PATH + "/offline.html");
          if (offline) return offline;
          return Response.error();
        }
      })(),
    );
    return;
  }

  if (isClipRequest(url)) {
    event.respondWith(networkFirstClip(request));
    return;
  }

  if (isAtlasMediaRequest(url)) {
    event.respondWith(cacheFirst(request, CACHE_ATLAS_MEDIA));
    return;
  }

  if (url.pathname.includes("/_next/static/") || url.pathname.endsWith(".css")) {
    event.respondWith(staleWhileRevalidate(request, CACHE_SHELL));
  }
});
