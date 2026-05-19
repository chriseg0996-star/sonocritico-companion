"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type CompareSyncValue = {
  playing: boolean;
  zoom: number;
  togglePlay: () => void;
  setPlaying: (v: boolean) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  registerVideo: (el: HTMLVideoElement | null) => void;
  onMasterTimeUpdate: (time: number) => void;
  transform: string;
};

const CompareSyncContext = createContext<CompareSyncValue | null>(null);

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

export function CompareSyncProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  const videosRef = useRef<Set<HTMLVideoElement>>(new Set());
  const syncingRef = useRef(false);

  const registerVideo = useCallback((el: HTMLVideoElement | null) => {
    if (!el) return undefined;
    videosRef.current.add(el);
    return () => {
      videosRef.current.delete(el);
    };
  }, []);

  useEffect(() => {
    const videos = [...videosRef.current];
    videos.forEach((v) => {
      if (playing) void v.play().catch(() => undefined);
      else v.pause();
    });
  }, [playing]);

  const onMasterTimeUpdate = useCallback((time: number) => {
    if (syncingRef.current) return;
    syncingRef.current = true;
    videosRef.current.forEach((v) => {
      if (Math.abs(v.currentTime - time) > 0.12) {
        try {
          v.currentTime = time;
        } catch {
          /* seek */
        }
      }
    });
    syncingRef.current = false;
  }, []);

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);

  const zoomIn = useCallback(
    () => setZoom((z) => Math.min(MAX_ZOOM, Math.round((z + 0.25) * 100) / 100)),
    [],
  );
  const zoomOut = useCallback(
    () => setZoom((z) => Math.max(MIN_ZOOM, Math.round((z - 0.25) * 100) / 100)),
    [],
  );
  const resetZoom = useCallback(() => setZoom(1), []);

  const transform = `scale(${zoom})`;

  const value = useMemo(
    () => ({
      playing,
      zoom,
      togglePlay,
      setPlaying,
      zoomIn,
      zoomOut,
      resetZoom,
      registerVideo,
      onMasterTimeUpdate,
      transform,
    }),
    [
      playing,
      zoom,
      togglePlay,
      zoomIn,
      zoomOut,
      resetZoom,
      registerVideo,
      onMasterTimeUpdate,
      transform,
    ],
  );

  return <CompareSyncContext.Provider value={value}>{children}</CompareSyncContext.Provider>;
}

export function useCompareSync() {
  const ctx = useContext(CompareSyncContext);
  if (!ctx) throw new Error("useCompareSync debe usarse dentro de CompareSyncProvider");
  return ctx;
}
