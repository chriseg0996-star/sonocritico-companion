/**
 * F2.2 — Escanea public/media/{module}/{hallazgo}/ y genera src/generated/*-media-manifest.ts
 * Uso: npm run media:manifest
 */
import fs from "node:fs";
import path from "node:path";

const MEDIA_ROOT = path.join(process.cwd(), "public", "media");
const OUT_DIR = path.join(process.cwd(), "src", "generated");

/** Módulos con manifest generado en esta fase. */
const MODULES = ["lung", "fast", "cardiac", "vexus"];

const STILL_PRIMARY = "still.webp";
const STILL_FALLBACKS = ["still.svg", "still.jpg", "still.jpeg", "still.png"];
const CLIP_CANDIDATES = ["clip.webm", "clip.mp4", "clip.svg", "clip.gif"];
const THUMB_CANDIDATES = ["thumb.webp", "thumb.jpg", "thumb.jpeg", "thumb.png", "thumb.svg"];

let warnCount = 0;

function warn(message) {
  warnCount += 1;
  console.warn(`[media:manifest] ${message}`);
}

function existsFile(dir, name) {
  return fs.existsSync(path.join(dir, name));
}

function pickFirst(dir, names) {
  for (const name of names) {
    if (existsFile(dir, name)) return name;
  }
  return null;
}

function toTitle(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function readMeta(dir, module, category) {
  const metaPath = path.join(dir, "media.meta.json");
  if (!existsFile(dir, "media.meta.json")) {
    return { ok: true, meta: {} };
  }

  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  } catch (err) {
    warn(`${module}/${category}: media.meta.json inválido (${err.message})`);
    return { ok: false, meta: {} };
  }

  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    warn(`${module}/${category}: media.meta.json debe ser un objeto JSON`);
    return { ok: false, meta: {} };
  }

  const stringKeys = [
    "id",
    "title",
    "finding",
    "probe",
    "plane",
    "what_you_see",
    "meaning",
    "clinical_use",
  ];
  const arrayKeys = ["diagnosis", "pitfalls"];

  for (const key of Object.keys(raw)) {
    if (stringKeys.includes(key)) {
      if (raw[key] !== undefined && typeof raw[key] !== "string") {
        warn(`${module}/${category}: "${key}" debe ser string`);
      }
    } else if (arrayKeys.includes(key)) {
      if (raw[key] !== undefined && !Array.isArray(raw[key])) {
        warn(`${module}/${category}: "${key}" debe ser array de strings`);
      } else if (Array.isArray(raw[key])) {
        for (const entry of raw[key]) {
          if (typeof entry !== "string") {
            warn(`${module}/${category}: "${key}" debe contener solo strings`);
            break;
          }
        }
      }
    } else if (key !== "id") {
      warn(`${module}/${category}: clave desconocida en media.meta.json: "${key}"`);
    }
  }

  return { ok: true, meta: raw };
}

function scanFinding(module, category, findingDir) {
  const rel = (file) => `/media/${module}/${category}/${file}`;

  if (!existsFile(findingDir, STILL_PRIMARY)) {
    const fallback = pickFirst(findingDir, STILL_FALLBACKS);
    if (fallback) {
      warn(`${module}/${category}: falta ${STILL_PRIMARY} (usando ${fallback})`);
    } else {
      warn(`${module}/${category}: falta ${STILL_PRIMARY} — hallazgo omitido del manifest`);
      return null;
    }
  }

  const stillFile = pickFirst(findingDir, [STILL_PRIMARY, ...STILL_FALLBACKS]);
  if (!stillFile) return null;

  const clipFile = pickFirst(findingDir, CLIP_CANDIDATES);
  const thumbFile = pickFirst(findingDir, THUMB_CANDIDATES);

  const { meta } = readMeta(findingDir, module, category);

  const item = {
    id: typeof meta.id === "string" && meta.id.trim() ? meta.id.trim() : `${module}-${category}`,
    module,
    category,
    title: typeof meta.title === "string" && meta.title.trim() ? meta.title.trim() : toTitle(category),
    still: rel(stillFile),
  };

  if (clipFile) item.clip = rel(clipFile);
  if (thumbFile) item.thumb = rel(thumbFile);

  const metadata = {};
  if (typeof meta.finding === "string" && meta.finding.trim()) metadata.finding = meta.finding.trim();
  if (typeof meta.probe === "string" && meta.probe.trim()) metadata.probe = meta.probe.trim();
  if (typeof meta.plane === "string" && meta.plane.trim()) metadata.plane = meta.plane.trim();
  if (typeof meta.what_you_see === "string" && meta.what_you_see.trim()) {
    metadata.what_you_see = meta.what_you_see.trim();
  }
  if (typeof meta.meaning === "string" && meta.meaning.trim()) metadata.meaning = meta.meaning.trim();
  if (typeof meta.clinical_use === "string" && meta.clinical_use.trim()) {
    metadata.clinical_use = meta.clinical_use.trim();
  }
  if (Array.isArray(meta.diagnosis)) {
    const diagnosis = meta.diagnosis.map((s) => String(s).trim()).filter(Boolean);
    if (diagnosis.length > 0) metadata.diagnosis = diagnosis;
  }
  if (Array.isArray(meta.pitfalls)) {
    const pitfalls = meta.pitfalls.map((s) => String(s).trim()).filter(Boolean);
    if (pitfalls.length > 0) metadata.pitfalls = pitfalls;
  }

  if (Object.keys(metadata).length > 0) {
    item.metadata = metadata;
  }

  return item;
}

function scanModule(module) {
  const moduleDir = path.join(MEDIA_ROOT, module);
  const items = [];

  if (!fs.existsSync(moduleDir)) {
    warn(`módulo sin carpeta: public/media/${module}/`);
    return items;
  }

  const entries = fs.readdirSync(moduleDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    const findingDir = path.join(moduleDir, entry.name);
    const item = scanFinding(module, entry.name, findingDir);
    if (item) items.push(item);
  }

  return items;
}

function emitManifest(module, items) {
  const outPath = path.join(OUT_DIR, `${module}-media-manifest.ts`);
  const body = `/** Auto-generated — npm run media:manifest — no editar a mano */
import type { MediaItem } from "@/lib/media/types";

export const media: MediaItem[] = ${JSON.stringify(items, null, 2)};
`;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(outPath, body, "utf8");
  console.log(`  ${module}: ${items.length} ítems → ${path.relative(process.cwd(), outPath)}`);
}

function main() {
  console.log("[media:manifest] Escaneando public/media/ …");
  warnCount = 0;

  for (const module of MODULES) {
    const items = scanModule(module);
    emitManifest(module, items);
  }

  console.log(`[media:manifest] Listo.${warnCount > 0 ? ` (${warnCount} advertencia${warnCount === 1 ? "" : "s"})` : ""}`);
}

main();
