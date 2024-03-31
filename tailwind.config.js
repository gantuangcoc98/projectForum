/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lighter-white': '#e8e5e0',
        'light-white': '#d8d4cc',
        'dark-white': '#cac3b9',
        'main-maroon': '#720026',
        'light-maroon': '#ce4257',
        'light-gold': '#f5d57e',
        'dark-gold': '#efb248',
      },
    },
  },
  plugins: [],
}

