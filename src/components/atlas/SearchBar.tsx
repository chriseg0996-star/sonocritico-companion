"use client";

import { Search } from "lucide-react";
import { theme } from "@/lib/theme";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div style={{ position: "relative", marginBottom: 12 }}>
      <Search
        size={14}
        color={theme.text.faint}
        style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px 10px 36px",
          fontSize: 13,
          fontFamily: "'IBM Plex Sans', sans-serif",
          color: theme.text.primary,
          background: theme.surface.glass,
          border: `1px solid ${theme.bg.border}`,
          borderRadius: theme.radius.sm,
          outline: "none",
          transition: `border-color ${theme.motion.fast}, background ${theme.motion.fast}`,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = theme.bg.borderHover;
          e.currentTarget.style.background = theme.surface.glassHover;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = theme.bg.border;
          e.currentTarget.style.background = theme.surface.glass;
        }}
      />
    </div>
  );
}
