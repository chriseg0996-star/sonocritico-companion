/**
 * Escanea public/media/vexus/{category}/ y genera manifest TypeScript.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "media", "vexus");
const OUT = path.join(process.cwd(), "src", "lib", "atlas", "vexus-media-manifest.ts");

const STILL_NAMES = ["still"];
const CLIP_NAMES = ["clip"];
const THUMB_NAMES = ["thumb", "thumbnail"];
const POSTER_NAMES = ["poster"];

const STILL_EXT = ["webp", "jpg", "jpeg", "png", "gif", "svg"];
const CLIP_EXT = ["webm", "mp4", "gif", "webp", "svg"];
const THUMB_EXT = ["webp", "jpg", "jpeg", "png", "gif", "svg"];

function pickFile(dir, basenames, extensions) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  for (const base of basenames) {
    for (const ext of extensions) {
      const name = `${base}.${ext}`;
      if (files.includes(name)) {
        return { name, ext: ext === "jpeg" ? "jpg" : ext };
      }
    }
  }
  return null;
}

function mimeFor(ext, slot) {
  if (["webm", "mp4"].includes(ext)) return "video";
  if (ext === "gif" || (slot === "clip" && ext === "webp")) return "gif";
  return "image";
}

const manifest = {};

if (fs.existsSync(ROOT)) {
  for (const category of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    const cat = category.name;
    const dir = path.join(ROOT, cat);
    const rel = (file) => `/media/vexus/${cat}/${file}`;

    const still = pickFile(dir, STILL_NAMES, STILL_EXT);
    const clip = pickFile(dir, CLIP_NAMES, CLIP_EXT);
    const thumb = pickFile(dir, THUMB_NAMES, THUMB_EXT) ?? still;
    const poster = pickFile(dir, POSTER_NAMES, THUMB_EXT);

    if (still) {
      manifest[`${cat}/still`] = {
        src: rel(still.name),
        thumb: rel((thumb ?? still).name),
        poster: poster ? rel(poster.name) : undefined,
        mime: mimeFor(still.ext, "still"),
      };
    }
    if (clip) {
      manifest[`${cat}/clip`] = {
        src: rel(clip.name),
        thumb: rel((thumb ?? clip).name),
        poster: poster ? rel(poster.name) : undefined,
        mime: mimeFor(clip.ext, "clip"),
      };
    }
  }
}

const body = `/** Auto-generated — npm run media:vexus */
import type { AtlasMediaType } from "@/lib/atlas/types";

export type ManifestMedia = {
  src: string;
  thumb: string;
  poster?: string;
  mime: AtlasMediaType | "video";
};

export const vexusMediaManifest: Record<string, ManifestMedia> = ${JSON.stringify(manifest, null, 2)};

export function getVexusManifestMedia(category: string, slot: "still" | "clip"): ManifestMedia | undefined {
  return vexusMediaManifest[\`\${category}/\${slot}\`];
}
`;

fs.writeFileSync(OUT, body);
console.log("VExUS manifest:", Object.keys(manifest).length, "slots →", OUT);
