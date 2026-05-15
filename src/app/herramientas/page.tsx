"use client";
import { useRouter } from "next/navigation";
import { Activity, ChevronRight, Wind, Waves } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScanLineCard } from "@/components/ui/base";
import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";

const tools = [
  {
    title: "Calculadora VExUS",
    description: "Grado 0–3 de congestión venosa (VCI, hepática, porta, renal).",
    icon: Waves,
    href: "/herramientas/vexus",
  },
  {
    title: "Protocolo BLUE",
    description: "Disnea aguda: perfil A/B, PLAPS, orientación diagnóstica.",
    icon: Wind,
    href: "/herramientas/lus",
  },
  {
    title: "RUSH — Tipos de shock",
    description: "Pump, Tank y Pipes para fluidos y vasopresores.",
    icon: Activity,
    href: "/herramientas/shock",
  },
];

export default function HerramientasPage() {
  const { user, loading } = useAuth("student");
  const router = useRouter();

  if (loading || !user) return <LoadingScreen />;

  return (
    <AppLayout user={user}>
      <PageShell>
        <PageHeader
          eyebrow="Herramientas críticas"
          title="Calculadoras y protocolos"
          subtitle="Uso en cabecera del paciente — inputs compactos, resultados destacados."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <ScanLineCard
                key={tool.href}
                onClick={() => router.push(tool.href)}
                glow
                style={{ padding: 18, cursor: "pointer" }}
              >
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: theme.radius.md,
                      background: theme.accent.muted,
                      border: `1px solid ${theme.accent.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} color={theme.accent.primary} strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ ...type.titleSm, color: theme.text.primary, marginBottom: 4 }}>{tool.title}</div>
                    <p style={{ ...type.caption, color: theme.text.muted, margin: 0, lineHeight: 1.5 }}>{tool.description}</p>
                  </div>
                  <ChevronRight size={18} color={theme.accent.primary} style={{ flexShrink: 0 }} />
                </div>
              </ScanLineCard>
            );
          })}
        </div>
      </PageShell>
    </AppLayout>
  );
}
