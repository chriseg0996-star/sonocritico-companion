/** SonoCrítico MX — paleta blanco / negro / rojo */
export const theme = {
  bg: {
    primary: "#000000",
    card: "#0F0F0F",
    elevated: "#1A1A1A",
    border: "#2A2A2A",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#A3A3A3",
    muted: "#525252",
  },
  brand: {
    red: "#DC2626",
    redDark: "#B91C1C",
    redMuted: "rgba(220, 38, 38, 0.12)",
    redBorder: "rgba(220, 38, 38, 0.35)",
  },
  state: {
    complete: "#FFFFFF",
    completeMuted: "rgba(255, 255, 255, 0.15)",
  },
} as const;

export type BadgeVariant = "brand" | "gray" | "red" | "white" | "muted";
