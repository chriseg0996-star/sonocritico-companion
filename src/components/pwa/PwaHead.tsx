"use client";

import { useEffect } from "react";

/** Meta PWA + registro del service worker (client-only). */
export function PwaHead() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* sin HTTPS en dev local */
    });
  }, []);

  return null;
}
