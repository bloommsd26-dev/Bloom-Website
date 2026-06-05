import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './app/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#432713',
        horchata: '#ddc6b3',
        cinnamon: '#965420',
        'oat-milk': '#f4edea',
        'ice-cube': '#d2e3fd',
        ink: '#1a1a1a',
        white: '#f4edea', // Mapped to oat-milk for global background consistency
        black: '#160b05',
        primary: {
          50: '#f4edea', // oat-milk
          100: '#ead8ce',
          200: '#ddc6b3', // horchata
          500: '#965420', // cinnamon
          600: '#7f471b',
          900: '#432713', // espresso
        },
        secondary: {
          50: '#f0f7ff',
          100: '#d2e3fd', // ice-cube
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-body)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Georgia', 'serif'],
        serif: ['var(--font-accent)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};

export default config;
