export type NavigationContextKind = "default" | "viewer" | "case" | "guardia";

export type NavigationContext = {
  kind: NavigationContextKind;
  pathname: string;
  mediaId?: string;
  caseId?: string;
  fromProtocol?: string | null;
  fromStep?: string | null;
};

export function resolveNavigationContext(
  pathname: string,
  hints?: Partial<Pick<NavigationContext, "mediaId" | "caseId" | "fromProtocol" | "fromStep">>,
): NavigationContext {
  if (pathname.startsWith("/viewer/")) {
    const mediaId =
      hints?.mediaId ?? decodeURIComponent(pathname.replace(/^\/viewer\//, "").split("/")[0] ?? "");
    return {
      kind: "viewer",
      pathname,
      mediaId: mediaId || undefined,
      fromProtocol: hints?.fromProtocol ?? null,
      fromStep: hints?.fromStep ?? null,
    };
  }

  if (pathname === "/guardia" || pathname.startsWith("/guardia/")) {
    return { kind: "guardia", pathname };
  }

  const caseMatch = pathname.match(/^\/casos\/([^/]+)/);
  if (caseMatch) {
    return { kind: "case", pathname, caseId: hints?.caseId ?? caseMatch[1] };
  }

  return { kind: "default", pathname };
}

export function shouldShowQuickActions(pathname: string): boolean {
  return pathname !== "/login" && !pathname.startsWith("/login/");
}
