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
      'lightKhaki': '#F8F2D6',
      'paleGold': '#EAD9A8',
      'paleGoldGrayed': '#D1BD87',
      'indigo': '#4B0082',
      'redishBrown': '#A52A2A',
      'britishRacingGreen': '#00563F',
      'black': '#181e23'
    },
    borderWidth: {
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '5': '5px',
      '6': '6px',
    },
    extend: {
      spacing: {
        'mnFrmWidth': '20rem',
        'mdFrmWidth': '35rem',
        'lgFrmWidth': '50rem',
      },
      width: {
        'image': '90px',
        'navButtons': '375px',
        'characterCard': '500px',
        'outerContainer': "calc(100vw - 50px)",
        'innerContainer': 'calc(100vw - 60px)',

      },
      height: {
        'line': '2px',
        'image': '90px',
        'characterCard': '120px',
        'characterCardLg': '150px',
        'outerContainer': 'calc(100vh - 20px)',
        'innerContainer': 'calc(100vh - 30px)',
      },
      maxWidth: {
        'innerMaxWidth': '1430px',
        'maxWidth': '1440px',
      },
      minHeight: {
        'outerContainer': 'calc(100vh - 20px)',
        'innerContainer': 'calc(100vh - 30px)',
        'statsOuterContainer': 'calc(100vh - 116px)',
        'statsInnerContainer': 'calc(100vh - 126px)',
        'statsPage': 'calc(100vh - 96px)',
      },
      margin: {
        'outerContainer': '10px',
        'innerContainer': '3.4px',
        'navButtonsSpacing': '320px'
      },
      padding: {
        'characterCard': '15px',
        'characterCardLg': '25px',
      }
    },
  },
  plugins: [],
}

