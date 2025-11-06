/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#5C2E91',
        'brand-primary-light': '#C399FF',
        'brand-primary-lighter': '#DAC2FF',
        'brand-background': '#FFFFFF',
        'brand-background-alt': '#E7E9F0',
        'brand-background-light': '#F3F3F3',
        'brand-text-dark': '#394669',
        'brand-text-light': '#4A4A4A',
        'brand-text-gray': '#717171',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Baskervville', 'serif'],
      }
    },
  },
  plugins: [],
}
