/**
 * F2.7 — Genera public/sw.js con precaché atlas (thumb + still) y clips on-demand.
 * Uso: node scripts/generate-sw.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MANIFEST_MODULES = ["lung", "fast", "cardiac", "vexus"];
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const VERSION = "0.4.0";

function withBase(p) {
  if (!p.startsWith("/")) return p;
  return BASE_PATH ? `${BASE_PATH}${p}` : p;
}

function extractFromManifests() {
  const precache = new Set();
  const clips = new Set();

  for (const mod of MANIFEST_MODULES) {
    const file = path.join(ROOT, "src", "generated", `${mod}-media-manifest.ts`);
    if (!fs.existsSync(file)) {
      console.warn(`[generate-sw] skip missing ${file}`);
      continue;
    }
    const content = fs.readFileSync(file, "utf8");
    for (const m of content.matchAll(/"(still|thumb|clip)":\s*"([^"]+)"/g)) {
      if (m[1] === "clip") clips.add(m[2]);
      else precache.add(m[2]);
    }
  }

  return {
    precache: [...precache].map(withBase).sort(),
    clips: [...clips].map(withBase).sort(),
  };
}

function shellUrls() {
  return [
    "/",
    "/dashboard/",
    "/login/",
    "/planes/",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png",
    "/biblioteca/",
    "/offline.html",
  ].map(withBase);
}

const { precache, clips } = extractFromManifests();
const shell = shellUrls();
const installUrls = [...new Set([...shell, ...precache])];

const sw = `/* Auto-generated — npm run generate:sw — F2.7 v${VERSION} */
const CACHE_SHELL = "sonocritico-shell-v${VERSION}";
const CACHE_ASSETS = "sonocritico-assets-v${VERSION}";
const CACHE_ATLAS_MEDIA = "sonocritico-atlas-media-v${VERSION}";
const CACHE_ATLAS_CLIP = "sonocritico-atlas-clip-v${VERSION}";
const BASE_PATH = ${JSON.stringify(BASE_PATH)};

const PRECACHE_URLS = ${JSON.stringify(installUrls, null, 2)};
const CLIP_PATH_HINTS = ${JSON.stringify(clips, null, 2)};

function isClipRequest(url) {
  return /\\/clip\\.(webm|mp4|svg|gif|webp)(\\?|$)/i.test(url.pathname);
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
      const keep = new Set([CACHE_SHELL, CACHE_ASSETS, CACHE_ATLAS_MEDIA, CACHE_ATLAS_CLIP]);
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

async function networkFirstPage(request) {
  const shell = await caches.open(CACHE_SHELL);
  try {
    const res = await fetch(request);
    if (res.ok) await shell.put(request, res.clone());
    return res;
  } catch {
    const hit = await shell.match(request);
    if (hit) return hit;
    const fallbacks = [
      BASE_PATH + "/dashboard/",
      BASE_PATH + "/",
      BASE_PATH + "/offline.html",
    ];
    for (const path of fallbacks) {
      const page = await shell.match(path);
      if (page) return page;
    }
    return Response.error();
  }
}

function isStaticAsset(url) {
  return (
    url.pathname.includes("/_next/static/") ||
    /\\.(js|css|png|jpg|jpeg|webp|svg|woff2?|ico|json)(\\?|$)/i.test(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
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

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, CACHE_ASSETS));
    return;
  }
});
`;

const out = path.join(ROOT, "public", "sw.js");
fs.writeFileSync(out, sw, "utf8");
console.log(
  `[generate-sw] v${VERSION} base=${BASE_PATH || "/"} precache=${precache.length} clips(on-demand)=${clips.length} install=${installUrls.length}`,
);
