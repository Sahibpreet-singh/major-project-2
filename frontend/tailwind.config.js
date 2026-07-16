/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0A0F',
          card: '#111118',
          elevated: '#1A1A26',
          border: '#1E1E2E',
        },
        accent: {
          DEFAULT: '#6366F1',
          soft: '#6366F120',
          hover: '#818CF8',
        },
        text: {
          primary: '#E2E8F0',
          muted: '#64748B',
          dim: '#374151',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
