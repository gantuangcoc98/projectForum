/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lighter-white": "#e8e5e0",
        "light-white": "#d8d4cc",
        "dark-white": "#cac3b9",
        "main-maroon": "#720026",
        "light-maroon": "#8D002F",
        "lighter-maroon": "#ce4257",
        "lighter-gold": "#f5d57e",
        "light-gold": "#efb248",
        "dark-gold": "#ECA11F",
        "border-line": "#BDB7A9",
      },
    },
  },
  plugins: [],
};
