"use client";

import { theme } from "@/lib/theme";

export type SectionNavLink = { id: string; label: string };

type Props = {
  links: SectionNavLink[];
};

export function ModuleSectionNav({ links }: Props) {
  return (
    <nav
      aria-label="Secciones del módulo"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        margin: "0 0 24px",
        padding: "8px 0 10px",
        background: theme.overlay.scrimStrong,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 5,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {links.map((link) => (
          <a key={link.id} href={`#${link.id}`} className="ws-chip">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
