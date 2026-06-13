/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#D4A017',
          dark: '#C8920F',
          light: '#FDF6DC',
          gold: '#F0C040',
        },
        dark: {
          DEFAULT: '#111111',
          2: '#1E1E1E',
        },
        surface: {
          DEFAULT: '#F5F5F5',
          2: '#EBEBEB',
        },
        text: {
          DEFAULT: '#111111',
          2: '#333333',
          3: '#6B6B6B',
        },
        border: {
          DEFAULT: '#E8E8E8',
          2: '#D0D0D0',
        },
      },
      borderRadius: {
        DEFAULT: '14px',
        sm: '8px',
        lg: '20px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.05)',
        gold: '0 4px 20px rgba(212,160,23,.35)',
        'gold-lg': '0 8px 32px rgba(212,160,23,.2),0 2px 8px rgba(0,0,0,.08)',
      },
      animation: {
        'slide-in': 'slideIn .38s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fadeIn .3s ease both',
        'pulse-dot': 'pulse 2s infinite',
      },
      keyframes: {
        slideIn: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
