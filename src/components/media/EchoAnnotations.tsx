"use client";

import type { Annotation } from "@/types";
import { theme } from "@/lib/theme";

export function EchoAnnotations({ annotations }: { annotations: Annotation[] }) {
  return (
    <>
      {annotations.map((ann, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${ann.x}%`,
            top: `${ann.y}%`,
            transform: "translate(-50%, -50%)",
            background: theme.brand.red,
            color: theme.text.primary,
            fontSize: 9,
            padding: "2px 5px",
            borderRadius: 3,
            fontFamily: "'IBM Plex Mono', monospace",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {ann.label}
        </span>
      ))}
    </>
  );
}
