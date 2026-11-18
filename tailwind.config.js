/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        fog: 'rgb(var(--c-fog) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--c-ink-soft) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        line: 'rgb(var(--c-ink) / 0.12)',
        'line-light': 'rgb(255 255 255 / 0.16)',
      },
      fontFamily: {
        display: ['Manrope', 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
        serif: ['Fraunces', 'Noto Serif JP', 'Hiragino Mincho ProN', 'serif'],
        sans: ['Manrope', 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      transitionTimingFunction: {
        paper: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
