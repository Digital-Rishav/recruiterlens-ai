/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0ebff',
          200: '#c7d7fe',
          300: '#a4bcfc',
          400: '#819af9',
          500: '#6172f3',
          600: '#4e55e6',
          700: '#3f42c9',
          800: '#3438a1',
          900: '#2d327f',
          950: '#1a1c4b',
        }
      }
    },
  },
  plugins: [],
}
