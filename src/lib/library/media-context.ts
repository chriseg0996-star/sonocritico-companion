import type { MediaItem } from "@/lib/media/types";
import { getMediaProtocolLink } from "@/lib/protocols/media-links";

export type MediaLibraryContext = {
  type: "Still" | "Clip" | "Still + clip";
  window: string;
  protocol: string;
};

/** Contexto breve para compare / viewer (sin descripción larga). */
export function getMediaLibraryContext(
  item: MediaItem,
  options?: { preferClip?: boolean },
): MediaLibraryContext {
  const hasStill = Boolean(item.still);
  const hasClip = Boolean(item.clip);
  const preferClip = options?.preferClip ?? false;

  let type: MediaLibraryContext["type"] = "Still";
  if (hasStill && hasClip) type = preferClip ? "Clip" : "Still + clip";
  else if (hasClip) type = "Clip";

  const window =
    item.metadata?.plane?.trim() ||
    item.metadata?.probe?.trim() ||
    item.category.replace(/-/g, " ");

  const link = getMediaProtocolLink(item.id);
  const protocol = link?.protocolTitle.replace(/ básico$/i, "").trim() ?? "—";

  return { type, window, protocol };
}
