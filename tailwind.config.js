/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
          DEFAULT: '#0F172A',
          2: '#1E293B',
        },
        surface: {
          DEFAULT: '#FAFAFA',
          2: '#F3F4F6',
          3: '#E5E7EB',
        },
        text: {
          DEFAULT: '#0F172A',
          2: '#334155',
          3: '#64748B',
        },
        border: {
          DEFAULT: '#E2E8F0',
          2: '#CBD5E1',
        },
      },
      borderRadius: {
        DEFAULT: '16px',
        sm: '8px',
        lg: '24px',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        gold: '0 4px 20px rgba(212,160,23,.25)',
        'gold-lg': '0 8px 32px rgba(212,160,23,.15),0 2px 8px rgba(0,0,0,.04)',
        soft: '0 10px 40px -10px rgba(0,0,0,0.08)',
      },
      animation: {
        'slide-in': 'slideIn .4s cubic-bezier(.16, 1, .3, 1) both',
        'fade-in': 'fadeIn .3s ease both',
        'pulse-dot': 'pulse 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        slideIn: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}
