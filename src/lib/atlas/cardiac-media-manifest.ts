/** Auto-generated — npm run media:cardiac */
import type { AtlasMediaType } from "@/lib/atlas/types";

export type ManifestMedia = {
  src: string;
  thumb: string;
  poster?: string;
  mime: AtlasMediaType | "video";
};

export const cardiacMediaManifest: Record<string, ManifestMedia> = {
  "a4c-fevi-reduced/still": {
    "src": "/media/cardiac/a4c-fevi-reduced/still.svg",
    "thumb": "/media/cardiac/a4c-fevi-reduced/still.svg",
    "mime": "image"
  },
  "fevi-hyperdynamic/still": {
    "src": "/media/cardiac/fevi-hyperdynamic/still.svg",
    "thumb": "/media/cardiac/fevi-hyperdynamic/still.svg",
    "mime": "image"
  },
  "ivc-normal/still": {
    "src": "/media/cardiac/ivc-normal/still.svg",
    "thumb": "/media/cardiac/ivc-normal/still.svg",
    "mime": "image"
  },
  "ivc-plethoric/still": {
    "src": "/media/cardiac/ivc-plethoric/still.svg",
    "thumb": "/media/cardiac/ivc-plethoric/still.svg",
    "mime": "image"
  },
  "pericardial-effusion/still": {
    "src": "/media/cardiac/pericardial-effusion/still.svg",
    "thumb": "/media/cardiac/pericardial-effusion/still.svg",
    "mime": "image"
  },
  "pericardial-effusion/clip": {
    "src": "/media/cardiac/pericardial-effusion/clip.svg",
    "thumb": "/media/cardiac/pericardial-effusion/still.svg",
    "mime": "image"
  },
  "plax-normal/still": {
    "src": "/media/cardiac/plax-normal/still.svg",
    "thumb": "/media/cardiac/plax-normal/still.svg",
    "mime": "image"
  },
  "plax-normal/clip": {
    "src": "/media/cardiac/plax-normal/clip.svg",
    "thumb": "/media/cardiac/plax-normal/still.svg",
    "mime": "image"
  },
  "psax-mitral/still": {
    "src": "/media/cardiac/psax-mitral/still.svg",
    "thumb": "/media/cardiac/psax-mitral/still.svg",
    "mime": "image"
  },
  "rv-dilated/still": {
    "src": "/media/cardiac/rv-dilated/still.svg",
    "thumb": "/media/cardiac/rv-dilated/still.svg",
    "mime": "image"
  },
  "septum-d-shape/still": {
    "src": "/media/cardiac/septum-d-shape/still.svg",
    "thumb": "/media/cardiac/septum-d-shape/still.svg",
    "mime": "image"
  },
  "subxiphoid-normal/still": {
    "src": "/media/cardiac/subxiphoid-normal/still.svg",
    "thumb": "/media/cardiac/subxiphoid-normal/still.svg",
    "mime": "image"
  },
  "tamponade/still": {
    "src": "/media/cardiac/tamponade/still.svg",
    "thumb": "/media/cardiac/tamponade/still.svg",
    "mime": "image"
  }
};

export function getCardiacManifestMedia(category: string, slot: "still" | "clip"): ManifestMedia | undefined {
  return cardiacMediaManifest[`${category}/${slot}`];
}
