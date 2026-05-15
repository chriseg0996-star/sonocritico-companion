"use client";

import { useRouter } from "next/navigation";
import { BookOpen, Calculator, Image, Search } from "lucide-react";
import { ScanLineCard } from "@/components/ui/base";
import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";

const items = [
  { label: "Protocolos", sub: "Flujos y checklists", icon: BookOpen, href: "/modulos" },
  { label: "Atlas visual", sub: "Imágenes anotadas", icon: Image, href: "/biblioteca" },
  { label: "Buscar hallazgo", sub: "Atlas por hallazgo", icon: Search, href: "/biblioteca" },
  { label: "Calculadoras", sub: "Herramientas críticas", icon: Calculator, href: "/herramientas" },
] as const;

export function QuickAccessRow() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 10,
        marginBottom: 32,
      }}
    >
      {items.map(({ label, sub, icon: Icon, href }) => (
        <ScanLineCard
          key={label}
          onClick={() => router.push(href)}
          style={{ padding: "14px 14px 12px", cursor: "pointer" }}
        >
          <Icon size={18} color={theme.accent.primary} strokeWidth={1.5} style={{ marginBottom: 10 }} />
          <div style={{ ...type.titleSm, fontSize: "0.8125rem", color: theme.text.primary, marginBottom: 2 }}>
            {label}
          </div>
          <p style={{ ...type.caption, color: theme.text.muted, margin: 0 }}>{sub}</p>
        </ScanLineCard>
      ))}
    </div>
  );
}
