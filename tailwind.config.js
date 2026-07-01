/** @type {import('tailwindcss').Config} */
/* This repo's build config. The theme (colors/fonts/radii/shadows/keyframes)
   is the single source of truth exported from lib/tailwind.config.ts and shared
   with downstream consumers. Here we only add the local `content` globs and the
   `tailwindcss-animate` plugin needed to compile this library's own components
   and Storybook. */
import sharedConfig from './lib/tailwind.config';

export default {
  ...sharedConfig,
  content: ['./lib/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('tailwindcss-animate')],
};
