import type { MediaItem } from "@/lib/media/types";
import { MEDIA_MODULE_LABELS, type AtlasFilterModule } from "@/lib/media/atlas-filters";
import { getMediaProtocolLink } from "@/lib/protocols/media-links";
import { buildProtocolStepUrl } from "@/lib/protocols/protocol-navigation";
import { buildViewerPath } from "@/lib/viewer/viewer-session";

export type ViewerBreadcrumbItem = {
  label: string;
  href?: string;
};

export function buildViewerBreadcrumb(
  item: MediaItem,
  options?: { module?: string },
): ViewerBreadcrumbItem[] {
  const mod = (options?.module ?? item.module) as AtlasFilterModule;
  const moduleLabel =
    MEDIA_MODULE_LABELS[mod as keyof typeof MEDIA_MODULE_LABELS] ?? item.module;
  const protocol = getMediaProtocolLink(item.id);

  const crumbs: ViewerBreadcrumbItem[] = [
    {
      label: moduleLabel,
      href: `/biblioteca?module=${encodeURIComponent(mod)}`,
    },
  ];

  if (protocol) {
    const protocolLabel = protocol.protocolTitle.replace(/ básico$/i, "").trim();
    crumbs.push({
      label: protocolLabel,
      href: buildProtocolStepUrl(protocol.protocolSlug, protocol.stepId, {
        mediaId: item.id,
      }),
    });
  }

  crumbs.push({ label: item.title });
  return crumbs;
}

export function bibliotecaReturnHref(session: { lastModule?: string | null; lastScrollY?: number }) {
  const params = new URLSearchParams();
  if (session.lastModule) params.set("module", session.lastModule);
  if (session.lastScrollY && session.lastScrollY > 0) {
    params.set("scroll", String(Math.round(session.lastScrollY)));
  }
  const q = params.toString();
  return `/biblioteca${q ? `?${q}` : ""}`;
}
