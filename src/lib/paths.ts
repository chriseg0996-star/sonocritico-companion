/** Prefijo opcional vía NEXT_PUBLIC_BASE_PATH. Vacío con dominio propio en raíz. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Rutas y assets en public/ bajo subpath del repo. */
export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  if (!basePath) return path;
  return `${basePath}${path}`;
}
