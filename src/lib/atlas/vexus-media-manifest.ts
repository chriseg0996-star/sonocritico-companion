/** Auto-generated — npm run media:vexus */
import type { AtlasMediaType } from "@/lib/atlas/types";

export type ManifestMedia = {
  src: string;
  thumb: string;
  poster?: string;
  mime: AtlasMediaType | "video";
};

export const vexusMediaManifest: Record<string, ManifestMedia> = {
  "hepatic-s-inversion/still": {
    "src": "/media/vexus/hepatic-s-inversion/still.svg",
    "thumb": "/media/vexus/hepatic-s-inversion/still.svg",
    "mime": "image"
  },
  "hepatic-s-normal/still": {
    "src": "/media/vexus/hepatic-s-normal/still.svg",
    "thumb": "/media/vexus/hepatic-s-normal/still.svg",
    "mime": "image"
  },
  "hepatic-s-normal/clip": {
    "src": "/media/vexus/hepatic-s-normal/clip.svg",
    "thumb": "/media/vexus/hepatic-s-normal/still.svg",
    "mime": "image"
  },
  "ivc-normal/still": {
    "src": "/media/vexus/ivc-normal/still.svg",
    "thumb": "/media/vexus/ivc-normal/still.svg",
    "mime": "image"
  },
  "ivc-plethoric/still": {
    "src": "/media/vexus/ivc-plethoric/still.svg",
    "thumb": "/media/vexus/ivc-plethoric/still.svg",
    "mime": "image"
  },
  "portal-normal/still": {
    "src": "/media/vexus/portal-normal/still.svg",
    "thumb": "/media/vexus/portal-normal/still.svg",
    "mime": "image"
  },
  "portal-normal/clip": {
    "src": "/media/vexus/portal-normal/clip.svg",
    "thumb": "/media/vexus/portal-normal/still.svg",
    "mime": "image"
  },
  "portal-pulsatile/still": {
    "src": "/media/vexus/portal-pulsatile/still.svg",
    "thumb": "/media/vexus/portal-pulsatile/still.svg",
    "mime": "image"
  },
  "portal-pulsatile/clip": {
    "src": "/media/vexus/portal-pulsatile/clip.svg",
    "thumb": "/media/vexus/portal-pulsatile/still.svg",
    "mime": "image"
  },
  "renal-continuous/still": {
    "src": "/media/vexus/renal-continuous/still.svg",
    "thumb": "/media/vexus/renal-continuous/still.svg",
    "mime": "image"
  },
  "renal-discontinuous/still": {
    "src": "/media/vexus/renal-discontinuous/still.svg",
    "thumb": "/media/vexus/renal-discontinuous/still.svg",
    "mime": "image"
  },
  "renal-discontinuous/clip": {
    "src": "/media/vexus/renal-discontinuous/clip.svg",
    "thumb": "/media/vexus/renal-discontinuous/still.svg",
    "mime": "image"
  },
  "vexus-severe/still": {
    "src": "/media/vexus/vexus-severe/still.svg",
    "thumb": "/media/vexus/vexus-severe/still.svg",
    "mime": "image"
  }
};

export function getVexusManifestMedia(category: string, slot: "still" | "clip"): ManifestMedia | undefined {
  return vexusMediaManifest[`${category}/${slot}`];
}
