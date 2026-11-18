import type { Config } from "tailwindcss";

// Χρώματα brand — αλλάζουν εδώ σε ένα σημείο.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#8e1b1b", dark: "#6a1313", light: "#b32626" },
        ink: { DEFAULT: "#1f1b18", soft: "#3a342f" },
        cream: { DEFAULT: "#f8f3ea", dark: "#efe6d4" },
        gold: { DEFAULT: "#b8893a", light: "#d7b36a" },
        slate: { board: "#2a2c2e" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-slab)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
