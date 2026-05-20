export const GROWTH_LEGEND = [
  { id: "inicial", label: "Inicial", min: 0, max: 20 },
  { id: "explorando", label: "Explorando", min: 21, max: 40 },
  { id: "en-progreso", label: "En progreso", min: 41, max: 60 },
  { id: "avanzado", label: "Avanzado", min: 61, max: 80 },
  { id: "dominio-alto", label: "Dominio alto", min: 81, max: 100 },
] as const;

export function getGrowthStageLabel(percent: number): string {
  const stage = GROWTH_LEGEND.find((s) => percent >= s.min && percent <= s.max);
  return stage?.label ?? "Inicial";
}
