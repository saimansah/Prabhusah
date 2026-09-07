import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#04070D",
          900: "#080E1A",
          800: "#0F172A",
          700: "#1E293B",
        },
        saffron: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          glow: "#F59E0B40",
        },
        crimson: {
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          glow: "#DC262640",
        },
        emerald: {
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          glow: "#05966940",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit", "var(--font-cinzel)", "sans-serif"],
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
      },
      boxShadow: {
        "glow-saffron": "0 0 25px -5px rgba(245, 158, 11, 0.4)",
        "glow-crimson": "0 0 25px -5px rgba(220, 38, 38, 0.4)",
        "glow-emerald": "0 0 25px -5px rgba(5, 150, 105, 0.4)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
