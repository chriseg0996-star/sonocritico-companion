import type { StoredDifferentialAnalysis } from "@/lib/decision/types";

const LOCAL_KEY = "sonocritico-differential-history";
const MAX_ENTRIES = 10;

function read(): StoredDifferentialAnalysis[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredDifferentialAnalysis[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(entries: StoredDifferentialAnalysis[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
  } catch {
    /* quota */
  }
}

export function loadDifferentialHistory(): StoredDifferentialAnalysis[] {
  return read();
}

export function appendDifferentialAnalysis(entry: StoredDifferentialAnalysis): void {
  const prev = read().filter((e) => e.id !== entry.id);
  write([entry, ...prev].slice(0, MAX_ENTRIES));
}

export function clearDifferentialHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LOCAL_KEY);
  } catch {
    /* ignore */
  }
}
