import type { User } from "@/features/auth/types";

export const SAAS_AUTH_STORAGE_KEY = "sonocritico_saas_auth";

const LEGACY_USER_KEY = "sonocritico_user";

function initialsFromNombre(nombre: string): string {
  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** Mantiene compatibilidad con páginas que usan `@/lib/auth`. */
export function syncLegacyUser(user: User): void {
  if (typeof window === "undefined") return;
  const legacyRole =
    user.rol === "instructor" || user.rol === "admin" ? "instructor" : "student";
  const legacy = {
    id: user.id,
    email: user.email,
    name: user.nombre,
    initials: initialsFromNombre(user.nombre),
    role: legacyRole,
    courseCode: "SONO2024",
    specialty: "urgencias" as const,
  };
  localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(legacy));
}

export function readStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SAAS_AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function writeStoredUser(user: User | null): void {
  if (typeof window === "undefined") return;
  if (!user) {
    localStorage.removeItem(SAAS_AUTH_STORAGE_KEY);
    localStorage.removeItem(LEGACY_USER_KEY);
    return;
  }
  localStorage.setItem(SAAS_AUTH_STORAGE_KEY, JSON.stringify(user));
  syncLegacyUser(user);
}
