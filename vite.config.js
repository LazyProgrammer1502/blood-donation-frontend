import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(1.05)" },
          "100%": { opacity: "0.25", transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 2s ease-out forwards",
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
