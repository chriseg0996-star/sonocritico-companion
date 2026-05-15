import type { AtlasEntry } from "@/lib/atlas/types";

/** Texto indexado para búsqueda clínica en tiempo real (sin backend). */
export function getAtlasSearchHaystack(entry: AtlasEntry): string {
  return [
    entry.title,
    entry.window,
    entry.description,
    entry.protocol,
    entry.clinicalInterpretation,
    entry.frequentError ?? "",
    entry.clinicalAction ?? "",
    entry.category,
    entry.kind,
    entry.mediaType,
    ...entry.tags,
  ]
    .join(" ")
    .toLowerCase();
}

export function matchesAtlasQuery(entry: AtlasEntry, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return getAtlasSearchHaystack(entry).includes(q);
}
