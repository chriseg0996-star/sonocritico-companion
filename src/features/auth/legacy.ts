import type { User as SaasUser } from "@/features/auth/types";
import type { User as LegacyUser } from "@/types";

export function toLegacyUser(user: SaasUser): LegacyUser {
  const role =
    user.rol === "instructor" || user.rol === "admin" ? "instructor" : "student";
  const parts = user.nombre.split(/\s+/).filter(Boolean);
  const initials =
    parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("") || "SC";

  return {
    id: user.id,
    email: user.email,
    name: user.nombre,
    initials,
    role,
    courseCode: "SONO2024",
    specialty: "urgencias",
  };
}
