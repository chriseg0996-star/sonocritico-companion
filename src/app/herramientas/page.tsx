"use client";
import { useRouter } from "next/navigation";
import { Activity, ChevronRight, Wind, Waves } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { ScanLineCard, Badge } from "@/components/ui/base";
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
    description: "Disnea aguda: perfil A/B, PLAPS, TEP vs EAP vs neumonía.",
    icon: Wind,
    href: "/herramientas/lus",
  },
  {
    title: "RUSH — Tipos de shock",
    description: "Pump, Tank y Pipes para orientar fluidos y vasopresores.",
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
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "16px 16px 24px" }}>
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 28,
              letterSpacing: 1,
              color: theme.text.primary,
            }}
          >
            Herramientas
          </div>
          <p style={{ fontSize: 12, color: theme.text.secondary, marginTop: 4 }}>
            Calculadoras interactivas del curso — uso en cabecera del paciente
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <ScanLineCard
                key={tool.href}
                onClick={() => router.push(tool.href)}
                glow
                style={{ padding: 16, cursor: "pointer" }}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: theme.brand.redMuted,
                      border: `1px solid ${theme.brand.redBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} color={theme.brand.red} strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: theme.text.primary }}>{tool.title}</span>
                      <Badge variant="brand">Interactiva</Badge>
                    </div>
                    <p style={{ fontSize: 12, color: theme.text.muted, marginTop: 4, lineHeight: 1.5 }}>{tool.description}</p>
                  </div>
                  <ChevronRight size={18} color={theme.brand.red} style={{ flexShrink: 0 }} />
                </div>
              </ScanLineCard>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
