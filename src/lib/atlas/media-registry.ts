/**
 * Registro de media por módulo — rutas bajo public/media/{module}/
 * Reutilizable: lung, cardiac, fast, vascular, etc.
 */
import { withBasePath } from "@/lib/paths";

export type AtlasModuleId = "lung" | "cardiac" | "fast" | "vascular" | "neuro" | "abdomen";

function mediaRoot(module: AtlasModuleId): string {
  return `/media/${module}`;
}

export function atlasMediaPath(module: AtlasModuleId, file: string): string {
  return withBasePath(`${mediaRoot(module)}/${file}`);
}

/** Media pulmonar — SVG locales (sustituir por webp/mp4 reales en la misma ruta). */
export const lungAtlasMedia = {
  stills: {
    patternA: atlasMediaPath("lung", "pattern-a.svg"),
    bLines: atlasMediaPath("lung", "b-lines.svg"),
    consolidation: atlasMediaPath("lung", "consolidation.svg"),
    effusion: atlasMediaPath("lung", "effusion.svg"),
    lungPoint: atlasMediaPath("lung", "lung-point.svg"),
    plaps: atlasMediaPath("lung", "plaps.svg"),
  },
  clips: {
    sliding: atlasMediaPath("lung", "sliding-clip.svg"),
    bLines: atlasMediaPath("lung", "b-lines-clip.svg"),
    consolidation: atlasMediaPath("lung", "consolidation-clip.svg"),
    lungPoint: atlasMediaPath("lung", "lung-point-clip.svg"),
  },
} as const;
