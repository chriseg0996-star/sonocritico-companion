"use client";

import { useCallback, useRef } from "react";

const SWIPE_THRESHOLD = 48;
const MAX_VERTICAL = 80;

type Options = {
  onPrev?: () => void;
  onNext?: () => void;
  enabled?: boolean;
};

export function useSwipeNavigation({ onPrev, onNext, enabled = true }: Options) {
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled) return;
      const t = e.touches[0];
      startRef.current = { x: t.clientX, y: t.clientY };
    },
    [enabled]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled || !startRef.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startRef.current.x;
      const dy = t.clientY - startRef.current.y;
      startRef.current = null;
      if (Math.abs(dy) > MAX_VERTICAL) return;
      if (dx > SWIPE_THRESHOLD) onPrev?.();
      else if (dx < -SWIPE_THRESHOLD) onNext?.();
    },
    [enabled, onPrev, onNext]
  );

  return { onTouchStart, onTouchEnd };
}
