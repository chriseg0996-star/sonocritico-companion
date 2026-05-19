import { withBasePath } from "@/lib/paths";

/** Shell mínimo para atlas en guardia (sin sync ni rutas dinámicas). */
export function getCriticalShellPaths(): string[] {
  return ["/", "/biblioteca/", "/offline.html"];
}

export function getCriticalShellUrls(): string[] {
  return getCriticalShellPaths().map(withBasePath);
}
