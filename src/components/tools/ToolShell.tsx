"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import type { User } from "@/types";
import { theme } from "@/lib/theme";

export function ToolShell({
  user,
  title,
  subtitle,
  moduleHref,
  children,
}: {
  user: User;
  title: string;
  subtitle: string;
  moduleHref?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <AppLayout user={user}>
      <PageShell narrow>
        <button
          type="button"
          onClick={() => router.push("/herramientas")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            color: theme.text.muted,
            marginBottom: 16,
            fontSize: 12,
            background: "none",
            border: "none",
            padding: 0,
            fontFamily: "'IBM Plex Sans', sans-serif",
          }}
        >
          <ArrowLeft size={14} /> Herramientas críticas
        </button>
        <PageHeader
          eyebrow="Calculadora"
          title={title}
          subtitle={subtitle}
          action={
            moduleHref ? (
              <button
                type="button"
                onClick={() => router.push(moduleHref)}
                style={{
                  background: "none",
                  border: `1px solid ${theme.accent.border}`,
                  borderRadius: theme.radius.sm,
                  color: theme.navy.light,
                  fontSize: 11,
                  cursor: "pointer",
                  padding: "6px 12px",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}
              >
                Ver módulo →
              </button>
            ) : undefined
          }
        />
        {children}
      </PageShell>
    </AppLayout>
  );
}
