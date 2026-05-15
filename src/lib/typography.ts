/** Tokens tipográficos — sans para UI, Bebas solo marca/números */
export const fonts = {
  sans: "'IBM Plex Sans', system-ui, sans-serif",
  mono: "'IBM Plex Mono', monospace",
  display: "'Bebas Neue', sans-serif",
} as const;

export const type = {
  displayLg: {
    fontFamily: fonts.display,
    fontSize: "2rem",
    letterSpacing: "0.02em",
    lineHeight: 1.05,
    fontWeight: 400 as const,
  },
  displayMd: {
    fontFamily: fonts.display,
    fontSize: "1.5rem",
    letterSpacing: "0.03em",
    lineHeight: 1.1,
    fontWeight: 400 as const,
  },
  title: {
    fontFamily: fonts.sans,
    fontSize: "1.3125rem",
    fontWeight: 500 as const,
    lineHeight: 1.28,
    letterSpacing: "-0.02em",
  },
  titleSm: {
    fontFamily: fonts.sans,
    fontSize: "1rem",
    fontWeight: 500 as const,
    lineHeight: 1.32,
    letterSpacing: "-0.01em",
  },
  eyebrow: {
    fontFamily: fonts.sans,
    fontSize: "0.625rem",
    fontWeight: 500 as const,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: "0.875rem",
    lineHeight: 1.58,
    fontWeight: 400 as const,
  },
  bodySm: {
    fontFamily: fonts.sans,
    fontSize: "0.8125rem",
    lineHeight: 1.52,
    fontWeight: 400 as const,
  },
  caption: {
    fontFamily: fonts.sans,
    fontSize: "0.75rem",
    lineHeight: 1.45,
    fontWeight: 400 as const,
  },
  stat: {
    fontFamily: fonts.display,
    fontSize: "1.75rem",
    lineHeight: 1,
    letterSpacing: "0.02em",
  },
} as const;

export const layout = {
  contentMax: 1040,
  contentNarrow: 720,
  pagePadding: "1.5rem",
  pagePaddingMd: "2rem 2.25rem 3rem",
  sectionGap: 32,
  cardRadius: 12,
} as const;
