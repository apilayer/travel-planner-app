/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Syne", "serif"],
        teko: ["Teko", "sans-serif"],
      },
    },
  },
  plugins: [],
};
