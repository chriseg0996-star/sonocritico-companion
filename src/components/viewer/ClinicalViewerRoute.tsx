"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { MediaItem } from "@/lib/media/types";
import { getMediaForModule, findMediaItemById } from "@/lib/media/manifests";
import type { AtlasFilterModule } from "@/lib/media/atlas-filters";
import { buildViewerBreadcrumb, bibliotecaReturnHref } from "@/lib/viewer/breadcrumb";
import { saveViewerSession, buildViewerPath } from "@/lib/viewer/viewer-session";
import { ClinicalViewer } from "@/components/viewer/ClinicalViewer";
import { ViewerShellProvider } from "@/components/viewer/ViewerShellContext";
import { ViewerErrorTrainerSheet } from "@/components/viewer/ViewerErrorTrainerSheet";

function isAtlasModule(m: string): m is AtlasFilterModule {
  return m === "lung" || m === "fast" || m === "cardiac" || m === "vexus";
}

type Props = {
  mediaId: string;
  moduleParam?: string | null;
  autoplay?: boolean;
  fromProtocol?: string | null;
  fromStep?: string | null;
  errorsOpen?: boolean;
};

/** Visor en ruta dedicada `/viewer/[mediaId]`. */
export function ClinicalViewerRoute({
  mediaId,
  moduleParam,
  autoplay = false,
  fromProtocol,
  fromStep,
  errorsOpen: errorsOpenParam = false,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorsOpen, setErrorsOpen] = useState(errorsOpenParam);

  const found = findMediaItemById(mediaId);
  const module = (
    found?.module ??
    (moduleParam && isAtlasModule(moduleParam) ? moduleParam : "lung")
  ) as AtlasFilterModule;

  const items = useMemo(() => getMediaForModule(module), [module]);
  const index = items.findIndex((e) => e.id === mediaId);
  const item = index >= 0 ? items[index] : null;

  const breadcrumb = useMemo(
    () => (item ? buildViewerBreadcrumb(item, { module }) : []),
    [item, module],
  );

  useEffect(() => {
    setErrorsOpen(errorsOpenParam || searchParams.get("errors") === "1");
  }, [errorsOpenParam, searchParams]);

  const openErrors = useCallback(() => {
    setErrorsOpen(true);
    router.replace(
      buildViewerPath(mediaId, {
        module,
        autoplay,
        fromProtocol: fromProtocol ?? undefined,
        fromStep: fromStep ?? undefined,
        errors: true,
      }),
      { scroll: false },
    );
  }, [router, mediaId, module, autoplay, fromProtocol, fromStep]);

  const closeErrors = useCallback(() => {
    setErrorsOpen(false);
    router.replace(
      buildViewerPath(mediaId, {
        module,
        autoplay,
        fromProtocol: fromProtocol ?? undefined,
        fromStep: fromStep ?? undefined,
      }),
      { scroll: false },
    );
  }, [router, mediaId, module, autoplay, fromProtocol, fromStep]);

  const persistNav = useCallback(
    (nextIndex: number, nextItem: MediaItem) => {
      saveViewerSession({
        lastMediaId: nextItem.id,
        lastModule: module,
        lastProtocolSlug: fromProtocol,
        lastProtocolStepId: fromStep,
      });
      router.replace(
        buildViewerPath(nextItem.id, {
          module,
          autoplay,
          fromProtocol: fromProtocol ?? undefined,
          fromStep: fromStep ?? undefined,
          errors: errorsOpen,
        }),
        { scroll: false },
      );
    },
    [router, module, autoplay, fromProtocol, fromStep, errorsOpen],
  );

  const handleIndexChange = useCallback(
    (nextIndex: number) => {
      const next = items[nextIndex];
      if (next) persistNav(nextIndex, next);
    },
    [items, persistNav],
  );

  const handleBack = useCallback(() => {
    const session = saveViewerSession({ lastMediaId: mediaId, lastModule: module });
    router.push(bibliotecaReturnHref(session));
  }, [router, mediaId, module]);

  useEffect(() => {
    if (!item) return;
    saveViewerSession({
      lastMediaId: item.id,
      lastModule: module,
      lastProtocolSlug: fromProtocol,
      lastProtocolStepId: fromStep,
    });
  }, [item, module, fromProtocol, fromStep]);

  if (!item || index < 0) {
    return (
      <div style={{ padding: 24, color: "#7e8897", fontSize: 13 }}>
        Hallazgo no encontrado.
        <button type="button" onClick={() => router.push("/biblioteca")} style={{ marginLeft: 8 }}>
          Volver a biblioteca
        </button>
      </div>
    );
  }

  return (
    <ViewerShellProvider value={{ openErrors }}>
      <ClinicalViewer
        items={items}
        index={index}
        onClose={handleBack}
        onIndexChange={handleIndexChange}
        fromProtocol={fromProtocol}
        fromStep={fromStep}
        mode="page"
        breadcrumbItems={breadcrumb}
        onBack={handleBack}
        autoplayClip={autoplay}
      />
      {errorsOpen && <ViewerErrorTrainerSheet item={item} onClose={closeErrors} />}
    </ViewerShellProvider>
  );
}
