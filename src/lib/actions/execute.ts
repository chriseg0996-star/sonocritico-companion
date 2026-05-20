import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { QuickActionId } from "@/lib/actions/types";
import { recordQuickAction } from "@/lib/actions/storage";
import { buildComparePath, findComparisonForMediaId } from "@/lib/compare";
import { restartGuardiaFlow } from "@/lib/guardia";
import type { NavigationContext } from "@/lib/navigation";
import { QUICK_NAV } from "@/lib/navigation/routes";
import { getMediaProtocolLink } from "@/lib/protocols/media-links";
import { buildProtocolStepUrl } from "@/lib/protocols/protocol-navigation";
import { getSmartResumeTarget } from "@/lib/resume";
import { buildViewerPath, loadSavedFindings } from "@/lib/viewer/viewer-session";

export type QuickActionHandlers = {
  router: AppRouterInstance;
  openSearch: () => void;
  onClosePanel: () => void;
};

export type QuickActionResult =
  | { ok: true }
  | { ok: false; reason: string };

export function runQuickAction(
  id: QuickActionId,
  ctx: NavigationContext,
  handlers: QuickActionHandlers,
): QuickActionResult {
  const { router, openSearch, onClosePanel } = handlers;

  const go = (href: string) => {
    recordQuickAction(id);
    onClosePanel();
    router.push(href);
    return { ok: true as const };
  };

  switch (id) {
    case "search-finding":
      recordQuickAction(id);
      onClosePanel();
      openSearch();
      return { ok: true };

    case "open-companion":
      return go(QUICK_NAV.companion);

    case "continue": {
      const target = getSmartResumeTarget();
      if (!target) return { ok: false, reason: "No hay actividad reciente para continuar." };
      return go(target.href);
    }

    case "open-atlas":
      return go(QUICK_NAV.atlas);

    case "open-cases":
      return go(QUICK_NAV.casos);

    case "calculators":
      return go(QUICK_NAV.calculadoras);

    case "favorites": {
      const saved = loadSavedFindings();
      if (saved.length === 0) return go(`${QUICK_NAV.atlas}?saved=1`);
      return go(buildViewerPath(saved[0]!));
    }

    case "compare": {
      if (!ctx.mediaId) return { ok: false, reason: "Abre un hallazgo en el visor para comparar." };
      const pair = findComparisonForMediaId(ctx.mediaId);
      if (!pair) return { ok: false, reason: "No hay par de comparación para este hallazgo." };
      return go(buildComparePath(pair.id, { fromMedia: ctx.mediaId }));
    }

    case "open-protocol": {
      if (!ctx.mediaId) return { ok: false, reason: "Sin hallazgo activo en el visor." };
      const linked = getMediaProtocolLink(ctx.mediaId);
      if (linked) return go(buildProtocolStepUrl(linked.protocolSlug, linked.stepId));
      if (ctx.fromProtocol) {
        return go(buildProtocolStepUrl(ctx.fromProtocol, ctx.fromStep ?? "0"));
      }
      return { ok: false, reason: "Este hallazgo no tiene protocolo vinculado." };
    }

    case "continue-case": {
      const resume = getSmartResumeTarget();
      if (resume?.href.includes("/casos/")) return go(resume.href);
      if (ctx.caseId) return go(`/casos/${ctx.caseId}`);
      return { ok: false, reason: "No hay caso activo para continuar." };
    }

    case "restart-guardia-flow":
      recordQuickAction(id);
      onClosePanel();
      restartGuardiaFlow();
      if (ctx.pathname !== QUICK_NAV.guardia) router.push(QUICK_NAV.guardia);
      return { ok: true };

    default:
      return { ok: false, reason: "Acción no disponible." };
  }
}
