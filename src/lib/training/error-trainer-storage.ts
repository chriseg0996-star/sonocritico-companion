import { recordErrorReviewed } from "@/lib/learning/events";

const SEEN_KEY = "sonocritico-error-trainer-seen";

export function loadSeenErrorIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function isErrorSeen(errorId: string): boolean {
  return loadSeenErrorIds().includes(errorId);
}

export function markErrorSeen(errorId: string): void {
  const set = new Set(loadSeenErrorIds());
  if (set.has(errorId)) return;
  set.add(errorId);
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...set]));
    recordErrorReviewed();
  } catch {
    /* quota */
  }
}

export function markErrorsSeen(errorIds: string[]): void {
  const set = new Set(loadSeenErrorIds());
  let added = 0;
  for (const id of errorIds) {
    if (!set.has(id)) {
      set.add(id);
      added += 1;
    }
  }
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...set]));
    for (let i = 0; i < added; i++) recordErrorReviewed();
  } catch {
    /* quota */
  }
}
