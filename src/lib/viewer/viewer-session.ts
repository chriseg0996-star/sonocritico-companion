import type { AtlasFilterModule } from "@/lib/media/atlas-filters";

const SESSION_KEY = "sonocritico-viewer-session";
const SAVED_KEY = "sonocritico-saved-findings";

export type ViewerSession = {
  lastMediaId: string | null;
  lastModule: AtlasFilterModule | string | null;
  lastProtocolSlug: string | null;
  lastProtocolStepId: string | null;
  lastScrollY: number;
  lastPath: string | null;
};

const DEFAULT_SESSION: ViewerSession = {
  lastMediaId: null,
  lastModule: null,
  lastProtocolSlug: null,
  lastProtocolStepId: null,
  lastScrollY: 0,
  lastPath: null,
};

export function loadViewerSession(): ViewerSession {
  if (typeof window === "undefined") return DEFAULT_SESSION;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return DEFAULT_SESSION;
    return { ...DEFAULT_SESSION, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SESSION;
  }
}

export function saveViewerSession(partial: Partial<ViewerSession>): ViewerSession {
  const next = { ...loadViewerSession(), ...partial };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    } catch {
      /* quota */
    }
  }
  return next;
}

export function buildViewerPath(
  mediaId: string,
  options?: {
    module?: string;
    scroll?: number;
    autoplay?: boolean;
    fromProtocol?: string;
    fromStep?: string;
    errors?: boolean;
  },
): string {
  const params = new URLSearchParams();
  if (options?.module) params.set("module", options.module);
  if (options?.scroll !== undefined && options.scroll > 0) {
    params.set("scroll", String(Math.round(options.scroll)));
  }
  if (options?.autoplay) params.set("autoplay", "1");
  if (options?.fromProtocol) params.set("fromProtocol", options.fromProtocol);
  if (options?.fromStep) params.set("fromStep", options.fromStep);
  if (options?.errors) params.set("errors", "1");
  const q = params.toString();
  return `/viewer/${encodeURIComponent(mediaId)}${q ? `?${q}` : ""}`;
}

export function loadSavedFindings(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function isFindingSaved(mediaId: string): boolean {
  return loadSavedFindings().includes(mediaId);
}

export function toggleSavedFinding(mediaId: string): boolean {
  const set = new Set(loadSavedFindings());
  if (set.has(mediaId)) set.delete(mediaId);
  else set.add(mediaId);
  const next = [...set];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    } catch {
      /* quota */
    }
  }
  return set.has(mediaId);
}
