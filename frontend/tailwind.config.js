export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { light: "#0D9488", dark: "#2DD4BF" },
        secondary: { light: "#4B5563", dark: "#9CA3AF" },
        accent: { light: "#F59E0B", dark: "#FCD34D" },
        background: { light: "#F1F5F9", dark: "#1F2937" },
        text: { light: "#1F2937", dark: "#F3F4F6" },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
