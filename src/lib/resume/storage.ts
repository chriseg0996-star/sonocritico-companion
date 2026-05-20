import type { SmartResumeState } from "@/lib/resume/types";

const LOCAL_KEY = "sonocritico-smart-resume";
const SESSION_KEY = "sonocritico-smart-resume-session";

export const EMPTY_RESUME_STATE: SmartResumeState = {};

function readJson(key: string): SmartResumeState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window[key === SESSION_KEY ? "sessionStorage" : "localStorage"].getItem(key);
    if (!raw) return {};
    return JSON.parse(raw) as SmartResumeState;
  } catch {
    return {};
  }
}

function writeJson(key: string, state: SmartResumeState): void {
  if (typeof window === "undefined") return;
  try {
    window[key === SESSION_KEY ? "sessionStorage" : "localStorage"].setItem(key, JSON.stringify(state));
  } catch {
    /* quota */
  }
}

function pickNewer<T extends { at: string }>(a?: T, b?: T): T | undefined {
  if (!a) return b;
  if (!b) return a;
  return new Date(a.at).getTime() >= new Date(b.at).getTime() ? a : b;
}

/** Fusiona session + local; gana el puntero más reciente por tipo. */
export function loadSmartResumeState(): SmartResumeState {
  const local = readJson(LOCAL_KEY);
  const session = readJson(SESSION_KEY);
  return {
    module: pickNewer(local.module, session.module),
    clip: pickNewer(local.clip, session.clip),
    case: pickNewer(local.case, session.case),
    search: pickNewer(local.search, session.search),
  };
}

export function saveSmartResumeState(state: SmartResumeState): void {
  writeJson(LOCAL_KEY, state);
  writeJson(SESSION_KEY, state);
}

export function patchSmartResumeState(patch: Partial<SmartResumeState>): SmartResumeState {
  const next = { ...loadSmartResumeState(), ...patch };
  saveSmartResumeState(next);
  return next;
}
