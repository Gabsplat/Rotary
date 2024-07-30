import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        open: ["var(--font-open)"],
        roboto: ["var(--font-roboto)"],
      },
      colors: {
        "blue-rotary": "#16478E",
        "orange-rotary": "#E15F2E",
        "pink-rotary": "#D41A69",
        "purple-rotary": "#5E18B8",
        "green-rotary": "#399918",
        yellow: "#F9C53F",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
