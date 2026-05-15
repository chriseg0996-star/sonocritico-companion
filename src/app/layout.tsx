import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SonoCrítico MX",
  description: "Ultrasonografía en el paciente crítico — companion educativo",
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
      <body style={{ background: "#000000", color: "#FFFFFF", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
