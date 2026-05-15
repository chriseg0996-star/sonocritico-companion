"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
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
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 16px 32px" }}>
        <div
          onClick={() => router.push("/herramientas")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            color: theme.text.muted,
            marginBottom: 16,
            fontSize: 12,
          }}
        >
          <ArrowLeft size={14} /> Herramientas
        </div>
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 28,
              letterSpacing: 1,
              color: theme.text.primary,
            }}
          >
            {title}
          </div>
          <p style={{ fontSize: 12, color: theme.text.secondary, marginTop: 4 }}>{subtitle}</p>
          {moduleHref && (
            <button
              type="button"
              onClick={() => router.push(moduleHref)}
              style={{
                marginTop: 8,
                background: "none",
                border: "none",
                color: theme.brand.red,
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              Ver módulo del curso →
            </button>
          )}
        </div>
        {children}
      </div>
    </AppLayout>
  );
}
