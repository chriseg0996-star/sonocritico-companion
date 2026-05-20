import type { QuickActionId, RecentQuickAction } from "@/lib/actions/types";
import { getQuickActionDef } from "@/lib/actions/catalog";

const LOCAL_KEY = "sonocritico-quick-actions-recent";
const MAX_RECENT = 5;

function read(): RecentQuickAction[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RecentQuickAction[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(entries: RecentQuickAction[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(entries.slice(0, MAX_RECENT)));
  } catch {
    /* quota */
  }
}

export function loadRecentQuickActions(): RecentQuickAction[] {
  return read();
}

export function recordQuickAction(id: QuickActionId): void {
  const def = getQuickActionDef(id);
  if (!def) return;
  const entry: RecentQuickAction = {
    id,
    label: def.label,
    at: new Date().toISOString(),
  };
  const next = [entry, ...read().filter((e) => e.id !== id)].slice(0, MAX_RECENT);
  write(next);
}
