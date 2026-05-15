/** Auto-generated — npm run media:manifest */
import type { AtlasMediaType } from "@/lib/atlas/types";

export type ManifestMedia = {
  src: string;
  thumb: string;
  poster?: string;
  mime: AtlasMediaType | "video";
};

export const lungMediaManifest: Record<string, ManifestMedia> = {
  "a-lines/still": {
    "src": "/media/lung/a-lines/still.svg",
    "thumb": "/media/lung/a-lines/still.svg",
    "mime": "image"
  },
  "a-lines/clip": {
    "src": "/media/lung/a-lines/clip.svg",
    "thumb": "/media/lung/a-lines/still.svg",
    "mime": "image"
  },
  "b-lines/still": {
    "src": "/media/lung/b-lines/still.svg",
    "thumb": "/media/lung/b-lines/still.svg",
    "mime": "image"
  },
  "b-lines/clip": {
    "src": "/media/lung/b-lines/clip.svg",
    "thumb": "/media/lung/b-lines/still.svg",
    "mime": "image"
  },
  "consolidation/still": {
    "src": "/media/lung/consolidation/still.svg",
    "thumb": "/media/lung/consolidation/still.svg",
    "mime": "image"
  },
  "consolidation/clip": {
    "src": "/media/lung/consolidation/clip.svg",
    "thumb": "/media/lung/consolidation/still.svg",
    "mime": "image"
  },
  "lung-point/still": {
    "src": "/media/lung/lung-point/still.svg",
    "thumb": "/media/lung/lung-point/still.svg",
    "mime": "image"
  },
  "lung-point/clip": {
    "src": "/media/lung/lung-point/clip.svg",
    "thumb": "/media/lung/lung-point/still.svg",
    "mime": "image"
  },
  "plaps/still": {
    "src": "/media/lung/plaps/still.svg",
    "thumb": "/media/lung/plaps/still.svg",
    "mime": "image"
  },
  "pleural-effusion/still": {
    "src": "/media/lung/pleural-effusion/still.svg",
    "thumb": "/media/lung/pleural-effusion/still.svg",
    "mime": "image"
  }
};

export function getLungManifestMedia(category: string, slot: "still" | "clip"): ManifestMedia | undefined {
  return lungMediaManifest[`${category}/${slot}`];
}
