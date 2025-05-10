import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#009898",
          50: "#f0fafa",
          100: "#d0f3f3",
          200: "#a8e8e8",
          300: "#6cd7d7",
          400: "#38c0c0",
          500: "#009898",
          600: "#007a7a",
          700: "#006464",
          800: "#004b4b",
          900: "#003939",
        },
        secondary: {
          DEFAULT: "#2c3037",
          50: "#f5f6f7",
          100: "#ebedf0",
          200: "#d1d5dc",
          300: "#a8b0bd",
          400: "#778495",
          500: "#556377",
          600: "#414956",
          700: "#363c47",
          800: "#2c3037",
          900: "#25282d",
        },
        accent: {
          DEFAULT: "#88bf42",
          50: "#f5fbee",
          100: "#e7f6d7",
          200: "#ceebb3",
          300: "#b2de88",
          400: "#99cf61",
          500: "#88bf42",
          600: "#6d9c31",
          700: "#5a8029",
          800: "#496925",
          900: "#3e5722",
        },
        gray: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        cyan: {
          DEFAULT: "#009898",
          50: "#f0fafa",
          100: "#d0f3f3",
          200: "#a8e8e8",
          300: "#6cd7d7",
          400: "#38c0c0",
          500: "#009898",
          600: "#007a7a",
          700: "#006464",
          800: "#004b4b",
          900: "#003939",
        },
        green: {
          DEFAULT: "#88bf42",
          50: "#f5fbee",
          100: "#e7f6d7",
          200: "#ceebb3",
          300: "#b2de88",
          400: "#99cf61",
          500: "#88bf42",
          600: "#6d9c31",
          700: "#5a8029",
          800: "#496925",
          900: "#3e5722",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-light": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.8",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "float-slow": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },
        "spin-slow": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "reverse-spin-slow": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
        "shine": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 1s ease-out",
        "slide-up": "slide-up 0.8s ease-out",
        "pulse-light": "pulse-light 4s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "reverse-spin-slow": "reverse-spin-slow 25s linear infinite",
        "shine": "shine 3s ease-in-out infinite",
      },
      backgroundImage: {
        "premium-gradient": "linear-gradient(135deg, rgba(0,152,152,0.1) 0%, rgba(44,48,55,0.1) 100%)",
      },
      fontFamily: {
        sans: ["'Poppins', sans-serif", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
