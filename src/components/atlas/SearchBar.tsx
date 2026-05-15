"use client";

import { Search, X } from "lucide-react";
import { theme } from "@/lib/theme";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  resultCount?: number;
};

export function SearchBar({ value, onChange, placeholder, resultCount }: Props) {
  return (
    <div className="atlas-search-wrap">
      <Search
        size={15}
        color={theme.text.faint}
        style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="atlas-search-input"
        autoComplete="off"
        spellCheck={false}
      />
      {value.length > 0 && (
        <button
          type="button"
          aria-label="Limpiar búsqueda"
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            padding: 4,
            cursor: "pointer",
            color: theme.text.faint,
          }}
        >
          <X size={14} />
        </button>
      )}
      {resultCount !== undefined && (
        <span className="atlas-search-meta">
          {resultCount} resultado{resultCount !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}
