import type { AtlasFilterModule } from "@/lib/media/atlas-filters";
import type { FrequentErrorTraining } from "@/lib/training/types";
import { LUNG_FREQUENT_ERRORS } from "@/lib/training/lung-errors";

const ALL: FrequentErrorTraining[] = [...LUNG_FREQUENT_ERRORS];

const BY_ID = new Map(ALL.map((e) => [e.id, e]));

export function getErrorsForModule(module: AtlasFilterModule): FrequentErrorTraining[] {
  return ALL.filter((e) => e.module === module);
}

export function getErrorById(id: string): FrequentErrorTraining | null {
  return BY_ID.get(id) ?? null;
}

/** Errores vinculados a un hallazgo (manifest id). */
export function getErrorsForMediaId(mediaId: string): FrequentErrorTraining[] {
  return ALL.filter((e) => e.mediaIds.includes(mediaId));
}

export function hasErrorsForMediaId(mediaId: string): boolean {
  return getErrorsForMediaId(mediaId).length > 0;
}
