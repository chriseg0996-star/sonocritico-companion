import type { User, UserPlan, UserRole } from "@/features/auth/types";

/** Única key de sesión (login, AuthProvider, logout). */
export const AUTH_STORAGE_KEY = "sc_user";

export const AUTH_CHANGED_EVENT = "sc-auth-changed";

const LEGACY_KEYS = ["sonocritico_saas_auth", "sonocritico_user"] as const;

export function dispatchAuthChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

function resolveRol(rol?: unknown, role?: unknown): UserRole {
  const r = String(rol ?? role ?? "").toLowerCase();
  if (r === "admin") return "admin";
  if (r === "instructor") return "instructor";
  return "estudiante";
}

function resolvePlan(plan?: unknown, rol?: UserRole): UserPlan {
  if (plan === "pro") return "pro";
  if (rol === "instructor" || rol === "admin") return "pro";
  return "free";
}

function normalizeUser(raw: Record<string, unknown>): User {
  const email = String(raw.email ?? "").trim().toLowerCase();
  const nombre = String(raw.nombre ?? raw.name ?? "Usuario");
  const rol = resolveRol(raw.rol, raw.role);
  const plan = resolvePlan(raw.plan, rol);
  const id = String(raw.id ?? (email ? `saas-${email}` : `saas-guest-${Date.now()}`));

  return { id, email, nombre, rol, plan };
}

function parseStoredUser(raw: string | null): User | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!parsed || typeof parsed !== "object") return null;
    return normalizeUser(parsed);
  } catch {
    return null;
  }
}

export function readStoredUser(): User | null {
  if (typeof window === "undefined") return null;

  const current = parseStoredUser(localStorage.getItem(AUTH_STORAGE_KEY));
  if (current) return current;

  for (const key of LEGACY_KEYS) {
    const migrated = parseStoredUser(localStorage.getItem(key));
    if (migrated) {
      writeStoredUser(migrated);
      localStorage.removeItem(key);
      return migrated;
    }
  }

  return null;
}

export function writeStoredUser(user: User | null): void {
  if (typeof window === "undefined") return;

  if (!user) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    for (const key of LEGACY_KEYS) {
      localStorage.removeItem(key);
    }
    dispatchAuthChanged();
    return;
  }

  const normalized = normalizeUser(user as unknown as Record<string, unknown>);
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(normalized));
  for (const key of LEGACY_KEYS) {
    localStorage.removeItem(key);
  }
  dispatchAuthChanged();
}

/** @deprecated Usar AUTH_STORAGE_KEY */
export const SAAS_AUTH_STORAGE_KEY = AUTH_STORAGE_KEY;
