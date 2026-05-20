import { getEngineCase } from "@/lib/cases/registry";
import { getModule } from "@/lib/course-modules";
import { findMediaItemById } from "@/lib/media/manifests";
import { patchSmartResumeState } from "@/lib/resume/storage";
import { buildViewerPath } from "@/lib/viewer/viewer-session";

function now(): string {
  return new Date().toISOString();
}

export function recordLastModule(slug: string, stepIndex: number, stepTitle?: string): void {
  patchSmartResumeState({
    module: {
      slug,
      stepIndex,
      stepTitle,
      href: `/modulos/${slug}?step=${stepIndex}`,
      at: now(),
    },
  });
}

export function recordLastClip(mediaId: string, module?: string): void {
  const found = findMediaItemById(mediaId);
  const label = found?.item.title ?? mediaId;
  const mod = module ?? found?.module;
  patchSmartResumeState({
    clip: {
      mediaId,
      module: mod,
      label,
      href: buildViewerPath(mediaId, mod ? { module: mod } : undefined),
      at: now(),
    },
  });
}

export function recordLastCase(caseId: string, label?: string): void {
  const engine = getEngineCase(caseId);
  patchSmartResumeState({
    case: {
      caseId,
      label: label ?? engine?.title ?? caseId,
      href: `/casos/${caseId}`,
      at: now(),
    },
  });
}

export function recordLastSearch(query: string): void {
  const trimmed = query.trim();
  if (trimmed.length < 2) return;
  patchSmartResumeState({
    search: {
      query: trimmed,
      href: `/biblioteca?q=${encodeURIComponent(trimmed)}`,
      at: now(),
    },
  });
}
