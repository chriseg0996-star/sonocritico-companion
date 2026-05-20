import { getEngineCases } from "@/lib/cases/registry";
import { clinicalCases } from "@/lib/mock-data";
import { getAllMediaItems, findMediaItemById } from "@/lib/media/manifests";
import type { MediaItem } from "@/lib/media/types";
import type { DailyTrainingItem, DailyTrainingPack } from "@/lib/training/daily-training-types";
import { buildViewerPath } from "@/lib/viewer/viewer-session";
import { todayKey } from "@/lib/training/daily-training-storage";

function hashDay(dateKey: string, salt: string): number {
  let h = 0;
  const s = `${dateKey}:${salt}`;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickIndex(length: number, dateKey: string, salt: string): number {
  if (length <= 0) return 0;
  return hashDay(dateKey, salt) % length;
}

function buildCasePool(): { id: string; title: string; subtitle: string; href: string }[] {
  const engine = getEngineCases().map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: c.tagline,
    href: `/casos/${c.id}`,
  }));
  const legacy = clinicalCases.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: "Caso clínico guiado",
    href: `/casos/${c.id}`,
  }));
  return [...engine, ...legacy];
}

function mediaLabel(item: MediaItem): string {
  return item.metadata?.finding?.trim() || item.title;
}

function mediaModuleId(item: MediaItem): string {
  const found = findMediaItemById(item.id);
  return found?.module ?? item.module;
}

function toFindingItem(item: MediaItem): DailyTrainingItem {
  const mod = mediaModuleId(item);
  return {
    kind: "finding",
    id: item.id,
    title: mediaLabel(item),
    subtitle: `${item.category} · imagen`,
    href: buildViewerPath(item.id, { module: mod }),
    minutes: 1,
  };
}

function toClipItem(item: MediaItem): DailyTrainingItem {
  const mod = mediaModuleId(item);
  return {
    kind: "clip",
    id: item.id,
    title: item.title,
    subtitle: "Clip POCUS",
    href: buildViewerPath(item.id, { module: mod, autoplay: true }),
    minutes: 1,
  };
}

/** Pack determinista del día (mismo contenido todo el día). */
export function getDailyTrainingPack(dateKey: string = todayKey()): DailyTrainingPack {
  const cases = buildCasePool();
  const allMedia = getAllMediaItems().filter((m) => m.still || m.clip);
  const findingPool = allMedia.length > 0 ? allMedia : getAllMediaItems();
  const clipPool = allMedia.filter((m) => m.clip);
  const clips = clipPool.length > 0 ? clipPool : findingPool;

  const caseEntry = cases[pickIndex(cases.length, dateKey, "case")] ?? cases[0]!;
  let findingEntry = findingPool[pickIndex(findingPool.length, dateKey, "finding")] ?? findingPool[0]!;
  let clipEntry = clips[pickIndex(clips.length, dateKey, "clip")] ?? clips[0]!;

  if (clips.length > 1 && findingEntry.id === clipEntry.id) {
    clipEntry = clips[(pickIndex(clips.length, dateKey, "clip") + 1) % clips.length]!;
  }

  return {
    dateKey,
    case: {
      kind: "case",
      id: caseEntry.id,
      title: caseEntry.title,
      subtitle: caseEntry.subtitle,
      href: caseEntry.href,
      minutes: 3,
    },
    finding: toFindingItem(findingEntry),
    clip: toClipItem(clipEntry),
  };
}

export const DAILY_TRAINING_ESTIMATE_MIN = 3;
