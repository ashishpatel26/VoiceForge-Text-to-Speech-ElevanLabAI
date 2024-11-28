/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF7D1',
        purple: {
          light: '#8B5DFF',
          DEFAULT: '#6A42C2',
          dark: '#563A9C',
        }
      },
      animation: {
        'waveform': 'waveform 1s ease-in-out infinite',
      },
      keyframes: {
        waveform: {
          '0%, 100%': { height: '4px' },
          '50%': { height: '16px' },
        },
      },
    },
  },
  plugins: [],
};