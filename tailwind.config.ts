import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "apex-black": "#050505",
        "apex-gold": "#C8890D",
        "apex-white": "#F0EDE8",
        "apex-surface": "#0d0d0d",
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"],
        cormorant: ['"Cormorant Garamond"', "serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
