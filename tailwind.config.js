/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        clay: {
          DEFAULT: '#CF6766',
          light: '#E08D8C',
          dark: '#AC4F4E',
        },
        ink: {
          DEFAULT: '#30415D',
          light: '#425A80',
          dark: '#212D40',
        },
        midnight: {
          DEFAULT: '#031424',
          light: '#0B2438',
        },
        mist: {
          DEFAULT: '#8EAEBD',
          light: '#B7CDD7',
          dark: '#6C93A4',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(3, 20, 36, 0.25)',
        'card-hover': '0 20px 40px -12px rgba(3, 20, 36, 0.35)',
      },
    },
  },
  plugins: [],
}
