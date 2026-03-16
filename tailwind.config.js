/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f1f5f9",
        blueprint: "#f8fafc",
        panel: "#ffffff",
        card: "#ffffff",
        border: "#e2e8f0",
        line: "#cbd5e1",
        accent: {
          DEFAULT: "#2563eb", // Industry Blue
          light: "#3b82f6",
          dark: "#1d4ed8",
        },
      },
      boxShadow: {
        glow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        inset: "inset 0 1px 1px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
