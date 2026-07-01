import type { Config } from 'tailwindcss';

/**
 * Exported TRI Tailwind theme (single source of truth — the repo's root
 * `tailwind.config.js` re-uses this object). Colors/fonts/radii/shadows
 * reference the design-system CSS variables in tokens.css (shipped via the
 * library's style.css).
 *
 * Colors are wrapped in `color-mix(... <alpha-value> ...)` so Tailwind opacity
 * modifiers (e.g. `bg-brand/20`, `ring-error/30`) resolve correctly against the
 * hex-valued CSS variables. Without this the `/<opacity>` utilities silently
 * emit no CSS.
 *
 * IMPORTANT for consumers: this preset does NOT bundle the `tailwindcss-animate`
 * plugin (a build-time tool shouldn't ship in the runtime bundle). Add it
 * yourself so the components' enter/exit + accordion animations work:
 *   import { tailwindConfig } from '@toyota-research-institute/rse-react-library';
 *   export default {
 *     presets: [tailwindConfig],
 *     content: ['./src/** /*.{ts,tsx}'],
 *     plugins: [require('tailwindcss-animate')],
 *   };
 */

/** Wrap a CSS color variable so Tailwind's `<alpha-value>` opacity modifiers work. */
const alpha = (v: string) =>
  `color-mix(in srgb, var(${v}) calc(<alpha-value> * 100%), transparent)`;

const config: Omit<Config, 'content'> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: alpha('--bg'),
        foreground: alpha('--fg'),
        card: { DEFAULT: alpha('--bg-elevated'), foreground: alpha('--fg') },
        popover: { DEFAULT: alpha('--bg-elevated'), foreground: alpha('--fg') },
        primary: { DEFAULT: alpha('--neutral-950'), foreground: alpha('--neutral-0') },
        secondary: { DEFAULT: alpha('--bg-muted'), foreground: alpha('--fg') },
        muted: { DEFAULT: alpha('--bg-muted'), foreground: alpha('--fg-muted') },
        accent: { DEFAULT: alpha('--bg-muted'), foreground: alpha('--fg') },
        destructive: { DEFAULT: alpha('--error'), foreground: alpha('--neutral-0') },
        border: alpha('--border'),
        input: alpha('--border'),
        ring: alpha('--border-focus'),
        brand: {
          DEFAULT: alpha('--brand-red'),
          hover: alpha('--brand-red-hover'),
          deep: alpha('--brand-red-deep'),
          ink: alpha('--brand-red-ink'),
          steel: alpha('--brand-steel'),
          sky: alpha('--brand-sky'),
          gray: alpha('--brand-gray'),
          foreground: alpha('--fg-on-brand'),
        },
        info: { DEFAULT: alpha('--info'), bg: alpha('--info-bg') },
        success: { DEFAULT: alpha('--success'), bg: alpha('--success-bg') },
        warning: { DEFAULT: alpha('--warning'), bg: alpha('--warning-bg') },
        error: { DEFAULT: alpha('--error'), bg: alpha('--error-bg') },
        link: { DEFAULT: alpha('--link'), hover: alpha('--link-hover') },
      },
      fontFamily: {
        sans: ['Gellix', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Gellix', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        focus: 'var(--shadow-focus)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        std: 'var(--ease-std)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'progress-indeterminate': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(340%)' },
        },
        'dot-bounce': {
          '0%,80%,100%': { opacity: '0.3', transform: 'translateY(0)' },
          '40%': { opacity: '1', transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s var(--ease-out)',
        'accordion-up': 'accordion-up 0.2s var(--ease-out)',
        'progress-indeterminate': 'progress-indeterminate 1.6s linear infinite',
        'dot-bounce': 'dot-bounce 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
