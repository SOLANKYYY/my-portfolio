/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        page: '#FAFAFA',
        charcoal: '#333333',
        charcoalDark: '#1A1A1A',
        gold: {
          DEFAULT: '#C5A059',
          dark: '#B8860B',
          light: '#E8D5A5',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #C5A059, #B8860B)',
        'brand-gradient-soft': 'linear-gradient(to right, rgba(197,160,89,0.15), rgba(184,134,11,0.15))',
      },
      boxShadow: {
        glow: '0 8px 30px -8px rgba(197, 160, 89, 0.35)',
        'glow-lg': '0 20px 45px -12px rgba(197, 160, 89, 0.3)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        blink: 'blink 1s step-end infinite',
        'pulse-gold': 'pulse-gold 2s infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'pulse-gold': {
          '0%': { boxShadow: '0 0 0 0 rgba(197, 160, 89, 0.5)' },
          '70%': { boxShadow: '0 0 0 8px rgba(197, 160, 89, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(197, 160, 89, 0)' },
        },
      },
    },
  },
  plugins: [],
}
