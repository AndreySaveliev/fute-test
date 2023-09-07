/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      text: "#020303",
      background: "#f7fdfa",
      primary: "#3ad281",
      secondary: "#e4e7e5",
      accent: "#78877f",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
