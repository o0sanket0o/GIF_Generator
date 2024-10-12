/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blue: '#a7c4d3',
        pink: '#D3A7C4',
        cornSilk: '#C4D3A7',
        lightCornSilk: '#E0EAD1',
        lightPink: '#EAD1E0',
      }
    },
  },
  plugins: [],
}