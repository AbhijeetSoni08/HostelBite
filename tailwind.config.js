/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8e8',
          100: '#fbf0c5',
          200: '#f8e28f',
          300: '#f6d252',
          400: '#f5c324',
          500: '#f7c948', // Primary Warm Yellow
          600: '#d9a72b',
          700: '#b4831f',
          800: '#926820',
          900: '#7a561f',
          950: '#452e0d',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#F5F5F2', // Updated to match guidelines
          elevated: '#ffffff',
          dark: '#FAFAF8',
        },
        dark: {
          DEFAULT: '#111111',
          deep: '#0B0B0B',
          muted: '#333333',
        },
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        status: {
          success: '#16A34A',
          successBg: '#DCFCE7',
          error: '#DC2626',
          errorBg: '#FEE2E2',
          warning: '#D97706',
          warningBg: '#FEF3C7',
          info: '#2563EB',
          infoBg: '#DBEAFE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'level-0': 'none',
        'level-1': '0 1px 2px 0 rgba(0, 0, 0, 0.03)', // Very subtle surface separation
        'level-2': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', // Cards/Interactive
        'level-3': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)', // Dropdowns/Modals
        'level-4': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // Important floating UI
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '18px',
        'pill': '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 250ms ease-out forwards',
        'fade-out': 'fadeOut 200ms ease-in forwards',
        'slide-up': 'slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pop-in': 'popIn 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        }
      }
    },
  },
  plugins: [],
};
