import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#f4edea',
        black: '#160b05',
        primary: {
          50: '#f4edea',
          100: '#ead8ce',
          200: '#ddc6b3',
          300: '#cfa987',
          400: '#b87d4d',
          500: '#965420',
          600: '#7f471b',
          700: '#633817',
          800: '#4f2d16',
          900: '#432713',
          950: '#241208',
        },
        secondary: {
          50: '#f4edea',
          100: '#d2e3fd',
          200: '#b7d2fa',
          300: '#8fbaf5',
          400: '#5d96ec',
          500: '#3674dc',
          600: '#2559bd',
          700: '#204797',
          800: '#203f7d',
          900: '#203766',
          950: '#172342',
        },
        neutral: {
          50: '#f4edea',
          100: '#eadfd8',
          200: '#ddc6b3',
          300: '#c9aa93',
          400: '#a98266',
          500: '#805d45',
          600: '#624531',
          700: '#523725',
          800: '#432713',
          900: '#2a170c',
          950: '#160b05',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '44px'],
        '5xl': ['48px', '52px'],
      },
      spacing: {
        gutter: 'var(--spacing-gutter, 1rem)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
        slideUp: 'slideUp 0.5s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
