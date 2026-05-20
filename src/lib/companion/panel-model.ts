import type { CompanionPanelModel, CompanionPanelSection } from "@/lib/companion/panel-types";
import { getContextLabel, getFindingLabel, getSymptomLabel } from "@/lib/decision";
import { loadDifferentialHistory } from "@/lib/engine/storage";
import { getCase } from "@/lib/mock-data";
import { isEngineCaseId, getEngineCase } from "@/lib/cases";
import { loadCaseRoute, loadCaseResume } from "@/lib/cases/case-storage";
import { computePartialScore, getDecisionNode } from "@/lib/cases/flow-engine";
import { findComparisonForMediaId } from "@/lib/compare";
import { buildComparePath } from "@/lib/compare/compare-navigation";
import type { CompanionLayoutHints } from "@/lib/layout-context";
import type { CompanionScreenKind } from "@/lib/layout-context";
import { findMediaItemById, getMediaForModule } from "@/lib/media/manifests";
import { getInteractiveProtocol } from "@/lib/protocols";
import { getMediaProtocolLink } from "@/lib/protocols/media-links";
import { buildAtlasMediaUrl, buildProtocolStepUrl } from "@/lib/protocols/protocol-navigation";
import { buildViewerPath } from "@/lib/viewer/viewer-session";
import {
  getWorkflowComplaintById,
  getNextQuestion,
  getStepsRemaining,
  isWorkflowComplete,
  loadWorkflowLastFlow,
  resolveRoute,
} from "@/lib/workflow";
import { getStudyHref } from "@/lib/study-links";

const CALC_BY_PROTOCOL: Record<string, { label: string; href: string }> = {
  blue: { label: "LUS / BLUE", href: "/herramientas/lus" },
  rush: { label: "RUSH · shock", href: "/herramientas/shock" },
  vexus: { label: "VExUS score", href: "/herramientas/vexus" },
  fast: { label: "Shock rápido", href: "/herramientas/shock" },
};

function buildViewerPanel(hints: CompanionLayoutHints): CompanionPanelModel | null {
  const mediaId = hints.mediaId;
  if (!mediaId) return null;

  const found = findMediaItemById(mediaId);
  const protocolLink = getMediaProtocolLink(mediaId);
  const sections: CompanionPanelSection[] = [];

  if (protocolLink) {
    sections.push({
      title: "Protocolo relacionado",
      items: [
        {
          label: protocolLink.protocolTitle,
          href: buildProtocolStepUrl(protocolLink.protocolSlug, protocolLink.stepId, { mediaId }),
          meta: protocolLink.stepTitle,
        },
      ],
    });
  } else if (hints.fromProtocol) {
    sections.push({
      title: "Protocolo relacionado",
      items: [
        {
          label: "Volver al protocolo",
          href: buildProtocolStepUrl(hints.fromProtocol, hints.fromStep ?? "0", { mediaId }),
        },
      ],
    });
  }

  const similar: CompanionPanelModel["sections"][0]["items"] = [];
  const comparison = findComparisonForMediaId(mediaId);
  if (comparison) {
    const otherId =
      comparison.referenceMediaId === mediaId
        ? comparison.compareMediaId
        : comparison.referenceMediaId;
    similar.push({
      label: comparison.title,
      href: buildComparePath(comparison.id, { fromMedia: mediaId }),
      meta: "Comparar par",
    });
    similar.push({
      label: "Abrir hallazgo relacionado",
      href: buildViewerPath(otherId, { module: comparison.module }),
    });
  }

  if (found) {
    const peers = getMediaForModule(found.module)
      .filter((m) => m.id !== mediaId)
      .slice(0, 3);
    for (const peer of peers) {
      similar.push({
        label: peer.title,
        href: buildViewerPath(peer.id, { module: found.module }),
        meta: found.module,
      });
    }
  }

  if (similar.length > 0) {
    sections.push({ title: "Similares", items: similar });
  }

  return {
    title: found?.item.title ?? "Hallazgo",
    subtitle: found?.item.category.replace(/-/g, " "),
    sections,
    footnote: protocolLink?.interpretation,
  };
}

function buildProtocolPanel(hints: CompanionLayoutHints): CompanionPanelModel | null {
  const slug = hints.protocolSlug;
  if (!slug) return null;

  const protocol = getInteractiveProtocol(slug);
  if (!protocol) return null;

  const stepId = hints.protocolStepId ?? protocol.startStepId;
  const step = protocol.steps[stepId] ?? protocol.steps[protocol.startStepId];

  const atlasItems =
    step?.actions
      ?.filter((a) => a.kind === "atlas" && a.href)
      .map((a) => ({ label: a.label, href: a.href! })) ?? [];

  if (atlasItems.length === 0 && hints.mediaId) {
    atlasItems.push({
      label: "Atlas del paso",
      href: buildAtlasMediaUrl(hints.mediaId, { protocolSlug: slug, stepId }),
    });
  }

  const calc = CALC_BY_PROTOCOL[slug];
  const calcItems = calc ? [calc] : [];
  step?.actions
    ?.filter((a) => a.kind === "calculator" && a.href)
    .forEach((a) => calcItems.push({ label: a.label, href: a.href! }));

  const sections: CompanionPanelSection[] = [];
  if (atlasItems.length > 0) sections.push({ title: "Atlas relacionado", items: atlasItems });
  if (calcItems.length > 0) sections.push({ title: "Calculadoras", items: calcItems });

  return {
    title: protocol.title,
    subtitle: step?.title ?? protocol.subtitle,
    sections,
    footnote: step?.context,
  };
}

function buildGuardiaPanel(): CompanionPanelModel {
  const workflow = loadWorkflowLastFlow();
  const sections: CompanionPanelSection[] = [];

  if (workflow) {
    const complaint = getWorkflowComplaintById(workflow.complaintId);
    if (complaint) {
      const remaining = getStepsRemaining(complaint, workflow.answers);
      const route = isWorkflowComplete(complaint, workflow.answers)
        ? resolveRoute(complaint, workflow.answers)
        : null;
      const nextQ = getNextQuestion(complaint, workflow.answers);

      const items: CompanionPanelModel["sections"][0]["items"] = [];
      if (route) {
        items.push({
          label: route.summary,
          href: route.outputs[0]?.href ?? "/guardia",
          meta: `~${route.estimatedMinutes} min`,
        });
        route.outputs.slice(0, 3).forEach((o) => {
          items.push({ label: o.label, href: o.href, meta: o.kind });
        });
      } else if (nextQ) {
        items.push({
          label: nextQ.prompt,
          href: "/guardia",
          meta: `${remaining} paso${remaining === 1 ? "" : "s"} restante${remaining === 1 ? "" : "s"}`,
        });
      }

      sections.push({
        title: "Flujo clínico",
        items:
          items.length > 0
            ? items
            : [{ label: complaint.label, href: "/guardia", meta: "En curso" }],
      });
    }
  }

  const dx = loadDifferentialHistory()[0];
  if (dx) {
    sections.push({
      title: "Diferencial reciente",
      items: [
        {
          label: `${getSymptomLabel(dx.input.symptomId)} · ${getFindingLabel(dx.input.findingId)}`,
          href: "/guardia",
          meta: dx.topLabel,
        },
        {
          label: getContextLabel(dx.input.contextId),
          href: "/guardia",
        },
      ],
    });
  }

  if (sections.length === 0) {
    sections.push({
      title: "Próximos pasos",
      items: [{ label: "Elegir queja en guardia", href: "/guardia" }],
    });
  }

  return {
    title: "Guardia",
    subtitle: "Contexto paralelo",
    sections,
    footnote: workflow ? undefined : "Inicia un flujo o diferencial para ver el resumen aquí.",
  };
}

function buildCasePanel(caseId: string): CompanionPanelModel | null {
  if (isEngineCaseId(caseId)) {
    const caseDef = getEngineCase(caseId);
    if (!caseDef?.graph) return null;

    const route = loadCaseRoute(caseId);
    const resume = loadCaseResume(caseId);
    const partial = computePartialScore(route, caseDef.graph);
    const node = resume?.nodeId ? getDecisionNode(caseDef.graph, resume.nodeId) : null;
    const choice = node?.choices.find((c) => c.id === resume?.selectedId);
    const hint =
      choice?.hint ?? choice?.feedback ?? node?.prompt ?? caseDef.presentation.slice(0, 120);

    const atlasHref = caseDef.defaultResources?.mediaId
      ? buildViewerPath(caseDef.defaultResources.mediaId, {
          module: caseDef.defaultResources.atlasModule,
        })
      : "/biblioteca";

    return {
      title: caseDef.title,
      subtitle: caseDef.tagline,
      sections: [
        {
          title: "Progreso",
          items: [
            {
              label: `Score parcial · ${partial}%`,
              href: `/casos/${caseId}`,
            },
            {
              label: node?.kind === "summary" ? "Ver resultado" : "Continuar caso",
              href: `/casos/${caseId}`,
              meta: node?.title,
            },
          ],
        },
        {
          title: "Pista",
          items: [{ label: hint.slice(0, 80) + (hint.length > 80 ? "…" : ""), href: `/casos/${caseId}` }],
        },
        {
          title: "Atlas",
          items: [{ label: "Volver al atlas", href: atlasHref }],
        },
      ],
    };
  }

  const legacy = getCase(caseId);
  if (!legacy) return null;

  const studyHref = getStudyHref({
    protocolRef: legacy.protocolRefs[0] ?? "fast",
    imageId: legacy.imageIds[0],
  });

  return {
    title: legacy.title,
    subtitle: legacy.tags.slice(0, 2).join(" · "),
    sections: [
      {
        title: "Progreso",
        items: [{ label: "Continuar caso", href: `/casos/${caseId}` }],
      },
      {
        title: "Pista",
        items: [
          {
            label:
              legacy.teachingPoint.slice(0, 90) + (legacy.teachingPoint.length > 90 ? "…" : ""),
            href: `/casos/${caseId}`,
          },
        ],
      },
      {
        title: "Atlas",
        items: [{ label: "Ver hallazgo en atlas", href: studyHref }],
      },
    ],
  };
}

export function buildCompanionPanelModel(
  screen: CompanionScreenKind | null,
  hints: CompanionLayoutHints,
): CompanionPanelModel | null {
  if (!screen) return null;
  switch (screen) {
    case "viewer":
      return buildViewerPanel(hints);
    case "protocol":
      return buildProtocolPanel(hints);
    case "guardia":
      return buildGuardiaPanel();
    case "case":
      return hints.caseId ? buildCasePanel(hints.caseId) : null;
    default:
      return null;
  }
}
