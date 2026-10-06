/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brunswick: {
          DEFAULT: '#0C4137',
          dark: '#072A23',
          light: '#165e51',
        },
        emerald: {
          brand: '#06D6A0',
          hover: '#05b88a',
          light: '#dbfceb',
        },
        polar: {
          DEFAULT: '#E6FBF6',
          light: '#F3FDFB',
          dark: '#c4f4ea',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
