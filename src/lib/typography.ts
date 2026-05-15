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
    fontSize: "1.375rem",
    fontWeight: 600 as const,
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
  },
  titleSm: {
    fontFamily: fonts.sans,
    fontSize: "1.0625rem",
    fontWeight: 600 as const,
    lineHeight: 1.3,
  },
  eyebrow: {
    fontFamily: fonts.sans,
    fontSize: "0.6875rem",
    fontWeight: 600 as const,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: "0.875rem",
    lineHeight: 1.55,
    fontWeight: 400 as const,
  },
  bodySm: {
    fontFamily: fonts.sans,
    fontSize: "0.8125rem",
    lineHeight: 1.5,
  },
  caption: {
    fontFamily: fonts.sans,
    fontSize: "0.75rem",
    lineHeight: 1.4,
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
  pagePadding: "1.25rem",
  pagePaddingMd: "1.75rem 2rem 2.5rem",
  sectionGap: 24,
  cardRadius: 12,
} as const;
