/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gialloSofitel: "rgb(254, 221, 20)",
        gialloBordo: "rgb(223, 166, 0)",
      },
    },
  },
  plugins: [],
};
