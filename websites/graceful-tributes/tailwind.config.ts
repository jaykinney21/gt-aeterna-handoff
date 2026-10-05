import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Graceful Tributes — design-canvas tokens (Newsreader/Hanken/Spline system)
        paper: "#F6F1E7", // light page background
        surface: "#EFE7D8", // raised light surface
        ink: "#2E3D33", // primary evergreen (text on light, bg on dark blocks)
        "ink-deep": "#131b16", // deepest evergreen (urn voids)
        gold: "#B98E54",
        "gold-light": "#e6c79a", // gold accent on dark
        sage: "#8FA08E",
        water: "#6E8C96",
        stone: "#C9BBA8",
        canvas: "#e6dece", // neutral chooser backdrop
        // legacy aliases kept so any stray reference still resolves
        cream: "#F6F1E7",
        evergreen: "#2E3D33",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"], // Newsreader
        sans: ["var(--font-sans)", "system-ui", "sans-serif"], // Hanken Grotesk
        mono: ["var(--font-mono)", "ui-monospace", "monospace"], // Spline Sans Mono
      },
      letterSpacing: {
        label: "0.2em",
        wide: "0.24em",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};

export default config;
