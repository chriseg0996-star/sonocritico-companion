"use client";

import type { AtlasFilterModule } from "@/lib/media/atlas-filters";
import { getErrorsForModule } from "@/lib/training";
import { ErrorTrainerList } from "@/components/training/ErrorTrainerList";

type Props = {
  module: AtlasFilterModule;
};

/** Panel Errores frecuentes — biblioteca atlas. */
export function AtlasErrorsPanel({ module }: Props) {
  const errors = getErrorsForModule(module);

  return (
    <ErrorTrainerList
      errors={errors}
      defaultOpenFirst={errors.length === 1}
      emptyMessage="Próximamente errores frecuentes para este módulo."
    />
  );
}
