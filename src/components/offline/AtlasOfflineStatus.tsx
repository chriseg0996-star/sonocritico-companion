"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CloudOff, Download, HardDrive } from "lucide-react";
import { isAtlasMediaCached, warmAtlasMedia } from "@/lib/offline/warm-media";
import { useNetworkOnline } from "@/lib/offline/use-network-online";
import styles from "@/components/offline/offline.module.css";

type Status = "checking" | "warming" | "ready" | "idle";

/** Estado atlas offline — solo en biblioteca (no HUD global). */
export function AtlasOfflineStatus() {
  const online = useNetworkOnline();
  const [status, setStatus] = useState<Status>("checking");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const warmedRef = useRef(false);

  const refresh = useCallback(async () => {
    const ready = await isAtlasMediaCached();
    setStatus(ready ? "ready" : warmedRef.current ? "idle" : "checking");
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh, online]);

  useEffect(() => {
    if (!online || warmedRef.current) return;

    let cancelled = false;
    (async () => {
      const ready = await isAtlasMediaCached();
      if (cancelled) return;
      if (ready) {
        setStatus("ready");
        warmedRef.current = true;
        return;
      }
      setStatus("warming");
      await warmAtlasMedia((done, total) => {
        if (!cancelled) setProgress({ done, total });
      });
      if (!cancelled) {
        warmedRef.current = true;
        setStatus((await isAtlasMediaCached()) ? "ready" : "idle");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [online]);

  if (status === "checking") {
    return (
      <p className={styles.status} role="status">
        <Download size={14} strokeWidth={1.5} aria-hidden />
        Preparando atlas offline…
      </p>
    );
  }

  if (status === "warming") {
    const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;
    return (
      <p className={styles.status} role="status">
        <Download size={14} strokeWidth={1.5} aria-hidden />
        Descargando imágenes ({pct}%)
      </p>
    );
  }

  if (status === "ready") {
    return (
      <p className={`${styles.status} ${styles.statusReady}`} role="status">
        <HardDrive size={14} strokeWidth={1.5} aria-hidden />
        {online ? "Disponible offline" : "Sin conexión — atlas disponible"}
      </p>
    );
  }

  if (!online) {
    return (
      <p className={`${styles.status} ${styles.statusWarn}`} role="status">
        <CloudOff size={14} strokeWidth={1.5} aria-hidden />
        Sin conexión — abre atlas una vez online para guardar imágenes
      </p>
    );
  }

  return null;
}
