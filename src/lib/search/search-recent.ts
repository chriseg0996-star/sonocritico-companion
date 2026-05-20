import { recordLastSearch } from "@/lib/resume/record";

const STORAGE_KEY = "sonocritico-clinical-search-recent";
const MAX_RECENT = 8;

function safeParse(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((q): q is string => typeof q === "string" && q.trim().length > 0);
  } catch {
    return [];
  }
}

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export function pushRecentSearch(query: string): void {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (trimmed.length < 2) return;

  const prev = getRecentSearches().filter((q) => q.trim().toLowerCase() !== trimmed.toLowerCase());
  const next = [trimmed, ...prev].slice(0, MAX_RECENT);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  recordLastSearch(trimmed);
}
