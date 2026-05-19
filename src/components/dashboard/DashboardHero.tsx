"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Btn } from "@/components/ui";
import { getNavRoute } from "@/config/navigation";
import { getSessionHeroQuestion } from "@/lib/dashboard/heroQuestions";
import { theme } from "@/lib/theme";

/** Bloque A — hero de consulta (HUD congelado: clases companion-hero). */
export function DashboardHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [heroQuestion] = useState(() => getSessionHeroQuestion());
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setTitleVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(getNavRoute("biblioteca"));
  }

  return (
    <section className="companion-hero">
      <p className="companion-hero__tagline">SONOCRÍTICO · Companion USG</p>
      <h1
        className={`companion-hero__title companion-hero__title--fade${titleVisible ? " companion-hero__title--visible" : ""}`}
      >
        {heroQuestion}
      </h1>
      <p className="companion-hero__desc">
        Protocolos, atlas de hallazgos, videos, bibliografía y calculadoras para consulta rápida durante el curso.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
        <Btn variant="primary" onClick={() => router.push(getNavRoute("modulos"))} style={{ padding: "11px 20px" }}>
          Explorar módulos
        </Btn>
        <Btn variant="secondary" onClick={() => router.push(getNavRoute("biblioteca"))} style={{ padding: "11px 20px" }}>
          Atlas visual
        </Btn>
      </div>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, maxWidth: 480 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search
            size={16}
            strokeWidth={1.5}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: theme.text.muted,
              pointerEvents: "none",
            }}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar hallazgo, ventana o protocolo..."
            style={{
              width: "100%",
              padding: "11px 12px 11px 38px",
              borderRadius: theme.radius.sm,
              border: `1px solid ${theme.bg.border}`,
              background: theme.bg.elevated,
              color: theme.text.primary,
              fontSize: 13,
              fontFamily: "'IBM Plex Sans', sans-serif",
              outline: "none",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "11px 16px",
            flexShrink: 0,
            borderRadius: theme.radius.sm,
            border: `1px solid ${theme.bg.border}`,
            background: "transparent",
            color: theme.text.secondary,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "'IBM Plex Sans', sans-serif",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </form>
    </section>
  );
}
