const EVOLUTION_KEY = "sonocritico-knowledge-evolution";

export type EvolutionSnapshot = {
  date: string;
  percent: number;
};

export type EvolutionNode = {
  id: string;
  label: string;
  percent: number;
  current?: boolean;
};

function loadHistory(): EvolutionSnapshot[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(EVOLUTION_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as EvolutionSnapshot[];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s.percent === "number") : [];
  } catch {
    return [];
  }
}

function saveHistory(items: EvolutionSnapshot[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EVOLUTION_KEY, JSON.stringify(items.slice(-12)));
  } catch {
    /* quota */
  }
}

/** Registra el % global al visitar progreso (máx. un punto por día). */
export function recordEvolutionSnapshot(percent: number): void {
  const items = loadHistory();
  const today = new Date().toISOString().slice(0, 10);
  const last = items[items.length - 1];

  if (last?.date === today) {
    if (Math.abs(last.percent - percent) < 1) return;
    items[items.length - 1] = { date: today, percent };
  } else {
    items.push({ date: today, percent });
  }
  saveHistory(items);
}

function formatNodeLabel(date: string, index: number, total: number): string {
  if (index === total - 1) return "Actual";
  if (index === 0) return "Inicio";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return `Paso ${index + 1}`;
  return d.toLocaleDateString("es", { month: "short", day: "numeric" });
}

function syntheticNodes(currentPercent: number): EvolutionNode[] {
  const p = Math.round(currentPercent);
  const a = Math.max(0, Math.round(p * 0.35));
  const b = Math.max(a + 1, Math.round(p * 0.62));
  return [
    { id: "syn-0", label: "Inicio", percent: Math.min(a, p) },
    { id: "syn-1", label: "Explorando", percent: Math.min(b, p) },
    { id: "syn-2", label: "Actual", percent: p, current: true },
  ];
}

export function getEvolutionNodes(currentPercent: number): EvolutionNode[] {
  const history = loadHistory();
  const p = Math.round(currentPercent);

  if (history.length === 0) return syntheticNodes(p);

  if (history.length === 1) {
    const only = history[0]!;
    return [
      { id: "h-0", label: "Inicio", percent: only.percent },
      { id: "h-1", label: "Actual", percent: p, current: true },
    ];
  }

  const picked =
    history.length <= 4
      ? history
      : [history[0]!, history[Math.floor(history.length / 2)]!, history[history.length - 2]!, history[history.length - 1]!];

  const nodes: EvolutionNode[] = picked.map((snap, i) => ({
    id: `h-${snap.date}-${i}`,
    label: formatNodeLabel(snap.date, i, picked.length),
    percent: snap.percent,
    current: i === picked.length - 1,
  }));

  const last = nodes[nodes.length - 1];
  if (last) {
    last.percent = p;
    last.current = true;
    last.label = "Actual";
  }

  return nodes;
}
