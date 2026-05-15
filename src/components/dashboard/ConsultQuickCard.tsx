"use client";

import { useRouter } from "next/navigation";
import type { ConsultTile } from "@/lib/dashboard-modules";
import { Badge } from "@/components/ui/base";
import { theme } from "@/lib/theme";

export function ConsultQuickCard({ tile }: { tile: ConsultTile }) {
  const router = useRouter();
  const Icon = tile.icon;

  return (
    <article
      className="module-tile"
      style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%" }}
    >
      <button
        type="button"
        onClick={() => router.push(tile.moduleHref)}
        style={{
          textAlign: "left",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "inherit",
          width: "100%",
        }}
      >
        <Icon size={22} color={theme.accent.primary} strokeWidth={1.5} style={{ marginBottom: 10 }} />
        <p className="module-tile__label">{tile.label}</p>
        <p className="module-tile__desc">{tile.description}</p>
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
        {tile.chips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(chip.href);
            }}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <Badge variant="gray">{chip.label}</Badge>
          </button>
        ))}
      </div>
    </article>
  );
}
