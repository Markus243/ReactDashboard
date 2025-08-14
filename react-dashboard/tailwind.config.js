/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Pure dark theme colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9', 
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#1a1a1a',
          800: '#0d0d0d',
          900: '#000000',
          950: '#000000',
        },
        // Blue theme palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#189AB4', // Main blue
          600: '#05445E', // Dark blue
          700: '#05445E',
          800: '#042f42',
          900: '#032330',
        },
        // Light blue accent theme
        accent: {
          50: '#f0fdfd',
          100: '#e6ffff',
          200: '#D4F1F4', // Lightest blue
          300: '#b8f0f4',
          400: '#9ee8ed',
          500: '#75E6DA', // Light blue
          600: '#5dd9ce',
          700: '#4fb8ae',
          800: '#3e8b82',
          900: '#2d645e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}