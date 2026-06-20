/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: {
          deep: '#FFFFFF',      // Background
          dark: '#FFFFFF',      // Pure White card background
          blue: 'rgba(179, 49, 241, 0.05)',  // Soft purple hover highlights
          light: 'rgba(179, 49, 241, 0.12)', // Active states
        },
        gold: {
          light: '#FBF5A7',     // Cream Yellow
          DEFAULT: '#B331F1',   // Luxury Purple
          dark: '#FF62BB',      // Bright Pink
        },
        luxury: {
          cream: '#FBF5A7',     // Cream Yellow
          white: '#FFFFFF',     // Pure White
          text: '#111827',      // Primary Text
          muted: '#6B7280',     // Secondary Text
        },
        gray: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#6B7280',
          500: '#6B7280',
          600: '#111827',
          700: '#111827',
          800: '#111827',
          900: '#111827',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', '"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'glass-sm': '0 2px 8px 0 rgba(179, 49, 241, 0.03)',
        'glass': '0 8px 32px 0 rgba(179, 49, 241, 0.05)',
        'glass-gold': '0 8px 32px 0 rgba(255, 98, 187, 0.08), 0 4px 12px 0 rgba(179, 49, 241, 0.03)',
        'premium-glow': '0 0 25px rgba(179, 49, 241, 0.1), inset 0 0 15px rgba(255, 151, 208, 0.05)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
