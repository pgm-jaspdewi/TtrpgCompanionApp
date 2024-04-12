/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'tablet': "768px",
      'laptopSm': "1024px",
      'laptopLg': "1440px",
    },
    fontFamily: {
      'title': ['Gentium Book Plus', 'serif'],
      'body': ['Roboto Slab', 'serif'],
    },
    colors: {
      'maroon': '#800000',
      'silverChalice': '#B0B8B8',
      'darkKhaki': '#C0AD6A',
      'lightKaki': '#F8F2D6',
      'paleGold': '#EAD9A8',
      'indigo': '#4B0082',
      'redishBrown': '#A52A2A',
      'britishRacingGreen': '#00563F',
    },
    extend: {
      spacing: {
        'mnFrmWidth': '20rem',
        'mxFrmWidth': '35rem',
      },
      width: {
        'outerContainer': "calc(100vw - 20px)",
        'innerContainer': 'calc(100vw - 30px)',
      },
      height: {
        'outerContainer': "calc(100vh - 20px)",
        'innerContainer': 'calc(100vh - 30px)',
      },
      margin: {
        'outerContainer': '10px',
        'innerContainer': '3.4px',
      },
    },
  },
  plugins: [],
}

