/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f3',
          100: '#f9efe4',
          200: '#f2dbc7',
          300: '#e8c49e',
          400: '#d4a373',
          500: '#c68c5c',
          600: '#a16f4a',
          700: '#855940',
          800: '#6d4b39',
          900: '#5a3f31',
        },
        cream: {
          50: '#fffef9',
          100: '#fef9ed',
          200: '#fdf3d6',
          300: '#f9e9b8',
          400: '#f4d99a',
        }
      }
    },
  },
  plugins: [],
}
