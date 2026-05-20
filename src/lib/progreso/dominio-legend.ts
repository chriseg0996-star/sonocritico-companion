/** Bandas de dominio para leyenda visual (mockup progreso). */
export const DOMINIO_LEGEND = [
  { min: 90, max: 100, label: "Dominio alto", color: "#5d8fd4" },
  { min: 70, max: 89, label: "Avanzado", color: "#6fae95" },
  { min: 50, max: 69, label: "En progreso", color: "#c9b56a" },
  { min: 30, max: 49, label: "Explorando", color: "#9b8ec4" },
  { min: 0, max: 29, label: "Inicial", color: "#6d7785" },
] as const;

export function getDominioBandColor(percent: number): string {
  const band = DOMINIO_LEGEND.find((b) => percent >= b.min && percent <= b.max);
  return band?.color ?? DOMINIO_LEGEND[DOMINIO_LEGEND.length - 1]!.color;
}
