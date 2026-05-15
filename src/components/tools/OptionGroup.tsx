"use client";
import { theme } from "@/lib/theme";

export function OptionGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string; hint?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          fontSize: 10,
          color: theme.brand.red,
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: 0.5,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              style={{
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 8,
                border: `1px solid ${active ? theme.brand.redBorder : theme.bg.border}`,
                background: active ? theme.brand.redMuted : theme.bg.card,
                color: active ? theme.text.primary : theme.text.secondary,
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
            >
              {opt.label}
              {opt.hint && (
                <span style={{ display: "block", fontSize: 10, color: theme.text.muted, marginTop: 4 }}>
                  {opt.hint}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
