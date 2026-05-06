import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // enable dark mode via .dark class
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 70%, 50%)', // azul‑cobalto suave
        accent: 'hsl(340, 70%, 55%)', // rosa vibrante
        background: {
          DEFAULT: 'hsl(220, 15%, 10%)', // fondo oscuro premium
          light: 'hsl(220, 15%, 15%)',
        },
        surface: {
          DEFAULT: 'hsl(220, 15%, 12%)',
        },
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
