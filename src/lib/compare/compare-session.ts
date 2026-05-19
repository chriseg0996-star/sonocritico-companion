const SESSION_KEY = "sonocritico-compare-session";

export type CompareSession = {
  lastPairId: string | null;
  lastProtocolSlug: string | null;
  lastReferenceMediaId: string | null;
  lastCompareMediaId: string | null;
};

const DEFAULT: CompareSession = {
  lastPairId: null,
  lastProtocolSlug: null,
  lastReferenceMediaId: null,
  lastCompareMediaId: null,
};

export function loadCompareSession(): CompareSession {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function saveCompareSession(partial: Partial<CompareSession>): CompareSession {
  const next = { ...loadCompareSession(), ...partial };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    } catch {
      /* quota */
    }
  }
  return next;
}
