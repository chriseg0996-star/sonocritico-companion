/** SONOCRÍTICO — workstation POCUS: capas silenciosas, slate, alertas puntuales */
export const theme = {
  bg: {
    primary: "#0B0E12",
    card: "#11151B",
    elevated: "#171C24",
    /** Outline casi invisible */
    border: "rgba(255, 255, 255, 0.04)",
    borderHover: "rgba(255, 255, 255, 0.07)",
  },
  surface: {
    soft: "#1E2632",
    glass: "rgba(255, 255, 255, 0.03)",
    glassHover: "rgba(255, 255, 255, 0.05)",
    light: "#F5F7FA",
    lightText: "#34425B",
  },
  text: {
    primary: "#F5F7FA",
    secondary: "#B7C0CC",
    muted: "#7E8897",
    /** Metadata / labels */
    faint: "#5C6573",
  },
  brand: {
    primary: "#8FA7C4",
    secondary: "#5D7396",
    deep: "#34425B",
    red: "#C96B6B",
    redDark: "#B85A5A",
    redMuted: "rgba(201, 107, 107, 0.1)",
    redBorder: "rgba(201, 107, 107, 0.22)",
  },
  navy: {
    primary: "#34425B",
    light: "#8FA7C4",
  },
  accent: {
    primary: "#8FA7C4",
    secondary: "#5D7396",
    soft: "#A8B9D1",
    muted: "rgba(143, 167, 196, 0.1)",
    border: "rgba(143, 167, 196, 0.18)",
    borderSubtle: "rgba(255, 255, 255, 0.04)",
    borderStrong: "rgba(143, 167, 196, 0.22)",
    light: "#A8B9D1",
  },
  button: {
    primaryBg: "#5D7396",
    primaryText: "#F5F7FA",
    secondaryText: "#8FA7C4",
  },
  state: {
    complete: "#B7C0CC",
    completeMuted: "rgba(255, 255, 255, 0.04)",
    error: "#C96B6B",
    errorMuted: "rgba(201, 107, 107, 0.1)",
    errorBorder: "rgba(201, 107, 107, 0.22)",
    success: "#6FAE95",
    warning: "#D4A373",
    danger: "#C96B6B",
  },
  shadow: {
    card: "0 1px 2px rgba(0, 0, 0, 0.24), 0 8px 24px rgba(0, 0, 0, 0.28)",
    cardHover: "0 2px 4px rgba(0, 0, 0, 0.2), 0 12px 32px rgba(0, 0, 0, 0.32)",
    hero: "0 4px 24px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255, 255, 255, 0.04) inset",
    inset: "0 1px 0 rgba(255, 255, 255, 0.04) inset",
  },
  motion: {
    fast: "140ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "160ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "180ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
} as const;

export type BadgeVariant = "brand" | "gray" | "red" | "white" | "muted";
