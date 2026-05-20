/** Rutas sin footer institucional global. */
const FOOTER_EXCLUDED_PREFIXES = ["/login"] as const;

export function shouldShowGlobalFooter(pathname: string | null): boolean {
  if (!pathname) return false;
  return !FOOTER_EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
