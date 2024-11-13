/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          100: '#FAFDEA',
          200: '#E9EBDD',
          300: '#B1B2A6',
          400: '#2B2A02'
        },
        mainly: {
          100: '#F1FFA8',
          200: '#FFE14B',
          300: '#C2AC3F',
          400: '#5F5F3C'
        },
        support: {
          100: '#6DC23E',
          200: '#C23E41'
        }
      },
      fontFamily: {
        sigmar: ['Sigmar', 'cursive'],
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

