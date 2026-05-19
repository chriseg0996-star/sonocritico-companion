"use client";

import { ServiceWorkerRegistration } from "@/components/offline/ServiceWorkerRegistration";

/** Registro SW — montado en layout raíz, fuera del HUD. */
export function OfflineBootstrap() {
  return <ServiceWorkerRegistration />;
}
