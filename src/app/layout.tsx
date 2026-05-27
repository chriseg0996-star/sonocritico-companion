import type { Metadata, Viewport } from "next";
import { OfflineBootstrap } from "@/components/offline/OfflineBootstrap";
import { PwaHead } from "@/components/pwa/PwaHead";
import { AppProviders } from "@/components/providers/AppProviders";
import { ProtocolProvider } from "@/components/protocols/ProtocolContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "SONOCRÍTICO — Companion USG Crítico",
  description: "Referencia para protocolos, imágenes y calculadoras en ultrasonido crítico (UCI).",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "SonoCrítico",
    statusBarStyle: "black",
  },
  icons: {
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#080808" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="SonoCrítico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh" }}>
        <PwaHead />
        <OfflineBootstrap />
        <AppProviders>
          <ProtocolProvider>{children}</ProtocolProvider>
        </AppProviders>
      </body>
    </html>
  );
}
