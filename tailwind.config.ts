import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(260, 30%, 10%)", // Dark purple background
        foreground: "hsl(0, 0%, 95%)", // Off-white text
        primary: {
          DEFAULT: "hsl(330, 80%, 65%)", // Vibrant pink
          foreground: "hsl(0, 0%, 95%)", // Light text on primary
        },
        secondary: {
          DEFAULT: "hsl(40, 90%, 60%)", // Gold/Orange for highlights
          foreground: "hsl(300, 20%, 10%)", // Dark text on secondary
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(260, 20%, 20%)", // Slightly lighter purple for muted elements
          foreground: "hsl(0, 0%, 63.9%)",
        },
        accent: {
          DEFAULT: "hsl(260, 25%, 30%)", // Accent purple
          foreground: "hsl(0 0% 98%)",
        },
        popover: {
          DEFAULT: "hsl(260, 20%, 15%)", // Darker purple for popovers
          foreground: "hsl(0 0% 95%)",
        },
        card: {
          DEFAULT: "hsl(260, 20%, 15%)", // Darker purple for cards
          foreground: "hsl(0 0% 95%)",
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
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px hsl(330, 80%, 65%), 0 0 10px hsl(330, 80%, 65%)" },
          "50%": { boxShadow: "0 0 10px hsl(330, 80%, 65%), 0 0 20px hsl(330, 80%, 65%)" },
        },
        "pulse-light": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "fade-in-slide-left": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-out-slide-right": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 1.5s ease-in-out infinite",
        "pulse-light": "pulse-light 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-slide-left": "fade-in-slide-left 0.5s ease-out forwards",
        "fade-out-slide-right": "fade-out-slide-right 0.5s ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
