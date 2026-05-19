"use client";

import { theme } from "@/lib/theme";

export interface StatCardProps {
  value: string | number;
  label: string;
  sub?: string;
  color?: string;
}

/** Métrica centrada en calculadoras (VExUS, etc.). */
export function StatCard({ value, label, sub, color = theme.accent.primary }: StatCardProps) {
  return (
    <div
      className="ws-surface"
      style={{
        padding: "16px 18px",
        textAlign: "center",
        transition: `transform ${theme.motion.base}, box-shadow ${theme.motion.base}`,
      }}
    >
      <div
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 24,
          fontWeight: 500,
          lineHeight: 1,
          color,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: theme.text.muted, marginTop: 8 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: theme.text.faint, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
