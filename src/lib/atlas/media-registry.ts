/**
 * Registro de media por módulo — public/media/{module}/{category}/
 * Soporta: jpg, png, webp, gif, mp4, webm (prioridad vía manifest).
 */
import { withBasePath } from "@/lib/paths";
import type { AtlasModuleId } from "@/lib/atlas/types";

export const STILL_EXTENSIONS = ["webp", "jpg", "jpeg", "png", "gif", "svg"] as const;
export const CLIP_EXTENSIONS = ["webm", "mp4", "gif", "webp", "svg"] as const;
export const THUMB_EXTENSIONS = ["webp", "jpg", "jpeg", "png", "gif", "svg"] as const;

export function mediaRoot(module: AtlasModuleId): string {
  return `/media/${module}`;
}

export function categoryDir(module: AtlasModuleId, category: string): string {
  return `${mediaRoot(module)}/${category}`;
}

export function atlasMediaPath(module: AtlasModuleId, category: string, file: string): string {
  return withBasePath(`${categoryDir(module, category)}/${file}`);
}

/** Slots estándar por carpeta de hallazgo */
export type MediaSlot = "still" | "clip" | "thumb" | "poster";

export function manifestKey(category: string, slot: MediaSlot): string {
  return `${category}/${slot}`;
}
