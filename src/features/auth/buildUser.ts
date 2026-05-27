import type { User, UserPlan, UserRole } from "@/features/auth/types";

function nombreFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "usuario";
  return local
    .replace(/[._]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function resolveRole(email: string): UserRole {
  const normalized = email.trim().toLowerCase();
  if (normalized === "instructor@demo.com") return "instructor";
  if (normalized.includes("admin")) return "admin";
  if (normalized.includes("instructor")) return "instructor";
  return "estudiante";
}

function resolvePlan(email: string, rol: UserRole): UserPlan {
  if (rol === "instructor" || rol === "admin") return "pro";
  if (email.toLowerCase().includes("pro")) return "pro";
  return "free";
}

export function buildUserFromEmail(email: string): User {
  const trimmed = email.trim().toLowerCase();
  const rol = resolveRole(trimmed);
  return {
    id: `saas-${Date.now()}`,
    email: trimmed,
    nombre: nombreFromEmail(trimmed),
    rol,
    plan: resolvePlan(trimmed, rol),
  };
}

export function buildGuestUser(): User {
  return {
    id: "saas-guest",
    email: "invitado@sonocritico.mx",
    nombre: "Invitado",
    rol: "estudiante",
    plan: "free",
  };
}
