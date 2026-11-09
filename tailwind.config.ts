import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#004967",
          container: "#086288",
          fixed: "#c6e7ff",
          dim: "#8bcef9",
        },
        secondary: {
          DEFAULT: "#19648f",
          container: "#8fcdfd",
          fixed: "#cae6ff",
        },
        tertiary: {
          DEFAULT: "#004966",
          container: "#146285",
        },
        surface: {
          DEFAULT: "#f7f9ff",
          dim: "#cddbee",
          bright: "#f7f9ff",
          lowest: "#ffffff",
          low: "#edf4ff",
          container: "#e3efff",
          high: "#dbe9fc",
          highest: "#d6e4f6",
          variant: "#d6e4f6",
        },
        "on-surface": "#0f1d2a",
        "on-surface-variant": "#40484e",
        "on-primary": "#ffffff",
        "on-primary-container": "#a5dbff",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#005881",
        "brand-dark": "#0B1926",
        "cyan-accent": "#97D7FF",
        outline: "#70787f",
        "outline-variant": "#c0c7cf",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        headline: ["'Space Grotesk'", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        cyan: "0 0 20px -3px rgba(151, 215, 255, 0.4)",
        glow: "0 0 25px -2px rgba(8, 98, 136, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
