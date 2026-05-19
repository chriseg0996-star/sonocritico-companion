import type { SonocriticLevel, SonocriticLevelId } from "@/lib/learning/types";

export const SONOCRITIC_LEVELS: SonocriticLevel[] = [
  { id: "novato", label: "Novato", minXp: 0 },
  { id: "explorador", label: "Explorador", minXp: 150 },
  { id: "operador", label: "Operador", minXp: 400 },
  { id: "sonocritico", label: "Sonocrítico", minXp: 800 },
  { id: "instructor", label: "Instructor", minXp: 1400 },
];

export function getLevelForXp(xp: number): SonocriticLevel {
  let current = SONOCRITIC_LEVELS[0]!;
  for (const level of SONOCRITIC_LEVELS) {
    if (xp >= level.minXp) current = level;
  }
  return current;
}

export function getNextLevel(levelId: SonocriticLevelId): SonocriticLevel | null {
  const idx = SONOCRITIC_LEVELS.findIndex((l) => l.id === levelId);
  if (idx < 0 || idx >= SONOCRITIC_LEVELS.length - 1) return null;
  return SONOCRITIC_LEVELS[idx + 1] ?? null;
}

export function levelProgressPercent(xp: number, level: SonocriticLevel, next: SonocriticLevel | null): number {
  if (!next) return 100;
  const span = next.minXp - level.minXp;
  if (span <= 0) return 100;
  return Math.min(100, Math.round(((xp - level.minXp) / span) * 100));
}
