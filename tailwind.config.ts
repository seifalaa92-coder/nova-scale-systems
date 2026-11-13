import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: [
          "var(--font-display)",
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          "sans-serif",
        ],
        serif: [
          "var(--font-display)",
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          "sans-serif",
        ],
        mono: ["SF Mono", "Menlo", "Consolas", "monospace"],
      },
      colors: {
        obsidian: "#0e0e11",
        bone: "#fafafc",
        chalk: "#f4f4f7",
        muted: "#838389",
        hairline: "rgba(0, 0, 0, 0.08)",
        luxuryAccent: "#0071e3",
      },
      letterSpacing: {
        widest: "0.22em",
        ultra: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
