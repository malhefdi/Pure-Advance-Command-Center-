import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      mobile: "0px",
      md: "980px",
      desktop: "1280px",
    },
    extend: {
      colors: {
        brand: {
          navy: "#0B2545",
          "navy-2": "#13315C",
          teal: "#1B998B",
          gold: "#C9A227",
        },
        surface: { bg: "#F5F7FA", card: "#FFFFFF" },
        border: { default: "#E3E8EF" },
        text: { primary: "#0E1B2C", muted: "#5A6B7E", faint: "#8895A7" },
        sem: {
          green: "#1F9D55",
          "green-bg": "#E6F6EE",
          yellow: "#C58E00",
          "yellow-bg": "#FFF6DA",
          red: "#D14343",
          "red-bg": "#FBE6E6",
          blue: "#2563EB",
          "blue-bg": "#E8F0FE",
        },
        platform: { bio: "#16A34A", med: "#2563EB", aca: "#C58E00" },
      },
      spacing: { 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "24px", 6: "32px", 7: "48px" },
      borderRadius: { sm: "6px", md: "10px", lg: "14px" },
      boxShadow: {
        1: "0 1px 2px rgba(13,27,44,.06), 0 1px 3px rgba(13,27,44,.04)",
        2: "0 4px 12px rgba(13,27,44,.08)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        num: ["SF Mono", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        h1: ["22px", { lineHeight: "28px", fontWeight: "600", letterSpacing: "-0.01em" }],
        h2: ["16px", { lineHeight: "22px", fontWeight: "600" }],
        kpi: ["26px", { lineHeight: "32px", fontWeight: "600", letterSpacing: "-0.02em" }],
        body: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        label: ["12px", { lineHeight: "16px", fontWeight: "600", letterSpacing: "0.06em" }],
        caption: ["11px", { lineHeight: "14px", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};

export default config;
