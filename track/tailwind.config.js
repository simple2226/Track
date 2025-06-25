/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: ['"Open Sans"', 'sans-serif'],
        robotoSans: ['"Segoe WPC"', '"Segoe UI"', 'sans-serif'],
      },
      screens:{
        '500': '500px',
        '600': '600px',
        '700': '700px',
        '850': '850px',
        '1000': '1000px',
        '1100': '1100px'
      },
      keyframes: {
        showUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        showUpAndComeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(5px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)'
          },
        },
        rotateArrowUp: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        rotateArrowDown: {
          '0%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        goDown: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(323.5px)' },
        },
        goUp: {
          '0%': { transform: 'translateY(323.5px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        rotateArrowUp: 'rotateArrowUp .2s ease-in-out forwards',
        rotateArrowDown: 'rotateArrowDown .2s ease-in-out forwards',
        goDown: 'goDown .2s ease-in-out forwards',
        goUp: 'goUp .2s ease-in-out forwards',
        showUp: 'showUp 1s linear .3s forwards',
        showUpFast: 'showUp .1s linear forwards',
        showUpAndComeUp1: 'showUpAndComeUp .1s linear 2.3s forwards',
        showUpAndComeUp2: 'showUpAndComeUp .1s linear 2.5s forwards',
        showUpAndComeUp3: 'showUpAndComeUp .1s linear 2.7s forwards',
        showUpAndComeUp4: 'showUpAndComeUp .1s linear 3.8s forwards',
        showUpAndComeUp5: 'showUpAndComeUp .1s linear 4s forwards',
      }
    },
  },
  plugins: [],
}

