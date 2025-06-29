// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0a0a',
        'bg-off': '#111111',
        'glow': '#06b6d4', // Cyan
        'primary': '#0e7490', // Cyan lebih gelap
        'text-bright': '#f0f9ff',
        'text-dim': '#a1a1aa',
        
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-exo2)'],
      },
      keyframes: {
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 5px rgba(6, 182, 212, 0.5), 0 0 10px rgba(6, 182, 212, 0.3)' },
          '50%': { textShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 30px rgba(6, 182, 212, 0.6)' },
        }
      },
      animation: {
        'text-glow': 'text-glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;