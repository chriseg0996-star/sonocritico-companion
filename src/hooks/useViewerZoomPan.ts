"use client";

import { useCallback, useRef, useState } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;

export function useViewerZoomPan(enabled: boolean) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const reset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!enabled) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.12 : 0.12;
      setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)));
    },
    [enabled]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled || zoom <= 1) return;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    },
    [enabled, zoom, pan.x, pan.y]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      setPan({
        x: dragRef.current.px + (e.clientX - dragRef.current.x),
        y: dragRef.current.py + (e.clientY - dragRef.current.y),
      });
    },
    []
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;

  return {
    zoom,
    pan,
    transform,
    reset,
    onWheel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    canPan: enabled && zoom > 1,
  };
}
