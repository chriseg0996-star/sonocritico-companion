import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#000000",
          card: "#0F0F0F",
          elevated: "#1A1A1A",
          border: "#2A2A2A",
        },
        accent: {
          DEFAULT: "#DC2626",
          muted: "rgba(220, 38, 38, 0.12)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A3A3A3",
          muted: "#525252",
        },
      },
      fontFamily: {
        heading: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-ibm-plex-sans)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
      animation: {
        "fade-in": "fadeIn 200ms ease-out",
        "slide-up": "slideUp 200ms ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
