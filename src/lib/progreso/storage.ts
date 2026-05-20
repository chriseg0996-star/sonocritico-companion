import type { KnowledgeDomainId } from "@/lib/progreso/domains";

const SELECTED_KEY = "sonocritico-knowledge-hex-selected";

export function loadSelectedDomain(): KnowledgeDomainId | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SELECTED_KEY);
    if (!raw) return null;
    return raw as KnowledgeDomainId;
  } catch {
    return null;
  }
}

export function saveSelectedDomain(id: KnowledgeDomainId): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SELECTED_KEY, id);
  } catch {
    /* quota */
  }
}
