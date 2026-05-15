/** Auto-generated — npm run media:fast */
import type { AtlasMediaType } from "@/lib/atlas/types";

export type ManifestMedia = {
  src: string;
  thumb: string;
  poster?: string;
  mime: AtlasMediaType | "video";
};

export const fastMediaManifest: Record<string, ManifestMedia> = {
  "hemothorax/still": {
    "src": "/media/fast/hemothorax/still.svg",
    "thumb": "/media/fast/hemothorax/still.svg",
    "mime": "image"
  },
  "luq-fluid/still": {
    "src": "/media/fast/luq-fluid/still.svg",
    "thumb": "/media/fast/luq-fluid/still.svg",
    "mime": "image"
  },
  "luq-normal/still": {
    "src": "/media/fast/luq-normal/still.svg",
    "thumb": "/media/fast/luq-normal/still.svg",
    "mime": "image"
  },
  "pelvis-fluid/still": {
    "src": "/media/fast/pelvis-fluid/still.svg",
    "thumb": "/media/fast/pelvis-fluid/still.svg",
    "mime": "image"
  },
  "pelvis-normal/still": {
    "src": "/media/fast/pelvis-normal/still.svg",
    "thumb": "/media/fast/pelvis-normal/still.svg",
    "mime": "image"
  },
  "pericardial-effusion/still": {
    "src": "/media/fast/pericardial-effusion/still.svg",
    "thumb": "/media/fast/pericardial-effusion/still.svg",
    "mime": "image"
  },
  "pleural-sliding/still": {
    "src": "/media/fast/pleural-sliding/still.svg",
    "thumb": "/media/fast/pleural-sliding/still.svg",
    "mime": "image"
  },
  "pleural-sliding/clip": {
    "src": "/media/fast/pleural-sliding/clip.svg",
    "thumb": "/media/fast/pleural-sliding/still.svg",
    "mime": "image"
  },
  "pneumothorax/still": {
    "src": "/media/fast/pneumothorax/still.svg",
    "thumb": "/media/fast/pneumothorax/still.svg",
    "mime": "image"
  },
  "ruq-fluid/still": {
    "src": "/media/fast/ruq-fluid/still.svg",
    "thumb": "/media/fast/ruq-fluid/still.svg",
    "mime": "image"
  },
  "ruq-fluid/clip": {
    "src": "/media/fast/ruq-fluid/clip.svg",
    "thumb": "/media/fast/ruq-fluid/still.svg",
    "mime": "image"
  },
  "ruq-normal/still": {
    "src": "/media/fast/ruq-normal/still.svg",
    "thumb": "/media/fast/ruq-normal/still.svg",
    "mime": "image"
  },
  "subxiphoid-normal/still": {
    "src": "/media/fast/subxiphoid-normal/still.svg",
    "thumb": "/media/fast/subxiphoid-normal/still.svg",
    "mime": "image"
  }
};

export function getFastManifestMedia(category: string, slot: "still" | "clip"): ManifestMedia | undefined {
  return fastMediaManifest[`${category}/${slot}`];
}
