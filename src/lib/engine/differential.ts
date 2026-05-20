import { getDiagnosisLabel, isCriticalDiagnosis } from "@/lib/decision/diagnoses";
import { CTA_RULES, DEFAULT_CTAS, SCORE_RULES } from "@/lib/decision/rules";
import type { CtaRule, ScoreRule } from "@/lib/decision/rules/types";
import type {
  DiagnosisId,
  DifferentialCtas,
  DifferentialInput,
  DifferentialResult,
  ScoredDiagnosis,
} from "@/lib/decision/types";

const PROBABLE_LIMIT = 4;
const DONT_MISS_LIMIT = 4;
const MIN_SCORE_FOR_LIST = 1;

function ruleMatches(rule: ScoreRule, input: DifferentialInput): boolean {
  const { when } = rule;
  if (when.symptoms && !when.symptoms.includes(input.symptomId)) return false;
  if (when.findings && !when.findings.includes(input.findingId)) return false;
  if (when.contexts && !when.contexts.includes(input.contextId)) return false;
  return true;
}

function ctaRuleMatches(rule: CtaRule, input: DifferentialInput): boolean {
  const { when } = rule;
  if (when.symptoms && !when.symptoms.includes(input.symptomId)) return false;
  if (when.findings && !when.findings.includes(input.findingId)) return false;
  return true;
}

function resolveCtas(input: DifferentialInput): DifferentialCtas {
  const specific = CTA_RULES.find((r) => ctaRuleMatches(r, input));
  if (specific) return specific.ctas;
  const symptomOnly = CTA_RULES.find(
    (r) => r.when.symptoms?.includes(input.symptomId) && !r.when.findings,
  );
  return symptomOnly?.ctas ?? DEFAULT_CTAS;
}

function resolveNextStudy(matched: ScoreRule[]): string {
  for (const rule of matched) {
    if (rule.nextStudy) return rule.nextStudy;
  }
  const fallback = CTA_RULES.find((r) => r.defaultNextStudy);
  return fallback?.defaultNextStudy ?? "Completar ventana US pendiente y correlacionar clínica + laboratorio.";
}

function toPercent(score: number, maxScore: number): number {
  if (maxScore <= 0) return 0;
  return Math.round((score / maxScore) * 100);
}

function buildScoredList(
  totals: Map<DiagnosisId, number>,
  ids: DiagnosisId[],
): ScoredDiagnosis[] {
  const max = Math.max(...ids.map((id) => totals.get(id) ?? 0), 1);
  return ids
    .map((id) => {
      const score = totals.get(id) ?? 0;
      return {
        id,
        label: getDiagnosisLabel(id),
        score,
        percent: toPercent(score, max),
      };
    })
    .filter((d) => d.score >= MIN_SCORE_FOR_LIST)
    .sort((a, b) => b.score - a.score);
}

/** Motor de diferencial — score por reglas, sin IA. */
export function analyzeDifferential(input: DifferentialInput): DifferentialResult {
  const totals = new Map<DiagnosisId, number>();
  const dontMissSet = new Set<DiagnosisId>();
  const matchedRules: ScoreRule[] = [];

  for (const rule of SCORE_RULES) {
    if (!ruleMatches(rule, input)) continue;
    matchedRules.push(rule);
    for (const [id, points] of Object.entries(rule.add)) {
      if (!points) continue;
      const dx = id as DiagnosisId;
      totals.set(dx, (totals.get(dx) ?? 0) + points);
    }
    rule.dontMiss?.forEach((id) => dontMissSet.add(id));
  }

  const allScored = buildScoredList(totals, [...totals.keys()]);
  const probable = allScored.slice(0, PROBABLE_LIMIT);

  const probableIds = new Set(probable.map((d) => d.id));
  for (const d of allScored) {
    if (isCriticalDiagnosis(d.id) && d.score >= MIN_SCORE_FOR_LIST) {
      dontMissSet.add(d.id);
    }
  }

  const dontMiss = buildScoredList(totals, [...dontMissSet])
    .filter((d) => !probableIds.has(d.id) || isCriticalDiagnosis(d.id))
    .slice(0, DONT_MISS_LIMIT);

  if (dontMiss.length === 0 && probable.length > 0) {
    const criticalFallback = allScored.filter((d) => isCriticalDiagnosis(d.id)).slice(0, 2);
    dontMiss.push(...criticalFallback.filter((d) => !probableIds.has(d.id)));
  }

  return {
    input,
    probable,
    dontMiss,
    nextStudy: resolveNextStudy(matchedRules),
    ctas: resolveCtas(input),
    analyzedAt: new Date().toISOString(),
  };
}
