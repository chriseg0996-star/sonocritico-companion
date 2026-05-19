"use client";

import { theme } from "@/lib/theme";

export interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
}

export function ProgressBar({ value, color = theme.accent.primary, height = 3 }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div style={{ width: "100%", height, background: theme.surface.soft, borderRadius: height }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: color,
          borderRadius: height,
          transition: "width 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: 0.85,
        }}
      />
    </div>
  );
}
