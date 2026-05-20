import type { CompanionLayoutHints, CompanionScreenKind } from "@/lib/layout-context/types";

export function resolveCompanionScreen(pathname: string): CompanionScreenKind | null {
  if (pathname.startsWith("/viewer/")) return "viewer";
  if (pathname.startsWith("/protocolos/") && pathname !== "/protocolos") return "protocol";
  if (pathname === "/guardia" || pathname.startsWith("/guardia/")) return "guardia";
  if (pathname.startsWith("/casos/") && pathname !== "/casos") return "case";
  return null;
}

export function shouldShowCompanionPanel(pathname: string): boolean {
  return resolveCompanionScreen(pathname) !== null;
}

export function mergeCompanionHints(
  pathname: string,
  hints?: CompanionLayoutHints,
): CompanionLayoutHints & { screen: CompanionScreenKind | null } {
  const screen = resolveCompanionScreen(pathname);
  const merged: CompanionLayoutHints & { screen: CompanionScreenKind | null } = {
    ...hints,
    screen,
  };

  if (screen === "viewer" && !merged.mediaId) {
    const id = pathname.replace(/^\/viewer\//, "").split("/")[0];
    if (id) merged.mediaId = decodeURIComponent(id);
  }

  if (screen === "protocol" && !merged.protocolSlug) {
    const slug = pathname.replace(/^\/protocolos\//, "").split("/")[0];
    if (slug) merged.protocolSlug = decodeURIComponent(slug);
  }

  if (screen === "case" && !merged.caseId) {
    const id = pathname.replace(/^\/casos\//, "").split("/")[0];
    if (id) merged.caseId = decodeURIComponent(id);
  }

  return merged;
}
