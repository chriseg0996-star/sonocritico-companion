import type { CompanionLastUse, GuardScenarioId } from "@/lib/companion/types";

const LOCAL_KEY = "sonocritico-companion-mode";
const SESSION_KEY = "sonocritico-companion-mode-session";

function read(key: string): CompanionLastUse | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window[key === SESSION_KEY ? "sessionStorage" : "localStorage"].getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as CompanionLastUse;
  } catch {
    return null;
  }
}

function write(key: string, record: CompanionLastUse): void {
  if (typeof window === "undefined") return;
  try {
    window[key === SESSION_KEY ? "sessionStorage" : "localStorage"].setItem(key, JSON.stringify(record));
  } catch {
    /* quota */
  }
}

export function loadCompanionLastUse(): CompanionLastUse | null {
  const local = read(LOCAL_KEY);
  const session = read(SESSION_KEY);
  if (!local) return session;
  if (!session) return local;
  return new Date(session.at).getTime() >= new Date(local.at).getTime() ? session : local;
}

export function saveCompanionLastUse(scenarioId: GuardScenarioId): void {
  const record: CompanionLastUse = { scenarioId, at: new Date().toISOString() };
  write(LOCAL_KEY, record);
  write(SESSION_KEY, record);
}
