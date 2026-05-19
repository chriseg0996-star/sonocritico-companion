import type { ProtocolReturnContext } from "@/lib/protocols/protocol-navigation";

const STORAGE_KEY = "sonocritico-protocol-context";

export type PersistedProtocolContext = {
  returnToProtocol: ProtocolReturnContext | null;
  lastVisit: {
    protocolSlug: string;
    stepId: string;
    mediaId?: string;
  } | null;
};

const DEFAULT_STATE: PersistedProtocolContext = {
  returnToProtocol: null,
  lastVisit: null,
};

export function loadProtocolContext(): PersistedProtocolContext {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as PersistedProtocolContext;
    return {
      returnToProtocol: parsed.returnToProtocol ?? null,
      lastVisit: parsed.lastVisit ?? null,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveProtocolContext(state: PersistedProtocolContext): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota */
  }
}
