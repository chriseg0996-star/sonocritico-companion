import type { MediaItem, MediaModuleId } from "@/lib/media/types";
import { getAllMediaItems } from "@/lib/media/manifests";
import { MEDIA_MODULE_LABELS } from "@/lib/media/atlas-filters";
import { fuzzyTokenMatch, normalizeSearchText, tokenizeSearch } from "@/lib/media/fuzzy";

export type MediaSearchField =
  | "hallazgo"
  | "protocolo"
  | "ventana"
  | "diagnostico"
  | "probe"
  | "plane"
  | "title"
  | "category";

export type MediaSearchHit = {
  item: MediaItem;
  score: number;
  matchedFields: MediaSearchField[];
};

export type MediaSearchOptions = {
  limit?: number;
  module?: MediaModuleId;
};

const MODULE_PROTOCOL_TERMS: Record<"lung" | "fast" | "cardiac" | "vexus", string[]> = {
  lung: ["pulmon", "pulmonar", "blue", "lus", "pleural", "interstitial"],
  fast: ["fast", "efast", "trauma", "hemothorax", "ruq", "luq"],
  cardiac: ["cardiac", "cardio", "rush", "eco", "heart", "tamponade", "fevi"],
  vexus: ["vexus", "venous", "congestion", "ivc", "portal", "renal", "shock"],
};

const QUERY_EXPANSIONS: Record<string, string[]> = {
  shock: ["rush", "vexus", "cardio", "volume", "ivc", "tamponade"],
  rush: ["cardiac", "cardio", "volume"],
  vexus: ["congestion", "venous", "ivc"],
  consolidacion: ["consolidation", "lung", "pulmon", "hepatization"],
  "b lines": ["b-lines", "b line", "interstitial", "lung", "pulmon", "blue"],
  "b line": ["b-lines", "b lines"],
  "b-lines": ["b lines", "b line"],
  pleural: ["effusion", "lung", "pulmon"],
  derrame: ["pleural", "effusion"],
};

type IndexedMedia = {
  item: MediaItem;
  blob: string;
  fieldTokens: Partial<Record<MediaSearchField, string>>;
};

function buildFieldTokens(item: MediaItem): Partial<Record<MediaSearchField, string>> {
  const meta = item.metadata;
  return {
    title: normalizeSearchText(item.title),
    category: normalizeSearchText(item.category.replace(/-/g, " ")),
    hallazgo: normalizeSearchText(meta?.finding ?? item.category.replace(/-/g, " ")),
    ventana: normalizeSearchText(meta?.plane ?? ""),
    probe: normalizeSearchText(meta?.probe ?? ""),
    plane: normalizeSearchText(meta?.plane ?? ""),
    diagnostico: normalizeSearchText(
      [...(meta?.diagnosis ?? []), meta?.meaning ?? "", meta?.what_you_see ?? ""].join(" "),
    ),
    protocolo: normalizeSearchText(
      [item.module, ...(MODULE_PROTOCOL_TERMS[item.module as keyof typeof MODULE_PROTOCOL_TERMS] ?? [])].join(
        " ",
      ),
    ),
  };
}

function buildIndex(items: MediaItem[]): IndexedMedia[] {
  return items.map((item) => {
    const fieldTokens = buildFieldTokens(item);
    const blob = Object.values(fieldTokens).filter(Boolean).join(" ");
    return { item, blob, fieldTokens };
  });
}

let cachedIndex: IndexedMedia[] | null = null;

function getIndex(): IndexedMedia[] {
  if (!cachedIndex) cachedIndex = buildIndex(getAllMediaItems());
  return cachedIndex;
}

function expandQueryTokens(query: string): string[] {
  const normalized = normalizeSearchText(query);
  const tokens = tokenizeSearch(query);
  const expanded = new Set(tokens);

  const expansion = QUERY_EXPANSIONS[normalized];
  if (expansion) expansion.forEach((t) => expanded.add(normalizeSearchText(t)));

  for (const token of tokens) {
    const partial = QUERY_EXPANSIONS[token];
    if (partial) partial.forEach((t) => expanded.add(normalizeSearchText(t)));
  }

  return [...expanded];
}

function scoreIndexed(entry: IndexedMedia, queryTokens: string[]): { score: number; matchedFields: MediaSearchField[] } {
  let score = 0;
  const matchedFields = new Set<MediaSearchField>();

  const fullQuery = queryTokens.join(" ");
  if (fullQuery.length >= 2 && entry.blob.includes(fullQuery.replace(/\s+/g, " "))) {
    score += 24;
  }

  for (const token of queryTokens) {
    if (token.length < 2) continue;

    if (entry.blob.includes(token)) score += 8;

    (Object.entries(entry.fieldTokens) as [MediaSearchField, string][]).forEach(([field, value]) => {
      if (!value) return;
      if (value.includes(token)) {
        score += 10;
        matchedFields.add(field);
      } else {
        for (const vt of value.split(/\s+/)) {
          if (fuzzyTokenMatch(token, vt)) {
            score += 5;
            matchedFields.add(field);
            break;
          }
        }
      }
    });
  }

  return { score, matchedFields: [...matchedFields] };
}

/** Búsqueda en manifests media — hallazgo, protocolo, ventana, diagnóstico, sonda, plano. */
export function searchMedia(query: string, options: MediaSearchOptions = {}): MediaSearchHit[] {
  const q = query.trim();
  if (!q) return [];

  const { limit = 24, module } = options;
  const queryTokens = expandQueryTokens(q);
  const index = module ? getIndex().filter((e) => e.item.module === module) : getIndex();

  const hits: MediaSearchHit[] = [];

  for (const entry of index) {
    const { score, matchedFields } = scoreIndexed(entry, queryTokens);
    if (score <= 0) continue;
    hits.push({ item: entry.item, score, matchedFields });
  }

  hits.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "es"));
  return hits.slice(0, limit);
}

export function mediaModuleLabel(module: string): string {
  return MEDIA_MODULE_LABELS[module as keyof typeof MEDIA_MODULE_LABELS] ?? module;
}
