import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SONOCRÍTICO — Companion USG Crítico",
  description: "Referencia para protocolos, imágenes y calculadoras en ultrasonido crítico (UCI).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
