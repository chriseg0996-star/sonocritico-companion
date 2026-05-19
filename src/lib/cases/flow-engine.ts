import type {
  AdaptiveCaseGraph,
  CaseOutcome,
  CaseRouteEntry,
  DecisionNode,
  InteractiveClinicalCase,
} from "@/lib/cases/types";

const GRADED_KINDS = new Set(["protocol", "window", "finding", "conduct"]);

export function getDecisionNode(
  graph: AdaptiveCaseGraph,
  nodeId: string,
): DecisionNode | null {
  return graph.nodes[nodeId] ?? null;
}

export function findBranch(
  graph: AdaptiveCaseGraph,
  fromNodeId: string,
  choiceId: string,
) {
  return graph.branches.find((b) => b.fromNodeId === fromNodeId && b.choiceId === choiceId);
}

export function resolveTransition(
  graph: AdaptiveCaseGraph,
  fromNodeId: string,
  choiceId: string,
): { type: "node"; nodeId: string } | { type: "outcome"; outcomeId: string } | null {
  const branch = findBranch(graph, fromNodeId, choiceId);
  if (!branch) return null;
  if (branch.outcomeId) return { type: "outcome", outcomeId: branch.outcomeId };
  if (branch.nextNodeId) return { type: "node", nodeId: branch.nextNodeId };
  return null;
}

export function getOutcome(graph: AdaptiveCaseGraph, outcomeId: string): CaseOutcome | null {
  return graph.outcomes[outcomeId] ?? null;
}

export function pointsForChoice(node: DecisionNode, choiceId: string): number {
  if (!GRADED_KINDS.has(node.kind)) return 0;
  const choice = node.choices.find((c) => c.id === choiceId);
  return choice?.isOptimal ? 25 : 0;
}

export function appendRouteEntry(
  route: CaseRouteEntry[],
  node: DecisionNode,
  choiceId: string,
): CaseRouteEntry[] {
  const choice = node.choices.find((c) => c.id === choiceId);
  return [
    ...route,
    {
      nodeId: node.id,
      choiceId,
      isOptimal: choice?.isOptimal ?? false,
      points: pointsForChoice(node, choiceId),
      at: new Date().toISOString(),
    },
  ];
}

/** Score parcial 0–100 según puntos en nodos graduados de la ruta. */
export function computePartialScore(route: CaseRouteEntry[], graph: AdaptiveCaseGraph): number {
  let total = 0;
  let max = 0;
  for (const entry of route) {
    const node = graph.nodes[entry.nodeId];
    if (!node || !GRADED_KINDS.has(node.kind)) continue;
    max += 25;
    total += entry.points;
  }
  if (max === 0) return 100;
  return Math.round((total / max) * 100);
}

export function pickOutcomeForRoute(
  caseDef: InteractiveClinicalCase,
  route: CaseRouteEntry[],
  resolvedOutcomeId?: string,
): CaseOutcome {
  const graph = caseDef.graph!;
  if (resolvedOutcomeId) {
    const o = getOutcome(graph, resolvedOutcomeId);
    if (o) return o;
  }
  const score = computePartialScore(route, graph);
  if (score >= 90) {
    return graph.outcomes["outcome-optimal"] ?? Object.values(graph.outcomes)[0];
  }
  if (score >= 55) {
    return graph.outcomes["outcome-partial"] ?? graph.outcomes["outcome-optimal"];
  }
  const fallback = Object.values(graph.outcomes)[0];
  return graph.outcomes["outcome-incorrect"] ?? fallback ?? {
    id: "unknown",
    title: "Resultado",
    explanation: "",
    teachingPoint: "",
    pathType: "partial",
  };
}
