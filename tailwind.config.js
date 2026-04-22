/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      colors: {
        fitform: {
          bone: '#F5F2EE',
          stone: '#D1CDC7',
          greige: '#BDB7AF',
          navy: '#1A2232',
          teal: '#244D4D',
          shadow: '#2C3E50',
          obsidian: '#0B0F15',
          charcoal: '#262626',
          slate: '#2F353B',
        },
        stone: {
          50: '#F5F2EE',
          100: '#EBE8E4',
          200: '#D1CDC7',
          300: '#BDB7AF',
          400: '#9ca3af',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#1A2232',
          900: '#151A25',
          950: '#0B0F15',
        },
      },
      animation: {
        blob: 'blob 10s infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
