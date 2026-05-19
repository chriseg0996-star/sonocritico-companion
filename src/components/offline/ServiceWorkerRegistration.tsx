"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/paths";

/** Registra SW de atlas offline (F2.7). No modifica HUD. */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const swUrl = withBasePath("/sw.js");
    const scope = withBasePath("/");

    navigator.serviceWorker
      .register(swUrl, { scope })
      .then((reg) => {
        if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
      })
      .catch(() => {
        /* entorno sin SW (dev sin HTTPS) */
      });
  }, []);

  return null;
}
